import { createMockComponentContext } from 'fluxible/utils';
import assert from 'assert';
import jsdom from 'jsdom';
import mockery from 'mockery';
import { describe, it, beforeEach, afterEach } from 'mocha';
import EnvironmentStore from '../../../../stores/EnvironmentStore';

class MockEnvironmentStore extends EnvironmentStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.content = {
      language: 'en',
      city: 'munich',
    };
  }
}
MockEnvironmentStore.storeName = 'EnvironmentStore';

describe('HeaderComponent', () => {
  let componentContext;
  let React;
  let ReactTestUtils;
  let provideContext;
  let Header;

  const fixture = {
    fullHeadline: 'test headline {price} {bonusMinutes}',
    price: 'test price',
    bonusMinutes: 'test bonus',
    expectedTextContent: 'test headline test price test bonus',
  };

  beforeEach((done) => {
    mockery.enable({
      useCleanCache: true,
      warnOnUnregistered: false,
    });
    componentContext = createMockComponentContext({
      stores: [MockEnvironmentStore],
    });
    mockery.registerAllowables(['../components/Tsl']);

    jsdom.env('<html><body></body></html>', [], (err, window) => {
      global.window = window;
      global.document = window.document;
      global.navigator = window.navigator;

      // React must be required after window is set
      React = require('react');
      ReactTestUtils = require('react/lib/ReactTestUtils');
      provideContext = require('fluxible-addons-react/provideContext');
      Header = require('../../../../components/registration/Header').default;
      Header = provideContext(Header);

      done();
    });
  });

  afterEach(() => {
    delete global.window;
    delete global.document;
    delete global.navigator;
    mockery.disable();
  });

  it('should render Component', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
        <Header context={componentContext} />
    );
    assert(ReactTestUtils.findRenderedComponentWithType(component, Header));
    done();
  });

  it('should render proper text', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
        <Header context={componentContext}
          fullHeadline={fixture.fullHeadline}
          price={fixture.price}
          bonusMinutes={fixture.bonusMinutes}
        />
      );
    const headerDomNode = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'h2');
    assert.equal(fixture.expectedTextContent, headerDomNode.textContent);
    done();
  });
});
