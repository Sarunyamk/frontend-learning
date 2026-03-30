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

  // Forms
  FORMS: '/features/forms',
  FORMS_BASIC: '/features/forms/basic',
  FORMS_MULTI_STEP: '/features/forms/multi-step',
  FORMS_DYNAMIC: '/features/forms/dynamic',
  FORMS_SERVER_ACTION: '/features/forms/server-action',
  FORMS_UPLOAD: '/features/forms/upload',
} as const;
