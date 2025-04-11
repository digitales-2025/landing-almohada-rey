import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  'no-restricted-imports': [
    'error',
    {
      name: 'next/link',
      message: 'Please import from `@/i18n/navigation` instead.'
    },
    {
      name: 'next/navigation',
      importNames: ['redirect', 'permanentRedirect', 'useRouter', 'usePathname'],
      message: 'Please import from `@/i18n/navigation` instead.'
    }
  ]
  // Run expensive, type-aware linting only on CI
  //"@typescript-eslint/no-misused-promises": process.env.CI ? "error" : "off",
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // Consistently import navigation APIs from `@/i18n/navigation`
];

export default eslintConfig;
