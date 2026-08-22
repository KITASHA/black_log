import { App } from "./app.js";

export function initComponents() {
    const mount = document.querySelector("[data-shared-footer]");

    if (!mount) {
        return;
    }

    const inSelenoa = window.location.pathname.includes("/selenoa/");

    const path = inSelenoa
        ? "../components/footer.html"
        : "components/footer.html";

    const searchPageHref = inSelenoa
        ? "../index.html"
        : "index.html";

    fetch(path)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`footer: ${response.status}`);
            }

            return response.text();
        })
        .then((html) => {
            mount.innerHTML = html;


            // ==============================
            // Brand
            // ==============================

            const brand = mount.querySelector(".site-footer__brand");

            if (brand && inSelenoa) {
                brand.textContent = "SELENOA TECHNOLOGIES";
            }


            // ==============================
            // 検索画面へ戻る
            // ==============================

            const browserLink = mount.querySelector(
                ".site-footer__browser-link"
            );

            if (browserLink) {
                browserLink.href = searchPageHref;
            }


            // ==============================
            // 進捗リセット
            // ==============================

            const resetButton = mount.querySelector("[data-reset]");

            if (resetButton) {
                resetButton.addEventListener("click", () => {

                    const confirmed = window.confirm(
                        "進行状況を初期化しますか？"
                    );

                    if (!confirmed) {
                        return;
                    }

                    App.reset();
                    window.location.reload();
                });
            }
        })
        .catch((error) => {
            console.error(
                "Shared footer could not be loaded.",
                error
            );

            mount.innerHTML = `
                <footer class="site-footer">
                    <div class="site-footer__inner">
                        <p class="site-footer__notice">
                            このページはフィクションです
                        </p>
                    </div>
                </footer>
            `;
        });
}