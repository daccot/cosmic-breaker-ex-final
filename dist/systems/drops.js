import { DROP_DEFINITIONS, GUARANTEED_DROP_SEQUENCE, WEIGHTED_DROP_SEQUENCE } from '../data/dropDefinitions';
import { beep } from './audio';
import { logEvent } from './logger';
import { applyInterpretedDropEffects } from './dropInterpreter';
import { overlay } from './ui';
export function chooseWeightedDrop(g) {
    const adjusted = WEIGHTED_DROP_SEQUENCE.map(item => ({
        type: item.type,
        weight: Math.max(1, item.weight + (g.state.stageRuntime.dropBiases[item.type] || 0))
    }));
    const total = adjusted.reduce((sum, item) => sum + item.weight, 0);
    let roll = Math.random() * total;
    for (const item of adjusted) {
        roll -= item.weight;
        if (roll <= 0)
            return item.type;
    }
    return 'score';
}
export function maybeSpawnDrop(g, blk) {
    g.forcedDropCounter += 1;
    const guaranteed = g.forcedDropCounter <= GUARANTEED_DROP_SEQUENCE.length;
    const dropChance = Math.min(0.95, 0.72 + (g.state.combat.stageDropRateModifier || 0));
    if (!guaranteed && Math.random() > dropChance)
        return;
    const type = guaranteed ? GUARANTEED_DROP_SEQUENCE[g.forcedDropCounter - 1] : chooseWeightedDrop(g);
    g.drops.push({ x: blk.x + blk.w / 2, y: blk.y + blk.h / 2, vy: 1.9, type, t: 0 });
    logEvent(g, 'info', 'drop spawned', { type, guaranteed, count: g.forcedDropCounter, stageDropRateModifier: g.state.combat.stageDropRateModifier, dropBiases: g.state.stageRuntime.dropBiases });
}
export function applyDrop(g, type) {
    const def = DROP_DEFINITIONS[type];
    logEvent(g, 'info', 'drop applied', { type });
    applyInterpretedDropEffects(g, def.effects);
    overlay(g, def.overlay, 550);
    beep(g, 1180, 0.06, 'triangle', 0.03);
}
