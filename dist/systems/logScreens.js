import { getStageDefinition, getStageGimmicks } from '../data/stageDefinitions';
import { t } from './ui';
export function drawLogs(g) {
    g.ui.logsGrid.innerHTML = g.logs.slice().reverse().map(item => {
        const extra = item.extra ? JSON.stringify(item.extra) : '';
        return `<div class="recordCell"><div style="font-size:11px;color:#9fc0d4;margin-bottom:4px">${item.ts} / ${item.type.toUpperCase()}</div><div style="font-size:14px;font-weight:700;margin-bottom:4px">${item.message}</div><div style="font-size:12px;color:#d7e7f0;word-break:break-all">${extra}</div></div>`;
    }).join('') || '<div class="recordCell"><div style="font-size:14px">No logs yet.</div></div>';
}
export function exportLogs(g) {
    const blob = new Blob([JSON.stringify(g.logs, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'cosmic_breaker_log.json';
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
export function drawRecords(g) {
    g.ui.recordsGrid.innerHTML = [
        [t(g, 'best'), g.prefs.bestScore],
        ['Play Count', g.prefs.playCount],
        [t(g, 'stage'), getStageDefinition(g.state.gameplay.stageIndex).name[g.prefs.lang]],
        [t(g, 'lives'), g.state.gameplay.lives],
        ['Gimmicks', getStageGimmicks(g.state.gameplay.stageIndex).map(gimmick => gimmick.label).join(', ') || '-']
    ].map(([k, v]) => `<div class="recordCell"><div style="font-size:12px;color:#9fc0d4;margin-bottom:4px">${k}</div><div style="font-size:24px;font-weight:900">${v}</div></div>`).join('');
}
export function drawStageGrid(g, onPick) {
    g.ui.stageGrid.innerHTML = [1, 2, 3, 4].map(i => {
        const def = getStageDefinition(i);
        return `<div class="stageCard" data-stage="${i}">
      <div class="info">
        <div style="font-size:12px;color:#b7d1df;margin-bottom:6px">STAGE ${i}</div>
        <div style="font-size:24px;font-weight:900">${def.name[g.prefs.lang]}</div>
        <div style="margin-top:8px;color:#d8e7ef;line-height:1.5">${def.description[g.prefs.lang]}</div>
        <div style="margin-top:8px;color:#9fc0d4;font-size:12px">${getStageGimmicks(i).map(gimmick => gimmick.label).join(' / ')}</div>
      </div>
    </div>`;
    }).join('');
    Array.from(g.ui.stageGrid.querySelectorAll('.stageCard')).forEach(el => { el.addEventListener('click', () => onPick(Number(el.dataset.stage || '1'))); });
}
