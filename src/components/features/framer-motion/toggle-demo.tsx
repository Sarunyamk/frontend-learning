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

export default function ToggleDemo() {
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
