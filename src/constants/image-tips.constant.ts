export const UPLOAD_TIPS = [
  {
    title: 'next.config.ts — Body Size Limit',
    description:
      'Server Action มี body size limit default 1MB ถ้า upload ไฟล์ใหญ่ต้องเพิ่ม limit',
    code: `// next.config.ts
export default {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};`,
  },
  {
    title: 'next.config.ts — Remote Images',
    description:
      'ถ้าใช้ next/image แสดงรูปจาก external URL (เช่น S3, Cloudinary) ต้องเพิ่ม remotePatterns',
    code: `// next.config.ts
export default {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'your-bucket.s3.amazonaws.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
};`,
  },
  {
    title: 'API Route — Custom Body Parser',
    description:
      'ถ้าใช้ Route Handler (app/api/) แทน Server Action ต้องปิด default body parser แล้วใช้ FormData',
    code: `// app/api/upload/route.ts
export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  // save to disk / upload to S3 / Cloudinary
}`,
  },
  {
    title: 'Production — ใช้ Cloud Storage',
    description:
      'ห้ามเก็บไฟล์ใน local filesystem ใน production ใช้ S3, Cloudinary, หรือ Vercel Blob แทน',
    code: `// ตัวอย่าง Vercel Blob
import { put } from '@vercel/blob';

const blob = await put(file.name, file, {
  access: 'public',
});
// blob.url → URL ของไฟล์ที่ upload แล้ว`,
  },
] as const;
