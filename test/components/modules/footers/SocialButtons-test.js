import { createMockComponentContext } from 'fluxible/utils';
import assert from 'assert';
import jsdom from 'jsdom';
import mockery from 'mockery';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { RouteStore } from 'fluxible-router';
import EnvironmentStore from '../../../../stores/EnvironmentStore';

class MockEnvironmentStore extends EnvironmentStore {
}
MockEnvironmentStore.storeName = 'EnvironmentStore';

class MockRouteStore extends RouteStore {
}
MockRouteStore.storeName = 'RouteStore';

describe('FooterSocialButtonsComponent', () => {
  let componentContext;
  let provideContext;
  let React;
  let ReactTestUtils;
  let SocialButtons;
  const fixture = require('./Footer-fixture').default;

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
      provideContext = require('fluxible-addons-react/provideContext');
      ReactTestUtils = require('react-addons-test-utils');
      SocialButtons = require('../../../../components/modules/footers/SocialButtons').default;
      SocialButtons = provideContext(SocialButtons);
      done();
    });
  });

  afterEach(() => {
    delete global.window;
    delete global.document;
    delete global.navigator;
    mockery.disable();
  });

  it('should render header and social button list', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
      <SocialButtons
        context={componentContext}
        items={fixture.socialmedia}
        header={fixture.socialmediaHeader}
      />
    );
    assert.equal(fixture.socialmediaHeader,
       ReactTestUtils.findRenderedDOMComponentWithClass(component, 'social-header').innerHTML);
    assert.equal(fixture.socialmedia.length,
      ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'social-item').length);
    done();
  });
});
