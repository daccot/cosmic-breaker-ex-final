export function logEvent(g, type, message, extra = null) {
    const entry = { ts: new Date().toISOString(), type, message, extra };
    g.logs.push(entry);
    if (g.logs.length > 400)
        g.logs.shift();
    try {
        console[type === 'error' ? 'error' : 'log']('[CosmicBreaker]', message, extra ?? '');
    }
    catch { }
}
