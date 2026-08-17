# BLACK.LOG prototype

静的HTML / CSS / JavaScriptのみで動作するブラウザ完結型プロトタイプです。

## 起動

このフォルダでローカルHTTPサーバーを起動してください。

```powershell
python -m http.server 8000
```

ブラウザで `http://localhost:8000/` を開きます。

## 主要導線

1. `index.html` - Now風SNS
2. `blacklog.html` - BLACK.LOG / AURORA認証
3. `search.html` - 外部検索
4. `company.html` - セレノアテクノロジー
5. `interview.html` - 2020年 江垣トモ インタビュー
6. `roster.html` - AURORA研究室名簿
7. `aurora.html` - AURORA会話
8. `note-lock.html` - 江垣の手記 認証
9. `note.html` - 江垣の手記
10. `society.html` - 東都認知情報研究会
11. `ending.html` - 最終選択

## 進行状態

`localStorage` の `blackLogStateV2` に保存します。
SNS左メニューの「最初から」で初期化できます。

## 確定パスワード

制作確認用。プレイヤーには直接見せない想定です。

- AURORA起動: `ARAORUKA`
- 江垣の手記: `OMOKAGE`
