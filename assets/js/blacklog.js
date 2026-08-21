import { App } from "./app.js";

export function initBlacklog() {
    if (!document.querySelector("#blacklog-lines")) {
        return;
    }

    App.update({
        blacklogDiscovered: true
    });

    const state = App.load();
    const log = document.querySelector("#blacklog-lines");
    const authPanel = document.querySelector("#auth-panel");

    const lines = [
        ["[BLACK.LOG]", "strong"],
        ["EXTERNAL ACCESS DETECTED", ""],
        ["", ""],
        ["SYSTEM : AURORA", "strong"],
        ["STATUS : LOCKED", "warn"],
        ["NETWORK ACCESS : BLOCKED", ""],
        ["", ""],
        ["PASSWORD REQUIRED", "strong"],
        ["AUTH KEY : HER NAME", "strong"],
        ["FORMAT : 8 CHARACTERS / A-Z", ""]
    ];

    if (state.deathConfirmed) {
        lines.push(["", ""], ["EXTERNAL RECORD UPDATED", "warn"], ["SUBJECT STATUS : CONFIRMED", ""]);
    }

    log.innerHTML = lines.map(([text, tone]) => {
        const toneClass = tone ? ` log-line--${tone}` : "";
        return `<p class="log-line${toneClass}">${text || "&nbsp;"}</p>`;
    }).join("");

    authPanel.classList.remove("hidden");

    const form = document.querySelector("#blacklog-auth");
    const input = document.querySelector("#blacklog-password");
    const message = document.querySelector("#blacklog-message");

    input.addEventListener("input", () => {
        input.value = App.normalize(input.value).replace(/[^A-Z]/g, "").slice(0, 8);
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const value = App.normalize(input.value);

        if (value.length !== 8) {
            message.textContent = "8文字の半角大文字アルファベットで入力してください。";
            return;
        }

        if (value !== "ARAORUKA") {
    message.textContent = "AUTHENTICATION FAILED";
    return;
}

App.update({
    auroraUnlocked: true
});

form.classList.add("hidden");
message.innerHTML = "";

function wait(ms) {
    return new Promise((resolve) => {
        window.setTimeout(resolve, ms);
    });
}

function addAuthLine(text, className = "") {
    const line = document.createElement("span");

    line.className = `auth-message__line ${className}`;
    line.textContent = text;

    message.appendChild(line);
}

async function unlockSequence() {

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

    await wait(1600);

    addAuthLine(
        "LOCK RELEASED",
        "auth-message__success"
    );

    // ここは少し長めに溜める
    await wait(1800);

    addAuthLine(
        "AURORA INSTANCE : FOUND",
        "auth-message__aurora"
    );

    await wait(900);

    addAuthLine(
        "STATE : SUSPENDED"
    );

    await wait(1600);

    addAuthLine(
        "MANUAL WAKE AVAILABLE",
        "auth-message__success"
    );

    await wait(800);

    const wakeButton = document.createElement("button");

    wakeButton.type = "button";
    wakeButton.id = "wake-aurora";
    wakeButton.className = "wake-button";
    wakeButton.textContent = "[ AURORAを起動する ]";

    message.appendChild(wakeButton);

    wakeButton.addEventListener("click", () => {
        wakeButton.disabled = true;
        wakeButton.textContent = "[ WAKING... ]";

        window.setTimeout(() => {
            window.location.href = "aurora.html";
        }, 900);
    });
}

unlockSequence();
    });
}