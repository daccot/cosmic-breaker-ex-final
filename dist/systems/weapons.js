import { WEAPON_DEFINITIONS } from '../data/weaponDefinitions';
import { beep } from './audio';
import { maybeSpawnDrop } from './drops';
import { spawnBlockBurst } from './blockEffects';
import { applyBlockOnDestroyAbility } from './blockAbilities';
function hitBlock(g, blk, bonus) {
    if (blk.armor && blk.armor > 0)
        blk.armor -= 1;
    else
        blk.hp -= 1;
    g.state.gameplay.score += bonus + (blk.type === 'boss' ? 80 : 0);
    g.state.gameplay.combo += 1;
    g.prefs.bestScore = Math.max(g.prefs.bestScore, g.state.gameplay.score);
    if (blk.hp <= 0) {
        maybeSpawnDrop(g, blk);
        applyBlockOnDestroyAbility(g, blk);
        spawnBlockBurst(g, blk);
    }
}
function triggerWeaponSound(g, def) { beep(g, def.sound.freq, def.sound.dur, def.sound.oscillator, def.sound.volume); }
export function spawnWeaponBurst(g, type) {
    const def = WEAPON_DEFINITIONS[type];
    if (type === 'laser') {
        for (const offset of def.burstOffsets) {
            const x = offset >= 0 ? g.paddle.x + offset : g.paddle.x + g.paddle.w + offset;
            g.lasers.push({ x, y: g.paddle.y - 8, vy: -def.projectileSpeed, life: def.projectileLife });
        }
    }
    else {
        for (const offset of def.burstOffsets) {
            const x = offset >= 0 ? g.paddle.x + offset : g.paddle.x + g.paddle.w + offset;
            g.missiles.push({ x, y: g.paddle.y - 10, vx: offset >= 0 ? -1.2 : 1.2, vy: -def.projectileSpeed, life: def.projectileLife, turnRate: def.turnRate || 0.09 });
        }
    }
    triggerWeaponSound(g, def);
}
function nearestBlock(g, m) {
    let best = null, bestDist = Infinity;
    for (const blk of g.blocks) {
        if (blk.hp <= 0)
            continue;
        const cx = blk.x + blk.w / 2, cy = blk.y + blk.h / 2;
        const d = Math.hypot(cx - m.x, cy - m.y);
        if (d < bestDist) {
            best = blk;
            bestDist = d;
        }
    }
    return best;
}
function updateStageAutoWeapon(g) {
    const weapon = g.state.combat.stageAutoWeapon;
    if (!weapon || g.state.gameplay.awaitingLaunch)
        return;
    g.state.combat.stageAutoWeaponCooldown -= 1;
    if (g.state.combat.stageAutoWeaponCooldown <= 0) {
        spawnWeaponBurst(g, weapon);
        const def = WEAPON_DEFINITIONS[weapon];
        g.state.combat.stageAutoWeaponCooldown = Math.max(16, Math.round(def.autoCooldown * 2.3 * g.state.combat.stageAutoWeaponCooldownScale));
    }
}
export function updateLasers(g) {
    if (g.state.combat.laserTimer > 0) {
        g.state.combat.laserTimer -= 1;
        g.state.combat.laserCooldown -= 1;
        if (g.state.combat.laserCooldown <= 0) {
            spawnWeaponBurst(g, 'laser');
            g.state.combat.laserCooldown = WEAPON_DEFINITIONS.laser.autoCooldown;
        }
    }
    for (let i = g.lasers.length - 1; i >= 0; i--) {
        const shot = g.lasers[i];
        shot.y += shot.vy;
        shot.life -= 1;
        let hit = false;
        for (const blk of g.blocks) {
            if (blk.hp <= 0)
                continue;
            if (shot.x >= blk.x && shot.x <= blk.x + blk.w && shot.y >= blk.y && shot.y <= blk.y + blk.h) {
                hitBlock(g, blk, WEAPON_DEFINITIONS.laser.hitBonus);
                hit = true;
                break;
            }
        }
        if (hit || shot.life <= 0 || shot.y < 84)
            g.lasers.splice(i, 1);
    }
}
export function updateMissiles(g) {
    if (g.state.combat.missileTimer > 0) {
        g.state.combat.missileTimer -= 1;
        g.state.combat.missileCooldown -= 1;
        if (g.state.combat.missileCooldown <= 0) {
            spawnWeaponBurst(g, 'missile');
            g.state.combat.missileCooldown = WEAPON_DEFINITIONS.missile.autoCooldown;
        }
    }
    for (let i = g.missiles.length - 1; i >= 0; i--) {
        const m = g.missiles[i];
        const target = nearestBlock(g, m);
        if (target) {
            const tx = target.x + target.w / 2, ty = target.y + target.h / 2, dx = tx - m.x, dy = ty - m.y, dist = Math.max(1, Math.hypot(dx, dy));
            m.vx += (dx / dist) * m.turnRate;
            m.vy += (dy / dist) * m.turnRate * 0.55;
        }
        m.x += m.vx;
        m.y += m.vy;
        m.life -= 1;
        let hit = false;
        for (const blk of g.blocks) {
            if (blk.hp <= 0)
                continue;
            if (m.x >= blk.x && m.x <= blk.x + blk.w && m.y >= blk.y && m.y <= blk.y + blk.h) {
                hitBlock(g, blk, WEAPON_DEFINITIONS.missile.hitBonus);
                hit = true;
                break;
            }
        }
        if (hit || m.life <= 0 || m.y < 84)
            g.missiles.splice(i, 1);
    }
}
export function spawnLaserBurst(g) { spawnWeaponBurst(g, 'laser'); }
export function spawnMissileBurst(g) { spawnWeaponBurst(g, 'missile'); }
export function updateWeapons(g) { updateStageAutoWeapon(g); updateLasers(g); updateMissiles(g); }
