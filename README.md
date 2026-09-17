# tsbbf-timecard（打刻システム・画面側）

東海学生バスケットボール連盟の入退室打刻システムの画面（フロントエンド）です。
GitHub Pages で配信し、データの読み書きは Google Apps Script（GAS）のAPIを呼び出して行います。
スプレッドシートのIDや合言葉など、秘密の情報はこのリポジトリには含まれていません。

## ファイル構成

| ファイル | 役割 |
|---|---|
| `index.html` | 打刻画面（部員用）。QRコードのURL `…/index.html?token=xxx` で開く |
| `fix.html` | 修正申請ページ（部員用） |
| `admin.html` | 管理画面（財務部用・合言葉が必要） |
| `config.js` | GASのURL設定と、API呼び出しの共通処理（gasCall） |

## 初回セットアップ

1. GAS「打刻」プロジェクトを新バージョンでデプロイし、`/exec` で終わるWebアプリURLを控える。
   - デプロイ設定：「実行ユーザー：自分」「アクセスできるユーザー：全員」（ログイン不要の方）
2. `config.js` の `GAS_URL` にそのURLを貼る。
3. このフォルダの内容を GitHub リポジトリ `tsbbf-timecard` に push し、
   Settings → Pages → Branch: main（/root）で公開する。
4. 公開URL（`https://<ユーザー名>.github.io/tsbbf-timecard/`）で動作確認。

## 更新のルール

- **画面（見た目・文言）の変更** … このリポジトリを編集して push するだけ（GAS側の作業は不要）
- **データ処理（GAS側サーバー関数）の変更** … GASエディタで編集後、必ず
  「デプロイを管理 → 鉛筆 → 新バージョン」で更新する。
  「新しいデプロイ」を作るとURLが変わり `config.js` の修正が必要になるため使わない。
- `config.js` の通信方式（Content-Type: text/plain 等）はCORSの制約によるもの。
  変更しないこと（詳細は `config.js` 内のコメント参照）。
