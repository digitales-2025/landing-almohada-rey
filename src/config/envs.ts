import '../../envConfig';

import { z } from 'zod';

type GeneralEnvVars = {
    // NODE_ENV: NODE_ENV;
    // PORT: string;
    // DATABASE_URL: string;
    // WEB_URL: string;
    // JWT_SECRET: string;
    // JWT_EXPIRES_IN: string;
    // JWT_REFRESH_SECRET: string;
    // JWT_REFRESH_EXPIRES_IN: string;
    // COOKIE_EXPIRES_IN: string;
    // COOKIE_REFRESH_EXPIRES_IN: string;
    // MAIL_HOST: string;
    // MAIL_PORT: string;
    // MAIL_USER: string;
    // MAIL_PASS: string;
    // NEXT_PUBLIC_BACKEND_URL: string;
    // INTERNAL_BACKEND_URL: string;
    NEXT_PUBLIC_WHATSAPP_NUMBER: string;
    NEXT_PUBLIC_BASE_WHATSSAPP_URL: string;
};

const schema = z
    .object({
        // NODE_ENV: z.enum(['development', 'production', 'test']),
        // PORT: z.string(),
        // DATABASE_URL: z.string(),
        // WEB_URL: z.string(),
        // JWT_SECRET: z.string(),
        // JWT_EXPIRES_IN: z.string(),
        // JWT_REFRESH_SECRET: z.string(),
        // JWT_REFRESH_EXPIRES_IN: z.string(),
        // COOKIE_EXPIRES_IN: z.string(),
        // COOKIE_REFRESH_EXPIRES_IN: z.string(),
        // MAIL_HOST: z.string(),
        // MAIL_PORT: z.string(),
        // MAIL_USER: z.string(),
        // MAIL_PASS: z.string(),
        // NEXT_PUBLIC_BACKEND_URL: z.string(),
        // INTERNAL_BACKEND_URL: z.string(),
        NEXT_PUBLIC_WHATSAPP_NUMBER: z.string(),
        NEXT_PUBLIC_BASE_WHATSSAPP_URL: z.string(),
    })
    .passthrough() satisfies z.ZodType<Partial<GeneralEnvVars>>;

const result = schema.safeParse({
    NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
    NEXT_PUBLIC_BASE_WHATSSAPP_URL: process.env.NEXT_PUBLIC_BASE_WHATSSAPP_URL,
});

if (!result.success) {
    throw new Error(`Config validation error: ${result.error.message}`);
}

const envVars = result.data;

/**
 * IMPORTANTE: SOLO USAR PARA VARIABLES QUE NO TENGAN EL PREFIJO: "NEXT_PUBLIC"
 */
export const envs: GeneralEnvVars = {
    // NODE_ENV: envVars.NODE_ENV,
    // PORT: envVars.PORT,
    // DATABASE_URL: envVars.DATABASE_URL,
    // WEB_URL: envVars.WEB_URL,
    // JWT_SECRET: envVars.JWT_SECRET,
    // JWT_EXPIRES_IN: envVars.JWT_EXPIRES_IN,
    // JWT_REFRESH_SECRET: envVars.JWT_REFRESH_SECRET,
    // JWT_REFRESH_EXPIRES_IN: envVars.JWT_REFRESH_EXPIRES_IN,
    // COOKIE_EXPIRES_IN: envVars.COOKIE_EXPIRES_IN,
    // COOKIE_REFRESH_EXPIRES_IN: envVars.COOKIE_REFRESH_EXPIRES_IN,
    // MAIL_HOST: envVars.MAIL_HOST,
    // MAIL_PORT: envVars.MAIL_PORT,
    // MAIL_USER: envVars.MAIL_USER,
    // MAIL_PASS: envVars.MAIL_PASS,
    // NEXT_PUBLIC_BACKEND_URL: envVars.NEXT_PUBLIC_BACKEND_URL,
    // INTERNAL_BACKEND_URL: envVars.INTERNAL_BACKEND_URL,
    NEXT_PUBLIC_WHATSAPP_NUMBER: envVars.NEXT_PUBLIC_WHATSAPP_NUMBER,
    NEXT_PUBLIC_BASE_WHATSSAPP_URL: envVars.NEXT_PUBLIC_BASE_WHATSSAPP_URL,
};
