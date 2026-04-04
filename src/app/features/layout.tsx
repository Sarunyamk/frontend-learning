import { AppSidebar } from '@/components/sidebar/sidebar';

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <main className="min-w-0 flex-1 px-6 py-6 md:px-10 lg:px-12">{children}</main>
    </div>
  );
}
