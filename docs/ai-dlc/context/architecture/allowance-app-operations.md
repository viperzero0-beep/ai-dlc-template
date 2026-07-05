# 小遣い帳アプリ Operations 計画

## 1. 目的

このアプリは静的なブラウザアプリとして実装されているため、Operations フェーズでは主に次を整備します。

- テストと CI の確認
- 静的サイトホスティングの構成
- デプロイパイプライン
- ロールバック / 運用手順

## 2. 現状の運用対象

### 2.1 既存の CI

- `.github/workflows/ci.yml` が存在
- Node.js プロジェクトとして `npm test` を実行
- `package.json` にはテストスクリプトのみを定義

### 2.2 アプリ構成

- ルートに `index.html` / `app.js` / `styles.css`
- ドメインロジックは `src/allowance-app.js`
- ユニットテストは `tests/allowance-app.test.js`
- データは `localStorage` に保存

## 3. 推奨デプロイ戦略

### 3.1 デプロイ対象

単一の静的サイトとしてデプロイする。

### 3.2 推奨ホスティング

- GitHub Pages
- または Netlify / Vercel / Cloudflare Pages

理由: 依存関係が少なく、OSS/個人利用で無料枠内に収まるため。

## 4. デプロイパイプライン

### 4.1 GitHub Pages ワークフロー

- `main` ブランチへのプッシュ時にデプロイ
- 事前に CI で `npm test` をパスさせる
- 本番リリースは `main` の更新で自動展開

### 4.2 ワークフローの実装

- `actions/checkout@v7`
- `actions/configure-pages@v4`
- `actions/upload-pages-artifact@v1`
- `actions/deploy-pages@v1`

## 5. 監視・運用

### 5.1 監視

静的サイトのため、アプリ内部の監視は不要。
代わりに次を検討する。

- Pingdom / UptimeRobot などの外部監視
- GitHub Pages の稼働状態確認

### 5.2 ロールバック

- GitHub Pages: デプロイ済みコミットを元に `main` をリバート
- `gh-pages` 管理の手動リリースも不要

## 6. 実行手順

### 6.1 デプロイ前チェック

1. `npm test` を実行
2. 主要な UI ファイルがルートに存在することを確認
3. `index.html` から `app.js` / `styles.css` が読み込まれることを確認

### 6.2 デプロイ

1. `main` ブランチにマージ
2. GitHub Actions が自動実行
3. GitHub Pages の公開 URL を確認

### 6.3 ロールバック

1. 問題のあるコミットを `main` で revert
2. 再度 `main` へプッシュ

## 7. 追加で用意すべきもの

- サイト公開先 URL を `README.md` に追記
- データバックアップ / エクスポート機能（必要なら）
- 性能確認は不要だが、将来的には静的アセット圧縮を検討

## 8. 既知の制約

- localStorage を使っているため、ユーザーのデータは端末単位に閉じる
- 複数端末同期やログインは未実装
- GitHub Pages ではコンテンツ配信のみ。API 連携は別途必要

## 9. 次の運用フェーズ

1. デプロイを有効化して公開 URL を確認
2. 外部監視を追加する
3. 使い勝手を見てバックアップ機能を追加する
