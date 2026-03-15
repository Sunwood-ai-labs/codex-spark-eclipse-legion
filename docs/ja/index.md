---
layout: home
title: Codex Spark Eclipse Legion
hero:
  name: Codex Spark Eclipse Legion
  text: 制御を失わずに Spark 部隊を召喚する
  tagline: ネイティブなサブエージェント並列化、明確な担当分担、チームメイト単位の報告に特化した Codex スキルです。
  image:
    src: /legion-mark.svg
    alt: Codex Spark Eclipse Legion mark
  actions:
    - theme: brand
      text: 導入手順へ
      link: /ja/guide/getting-started
    - theme: alt
      text: GitHub で見る
      link: https://github.com/Sunwood-ai-labs/codex-spark-eclipse-legion
    - theme: alt
      text: Read in English
      link: /
features:
  - title: 雰囲気のある命名規約
    details: 各 Spark エージェントに短いコードネームと異名を与え、最終報告を読みやすく印象的に保ちます。
  - title: 衝突しにくい責務分離
    details: 作業を 2-4 本の独立スライスに分け、クリティカルパスはローカルで持ち、横で進められる範囲だけ委譲します。
  - title: 落ち着いたリカバリー
    details: スレッド上限、wait のタイムアウト、中断、モデル名の見えにくさに対しても復旧方針を用意します。
  - title: 管理と実働の分離
    details: 主担当は方針・最終判断、サブエージェントは実装・調査・一次レビューを担当し、悪魔の代弁者は `manager_synthesis_draft` の `devil_audit` を担当します。
  - title: 二重確認の分離
    details: 成果物単位の `second_pass` は `qa_verifier` / `peer_verifier` が担い、悪魔の代弁者は全体監査として `disposition` を返します。
---

## このリポジトリの役割

このリポジトリは、生のスキル定義を README、日英 docs、視覚アセット、デプロイ自動化まで含めた公開向けパッケージに整えるためのものです。正本はルートの `SKILL.md` に置きつつ、ここでは導入と運用を分かりやすく説明します。

## 運用方針

時系列は `producer_done -> manager_acceptance -> second_pass -> manager_synthesis_draft -> devil_audit -> final_accept` です。  
`second_pass` は各成果物単位の二重確認、`devil_audit` は最終統合時の全体反証監査です。  
`manager_acceptance=accepted && second_pass_status=pass` が先に満たされ、加えて `disposition` の未解決リスクが解消されるときに最終採用します。

## 次に読む場所

- [導入手順](/ja/guide/getting-started) で前提条件、導入方法、最初の呼び出し例を確認します。
- [使い方](/ja/guide/usage) で委譲パターンと最終報告の形を確認します。
- [構成](/ja/guide/architecture) でこのリポジトリのファイル責務を把握します。
- [トラブルシューティング](/ja/guide/troubleshooting) は、待ちや失敗時にすぐ参照できるようにしておくと便利です。
