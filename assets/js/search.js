const results = [
    {
        keywords: ["セレノア", "セレノアテクノロジー", "AURORA", "オーロラ"],
        title: "セレノアテクノロジー株式会社｜研究開発アーカイブ",
        url: "company.html",
        display: "selenoa-tech.local / research / archive",
        description: "研究開発プロジェクト、過去の研究成果、AURORAプロジェクトに関する公開情報。"
    },
    {
        keywords: ["江垣", "江垣トモ", "トモ", "EGAKITOMO"],
        title: "『人格を作る前に、安全な家が必要だった』― 江垣トモ氏インタビュー",
        url: "interview.html",
        display: "tech-frontier.local / interview / 2020 / egaki-tomo",
        description: "2020年公開。AURORA研究責任者・江垣トモ氏が語る人格再現技術の可能性と危険性。"
    },
    {
        keywords: ["東都認知情報研究会", "東都", "認知情報研究会"],
        title: "東都認知情報研究会｜活動記録",
        url: "society.html",
        display: "tcis-study.local / archive",
        description: "認知情報科学に関する小規模研究会。過去の例会・活動記録を掲載。"
    }
];

const form = document.querySelector("#search-form");
const input = document.querySelector("#search-input");
const list = document.querySelector("#search-results");

function search(query) {
    const normalized = query.trim().toLowerCase();
    App.markSearch(query.trim());

    const matched = results.filter((result) =>
        result.keywords.some((keyword) => keyword.toLowerCase().includes(normalized) || normalized.includes(keyword.toLowerCase()))
    );

    if (matched.length === 0) {
        list.innerHTML = `
            <p class="empty-result">
                「${escapeHtml(query)}」に一致する結果は見つかりませんでした。<br>
                別の固有名詞や、SNS・資料に出てきた名称で検索してみてください。
            </p>
        `;
        return;
    }

    list.innerHTML = matched.map((result) => `
        <article class="result">
            <small>${result.display}</small>
            <h2><a href="${result.url}">${result.title}</a></h2>
            <p>${result.description}</p>
        </article>
    `).join("");
}

function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = value;
    return div.innerHTML;
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = input.value.trim();
    if (!query) {
        return;
    }
    const url = new URL(window.location.href);
    url.searchParams.set("q", query);
    window.history.replaceState(null, "", url);
    search(query);
});

const initial = App.param("q");
if (initial) {
    input.value = initial;
    search(initial);
}
