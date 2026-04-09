import { MonthYearSection } from '@/components/features/custom-patterns/calendar/month-year/month-year-section';
import { DateRangeSection } from '@/components/features/custom-patterns/calendar/range/range-section';
import { SingleDateSection } from '@/components/features/custom-patterns/calendar/single/single-section';
import { TwoDatesSection } from '@/components/features/custom-patterns/calendar/two-dates/two-dates-section';
import { WithTimeSection } from '@/components/features/custom-patterns/calendar/with-time/with-time-section';
import { CalendarSetupInstall } from '@/components/features/custom-patterns/setup-install-section/install-calendar';
import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureItemMetadata } from '@/lib/seo/features-metadata';
import { buildFeatureBreadcrumb } from '@/lib/utils/build-jsonLd.helper';
import { notFound } from 'next/navigation';

const ITEM_KEY = 'calendar';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) return {};
  const item = category.items.find((i) => i.key === ITEM_KEY);
  if (!item) return {};
  return getFeatureItemMetadata(category, item);
}

export default async function CalendarPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) notFound();
  const item = category.items.find((i) => i.key === ITEM_KEY);
  const breadcrumbJsonLd = buildFeatureBreadcrumb(category, item);

  return (
    <div className="space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <FeatureBreadcrumb category={category} subItem="Calendar" />
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Calendar Patterns
        </h1>
        <p className="mt-2 text-muted-foreground">
          Date picker components — Single, Range, Two dates, Month/Year
          dropdown, Date+Time พร้อมใช้งานทันที
        </p>
      </div>
      <CalendarSetupInstall />
      <SingleDateSection />
      <DateRangeSection />
      <TwoDatesSection />
      <MonthYearSection />
      <WithTimeSection />
    </div>
  );
}
