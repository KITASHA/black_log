export function initComponents() {
    const mount = document.querySelector("[data-shared-footer]");

    if (!mount) {
        return;
    }

    const inSelenoa = window.location.pathname.includes("/selenoa/");
    const path = inSelenoa
        ? "../components/footer.html"
        : "components/footer.html";

    fetch(path)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`footer: ${response.status}`);
            }

            return response.text();
        })
        .then((html) => {
            mount.innerHTML = html;

            const brand = mount.querySelector(".site-footer__brand");

            if (brand && inSelenoa) {
                brand.textContent = "SELENOA TECHNOLOGIES";
            }
        })
        .catch((error) => {
            console.error("Shared footer could not be loaded.", error);

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
