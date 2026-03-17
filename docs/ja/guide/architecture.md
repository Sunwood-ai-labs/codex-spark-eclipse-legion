# 構成

## コアファイル

- `SKILL.md`: Codex が参照する正本のスキル定義
- `agents/openai.yaml`: スキルを表示するツール向けの軽量なインターフェース要約
- `references/prompt-patterns.md`: 調査、偵察、worker、review swarm 用のテンプレート
- `references/recovery.md`: スレッド上限、タイムアウト、中断、モデル名可視性の揺れに対する回復手順

## 小さく保つ理由

このスキルは、素早く監査できること自体が価値です。運用指示、テンプレート、リカバリー資料を分けることで、必要な答えにすぐ辿りつける構成を維持しています。
2名運用でも同様に悪魔の代弁者枠は 1 体固定とし、実働帯域不足時は fan-out を削減または中断して同時運用数を縮小します。

## ドキュメント設計

管理役（主担当）と実働役（subagent）の役割分担を明確にし、成果物単位の二重確認と全体統合監査を分離します。多人数運用では、Material Design 特化デザイナーと悪魔の代弁者も固定席として同じロスター内に収めます。  
時系列は `producer_done -> manager_acceptance -> second_pass -> manager_synthesis_draft -> devil_audit -> final_accept` です。  
`second_pass` が各成果物の二重確認、`devil_audit` が全体統合時の反証監査です。

運用上の固定ルールは次のとおりです。
- `second_pass` は `qa_verifier` / `peer_verifier` が成果物ごとに実施する独立再検証。  
- `devil_audit` は `manager_synthesis_draft` を対象に、主担当・複数成果物の横断リスクを評価する悪魔の代弁者監査。  
- `manager_acceptance=accepted && second_pass_status=pass` が満たされ、かつ `disposition` が未解決でないことを確認してから最終採用に進む。
- この 2 段の同時運用が担保できない場合は、fan-out を縮小または中断する。

## フロー構成図

![Codex Spark Eclipse Legion フロー構成図](/legion-orchestration-flow.drawio.svg)

この再利用用アセットは、`SKILL.md` の運用モデルを図として固定したものです。Material Design 特化デザイナーと悪魔の代弁者を含むロール分担、正規フロー、fan-out 縮退条件、報告契約を 1 枚で参照でき、編集元は `docs/public/legion-orchestration-flow.drawio` にあります。

VitePress サイトは、利用者が最初に必要とする順番に合わせています。

- 導入手順
- 使い方
- 構成
- トラブルシューティング

こうすることで、英語版と日本語版の構成を揃えつつ、ルートの `SKILL.md` を丸写しせずに済みます。

## ビジュアル方針

SVG のマークとヒーロー画像は、スキル名に合わせて eclipse と spark を組み合わせたモチーフにしています。同じ見た目の種を README ヒーロー、docs ロゴ、favicon、ソーシャルプレビューで再利用します。

