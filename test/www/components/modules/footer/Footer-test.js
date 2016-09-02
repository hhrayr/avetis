import { createMockComponentContext } from 'fluxible/utils';
import expect from 'expect';
import jsdom from 'jsdom';
import mockery from 'mockery';
import { describe, it, beforeEach, afterEach } from 'mocha';
import EnvironmentStore from '../../../../../www/stores/EnvironmentStore';
import footerComponent from '../../../../../www/components/modules/footer/Footer';
import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import { provideContext } from 'fluxible-addons-react';

class MockEnvironmentStore extends EnvironmentStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.language = 'en';
  }
}
MockEnvironmentStore.storeName = 'EnvironmentStore';

describe('FooterComponent', () => {
  let componentContext;
  let Footer;

  beforeEach((done) => {
    mockery.enable({
      useCleanCache: true,
      warnOnUnregistered: false,
    });
    componentContext = createMockComponentContext({
      stores: [MockEnvironmentStore],
    });

    jsdom.env('<html><body></body></html>', [], (err, window) => {
      global.window = window;
      global.document = window.document;
      global.navigator = window.navigator;

      Footer = provideContext(footerComponent);

      done();
    });
  });

  afterEach(() => {
    delete global.window;
    delete global.document;
    delete global.navigator;
    mockery.disable();
  });

  it('should render', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
      <Footer context={componentContext} />
    );
    expect(component).toExist();
    done();
  });
});
