/* ==============================
   JavaScript エントリーポイント
================================ */

import { initComponents } from "./components.js";
import { initSearch } from "./search.js";
import { initNow } from "./now.js";
import { initBlacklog } from "./blacklog.js";
import { initAurora } from "./aurora.js";
import { initNoteLock } from "./note-lock.js";
import { initEnding } from "./ending.js";
import { initSociety } from "./society.js";
import { initInterview } from "./interview.js";
import { initNote } from "./note.js";
import { initGameControls } from "./controls.js";
import {initSelenoa} from "./selenoa.js";

document.addEventListener("DOMContentLoaded", () => {
    initComponents();
    initSearch();
    initNow();
    initBlacklog();
    initAurora();
    initNoteLock();
    initEnding();
    initSociety();
    initInterview();
    initNote();
    initGameControls();
    initSelenoa();
});
