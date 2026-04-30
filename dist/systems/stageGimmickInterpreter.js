function ensureTraitModifier(g, trait) {
    if (!g.state.stageRuntime.traitModifiers[trait])
        g.state.stageRuntime.traitModifiers[trait] = { scoreBonus: 0, pierceBonus: 0, damageScale: 1 };
    return g.state.stageRuntime.traitModifiers[trait];
}
const handlers = {
    modifyDropRate(g, effect) { g.state.combat.stageDropRateModifier += effect.amount; },
    modifyBallSpeed(g, effect) { g.state.combat.stageBallSpeedModifier *= effect.multiplier; },
    modifyMagnetRange(g, effect) { g.state.combat.stageMagnetRangeBonus += effect.amount; },
    shiftThemeHue(g, effect) { g.state.combat.stageThemeHueShift += effect.amount; },
    enableAutoWeapon(g, effect) {
        g.state.combat.stageAutoWeapon = effect.weapon;
        g.state.combat.stageAutoWeaponCooldownScale *= effect.cooldownScale || 1;
        g.state.combat.stageAutoWeaponCooldown = 0;
    },
    applyDropBias(g, effect) { g.state.stageRuntime.dropBiases[effect.drop] = (g.state.stageRuntime.dropBiases[effect.drop] || 0) + effect.weightDelta; },
    applyTraitModifier(g, effect) {
        const mod = ensureTraitModifier(g, effect.trait);
        mod.scoreBonus += effect.scoreBonus || 0;
        mod.pierceBonus += effect.pierceBonus || 0;
        mod.damageScale *= effect.damageScale || 1;
    },
    setBlockResistance(g, effect) {
        const rule = { label: effect.label, traits: effect.traits, damageScale: effect.damageScale, rows: effect.rows, modulo: effect.modulo, equals: effect.equals, color: effect.color };
        g.state.stageRuntime.blockResistanceRules.push(rule);
    },
    pushWarning(g, effect) { g.state.stageRuntime.gimmickWarnings.push({ text: effect.text, severity: effect.severity || 'warn' }); },
    enableHostilePattern(g, effect) {
        const runtime = { id: effect.id, label: effect.label, type: effect.patternType, cooldown: effect.cooldown, timer: effect.cooldown, severity: effect.severity || 'warn' };
        g.state.stageRuntime.hostilePatterns.push(runtime);
    },
    setAudioTheme(g, effect) { g.state.stageRuntime.audioThemeKey = effect.themeKey; }
};
export function resetStageRuntimeModifiers(g) {
    g.state.combat.stageDropRateModifier = 0;
    g.state.combat.stageBallSpeedModifier = 1;
    g.state.combat.stageMagnetRangeBonus = 0;
    g.state.combat.stageThemeHueShift = 0;
    g.state.combat.stageAutoWeapon = null;
    g.state.combat.stageAutoWeaponCooldown = 0;
    g.state.combat.stageAutoWeaponCooldownScale = 1;
    g.state.stageRuntime.gimmickWarnings = [];
    g.state.stageRuntime.dropBiases = {};
    g.state.stageRuntime.traitModifiers = {};
    g.state.stageRuntime.blockResistanceRules = [];
    g.state.stageRuntime.hostilePatterns = [];
    g.state.stageRuntime.audioThemeKey = 'frost';
    g.state.stageRuntime.stageThemeName = '';
}
export function applyStageGimmickEffects(g, gimmicks) {
    g.state.stageRuntime.activeGimmicks = gimmicks.map(gm => gm.id);
    for (const gimmick of gimmicks) {
        for (const effect of gimmick.effects) {
            const handler = handlers[effect.kind];
            handler(g, effect);
        }
    }
}
export function resolveBlockResistance(g, row, col) {
    for (const rule of g.state.stageRuntime.blockResistanceRules) {
        if (rule.rows && !rule.rows.includes(row))
            continue;
        if (typeof rule.modulo === 'number' && typeof rule.equals === 'number' && col % rule.modulo !== rule.equals)
            continue;
        return { label: rule.label, traits: rule.traits, damageScale: rule.damageScale, color: rule.color };
    }
    return null;
}
