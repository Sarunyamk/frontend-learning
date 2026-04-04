export type MockUser = {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'Active' | 'Inactive';
  department: string;
  joinedAt: string;
  bio: string;
};

const NAMES = [
  'สมชาย วงศ์สวัสดิ์', 'สมหญิง จันทร์เพ็ญ', 'วิชัย ศรีสุข',
  'พิมพ์ใจ รักดี', 'ธนากร แสงทอง', 'นภา พลอยงาม',
  'อนุชา เจริญผล', 'กมลวรรณ สุขสม', 'ปรีชา มั่นคง',
  'สุดา แก้วมณี', 'วรพล ชัยวัฒน์', 'จิราพร ศิริมงคล',
  'เกียรติศักดิ์ ดวงดี', 'รัตนา ทองคำ', 'ภาคิน ลิ้มเจริญ',
  'พัชรี บุญมี', 'ณัฐวุฒิ สายลม', 'อัจฉรา พูลทรัพย์',
  'สราวุธ เรืองศรี', 'มาลี ดอกไม้', 'กิตติพงศ์ วิไลลักษณ์',
  'ปวีณา อินทร์แก้ว', 'วสันต์ ภูมิพัฒน์', 'จันทิมา สีทอง',
  'อดิศร ประเสริฐ', 'สุภาพร น้ำใจดี', 'ชาตรี กล้าหาญ',
  'ดวงใจ เพชรงาม', 'วีระ สมบูรณ์', 'พิชญา แจ่มจันทร์',
];

const DEPARTMENTS = [
  'Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance',
];

const ROLES: MockUser['role'][] = ['Admin', 'Editor', 'Viewer'];
const STATUSES: MockUser['status'][] = ['Active', 'Inactive'];

export const MOCK_USERS: readonly MockUser[] = NAMES.map((name, i) => ({
  id: i + 1,
  name,
  email: `user${i + 1}@example.com`,
  role: ROLES[i % ROLES.length],
  status: STATUSES[i % 5 === 0 ? 1 : 0],
  department: DEPARTMENTS[i % DEPARTMENTS.length],
  joinedAt: new Date(2023, i % 12, (i % 28) + 1).toISOString().split('T')[0],
  bio: `${name} ทำงานในแผนก ${DEPARTMENTS[i % DEPARTMENTS.length]} มีประสบการณ์ด้าน ${DEPARTMENTS[i % DEPARTMENTS.length]} มากกว่า ${(i % 5) + 1} ปี`,
}));
