import { AppSidebar } from '@/components/sidebar/sidebar';

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
