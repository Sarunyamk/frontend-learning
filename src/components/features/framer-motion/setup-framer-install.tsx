import { InstallSection } from '@/components/shared/install-section';
import { FRAMER_INSTALL_SECTIONS } from '@/constants/framer-motion.constant';

export function FramerMotionSetupInstall() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Installation</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          ติดตั้ง framer-motion และ dependencies ที่จำเป็นสำหรับสร้าง animation
          ด้วย framer-motion
        </p>
      </div>

      {FRAMER_INSTALL_SECTIONS.map((section) => (
        <InstallSection key={section.title} section={section} />
      ))}
    </div>
  );
}
