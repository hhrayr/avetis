import expect from 'expect';
import { describe, it, beforeEach, afterEach } from 'mocha';
import jsdom from 'jsdom';
import { createMockComponentContext } from 'fluxible/utils';

describe('PhoneNumber Component', () => {
  let React;
  let TestUtils;
  let PhoneNumber;
  let Input;
  let provideContext;
  const componentContext = createMockComponentContext();

  beforeEach((done) => {
    jsdom.env('<html><body></body></html>', [], (err, window) => {
      global.window = window;
      global.document = window.document;
      global.navigator = window.navigator;

      // React must be required after window is set
      React = require('react');
      TestUtils = require('react/lib/ReactTestUtils');
      provideContext = require('fluxible-addons-react/provideContext');

      Input = require('../../../../www/components/form/Input').default;
      PhoneNumber = require('../../../../www/components/form/PhoneNumber').default;
      PhoneNumber = provideContext(PhoneNumber);

      done();
    });
  });

  afterEach(() => {
    delete global.window;
    delete global.document;
    delete global.navigator;
  });

  it('should render with inputs and default values', (done) => {
    const component = TestUtils.renderIntoDocument(
      <PhoneNumber context={componentContext}
        id="test-phone-number"
        value={{ number: '123456', countryCode: '+49' }}
        placeholder={{ number: '123456-placeholder', countryCode: '+49-placeholder' }}
      />
    );

    expect(component.props.id).toEqual('test-phone-number');

    const inputComponents = TestUtils.scryRenderedComponentsWithType(component, Input);
    expect(inputComponents.length).toEqual(2);
    expect(inputComponents[0].props.id).toEqual('test-phone-number-country-code');
    expect(inputComponents[0].props.value).toEqual('+49');
    expect(inputComponents[0].props.placeholder).toEqual('+49-placeholder');
    expect(inputComponents[1].props.id).toEqual('test-phone-number-number');
    expect(inputComponents[1].props.value).toEqual('123456');
    expect(inputComponents[1].props.placeholder).toEqual('123456-placeholder');

    done();
  });

  it('should render with error', (done) => {
    const component = TestUtils.renderIntoDocument(
      <PhoneNumber context={componentContext}
        id="test-phone-number"
        isInValid={true}
        error="test-error"
      />
    );

    const inputComponents = TestUtils.scryRenderedComponentsWithType(component, Input);
    expect(inputComponents[0].props.isInValid).toEqual(true);
    expect(inputComponents[1].props.isInValid).toEqual(true);

    const errorLabelComponents = TestUtils.scryRenderedDOMComponentsWithClass(
      component, 'content-message');
    expect(errorLabelComponents[0].textContent).toEqual('');
    expect(errorLabelComponents[1].textContent).toEqual('');
    expect(errorLabelComponents[2].textContent).toEqual('test-error');

    done();
  });

  it('should update values on blur', (done) => {
    const component = TestUtils.renderIntoDocument(
      <PhoneNumber context={componentContext}
        id="test-phone-number"
        value={{ number: '01578 1470361', countryCode: '0049' }}
      />
    );

    const inputDomNodes = TestUtils.scryRenderedDOMComponentsWithTag(
       component, 'input'
    );

    expect(inputDomNodes[0].value).toEqual('0049');
    expect(inputDomNodes[1].value).toEqual('01578 1470361');

    TestUtils.Simulate.blur(inputDomNodes[0]);
    TestUtils.Simulate.blur(inputDomNodes[1]);

    expect(inputDomNodes[0].value).toEqual('+49');
    expect(inputDomNodes[1].value).toEqual('15781470361');

    done();
  });
});
