import { DIFF } from '../core/constants';
import { getStageDefinition, getStageGimmicks } from '../data/stageDefinitions';
import { BLOCK_DEFINITIONS } from '../data/blockDefinitions';
import { startMusic, stopMusic } from './audio';
import { resetBall } from './balls';
import { logEvent } from './logger';
import { savePrefs } from './persistence';
import { updateUI, overlay, t } from './ui';
import { applyStageGimmickEffects, resetStageRuntimeModifiers, resolveBlockResistance } from './stageGimmickInterpreter';
import { pushWarning } from './warnings';
export function stageName(g, i) { return getStageDefinition(i).name[g.prefs.lang]; }
export function applyStageGimmicks(g, stage) {
    const gimmicks = getStageGimmicks(stage);
    g.state.stageRuntime.stageId = stage;
    resetStageRuntimeModifiers(g);
    applyStageGimmickEffects(g, gimmicks);
}
export function setDifficulty(g, diff) {
    g.state.gameplay.difficulty = diff;
    g.state.gameplay.lives = DIFF[diff].lives;
    g.paddle.w = DIFF[diff].paddle;
}
function resolveBlockType(ch, charMap) {
    if (charMap && charMap[ch])
        return charMap[ch];
    return 'core';
}
export function spawnStage(g, stage) {
    g.state.gameplay.stageIndex = stage;
    g.blocks = [];
    g.drops = [];
    g.lasers = [];
    g.missiles = [];
    g.enemyShots = [];
    g.blockBursts = [];
    const stageDef = getStageDefinition(stage);
    applyStageGimmicks(g, stage);
    g.state.stageRuntime.stageThemeName = stageDef.name[g.prefs.lang];
    if (stageDef.audioTheme)
        g.state.stageRuntime.audioThemeKey = stageDef.audioTheme;
    const { top, cols, rows, gap, side, eliteRuleOffset, pattern, charMap, skipRules = [], blockHeight } = stageDef.layout;
    const bw = Math.floor((g.W - side - side - (cols - 1) * gap) / cols), bh = blockHeight || 18;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const ch = pattern?.[r]?.[c] || '.';
            const skipped = ch === '.' || ch === ' ' || skipRules.some(rule => rule.row === r && c % rule.mod === rule.equals);
            if (skipped)
                continue;
            const type = resolveBlockType(ch.toUpperCase(), charMap);
            const def = BLOCK_DEFINITIONS[type];
            const defaultHp = (r + stage + eliteRuleOffset + (/[A-Z]/.test(ch) ? 1 : 0)) % 3 === 0 ? 2 : 1;
            const hp = def.hp || defaultHp;
            g.blocks.push({
                x: side + c * (bw + gap), y: top + r * (bh + gap), w: bw, h: bh, hp, maxHp: hp,
                type,
                resistance: resolveBlockResistance(g, r, c),
                armor: def.armor || 0,
                tags: def.tags || [],
                bossPhase: type === 'boss' ? 1 : 0
            });
        }
    }
    resetBall(g);
    pushWarning(g, `${g.state.stageRuntime.stageThemeName || stageDef.name[g.prefs.lang]} theme online`, 'info', 120);
    for (const warning of g.state.stageRuntime.gimmickWarnings) {
        pushWarning(g, warning.text, warning.severity, 220);
    }
    updateUI(g);
}
export async function startRun(g, stage = 1) {
    logEvent(g, 'info', 'start run requested', { stage, difficulty: g.ui.difficultySelect.value || g.state.gameplay.difficulty });
    closeMenu(g);
    g.ui.records.classList.add('hidden');
    g.ui.stageSelect.classList.add('hidden');
    g.ui.logs.classList.add('hidden');
    g.prefs.playCount += 1;
    g.forcedDropCounter = 0;
    await savePrefs(g);
    g.state.gameplay.score = 0;
    g.state.gameplay.combo = 0;
    g.state.gameplay.gameOver = false;
    g.state.gameplay.paused = false;
    g.state.gameplay.started = true;
    g.state.combat.barrierCharges = 0;
    g.state.combat.bigBallTimer = 0;
    g.state.combat.laserTimer = 0;
    g.state.combat.magnetTimer = 0;
    g.state.combat.missileTimer = 0;
    resetStageRuntimeModifiers(g);
    setDifficulty(g, g.ui.difficultySelect.value || 'normal');
    g.paddle.x = (g.W - g.paddle.w) / 2;
    g.paddle.y = g.H - 56;
    spawnStage(g, stage);
    g.state.gameplay.running = true;
    startMusic(g);
    overlay(g, stageName(g, stage), 900);
    updateUI(g);
}
export function openMenu(g) { g.ui.menu.classList.remove('hidden'); g.state.gameplay.running = false; logEvent(g, 'info', 'menu opened'); }
export function closeMenu(g) { g.ui.menu.classList.add('hidden'); logEvent(g, 'info', 'menu closed'); updateUI(g); }
export function loseLife(g) {
    logEvent(g, 'warn', 'life lost', { livesBefore: g.state.gameplay.lives });
    if (g.state.combat.barrierCharges > 0) {
        g.state.combat.barrierCharges -= 1;
        resetBall(g);
        overlay(g, 'BARRIER SAVE', 650);
        updateUI(g);
        return;
    }
    g.state.gameplay.lives -= 1;
    g.state.gameplay.combo = 0;
    if (g.state.gameplay.lives <= 0) {
        g.state.gameplay.gameOver = true;
        g.state.gameplay.running = false;
        stopMusic(g);
        overlay(g, t(g, 'gameOver'), 1200);
        return;
    }
    resetBall(g);
    updateUI(g);
}
export function stageClear(g) {
    logEvent(g, 'info', 'stage clear', { stage: g.state.gameplay.stageIndex, score: g.state.gameplay.score });
    g.state.gameplay.running = false;
    g.prefs.bestScore = Math.max(g.prefs.bestScore, g.state.gameplay.score);
    void savePrefs(g);
    for (let i = 0; i < 12; i++) {
        const x = 40 + Math.random() * (g.W - 80);
        const y = 110 + Math.random() * (g.H * 0.42);
        g.blockBursts.push({ x, y, color: i % 2 ? '#8ff7ff' : '#ff9ad5', ttl: 45 + i * 2, maxTtl: 45 + i * 2, size: 18 + i * 2, style: i % 3 === 0 ? 'ring' : (i % 3 === 1 ? 'spark' : 'shard') });
    }
    pushWarning(g, 'Stage cleared - hyperspace lane open', 'info', 140);
    overlay(g, t(g, 'stageClear'), 1300);
    setTimeout(() => { const next = g.state.gameplay.stageIndex >= 4 ? 1 : g.state.gameplay.stageIndex + 1; void startRun(g, next); }, 1300);
}
