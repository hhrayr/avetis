import expect from 'expect';
import { createMockComponentContext } from 'fluxible/utils';
import jsdom from 'jsdom';
import mockery from 'mockery';
import { describe, it, beforeEach, afterEach } from 'mocha';
import EnvironmentStore from '../../../stores/EnvironmentStore';

class MockEnvironmentStore extends EnvironmentStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.language = 'dk';
    this.city = 'copenhagen';
  }
}
MockEnvironmentStore.storeName = 'EnvironmentStore';

describe('Rejsekort', () => {
  let componentContext;
  let React;
  let ReactTestUtils;
  let provideContext;
  let Rejsekort;
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

      Rejsekort = require('../../../components/form/Rejsekort').default;
      Rejsekort = provideContext(Rejsekort);

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
      <Rejsekort
        context={componentContext}
        id="test-rejsekort"
      />
    );

    const inputComponent = ReactTestUtils.findRenderedComponentWithType(component, Input);
    const buttonComponent = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'button');


    expect(inputComponent).toExist();
    expect(buttonComponent).toExist();

    done();
  });

  it('should render with standard error', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
      <Rejsekort
        context={componentContext}
        id="test-rejsekort"
        error="test-error"
        isInValid={true}
      />
    );

    const inputComponent = ReactTestUtils.findRenderedComponentWithType(component, Input);
    expect(inputComponent.props.isInValid).toEqual(true);
    expect(inputComponent.props.error).toEqual('test-error');

    const errorDomNode = ReactTestUtils.findRenderedDOMComponentWithClass(
      inputComponent, 'content-message');
    expect(errorDomNode.textContent).toEqual('test-error');

    done();
  });

  it('should render with validation error', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
      <Rejsekort
        context={componentContext}
        id="test-rejsekort"
        error="test-error"
        validationError="test-validation-error"
        isInValid={true}
      />
    );

    const inputComponent = ReactTestUtils.findRenderedComponentWithType(component, Input);
    expect(inputComponent.props.isInValid).toEqual(true);
    expect(inputComponent.props.error).toEqual('test-validation-error');

    const errorDomNode = ReactTestUtils.findRenderedDOMComponentWithClass(
      inputComponent, 'content-message');
    expect(errorDomNode.textContent).toEqual('test-validation-error');

    done();
  });

  it('should render as validated and without button', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
      <Rejsekort
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
