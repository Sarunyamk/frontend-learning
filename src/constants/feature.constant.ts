import { ROUTES } from './route.constant';

export const FEATURE_CATEGORY = {
  PAYMENT: 'payment',
  SOCKET: 'socket',
  TAILWIND: 'tailwind',
  NEXT_AUTH: 'next-auth',
  FRAMER_MOTION: 'framer-motion',
} as const;

export type FeatureCategory =
  (typeof FEATURE_CATEGORY)[keyof typeof FEATURE_CATEGORY];

export type FeatureItem = {
  readonly key: string;
  readonly label: string;
  readonly path: string;
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
      { key: 'stock', label: 'Stock Updates', path: ROUTES.SOCKET_STOCK },
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
    ],
  },
] as const;
