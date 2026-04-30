import { loseLife } from './stage';
import { pushWarning } from './warnings';
import { stageBeep } from './audio';
function spawnHostileEffect(g, x, y, radius, color, kind, ttl = 34) {
    g.hostileEffects.push({ x, y, radius, color, kind, ttl, maxTtl: ttl });
}
function addTelegraph(g, data, ttl = 42) {
    g.telegraphs.push({ ...data, ttl, maxTtl: ttl });
}
function getDifficultyScale(g) {
    const diff = g.state.gameplay.difficulty;
    const map = { supereasy: { count: 0.85, speed: 0.86, cooldown: 1.18 }, easy: { count: 0.95, speed: 0.93, cooldown: 1.08 }, normal: { count: 1, speed: 1, cooldown: 1 }, hard: { count: 1.15, speed: 1.12, cooldown: 0.88 }, hell: { count: 1.35, speed: 1.26, cooldown: 0.76 } };
    return map[diff];
}
function previewPattern(g, pattern) {
    if (pattern.type === 'meteor') {
        for (let i = 0; i < 3; i++) {
            const x = 80 + (g.W - 160) * (i + 1) / 4;
            addTelegraph(g, { x: x - 18, y: 86, w: 36, h: g.H - 130, color: 'rgba(255,90,90,0.22)', label: 'METEOR', danger: true }, 34);
        }
    }
    else if (pattern.type === 'sweeper') {
        const y = 120 + ((pattern.timer * 13) % 140);
        addTelegraph(g, { x: 26, y: y - 18, w: g.W - 52, h: 36, color: 'rgba(255,140,80,0.22)', label: 'SWEEPER', danger: true }, 34);
    }
    else if (pattern.type === 'gravityPulse') {
        addTelegraph(g, { x: g.W * 0.5 - 120, y: g.H * 0.35 - 120, w: 240, h: 240, color: 'rgba(160,130,255,0.18)', label: 'PULSE', danger: true }, 34);
    }
    else if (pattern.type === 'minefield') {
        addTelegraph(g, { x: 60, y: 110, w: g.W - 120, h: 110, color: 'rgba(255,214,120,0.16)', label: 'MINES', danger: true }, 40);
    }
    else if (pattern.type === 'pulseRing') {
        addTelegraph(g, { x: g.W * 0.5 - 150, y: g.H * 0.45 - 150, w: 300, h: 300, color: 'rgba(255,124,191,0.16)', label: 'RING', danger: true }, 38);
    }
}
function spawnMeteor(g) {
    const scale = getDifficultyScale(g);
    const shots = Math.max(2, Math.round((2 + Math.floor(Math.random() * 2)) * scale.count));
    for (let i = 0; i < shots; i++) {
        g.enemyShots.push({ x: 40 + Math.random() * (g.W - 80), y: 86, vx: (Math.random() - 0.5) * 0.9 * scale.speed, vy: (3.8 + Math.random() * 1.2) * scale.speed, life: 220, radius: 6, color: '#ff4d6d', damage: 1, kind: 'meteor' });
    }
    spawnHostileEffect(g, g.W * 0.5, 96, 90, '#ff8a8a', 'meteor');
}
function spawnSweeper(g) {
    const scale = getDifficultyScale(g);
    const fromLeft = Math.random() > 0.5;
    const y = 120 + Math.random() * 120;
    for (let i = 0; i < 4; i++) {
        g.enemyShots.push({ x: fromLeft ? -20 - i * 22 : g.W + 20 + i * 22, y: y + i * 16, vx: (fromLeft ? 5.4 : -5.4) * scale.speed, vy: 0.15, life: 180, radius: 7, color: '#ff9276', damage: 1, kind: 'sweeper' });
    }
    spawnHostileEffect(g, g.W * 0.5, y, 80, '#ff9d76', 'sweeper');
}
function applyGravityPulse(g) {
    const scale = getDifficultyScale(g);
    spawnHostileEffect(g, g.W * 0.5, g.H * 0.35, 120, '#a6a4ff', 'gravityPulse', 40);
    for (const ball of g.balls) {
        const pull = (Math.random() > 0.5 ? 1 : -1) * 0.35 * scale.speed;
        ball.vx += pull;
        ball.vy *= 0.99;
    }
}
function spawnMinefield(g) {
    const scale = getDifficultyScale(g);
    const count = Math.max(2, Math.round(2 * scale.count));
    const baseY = g.H * 0.58;
    for (let i = 0; i < count; i++) {
        const laneX = 90 + (g.W - 180) * ((i + 1) / (count + 1));
        g.enemyShots.push({
            x: laneX + (Math.random() - 0.5) * 28,
            y: baseY + Math.random() * 70,
            vx: (Math.random() - 0.5) * 0.25,
            vy: 0.18,
            life: 420,
            radius: 10,
            color: '#c98cff',
            damage: 1,
            kind: 'minefield'
        });
    }
    spawnHostileEffect(g, g.W * 0.5, baseY + 30, 110, '#c98cff', 'minefield');
}
function spawnPulseRing(g) {
    spawnHostileEffect(g, g.W * 0.5, g.H * 0.45, 150, '#ff7cbf', 'pulseRing', 42);
    for (const ball of g.balls) {
        const dx = ball.x - g.W * 0.5;
        const dy = ball.y - g.H * 0.45;
        const dist = Math.max(20, Math.hypot(dx, dy));
        ball.vx += (dx / dist) * 0.55;
        ball.vy += (dy / dist) * 0.3;
    }
}
function triggerPattern(g, pattern) {
    pushWarning(g, pattern.label, pattern.severity, 120);
    stageBeep(g, 'warning', 880, 0.08, 'triangle', 0.03);
    if (pattern.type === 'meteor')
        spawnMeteor(g);
    else if (pattern.type === 'sweeper')
        spawnSweeper(g);
    else if (pattern.type === 'gravityPulse')
        applyGravityPulse(g);
    else if (pattern.type === 'minefield')
        spawnMinefield(g);
    else if (pattern.type === 'pulseRing')
        spawnPulseRing(g);
}
export function updateHostileGimmicks(g) {
    if (g.state.gameplay.awaitingLaunch)
        return;
    for (const pattern of g.state.stageRuntime.hostilePatterns) {
        pattern.timer -= 1;
        if (pattern.timer === 36 || pattern.timer === 18) {
            previewPattern(g, pattern);
            pushWarning(g, `${pattern.label} incoming`, pattern.severity, 28);
        }
        if (pattern.timer <= 0) {
            triggerPattern(g, pattern);
            pattern.timer = Math.max(50, Math.round(pattern.cooldown * getDifficultyScale(g).cooldown));
        }
    }
    for (let i = g.hostileEffects.length - 1; i >= 0; i--) {
        g.hostileEffects[i].ttl -= 1;
        if (g.hostileEffects[i].ttl <= 0)
            g.hostileEffects.splice(i, 1);
    }
    for (let i = g.telegraphs.length - 1; i >= 0; i--) {
        g.telegraphs[i].ttl -= 1;
        if (g.telegraphs[i].ttl <= 0)
            g.telegraphs.splice(i, 1);
    }
    for (let i = g.enemyShots.length - 1; i >= 0; i--) {
        const shot = g.enemyShots[i];
        shot.x += shot.vx;
        shot.y += shot.vy;
        shot.life -= 1;
        if (shot.kind === 'minefield')
            shot.radius = 8 + Math.sin(shot.life * 0.08) * 1.4;
        if (shot.x < -40 || shot.x > g.W + 40 || shot.y > g.H + 40 || shot.life <= 0) {
            g.enemyShots.splice(i, 1);
            continue;
        }
        if (shot.x >= g.paddle.x - shot.radius && shot.x <= g.paddle.x + g.paddle.w + shot.radius && shot.y >= g.paddle.y - shot.radius && shot.y <= g.paddle.y + g.paddle.h + shot.radius) {
            g.enemyShots.splice(i, 1);
            loseLife(g);
            break;
        }
    }
}
