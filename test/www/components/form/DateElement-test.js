import expect from 'expect';
import { describe, it, beforeEach, afterEach } from 'mocha';
import jsdom from 'jsdom';
import sinon from 'sinon';
import { createMockComponentContext } from 'fluxible/utils';

describe('DateElement Component', () => {
  let React;
  let TestUtils;
  let DateElement;
  let Select;
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

      Select = require('../../../../www/components/form/Select').default;
      DateElement = require('../../../../www/components/form/DateElement').default;
      DateElement = provideContext(DateElement);

      done();
    });
  });

  afterEach(() => {
    delete global.window;
    delete global.document;
    delete global.navigator;
  });

  it('should render with correct order and number of months and days', (done) => {
    const component = TestUtils.renderIntoDocument(
      <DateElement context={componentContext} id="test-date" order={['month', 'year', 'day']} />
    );

    expect(component.props.id).toEqual('test-date');

    const selectComponents = TestUtils.scryRenderedComponentsWithType(component, Select);
    expect(selectComponents.length).toEqual(3);
    expect(selectComponents[0].props.id).toEqual('test-date-month');
    expect(selectComponents[0].props.options.length).toEqual(13);
    expect(selectComponents[1].props.id).toEqual('test-date-year');
    expect(selectComponents[2].props.id).toEqual('test-date-day');
    expect(selectComponents[2].props.options.length).toEqual(32);

    done();
  });

  it('should render with error', (done) => {
    const component = TestUtils.renderIntoDocument(
      <DateElement
        context={componentContext}
        id="test-date"
        isInValid={true}
        error="test-error"
      />
    );

    const selectComponents = TestUtils.scryRenderedComponentsWithType(component, Select);
    expect(selectComponents[0].props.isInValid).toEqual(true);
    expect(selectComponents[1].props.isInValid).toEqual(true);
    expect(selectComponents[2].props.isInValid).toEqual(true);

    const errorLabelComponents = TestUtils.scryRenderedDOMComponentsWithClass(
      component, 'content-message');
    expect(errorLabelComponents[0].textContent).toEqual('');
    expect(errorLabelComponents[1].textContent).toEqual('');
    expect(errorLabelComponents[2].textContent).toEqual('');
    expect(errorLabelComponents[3].textContent).toEqual('test-error');

    done();
  });

  it('should render with past years', (done) => {
    const clock = sinon.useFakeTimers(new Date(2010, 7 - 1, 6).getTime());

    const component = TestUtils.renderIntoDocument(
      <DateElement context={componentContext} id="test-select" />
    );

    const selectComponents = TestUtils.scryRenderedComponentsWithType(component, Select);
    expect(selectComponents[2].props.options.length).toEqual(2010 - 1900 + 1 + 1);
    expect(selectComponents[2].props.options[1].value).toEqual(2010);
    expect(selectComponents[2].props.options[selectComponents[2].props.options.length - 1].value)
      .toEqual(1900);

    clock.restore();
    done();
  });

  it('should render with future years', (done) => {
    const clock = sinon.useFakeTimers(new Date(2010, 7 - 1, 6).getTime());

    const component = TestUtils.renderIntoDocument(
      <DateElement context={componentContext} id="test-select" inFuture={true} />
    );

    const selectComponents = TestUtils.scryRenderedComponentsWithType(component, Select);
    expect(selectComponents[2].props.options.length).toEqual(2010 + 50 - 2010 + 1 + 1);
    expect(selectComponents[2].props.options[1].value).toEqual(2010);
    expect(selectComponents[2].props.options[selectComponents[2].props.options.length - 1].value)
      .toEqual(2010 + 50);

    clock.restore();
    done();
  });
});
