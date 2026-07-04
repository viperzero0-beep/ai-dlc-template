---
description: "Bolt（作業サイクル）終了後の振り返り（レトロスペクティブ）を行う。うまくいった点・改善点・学びを整理し、次の Bolt とプロジェクト規約に反映する。retro / ふりかえり / KPT の起点。"
name: "振り返り（Retro）"
argument-hint: "振り返る Bolt / 期間"
agent: "agent"
---

# Bolt の振り返り（Retrospective）

直近の Bolt を振り返り、次に活かせる**具体的な改善アクション**を作ります。

## 手順

1. **事実の収集**: 対象期間の変更・PR・主要な決定（`docs/ai-dlc/context/`）を確認する。
2. **KPT で整理**:
   - **Keep**: うまくいったこと・続けること
   - **Problem**: 課題・つまずき・手戻りの原因
   - **Try**: 次に試す具体的な改善（担当・期限を明確に）
3. **規約への反映提案**:
   - 繰り返し発生する問題は、`.github/instructions/` や `copilot-instructions.md` への追記を提案する。
   - AI とのやり取りで効いた/効かなかったプロンプトの工夫を記録する。
4. **コスト振り返り**: モデル選択・トークン消費・CI 実行回数に無駄がなかったかを確認し、改善案を出す。

## 出力

- 振り返り結果を要約し、必要なら `docs/ai-dlc/context/` に記録する。
- 規約・設定の変更提案は、人間の承認を得てから反映する。

💡 推奨モデル: 軽量モデルで十分。[cost-optimization](../../docs/ai-dlc/cost-optimization.md) 参照。

対象: ${input:対象}
