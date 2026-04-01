import { FeatureBreadcrumb } from '@/components/shared/feature-breadcrumb';
import { MultiUploadForm } from '@/components/features/form/multi-upload-form';
import { SingleUploadForm } from '@/components/features/form/single-upload-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { UPLOAD_TIPS } from '@/constants/image-tips.constant';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureMetadata } from '@/lib/seo/features-metadata';
import { Info } from 'lucide-react';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.FORMS);
  if (!category) return {};
  return getFeatureMetadata(category);
}

export default async function UploadPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.FORMS);
  if (!category) notFound();

  return (
    <div className="space-y-6">
      <FeatureBreadcrumb category={category} subItem="File Upload" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Single Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Single Image Upload</CardTitle>
            <CardDescription>
              เลือกรูป 1 รูป — preview, validate type/size
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SingleUploadForm />
          </CardContent>
        </Card>

        {/* Multi Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Multiple Image Upload</CardTitle>
            <CardDescription>
              เลือกหลายรูป — preview grid, เพิ่ม/ลบทีละรูป (max 4)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MultiUploadForm />
          </CardContent>
        </Card>
      </div>

      {/* Tips Section */}
      <div className="space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <Info className="h-5 w-5 text-primary" />
          Next.js File Upload — Configuration Tips
        </h2>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {UPLOAD_TIPS.map((tip) => (
            <Card key={tip.title} className="border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">{tip.title}</CardTitle>
                <CardDescription className="text-xs">
                  {tip.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="overflow-x-auto rounded-md bg-muted p-3 text-xs">
                  <code>{tip.code}</code>
                </pre>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
