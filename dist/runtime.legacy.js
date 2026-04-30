(() => {
    const STORAGE = (typeof chrome !== "undefined" && chrome?.storage?.local ? chrome.storage.local : {
        async get() { return {}; },
        async set() { }
    });
    const $ = (id) => {
        const el = document.getElementById(id);
        if (!el)
            throw new Error(`Missing element: ${id}`);
        return el;
    };
    const canvas = $('gameCanvas');
    const ctx = canvas.getContext('2d');
    if (!ctx)
        throw new Error('Canvas context unavailable');
    let W = innerWidth;
    let H = innerHeight;
    canvas.width = W;
    canvas.height = H;
    const I18N = {
        ja: {
            score: 'スコア', lives: '残機', stage: 'ステージ', combo: 'コンボ', best: 'ベスト',
            start: '開始', pause: '一時停止', menu: 'メニュー', records: '戦績', stageSelect: 'ステージ選択', logs: 'ログ',
            soundOn: '効果音/BGM: ON', soundOff: '効果音/BGM: OFF',
            menuTitle: 'Cosmic Breaker EX', menuSub: 'TypeScript移行版。ステージ選択、戦績、ログ、複数難易度を搭載。',
            controlTitle: '操作',
            controlBody: '移動: マウス / ← →\n発射: Space / クリック\n一時停止: P\nHUD: H\nレーザー: Z\nミサイル: X\nログ: Shift + L',
            startRun: 'プレイ開始', close: '閉じる', resetRecords: '戦績リセット',
            stageNames: ['フロスト・リフト', 'インフェルノ・スパーク', 'ネビュラ・ドライブ', 'コア・ネクサス'],
            stageDescriptions: ['操作しやすい氷ステージ', '標準的な炎ステージ', '少し速い宇宙ステージ', 'ボス準備ステージ'],
            stageClear: 'STAGE CLEAR', gameOver: 'GAME OVER'
        },
        en: {
            score: 'Score', lives: 'Lives', stage: 'Stage', combo: 'Combo', best: 'Best',
            start: 'Start', pause: 'Pause', menu: 'Menu', records: 'Records', stageSelect: 'Stage Select', logs: 'Logs',
            soundOn: 'Sound/BGM: ON', soundOff: 'Sound/BGM: OFF',
            menuTitle: 'Cosmic Breaker EX', menuSub: 'TypeScript rebuild with stage select, records, logs, and multiple difficulties.',
            controlTitle: 'Controls',
            controlBody: 'Move: Mouse / ← →\nLaunch: Space / Click\nPause: P\nHUD: H\nLaser: Z\nMissile: X\nLogs: Shift + L',
            startRun: 'Start Run', close: 'Close', resetRecords: 'Reset Records',
            stageNames: ['Frost Rift', 'Inferno Spark', 'Nebula Drive', 'Core Nexus'],
            stageDescriptions: ['Easy control ice stage', 'Standard fire stage', 'Slightly faster nebula stage', 'Boss prep stage'],
            stageClear: 'STAGE CLEAR', gameOver: 'GAME OVER'
        }
    };
    const DIFF = {
        supereasy: { lives: 8, paddle: 200, ball: 3.6 },
        easy: { lives: 6, paddle: 170, ball: 4.8 },
        normal: { lives: 5, paddle: 150, ball: 5.6 },
        hard: { lives: 4, paddle: 132, ball: 6.5 },
        hell: { lives: 2, paddle: 108, ball: 8.0 },
    };
    const ui = {
        scoreVal: $('scoreVal'), livesVal: $('livesVal'), stageVal: $('stageVal'), comboVal: $('comboVal'), bestVal: $('bestVal'),
        labelScore: $('labelScore'), labelLives: $('labelLives'), labelStage: $('labelStage'), labelCombo: $('labelCombo'), labelBest: $('labelBest'),
        startBtn: $('startBtn'), pauseBtn: $('pauseBtn'), menuBtn: $('menuBtn'), recordsBtn: $('recordsBtn'), hudBtn: $('hudBtn'), difficultySelect: $('difficultySelect'),
        langBtn: $('langBtn'), soundBtn: $('soundBtn'), logsBtn: $('logsBtn'), miniTip: $('miniTip'),
        menu: $('menu'), menuTitle: $('menuTitle'), menuSub: $('menuSub'), menuStart: $('menuStart'), menuStageSelect: $('menuStageSelect'), menuRecords: $('menuRecords'), menuLogs: $('menuLogs'),
        controlTitle: $('controlTitle'), controlBody: $('controlBody'),
        records: $('records'), recordsTitle: $('recordsTitle'), recordsGrid: $('recordsGrid'), recordsClose: $('recordsClose'), recordsReset: $('recordsReset'),
        stageSelect: $('stageSelect'), stageTitle: $('stageTitle'), stageGrid: $('stageGrid'), stageClose: $('stageClose'),
        logs: $('logs'), logsTitle: $('logsTitle'), logsGrid: $('logsGrid'), logsClose: $('logsClose'), logsExport: $('logsExport'), logsClear: $('logsClear'),
        overlay: $('overlay'), overlayText: $('overlayText')
    };
    const prefs = { lang: 'en', soundEnabled: true, bestScore: 0, playCount: 0 };
    const state = {
        started: false, running: false, paused: false, awaitingLaunch: true, gameOver: false,
        stageIndex: 1, difficulty: 'normal', score: 0, lives: 5, combo: 0, mouseActive: true,
        hudHidden: false, lastBounceDir: 1, magnetTimer: 0, laserTimer: 0, bigBallTimer: 0,
        laserCooldown: 0, missileTimer: 0, missileCooldown: 0, barrierCharges: 0,
        keys: { left: false, right: false }
    };
    const paddle = { x: 0, y: 0, w: 150, h: 16, speed: 8, powerTimer: 0, powerType: '' };
    const LOGS = [];
    let balls = [];
    let blocks = [];
    let drops = [];
    let lasers = [];
    let missiles = [];
    let stars = [];
    let audioCtx = null;
    let musicTimer = null;
    let forcedDropCounter = 0;
    const DROP_CATALOG = [
        { type: 'wide', weight: 15 }, { type: 'slow', weight: 12 }, { type: 'score', weight: 13 }, { type: 'life', weight: 6 },
        { type: 'expand', weight: 13 }, { type: 'multi', weight: 14 }, { type: 'barrier', weight: 8 }, { type: 'pierce', weight: 8 },
        { type: 'fast', weight: 8 }, { type: 'magnet', weight: 12 }, { type: 'laser', weight: 10 }, { type: 'bigball', weight: 10 }, { type: 'missile', weight: 11 }
    ];
    const GUARANTEED_DROP_ORDER = ['wide', 'slow', 'score', 'life', 'expand', 'barrier', 'multi', 'magnet', 'laser', 'bigball', 'missile'];
    const BALL_VARIANTS = [
        { color: '#8ff7ff', trail: 'rgba(143,247,255,.22)', trait: 'normal' },
        { color: '#ff93f6', trail: 'rgba(255,147,246,.20)', trait: 'plasma' },
        { color: '#b8ff83', trail: 'rgba(184,255,131,.22)', trait: 'heavy' },
        { color: '#ffd56e', trail: 'rgba(255,213,110,.20)', trait: 'ghost' },
        { color: '#9db2ff', trail: 'rgba(157,178,255,.22)', trait: 'nova' }
    ];
    function detectLang() { return (navigator.language || 'en').toLowerCase().startsWith('ja') ? 'ja' : 'en'; }
    function t(key) { return I18N[prefs.lang][key]; }
    async function loadPrefs() {
        const s = await STORAGE.get(['lang', 'soundEnabled', 'bestScore', 'playCount']);
        prefs.lang = s.lang || detectLang();
        prefs.soundEnabled = s.soundEnabled !== false;
        prefs.bestScore = Number(s.bestScore || 0);
        prefs.playCount = Number(s.playCount || 0);
    }
    async function savePrefs() {
        await STORAGE.set({ lang: prefs.lang, soundEnabled: prefs.soundEnabled, bestScore: prefs.bestScore, playCount: prefs.playCount });
    }
    function logEvent(type, message, extra = null) {
        const entry = { ts: new Date().toISOString(), type, message, extra };
        LOGS.push(entry);
        if (LOGS.length > 400)
            LOGS.shift();
        try {
            console[type === 'error' ? 'error' : 'log']('[CosmicBreaker]', message, extra ?? '');
        }
        catch { }
    }
    function ensureAudio() {
        if (!prefs.soundEnabled)
            return;
        if (!audioCtx)
            audioCtx = new ((window.AudioContext) || (window.webkitAudioContext))();
        if (audioCtx && audioCtx.state === 'suspended')
            void audioCtx.resume();
    }
    function beep(freq = 440, dur = 0.08, type = 'square', vol = 0.03) {
        if (!prefs.soundEnabled)
            return;
        ensureAudio();
        if (!audioCtx)
            return;
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.type = type;
        o.frequency.value = freq;
        g.gain.setValueAtTime(0.0001, audioCtx.currentTime);
        g.gain.exponentialRampToValueAtTime(vol, audioCtx.currentTime + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
        o.connect(g);
        g.connect(audioCtx.destination);
        o.start();
        o.stop(audioCtx.currentTime + dur + 0.02);
    }
    function startMusic() {
        if (!prefs.soundEnabled)
            return;
        ensureAudio();
        stopMusic();
        let i = 0;
        const bass = [110, 110, 98, 82];
        const lead = [220, 220, 196, 164];
        musicTimer = window.setInterval(() => {
            beep(bass[i % 4], 0.16, 'sawtooth', 0.02);
            beep(lead[i % 4], 0.08, 'square', 0.015);
            i += 1;
        }, 260);
    }
    function stopMusic() {
        if (musicTimer !== null) {
            clearInterval(musicTimer);
            musicTimer = null;
        }
    }
    function applyHudVisibility() {
        const hud = document.getElementById('hud');
        if (!hud)
            return;
        hud.classList.toggle('is-collapsed', state.hudHidden);
        ui.hudBtn.textContent = state.hudHidden ? 'HUD +' : 'HUD −';
    }
    function toggleHud(forceHidden = undefined) {
        state.hudHidden = typeof forceHidden === 'boolean' ? forceHidden : !state.hudHidden;
        applyHudVisibility();
        logEvent('info', 'hud toggled', { hidden: state.hudHidden });
    }
    function overlay(text, ms = 900) {
        ui.overlayText.textContent = text;
        ui.overlay.classList.remove('hidden');
        clearTimeout(overlay._t);
        overlay._t = window.setTimeout(() => ui.overlay.classList.add('hidden'), ms);
    }
    function initStars() {
        stars = Array.from({ length: Math.max(100, Math.floor(W * H / 18000)) }, () => ({
            x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.8 + 0.5, a: Math.random() * 6.28, s: Math.random() * 0.3 + 0.05, h: Math.random() > 0.5 ? 190 : 310
        }));
    }
    function resize() {
        W = innerWidth;
        H = innerHeight;
        canvas.width = W;
        canvas.height = H;
        paddle.y = H - 56;
        paddle.x = Math.min(Math.max(paddle.x || ((W - paddle.w) / 2), 10), W - paddle.w - 10);
        initStars();
        if (state.awaitingLaunch)
            syncAttachedBalls();
    }
    function setDifficulty(diff) {
        state.difficulty = diff;
        state.lives = DIFF[diff].lives;
        paddle.w = DIFF[diff].paddle;
    }
    function ballVariant(index) {
        return BALL_VARIANTS[((index % BALL_VARIANTS.length) + BALL_VARIANTS.length) % BALL_VARIANTS.length];
    }
    function createBall(index = 0) {
        const base = DIFF[state.difficulty].ball * 0.7;
        const variant = ballVariant(index);
        return { x: paddle.x + paddle.w / 2, y: paddle.y - 10, r: 8, baseR: 8, vx: base * 0.5 * (state.lastBounceDir || 1), vy: -base * 0.7, pulse: Math.random() * Math.PI * 2, ...variant };
    }
    function applyBigBallState() {
        const targetScale = state.bigBallTimer > 0 ? 1.8 : 1;
        for (const ball of balls)
            ball.r = ball.baseR * targetScale;
    }
    function resetBall() {
        balls = [createBall(0)];
        state.awaitingLaunch = true;
        applyBigBallState();
    }
    function syncAttachedBalls() {
        balls.forEach((ball, i) => {
            const spread = (i - ((balls.length - 1) / 2)) * 7;
            ball.x = paddle.x + paddle.w / 2 + spread;
            ball.y = paddle.y - 10;
        });
    }
    function getPaddleBounceVelocity(rel, speed, fallbackVx = 0) {
        const maxAngle = Math.PI * 0.42;
        const minAngle = Math.PI * 0.12;
        const clampedRel = Math.max(-1, Math.min(1, rel));
        let dir = clampedRel === 0 ? 0 : Math.sign(clampedRel);
        if (dir === 0)
            dir = Math.sign(state.lastBounceDir || fallbackVx || 1) || 1;
        let absRel = Math.abs(clampedRel);
        if (absRel < 0.02)
            absRel = 0.02;
        const angle = minAngle + (maxAngle - minAngle) * absRel;
        const vx = Math.sin(angle) * speed * dir;
        const vy = -Math.cos(angle) * speed;
        state.lastBounceDir = dir;
        return { vx, vy, angle };
    }
    function chooseWeightedDrop() {
        const total = DROP_CATALOG.reduce((sum, item) => sum + item.weight, 0);
        let roll = Math.random() * total;
        for (const item of DROP_CATALOG) {
            roll -= item.weight;
            if (roll <= 0)
                return item.type;
        }
        return 'score';
    }
    function maybeSpawnDrop(blk) {
        forcedDropCounter += 1;
        const guaranteed = forcedDropCounter <= GUARANTEED_DROP_ORDER.length;
        if (!guaranteed && Math.random() > 0.72)
            return;
        const type = guaranteed ? GUARANTEED_DROP_ORDER[forcedDropCounter - 1] : chooseWeightedDrop();
        drops.push({ x: blk.x + blk.w / 2, y: blk.y + blk.h / 2, vy: 1.9, type, t: 0 });
        logEvent('info', 'drop spawned', { type, guaranteed, count: forcedDropCounter });
    }
    function spawnLaserBurst() {
        lasers.push({ x: paddle.x + 12, y: paddle.y - 8, vy: -10, life: 120 });
        lasers.push({ x: paddle.x + paddle.w - 12, y: paddle.y - 8, vy: -10, life: 120 });
        beep(1240, 0.04, 'square', 0.025);
    }
    function spawnMissileBurst() {
        missiles.push({ x: paddle.x + 16, y: paddle.y - 10, vx: -1.2, vy: -5.2, life: 190, turnRate: 0.09 });
        missiles.push({ x: paddle.x + paddle.w - 16, y: paddle.y - 10, vx: 1.2, vy: -5.2, life: 190, turnRate: 0.09 });
        beep(620, 0.08, 'sawtooth', 0.03);
    }
    function nextTrait(index) { return ballVariant(index).trait; }
    function spawnMultiBall() {
        const maxBalls = 10;
        if (balls.length >= maxBalls)
            return false;
        const next = [];
        const spreadAngles = [-0.95, -0.58, -0.28, 0.28, 0.58, 0.95];
        let variantIndex = 0;
        for (const source of balls) {
            if (next.length >= maxBalls)
                break;
            const speed = Math.max(DIFF[state.difficulty].ball * 0.78, Math.hypot(source.vx, source.vy) * 1.05);
            next.push({ ...source, pulse: Math.random() * Math.PI * 2, ...ballVariant(variantIndex++) });
            for (const spread of spreadAngles) {
                if (next.length >= maxBalls)
                    break;
                const angle = Math.atan2(-Math.abs(source.vy || -1), source.vx || state.lastBounceDir || 1) + spread * 0.46;
                const variant = ballVariant(variantIndex++);
                const baseR = state.bigBallTimer > 0 ? 8 : 8;
                next.push({
                    x: source.x + Math.cos(angle) * 10,
                    y: source.y + Math.sin(angle) * 6,
                    r: baseR,
                    baseR,
                    vx: Math.cos(angle) * speed,
                    vy: Math.min(-0.95, Math.sin(angle) * speed),
                    pulse: Math.random() * Math.PI * 2,
                    ...variant
                });
            }
        }
        balls = next.slice(0, maxBalls);
        state.awaitingLaunch = false;
        applyBigBallState();
        logEvent('info', 'multiball spawned', { balls: balls.length, traits: balls.map(b => b.trait) });
        return true;
    }
    function applyDrop(type) {
        logEvent('info', 'drop applied', { type });
        switch (type) {
            case 'wide':
                paddle.w = Math.min(230, paddle.w + 30);
                paddle.powerType = 'WIDE';
                paddle.powerTimer = Math.max(paddle.powerTimer, 600);
                overlay('WIDE', 450);
                break;
            case 'expand':
                paddle.w = Math.min(270, paddle.w + 56);
                paddle.powerType = 'EXPAND';
                paddle.powerTimer = Math.max(paddle.powerTimer, 760);
                overlay('EXPAND', 500);
                break;
            case 'slow':
                for (const ball of balls) {
                    ball.vx *= 0.86;
                    ball.vy *= 0.86;
                }
                paddle.powerType = 'SLOW';
                paddle.powerTimer = Math.max(paddle.powerTimer, 320);
                overlay('SLOW', 450);
                break;
            case 'fast':
                for (const ball of balls) {
                    const speed = Math.max(DIFF[state.difficulty].ball * 0.9, Math.hypot(ball.vx, ball.vy) * 1.17);
                    const ax = Math.abs(ball.vx) / Math.max(0.001, Math.abs(ball.vx) + Math.abs(ball.vy));
                    ball.vx = speed * Math.max(0.24, ax) * (Math.sign(ball.vx || 1) || 1);
                    ball.vy = speed * (1 - Math.max(0.24, ax)) * (ball.vy < 0 ? -1 : 1);
                }
                overlay('FAST', 450);
                break;
            case 'life':
                if (state.lives < DIFF[state.difficulty].lives + 3) {
                    state.lives += 1;
                    overlay('1UP', 450);
                }
                else {
                    state.score += 300;
                    overlay('+300', 450);
                }
                break;
            case 'score':
                state.score += 500;
                overlay('+500', 450);
                break;
            case 'multi':
                state.score += spawnMultiBall() ? 650 : 180;
                state.combo += 8;
                overlay('MULTI BALL', 650);
                break;
            case 'barrier':
                state.barrierCharges = Math.min(2, state.barrierCharges + 1);
                state.score += 180;
                overlay('BARRIER', 500);
                break;
            case 'pierce':
                paddle.powerType = 'PIERCE';
                paddle.powerTimer = Math.max(paddle.powerTimer, 420);
                state.score += 350;
                overlay('PIERCE', 500);
                break;
            case 'magnet':
                state.magnetTimer = Math.max(state.magnetTimer, 540);
                paddle.powerType = 'MAGNET';
                paddle.powerTimer = Math.max(paddle.powerTimer, 540);
                state.score += 120;
                overlay('MAGNET', 550);
                break;
            case 'laser':
                state.laserTimer = Math.max(state.laserTimer, 540);
                state.laserCooldown = 0;
                overlay('LASER', 550);
                spawnLaserBurst();
                break;
            case 'bigball':
                state.bigBallTimer = Math.max(state.bigBallTimer, 620);
                applyBigBallState();
                overlay('BIG BALL', 550);
                break;
            case 'missile':
                state.missileTimer = Math.max(state.missileTimer, 620);
                state.missileCooldown = 0;
                overlay('MISSILE', 550);
                spawnMissileBurst();
                break;
        }
        beep(1180, 0.06, 'triangle', 0.03);
    }
    function stageName(i) { return t('stageNames')[(i - 1) % 4]; }
    function spawnStage(stage) {
        state.stageIndex = stage;
        blocks = [];
        drops = [];
        lasers = [];
        missiles = [];
        const top = 110;
        const cols = 12, rows = 6, gap = 8, side = 60;
        const bw = Math.floor((W - side - side - (cols - 1) * gap) / cols), bh = 24;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if ((r === 1 && c % 5 === 2) || (r === 4 && c % 6 === 1))
                    continue;
                const hp = (r + stage) % 3 === 0 ? 2 : 1;
                blocks.push({ x: side + c * (bw + gap), y: top + r * (bh + gap), w: bw, h: bh, hp, maxHp: hp });
            }
        }
        resetBall();
        updateUI();
    }
    function drawRecords() {
        ui.recordsGrid.innerHTML = [
            [t('best'), prefs.bestScore], ['Play Count', prefs.playCount], [t('stage'), stageName(state.stageIndex)], [t('lives'), state.lives]
        ].map(([k, v]) => `<div class="recordCell"><div style="font-size:12px;color:#9fc0d4;margin-bottom:4px">${k}</div><div style="font-size:24px;font-weight:900">${v}</div></div>`).join('');
    }
    function drawStageGrid() {
        ui.stageGrid.innerHTML = [1, 2, 3, 4].map(i => `
      <div class="stageCard" data-stage="${i}">
        <div class="info">
          <div style="font-size:12px;color:#b7d1df;margin-bottom:6px">STAGE ${i}</div>
          <div style="font-size:24px;font-weight:900">${stageName(i)}</div>
          <div style="margin-top:8px;color:#d8e7ef;line-height:1.5">${t('stageDescriptions')[(i - 1) % 4]}</div>
        </div>
      </div>`).join('');
        Array.from(ui.stageGrid.querySelectorAll('.stageCard')).forEach(el => { const stageEl = el; stageEl.onclick = () => void startRun(Number(stageEl.dataset.stage || '1')); });
    }
    function drawLogs() {
        ui.logsGrid.innerHTML = LOGS.slice().reverse().map(item => {
            const extra = item.extra ? JSON.stringify(item.extra) : '';
            return `<div class="recordCell"><div style="font-size:11px;color:#9fc0d4;margin-bottom:4px">${item.ts} / ${item.type.toUpperCase()}</div><div style="font-size:14px;font-weight:700;margin-bottom:4px">${item.message}</div><div style="font-size:12px;color:#d7e7f0;word-break:break-all">${extra}</div></div>`;
        }).join('') || '<div class="recordCell"><div style="font-size:14px">No logs yet.</div></div>';
    }
    function exportLogs() {
        const blob = new Blob([JSON.stringify(LOGS, null, 2)], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'cosmic_breaker_log.json';
        a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    }
    function updateUI() {
        ui.labelScore.textContent = t('score');
        ui.labelLives.textContent = t('lives');
        ui.labelStage.textContent = t('stage');
        ui.labelCombo.textContent = t('combo');
        ui.labelBest.textContent = t('best');
        ui.startBtn.textContent = t('start');
        ui.pauseBtn.textContent = t('pause');
        ui.menuBtn.textContent = t('menu');
        ui.recordsBtn.textContent = t('records');
        ui.logsBtn.textContent = t('logs');
        ui.soundBtn.textContent = prefs.soundEnabled ? t('soundOn') : t('soundOff');
        ui.menuTitle.textContent = t('menuTitle');
        ui.menuSub.textContent = t('menuSub');
        ui.controlTitle.textContent = t('controlTitle');
        ui.controlBody.innerHTML = String(t('controlBody')).replace(/\n/g, '<br>');
        ui.recordsTitle.textContent = t('records');
        ui.stageTitle.textContent = t('stageSelect');
        ui.menuStart.textContent = t('startRun');
        ui.menuStageSelect.textContent = t('stageSelect');
        ui.menuRecords.textContent = t('records');
        ui.menuLogs.textContent = t('logs');
        ui.recordsClose.textContent = t('close');
        ui.recordsReset.textContent = t('resetRecords');
        ui.stageClose.textContent = t('close');
        ui.logsClose.textContent = t('close');
        ui.scoreVal.textContent = String(state.score);
        ui.livesVal.textContent = String(state.lives);
        ui.stageVal.textContent = `${state.stageIndex} · ${stageName(state.stageIndex)}`;
        ui.comboVal.textContent = String(state.combo);
        ui.bestVal.textContent = String(prefs.bestScore);
        applyHudVisibility();
    }
    function openMenu() { ui.menu.classList.remove('hidden'); state.running = false; logEvent('info', 'menu opened'); }
    function closeMenu() { ui.menu.classList.add('hidden'); logEvent('info', 'menu closed'); updateUI(); }
    function openRecords() { drawRecords(); ui.records.classList.remove('hidden'); }
    function openStageSelect() { drawStageGrid(); ui.stageSelect.classList.remove('hidden'); }
    function openLogs() { drawLogs(); ui.logs.classList.remove('hidden'); }
    async function startRun(stage = 1) {
        logEvent('info', 'start run requested', { stage, difficulty: ui.difficultySelect.value || state.difficulty });
        closeMenu();
        ui.records.classList.add('hidden');
        ui.stageSelect.classList.add('hidden');
        ui.logs.classList.add('hidden');
        prefs.playCount += 1;
        forcedDropCounter = 0;
        await savePrefs();
        state.score = 0;
        state.combo = 0;
        state.gameOver = false;
        state.paused = false;
        state.started = true;
        state.barrierCharges = 0;
        state.magnetTimer = 0;
        state.laserTimer = 0;
        state.bigBallTimer = 0;
        state.missileTimer = 0;
        state.laserCooldown = 0;
        state.missileCooldown = 0;
        setDifficulty(ui.difficultySelect.value || 'normal');
        paddle.x = (W - paddle.w) / 2;
        paddle.y = H - 56;
        spawnStage(stage);
        state.running = true;
        startMusic();
        overlay(stageName(stage), 900);
        updateUI();
    }
    function launch() {
        if (state.gameOver)
            return;
        if (!state.started) {
            void startRun(state.stageIndex || 1);
            return;
        }
        if (state.awaitingLaunch) {
            ensureAudio();
            state.awaitingLaunch = false;
            const sp = DIFF[state.difficulty].ball * 0.7;
            const launchDir = Math.random() > 0.5 ? 1 : -1;
            state.lastBounceDir = launchDir;
            if (!balls.length)
                balls = [createBall(0)];
            balls.forEach((ball, idx) => {
                const spread = idx - ((balls.length - 1) / 2);
                ball.vx = (launchDir * sp * 0.46) + (spread * 0.92);
                ball.vy = -sp * (0.64 + Math.min(0.22, Math.abs(spread) * 0.08));
            });
        }
    }
    function loseLife() {
        if (state.barrierCharges > 0) {
            state.barrierCharges -= 1;
            resetBall();
            overlay('BARRIER SAVE', 600);
            return;
        }
        logEvent('warn', 'life lost', { livesBefore: state.lives });
        state.lives -= 1;
        state.combo = 0;
        if (state.lives <= 0) {
            state.gameOver = true;
            state.running = false;
            stopMusic();
            overlay(t('gameOver'), 1200);
            return;
        }
        resetBall();
        updateUI();
    }
    function stageClear() {
        logEvent('info', 'stage clear', { stage: state.stageIndex, score: state.score });
        state.running = false;
        prefs.bestScore = Math.max(prefs.bestScore, state.score);
        void savePrefs();
        overlay(t('stageClear'), 900);
        setTimeout(() => void startRun(state.stageIndex >= 4 ? 1 : state.stageIndex + 1), 950);
    }
    function rectCircle(rect, b) {
        const cx = Math.max(rect.x, Math.min(b.x, rect.x + rect.w));
        const cy = Math.max(rect.y, Math.min(b.y, rect.y + rect.h));
        const dx = b.x - cx, dy = b.y - cy;
        return dx * dx + dy * dy <= b.r * b.r;
    }
    function handleTraitHit(ball) {
        if (ball.trait === 'plasma') {
            state.score += 30;
            return true;
        }
        if (ball.trait === 'heavy') {
            return Math.random() < 0.42;
        }
        if (ball.trait === 'ghost') {
            state.score += 12;
            return Math.random() < 0.25;
        }
        if (ball.trait === 'nova') {
            state.score += 24;
            return Math.random() < 0.18;
        }
        return false;
    }
    function updateDrops() {
        for (let i = drops.length - 1; i >= 0; i--) {
            const d = drops[i];
            d.t += 1;
            if (state.magnetTimer > 0) {
                const tx = paddle.x + paddle.w / 2;
                const ty = paddle.y + paddle.h / 2;
                const dx = tx - d.x;
                const dy = ty - d.y;
                const dist = Math.hypot(dx, dy);
                if (dist < 250) {
                    const pull = Math.max(0.18, 1 - dist / 250) * 0.7;
                    d.x += dx * pull * 0.12;
                    d.y += dy * pull * 0.18;
                }
            }
            d.y += d.vy;
            if (d.y > H + 20) {
                drops.splice(i, 1);
                continue;
            }
            if (d.x >= paddle.x && d.x <= paddle.x + paddle.w && d.y >= paddle.y - 10 && d.y <= paddle.y + paddle.h + 10) {
                applyDrop(d.type);
                drops.splice(i, 1);
                updateUI();
            }
        }
    }
    function updateLasers() {
        if (state.laserTimer > 0) {
            state.laserTimer -= 1;
            if (state.laserCooldown > 0)
                state.laserCooldown -= 1;
            if (state.laserCooldown <= 0) {
                spawnLaserBurst();
                state.laserCooldown = 18;
            }
        }
        for (let i = lasers.length - 1; i >= 0; i--) {
            const laser = lasers[i];
            laser.y += laser.vy;
            laser.life -= 1;
            if (laser.y < 80 || laser.life <= 0) {
                lasers.splice(i, 1);
                continue;
            }
            let hit = false;
            for (const blk of blocks) {
                if (blk.hp <= 0)
                    continue;
                if (laser.x >= blk.x && laser.x <= blk.x + blk.w && laser.y >= blk.y && laser.y <= blk.y + blk.h) {
                    blk.hp -= 1;
                    state.score += blk.maxHp === 2 ? 70 : 35;
                    state.combo += 1;
                    prefs.bestScore = Math.max(prefs.bestScore, state.score);
                    if (blk.hp <= 0)
                        maybeSpawnDrop(blk);
                    hit = true;
                    beep(1400, 0.03, 'square', 0.02);
                    break;
                }
            }
            if (hit)
                lasers.splice(i, 1);
        }
    }
    function updateMissiles() {
        if (state.missileTimer > 0) {
            state.missileTimer -= 1;
            if (state.missileCooldown > 0)
                state.missileCooldown -= 1;
            if (state.missileCooldown <= 0) {
                spawnMissileBurst();
                state.missileCooldown = 44;
            }
        }
        for (let i = missiles.length - 1; i >= 0; i--) {
            const m = missiles[i];
            m.life -= 1;
            const target = blocks.filter(b => b.hp > 0).sort((a, b) => Math.hypot(a.x + a.w / 2 - m.x, a.y + a.h / 2 - m.y) - Math.hypot(b.x + b.w / 2 - m.x, b.y + b.h / 2 - m.y))[0];
            if (target) {
                const tx = target.x + target.w / 2, ty = target.y + target.h / 2;
                const desired = Math.atan2(ty - m.y, tx - m.x);
                const current = Math.atan2(m.vy, m.vx);
                let delta = desired - current;
                while (delta > Math.PI)
                    delta -= Math.PI * 2;
                while (delta < -Math.PI)
                    delta += Math.PI * 2;
                const next = current + Math.max(-m.turnRate, Math.min(m.turnRate, delta));
                const speed = Math.hypot(m.vx, m.vy);
                m.vx = Math.cos(next) * speed;
                m.vy = Math.sin(next) * speed;
            }
            m.x += m.vx;
            m.y += m.vy;
            if (m.life <= 0 || m.y < 60 || m.x < -20 || m.x > W + 20) {
                missiles.splice(i, 1);
                continue;
            }
            let hit = false;
            for (const blk of blocks) {
                if (blk.hp <= 0)
                    continue;
                if (m.x >= blk.x && m.x <= blk.x + blk.w && m.y >= blk.y && m.y <= blk.y + blk.h) {
                    blk.hp = Math.max(0, blk.hp - 2);
                    state.score += 140;
                    state.combo += 2;
                    prefs.bestScore = Math.max(prefs.bestScore, state.score);
                    if (blk.hp <= 0)
                        maybeSpawnDrop(blk);
                    hit = true;
                    beep(320, 0.09, 'sawtooth', 0.035);
                    break;
                }
            }
            if (hit)
                missiles.splice(i, 1);
        }
    }
    function updateBalls() {
        if (state.awaitingLaunch) {
            syncAttachedBalls();
            return;
        }
        for (let i = balls.length - 1; i >= 0; i--) {
            const ball = balls[i];
            ball.pulse += 0.05;
            if (ball.trait === 'ghost') {
                const speedBoost = 1.0007;
                ball.vx *= speedBoost;
                ball.vy *= speedBoost;
            }
            ball.x += ball.vx;
            ball.y += ball.vy;
            if (ball.x - ball.r <= 0) {
                ball.x = ball.r + 1;
                ball.vx = Math.abs(ball.vx) || 1.5;
                beep(620, 0.04, 'triangle', 0.02);
            }
            else if (ball.x + ball.r >= W) {
                ball.x = W - ball.r - 1;
                ball.vx = -Math.abs(ball.vx || 1.5);
                beep(620, 0.04, 'triangle', 0.02);
            }
            if (ball.y - ball.r <= 90) {
                ball.vy = Math.abs(ball.vy);
                beep(620, 0.04, 'triangle', 0.02);
            }
            if (rectCircle({ x: paddle.x, y: paddle.y, w: paddle.w, h: paddle.h }, ball) && ball.vy > 0) {
                let rel = (ball.x - (paddle.x + paddle.w / 2)) / (paddle.w / 2);
                rel = Math.max(-1, Math.min(1, rel));
                const speed = Math.max(DIFF[state.difficulty].ball * 0.7, Math.hypot(ball.vx, ball.vy));
                const bounce = getPaddleBounceVelocity(rel, speed, ball.vx);
                ball.vx = bounce.vx;
                ball.vy = bounce.vy;
                if (Math.abs(rel) > 0.9) {
                    ball.vx *= 1.06;
                    ball.vy = -Math.sqrt(Math.max(0.5, speed * speed - ball.vx * ball.vx));
                }
                ball.y = paddle.y - ball.r - 1;
                logEvent('info', 'paddle bounce', { rel: Number(rel.toFixed(3)), vx: Number(ball.vx.toFixed(3)), vy: Number(ball.vy.toFixed(3)), angleDeg: Number((bounce.angle * 180 / Math.PI).toFixed(1)), balls: balls.length, trait: ball.trait });
                beep(220, 0.05, 'square', 0.03);
            }
            for (const blk of blocks) {
                if (blk.hp <= 0)
                    continue;
                if (rectCircle(blk, ball)) {
                    blk.hp -= 1;
                    state.score += blk.maxHp === 2 ? 80 : 40;
                    state.combo += 1;
                    prefs.bestScore = Math.max(prefs.bestScore, state.score);
                    if (blk.hp <= 0)
                        maybeSpawnDrop(blk);
                    const shouldPierce = (paddle.powerType === 'PIERCE' && paddle.powerTimer > 0) || (state.bigBallTimer > 0) || handleTraitHit(ball);
                    if (!shouldPierce)
                        ball.vy *= -1;
                    beep(880, 0.03, 'square', 0.02);
                    break;
                }
            }
            if (ball.y - ball.r > H)
                balls.splice(i, 1);
        }
        if (!balls.length)
            loseLife();
    }
    function updatePowerTimers() {
        if (paddle.powerTimer > 0) {
            paddle.powerTimer -= 1;
            if (paddle.powerTimer <= 0) {
                paddle.powerType = '';
                paddle.w = DIFF[state.difficulty].paddle;
            }
        }
        if (state.magnetTimer > 0)
            state.magnetTimer -= 1;
        if (state.bigBallTimer > 0) {
            state.bigBallTimer -= 1;
            if (state.bigBallTimer <= 0)
                applyBigBallState();
        }
    }
    function update() {
        if (state.paused || !state.running)
            return;
        if (!state.mouseActive) {
            if (state.keys.left)
                paddle.x -= paddle.speed;
            if (state.keys.right)
                paddle.x += paddle.speed;
        }
        paddle.x = Math.max(10, Math.min(W - paddle.w - 10, paddle.x));
        updatePowerTimers();
        updateDrops();
        updateLasers();
        updateMissiles();
        updateBalls();
        if (blocks.every(b => b.hp <= 0))
            stageClear();
        updateUI();
    }
    function roundRect(x, y, w, h, r, fill, stroke) {
        const rr = Math.min(r, w / 2, h / 2);
        ctx.beginPath();
        ctx.moveTo(x + rr, y);
        ctx.arcTo(x + w, y, x + w, y + h, rr);
        ctx.arcTo(x + w, y + h, x, y + h, rr);
        ctx.arcTo(x, y + h, x, y, rr);
        ctx.arcTo(x, y, x + w, y, rr);
        ctx.closePath();
        if (fill)
            ctx.fill();
        if (stroke)
            ctx.stroke();
    }
    function render() {
        ctx.clearRect(0, 0, W, H);
        for (const s of stars) {
            s.a += s.s * 0.02;
            const al = 0.35 + (Math.sin(s.a) + 1) * 0.25;
            ctx.fillStyle = `hsla(${s.h},100%,70%,${al})`;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fill();
        }
        for (const blk of blocks) {
            if (blk.hp <= 0)
                continue;
            const g = ctx.createLinearGradient(blk.x, blk.y, blk.x + blk.w, blk.y + blk.h);
            g.addColorStop(0, blk.maxHp === 2 ? '#bff6ff' : '#64ffd0');
            g.addColorStop(1, blk.maxHp === 2 ? '#6dd1ff' : '#2f84ff');
            ctx.fillStyle = g;
            roundRect(blk.x, blk.y, blk.w, blk.h, 8, true, false);
            if (blk.maxHp > 1) {
                ctx.fillStyle = 'rgba(3,14,26,.58)';
                roundRect(blk.x + 4, blk.y + blk.h - 6, blk.w - 8, 3, 2, true, false);
                ctx.fillStyle = 'rgba(255,255,255,.72)';
                roundRect(blk.x + 4, blk.y + blk.h - 6, (blk.w - 8) * (blk.hp / blk.maxHp), 3, 2, true, false);
            }
        }
        const dropColors = {
            wide: ['#71ecff', '#2f84ff'], slow: ['#d2b8ff', '#7f6dff'], life: ['#9bffad', '#45c970'], score: ['#ffe07a', '#ff9d36'], expand: ['#9de7ff', '#00b8ff'], multi: ['#ffd7ff', '#ff66d9'], barrier: ['#c8ffae', '#65d65e'], pierce: ['#ffb6a0', '#ff5d5d'], fast: ['#fff1a8', '#ffb300'], magnet: ['#b6ffd8', '#12c7a5'], laser: ['#ffa7ff', '#ff3dd4'], bigball: ['#a7d0ff', '#4d7dff'], missile: ['#ffe8af', '#ff8d2c']
        };
        const dropMarks = { wide: 'W', slow: 'S', life: '+1', score: '$', expand: 'E', multi: 'M', barrier: 'B', pierce: 'P', fast: 'F', magnet: 'G', laser: 'L', bigball: 'O', missile: 'R' };
        for (const d of drops) {
            const c = dropColors[d.type];
            const g = ctx.createLinearGradient(d.x - 12, d.y - 12, d.x + 12, d.y + 12);
            g.addColorStop(0, c[0]);
            g.addColorStop(1, c[1]);
            ctx.fillStyle = g;
            roundRect(d.x - 16, d.y - 16, 32, 32, 9, true, false);
            ctx.fillStyle = 'rgba(255,255,255,.92)';
            ctx.font = 'bold 11px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(dropMarks[d.type], d.x, d.y + 1);
        }
        const pg = ctx.createLinearGradient(paddle.x, paddle.y, paddle.x + paddle.w, paddle.y);
        pg.addColorStop(0, '#8ef7ff');
        pg.addColorStop(1, '#ff67d4');
        ctx.fillStyle = pg;
        roundRect(paddle.x, paddle.y, paddle.w, paddle.h, 8, true, false);
        if (paddle.powerTimer > 0 || state.laserTimer > 0 || state.missileTimer > 0) {
            ctx.fillStyle = 'rgba(255,255,255,.16)';
            roundRect(paddle.x, paddle.y - 8, paddle.w, 4, 2, true, false);
            ctx.fillStyle = state.magnetTimer > 0 ? '#7dffd8' : state.laserTimer > 0 ? '#ff8eff' : state.missileTimer > 0 ? '#ffb85d' : '#ffe07a';
            roundRect(paddle.x, paddle.y - 8, paddle.w * (Math.min(760, Math.max(paddle.powerTimer, state.laserTimer, state.missileTimer)) / 760), 4, 2, true, false);
        }
        if (state.barrierCharges > 0) {
            ctx.strokeStyle = 'rgba(121,255,201,.55)';
            ctx.lineWidth = 2;
            roundRect(paddle.x - 5, paddle.y - 5, paddle.w + 10, paddle.h + 10, 12, false, true);
        }
        for (const laser of lasers) {
            ctx.strokeStyle = 'rgba(255,125,255,.88)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(laser.x, laser.y);
            ctx.lineTo(laser.x, laser.y + 16);
            ctx.stroke();
        }
        for (const m of missiles) {
            ctx.fillStyle = '#ffbf66';
            ctx.beginPath();
            ctx.moveTo(m.x, m.y - 6);
            ctx.lineTo(m.x + 5, m.y + 6);
            ctx.lineTo(m.x - 5, m.y + 6);
            ctx.closePath();
            ctx.fill();
        }
        for (const ball of balls) {
            const alpha = 0.4 + (Math.sin(ball.pulse) + 1) * 0.2;
            ctx.fillStyle = ball.trail.replace(/\.\d+\)$/, `${alpha})`);
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.r + 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = ball.color;
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
            ctx.fill();
            if (ball.trait !== 'normal') {
                ctx.fillStyle = 'rgba(255,255,255,.78)';
                ctx.font = 'bold 9px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(ball.trait[0].toUpperCase(), ball.x, ball.y + 2);
            }
        }
    }
    let last = performance.now();
    function loop(now) { const dt = now - last; last = now; void dt; update(); render(); requestAnimationFrame(loop); }
    addEventListener('resize', resize);
    addEventListener('pointermove', (e) => { state.mouseActive = true; paddle.x = Math.max(10, Math.min(W - paddle.w - 10, e.clientX - paddle.w / 2)); });
    addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            state.keys.left = true;
            state.mouseActive = false;
        }
        if (e.key === 'ArrowRight') {
            state.keys.right = true;
            state.mouseActive = false;
        }
        if (e.code === 'Space') {
            e.preventDefault();
            launch();
        }
        if (e.key.toLowerCase() === 'p') {
            state.paused = !state.paused;
            updateUI();
        }
        if (e.key.toLowerCase() === 'h') {
            e.preventDefault();
            toggleHud(undefined);
        }
        if (e.key.toLowerCase() === 'l' && e.shiftKey) {
            openLogs();
        }
        if (e.key.toLowerCase() === 'z' && state.laserTimer > 0) {
            spawnLaserBurst();
        }
        if (e.key.toLowerCase() === 'x' && state.missileTimer > 0) {
            spawnMissileBurst();
        }
    });
    addEventListener('keyup', (e) => {
        if (e.key === 'ArrowLeft')
            state.keys.left = false;
        if (e.key === 'ArrowRight')
            state.keys.right = false;
    });
    canvas.addEventListener('click', () => launch());
    window.addEventListener('error', ev => logEvent('error', ev.message, { filename: ev.filename, lineno: ev.lineno, colno: ev.colno }));
    window.addEventListener('unhandledrejection', ev => logEvent('error', String(ev.reason), { kind: 'unhandledrejection' }));
    ui.startBtn.onclick = () => {
        if (state.gameOver) {
            void startRun(1);
            return;
        }
        if (!state.started || !ui.menu.classList.contains('hidden'))
            void startRun(state.stageIndex || 1);
        else {
            state.running = true;
            state.paused = false;
            launch();
            updateUI();
        }
    };
    ui.pauseBtn.onclick = () => { state.paused = !state.paused; updateUI(); };
    ui.menuBtn.onclick = () => {
        if (ui.menu.classList.contains('hidden'))
            openMenu();
        else
            closeMenu();
    };
    ui.recordsBtn.onclick = () => openRecords();
    ui.hudBtn.onclick = (e) => { e?.preventDefault(); toggleHud(undefined); };
    ui.logsBtn.onclick = () => openLogs();
    ui.langBtn.onclick = async () => { prefs.lang = prefs.lang === 'ja' ? 'en' : 'ja'; await savePrefs(); updateUI(); drawStageGrid(); drawRecords(); };
    ui.soundBtn.onclick = async () => {
        prefs.soundEnabled = !prefs.soundEnabled;
        if (prefs.soundEnabled)
            startMusic();
        else
            stopMusic();
        await savePrefs();
        updateUI();
    };
    ui.menuStart.onclick = () => void startRun(1);
    ui.menuStageSelect.onclick = () => openStageSelect();
    ui.menuRecords.onclick = () => openRecords();
    ui.menuLogs.onclick = () => openLogs();
    ui.recordsClose.onclick = () => ui.records.classList.add('hidden');
    ui.recordsReset.onclick = async () => { prefs.bestScore = 0; prefs.playCount = 0; await savePrefs(); drawRecords(); updateUI(); };
    ui.stageClose.onclick = () => ui.stageSelect.classList.add('hidden');
    ui.logsClose.onclick = () => ui.logs.classList.add('hidden');
    ui.logsExport.onclick = () => exportLogs();
    ui.logsClear.onclick = () => { LOGS.length = 0; drawLogs(); };
    (async function init() {
        await loadPrefs();
        resize();
        setDifficulty('normal');
        ui.difficultySelect.value = 'normal';
        paddle.x = (W - paddle.w) / 2;
        paddle.y = H - 56;
        resetBall();
        updateUI();
        drawRecords();
        drawStageGrid();
        requestAnimationFrame(loop);
    })().catch(err => logEvent('error', String(err), { phase: 'init' }));
})();
