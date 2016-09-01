import { createMockComponentContext } from 'fluxible/utils';
import assert from 'assert';
import jsdom from 'jsdom';
import mockery from 'mockery';
import { describe, it, beforeEach, afterEach } from 'mocha';
import EnvironmentStore from '../../../stores/EnvironmentStore';
import ForSchemaFixtures from '../FormSchema-fixture';

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

describe('SegmentComponent', () => {
  let componentContext;
  let React;
  let ReactTestUtils;
  let provideContext;
  let Segment;

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

      Segment = require('../../../components/form/Segment').default;
      Segment = provideContext(Segment);

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
        <Segment context={ componentContext } schema={ ForSchemaFixtures.segments[0] }/>
    );
    assert(ReactTestUtils.findRenderedComponentWithType(component, Segment));
    done();
  });

  it('should render with header', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
        <Segment context={ componentContext } schema={ ForSchemaFixtures.segments[0] }/>
    );
    const header = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'h3');
    assert.equal(ForSchemaFixtures.segments[0].header, header.textContent);
    done();
  });
});
