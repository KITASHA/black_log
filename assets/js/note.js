import { App } from "./app.js";

export function initNote() {
    const page = document.querySelector('[data-page="note"]');

    if (!page) {
        return;
    }

    if (!App.load().noteUnlocked) {
        window.location.replace("note-lock.html");
        return;
    }

    App.markViewed("note");
}