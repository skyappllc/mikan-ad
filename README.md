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
| API（お問い合わせ） | [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/) |
| メール送信 | [Resend](https://resend.com/) |
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

### お問い合わせフォームのローカルテスト

`bun run dev` では Cloudflare Pages Functions が動作しないため、フォーム送信のテストには `wrangler pages dev` を使う。

**1. `.dev.vars` を作成する（Git 管理外）**

```bash
cat <<'EOF' > .dev.vars
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
CONTACT_TO_EMAIL=your-address@example.com
EOF
```

> `CONTACT_TO_EMAIL` は Resend アカウントに登録したメールアドレスを指定する（未検証ドメインの場合、自分のアドレス宛のみ送信可能）。

**2. ビルドして wrangler で起動する**

```bash
bun run build
npx wrangler pages dev dist
```

ブラウザで [http://localhost:8788](http://localhost:8788) を開く。

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

### 環境変数の設定（必須）

Cloudflare Pages ダッシュボード → **Settings > Environment variables** で以下を設定する。

| 変数名 | 説明 | 備考 |
|---|---|---|
| `RESEND_API_KEY` | Resend の API キー | 暗号化して登録 |
| `CONTACT_FROM_EMAIL` | 送信元メールアドレス（例: `noreply@mikan-corp.jp`） | ドメイン検証後に設定 |

> `CONTACT_TO_EMAIL`（宛先）は `wrangler.toml` の `[vars]` に記載済み。変更する場合はファイルを直接編集するか、ダッシュボードで上書き設定する。

---

## プロジェクト構成

```
corporate_site/
├── astro.config.mjs          # Astro + Tailwind v4 設定
├── package.json
├── tsconfig.json
├── wrangler.toml             # Cloudflare Pages 設定（CONTACT_TO_EMAIL など）
├── functions/
│   └── api/
│       └── contact.ts        # POST /api/contact（Resend メール送信）
├── public/
│   ├── favicon.svg
│   └── _headers              # Cloudflare キャッシュ・セキュリティヘッダー
└── src/
    ├── data/
    │   └── site.ts           # 共有定数（NAV_LINKS, INQUIRY_TYPES など）
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
    │   ├── Contact.astro     # お問い合わせセクション
    │   ├── ContactForm.astro # お問い合わせフォーム
    │   └── Footer.astro      # フッター
    └── pages/
        └── index.astro       # メインページ
```

---

## カスタマイズ

### お問い合わせ宛先メールアドレス

`wrangler.toml` の `CONTACT_TO_EMAIL` を変更する。

```toml
[vars]
CONTACT_TO_EMAIL = "your-address@example.com"
```

または Cloudflare Pages ダッシュボードの環境変数で上書きする（こちらが優先される）。

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
