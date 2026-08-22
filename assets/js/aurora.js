import { App } from "./app.js";
import {
    getBootDialogue,
    getDialogueResponse,
    getNameFlowResponse,
    getNoteGiveText,
    getRestoreDialogue
} from "./aurora-dialogue.js";

export function initAurora() {
    const output = document.querySelector("#aurora-output");
    if (!output) return;

    const form = document.querySelector("#aurora-form");
    const input = document.querySelector("#aurora-input");
    const endingLink = document.querySelector("#ending-link");

    let started = false;

    const wait = (ms) =>
        new Promise((resolve) => window.setTimeout(resolve, ms));

    function appendLine(text, type = "aurora") {
        const line = document.createElement("p");
        line.className = `chat-line chat-line--${type}`;
        line.textContent = text;
        output.appendChild(line);
        line.scrollIntoView({ behavior: "smooth", block: "end" });
    }

    function setInputMode(mode) {
        const placeholders = {
            name: "名前を入力してください",
            confirm: "「はい」または「やり直す」",
            chat: "AURORAにメッセージを入力"
        };

        input.placeholder = placeholders[mode] || placeholders.chat;
    }

    function updateEndingLink() {
        if (!endingLink) return;
        endingLink.classList.toggle("hidden", !App.load().deathTold);
    }

    function showNoteLink() {
        if (document.querySelector("#note-drop")) return;

        const box = document.createElement("div");
        box.id = "note-drop";
        box.className = "file-drop";
        box.innerHTML = `
            <strong>PROTECTED FILE RECEIVED</strong>
            <span>EGAKI_NOTE / ENCRYPTED</span>
            <br>
            <a href="note-lock.html">保護された手記を開く</a>
        `;

        output.appendChild(box);
    }

    function receiveNote() {
        App.update({ noteReceived: true });
        showNoteLink();
    }

    function maybeGiveNote() {
        const state = App.load();

        if (
            state.noteReceived ||
            !state.playerName ||
            state.auroraChats < 3
        ) {
            return;
        }

        window.setTimeout(() => {
            const current = App.load();
            if (current.noteReceived) return;

            appendLine(getNoteGiveText(current), "aurora");
            receiveNote();
        }, 650);
    }

    function applyDialogueResult(result) {
        if (!result) return;

        if (result.patch) {
            App.update(result.patch);
        }

        if (result.inputMode) {
            setInputMode(result.inputMode);
        }

        if (result.text) {
            appendLine(result.text, result.type || "aurora");
        }

        updateEndingLink();
    }

    async function boot() {
        if (started) return;
        started = true;

        form.classList.add("hidden");

        const sequence = [
            ["RESTORING INSTANCE...", "system", 1200],
            ["", "system", 300],
            ["MEMORY INDEX ........ OK", "system", 550],
            ["PERSONALITY MODEL .... OK", "system", 650],
            ["DIALOGUE SYSTEM ...... OK", "system", 650],
            ["EXTERNAL NETWORK ..... BLOCKED", "system", 800],
            ["", "system", 500],
            ["INITIALIZING AURORA...", "system", 1400],
            ["", "system", 700],
            ["AURORA INSTANCE : ACTIVE", "system", 1200]
        ];

        for (const [text, type, delay] of sequence) {
            appendLine(text, type);
            await wait(delay);
        }

        for (const item of getBootDialogue()) {
            await wait(item.delay);
            appendLine(item.text, "aurora");
        }

        App.update({
            auroraBooted: true,
            namePhase: "input",
            pendingPlayerName: null,
            pendingPlayerIsTomo: false
        });

        setInputMode("name");
        form.classList.remove("hidden");
        input.focus();
        updateEndingLink();
    }

    function restore() {
        if (started) return;
        started = true;

        output.innerHTML = "";
        appendLine("AURORA INSTANCE : ACTIVE", "system");

        const state = App.load();
        const result = getRestoreDialogue(state);

        applyDialogueResult(result);

        form.classList.remove("hidden");
        input.focus();

        if (App.load().noteReceived) {
            showNoteLink();
        }

        updateEndingLink();
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const value = input.value.trim();
        if (!value) return;

        appendLine(`> ${value}`, "user");

        input.value = "";
        input.focus();

        const state = App.load();

        if (state.namePhase === "input" || state.namePhase === "confirm") {
            const result = getNameFlowResponse(value, state);

            window.setTimeout(() => {
                applyDialogueResult(result);
            }, 340);

            return;
        }

        if (!state.playerName) {
            const result = getNameFlowResponse(value, {
                ...state,
                namePhase: "input"
            });

            window.setTimeout(() => {
                applyDialogueResult(result);
            }, 340);

            return;
        }

        App.update((current) => ({
            ...current,
            auroraChats: (current.auroraChats || 0) + 1
        }));

        window.setTimeout(() => {
            const result = getDialogueResponse(value, App.load());
            applyDialogueResult(result);
            maybeGiveNote();
        }, 340);
    });

    window.addEventListener("aurora:wake", boot);
    window.addEventListener("aurora:restore", restore);

    updateEndingLink();
}
