import expect from 'expect';
import { describe, it, beforeEach, afterEach } from 'mocha';
import jsdom from 'jsdom';
import { createMockComponentContext } from 'fluxible/utils';

describe('Tenant Selector Component', () => {
  let React;
  let TestUtils;
  let TenantSelector;
  let Select;
  let provideContext;
  let componentContext;

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

      Select = require('../../../components/form/Select').default;
      TenantSelector = require('../../../components/form/TenantSelector').default;
      TenantSelector = provideContext(TenantSelector);

      done();
    });
  });

  afterEach(() => {
    delete global.window;
    delete global.document;
    delete global.navigator;
  });

  it('should render', (done) => {
    const component = TestUtils.renderIntoDocument(
      <TenantSelector context={componentContext} id="test-select" />
    );
    expect(component.props.id).toEqual('test-select');
    done();
  });

  it('should render with error', (done) => {
    const component = TestUtils.renderIntoDocument(
      <TenantSelector
        context={componentContext}
        id="test-select"
        isInValid={true}
        error="test-error"
      />
    );
    const selectComponent = TestUtils.findRenderedComponentWithType(component, Select);
    expect(selectComponent.props.isInValid).toEqual(true);
    expect(selectComponent.props.error).toEqual('test-error');
    done();
  });

  it('should render with "other" option', (done) => {
    const component = TestUtils.renderIntoDocument(
      <TenantSelector context={componentContext} id="test-select" />
    );
    const selectComponent = TestUtils.findRenderedComponentWithType(component, Select);
    expect(selectComponent.props.options).toInclude({ value: 'other' }, (a, b) => {
      return a.value === b.value;
    });
    done();
  });

  it('should render with predefined tenant', (done) => {
    const component = TestUtils.renderIntoDocument(
      <TenantSelector
        context={componentContext}
        id="test-select"
        currentTenant="DE"
        options={[{ value: 'DE' }, { value: 'BE' }]}
      />
    );
    const selectComponent = TestUtils.findRenderedComponentWithType(component, Select);
    expect(selectComponent.props.value).toEqual('DE');
    done();
  });
});
