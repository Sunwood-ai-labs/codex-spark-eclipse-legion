# 使い方

## 発動するべき場面

Codex Spark Eclipse Legion は、次のような非ブロッキング作業が複数あるときに向いています。

- 出典付きの調査スライス
- コードベース偵察の個別質問
- ファイル単位で衝突しない実装担当
- review や QA の分散確認

複数エージェントが楽しそう、という理由だけで使うのは避けます。次のブロッキングステップはたいていローカルで持つべきです。  
運用上、主担当とサブエージェントの役割は最初に固定します。  
主担当は管理・進捗管理・最終判断、サブエージェントは実装・調査・一次レビューとします。  
2～4 本の並列運用を行う場合は、総サブエージェント数の中の 2 枠を必ず「悪魔の代弁者」と「Material Design 特化デザイナー」として固定します。追加枠は使いません。  
全体で扱える実働帯域が不足する場合は、fan-out の本数を減らすか、並列化自体を一旦止める方針にします。  
両席が必須になるため、実務上の producer は 1～2 体を上限目安にし、`peer_verifier` を安全に共有できるかを先に確認します。  
この2条件が同時に満たせない場合は fan-out しません。  

### 二重確認（成果物単位）

各サブエージェントの返却成果物は、時系列で次を通過します。  

`producer_done -> manager_acceptance -> second_pass -> manager_synthesis_draft -> devil_audit -> final_accept`

この流れでは、`second_pass` が各サブエージェント成果物の二重確認、`devil_audit` が全体統合の反証監査です。  
つまり、`second_pass` は「成果物単位」の検証、`devil_audit` は「統合全体」の検証です。

`producer_done` から上の流れで `manager_acceptance=accepted` と `second_pass_status=pass` が揃い、さらに `material_design_status=pass|not_applicable` が確認できたときに完了条件を満たします。  
`disposition` は悪魔の代弁者の反証リスク処理用で、完了判定とは別の軸です。

- `manager_acceptance`（= `manager_provisional_acceptance`）: 主担当による一次受領可否。  
- `second_pass_status`: `qa_verifier` / `peer_verifier` による second pass の成果物単位結果。  
- `material_design_status`: Material Design 特化デザイナーが返す必須デザイン監査結果（`pass / requires adjustment / not_applicable / blocked`）。  
- `disposition`: 悪魔の代弁者の全体統合監査結果（`accepted / blocked / resolved`）。

注意: implementation-critical な成果物は、`second_pass` を悪魔の代弁者で代替しません。  
`second_pass` は原則として `qa_verifier` / `peer_verifier` を使い、成果物単位で `pass / fail / blocked` を出します。
Material Design 特化デザイナーも `second_pass` の代替ではなく、`material_design_status` を返す専用監査です。

この二重確認は最終統合前のレビューの代わりではなく、**各成果物単位**の `second_pass` です。  
最終統合は主担当が `manager_synthesis_draft` を作成し、悪魔の代弁者が全体反証（`devil_audit`）を行ってから行います。

## Material Design 特化デザイナー

Material Design 特化デザイナーは常設の必須ロールです。追加枠ではなく、同じ総サブエージェント枠の中に置く専用デザイン監査ロールとして、**UI 影響のある成果物の Material Design 監査**を担当します。

### 役割

- コンポーネント適合、情報階層、余白、状態、テーマ、モーション、アクセシビリティを監査する  
- `material_design_status`、コンポーネント指針、required action を返す  
- UI 変更がない場合は `material_design_status = not_applicable` を理由付きで返す  
- `qa_verifier` / `peer_verifier` や悪魔の代弁者の代役にはならない  

### 実行タイミング

1. fan-out 前に必ず席を固定して予約する。  
2. producer 返却後に UI 影響の有無を確認して監査する。  
3. `material_design_status` を記録してから、主担当が `manager_synthesis_draft` を確定する。  

## 悪魔の代弁者

悪魔の代弁者は常設の必須ロールです。追加枠ではなく同じ総サブエージェント枠の中に置く専用監査ロールとして、**全体統合の反証監査（devil audit）**を担当します。

### 実行順

1) fan-out 前に必ず「悪魔の代弁者」を固定して予約する。  
2) 他の subagent が返却した成果物と `manager_synthesis_draft`（初版統合案）を受け取る。  
3) 全体像ベースで横断的な根拠不足・再現条件不足・回帰リスクを検出し `disposition` を決める。  
4) required action を受けて、主担当が再統合可否を最終判断する。  

### 入力

悪魔の代弁者は次の 3 点を受け取って審査します。  
- 他 subagents の `returned findings`（主張と根拠）  
- 各 subagent の `changed file list`  
- 主担当の `manager_synthesis_draft`（初版統合案）

### 返却物（固定項目）

悪魔の代弁者は結果を次の項目で返します。  
- `risk level`: critical / high / medium / low  
- `missing evidence`: 仮説・結論の根拠不足/検証不足  
- `owner`: 問題に対する責任を持つ観点（主担当判断論点または subagent）  
- `required action`: 追加調査、再検証、または保留要求  
- `disposition`: `accepted` / `blocked` / `resolved`

### 役割の境界

- 他ロールの返却物の監査  
- 主担当の統合案に対する仮説・根拠不足・横断回帰の監査  
- **一般的な実装レビュー**（設計・文法・手順の最終評価）や**最終判断**は担当しません。  

この節の要点は明確化です。  
- `second_pass` は `qa_verifier` / `peer_verifier` が成果物単位で行う二重確認。  
- 悪魔の代弁者は `devil_audit` として統合全体を監査し、`second_pass` の代替になりません。

最終報告では、`manager_acceptance=accepted && second_pass_status=pass` に加えて `material_design_status=pass|not_applicable` が成立しているか、  
`disposition` が `blocked` ではなく、残余リスクが明示的に処理されているかを確認します。

### 役割差分

- 主担当: `producer_done` を受けて `manager_acceptance` を判定する。  
- second_pass（`qa_verifier`/`peer_verifier`）: 各成果物を独立再検証し、`second_pass_status` を決める。  
- Material Design 特化デザイナー: UI 影響のある成果物を監査し、`material_design_status` と指針を返す。  
- 悪魔の代弁者: `manager_synthesis_draft` を俯瞰し、`risk level / missing evidence / owner / required action / disposition` を返す。  
- QA インベントリ: 主担当と second_pass が可否判定に使い、悪魔の代弁者は反証観点のリスクを上乗せする。

## プロンプト設計ルール

各委譲プロンプトには、次を含めます。

- `subagent 1` のような識別子
- 覚えやすいカタカナのフルネームと、少し芝居がかった役割に沿う異名
- 担当範囲（この範囲の作業だけ）
- 非目標（この依頼でやらないこと）
- 完了条件（「どの状態なら完了か」）
- QA インベントリ（最低 1 つの確認観点を必ず明記）
- Material Design 特化デザイナーの担当、もしくは `no user-facing surface` 判定  
- 悪魔の代弁者の担当（反証観点、確認観点、必要な根拠）  
  - 追加条件: 入力は `returned findings`、`changed file list`、`manager_synthesis_draft` を最低限含めること

QA インベントリは、主担当が判断に使える実務的チェックリストです。  
1 つ例を示すと、サブエージェント向けには次のように渡します。

- 変更対象ファイルが指定範囲内か
- `README.ja` と対応日本語 docs の説明が同じ運用原則を反映しているか
- `second_pass_status` が pass かつ `manager_acceptance` が適切か（fail / blocked は再修正待ち）  
- `material_design_status` が pass か、UI 非対象なら `not_applicable` が理由付きで返っているか
- 悪魔の代弁者の見落としリスク（`disposition`）と required action が最終統合前に潰されているか

- 既存の英語ファイルへのリンクや GitHub への導線を壊していないか
- 最終レポートで、実際に実行した QA インベントリが具体的な結果つきで列挙されているか

これらを満たしていれば、`manager_acceptance=accepted && second_pass_status=pass`、`material_design_status=pass|not_applicable`、`disposition` の整合で完成可否を主担当が確実に判定できます。

## 期待する報告の形

最終回答で次が一目で分かる状態を目指します。

- どの Spark サブエージェントが動いたか
- それぞれが何を所有していたか
- 何を返したか
- どの QA インベントリを誰が実行し、結果がどうだったか
- どの QA インベントリが pass / fail / blocked だったか
- どのチェックや情報源で裏づけたか
- 何が失敗・再試行・未完了だったか
- Material Design 特化デザイナーが `pass` / `requires adjustment` / `not_applicable` のどれを返したか
- 最終統合時に `manager_acceptance` / `second_pass_status` / `material_design_status` / `disposition` がどう連動したか

短いレポート断片の例:

```text
レイ・ブラウン / 境界を渡る導線守: ランタイムのクロスプラットフォーム化
QAインベントリ実施: `uv run pytest` (18 passed), `uv run python -m compileall src` (pass), runtime smoke launch (pass)
Status: manager_acceptance = accepted, second_pass_status = pass

ノヴァ・クロウ / 工程を焚く火継卿: ビルド導線と CI
QAインベントリ実施: `uv sync --group build` (pass), `uv run python scripts/build_desktop.py --artifact-suffix runtime-smoke` (pass)
Status: manager_acceptance = accepted, second_pass_status = pass
```

## 分割例

```text
Use $codex-spark-eclipse-legion.
- subagent 1（`レイ・ブラウン / 境界を渡る導線守`）: docs drift review（producer。subagent 2 を peer verify）
- subagent 2（`シオン・ヴェイル / 言霊を綴る秘録官`）: docs example consistency scan（producer。subagent 1 を peer verify）
- subagent 3（`カグラ・ノアール / 余白の結界建築士`）: Material Design 特化デザイナー（user-facing docs/UI audit。`material_design_status` を返す）
- subagent 4（`ノクス・ヴァレン / 反証を裁く冥府の審判`）: 悪魔の代弁者（全体監査）
- subagent 4 の入力: 他 subagents の returned findings、changed file list、manager_synthesis_draft（初版）
- subagent 4 の返却: risk level / missing evidence / owner / required action / disposition
- 担当範囲: docs/ja/guide/usage.md の運用ガイダンスだけ更新する
- 非目標: README.md の英語版や SKILL.md/references の内容更新
- 完了条件: 1) usage.md 内に運用方針（管理役/実働役）を明記、2) 各サブエージェント向けの説明は日本語で自然な文章、3) docs/ja/index.md への参照整合性を保つ
- QA インベントリ: 変更が導線破壊を起こしていないか、英日 docs で同様ルールが重複していないか、producer ごとに `manager_acceptance=accepted` と `second_pass_status=pass` が揃っているか、`material_design_status` が返っているか、manager_synthesis_draft が整っているか、fan-out が過大な場合の縮小/停止判断が入っているか
- 返却形式: findings または修正提案を短い理由付きで返す
Keep the overall synthesis and decision local.
```

## メンテナンス上の注意

ガイドを更新したら、`SKILL.md`、README 群、docs の例を揃えて、利用者に矛盾した並列化ルールが見えないようにします。
