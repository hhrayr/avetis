export default {
  staticRoutes: {
    home: {
      path: '/:language',
      method: 'get',
    },
    homeLocal: {
      path: '/:language/:city',
      method: 'get',
    },
  },
  environment: {
    availableLanguages: ['en', 'de'],
    availableCities: {
      berlin: {
        languages: ['de', 'en'],
      },
      cologne: {
        languages: ['de', 'en'],
      },
      dusseldorf: {
        languages: ['de', 'en'],
      },
      hamburg: {
        languages: ['de', 'en'],
      },
      munich: {
        languages: ['de', 'en'],
      },
      vienna: {
        languages: ['de', 'en'],
      },
      london: {
        languages: ['en'],
      },
      copenhagen: {
        languages: ['da', 'en'],
      },
      stockholm: {
        languages: ['sv', 'en'],
      },
    },
  },
};
