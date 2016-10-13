import request from 'superagent';
import { Promise } from 'es6-promise';
import { getEnvironment } from '../../shared/utils/env';

const config = {
  local: {
    url: 'http://localhost:5050/api/',
  },
  production: {
    url: 'https://www.avet.is/api/',
  },
};

class Proxy {
  sendContactUsEmail(payload) {
    return this._sendApiPostRequest('email/sendContactUs', payload);
  }

  _sendApiGetRequest(url, params) {
    return new Promise((resolve, reject) => {
      request('GET', this._resolveApiUrl(url))
        .accept('application/json')
        .set('api-tocken', 'WEB-SITE-PROXY')
        .query(params)
        .end((err, res) => {
          if (err) {
            reject(res.body);
          } else {
            resolve(res.body);
          }
        });
    });
  }

  _sendApiPostRequest(url, data, params) {
    return new Promise((resolve, reject) => {
      request('POST', this._resolveApiUrl(url))
        .accept('application/json')
        .set('api-tocken', 'WEB-SITE-PROXY')
        .query(params)
        .send(data)
        .end((err, res) => {
          if (err) {
            reject(res.body);
          } else {
            resolve(res.body);
          }
        });
    });
  }

  _resolveApiUrl(url) {
    const apiConf = this._getApiConfig();
    return `${apiConf.url}${url.toLowerCase()}`;
  }

  _getApiConfig() {
    return config[getEnvironment()];
  }
}

export default new Proxy();
