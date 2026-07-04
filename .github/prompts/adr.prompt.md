---
description: "重要な技術的意思決定を ADR（Architecture Decision Record）として記録する。背景・決定・理由・トレードオフ・却下案を docs/ai-dlc/context/decisions に連番で保存。architecture decision / ADR / 設計判断の記録。"
name: "ADR を作成"
argument-hint: "記録する意思決定のタイトル"
agent: "agent"
---

# ADR（Architecture Decision Record）を作成します

重要な意思決定（アーキテクチャ、データモデル、外部依存、セキュリティ、コストに関わるもの）を記録します。

## 手順

1. `docs/ai-dlc/context/decisions/` を確認し、**次の連番**（`NNNN`、4 桁ゼロ埋め）を決める。
2. 不足情報（検討した代替案・制約・トレードオフ）があれば**人間に質問**する。
3. 下記テンプレートで `docs/ai-dlc/context/decisions/NNNN-<kebab-title>.md` を作成する。
4. 関連する要件・設計ドキュメントから本 ADR へリンクを張る。

## テンプレート

```markdown
# NNNN. <タイトル>

- ステータス: 提案中 | 承認済み | 却下 | 置き換え済み(→ NNNN)
- 日付: YYYY-MM-DD
- 決定者: <人間の承認者>

## 背景・課題

<なぜこの決定が必要か。制約・前提>

## 決定

<採用する案>

## 理由

<その案を選んだ根拠>

## トレードオフ・影響

<得るもの／失うもの、コストへの影響>

## 検討した代替案

<却下した案とその理由>
```

> ステータスを「承認済み」にするのは**人間の承認後**にしてください。

タイトル: ${input:タイトル}
