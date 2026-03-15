<div align="center">
  <img src="docs/public/legion-hero.svg" alt="Codex Spark Eclipse Legion hero art" width="100%" />
  <h1>Codex Spark Eclipse Legion</h1>
  <p><strong>明確な担当分担、短い指示、チームメイト単位の報告で <code>gpt-5.3-codex-spark</code> サブエージェントを召喚するための Codex スキルです。</strong></p>
  <p>
    <img src="https://img.shields.io/badge/Codex-Skill-0f172a?style=flat-square" alt="Codex Skill" />
    <img src="https://img.shields.io/badge/Subagents-GPT--5.3--Codex--Spark-f97316?style=flat-square" alt="Spark subagents" />
    <img src="https://img.shields.io/badge/Docs-VitePress-14b8a6?style=flat-square" alt="VitePress docs" />
    <img src="https://img.shields.io/badge/License-MIT-16a34a?style=flat-square" alt="MIT License" />
  </p>
  <p>
    <a href="./README.md"><strong>English</strong></a> |
    <a href="./README.ja.md"><strong>日本語</strong></a>
  </p>
</div>

## ✨ 概要

Codex Spark Eclipse Legion は、1 人では足りないが大規模オーケストレーターを持ち出すほどでもない場面に向けたスキルです。少人数の Spark サブエージェント部隊を素早く編成し、各担当を明示し、最後に誰が何を担当したかを短く整理して返す流れを Codex に教えます。

主担当は運用の管理（方針決定・進捗監督・最終判断）に専念し、実装・調査・検証はサブエージェントに任せる運用を前提にしています。  
各サブエージェントの成果物は、次の時系列で受けます。  

`producer_done -> manager_acceptance -> second_pass -> manager_synthesis_draft -> devil_audit -> final_accept`

この時系列で、`second_pass` は各成果物単位の二重確認、`devil_audit` は最終統合時の反証監査です。

- `manager_acceptance`（=`manager_provisional_acceptance`）: 主担当の一次受領可否（`accepted` / `requires adjustment` / `blocked`）。  
  - 役割: 成果物が管理側で次工程に進める品質かを判定する。
- `second_pass_status`: 成果物単位で `qa_verifier` / `peer_verifier` が出す二重確認結果（`pass / fail / blocked`）。  
  - 役割: 主担当受領後に独立ルートで成果物を再検証する。
- `disposition`: 悪魔の代弁者が全体統合監査で管理するリスク処理状態（`accepted / blocked / resolved`）。  
  - 役割: `manager_acceptance` / `second_pass_status` では見えにくい横断リスクを整理する補助軸。

2～4 体のサブエージェントを編成する場合、総サブエージェント枠のうち 1 体を必ず「悪魔の代弁者」として固定します。これは常設の必須ロールで、追加枠ではありません。
2 名運用でも同様です。総実働帯域が不足し、上記二重確認と悪魔監査を同時に維持できないなら、fan-out を縮小するか、実行を止めます。
実装クリティカルな成果物の `second_pass` は、原則として `qa_verifier` / `peer_verifier` が担当し、悪魔の代弁者で代替しません。  
悪魔の代弁者は二段構えの一方を担うのではなく、`manager_synthesis_draft` に対する全体統合時の反証監査を担当します。

悪魔の代弁者は追加枠ではなく、同じ総サブエージェント枠の中に置く専用監査ロールです。必須の限定責務は次のとおりです。  
- 他ロールの返却物と主担当の統合方針案に対して、仮説の妥当性・根拠不足・横断回帰を監査すること  
- 一般的な実装レビューや設計評価、最終可否判断は担当しないこと  
  
具体的には、主担当に次の形式で返します。  
- `risk level`: 想定リスク（critical / high / medium / low）  
- `missing evidence`: 根拠不足や未検証条件  
- `owner`: 問題の起点となる主担当の決定論点 or サブエージェント  
- `required action`: 追跡調査・再検証・判断保留の要求  
- `disposition`: `accepted` / `blocked` / `resolved`

最終統合の判断は `manager_acceptance=accepted && second_pass_status=pass` が成立してから行い、さらに悪魔の代弁者の `disposition` が `blocked` ではなく、残余リスクが明示的に処理されていることを確認して成立します。

このリポジトリには、公開向けの導線として次を用意しています。

- 英語・日本語の README
- 日英対応の VitePress ドキュメント
- README と docs で再利用する SVG アセット
- docs 検証と GitHub Pages 配信のための GitHub Actions workflow

## ⚡ クイックスタート

1. このリポジトリを Codex から参照できる場所に配置します。
2. 2-4 本の独立作業に分割したい依頼で、スキル名 `codex-spark-eclipse-legion` もしくは `$codex-spark-eclipse-legion` を指定します。
3. クリティカルパスの最初の一手はローカルで処理し、横で進められる作業だけを委譲します。

docs をローカルで確認するには:

```bash
npm install
npm run docs:dev
```

CI や Pages 用のビルド:

```bash
npm run docs:build
```

## 🧭 使いどころ

次のような場面に向いています。

- 調査、QA、実装責務が 2-4 本の独立トラックに綺麗に分かれる
- ユーザーが Spark サブエージェントや並列担当を明示的に求めている
- 外部オーケストレーターではなく、Codex ネイティブの軽量な並列化で済ませたい

逆に、直近の 1 答えが最優先の場面、極小タスク、複数エージェントが同じファイルに衝突する場面では不向きです。
また、担当範囲・非目標・完了条件・QA インベントリを渡さずに投げる依頼も不向きです。

## 🛰️ スキルが強制すること

- 覚えやすく雰囲気のあるチームメイト名と異名
- 各サブエージェントの明確な所有範囲と、サブエージェント側でやらないこと（非目標）
- 各サブエージェントへ、主担当側の完成基準（完了条件）と検証観点（QA インベントリ）を渡す
- 悪魔の代弁者を各分割運用の必須ロールとして明記し、最終統合時の反証監査（`devil_audit`）を実施する  
- `second_pass` は実装結果の成果物単位で `qa_verifier` / `peer_verifier` を基本とする（implementation-critical は悪魔の代弁者で代替しない）
- 悪魔の代弁者は、ファイル数の増減を見て fan-out が負荷を超える場合は、並列数を減らすか実行を止める判断材料を返す
- 毎回むやみに待たない、選択的な `wait`
- 誰が何を担当したか分かる短い最終報告
- スレッド上限、タイムアウト、中断時の回復ガイド

正本の振る舞いはルートの `SKILL.md` にあります。このリポジトリの docs は、そのスキルを公開向けに理解しやすくするためのガイドです。

## 🧱 リポジトリ構成

- `SKILL.md`: Codex が参照するスキル本体
- `agents/openai.yaml`: 対応ツール向けの簡潔なインターフェース記述
- `references/prompt-patterns.md`: 調査、偵察、worker、review swarm 用のテンプレート
- `references/recovery.md`: よくある失敗時のリカバリー手順
- `docs/`: オンボーディングと保守向けの日英 VitePress サイト

## 📚 ドキュメント導線

- [Docs ホーム](./docs/index.md)
- [導入手順](./docs/guide/getting-started.md)
- [使い方ガイド](./docs/guide/usage.md)
- [構成メモ](./docs/guide/architecture.md)
- [トラブルシューティング](./docs/guide/troubleshooting.md)
- [Contributing](./CONTRIBUTING.ja.md)
- [English README](./README.md)

## 🤝 メンテナンスメモ

- 挙動を変えたら `SKILL.md`、`README.md`、`README.ja.md`、`docs/` の説明を揃えて更新します。
- 長大なオーケストレーション例より、短く境界が明確な例を優先します。
- 将来 Python 補助スクリプトを足す場合は、`python ...` ではなく `uv run ...` を使います。
- 公開向け更新の共通チェックには [CONTRIBUTING.ja.md](./CONTRIBUTING.ja.md) を使います。

## 📄 ライセンス

このリポジトリは [MIT License](./LICENSE) で公開します。
