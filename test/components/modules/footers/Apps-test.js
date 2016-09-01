import { createMockComponentContext } from 'fluxible/utils';
import assert from 'assert';
import jsdom from 'jsdom';
import mockery from 'mockery';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { RouteStore } from 'fluxible-router';
import EnvironmentStore from '../../../../stores/EnvironmentStore';

class MockEnvironmentStore extends EnvironmentStore {
}
MockEnvironmentStore.storeName = 'EnvironmentStore';

class MockRouteStore extends RouteStore {
}
MockRouteStore.storeName = 'RouteStore';

describe('FooterAppsComponent', () => {
  let componentContext;
  let provideContext;
  let React;
  let ReactTestUtils;
  let Apps;
  const fixture = require('./Footer-fixture').default;

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
      Apps = require('../../../../components/modules/footers/Apps').default;
      Apps = provideContext(Apps);
      done();
    });
  });

  afterEach(() => {
    delete global.window;
    delete global.document;
    delete global.navigator;
    mockery.disable();
  });

  it('should render header and apps link list', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
      <Apps
        context={componentContext}
        items={fixture.apps}
        header={fixture.appsHeader}
      />
    );
    assert.equal(fixture.appsHeader,
      ReactTestUtils.findRenderedDOMComponentWithClass(component, 'app-header').innerHTML);
    assert.equal(fixture.apps.length,
      ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'app-item').length);
    done();
  });
});
