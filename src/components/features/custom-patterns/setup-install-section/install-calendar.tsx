import { InstallSection } from '@/components/shared/install-section';
import { CALENDAR_INSTALL_SECTIONS } from '@/constants/custom-patterns/setup-install-pattern';

export function CalendarSetupInstall() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Installation</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          ติดตั้ง shadcn-ui และ dependencies ที่จำเป็นสำหรับ Calendar ด้วย
        </p>
      </div>

      {CALENDAR_INSTALL_SECTIONS.map((section) => (
        <InstallSection key={section.title} section={section} />
      ))}
    </div>
  );
}
