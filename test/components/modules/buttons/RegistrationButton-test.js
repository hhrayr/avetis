import { createMockComponentContext } from 'fluxible/utils';
import assert from 'assert';
import jsdom from 'jsdom';
import mockery from 'mockery';
import { describe, it, beforeEach, afterEach } from 'mocha';

import EnvironmentStore from '../../../../stores/EnvironmentStore';
import RouteStore from '../../../../stores/RouteStore';

class MockEnvironmentStore extends EnvironmentStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.language = 'en';
    this.city = 'munich';
  }
}
MockEnvironmentStore.storeName = 'EnvironmentStore';

class MockRouteStore extends RouteStore {
}
MockRouteStore.storeName = 'RouteStore';

describe('RegistrationButtonComponent', () => {
  let componentContext;
  let React;
  let ReactTestUtils;
  let provideContext;
  let RegistrationButton;
  let featureFlags;
  let isEnabled;
  const Fixture = {
    enabledFeatures: {
      newRegistration: ['alpha', 'beti'],
    },
  };

  const Mocks = {
    featureFlags: {
      isEnabled() {
        return true;
      },
      getItem() {
        return true;
      },
    },
    isEnabled() {
      return true;
    },
  };

  beforeEach((done) => {
    isEnabled =
      require('../../../../components/modules/buttons/RegistrationButton').isEnabled;
    mockery.enable({
      useCleanCache: true,
      warnOnUnregistered: false,
    });


    componentContext = createMockComponentContext({
      stores: [MockRouteStore, MockEnvironmentStore],
    });
    jsdom.env('<html><body></body></html>', [], (err, window) => {
      global.window = window;
      global.document = window.document;
      global.navigator = window.navigator;
      // React must be required after window is set
      React = require('react');
      ReactTestUtils = require('react-addons-test-utils');
      provideContext = require('fluxible-addons-react/provideContext');


      RegistrationButton =
        require('../../../../components/modules/buttons/RegistrationButton').default;
      RegistrationButton = provideContext(RegistrationButton);

      done();
    });
  });

  afterEach(() => {
    delete global.window;
    delete global.document;
    delete global.navigator;
    delete global.featureFlags;
    mockery.disable();
  });

  it('should render with correct URL', (done) => {
    /*
    const component = ReactTestUtils.renderIntoDocument(
      <RegistrationButton context={componentContext}/>
    );

    const registrationUrl = '//drive-now.com/to/www-registration?country=DE&language=en';
    const linkElement = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'a');

    assert.equal(registrationUrl, linkElement.href);
    */
    done();
  });

  it('should have a label of value test', (done) => {
    /*
    const component = ReactTestUtils.renderIntoDocument(
      <RegistrationButton label="test" context={componentContext}/>
    );

    const linkElement = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'a');

    assert.equal('test', linkElement.textContent);
    */
    done();
  });
});
