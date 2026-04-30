import { DIFF } from '../core/constants';
import { createBall } from './balls';
import { ensureAudio, stageBeep } from './audio';
export function launch(g) {
    if (g.state.gameplay.gameOver)
        return;
    if (!g.state.gameplay.started) {
        void import('./stage').then(m => m.startRun(g, g.state.gameplay.stageIndex || 1));
        return;
    }
    if (g.state.gameplay.awaitingLaunch) {
        ensureAudio(g);
        stageBeep(g, 'launch', 560, 0.06, 'triangle', 0.03);
        g.state.gameplay.awaitingLaunch = false;
        const sp = DIFF[g.state.gameplay.difficulty].ball * 0.7;
        const launchDir = Math.random() > .5 ? 1 : -1;
        g.state.gameplay.lastBounceDir = launchDir;
        if (!g.balls.length)
            g.balls = [createBall(g, 0)];
        g.balls.forEach((ball, idx) => {
            const spread = idx - ((g.balls.length - 1) / 2);
            ball.vx = (launchDir * sp * 0.46) + (spread * 0.88);
            ball.vy = -sp * (0.64 + Math.min(0.2, Math.abs(spread) * 0.07));
        });
    }
}
