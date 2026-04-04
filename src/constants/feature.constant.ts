import { ROUTES } from './route.constant';

export const FEATURE_CATEGORY = {
  PAYMENT: 'payment',
  SOCKET: 'socket',
  TAILWIND: 'tailwind',
  NEXT_AUTH: 'next-auth',
  FRAMER_MOTION: 'framer-motion',
  FORMS: 'forms',
  CUSTOM_PATTERNS: 'custom-patterns',
} as const;

export type FeatureCategory =
  (typeof FEATURE_CATEGORY)[keyof typeof FEATURE_CATEGORY];

export type FeatureItem = {
  readonly key: string;
  readonly label: string;
  readonly path: string;
  readonly group?: string;
};

export type FeatureCategoryConfig = {
  readonly key: FeatureCategory;
  readonly label: string;
  readonly description: string;
  readonly icon: string;
  readonly path: string;
  readonly items: readonly FeatureItem[];
};

export const FEATURE_CATEGORIES: readonly FeatureCategoryConfig[] = [
  {
    key: FEATURE_CATEGORY.PAYMENT,
    label: 'Payment',
    description: 'Stripe & Omise payment integration comparison',
    icon: 'CreditCard',
    path: ROUTES.PAYMENT,
    items: [
      { key: 'stripe', label: 'Stripe', path: ROUTES.PAYMENT_STRIPE },
      { key: 'omise', label: 'Omise', path: ROUTES.PAYMENT_OMISE },
    ],
  },
  {
    key: FEATURE_CATEGORY.SOCKET,
    label: 'Socket.io',
    description: 'Real-time communication with WebSockets',
    icon: 'Radio',
    path: ROUTES.SOCKET,
    items: [
      { key: 'chat', label: 'Real-time Chat', path: ROUTES.SOCKET_CHAT },
      { key: 'stock', label: 'Stock Ticker', path: ROUTES.SOCKET_STOCK },
      { key: 'quiz', label: 'Mini Kahoot Quiz', path: ROUTES.SOCKET_QUIZ },
    ],
  },
  {
    key: FEATURE_CATEGORY.TAILWIND,
    label: 'Tailwind CSS',
    description: 'Design tokens, theming, and setup patterns',
    icon: 'Palette',
    path: ROUTES.TAILWIND,
    items: [
      { key: 'tokens', label: 'Setup Tokens', path: ROUTES.TAILWIND_TOKENS },
      { key: 'themes', label: 'Setup Themes', path: ROUTES.TAILWIND_THEMES },
    ],
  },
  {
    key: FEATURE_CATEGORY.NEXT_AUTH,
    label: 'NextAuth',
    description: 'Authentication setup with Auth.js v5',
    icon: 'Shield',
    path: ROUTES.NEXT_AUTH,
    items: [
      { key: 'setup', label: 'Auth Setup', path: ROUTES.NEXT_AUTH_SETUP },
      {
        key: 'google-oauth',
        label: 'Google OAuth',
        path: ROUTES.NEXT_AUTH_GOOGLE,
      },
      {
        key: 'protected',
        label: 'Protected & RBAC',
        path: ROUTES.NEXT_AUTH_PROTECTED,
      },
      { key: 'session', label: 'Session Info', path: ROUTES.NEXT_AUTH_SESSION },
    ],
  },
  {
    key: FEATURE_CATEGORY.FRAMER_MOTION,
    label: 'Framer Motion',
    description: 'Animation patterns and examples',
    icon: 'Sparkles',
    path: ROUTES.FRAMER_MOTION,
    items: [
      {
        key: 'examples',
        label: 'Animation Examples',
        path: ROUTES.FRAMER_MOTION_EXAMPLES,
      },
      {
        key: 'scroll',
        label: 'Scroll Animations',
        path: ROUTES.FRAMER_MOTION_SCROLL,
      },
      {
        key: 'transitions',
        label: 'Page Transitions',
        path: ROUTES.FRAMER_MOTION_TRANSITIONS,
      },
    ],
  },
  {
    key: FEATURE_CATEGORY.FORMS,
    label: 'Form Patterns',
    description:
      'react-hook-form + zod + shadcn — basic, multi-step, dynamic, upload',
    icon: 'ClipboardList',
    path: ROUTES.FORMS,
    items: [
      { key: 'basic', label: 'Basic Form', path: ROUTES.FORMS_BASIC },
      {
        key: 'multi-step',
        label: 'Multi-step Form',
        path: ROUTES.FORMS_MULTI_STEP,
      },
      { key: 'dynamic', label: 'Dynamic Fields', path: ROUTES.FORMS_DYNAMIC },
      { key: 'upload', label: 'File Upload', path: ROUTES.FORMS_UPLOAD },
      {
        key: 'ready-to-use',
        label: 'Ready to Use',
        path: ROUTES.FORMS_READY_TO_USE,
      },
    ],
  },
  {
    key: FEATURE_CATEGORY.CUSTOM_PATTERNS,
    label: 'Custom Patterns',
    description: 'Copy-paste ready component patterns with live demo + code',
    icon: 'Puzzle',
    path: ROUTES.CUSTOM_PATTERNS,
    items: [
      // UI Components
      {
        key: 'button',
        label: 'Button',
        path: ROUTES.CUSTOM_PATTERNS_BUTTON,
        group: 'UI Components',
      },
      {
        key: 'loading',
        label: 'Loading',
        path: ROUTES.CUSTOM_PATTERNS_LOADING,
        group: 'UI Components',
      },
      {
        key: 'toast',
        label: 'Toast',
        path: ROUTES.CUSTOM_PATTERNS_TOAST,
        group: 'UI Components',
      },
      {
        key: 'modal',
        label: 'Modal',
        path: ROUTES.CUSTOM_PATTERNS_MODAL,
        group: 'UI Components',
      },
      {
        key: 'calendar',
        label: 'Calendar',
        path: ROUTES.CUSTOM_PATTERNS_CALENDAR,
        group: 'UI Components',
      },
      {
        key: 'swiper',
        label: 'Swiper',
        path: ROUTES.CUSTOM_PATTERNS_SWIPER,
        group: 'UI Components',
      },
      // Animation
      {
        key: 'scroll-bar',
        label: 'Scroll Bar',
        path: ROUTES.CUSTOM_PATTERNS_SCROLL_BAR,
        group: 'Animation',
      },
      {
        key: 'cursor-animation',
        label: 'Cursor',
        path: ROUTES.CUSTOM_PATTERNS_CURSOR_ANIMATION,
        group: 'Animation',
      },
      {
        key: 'background-animation',
        label: 'Background',
        path: ROUTES.CUSTOM_PATTERNS_BACKGROUND_ANIMATION,
        group: 'Animation',
      },
      {
        key: 'text',
        label: 'Text',
        path: ROUTES.CUSTOM_PATTERNS_TEXT,
        group: 'Animation',
      },
      // Navigation
      {
        key: 'nav-link',
        label: 'Nav Link',
        path: ROUTES.CUSTOM_PATTERNS_NAV_LINK,
        group: 'Navigation',
      },
      // Data Display
      {
        key: 'pagination',
        label: 'Pagination',
        path: ROUTES.CUSTOM_PATTERNS_PAGINATION,
        group: 'Data Display',
      },
      {
        key: 'table-action',
        label: 'Table Action',
        path: ROUTES.CUSTOM_PATTERNS_TABLE_ACTION,
        group: 'Data Display',
      },
      // Pages
      {
        key: 'error',
        label: 'Error',
        path: ROUTES.CUSTOM_PATTERNS_ERROR,
        group: 'Pages',
      },
      {
        key: 'not-found',
        label: 'Not Found',
        path: ROUTES.CUSTOM_PATTERNS_NOT_FOUND,
        group: 'Pages',
      },
      // Setup Guides
      {
        key: 'env-setting',
        label: 'Env Setting',
        path: ROUTES.CUSTOM_PATTERNS_ENV_SETTING,
        group: 'Setup Guides',
      },
      {
        key: 'code-shiki',
        label: 'Code Shiki',
        path: ROUTES.CUSTOM_PATTERNS_CODE_SHIKI,
        group: 'Setup Guides',
      },
      {
        key: 'font-setting',
        label: 'Font Setting',
        path: ROUTES.CUSTOM_PATTERNS_FONT_SETTING,
        group: 'Setup Guides',
      },
    ],
  },
] as const;
