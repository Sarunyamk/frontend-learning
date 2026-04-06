import { InstallSection } from '@/components/shared/install-section';
import {
  PAGINATION_INSTALL_SECTIONS
} from '@/constants/custom-patterns/setup-install-pattern';

export function PaginationSetupInstall() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Installation</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          ติดตั้ง shadcn-ui และ dependencies ที่จำเป็นสำหรับ Pagination ด้วย
        </p>
      </div>

      {PAGINATION_INSTALL_SECTIONS.map((section) => (
        <InstallSection key={section.title} section={section} />
      ))}
    </div>
  );
}
