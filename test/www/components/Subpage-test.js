import { createMockComponentContext } from 'fluxible/utils';
import expect from 'expect';
import jsdom from 'jsdom';
import mockery from 'mockery';
import RouteStore from '../../../www/stores/RouteStore';
import EnvironmentStore from '../../../www/stores/EnvironmentStore';
import { describe, it, beforeEach, afterEach } from 'mocha';
import subpageComponent from '../../../www/components/Subpage';
import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import { provideContext } from 'fluxible-addons-react';

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
      language: 'en',
    };
  }
}
MockEnvironmentStore.storeName = 'EnvironmentStore';

describe('SubpageComponent', () => {
  let componentContext;
  let Subpage;

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

      Subpage = provideContext(subpageComponent);

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

    expect(headerElement.textContent).toEqual('content.title.subpage');
    expect(bodyElement.innerHTML).toEqual('content.body.subpage');
    done();
  });
});
