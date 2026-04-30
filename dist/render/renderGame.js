import { renderBackground } from './renderBackground';
import { renderBlocks } from './renderBlocks';
import { renderDrops } from './renderDrops';
import { renderPaddle } from './renderPaddle';
import { renderWeapons } from './renderWeapons';
import { renderBalls } from './renderBalls';
import { renderEffects } from './renderEffects';
export function renderGame(g) {
    g.ctx.clearRect(0, 0, g.W, g.H);
    renderBackground(g);
    renderBlocks(g);
    renderDrops(g);
    renderPaddle(g);
    renderWeapons(g);
    renderBalls(g);
    renderEffects(g);
}
