import { createMockComponentContext } from 'fluxible/utils';
import assert from 'assert';
import jsdom from 'jsdom';
import mockery from 'mockery';
import { describe, it, beforeEach, afterEach } from 'mocha';
import ContentStore from '../../../../stores/ContentStore';
import fixtureData from './Footer-fixture';
import EnvironmentStore from '../../../../stores/EnvironmentStore';
import { RouteStore } from 'fluxible-router';

class MockContentStore extends ContentStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.content = {
      footer: fixtureData,
    };
  }
  getRambutanContent(id) {
    return this.content[id] || null;
  }
}
MockContentStore.storeName = 'ContentStore';

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
MockRouteStore = MockRouteStore.withStaticRoutes(fixtureData.staticRoutes);

describe('FooterComponent', () => {
  let componentContext;
  let React;
  let ReactTestUtils;
  let Footer;
  let Menu;
  let Apps;
  let Address;
  let SocialButtons;
  let provideContext;

  beforeEach((done) => {
    mockery.enable({
      useCleanCache: true,
      warnOnUnregistered: false,
    });
    componentContext = createMockComponentContext({
      stores: [MockContentStore, MockRouteStore, MockEnvironmentStore],
    });
    jsdom.env('<html><body></body></html>', [], (err, window) => {
      global.window = window;
      global.document = window.document;
      global.navigator = window.navigator;

      // React must be required after window is set
      React = require('react');
      ReactTestUtils = require('react/lib/ReactTestUtils');
      provideContext = require('fluxible-addons-react/provideContext');

      Footer = require('../../../../components/modules/footers/Footer').default;
      Menu = require('../../../../components/modules/footers/Menu').default;
      Apps = require('../../../../components/modules/footers/Apps').default;
      Address = require('../../../../components/modules/footers/Address').default;
      SocialButtons = require('../../../../components/modules/footers/SocialButtons').default;
      Footer = provideContext(Footer);

      done();
    });
  });

  afterEach(() => {
    delete global.window;
    delete global.document;
    delete global.navigator;
    mockery.disable();
  });

  it('should render all required sub component if data is provided', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
      <Footer context={componentContext} />
    );
    assert(ReactTestUtils.findRenderedDOMComponentWithClass(component, 'footer-section'));
    assert(ReactTestUtils.findRenderedComponentWithType(component, Menu));
    assert(ReactTestUtils.findRenderedComponentWithType(component, Apps));
    assert(ReactTestUtils.findRenderedComponentWithType(component, Address));
    assert(ReactTestUtils.findRenderedComponentWithType(component, SocialButtons));
    done();
  });
});
