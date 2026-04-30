import { launch } from './launch';
import { drawLogs, drawRecords, drawStageGrid, exportLogs } from './logScreens';
import { logEvent } from './logger';
import { savePrefs } from './persistence';
import { startMusic, stopMusic } from './audio';
import { closeMenu, openMenu, startRun } from './stage';
import { toggleHud, updateUI } from './ui';
export function openRecordsScreen(g) {
    drawRecords(g);
    g.ui.records.classList.remove('hidden');
}
export function openStageSelectScreen(g) {
    drawStageGrid(g, s => void startRun(g, s));
    g.ui.stageSelect.classList.remove('hidden');
}
export function openLogsScreen(g) {
    drawLogs(g);
    g.ui.logs.classList.remove('hidden');
}
export function closeModalScreens(g) {
    g.ui.records.classList.add('hidden');
    g.ui.stageSelect.classList.add('hidden');
    g.ui.logs.classList.add('hidden');
}
export function bindScreenUI(g) {
    g.ui.startBtn.onclick = () => {
        logEvent(g, 'info', 'hud start click', { started: g.state.gameplay.started, gameOver: g.state.gameplay.gameOver });
        if (g.state.gameplay.gameOver) {
            void startRun(g, 1);
            return;
        }
        if (!g.state.gameplay.started || !g.ui.menu.classList.contains('hidden'))
            void startRun(g, g.state.gameplay.stageIndex || 1);
        else {
            g.state.gameplay.running = true;
            g.state.gameplay.paused = false;
            launch(g);
            updateUI(g);
        }
    };
    g.ui.pauseBtn.onclick = () => {
        g.state.gameplay.paused = !g.state.gameplay.paused;
        updateUI(g);
    };
    g.ui.menuBtn.onclick = () => {
        if (g.ui.menu.classList.contains('hidden'))
            openMenu(g);
        else
            closeMenu(g);
    };
    g.ui.recordsBtn.onclick = () => openRecordsScreen(g);
    g.ui.hudBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleHud(g);
    };
    g.ui.logsBtn.onclick = () => openLogsScreen(g);
    g.ui.langBtn.onclick = async () => {
        g.prefs.lang = g.prefs.lang === 'ja' ? 'en' : 'ja';
        await savePrefs(g);
        updateUI(g);
        drawStageGrid(g, s => void startRun(g, s));
        drawRecords(g);
    };
    g.ui.soundBtn.onclick = async () => {
        g.prefs.soundEnabled = !g.prefs.soundEnabled;
        if (g.prefs.soundEnabled)
            startMusic(g);
        else
            stopMusic(g);
        await savePrefs(g);
        updateUI(g);
    };
    g.ui.menuStart.onclick = () => void startRun(g, 1);
    g.ui.menuStageSelect.onclick = () => openStageSelectScreen(g);
    g.ui.menuRecords.onclick = () => openRecordsScreen(g);
    g.ui.menuLogs.onclick = () => openLogsScreen(g);
    g.ui.recordsClose.onclick = () => g.ui.records.classList.add('hidden');
    g.ui.recordsReset.onclick = async () => {
        g.prefs.bestScore = 0;
        g.prefs.playCount = 0;
        await savePrefs(g);
        drawRecords(g);
        updateUI(g);
    };
    g.ui.stageClose.onclick = () => g.ui.stageSelect.classList.add('hidden');
    g.ui.logsClose.onclick = () => g.ui.logs.classList.add('hidden');
    g.ui.logsExport.onclick = () => exportLogs(g);
    g.ui.logsClear.onclick = () => {
        g.logs.length = 0;
        drawLogs(g);
    };
    g.ui.difficultySelect.onchange = () => {
        g.state.gameplay.difficulty = g.ui.difficultySelect.value;
    };
}
