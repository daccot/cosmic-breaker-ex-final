import { BLOCK_DEFINITIONS } from '../data/blockDefinitions';
import { maybeSpawnDrop } from './drops';
import { spawnBlockBurst } from './blockEffects';
import { pushWarning } from './warnings';
import { spawnWeaponBurst } from './weapons';
function nearestAliveBlock(g, source) {
    let best = null;
    let bestDist = Infinity;
    for (const blk of g.blocks) {
        if (blk === source || blk.hp <= 0)
            continue;
        const d = Math.hypot((blk.x + blk.w / 2) - (source.x + source.w / 2), (blk.y + blk.h / 2) - (source.y + source.h / 2));
        if (d < bestDist) {
            best = blk;
            bestDist = d;
        }
    }
    return best;
}
function chainDamageNearby(g, source, radius, damage = 1) {
    const sx = source.x + source.w / 2;
    const sy = source.y + source.h / 2;
    for (const blk of g.blocks) {
        if (blk === source || blk.hp <= 0)
            continue;
        const bx = blk.x + blk.w / 2;
        const by = blk.y + blk.h / 2;
        if (Math.hypot(bx - sx, by - sy) <= radius) {
            if (blk.armor && blk.armor > 0)
                blk.armor = Math.max(0, blk.armor - damage);
            else
                blk.hp = Math.max(0, blk.hp - damage);
            spawnBlockBurst(g, blk);
            if (blk.hp <= 0)
                maybeSpawnDrop(g, blk);
        }
    }
}
export function applyBlockOnHitAbility(g, blk, ball) {
    const ability = BLOCK_DEFINITIONS[blk.type].ability?.onHit;
    if (!ability)
        return;
    if (ability === 'warpBall') {
        ball.vx += (Math.random() > 0.5 ? 0.35 : -0.35);
        ball.vy *= 0.995;
    }
    else if (ability === 'crownCommand') {
        g.state.combat.stageAutoWeaponCooldown = Math.max(0, g.state.combat.stageAutoWeaponCooldown - 14);
        pushWarning(g, 'Crown relay accelerated enemy fire', 'warn', 60);
    }
    else if (ability === 'corePulse') {
        g.hostileEffects.push({ x: blk.x + blk.w / 2, y: blk.y + blk.h / 2, radius: 70, color: '#8ad6ff', ttl: 26, maxTtl: 26, kind: 'pulseRing' });
        for (const targetBall of g.balls) {
            const dx = targetBall.x - (blk.x + blk.w / 2);
            const dy = targetBall.y - (blk.y + blk.h / 2);
            const dist = Math.max(24, Math.hypot(dx, dy));
            targetBall.vx += (dx / dist) * 0.2;
            targetBall.vy += (dy / dist) * 0.1;
        }
    }
    else if (ability === 'bossCommand') {
        if (blk.bossPhase === 1 && blk.hp <= Math.ceil(blk.maxHp * 0.66)) {
            blk.bossPhase = 2;
            spawnWeaponBurst(g, 'missile');
            pushWarning(g, 'Boss entered phase 2', 'danger', 120);
        }
        else if (blk.bossPhase === 2 && blk.hp <= Math.ceil(blk.maxHp * 0.33)) {
            blk.bossPhase = 3;
            spawnWeaponBurst(g, 'laser');
            pushWarning(g, 'Boss entered final phase', 'danger', 140);
        }
    }
}
export function applyBlockOnDestroyAbility(g, blk) {
    const ability = BLOCK_DEFINITIONS[blk.type].ability?.onDestroy;
    if (!ability)
        return;
    if (ability === 'spawnScoreDrop') {
        g.drops.push({ x: blk.x + blk.w / 2, y: blk.y + blk.h / 2, vy: 1.9, type: 'score', t: 0 });
    }
    else if (ability === 'spawnLifeDrop') {
        g.drops.push({ x: blk.x + blk.w / 2, y: blk.y + blk.h / 2, vy: 1.9, type: 'life', t: 0 });
        chainDamageNearby(g, blk, 48, 1);
    }
    else if (ability === 'meteorBurst') {
        for (let i = 0; i < 3; i++)
            g.enemyShots.push({ x: blk.x + blk.w / 2, y: blk.y + blk.h / 2, vx: (i - 1) * 0.8, vy: 2.8 + i * 0.25, life: 120, radius: 4.5, color: '#ff5d5d', damage: 1, kind: 'meteor' });
        chainDamageNearby(g, blk, 70, 1);
    }
    else if (ability === 'weaponBurst') {
        spawnWeaponBurst(g, Math.random() > 0.5 ? 'laser' : 'missile');
        chainDamageNearby(g, blk, 84, 1);
    }
    else if (ability === 'bossCollapse') {
        g.state.gameplay.score += 2500;
        pushWarning(g, 'Boss core collapsed', 'danger', 160);
        g.hostileEffects.push({ x: blk.x + blk.w / 2, y: blk.y + blk.h / 2, radius: 110, color: '#ff9bd4', ttl: 60, maxTtl: 60, kind: 'pulseRing' });
        spawnBlockBurst(g, blk);
        const ally = nearestAliveBlock(g, blk);
        if (ally)
            ally.hp = Math.max(0, ally.hp - 1);
        chainDamageNearby(g, blk, 120, 2);
    }
}
