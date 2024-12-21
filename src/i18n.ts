import { isRef } from "vue";
import { createI18n } from "vue-i18n";
import { setLocale as setLocaleVeeValidate } from "@vee-validate/i18n";
import en from "./locales/en.json";
import es from "./locales/es.json";
import { setYupLocale } from './locales/yup';


import type { I18n, I18nOptions, Locale, VueI18n, Composer, I18nMode } from "vue-i18n";

function isComposer(instance: VueI18n | Composer, mode: I18nMode): instance is Composer {
  return mode === "composition" && isRef(instance.locale);
}

export function setLocale(i18n: I18n, locale: Locale): void {
  if (isComposer(i18n.global, i18n.mode)) {
    i18n.global.locale.value = locale;
  } else {
    i18n.global.locale = locale;
  }
    setLocaleVeeValidate(locale);
    setYupLocale(locale);
}

export function setupI18n(options: I18nOptions): I18n {
  const i18n = createI18n(options);
  setI18nLanguage(i18n, options.locale!);
  return i18n;
}

export function setI18nLanguage(i18n: I18n, locale: Locale): void {
  setLocale(i18n, locale);
  document.querySelector("html")!.setAttribute("lang", locale);
}

function getInitialLocale() {
  const cookie = /(^|;) ?LOCALE=([^;]*)(;|$)/.exec(document.cookie);

  const navigatorLanguage = navigator.language ? navigator.language.split("-")[0] : "en";

  return cookie?.[2] ?? navigatorLanguage ?? import.meta.env.VITE_I18N_LOCALE;
}

export const i18n = setupI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE ?? "en",
  silentTranslationWarn: true,
  messages: {
    en,
    es,
  },
});
