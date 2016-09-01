import { createMockComponentContext } from 'fluxible/utils';
import expect from 'expect';
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

describe('Benefits Teaser Component', () => {
  let componentContext;
  let React;
  let ReactTestUtils;
  let provideContext;
  let BenefitsTeaser;

  beforeEach((done) => {
    mockery.enable({
      useCleanCache: true,
      warnOnUnregistered: false,
    });
    componentContext = createMockComponentContext({
      stores: [MockEnvironmentStore],
    });
    mockery.registerAllowables(['../components/Tsl']);

    jsdom.env('<html><body></body></html>', [], (err, window) => {
      global.window = window;
      global.document = window.document;
      global.navigator = window.navigator;

      // React must be required after window is set
      React = require('react');
      ReactTestUtils = require('react/lib/ReactTestUtils');
      provideContext = require('fluxible-addons-react/provideContext');
      BenefitsTeaser = require('../../../../components/registration/BenefitsTeaser').default;
      BenefitsTeaser = provideContext(BenefitsTeaser);

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
    const benefitsTeaserComponent = ReactTestUtils.renderIntoDocument(
        <BenefitsTeaser context={componentContext}
          image="test-image"
          price="test-price"
          bonusMinutes="test-bonusMinutes"
        />
    );
    expect(ReactTestUtils.findRenderedDOMComponentWithTag(benefitsTeaserComponent, 'ul')).toExist();

    const img = ReactTestUtils.findRenderedDOMComponentWithTag(benefitsTeaserComponent, 'img');
    expect(img.src).toEqual('test-image');

    done();
  });

  it('should render all items', (done) => {
    const benefitsTeaserComponent = ReactTestUtils.renderIntoDocument(
        <BenefitsTeaser context={componentContext}
          image="test-image"
          price="test-price"
          bonusMinutes="test-bonusMinutes"
        />
    );
    const items = ReactTestUtils.scryRenderedDOMComponentsWithTag(benefitsTeaserComponent, 'li');
    const comparator = (a, b) => {
      return a.className === b.className;
    };
    expect(items).toInclude({ className: 'bonus-minutes' }, comparator);
    expect(items).toInclude({ className: 'price-item' }, comparator);
    done();
  });

  it('should render no bonus-minutes item', (done) => {
    const benefitsTeaserComponent = ReactTestUtils.renderIntoDocument(
        <BenefitsTeaser context={componentContext}
          image="test-image"
          price="test-price"
        />
    );
    const items = ReactTestUtils.scryRenderedDOMComponentsWithTag(benefitsTeaserComponent, 'li');
    const comparator = (a, b) => {
      return a.className === b.className;
    };
    expect(items).toExclude({ className: 'bonus-minutes' }, comparator);
    done();
  });
});
