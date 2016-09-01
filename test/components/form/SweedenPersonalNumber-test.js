import expect from 'expect';
import { createMockComponentContext } from 'fluxible/utils';
import jsdom from 'jsdom';
import mockery from 'mockery';
import { describe, it, beforeEach, afterEach } from 'mocha';
import EnvironmentStore from '../../../stores/EnvironmentStore';

class MockEnvironmentStore extends EnvironmentStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.language = 'se';
    this.city = 'stockholm';
  }
}
MockEnvironmentStore.storeName = 'EnvironmentStore';

describe('SwedenPersonalNumber', () => {
  let componentContext;
  let React;
  let ReactTestUtils;
  let provideContext;
  let SwedenPersonalNumber;
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

      SwedenPersonalNumber = require('../../../components/form/SwedenPersonalNumber').default;
      SwedenPersonalNumber = provideContext(SwedenPersonalNumber);

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
      <SwedenPersonalNumber
        context={componentContext}
        id="test-sweden-personal-number"
      />
    );

    const inputComponent = ReactTestUtils.findRenderedComponentWithType(component, Input);
    const buttonComponent = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'button');


    expect(inputComponent).toExist();
    expect(buttonComponent).toExist();

    done();
  });

  it('should render with error', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
      <SwedenPersonalNumber
        context={componentContext}
        id="test-sweden-personal-number"
        error="test-sweden-personal-number-error"
        isInValid={true}
      />
    );

    const inputComponent = ReactTestUtils.findRenderedComponentWithType(component, Input);
    expect(inputComponent.props.isInValid).toEqual(true);
    expect(inputComponent.props.error).toEqual('test-sweden-personal-number-error');

    const errorDomNode = ReactTestUtils.findRenderedDOMComponentWithClass(
      inputComponent, 'content-message');
    expect(errorDomNode.textContent).toEqual('test-sweden-personal-number-error');

    done();
  });

  it('should render as validated and without button', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
      <SwedenPersonalNumber
        context={componentContext}
        id="test-sweden-personal-number"
        isValidated={true}
      />
    );

    const inputComponent = ReactTestUtils.findRenderedComponentWithType(component, Input);
    const buttonComponents = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'button');

    expect(inputComponent).toExist();
    expect(buttonComponents.length).toEqual(0);

    done();
  });
});
