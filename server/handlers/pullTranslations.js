import config from '../../shared/locales/config';
const exec = require('child_process').exec;
import { Promise } from 'es6-promise';
import environmentConfig from '../../www/configs/environment';

class WtiPullTranslations {
  getFileUrlForLanguage(language) {
    const wtiUrl = `${config.wtiPath}/${config.apiKey}/files/${config.fileId}/locales/${language}`;
    return `-O ${__dirname}/../../shared/locales/${language}.json ${wtiUrl}`;
  }

  getWgetRequestsForLanguage(language) {
    return new Promise((resolve, reject) => {
      exec(`wget ${this.getFileUrlForLanguage(language)}`, (error, stdout, stderr) => {
        if (error) {
          reject(stderr);
        } else {
          resolve(language);
        }
      });
    });
  }

  getWgetRequestsForAllLanguages() {
    const requests = [];
    environmentConfig.availableLanguages.forEach((language) => {
      requests.push(this.getWgetRequestsForLanguage(language));
    });
    return requests;
  }

  pullTranslationsForAllLanguages() {
    return Promise.all(this.getWgetRequestsForAllLanguages());
  }
}

export default (req, res) => {
  const pullTranslations = new WtiPullTranslations();
  pullTranslations.pullTranslationsForAllLanguages()
    .then((values) => {
      res.status(200).send({
        status: 'OK',
        locales: values.join(', '),
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
