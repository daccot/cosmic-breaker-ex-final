export const BALL_TRAIT_DEFINITIONS = {
    normal: { trait: 'normal', color: '#8ff7ff', trail: 'rgba(143,247,255,.22)', scoreBonus: 0, pierceChance: 0 },
    plasma: { trait: 'plasma', color: '#ff93f6', trail: 'rgba(255,147,246,.20)', scoreBonus: 18, pierceChance: 0 },
    heavy: { trait: 'heavy', color: '#b8ff83', trail: 'rgba(184,255,131,.22)', scoreBonus: 0, pierceChance: 0, alwaysPierce: true },
    ghost: { trait: 'ghost', color: '#ffd56e', trail: 'rgba(255,213,110,.20)', scoreBonus: 0, pierceChance: 0.35 },
    nova: { trait: 'nova', color: '#9db2ff', trail: 'rgba(157,178,255,.22)', scoreBonus: 26, pierceChance: 0 },
};
export const BALL_TRAIT_SEQUENCE = ['normal', 'plasma', 'heavy', 'ghost', 'nova'];
