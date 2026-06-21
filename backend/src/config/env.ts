import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3333),
  API_PREFIX: z.string().min(1).default("/api"),
  CORS_ORIGIN: z.string().min(1).default("http://localhost:3000"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  JWT_SECRET: z.string().min(32, "JWT_SECRET must have at least 32 characters"),
  JWT_EXPIRES_IN: z.string().min(1).default("1d"),
  PASSWORD_RESET_TOKEN_TTL_MINUTES: z.coerce.number().int().positive().default(30),
  UPLOAD_DIR: z.string().min(1).default("uploads"),
  MAX_UPLOAD_SIZE_MB: z.coerce.number().int().positive().default(5),
  GROQ_API_KEY: z.string().min(1, "GROQ_API_KEY is required")
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables", parsedEnv.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsedEnv.data;
