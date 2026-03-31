export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',

  // Features
  FEATURES: '/features',

  // Payment
  PAYMENT: '/features/payment',
  PAYMENT_STRIPE: '/features/payment/stripe',
  PAYMENT_OMISE: '/features/payment/omise',

  // Socket.io
  SOCKET: '/features/socket',
  SOCKET_CHAT: '/features/socket/chat',
  SOCKET_STOCK: '/features/socket/stock',

  // Tailwind
  TAILWIND: '/features/tailwind',
  TAILWIND_TOKENS: '/features/tailwind/tokens',
  TAILWIND_THEMES: '/features/tailwind/themes',

  // NextAuth
  NEXT_AUTH: '/features/next-auth',
  NEXT_AUTH_SETUP: '/features/next-auth/setup',
  NEXT_AUTH_GOOGLE: '/features/next-auth/google-oauth',

  // Framer Motion
  FRAMER_MOTION: '/features/framer-motion',
  FRAMER_MOTION_EXAMPLES: '/features/framer-motion/examples',
  FRAMER_MOTION_SCROLL: '/features/framer-motion/scroll',
  FRAMER_MOTION_TRANSITIONS: '/features/framer-motion/transitions',

  // Forms
  FORMS: '/features/forms',
  FORMS_BASIC: '/features/forms/basic',
  FORMS_MULTI_STEP: '/features/forms/multi-step',
  FORMS_DYNAMIC: '/features/forms/dynamic',
  FORMS_UPLOAD: '/features/forms/upload',
} as const;

export const READY_FORM_PATHS = [
  ROUTES.FORMS_BASIC,
  ROUTES.FORMS_MULTI_STEP,
  ROUTES.FORMS_DYNAMIC,
  ROUTES.FORMS_UPLOAD,
] as const;

export const READY_TAILWIND_PATHS = [
  ROUTES.TAILWIND_TOKENS,
  ROUTES.TAILWIND_THEMES,
] as const;
