import en from '@/translations/en.json';
import fr from '@/translations/fr.json';

export type Language = 'en' | 'fr';

const translations = {
  en,
  fr,
};

export function getTranslations(language: Language) {
  return translations[language] || translations.en;
}

export function createTranslator(language: Language) {
  const t = getTranslations(language);

  return function translate(key: string, fallback?: string): string {
    const keys = key.split('.');
    let value: any = t;

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }

    return value !== undefined ? value : (fallback || key);
  };
}
