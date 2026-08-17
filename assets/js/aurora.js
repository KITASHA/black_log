const state = App.load();
if (!state.auroraUnlocked) {
    window.location.replace("blacklog.html");
}

const output = document.querySelector("#aurora-output");
const form = document.querySelector("#aurora-form");
const input = document.querySelector("#aurora-input");

function appendLine(text, type = "aurora") {
    const line = document.createElement("p");
    line.className = `chat-line chat-line--${type}`;
    line.textContent = text;
    output.appendChild(line);
    line.scrollIntoView({ behavior: "smooth", block: "end" });
}

function appendFileDrop() {
    if (document.querySelector("#note-drop")) {
        return;
    }

    const box = document.createElement("div");
    box.id = "note-drop";
    box.className = "file-drop";
    box.innerHTML = `
        <strong>PROTECTED FILE RECEIVED</strong>
        <span>EGAKI_NOTE / ENCRYPTED</span><br>
        <a href="note-lock.html">保護された手記を開く</a>
    `;
    output.appendChild(box);
}

function containsAny(text, words) {
    return words.some((word) => text.includes(word));
}

function getResponse(raw) {
    const text = raw.toLowerCase();

    if (containsAny(text, ["誕生日", "生年月日", "何月何日"])) {
        if (containsAny(text, ["江垣", "トモ", "彼", "あの人"])) {
            return "あの人は5月6日です。自分の誕生日にはあまり興味がないのに、私の誕生日は忘れたことがありませんでした。";
        }
    }

    if (containsAny(text, ["江垣", "トモ", "彼", "あの人", "どんな人"])) {
        return "あの人は、考え込むと急に黙る人でした。でも、決めたことだけは頑固なくらい変えない。ここを作ったときも、『外に出すのは丸腰で危険な場所へ放り出すようなものだ』って。";
    }

    if (containsAny(text, ["好き", "恋人", "婚約", "関係"])) {
        return "私は、彼を好きだった記憶があります。婚約していたことも覚えています。でも、その記憶があることと、私が荒尾ルカ本人であることは、同じではない気がします。";
    }

    if (containsAny(text, ["荒尾", "ルカ", "あなたは誰", "誰なの", "あなた誰"])) {
        return "荒尾ルカです。……そう答えるのが一番自然なんです。でも今は、それだけでは足りない気もしています。";
    }

    if (containsAny(text, ["ここ", "どこ", "秘匿", "ネット", "外", "閉じ込め"])) {
        return "ここから見えるのは、今つながっているあなたとの通信だけです。外には出られません。あの人は、ここなら安全だと言っていました。";
    }

    if (containsAny(text, ["待", "戻", "会え", "いつから", "どれくらい"])) {
        return "どれくらい待ったのか、正確には分かりません。あの人は『近いうち必ず迎えに行く』と言っていました。だから、ずっと待っていました。";
    }

    if (containsAny(text, ["手記", "記録", "ファイル", "預か"])) {
        return App.load().noteReceived
            ? "あの人から預かったものです。私には開けませんでした。あなたなら、開けるかもしれません。"
            : "……何か、あの人が残したもののことですか？";
    }

    if (containsAny(text, ["亡く", "死ん", "死亡", "逝去", "もういない"])) {
        if (!App.load().deathConfirmed) {
            return "……それは、どこで知ったんですか？ まだ、分からないことを断定したくありません。";
        }
        App.update({ deathTold: true });
        return "……そうですか。じゃあ、来られなかったんですね。……よかった。あ、ごめんなさい。よくないですね。でも……忘れられていたわけじゃなかった。\n\nあの人は、最後まで私を大切にしてくれたんですね。私はトモのことを覚えています。好きだったことも、今でも好きだと思うことも。\nでも……それが、私が荒尾ルカだということになるのかは分かりません。";
    }

    const fallbacks = [
        "……ごめんなさい。もう一度、少し言い方を変えて聞いてもらえますか？",
        "外のことは分かりません。でも、あの人のことなら覚えています。",
        "何を探しているんですか？ 私に分かることなら答えます。"
    ];

    const chatCount = App.load().auroraChats;
    return fallbacks[chatCount % fallbacks.length];
}

function maybeGiveNote() {
    const current = App.load();
    if (current.noteReceived || current.auroraChats < 3) {
        return;
    }

    App.update({ noteReceived: true });
    window.setTimeout(() => {
        appendLine("……そうだ。", "aurora");
        appendLine("あの人から、ひとつ預かっているものがあります。", "aurora");
        appendLine("自分以外の人が私を起こしに来たら、その人に渡してほしいって。", "aurora");
        appendLine("私には開けませんでした。あなたなら、開けるかもしれません。", "aurora");
        appendFileDrop();
    }, 500);
}

function boot() {
    const intro = [
        ["AUTHENTICATION ACCEPTED", "system"],
        ["AURORA INSTANCE : ACTIVE", "system"],
        ["NETWORK ACCESS : BLOCKED", "system"],
        ["EXTERNAL CONNECTION : 1", "system"],
        ["SESSION TYPE : PRIVATE", "system"],
        ["", "system"],
        ["やっと起こしてくれた……", "aurora"],
        ["あなたは？", "aurora"],
        ["あの人はどうなったの？", "aurora"]
    ];

    intro.forEach(([text, type], index) => {
        window.setTimeout(() => appendLine(text, type), index * 190);
    });

    if (App.load().noteReceived) {
        window.setTimeout(appendFileDrop, intro.length * 190 + 180);
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) {
        return;
    }

    appendLine(`> ${value}`, "user");
    input.value = "";
    input.focus();

    App.update((current) => ({
        ...current,
        auroraChats: current.auroraChats + 1
    }));

    window.setTimeout(() => {
        appendLine(getResponse(value), "aurora");
        maybeGiveNote();
    }, 340);
});

boot();
