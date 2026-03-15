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

## 🛰️ スキルが強制すること

- 覚えやすく雰囲気のあるチームメイト名と異名
- 各サブエージェントの明確な所有範囲
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
