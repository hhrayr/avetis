import expect from 'expect';
import { createMockComponentContext } from 'fluxible/utils';
import jsdom from 'jsdom';
import mockery from 'mockery';
import { describe, it, beforeEach, afterEach } from 'mocha';
import EnvironmentStore from '../../../stores/EnvironmentStore';

class MockEnvironmentStore extends EnvironmentStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.language = 'en';
    this.city = 'munich';
  }
}
MockEnvironmentStore.storeName = 'EnvironmentStore';

describe('PromocodeComponent', () => {
  let componentContext;
  let React;
  let ReactTestUtils;
  let provideContext;
  let Promocode;
  let Input;

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

      // React must be required after window is set
      React = require('react');
      ReactTestUtils = require('react/lib/ReactTestUtils');
      provideContext = require('fluxible-addons-react/provideContext');

      Promocode = require('../../../components/form/Promocode').default;
      Promocode = provideContext(Promocode);

      Input = require('../../../components/form/Input').default;

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
      <Promocode
        context={componentContext}
        id="test-promocode"
        canAcceptPromocode={true}
      />
    );

    const inputComponent = ReactTestUtils.findRenderedComponentWithType(component, Input);
    const buttonComponent = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'button');


    expect(inputComponent).toExist();
    expect(buttonComponent).toExist();

    done();
  });
});
