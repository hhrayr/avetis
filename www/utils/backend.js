import request from 'superagent';
import { Promise } from 'es6-promise';
import { getEnvironment } from './env';

const apiConfig = {
  local: {
    url: 'http://localhost:5050/api/',
  },
  production: {
    url: 'https://avet.is/api/',
  },
};

class Backend {
  getApiConfig() {
    const env = getEnvironment();
    let conf = apiConfig[env];
    if (!conf) {
      conf = apiConfig.production;
    }
    return conf;
  }

  sendGetRequestToApi(url, params) {
    const conf = this.getApiConfig();
    return new Promise((resolve, reject) => {
      const requestInstance = request('GET', `${conf.url}${url}`);
      requestInstance.accept('application/json');
      requestInstance.query(params);
      requestInstance.end((err, res) => {
        if (err) {
          reject(res.body);
        } else {
          resolve(res.body);
        }
      });
    });
  }

  sendPostRequestToApi(url, data) {
    const conf = this.getApiConfig();
    return new Promise((resolve, reject) => {
      const requestInstance = request('POST', `${conf.url}${url}`);
      requestInstance.accept('application/json');
      requestInstance.send(data);
      requestInstance.end((err, res) => {
        if (err) {
          reject(res.body);
        } else {
          resolve(res.body);
        }
      });
    });
  }
}

export default new Backend();
