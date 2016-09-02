import React from 'react';
import jsdom from 'jsdom';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import { describe, it } from 'mocha';
import Checkbox from '../../../../www/components/form/Checkbox';

describe('Checkbox Component', () => {
  it('should render', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Checkbox id="test-checkbox" />);
    const component = renderer.getRenderOutput();
    expect(component.props.children[0].props.type).toEqual('checkbox');
    expect(component.props.children[0].props.id).toEqual('test-checkbox');
    done();
  });

  it('should render with error', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Checkbox id="test-checkbox" isInValid={true} />);
    const component = renderer.getRenderOutput();
    expect(component.props.className).toInclude('error');
    done();
  });

  it('should render with correct value', (done) => {
    jsdom.env('<html><body></body></html>', [], (err, window) => {
      global.window = window;
      global.document = window.document;
      global.navigator = window.navigator;

      const inputComponent = TestUtils.renderIntoDocument(
        <Checkbox id="test-checkbox" value={true} />
      );
      const inputDomNode = TestUtils.findRenderedDOMComponentWithTag(inputComponent, 'input');

      expect(inputDomNode.value).toEqual('true');

      delete global.window;
      delete global.document;
      delete global.navigator;

      done();
    });
  });

  it('should render with correct label', (done) => {
    jsdom.env('<html><body></body></html>', [], (err, window) => {
      global.window = window;
      global.document = window.document;
      global.navigator = window.navigator;

      const inputComponent = TestUtils.renderIntoDocument(
        <Checkbox id="test-checkbox" label="test-<b>label</b>" language="en" />
      );
      const labelDomNode = TestUtils.findRenderedDOMComponentWithTag(inputComponent, 'label');

      expect(labelDomNode.innerHTML).toEqual('test-<b>label</b>');

      delete global.window;
      delete global.document;
      delete global.navigator;

      done();
    });
  });
});
