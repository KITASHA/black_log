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

    App.update({ auroraUnlocked: true });
    message.textContent = "AUTHENTICATION ACCEPTED";
    message.style.color = "#8fd0a8";
    window.setTimeout(() => {
        window.location.href = "aurora.html";
    }, 650);
});
