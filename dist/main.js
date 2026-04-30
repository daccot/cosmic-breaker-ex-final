(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // src/core/constants.ts
  var I18N, DIFF;
  var init_constants = __esm({
    "src/core/constants.ts"() {
      I18N = {
        ja: {
          score: "\u30B9\u30B3\u30A2",
          lives: "\u6B8B\u6A5F",
          stage: "\u30B9\u30C6\u30FC\u30B8",
          combo: "\u30B3\u30F3\u30DC",
          best: "\u30D9\u30B9\u30C8",
          start: "\u958B\u59CB",
          pause: "\u4E00\u6642\u505C\u6B62",
          menu: "\u30E1\u30CB\u30E5\u30FC",
          records: "\u6226\u7E3E",
          stageSelect: "\u30B9\u30C6\u30FC\u30B8\u9078\u629E",
          logs: "\u30ED\u30B0",
          record: "\u9332\u753B",
          recordStop: "\u9332\u753B\u505C\u6B62",
          shareClip: "\u5171\u6709",
          soundOn: "\u52B9\u679C\u97F3/BGM: ON",
          soundOff: "\u52B9\u679C\u97F3/BGM: OFF",
          menuTitle: "Cosmic Breaker EX",
          menuSub: "TypeScript\u5206\u5272\u7248\u3002\u30B9\u30C6\u30FC\u30B8\u9078\u629E\u3001\u6226\u7E3E\u3001\u30ED\u30B0\u3001\u8907\u6570\u96E3\u6613\u5EA6\u3092\u642D\u8F09\u3002",
          controlTitle: "\u64CD\u4F5C",
          controlBody: "\u79FB\u52D5: \u30DE\u30A6\u30B9 / \u2190 \u2192\n\u767A\u5C04: Space / \u30AF\u30EA\u30C3\u30AF\n\u4E00\u6642\u505C\u6B62: P\nHUD: H\n\u30EC\u30FC\u30B6\u30FC: Z\n\u30DF\u30B5\u30A4\u30EB: X\n\u30AD\u30E3\u30C3\u30C1\u89E3\u9664: C\n\u30ED\u30B0: Shift + L",
          startRun: "\u30D7\u30EC\u30A4\u958B\u59CB",
          close: "\u9589\u3058\u308B",
          resetRecords: "\u6226\u7E3E\u30EA\u30BB\u30C3\u30C8",
          stageClear: "STAGE CLEAR",
          gameOver: "GAME OVER"
        },
        en: {
          score: "Score",
          lives: "Lives",
          stage: "Stage",
          combo: "Combo",
          best: "Best",
          start: "Start",
          pause: "Pause",
          menu: "Menu",
          records: "Records",
          stageSelect: "Stage Select",
          logs: "Logs",
          record: "Record",
          recordStop: "Stop Rec",
          shareClip: "Share",
          soundOn: "Sound/BGM: ON",
          soundOff: "Sound/BGM: OFF",
          menuTitle: "Cosmic Breaker EX",
          menuSub: "TypeScript split build with stage select, records, logs, and multiple difficulties.",
          controlTitle: "Controls",
          controlBody: "Move: Mouse / \u2190 \u2192\nLaunch: Space / Click\nPause: P\nHUD: H\nLaser: Z\nMissile: X\nRelease Catch: C\nLogs: Shift + L",
          startRun: "Start Run",
          close: "Close",
          resetRecords: "Reset Records",
          stageClear: "STAGE CLEAR",
          gameOver: "GAME OVER"
        }
      };
      DIFF = {
        supereasy: { lives: 8, paddle: 200, ball: 3.6 },
        easy: { lives: 6, paddle: 170, ball: 4.8 },
        normal: { lives: 5, paddle: 150, ball: 5.6 },
        hard: { lives: 4, paddle: 132, ball: 6.5 },
        hell: { lives: 2, paddle: 108, ball: 8 }
      };
    }
  });

  // src/data/ballTraitDefinitions.ts
  var BALL_TRAIT_DEFINITIONS, BALL_TRAIT_SEQUENCE;
  var init_ballTraitDefinitions = __esm({
    "src/data/ballTraitDefinitions.ts"() {
      BALL_TRAIT_DEFINITIONS = {
        normal: { trait: "normal", color: "#8ff7ff", trail: "rgba(143,247,255,.22)", scoreBonus: 0, pierceChance: 0 },
        plasma: { trait: "plasma", color: "#ff93f6", trail: "rgba(255,147,246,.20)", scoreBonus: 18, pierceChance: 0 },
        heavy: { trait: "heavy", color: "#b8ff83", trail: "rgba(184,255,131,.22)", scoreBonus: 0, pierceChance: 0, alwaysPierce: true },
        ghost: { trait: "ghost", color: "#ffd56e", trail: "rgba(255,213,110,.20)", scoreBonus: 0, pierceChance: 0.35 },
        nova: { trait: "nova", color: "#9db2ff", trail: "rgba(157,178,255,.22)", scoreBonus: 26, pierceChance: 0 }
      };
      BALL_TRAIT_SEQUENCE = ["normal", "plasma", "heavy", "ghost", "nova"];
    }
  });

  // src/systems/logger.ts
  function logEvent(g2, type, message, extra = null) {
    const entry = { ts: (/* @__PURE__ */ new Date()).toISOString(), type, message, extra };
    g2.logs.push(entry);
    if (g2.logs.length > 400) g2.logs.shift();
    try {
      console[type === "error" ? "error" : "log"]("[CosmicBreaker]", message, extra ?? "");
    } catch {
    }
  }
  var init_logger = __esm({
    "src/systems/logger.ts"() {
    }
  });

  // src/systems/balls.ts
  function ballVariant(index) {
    const trait = BALL_TRAIT_SEQUENCE[(index % BALL_TRAIT_SEQUENCE.length + BALL_TRAIT_SEQUENCE.length) % BALL_TRAIT_SEQUENCE.length];
    return BALL_TRAIT_DEFINITIONS[trait];
  }
  function createBall(g2, index = 0) {
    const base = DIFF[g2.state.gameplay.difficulty].ball * 0.88;
    const variant = ballVariant(index);
    return {
      x: g2.paddle.x + g2.paddle.w / 2,
      y: g2.paddle.y - 10,
      r: 8,
      baseR: 8,
      vx: base * 0.5 * (g2.state.gameplay.lastBounceDir || 1),
      vy: -base * 0.7,
      pulse: Math.random() * Math.PI * 2,
      color: variant.color,
      trail: variant.trail,
      trait: variant.trait,
      trailPoints: []
    };
  }
  function applyBigBallState(g2) {
    const scale = g2.state.combat.bigBallTimer > 0 ? 1.8 : 1;
    for (const ball of g2.balls) ball.r = ball.baseR * scale;
  }
  function resetBall(g2) {
    g2.balls = [createBall(g2, 0)];
    g2.state.gameplay.awaitingLaunch = true;
    applyBigBallState(g2);
  }
  function syncAttachedBalls(g2) {
    g2.balls.forEach((ball, i) => {
      const spread = (i - (g2.balls.length - 1) / 2) * 7;
      ball.x = g2.paddle.x + g2.paddle.w / 2 + spread;
      ball.y = g2.paddle.y - 10;
    });
  }
  function getPaddleBounceVelocity(g2, rel, speed, fallbackVx = 0) {
    const maxAngle = Math.PI * 0.42;
    const minAngle = Math.PI * 0.12;
    const clampedRel = Math.max(-1, Math.min(1, rel));
    let dir = clampedRel === 0 ? 0 : Math.sign(clampedRel);
    if (dir === 0) dir = Math.sign(g2.state.gameplay.lastBounceDir || fallbackVx || 1) || 1;
    let absRel = Math.abs(clampedRel);
    if (absRel < 0.02) absRel = 0.02;
    const angle = minAngle + (maxAngle - minAngle) * absRel;
    const vx = Math.sin(angle) * speed * dir;
    const vy = -Math.cos(angle) * speed;
    g2.state.gameplay.lastBounceDir = dir;
    return { vx, vy, angle };
  }
  function spawnMultiBall(g2) {
    const maxBalls = 3;
    if (g2.balls.length >= maxBalls) return false;
    const next = g2.balls.map((ball) => ({ ...ball }));
    const cloneOffsets = [-0.28, 0.28, -0.46];
    let variantIndex = next.length;
    let cloneIndex = 0;
    for (const source of g2.balls) {
      if (next.length >= maxBalls) break;
      const speed = Math.max(DIFF[g2.state.gameplay.difficulty].ball * 0.9, Math.hypot(source.vx, source.vy) * 0.98);
      const angleBase = Math.atan2(source.vy || -1, source.vx || g2.state.gameplay.lastBounceDir || 1);
      const offset = cloneOffsets[cloneIndex % cloneOffsets.length];
      cloneIndex += 1;
      const angle = angleBase + offset;
      const variant = ballVariant(variantIndex++);
      next.push({
        x: source.x + Math.cos(angle) * 8,
        y: source.y + Math.sin(angle) * 4,
        r: source.baseR,
        baseR: source.baseR,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        pulse: Math.random() * Math.PI * 2,
        color: variant.color,
        trail: variant.trail,
        trait: variant.trait,
        trailPoints: []
      });
    }
    g2.balls = next.slice(0, maxBalls);
    g2.state.gameplay.awaitingLaunch = false;
    applyBigBallState(g2);
    logEvent(g2, "info", "multiball spawned", { balls: g2.balls.length, traits: g2.balls.map((b) => b.trait), balance: "phase8" });
    return g2.balls.length > 1;
  }
  var init_balls = __esm({
    "src/systems/balls.ts"() {
      init_constants();
      init_ballTraitDefinitions();
      init_logger();
    }
  });

  // src/data/stages.json
  var stages_default;
  var init_stages = __esm({
    "src/data/stages.json"() {
      stages_default = [
        {
          id: 1,
          code: "frost-rift",
          name: {
            ja: "\u30D5\u30ED\u30B9\u30C8\u30FB\u30EA\u30D5\u30C8",
            en: "Frost Rift"
          },
          description: {
            ja: "\u30CF\u30FC\u30C8\u3068\u30EA\u30DC\u30F3\u3092\u9023\u60F3\u3055\u305B\u308B\u7D50\u6676\u30B9\u30C6\u30FC\u30B8",
            en: "A crystal stage hinting at hearts and ribbons."
          },
          theme: {
            primary: "#8ef7ff",
            secondary: "#2f84ff"
          },
          layout: {
            rows: 8,
            cols: 14,
            gap: 8,
            side: 70,
            top: 96,
            eliteRuleOffset: 1,
            pattern: [
              "...CC....CC...",
              "..CCCC..CCCC..",
              ".CCCCCCCCCCCC.",
              ".CCCCCCCCCCCC.",
              "..CCCCCCCCCC..",
              "...CCCCCCCC...",
              ".....CCCC.....",
              "....CC..CC...."
            ],
            charMap: {
              C: "crystal"
            },
            blockHeight: 17
          },
          gimmicks: [
            {
              id: "crystal-resonance",
              label: "Crystal Resonance",
              effects: [
                {
                  kind: "pushWarning",
                  text: "Cryo shells resonate with plasma and nova.",
                  severity: "info"
                },
                {
                  kind: "modifyDropRate",
                  amount: 0.03
                },
                {
                  kind: "shiftThemeHue",
                  amount: -8
                },
                {
                  kind: "setBlockResistance",
                  label: "Cryo Shell",
                  traits: [
                    "plasma",
                    "nova"
                  ],
                  damageScale: 0.5,
                  rows: [
                    0,
                    2,
                    4
                  ],
                  modulo: 4,
                  equals: 1,
                  color: "#bfeaff"
                },
                {
                  kind: "applyTraitModifier",
                  trait: "plasma",
                  scoreBonus: 6,
                  damageScale: 1.15
                },
                {
                  kind: "enableHostilePattern",
                  id: "frost-meteor",
                  label: "Frost Meteors",
                  patternType: "meteor",
                  cooldown: 360,
                  severity: "warn"
                },
                {
                  kind: "setAudioTheme",
                  themeKey: "frost"
                },
                {
                  kind: "enableHostilePattern",
                  id: "frost-mines",
                  label: "Frost Mines",
                  patternType: "minefield",
                  cooldown: 9999,
                  severity: "info"
                }
              ]
            }
          ],
          audioTheme: "frost"
        },
        {
          id: 2,
          code: "inferno-spark",
          name: {
            ja: "\u30A4\u30F3\u30D5\u30A7\u30EB\u30CE\u30FB\u30B9\u30D1\u30FC\u30AF",
            en: "Inferno Spark"
          },
          description: {
            ja: "\u5F57\u661F\u306E\u5C3E\u3092\u5F15\u304F\u708E\u306E\u30B9\u30C6\u30FC\u30B8",
            en: "A blazing comet-tail style stage."
          },
          theme: {
            primary: "#ffb370",
            secondary: "#ff5d5d"
          },
          layout: {
            rows: 8,
            cols: 14,
            gap: 8,
            side: 70,
            top: 96,
            eliteRuleOffset: 2,
            pattern: [
              "......EE......",
              ".....EEEE.....",
              "....EEEEEE....",
              "...EEEEEEEE...",
              "..EEEEEEEEEE..",
              ".EEEEEEEEE....",
              "....EEEE......",
              "......EE......"
            ],
            charMap: {
              E: "ember"
            },
            blockHeight: 17
          },
          gimmicks: [
            {
              id: "ember-furnace",
              label: "Ember Furnace",
              effects: [
                {
                  kind: "pushWarning",
                  text: "Missile turrets ignite periodically.",
                  severity: "warn"
                },
                {
                  kind: "modifyBallSpeed",
                  multiplier: 1.04
                },
                {
                  kind: "shiftThemeHue",
                  amount: 12
                },
                {
                  kind: "enableAutoWeapon",
                  weapon: "missile",
                  cooldownScale: 1.25
                },
                {
                  kind: "applyDropBias",
                  drop: "fast",
                  weightDelta: 5
                },
                {
                  kind: "setBlockResistance",
                  label: "Heat Armor",
                  traits: [
                    "heavy",
                    "ghost"
                  ],
                  damageScale: 0.6,
                  rows: [
                    1,
                    4,
                    6
                  ],
                  modulo: 3,
                  equals: 0,
                  color: "#ffbf7d"
                },
                {
                  kind: "enableHostilePattern",
                  id: "ember-sweeper",
                  label: "Sweeper Beams",
                  patternType: "sweeper",
                  cooldown: 300,
                  severity: "danger"
                },
                {
                  kind: "setAudioTheme",
                  themeKey: "inferno"
                }
              ]
            }
          ],
          audioTheme: "inferno"
        },
        {
          id: 3,
          code: "nebula-drive",
          name: {
            ja: "\u30CD\u30D3\u30E5\u30E9\u30FB\u30C9\u30E9\u30A4\u30D6",
            en: "Nebula Drive"
          },
          description: {
            ja: "\u7B11\u9854\u3068\u661F\u5C51\u3092\u6DF7\u305C\u305F\u30CD\u30D3\u30E5\u30E9\u30B9\u30C6\u30FC\u30B8",
            en: "A nebula stage mixing smile and stardust."
          },
          theme: {
            primary: "#d6a8ff",
            secondary: "#6f8fff"
          },
          layout: {
            rows: 8,
            cols: 14,
            gap: 8,
            side: 70,
            top: 96,
            eliteRuleOffset: 0,
            pattern: [
              "..NN......NN..",
              ".NNNN....NNNN.",
              ".NN..NNNN..NN.",
              ".NN........NN.",
              ".NN.NNNNNN.NN.",
              ".NN..NNNN..NN.",
              "..NNNNNNNNNN..",
              "....NN..NN...."
            ],
            charMap: {
              N: "smile"
            },
            blockHeight: 17
          },
          gimmicks: [
            {
              id: "nebula-vacuum",
              label: "Nebula Vacuum",
              effects: [
                {
                  kind: "pushWarning",
                  text: "Gravity pulses bend trajectories.",
                  severity: "warn"
                },
                {
                  kind: "modifyDropRate",
                  amount: 0.08
                },
                {
                  kind: "modifyMagnetRange",
                  amount: 80
                },
                {
                  kind: "applyDropBias",
                  drop: "magnet",
                  weightDelta: 6
                },
                {
                  kind: "applyTraitModifier",
                  trait: "ghost",
                  pierceBonus: 0.18,
                  damageScale: 1.1
                },
                {
                  kind: "enableHostilePattern",
                  id: "nebula-gravity",
                  label: "Gravity Pulse",
                  patternType: "gravityPulse",
                  cooldown: 180,
                  severity: "warn"
                },
                {
                  kind: "setAudioTheme",
                  themeKey: "nebula"
                },
                {
                  kind: "enableHostilePattern",
                  id: "nebula-ring",
                  label: "Nova Ring",
                  patternType: "pulseRing",
                  cooldown: 235,
                  severity: "warn"
                }
              ]
            }
          ],
          audioTheme: "nebula"
        },
        {
          id: 4,
          code: "core-nexus",
          name: {
            ja: "\u30B3\u30A2\u30FB\u30CD\u30AF\u30B5\u30B9",
            en: "Core Nexus"
          },
          description: {
            ja: "\u738B\u51A0\u3068\u4E2D\u592E\u30B3\u30A2\u3092\u5F37\u8ABF\u3057\u305F\u6700\u7D42\u30DC\u30B9\u30E9\u30A6\u30F3\u30C9",
            en: "A final boss round with a crown motif and central core."
          },
          theme: {
            primary: "#b5ffcf",
            secondary: "#62c8ff"
          },
          layout: {
            rows: 8,
            cols: 14,
            gap: 8,
            side: 70,
            top: 96,
            eliteRuleOffset: 1,
            pattern: [
              ".K..K..K..K...",
              "KKKKKKKKKKKK..",
              "..KK..KK..KK..",
              "..KKKBBBKKKK..",
              "....KBBBBK....",
              "....KBBBBK....",
              ".....CCCC.....",
              "......CC......"
            ],
            charMap: {
              K: "crown",
              C: "core",
              B: "boss"
            },
            blockHeight: 18
          },
          gimmicks: [
            {
              id: "nexus-arsenal",
              label: "Nexus Arsenal",
              effects: [
                {
                  kind: "pushWarning",
                  text: "Laser emplacements and meteor volleys are active.",
                  severity: "danger"
                },
                {
                  kind: "shiftThemeHue",
                  amount: 20
                },
                {
                  kind: "enableAutoWeapon",
                  weapon: "laser",
                  cooldownScale: 1.15
                },
                {
                  kind: "applyDropBias",
                  drop: "laser",
                  weightDelta: 5
                },
                {
                  kind: "applyDropBias",
                  drop: "missile",
                  weightDelta: 4
                },
                {
                  kind: "setBlockResistance",
                  label: "Core Guard",
                  traits: [
                    "normal",
                    "heavy"
                  ],
                  damageScale: 0.55,
                  rows: [
                    0,
                    1,
                    3,
                    6
                  ],
                  modulo: 2,
                  equals: 0,
                  color: "#d7fff0"
                },
                {
                  kind: "applyTraitModifier",
                  trait: "nova",
                  scoreBonus: 12,
                  pierceBonus: 0.08,
                  damageScale: 1.2
                },
                {
                  kind: "enableHostilePattern",
                  id: "nexus-meteor",
                  label: "Meteor Volley",
                  patternType: "meteor",
                  cooldown: 160,
                  severity: "danger"
                },
                {
                  kind: "setAudioTheme",
                  themeKey: "nexus"
                },
                {
                  kind: "enableHostilePattern",
                  id: "nexus-ring",
                  label: "Core Pulse",
                  patternType: "pulseRing",
                  cooldown: 210,
                  severity: "danger"
                }
              ]
            }
          ],
          audioTheme: "nexus"
        }
      ];
    }
  });

  // src/data/stageDefinitions.ts
  
function getStageDefinition(stage) {
  const idx = Math.max(1, Math.min(TOTAL_STAGES, stage)) - 1;
  return JSON.parse(JSON.stringify(CUSTOM_STAGE_DEFINITIONS[idx]));
}
function getStageGimmicks(stage) {
  return getStageDefinition(stage).gimmicks || [];
}
var TOTAL_STAGES = 30;
function isBossStage(stage) {
  return stage % 6 === 0;
}
var CUSTOM_STAGE_DEFINITIONS = [{"id": 1, "code": "stage-01", "name": {"ja": "フロスト・リフト", "en": "Frost Lift"}, "description": {"ja": "フロスト・リフト のラウンド。", "en": "Frost Lift round."}, "theme": {"primary": "#9fe0ff", "secondary": "#5a7dff"}, "layout": {"rows": 8, "cols": 14, "gap": 8, "side": 70, "top": 96, "eliteRuleOffset": 1, "pattern": ["..............", "..AAAA..AAAA..", ".AAAAAA..AAAA.", ".AA..AA..AAAA.", ".AAAAAA..AAAA.", "..AAAA..AAAA..", "....AA..AA....", ".............."], "charMap": {"A": "crystal", "E": "ember", "N": "nebula", "S": "smile", "K": "crown", "C": "core"}, "blockHeight": 18}, "gimmicks": [{"id": "intro-open", "label": "Open Lane", "effects": [{"kind": "pushWarning", "text": "Open lanes and simple rebounds.", "severity": "info"}, {"kind": "setAudioTheme", "themeKey": "frost"}]}], "audioTheme": "frost"}, {"id": 2, "code": "stage-02", "name": {"ja": "インフェルノ・スパーク", "en": "Inferno Spark"}, "description": {"ja": "インフェルノ・スパーク のラウンド。", "en": "Inferno Spark round."}, "theme": {"primary": "#9fe0ff", "secondary": "#5a7dff"}, "layout": {"rows": 8, "cols": 14, "gap": 8, "side": 70, "top": 96, "eliteRuleOffset": 1, "pattern": ["..............", "..E.EE..EE.E..", ".EEEEEEEEEEEE.", ".EE..EE..EE...", ".EEEE..EEEE...", "...EE..EE.....", "..EEEEEEEE....", ".............."], "charMap": {"A": "crystal", "E": "ember", "N": "nebula", "S": "smile", "K": "crown", "C": "core"}, "blockHeight": 18}, "gimmicks": [{"id": "ember-flow", "label": "Ember Flow", "effects": [{"kind": "pushWarning", "text": "Warm blocks crack into bonus sparks.", "severity": "info"}, {"kind": "modifyDropRate", "amount": 0.02}, {"kind": "applyDropBias", "drop": "expand", "weightDelta": 2}, {"kind": "setAudioTheme", "themeKey": "inferno"}]}], "audioTheme": "inferno"}, {"id": 3, "code": "stage-03", "name": {"ja": "ネビュラ・ドライブ", "en": "Nebula Drive"}, "description": {"ja": "ネビュラ・ドライブ のラウンド。", "en": "Nebula Drive round."}, "theme": {"primary": "#9fe0ff", "secondary": "#5a7dff"}, "layout": {"rows": 8, "cols": 14, "gap": 8, "side": 70, "top": 96, "eliteRuleOffset": 1, "pattern": ["..............", "...NNNNNNNN...", "..NN..CC..NN..", ".NNN.NCCN.NNN.", ".NN..CCCC..NN.", "..NN..CC..NN..", "...NNNNNNNN...", ".............."], "charMap": {"A": "crystal", "E": "ember", "N": "nebula", "S": "smile", "K": "crown", "C": "core"}, "blockHeight": 18}, "gimmicks": [{"id": "core-focus", "label": "Core Focus", "effects": [{"kind": "pushWarning", "text": "Core nodes reward centered shots.", "severity": "info"}, {"kind": "applyTraitModifier", "trait": "normal", "scoreBonus": 6, "pierceBonus": 0.02, "damageScale": 1.02}, {"kind": "setAudioTheme", "themeKey": "nebula"}]}], "audioTheme": "nebula"}, {"id": 4, "code": "stage-04", "name": {"ja": "スマイル・サーキット", "en": "Smile Circuit"}, "description": {"ja": "スマイル・サーキット のラウンド。", "en": "Smile Circuit round."}, "theme": {"primary": "#9fe0ff", "secondary": "#5a7dff"}, "layout": {"rows": 8, "cols": 14, "gap": 8, "side": 70, "top": 96, "eliteRuleOffset": 1, "pattern": ["..............", "SS..SS..SS..SS", "SSSSSS..SSSSSS", "..SS..SS..SS..", "..SSSSSSSSSS..", "..SS..SS..SS..", "SS..SS..SS..SS", ".............."], "charMap": {"A": "crystal", "E": "ember", "N": "nebula", "S": "smile", "K": "crown", "C": "core"}, "blockHeight": 18}, "gimmicks": [{"id": "smile-circuit", "label": "Smile Circuit", "effects": [{"kind": "pushWarning", "text": "Smile lanes keep the tempo light.", "severity": "info"}, {"kind": "modifyDropRate", "amount": 0.04}, {"kind": "applyDropBias", "drop": "life", "weightDelta": 1}, {"kind": "applyDropBias", "drop": "score", "weightDelta": 2}, {"kind": "setAudioTheme", "themeKey": "frost"}]}], "audioTheme": "frost"}, {"id": 5, "code": "stage-05", "name": {"ja": "クラウン・リレー", "en": "Crown Relay"}, "description": {"ja": "クラウン・リレー のラウンド。", "en": "Crown Relay round."}, "theme": {"primary": "#9fe0ff", "secondary": "#5a7dff"}, "layout": {"rows": 8, "cols": 14, "gap": 8, "side": 70, "top": 96, "eliteRuleOffset": 1, "pattern": ["..............", "..K.KK..KK.K..", ".KKKKK..KKKKK.", "...KKK..KKK...", "..CCCC..CCCC..", "...KKK..KKK...", ".KKKKK..KKKKK.", ".............."], "charMap": {"A": "crystal", "E": "ember", "N": "nebula", "S": "smile", "K": "crown", "C": "core"}, "blockHeight": 18}, "gimmicks": [{"id": "royal-relay", "label": "Royal Relay", "effects": [{"kind": "pushWarning", "text": "Royal relays chain through the center.", "severity": "warn"}, {"kind": "applyTraitModifier", "trait": "nova", "scoreBonus": 8, "pierceBonus": 0.03, "damageScale": 1.05}, {"kind": "setBlockResistance", "label": "Royal Guard", "traits": ["normal"], "damageScale": 0.78, "color": "#d6ffc7", "rows": [1, 3, 5]}, {"kind": "setAudioTheme", "themeKey": "inferno"}]}], "audioTheme": "inferno"}, {"id": 6, "code": "stage-06", "name": {"ja": "アビス・コア I", "en": "Abyss Core I"}, "description": {"ja": "アビス・コア I のラウンド。", "en": "Abyss Core I round."}, "theme": {"primary": "#ff9cc8", "secondary": "#8c4cff"}, "layout": {"rows": 8, "cols": 14, "gap": 8, "side": 70, "top": 96, "eliteRuleOffset": 1, "pattern": [".....KKKK.....", "...KKKBBKKK...", "..KKBBBBBBKK..", "..KBBBBBBBBK..", "..KBBBBBBBBK..", "..KKBBCCBBKK..", "....KCCCCK....", "......CC......"], "charMap": {"K": "crown", "C": "core", "B": "boss"}, "blockHeight": 18}, "gimmicks": [{"id": "boss1", "label": "Boss I", "effects": [{"kind": "pushWarning", "text": "Abyss Core awakens. Strike the center.", "severity": "danger"}, {"kind": "setAudioTheme", "themeKey": "nexus"}, {"kind": "enableHostilePattern", "id": "nexus-meteor-lite", "label": "Meteor Feint", "patternType": "meteor", "cooldown": 220, "severity": "danger"}]}], "audioTheme": "nexus"}, {"id": 7, "code": "stage-07", "name": {"ja": "シャード・アレイ", "en": "Shard Alley"}, "description": {"ja": "シャード・アレイ のラウンド。", "en": "Shard Alley round."}, "theme": {"primary": "#9fe0ff", "secondary": "#5a7dff"}, "layout": {"rows": 8, "cols": 14, "gap": 8, "side": 70, "top": 96, "eliteRuleOffset": 1, "pattern": ["..............", "AA....AA....AA", "AAA..AAAA..AAA", ".AA..AA....AA.", "..AAAA..AAAA..", ".AA....AA..AA.", "AAA..AAAA..AAA", ".............."], "charMap": {"A": "crystal", "E": "ember", "N": "nebula", "S": "smile", "K": "crown", "C": "core"}, "blockHeight": 18}, "gimmicks": [{"id": "shard-angle", "label": "Shard Angle", "effects": [{"kind": "pushWarning", "text": "Shards form side pockets for angle play.", "severity": "info"}, {"kind": "modifyBallSpeed", "multiplier": 1.03}, {"kind": "setAudioTheme", "themeKey": "frost"}]}], "audioTheme": "inferno"}, {"id": 8, "code": "stage-08", "name": {"ja": "ブースト・コリドー", "en": "Boost Corridor"}, "description": {"ja": "ブースト・コリドー のラウンド。", "en": "Boost Corridor round."}, "theme": {"primary": "#9fe0ff", "secondary": "#5a7dff"}, "layout": {"rows": 8, "cols": 14, "gap": 8, "side": 70, "top": 96, "eliteRuleOffset": 1, "pattern": ["..............", "EEEE..NNNN..AA", "EEEE..NNNN..AA", "....EEEE......", "..AA..NN..EE..", "..AA..NN..EE..", "AANN..EE..NNAA", ".............."], "charMap": {"A": "crystal", "E": "ember", "N": "nebula", "S": "smile", "K": "crown", "C": "core"}, "blockHeight": 18}, "gimmicks": [{"id": "boost-lane", "label": "Boost Lane", "effects": [{"kind": "pushWarning", "text": "Blue lanes accelerate clean lines.", "severity": "warn"}, {"kind": "modifyBallSpeed", "multiplier": 1.08}, {"kind": "applyDropBias", "drop": "fast", "weightDelta": 2}, {"kind": "setAudioTheme", "themeKey": "frost"}]}], "audioTheme": "nebula"}, {"id": 9, "code": "stage-09", "name": {"ja": "グラビティ・ギャラリー", "en": "Gravity Gallery"}, "description": {"ja": "グラビティ・ギャラリー のラウンド。", "en": "Gravity Gallery round."}, "theme": {"primary": "#9fe0ff", "secondary": "#5a7dff"}, "layout": {"rows": 8, "cols": 14, "gap": 8, "side": 70, "top": 96, "eliteRuleOffset": 1, "pattern": ["..............", "..NNNN..NNNN..", ".NN..NNNN..NN.", ".NN..NNNN..NN.", "..CCCC..CCCC..", ".NN..NNNN..NN.", "..NNNN..NNNN..", ".............."], "charMap": {"A": "crystal", "E": "ember", "N": "nebula", "S": "smile", "K": "crown", "C": "core"}, "blockHeight": 18}, "gimmicks": [{"id": "gravity-gallery", "label": "Gravity Gallery", "effects": [{"kind": "pushWarning", "text": "Gravity bends routes, but only slightly.", "severity": "warn"}, {"kind": "modifyMagnetRange", "amount": 46}, {"kind": "setAudioTheme", "themeKey": "nebula"}, {"kind": "enableHostilePattern", "id": "grav-lite", "label": "Gravity Drift", "patternType": "gravityPulse", "cooldown": 260, "severity": "warn"}]}], "audioTheme": "frost"}, {"id": 10, "code": "stage-10", "name": {"ja": "ワープ・ラティス", "en": "Warp Lattice"}, "description": {"ja": "ワープ・ラティス のラウンド。", "en": "Warp Lattice round."}, "theme": {"primary": "#9fe0ff", "secondary": "#5a7dff"}, "layout": {"rows": 8, "cols": 14, "gap": 8, "side": 70, "top": 96, "eliteRuleOffset": 1, "pattern": ["..............", "AA..EE..NN..AA", "AA..EE..NN..AA", "....CC..CC....", "KKKK........KK", "....CC..CC....", "AA..NN..EE..AA", ".............."], "charMap": {"A": "crystal", "E": "ember", "N": "nebula", "S": "smile", "K": "crown", "C": "core"}, "blockHeight": 18}, "gimmicks": [{"id": "warp-lattice", "label": "Warp Lattice", "effects": [{"kind": "pushWarning", "text": "Warp lattice favors cross-court rebounds.", "severity": "warn"}, {"kind": "applyDropBias", "drop": "warp", "weightDelta": 3}, {"kind": "applyTraitModifier", "trait": "ghost", "scoreBonus": 4, "pierceBonus": 0.12, "damageScale": 1.04}, {"kind": "setAudioTheme", "themeKey": "nebula"}]}], "audioTheme": "inferno"}, {"id": 11, "code": "stage-11", "name": {"ja": "チェイン・リアクター", "en": "Chain Reactor"}, "description": {"ja": "チェイン・リアクター のラウンド。", "en": "Chain Reactor round."}, "theme": {"primary": "#9fe0ff", "secondary": "#5a7dff"}, "layout": {"rows": 8, "cols": 14, "gap": 8, "side": 70, "top": 96, "eliteRuleOffset": 1, "pattern": ["..............", "..EEEEEEEEEE..", "..E..AAAA..E..", "..E..ACCA..E..", "..E..AAAA..E..", "..EEEEEEEEEE..", "....NNNNNN....", ".............."], "charMap": {"A": "crystal", "E": "ember", "N": "nebula", "S": "smile", "K": "crown", "C": "core"}, "blockHeight": 18}, "gimmicks": [{"id": "chain-reactor", "label": "Chain Reactor", "effects": [{"kind": "pushWarning", "text": "Chain reactor rewards clustered breaks.", "severity": "warn"}, {"kind": "enableAutoWeapon", "weapon": "laser", "cooldownScale": 1.08}, {"kind": "applyDropBias", "drop": "laser", "weightDelta": 2}, {"kind": "setAudioTheme", "themeKey": "inferno"}]}], "audioTheme": "frost"}, {"id": 12, "code": "stage-12", "name": {"ja": "アビス・コア II", "en": "Abyss Core II"}, "description": {"ja": "アビス・コア II のラウンド。", "en": "Abyss Core II round."}, "theme": {"primary": "#ff9cc8", "secondary": "#8c4cff"}, "layout": {"rows": 8, "cols": 14, "gap": 8, "side": 70, "top": 96, "eliteRuleOffset": 1, "pattern": [".....NNNN.....", "...NNBBBBNN...", "..NBBBBBBBBN..", "..NBBBCCBBBN..", "..NBBBCCBBBN..", "..NBBBBBBBBN..", "....NCCCCN....", "......CC......"], "charMap": {"K": "crown", "C": "core", "B": "boss"}, "blockHeight": 18}, "gimmicks": [{"id": "boss2", "label": "Boss II", "effects": [{"kind": "pushWarning", "text": "Abyss Core shifts into a hotter phase.", "severity": "danger"}, {"kind": "setAudioTheme", "themeKey": "nexus"}, {"kind": "enableHostilePattern", "id": "nexus-meteor-mid", "label": "Meteor Volley", "patternType": "meteor", "cooldown": 175, "severity": "danger"}]}], "audioTheme": "nexus"}, {"id": 13, "code": "stage-13", "name": {"ja": "バスティオン・スプリット", "en": "Bastion Split"}, "description": {"ja": "バスティオン・スプリット のラウンド。", "en": "Bastion Split round."}, "theme": {"primary": "#9fe0ff", "secondary": "#5a7dff"}, "layout": {"rows": 8, "cols": 14, "gap": 8, "side": 70, "top": 96, "eliteRuleOffset": 1, "pattern": ["..............", "KKKK....KKKK..", "K..K....K..K..", "KCCK....KCCK..", "K..K....K..K..", "KKKK....KKKK..", "....AAAA......", ".............."], "charMap": {"A": "crystal", "E": "ember", "N": "nebula", "S": "smile", "K": "crown", "C": "core"}, "blockHeight": 18}, "gimmicks": [{"id": "bastion", "label": "Bastion", "effects": [{"kind": "pushWarning", "text": "Bastion blocks are walls, not objectives.", "severity": "warn"}, {"kind": "setBlockResistance", "label": "Bastion", "traits": ["normal", "heavy"], "damageScale": 0.62, "color": "#e2f4ff", "rows": [0, 1, 2, 3, 4, 5], "modulo": 4, "equals": 0}, {"kind": "setAudioTheme", "themeKey": "frost"}]}], "audioTheme": "nebula"}, {"id": 14, "code": "stage-14", "name": {"ja": "レール・ダンサーズ", "en": "Rail Dancers"}, "description": {"ja": "レール・ダンサーズ のラウンド。", "en": "Rail Dancers round."}, "theme": {"primary": "#9fe0ff", "secondary": "#5a7dff"}, "layout": {"rows": 8, "cols": 14, "gap": 8, "side": 70, "top": 96, "eliteRuleOffset": 1, "pattern": ["..............", "..AA..AA..AA..", "..AA..AA..AA..", "..EE..EE..EE..", "..NN..NN..NN..", "..SS..SS..SS..", "..CC..CC..CC..", ".............."], "charMap": {"A": "crystal", "E": "ember", "N": "nebula", "S": "smile", "K": "crown", "C": "core"}, "blockHeight": 18}, "gimmicks": [{"id": "rail-dance", "label": "Rail Dancers", "effects": [{"kind": "pushWarning", "text": "Rails feel alive, but stay readable.", "severity": "info"}, {"kind": "modifyBallSpeed", "multiplier": 1.04}, {"kind": "applyDropBias", "drop": "wide", "weightDelta": 2}, {"kind": "setAudioTheme", "themeKey": "frost"}]}], "audioTheme": "frost"}, {"id": 15, "code": "stage-15", "name": {"ja": "ミラー・ハイヴ", "en": "Mirror Hive"}, "description": {"ja": "ミラー・ハイヴ のラウンド。", "en": "Mirror Hive round."}, "theme": {"primary": "#9fe0ff", "secondary": "#5a7dff"}, "layout": {"rows": 8, "cols": 14, "gap": 8, "side": 70, "top": 96, "eliteRuleOffset": 1, "pattern": ["..............", "NNNNNN..EEEEEE", "N....N..E....E", "NNCCNN..EECCEE", "N....N..E....E", "NNNNNN..EEEEEE", "....KKKKKK....", ".............."], "charMap": {"A": "crystal", "E": "ember", "N": "nebula", "S": "smile", "K": "crown", "C": "core"}, "blockHeight": 18}, "gimmicks": [{"id": "mirror-hive", "label": "Mirror Hive", "effects": [{"kind": "pushWarning", "text": "Mirror hive twists your return line.", "severity": "warn"}, {"kind": "applyTraitModifier", "trait": "ghost", "scoreBonus": 5, "pierceBonus": 0.08, "damageScale": 1.06}, {"kind": "setAudioTheme", "themeKey": "nebula"}]}], "audioTheme": "inferno"}, {"id": 16, "code": "stage-16", "name": {"ja": "コア・カスケード", "en": "Core Cascade"}, "description": {"ja": "コア・カスケード のラウンド。", "en": "Core Cascade round."}, "theme": {"primary": "#9fe0ff", "secondary": "#5a7dff"}, "layout": {"rows": 8, "cols": 14, "gap": 8, "side": 70, "top": 96, "eliteRuleOffset": 1, "pattern": ["..............", "..CC..CC..CC..", ".AAAA..EEEEE..", ".A..A..E...E..", ".AAAA..EEEEE..", "..NNNN..NNNN..", "...SSSSSSSS...", ".............."], "charMap": {"A": "crystal", "E": "ember", "N": "nebula", "S": "smile", "K": "crown", "C": "core"}, "blockHeight": 18}, "gimmicks": [{"id": "core-cascade", "label": "Core Cascade", "effects": [{"kind": "pushWarning", "text": "Core cascades trigger satisfying clears.", "severity": "info"}, {"kind": "enableAutoWeapon", "weapon": "missile", "cooldownScale": 1.18}, {"kind": "applyDropBias", "drop": "missile", "weightDelta": 2}, {"kind": "applyDropBias", "drop": "score", "weightDelta": 2}, {"kind": "setAudioTheme", "themeKey": "inferno"}]}], "audioTheme": "frost"}, {"id": 17, "code": "stage-17", "name": {"ja": "コンボ・ガーデン", "en": "Combo Garden"}, "description": {"ja": "コンボ・ガーデン のラウンド。", "en": "Combo Garden round."}, "theme": {"primary": "#9fe0ff", "secondary": "#5a7dff"}, "layout": {"rows": 8, "cols": 14, "gap": 8, "side": 70, "top": 96, "eliteRuleOffset": 1, "pattern": ["..............", "SSSSSSSSSSSS..", "S..AA..AA..S..", "S..AA..AA..S..", "S..NNCCNN..S..", "S..AA..AA..S..", "SSSSSSSSSSSS..", ".............."], "charMap": {"A": "crystal", "E": "ember", "N": "nebula", "S": "smile", "K": "crown", "C": "core"}, "blockHeight": 18}, "gimmicks": [{"id": "combo-garden", "label": "Combo Garden", "effects": [{"kind": "pushWarning", "text": "Combo garden is built for long chains.", "severity": "info"}, {"kind": "modifyDropRate", "amount": 0.03}, {"kind": "applyTraitModifier", "trait": "nova", "scoreBonus": 10, "pierceBonus": 0.05, "damageScale": 1.06}, {"kind": "setAudioTheme", "themeKey": "frost"}]}], "audioTheme": "inferno"}, {"id": 18, "code": "stage-18", "name": {"ja": "アビス・コア III", "en": "Abyss Core III"}, "description": {"ja": "アビス・コア III のラウンド。", "en": "Abyss Core III round."}, "theme": {"primary": "#ff9cc8", "secondary": "#8c4cff"}, "layout": {"rows": 8, "cols": 14, "gap": 8, "side": 70, "top": 96, "eliteRuleOffset": 1, "pattern": [".....EEEE.....", "...EEBBBBEE...", "..EBBBBBBBBE..", "..EBBBCCBBBE..", "..EBBBCCBBBE..", "..EBBBBBBBBE..", "....ECCCCE....", "......CC......"], "charMap": {"K": "crown", "C": "core", "B": "boss"}, "blockHeight": 18}, "gimmicks": [{"id": "boss3", "label": "Boss III", "effects": [{"kind": "pushWarning", "text": "Abyss Core spawns under layered armor.", "severity": "danger"}, {"kind": "setAudioTheme", "themeKey": "nexus"}, {"kind": "setBlockResistance", "label": "Core Guard", "traits": ["normal", "heavy"], "damageScale": 0.55, "color": "#ffe7ef", "rows": [1, 3, 5], "modulo": 2, "equals": 0}, {"kind": "enableHostilePattern", "id": "nexus-meteor-dense", "label": "Meteor Volley", "patternType": "meteor", "cooldown": 160, "severity": "danger"}]}], "audioTheme": "nexus"}, {"id": 19, "code": "stage-19", "name": {"ja": "ラッシュ・チャネル", "en": "Rush Channel"}, "description": {"ja": "ラッシュ・チャネル のラウンド。", "en": "Rush Channel round."}, "theme": {"primary": "#9fe0ff", "secondary": "#5a7dff"}, "layout": {"rows": 8, "cols": 14, "gap": 8, "side": 70, "top": 96, "eliteRuleOffset": 1, "pattern": ["..............", "AAAAAA..EEEEEE", "..AA....EE....", "..AA..NNEE..NN", "..AA..NNEE..NN", "....EE....AA..", "EEEEEE..AAAAAA", ".............."], "charMap": {"A": "crystal", "E": "ember", "N": "nebula", "S": "smile", "K": "crown", "C": "core"}, "blockHeight": 18}, "gimmicks": [{"id": "rush-channel", "label": "Rush Channel", "effects": [{"kind": "pushWarning", "text": "Rush channel keeps the ball hot.", "severity": "warn"}, {"kind": "modifyBallSpeed", "multiplier": 1.12}, {"kind": "applyDropBias", "drop": "fast", "weightDelta": 3}, {"kind": "setAudioTheme", "themeKey": "inferno"}]}], "audioTheme": "frost"}, {"id": 20, "code": "stage-20", "name": {"ja": "スリップストリーム", "en": "Slipstream"}, "description": {"ja": "スリップストリーム のラウンド。", "en": "Slipstream round."}, "theme": {"primary": "#9fe0ff", "secondary": "#5a7dff"}, "layout": {"rows": 8, "cols": 14, "gap": 8, "side": 70, "top": 96, "eliteRuleOffset": 1, "pattern": ["..............", "NNNN..AAAA..NN", "..NN..AAAA..NN", "..NN..CCCC..NN", "EE..EE....EE..", "EE..EE....EE..", "NN..AAAA..NNNN", ".............."], "charMap": {"A": "crystal", "E": "ember", "N": "nebula", "S": "smile", "K": "crown", "C": "core"}, "blockHeight": 18}, "gimmicks": [{"id": "slipstream", "label": "Slipstream", "effects": [{"kind": "pushWarning", "text": "Slipstream rewards clean control at speed.", "severity": "warn"}, {"kind": "modifyBallSpeed", "multiplier": 1.1}, {"kind": "modifyMagnetRange", "amount": 24}, {"kind": "setAudioTheme", "themeKey": "frost"}]}], "audioTheme": "inferno"}, {"id": 21, "code": "stage-21", "name": {"ja": "プリズム・ロック", "en": "Prism Lock"}, "description": {"ja": "プリズム・ロック のラウンド。", "en": "Prism Lock round."}, "theme": {"primary": "#9fe0ff", "secondary": "#5a7dff"}, "layout": {"rows": 8, "cols": 14, "gap": 8, "side": 70, "top": 96, "eliteRuleOffset": 1, "pattern": ["..............", "..AA..AA..AA..", ".A.AA.AA.AA.A.", ".A..A.AA.A..A.", ".A.AA.CC.AA.A.", ".A..A.AA.A..A.", ".A.AA.AA.AA.A.", ".............."], "charMap": {"A": "crystal", "E": "ember", "N": "nebula", "S": "smile", "K": "crown", "C": "core"}, "blockHeight": 18}, "gimmicks": [{"id": "prism-lock", "label": "Prism Lock", "effects": [{"kind": "pushWarning", "text": "Prism locks leave just enough room to thread.", "severity": "warn"}, {"kind": "setBlockResistance", "label": "Prism Lock", "traits": ["normal"], "damageScale": 0.72, "color": "#d3eeff", "rows": [0, 2, 4, 6]}, {"kind": "setAudioTheme", "themeKey": "nebula"}]}], "audioTheme": "frost"}, {"id": 22, "code": "stage-22", "name": {"ja": "ゲート・ウィーブ", "en": "Gate Weave"}, "description": {"ja": "ゲート・ウィーブ のラウンド。", "en": "Gate Weave round."}, "theme": {"primary": "#9fe0ff", "secondary": "#5a7dff"}, "layout": {"rows": 8, "cols": 14, "gap": 8, "side": 70, "top": 96, "eliteRuleOffset": 1, "pattern": ["..............", "EE..NN..EE..NN", "EE..NN..EE..NN", "..CCCC..CCCC..", "AA..KK..AA..KK", "AA..KK..AA..KK", "NN..EE..NN..EE", ".............."], "charMap": {"A": "crystal", "E": "ember", "N": "nebula", "S": "smile", "K": "crown", "C": "core"}, "blockHeight": 18}, "gimmicks": [{"id": "gate-weave", "label": "Gate Weave", "effects": [{"kind": "pushWarning", "text": "Gate weave mixes lanes without blocking flow.", "severity": "warn"}, {"kind": "applyDropBias", "drop": "warp", "weightDelta": 2}, {"kind": "modifyBallSpeed", "multiplier": 1.05}, {"kind": "setAudioTheme", "themeKey": "nebula"}]}], "audioTheme": "inferno"}, {"id": 23, "code": "stage-23", "name": {"ja": "ブレイクストーム", "en": "Breakstorm"}, "description": {"ja": "ブレイクストーム のラウンド。", "en": "Breakstorm round."}, "theme": {"primary": "#9fe0ff", "secondary": "#5a7dff"}, "layout": {"rows": 8, "cols": 14, "gap": 8, "side": 70, "top": 96, "eliteRuleOffset": 1, "pattern": ["..............", "..AAAAAAAAAA..", "..AEEEEEEEEA..", "..AENNNNNNEA..", "..AENCCCCNEA..", "..AENNNNNNEA..", "..AAAAAAAAAA..", ".............."], "charMap": {"A": "crystal", "E": "ember", "N": "nebula", "S": "smile", "K": "crown", "C": "core"}, "blockHeight": 18}, "gimmicks": [{"id": "breakstorm", "label": "Breakstorm", "effects": [{"kind": "pushWarning", "text": "Breakstorm turns dense lines into showers.", "severity": "danger"}, {"kind": "enableAutoWeapon", "weapon": "laser", "cooldownScale": 1.0}, {"kind": "modifyBallSpeed", "multiplier": 1.06}, {"kind": "setAudioTheme", "themeKey": "inferno"}]}], "audioTheme": "nebula"}, {"id": 24, "code": "stage-24", "name": {"ja": "アビス・コア IV", "en": "Abyss Core IV"}, "description": {"ja": "アビス・コア IV のラウンド。", "en": "Abyss Core IV round."}, "theme": {"primary": "#ff9cc8", "secondary": "#8c4cff"}, "layout": {"rows": 8, "cols": 14, "gap": 8, "side": 70, "top": 96, "eliteRuleOffset": 1, "pattern": [".....KKKK.....", "...KBBBBBBK...", "..KBBBCCBBBK..", "..BBBBCCBBBB..", "..BBBBCCBBBB..", "..KBBBCCBBBK..", "....KCCCCK....", "......CC......"], "charMap": {"K": "crown", "C": "core", "B": "boss"}, "blockHeight": 18}, "gimmicks": [{"id": "boss4", "label": "Boss IV", "effects": [{"kind": "pushWarning", "text": "Abyss Core burns brighter and hits harder.", "severity": "danger"}, {"kind": "setAudioTheme", "themeKey": "nexus"}, {"kind": "enableHostilePattern", "id": "nexus-meteor-rapid", "label": "Meteor Storm", "patternType": "meteor", "cooldown": 145, "severity": "danger"}]}], "audioTheme": "nexus"}, {"id": 25, "code": "stage-25", "name": {"ja": "ミックス・リレー", "en": "Mixed Relay"}, "description": {"ja": "ミックス・リレー のラウンド。", "en": "Mixed Relay round."}, "theme": {"primary": "#9fe0ff", "secondary": "#5a7dff"}, "layout": {"rows": 8, "cols": 14, "gap": 8, "side": 70, "top": 96, "eliteRuleOffset": 1, "pattern": ["..............", "AAEE..NNSS..KK", "AAEE..NNSS..KK", "..CC..CC..CC..", "KK..SS..NN..EE", "KK..SS..NN..EE", "..AAAA..EEEE..", ".............."], "charMap": {"A": "crystal", "E": "ember", "N": "nebula", "S": "smile", "K": "crown", "C": "core"}, "blockHeight": 18}, "gimmicks": [{"id": "mixed-relay", "label": "Mixed Relay", "effects": [{"kind": "pushWarning", "text": "Mixed relay folds earlier ideas into one flow.", "severity": "info"}, {"kind": "modifyDropRate", "amount": 0.02}, {"kind": "modifyBallSpeed", "multiplier": 1.05}, {"kind": "setAudioTheme", "themeKey": "frost"}]}], "audioTheme": "inferno"}, {"id": 26, "code": "stage-26", "name": {"ja": "リング・ヴォールト", "en": "Ring Vault"}, "description": {"ja": "リング・ヴォールト のラウンド。", "en": "Ring Vault round."}, "theme": {"primary": "#9fe0ff", "secondary": "#5a7dff"}, "layout": {"rows": 8, "cols": 14, "gap": 8, "side": 70, "top": 96, "eliteRuleOffset": 1, "pattern": ["..............", "..NNNNNNNNNN..", "..NAA....AAN..", "..NAACCCCAAN..", "..NAA....AAN..", "..NNNNNNNNNN..", "....EEEEEE....", ".............."], "charMap": {"A": "crystal", "E": "ember", "N": "nebula", "S": "smile", "K": "crown", "C": "core"}, "blockHeight": 18}, "gimmicks": [{"id": "ring-vault", "label": "Ring Vault", "effects": [{"kind": "pushWarning", "text": "Ring vault hides jackpots in the inner lane.", "severity": "warn"}, {"kind": "applyDropBias", "drop": "score", "weightDelta": 3}, {"kind": "applyTraitModifier", "trait": "plasma", "scoreBonus": 8, "pierceBonus": 0.06, "damageScale": 1.05}, {"kind": "setAudioTheme", "themeKey": "nebula"}]}], "audioTheme": "frost"}, {"id": 27, "code": "stage-27", "name": {"ja": "フォートレス・デュプレクス", "en": "Fortress Duplex"}, "description": {"ja": "フォートレス・デュプレクス のラウンド。", "en": "Fortress Duplex round."}, "theme": {"primary": "#9fe0ff", "secondary": "#5a7dff"}, "layout": {"rows": 8, "cols": 14, "gap": 8, "side": 70, "top": 96, "eliteRuleOffset": 1, "pattern": ["..............", "KKKKKK..KKKKKK", "K....K..K....K", "K.CC.K..K.CC.K", "K....K..K....K", "KKKKKK..KKKKKK", "....NNNNNN....", ".............."], "charMap": {"A": "crystal", "E": "ember", "N": "nebula", "S": "smile", "K": "crown", "C": "core"}, "blockHeight": 18}, "gimmicks": [{"id": "fortress-duplex", "label": "Fortress Duplex", "effects": [{"kind": "pushWarning", "text": "Fortress duplex asks for route planning, not grind.", "severity": "warn"}, {"kind": "setBlockResistance", "label": "Duplex Wall", "traits": ["normal", "heavy"], "damageScale": 0.66, "color": "#dbe9ff", "rows": [1, 3, 5], "modulo": 3, "equals": 1}, {"kind": "setAudioTheme", "themeKey": "frost"}]}], "audioTheme": "inferno"}, {"id": 28, "code": "stage-28", "name": {"ja": "コンボ・ファーネス", "en": "Combo Furnace"}, "description": {"ja": "コンボ・ファーネス のラウンド。", "en": "Combo Furnace round."}, "theme": {"primary": "#9fe0ff", "secondary": "#5a7dff"}, "layout": {"rows": 8, "cols": 14, "gap": 8, "side": 70, "top": 96, "eliteRuleOffset": 1, "pattern": ["..............", "SSSS..AAAA..SS", "S..S..AAAA..S.", "SSSS..CCCC..SS", "....EEEEEEEE..", "..NNNN....NN..", "SS..AAAA..SS..", ".............."], "charMap": {"A": "crystal", "E": "ember", "N": "nebula", "S": "smile", "K": "crown", "C": "core"}, "blockHeight": 18}, "gimmicks": [{"id": "combo-furnace", "label": "Combo Furnace", "effects": [{"kind": "pushWarning", "text": "Combo furnace turns rhythm into score.", "severity": "danger"}, {"kind": "modifyBallSpeed", "multiplier": 1.07}, {"kind": "modifyDropRate", "amount": 0.01}, {"kind": "applyTraitModifier", "trait": "nova", "scoreBonus": 14, "pierceBonus": 0.06, "damageScale": 1.08}, {"kind": "setAudioTheme", "themeKey": "inferno"}]}], "audioTheme": "nebula"}, {"id": 29, "code": "stage-29", "name": {"ja": "フォールス・スローン", "en": "False Throne"}, "description": {"ja": "フォールス・スローン のラウンド。", "en": "False Throne round."}, "theme": {"primary": "#9fe0ff", "secondary": "#5a7dff"}, "layout": {"rows": 8, "cols": 14, "gap": 8, "side": 70, "top": 96, "eliteRuleOffset": 1, "pattern": ["..............", "..KKKK..KKKK..", ".KAAAAKKAAAAK.", ".KAACCCCCCAAK.", ".KNNCCCCCCNNK.", ".KAAAAKKAAAAK.", "..KKKK..KKKK..", ".............."], "charMap": {"A": "crystal", "E": "ember", "N": "nebula", "S": "smile", "K": "crown", "C": "core"}, "blockHeight": 18}, "gimmicks": [{"id": "false-throne", "label": "False Throne", "effects": [{"kind": "pushWarning", "text": "False throne looks like a boss room, but flows faster.", "severity": "danger"}, {"kind": "enableAutoWeapon", "weapon": "missile", "cooldownScale": 1.04}, {"kind": "modifyBallSpeed", "multiplier": 1.08}, {"kind": "setAudioTheme", "themeKey": "nebula"}, {"kind": "enableHostilePattern", "id": "grav-late", "label": "Gravity Drift", "patternType": "gravityPulse", "cooldown": 230, "severity": "warn"}]}], "audioTheme": "frost"}, {"id": 30, "code": "stage-30", "name": {"ja": "アビス・コア Ω", "en": "Abyss Core Ω"}, "description": {"ja": "アビス・コア Ω のラウンド。", "en": "Abyss Core Ω round."}, "theme": {"primary": "#ff9cc8", "secondary": "#8c4cff"}, "layout": {"rows": 8, "cols": 14, "gap": 8, "side": 70, "top": 96, "eliteRuleOffset": 1, "pattern": [".....KKKK.....", "...KBBBBBBK...", "..KBBBBBBBBK..", "..BBBBCCBBBB..", "..BBBBCCBBBB..", "..KBBBBBBBBK..", "....KCCCCK....", "....CC..CC...."], "charMap": {"K": "crown", "C": "core", "B": "boss"}, "blockHeight": 18}, "gimmicks": [{"id": "boss5", "label": "Boss Ω", "effects": [{"kind": "pushWarning", "text": "Final core. Break the shell, then end it.", "severity": "danger"}, {"kind": "setAudioTheme", "themeKey": "nexus"}, {"kind": "setBlockResistance", "label": "Final Guard", "traits": ["normal", "heavy"], "damageScale": 0.52, "color": "#ffd9e7", "rows": [0, 1, 5, 6], "modulo": 2, "equals": 0}, {"kind": "enableHostilePattern", "id": "omega-meteor", "label": "Omega Storm", "patternType": "meteor", "cooldown": 135, "severity": "danger"}]}], "audioTheme": "nexus"}];
var STAGE_DEFINITIONS;
var init_stageDefinitions = __esm({
  "src/data/stageDefinitions.ts"() {
    init_stages();
    STAGE_DEFINITIONS = CUSTOM_STAGE_DEFINITIONS;
  }
});


  // src/systems/ui.ts
  function detectLang() {
    return (navigator.language || "en").toLowerCase().startsWith("ja") ? "ja" : "en";
  }
  function t(g2, key) {
    return I18N[g2.prefs.lang][key];
  }
  function renderLivesMarkup(lives) {
    const visible = Math.min(5, Math.max(0, lives));
    const icons = Array.from({ length: visible }, (_, i) => `<span class="lifeGem${i === 0 ? " isLead" : ""}">\u25C6</span>`).join("");
    return `<span class="lifeRack">${icons || '<span class="lifeGem isGhost">\u25C7</span>'}</span><span class="lifeCount">\xD7${lives}</span>`;
  }
  function renderComboMarkup(combo) {
    const active = combo > 1;
    const label = active ? `${combo} CHAIN` : "0 CHAIN";
    return `<span class="comboCore${active ? " isHot" : ""}">${label}</span>`;
  }
  function applyHudVisibility(g2) {
    const hud = document.getElementById("hud");
    if (!hud) return;
    hud.classList.toggle("is-collapsed", g2.state.ui.hudHidden);
    g2.ui.hudBtn.textContent = g2.state.ui.hudHidden ? "HUD +" : "HUD \u2212";
  }
  function toggleHud(g2, forceHidden) {
    g2.state.ui.hudHidden = typeof forceHidden === "boolean" ? forceHidden : !g2.state.ui.hudHidden;
    applyHudVisibility(g2);
    logEvent(g2, "info", "hud toggled", { hidden: g2.state.ui.hudHidden });
  }
  function overlay(g2, text, ms = 900) {
    g2.ui.overlayText.textContent = text;
    g2.ui.overlay.classList.remove("hidden");
    clearTimeout(overlay._t);
    overlay._t = window.setTimeout(() => g2.ui.overlay.classList.add("hidden"), ms);
  }
  function updateUI(g2) {
    g2.ui.labelScore.textContent = t(g2, "score");
    g2.ui.labelLives.textContent = t(g2, "lives");
    g2.ui.labelStage.textContent = t(g2, "stage");
    g2.ui.labelCombo.textContent = t(g2, "combo");
    g2.ui.labelBest.textContent = t(g2, "best");
    g2.ui.startBtn.textContent = t(g2, "start");
    g2.ui.pauseBtn.textContent = t(g2, "pause");
    g2.ui.menuBtn.textContent = t(g2, "menu");
    g2.ui.recordsBtn.textContent = t(g2, "records");
    g2.ui.logsBtn.textContent = t(g2, "logs");
    g2.ui.recBtn.textContent = g2.recording?.active ? t(g2, "recordStop") : t(g2, "record");
    g2.ui.shareBtn.textContent = t(g2, "shareClip");
    if (g2.ui.replayBtn) g2.ui.replayBtn.textContent = g2.prefs.lang === "ja" ? "リプレイリンク" : "Replay Link";
    if (g2.ui.modeSelect && !g2.ui.modeSelect.dataset.i18nDone) {
      g2.ui.modeSelect.options[0].textContent = g2.prefs.lang === "ja" ? "通常" : "Standard";
      g2.ui.modeSelect.options[1].textContent = g2.prefs.lang === "ja" ? "3分スプリント" : "Sprint 3:00";
      g2.ui.modeSelect.dataset.i18nDone = "1";
    }
    g2.ui.soundBtn.textContent = g2.prefs.soundEnabled ? t(g2, "soundOn") : t(g2, "soundOff");
    g2.ui.recBtn.dataset.active = g2.recording?.active ? "1" : "0";
    g2.ui.shareBtn.dataset.ready = g2.recording?.blob ? "1" : "0";
    g2.ui.menuTitle.textContent = t(g2, "menuTitle");
    g2.ui.menuSub.textContent = t(g2, "menuSub");
    g2.ui.controlTitle.textContent = t(g2, "controlTitle");
    g2.ui.controlBody.innerHTML = t(g2, "controlBody").replaceAll("\n", "<br>");
    g2.ui.recordsTitle.textContent = t(g2, "records");
    g2.ui.stageTitle.textContent = t(g2, "stageSelect");
    g2.ui.menuStart.textContent = t(g2, "startRun");
    g2.ui.menuStageSelect.textContent = t(g2, "stageSelect");
    g2.ui.menuRecords.textContent = t(g2, "records");
    g2.ui.menuLogs.textContent = t(g2, "logs");
    g2.ui.recordsClose.textContent = t(g2, "close");
    g2.ui.recordsReset.textContent = t(g2, "resetRecords");
    g2.ui.stageClose.textContent = t(g2, "close");
    g2.ui.logsClose.textContent = t(g2, "close");
    g2.ui.scoreVal.textContent = g2.state.gameplay.score.toLocaleString("en-US");
    g2.ui.livesVal.innerHTML = renderLivesMarkup(g2.state.gameplay.lives);
    g2.ui.stageVal.textContent = `${g2.state.gameplay.stageIndex} \xB7 ${getStageDefinition(g2.state.gameplay.stageIndex).name[g2.prefs.lang]}`;
    g2.ui.comboVal.innerHTML = renderComboMarkup(g2.state.gameplay.combo);
    g2.ui.bestVal.textContent = String(g2.prefs.bestScore);
    if (g2.runMeta.mode === 'sprint3' && g2.ui.stageVal) {
      const sec = Math.max(0, Math.ceil((g2.runMeta.timerFrames || 0) / 60));
      g2.ui.stageVal.textContent = `S${g2.state.gameplay.stageIndex} / ${Math.floor(sec / 60)}:${String(sec % 60).padStart(2,'0')}`;
    }
    const scoreChip = g2.ui.scoreVal.parentElement;
    if (scoreChip) scoreChip.style.transform = `scale(${(1 + (g2.state.stageRuntime.scoreHudPulse || 0) * 0.08).toFixed(3)})`;
    const comboChip = g2.ui.comboVal.parentElement;
    if (comboChip) {
      comboChip.dataset.hot = g2.state.gameplay.combo > 1 ? "1" : "0";
      comboChip.dataset.comboTier = g2.state.gameplay.combo >= 30 ? "3" : g2.state.gameplay.combo >= 20 ? "2" : g2.state.gameplay.combo >= 10 ? "1" : "0";
      comboChip.style.transform = `scale(${(1 + (g2.state.stageRuntime.comboHudPulse || 0) * 0.08).toFixed(3)})`;
    }
    const livesChip = g2.ui.livesVal.parentElement;
    if (livesChip) livesChip.dataset.low = g2.state.gameplay.lives <= 2 ? "1" : "0";
    applyHudVisibility(g2);
  }
  var init_ui = __esm({
    "src/systems/ui.ts"() {
      init_constants();
      init_stageDefinitions();
      init_logger();
    }
  });

  // src/core/storage.ts
  var STORAGE;
  var init_storage = __esm({
    "src/core/storage.ts"() {
      STORAGE = typeof chrome !== "undefined" && chrome?.storage?.local ? chrome.storage.local : {
        async get() {
          return {};
        },
        async set() {
        }
      };
    }
  });

  // src/systems/persistence.ts
  async function loadPrefs(g2) {
    const s = await STORAGE.get(["lang", "soundEnabled", "bestScore", "playCount", "leaderboardLocal"]);
    g2.prefs.lang = s.lang || detectLang();
    g2.prefs.soundEnabled = s.soundEnabled !== false;
    g2.prefs.bestScore = Number(s.bestScore || 0);
    g2.prefs.playCount = Number(s.playCount || 0);
    const board = s.leaderboardLocal || {};
    g2.leaderboard = { standard: Array.isArray(board.standard) ? board.standard : [], sprint3: Array.isArray(board.sprint3) ? board.sprint3 : [] };
  }
  async function savePrefs(g2) {
    await STORAGE.set({
      lang: g2.prefs.lang,
      soundEnabled: g2.prefs.soundEnabled,
      bestScore: g2.prefs.bestScore,
      playCount: g2.prefs.playCount,
      leaderboardLocal: g2.leaderboard
    });
  }
  var init_persistence = __esm({
    "src/systems/persistence.ts"() {
      init_storage();
      init_ui();
    }
  });


  function mulberry32(seed) {
    let t = seed >>> 0;
    return function() {
      t += 1831565813;
      let r = Math.imul(t ^ t >>> 15, 1 | t);
      r ^= r + Math.imul(r ^ r >>> 7, 61 | r);
      return ((r ^ r >>> 14) >>> 0) / 4294967296;
    };
  }
  const __nativeRandom = Math.random.bind(Math);
  function setRunSeed(g2, seed) {
    g2.runMeta.seed = seed >>> 0;
    g2.replay.seed = g2.runMeta.seed;
    Math.random = mulberry32(g2.runMeta.seed);
  }
  function restoreRandom() {
    Math.random = __nativeRandom;
  }
  function replayEncode(obj) {
    const json = JSON.stringify(obj);
    return btoa(unescape(encodeURIComponent(json))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
  }
  function replayDecode(str) {
    const pad = str + '==='.slice((str.length + 3) % 4);
    return JSON.parse(decodeURIComponent(escape(atob(pad.replace(/-/g, '+').replace(/_/g, '/')))));
  }
  function saveLeaderboardEntry(g2, reason = 'finish') {
    if (g2.runMeta.resultSaved) return;
    const mode = g2.runMeta.mode || 'standard';
    const target = g2.leaderboard[mode] || (g2.leaderboard[mode] = []);
    const entry = {
      score: g2.state.gameplay.score,
      stage: g2.state.gameplay.stageIndex,
      difficulty: g2.state.gameplay.difficulty,
      mode,
      reason,
      at: new Date().toISOString(),
      combo: g2.state.gameplay.combo,
      time: mode === 'sprint3' ? Math.max(0, Math.floor((g2.runMeta.timerMaxFrames - g2.runMeta.timerFrames) / 60)) : null
    };
    target.push(entry);
    target.sort((a, b) => b.score - a.score || (a.time || 0) - (b.time || 0));
    g2.leaderboard[mode] = target.slice(0, 10);
    g2.runMeta.resultSaved = true;
    void savePrefs(g2);
  }
  function beginReplayCapture(g2) {
    g2.replay.active = true;
    g2.replay.playing = false;
    g2.replay.tick = 0;
    g2.replay.samples = [];
    g2.replay.actionFlags = 0;
    g2.replay.mode = g2.runMeta.mode || 'standard';
    g2.replay.difficulty = g2.state.gameplay.difficulty;
    g2.replay.stage = 1;
    g2.replay.version = 1;
  }
  function queueReplayAction(g2, flag) {
    if (!g2.replay?.active || g2.replay.playing) return;
    g2.replay.actionFlags |= flag;
  }
  function captureReplaySample(g2) {
    if (!g2.replay?.active || g2.replay.playing) return;
    g2.replay.tick += 1;
    if (g2.replay.tick % g2.replay.sampleRate !== 0) return;
    const nx = Math.max(0, Math.min(255, Math.round(((g2.state.input.pointerTargetX || g2.paddle.x) / Math.max(1, g2.W - g2.paddle.w - 10)) * 255)));
    let flags = g2.replay.actionFlags & 255;
    if (g2.state.input.keys.left) flags |= 1;
    if (g2.state.input.keys.right) flags |= 2;
    if (g2.state.gameplay.mouseActive) flags |= 4;
    g2.replay.samples.push(nx, flags);
    g2.replay.actionFlags = 0;
  }
  function buildReplayUrl(g2) {
    if (!g2.replay?.samples?.length) return '';
    const payload = {
      v: 1,
      seed: g2.runMeta.seed >>> 0,
      mode: g2.runMeta.mode || 'standard',
      diff: g2.state.gameplay.difficulty,
      rate: g2.replay.sampleRate,
      samples: g2.replay.samples
    };
    return `${location.origin}${location.pathname}#r=${replayEncode(payload)}`;
  }
  async function copyReplayLink(g2) {
    const url = buildReplayUrl(g2);
    if (!url) { overlay(g2, 'NO REPLAY', 700); return; }
    try { await navigator.clipboard.writeText(url); overlay(g2, 'REPLAY LINK COPIED', 900); } catch { prompt('Copy Replay Link', url); }
    g2.replay.lastUrl = url;
  }
  function parseReplayFromHash() {
    const m = location.hash.match(/#r=([^&]+)/);
    if (!m) return null;
    try { return replayDecode(m[1]); } catch (error) { console.error('[CosmicBreaker][replay:decode]', error); return null; }
  }
  function applyReplayPlayback(g2) {
    if (!g2.replay?.playing || !g2.replay.pending) return;
    const rep = g2.replay.pending;
    rep.tick = (rep.tick || 0) + 1;
    if (rep.tick % rep.rate !== 0) return;
    const i = (rep.index || 0) * 2;
    if (i >= rep.samples.length) return;
    const nx = rep.samples[i] || 0;
    const flags = rep.samples[i + 1] || 0;
    rep.index = (rep.index || 0) + 1;
    g2.state.gameplay.mouseActive = !!(flags & 4);
    g2.state.input.keys.left = !!(flags & 1);
    g2.state.input.keys.right = !!(flags & 2);
    g2.state.input.pointerTargetX = Math.max(10, Math.min(g2.W - g2.paddle.w - 10, (nx / 255) * Math.max(1, g2.W - g2.paddle.w - 10)));
    if (flags & 8) launch(g2);
    if (flags & 16 && g2.state.combat.laserTimer > 0) spawnLaserBurst(g2);
    if (flags & 32 && g2.state.combat.missileTimer > 0) spawnMissileBurst(g2);
  }
  function setupRunMode(g2, mode) {
    g2.runMeta.mode = mode || 'standard';
    g2.runMeta.resultSaved = false;
    g2.runMeta.lastStageGate = 0;
    if (g2.runMeta.mode === 'sprint3') {
      g2.runMeta.timerMaxFrames = 180 * 60;
      g2.runMeta.timerFrames = 180 * 60;
      g2.runMeta.nextStageAt = [135 * 60, 90 * 60, 45 * 60];
      g2.state.gameplay.lives = Math.min(g2.state.gameplay.lives, 4);
    } else {
      g2.runMeta.timerMaxFrames = 0;
      g2.runMeta.timerFrames = 0;
      g2.runMeta.nextStageAt = [];
    }
  }
  function transitionSprintStage(g2, stage) {
    const keepScore = g2.state.gameplay.score;
    const keepLives = g2.state.gameplay.lives;
    const keepCombo = g2.state.gameplay.combo;
    spawnStage(g2, stage);
    g2.state.gameplay.score = keepScore;
    g2.state.gameplay.lives = keepLives;
    g2.state.gameplay.combo = keepCombo;
    g2.state.gameplay.running = true;
    g2.state.gameplay.started = true;
    overlay(g2, `PHASE ${stage}`, 750);
    g2.state.stageRuntime.screenFlash = Math.max(g2.state.stageRuntime.screenFlash, 0.18);
    stageBeep(g2, 'warning', 980 + stage * 40, 0.08, 'triangle', 0.03);
  }
  function updateSprintMode(g2) {
    if (g2.runMeta.mode !== 'sprint3' || !g2.state.gameplay.running || g2.state.gameplay.paused) return;
    if (g2.runMeta.timerFrames > 0) g2.runMeta.timerFrames -= 1;
    const remain = g2.runMeta.timerFrames;
    if (g2.runMeta.lastStageGate < 1 && remain <= 135 * 60) { g2.runMeta.lastStageGate = 1; transitionSprintStage(g2, 2); }
    else if (g2.runMeta.lastStageGate < 2 && remain <= 90 * 60) { g2.runMeta.lastStageGate = 2; transitionSprintStage(g2, 3); }
    else if (g2.runMeta.lastStageGate < 3 && remain <= 45 * 60) { g2.runMeta.lastStageGate = 3; transitionSprintStage(g2, 4); }
    if (remain === 10 * 60 || remain === 30 * 60 || remain === 60 * 60) pushWarning(g2, `${Math.ceil(remain / 60)} SEC LEFT`, 'danger', 55);
    if (remain <= 0) {
      g2.state.gameplay.running = false;
      g2.state.gameplay.gameOver = true;
      saveLeaderboardEntry(g2, 'timeup');
      overlay(g2, 'TIME UP', 1400);
      stopMusic(g2);
    }
  }

  // src/data/blockDefinitions.json
  var blockDefinitions_default;
  var init_blockDefinitions = __esm({
    "src/data/blockDefinitions.json"() {
      blockDefinitions_default = {
        crystal: {
          type: "crystal",
          fill: [
            "#d8fbff",
            "#67b4ff"
          ],
          frame: "#dfffff",
          shine: "rgba(255,255,255,0.72)",
          deco: "rgba(160,231,255,0.36)",
          icon: "diamond",
          ability: {
            onDestroy: "spawnScoreDrop"
          }
        },
        ember: {
          type: "ember",
          fill: [
            "#ffd08f",
            "#ff6d4d"
          ],
          frame: "#ffe1be",
          shine: "rgba(255,236,197,0.72)",
          deco: "rgba(255,135,72,0.30)",
          icon: "flame",
          ability: {
            onDestroy: "meteorBurst"
          }
        },
        nebula: {
          type: "nebula",
          fill: [
            "#edd0ff",
            "#7f7bff"
          ],
          frame: "#f3dbff",
          shine: "rgba(255,255,255,0.60)",
          deco: "rgba(191,145,255,0.28)",
          icon: "star",
          ability: {
            onHit: "warpBall"
          }
        },
        smile: {
          type: "smile",
          fill: [
            "#fff1a6",
            "#ffb848"
          ],
          frame: "#fff6cc",
          shine: "rgba(255,255,255,0.62)",
          deco: "rgba(255,202,113,0.26)",
          icon: "smile",
          ability: {
            onDestroy: "spawnLifeDrop"
          }
        },
        crown: {
          type: "crown",
          fill: [
            "#d6ffb0",
            "#56c977"
          ],
          frame: "#ecffd4",
          shine: "rgba(255,255,255,0.66)",
          deco: "rgba(143,244,184,0.28)",
          icon: "crown",
          ability: {
            onHit: "crownCommand"
          }
        },
        core: {
          type: "core",
          fill: [
            "#cfd8ff",
            "#4f68ff"
          ],
          frame: "#e2e8ff",
          shine: "rgba(255,255,255,0.68)",
          deco: "rgba(120,138,255,0.30)",
          icon: "core",
          ability: {
            onHit: "corePulse",
            onDestroy: "weaponBurst"
          },
          armor: 1,
          tags: [
            "fortified"
          ]
        },
        boss: {
          type: "boss",
          fill: [
            "#ffe6f5",
            "#ff5fb8"
          ],
          frame: "#fff3fa",
          shine: "rgba(255,255,255,0.82)",
          deco: "rgba(255,120,190,0.35)",
          icon: "boss",
          hp: 16,
          armor: 3,
          tags: [
            "boss",
            "fortified"
          ],
          renderStyle: "boss",
          ability: {
            onHit: "bossCommand",
            onDestroy: "bossCollapse"
          }
        }
      };
    }
  });

  // src/data/blockDefinitions.ts
  var BLOCK_DEFINITIONS;
  var init_blockDefinitions2 = __esm({
    "src/data/blockDefinitions.ts"() {
      init_blockDefinitions();
      BLOCK_DEFINITIONS = blockDefinitions_default;
    }
  });

  // src/data/audioThemes.ts
  var AUDIO_THEMES;
  var init_audioThemes = __esm({
    "src/data/audioThemes.ts"() {
      AUDIO_THEMES = {
        frost: { bass: [110, 123, 98, 92], lead: [247, 220, 196, 220], hitFreq: 900, launchFreq: 560, warningFreq: 880 },
        inferno: { bass: [82, 98, 110, 98], lead: [330, 294, 262, 330], hitFreq: 760, launchFreq: 480, warningFreq: 640 },
        nebula: { bass: [98, 110, 123, 147], lead: [262, 330, 392, 330], hitFreq: 1040, launchFreq: 620, warningFreq: 720 },
        nexus: { bass: [73, 82, 110, 146], lead: [220, 277, 330, 440], hitFreq: 1180, launchFreq: 680, warningFreq: 960 }
      };
    }
  });

  // src/systems/audio.ts
  function ensureAudio(g2) {
    if (!g2.prefs.soundEnabled) return;
    if (!g2.audioCtx) g2.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (g2.audioCtx && g2.audioCtx.state === "suspended") void g2.audioCtx.resume();
  }
  function beep(g2, freq = 440, dur = 0.08, type = "square", vol = 0.03) {
    if (!g2.prefs.soundEnabled) return;
    ensureAudio(g2);
    if (!g2.audioCtx) return;
    const o = g2.audioCtx.createOscillator();
    const gain = g2.audioCtx.createGain();
    o.type = type;
    o.frequency.value = freq;
    gain.gain.setValueAtTime(1e-4, g2.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(vol, g2.audioCtx.currentTime + 8e-3);
    gain.gain.exponentialRampToValueAtTime(Math.max(1e-4, vol * 0.42), g2.audioCtx.currentTime + dur * 0.42);
    gain.gain.exponentialRampToValueAtTime(1e-4, g2.audioCtx.currentTime + dur);
    o.connect(gain);
    gain.connect(g2.audioCtx.destination);
    o.start();
    o.stop(g2.audioCtx.currentTime + dur + 0.03);
  }
  function later(fn, ms) {
    window.setTimeout(fn, ms);
  }
  function getStageAudioTheme(g2) {
    return AUDIO_THEMES[g2.state.stageRuntime.audioThemeKey] || AUDIO_THEMES.frost;
  }
  function stageBeep(g2, channel, fallback, dur = 0.06, type = "square", vol = 0.03) {
    const theme = getStageAudioTheme(g2);
    const themed = channel === "hit" ? theme.hitFreq : channel === "launch" ? theme.launchFreq : theme.warningFreq;
    beep(g2, themed || fallback, dur, type, vol);
  }
  function getBgmMap() {
    return {
      menu: "assets/audio/in_the_robot_pub.ogg",
      frost: "assets/audio/gravity_turn_action.ogg",
      inferno: "assets/audio/brute_force.ogg",
      nebula: "assets/audio/in_the_robot_pub.ogg",
      nexus: "assets/audio/brute_force.ogg",
      boss: "assets/audio/brute_force.ogg"
    };
  }
  function stopAudioLoop(g2) {
    if (g2.bgmAudio) {
      try {
        g2.bgmAudio.pause();
        g2.bgmAudio.currentTime = 0;
      } catch {
      }
      g2.bgmAudio = null;
    }
    g2.bgmTrackKey = "";
  }
  function playHtmlBgm(g2, key, opts = {}) {
    if (!g2.prefs.soundEnabled) return false;
    const map = getBgmMap();
    const src = map[key];
    if (!src) return false;
    const desiredVolume = opts.volume ?? (key === "boss" || key === "nexus" ? 0.42 : key === "menu" ? 0.28 : key === "nebula" ? 0.3 : 0.36);
    if (g2.bgmTrackKey === key && g2.bgmAudio) {
      g2.bgmAudio.loop = opts.loop !== false;
      g2.bgmAudio.volume = desiredVolume;
      return true;
    }
    stopAudioLoop(g2);
    const a = new Audio(src);
    a.preload = "auto";
    a.loop = opts.loop !== false;
    a.volume = desiredVolume;
    a.preservesPitch = false;
    a.addEventListener("ended", () => {
      if (!a.loop && g2.prefs.soundEnabled) {
        try { a.currentTime = 0; a.play().catch(() => {}); } catch {}
      }
    });
    a.addEventListener("canplaythrough", () => {
      if (!g2.prefs.soundEnabled) return;
      a.play().catch(() => {
      });
    }, { once: true });
    a.play().catch(() => {
    });
    g2.bgmAudio = a;
    g2.bgmTrackKey = key;
    return true;
  }
  function syncBgm(g2) {
    if (!g2.prefs.soundEnabled) {
      stopAudioLoop(g2);
      return;
    }
    if (g2.state.gameplay.running) {
      const bossLike = isBossStage(g2.state.gameplay.stageIndex) || !!(g2.state.combat && g2.state.combat.bossCharge && (g2.state.combat.bossCharge.active || g2.state.combat.bossCharge.maxTimer > 0));
      const themeKey = g2.state.stageRuntime && g2.state.stageRuntime.audioThemeKey || "frost";
      const key = bossLike ? "boss" : (themeKey === "inferno" ? "inferno" : themeKey === "nebula" ? "nebula" : themeKey === "nexus" ? "nexus" : "frost");
      if (playHtmlBgm(g2, key)) return;
    } else if (!g2.ui.menu.classList.contains("hidden") || !g2.ui.records.classList.contains("hidden") || !g2.ui.stageSelect.classList.contains("hidden") || !g2.ui.logs.classList.contains("hidden")) {
      if (playHtmlBgm(g2, "menu")) return;
    }
    stopAudioLoop(g2);
  }
  function startMusic(g2) {
    if (!g2.prefs.soundEnabled) return;
    ensureAudio(g2);
    stopMusic(g2);
    if (syncBgm(g2) && g2.bgmAudio) return;
    const isBossStage2 = isBossStage(g2.state.gameplay.stageIndex);
    if (isBossStage2) {
      let step = 0;
      g2.musicTimer = window.setInterval(() => {
        const bass2 = BOSS_THEME.bass[step % BOSS_THEME.bass.length];
        const sub = BOSS_THEME.sub[step % BOSS_THEME.sub.length];
        const lead2 = BOSS_THEME.lead[step % BOSS_THEME.lead.length];
        beep(g2, bass2, 0.19, "sawtooth", 0.024);
        if (step % 2 === 0) beep(g2, sub, 0.12, "triangle", 0.015);
        beep(g2, lead2, 0.1, step % 4 === 0 ? "square" : "triangle", 0.013);
        if (step % 4 === 0) {
          beep(g2, BOSS_THEME.accent[step / 4 % BOSS_THEME.accent.length], 0.055, "square", 0.012);
        }
        if (g2.state.combat.bossCharge.active && step % 2 === 1) {
          beep(g2, 622, 0.045, "sawtooth", 9e-3);
        }
        step += 1;
      }, 210);
      return;
    }
    let i = 0;
    const theme = getStageAudioTheme(g2);
    const bass = theme.bass;
    const lead = theme.lead;
    g2.musicTimer = window.setInterval(() => {
      beep(g2, bass[i % bass.length], 0.16, "sawtooth", 0.02);
      beep(g2, lead[i % lead.length], 0.08, "square", 0.015);
      if (i % 4 === 0) beep(g2, bass[(i + 1) % bass.length] * 2, 0.04, "triangle", 8e-3);
      i += 1;
    }, 260);
  }
  function stopMusic(g2) {
    if (g2.musicTimer !== null) {
      clearInterval(g2.musicTimer);
      g2.musicTimer = null;
    }
    stopAudioLoop(g2);
  }
  function bumpCamera(g2, amount = 1.2) {
    g2.camera.shake = Math.max(g2.camera.shake || 0, amount);
  }
  function queueScoreBurst(g2, value, x, y, kind = "score") {
    if (!value || value <= 0) return;
    if (!Array.isArray(g2.scoreBursts)) g2.scoreBursts = [];
    g2.scoreBursts.push({ x: x || g2.W * 0.78, y: y || 110, value, kind, ttl: kind === "combo" ? 38 : 28, maxTtl: kind === "combo" ? 38 : 28, rise: kind === "combo" ? 0.55 : 0.38 });
    if (g2.scoreBursts.length > 18) g2.scoreBursts.shift();
  }
  function updateScoreFeedback(g2) {
    const runtime = g2.state.stageRuntime;
    const scoreDiff = g2.state.gameplay.score - (runtime.lastScoreObserved || 0);
    const comboNow = g2.state.gameplay.combo;
    const comboPrev = runtime.lastComboObserved || 0;
    if (scoreDiff > 0) {
      queueScoreBurst(g2, scoreDiff, runtime.scoreBurstAnchorX || g2.W * 0.74, runtime.scoreBurstAnchorY || 132, "score");
      runtime.scoreHudPulse = Math.min(1.6, (runtime.scoreHudPulse || 0) + Math.min(0.9, 0.24 + scoreDiff / 900));
    }
    if (comboNow > comboPrev) {
      if (comboNow >= 30 && comboPrev < 30) {
        runtime.comboPeakTimer = 56; runtime.comboPeakLabel = "COSMIC BREAK"; runtime.comboPeakTier = 3; runtime.screenFlash = Math.max(runtime.screenFlash, 0.24); bumpCamera(g2, 3.1); beep(g2, 1380, 0.09, "triangle", 0.02); later(() => beep(g2, 1880, 0.08, "sine", 0.016), 24);
      } else if (comboNow >= 20 && comboPrev < 20) {
        runtime.comboPeakTimer = 48; runtime.comboPeakLabel = "OVERDRIVE"; runtime.comboPeakTier = 2; runtime.screenFlash = Math.max(runtime.screenFlash, 0.18); bumpCamera(g2, 2.4); beep(g2, 1240, 0.08, "triangle", 0.018); later(() => beep(g2, 1660, 0.07, "sine", 0.014), 22);
      } else if (comboNow >= 10 && comboPrev < 10) {
        runtime.comboPeakTimer = 40; runtime.comboPeakLabel = "HOT CHAIN"; runtime.comboPeakTier = 1; runtime.screenFlash = Math.max(runtime.screenFlash, 0.14); bumpCamera(g2, 1.8); beep(g2, 1100, 0.07, "triangle", 0.016); later(() => beep(g2, 1460, 0.06, "sine", 0.012), 20);
      }
      runtime.comboHudPulse = Math.min(2.1, (runtime.comboHudPulse || 0) + 0.38);
      if (comboNow >= 10) queueScoreBurst(g2, comboNow, g2.W * 0.5, 118, "combo");
    }
    runtime.lastScoreObserved = g2.state.gameplay.score;
    runtime.lastComboObserved = comboNow;
  }
  async function startRecording(g2) {
    if (!g2.recording?.supported || g2.recording.active) return;
    try {
      const stream = g2.canvas.captureStream(60);
      const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9") ? "video/webm;codecs=vp9" : MediaRecorder.isTypeSupported("video/webm;codecs=vp8") ? "video/webm;codecs=vp8" : "video/webm";
      const recorder = new MediaRecorder(stream, { mimeType });
      g2.recording.chunks = [];
      g2.recording.mimeType = mimeType;
      recorder.ondataavailable = (event) => { if (event.data && event.data.size > 0) g2.recording.chunks.push(event.data); };
      recorder.onstop = () => {
        try { if (g2.recording.url) URL.revokeObjectURL(g2.recording.url); } catch {}
        g2.recording.blob = new Blob(g2.recording.chunks, { type: g2.recording.mimeType || "video/webm" });
        g2.recording.url = URL.createObjectURL(g2.recording.blob);
        g2.recording.lastFileName = `cosmic_breaker_ex_${new Date().toISOString().replace(/[:.]/g, "-")}.webm`;
        g2.recording.active = false;
        updateUI(g2);
        overlay(g2, "CLIP SAVED", 800);
      };
      recorder.start(250);
      g2.recording.recorder = recorder;
      g2.recording.active = true;
      g2.recording.blob = null;
      overlay(g2, "REC START", 700);
      updateUI(g2);
    } catch (error) {
      console.error("[CosmicBreaker][recording:start]", error);
      overlay(g2, "REC ERROR", 900);
    }
  }
  function stopRecording(g2) {
    if (!g2.recording?.active || !g2.recording.recorder) return;
    try { g2.recording.recorder.stop(); } catch (error) { console.error("[CosmicBreaker][recording:stop]", error); }
  }
  async function shareRecording(g2) {
    try {
      if (!g2.recording?.blob) { overlay(g2, "NO CLIP", 700); return; }
      const file = new File([g2.recording.blob], g2.recording.lastFileName || "cosmic_breaker_ex_clip.webm", { type: g2.recording.blob.type || "video/webm" });
      if (navigator.canShare && navigator.canShare({ files: [file] }) && navigator.share) {
        await navigator.share({ files: [file], title: "Cosmic Breaker EX Clip", text: "Check this Cosmic Breaker EX clip." });
        overlay(g2, "SHARED", 700);
        return;
      }
      const a = document.createElement("a");
      a.href = g2.recording.url || URL.createObjectURL(g2.recording.blob);
      a.download = g2.recording.lastFileName || "cosmic_breaker_ex_clip.webm";
      document.body.appendChild(a); a.click(); a.remove();
      overlay(g2, "DOWNLOADED", 700);
    } catch (error) {
      console.error("[CosmicBreaker][recording:share]", error);
      overlay(g2, "SHARE ERROR", 900);
    }
  }
  function playPowerupSfx(g2, kind) {
    if (kind === "laser") {
      beep(g2, 980, 0.035, "square", 0.025);
      later(() => beep(g2, 1240, 0.045, "square", 0.02), 18);
    } else if (kind === "catch") {
      beep(g2, 540, 0.045, "triangle", 0.025);
      later(() => beep(g2, 680, 0.06, "sine", 0.018), 24);
    } else {
      beep(g2, 760, 0.04, "triangle", 0.022);
      later(() => beep(g2, 620, 0.05, "triangle", 0.018), 18);
    }
  }
  function stageHitComboBeep(g2, combo) {
    const theme = getStageAudioTheme(g2);
    const randomJitter = Math.random() * 34 - 17;
    const comboLift = Math.min(180, combo * 6);
    const freq = (theme.hitFreq || 880) + comboLift + randomJitter;
    const dur = 0.022 + Math.min(0.03, combo * 12e-4);
    beep(g2, freq, dur, "square", 0.022);
  }
  function playBlockBreakLayeredSfx(g2, kind, combo, boss = false) {
    const table = {
      crystal: [980, 1320, 1760],
      ember: [680, 910, 1180],
      nebula: [760, 1040, 1380],
      smile: [720, 960, 1280],
      crown: [860, 1150, 1490],
      core: [640, 980, 1520],
      boss: [220, 440, 880]
    };
    const [base, mid, top] = table[kind] || table.core;
    const comboLift = Math.min(120, combo * 5);
    beep(g2, base + comboLift * 0.35, boss ? 0.1 : 0.05, boss ? "sawtooth" : "triangle", boss ? 0.03 : 0.018);
    later(() => beep(g2, mid + comboLift, boss ? 0.13 : 0.06, kind === "ember" ? "square" : "triangle", boss ? 0.028 : 0.016), 10);
    later(() => beep(g2, top + comboLift * 1.2, kind === "crystal" || kind === "core" ? 0.08 : 0.05, "sine", boss ? 0.018 : 0.012), 22);
    if (kind === "crystal" || kind === "core" || kind === "nebula") {
      later(() => beep(g2, top * 1.18 + comboLift * 0.8, 0.045, "triangle", 9e-3), 34);
    }
    if (boss) {
      later(() => beep(g2, 132, 0.18, "triangle", 0.022), 42);
      later(() => beep(g2, 176, 0.14, "square", 0.016), 86);
    }
  }
  function playBossIntroSting(g2) {
    beep(g2, 196, 0.18, "sawtooth", 0.028);
    later(() => beep(g2, 247, 0.12, "triangle", 0.02), 90);
    later(() => beep(g2, 294, 0.16, "square", 0.024), 180);
    later(() => beep(g2, 392, 0.22, "sawtooth", 0.028), 290);
  }
  function playBossFinishPeakSfx(g2) {
    beep(g2, 180, 0.16, "triangle", 0.026);
    later(() => beep(g2, 360, 0.08, "sawtooth", 0.022), 50);
    later(() => beep(g2, 1240, 0.11, "square", 0.028), 120);
  }
  function playBossFinishTailSfx(g2) {
    beep(g2, 520, 0.09, "triangle", 0.018);
    later(() => beep(g2, 860, 0.1, "sine", 0.014), 70);
  }
  function playBossDefeatSting(g2) {
    beep(g2, 740, 0.05, "square", 0.024);
    later(() => beep(g2, 988, 0.08, "triangle", 0.02), 35);
    later(() => beep(g2, 1318, 0.16, "sawtooth", 0.024), 92);
    later(() => beep(g2, 523, 0.24, "sine", 0.017), 180);
  }
  function playStageTransitionSting(g2) {
    beep(g2, 392, 0.08, "triangle", 0.018);
    later(() => beep(g2, 523, 0.08, "triangle", 0.018), 70);
    later(() => beep(g2, 659, 0.11, "square", 0.02), 145);
    later(() => beep(g2, 784, 0.16, "sawtooth", 0.024), 220);
  }
  var BOSS_THEME;
  var init_audio = __esm({
    "src/systems/audio.ts"() {
      init_audioThemes();
      BOSS_THEME = {
        bass: [55, 55, 62, 73, 55, 55, 82, 98],
        lead: [220, 247, 262, 294, 262, 247, 330, 294],
        sub: [110, 123, 131, 147, 131, 123, 165, 147],
        accent: [392, 440, 392, 494]
      };
    }
  });

  // src/systems/stageGimmickInterpreter.ts
  function ensureTraitModifier(g2, trait) {
    if (!g2.state.stageRuntime.traitModifiers[trait]) g2.state.stageRuntime.traitModifiers[trait] = { scoreBonus: 0, pierceBonus: 0, damageScale: 1 };
    return g2.state.stageRuntime.traitModifiers[trait];
  }
  function resetStageRuntimeModifiers(g2) {
    g2.state.combat.stageDropRateModifier = 0;
    g2.state.combat.stageBallSpeedModifier = 1;
    g2.state.combat.stageMagnetRangeBonus = 0;
    g2.state.combat.stageThemeHueShift = 0;
    g2.state.combat.stageAutoWeapon = null;
    g2.state.combat.stageAutoWeaponCooldown = 0;
    g2.state.combat.stageAutoWeaponCooldownScale = 1;
    g2.state.stageRuntime.gimmickWarnings = [];
    g2.state.stageRuntime.dropBiases = {};
    g2.state.stageRuntime.traitModifiers = {};
    g2.state.stageRuntime.blockResistanceRules = [];
    g2.state.stageRuntime.hostilePatterns = [];
    g2.state.stageRuntime.audioThemeKey = "frost";
    g2.state.stageRuntime.stageThemeName = "";
  }
  function applyStageGimmickEffects(g2, gimmicks) {
    g2.state.stageRuntime.activeGimmicks = gimmicks.map((gm) => gm.id);
    for (const gimmick of gimmicks) {
      for (const effect of gimmick.effects) {
        const handler = handlers[effect.kind];
        handler(g2, effect);
      }
    }
  }
  function resolveBlockResistance(g2, row, col) {
    for (const rule of g2.state.stageRuntime.blockResistanceRules) {
      if (rule.rows && !rule.rows.includes(row)) continue;
      if (typeof rule.modulo === "number" && typeof rule.equals === "number" && col % rule.modulo !== rule.equals) continue;
      return { label: rule.label, traits: rule.traits, damageScale: rule.damageScale, color: rule.color };
    }
    return null;
  }
  var handlers;
  var init_stageGimmickInterpreter = __esm({
    "src/systems/stageGimmickInterpreter.ts"() {
      handlers = {
        modifyDropRate(g2, effect) {
          g2.state.combat.stageDropRateModifier += effect.amount;
        },
        modifyBallSpeed(g2, effect) {
          g2.state.combat.stageBallSpeedModifier *= effect.multiplier;
        },
        modifyMagnetRange(g2, effect) {
          g2.state.combat.stageMagnetRangeBonus += effect.amount;
        },
        shiftThemeHue(g2, effect) {
          g2.state.combat.stageThemeHueShift += effect.amount;
        },
        enableAutoWeapon(g2, effect) {
          g2.state.combat.stageAutoWeapon = effect.weapon;
          g2.state.combat.stageAutoWeaponCooldownScale *= effect.cooldownScale || 1;
          g2.state.combat.stageAutoWeaponCooldown = 0;
        },
        applyDropBias(g2, effect) {
          g2.state.stageRuntime.dropBiases[effect.drop] = (g2.state.stageRuntime.dropBiases[effect.drop] || 0) + effect.weightDelta;
        },
        applyTraitModifier(g2, effect) {
          const mod = ensureTraitModifier(g2, effect.trait);
          mod.scoreBonus += effect.scoreBonus || 0;
          mod.pierceBonus += effect.pierceBonus || 0;
          mod.damageScale *= effect.damageScale || 1;
        },
        setBlockResistance(g2, effect) {
          const rule = { label: effect.label, traits: effect.traits, damageScale: effect.damageScale, rows: effect.rows, modulo: effect.modulo, equals: effect.equals, color: effect.color };
          g2.state.stageRuntime.blockResistanceRules.push(rule);
        },
        pushWarning(g2, effect) {
          g2.state.stageRuntime.gimmickWarnings.push({ text: effect.text, severity: effect.severity || "warn" });
        },
        enableHostilePattern(g2, effect) {
          const runtime = { id: effect.id, label: effect.label, type: effect.patternType, cooldown: effect.cooldown, timer: effect.cooldown, severity: effect.severity || "warn" };
          g2.state.stageRuntime.hostilePatterns.push(runtime);
        },
        setAudioTheme(g2, effect) {
          g2.state.stageRuntime.audioThemeKey = effect.themeKey;
        }
      };
    }
  });

  // src/systems/warnings.ts
  function pushWarning(g2, text, severity = "warn", ttl = 180) {
    g2.warnings.unshift({ text, severity, ttl, maxTtl: ttl });
    if (g2.warnings.length > 5) g2.warnings.length = 5;
    g2.ui.miniTip.textContent = text;
  }
  function tickWarnings(g2) {
    for (let i = g2.warnings.length - 1; i >= 0; i--) {
      g2.warnings[i].ttl -= 1;
      if (g2.warnings[i].ttl <= 0) g2.warnings.splice(i, 1);
    }
    g2.ui.miniTip.textContent = g2.warnings[0] ? g2.warnings[0].text : "Move: Mouse / \u2190 \u2192 | Launch: Space / Click | Pause: P | Logs: Shift + L";
  }
  var init_warnings = __esm({
    "src/systems/warnings.ts"() {
    }
  });

  // src/systems/stage.ts
  var stage_exports = {};
  __export(stage_exports, {
    applyStageGimmicks: () => applyStageGimmicks,
    closeMenu: () => closeMenu,
    loseLife: () => loseLife,
    openMenu: () => openMenu,
    setDifficulty: () => setDifficulty,
    spawnStage: () => spawnStage,
    stageClear: () => stageClear,
    stageName: () => stageName,
    startRun: () => startRun
  });
  function stageName(g2, i) {
    return getStageDefinition(i).name[g2.prefs.lang];
  }
  function applyStageGimmicks(g2, stage) {
    const gimmicks = getStageGimmicks(stage);
    g2.state.stageRuntime.stageId = stage;
    resetStageRuntimeModifiers(g2);
    applyStageGimmickEffects(g2, gimmicks);
  }
  function setDifficulty(g2, diff) {
    g2.state.gameplay.difficulty = diff;
    g2.state.gameplay.lives = DIFF[diff].lives;
    g2.paddle.w = DIFF[diff].paddle;
  }
  function resolveBlockType(ch, charMap) {
    if (charMap && charMap[ch]) return charMap[ch];
    return "core";
  }
  function spawnStage(g2, stage) {
    g2.state.gameplay.stageIndex = stage;
    g2.blocks = [];
    g2.drops = [];
    g2.lasers = [];
    g2.missiles = [];
    g2.enemyShots = [];
    g2.enemyWalkers = [];
    g2.blockBursts = [];
    const stageDef = getStageDefinition(stage);
    applyStageGimmicks(g2, stage);
    g2.state.stageRuntime.stageThemeName = stageDef.name[g2.prefs.lang];
    g2.state.stageRuntime.roundIntroLabel = isBossStage(stage) ? "BOSS ROUND" : `ROUND ${stage}`;
    g2.state.stageRuntime.roundIntroTimer = isBossStage(stage) ? 90 : 60;
    g2.state.stageRuntime.roundIntroMax = g2.state.stageRuntime.roundIntroTimer;
    g2.state.stageRuntime.screenFlash = 0.18;
    g2.state.stageRuntime.finishCueStep = 0;
    if (stageDef.audioTheme) g2.state.stageRuntime.audioThemeKey = stageDef.audioTheme;
    const { top, cols, rows, gap, side, eliteRuleOffset, pattern, charMap, skipRules = [], blockHeight } = stageDef.layout;
    const bw = Math.floor((g2.W - side - side - (cols - 1) * gap) / cols), bh = blockHeight || 18;
    const walkerCount = stage >= 2 && !isBossStage(stage) ? Math.min(2, 1 + Math.floor((stage - 1) / 8)) : 0;
    for (let i = 0; i < walkerCount; i++) {
      const spanLeft = 70 + i * 120;
      const spanRight = g2.W - 70 - i * 120;
      g2.enemyWalkers.push({
        x: spanLeft + (spanRight - spanLeft) * (0.3 + i * 0.22),
        y: 78 + i * 26,
        w: 176,
        h: 56,
        vx: i % 2 === 0 ? 1.1 + stage * 0.04 : -(1 + stage * 0.04),
        rangeLeft: spanLeft,
        rangeRight: spanRight,
        phase: Math.random() * 6.28,
        kind: i % 2 === 0 ? "orbiter" : "zig",
        stun: 0
      });
    }
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const ch = pattern?.[r]?.[c] || ".";
        const skipped = ch === "." || ch === " " || skipRules.some((rule) => rule.row === r && c % rule.mod === rule.equals);
        if (skipped) continue;
        const type = resolveBlockType(ch.toUpperCase(), charMap);
        const def = BLOCK_DEFINITIONS[type];
        const defaultHp = (r + stage + eliteRuleOffset + (/[A-Z]/.test(ch) ? 1 : 0)) % 3 === 0 ? 2 : 1;
        const hp = def.hp || defaultHp;
        g2.blocks.push({
          x: side + c * (bw + gap),
          y: top + r * (bh + gap),
          w: bw,
          h: bh,
          hp,
          maxHp: hp,
          type,
          resistance: resolveBlockResistance(g2, r, c),
          armor: def.armor || 0,
          tags: def.tags || [],
          bossPhase: type === "boss" ? 1 : 0,
          indestructible: false
        });
        const placed = g2.blocks[g2.blocks.length - 1];
        if (!isBossStage(stage) && stage >= 5 && type !== "boss" && type !== "core") {
          const hardMask = ((r + c + stage) % 7 === 0) || (stage % 5 === 0 && r === Math.floor(rows / 2) && c % 3 === 1);
          if (hardMask) {
            placed.indestructible = true;
            placed.hp = 9999;
            placed.maxHp = 9999;
          }
        }
      }
    }
    resetBall(g2);
    if (isBossStage(stage)) {
      pushWarning(g2, "BOSS ROUND", "danger", 130);
      overlay(g2, "BOSS ROUND", 1200);
      playBossIntroSting(g2);
    } else {
      pushWarning(g2, `${g2.state.stageRuntime.stageThemeName || stageDef.name[g2.prefs.lang]} ready`, "info", 90);
    }
    updateUI(g2);
  }
  async function startRun(g2, stage = 1) {
    logEvent(g2, "info", "start run requested", { stage, difficulty: g2.ui.difficultySelect.value || g2.state.gameplay.difficulty });
    closeMenu(g2);
    g2.ui.records.classList.add("hidden");
    g2.ui.stageSelect.classList.add("hidden");
    g2.ui.logs.classList.add("hidden");
    g2.prefs.playCount += 1;
    g2.forcedDropCounter = 0;
    const replayBoot = g2.replay.pending && g2.replay.pending.autoStart;
    const selectedMode = replayBoot ? g2.replay.pending.mode : (g2.ui.modeSelect?.value || 'standard');
    if (g2.ui.modeSelect) g2.ui.modeSelect.value = selectedMode;
    await savePrefs(g2);
    g2.state.gameplay.score = 0;
    g2.state.gameplay.combo = 0;
    g2.state.gameplay.gameOver = false;
    g2.state.gameplay.paused = false;
    g2.state.gameplay.started = true;
    g2.state.gameplay.extendAwardIndex = 0;
    g2.state.combat.barrierCharges = 0;
    g2.state.combat.bigBallTimer = 0;
    g2.state.combat.laserTimer = 0;
    g2.state.combat.magnetTimer = 0;
    g2.state.combat.missileTimer = 0;
    g2.state.combat.catchTimer = 0;
    resetStageRuntimeModifiers(g2);
    g2.state.stageRuntime.stageTransitionTimer = 0;
    g2.state.stageRuntime.stageTransitionMax = 0;
    g2.state.stageRuntime.stageTransitionLabel = "";
    setDifficulty(g2, replayBoot ? (g2.replay.pending.diff || (g2.ui.difficultySelect.value || "normal")) : (g2.ui.difficultySelect.value || "normal"));
    setupRunMode(g2, selectedMode);
    const runSeed = replayBoot ? (g2.replay.pending.seed >>> 0) : ((Date.now() ^ (Math.floor(__nativeRandom() * 2147483647))) >>> 0);
    setRunSeed(g2, runSeed);
    beginReplayCapture(g2);
    if (replayBoot) { g2.replay.playing = true; g2.replay.pending.tick = 0; g2.replay.pending.index = 0; }
    g2.paddle.x = (g2.W - g2.paddle.w) / 2;
    g2.paddle.y = g2.H - 56;
    spawnStage(g2, selectedMode === 'sprint3' ? 1 : stage);
    g2.state.gameplay.running = true;
    startMusic(g2);
    overlay(g2, selectedMode === 'sprint3' ? 'SPRINT 3:00' : stageName(g2, stage), 900);
    updateUI(g2);
  }
  function openMenu(g2) {
    g2.ui.menu.classList.remove("hidden");
    g2.state.gameplay.running = false;
    syncBgm(g2);
    logEvent(g2, "info", "menu opened");
  }
  function closeMenu(g2) {
    g2.ui.menu.classList.add("hidden");
    syncBgm(g2);
    logEvent(g2, "info", "menu closed");
    updateUI(g2);
  }
  function loseLife(g2) {
    logEvent(g2, "warn", "life lost", { livesBefore: g2.state.gameplay.lives });
    if (g2.state.combat.barrierCharges > 0) {
      g2.state.combat.barrierCharges -= 1;
      resetBall(g2);
      overlay(g2, "BARRIER SAVE", 650);
      updateUI(g2);
      return;
    }
    g2.state.gameplay.lives -= 1;
    g2.state.gameplay.combo = 0;
    if (g2.state.gameplay.lives <= 0) {
      g2.state.gameplay.gameOver = true;
      g2.state.gameplay.running = false;
      saveLeaderboardEntry(g2, 'gameover');
      stopMusic(g2);
      overlay(g2, t(g2, "gameOver"), 1200);
      window.setTimeout(() => syncBgm(g2), 180);
      return;
    }
    resetBall(g2);
    updateUI(g2);
  }
  function stageClear(g2) {
    logEvent(g2, "info", "stage clear", { stage: g2.state.gameplay.stageIndex, score: g2.state.gameplay.score });
    g2.state.gameplay.running = false;
    g2.prefs.bestScore = Math.max(g2.prefs.bestScore, g2.state.gameplay.score);
    void savePrefs(g2);
    const bossFinish = isBossStage(g2.state.gameplay.stageIndex);
    if (g2.runMeta.mode !== 'sprint3' && bossFinish) saveLeaderboardEntry(g2, 'clear');
    const transitionDelay = bossFinish ? 380 : 0;
    const nextDelay = bossFinish ? 1550 : 1300;
    g2.state.stageRuntime.stageTransitionTimer = 0;
    g2.state.stageRuntime.stageTransitionMax = 84;
    g2.state.stageRuntime.stageTransitionLabel = `HYPERLANE TO ROUND ${g2.state.gameplay.stageIndex >= TOTAL_STAGES ? 1 : g2.state.gameplay.stageIndex + 1}`;
    g2.state.stageRuntime.screenFlash = bossFinish ? 0.12 : 0.2;
    for (let i = 0; i < 12; i++) {
      const x = 40 + Math.random() * (g2.W - 80);
      const y = 110 + Math.random() * (g2.H * 0.42);
      g2.blockBursts.push({ x, y, color: i % 2 ? "#8ff7ff" : "#ff9ad5", ttl: 45 + i * 2, maxTtl: 45 + i * 2, size: 18 + i * 2, style: i % 3 === 0 ? "spark" : i % 3 === 1 ? "spark" : "shard" });
    }
    pushWarning(g2, bossFinish ? "Boss core erased - lane stabilizing" : "Stage cleared - hyperspace lane open", "info", 140);
    overlay(g2, t(g2, "stageClear"), bossFinish ? 1500 : 1300);
    window.setTimeout(() => {
      g2.state.stageRuntime.stageTransitionTimer = 84;
      playStageTransitionSting(g2);
    }, transitionDelay);
    setTimeout(() => {
      const next = g2.state.gameplay.stageIndex >= TOTAL_STAGES ? 1 : g2.state.gameplay.stageIndex + 1;
      if (g2.runMeta.mode === 'sprint3') {
        transitionSprintStage(g2, next);
      } else {
        void startRun(g2, next);
      }
    }, nextDelay);
  }
  var init_stage = __esm({
    "src/systems/stage.ts"() {
      init_constants();
      init_stageDefinitions();
      init_blockDefinitions2();
      init_audio();
      init_balls();
      init_logger();
      init_persistence();
      init_ui();
      init_stageGimmickInterpreter();
      init_warnings();
    }
  });

  // src/core/dom.ts
  function byId(id) {
    const el = document.getElementById(id);
    if (!el) throw new Error(`Missing element: ${id}`);
    return el;
  }
  function createUIRefs() {
    return {
      scoreVal: byId("scoreVal"),
      livesVal: byId("livesVal"),
      stageVal: byId("stageVal"),
      comboVal: byId("comboVal"),
      bestVal: byId("bestVal"),
      labelScore: byId("labelScore"),
      labelLives: byId("labelLives"),
      labelStage: byId("labelStage"),
      labelCombo: byId("labelCombo"),
      labelBest: byId("labelBest"),
      startBtn: byId("startBtn"),
      pauseBtn: byId("pauseBtn"),
      menuBtn: byId("menuBtn"),
      recordsBtn: byId("recordsBtn"),
      hudBtn: byId("hudBtn"),
      difficultySelect: byId("difficultySelect"),
      langBtn: byId("langBtn"),
      soundBtn: byId("soundBtn"),
      logsBtn: byId("logsBtn"),
      recBtn: byId("recBtn"),
      shareBtn: byId("shareBtn"),
      replayBtn: byId("replayBtn"),
      modeSelect: byId("modeSelect"),
      miniTip: byId("miniTip"),
      menu: byId("menu"),
      menuTitle: byId("menuTitle"),
      menuSub: byId("menuSub"),
      menuStart: byId("menuStart"),
      menuStageSelect: byId("menuStageSelect"),
      menuRecords: byId("menuRecords"),
      menuLogs: byId("menuLogs"),
      controlTitle: byId("controlTitle"),
      controlBody: byId("controlBody"),
      records: byId("records"),
      recordsTitle: byId("recordsTitle"),
      recordsGrid: byId("recordsGrid"),
      recordsClose: byId("recordsClose"),
      recordsReset: byId("recordsReset"),
      stageSelect: byId("stageSelect"),
      stageTitle: byId("stageTitle"),
      stageGrid: byId("stageGrid"),
      stageClose: byId("stageClose"),
      logs: byId("logs"),
      logsTitle: byId("logsTitle"),
      logsGrid: byId("logsGrid"),
      logsClose: byId("logsClose"),
      logsExport: byId("logsExport"),
      logsClear: byId("logsClear"),
      overlay: byId("overlay"),
      overlayText: byId("overlayText")
    };
  }

  // src/core/state.ts
  function createContext() {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const prefs = { lang: "en", soundEnabled: true, bestScore: 0, playCount: 0 };
    const state = {
      gameplay: {
        started: false,
        running: false,
        paused: false,
        awaitingLaunch: true,
        gameOver: false,
        stageIndex: 1,
        difficulty: "normal",
        score: 0,
        lives: 5,
        combo: 0,
        mouseActive: true,
        lastBounceDir: 1,
        extendAwardIndex: 0
      },
      ui: { hudHidden: false },
      combat: {
        magnetTimer: 0,
        laserTimer: 0,
        bigBallTimer: 0,
        laserCooldown: 0,
        missileTimer: 0,
        missileCooldown: 0,
        barrierCharges: 0,
        stageDropRateModifier: 0,
        stageBallSpeedModifier: 1,
        stageMagnetRangeBonus: 0,
        stageThemeHueShift: 0,
        stageAutoWeapon: null,
        stageAutoWeaponCooldown: 0,
        stageAutoWeaponCooldownScale: 1,
        bossAttackCooldown: 180,
        bossCharge: { active: false, timer: 0, maxTimer: 0, kind: null, bossX: 0, bossY: 0, bossW: 0, bossH: 0 },
        catchTimer: 0
      },
      input: { keys: { left: false, right: false }, pointerTargetX: 0 },
      stageRuntime: { stageId: 1, activeGimmicks: [], gimmickWarnings: [], dropBiases: {}, traitModifiers: {}, blockResistanceRules: [], hostilePatterns: [], audioThemeKey: "frost", stageThemeName: "", roundIntroTimer: 0, roundIntroMax: 0, roundIntroLabel: "", screenFlash: 0, pickupPulseTimer: 0, bossDownTimer: 0, stageTransitionTimer: 0, stageTransitionMax: 0, stageTransitionLabel: "", finishCueStep: 0, lastScoreObserved: 0, lastComboObserved: 0, comboPeakTimer: 0, comboPeakLabel: "", comboPeakTier: 0, scoreHudPulse: 0, comboHudPulse: 0, scoreBurstAnchorX: 0, scoreBurstAnchorY: 0, bossFearPulse: 0 }
    };
    const paddle = { x: 0, y: 0, w: 150, h: 16, speed: 8, powerTimer: 0, powerType: "" };
    return {
      canvas,
      ctx,
      W: innerWidth,
      H: innerHeight,
      ui: createUIRefs(),
      prefs,
      state,
      paddle,
      balls: [],
      blocks: [],
      drops: [],
      lasers: [],
      missiles: [],
      enemyShots: [],
      enemyWalkers: [],
      hostileEffects: [],
      telegraphs: [],
      stars: [],
      blockBursts: [],
      warnings: [],
      logs: [],
      forcedDropCounter: 0,
      audioCtx: null,
      musicTimer: null,
      bgmAudio: null,
      bgmTrackKey: "",
      bgmUnlocked: false,
      assets: {},
      leaderboard: { standard: [], sprint3: [] },
      runMeta: { mode: "standard", timerFrames: 0, timerMaxFrames: 0, nextStageAt: [135 * 60, 90 * 60, 45 * 60], lastStageGate: 0, seed: 0, resultSaved: false },
      replay: { active: false, playing: false, sampleRate: 6, tick: 0, samples: [], actionFlags: 0, seed: 0, mode: "standard", difficulty: "normal", stage: 1, version: 1, blob: null, lastUrl: "", pending: null },
      scoreBursts: [],
      camera: { shake: 0, dx: 0, dy: 0 },
      frameCounter: 0
    };
  }

  // src/main.ts
  init_balls();

  // src/systems/logScreens.ts
  init_stageDefinitions();
  init_ui();
  function drawLogs(g2) {
    g2.ui.logsGrid.innerHTML = g2.logs.slice().reverse().map((item) => {
      const extra = item.extra ? JSON.stringify(item.extra) : "";
      return `<div class="recordCell"><div style="font-size:11px;color:#9fc0d4;margin-bottom:4px">${item.ts} / ${item.type.toUpperCase()}</div><div style="font-size:14px;font-weight:700;margin-bottom:4px">${item.message}</div><div style="font-size:12px;color:#d7e7f0;word-break:break-all">${extra}</div></div>`;
    }).join("") || '<div class="recordCell"><div style="font-size:14px">No logs yet.</div></div>';
  }
  function exportLogs(g2) {
    const blob = new Blob([JSON.stringify(g2.logs, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "cosmic_breaker_log.json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1e3);
  }
  function drawRecords(g2) {
    const mode = g2.ui.modeSelect?.value || 'standard';
    const board = (g2.leaderboard && g2.leaderboard[mode]) || [];
    const summary = [
      [t(g2, "best"), g2.prefs.bestScore],
      ["Play Count", g2.prefs.playCount],
      [g2.prefs.lang === 'ja' ? 'モード' : 'Mode', mode === 'sprint3' ? (g2.prefs.lang === 'ja' ? '3分スプリント' : 'Sprint 3:00') : (g2.prefs.lang === 'ja' ? '通常' : 'Standard')],
      [t(g2, "stage"), getStageDefinition(g2.state.gameplay.stageIndex).name[g2.prefs.lang]],
      [t(g2, "lives"), g2.state.gameplay.lives]
    ].map(([k, v]) => `<div class="recordCell"><div style="font-size:12px;color:#9fc0d4;margin-bottom:4px">${k}</div><div style="font-size:24px;font-weight:900">${v}</div></div>`).join('');
    const rows = board.length ? board.map((row, idx) => `<div class="recordCell"><div style="font-size:12px;color:#9fc0d4;margin-bottom:4px">#${idx + 1} / ${row.difficulty.toUpperCase()} / ${row.reason}</div><div style="font-size:24px;font-weight:900">${Number(row.score).toLocaleString('en-US')}</div><div style="font-size:12px;color:#d7e7f0;margin-top:4px">Stage ${row.stage}${row.time != null ? ` / ${row.time}s` : ''}</div></div>`).join('') : `<div class="recordCell"><div style="font-size:14px">${g2.prefs.lang === 'ja' ? 'まだランキングがありません。' : 'No leaderboard entries yet.'}</div></div>`;
    g2.ui.recordsGrid.innerHTML = summary + `<div class="recordCell" style="grid-column:1/-1"><div style="font-size:12px;color:#9fc0d4;margin-bottom:8px">${g2.prefs.lang === 'ja' ? 'ローカルランキング' : 'Local Leaderboard'}</div><div class="recordGrid">${rows}</div></div>`;
  }
  function drawStageGrid(g2, onPick) {
    g2.ui.stageGrid.innerHTML = Array.from({ length: TOTAL_STAGES }, (_, k) => k + 1).map((i) => {
      const def = getStageDefinition(i);
      return `<div class="stageCard" data-stage="${i}">
      <div class="info">
        <div style="font-size:12px;color:#b7d1df;margin-bottom:6px">STAGE ${i}</div>
        <div style="font-size:24px;font-weight:900">${def.name[g2.prefs.lang]}</div>
        <div style="margin-top:8px;color:#d8e7ef;line-height:1.5">${def.description[g2.prefs.lang]}</div>
        <div style="margin-top:8px;color:#9fc0d4;font-size:12px">${getStageGimmicks(i).map((gimmick) => gimmick.label).join(" / ")}</div>
      </div>
    </div>`;
    }).join("");
    Array.from(g2.ui.stageGrid.querySelectorAll(".stageCard")).forEach((el) => {
      el.addEventListener("click", () => onPick(Number(el.dataset.stage || "1")));
    });
  }

  // src/main.ts
  init_persistence();

  // src/render/renderBackground.ts
  init_stageDefinitions();
  function renderBackground(g2) {
    const { ctx } = g2;
    const stage = g2.state.gameplay.stageIndex || 1;
    const themeKey = g2.state.stageRuntime && g2.state.stageRuntime.audioThemeKey || "frost";
    const palettes = {
      frost: ["#031528", "#082344", "#0a1530", "rgba(128,224,255,0.10)", "rgba(170,225,255,0.08)"],
      inferno: ["#170b17", "#3a1126", "#140915", "rgba(255,122,98,0.12)", "rgba(255,170,110,0.08)"],
      nebula: ["#0a1026", "#1d1646", "#080b1b", "rgba(158,120,255,0.12)", "rgba(110,205,255,0.07)"],
      nexus: ["#120617", "#300a2d", "#080510", "rgba(255,86,136,0.12)", "rgba(180,90,255,0.08)"]
    };
    const pal = palettes[themeKey] || palettes.frost;
    const grad = ctx.createLinearGradient(0, 0, g2.W, g2.H);
    grad.addColorStop(0, pal[0]);
    grad.addColorStop(0.45, pal[1]);
    grad.addColorStop(1, pal[2]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, g2.W, g2.H);
    const glow = ctx.createRadialGradient(g2.W * 0.72, g2.H * 0.18, 8, g2.W * 0.72, g2.H * 0.18, g2.W * 0.55);
    glow.addColorStop(0, pal[3]);
    glow.addColorStop(0.45, pal[4]);
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, g2.W, g2.H);
    ctx.save();
    ctx.globalAlpha = 0.12;
    for (let y = 42; y < g2.H; y += 74) {
      ctx.fillStyle = y < g2.H * 0.35 ? "rgba(180,235,255,0.08)" : "rgba(130,180,255,0.045)";
      ctx.fillRect(0, y, g2.W, 1);
    }
    ctx.restore();
    for (const s of g2.stars) {
      s.a += s.s * 0.016;
      const tw = 0.18 + (Math.sin(s.a) + 1) * 0.09;
      const hue = s.h + g2.state.combat.stageThemeHueShift * 0.26 + stage * 0.9;
      ctx.fillStyle = `hsla(${hue},100%,82%,${tw})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, Math.max(0.8, s.r * 0.8), 0, Math.PI * 2);
      ctx.fill();
    }
    const t = performance.now() * 0.00016;
    ctx.save();
    ctx.globalAlpha = 0.14;
    ctx.strokeStyle = pal[4];
    ctx.lineWidth = 1;
    const bandCount = stage <= 10 ? 2 : stage <= 20 ? 3 : 4;
    for (let i = 0; i < bandCount; i++) {
      const y = g2.H * (0.17 + i * 0.16) + Math.sin(t * 12 + i * 1.3 + stage * 0.2) * (3 + i);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.bezierCurveTo(g2.W * 0.2, y - 8, g2.W * 0.46, y + 10, g2.W, y - 4);
      ctx.stroke();
    }
    if (stage > 20) {
      ctx.globalAlpha = 0.1;
      ctx.strokeStyle = themeKey === "inferno" ? "rgba(255,128,94,0.18)" : themeKey === "nexus" ? "rgba(255,98,170,0.16)" : "rgba(120,220,255,0.14)";
      for (let i = 0; i < 6; i++) {
        const x = (i + 1) * g2.W / 7;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + Math.sin(t * 18 + i) * 24, g2.H);
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  // src/render/renderBlocks.ts
  init_blockDefinitions2();

  // src/render/renderPrimitives.ts
  function roundRect(ctx, x, y, w, h, r, fill, stroke) {
    const rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
  }

  // src/render/renderBlocks.ts
  function drawIcon(ctx, blk, icon, color) {
    const cx = blk.x + blk.w / 2;
    const cy = blk.y + blk.h / 2;
    const s = Math.min(blk.w, blk.h) * 0.24;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2.1;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    if (icon === "diamond") {
      ctx.beginPath();
      ctx.moveTo(cx, cy - s * 1.2);
      ctx.lineTo(cx + s * 0.96, cy);
      ctx.lineTo(cx, cy + s * 1.2);
      ctx.lineTo(cx - s * 0.96, cy);
      ctx.closePath();
      ctx.stroke();
    } else if (icon === "flame") {
      ctx.beginPath();
      ctx.moveTo(cx, cy + s * 0.95);
      ctx.quadraticCurveTo(cx + s * 1, cy - s * 0.05, cx, cy - s * 1.25);
      ctx.quadraticCurveTo(cx - s * 1, cy - s * 0.05, cx, cy + s * 0.95);
      ctx.stroke();
    } else if (icon === "star") {
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const a = Math.PI * 2 * i / 8 - Math.PI / 2;
        const r = i % 2 === 0 ? s * 1.2 : s * 0.52;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    } else if (icon === "smile") {
      ctx.beginPath();
      ctx.arc(cx, cy + s * 0.1, s * 1.04, 0.16 * Math.PI, 0.84 * Math.PI);
      ctx.stroke();
      ctx.fillRect(cx - s * 0.68, cy - s * 0.8, 2, 2);
      ctx.fillRect(cx + s * 0.34, cy - s * 0.8, 2, 2);
    } else if (icon === "crown") {
      ctx.beginPath();
      ctx.moveTo(cx - s * 1.18, cy + s * 0.92);
      ctx.lineTo(cx - s * 1.18, cy - s * 0.46);
      ctx.lineTo(cx - s * 0.48, cy + s * 0.24);
      ctx.lineTo(cx, cy - s * 1);
      ctx.lineTo(cx + s * 0.48, cy + s * 0.24);
      ctx.lineTo(cx + s * 1.18, cy - s * 0.46);
      ctx.lineTo(cx + s * 1.18, cy + s * 0.92);
      ctx.closePath();
      ctx.stroke();
    } else if (icon === "boss") {
      ctx.beginPath();
      ctx.moveTo(cx - s * 1, cy);
      ctx.lineTo(cx + s * 1, cy);
      ctx.moveTo(cx, cy - s * 1);
      ctx.lineTo(cx, cy + s * 1);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.moveTo(cx - s * 0.95, cy);
      ctx.lineTo(cx + s * 0.95, cy);
      ctx.moveTo(cx, cy - s * 0.95);
      ctx.lineTo(cx, cy + s * 0.95);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, s * 0.68, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  function alphaColor(hexOrRgb, alpha) {
    const match = hexOrRgb.match(/rgba?\(([^)]+)\)/i);
    if (match) {
      const parts = match[1].split(",").map((v) => v.trim());
      return `rgba(${parts[0]},${parts[1]},${parts[2]},${alpha})`;
    }
    if (hexOrRgb.startsWith("#")) {
      const hex = hexOrRgb.length === 4 ? `#${hexOrRgb[1]}${hexOrRgb[1]}${hexOrRgb[2]}${hexOrRgb[2]}${hexOrRgb[3]}${hexOrRgb[3]}` : hexOrRgb;
      const r = parseInt(hex.slice(1, 3), 16);
      const g2 = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r},${g2},${b},${alpha})`;
    }
    return `rgba(255,255,255,${alpha})`;
  }
  function renderBossAura(ctx, blk, pulse) {
    const cx = blk.x + blk.w / 2;
    const cy = blk.y + blk.h / 2;
    const phase = Math.max(1, blk.bossPhase || 1);
    const hpRatio = Math.max(0, blk.hp / Math.max(1, blk.maxHp || 1));
    const fear = Math.min(1, 0.24 + phase * 0.18 + (1 - hpRatio) * 0.42);
    const breathe = 1 + Math.sin(performance.now() * 0.005 + phase) * (0.012 + fear * 0.022);
    const r = Math.max(blk.w, blk.h) * (0.9 + fear * 0.08) * breathe;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (let i = 0; i < 12; i++) {
      const a = Math.PI * 2 * i / 12 + pulse * (0.35 + fear * 0.25);
      const inner = r * (0.62 + (i % 3) * 0.025);
      const outer = r * (1.14 + (i % 2) * 0.12 + fear * 0.24) + pulse * (3 + fear * 6);
      ctx.strokeStyle = phase >= 3 ? (i % 2 === 0 ? `rgba(255,72,72,${0.20 + fear * 0.16})` : `rgba(255,138,72,${0.16 + fear * 0.10})`) : (i % 2 === 0 ? `rgba(255,96,176,${0.18 + fear * 0.08})` : `rgba(141,88,255,${0.14 + fear * 0.06})`);
      ctx.lineWidth = i % 2 === 0 ? 2.2 + fear * 0.8 : 1.5 + fear * 0.4;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * inner, cy + Math.sin(a) * inner);
      ctx.lineTo(cx + Math.cos(a) * outer, cy + Math.sin(a) * outer);
      ctx.stroke();
    }
    const haze = ctx.createRadialGradient(cx, cy, r * 0.14, cx, cy, r * 1.25);
    if (phase >= 3) {
      haze.addColorStop(0, `rgba(255,118,98,${0.26 + fear * 0.18})`);
      haze.addColorStop(0.34, `rgba(255,64,64,${0.16 + fear * 0.12})`);
      haze.addColorStop(0.72, `rgba(120,18,22,${0.22 + fear * 0.14})`);
    } else {
      haze.addColorStop(0, `rgba(255,100,185,${0.18 + fear * 0.10})`);
      haze.addColorStop(0.4, `rgba(150,90,255,${0.12 + fear * 0.07})`);
      haze.addColorStop(0.72, `rgba(60,12,86,${0.14 + fear * 0.08})`);
    }
    haze.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = haze;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 1.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  function renderBossCore(ctx, blk, pulse) {
    const cx = blk.x + blk.w / 2;
    const cy = blk.y + blk.h / 2;
    const phase = Math.max(1, blk.bossPhase || 1);
    const hpRatio = Math.max(0, blk.hp / Math.max(1, blk.maxHp || 1));
    const fear = Math.min(1, 0.18 + phase * 0.17 + (1 - hpRatio) * 0.48);
    const hitPulse = Math.min(1, (blk.hitFlash || 0) / 7);
    const beat = 0.5 + 0.5 * Math.sin(performance.now() * (0.005 + fear * 0.002));
    const coreR = Math.min(blk.w, blk.h) * (0.17 + beat * 0.01 + fear * 0.015 + hitPulse * 0.02);
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    const outer = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * (5.8 + fear * 1.2));
    outer.addColorStop(0, "rgba(255,255,255,1)");
    outer.addColorStop(0.1, phase >= 3 ? `rgba(255,246,220,${0.98})` : `rgba(255,248,255,0.96)`);
    outer.addColorStop(0.24, phase >= 3 ? `rgba(255,154,86,${0.84 + hitPulse * 0.08})` : `rgba(255,186,234,0.72)`);
    outer.addColorStop(0.44, phase >= 3 ? `rgba(255,66,52,${0.56 + fear * 0.18})` : `rgba(255,98,176,0.44)`);
    outer.addColorStop(0.68, phase >= 2 ? `rgba(138,26,48,${0.22 + fear * 0.12})` : `rgba(150,96,255,0.12)`);
    outer.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = outer;
    ctx.beginPath();
    ctx.arc(cx, cy, coreR * (4.9 + pulse * 0.5 + fear * 0.65), 0, Math.PI * 2);
    ctx.fill();
    const inner = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 1.9);
    inner.addColorStop(0, "rgba(255,255,255,1)");
    inner.addColorStop(0.34, phase >= 3 ? `rgba(255,248,228,${0.98})` : `rgba(255,246,255,0.98)`);
    inner.addColorStop(0.72, phase >= 3 ? `rgba(255,120,68,${0.58 + hitPulse * 0.08})` : `rgba(255,145,210,0.22)`);
    inner.addColorStop(1, "rgba(255,120,68,0)");
    ctx.fillStyle = inner;
    ctx.beginPath();
    ctx.arc(cx, cy, coreR * 1.62, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = phase >= 3 ? "rgba(255,238,224,0.98)" : "rgba(255,230,250,0.98)";
    ctx.lineWidth = 1.9;
    ctx.beginPath();
    ctx.moveTo(cx - coreR * 2.2, cy);
    ctx.lineTo(cx + coreR * 2.2, cy);
    ctx.moveTo(cx, cy - coreR * 2.2);
    ctx.lineTo(cx, cy + coreR * 2.2);
    ctx.stroke();
    ctx.restore();
  }
  function renderGlassReflection(ctx, blk, def, pulse) {
    const gloss = ctx.createLinearGradient(blk.x, blk.y, blk.x, blk.y + blk.h * 0.5);
    gloss.addColorStop(0, alphaColor("#ffffff", 0.64 + pulse * 0.06));
    gloss.addColorStop(0.22, alphaColor(def.shine, 0.26));
    gloss.addColorStop(1, alphaColor(def.shine, 0));
    ctx.fillStyle = gloss;
    roundRect(ctx, blk.x + 2, blk.y + 2, blk.w - 4, Math.max(4, blk.h * 0.4), 5, true, false);
    ctx.strokeStyle = "rgba(255,255,255,0.22)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(blk.x + blk.w * 0.16, blk.y + blk.h * 0.72);
    ctx.lineTo(blk.x + blk.w * 0.82, blk.y + blk.h * 0.18);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(blk.x + blk.w * 0.28, blk.y + blk.h * 0.82);
    ctx.lineTo(blk.x + blk.w * 0.88, blk.y + blk.h * 0.34);
    ctx.stroke();
  }
  function renderBlocks(g2) {
    const { ctx } = g2;
    const t2 = performance.now() * 3e-3;
    for (const blk of g2.blocks) {
      if (blk.hp <= 0) continue;
      const def = BLOCK_DEFINITIONS[blk.type];
      const asset = g2.assets[`block_${blk.type}`];
      const isBoss = def.renderStyle === "boss" || blk.type === "boss";
      const pulse = 0.5 + 0.5 * Math.sin(t2 + blk.x * 0.03 + blk.y * 0.04);
      const impact = Math.max(0, Math.min(1, (blk.hitFlash || 0) / (isBoss ? 7 : 5)));
      const cx = blk.x + blk.w / 2;
      const cy = blk.y + blk.h / 2;
      const jitterX = impact > 0 ? Math.sin(t2 * 28 + blk.x * 0.21) * (isBoss ? 0.4 : 0.9) * impact : 0;
      const jitterY = impact > 0 ? Math.cos(t2 * 23 + blk.y * 0.17) * (isBoss ? 0.25 : 0.65) * impact : 0;
      if (isBoss) renderBossAura(ctx, blk, pulse);
      ctx.save();
      if (impact > 0) {
        ctx.translate(jitterX, jitterY);
        ctx.translate(cx, cy);
        ctx.scale(1 + impact * (isBoss ? 0.025 : 0.055), 1 - impact * (isBoss ? 0.012 : 0.028));
        ctx.translate(-cx, -cy);
      }
      ctx.save();
      if (asset && asset.complete && asset.naturalWidth > 0) {
        if (isBoss) {
          ctx.globalAlpha = 0.58;
          ctx.shadowColor = "rgba(255,118,188,0.18)";
          ctx.shadowBlur = 8 + pulse * 4;
        } else {
          ctx.globalAlpha = 0.98;
          ctx.shadowColor = alphaColor(def.frame, 0.16 + pulse * 0.06);
          ctx.shadowBlur = 5 + pulse * 2;
        }
        ctx.drawImage(asset, blk.x, blk.y, blk.w, blk.h);
      }
      ctx.restore();
      if (!isBoss) {
        const body = ctx.createLinearGradient(blk.x, blk.y, blk.x, blk.y + blk.h);
        body.addColorStop(0, alphaColor(def.fill[0], 0.28));
        body.addColorStop(0.42, alphaColor("#ffffff", 0.08));
        body.addColorStop(0.5, alphaColor(def.fill[0], 0.04));
        body.addColorStop(1, alphaColor(def.fill[1], 0.18));
        ctx.fillStyle = body;
        roundRect(ctx, blk.x + 1.5, blk.y + 1.5, blk.w - 3, blk.h - 3, 6, true, false);
        renderGlassReflection(ctx, blk, def, pulse);
      } else {
        const shroud = ctx.createRadialGradient(blk.x + blk.w / 2, blk.y + blk.h / 2, blk.w * 0.12, blk.x + blk.w / 2, blk.y + blk.h / 2, blk.w * 0.7);
        shroud.addColorStop(0, "rgba(24,8,26,0.02)");
        shroud.addColorStop(0.45, "rgba(18,8,24,0.18)");
        shroud.addColorStop(1, "rgba(6,4,14,0.52)");
        ctx.fillStyle = shroud;
        roundRect(ctx, blk.x + 1.5, blk.y + 1.5, blk.w - 3, blk.h - 3, 10, true, false);
      }
      const glowA = isBoss ? 0.14 + pulse * 0.05 : 0.14 + pulse * 0.06;
      ctx.strokeStyle = alphaColor(def.frame, glowA);
      ctx.lineWidth = isBoss ? 2 : 1.9;
      roundRect(ctx, blk.x - 0.4, blk.y - 0.4, blk.w + 0.8, blk.h + 0.8, isBoss ? 11 : 7, false, true);
      ctx.strokeStyle = alphaColor(def.frame, isBoss ? 0.44 : 0.82);
      ctx.lineWidth = 1.08;
      roundRect(ctx, blk.x + 0.8, blk.y + 0.8, blk.w - 1.6, blk.h - 1.6, isBoss ? 10 : 6, false, true);
      if (!isBoss) drawIcon(ctx, blk, def.icon, "rgba(255,255,255,0.92)");
      if (isBoss) renderBossCore(ctx, blk, pulse);
      if (blk.hitFlash && blk.hitFlash > 0) {
        const a = Math.min(0.36, blk.hitFlash * (isBoss ? 0.05 : 0.06));
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        roundRect(ctx, blk.x + 1.2, blk.y + 1.2, blk.w - 2.4, blk.h - 2.4, isBoss ? 9 : 6, true, false);
        ctx.restore();
      }
      if (blk.resistance) {
        ctx.strokeStyle = blk.resistance.color || "rgba(255,255,255,0.58)";
        ctx.lineWidth = 1.05;
        roundRect(ctx, blk.x - 0.8, blk.y - 0.8, blk.w + 1.6, blk.h + 1.6, isBoss ? 11 : 7, false, true);
      }
      if (blk.indestructible) {
        ctx.strokeStyle = "rgba(214,228,255,0.92)";
        ctx.lineWidth = 1.2;
        for (let ix = 0; ix < 3; ix++) {
          const yy = blk.y + 4 + ix * 5;
          ctx.beginPath();
          ctx.moveTo(blk.x + 5, yy);
          ctx.lineTo(blk.x + blk.w - 5, yy);
          ctx.stroke();
        }
      }
      if (!blk.indestructible && blk.maxHp > 1) {
        const ratio = blk.hp / Math.max(1, blk.maxHp);
        const hpY = blk.y + blk.h - 6;
        ctx.fillStyle = "rgba(4,16,30,0.56)";
        roundRect(ctx, blk.x + 5, hpY, blk.w - 10, 3.2, 2, true, false);
        const hpGrad = ctx.createLinearGradient(blk.x + 5, hpY, blk.x + blk.w - 5, hpY);
        hpGrad.addColorStop(0, isBoss ? "rgba(255,210,236,0.96)" : "rgba(240,250,255,0.94)");
        hpGrad.addColorStop(1, isBoss ? "rgba(255,114,184,0.98)" : alphaColor(def.frame, 0.98));
        ctx.fillStyle = hpGrad;
        roundRect(ctx, blk.x + 5, hpY, Math.max(4, (blk.w - 10) * ratio), 3.2, 2, true, false);
      }
      ctx.restore();
    }
  }

  // src/data/dropDefinitions.ts
  var DROP_DEFINITIONS = {
    wide: { type: "wide", weight: 15, guaranteedOrder: 1, overlay: "WIDE", draw: { colors: ["#71ecff", "#2f84ff"], mark: "W" }, effects: [{ kind: "setPaddleWidth", amount: 30, max: 230, powerType: "WIDE", powerTimer: 600 }] },
    slow: { type: "slow", weight: 12, guaranteedOrder: 2, overlay: "SLOW", draw: { colors: ["#d2b8ff", "#7f6dff"], mark: "S" }, effects: [{ kind: "scaleBallVelocity", factor: 0.86, powerType: "SLOW", powerTimer: 320 }] },
    score: { type: "score", weight: 13, guaranteedOrder: 3, overlay: "+500", draw: { colors: ["#ffe07a", "#ff9d36"], mark: "$" }, effects: [{ kind: "addScore", amount: 500 }] },
    life: { type: "life", weight: 6, guaranteedOrder: 4, overlay: "1UP", draw: { colors: ["#9bffad", "#45c970"], mark: "+1" }, effects: [{ kind: "grantLifeOrScore", lifeCapOffset: 3, score: 300 }] },
    expand: { type: "expand", weight: 13, guaranteedOrder: 5, overlay: "EXPAND", draw: { colors: ["#9de7ff", "#00b8ff"], mark: "E" }, effects: [{ kind: "setPaddleWidth", amount: 56, max: 270, powerType: "EXPAND", powerTimer: 760 }] },
    barrier: { type: "barrier", weight: 8, guaranteedOrder: 6, overlay: "BARRIER", draw: { colors: ["#c8ffae", "#65d65e"], mark: "B" }, effects: [{ kind: "addBarrier", amount: 1, max: 2, score: 180 }] },
    multi: { type: "multi", weight: 6, guaranteedOrder: 7, overlay: "DISRUPTION", draw: { colors: ["#ffd7ff", "#ff66d9"], mark: "D" }, effects: [{ kind: "spawnMultiball", successScore: 180, failScore: 60, combo: 1 }] },
    magnet: { type: "magnet", weight: 12, guaranteedOrder: 8, overlay: "MAGNET", draw: { colors: ["#b6ffd8", "#12c7a5"], mark: "G" }, effects: [{ kind: "setCombatTimer", timer: "magnetTimer", value: 540, powerType: "MAGNET", powerTimer: 540 }, { kind: "addScore", amount: 120 }] },
    laser: { type: "laser", weight: 8, guaranteedOrder: 9, overlay: "LASER", draw: { colors: ["#ffb6ff", "#ff4bcc"], mark: "L" }, effects: [{ kind: "setCombatTimer", timer: "laserTimer", value: 540, cooldownKey: "laserCooldown", cooldownValue: 0 }, { kind: "spawnWeapon", weapon: "laser" }] },
    bigball: { type: "bigball", weight: 10, guaranteedOrder: 10, overlay: "BIG BALL", draw: { colors: ["#c2d4ff", "#6f8fff"], mark: "O" }, effects: [{ kind: "setCombatTimer", timer: "bigBallTimer", value: 620 }, { kind: "applyBigBallState" }] },
    missile: { type: "missile", weight: 11, guaranteedOrder: 11, overlay: "MISSILE", draw: { colors: ["#ffd1a1", "#ff7f3f"], mark: "X" }, effects: [{ kind: "setCombatTimer", timer: "missileTimer", value: 620, cooldownKey: "missileCooldown", cooldownValue: 0 }, { kind: "spawnWeapon", weapon: "missile" }] },
    catch: { type: "catch", weight: 7, overlay: "CATCH", draw: { colors: ["#a2ffe8", "#2ad3af"], mark: "C" }, effects: [{ kind: "setCatchTimer", value: 540, powerType: "CATCH", powerTimer: 540 }] },
    warp: { type: "warp", weight: 3, overlay: "WARP", draw: { colors: ["#ffe0ff", "#8b6dff"], mark: "W+" }, effects: [{ kind: "addScore", amount: 800 }, { kind: "stageWarp" }] },
    pierce: { type: "pierce", weight: 8, overlay: "PIERCE", draw: { colors: ["#ffb6a0", "#ff5d5d"], mark: "P" }, effects: [{ kind: "setPaddleWidth", amount: 0, max: 999, powerType: "PIERCE", powerTimer: 420 }, { kind: "addScore", amount: 350 }] },
    fast: { type: "fast", weight: 5, overlay: "FAST", draw: { colors: ["#fff1a8", "#ffb300"], mark: "F" }, effects: [{ kind: "boostBallVelocity", minBaseMultiplier: 0.95, scale: 1.1 }] },
    shrink: { type: "shrink", weight: 4, overlay: "SHRINK", draw: { colors: ["#ffb0b0", "#ff5c5c"], mark: "-" }, effects: [{ kind: "setPaddleWidth", amount: -28, min: 88, max: 999, powerType: "SHRINK", powerTimer: 320 }] },
    chaos: { type: "chaos", weight: 3, overlay: "CHAOS", draw: { colors: ["#ffddb0", "#ff8a3d"], mark: "?" }, effects: [{ kind: "scrambleBallVelocity", amount: 0.85, verticalBias: 1.03 }] }
  };
  var GUARANTEED_DROP_SEQUENCE = Object.values(DROP_DEFINITIONS).filter((def) => typeof def.guaranteedOrder === "number").sort((a, b) => a.guaranteedOrder - b.guaranteedOrder).map((def) => def.type);
  var WEIGHTED_DROP_SEQUENCE = Object.values(DROP_DEFINITIONS).map((def) => ({ type: def.type, weight: def.weight }));

  // src/render/renderDrops.ts
  function renderDrops(g2) {
    const { ctx } = g2;
    for (const d of g2.drops) {
      const draw = DROP_DEFINITIONS[d.type].draw;
      const wobble = Math.sin(d.t * 0.14) * 1.2;
      const img = g2.assets[`drop_${d.type}`];
      ctx.save();
      ctx.translate(0, wobble);
      if (img && img.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, d.x - 18, d.y - 24, 36, 48);
      } else {
        const bodyGrad = ctx.createLinearGradient(d.x - 12, d.y - 16, d.x + 12, d.y + 16);
        bodyGrad.addColorStop(0, draw.colors[0]);
        bodyGrad.addColorStop(1, draw.colors[1]);
        ctx.fillStyle = "rgba(255,255,255,0.08)";
        roundRect(ctx, d.x - 16, d.y - 20, 32, 40, 14, true, false);
        ctx.fillStyle = bodyGrad;
        roundRect(ctx, d.x - 14, d.y - 18, 28, 36, 12, true, false);
        ctx.fillStyle = "rgba(255,255,255,0.24)";
        roundRect(ctx, d.x - 12, d.y - 15, 24, 8, 8, true, false);
        ctx.strokeStyle = "rgba(255,255,255,0.62)";
        ctx.lineWidth = 1.1;
        roundRect(ctx, d.x - 13.5, d.y - 17.5, 27, 35, 12, false, true);
        ctx.strokeStyle = "rgba(255,255,255,0.30)";
        ctx.beginPath();
        ctx.moveTo(d.x, d.y - 16);
        ctx.lineTo(d.x, d.y + 16);
        ctx.stroke();
        ctx.fillStyle = "rgba(255,255,255,.96)";
        ctx.font = "bold 11px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(draw.mark, d.x, d.y + 1);
      }
      ctx.restore();
    }
  }

  // src/render/renderPaddle.ts
  function renderPaddle(g2) {
    const { ctx } = g2;
    const key = g2.paddle.powerType === "LASER" ? "paddle_laser" : g2.paddle.powerType === "CATCH" ? "paddle_catch" : "paddle_base";
    const img = g2.assets[key];
    ctx.save();
    ctx.fillStyle = "rgba(80,180,255,0.12)";
    roundRect(ctx, g2.paddle.x + 8, g2.paddle.y + g2.paddle.h + 4, Math.max(18, g2.paddle.w - 16), 4, 2, true, false);
    ctx.restore();
    if (img && img.complete && img.naturalWidth > 0) {
      const sideW = Math.max(18, Math.round(img.naturalWidth * 0.22));
      const centerSrcX = sideW;
      const centerSrcW = Math.max(1, img.naturalWidth - sideW * 2);
      const leftDstW = Math.min(sideW, Math.max(18, g2.paddle.w * 0.22));
      const rightDstW = leftDstW;
      const centerDstW = Math.max(1, g2.paddle.w - leftDstW - rightDstW);
      const dy = g2.paddle.y - 6;
      const dh = g2.paddle.h + 14;
      ctx.drawImage(img, 0, 0, sideW, img.naturalHeight, g2.paddle.x, dy, leftDstW, dh);
      ctx.drawImage(img, centerSrcX, 0, centerSrcW, img.naturalHeight, g2.paddle.x + leftDstW, dy, centerDstW, dh);
      ctx.drawImage(img, img.naturalWidth - sideW, 0, sideW, img.naturalHeight, g2.paddle.x + leftDstW + centerDstW, dy, rightDstW, dh);
    } else {
      const pg = ctx.createLinearGradient(g2.paddle.x, g2.paddle.y, g2.paddle.x + g2.paddle.w, g2.paddle.y);
      pg.addColorStop(0, "#8ef7ff");
      pg.addColorStop(0.5, "#70a8ff");
      pg.addColorStop(1, "#ff67d4");
      ctx.fillStyle = pg;
      roundRect(ctx, g2.paddle.x, g2.paddle.y, g2.paddle.w, g2.paddle.h, 8, true, false);
    }
    if (g2.paddle.powerTimer > 0) {
      ctx.fillStyle = "rgba(255,255,255,.16)";
      roundRect(ctx, g2.paddle.x, g2.paddle.y - 8, g2.paddle.w, 4, 2, true, false);
      ctx.fillStyle = g2.state.combat.magnetTimer > 0 ? "#7dffd8" : "#ffe07a";
      roundRect(ctx, g2.paddle.x, g2.paddle.y - 8, g2.paddle.w * (Math.min(760, g2.paddle.powerTimer) / 760), 4, 2, true, false);
    }
  }

  // src/render/renderWeapons.ts
  function renderWeapons(g2) {
    const { ctx } = g2;
    for (const laser of g2.lasers) {
      const grad = ctx.createLinearGradient(laser.x, laser.y - 14, laser.x, laser.y + 14);
      grad.addColorStop(0, "#d9ffff");
      grad.addColorStop(0.5, "#6ff7ff");
      grad.addColorStop(1, "#27b7ff");
      ctx.fillStyle = grad;
      roundRect(ctx, laser.x - 2.5, laser.y - 13, 5, 26, 2, true, false);
      ctx.strokeStyle = "rgba(255,255,255,0.75)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(laser.x, laser.y - 14);
      ctx.lineTo(laser.x, laser.y + 14);
      ctx.stroke();
    }
    for (const missile of g2.missiles) {
      ctx.fillStyle = "#7dffe1";
      roundRect(ctx, missile.x - 4.5, missile.y - 10, 9, 20, 3, true, false);
      ctx.fillStyle = "#efffff";
      roundRect(ctx, missile.x - 1.2, missile.y - 8, 2.4, 8, 1, true, false);
      ctx.fillStyle = "#3fe5b1";
      ctx.beginPath();
      ctx.moveTo(missile.x - 4, missile.y + 10);
      ctx.lineTo(missile.x, missile.y + 16);
      ctx.lineTo(missile.x + 4, missile.y + 10);
      ctx.closePath();
      ctx.fill();
    }
  }

  // src/data/ballTraitRenderDefinitions.ts
  var BALL_TRAIT_RENDER_DEFINITIONS = {
    normal: { trailLength: 0.9, trailAlpha: 0.28, glowRadius: 2.1, glowAlpha: 0.24, pulseSpeed: 0.08, outline: "rgba(255,255,255,0.68)" },
    plasma: { trailLength: 1.0, trailAlpha: 0.3, glowRadius: 2.4, glowAlpha: 0.28, pulseSpeed: 0.11, outline: "rgba(255,214,250,0.72)" },
    heavy: { trailLength: 0.55, trailAlpha: 0.2, glowRadius: 1.9, glowAlpha: 0.2, pulseSpeed: 0.06, outline: "rgba(235,255,214,0.64)" },
    ghost: { trailLength: 1.15, trailAlpha: 0.2, glowRadius: 2.7, glowAlpha: 0.2, pulseSpeed: 0.14, outline: "rgba(255,232,186,0.64)" },
    nova: { trailLength: 1.25, trailAlpha: 0.34, glowRadius: 3.0, glowAlpha: 0.3, pulseSpeed: 0.16, outline: "rgba(225,233,255,0.78)" }
  };

  // src/render/renderBalls.ts
  function alphaColor2(base, alpha) {
    const match = base.match(/rgba?\(([^)]+)\)/i);
    if (!match) return `rgba(255,255,255,${alpha})`;
    const parts = match[1].split(",").map((p) => p.trim());
    return `rgba(${parts[0]},${parts[1]},${parts[2]},${alpha})`;
  }
  function renderBalls(g2) {
    const { ctx } = g2;
    for (let i = 0; i < g2.balls.length; i++) {
      const ball = g2.balls[i];
      const renderDef = BALL_TRAIT_RENDER_DEFINITIONS[ball.trait] || BALL_TRAIT_RENDER_DEFINITIONS.normal;
      ball.pulse += renderDef.pulseSpeed;
      const speed = Math.max(1, Math.hypot(ball.vx, ball.vy));
      if (!Array.isArray(ball.trailPoints)) ball.trailPoints = [];
      ball.trailPoints.unshift({ x: ball.x, y: ball.y, r: ball.r });
      const maxTrail = Math.max(8, Math.round(10 + speed * 1.2));
      if (ball.trailPoints.length > maxTrail) ball.trailPoints.length = maxTrail;
      for (let t = ball.trailPoints.length - 1; t >= 0; t--) {
        const tp = ball.trailPoints[t];
        const k = 1 - t / Math.max(1, ball.trailPoints.length - 1);
        const alpha = renderDef.trailAlpha * k * 0.9;
        const rr = tp.r * (0.42 + k * 0.72);
        ctx.fillStyle = alphaColor2(ball.trail, alpha);
        ctx.beginPath();
        ctx.arc(tp.x, tp.y, rr, 0, Math.PI * 2);
        ctx.fill();
      }
      const glowRadius = ball.r * (renderDef.glowRadius + Math.min(0.4, speed * 0.032));
      const glow = ctx.createRadialGradient(ball.x, ball.y, ball.r * 0.28, ball.x, ball.y, glowRadius);
      glow.addColorStop(0, "rgba(255,255,255,0.96)");
      glow.addColorStop(0.22, alphaColor2(ball.trail, renderDef.glowAlpha + 0.06));
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, glowRadius, 0, Math.PI * 2);
      ctx.fill();
      const key = g2.state.combat.bigBallTimer > 0 ? "ball_big" : `ball_${ball.trait}`;
      const img = g2.assets[key];
      if (img && img.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, ball.x - ball.r * 1.75, ball.y - ball.r * 1.75, ball.r * 3.5, ball.r * 3.5);
      } else {
        const body = ctx.createRadialGradient(ball.x - ball.r * 0.28, ball.y - ball.r * 0.36, ball.r * 0.2, ball.x, ball.y, ball.r * 1.25);
        body.addColorStop(0, "rgba(255,255,255,0.98)");
        body.addColorStop(0.28, ball.color);
        body.addColorStop(1, alphaColor2(ball.trail, 0.92));
        ctx.fillStyle = body;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = renderDef.outline;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, Math.max(1, ball.r - 0.5), 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.fillStyle = "rgba(255,255,255,0.84)";
      ctx.beginPath();
      ctx.arc(ball.x - ball.r * 0.24, ball.y - ball.r * 0.24, Math.max(1.2, ball.r * 0.22), 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // src/render/renderEffects.ts
  function renderRoundIntro(g2) {
    const timer = g2.state.stageRuntime.roundIntroTimer;
    if (timer <= 0) return;
    const max = Math.max(1, g2.state.stageRuntime.roundIntroMax);
    const t2 = timer / max;
    const scale = 1 + t2 * 0.12;
    const alpha = Math.min(1, 1.15 - Math.abs(0.5 - t2) * 1.8);
    const { ctx } = g2;
    ctx.save();
    ctx.globalAlpha = Math.max(0, alpha);
    ctx.fillStyle = "rgba(4,12,24,0.22)";
    ctx.fillRect(0, 0, g2.W, g2.H);
    ctx.fillStyle = "rgba(255,255,255,0.96)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `900 ${Math.round(42 * scale)}px Arial`;
    ctx.fillText(g2.state.stageRuntime.roundIntroLabel || "ROUND", g2.W / 2, g2.H * 0.42);
    ctx.font = "bold 16px Arial";
    ctx.fillStyle = "rgba(180,225,245,0.92)";
    ctx.fillText(g2.state.stageRuntime.stageThemeName || "", g2.W / 2, g2.H * 0.42 + 42);
    ctx.restore();
  }
  function renderScreenFlash(g2) {
    if (g2.state.stageRuntime.screenFlash <= 0) return;
    const { ctx } = g2;
    ctx.save();
    ctx.fillStyle = `rgba(255,255,255,${Math.min(0.22, g2.state.stageRuntime.screenFlash)})`;
    ctx.fillRect(0, 0, g2.W, g2.H);
    ctx.restore();
  }
  function renderBossDown(g2) {
    const timer = g2.state.stageRuntime.bossDownTimer;
    if (timer <= 0) return;
    const max = 124;
    const p = 1 - timer / max;
    const alpha = Math.min(1, 0.24 + Math.sin(Math.min(1, p) * Math.PI) * 0.76);
    const peak = timer <= 102 && timer >= 94;
    const { ctx } = g2;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = peak ? "rgba(255,255,255,0.22)" : "rgba(255,180,220,0.08)";
    ctx.fillRect(0, 0, g2.W, g2.H);
    ctx.globalCompositeOperation = "lighter";
    for (let i = 0; i < 8; i++) {
      const off = i * 34 + p * 40;
      ctx.strokeStyle = i % 2 === 0 ? "rgba(255,230,248,0.30)" : "rgba(130,210,255,0.18)";
      ctx.lineWidth = i % 2 === 0 ? 2.2 : 1.4;
      ctx.beginPath();
      ctx.moveTo(g2.W * 0.22 + off, g2.H * 0.22);
      ctx.lineTo(g2.W * 0.16 + off * 0.82, g2.H * 0.78);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(g2.W * 0.78 - off, g2.H * 0.22);
      ctx.lineTo(g2.W * 0.84 - off * 0.82, g2.H * 0.78);
      ctx.stroke();
    }
    ctx.restore();
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineWidth = 8;
    ctx.strokeStyle = "rgba(0,0,0,0.36)";
    ctx.fillStyle = peak ? "rgba(255,255,255,0.98)" : "rgba(255,240,248,0.96)";
    ctx.font = peak ? "900 64px Arial" : "900 58px Arial";
    ctx.strokeText("BOSS DOWN", g2.W / 2, g2.H * 0.38);
    ctx.fillText("BOSS DOWN", g2.W / 2, g2.H * 0.38);
    ctx.font = "bold 18px Arial";
    ctx.fillStyle = "rgba(255,224,244,0.92)";
    ctx.fillText("CORE ELIMINATED", g2.W / 2, g2.H * 0.38 + 46);
    ctx.restore();
  }
  function renderStageTransition(g2) {
    const timer = g2.state.stageRuntime.stageTransitionTimer;
    if (timer <= 0) return;
    const max = Math.max(1, g2.state.stageRuntime.stageTransitionMax);
    const p = 1 - timer / max;
    const { ctx } = g2;
    ctx.save();
    ctx.globalAlpha = 0.18 + Math.sin(p * Math.PI) * 0.32;
    const grad = ctx.createLinearGradient(0, 0, g2.W, 0);
    grad.addColorStop(0, "rgba(70,180,255,0.0)");
    grad.addColorStop(0.22, "rgba(70,180,255,0.12)");
    grad.addColorStop(0.5, "rgba(255,255,255,0.22)");
    grad.addColorStop(0.78, "rgba(70,180,255,0.12)");
    grad.addColorStop(1, "rgba(70,180,255,0.0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, g2.W, g2.H);
    ctx.restore();
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (let i = 0; i < 10; i++) {
      const x = (i / 10 + p * 0.6) % 1 * g2.W;
      ctx.strokeStyle = `rgba(120,220,255,${0.08 + (1 - i / 10) * 0.08})`;
      ctx.lineWidth = 1.2 + i * 0.08;
      ctx.beginPath();
      ctx.moveTo(x, g2.H * 0.18);
      ctx.lineTo(x - 36 - i * 4, g2.H * 0.82);
      ctx.stroke();
    }
    ctx.restore();
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeStyle = "rgba(0,0,0,0.34)";
    ctx.lineWidth = 6;
    ctx.fillStyle = "rgba(220,248,255,0.96)";
    ctx.font = "900 28px Arial";
    ctx.strokeText(g2.state.stageRuntime.stageTransitionLabel || "HYPERLANE OPEN", g2.W / 2, g2.H * 0.46);
    ctx.fillText(g2.state.stageRuntime.stageTransitionLabel || "HYPERLANE OPEN", g2.W / 2, g2.H * 0.46);
    ctx.restore();
  }
  function renderBossHpBar(g2) {
    const boss = g2.blocks.find((b) => b.type === "boss" && b.hp > 0);
    if (!boss) return;
    const { ctx } = g2;
    const width = Math.min(420, g2.W * 0.52);
    const x = (g2.W - width) / 2;
    const y = 58;
    const hpRatio = Math.max(0, boss.hp / Math.max(1, boss.maxHp));
    const armorRatio = Math.max(0, (boss.armor || 0) / 2);
    const phase = boss.bossPhase || 1;
    ctx.save();
    ctx.fillStyle = phase >= 3 ? "rgba(26,6,8,0.84)" : phase >= 2 ? "rgba(22,8,12,0.8)" : "rgba(18,10,26,0.72)";
    ctx.strokeStyle = phase >= 3 ? "rgba(255,82,82,0.96)" : phase >= 2 ? "rgba(255,110,110,0.9)" : "rgba(255,145,205,0.8)";
    ctx.lineWidth = 1.4;
    roundRect(ctx, x, y, width, 22, 10, true, true);
    const hpGrad = ctx.createLinearGradient(x, y, x + width, y);
    if (phase >= 2) {
      hpGrad.addColorStop(0, "#ffe0e0");
      hpGrad.addColorStop(0.55, "#ff8080");
      hpGrad.addColorStop(1, "#ff3535");
    } else {
      hpGrad.addColorStop(0, "#ffd2f0");
      hpGrad.addColorStop(1, "#ff4dac");
    }
    ctx.fillStyle = hpGrad;
    roundRect(ctx, x + 3, y + 3, (width - 6) * hpRatio, 10, 7, true, false);
    if (armorRatio > 0) {
      ctx.fillStyle = "rgba(166,220,255,0.9)";
      roundRect(ctx, x + 3, y + 14, (width - 6) * armorRatio, 4, 3, true, false);
    }
    ctx.fillStyle = "#fff6fd";
    ctx.font = "bold 12px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const armorText = (boss.armor || 0) > 0 ? `  ARMOR ${boss.armor}` : "";
    ctx.fillText(`BOSS CORE  PHASE ${phase}  HP ${boss.hp}/${boss.maxHp}${armorText}`, x + width / 2, y + 11);
    ctx.restore();
  }
  function renderEffects(g2) {
    const { ctx } = g2;
    renderScreenFlash(g2);
    for (const fx of g2.blockBursts) {
      const alpha = fx.ttl / fx.maxTtl;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = fx.color;
      ctx.fillStyle = fx.color;
      if (fx.style === "ring") {
        for (let i = 0; i < 6; i++) {
          const a = Math.PI * 2 / 6 * i;
          ctx.beginPath();
          ctx.moveTo(fx.x, fx.y);
          ctx.lineTo(fx.x + Math.cos(a) * fx.size * (1.1 - alpha * 0.28), fx.y + Math.sin(a) * fx.size * (1.1 - alpha * 0.28));
          ctx.stroke();
        }
      } else if (fx.style === "spark") {
        for (let i = 0; i < 6; i++) {
          const a = Math.PI * 2 / 6 * i;
          ctx.beginPath();
          ctx.moveTo(fx.x, fx.y);
          ctx.lineTo(fx.x + Math.cos(a) * fx.size * (1 - alpha * 0.3), fx.y + Math.sin(a) * fx.size * (1 - alpha * 0.3));
          ctx.stroke();
        }
      } else if (fx.style === "boss") {
        ctx.lineWidth = 2.2;
        for (let i = 0; i < 10; i++) {
          const a = Math.PI * 2 / 10 * i + alpha;
          ctx.beginPath();
          ctx.moveTo(fx.x, fx.y);
          ctx.lineTo(fx.x + Math.cos(a) * fx.size, fx.y + Math.sin(a) * fx.size);
          ctx.stroke();
        }
      } else {
        for (let i = 0; i < 4; i++) {
          const a = Math.PI * 2 / 4 * i + alpha;
          ctx.beginPath();
          ctx.arc(fx.x + Math.cos(a) * fx.size * 0.45, fx.y + Math.sin(a) * fx.size * 0.45, 1.2 + alpha * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    }
    for (const fx of g2.hostileEffects) {
      const alpha = fx.ttl / fx.maxTtl;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = fx.color;
      ctx.fillStyle = fx.color;
      if (fx.kind === "gravityPulse" || fx.kind === "pulseRing") {
        ctx.lineWidth = 2;
        const rr = fx.radius * (0.82 + alpha * 0.12);
        ctx.beginPath();
        ctx.arc(fx.x, fx.y, rr, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(fx.x, fx.y, rr * 0.56, 0, Math.PI * 2);
        ctx.stroke();
      } else if (fx.kind === "meteor") {
        ctx.beginPath();
        ctx.moveTo(fx.x - fx.radius * 1.2, fx.y - fx.radius * 1.8);
        ctx.lineTo(fx.x, fx.y);
        ctx.lineTo(fx.x + fx.radius * 0.4, fx.y + fx.radius * 0.2);
        ctx.stroke();
      } else {
        roundRect(ctx, fx.x - fx.radius, fx.y - fx.radius * 0.4, fx.radius * 2, fx.radius * 0.8, 6, false, true);
      }
      ctx.restore();
    }
    for (const tg of g2.telegraphs) {
      const alpha = Math.min(1, tg.ttl / Math.max(1, tg.maxTtl));
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = tg.color;
      ctx.strokeStyle = tg.danger ? "rgba(255,210,120,0.95)" : "rgba(160,240,255,0.85)";
      ctx.lineWidth = 1.6;
      roundRect(ctx, tg.x, tg.y, tg.w, tg.h, 10, true, true);
      ctx.strokeStyle = "rgba(255,245,230,0.85)";
      ctx.beginPath();
      ctx.moveTo(tg.x + 8, tg.y + 8);
      ctx.lineTo(tg.x + tg.w - 8, tg.y + 8);
      ctx.moveTo(tg.x + 8, tg.y + tg.h - 8);
      ctx.lineTo(tg.x + tg.w - 8, tg.y + tg.h - 8);
      ctx.stroke();
      ctx.fillStyle = "rgba(255,250,240," + alpha + ")";
      ctx.font = "bold 12px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(tg.label, tg.x + tg.w / 2, tg.y + tg.h / 2, Math.max(48, tg.w - 12));
      ctx.restore();
    }
    for (const shot of g2.enemyShots) {
      const pulse = 0.68 + Math.sin(shot.life * 0.18) * 0.14;
      const palette = shot.kind === "meteor" ? { glow: "rgba(255,92,104,0.12)", ring: "rgba(255,146,130,0.54)", core: "#ff6673", mark: "rgba(255,235,220,0.78)" } : shot.kind === "sweeper" ? { glow: "rgba(255,170,96,0.08)", ring: "rgba(255,205,122,0.30)", core: "#ffbb6a", mark: "rgba(120,55,0,0.40)" } : shot.kind === "minefield" ? { glow: "rgba(201,140,255,0.18)", ring: "rgba(222,182,255,0.76)", core: "#bb7dff", mark: "rgba(70,20,110,0.82)" } : { glow: "rgba(165,120,255,0.12)", ring: "rgba(196,165,255,0.56)", core: "#9678ff", mark: "rgba(55,12,95,0.56)" };
      ctx.save();
      ctx.fillStyle = palette.glow;
      ctx.beginPath();
      ctx.arc(shot.x, shot.y, shot.radius + 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = palette.ring;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(shot.x, shot.y, shot.radius + 2 + pulse, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = palette.core;
      ctx.beginPath();
      ctx.arc(shot.x, shot.y, shot.radius, 0, Math.PI * 2);
      ctx.fill();
      if (shot.kind === "minefield") {
        ctx.strokeStyle = "rgba(255,132,182,0.42)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(shot.x, shot.y, shot.radius + 3 + pulse * 0.4, 0, Math.PI * 2);
        ctx.stroke();
      }
      if (shot.kind === "meteor") {
        ctx.strokeStyle = "rgba(255,120,120,0.36)";
        ctx.beginPath();
        ctx.moveTo(shot.x - shot.vx * 3.2, shot.y - shot.vy * 3.2);
        ctx.lineTo(shot.x, shot.y);
        ctx.stroke();
      } else if (shot.kind === "sweeper") {
        ctx.strokeStyle = "rgba(255,182,92,0.32)";
        ctx.beginPath();
        ctx.moveTo(shot.x - shot.vx * 3.4, shot.y);
        ctx.lineTo(shot.x + shot.vx * 0.4, shot.y);
        ctx.stroke();
      } else if (shot.kind === "minefield") {
        ctx.strokeStyle = "rgba(210,160,255,0.34)";
        ctx.beginPath();
        ctx.arc(shot.x, shot.y, shot.radius + 10 + pulse * 0.6, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
    }
    for (const walker of g2.enemyWalkers) {
      const pulse = 0.5 + Math.sin(walker.phase) * 0.5;
      const img = g2.assets["enemy_walker"];
      ctx.save();
      if (img && img.complete && img.naturalWidth > 0) {
        ctx.globalAlpha = 0.98;
        ctx.drawImage(img, walker.x - 18, walker.y - 18, walker.w + 36, walker.h + 36);
        const evilGlow = ctx.createRadialGradient(walker.x + walker.w * 0.5, walker.y + walker.h * 0.42, 4, walker.x + walker.w * 0.5, walker.y + walker.h * 0.42, walker.w * 0.42);
        evilGlow.addColorStop(0, "rgba(255,72,72,0.34)");
        evilGlow.addColorStop(1, "rgba(255,72,72,0)");
        ctx.fillStyle = evilGlow;
        ctx.fillRect(walker.x - 18, walker.y - 18, walker.w + 36, walker.h + 36);
      } else {
        const grad = ctx.createLinearGradient(walker.x, walker.y, walker.x + walker.w, walker.y + walker.h);
        grad.addColorStop(0, "rgba(72,8,18,0.99)");
        grad.addColorStop(0.55, "rgba(30,4,12,0.99)");
        grad.addColorStop(1, "rgba(10,0,6,0.99)");
        ctx.fillStyle = grad;
        roundRect(ctx, walker.x, walker.y, walker.w, walker.h, 14, true, false);
        ctx.strokeStyle = "rgba(255,96,96,0.88)";
        ctx.lineWidth = 1.5;
        roundRect(ctx, walker.x + 1, walker.y + 1, walker.w - 2, walker.h - 2, 13, false, true);
      }
      const eyeY = walker.y + walker.h * 0.4;
      const leftEyeX = walker.x + walker.w * 0.36;
      const rightEyeX = walker.x + walker.w * 0.64;
      const eyeGlow = 0.65 + pulse * 0.35;
      ctx.fillStyle = `rgba(255,72,72,${0.55 + eyeGlow * 0.25})`;
      ctx.beginPath();
      ctx.arc(leftEyeX, eyeY, Math.max(5, walker.h * 0.09), 0, Math.PI * 2);
      ctx.arc(rightEyeX, eyeY, Math.max(5, walker.h * 0.09), 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,116,92,0.9)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(walker.x + walker.w * 0.24, walker.y + walker.h * 0.74);
      ctx.quadraticCurveTo(walker.x + walker.w * 0.5, walker.y + walker.h * 0.92, walker.x + walker.w * 0.76, walker.y + walker.h * 0.74);
      ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,0.18)";
      roundRect(ctx, walker.x - 1, walker.y + walker.h + 2, walker.w + 2, 2, 1, true, false);
      if (walker.stun > 0) {
        ctx.strokeStyle = "rgba(255,224,118,0.9)";
        ctx.beginPath();
        ctx.arc(walker.x + walker.w / 2, walker.y - 3, 5 + pulse * 2, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
    }
    if (g2.state.stageRuntime.pickupPulseTimer > 0) {
      const a = g2.state.stageRuntime.pickupPulseTimer / 18;
      const cx = g2.paddle.x + g2.paddle.w / 2;
      const cy = g2.paddle.y + g2.paddle.h / 2;
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = `rgba(160,255,120,${a * 0.85})`;
      ctx.lineWidth = 2.2;
      for (let i = 0; i < 8; i++) {
        const ang = Math.PI * 2 / 8 * i;
        const inner = 10 + (1 - a) * 6;
        const outer = 20 + (1 - a) * 22;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(ang) * inner, cy + Math.sin(ang) * inner);
        ctx.lineTo(cx + Math.cos(ang) * outer, cy + Math.sin(ang) * outer);
        ctx.stroke();
      }
      ctx.restore();
    }
    if (g2.state.gameplay.combo >= 5) {
      const comboAlpha = Math.min(0.9, 0.2 + Math.min(20, g2.state.gameplay.combo) * 0.022);
      const comboText = g2.state.gameplay.combo >= 16 ? "COSMIC DRIVE" : g2.state.gameplay.combo >= 12 ? "BREAKER MODE" : g2.state.gameplay.combo >= 8 ? "HOT STREAK" : "CHAIN";
      ctx.save();
      ctx.globalAlpha = comboAlpha;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.lineWidth = 6;
      ctx.strokeStyle = "rgba(0,0,0,0.35)";
      ctx.fillStyle = "#ffe16b";
      ctx.font = "900 24px Arial";
      ctx.strokeText(comboText, g2.W / 2, 104);
      ctx.fillText(comboText, g2.W / 2, 104);
      ctx.restore();
    }
    for (const sb of g2.scoreBursts) {
      const p = 1 - sb.ttl / sb.maxTtl;
      const alpha = Math.max(0, 1 - p);
      const y = sb.y - p * (sb.kind === "combo" ? 28 : 18);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.lineWidth = sb.kind === "combo" ? 6 : 4;
      ctx.strokeStyle = "rgba(0,0,0,0.35)";
      ctx.fillStyle = sb.kind === "combo" ? (g2.state.stageRuntime.comboPeakTier >= 3 ? "#ff7c7c" : g2.state.stageRuntime.comboPeakTier >= 2 ? "#ffb562" : "#ffe37e") : "#dff8ff";
      ctx.font = sb.kind === "combo" ? "900 24px Arial" : "900 18px Arial";
      const label = sb.kind === "combo" ? `CHAIN +${sb.value}` : `+${Number(sb.value).toLocaleString("en-US")}`;
      ctx.strokeText(label, sb.x, y);
      ctx.fillText(label, sb.x, y);
      ctx.restore();
    }
    if (g2.state.stageRuntime.comboPeakTimer > 0) {
      const color = g2.state.stageRuntime.comboPeakTier >= 3 ? "#ff7777" : g2.state.stageRuntime.comboPeakTier >= 2 ? "#ffb35f" : "#ffe37e";
      const peakAlpha = Math.min(1, g2.state.stageRuntime.comboPeakTimer / 28);
      ctx.save();
      ctx.globalAlpha = peakAlpha * 0.22;
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, g2.W, 18);
      ctx.fillRect(0, g2.H - 18, g2.W, 18);
      ctx.restore();
      ctx.save();
      ctx.globalAlpha = peakAlpha;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.lineWidth = 8;
      ctx.strokeStyle = "rgba(0,0,0,0.42)";
      ctx.fillStyle = color;
      ctx.font = g2.state.stageRuntime.comboPeakTier >= 3 ? "900 38px Arial" : "900 34px Arial";
      ctx.strokeText(g2.state.stageRuntime.comboPeakLabel || "HOT CHAIN", g2.W / 2, 144);
      ctx.fillText(g2.state.stageRuntime.comboPeakLabel || "HOT CHAIN", g2.W / 2, 144);
      ctx.font = "900 16px Arial";
      ctx.fillStyle = "rgba(255,248,236,0.95)";
      ctx.strokeText(`${Math.max(10, g2.state.gameplay.combo)} CHAIN`, g2.W / 2, 170);
      ctx.fillText(`${Math.max(10, g2.state.gameplay.combo)} CHAIN`, g2.W / 2, 170);
      ctx.restore();
    }
    renderBossHpBar(g2);
    if (g2.state.combat.bossTeleportTimer > 0) {
      const t = g2.state.combat.bossTeleportTimer / 22;
      ctx.save();
      ctx.globalAlpha = t * 0.4;
      ctx.fillStyle = "rgba(255,70,90,0.18)";
      ctx.fillRect(0, 0, g2.W, g2.H * 0.42);
      ctx.restore();
      g2.state.combat.bossTeleportTimer -= 1;
    }
    renderRoundIntro(g2);
    renderBossDown(g2);
    renderStageTransition(g2);
    if (g2.state.combat.bossCharge.active) {
      const bc = g2.state.combat.bossCharge;
      const alpha = Math.min(1, bc.timer / Math.max(1, bc.maxTimer));
      const fill = bc.kind === "laser" ? "rgba(255,110,200," : "rgba(255,160,90,";
      const x = Math.max(24, bc.bossX + bc.bossW / 2 - 110);
      const y = Math.max(88, bc.bossY - 24);
      ctx.fillStyle = fill + (0.18 + alpha * 0.2) + ")";
      ctx.strokeStyle = fill + 0.85 + ")";
      ctx.lineWidth = 1.5;
      roundRect(ctx, x, y, 220, 16, 8, true, true);
      ctx.fillStyle = bc.kind === "laser" ? "#ff7bd4" : "#ffb36b";
      roundRect(ctx, x + 2, y + 2, 216 * (1 - alpha), 12, 6, true, false);
      ctx.fillStyle = "rgba(255,250,240,0.95)";
      ctx.font = "bold 12px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillText(`BOSS CHARGE : ${String(bc.kind || "ATTACK").toUpperCase()}`, x + 110, y - 4);
    }
    g2.warnings.forEach((warning, idx) => {
      const alpha = Math.min(1, warning.ttl / Math.max(1, warning.maxTtl));
      const width = Math.min(360, g2.W * 0.38);
      const x = g2.W - width - 18;
      const y = 86 + idx * 38;
      const color = warning.severity === "danger" ? "rgba(255,95,95," : warning.severity === "warn" ? "rgba(255,186,90," : "rgba(113,236,255,";
      ctx.fillStyle = color + 0.18 * alpha + ")";
      ctx.strokeStyle = color + 0.72 * alpha + ")";
      ctx.lineWidth = 1.2;
      roundRect(ctx, x, y, width, 28, 10, true, true);
      ctx.fillStyle = "rgba(240,248,255," + alpha + ")";
      ctx.font = "12px Arial";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(warning.text, x + 12, y + 14, width - 24);
    });
  }

  // src/render/renderGame.ts
  function renderGame(g2) {
    if (g2.ctx.resetTransform) g2.ctx.resetTransform(); else g2.ctx.setTransform(1,0,0,1,0,0);
    g2.ctx.clearRect(0, 0, g2.W, g2.H);
    renderBackground(g2);
    renderBlocks(g2);
    renderDrops(g2);
    renderPaddle(g2);
    renderWeapons(g2);
    renderBalls(g2);
    renderEffects(g2);
  }

  // src/main.ts
  init_logger();
  init_stage();
  init_ui();

  // src/systems/update.ts
  init_constants();
  init_ballTraitDefinitions();
  init_audio();
  init_balls();

  // src/systems/drops.ts
  init_audio();
  init_logger();

  // src/systems/dropInterpreter.ts
  init_constants();
  init_balls();

  // src/data/weaponDefinitions.json
  var weaponDefinitions_default = {
    laser: {
      type: "laser",
      timerKey: "laserTimer",
      cooldownKey: "laserCooldown",
      duration: 420,
      autoCooldown: 34,
      burstOffsets: [
        12,
        -12
      ],
      projectileSpeed: 9.2,
      projectileLife: 108,
      hitBonus: 24,
      sound: {
        freq: 1100,
        dur: 0.04,
        oscillator: "square",
        volume: 0.025
      }
    },
    missile: {
      type: "missile",
      timerKey: "missileTimer",
      cooldownKey: "missileCooldown",
      duration: 620,
      autoCooldown: 42,
      burstOffsets: [
        16,
        -16
      ],
      projectileSpeed: 5.2,
      projectileLife: 190,
      hitBonus: 60,
      turnRate: 0.09,
      sound: {
        freq: 620,
        dur: 0.08,
        oscillator: "sawtooth",
        volume: 0.03
      }
    }
  };

  // src/data/weaponDefinitions.ts
  var WEAPON_DEFINITIONS = weaponDefinitions_default;

  // src/systems/weapons.ts
  init_audio();

  // src/systems/blockEffects.ts
  function spawnBlockBurst(g2, blk) {
    const colors = blk.resistance?.color || "#ffffff";
    g2.blockBursts.push(
      { x: blk.x + blk.w / 2, y: blk.y + blk.h / 2, color: colors, ttl: 18, maxTtl: 18, size: Math.max(12, blk.w * 0.55), style: "spark" },
      { x: blk.x + blk.w / 2, y: blk.y + blk.h / 2, color: colors, ttl: 24, maxTtl: 24, size: Math.max(10, blk.w * 0.45), style: "spark" },
      { x: blk.x + blk.w / 2, y: blk.y + blk.h / 2, color: colors, ttl: 28, maxTtl: 28, size: Math.max(10, blk.w * 0.65), style: blk.type === "boss" ? "boss" : "shard" }
    );
  }
  function updateBlockEffects(g2) {
    for (let i = g2.blockBursts.length - 1; i >= 0; i--) {
      g2.blockBursts[i].ttl -= 1;
      if (g2.blockBursts[i].ttl <= 0) g2.blockBursts.splice(i, 1);
    }
  }

  // src/systems/blockAbilities.ts
  init_blockDefinitions2();
  init_warnings();
  function nearestAliveBlock(g2, source) {
    let best = null;
    let bestDist = Infinity;
    for (const blk of g2.blocks) {
      if (blk === source || blk.hp <= 0) continue;
      const d = Math.hypot(blk.x + blk.w / 2 - (source.x + source.w / 2), blk.y + blk.h / 2 - (source.y + source.h / 2));
      if (d < bestDist) {
        best = blk;
        bestDist = d;
      }
    }
    return best;
  }
  function chainDamageNearby(g2, source, radius, damage = 1) {
    const sx = source.x + source.w / 2;
    const sy = source.y + source.h / 2;
    for (const blk of g2.blocks) {
      if (blk === source || blk.hp <= 0) continue;
      const bx = blk.x + blk.w / 2;
      const by = blk.y + blk.h / 2;
      if (Math.hypot(bx - sx, by - sy) <= radius) {
        if (blk.armor && blk.armor > 0) blk.armor = Math.max(0, blk.armor - damage);
        else blk.hp = Math.max(0, blk.hp - damage);
        spawnBlockBurst(g2, blk);
        if (blk.hp <= 0) maybeSpawnDrop(g2, blk);
      }
    }
  }
  function applyBlockOnHitAbility(g2, blk, ball) {
    const ability = BLOCK_DEFINITIONS[blk.type].ability?.onHit;
    if (!ability) return;
    if (ability === "warpBall") {
      ball.vx += Math.random() > 0.5 ? 0.35 : -0.35;
      ball.vy *= 0.995;
    } else if (ability === "crownCommand") {
      g2.state.combat.stageAutoWeaponCooldown = Math.max(0, g2.state.combat.stageAutoWeaponCooldown - 14);
      pushWarning(g2, "Crown relay accelerated enemy fire", "warn", 60);
    } else if (ability === "corePulse") {
      g2.hostileEffects.push({ x: blk.x + blk.w / 2, y: blk.y + blk.h / 2, radius: 70, color: "#8ad6ff", ttl: 26, maxTtl: 26, kind: "pulseRing" });
      for (const targetBall of g2.balls) {
        const dx = targetBall.x - (blk.x + blk.w / 2);
        const dy = targetBall.y - (blk.y + blk.h / 2);
        const dist = Math.max(24, Math.hypot(dx, dy));
        targetBall.vx += dx / dist * 0.2;
        targetBall.vy += dy / dist * 0.1;
      }
    } else if (ability === "bossCommand") {
      if (blk.bossPhase === 1 && blk.hp <= Math.ceil(blk.maxHp * 0.66)) {
        blk.bossPhase = 2;
        spawnWeaponBurst(g2, "missile");
        pushWarning(g2, "Boss entered phase 2", "danger", 120);
      } else if (blk.bossPhase === 2 && blk.hp <= Math.ceil(blk.maxHp * 0.33)) {
        blk.bossPhase = 3;
        spawnWeaponBurst(g2, "laser");
        pushWarning(g2, "Boss entered final phase", "danger", 140);
      }
    }
  }
  function applyBlockOnDestroyAbility(g2, blk) {
    const ability = BLOCK_DEFINITIONS[blk.type].ability?.onDestroy;
    if (!ability) return;
    if (ability === "spawnScoreDrop") {
      g2.drops.push({ x: blk.x + blk.w / 2, y: blk.y + blk.h / 2, vy: 1.9, type: "score", t: 0 });
    } else if (ability === "spawnLifeDrop") {
      g2.drops.push({ x: blk.x + blk.w / 2, y: blk.y + blk.h / 2, vy: 1.9, type: "life", t: 0 });
      chainDamageNearby(g2, blk, 48, 1);
    } else if (ability === "meteorBurst") {
      for (let i = 0; i < 3; i++) g2.enemyShots.push({ x: blk.x + blk.w / 2, y: blk.y + blk.h / 2, vx: (i - 1) * 0.8, vy: 2.8 + i * 0.25, life: 120, radius: 4.5, color: "#ff5d5d", damage: 1, kind: "meteor" });
      chainDamageNearby(g2, blk, 70, 1);
    } else if (ability === "weaponBurst") {
      spawnWeaponBurst(g2, Math.random() > 0.5 ? "laser" : "missile");
      chainDamageNearby(g2, blk, 84, 1);
    } else if (ability === "bossCollapse") {
      g2.state.gameplay.score += 2500;
      pushWarning(g2, "Boss core collapsed", "danger", 160);
      g2.hostileEffects.push({ x: blk.x + blk.w / 2, y: blk.y + blk.h / 2, radius: 110, color: "#ff9bd4", ttl: 60, maxTtl: 60, kind: "pulseRing" });
      spawnBlockBurst(g2, blk);
      const ally = nearestAliveBlock(g2, blk);
      if (ally) ally.hp = Math.max(0, ally.hp - 1);
      chainDamageNearby(g2, blk, 120, 2);
    }
  }

  // src/systems/weapons.ts
  function hitBlock(g2, blk, bonus) {
    if (blk.armor && blk.armor > 0) blk.armor -= 1;
    else blk.hp -= 1;
    g2.state.gameplay.score += bonus + (blk.type === "boss" ? 80 : 0);
    g2.state.gameplay.combo += 1;
    g2.prefs.bestScore = Math.max(g2.prefs.bestScore, g2.state.gameplay.score);
    if (blk.hp <= 0) {
      maybeSpawnDrop(g2, blk);
      applyBlockOnDestroyAbility(g2, blk);
      spawnBlockBurst(g2, blk);
    }
  }
  function triggerWeaponSound(g2, def) {
    beep(g2, def.sound.freq, def.sound.dur, def.sound.oscillator, def.sound.volume);
  }
  function spawnWeaponBurst(g2, type) {
    const def = WEAPON_DEFINITIONS[type];
    if (type === "laser") {
      for (const offset of def.burstOffsets) {
        const x = offset >= 0 ? g2.paddle.x + offset : g2.paddle.x + g2.paddle.w + offset;
        g2.lasers.push({ x, y: g2.paddle.y - 8, vy: -def.projectileSpeed, life: def.projectileLife });
      }
    } else {
      for (const offset of def.burstOffsets) {
        const x = offset >= 0 ? g2.paddle.x + offset : g2.paddle.x + g2.paddle.w + offset;
        g2.missiles.push({ x, y: g2.paddle.y - 10, vx: offset >= 0 ? -1.2 : 1.2, vy: -def.projectileSpeed, life: def.projectileLife, turnRate: def.turnRate || 0.09 });
      }
    }
    triggerWeaponSound(g2, def);
  }
  function nearestBlock(g2, m) {
    let best = null, bestDist = Infinity;
    for (const blk of g2.blocks) {
      if (blk.hp <= 0) continue;
      const cx = blk.x + blk.w / 2, cy = blk.y + blk.h / 2;
      const d = Math.hypot(cx - m.x, cy - m.y);
      if (d < bestDist) {
        best = blk;
        bestDist = d;
      }
    }
    return best;
  }
  function updateStageAutoWeapon(g2) {
    const weapon = g2.state.combat.stageAutoWeapon;
    if (!weapon || g2.state.gameplay.awaitingLaunch) return;
    g2.state.combat.stageAutoWeaponCooldown -= 1;
    if (g2.state.combat.stageAutoWeaponCooldown <= 0) {
      spawnWeaponBurst(g2, weapon);
      const def = WEAPON_DEFINITIONS[weapon];
      g2.state.combat.stageAutoWeaponCooldown = Math.max(16, Math.round(def.autoCooldown * 2.3 * g2.state.combat.stageAutoWeaponCooldownScale));
    }
  }
  function updateLasers(g2) {
    if (g2.state.combat.laserTimer > 0) {
      g2.state.combat.laserTimer -= 1;
      g2.state.combat.laserCooldown -= 1;
      if (g2.state.combat.laserCooldown <= 0) {
        spawnWeaponBurst(g2, "laser");
        g2.state.combat.laserCooldown = WEAPON_DEFINITIONS.laser.autoCooldown;
      }
    }
    for (let i = g2.lasers.length - 1; i >= 0; i--) {
      const shot = g2.lasers[i];
      shot.y += shot.vy;
      shot.life -= 1;
      let hit = false;
      for (const blk of g2.blocks) {
        if (blk.hp <= 0) continue;
        if (shot.x >= blk.x && shot.x <= blk.x + blk.w && shot.y >= blk.y && shot.y <= blk.y + blk.h) {
          hitBlock(g2, blk, WEAPON_DEFINITIONS.laser.hitBonus);
          hit = true;
          break;
        }
      }
      if (hit || shot.life <= 0 || shot.y < 84) g2.lasers.splice(i, 1);
    }
  }
  function updateMissiles(g2) {
    if (g2.state.combat.missileTimer > 0) {
      g2.state.combat.missileTimer -= 1;
      g2.state.combat.missileCooldown -= 1;
      if (g2.state.combat.missileCooldown <= 0) {
        spawnWeaponBurst(g2, "missile");
        g2.state.combat.missileCooldown = WEAPON_DEFINITIONS.missile.autoCooldown;
      }
    }
    for (let i = g2.missiles.length - 1; i >= 0; i--) {
      const m = g2.missiles[i];
      const target = nearestBlock(g2, m);
      if (target) {
        const tx = target.x + target.w / 2, ty = target.y + target.h / 2, dx = tx - m.x, dy = ty - m.y, dist = Math.max(1, Math.hypot(dx, dy));
        m.vx += dx / dist * m.turnRate;
        m.vy += dy / dist * m.turnRate * 0.55;
      }
      m.x += m.vx;
      m.y += m.vy;
      m.life -= 1;
      let hit = false;
      for (const blk of g2.blocks) {
        if (blk.hp <= 0) continue;
        if (m.x >= blk.x && m.x <= blk.x + blk.w && m.y >= blk.y && m.y <= blk.y + blk.h) {
          hitBlock(g2, blk, WEAPON_DEFINITIONS.missile.hitBonus);
          hit = true;
          break;
        }
      }
      if (hit || m.life <= 0 || m.y < 84) g2.missiles.splice(i, 1);
    }
  }
  function spawnLaserBurst(g2) {
    spawnWeaponBurst(g2, "laser");
  }
  function spawnMissileBurst(g2) {
    spawnWeaponBurst(g2, "missile");
  }
  function updateWeapons(g2) {
    updateStageAutoWeapon(g2);
    updateLasers(g2);
    updateMissiles(g2);
  }

  // src/systems/dropInterpreter.ts
  init_stage();
  var handlers2 = {
    setPaddleWidth(g2, effect) {
      if (effect.amount !== 0) g2.paddle.w = Math.max(effect.min ?? 90, Math.min(effect.max, g2.paddle.w + effect.amount));
      g2.paddle.powerType = effect.powerType;
      g2.paddle.powerTimer = Math.max(g2.paddle.powerTimer, effect.powerTimer);
    },
    setCombatTimer(g2, effect) {
      const timerKey = effect.timer;
      const current = g2.state.combat[timerKey];
      if (typeof current === "number") g2.state.combat[timerKey] = Math.max(current, effect.value);
      if (effect.cooldownKey) g2.state.combat[effect.cooldownKey] = effect.cooldownValue ?? 0;
      if (effect.powerType) {
        g2.paddle.powerType = effect.powerType;
        g2.paddle.powerTimer = Math.max(g2.paddle.powerTimer, effect.powerTimer || 0);
      }
    },
    scaleBallVelocity(g2, effect) {
      for (const ball of g2.balls) {
        ball.vx *= effect.factor;
        ball.vy *= effect.factor;
      }
      if (effect.powerType) {
        g2.paddle.powerType = effect.powerType;
        g2.paddle.powerTimer = Math.max(g2.paddle.powerTimer, effect.powerTimer || 0);
      }
    },
    boostBallVelocity(g2, effect) {
      for (const ball of g2.balls) {
        const speed = Math.max(DIFF[g2.state.gameplay.difficulty].ball * effect.minBaseMultiplier * g2.state.combat.stageBallSpeedModifier, Math.hypot(ball.vx, ball.vy) * effect.scale);
        const ax = Math.abs(ball.vx) / Math.max(1e-3, Math.abs(ball.vx) + Math.abs(ball.vy));
        ball.vx = speed * Math.max(0.24, ax) * (Math.sign(ball.vx || 1) || 1);
        ball.vy = speed * (1 - Math.max(0.24, ax)) * (ball.vy < 0 ? -1 : 1);
      }
    },
    grantLifeOrScore(g2, effect) {
      if (g2.state.gameplay.lives < DIFF[g2.state.gameplay.difficulty].lives + effect.lifeCapOffset) g2.state.gameplay.lives += 1;
      else g2.state.gameplay.score += effect.score;
    },
    addScore(g2, effect) {
      g2.state.gameplay.score += effect.amount;
    },
    addCombo(g2, effect) {
      g2.state.gameplay.combo += effect.amount;
    },
    addBarrier(g2, effect) {
      g2.state.combat.barrierCharges = Math.min(effect.max, g2.state.combat.barrierCharges + effect.amount);
      g2.state.gameplay.score += effect.score;
    },
    applyBigBallState(g2) {
      applyBigBallState(g2);
    },
    spawnWeapon(g2, effect) {
      spawnWeaponBurst(g2, effect.weapon);
    },
    spawnMultiball(g2, effect) {
      g2.state.gameplay.score += spawnMultiBall(g2) ? effect.successScore : effect.failScore;
      g2.state.gameplay.combo += effect.combo;
    },
    stageWarp(g2) {
      stageClear(g2);
    },
    setCatchTimer(g2, effect) {
      g2.state.combat.catchTimer = Math.max(g2.state.combat.catchTimer, effect.value);
      if (effect.powerType) {
        g2.paddle.powerType = effect.powerType;
        g2.paddle.powerTimer = Math.max(g2.paddle.powerTimer, effect.powerTimer || 0);
      }
    },
    scrambleBallVelocity(g2, effect) {
      for (const ball of g2.balls) {
        const signX = Math.random() > 0.5 ? 1 : -1;
        ball.vx += signX * effect.amount;
        ball.vy *= effect.verticalBias ?? 1.02;
      }
    }
  };
  function applyInterpretedDropEffects(g2, effects) {
    for (const effect of effects) {
      const handler = handlers2[effect.kind];
      handler(g2, effect);
    }
  }

  // src/systems/drops.ts
  init_ui();
  function chooseWeightedDrop(g2) {
    const adjusted = WEIGHTED_DROP_SEQUENCE.map((item) => ({
      type: item.type,
      weight: Math.max(1, item.weight + (g2.state.stageRuntime.dropBiases[item.type] || 0))
    }));
    const total = adjusted.reduce((sum, item) => sum + item.weight, 0);
    let roll = Math.random() * total;
    for (const item of adjusted) {
      roll -= item.weight;
      if (roll <= 0) return item.type;
    }
    return "score";
  }
  function maybeSpawnDrop(g2, blk) {
    g2.forcedDropCounter += 1;
    const diff = g2.state.gameplay.difficulty || "normal";
    const guaranteedCaps = { supereasy: 8, easy: 4, normal: 2, hard: 1, hell: 0 };
    const baseChanceMap = { supereasy: 0.54, easy: 0.34, normal: 0.2, hard: 0.12, hell: 0.08 };
    const guaranteed = g2.forcedDropCounter <= (guaranteedCaps[diff] ?? 2);
    const stageFactor = g2.state.gameplay.stageIndex >= 12 ? 0.02 : 0;
    const dropChance = Math.min(diff === "supereasy" ? 0.9 : 0.42, (baseChanceMap[diff] ?? 0.2) + (g2.state.combat.stageDropRateModifier || 0) + stageFactor);
    if (!guaranteed && Math.random() > dropChance) return;
    const type = guaranteed ? GUARANTEED_DROP_SEQUENCE[(g2.forcedDropCounter - 1) % GUARANTEED_DROP_SEQUENCE.length] : chooseWeightedDrop(g2);
    g2.drops.push({ x: blk.x + blk.w / 2, y: blk.y + blk.h / 2, vy: 1.9, type, t: 0 });
    logEvent(g2, "info", "drop spawned", { type, guaranteed, count: g2.forcedDropCounter, stageDropRateModifier: g2.state.combat.stageDropRateModifier, dropBiases: g2.state.stageRuntime.dropBiases });
  }
  function applyDrop(g2, type) {
    const def = DROP_DEFINITIONS[type];
    logEvent(g2, "info", "drop applied", { type });
    applyInterpretedDropEffects(g2, def.effects);
    g2.state.stageRuntime.screenFlash = Math.max(g2.state.stageRuntime.screenFlash, 0.12);
    g2.state.stageRuntime.pickupPulseTimer = 18;
    overlay(g2, def.overlay, 620);
    if (type === "laser") playPowerupSfx(g2, "laser");
    else if (type === "catch") playPowerupSfx(g2, "catch");
    else if (type === "multi") playPowerupSfx(g2, "multi");
    else beep(g2, 1180, 0.06, "triangle", 0.03);
  }

  // src/systems/update.ts
  init_logger();
  init_stage();
  init_ui();

  // src/systems/hostileGimmicks.ts
  function updateHostileGimmicks(_g) {
  }

  // src/systems/update.ts
  init_warnings();
  function rectCircle(rect, b) {
    const cx = Math.max(rect.x, Math.min(b.x, rect.x + rect.w));
    const cy = Math.max(rect.y, Math.min(b.y, rect.y + rect.h));
    const dx = b.x - cx, dy = b.y - cy;
    return dx * dx + dy * dy <= b.r * b.r;
  }
  function applyTraitHitBonus(g2, ball, blk) {
    const trait = BALL_TRAIT_DEFINITIONS[ball.trait];
    const stageMod = g2.state.stageRuntime.traitModifiers[ball.trait] || { scoreBonus: 0, pierceBonus: 0, damageScale: 1 };
    if (trait.scoreBonus) g2.state.gameplay.score += trait.scoreBonus;
    if (stageMod.scoreBonus) g2.state.gameplay.score += stageMod.scoreBonus;
    const resisted = !!blk.resistance && blk.resistance.traits.includes(ball.trait);
    if (resisted) {
      const chance = Math.max(0.08, Math.min(1, blk.resistance.damageScale * stageMod.damageScale));
      if (Math.random() > chance) {
        pushWarning(g2, `${blk.resistance.label} resisted ${ball.trait}`, "info", 70);
        return false;
      }
    }
    let pierce = false;
    if (trait.alwaysPierce) pierce = true;
    if (!pierce && trait.pierceChance && Math.random() < trait.pierceChance + stageMod.pierceBonus) pierce = true;
    if (!pierce && g2.state.combat.bigBallTimer > 0) pierce = true;
    if (!pierce && g2.paddle.powerType === "PIERCE" && g2.paddle.powerTimer > 0) {
      g2.state.gameplay.score += 20;
      pierce = true;
    }
    return pierce;
  }
  var EXTEND_THRESHOLDS = [2e4, 6e4];
  function updateBossFinishSequence(g2) {
    if (g2.state.stageRuntime.bossDownTimer <= 0) return false;
    const timer = g2.state.stageRuntime.bossDownTimer;
    if (timer === 118) {
      g2.state.stageRuntime.screenFlash = Math.max(g2.state.stageRuntime.screenFlash, 0.28);
    }
    if (timer === 106 && g2.state.stageRuntime.finishCueStep < 1) {
      playBossFinishPeakSfx(g2);
      g2.state.stageRuntime.finishCueStep = 1;
    }
    if (timer === 102) {
      g2.state.stageRuntime.screenFlash = Math.max(g2.state.stageRuntime.screenFlash, 0.82);
    }
    if (timer === 96 && g2.state.stageRuntime.finishCueStep < 2) {
      playBossFinishTailSfx(g2);
      g2.state.stageRuntime.finishCueStep = 2;
    }
    if (timer > 78) {
      updateUI(g2);
      return true;
    }
    return false;
  }
  function updateEnemyWalkers(g2) {
    if (!g2.enemyWalkers.length) return;
    for (const walker of g2.enemyWalkers) {
      walker.phase += 0.045;
      if (walker.stun > 0) walker.stun -= 1;
      const speedScale = walker.stun > 0 ? 0.55 : 1;
      walker.x += walker.vx * speedScale;
      walker.y += Math.sin(walker.phase) * 0.18;
      if (walker.x <= walker.rangeLeft) {
        walker.x = walker.rangeLeft;
        walker.vx = Math.abs(walker.vx);
      }
      if (walker.x + walker.w >= walker.rangeRight) {
        walker.x = walker.rangeRight - walker.w;
        walker.vx = -Math.abs(walker.vx);
      }
    }
  }
  function tryWalkerCollision(g2, ball) {
    for (const walker of g2.enemyWalkers) {
      const hit = rectCircle({ x: walker.x, y: walker.y, w: walker.w, h: walker.h }, ball);
      if (!hit) continue;
      const rel = (ball.x - (walker.x + walker.w / 2)) / Math.max(1, walker.w / 2);
      const speed = Math.max(DIFF[g2.state.gameplay.difficulty].ball * 0.88, Math.hypot(ball.vx, ball.vy));
      ball.vx = Math.max(-speed * 0.85, Math.min(speed * 0.85, ball.vx + rel * 1.05 + walker.vx * 0.18));
      ball.vy = -Math.abs(ball.vy) * 0.98;
      walker.vx *= -1;
      walker.stun = 18;
      g2.state.gameplay.score += 25;
      g2.state.gameplay.combo += 1;
      return true;
    }
    return false;
  }
  function updateTimers(g2) {
    if (g2.paddle.powerTimer > 0) {
      g2.paddle.powerTimer -= 1;
      if (g2.paddle.powerTimer <= 0) {
        g2.paddle.powerType = "";
        g2.paddle.w = DIFF[g2.state.gameplay.difficulty].paddle;
      }
    }
    if (g2.state.combat.magnetTimer > 0) g2.state.combat.magnetTimer -= 1;
    if (g2.state.combat.bigBallTimer > 0) g2.state.combat.bigBallTimer -= 1;
    if (g2.state.combat.catchTimer > 0) g2.state.combat.catchTimer -= 1;
  }
  function updateExtends(g2) {
    while (g2.state.gameplay.extendAwardIndex < EXTEND_THRESHOLDS.length && g2.state.gameplay.score >= EXTEND_THRESHOLDS[g2.state.gameplay.extendAwardIndex]) {
      g2.state.gameplay.lives += 1;
      g2.state.gameplay.extendAwardIndex += 1;
      pushWarning(g2, "1UP EXTEND", "info", 110);
      stageBeep(g2, "warning", 720, 0.08, "triangle", 0.03);
    }
  }
  function updateDrops(g2) {
    for (let i = g2.drops.length - 1; i >= 0; i--) {
      const d = g2.drops[i];
      d.t += 1;
      if (g2.state.combat.magnetTimer > 0) {
        const tx = g2.paddle.x + g2.paddle.w / 2, ty = g2.paddle.y + g2.paddle.h / 2;
        const dx = tx - d.x, dy = ty - d.y;
        const dist = Math.hypot(dx, dy);
        const range = 240 + g2.state.combat.stageMagnetRangeBonus;
        if (dist < range) {
          const pull = Math.max(0.18, 1 - dist / range) * 0.65;
          d.x += dx * pull * 0.12;
          d.y += dy * pull * 0.18;
        }
      }
      d.y += d.vy;
      if (d.y > g2.H + 20) {
        g2.drops.splice(i, 1);
        continue;
      }
      if (d.x >= g2.paddle.x && d.x <= g2.paddle.x + g2.paddle.w && d.y >= g2.paddle.y - 10 && d.y <= g2.paddle.y + g2.paddle.h + 10) {
        applyDrop(g2, d.type);
        g2.drops.splice(i, 1);
        updateUI(g2);
      }
    }
  }
  function updateBalls(g2) {
    for (let ballIndex = g2.balls.length - 1; ballIndex >= 0; ballIndex--) {
      const ball = g2.balls[ballIndex];
      if (!Array.isArray(ball.trailPoints)) ball.trailPoints = [];
      ball.trailPoints.unshift({ x: ball.x, y: ball.y, r: ball.r });
      if (ball.trailPoints.length > 18) ball.trailPoints.length = 18;
      ball.x += ball.vx;
      ball.y += ball.vy;
      if (ball.x - ball.r <= 0) {
        ball.x = ball.r + 1;
        ball.vx = Math.abs(ball.vx) || 1.5;
        beep(g2, 620, 0.04, "triangle", 0.02);
      } else if (ball.x + ball.r >= g2.W) {
        ball.x = g2.W - ball.r - 1;
        ball.vx = -Math.abs(ball.vx || 1.5);
        beep(g2, 620, 0.04, "triangle", 0.02);
      }
      if (ball.y - ball.r <= 90) {
        ball.vy = Math.abs(ball.vy);
        beep(g2, 620, 0.04, "triangle", 0.02);
      }
      if (tryWalkerCollision(g2, ball)) {
        stageHitComboBeep(g2, g2.state.gameplay.combo);
      }
      if (rectCircle({ x: g2.paddle.x, y: g2.paddle.y, w: g2.paddle.w, h: g2.paddle.h }, ball) && ball.vy > 0) {
        let rel = (ball.x - (g2.paddle.x + g2.paddle.w / 2)) / (g2.paddle.w / 2);
        rel = Math.max(-1, Math.min(1, rel));
        const speed = Math.max(DIFF[g2.state.gameplay.difficulty].ball * 0.88 * g2.state.combat.stageBallSpeedModifier, Math.hypot(ball.vx, ball.vy));
        const bounce = getPaddleBounceVelocity(g2, rel, speed, ball.vx);
        ball.vx = bounce.vx;
        ball.vy = bounce.vy;
        if (Math.abs(rel) > 0.9) {
          ball.vx *= 1.06;
          ball.vy = -Math.sqrt(Math.max(0.5, speed * speed - ball.vx * ball.vx));
        }
        ball.y = g2.paddle.y - ball.r - 1;
        if (g2.state.combat.catchTimer > 0) {
          g2.state.gameplay.awaitingLaunch = true;
          syncAttachedBalls(g2);
          pushWarning(g2, "Ball captured", "info", 45);
          stageBeep(g2, "launch", 460, 0.04, "triangle", 0.02);
          stageBeep(g2, "launch", 620, 0.055, "sine", 0.018);
          return;
        }
        logEvent(g2, "info", "paddle bounce", { rel: Number(rel.toFixed(3)), vx: Number(ball.vx.toFixed(3)), vy: Number(ball.vy.toFixed(3)), angleDeg: Number((bounce.angle * 180 / Math.PI).toFixed(1)), balls: g2.balls.length, trait: ball.trait });
        beep(g2, 220, 0.05, "square", 0.03);
      }
      for (const blk of g2.blocks) {
        if (blk.hp <= 0) continue;
        if (rectCircle(blk, ball)) {
          const keepGoing = applyTraitHitBonus(g2, ball, blk);
          if (blk.indestructible) {
            blk.hitFlash = 7;
            bumpCamera(g2, 0.45);
            beep(g2, 180, 0.03, "square", 0.018);
            if (!keepGoing) ball.vy *= -1;
            break;
          }
          const resisted = !!blk.resistance && blk.resistance.traits.includes(ball.trait);
          if (keepGoing || !resisted || Math.random() <= blk.resistance.damageScale) {
            let bossPhaseBefore = blk.bossPhase || 1;
            if (blk.type === "boss" && blk.hp > 0) {
              const previewHp = Math.max(0, blk.hp - (blk.armor && blk.armor > 0 ? 0 : 1));
              const newPhase = previewHp <= Math.ceil(blk.maxHp * 0.33) ? 3 : previewHp <= Math.ceil(blk.maxHp * 0.66) ? 2 : 1;
              blk.bossPhase = newPhase;
              if (newPhase > bossPhaseBefore) {
                pushWarning(g2, newPhase >= 3 ? "BOSS CORE RAGE" : "BOSS PHASE SHIFT", "danger", 90);
                g2.state.stageRuntime.screenFlash = Math.max(g2.state.stageRuntime.screenFlash, newPhase >= 3 ? 0.28 : 0.18);
                bumpCamera(g2, newPhase >= 3 ? 2.8 : 1.8);
                beep(g2, newPhase >= 3 ? 180 : 260, 0.12, "sawtooth", 0.03);
                later(() => beep(g2, newPhase >= 3 ? 420 : 520, 0.1, "square", 0.02), 22);
              }
            }
            if (blk.armor && blk.armor > 0) {
              blk.armor -= 1;
              pushWarning(g2, `${blk.type} armor cracked`, "info", 45);
              playBlockBreakLayeredSfx(g2, blk.type, g2.state.gameplay.combo, blk.type === "boss");
            } else {
              blk.hp -= 1;
            }
            blk.hitFlash = blk.type === "boss" ? 8 : 6;
            g2.state.stageRuntime.scoreBurstAnchorX = blk.x + blk.w / 2;
            g2.state.stageRuntime.scoreBurstAnchorY = blk.y + blk.h / 2;
            applyBlockOnHitAbility(g2, blk, ball);
            g2.state.gameplay.score += blk.maxHp === 2 ? 80 : blk.type === "boss" ? 260 : 40;
            g2.state.gameplay.combo += blk.type === "boss" ? 2 : 1;
            g2.prefs.bestScore = Math.max(g2.prefs.bestScore, g2.state.gameplay.score);
            if (blk.type === "boss") {
              pushWarning(g2, `Boss phase ${blk.bossPhase || 1}`, "danger", 40);
            }
            if (blk.hp <= 0) {
              maybeSpawnDrop(g2, blk);
              applyBlockOnDestroyAbility(g2, blk);
              spawnBlockBurst(g2, blk);
              playBlockBreakLayeredSfx(g2, blk.type, g2.state.gameplay.combo, blk.type === "boss");
              if (blk.type === "boss") {
                g2.state.stageRuntime.bossDownTimer = 124;
                g2.state.stageRuntime.screenFlash = 0.3;
                g2.state.stageRuntime.finishCueStep = 0;
                bumpCamera(g2, 3.4);
                pushWarning(g2, "BOSS DOWN", "danger", 150);
                playBossDefeatSting(g2);
                for (const other of g2.blocks) {
                  if (other !== blk) other.hp = 0;
                }
              }
            }
          }
          if (!keepGoing) ball.vy *= -1;
          stageHitComboBeep(g2, g2.state.gameplay.combo);
          break;
        }
      }
      if (ball.y - ball.r > g2.H) g2.balls.splice(ballIndex, 1);
    }
  }
  function teleportBossCluster(g2, boss) {
    const cluster = g2.blocks.filter((b) => (b.type === "boss" || b.type === "core") && b.hp > 0);
    if (!cluster.length) return;
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const blk of cluster) {
      if (blk.x < minX) minX = blk.x;
      if (blk.y < minY) minY = blk.y;
      if (blk.x + blk.w > maxX) maxX = blk.x + blk.w;
      if (blk.y + blk.h > maxY) maxY = blk.y + blk.h;
    }
    const clusterW = maxX - minX;
    const clusterH = maxY - minY;
    const nextX = Math.max(50, Math.min(g2.W - clusterW - 50, 50 + Math.random() * Math.max(1, g2.W - clusterW - 100)));
    const nextY = Math.max(74, Math.min(g2.H * 0.34, 78 + Math.random() * Math.max(1, g2.H * 0.18)));
    const dx = nextX - minX;
    const dy = nextY - minY;
    for (const blk of cluster) {
      blk.x += dx;
      blk.y += dy;
      blk.hitFlash = Math.max(blk.hitFlash || 0, 10);
    }
    g2.state.stageRuntime.screenFlash = Math.max(g2.state.stageRuntime.screenFlash || 0, 0.14);
    g2.state.combat.bossTeleportTimer = 22;
    pushWarning(g2, "BOSS BLINK", "danger", 48);
    stageBeep(g2, "warning", 760, 0.06, "square", 0.03);
  }

  function updateBossCharge(g2) {
    const boss = g2.blocks.find((b) => b.type === "boss" && b.hp > 0);
    if (!boss) {
      g2.state.combat.bossCharge.active = false;
      g2.state.combat.bossTeleportCooldown = 0;
      g2.state.combat.bossTeleportTimer = 0;
      return;
    }
    if (g2.state.gameplay.awaitingLaunch) return;
    const phase = Math.max(1, boss.bossPhase || 1);
    const kind = phase >= 3 ? "laser" : "missile";
    if (phase >= 3) {
      g2.state.combat.bossTeleportCooldown = (g2.state.combat.bossTeleportCooldown || 140) - 1;
      if (!g2.state.combat.bossCharge.active && g2.state.combat.bossTeleportCooldown <= 0) {
        teleportBossCluster(g2, boss);
        g2.state.combat.bossTeleportCooldown = 110 + Math.floor(Math.random() * 70);
      }
    }
    if (g2.state.combat.bossCharge.active) {
      g2.state.combat.bossCharge.timer -= 1;
      g2.state.combat.bossCharge.bossX = boss.x;
      g2.state.combat.bossCharge.bossY = boss.y;
      g2.state.combat.bossCharge.bossW = boss.w;
      g2.state.combat.bossCharge.bossH = boss.h;
      if (g2.state.combat.bossCharge.timer <= 0) {
        g2.state.combat.bossCharge.active = false;
        spawnWeaponBurst(g2, kind);
        stageBeep(g2, "warning", 980, 0.09, "sawtooth", 0.04);
        g2.state.combat.bossAttackCooldown = phase >= 3 ? 150 : 210;
        pushWarning(g2, `Boss fired ${kind.toUpperCase()}`, "danger", 65);
      }
      return;
    }
    g2.state.combat.bossAttackCooldown -= 1;
    if (g2.state.combat.bossAttackCooldown <= 0) {
      g2.state.combat.bossCharge = { active: true, timer: 54, maxTimer: 54, kind, bossX: boss.x, bossY: boss.y, bossW: boss.w, bossH: boss.h };
      pushWarning(g2, `Boss charging ${kind.toUpperCase()}`, "danger", 75);
      stageBeep(g2, "warning", 920, 0.07, "triangle", 0.035);
    }
  }
  function updateGame(g2) {
    captureReplaySample(g2);
    applyReplayPlayback(g2);
    updateSprintMode(g2);
    tickWarnings(g2);
    updateBlockEffects(g2);
    for (const blk of g2.blocks) {
      if (blk.hitFlash && blk.hitFlash > 0) blk.hitFlash -= 1;
    }
    if (!Array.isArray(g2.scoreBursts)) g2.scoreBursts = [];
    for (let i = g2.scoreBursts.length - 1; i >= 0; i--) {
      g2.scoreBursts[i].ttl -= 1;
      if (g2.scoreBursts[i].ttl <= 0) g2.scoreBursts.splice(i, 1);
    }
    g2.state.stageRuntime.screenFlash = Math.max(0, g2.state.stageRuntime.screenFlash - 0.012);
    if (g2.state.stageRuntime.pickupPulseTimer > 0) g2.state.stageRuntime.pickupPulseTimer -= 1;
    if (g2.state.stageRuntime.bossDownTimer > 0) g2.state.stageRuntime.bossDownTimer -= 1;
    if (g2.state.stageRuntime.stageTransitionTimer > 0) g2.state.stageRuntime.stageTransitionTimer -= 1;
    if (g2.state.stageRuntime.comboPeakTimer > 0) g2.state.stageRuntime.comboPeakTimer -= 1;
    if (g2.state.stageRuntime.scoreHudPulse > 0) g2.state.stageRuntime.scoreHudPulse *= 0.88;
    if (g2.state.stageRuntime.comboHudPulse > 0) g2.state.stageRuntime.comboHudPulse *= 0.86;
    g2.state.stageRuntime.bossFearPulse += 0.05;
    if (updateBossFinishSequence(g2)) return;
    if (g2.state.gameplay.paused || !g2.state.gameplay.running) return;
    if (g2.state.stageRuntime.roundIntroTimer > 0) {
      g2.state.stageRuntime.roundIntroTimer -= 1;
      if (g2.state.gameplay.awaitingLaunch) syncAttachedBalls(g2);
      updateUI(g2);
      return;
    }
    if (g2.state.gameplay.mouseActive) {
      const target = Math.max(10, Math.min(g2.W - g2.paddle.w - 10, g2.state.input.pointerTargetX || g2.paddle.x));
      g2.paddle.x += (target - g2.paddle.x) * 0.34;
    } else {
      if (g2.state.input.keys.left) g2.paddle.x -= g2.paddle.speed;
      if (g2.state.input.keys.right) g2.paddle.x += g2.paddle.speed;
      g2.paddle.x = Math.max(10, Math.min(g2.W - g2.paddle.w - 10, g2.paddle.x));
    }
    updateTimers(g2);
    updateDrops(g2);
    if (g2.state.gameplay.awaitingLaunch) {
      syncAttachedBalls(g2);
      return;
    }
    updateWeapons(g2);
    updateHostileGimmicks(g2);
    updateBossCharge(g2);
    updateEnemyWalkers(g2);
    updateBalls(g2);
    updateExtends(g2);
    if (!g2.balls.length) loseLife(g2);
    const bossAlive = g2.blocks.some((b) => b.type === "boss" && b.hp > 0);
    const nonBossAlive = g2.blocks.some((b) => !b.indestructible && b.type !== "boss" && b.hp > 0);
    if (isBossStage(g2.state.gameplay.stageIndex) && !bossAlive || !isBossStage(g2.state.gameplay.stageIndex) && !bossAlive && !nonBossAlive || !isBossStage(g2.state.gameplay.stageIndex) && g2.blocks.every((b) => b.indestructible || b.hp <= 0)) stageClear(g2);
    updateScoreFeedback(g2);
    updateUI(g2);
  }

  // src/systems/launch.ts
  init_constants();
  init_balls();
  init_audio();
  function launch(g2) {
    if (g2.state.gameplay.gameOver) return;
    if (!g2.state.gameplay.started) {
      void Promise.resolve().then(() => (init_stage(), stage_exports)).then((m) => m.startRun(g2, g2.state.gameplay.stageIndex || 1));
      return;
    }
    if (g2.state.gameplay.awaitingLaunch) {
      ensureAudio(g2);
      stageBeep(g2, "launch", 560, 0.06, "triangle", 0.03);
      g2.state.gameplay.awaitingLaunch = false;
      const sp = DIFF[g2.state.gameplay.difficulty].ball * 0.88;
      const launchDir = Math.random() > 0.5 ? 1 : -1;
      g2.state.gameplay.lastBounceDir = launchDir;
      if (!g2.balls.length) g2.balls = [createBall(g2, 0)];
      g2.balls.forEach((ball, idx) => {
        const spread = idx - (g2.balls.length - 1) / 2;
        ball.x = g2.paddle.x + g2.paddle.w / 2 + spread * 8;
        ball.y = g2.paddle.y - 10;
        ball.vx = launchDir * sp * 0.42 + spread * 0.64;
        ball.vy = -sp * (0.66 + Math.min(0.14, Math.abs(spread) * 0.06));
      });
    }
  }

  // src/systems/input.ts
  init_ui();
  init_balls();
  function initStars(g2) {
    g2.stars = Array.from({ length: Math.max(100, Math.floor(g2.W * g2.H / 18e3)) }, () => ({
      x: Math.random() * g2.W,
      y: Math.random() * g2.H,
      r: Math.random() * 1.8 + 0.5,
      a: Math.random() * 6.28,
      s: Math.random() * 0.3 + 0.05,
      h: Math.random() > 0.5 ? 190 : 310
    }));
  }
  function resizeGame(g2) {
    g2.W = innerWidth;
    g2.H = innerHeight;
    g2.canvas.width = g2.W;
    g2.canvas.height = g2.H;
    g2.paddle.y = g2.H - 56;
    g2.paddle.x = Math.min(Math.max(g2.paddle.x || (g2.W - g2.paddle.w) / 2, 10), g2.W - g2.paddle.w - 10);
    initStars(g2);
    g2.state.input.pointerTargetX = Math.min(Math.max(g2.state.input.pointerTargetX || g2.paddle.x, 10), g2.W - g2.paddle.w - 10);
    if (g2.state.gameplay.awaitingLaunch) syncAttachedBalls(g2);
  }
  function bindInput(g2) {
    addEventListener("resize", () => resizeGame(g2));
    addEventListener("pointermove", (e) => {
      if (g2.replay?.playing) return;
      g2.state.gameplay.mouseActive = true;
      g2.state.input.pointerTargetX = Math.max(10, Math.min(g2.W - g2.paddle.w - 10, e.clientX - g2.paddle.w / 2));
    });
    addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        g2.state.input.keys.left = true;
        g2.state.gameplay.mouseActive = false;
      }
      if (e.key === "ArrowRight") {
        g2.state.input.keys.right = true;
        g2.state.gameplay.mouseActive = false;
      }
      if (e.code === "Space") {
        e.preventDefault();
        queueReplayAction(g2, 8);
        launch(g2);
      }
      if (e.key.toLowerCase() === "p") {
        g2.state.gameplay.paused = !g2.state.gameplay.paused;
        updateUI(g2);
      }
      if (e.key.toLowerCase() === "h") {
        e.preventDefault();
        e.stopPropagation();
        toggleHud(g2);
      }
      if (e.key.toLowerCase() === "l" && e.shiftKey) {
        drawLogs(g2);
        g2.ui.logs.classList.remove("hidden");
      }
      if (e.key.toLowerCase() === "z" && g2.state.combat.laserTimer > 0) { queueReplayAction(g2, 16); spawnLaserBurst(g2); }
      if (e.key.toLowerCase() === "x" && g2.state.combat.missileTimer > 0) { queueReplayAction(g2, 32); spawnMissileBurst(g2); }
      if (e.key.toLowerCase() === "c" && g2.state.gameplay.awaitingLaunch) { queueReplayAction(g2, 8); launch(g2); }
    });
    addEventListener("keyup", (e) => {
      if (e.key === "ArrowLeft") g2.state.input.keys.left = false;
      if (e.key === "ArrowRight") g2.state.input.keys.right = false;
    });
    g2.canvas.addEventListener("click", () => { queueReplayAction(g2, 8); launch(g2); });
  }

  // src/systems/screens.ts
  init_logger();
  init_persistence();
  init_audio();
  init_stage();
  init_ui();
  function openRecordsScreen(g2) {
    drawRecords(g2);
    g2.ui.records.classList.remove("hidden");
    syncBgm(g2);
  }
  function openStageSelectScreen(g2) {
    drawStageGrid(g2, (s) => void startRun(g2, s));
    g2.ui.stageSelect.classList.remove("hidden");
    syncBgm(g2);
  }
  function openLogsScreen(g2) {
    drawLogs(g2);
    g2.ui.logs.classList.remove("hidden");
    syncBgm(g2);
  }
  function bindScreenUI(g2) {
    g2.ui.startBtn.onclick = () => {
      logEvent(g2, "info", "hud start click", { started: g2.state.gameplay.started, gameOver: g2.state.gameplay.gameOver });
      if (g2.state.gameplay.gameOver) {
        void startRun(g2, 1);
        return;
      }
      if (!g2.state.gameplay.started || !g2.ui.menu.classList.contains("hidden")) void startRun(g2, g2.state.gameplay.stageIndex || 1);
      else {
        g2.state.gameplay.running = true;
        g2.state.gameplay.paused = false;
        launch(g2);
        updateUI(g2);
      }
    };
    g2.ui.pauseBtn.onclick = () => {
      g2.state.gameplay.paused = !g2.state.gameplay.paused;
      updateUI(g2);
    };
    g2.ui.menuBtn.onclick = () => {
      if (g2.ui.menu.classList.contains("hidden")) openMenu(g2);
      else closeMenu(g2);
    };
    g2.ui.recordsBtn.onclick = () => openRecordsScreen(g2);
    g2.ui.hudBtn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleHud(g2);
    };
    g2.ui.logsBtn.onclick = () => openLogsScreen(g2);
    g2.ui.langBtn.onclick = async () => {
      g2.prefs.lang = g2.prefs.lang === "ja" ? "en" : "ja";
      await savePrefs(g2);
      updateUI(g2);
      drawStageGrid(g2, (s) => void startRun(g2, s));
      drawRecords(g2);
    };
    if (g2.ui.replayBtn) g2.ui.replayBtn.onclick = () => { void copyReplayLink(g2); };
    if (g2.ui.modeSelect) g2.ui.modeSelect.onchange = () => { drawRecords(g2); updateUI(g2); };
    g2.ui.soundBtn.onclick = async () => {
      g2.prefs.soundEnabled = !g2.prefs.soundEnabled;
      if (g2.prefs.soundEnabled) startMusic(g2);
      else stopMusic(g2);
      await savePrefs(g2);
      updateUI(g2);
    };
    const unlockBgm = () => {
      if (g2.bgmUnlocked) return;
      g2.bgmUnlocked = true;
      syncBgm(g2);
    };
    window.addEventListener("pointerdown", unlockBgm, { once: true });
    window.addEventListener("keydown", unlockBgm, { once: true });
    g2.ui.menuStart.onclick = () => void startRun(g2, 1);
    g2.ui.menuStageSelect.onclick = () => openStageSelectScreen(g2);
    g2.ui.menuRecords.onclick = () => openRecordsScreen(g2);
    g2.ui.menuLogs.onclick = () => openLogsScreen(g2);
    g2.ui.recordsClose.onclick = () => { g2.ui.records.classList.add("hidden"); syncBgm(g2); };
    g2.ui.recordsReset.onclick = async () => {
      g2.prefs.bestScore = 0;
      g2.prefs.playCount = 0;
      g2.leaderboard = { standard: [], sprint3: [] };
      await savePrefs(g2);
      drawRecords(g2);
      updateUI(g2);
    };
    g2.ui.stageClose.onclick = () => { g2.ui.stageSelect.classList.add("hidden"); syncBgm(g2); };
    g2.ui.logsClose.onclick = () => { g2.ui.logs.classList.add("hidden"); syncBgm(g2); };
    g2.ui.logsExport.onclick = () => exportLogs(g2);
    g2.ui.logsClear.onclick = () => {
      g2.logs.length = 0;
      drawLogs(g2);
    };
    g2.ui.difficultySelect.onchange = () => {
      g2.state.gameplay.difficulty = g2.ui.difficultySelect.value;
    };
  }

  // src/assets/loader.ts
  function loadImage(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(img);
      img.src = src;
    });
  }
  async function loadAssets(g2) {
    const manifest = {
      paddle_base: "assets/paddle_base.png",
      paddle_laser: "assets/paddle_laser.png",
      paddle_catch: "assets/paddle_catch.png",
      enemy_walker: "assets/enemy_walker.png",
      ball_normal: "assets/ball_normal.png",
      ball_plasma: "assets/ball_plasma.png",
      ball_heavy: "assets/ball_heavy.png",
      ball_ghost: "assets/ball_ghost.png",
      ball_nova: "assets/ball_nova.png",
      ball_big: "assets/ball_big.png",
      block_crystal: "assets/block_crystal.png",
      block_ember: "assets/block_ember.png",
      block_nebula: "assets/block_nebula.png",
      block_smile: "assets/block_smile.png",
      block_crown: "assets/block_crown.png",
      block_core: "assets/block_core.png",
      block_boss: "assets/block_boss.png",
      bg_frost_rift: "assets/bg_frost-rift.png",
      bg_inferno_spark: "assets/bg_inferno-spark.png",
      bg_nebula_drive: "assets/bg_nebula-drive.png",
      bg_core_nexus: "assets/bg_core-nexus.png",
      drop_wide: "assets/drop_wide.png",
      drop_slow: "assets/drop_slow.png",
      drop_score: "assets/drop_score.png",
      drop_life: "assets/drop_life.png",
      drop_expand: "assets/drop_expand.png",
      drop_barrier: "assets/drop_barrier.png",
      drop_multi: "assets/drop_multi.png",
      drop_magnet: "assets/drop_magnet.png",
      drop_laser: "assets/drop_laser.png",
      drop_bigball: "assets/drop_bigball.png",
      drop_missile: "assets/drop_missile.png",
      drop_catch: "assets/drop_catch.png",
      drop_warp: "assets/drop_warp.png",
      drop_pierce: "assets/drop_pierce.png",
      drop_fast: "assets/drop_fast.png",
      drop_shrink: "assets/drop_shrink.png",
      drop_chaos: "assets/drop_chaos.png"
    };
    const entries = await Promise.all(Object.entries(manifest).map(async ([key, src]) => [key, await loadImage(src)]));
    g2.assets = Object.fromEntries(entries);
  }

  // src/main.ts
  var g = createContext();
  var startedLoop = false;
  function bindEmergencyUI() {
    const safe = (fn) => () => {
      try {
        fn();
      } catch (error) {
        console.error("[CosmicBreaker][emergency-ui]", error);
      }
    };
    g.ui.startBtn.addEventListener("click", safe(() => {
      void startRun(g, g.state.gameplay.stageIndex || 1);
    }), { capture: true });
    g.ui.menuStart.addEventListener("click", safe(() => {
      void startRun(g, 1);
    }), { capture: true });
    g.ui.recordsBtn.addEventListener("click", safe(() => openRecordsScreen(g)), { capture: true });
    g.ui.menuRecords.addEventListener("click", safe(() => openRecordsScreen(g)), { capture: true });
    g.ui.menuStageSelect.addEventListener("click", safe(() => openStageSelectScreen(g)), { capture: true });
    g.ui.logsBtn.addEventListener("click", safe(() => openLogsScreen(g)), { capture: true });
    g.ui.menuLogs.addEventListener("click", safe(() => openLogsScreen(g)), { capture: true });
    g.ui.recBtn.addEventListener("click", safe(() => {
      if (g.recording?.active) stopRecording(g);
      else void startRecording(g);
    }), { capture: true });
    g.ui.shareBtn.addEventListener("click", safe(() => {
      void shareRecording(g);
    }), { capture: true });
    if (g.ui.replayBtn) g.ui.replayBtn.addEventListener("click", safe(() => {
      void copyReplayLink(g);
    }), { capture: true });
  }
  function loop(now) {
    updateGame(g);
    if ((g.camera.shake || 0) > 0.02) {
      const amt = g.camera.shake;
      g.camera.dx = (Math.random() - 0.5) * amt * 1.6;
      g.camera.dy = (Math.random() - 0.5) * amt * 1.2;
      g.ctx.save();
      g.ctx.translate(g.camera.dx, g.camera.dy);
      renderGame(g);
      g.ctx.restore();
      g.camera.shake *= 0.86;
    } else {
      g.camera.shake = 0;
      g.camera.dx = 0;
      g.camera.dy = 0;
      renderGame(g);
    }
    requestAnimationFrame(loop);
  }
  async function init() {
    try {
      bindEmergencyUI();
      bindScreenUI(g);
      bindInput(g);
      await loadPrefs(g);
      const pendingReplay = parseReplayFromHash();
      if (pendingReplay) g.replay.pending = { ...pendingReplay, autoStart: true };
      void loadAssets(g);
      g.prefs.lang = g.prefs.lang || detectLang();
      resizeGame(g);
      setDifficulty(g, "normal");
      g.ui.difficultySelect.value = g.replay.pending?.diff || "normal";
      if (g.ui.modeSelect) g.ui.modeSelect.value = g.replay.pending?.mode || "standard";
      g.paddle.x = (g.W - g.paddle.w) / 2;
      g.paddle.y = g.H - 56;
      resetBall(g);
      applyBigBallState(g);
      updateUI(g);
      if (g.replay.pending?.autoStart) {
        overlay(g, 'REPLAY MODE', 900);
        void startRun(g, 1);
      }
      try {
        drawRecords(g);
      } catch (error) {
        console.error("[CosmicBreaker] drawRecords failed", error);
      }
      try {
        drawStageGrid(g, (s) => void startRun(g, s));
      } catch (error) {
        console.error("[CosmicBreaker] drawStageGrid failed", error);
      }
      logEvent(g, "info", "button hotfix init complete", {
        entry: "main.ts",
        emergencyUI: true,
        stage: g.state.gameplay.stageIndex
      });
      if (!startedLoop) {
        startedLoop = true;
        requestAnimationFrame(loop);
      }
    } catch (error) {
      console.error("[CosmicBreaker] init failed", error);
      try {
        overlay(g, "INIT ERROR", 1800);
        updateUI(g);
      } catch {
      }
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      void init();
    }, { once: true });
  } else {
    void init();
  }
})();
