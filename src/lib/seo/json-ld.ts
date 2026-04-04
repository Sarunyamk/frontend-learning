import { BASE_URL } from '@/constants/important.constant';
import { SITE_NAME } from '@/lib/seo/seo.constant';

export function getWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: BASE_URL,
    description:
      'เรียนรู้ Next.js 16 + TypeScript แบบ best practice ผ่านตัวอย่าง feature จริง ตั้งแต่ Payment, Auth, Real-time ไปจนถึง Animation',
    inLanguage: 'th',
  };
}

export function getEducationalJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: `${SITE_NAME} — Next.js 16 + TypeScript`,
    description:
      'เรียนรู้ Next.js 16 + TypeScript แบบ best practice ผ่านตัวอย่าง feature จริง ตั้งแต่ Payment, Auth, Real-time ไปจนถึง Animation สามารถนำไปใช้กับโปรเจกต์จริงได้ทันที',
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: BASE_URL,
    },
    educationalLevel: 'Intermediate',
    programmingLanguage: 'TypeScript',
    isAccessibleForFree: true,
  };
}
