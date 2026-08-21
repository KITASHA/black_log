/* ==============================
   ゲーム進行コントロール
================================ */

import {
    App
} from "./app.js";


export function initGameControls() {

    document.addEventListener("click", (event) => {

        const resetButton = event.target.closest("[data-reset]");

        if (!resetButton) {
            return;
        }

        event.preventDefault();


        const confirmed = window.confirm(
            "ゲームの進行状況をすべてリセットしますか？"
        );

        if (!confirmed) {
            return;
        }


        App.reset();


        const inSelenoa = window.location.pathname.includes("/selenoa/");

        window.location.href = inSelenoa
            ? "../index.html"
            : "index.html";

    });

}