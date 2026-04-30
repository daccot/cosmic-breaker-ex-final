export const STORAGE = (typeof chrome !== 'undefined' && chrome?.storage?.local)
    ? chrome.storage.local
    : {
        async get() { return {}; },
        async set() { }
    };
