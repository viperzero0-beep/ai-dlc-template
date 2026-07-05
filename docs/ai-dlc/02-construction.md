# Construction（構築）フェーズ

検証済みの要件から、**論理アーキテクチャ・ドメインモデル・コード・テスト**を作ります。

- 起動: `/construction`（計画は `/bolt-plan`、意思決定は `/adr`）
- 担当エージェント: [Construction エージェント](../../.github/agents/construction.agent.md)
- 出力先: コード本体 + `docs/ai-dlc/context/architecture/<topic>.md`

## 入力 → 出力

| 入力                       | 出力                          |
| -------------------------- | ----------------------------- |
| 要件（Inception の成果物） | 設計、実装コード、テスト、ADR |

## 進め方（Plan → Ask → Confirm → Execute）

1. **Plan**: 既存コンテキストと関連コードを読み、アーキテクチャ・影響範囲・テスト方針を提案。
2. **Ask（Mob Construction）**: アーキ選択・データモデル・依存ライブラリのトレードオフを選択肢付きで確認。
3. **Confirm**: 設計が承認されるまで本実装に入らない。重要判断は `/adr` で記録。
4. **Execute**: コードとテストをセットで実装。CI を緑にし、設計を `architecture/` に保存。

## 規約（自動で参照されます）

- [コードスタイル](../../.github/instructions/code-style.instructions.md)
- [テスト](../../.github/instructions/testing.instructions.md)
- [セキュリティ](../../.github/instructions/security.instructions.md)

## 完了の目安

- [ ] 受入基準を満たす実装
- [ ] 重要パス・異常系のテストがあり CI が緑
- [ ] セキュリティ確認済み（OWASP Top 10）
- [ ] 重要な意思決定が ADR 化されている
- [ ] 設計が `docs/ai-dlc/context/architecture/` に保存されている
- [ ] PR を作成し、人間 + AI のレビューを通過

→ 次は [Operations](./03-operations.md)。Bolt 完了後は `/retro` で振り返り。
