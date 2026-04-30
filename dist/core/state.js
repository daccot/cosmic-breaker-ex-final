import { createUIRefs } from './dom';
export function createContext() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const prefs = { lang: 'en', soundEnabled: true, bestScore: 0, playCount: 0 };
    const state = {
        gameplay: {
            started: false, running: false, paused: false, awaitingLaunch: true, gameOver: false,
            stageIndex: 1, difficulty: 'normal', score: 0, lives: 5, combo: 0, mouseActive: true, lastBounceDir: 1,
        },
        ui: { hudHidden: false },
        combat: {
            magnetTimer: 0, laserTimer: 0, bigBallTimer: 0,
            laserCooldown: 0, missileTimer: 0, missileCooldown: 0, barrierCharges: 0,
            stageDropRateModifier: 0, stageBallSpeedModifier: 1, stageMagnetRangeBonus: 0, stageThemeHueShift: 0,
            stageAutoWeapon: null, stageAutoWeaponCooldown: 0, stageAutoWeaponCooldownScale: 1, bossAttackCooldown: 180, bossCharge: { active: false, timer: 0, maxTimer: 0, kind: null, bossX: 0, bossY: 0, bossW: 0, bossH: 0 }
        },
        input: { keys: { left: false, right: false } },
        stageRuntime: { stageId: 1, activeGimmicks: [], gimmickWarnings: [], dropBiases: {}, traitModifiers: {}, blockResistanceRules: [], hostilePatterns: [], audioThemeKey: 'frost', stageThemeName: '' }
    };
    const paddle = { x: 0, y: 0, w: 150, h: 16, speed: 8, powerTimer: 0, powerType: '' };
    return {
        canvas,
        ctx,
        W: innerWidth,
        H: innerHeight,
        ui: createUIRefs(),
        prefs,
        state,
        paddle,
        balls: [],
        blocks: [],
        drops: [],
        lasers: [],
        missiles: [],
        enemyShots: [],
        hostileEffects: [],
        telegraphs: [],
        stars: [],
        blockBursts: [],
        warnings: [],
        logs: [],
        forcedDropCounter: 0,
        audioCtx: null,
        musicTimer: null
    };
}
