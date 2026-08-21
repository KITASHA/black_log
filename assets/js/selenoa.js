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


    /* ==============================
       SELENOA Unlock
    ================================ */

    App.update({
        selenoaUnlocked: true
    });


    /* ==============================
       Page Detection
    ================================ */

    const page = window.location.pathname
        .split("/")
        .pop();


    /* ==============================
       Roster Viewed
    ================================ */

    if (page === "roster.html") {
        App.markViewed("roster");
    }

}