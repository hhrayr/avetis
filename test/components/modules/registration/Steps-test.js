import { createMockComponentContext } from 'fluxible/utils';
import assert from 'assert';
import jsdom from 'jsdom';
import mockery from 'mockery';
import { describe, it, beforeEach, afterEach } from 'mocha';
import EnvironmentStore from '../../../../stores/EnvironmentStore';
import FormSchemaFixtures from '../../FormSchema-fixture';

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

describe('StepsComponent', () => {
  let componentContext;
  let React;
  let ReactTestUtils;
  let provideContext;
  let Steps;

  const fixture = {
    invalidSegment: {
      header: 'Invalid',
      statusbar: false,
    },

    get3ColSegments: () => {
      return [
        FormSchemaFixtures.segments[0],
        FormSchemaFixtures.segments[1],
        FormSchemaFixtures.segments[2],
        fixture.invalidSegment,
      ];
    },
    get5ColSegments: () => {
      return [
        FormSchemaFixtures.segments[0],
        FormSchemaFixtures.segments[1],
        FormSchemaFixtures.segments[2],
        FormSchemaFixtures.segments[3],
        FormSchemaFixtures.segments[4],
        fixture.invalidSegment,
      ];
    },
  };

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

      Steps = require('../../../../components/registration/Steps').default;
      Steps = provideContext(Steps);

      done();
    });
  });
  afterEach(() => {
    delete global.window;
    delete global.document;
    delete global.navigator;
    mockery.disable();
  });

  it('should render with 1st active element', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
        <Steps context={componentContext}
          segments={fixture.get3ColSegments()}
          activeStep={1}
        />
    );
    assert.notEqual(-1, ReactTestUtils.findRenderedDOMComponentWithClass(component, 'steps')
    .children[0].className.indexOf('active'));
    done();
  });

  it('should render with no active element', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
        <Steps context={componentContext}
          segments={fixture.get3ColSegments()}
          activeStep={4}
        />
    );
    const element = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'steps');
    let hasActive = false;
    for (let i = 0; i < element.children.length; i++) {
      if (element.children[i].className.indexOf('active') !== -1) {
        hasActive = true;
        break;
      }
    }
    assert.equal(false, hasActive);
    done();
  });

  it('should render with 3 sections', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
        <Steps context={componentContext}
          segments={fixture.get3ColSegments()}
          activeStep={2}
        />
    );
    assert.notEqual(-1, ReactTestUtils.findRenderedDOMComponentWithClass(component, 'steps')
    .className.indexOf('steps-count-3'));
    done();
  });

  it('should render with 5 sections', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
        <Steps context={componentContext}
          segments={fixture.get5ColSegments()}
          activeStep={2}
        />
    );
    assert.notEqual(-1, ReactTestUtils.findRenderedDOMComponentWithClass(component, 'steps')
    .className.indexOf('steps-count-5'));
    done();
  });
});
