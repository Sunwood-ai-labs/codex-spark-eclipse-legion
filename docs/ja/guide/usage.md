# 使い方

## 発動するべき場面

Codex Spark Eclipse Legion は、次のような非ブロッキング作業が複数あるときに向いています。

- 出典付きの調査スライス
- コードベース偵察の個別質問
- ファイル単位で衝突しない実装担当
- review や QA の分散確認

複数エージェントが楽しそう、という理由だけで使うのは避けます。次のブロッキングステップはたいていローカルで持つべきです。

## プロンプト設計ルール

各委譲プロンプトには、次を含めます。

- `subagent 1` のような識別子
- 覚えやすい名前と異名
- 正確なスコープ
- 何を返すか、どこで終えるかが分かる終了条件
- 必要に応じた検証条件。とくにリンクや変更ファイルの明示

## 期待する報告の形

最終回答で次が一目で分かる状態を目指します。

- どの Spark サブエージェントが動いたか
- それぞれが何を所有していたか
- 何を返したか
- どのチェックや情報源で裏づけたか
- 何が失敗・再試行・未完了だったか

## 分割例

```text
Use $codex-spark-eclipse-legion.
- subagent 1: docs drift review
- subagent 2: build and test risk review
- subagent 3: release-note impact scan
Keep the overall synthesis and decision local.
```

## メンテナンス上の注意

ガイドを更新したら、`SKILL.md`、README 群、docs の例を揃えて、利用者に矛盾した並列化ルールが見えないようにします。

