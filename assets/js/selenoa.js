/* ==============================
   SELENOA
================================ */

import {
    App
} from "./app.js";


export function initSelenoa() {

    const inSelenoa = window.location.pathname.includes("/selenoa/");

    if (!inSelenoa) {
        return;
    }

    App.update({
        selenoaUnlocked: true
    });

}