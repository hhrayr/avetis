import { createMockComponentContext } from 'fluxible/utils';
import assert from 'assert';
import jsdom from 'jsdom';
import mockery from 'mockery';
import { describe, it, beforeEach, afterEach } from 'mocha';

import EnvironmentStore from '../../stores/EnvironmentStore';

class MockFooStore extends EnvironmentStore {
  getLanguage() {
    return 'de';
  }
}
MockFooStore.storeName = 'EnvironmentStore';

describe('Test Tsl Component', () => {
  let componentContext;
  let React;
  let ReactTestUtils;
  let Tsl;
  let provideContext;

  beforeEach((done) => {
    mockery.enable({
      useCleanCache: true,
      warnOnUnregistered: false,
    });
    componentContext = createMockComponentContext({
      stores: [MockFooStore],
    });
    jsdom.env('<html><body></body></html>', [], (err, window) => {
      global.window = window;
      global.document = window.document;
      global.navigator = window.navigator;

      // React must be required after window is set
      React = require('react');
      ReactTestUtils = require('react/lib/ReactTestUtils');
      provideContext = require('fluxible-addons-react/provideContext');

      Tsl = require('../../components/Tsl').default;

      Tsl = provideContext(Tsl);

      done();
    });
  });

  afterEach(() => {
    delete global.window;
    delete global.document;
    delete global.navigator;
    mockery.disable();
  });

  it('should call context executeAction when context provided via React context', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
      <Tsl context={componentContext} id="generics.cities.vienna" />
    );
    assert.equal('Wien', ReactTestUtils
    .findRenderedDOMComponentWithTag(component, 'span').innerHTML);
    done();
  });
});
