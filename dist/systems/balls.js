import { DIFF } from '../core/constants';
import { BALL_TRAIT_DEFINITIONS, BALL_TRAIT_SEQUENCE } from '../data/ballTraitDefinitions';
import { logEvent } from './logger';
export function ballVariant(index) {
    const trait = BALL_TRAIT_SEQUENCE[((index % BALL_TRAIT_SEQUENCE.length) + BALL_TRAIT_SEQUENCE.length) % BALL_TRAIT_SEQUENCE.length];
    return BALL_TRAIT_DEFINITIONS[trait];
}
export function getBallTraitDefinition(trait) {
    return BALL_TRAIT_DEFINITIONS[trait];
}
export function createBall(g, index = 0) {
    const base = DIFF[g.state.gameplay.difficulty].ball * 0.7;
    const variant = ballVariant(index);
    return {
        x: g.paddle.x + g.paddle.w / 2, y: g.paddle.y - 10,
        r: 8, baseR: 8, vx: base * 0.5 * (g.state.gameplay.lastBounceDir || 1), vy: -base * 0.7,
        pulse: Math.random() * Math.PI * 2, color: variant.color, trail: variant.trail, trait: variant.trait
    };
}
export function applyBigBallState(g) {
    const scale = g.state.combat.bigBallTimer > 0 ? 1.8 : 1;
    for (const ball of g.balls)
        ball.r = ball.baseR * scale;
}
export function resetBall(g) {
    g.balls = [createBall(g, 0)];
    g.state.gameplay.awaitingLaunch = true;
    applyBigBallState(g);
}
export function syncAttachedBalls(g) {
    g.balls.forEach((ball, i) => {
        const spread = (i - ((g.balls.length - 1) / 2)) * 7;
        ball.x = g.paddle.x + g.paddle.w / 2 + spread;
        ball.y = g.paddle.y - 10;
    });
}
export function getPaddleBounceVelocity(g, rel, speed, fallbackVx = 0) {
    const maxAngle = Math.PI * 0.42;
    const minAngle = Math.PI * 0.12;
    const clampedRel = Math.max(-1, Math.min(1, rel));
    let dir = clampedRel === 0 ? 0 : Math.sign(clampedRel);
    if (dir === 0)
        dir = Math.sign(g.state.gameplay.lastBounceDir || fallbackVx || 1) || 1;
    let absRel = Math.abs(clampedRel);
    if (absRel < 0.02)
        absRel = 0.02;
    const angle = minAngle + (maxAngle - minAngle) * absRel;
    const vx = Math.sin(angle) * speed * dir;
    const vy = -Math.cos(angle) * speed;
    g.state.gameplay.lastBounceDir = dir;
    return { vx, vy, angle };
}
export function spawnMultiBall(g) {
    const maxBalls = 5;
    if (g.balls.length >= maxBalls)
        return false;
    const next = g.balls.map(ball => ({ ...ball }));
    const cloneOffsets = [-0.34, 0.34, -0.62, 0.62];
    let variantIndex = next.length;
    let cloneIndex = 0;
    for (const source of g.balls) {
        if (next.length >= maxBalls)
            break;
        const speed = Math.max(DIFF[g.state.gameplay.difficulty].ball * 0.76, Math.hypot(source.vx, source.vy) * 0.98);
        const angleBase = Math.atan2(source.vy || -1, source.vx || g.state.gameplay.lastBounceDir || 1);
        const offset = cloneOffsets[cloneIndex % cloneOffsets.length];
        cloneIndex += 1;
        const angle = angleBase + offset;
        const variant = ballVariant(variantIndex++);
        next.push({
            x: source.x + Math.cos(angle) * 8,
            y: source.y + Math.sin(angle) * 4,
            r: source.baseR,
            baseR: source.baseR,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            pulse: Math.random() * Math.PI * 2,
            color: variant.color,
            trail: variant.trail,
            trait: variant.trait
        });
    }
    g.balls = next.slice(0, maxBalls);
    g.state.gameplay.awaitingLaunch = false;
    applyBigBallState(g);
    logEvent(g, 'info', 'multiball spawned', { balls: g.balls.length, traits: g.balls.map(b => b.trait), balance: 'phase8' });
    return g.balls.length > 1;
}
