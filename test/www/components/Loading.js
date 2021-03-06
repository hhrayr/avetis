import expect from 'expect';
import jsdom from 'jsdom';
import { describe, it, beforeEach, afterEach } from 'mocha';

describe('LoadingComponent', () => {
  let React;
  let ReactTestUtils;
  let Loading;
  const path = '/assets/images';

  const Fixture = {
    backgroundColor: 'rgb(255, 255, 255)',
    type: 'spin',
    color: '#ffffff',
    getSvgFilePath: () => {
      return `${path}/loading-${Fixture.type}.svg?color=${Fixture.color}`;
    },
  };

  beforeEach((done) => {
    jsdom.env('<html><body></body></html>', [], (err, window) => {
      global.window = window;
      global.document = window.document;
      global.navigator = window.navigator;

      // React must be required after window is set
      React = require('react');
      ReactTestUtils = require('react/lib/ReactTestUtils');
      Loading = require('../../../www/components/Loading').default;

      done();
    });
  });

  afterEach(() => {
    delete global.window;
    delete global.document;
    delete global.navigator;
  });

  it('should render with background color', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
        <Loading backgroundColor={Fixture.backgroundColor} />
    );
    expect(ReactTestUtils.findRenderedDOMComponentWithTag(component, 'div').style.backgroundColor)
      .toEqual(Fixture.backgroundColor);
    done();
  });

  it('should render with type and color', (done) => {
    const component = ReactTestUtils.renderIntoDocument(
        <Loading backgroundColor={ Fixture.backgroundColor }
          color={Fixture.color}
          type={Fixture.type}
        />
    );
    expect(ReactTestUtils.findRenderedDOMComponentWithTag(component, 'img').src)
      .toEqual(Fixture.getSvgFilePath());
    done();
  });
});
