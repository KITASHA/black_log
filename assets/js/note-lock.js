import { App } from "./app.js";

export function initNoteLock() {
    if (!document.querySelector("#note-auth")) {
        return;
    }

    const state = App.load();
    if (!state.auroraUnlocked || !state.noteReceived) {
        window.location.replace("aurora.html");
    }

    const form = document.querySelector("#note-auth");
    const input = document.querySelector("#note-password");
    const message = document.querySelector("#note-message");

    input.addEventListener("input", () => {
        input.value = App.normalize(input.value).replace(/[^A-Z]/g, "").slice(0, 7);
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const value = App.normalize(input.value);

        if (value !== "OMOKAGE") {
            message.textContent = "PASSWORD INCORRECT";
            return;
        }

        App.update({ noteUnlocked: true });
        message.textContent = "DECRYPTION COMPLETE";
        message.style.color = "#8fd0a8";
        window.setTimeout(() => {
            window.location.href = "note.html";
        }, 650);
    });
}
