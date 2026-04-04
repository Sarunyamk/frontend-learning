import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { SingleDateSection } from '@/components/features/custom-patterns/calendar/single/single-section';
import { DateRangeSection } from '@/components/features/custom-patterns/calendar/range/range-section';
import { TwoDatesSection } from '@/components/features/custom-patterns/calendar/two-dates/two-dates-section';
import { MonthYearSection } from '@/components/features/custom-patterns/calendar/month-year/month-year-section';
import { WithTimeSection } from '@/components/features/custom-patterns/calendar/with-time/with-time-section';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureMetadata } from '@/lib/seo/features-metadata';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) return {};
  return getFeatureMetadata(category);
}

export default async function CalendarPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) notFound();

  return (
    <div className="space-y-6">
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
      <SingleDateSection />
      <DateRangeSection />
      <TwoDatesSection />
      <MonthYearSection />
      <WithTimeSection />
    </div>
  );
}
