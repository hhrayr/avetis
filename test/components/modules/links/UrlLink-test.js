import { createMockComponentContext } from 'fluxible/utils';
import assert from 'assert';
import jsdom from 'jsdom';
import mockery from 'mockery';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { RouteStore } from 'fluxible-router';
import EnvironmentStore from '../../../../stores/EnvironmentStore';


class MockEnvironmentStore extends EnvironmentStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.language = 'en';
    this.city = 'munich';
  }
}
MockEnvironmentStore.storeName = 'EnvironmentStore';

const Fixture = {
  staticRoutes: {
    linkto1: {
      path: '/linkto1',
      method: 'get',
    },
    linkto2: {
      path: '/:language/linkto2',
      method: 'get',
    },
    linkto3: {
      path: '/:language/:city/linkto3',
      method: 'get',
    },
  },
};

class MockRouteStore extends RouteStore {
}
MockRouteStore.storeName = 'RouteStore';
MockRouteStore = MockRouteStore.withStaticRoutes(Fixture.staticRoutes);

describe('UrlLinkComponent', () => {
  let componentContext;
  let React;
  let ReactTestUtils;
  let provideContext;
  let UrlLink;

  beforeEach((done) => {
    mockery.enable({
      useCleanCache: true,
      warnOnUnregistered: false,
    });
    componentContext = createMockComponentContext({
      stores: [MockRouteStore, MockEnvironmentStore],
    });

    jsdom.env('<html><body></body></html>', [], (err, window) => {
      global.window = window;
      global.document = window.document;
      global.navigator = window.navigator;

      // React must be required after window is set
      React = require('react');
      ReactTestUtils = require('react-addons-test-utils');
      provideContext = require('fluxible-addons-react/provideContext');
      UrlLink = require('../../../../components/modules/links/UrlLink').default;
      UrlLink = provideContext(UrlLink);
      done();
    });
  });

  afterEach(() => {
    delete global.window;
    delete global.document;
    delete global.navigator;
    mockery.disable();
  });

  it('should render the component with static route 1', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
      <UrlLink context={componentContext} url="linkto1">
        { "linkto1" }
      </UrlLink>
    );
    const linkElement = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'a');
    assert.equal('/linkto1', linkElement.href);
    assert.equal('linkto1', linkElement.textContent);
    done();
  });

  it('should render the component with static route 2', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
      <UrlLink context={componentContext} url="linkto2">
        { "linkto2" }
      </UrlLink>
    );
    const linkElement = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'a');
    assert.equal('/en/linkto2', linkElement.href);
    assert.equal('linkto2', linkElement.textContent);
    done();
  });

  it('should render the component with static route 3', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
      <UrlLink context={componentContext} url="linkto3">
        { "linkto3" }
      </UrlLink>
    );
    const linkElement = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'a');
    assert.equal('/en/munich/linkto3', linkElement.href);
    assert.equal('linkto3', linkElement.textContent);
    done();
  });

  it('should render the component with absolute url 1', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
      <UrlLink context={componentContext} url="http://example.com/">
        { "http://example.com/" }
      </UrlLink>
    );
    const linkElement = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'a');
    assert.equal('http://example.com/', linkElement.href);
    assert.equal('http://example.com/', linkElement.textContent);
    done();
  });

  it('should render the component with absolute url 2', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
      <UrlLink context={componentContext} url="https://example.com/">
        { "https://example.com/" }
      </UrlLink>
    );
    const linkElement = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'a');
    assert.equal('https://example.com/', linkElement.href);
    assert.equal('https://example.com/', linkElement.textContent);
    done();
  });

  it('should render the component with absolute url 3', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
      <UrlLink context={componentContext} url="//example.com/">
        { "//example.com/" }
      </UrlLink>
    );
    const linkElement = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'a');
    assert.equal('//example.com/', linkElement.href);
    assert.equal('//example.com/', linkElement.textContent);
    done();
  });

  it('should throw an error if the route is invalid', (done) => {
    assert.throws(() => {
      ReactTestUtils.renderIntoDocument(
        <UrlLink context={componentContext} url="invalid-route">
          { "invalid-route" }
        </UrlLink>
      );
    });
    done();
  });
});
