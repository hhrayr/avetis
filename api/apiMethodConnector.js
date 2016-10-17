import { merge, forEach } from 'lodash';

class ApiMethodConnector {
  constructor(request) {
    this.request = request;
  }

  invokeApiMethod() {
    const method = this.getMethod();
    if (method) {
      try {
        return {
          statusCode: 200,
          result: method(this.getMethodArguments()),
        };
      } catch (err) {
        const statusCode = err && err.statusCode ? err.statusCode : 500;
        const error = { message: err.message || 'internal server error' };
        if (err.details) {
          error.details = err.details;
        }
        return {
          statusCode,
          result: { error },
        };
      }
    }
    return {
      statusCode: 406,
      result: { error: { message: 'method not found' } },
    };
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
