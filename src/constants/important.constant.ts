import { clientEnv } from "@/lib/env/env.client";

export const BASE_URL = clientEnv.NEXT_PUBLIC_BASE_URL;
export const LOGO_URL = `${BASE_URL}/logo.png`;
// export const GA_ID = clientEnv.NEXT_PUBLIC_GA_ID;
