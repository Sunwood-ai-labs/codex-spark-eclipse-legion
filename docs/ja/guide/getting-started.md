# 導入手順

## 必要なもの

- このスキルを参照できる Codex 環境
- 3-4 席のロスターにする意味があるタスク（実務上は producer 1-2 体 + 悪魔の代弁者 + Material Design 特化デザイナー）
- 直近で必要な 1 手はローカルで持つ、という運用意識

## 導入フロー

1. [GitHub](https://github.com/Sunwood-ai-labs/codex-spark-eclipse-legion) からこのリポジトリを取得し、Codex から参照できる場所に配置します。
2. ルートの `SKILL.md`、`references/`、`agents/openai.yaml` をひとまとまりで保ちます。
3. Spark チームメイトや並列担当が欲しい依頼で `$codex-spark-eclipse-legion` を明示します。

## 最初の呼び出し例

並列分割が伝わる短い依頼から始めるのが効果的です。

```text
Use $codex-spark-eclipse-legion to fan this review out across four Spark subagents.
Keep the merge decision local.
Reserve one Material Design designer and one Devil's Advocate.
Let the other teammates inspect docs drift and peer verification in parallel.
```

## docs のローカル確認

公開向けガイドを確認・編集するときは docs サイトを起動します。

```bash
npm install
npm run docs:dev
```

CI や公開前の確認:

```bash
npm run docs:build
```

## 成功の目安

- 委譲するスライスが本当に独立している
- 各サブエージェントに具体的な担当範囲と終了条件がある
- 最終報告で、各チームメイトの名前、担当、返却内容、最終 `material_design_status` が分かる
