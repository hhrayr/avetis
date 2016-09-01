import assert from 'assert';
import jsdom from 'jsdom';
import {
  describe,
  it,
  beforeEach,
  afterEach,
} from 'mocha';

describe('FeatureFlagUtility', () => {
  let featureFlags;
  const Fixture = {
    enabledFeatures: {
      mapi: ['alpha', 'beti'],
    },
  };

  const Mocks = {
    localStorage: {
      getItem(enabledFeatures) {
        return Fixture[enabledFeatures];
      },
    },
    JSON: {
      parse(value) {
        return value;
      },
    },
  };

  beforeEach((done) => {
    jsdom.env('<html><body></body></html>', [], (err, window) => {
      global.window = window;
      global.window.localStorage = Mocks.localStorage;
      global.JSON.parse = Mocks.JSON.parse;
      global.document = window.document;
      global.navigator = window.navigator;
      global.featureFlags = Fixture.enabledFeatures;
      featureFlags = require('../../utils/featureFlags');
      done();
    });
  });

  afterEach(() => {
    delete global.window;
    delete global.document;
    delete global.navigator;
    delete global.featureFlags;
  });

  it('should return available features', (done) => {
    assert(featureFlags);
    assert.equal(Fixture.enabledFeatures, featureFlags.getFeatureFlags());
    done();
  });

  it('should check if a feature is enabled', (done) => {
    featureFlags.getFeatureFlags = function getFeatureFlagsMock() {
      return Fixture.enabledFeatures;
    };

    assert.equal(featureFlags.isEnabled('mapi', 'beti'), true);
    assert.equal(featureFlags.isEnabled('mapi', 'prod'), false);
    done();
  });

  it('should return not-enabled for an unknown feature', (done) => {
    featureFlags.getFeatureFlags = function getFeatureFlagsMock() {
      return Fixture.enabledFeatures;
    };
    assert.equal(featureFlags.isEnabled('unknown', 'beti'), false);
    done();
  });
});
