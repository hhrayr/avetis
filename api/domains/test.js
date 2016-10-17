import apiError from '../apiError';

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
}

export default new Test();
