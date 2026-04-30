import { roundRect } from './renderPrimitives';
export function renderPaddle(g) {
    const { ctx } = g;
    const pg = ctx.createLinearGradient(g.paddle.x, g.paddle.y, g.paddle.x + g.paddle.w, g.paddle.y);
    pg.addColorStop(0, '#8ef7ff');
    pg.addColorStop(1, '#ff67d4');
    ctx.fillStyle = pg;
    roundRect(ctx, g.paddle.x, g.paddle.y, g.paddle.w, g.paddle.h, 8, true, false);
    if (g.paddle.powerTimer > 0) {
        ctx.fillStyle = 'rgba(255,255,255,.16)';
        roundRect(ctx, g.paddle.x, g.paddle.y - 8, g.paddle.w, 4, 2, true, false);
        ctx.fillStyle = g.state.combat.magnetTimer > 0 ? '#7dffd8' : '#ffe07a';
        roundRect(ctx, g.paddle.x, g.paddle.y - 8, g.paddle.w * (Math.min(760, g.paddle.powerTimer) / 760), 4, 2, true, false);
    }
}
