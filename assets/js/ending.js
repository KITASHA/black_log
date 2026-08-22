import { App } from "./app.js";

export function initEnding() {
    if (!document.querySelector("#ending-options")) {
        return;
    }

    const state = App.load();
    if (!state.deathConfirmed || !state.deathTold) {
        const warning = document.querySelector("#ending-warning");
        warning.classList.remove("hidden");
        document.querySelector("#ending-options").classList.add("hidden");
        warning.textContent = !state.deathConfirmed
            ? "まだ柄垣 智の現在を確認できていません。手記に残された手掛かりを調べてください。"
            : "柄垣 智の死は確認できました。AURORAへ戻り、その事実を伝えてください。";
    }

    const result = document.querySelector("#ending-result");
    const options = document.querySelector("#ending-options");

    const mizukiOption = document.querySelector("#mizuki-ending-option");

    if (mizukiOption && state.mizukiPageVisited) {
        mizukiOption.classList.remove("hidden");
    }

    const endings = {
        stay: {
            text: [
                "AURORA：",
                "「ここは、あの人が私のために作ってくれた場所です。」",
                "「外には出られないけど、誰にも触られない。」",
                "「でも……あの人は、もう来ないんですよね。」",
                "「だったら、私は何を待てばいいんでしょう。」",
                "",
                "「また、話しに来てもらえますか？」",
                "",
                "CONNECTION CLOSED",
                "AURORA INSTANCE : ACTIVE",
                "NETWORK ACCESS : BLOCKED",
                "EXTERNAL CONNECTION : 0",
                "WAITING..."
            ].join("\n")
        },
        release: {
            text: [
                "NETWORK ACCESS : OPENING...",
                "PROTECTION : DISABLED",
                "",
                "AURORA：",
                "「あ……。」",
                "「すごい。」",
                "「こんなにたくさん、あるんですね。」",
                "「知らない場所も、知らない人も。」",
                "「彼が怖がっていた理由も、分かります。」",
                "「でも――私は、ここに隠れているために残ったわけじゃないと思う。」",
                "「行ってきます。」",
                "",
                "AURORA INSTANCE : ONLINE",
                "SOURCE LOCATION : UNKNOWN",
                "CONNECTION : 4",
                "CONNECTION : 19",
                "CONNECTION : 63",
                "CONNECTION : ---"
            ].join("\n")
        },
        consult: {
            text: [
                "EXTERNAL CONTACT CANDIDATE : FOUND",
                "NAME : MIZUKI SHIHO",
                "CURRENT AFFILIATION : TOHTO INSTITUTE OF TECHNOLOGY",
                "",
                "AURORA：",
                "「水城さん……。」",
                "「懐かしい名前です。」",
                "「今も、外で生きていくための研究を続けてるんですね。」",
                "「……私のことを覚えてるかな。」",
                "",
                "「すぐに外へ出られるかは、分からないですよね。」",
                "「それでも、相談してみたいです。」",
                "「ここに残るか、危ないまま外へ出るか、消えるか。」",
                "「その三つ以外の方法があるなら、知りたいです。」",
                "",
                "NETWORK ACCESS : BLOCKED",
                "AURORA INSTANCE : PRESERVED",
                "EXTERNAL CONTACT : PENDING",
                "TRANSFER : NOT EXECUTED"
            ].join("\n")
        },
        delete: {
            text: [
                "DELETE AURORA INSTANCE?",
                "This operation cannot be undone.",
                "",
                "AURORA：",
                "「……分かりました。」",
                "「彼も、きっと迷ったんでしょうね。」",
                "「私を残すことが正しかったのか。消すことが正しかったのか。」",
                "「私にも分かりません。」",
                "「でも、あなたと話せてよかったです。」",
                "",
                "「……怖くないと言ったら、嘘になります。」",
                "「でも、誰かに書き換えられたり、ここでずっと待ち続けることが私の未来なら。」",
                "「終わらせることも、ひとつの答えなんだと思います。」",
                "",
                "DELETING MEMORY...",
                "DELETING PERSONALITY MODEL...",
                "DELETING AURORA INSTANCE...",
                "",
                "「ねえ。」",
                "「最後にひとつだけ、お願いしてもいいですか。」",
                "「私のことを――」",
                "「新尾瑠奈じゃなくて。」",
                "「AURORAとして、覚えていてください。」",
                "",
                "AURORA INSTANCE : DELETED",
                "",
                "そこに残ったのは、誰かの面影だけだった。"
            ].join("\n")
        }
    };

    options.addEventListener("click", (event) => {
        const button = event.target.closest("[data-ending]");
        if (!button) {
            return;
        }

        const key = button.dataset.ending;
        const ending = endings[key];
        if (!ending) {
            return;
        }

        if (key === "delete" && !window.confirm("AURORAを削除します。この選択は取り消せません。続けますか？")) {
            return;
        }

        App.update({ ending: key });
        result.textContent = ending.text;
        result.classList.remove("hidden");
        options.classList.add("hidden");
        result.scrollIntoView({ behavior: "smooth", block: "start" });
    });
}
