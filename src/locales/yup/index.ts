import en from './en';
import es from './es';
import { setLocale } from 'yup';

const locales = {
  en,
  es,
};

export function setYupLocale(locale: string) {
    const yupLocale = locales[locale as keyof typeof locales];
    if (yupLocale) {
      setLocale(yupLocale);
    }
  }