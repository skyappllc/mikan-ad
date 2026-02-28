export const NAV_LINKS = [
  { href: '#about', label: '会社概要' },
  { href: '#services', label: 'サービス' },
  { href: '#company', label: '会社情報' },
  { href: '#contact', label: 'お問い合わせ' },
] as const;

export const CONTACT_EMAIL = 'info@mikan-corp.jp';
export const COMPANY_NAME = '株式会社みかん';
export const FOUNDED_YEAR = 2015;

export const INQUIRY_TYPES = [
  { value: 'system-dev',  label: 'システム開発・Webアプリ' },
  { value: 'ai',          label: 'AI活用・開発のご相談' },
  { value: 'pm',          label: 'プロジェクトマネジメント' },
  { value: 'other',       label: 'その他のご相談' },
] as const;
