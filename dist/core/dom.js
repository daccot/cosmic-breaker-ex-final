export function byId(id) {
    const el = document.getElementById(id);
    if (!el)
        throw new Error(`Missing element: ${id}`);
    return el;
}
export function createUIRefs() {
    return {
        scoreVal: byId('scoreVal'), livesVal: byId('livesVal'), stageVal: byId('stageVal'), comboVal: byId('comboVal'), bestVal: byId('bestVal'),
        labelScore: byId('labelScore'), labelLives: byId('labelLives'), labelStage: byId('labelStage'), labelCombo: byId('labelCombo'), labelBest: byId('labelBest'),
        startBtn: byId('startBtn'), pauseBtn: byId('pauseBtn'), menuBtn: byId('menuBtn'), recordsBtn: byId('recordsBtn'), hudBtn: byId('hudBtn'), difficultySelect: byId('difficultySelect'),
        langBtn: byId('langBtn'), soundBtn: byId('soundBtn'), logsBtn: byId('logsBtn'), miniTip: byId('miniTip'),
        menu: byId('menu'), menuTitle: byId('menuTitle'), menuSub: byId('menuSub'), menuStart: byId('menuStart'), menuStageSelect: byId('menuStageSelect'), menuRecords: byId('menuRecords'), menuLogs: byId('menuLogs'),
        controlTitle: byId('controlTitle'), controlBody: byId('controlBody'),
        records: byId('records'), recordsTitle: byId('recordsTitle'), recordsGrid: byId('recordsGrid'), recordsClose: byId('recordsClose'), recordsReset: byId('recordsReset'),
        stageSelect: byId('stageSelect'), stageTitle: byId('stageTitle'), stageGrid: byId('stageGrid'), stageClose: byId('stageClose'),
        logs: byId('logs'), logsTitle: byId('logsTitle'), logsGrid: byId('logsGrid'), logsClose: byId('logsClose'), logsExport: byId('logsExport'), logsClear: byId('logsClear'),
        overlay: byId('overlay'), overlayText: byId('overlayText')
    };
}
