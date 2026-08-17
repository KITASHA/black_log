document.querySelectorAll("[data-reset]").forEach((button) => {
    button.addEventListener("click", () => {
        if (window.confirm("進行状況を初期化しますか？")) {
            App.reset();
            window.location.reload();
        }
    });
});

const searchForm = document.querySelector("#quick-search");
if (searchForm) {
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const query = new FormData(searchForm).get("q")?.trim();
        if (query) {
            window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        }
    });
}
