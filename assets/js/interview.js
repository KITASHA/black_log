import { App } from "./app.js";

export function initInterview() {
    const page = document.querySelector('[data-page="interview"]');

    if (!page) {
        return;
    }

    App.update({
        interviewUnlocked: true
    });

    App.markViewed("interview");
}