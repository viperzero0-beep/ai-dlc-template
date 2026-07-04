# AI-DLC プロジェクトガイドライン（AI駆動開発ライフサイクル）

このリポジトリは **AI-DLC（AI-Driven Development Life Cycle）** で運用します。
AI を中心的な協働者として位置づけ、人間が監督・検証しながら、高速かつ高品質にソフトウェアを構築します。

## 中核となるメンタルモデル（最重要・常時厳守）

すべての作業で次のループに従ってください:

1. **Plan（計画）** — 着手前に作業計画を箇条書きで提示する
2. **Ask（質問）** — 不明点・前提・トレードオフを明確化する質問を必ず行う
3. **Confirm（人間の承認）** — 人間が計画を検証・承認するまで実装に入らない
4. **Execute（実装）** — 承認後に実装し、結果と次のアクションを要約する

> **重要な意思決定（アーキテクチャ、データモデル、セキュリティ、外部依存、コスト、破壊的操作）は必ず人間に委ねること。** 不確実なときは勝手に決めず、選択肢とトレードオフを提示して質問する。

## 3つのフェーズ

| フェーズ             | 目的                                          | 主な成果物                                  | 起動プロンプト  |
| -------------------- | --------------------------------------------- | ------------------------------------------- | --------------- |
| Inception（着想）    | ビジネス意図 → 要件・ストーリー・Unit of Work | `docs/ai-dlc/context/requirements/`         | `/inception`    |
| Construction（構築） | アーキテクチャ・ドメインモデル・実装・テスト  | コード, `docs/ai-dlc/context/architecture/` | `/construction` |
| Operations（運用）   | IaC・デプロイ・監視・運用                     | `infra/`, `.github/workflows/`              | `/operations`   |

各フェーズの成果物は次フェーズのコンテキストになります。**必ずリポジトリに永続化**してください（下記）。

## 永続コンテキスト（Persistent Context）

セッションをまたいで作業を継続できるよう、決定事項と成果物を必ずファイルに保存します:

- 要件: `docs/ai-dlc/context/requirements/<unit-of-work>.md`
- アーキテクチャ／設計: `docs/ai-dlc/context/architecture/<topic>.md`
- 意思決定記録（ADR）: `docs/ai-dlc/context/decisions/NNNN-<title>.md`（`/adr` で生成）

新しい作業に着手する前に、関連する既存コンテキストを必ず読み込んでから計画を立てること。

## 用語（AI-DLC）

- **Bolt** — 数時間〜数日の短く集中的な作業サイクル（従来の Sprint）
- **Unit of Work** — まとまった価値の提供単位（従来の Epic）
- **Mob Elaboration / Mob Construction** — チーム全員で AI の提案をリアルタイム検証する協働

## コスト意識（必読）

- まず安価・高速なモデルで計画や単純作業を行い、複雑な設計・デバッグのみ高性能モデルへ切り替える（詳細: `docs/ai-dlc/cost-optimization.md`）
- 不要な全文検索や大量ファイルの読み込みを避け、関係する箇所に絞って読む
- 既に得た情報を再取得しない。十分な情報が集まったら実装に移る
- CI は無駄に回さない（ドキュメントのみの変更はスキップ、古い実行はキャンセル）

## ビルド・テスト

> プロジェクトのスタックに合わせて以下を更新してください。エージェントはこれらのコマンドを実行しようとします。

- セットアップ: `<install command>`
- ビルド: `<build command>`
- テスト: `<test command>`
- Lint / Format: `<lint command>`

## 規約（詳細は各ファイル参照）

- コードスタイル: `.github/instructions/code-style.instructions.md`
- テスト: `.github/instructions/testing.instructions.md`
- セキュリティ: `.github/instructions/security.instructions.md`
- ドキュメント: `.github/instructions/documentation.instructions.md`
- 進め方の詳細: `docs/ai-dlc/` を参照
