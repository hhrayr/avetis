const environment = {
  availableLanguages: ['en', 'ru'],
  defaults: {
    language: 'en',
  },
};

export default environment;

export function isValidRoute(language) {
  if (!language) {
    return false;
  }
  if (environment.availableLanguages.indexOf(language) === -1) {
    return false;
  }
  return true;
}

export function getLanguageByCountry(country) {
  if (country === 'RU' || country === 'KZ') {
    return 'ru';
  }
  return 'en';
}
