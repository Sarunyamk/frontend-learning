'use client';

import { CodeBlock } from '@/components/tailwind/code-block';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  TRANSITION_EXAMPLES,
  TRANSITION_READY_TO_USE_CODES,
} from '@/constants/framer-motion.constant';
import { ROUTES } from '@/constants/route.constant';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useState } from 'react';

const TABS = ['Home', 'About', 'Contact'] as const;

const STEPS = [
  { title: 'Step 1', description: 'ข้อมูลส่วนตัว' },
  { title: 'Step 2', description: 'ที่อยู่' },
  { title: 'Step 3', description: 'ยืนยัน' },
] as const;

const fadeSlide: Variants = {
  hidden: { opacity: 0, x: 30 },
  show: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

// Demo 1: Tab switching with AnimatePresence
function TabDemo() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>('Home');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Tab Switching</CardTitle>
        <CardDescription>
          เปลี่ยน tab แล้ว content fade + slide — ใช้ mode=&quot;wait&quot;
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          {TABS.map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>
        <div className="relative min-h-20 overflow-hidden rounded-lg bg-muted/50 p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm font-medium">{activeTab} Page</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Content สำหรับ {activeTab}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}

// Demo 2: Multi-step with variants
function StepDemo() {
  const [step, setStep] = useState(0);

  const handleNext = useCallback(() => {
    setStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : 0));
  }, []);

  const handlePrev = useCallback(() => {
    setStep((prev) => (prev > 0 ? prev - 1 : STEPS.length - 1));
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Multi-step with Variants</CardTitle>
        <CardDescription>
          ใช้ fadeSlide variant ที่มี exit state — content เลื่อนออกซ้าย
          เข้าจากขวา
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePrev}>
            Prev
          </Button>
          <span className="text-sm text-muted-foreground">
            {step + 1} / {STEPS.length}
          </span>
          <Button variant="outline" size="sm" onClick={handleNext}>
            Next
          </Button>
        </div>
        <div className="relative min-h-20 overflow-hidden rounded-lg bg-muted/50 p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={fadeSlide}
              initial="hidden"
              animate="show"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm font-medium">{STEPS[step].title}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {STEPS[step].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}

// Demo 3: Toggle (show/hide)
function ToggleDemo() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Toggle Show/Hide</CardTitle>
        <CardDescription>
          AnimatePresence จัดการ exit animation เมื่อ element ถูก unmount
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? 'Hide' : 'Show'}
        </Button>
        <div className="relative min-h-20 overflow-hidden rounded-lg bg-muted/50 p-4">
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="rounded-md bg-primary p-4 text-sm text-primary-foreground"
              >
                Toggle content — กด Hide เพื่อดู exit animation
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}

export function PageTransitions() {
  return (
    <div className="space-y-10">
      {/* Live demos */}
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

      {/* Ready to Use */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Ready to Use</h2>
        <p className="text-sm text-muted-foreground">
          Copy ไปใช้ได้เลย — fadeSlide variant + StepTransition component
        </p>
        <div className="space-y-3">
          {TRANSITION_READY_TO_USE_CODES.map((item) => (
            <Collapsible key={item.name}>
              <Card>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer select-none transition-colors hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform [[data-state=open]>div>&]:rotate-90" />
                      <div className="min-w-0">
                        <CardTitle className="text-sm">{item.name}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                        <p className="font-mono text-xs text-muted-foreground/60">
                          {item.filePath}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent>
                    <CodeBlock code={item.code} language="typescript" />
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>
      </section>

      {/* Used in project */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">
          Used in Project
        </h2>
        <p className="text-sm text-muted-foreground">
          AnimatePresence ถูกใช้จริงในโปรเจกต์นี้ — กดเพื่อดูตัวอย่าง
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Multi-step Form</CardTitle>
              <CardDescription>
                เปลี่ยน step แล้ว content slide เข้า-ออก ด้วย StepTransition
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" asChild>
                <Link href={ROUTES.FORMS_MULTI_STEP}>
                  ดูตัวอย่าง
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Image Upload</CardTitle>
              <CardDescription>
                Preview รูปมี fade + scale animation เมื่อเพิ่มหรือลบ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" asChild>
                <Link href={ROUTES.FORMS_UPLOAD}>
                  ดูตัวอย่าง
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Code examples */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Code Examples</h2>
        <div className="space-y-6">
          {TRANSITION_EXAMPLES.map((example) => (
            <Card key={example.name}>
              <CardHeader>
                <CardTitle className="text-sm">{example.name}</CardTitle>
                <CardDescription>{example.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock code={example.code} language="tsx" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
