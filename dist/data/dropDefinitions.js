export const DROP_DEFINITIONS = {
    wide: { type: 'wide', weight: 15, guaranteedOrder: 1, overlay: 'WIDE', draw: { colors: ['#71ecff', '#2f84ff'], mark: 'W' }, effects: [{ kind: 'setPaddleWidth', amount: 30, max: 230, powerType: 'WIDE', powerTimer: 600 }] },
    slow: { type: 'slow', weight: 12, guaranteedOrder: 2, overlay: 'SLOW', draw: { colors: ['#d2b8ff', '#7f6dff'], mark: 'S' }, effects: [{ kind: 'scaleBallVelocity', factor: 0.86, powerType: 'SLOW', powerTimer: 320 }] },
    score: { type: 'score', weight: 13, guaranteedOrder: 3, overlay: '+500', draw: { colors: ['#ffe07a', '#ff9d36'], mark: '$' }, effects: [{ kind: 'addScore', amount: 500 }] },
    life: { type: 'life', weight: 6, guaranteedOrder: 4, overlay: '1UP', draw: { colors: ['#9bffad', '#45c970'], mark: '+1' }, effects: [{ kind: 'grantLifeOrScore', lifeCapOffset: 3, score: 300 }] },
    expand: { type: 'expand', weight: 13, guaranteedOrder: 5, overlay: 'EXPAND', draw: { colors: ['#9de7ff', '#00b8ff'], mark: 'E' }, effects: [{ kind: 'setPaddleWidth', amount: 56, max: 270, powerType: 'EXPAND', powerTimer: 760 }] },
    barrier: { type: 'barrier', weight: 8, guaranteedOrder: 6, overlay: 'BARRIER', draw: { colors: ['#c8ffae', '#65d65e'], mark: 'B' }, effects: [{ kind: 'addBarrier', amount: 1, max: 2, score: 180 }] },
    multi: { type: 'multi', weight: 10, guaranteedOrder: 7, overlay: 'MULTI BALL', draw: { colors: ['#ffd7ff', '#ff66d9'], mark: 'M' }, effects: [{ kind: 'spawnMultiball', successScore: 280, failScore: 100, combo: 3 }] },
    magnet: { type: 'magnet', weight: 12, guaranteedOrder: 8, overlay: 'MAGNET', draw: { colors: ['#b6ffd8', '#12c7a5'], mark: 'G' }, effects: [{ kind: 'setCombatTimer', timer: 'magnetTimer', value: 540, powerType: 'MAGNET', powerTimer: 540 }, { kind: 'addScore', amount: 120 }] },
    laser: { type: 'laser', weight: 10, guaranteedOrder: 9, overlay: 'LASER', draw: { colors: ['#ffb6ff', '#ff4bcc'], mark: 'L' }, effects: [{ kind: 'setCombatTimer', timer: 'laserTimer', value: 540, cooldownKey: 'laserCooldown', cooldownValue: 0 }, { kind: 'spawnWeapon', weapon: 'laser' }] },
    bigball: { type: 'bigball', weight: 10, guaranteedOrder: 10, overlay: 'BIG BALL', draw: { colors: ['#c2d4ff', '#6f8fff'], mark: 'O' }, effects: [{ kind: 'setCombatTimer', timer: 'bigBallTimer', value: 620 }, { kind: 'applyBigBallState' }] },
    missile: { type: 'missile', weight: 11, guaranteedOrder: 11, overlay: 'MISSILE', draw: { colors: ['#ffd1a1', '#ff7f3f'], mark: 'X' }, effects: [{ kind: 'setCombatTimer', timer: 'missileTimer', value: 620, cooldownKey: 'missileCooldown', cooldownValue: 0 }, { kind: 'spawnWeapon', weapon: 'missile' }] },
    pierce: { type: 'pierce', weight: 8, overlay: 'PIERCE', draw: { colors: ['#ffb6a0', '#ff5d5d'], mark: 'P' }, effects: [{ kind: 'setPaddleWidth', amount: 0, max: 999, powerType: 'PIERCE', powerTimer: 420 }, { kind: 'addScore', amount: 350 }] },
    fast: { type: 'fast', weight: 8, overlay: 'FAST', draw: { colors: ['#fff1a8', '#ffb300'], mark: 'F' }, effects: [{ kind: 'boostBallVelocity', minBaseMultiplier: 0.9, scale: 1.17 }] }
};
export const GUARANTEED_DROP_SEQUENCE = Object.values(DROP_DEFINITIONS)
    .filter(def => typeof def.guaranteedOrder === 'number')
    .sort((a, b) => (a.guaranteedOrder - b.guaranteedOrder))
    .map(def => def.type);
export const WEIGHTED_DROP_SEQUENCE = Object.values(DROP_DEFINITIONS).map(def => ({ type: def.type, weight: def.weight }));
