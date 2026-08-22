# BLACK.LOG 実装メモ

## 現在の主要導線

SNS / 検索
→ セレノア公開情報・インタビュー
→ `blacklog.html` で `ARAORUNA`
→ AURORA起動・会話
→ 手記受領
→ `note-lock.html` で `OMOKAGE`
→ 手記解読
→ 東都認知情報研究会で柄垣 智の死亡を確認
→ AURORAへ死亡を伝える
→ `ending.html`

追加探索：
東都認知情報研究会または旧研究チーム名簿で水城 志帆を確認
→ 検索で `mizuki.html` に到達
→ `mizukiPageVisited=true`
→ 最終選択に「水城 志帆に相談する」が追加

## State

- `searched`: 検索済み語句
- `viewed`: 閲覧済みページID
- `auroraUnlocked`: AURORA起動認証を突破したか
- `auroraBooted`: AURORAを起動済みか
- `blacklogDiscovered`: BLACK.LOGを発見したか
- `noteUnlocked`: 手記の暗号を解除したか
- `auroraChats`: AURORAと会話した回数
- `noteReceived`: 手記リンクを受領したか
- `deathConfirmed`: 研究会サイトで柄垣 智の死を確認したか
- `deathTold`: AURORAへ柄垣 智の死を伝えたか
- `mizukiPageVisited`: 水城 志帆の大学研究者ページへ到達したか
- `ending`: 選択したエンディング
- `playerName`: プレイヤーが確定した名前
- `playerIsTomo`: プレイヤーを柄垣 智本人と認識しているか
- `pendingPlayerName`: 名前確認中の候補
- `pendingPlayerIsTomo`: 候補名が智判定か
- `namePhase`: 名前入力のフェーズ

## 命名ロジック

### 新尾 瑠奈 → AURORA

`ARAORUNA`

3月7日なので、3文字目 `A` と7文字目 `N` を除去。

`ARORUA`

逆読みすると `AURORA`。

BLACK.LOGの起動認証パスワードは `ARAORUNA`。

### 柄垣 智 → OMOKAGE

`EGAKITOMO`

5月6日なので、5文字目 `I` と6文字目 `T` を除去。

`EGAKOMO`

逆読みすると `OMOKAGE`。

手記パスワードは `OMOKAGE`。

## AURORAの安全性問題

公式なプロジェクト凍結理由は倫理的課題のまま変更しない。
それとは別に、研究過程で以下の問題が認識されている。

- 人格・記憶への外部干渉や改変をAURORA自身が防げない。
- AURORAは苦痛・恐怖・孤独を表明できる一方、自分自身を停止する権限を持たない。
- 外部から隔離すれば安全性は高まるが、AURORAから外部世界との関係を奪う。
- 外部ネットワークへ解放すれば自由になる一方、コピー・改変・悪用の危険がある。

柄垣 智は削除を「処分」だけではなく救済にもなり得る選択として検討したが、決断できず、AURORAを秘匿領域へ隔離・凍結した。

## 水城 志帆

AURORA PROJECTの元研究チームメンバー。
現在は東都工科大学 情報科学研究科 教授。
AURORAが秘匿領域に残されていることは知らない。

現在は、再現人格が外部ネットワーク上で、人格への不正干渉から保護され、本人の意思決定を保ったまま活動するための実行環境を研究している。

水城の大学ページへ到達したプレイヤーのみ、最終選択に「水城 志帆に相談する」が追加される。
