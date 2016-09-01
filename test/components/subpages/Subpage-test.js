import { createMockComponentContext } from 'fluxible/utils';
import assert from 'assert';
import jsdom from 'jsdom';
import mockery from 'mockery';
import ContentStore from '../../../stores/ContentStore';
import RouteStore from '../../../stores/RouteStore';
import EnvironmentStore from '../../../stores/EnvironmentStore';
import Fixtures from './Subpage-fixture';
import { describe, it, beforeEach, afterEach } from 'mocha';

class MockContentStore extends ContentStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.content = {
      subpage: Fixtures,
    };
  }
  getRambutanContent(id) {
    return this.content[id] || null;
  }
}
MockContentStore.storeName = 'ContentStore';

class MockRouteStore extends RouteStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.route = {
      page: 'subpage',
    };
  }
  getCurrentRoute() {
    return this.route;
  }
}
MockRouteStore.storeName = 'RouteStore';

class MockEnvironmentStore extends EnvironmentStore {
    constructor(dispatcher) {
      super(dispatcher);
      this.content = {
        language: 'de',
        city: 'munich',
      };
    }
}
MockEnvironmentStore.storeName = 'EnvironmentStore';

describe('SubpageComponent', () => {
  let componentContext;
  let React;
  let ReactTestUtils;
  let provideContext;
  let Subpage;

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

      Subpage = require('../../../components/Subpage').default;
      Subpage = provideContext(Subpage);

      done();
    });
  });

  afterEach(() => {
    delete global.window;
    delete global.document;
    delete global.navigator;
    mockery.disable();
  });

  it('should render provided content with a headline and body text', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
        <Subpage context={componentContext} />
    );
    const headerElement = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'h2');
    const bodyElement = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'body-text');

    assert(ReactTestUtils.findRenderedComponentWithType(component, Subpage));
    assert.equal(Fixtures.title, headerElement.textContent);
    assert.equal(Fixtures.body, bodyElement.innerHTML);
    done();
  });
});
