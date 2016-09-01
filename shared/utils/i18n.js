import counterpart from 'counterpart';
counterpart.registerTranslations('en', require('../locales/en.json'));
counterpart.registerTranslations('ru', require('../locales/ru.json'));

export default function (language, id) {
  return counterpart(id, { locale: language });
}
