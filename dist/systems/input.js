import { launch } from './launch';
import { drawLogs } from './logScreens';
import { toggleHud, updateUI } from './ui';
import { spawnLaserBurst, spawnMissileBurst } from './weapons';
import { syncAttachedBalls } from './balls';
export function initStars(g) {
    g.stars = Array.from({ length: Math.max(100, Math.floor(g.W * g.H / 18000)) }, () => ({
        x: Math.random() * g.W, y: Math.random() * g.H, r: Math.random() * 1.8 + 0.5, a: Math.random() * 6.28, s: Math.random() * 0.3 + 0.05, h: Math.random() > 0.5 ? 190 : 310
    }));
}
export function resizeGame(g) {
    g.W = innerWidth;
    g.H = innerHeight;
    g.canvas.width = g.W;
    g.canvas.height = g.H;
    g.paddle.y = g.H - 56;
    g.paddle.x = Math.min(Math.max(g.paddle.x || ((g.W - g.paddle.w) / 2), 10), g.W - g.paddle.w - 10);
    initStars(g);
    if (g.state.gameplay.awaitingLaunch)
        syncAttachedBalls(g);
}
export function bindInput(g) {
    addEventListener('resize', () => resizeGame(g));
    addEventListener('pointermove', e => {
        g.state.gameplay.mouseActive = true;
        g.paddle.x = Math.max(10, Math.min(g.W - g.paddle.w - 10, e.clientX - g.paddle.w / 2));
    });
    addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') {
            g.state.input.keys.left = true;
            g.state.gameplay.mouseActive = false;
        }
        if (e.key === 'ArrowRight') {
            g.state.input.keys.right = true;
            g.state.gameplay.mouseActive = false;
        }
        if (e.code === 'Space') {
            e.preventDefault();
            launch(g);
        }
        if (e.key.toLowerCase() === 'p') {
            g.state.gameplay.paused = !g.state.gameplay.paused;
            updateUI(g);
        }
        if (e.key.toLowerCase() === 'h') {
            e.preventDefault();
            e.stopPropagation();
            toggleHud(g);
        }
        if (e.key.toLowerCase() === 'l' && e.shiftKey) {
            drawLogs(g);
            g.ui.logs.classList.remove('hidden');
        }
        if (e.key.toLowerCase() === 'z' && g.state.combat.laserTimer > 0)
            spawnLaserBurst(g);
        if (e.key.toLowerCase() === 'x' && g.state.combat.missileTimer > 0)
            spawnMissileBurst(g);
    });
    addEventListener('keyup', e => {
        if (e.key === 'ArrowLeft')
            g.state.input.keys.left = false;
        if (e.key === 'ArrowRight')
            g.state.input.keys.right = false;
    });
    g.canvas.addEventListener('click', () => launch(g));
}
