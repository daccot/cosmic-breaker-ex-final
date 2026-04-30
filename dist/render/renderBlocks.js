import { BLOCK_DEFINITIONS } from '../data/blockDefinitions';
import { roundRect } from './renderPrimitives';
function drawIcon(ctx, blk, icon, color) {
    const cx = blk.x + blk.w / 2, cy = blk.y + blk.h / 2;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 1.2;
    if (icon === 'diamond') {
        ctx.beginPath();
        ctx.moveTo(cx, cy - 4);
        ctx.lineTo(cx + 4, cy);
        ctx.lineTo(cx, cy + 4);
        ctx.lineTo(cx - 4, cy);
        ctx.closePath();
        ctx.stroke();
    }
    else if (icon === 'flame') {
        ctx.beginPath();
        ctx.moveTo(cx, cy + 4);
        ctx.quadraticCurveTo(cx + 5, cy, cx, cy - 5);
        ctx.quadraticCurveTo(cx - 5, cy, cx, cy + 4);
        ctx.stroke();
    }
    else if (icon === 'star') {
        ctx.beginPath();
        ctx.moveTo(cx, cy - 4);
        ctx.lineTo(cx + 1.5, cy - 1.5);
        ctx.lineTo(cx + 4, cy);
        ctx.lineTo(cx + 1.5, cy + 1.5);
        ctx.lineTo(cx, cy + 4);
        ctx.lineTo(cx - 1.5, cy + 1.5);
        ctx.lineTo(cx - 4, cy);
        ctx.lineTo(cx - 1.5, cy - 1.5);
        ctx.closePath();
        ctx.stroke();
    }
    else if (icon === 'smile') {
        ctx.beginPath();
        ctx.arc(cx, cy, 5, 0.25, Math.PI - 0.25);
        ctx.stroke();
        ctx.fillRect(cx - 3.5, cy - 2.5, 1.2, 1.2);
        ctx.fillRect(cx + 2.3, cy - 2.5, 1.2, 1.2);
    }
    else if (icon === 'crown') {
        ctx.beginPath();
        ctx.moveTo(cx - 5, cy + 4);
        ctx.lineTo(cx - 5, cy - 2);
        ctx.lineTo(cx - 2, cy + 1);
        ctx.lineTo(cx, cy - 4);
        ctx.lineTo(cx + 2, cy + 1);
        ctx.lineTo(cx + 5, cy - 2);
        ctx.lineTo(cx + 5, cy + 4);
        ctx.closePath();
        ctx.stroke();
    }
    else if (icon === 'boss') {
        ctx.beginPath();
        ctx.moveTo(cx - 5, cy + 4);
        ctx.lineTo(cx - 2, cy - 5);
        ctx.lineTo(cx, cy - 1);
        ctx.lineTo(cx + 2, cy - 5);
        ctx.lineTo(cx + 5, cy + 4);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx, cy + 1, 2.2, 0, Math.PI * 2);
        ctx.fill();
    }
    else {
        ctx.beginPath();
        ctx.arc(cx, cy, 4.5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx, cy, 1.8, 0, Math.PI * 2);
        ctx.fill();
    }
}
export function renderBlocks(g) {
    const { ctx } = g;
    for (const blk of g.blocks) {
        if (blk.hp <= 0)
            continue;
        const def = BLOCK_DEFINITIONS[blk.type];
        const grad = ctx.createLinearGradient(blk.x, blk.y, blk.x + blk.w, blk.y + blk.h);
        grad.addColorStop(0, def.fill[0]);
        grad.addColorStop(1, def.fill[1]);
        ctx.fillStyle = grad;
        roundRect(ctx, blk.x, blk.y, blk.w, blk.h, def.renderStyle === 'boss' ? 10 : 6, true, false);
        ctx.strokeStyle = def.frame;
        ctx.lineWidth = 1.2;
        roundRect(ctx, blk.x + 0.8, blk.y + 0.8, blk.w - 1.6, blk.h - 1.6, def.renderStyle === 'boss' ? 10 : 6, false, true);
        ctx.fillStyle = def.shine;
        roundRect(ctx, blk.x + 2, blk.y + 2, blk.w - 4, Math.max(3, blk.h * 0.28), 4, true, false);
        ctx.strokeStyle = def.deco;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(blk.x + 3, blk.y + blk.h - 4);
        ctx.lineTo(blk.x + blk.w - 3, blk.y + 4);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(blk.x + 3, blk.y + blk.h * 0.55);
        ctx.lineTo(blk.x + blk.w - 3, blk.y + blk.h * 0.55);
        ctx.stroke();
        drawIcon(ctx, blk, def.icon, 'rgba(255,255,255,0.72)');
        if (def.renderStyle === 'boss') {
            ctx.strokeStyle = 'rgba(255,255,255,0.45)';
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.moveTo(blk.x + 4, blk.y + blk.h * 0.5);
            ctx.lineTo(blk.x + blk.w - 4, blk.y + blk.h * 0.5);
            ctx.stroke();
        }
        if (blk.resistance) {
            ctx.strokeStyle = blk.resistance.color || 'rgba(255,255,255,0.65)';
            ctx.lineWidth = 1.8;
            roundRect(ctx, blk.x - 0.4, blk.y - 0.4, blk.w + 0.8, blk.h + 0.8, 7, false, true);
        }
        if (blk.maxHp > 1) {
            ctx.fillStyle = 'rgba(3,14,26,.48)';
            roundRect(ctx, blk.x + 4, blk.y + blk.h - 5, blk.w - 8, 2.5, 2, true, false);
            ctx.fillStyle = 'rgba(255,255,255,.76)';
            roundRect(ctx, blk.x + 4, blk.y + blk.h - 5, (blk.w - 8) * (blk.hp / blk.maxHp), 2.5, 2, true, false);
        }
    }
}
