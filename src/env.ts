import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    NEXTAUTH_SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_CALLBACK_URL: z.string(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_PUBLIC_CALLBACK_URL: process.env.NEXT_PUBLIC_CALLBACK_URL,
  },
});
