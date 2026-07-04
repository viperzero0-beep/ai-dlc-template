# 設計コンテキスト（Architecture）

Construction / Operations フェーズの設計・運用判断を保存します。

- 命名: `docs/ai-dlc/context/architecture/<topic>.md`
- 生成: `/construction`・`/operations` の過程で更新
- 重要な単発の意思決定は ADR（`../decisions/`）に切り出します

## ファイルに含める内容

- 論理アーキテクチャ / コンポーネント境界 / データフロー（必要に応じて mermaid 図）
- ドメインモデル / 主要なデータ構造
- 採用技術・ライブラリとその理由
- 運用設計（デプロイ戦略・監視・ロールバック・Runbook）
- 既知の制約・トレードオフ
