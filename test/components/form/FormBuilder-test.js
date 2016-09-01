import assert from 'assert';
import jsdom from 'jsdom';
import { createMockComponentContext } from 'fluxible/utils';
import { describe, it, beforeEach, afterEach } from 'mocha';
import SchemaFixture from '../FormSchema-fixture';

describe('FormBuilderComponent', () => {
  let React;
  let ReactTestUtils;
  let FormBuilder;
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
      ReactTestUtils = require('react/lib/ReactTestUtils');
      provideContext = require('fluxible-addons-react/provideContext');

      FormBuilder = require('../../../components/form/FormBuilder').default;
      FormBuilder = provideContext(FormBuilder);

      done();
    });
  });

  afterEach(() => {
    delete global.window;
    delete global.document;
    delete global.navigator;
  });

  it('should render Component', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
      <FormBuilder context={componentContext} segments={SchemaFixture.segments} />
    );
    assert(ReactTestUtils.findRenderedComponentWithType(component, FormBuilder));
    done();
  });

  it('should match number of sections', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
      <FormBuilder context={componentContext} segments={SchemaFixture.segments} />
    );
    assert.equal(SchemaFixture.segments.length,
      ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'segment').length);
    done();
  });
});
