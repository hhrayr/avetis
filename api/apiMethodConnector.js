import { merge, forEach } from 'lodash';

class ApiMethodConnector {
  constructor(request) {
    this.request = request;
  }

  invokeApiMethod(callback) {
    const method = this.getMethod();
    if (method) {
      try {
        const methodResult = method(this.getMethodArguments());
        if (!this.checkAndInvokePromiseMethodResult(methodResult, callback)) {
          callback({
            statusCode: 200,
            result: methodResult,
          });
        }
      } catch (err) {
        const error = this.getNormalizedError(err);
        callback({
          statusCode: err.statusCode || 500,
          result: { error },
        });
      }
    } else {
      callback({
        statusCode: 406,
        result: { error: { message: 'method not found' } },
      });
    }
  }

  checkAndInvokePromiseMethodResult(methodResult, callback) {
    if (this.isPromiseMethodResult(methodResult)) {
      methodResult
        .then((res) => {
          callback({
            statusCode: 200,
            result: res,
          });
        })
        .catch((err) => {
          const error = this.getNormalizedError(err);
          callback({
            statusCode: err.statusCode || 500,
            result: { error },
          });
        });
      return true;
    }
    return false;
  }

  isPromiseMethodResult(methodResult) {
    return methodResult &&
      typeof methodResult.then === 'function' &&
      typeof methodResult.catch === 'function';
  }

  getNormalizedError(err) {
    const error = merge({}, err);
    if (error.hasOwnProperty('statusCode')) {
      delete error.statusCode;
    }
    return error;
  }

  getMethod() {
    const domain = this.getDomain();
    if (domain &&
      this.request.params &&
      this.request.params.method) {
      const apiMethodName = this.request.params.method.toLowerCase();
      const domainMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(domain));
      let res = null;
      forEach(domainMethods, (domainMethodName) => {
        if (domainMethodName.toLowerCase() === apiMethodName) {
          res = domain[domainMethodName];
          return false;
        }
        return true;
      });
      return res;
    }
    return null;
  }

  getDomain() {
    if (this.request.params &&
      this.request.params.domain) {
      const fileName =
        `${__dirname}/domains/` +
        `${this.request.params.domain.toLowerCase()}.js`;
      try {
        return require(fileName).default;
      } catch (err) {
        console.log('error loading api domain', err);
        return null;
      }
    }
    return null;
  }

  getMethodArguments() {
    if (this.request) {
      return merge({
        __TOKEN: this.request.get('api-tocken'),
        __IP: this.request.get('true-client-ip') || this.request.ip,
      },
      this.request.body,
      this.request.query);
    }
    return null;
  }
}

export default ApiMethodConnector;
