'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
const TABS = ['Home', 'About', 'Contact'] as const;

export default function TabDemo() {
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
