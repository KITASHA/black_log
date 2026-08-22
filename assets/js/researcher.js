import { App } from "./app.js";

export function initResearcher() {
    const page = window.location.pathname.split("/").pop() || "index.html";

    if (page !== "mizuki.html") {
        return;
    }

    App.markViewed("mizuki-profile");
    App.update({
        mizukiPageVisited: true
    });
}
