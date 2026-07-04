# Inception（着想）フェーズ

ビジネス意図を、検証済みの**要件・ユーザーストーリー・受入基準・Unit of Work** に変換します。

- 起動: `/inception`
- 担当エージェント: [Inception エージェント](../../.github/agents/inception.agent.md)
- 出力先: `docs/ai-dlc/context/requirements/<unit-of-work>.md`

## 入力 → 出力

| 入力                         | 出力                                                                |
| ---------------------------- | ------------------------------------------------------------------- |
| ビジネス意図・課題・アイデア | 要件、ユーザーストーリー、受入基準、Unit of Work 分解、リスク・前提 |

## 進め方（Plan → Ask → Confirm → Execute）

1. **Plan**: AI が意図の理解を要約し、作る成果物を提示。
2. **Ask（Mob Elaboration）**: AI が不明点・前提・スコープ・非機能要件・成功指標を質問。チーム全員で回答・検証。
3. **Confirm**: ストーリー / 受入基準（Given-When-Then）/ Unit of Work 分解を人間が承認。
4. **Execute**: 承認内容を `requirements/<unit-of-work>.md` に保存。Construction への引き継ぎ事項を明記。

## 良い受入基準の例

```
Given ログイン済みのユーザーが
When カートの「購入」を押すと
Then 在庫を確認し、確保できれば注文を確定し、確認メールを送る
```

## 完了の目安（Definition of Ready for Construction）

- [ ] スコープ内/外が明確
- [ ] 各ストーリーに受入基準がある
- [ ] Unit of Work が Bolt に分解されている
- [ ] 重要な前提・リスク・未解決の意思決定が列挙されている
- [ ] 要件が `docs/ai-dlc/context/requirements/` に保存されている

→ 次は [Construction](./02-construction.md)（`/bolt-plan` で計画 → `/construction` で実装）。
