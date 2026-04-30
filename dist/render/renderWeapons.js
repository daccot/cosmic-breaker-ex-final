import { roundRect } from './renderPrimitives';
export function renderWeapons(g) {
    const { ctx } = g;
    for (const laser of g.lasers) {
        const grad = ctx.createLinearGradient(laser.x, laser.y - 14, laser.x, laser.y + 14);
        grad.addColorStop(0, '#d9ffff');
        grad.addColorStop(0.5, '#6ff7ff');
        grad.addColorStop(1, '#27b7ff');
        ctx.fillStyle = grad;
        roundRect(ctx, laser.x - 2.5, laser.y - 13, 5, 26, 2, true, false);
        ctx.strokeStyle = 'rgba(255,255,255,0.75)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(laser.x, laser.y - 14);
        ctx.lineTo(laser.x, laser.y + 14);
        ctx.stroke();
    }
    for (const missile of g.missiles) {
        ctx.fillStyle = '#7dffe1';
        roundRect(ctx, missile.x - 4.5, missile.y - 10, 9, 20, 3, true, false);
        ctx.fillStyle = '#efffff';
        roundRect(ctx, missile.x - 1.2, missile.y - 8, 2.4, 8, 1, true, false);
        ctx.fillStyle = '#3fe5b1';
        ctx.beginPath();
        ctx.moveTo(missile.x - 4, missile.y + 10);
        ctx.lineTo(missile.x, missile.y + 16);
        ctx.lineTo(missile.x + 4, missile.y + 10);
        ctx.closePath();
        ctx.fill();
    }
}
