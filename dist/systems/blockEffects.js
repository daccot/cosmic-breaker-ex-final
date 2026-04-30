export function spawnBlockBurst(g, blk) {
    const colors = blk.resistance?.color || '#ffffff';
    g.blockBursts.push({ x: blk.x + blk.w / 2, y: blk.y + blk.h / 2, color: colors, ttl: 18, maxTtl: 18, size: Math.max(12, blk.w * 0.55), style: 'ring' }, { x: blk.x + blk.w / 2, y: blk.y + blk.h / 2, color: colors, ttl: 24, maxTtl: 24, size: Math.max(10, blk.w * 0.45), style: 'spark' }, { x: blk.x + blk.w / 2, y: blk.y + blk.h / 2, color: colors, ttl: 28, maxTtl: 28, size: Math.max(10, blk.w * 0.65), style: blk.type === 'boss' ? 'boss' : 'shard' });
}
export function updateBlockEffects(g) {
    for (let i = g.blockBursts.length - 1; i >= 0; i--) {
        g.blockBursts[i].ttl -= 1;
        if (g.blockBursts[i].ttl <= 0)
            g.blockBursts.splice(i, 1);
    }
}
