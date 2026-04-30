import { roundRect } from './renderPrimitives';
function renderBossHpBar(g) {
    const boss = g.blocks.find(b => b.type === 'boss' && b.hp > 0);
    if (!boss)
        return;
    const { ctx } = g;
    const width = Math.min(420, g.W * 0.52);
    const x = (g.W - width) / 2;
    const y = 58;
    const hpRatio = Math.max(0, boss.hp / Math.max(1, boss.maxHp));
    const armorRatio = Math.max(0, (boss.armor || 0) / 2);
    ctx.save();
    ctx.fillStyle = 'rgba(18,10,26,0.72)';
    ctx.strokeStyle = 'rgba(255,145,205,0.8)';
    ctx.lineWidth = 1.4;
    roundRect(ctx, x, y, width, 22, 10, true, true);
    const hpGrad = ctx.createLinearGradient(x, y, x + width, y);
    hpGrad.addColorStop(0, '#ffd2f0');
    hpGrad.addColorStop(1, '#ff4dac');
    ctx.fillStyle = hpGrad;
    roundRect(ctx, x + 3, y + 3, (width - 6) * hpRatio, 10, 7, true, false);
    if (armorRatio > 0) {
        ctx.fillStyle = 'rgba(166,220,255,0.9)';
        roundRect(ctx, x + 3, y + 14, (width - 6) * armorRatio, 4, 3, true, false);
    }
    ctx.fillStyle = '#fff6fd';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`BOSS CORE  HP ${boss.hp}/${boss.maxHp}`, x + width / 2, y + 11);
    ctx.restore();
}
export function renderEffects(g) {
    const { ctx } = g;
    for (const fx of g.blockBursts) {
        const alpha = fx.ttl / fx.maxTtl;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = fx.color;
        ctx.fillStyle = fx.color;
        if (fx.style === 'ring') {
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(fx.x, fx.y, fx.size * (1.2 - alpha * 0.5), 0, Math.PI * 2);
            ctx.stroke();
        }
        else if (fx.style === 'spark') {
            for (let i = 0; i < 6; i++) {
                const a = (Math.PI * 2 / 6) * i;
                ctx.beginPath();
                ctx.moveTo(fx.x, fx.y);
                ctx.lineTo(fx.x + Math.cos(a) * fx.size * (1 - alpha * 0.3), fx.y + Math.sin(a) * fx.size * (1 - alpha * 0.3));
                ctx.stroke();
            }
        }
        else if (fx.style === 'boss') {
            ctx.lineWidth = 2.2;
            ctx.beginPath();
            ctx.arc(fx.x, fx.y, fx.size * (1.35 - alpha * 0.3), 0, Math.PI * 2);
            ctx.stroke();
            for (let i = 0; i < 8; i++) {
                const a = (Math.PI * 2 / 8) * i + alpha;
                ctx.beginPath();
                ctx.moveTo(fx.x, fx.y);
                ctx.lineTo(fx.x + Math.cos(a) * fx.size, fx.y + Math.sin(a) * fx.size);
                ctx.stroke();
            }
        }
        else {
            for (let i = 0; i < 4; i++) {
                const a = (Math.PI * 2 / 4) * i + alpha;
                ctx.beginPath();
                ctx.arc(fx.x + Math.cos(a) * fx.size * 0.45, fx.y + Math.sin(a) * fx.size * 0.45, 1.2 + alpha * 1.5, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        ctx.restore();
    }
    for (const fx of g.hostileEffects) {
        const alpha = fx.ttl / fx.maxTtl;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = fx.color;
        ctx.fillStyle = fx.color;
        if (fx.kind === 'gravityPulse' || fx.kind === 'pulseRing') {
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(fx.x, fx.y, fx.radius * (1.2 - alpha * 0.4), 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(fx.x, fx.y, fx.radius * 0.55, 0, Math.PI * 2);
            ctx.stroke();
        }
        else if (fx.kind === 'meteor') {
            ctx.beginPath();
            ctx.moveTo(fx.x - fx.radius * 1.2, fx.y - fx.radius * 1.8);
            ctx.lineTo(fx.x, fx.y);
            ctx.lineTo(fx.x + fx.radius * 0.4, fx.y + fx.radius * 0.2);
            ctx.stroke();
        }
        else {
            roundRect(ctx, fx.x - fx.radius, fx.y - fx.radius * 0.4, fx.radius * 2, fx.radius * 0.8, 6, false, true);
        }
        ctx.restore();
    }
    for (const tg of g.telegraphs) {
        const alpha = Math.min(1, tg.ttl / Math.max(1, tg.maxTtl));
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = tg.color;
        ctx.strokeStyle = tg.danger ? 'rgba(255,210,120,0.95)' : 'rgba(160,240,255,0.85)';
        ctx.lineWidth = 1.6;
        roundRect(ctx, tg.x, tg.y, tg.w, tg.h, 10, true, true);
        ctx.strokeStyle = 'rgba(255,245,230,0.85)';
        ctx.beginPath();
        ctx.moveTo(tg.x + 8, tg.y + 8);
        ctx.lineTo(tg.x + tg.w - 8, tg.y + 8);
        ctx.moveTo(tg.x + 8, tg.y + tg.h - 8);
        ctx.lineTo(tg.x + tg.w - 8, tg.y + tg.h - 8);
        ctx.stroke();
        ctx.fillStyle = 'rgba(255,250,240,' + alpha + ')';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(tg.label, tg.x + tg.w / 2, tg.y + tg.h / 2, Math.max(48, tg.w - 12));
        ctx.restore();
    }
    for (const shot of g.enemyShots) {
        const pulse = 0.68 + Math.sin(shot.life * 0.18) * 0.14;
        const palette = shot.kind === 'meteor'
            ? { glow: 'rgba(255,88,104,0.18)', ring: 'rgba(255,180,120,0.78)', core: '#ff5d6f', mark: 'rgba(255,240,220,0.82)' }
            : shot.kind === 'sweeper'
                ? { glow: 'rgba(255,166,64,0.14)', ring: 'rgba(255,210,120,0.62)', core: '#ffad48', mark: 'rgba(120,40,0,0.72)' }
                : shot.kind === 'minefield'
                    ? { glow: 'rgba(201,140,255,0.18)', ring: 'rgba(222,182,255,0.72)', core: '#c98cff', mark: 'rgba(70,20,110,0.72)' }
                    : { glow: 'rgba(189,120,255,0.16)', ring: 'rgba(206,165,255,0.72)', core: '#a678ff', mark: 'rgba(55,12,95,0.72)' };
        ctx.save();
        ctx.fillStyle = palette.glow;
        ctx.beginPath();
        ctx.arc(shot.x, shot.y, shot.radius + 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = palette.ring;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(shot.x, shot.y, shot.radius + 2 + pulse, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = palette.core;
        ctx.beginPath();
        ctx.arc(shot.x, shot.y, shot.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = palette.mark;
        ctx.lineWidth = shot.kind === 'minefield' ? 1.8 : 1.2;
        if (shot.kind === 'minefield') {
            ctx.beginPath();
            ctx.moveTo(shot.x - shot.radius - 3, shot.y);
            ctx.lineTo(shot.x + shot.radius + 3, shot.y);
            ctx.moveTo(shot.x, shot.y - shot.radius - 3);
            ctx.lineTo(shot.x, shot.y + shot.radius + 3);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(shot.x, shot.y, shot.radius * 0.42, 0, Math.PI * 2);
            ctx.stroke();
        }
        else {
            ctx.beginPath();
            ctx.moveTo(shot.x - shot.radius - 4, shot.y);
            ctx.lineTo(shot.x + shot.radius + 4, shot.y);
            ctx.moveTo(shot.x, shot.y - shot.radius - 4);
            ctx.lineTo(shot.x, shot.y + shot.radius + 4);
            ctx.stroke();
        }
        if (shot.kind === 'meteor') {
            ctx.strokeStyle = 'rgba(255,120,120,0.36)';
            ctx.beginPath();
            ctx.moveTo(shot.x - shot.vx * 3.2, shot.y - shot.vy * 3.2);
            ctx.lineTo(shot.x, shot.y);
            ctx.stroke();
        }
        else if (shot.kind === 'sweeper') {
            ctx.strokeStyle = 'rgba(255,182,92,0.32)';
            ctx.beginPath();
            ctx.moveTo(shot.x - shot.vx * 3.4, shot.y);
            ctx.lineTo(shot.x + shot.vx * 0.4, shot.y);
            ctx.stroke();
        }
        else if (shot.kind === 'minefield') {
            ctx.strokeStyle = 'rgba(210,160,255,0.34)';
            ctx.beginPath();
            ctx.arc(shot.x, shot.y, shot.radius + 10 + pulse * 0.6, 0, Math.PI * 2);
            ctx.stroke();
        }
        ctx.restore();
    }
    renderBossHpBar(g);
    if (g.state.combat.bossCharge.active) {
        const bc = g.state.combat.bossCharge;
        const alpha = Math.min(1, bc.timer / Math.max(1, bc.maxTimer));
        const fill = bc.kind === 'laser' ? 'rgba(255,110,200,' : 'rgba(255,160,90,';
        const x = Math.max(24, bc.bossX + bc.bossW / 2 - 110);
        const y = Math.max(88, bc.bossY - 24);
        ctx.fillStyle = fill + (0.18 + alpha * 0.2) + ')';
        ctx.strokeStyle = fill + (0.85) + ')';
        ctx.lineWidth = 1.5;
        roundRect(ctx, x, y, 220, 16, 8, true, true);
        ctx.fillStyle = bc.kind === 'laser' ? '#ff7bd4' : '#ffb36b';
        roundRect(ctx, x + 2, y + 2, 216 * (1 - alpha), 12, 6, true, false);
        ctx.fillStyle = 'rgba(255,250,240,0.95)';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(`BOSS CHARGE : ${String((bc.kind || 'ATTACK')).toUpperCase()}`, x + 110, y - 4);
    }
    g.warnings.forEach((warning, idx) => {
        const alpha = Math.min(1, warning.ttl / Math.max(1, warning.maxTtl));
        const width = Math.min(360, g.W * 0.38);
        const x = g.W - width - 18;
        const y = 86 + idx * 38;
        const color = warning.severity === 'danger' ? 'rgba(255,95,95,' : warning.severity === 'warn' ? 'rgba(255,186,90,' : 'rgba(113,236,255,';
        ctx.fillStyle = color + (0.18 * alpha) + ')';
        ctx.strokeStyle = color + (0.72 * alpha) + ')';
        ctx.lineWidth = 1.2;
        roundRect(ctx, x, y, width, 28, 10, true, true);
        ctx.fillStyle = 'rgba(240,248,255,' + alpha + ')';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(warning.text, x + 12, y + 14, width - 24);
    });
}
