'use client';

import { CustomButton } from '@/components/shared/ui-primitives/custom-button';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export function LoadingButtonPreview() {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
  }

  return (
    <CustomButton onClick={handleClick} disabled={loading}>
      {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
      {loading ? 'Saving...' : 'Save Changes'}
    </CustomButton>
  );
}
