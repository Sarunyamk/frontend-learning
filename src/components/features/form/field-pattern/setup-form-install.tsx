import { InstallSection } from '@/components/shared/install-section';
import { FORM_INSTALL_SECTIONS_PATTERN2 } from '@/constants/form-ready-to-use-pattern2.constant';

export function FormFieldSetupInstall() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Installation</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          ติดตั้ง shadcn-ui และ dependencies ที่จำเป็นสำหรับสร้างฟอร์มด้วย
          react-hook-form และ zod
        </p>
      </div>

      {FORM_INSTALL_SECTIONS_PATTERN2.map((section) => (
        <InstallSection key={section.title} section={section} />
      ))}
    </div>
  );
}
