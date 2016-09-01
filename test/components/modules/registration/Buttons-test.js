import { createMockComponentContext } from 'fluxible/utils';
import assert from 'assert';
import jsdom from 'jsdom';
import mockery from 'mockery';
import { describe, it, beforeEach, afterEach } from 'mocha';

import EnvironmentStore from '../../../../stores/EnvironmentStore';

class MockEnvironmentStore extends EnvironmentStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.content = {
      language: 'en',
      city: 'munich',
    };
  }
}
MockEnvironmentStore.storeName = 'EnvironmentStore';

describe('Registration Button Component', () => {
  let componentContext;
  let React;
  let ReactTestUtils;
  let provideContext;
  let Button;

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

      Button = require('../../../../components/registration/Button').default;
      Button = provideContext(Button);

      done();
    });
  });

  afterEach(() => {
    delete global.window;
    delete global.document;
    delete global.navigator;
    mockery.disable();
  });

  it('should render Component', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
        <Button context={componentContext} />
    );
    assert(ReactTestUtils.findRenderedComponentWithType(component, Button));
    done();
  });

  it('should render only next button', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
        <Button context={componentContext}
          activeStep={1}
          lastSectionIndex={3}
        />
      );
    assert.equal('Next', ReactTestUtils.findRenderedDOMComponentWithClass(component, 'button')
      .children[0].textContent);
    assert.equal(1, ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'button')
      .length);
    done();
  });

  it('should render Register button', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
        <Button context={componentContext}
          activeStep={3}
          lastSectionIndex={3}
        />
    );

    assert.equal(1, ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'button')
    .length);

    assert.equal('Register',
      ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'button')[0]
        .children[0].textContent);
    done();
  });
    // ToDo  add tests for action trigger
});
