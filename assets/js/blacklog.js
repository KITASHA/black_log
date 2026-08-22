import { App } from "./app.js";


export function initBlacklog() {

    // ========================================
    // Elements
    // ========================================

    const log = document.querySelector("#blacklog-lines");

    if (!log) {
        return;
    }

    const blacklogView =
        document.querySelector("#blacklog-view");

    const auroraView =
        document.querySelector("#aurora-view");

    const authPanel =
        document.querySelector("#auth-panel");

    const authForm =
        document.querySelector("#blacklog-auth");

    const passwordInput =
        document.querySelector("#blacklog-password");

    const message =
        document.querySelector("#blacklog-message");


    // ========================================
    // State
    // ========================================

    const state = App.load();

    App.update({
        blacklogDiscovered: true
    });


    // ========================================
    // Helpers
    // ========================================

    function wait(ms) {

        return new Promise((resolve) => {
            window.setTimeout(resolve, ms);
        });

    }


    function addAuthLine(
        text,
        className = ""
    ) {

        const line =
            document.createElement("span");

        line.className = [
            "auth-message__line",
            className
        ]
            .filter(Boolean)
            .join(" ");

        line.textContent = text;

        message.appendChild(line);

    }


    // ========================================
    // Switch to AURORA
    // ========================================

    function showAurora(mode = "wake") {

        blacklogView.classList.add("hidden");

        auroraView.classList.remove("hidden");


        if (mode === "restore") {

            window.dispatchEvent(
                new CustomEvent("aurora:restore")
            );

            return;
        }


        window.dispatchEvent(
            new CustomEvent("aurora:wake")
        );

    }


    // ========================================
    // Wake Button
    // ========================================

    function createWakeButton() {

        if (
            document.querySelector("#wake-aurora")
        ) {
            return;
        }


        const wakeButton =
            document.createElement("button");

        wakeButton.type = "button";
        wakeButton.id = "wake-aurora";
        wakeButton.className = "wake-button";

        wakeButton.textContent =
            "[ AURORAを起動する ]";


        message.appendChild(wakeButton);


        wakeButton.addEventListener(
            "click",
            async () => {

                wakeButton.disabled = true;

                wakeButton.textContent =
                    "[ WAKING... ]";


                await wait(800);


                addAuthLine(
                    "WAKE SIGNAL SENT",
                    "auth-message__success"
                );


                await wait(900);


                addAuthLine(
                    "INITIALIZING INSTANCE...",
                    "auth-message__processing"
                );


                await wait(1500);


                showAurora("wake");

            }
        );

    }


    // ========================================
    // Restore Booted AURORA
    // ========================================

    if (state.auroraBooted) {

        /*
         * initAurora() は main.js 上で
         * initBlacklog() のあとに呼ばれるため、
         * イベント登録が完了してから送る。
         */

        blacklogView.classList.add("hidden");

        auroraView.classList.remove("hidden");


        window.setTimeout(() => {

            window.dispatchEvent(
                new CustomEvent("aurora:restore")
            );

        }, 0);


        return;

    }


    // ========================================
    // BLACK.LOG Initial Log
    // ========================================

    const lines = [
        ["[BLACK.LOG]", "strong"],
        ["EXTERNAL ACCESS DETECTED", ""],

        ["", ""],

        ["SYSTEM : AURORA", "strong"],

        [
            state.auroraUnlocked
                ? "STATUS : UNLOCKED"
                : "STATUS : LOCKED",
            state.auroraUnlocked
                ? "strong"
                : "warn"
        ],

        ["NETWORK ACCESS : BLOCKED", ""],

        ["", ""]
    ];


    if (!state.auroraUnlocked) {

        lines.push(
            ["PASSWORD REQUIRED", "strong"],
            ["AUTH KEY : HER NAME", "strong"],
            ["FORMAT : 8 CHARACTERS / A-Z", ""]
        );

    }


    if (state.deathConfirmed) {

        lines.push(
            ["", ""],
            ["EXTERNAL RECORD UPDATED", "warn"],
            ["SUBJECT STATUS : CONFIRMED", ""]
        );

    }


    log.innerHTML = lines
        .map(([text, tone]) => {

            const toneClass = tone
                ? ` log-line--${tone}`
                : "";

            const emptyClass = text
                ? ""
                : " log-line--empty";

            return (
                `<p class="log-line${toneClass}${emptyClass}">` +
                `${text || "&nbsp;"}` +
                `</p>`
            );

        })
        .join("");


    // ========================================
    // Authentication Panel
    // ========================================

    authPanel.classList.remove("hidden");


    // ========================================
    // Restore Unlocked State
    // ========================================

    if (state.auroraUnlocked) {

        authForm.classList.add("hidden");

        message.innerHTML = "";


        addAuthLine(
            "AUTHENTICATION : VERIFIED",
            "auth-message__success"
        );


        addAuthLine(
            "AURORA INSTANCE : FOUND",
            "auth-message__aurora"
        );


        addAuthLine(
            "STATE : SUSPENDED"
        );


        addAuthLine(
            "MANUAL WAKE AVAILABLE",
            "auth-message__success"
        );


        createWakeButton();

        return;

    }


    // ========================================
    // Password Input
    // ========================================

    passwordInput.addEventListener(
        "input",
        () => {

            passwordInput.value =
                passwordInput.value
                    .toUpperCase()
                    .replace(/[^A-Z]/g, "")
                    .slice(0, 8);

        }
    );


    // ========================================
    // Authentication
    // ========================================

    authForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const value =
                passwordInput.value
                    .trim()
                    .toUpperCase();


            // ----------------------------------------
            // Format Error
            // ----------------------------------------

            if (value.length !== 8) {

                message.textContent =
                    "8文字の半角大文字アルファベットで入力してください。";

                return;

            }


            // ----------------------------------------
            // Authentication Failed
            // ----------------------------------------

            if (value !== "ARAORUNA") {

                message.textContent =
                    "AUTHENTICATION FAILED";

                return;

            }


            // ----------------------------------------
            // Authentication Success
            // ----------------------------------------

            App.update({
                auroraUnlocked: true
            });


            authForm.classList.add("hidden");

            message.innerHTML = "";


            // ========================================
            // Unlock Sequence
            // ========================================

            addAuthLine(
                "AUTHENTICATION ACCEPTED",
                "auth-message__success"
            );


            await wait(900);


            addAuthLine(
                "AUTH KEY VERIFIED",
                "auth-message__success"
            );


            await wait(800);


            addAuthLine(
                "RELEASING LOCK...",
                "auth-message__processing"
            );


            await wait(1500);


            addAuthLine(
                "LOCK RELEASED",
                "auth-message__success"
            );


            await wait(1700);


            addAuthLine(
                "AURORA INSTANCE : FOUND",
                "auth-message__aurora"
            );


            await wait(900);


            addAuthLine(
                "STATE : SUSPENDED"
            );


            await wait(1400);


            addAuthLine(
                "MANUAL WAKE AVAILABLE",
                "auth-message__success"
            );


            await wait(700);


            // ========================================
            // Wake Button
            // ========================================

            createWakeButton();

        }
    );

}