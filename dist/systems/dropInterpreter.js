import { DIFF } from '../core/constants';
import { applyBigBallState, spawnMultiBall } from './balls';
import { spawnWeaponBurst } from './weapons';
const handlers = {
    setPaddleWidth(g, effect) {
        if (effect.amount !== 0)
            g.paddle.w = Math.min(effect.max, g.paddle.w + effect.amount);
        g.paddle.powerType = effect.powerType;
        g.paddle.powerTimer = Math.max(g.paddle.powerTimer, effect.powerTimer);
    },
    setCombatTimer(g, effect) {
        const timerKey = effect.timer;
        const current = g.state.combat[timerKey];
        if (typeof current === 'number')
            g.state.combat[timerKey] = Math.max(current, effect.value);
        if (effect.cooldownKey)
            g.state.combat[effect.cooldownKey] = effect.cooldownValue ?? 0;
        if (effect.powerType) {
            g.paddle.powerType = effect.powerType;
            g.paddle.powerTimer = Math.max(g.paddle.powerTimer, effect.powerTimer || 0);
        }
    },
    scaleBallVelocity(g, effect) {
        for (const ball of g.balls) {
            ball.vx *= effect.factor;
            ball.vy *= effect.factor;
        }
        if (effect.powerType) {
            g.paddle.powerType = effect.powerType;
            g.paddle.powerTimer = Math.max(g.paddle.powerTimer, effect.powerTimer || 0);
        }
    },
    boostBallVelocity(g, effect) {
        for (const ball of g.balls) {
            const speed = Math.max(DIFF[g.state.gameplay.difficulty].ball * effect.minBaseMultiplier * g.state.combat.stageBallSpeedModifier, Math.hypot(ball.vx, ball.vy) * effect.scale);
            const ax = Math.abs(ball.vx) / Math.max(0.001, Math.abs(ball.vx) + Math.abs(ball.vy));
            ball.vx = speed * Math.max(0.24, ax) * (Math.sign(ball.vx || 1) || 1);
            ball.vy = speed * (1 - Math.max(0.24, ax)) * (ball.vy < 0 ? -1 : 1);
        }
    },
    grantLifeOrScore(g, effect) {
        if (g.state.gameplay.lives < DIFF[g.state.gameplay.difficulty].lives + effect.lifeCapOffset)
            g.state.gameplay.lives += 1;
        else
            g.state.gameplay.score += effect.score;
    },
    addScore(g, effect) { g.state.gameplay.score += effect.amount; },
    addCombo(g, effect) { g.state.gameplay.combo += effect.amount; },
    addBarrier(g, effect) {
        g.state.combat.barrierCharges = Math.min(effect.max, g.state.combat.barrierCharges + effect.amount);
        g.state.gameplay.score += effect.score;
    },
    applyBigBallState(g) { applyBigBallState(g); },
    spawnWeapon(g, effect) { spawnWeaponBurst(g, effect.weapon); },
    spawnMultiball(g, effect) {
        g.state.gameplay.score += spawnMultiBall(g) ? effect.successScore : effect.failScore;
        g.state.gameplay.combo += effect.combo;
    }
};
export function applyInterpretedDropEffects(g, effects) {
    for (const effect of effects) {
        const handler = handlers[effect.kind];
        handler(g, effect);
    }
}
