import { STORAGE } from '../core/storage';
import { detectLang } from './ui';
export async function loadPrefs(g) {
    const s = await STORAGE.get(['lang', 'soundEnabled', 'bestScore', 'playCount']);
    g.prefs.lang = s.lang || detectLang();
    g.prefs.soundEnabled = s.soundEnabled !== false;
    g.prefs.bestScore = Number(s.bestScore || 0);
    g.prefs.playCount = Number(s.playCount || 0);
}
export async function savePrefs(g) {
    await STORAGE.set({
        lang: g.prefs.lang,
        soundEnabled: g.prefs.soundEnabled,
        bestScore: g.prefs.bestScore,
        playCount: g.prefs.playCount
    });
}
