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

  it('is should find the correct Api method', (done) => {
    request(app)
      .get('/api/test/pingpong')
      .expect(200)
      .end(() => {
        request(app)
          .get('/api/test/invalidMethod')
          .expect(406)
          .end(() => {
            request(app)
              .get('/api/invalidArea/invalidMethod')
              .expect(406)
              .end(done);
          });
      });
  });

  it('is should return request data for Get', (done) => {
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

  it('is should return request data for Post', (done) => {
    request(app)
      .get('/api/test/pingpong')
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
});
