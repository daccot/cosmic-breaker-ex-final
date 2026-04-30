export function pushWarning(g, text, severity = 'warn', ttl = 180) {
    g.warnings.unshift({ text, severity, ttl, maxTtl: ttl });
    if (g.warnings.length > 5)
        g.warnings.length = 5;
    g.ui.miniTip.textContent = text;
}
export function tickWarnings(g) {
    for (let i = g.warnings.length - 1; i >= 0; i--) {
        g.warnings[i].ttl -= 1;
        if (g.warnings[i].ttl <= 0)
            g.warnings.splice(i, 1);
    }
    g.ui.miniTip.textContent = g.warnings[0] ? g.warnings[0].text : 'Move: Mouse / ← → | Launch: Space / Click | Pause: P | Logs: Shift + L';
}
