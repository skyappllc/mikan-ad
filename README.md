# 株式会社みかん コーポレートサイト

株式会社みかん（広告業・システム開発業）の公式コーポレートサイト。
Astro 5 + Tailwind CSS v4 で構築した静的サイト。Cloudflare Pages にデプロイ。

---

## 技術スタック

| 項目 | 内容 |
|---|---|
| フレームワーク | [Astro](https://astro.build/) 5.x |
| スタイリング | [Tailwind CSS](https://tailwindcss.com/) v4（`@tailwindcss/vite`） |
| パッケージマネージャ | [bun](https://bun.sh/) |
| デプロイ | [Cloudflare Pages](https://pages.cloudflare.com/) |
| フォント | Noto Sans JP（Google Fonts CDN） |

---

## 開発

### 前提条件

- [bun](https://bun.sh/) がインストール済みであること

### セットアップ

```bash
bun install
```

### 開発サーバー起動

```bash
bun run dev
```

ブラウザで [http://localhost:4321](http://localhost:4321) を開く。

### ビルド

```bash
bun run build
```

`dist/` に静的ファイルが生成される。

### ビルドのプレビュー

```bash
bun run preview
```

---

## デプロイ（Cloudflare Pages）

### 方法 1: Wrangler CLI

```bash
# Wrangler のインストール（未インストールの場合）
bun add -g wrangler

# ビルド
bun run build

# デプロイ
wrangler pages deploy dist
```

### 方法 2: GitHub 連携（推奨）

1. GitHub リポジトリを Cloudflare Pages に接続
2. 以下のビルド設定を行う

| 設定項目 | 値 |
|---|---|
| ビルドコマンド | `bun run build` |
| ビルド出力ディレクトリ | `dist` |
| Node.js バージョン | 20 以上 |

---

## プロジェクト構成

```
corporate_site/
├── astro.config.mjs          # Astro + Tailwind v4 設定
├── package.json
├── tsconfig.json
├── wrangler.toml             # Cloudflare Pages 設定
├── public/
│   ├── favicon.svg
│   └── _headers              # Cloudflare キャッシュ・セキュリティヘッダー
└── src/
    ├── styles/
    │   └── global.css        # Tailwind v4 @theme + アニメーション定義
    ├── layouts/
    │   └── BaseLayout.astro  # HTML shell・Intersection Observer
    ├── components/
    │   ├── Header.astro      # 固定ナビ（モバイルハンバーガー付き）
    │   ├── Hero.astro        # ファーストビュー
    │   ├── About.astro       # 会社概要
    │   ├── Services.astro    # サービス紹介
    │   ├── ServiceCard.astro # サービスカード（再利用コンポーネント）
    │   ├── CompanyInfo.astro # 会社情報テーブル
    │   ├── Contact.astro     # お問い合わせ
    │   └── Footer.astro      # フッター
    └── pages/
        └── index.astro       # メインページ
```

---

## カスタマイズ

### お問い合わせメールアドレス

`src/components/Contact.astro` の `email` 変数を変更する。

```astro
const email = 'your-email@example.com';
```

### カラーテーマ

`src/styles/global.css` の `@theme {}` ブロックで定義している。

```css
@theme {
  --color-mikan: #FF8C00;
  --color-ink: #1A1A1A;
  /* ... */
}
```

---

## ライセンス

© 2015–2026 株式会社みかん. All rights reserved.
