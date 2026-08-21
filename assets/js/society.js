import { App } from "./app.js";

export function initSociety() {
    const page = window.location.pathname.split("/").pop() || "index.html";

    if (page !== "society.html") {
        return;
    }

    App.markViewed("society");
    App.update({
        deathConfirmed: true
    });
}
