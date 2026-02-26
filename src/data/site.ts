export type NavItem = {
  label: string;
  href: string;
};

export type ServiceItem = {
  title: string;
  summary: string;
  details: string[];
  accent: 'mikan' | 'sky' | 'leaf';
};

export type CompanyProfile = {
  name: string;
  address: string;
  ceo: string;
  founded: string;
  industry: string;
};

export type ContactInfo = {
  email: string;
  officeHours: string;
  responseTime: string;
};

export type PolicySection = {
  title: string;
  body: string;
};

export const siteMeta = {
  siteUrl: 'https://mikan.ad',
  name: '株式会社みかん',
  defaultTitle: '株式会社みかん | 広告・システム開発',
  defaultDescription:
    '株式会社みかんは、各種広告の手配・ポスティングサービス・システム開発運用を提供する企業です。広告とテクノロジーで、ビジネスを誠実に支援します。'
};

export const navigation: NavItem[] = [
  { label: 'トップ', href: '/' },
  { label: 'サービス', href: '/services' },
  { label: '会社情報', href: '/company' },
  { label: 'お問い合わせ', href: '/contact' },
  { label: 'プライバシーポリシー', href: '/privacy' }
];

export const services: ServiceItem[] = [
  {
    title: '各種広告の手配',
    summary:
      '媒体選定から運用改善まで一貫して伴走し、目的達成に向けた広告施策を実行します。',
    details: [
      'テレビ・新聞・雑誌・交通・デジタルを横断した媒体プランニング',
      '予算・商圏・ターゲットに応じた実行プランの設計',
      '配信後のレポーティングと改善提案'
    ],
    accent: 'mikan'
  },
  {
    title: 'ポスティングサービス',
    summary:
      '地域密着の配布戦略を設計し、認知拡大から来店促進まで実行可能な施策を提供します。',
    details: [
      '商圏分析を踏まえた配布エリア設計',
      '配布品質の管理と進捗可視化',
      '反響データを活用した次回施策の最適化'
    ],
    accent: 'sky'
  },
  {
    title: 'システム開発、運用',
    summary:
      '業務課題に合わせたシステムを設計・開発し、運用改善まで継続的に支援します。',
    details: [
      '業務システム・Webアプリケーションの要件定義と開発',
      '既存サービスとのAPI連携・データ統合',
      '安定運用のための保守・監視・改善サイクル'
    ],
    accent: 'leaf'
  }
];

export const companyProfile: CompanyProfile = {
  name: '株式会社みかん',
  address: '東京都板橋区中台3-27-D-1003',
  ceo: '代表取締役 荒井宏明',
  founded: '2015年',
  industry: '広告業、システム開発業'
};

export const contactInfo: ContactInfo = {
  email: 'info@mikan-corp.jp',
  officeHours: '平日 9:00〜18:00',
  responseTime: '1営業日以内を目安にご返信します。'
};

export const homeHighlights = [
  {
    title: '広告とテクノロジーの統合提案',
    body: '広告運用とシステム設計を分断せず、成果に直結する実行計画へ落とし込みます。'
  },
  {
    title: '2015年設立の継続支援実績',
    body: '単発施策だけでなく、中長期で事業成長を支える運用体制を重視しています。'
  },
  {
    title: '迅速で誠実なコミュニケーション',
    body: '状況の見える化と論点整理を徹底し、判断しやすい情報をタイムリーに提供します。'
  }
];

export const policySections: PolicySection[] = [
  {
    title: '1. 個人情報の取得',
    body: '当社は、お問い合わせ対応に必要な範囲で氏名、連絡先、相談内容などの個人情報を適正に取得します。'
  },
  {
    title: '2. 利用目的',
    body: '取得した情報は、お問い合わせへの回答、サービス案内、運用改善のための分析にのみ利用します。'
  },
  {
    title: '3. 第三者提供',
    body: '法令に基づく場合を除き、ご本人の同意なく第三者に個人情報を提供しません。'
  },
  {
    title: '4. 安全管理',
    body: '個人情報への不正アクセス、漏えい、改ざん、滅失を防止するため、合理的な安全管理措置を講じます。'
  },
  {
    title: '5. 開示・訂正・削除等',
    body: 'ご本人からの請求があった場合、法令に従い合理的な期間と範囲で対応します。'
  },
  {
    title: '6. お問い合わせ窓口',
    body: '個人情報の取り扱いに関するお問い合わせは、info@mikan-corp.jp までご連絡ください。'
  }
];
