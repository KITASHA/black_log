export function initNow() {

    const tsukimiAdLink = document.querySelector("#tsukimi-ad-link");

    if (!tsukimiAdLink) {
        return;
    }

    tsukimiAdLink.addEventListener("click", (event) => {

        const confirmed = window.confirm(
            "このリンクは本編とは関係のない外部ページへ移動します。\n\nページを開きますか？"
        );

        if (!confirmed) {
            event.preventDefault();
        }

    });
}