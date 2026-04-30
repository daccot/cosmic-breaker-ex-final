import { getStageDefinition } from '../data/stageDefinitions';
export function renderBackground(g) {
    const { ctx } = g;
    const stageDef = getStageDefinition(g.state.gameplay.stageIndex);
    const grad = ctx.createLinearGradient(0, 0, g.W, g.H);
    grad.addColorStop(0, `${stageDef.theme.primary}18`);
    grad.addColorStop(1, `${stageDef.theme.secondary}08`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, g.W, g.H);
    const pattern = stageDef.layout.pattern || [];
    ctx.save();
    ctx.globalAlpha = 0.07;
    ctx.fillStyle = stageDef.theme.primary;
    pattern.forEach((row, r) => {
        for (let c = 0; c < row.length; c++)
            if (row[c] !== '.' && row[c] !== ' ')
                ctx.fillRect(30 + c * 16, 40 + r * 12, 10, 6);
    });
    ctx.restore();
    for (const s of g.stars) {
        s.a += s.s * 0.02;
        const al = 0.35 + (Math.sin(s.a) + 1) * 0.25;
        const hue = s.h + g.state.combat.stageThemeHueShift;
        ctx.fillStyle = `hsla(${hue},100%,70%,${al})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
    }
}
