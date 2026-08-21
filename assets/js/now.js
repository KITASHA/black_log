import { App } from "./app.js";

export function initNow() {
    document.querySelectorAll("[data-reset]").forEach((button) => {
        button.addEventListener("click", () => {
            if (window.confirm("進行状況を初期化しますか？")) {
                App.reset();
                window.location.reload();
            }
        });
    });
}
