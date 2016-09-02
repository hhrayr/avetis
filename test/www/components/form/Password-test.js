import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import { describe, it } from 'mocha';
import Password from '../../../../www/components/form/Password';
import jsdom from 'jsdom';

describe('PasswordComponent', () => {
  it('should render', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Password id="test-password" />);
    const inputComponent = renderer.getRenderOutput().props.children[0];
    expect(inputComponent.props.type).toEqual('password');
    done();
  });

  it('should has maxLength set as 15', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Password id="test-password" />);
    const inputComponent = renderer.getRenderOutput().props.children[0];
    expect(inputComponent.props.maxLength).toEqual(15);
    done();
  });

  it('should render a show/hide password element', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Password />);
    const showHideButton = renderer.getRenderOutput().props.children[1];
    expect(showHideButton.type).toEqual('a');
    expect(showHideButton.props.className).toEqual('show-password');
    done();
  });

  it('should render a security level element', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Password />);
    const secIndicator = renderer.getRenderOutput().props.children[2];
    expect(secIndicator.type).toEqual('div');
    expect(secIndicator.props.className).toEqual('security-indicator');
    done();
  });

  it('should change the component type if show-hide button is clicked', (done) => {
    jsdom.env('<html><body></body></html>', [], (err, window) => {
      global.window = window;
      global.document = window.document;
      global.navigator = window.navigator;

      const passwordComponent = TestUtils.renderIntoDocument(
        <Password id="test-password" />
      );
      const showHideButtonDomNode = TestUtils.findRenderedDOMComponentWithTag(
         passwordComponent, 'a'
      );

      expect(passwordComponent.state.type).toEqual('password');

      TestUtils.Simulate.click(showHideButtonDomNode);
      expect(passwordComponent.state.type).toEqual('text');

      TestUtils.Simulate.click(showHideButtonDomNode);
      expect(passwordComponent.state.type).toEqual('password');

      delete global.window;
      delete global.document;
      delete global.navigator;

      done();
    });
  });
});
