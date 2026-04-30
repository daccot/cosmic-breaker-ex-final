import { AUDIO_THEMES } from '../data/audioThemes';
export function ensureAudio(g) {
    if (!g.prefs.soundEnabled)
        return;
    if (!g.audioCtx)
        g.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (g.audioCtx && g.audioCtx.state === 'suspended')
        void g.audioCtx.resume();
}
export function beep(g, freq = 440, dur = 0.08, type = 'square', vol = 0.03) {
    if (!g.prefs.soundEnabled)
        return;
    ensureAudio(g);
    if (!g.audioCtx)
        return;
    const o = g.audioCtx.createOscillator();
    const gain = g.audioCtx.createGain();
    o.type = type;
    o.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, g.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(vol, g.audioCtx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, g.audioCtx.currentTime + dur);
    o.connect(gain);
    gain.connect(g.audioCtx.destination);
    o.start();
    o.stop(g.audioCtx.currentTime + dur + 0.02);
}
export function getStageAudioTheme(g) {
    return AUDIO_THEMES[g.state.stageRuntime.audioThemeKey] || AUDIO_THEMES.frost;
}
export function stageBeep(g, channel, fallback, dur = 0.06, type = 'square', vol = 0.03) {
    const theme = getStageAudioTheme(g);
    const themed = channel === 'hit' ? theme.hitFreq : channel === 'launch' ? theme.launchFreq : theme.warningFreq;
    beep(g, themed || fallback, dur, type, vol);
}
export function startMusic(g) {
    if (!g.prefs.soundEnabled)
        return;
    ensureAudio(g);
    stopMusic(g);
    let i = 0;
    const theme = getStageAudioTheme(g);
    const bass = theme.bass;
    const lead = theme.lead;
    g.musicTimer = window.setInterval(() => {
        beep(g, bass[i % bass.length], 0.16, 'sawtooth', 0.02);
        beep(g, lead[i % lead.length], 0.08, 'square', 0.015);
        i += 1;
    }, 260);
}
export function stopMusic(g) {
    if (g.musicTimer !== null) {
        clearInterval(g.musicTimer);
        g.musicTimer = null;
    }
}
