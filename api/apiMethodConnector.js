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
    const area = this.getArea();
    if (area &&
      this.request.params &&
      this.request.params.method) {
      const apiMethodName = this.request.params.method.toLowerCase();
      const areaMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(area));
      let res = null;
      forEach(areaMethods, (areaMethodName) => {
        if (areaMethodName.toLowerCase() === apiMethodName) {
          res = area[areaMethodName];
          return false;
        }
        return true;
      });
      return res;
    }
    return null;
  }

  getArea() {
    if (this.request.params &&
      this.request.params.area) {
      const fileName =
        `${__dirname}/areas/` +
        `${this.request.params.area.toLowerCase()}.js`;
      try {
        return require(fileName).default;
      } catch (err) { return null; }
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
