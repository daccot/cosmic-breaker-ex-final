import { DIFF } from '../core/constants';
import { BALL_TRAIT_DEFINITIONS } from '../data/ballTraitDefinitions';
import { beep, stageBeep } from './audio';
import { getPaddleBounceVelocity, syncAttachedBalls } from './balls';
import { applyDrop, maybeSpawnDrop } from './drops';
import { logEvent } from './logger';
import { stageClear, loseLife } from './stage';
import { updateUI } from './ui';
import { updateWeapons, spawnWeaponBurst } from './weapons';
import { updateHostileGimmicks } from './hostileGimmicks';
import { updateBlockEffects, spawnBlockBurst } from './blockEffects';
import { applyBlockOnDestroyAbility, applyBlockOnHitAbility } from './blockAbilities';
import { tickWarnings, pushWarning } from './warnings';
function rectCircle(rect, b) {
    const cx = Math.max(rect.x, Math.min(b.x, rect.x + rect.w));
    const cy = Math.max(rect.y, Math.min(b.y, rect.y + rect.h));
    const dx = b.x - cx, dy = b.y - cy;
    return dx * dx + dy * dy <= b.r * b.r;
}
function applyTraitHitBonus(g, ball, blk) {
    const trait = BALL_TRAIT_DEFINITIONS[ball.trait];
    const stageMod = g.state.stageRuntime.traitModifiers[ball.trait] || { scoreBonus: 0, pierceBonus: 0, damageScale: 1 };
    if (trait.scoreBonus)
        g.state.gameplay.score += trait.scoreBonus;
    if (stageMod.scoreBonus)
        g.state.gameplay.score += stageMod.scoreBonus;
    const resisted = !!blk.resistance && blk.resistance.traits.includes(ball.trait);
    if (resisted) {
        const chance = Math.max(0.08, Math.min(1, blk.resistance.damageScale * stageMod.damageScale));
        if (Math.random() > chance) {
            pushWarning(g, `${blk.resistance.label} resisted ${ball.trait}`, 'info', 70);
            return false;
        }
    }
    let pierce = false;
    if (trait.alwaysPierce)
        pierce = true;
    if (!pierce && trait.pierceChance && Math.random() < trait.pierceChance + stageMod.pierceBonus)
        pierce = true;
    if (!pierce && g.state.combat.bigBallTimer > 0)
        pierce = true;
    if (!pierce && g.paddle.powerType === 'PIERCE' && g.paddle.powerTimer > 0) {
        g.state.gameplay.score += 20;
        pierce = true;
    }
    return pierce;
}
function updateTimers(g) {
    if (g.paddle.powerTimer > 0) {
        g.paddle.powerTimer -= 1;
        if (g.paddle.powerTimer <= 0) {
            g.paddle.powerType = '';
            g.paddle.w = DIFF[g.state.gameplay.difficulty].paddle;
        }
    }
    if (g.state.combat.magnetTimer > 0)
        g.state.combat.magnetTimer -= 1;
    if (g.state.combat.bigBallTimer > 0)
        g.state.combat.bigBallTimer -= 1;
}
function updateDrops(g) {
    for (let i = g.drops.length - 1; i >= 0; i--) {
        const d = g.drops[i];
        d.t += 1;
        if (g.state.combat.magnetTimer > 0) {
            const tx = g.paddle.x + g.paddle.w / 2, ty = g.paddle.y + g.paddle.h / 2;
            const dx = tx - d.x, dy = ty - d.y;
            const dist = Math.hypot(dx, dy);
            const range = 240 + g.state.combat.stageMagnetRangeBonus;
            if (dist < range) {
                const pull = Math.max(0.18, 1 - (dist / range)) * 0.65;
                d.x += dx * pull * 0.12;
                d.y += dy * pull * 0.18;
            }
        }
        d.y += d.vy;
        if (d.y > g.H + 20) {
            g.drops.splice(i, 1);
            continue;
        }
        if (d.x >= g.paddle.x && d.x <= g.paddle.x + g.paddle.w && d.y >= g.paddle.y - 10 && d.y <= g.paddle.y + g.paddle.h + 10) {
            applyDrop(g, d.type);
            g.drops.splice(i, 1);
            updateUI(g);
        }
    }
}
function updateBalls(g) {
    for (let ballIndex = g.balls.length - 1; ballIndex >= 0; ballIndex--) {
        const ball = g.balls[ballIndex];
        ball.x += ball.vx;
        ball.y += ball.vy;
        if (ball.x - ball.r <= 0) {
            ball.x = ball.r + 1;
            ball.vx = Math.abs(ball.vx) || 1.5;
            beep(g, 620, 0.04, 'triangle', 0.02);
        }
        else if (ball.x + ball.r >= g.W) {
            ball.x = g.W - ball.r - 1;
            ball.vx = -Math.abs(ball.vx || 1.5);
            beep(g, 620, 0.04, 'triangle', 0.02);
        }
        if (ball.y - ball.r <= 90) {
            ball.vy = Math.abs(ball.vy);
            beep(g, 620, 0.04, 'triangle', 0.02);
        }
        if (rectCircle({ x: g.paddle.x, y: g.paddle.y, w: g.paddle.w, h: g.paddle.h }, ball) && ball.vy > 0) {
            let rel = ((ball.x - (g.paddle.x + g.paddle.w / 2)) / (g.paddle.w / 2));
            rel = Math.max(-1, Math.min(1, rel));
            const speed = Math.max(DIFF[g.state.gameplay.difficulty].ball * 0.7 * g.state.combat.stageBallSpeedModifier, Math.hypot(ball.vx, ball.vy));
            const bounce = getPaddleBounceVelocity(g, rel, speed, ball.vx);
            ball.vx = bounce.vx;
            ball.vy = bounce.vy;
            if (Math.abs(rel) > 0.9) {
                ball.vx *= 1.06;
                ball.vy = -Math.sqrt(Math.max(0.5, speed * speed - ball.vx * ball.vx));
            }
            ball.y = g.paddle.y - ball.r - 1;
            logEvent(g, 'info', 'paddle bounce', { rel: Number(rel.toFixed(3)), vx: Number(ball.vx.toFixed(3)), vy: Number(ball.vy.toFixed(3)), angleDeg: Number((bounce.angle * 180 / Math.PI).toFixed(1)), balls: g.balls.length, trait: ball.trait });
            beep(g, 220, 0.05, 'square', 0.03);
        }
        for (const blk of g.blocks) {
            if (blk.hp <= 0)
                continue;
            if (rectCircle(blk, ball)) {
                const keepGoing = applyTraitHitBonus(g, ball, blk);
                const resisted = !!blk.resistance && blk.resistance.traits.includes(ball.trait);
                if (keepGoing || !resisted || Math.random() <= blk.resistance.damageScale) {
                    if (blk.type === 'boss' && blk.hp > 0) {
                        blk.bossPhase = blk.hp <= Math.ceil(blk.maxHp * 0.33) ? 3 : (blk.hp <= Math.ceil(blk.maxHp * 0.66) ? 2 : 1);
                    }
                    if (blk.armor && blk.armor > 0) {
                        blk.armor -= 1;
                        pushWarning(g, `${blk.type} armor cracked`, 'info', 45);
                    }
                    else {
                        blk.hp -= 1;
                    }
                    applyBlockOnHitAbility(g, blk, ball);
                    g.state.gameplay.score += blk.maxHp === 2 ? 80 : (blk.type === 'boss' ? 220 : 40);
                    g.state.gameplay.combo += 1;
                    g.prefs.bestScore = Math.max(g.prefs.bestScore, g.state.gameplay.score);
                    if (blk.hp <= 0) {
                        maybeSpawnDrop(g, blk);
                        applyBlockOnDestroyAbility(g, blk);
                        spawnBlockBurst(g, blk);
                    }
                }
                if (!keepGoing)
                    ball.vy *= -1;
                stageBeep(g, 'hit', 880, 0.03, 'square', 0.02);
                break;
            }
        }
        if (ball.y - ball.r > g.H)
            g.balls.splice(ballIndex, 1);
    }
}
function updateBossCharge(g) {
    const boss = g.blocks.find(b => b.type === 'boss' && b.hp > 0);
    if (!boss) {
        g.state.combat.bossCharge.active = false;
        return;
    }
    if (g.state.gameplay.awaitingLaunch)
        return;
    const phase = Math.max(1, boss.bossPhase || 1);
    const kind = phase >= 3 ? 'laser' : 'missile';
    if (g.state.combat.bossCharge.active) {
        g.state.combat.bossCharge.timer -= 1;
        g.state.combat.bossCharge.bossX = boss.x;
        g.state.combat.bossCharge.bossY = boss.y;
        g.state.combat.bossCharge.bossW = boss.w;
        g.state.combat.bossCharge.bossH = boss.h;
        if (g.state.combat.bossCharge.timer <= 0) {
            g.state.combat.bossCharge.active = false;
            spawnWeaponBurst(g, kind);
            stageBeep(g, 'warning', 980, 0.09, 'sawtooth', 0.04);
            g.state.combat.bossAttackCooldown = phase >= 3 ? 150 : 210;
            pushWarning(g, `Boss fired ${kind.toUpperCase()}`, 'danger', 65);
        }
        return;
    }
    g.state.combat.bossAttackCooldown -= 1;
    if (g.state.combat.bossAttackCooldown <= 0) {
        g.state.combat.bossCharge = { active: true, timer: 54, maxTimer: 54, kind, bossX: boss.x, bossY: boss.y, bossW: boss.w, bossH: boss.h };
        pushWarning(g, `Boss charging ${kind.toUpperCase()}`, 'danger', 75);
        stageBeep(g, 'warning', 920, 0.07, 'triangle', 0.035);
    }
}
export function updateGame(g) {
    tickWarnings(g);
    updateBlockEffects(g);
    if (g.state.gameplay.paused || !g.state.gameplay.running)
        return;
    if (!g.state.gameplay.mouseActive) {
        if (g.state.input.keys.left)
            g.paddle.x -= g.paddle.speed;
        if (g.state.input.keys.right)
            g.paddle.x += g.paddle.speed;
        g.paddle.x = Math.max(10, Math.min(g.W - g.paddle.w - 10, g.paddle.x));
    }
    updateTimers(g);
    updateDrops(g);
    if (g.state.gameplay.awaitingLaunch) {
        syncAttachedBalls(g);
        return;
    }
    updateWeapons(g);
    updateHostileGimmicks(g);
    updateBossCharge(g);
    updateBalls(g);
    if (!g.balls.length)
        loseLife(g);
    if (g.blocks.every(b => b.hp <= 0))
        stageClear(g);
    updateUI(g);
}
