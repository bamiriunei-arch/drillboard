# ドリルボード

マーチングのドリル（隊形と動き）を作る・見る・練習するためのアプリです。
`index.html` 1つで動き、作ったショーは使う人のブラウザの中に保存されます（どこのサーバーにも送られません）。

公開しているページ：https://bamiriunei-arch.github.io/drillboard/

## ファイル

| ファイル | 役割 |
| --- | --- |
| `index.html` | アプリ本体（これだけで動きます） |
| `sw.js`・`manifest.webmanifest`・`icon-*.png`・`apple-touch-icon.png` | ホーム画面に追加したとき・ネットがないときに開けるようにする |
| `tests/` | 自動テスト（アプリが壊れていないか調べる） |
| `package.json`・`playwright.config.js` | 自動テストの設定 |
| `.github/workflows/test.yml` | GitHub に上げるたびに自動テストを動かす設定 |

アプリの版と更新内容は `index.html` の中の `APP_VERSION` と `CHANGELOG` にあります。
版を上げると、前の版を使っていた人には「ドリルボードが新しくなりました」と更新内容が出ます。

## 更新のしかた

1. 新しい `index.html` を GitHub の `main` に上げる（今までどおり「Add files via upload」でOK）
2. 数分すると公開ページが新しくなります
3. リポジトリの「Actions」タブで、自動テストが緑のチェック（✓）になっているか見ます
   - 赤い × のときは、どのテストが失敗したかをクリックして見られます（失敗の記録は「Artifacts」の `playwright-report` からダウンロードできます）

## 自動テスト

`tests/` の中に、だいたい次のことを調べるテストがあります。

- 起動してエラーが出ない・はじめての人に「ようこそ」が出る・「3分で1セット」のガイドが最後まで進む
- 隊員を足す → 形を作る → セットを足す → 再生 → 元に戻す
- 保存データ（共有リンク・ファイル）を書き出して読み直しても同じになる（メモ・版・ルール込み）
- 共有リンクの「同じ版・新しい版・古い版」の知らせ、自分用リンク（`&me=`）、自動バックアップ
- 練習の道具（速さ・区間ループ・カウントイン・1カウントずつ・演奏者の向き・大画面・2本指の拡大）
- ドリルの道具（自動割り当て・接触の直し方・間隔・左右対称・大会のルール）
- 印刷・PDF（コンテ・ドットシート）
- 動きの計算が前と同じか（`tests/fixtures/motion-golden.json` と比べる）

### 自分のパソコンで動かすとき（なくても大丈夫です）

Node.js（20以上）と Python 3 が入っていれば：

```
npm install
npx playwright install chromium
npx playwright test
```

動きの計算をわざと変えたときは、答えを作り直します：`npm run test:update`

テストでは `index.html?test` のようにアドレスに `?test` を付けて開き、アプリの中身を `window.__db` から触っています。
ふだんの使い方（`?test` なし）では何も変わりません。

## 変更の記録（GitHub Desktop のすすめ）

ブラウザから「Add files via upload」で上げると、記録の名前がいつも「Add files via upload」になり、あとから「どの版で何を変えたか」がわかりにくくなります。
GitHub Desktop（無料）を使うと、次のようにできます。

1. GitHub Desktop を入れて、GitHub のアカウントでログイン
2. 「Clone a repository」で `drillboard` を選び、パソコンの中にフォルダを作る
3. 新しい `index.html` を、そのフォルダの `index.html` に上書きする
4. GitHub Desktop の左下の「Summary」に、何を変えたか書く（例：「v9：印刷・練習の道具・自動バックアップ」）
5. 「Commit to main」→ 右上の「Push origin」

こうしておくと「History」タブで、いつ・何を変えたかが一覧で見られ、まちがえたときも「Revert」で前の版に戻せます。

`.github` のように「.」で始まるフォルダは、ブラウザからのアップロードでは見えないことがあります。
そのときは GitHub の画面で「Add file」→「Create new file」を押し、名前の欄に `.github/workflows/test.yml` と打って、中身を貼り付けて保存してください。
