import expect from 'expect';
import jsdom from 'jsdom';
import {
  describe,
  it,
  beforeEach,
  afterEach,
} from 'mocha';
const featureFlags = require('../../../shared/utils/featureFlags');

describe('FeatureFlagUtility', () => {
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
    expect(featureFlags.getFeatureFlags()).toEqual(Fixture.enabledFeatures);
    done();
  });

  it('should check if a feature is enabled', (done) => {
    featureFlags.getFeatureFlags = () => {
      return Fixture.enabledFeatures;
    };

    expect(featureFlags.isEnabled('mapi', 'beti')).toEqual(true);
    expect(featureFlags.isEnabled('mapi', 'prod')).toEqual(false);
    done();
  });

  it('should return not-enabled for an unknown feature', (done) => {
    featureFlags.getFeatureFlags = () => {
      return Fixture.enabledFeatures;
    };
    expect(featureFlags.isEnabled('unknown', 'beti')).toEqual(false);
    done();
  });
});
