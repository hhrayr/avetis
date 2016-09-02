import { createMockComponentContext } from 'fluxible/utils';
import expect from 'expect';
import jsdom from 'jsdom';
import mockery from 'mockery';
import { describe, it, beforeEach, afterEach } from 'mocha';
import EnvironmentStore from '../../../www/stores/EnvironmentStore';
import tslComponent from '../../../www/components/Tsl';
import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import { provideContext } from 'fluxible-addons-react';

class MockEnvironmentStore extends EnvironmentStore {
  getLanguage() {
    return 'en';
  }
}
MockEnvironmentStore.storeName = 'EnvironmentStore';

describe('Test Tsl Component', () => {
  let componentContext;
  let Tsl;

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

      Tsl = provideContext(tslComponent);

      done();
    });
  });

  afterEach(() => {
    delete global.window;
    delete global.document;
    delete global.navigator;
    mockery.disable();
  });

  it('should render component', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
      <Tsl context={componentContext} id="generics.about.us" />
    );
    expect(ReactTestUtils.findRenderedDOMComponentWithTag(component, 'span').innerHTML)
      .toEqual('About Us');
    done();
  });

  it('should render missing translations', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
      <Tsl context={componentContext} id="invalid.invalid" />
    );
    expect(ReactTestUtils.findRenderedDOMComponentWithTag(component, 'span').innerHTML)
      .toEqual('missing translation: en.invalid.invalid');
    done();
  });
});
