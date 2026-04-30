import { DROP_DEFINITIONS } from '../data/dropDefinitions';
import { roundRect } from './renderPrimitives';
export function renderDrops(g) {
    const { ctx } = g;
    for (const d of g.drops) {
        const draw = DROP_DEFINITIONS[d.type].draw;
        const grad = ctx.createLinearGradient(d.x - 12, d.y - 12, d.x + 12, d.y + 12);
        grad.addColorStop(0, draw.colors[0]);
        grad.addColorStop(1, draw.colors[1]);
        ctx.fillStyle = grad;
        roundRect(ctx, d.x - 16, d.y - 16, 32, 32, 9, true, false);
        ctx.fillStyle = 'rgba(255,255,255,.92)';
        ctx.font = 'bold 11px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(draw.mark, d.x, d.y + 1);
    }
}
