import { createMockComponentContext } from 'fluxible/utils';
import expect from 'expect';
import jsdom from 'jsdom';
import mockery from 'mockery';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { RouteStore } from 'fluxible-router';
import EnvironmentStore from '../../../../../www/stores/EnvironmentStore';
import urlLinkComponent from '../../../../../www/components/modules/links/UrlLink';
import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import { provideContext } from 'fluxible-addons-react';

class MockEnvironmentStore extends EnvironmentStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.language = 'en';
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
  },
};

class MockRouteStore extends RouteStore {
}
MockRouteStore.storeName = 'RouteStore';
MockRouteStore = MockRouteStore.withStaticRoutes(Fixture.staticRoutes);

describe('UrlLinkComponent', () => {
  let componentContext;
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

      UrlLink = provideContext(urlLinkComponent);

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
    expect(linkElement.href).toEqual('/linkto1');
    expect(linkElement.textContent).toEqual('linkto1');
    done();
  });

  it('should render the component with static route 2', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
      <UrlLink context={componentContext} url="linkto2">
        { "linkto2" }
      </UrlLink>
    );
    const linkElement = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'a');
    expect(linkElement.href).toEqual('/en/linkto2');
    expect(linkElement.textContent).toEqual('linkto2');
    done();
  });

  it('should render the component with absolute url 1', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
      <UrlLink context={componentContext} url="http://example.com/">
        { "http://example.com/" }
      </UrlLink>
    );
    const linkElement = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'a');
    expect(linkElement.href).toEqual('http://example.com/');
    expect(linkElement.textContent).toEqual('http://example.com/');
    done();
  });

  it('should render the component with absolute url 2', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
      <UrlLink context={componentContext} url="https://example.com/">
        { "https://example.com/" }
      </UrlLink>
    );
    const linkElement = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'a');
    expect(linkElement.href).toEqual('https://example.com/');
    expect(linkElement.textContent).toEqual('https://example.com/');
    done();
  });

  it('should render the component with absolute url 3', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
      <UrlLink context={componentContext} url="//example.com/">
        { "//example.com/" }
      </UrlLink>
    );
    const linkElement = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'a');
    expect(linkElement.href).toEqual('//example.com/');
    expect(linkElement.textContent).toEqual('//example.com/');
    done();
  });

  it('should throw an error if the route is invalid', (done) => {
    expect(() => {
      ReactTestUtils.renderIntoDocument(
        <UrlLink context={componentContext} url="invalid-route">
          { "invalid-route" }
        </UrlLink>
      );
    }).toThrow();
    done();
  });
});
