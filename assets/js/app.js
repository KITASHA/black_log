const App = (() => {
    const STORAGE_KEY = "blackLogStateV2";

    const defaultState = {
        searched: [],
        viewed: [],
        auroraUnlocked: false,
        noteUnlocked: false,
        auroraChats: 0,
        noteReceived: false,
        deathConfirmed: false,
        deathTold: false,
        ending: null
    };

    function load() {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
            return { ...defaultState, ...saved };
        } catch (error) {
            return { ...defaultState };
        }
    }

    function save(state) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }

    function update(patch) {
        const state = load();
        const next = typeof patch === "function" ? patch(state) : { ...state, ...patch };
        save(next);
        return next;
    }

    function addUnique(key, value) {
        return update((state) => {
            const values = Array.isArray(state[key]) ? state[key] : [];
            if (!values.includes(value)) {
                values.push(value);
            }
            return { ...state, [key]: values };
        });
    }

    function markViewed(id) {
        addUnique("viewed", id);
    }

    function markSearch(query) {
        addUnique("searched", query);
    }

    function param(name) {
        return new URLSearchParams(window.location.search).get(name);
    }

    function reset() {
        localStorage.removeItem(STORAGE_KEY);
    }

    function normalize(value) {
        return String(value || "")
            .trim()
            .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (char) =>
                String.fromCharCode(char.charCodeAt(0) - 0xfee0)
            )
            .toUpperCase();
    }

    return {
        load,
        save,
        update,
        addUnique,
        markViewed,
        markSearch,
        param,
        reset,
        normalize
    };
})();
