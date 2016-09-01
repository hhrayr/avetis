import expect from 'expect';
import { describe, it, beforeEach, afterEach } from 'mocha';
import jsdom from 'jsdom';
import { createMockComponentContext } from 'fluxible/utils';

describe('SmartAddress Component', () => {
  let React;
  let TestUtils;
  let SmartAddress;
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

      SmartAddress = require('../../../components/form/SmartAddress').default;
      SmartAddress = provideContext(SmartAddress);

      done();
    });
  });

  afterEach(() => {
    delete global.window;
    delete global.document;
    delete global.navigator;
  });

  it('should render with input and no suggestions by default', (done) => {
    const component = TestUtils.renderIntoDocument(
      <SmartAddress context={componentContext}
        id="test-smart-address"
      />
    );

    expect(component.props.id).toEqual('test-smart-address');

    const suggestionsComponent = TestUtils.scryRenderedDOMComponentsWithTag(component, 'ul');
    expect(suggestionsComponent.length).toEqual(0);

    done();
  });

  it('should render with some suggestions', (done) => {
    const items = [
      { id: 'id1', label: 'label1', nextAction: 'Find' },
      { id: 'id2', label: 'label2', nextAction: 'Retrieve' },
      { id: 'id3', label: 'label3', nextAction: 'Find' },
      { id: 'id4', label: 'label4', nextAction: 'Retrieve' },
    ];

    const component = TestUtils.renderIntoDocument(
      <SmartAddress context={componentContext}
        id="test-smart-address"
        list={{ items }}
      />
    );

    const suggestionItems = TestUtils.scryRenderedDOMComponentsWithTag(component, 'li');
    expect(suggestionItems.length).toEqual(items.length);

    for (let i = 0; i < items.length; i++) {
      expect(suggestionItems[i].textContent).toEqual(items[i].label);
    }

    done();
  });
});
