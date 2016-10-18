import request from 'supertest';
import { describe, it, beforeEach, afterEach } from 'mocha';
import app from '../../server/server';

describe('Api Connector', () => {
  let server;
  const localTestIp = '::ffff:127.0.0.1';

  beforeEach((done) => {
    server = app.listen(6002, '0.0.0.0');
    done();
  });

  afterEach(() => {
    server.close();
  });

  it('should find the correct api method', (done) => {
    request(app)
      .get('/api/test/pingpong')
      .expect(200)
      .end(done);
  });

  it('should return 406 if the given api domain or/and method is not found', (done) => {
    request(app)
      .get('/api/test/invalidMethod')
      .expect(406)
      .end(() => {
        request(app)
          .get('/api/invalidDomain/invalidMethod')
          .expect(406)
          .end(done);
      });
  });

  it('should return request data for Get', (done) => {
    request(app)
      .get('/api/test/pingpong')
      .set('api-tocken', 'test-api-tocken')
      .query('test-param-name=test-param-value')
      .expect(200)
      .expect({
        __IP: localTestIp,
        __TOKEN: 'test-api-tocken',
        'test-param-name': 'test-param-value',
      })
      .end(done);
  });

  it('should return request data for Post', (done) => {
    request(app)
      .post('/api/test/pingpong')
      .set('api-tocken', 'test-api-tocken')
      .query('test-param-name=test-param-value')
      .send({
        param1: 'value1',
        param2: 'value2',
      })
      .expect(200)
      .expect({
        __IP: localTestIp,
        __TOKEN: 'test-api-tocken',
        'test-param-name': 'test-param-value',
        param1: 'value1',
        param2: 'value2',
      })
      .end(done);
  });

  it('should return correct error for GET', (done) => {
    request(app)
      .get('/api/test/errorwithcode')
      .set('api-tocken', 'test-api-tocken')
      .query('errorMessage=test-error-message&errorStatusCode=567')
      .expect(567)
      .expect({
        error: { message: 'test-error-message' },
      })
      .end(done);
  });

  it('should return correct error for POST', (done) => {
    request(app)
      .post('/api/test/errorwithcode')
      .set('api-tocken', 'test-api-tocken')
      .send({
        errorMessage: 'test-error-message-post',
        errorStatusCode: 678,
      })
      .expect(678)
      .expect({
        error: { message: 'test-error-message-post' },
      })
      .end(done);
  });

  it('should return correct error with details for POST', (done) => {
    request(app)
      .post('/api/test/errorwithcode')
      .set('api-tocken', 'test-api-tocken')
      .send({
        errorMessage: 'test-error-message-post',
        errorStatusCode: 789,
        errorDetails: { filed1: 'value1', field2: { value: '2' } },
      })
      .expect(789)
      .expect({
        error: {
          message: 'test-error-message-post',
          details: { filed1: 'value1', field2: { value: '2' } },
        },
      })
      .end(done);
  });

  it('should return promise request data for Get', (done) => {
    request(app)
      .get('/api/test/promisePingPong')
      .set('api-tocken', 'test-api-tocken')
      .query('test-param-name=test-param-value')
      .expect(200)
      .expect({
        __IP: localTestIp,
        __TOKEN: 'test-api-tocken',
        'test-param-name': 'test-param-value',
      })
      .end(done);
  });

  it('should return promise request data for Post', (done) => {
    request(app)
      .post('/api/test/promisepingpong')
      .set('api-tocken', 'test-api-tocken')
      .query('test-param-name=test-param-value')
      .send({
        param1: 'value1',
        param2: 'value2',
      })
      .expect(200)
      .expect({
        __IP: localTestIp,
        __TOKEN: 'test-api-tocken',
        'test-param-name': 'test-param-value',
        param1: 'value1',
        param2: 'value2',
      })
      .end(done);
  });

  it('should return correct promise error for POST', (done) => {
    request(app)
      .post('/api/test/errorpromisewithcode')
      .set('api-tocken', 'test-api-tocken')
      .send({
        errorMessage: 'test-error-message-post',
        errorStatusCode: 678,
      })
      .expect(678)
      .expect({
        error: { message: 'test-error-message-post' },
      })
      .end(done);
  });

  it('should return correct promise error with details for POST', (done) => {
    request(app)
      .post('/api/test/errorpromisewithcode')
      .set('api-tocken', 'test-api-tocken')
      .send({
        errorMessage: 'test-error-message-post',
        errorStatusCode: 789,
        errorDetails: { filed1: 'value1', field2: { value: '2' } },
      })
      .expect(789)
      .expect({
        error: {
          message: 'test-error-message-post',
          details: { filed1: 'value1', field2: { value: '2' } },
        },
      })
      .end(done);
  });
});
