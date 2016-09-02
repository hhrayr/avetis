import expect from 'expect';
import { describe, it, beforeEach, afterEach } from 'mocha';
import jsdom from 'jsdom';
import { createMockComponentContext } from 'fluxible/utils';

describe('GoogleAutocomplete Component', () => {
  let React;
  let TestUtils;
  let GoogleAutocomplete;
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

      GoogleAutocomplete = require('../../../../www/components/form/GoogleAutocomplete').default;
      GoogleAutocomplete = provideContext(GoogleAutocomplete);

      done();
    });
  });

  afterEach(() => {
    delete global.window;
    delete global.document;
    delete global.navigator;
  });

  it('should render with input and blank placeholder', (done) => {
    const component = TestUtils.renderIntoDocument(
      <GoogleAutocomplete context={componentContext}
        id="test-google-autocomplete"
        label="test-label"
        placeholder="test-placeholder"
      />
    );

    expect(component.props.id).toEqual('test-google-autocomplete');

    const inputComponent = TestUtils.findRenderedDOMComponentWithTag(component, 'input');
    expect(inputComponent.getAttribute('placeholder')).toNotExist();

    done();
  });
});
