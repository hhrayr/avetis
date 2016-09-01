import expect from 'expect';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { createMockComponentContext } from 'fluxible/utils';
import jsdom from 'jsdom';

describe('Payment Component', () => {
  let React;
  let TestUtils;
  let provideContext;
  let componentContext;
  let Payment;
  let PaymentMethodsSelector;
  let CCPaymentMethod;
  let ECPaymentMethod;
  let CCValidUntil;
  let Select;
  let Input;
  let Checkbox;

  beforeEach((done) => {
    jsdom.env('<html><body></body></html>', [], (err, window) => {
      global.window = window;
      global.document = window.document;
      global.navigator = window.navigator;

      componentContext = createMockComponentContext({
        stores: [],
      });

      // React must be required after window is set
      React = require('react');
      TestUtils = require('react/lib/ReactTestUtils');
      provideContext = require('fluxible-addons-react/provideContext');

      PaymentMethodsSelector =
        require('../../../components/form/payment/PaymentMethodsSelector').default;
      CCPaymentMethod = require('../../../components/form/payment/CCPaymentMethod').default;
      ECPaymentMethod = require('../../../components/form/payment/ECPaymentMethod').default;
      CCValidUntil = require('../../../components/form/payment/CCValidUntil').default;
      Select = require('../../../components/form/Select').default;
      Input = require('../../../components/form/Input').default;
      Checkbox = require('../../../components/form/Checkbox').default;
      Payment = require('../../../components/form/payment/Payment').default;
      Payment = provideContext(Payment);

      done();
    });
  });

  afterEach(() => {
    delete global.window;
    delete global.document;
    delete global.navigator;
  });

  it('should render component with only one payment method', (done) => {
    const component = TestUtils.renderIntoDocument(
      <Payment context={componentContext} id="test-payment"
        methods={['CC']}
        CCProviders={['VISA', 'MasterCard']}
      />
    );

    expect(component.props.id).toEqual('test-payment');

    const paymentMethodsSelectorComponent =
      TestUtils.scryRenderedComponentsWithType(component, PaymentMethodsSelector);
    const ccPaymentMethodComponent =
      TestUtils.findRenderedComponentWithType(component, CCPaymentMethod);

    expect(paymentMethodsSelectorComponent.length).toEqual(0);
    expect(ccPaymentMethodComponent).toExist();

    done();
  });

  it('should render component and with correct default payment method', (done) => {
    const component = TestUtils.renderIntoDocument(
      <Payment context={componentContext} id="test-payment"
        methods={['CC', 'EC']}
        CCProviders={['VISA', 'MasterCard']}
      />
    );

    const paymentMethodsSelectorComponent =
      TestUtils.findRenderedComponentWithType(component, PaymentMethodsSelector);
    const ccPaymentMethodComponent =
      TestUtils.findRenderedComponentWithType(component, CCPaymentMethod);

    expect(paymentMethodsSelectorComponent).toExist();
    expect(paymentMethodsSelectorComponent.props.value).toEqual('CC');
    expect(ccPaymentMethodComponent).toExist();

    done();
  });

  it('should render component with CC payment method', (done) => {
    const component = TestUtils.renderIntoDocument(
      <Payment context={componentContext} id="test-payment"
        methods={['CC', 'EC']}
        CCProviders={['VISA', 'MasterCard']}
        value={{
          type: 'CC',
          issuer: 'VISA',
          number: '4111111111111111',
          validity: { year: 2020, month: 1 },
          seccode: '123',
        }}
        language="de"
      />
    );

    const ccPaymentMethodComponent =
      TestUtils.findRenderedComponentWithType(component, CCPaymentMethod);
    const selectComponents =
      TestUtils.scryRenderedComponentsWithType(ccPaymentMethodComponent, Select);
    const inputComponents =
      TestUtils.scryRenderedComponentsWithType(ccPaymentMethodComponent, Input);
    const ccProviderComponent = selectComponents[0];
    const ccCardNumberComponent = inputComponents[0];
    const ccValidityComponent =
      TestUtils.findRenderedComponentWithType(ccPaymentMethodComponent, CCValidUntil);
    const ccSecutiryCodeComponent = inputComponents[1];

    expect(ccPaymentMethodComponent.props.language).toEqual('de');
    expect(ccProviderComponent.props.value).toEqual('VISA');
    expect(ccCardNumberComponent.props.value).toEqual('4111111111111111');
    expect(ccValidityComponent.props.value.year).toEqual(2020);
    expect(ccValidityComponent.props.value.month).toEqual(1);
    expect(ccSecutiryCodeComponent.props.value).toEqual('123');

    done();
  });

  it('should render component with CC payment method and with errors', (done) => {
    const component = TestUtils.renderIntoDocument(
      <Payment context={componentContext} id="test-payment"
        methods={['CC', 'EC']}
        CCProviders={['VISA', 'MasterCard']}
        isInValid={true}
        value={{
          type: 'CC',
          number: '4111111111111111',
          validity: { year: 2020 },
          seccode: '123',
        }}
      />
    );

    const ccPaymentMethodComponent =
      TestUtils.findRenderedComponentWithType(component, CCPaymentMethod);
    const selectComponents =
      TestUtils.scryRenderedComponentsWithType(ccPaymentMethodComponent, Select);
    const inputComponents =
      TestUtils.scryRenderedComponentsWithType(ccPaymentMethodComponent, Input);
    const ccProviderComponent = selectComponents[0];
    const ccCardNumberComponent = inputComponents[0];
    const ccValidityComponent =
      TestUtils.findRenderedComponentWithType(ccPaymentMethodComponent, CCValidUntil);
    const ccSecutiryCodeComponent = inputComponents[1];

    expect(ccProviderComponent.props.isInValid).toEqual(true);
    expect(ccCardNumberComponent.props.isInValid).toEqual(false);
    expect(ccValidityComponent.props.isInValid).toEqual(true);
    expect(ccSecutiryCodeComponent.props.isInValid).toEqual(false);

    done();
  });

  it('should render component with EC payment method', (done) => {
    const component = TestUtils.renderIntoDocument(
      <Payment context={componentContext} id="test-payment"
        methods={['CC', 'EC']}
        CCProviders={['VISA', 'MasterCard']}
        value={{
          type: 'EC',
          bank: 'MyBank',
          IBAN: 'DE43702501500028720614',
          BIC: 'AARBDE5W360',
          billpay: true,
        }}
        language="de"
      />
    );

    const ecPaymentMethodComponent =
      TestUtils.findRenderedComponentWithType(component, ECPaymentMethod);
    const inputComponents =
      TestUtils.scryRenderedComponentsWithType(ecPaymentMethodComponent, Input);
    const ecIBAN = inputComponents[0];
    const ecBIC = inputComponents[1];
    const ecBank = inputComponents[2];
    const ecBillpay =
      TestUtils.findRenderedComponentWithType(ecPaymentMethodComponent, Checkbox);

    expect(ecPaymentMethodComponent.props.language).toEqual('de');
    expect(ecIBAN.props.value).toEqual('DE43702501500028720614');
    expect(ecBIC.props.value).toEqual('AARBDE5W360');
    expect(ecBank.props.value).toEqual('MyBank');
    expect(ecBillpay.props.value).toEqual(true);

    done();
  });

  it('should render component with EC payment method and with erros', (done) => {
    const component = TestUtils.renderIntoDocument(
      <Payment context={componentContext} id="test-payment"
        methods={['CC', 'EC']}
        CCProviders={['VISA', 'MasterCard']}
        value={{
          type: 'EC',
          bank: '',
          IBAN: 'DE43702501500028720614',
          BIC: 'AARBDE5W360',
          billpay: false,
        }}
        isInValid={true}
      />
    );

    const ecPaymentMethodComponent =
      TestUtils.findRenderedComponentWithType(component, ECPaymentMethod);
    const inputComponents =
      TestUtils.scryRenderedComponentsWithType(ecPaymentMethodComponent, Input);
    const ecIBAN = inputComponents[0];
    const ecBIC = inputComponents[1];
    const ecBank = inputComponents[2];
    const ecBillpay =
      TestUtils.findRenderedComponentWithType(ecPaymentMethodComponent, Checkbox);

    expect(ecIBAN.props.isInValid).toEqual(false);
    expect(ecBIC.props.isInValid).toEqual(false);
    expect(ecBank.props.isInValid).toEqual(true);
    expect(ecBillpay.props.isInValid).toEqual(true);

    done();
  });
});
