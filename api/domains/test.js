import apiError from '../apiError';
import { Promise } from 'es6-promise';

class Test {
  pingPong(payload) {
    return payload;
  }

  errorWithCode(payload) {
    throw apiError(
      payload.errorMessage,
      payload.errorStatusCode,
      payload.errorDetails);
  }

  promisePingPong(payload) {
    return new Promise((resolve) => {
      resolve(payload);
    });
  }

  errorPromiseWithCode(payload) {
    return new Promise((reslove, reject) => {
      reject(apiError(
        payload.errorMessage,
        payload.errorStatusCode,
        payload.errorDetails));
    });
  }
}

export default new Test();
