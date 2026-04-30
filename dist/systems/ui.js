import { I18N } from '../core/constants';
import { logEvent } from './logger';
export function detectLang() {
    return (navigator.language || 'en').toLowerCase().startsWith('ja') ? 'ja' : 'en';
}
export function t(g, key) {
    return I18N[g.prefs.lang][key];
}
export function applyHudVisibility(g) {
    const hud = document.getElementById('hud');
    if (!hud)
        return;
    hud.classList.toggle('is-collapsed', g.state.ui.hudHidden);
    g.ui.hudBtn.textContent = g.state.ui.hudHidden ? 'HUD +' : 'HUD −';
}
export function toggleHud(g, forceHidden) {
    g.state.ui.hudHidden = typeof forceHidden === 'boolean' ? forceHidden : !g.state.ui.hudHidden;
    applyHudVisibility(g);
    logEvent(g, 'info', 'hud toggled', { hidden: g.state.ui.hudHidden });
}
export function overlay(g, text, ms = 900) {
    g.ui.overlayText.textContent = text;
    g.ui.overlay.classList.remove('hidden');
    clearTimeout(overlay._t);
    overlay._t = window.setTimeout(() => g.ui.overlay.classList.add('hidden'), ms);
}
export function updateUI(g) {
    g.ui.labelScore.textContent = t(g, 'score');
    g.ui.labelLives.textContent = t(g, 'lives');
    g.ui.labelStage.textContent = t(g, 'stage');
    g.ui.labelCombo.textContent = t(g, 'combo');
    g.ui.labelBest.textContent = t(g, 'best');
    g.ui.startBtn.textContent = t(g, 'start');
    g.ui.pauseBtn.textContent = t(g, 'pause');
    g.ui.menuBtn.textContent = t(g, 'menu');
    g.ui.recordsBtn.textContent = t(g, 'records');
    g.ui.logsBtn.textContent = t(g, 'logs');
    g.ui.soundBtn.textContent = g.prefs.soundEnabled ? t(g, 'soundOn') : t(g, 'soundOff');
    g.ui.menuTitle.textContent = t(g, 'menuTitle');
    g.ui.menuSub.textContent = t(g, 'menuSub');
    g.ui.controlTitle.textContent = t(g, 'controlTitle');
    g.ui.controlBody.innerHTML = t(g, 'controlBody').replaceAll('\n', '<br>');
    g.ui.recordsTitle.textContent = t(g, 'records');
    g.ui.stageTitle.textContent = t(g, 'stageSelect');
    g.ui.menuStart.textContent = t(g, 'startRun');
    g.ui.menuStageSelect.textContent = t(g, 'stageSelect');
    g.ui.menuRecords.textContent = t(g, 'records');
    g.ui.menuLogs.textContent = t(g, 'logs');
    g.ui.recordsClose.textContent = t(g, 'close');
    g.ui.recordsReset.textContent = t(g, 'resetRecords');
    g.ui.stageClose.textContent = t(g, 'close');
    g.ui.logsClose.textContent = t(g, 'close');
    g.ui.scoreVal.textContent = String(g.state.gameplay.score);
    g.ui.livesVal.textContent = String(g.state.gameplay.lives);
    g.ui.stageVal.textContent = `${g.state.gameplay.stageIndex} · ${t(g, 'stageNames')[(g.state.gameplay.stageIndex - 1) % 4]}`;
    g.ui.comboVal.textContent = String(g.state.gameplay.combo);
    g.ui.bestVal.textContent = String(g.prefs.bestScore);
    applyHudVisibility(g);
}
