# 実装メモ

## シナリオ進行

`index.html`
→ `blacklog.html`
→ `search.html`
→ `company.html`
→ `interview.html`
→ `roster.html`
→ `blacklog.html` で `ARAORUKA`
→ `aurora.html`
→ 約3回会話
→ `note-lock.html`
→ `aurora.html` で江垣トモの誕生日（5月6日）を確認
→ `note-lock.html` で `OMOKAGE`
→ `note.html`
→ `search.html` で「東都認知情報研究会」
→ `society.html`
→ `aurora.html` で江垣の死を伝える
→ `ending.html`

## localStorage

キー: `blackLogStateV2`

主な値:

- `auroraUnlocked`: AURORA起動認証を突破したか
- `auroraChats`: AURORAと会話した回数
- `noteReceived`: 手記を受け取ったか
- `noteUnlocked`: 手記の認証を突破したか
- `deathConfirmed`: 研究会サイトで江垣の死を確認したか
- `deathTold`: AURORAへ江垣の死を伝えたか
- `ending`: 選択したエンディング

## AURORA会話

`assets/js/aurora.js` の `getResponse()` でキーワード判定しています。
外部AI APIは使用していません。

主なカテゴリ:

- 江垣／トモ／彼／あの人
- 誕生日／生年月日
- 好き／恋人／婚約
- 荒尾／ルカ／あなたは誰
- ここ／秘匿領域／ネット
- 待つ／戻る／会える
- 手記／記録／ファイル
- 亡くなった／死亡／逝去

## 確定ロジック

### 荒尾ルカ → AURORA

`ARAORUKA`

3番目 `A` と7番目 `K` を除去
→ `ARORUA`
→ 逆読み
→ `AURORA`

最初の入力パスワード自体は `ARAORUKA`。

### 江垣トモ → OMOKAGE

`EGAKITOMO`

5番目 `I` と6番目 `T` を除去
→ `EGAKOMO`
→ 逆読み
→ `OMOKAGE`

手記パスワードは `OMOKAGE`。
