import { BALL_TRAIT_RENDER_DEFINITIONS } from '../data/ballTraitRenderDefinitions';
function alphaColor(base, alpha) {
    const match = base.match(/rgba?\(([^)]+)\)/i);
    if (!match)
        return `rgba(255,255,255,${alpha})`;
    const parts = match[1].split(',').map(p => p.trim());
    return `rgba(${parts[0]},${parts[1]},${parts[2]},${alpha})`;
}
export function renderBalls(g) {
    const { ctx } = g;
    for (const ball of g.balls) {
        const renderDef = BALL_TRAIT_RENDER_DEFINITIONS[ball.trait];
        ball.pulse += renderDef.pulseSpeed;
        const glowRadius = ball.r * renderDef.glowRadius;
        const glow = ctx.createRadialGradient(ball.x, ball.y, ball.r * 0.35, ball.x, ball.y, glowRadius);
        glow.addColorStop(0, alphaColor(ball.trail, renderDef.glowAlpha));
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
        const trailX = ball.x - ball.vx * renderDef.trailLength;
        const trailY = ball.y - ball.vy * renderDef.trailLength;
        const trail = ctx.createLinearGradient(trailX, trailY, ball.x, ball.y);
        trail.addColorStop(0, 'rgba(0,0,0,0)');
        trail.addColorStop(1, alphaColor(ball.trail, renderDef.trailAlpha));
        ctx.strokeStyle = trail;
        ctx.lineWidth = Math.max(2, ball.r * 0.72);
        ctx.beginPath();
        ctx.moveTo(trailX, trailY);
        ctx.lineTo(ball.x, ball.y);
        ctx.stroke();
        ctx.fillStyle = ball.color;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = renderDef.outline;
        ctx.lineWidth = 1.25;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, Math.max(1, ball.r - 0.5), 0, Math.PI * 2);
        ctx.stroke();
    }
}
