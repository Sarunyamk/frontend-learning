import { InstallSection } from '@/components/shared/install-section';
import { FORM_INSTALL_SECTIONS } from '@/constants/form-ready-to-use.constant';

export function FormSetupInstall() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Installation</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          ติดตั้ง shadcn-ui และ dependencies ที่จำเป็นสำหรับสร้างฟอร์มด้วย
          react-hook-form และ zod
        </p>
      </div>

      {FORM_INSTALL_SECTIONS.map((section) => (
        <InstallSection key={section.title} section={section} />
      ))}
    </div>
  );
}
