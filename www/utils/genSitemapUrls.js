import pathToRegexp from 'path-to-regexp';
import environment from '../configs/environment';
import filter from 'lodash/filter';

const basepath = 'https://www.drive-now.com';

function genAlternates(path, pathLanguage) {
  const alternateLanguages = filter(environment.availableLanguages, (language) => {
    return language !== pathLanguage;
  });

  return alternateLanguages.map((language) => {
    return {
      rel: 'alternate',
      hreflang: language,
      href: basepath + pathToRegexp.compile(path)({ language }),
    };
  });
}

export default function (route, urlmap) {
  if (!route.sitemap) return;

  const keys = pathToRegexp(route.path).keys;

  if (!keys[0]) {
    urlmap({
      loc: basepath + route.path,
    });
  } else if (keys[0].name === 'language') {
    environment.availableLanguages.forEach((language) => {
      urlmap({
        loc: basepath + pathToRegexp.compile(route.path)({ language }),
      }, genAlternates(route.path, language));
    });
  }
}
