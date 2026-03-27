// scripts/setBuildTime.mjs
import { execSync } from 'node:child_process';
import fs from 'node:fs';

let buildTime;

try {
  buildTime = execSync('git log -1 --format=%cI', {
    encoding: 'utf-8',
  }).trim();
} catch {
  buildTime = new Date().toISOString();
}

// อ่าน .env.local เดิม แล้วอัปเดตเฉพาะ NEXT_PUBLIC_BUILD_TIME
const envPath = '.env.local';
let content = '';

try {
  content = fs.readFileSync(envPath, 'utf-8');
} catch {
  // ไม่มีไฟล์ — สร้างใหม่
}

const key = 'NEXT_PUBLIC_BUILD_TIME';
const lines = content.split('\n').filter((line) => !line.startsWith(`${key}=`));
lines.push(`${key}=${buildTime}`);

fs.writeFileSync(envPath, lines.filter(Boolean).join('\n') + '\n');
