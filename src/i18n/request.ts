import {getRequestConfig} from 'next-intl/server';
import {Formats, hasLocale} from 'next-intl';
import {routing} from './routing';
 
export default getRequestConfig(async ({requestLocale}) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
 
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});

export const formats = {
  dateTime: {
    short: {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }
  },
  number: {
    precise: {
      maximumFractionDigits: 5
    }
  },
  list: {
    enumeration: {
      style: 'long',
      type: 'conjunction'
    }
  }
} satisfies Formats;

// export const formats = {
//   date: {
//     short: {
//       day: '2-digit',
//       month: '2-digit',
//       year: '2-digit'
//     },
//     long: {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric'
//     }
//   },
//   time: {
//     short: {
//       hour: '2-digit',
//       minute: '2-digit'
//     },
//     long: {
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit'
//     }
//   },
//   number: {
//     currency: {
//       style: 'currency',
//       currency: 'USD',
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2
//     },
//     percent: {
//       style: 'percent',
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2
//     }
//   }
// };
// export type Formats = typeof formats;