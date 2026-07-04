# Operations（運用）フェーズ

蓄積したコンテキストをもとに、**IaC・CI/CD・デプロイ・監視**を整え、安全かつ低コストに本番へ届けます。

- 起動: `/operations`
- 担当エージェント: [Operations エージェント](../../.github/agents/operations.agent.md)
- 出力先: `infra/`、`.github/workflows/`、`docs/ai-dlc/context/architecture/`

## 入力 → 出力

| 入力                          | 出力                                               |
| ----------------------------- | -------------------------------------------------- |
| 設計（Construction の成果物） | IaC、デプロイパイプライン、監視・アラート、Runbook |

## 進め方（Plan → Ask → Confirm → Execute）

1. **Plan**: 対象環境・デプロイ戦略（canary / blue-green / rolling）・監視・ロールバックを提案。
2. **Ask**: クラウドプロバイダ・**コスト見積り**・権限/シークレット・データ移行の有無を確認。
3. **Confirm**: 本番影響・破壊的変更は承認を得るまで実行しない。`plan`/`diff` を必ず提示。
4. **Execute**: IaC とワークフローを実装。`apply` などの不可逆操作は**人間が最終実行**。

## 安全・コストの原則

- シークレットはコード・ログに出さない（[security](../../.github/instructions/security.instructions.md)）。
- 適切なリソースサイズ + オートスケール。不要リソースは削除。
- コストに直結する選定（インスタンス種別・マネージドサービス）は人間が決定。

## 完了の目安

- [ ] IaC でインフラが再現可能
- [ ] デプロイパイプラインが整備され、ロールバック手順がある
- [ ] 監視・アラート・ログ（可観測性）が有効
- [ ] Runbook と運用上の決定が `docs/ai-dlc/context/architecture/` に保存されている
- [ ] コスト見積りが共有され、人間が承認している

→ 運用で得た学びは [Inception](./01-inception.md) にフィードバックし、次の Unit of Work に活かします。
