---
description: "ドキュメント・README・ADR・永続コンテキスト・コメントを書くときの規約。Markdown 体裁、mermaid 図、AI-DLC コンテキストの残し方。docs / readme / adr / markdown を扱う際に参照。"
name: "ドキュメント規約"
applyTo: ["docs/**/*.md", "README.md"]
---

# ドキュメント規約

## 基本

- 読み手（将来の自分・チーム・AI）が**文脈なしで理解できる**ように書く
- 簡潔に。結論・目的を先に書く（逆ピラミッド）
- コード・コマンド・パスはバッククォートで囲む
- 図が有効な場合は ` ```mermaid ` を使う

## AI-DLC の永続コンテキスト

各フェーズの決定・成果物は次のフェーズの入力になります。必ず残してください:

- 要件: `docs/ai-dlc/context/requirements/<unit-of-work>.md`
- 設計: `docs/ai-dlc/context/architecture/<topic>.md`
- 意思決定記録(ADR): `docs/ai-dlc/context/decisions/NNNN-<title>.md`

書くべき内容: **背景・決定・理由・トレードオフ・却下した代替案**。
「何を決めたか」だけでなく「なぜそう決めたか」を残すこと。

## 変更時の原則

- 依頼されていない変更点の記録用 Markdown を勝手に新規作成しない
- 既存ドキュメントは追記・更新を優先（重複ファイルを増やさない）
- README とコードの乖離を見つけたら、人間に知らせるか同じ PR で更新する
