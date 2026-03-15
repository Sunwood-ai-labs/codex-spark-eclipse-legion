import { defineConfig } from 'vitepress';

const repoName = 'codex-spark-eclipse-legion';
const base = process.env.GITHUB_ACTIONS ? `/${repoName}/` : '/';
const asset = (path: string) => `${base}${path.replace(/^\//, '')}`;

const sharedHead = [
  ['link', { rel: 'icon', href: asset('/legion-mark.svg') }],
  ['meta', { property: 'og:type', content: 'website' }],
  ['meta', { property: 'og:title', content: 'Codex Spark Eclipse Legion' }],
  [
    'meta',
    {
      property: 'og:description',
      content:
        'Summon named Spark subagents with explicit ownership and teammate-by-teammate reporting.',
    },
  ],
  ['meta', { property: 'og:image', content: asset('/legion-og.svg') }],
] as const;

const englishSidebar = [
  {
    text: 'Guide',
    items: [
      { text: 'Getting Started', link: '/guide/getting-started' },
      { text: 'Usage', link: '/guide/usage' },
      { text: 'Architecture', link: '/guide/architecture' },
      { text: 'Troubleshooting', link: '/guide/troubleshooting' },
    ],
  },
];

const japaneseSidebar = [
  {
    text: 'ガイド',
    items: [
      { text: '導入手順', link: '/ja/guide/getting-started' },
      { text: '使い方', link: '/ja/guide/usage' },
      { text: '構成', link: '/ja/guide/architecture' },
      { text: 'トラブルシューティング', link: '/ja/guide/troubleshooting' },
    ],
  },
];

export default defineConfig({
  title: 'Codex Spark Eclipse Legion',
  description:
    'Summon named Spark subagents with explicit ownership and teammate-by-teammate reporting.',
  lang: 'en-US',
  base,
  cleanUrls: true,
  lastUpdated: true,
  head: sharedHead,
  themeConfig: {
    logo: '/legion-mark.svg',
    search: {
      provider: 'local',
    },
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      title: 'Codex Spark Eclipse Legion',
      description:
        'Summon named Spark subagents with explicit ownership and teammate-by-teammate reporting.',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/guide/getting-started' },
          { text: 'Japanese', link: '/ja/' },
        ],
        sidebar: {
          '/guide/': englishSidebar,
        },
        footer: {
          message: 'Released under the MIT License.',
          copyright: 'Codex Spark Eclipse Legion',
        },
        docFooter: {
          prev: 'Previous page',
          next: 'Next page',
        },
        outline: {
          label: 'On this page',
        },
      },
    },
    ja: {
      label: '日本語',
      lang: 'ja-JP',
      link: '/ja/',
      title: 'Codex Spark Eclipse Legion',
      description:
        '明確な担当分担とチームメイト単位の報告で Spark サブエージェントを召喚する Codex スキルです。',
      themeConfig: {
        nav: [
          { text: 'ガイド', link: '/ja/guide/getting-started' },
          { text: 'English', link: '/' },
        ],
        sidebar: {
          '/ja/guide/': japaneseSidebar,
        },
        footer: {
          message: 'MIT License で提供しています。',
          copyright: 'Codex Spark Eclipse Legion',
        },
        docFooter: {
          prev: '前のページ',
          next: '次のページ',
        },
        outline: {
          label: 'このページ',
        },
      },
    },
  },
});

