import StepDemo from './step-demo';
import TabDemo from './tab-demo';
import ToggleDemo from './toggle-demo';

export function PageTransitions() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">Live Demos</h2>
      <p className="text-sm text-muted-foreground">
        ลองกด interact กับแต่ละ demo เพื่อดู AnimatePresence ทำงาน
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        <TabDemo />
        <StepDemo />
        <ToggleDemo />
      </div>
    </section>
  );
}
