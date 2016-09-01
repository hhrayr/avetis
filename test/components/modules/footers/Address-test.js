import assert from 'assert';
import jsdom from 'jsdom';
import mockery from 'mockery';
import { describe, it, beforeEach, afterEach } from 'mocha';

describe('FooterAddressComponent', () => {
  let React;
  let ReactTestUtils;
  let Address;
  const fixture = require('./Footer-fixture').default;

  beforeEach((done) => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
    });
    jsdom.env('<html><body></body></html>', [], (err, window) => {
      global.window = window;
      global.document = window.document;
      global.navigator = window.navigator;
      // React must be required after window is set
      React = require('react');
      ReactTestUtils = require('react-addons-test-utils');
      Address = require('../../../../components/modules/footers/Address').default;
      done();
    });
  });

  afterEach(() => {
    delete global.window;
    delete global.document;
    delete global.navigator;
    mockery.disable();
  });

  it('should render header and address info with a html murkup', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
      <Address
        address={fixture.address}
        header={fixture.addressHeader}
      />
    );
    assert.equal(fixture.addressHeader,
      ReactTestUtils.findRenderedDOMComponentWithClass(component, 'contact-header').innerHTML);
    assert.equal(fixture.address,
      ReactTestUtils.findRenderedDOMComponentWithClass(component, 'contact-body').innerHTML);
    done();
  });
});
