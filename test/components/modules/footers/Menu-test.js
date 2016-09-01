import { createMockComponentContext } from 'fluxible/utils';
import assert from 'assert';
import jsdom from 'jsdom';
import mockery from 'mockery';
import { describe, it, beforeEach, afterEach } from 'mocha';
import EnvironmentStore from '../../../../stores/EnvironmentStore';
import { RouteStore } from 'fluxible-router';
import fixtureData from './Footer-fixture';

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

describe('FooterMenuComponent', () => {
  let componentContext;
  let React;
  let ReactTestUtils;
  let provideContext;
  let Menu;

  beforeEach((done) => {
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
      Menu = require('../../../../components/modules/footers/Menu').default;
      Menu = provideContext(Menu);
      done();
    });
  });

  afterEach(() => {
    delete global.window;
    delete global.document;
    delete global.navigator;
    mockery.disable();
  });

  it('should render header and menu items', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
      <Menu context={componentContext} items={fixtureData.menu} />
    );

    const menuItems = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'a');

    assert.equal(fixtureData.menu.length, menuItems.length);
    assert.equal(fixtureData.menu[0].title, menuItems[0].textContent);
    assert.equal(`/en/${fixtureData.menu[0].link}`, menuItems[0].href);
    assert.equal(fixtureData.menu[2].link, menuItems[2].href);
    assert.equal(fixtureData.menu[3].link, menuItems[3].href);

    done();
  });
});
