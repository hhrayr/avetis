import React from 'react';
import jsdom from 'jsdom';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import { describe, it } from 'mocha';
import RadioButtonList from '../../../components/form/RadioButtonList';

describe('RadioButtonList Component', () => {
  it('should render', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<RadioButtonList id="test-radiobutton" />);
    const component = renderer.getRenderOutput();
    expect(component.props.id).toEqual('test-radiobutton-container');
    done();
  });

  it('should render with error', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<RadioButtonList id="test-checkbox" isInValid={true} error="test-error" />);
    const component = renderer.getRenderOutput();
    expect(component.props.className).toInclude('error');
    expect(component.props.children[2].props.children.props.children).toEqual('test-error');
    done();
  });

  it('should render with correct options', (done) => {
    jsdom.env('<html><body></body></html>', [], (err, window) => {
      global.window = window;
      global.document = window.document;
      global.navigator = window.navigator;

      const inputComponent = TestUtils.renderIntoDocument(
        <RadioButtonList
          id="test-radiobutton-list"
          segmentId="test-segment"
          value="M"
          options={[
            { value: '', text: 'Invalid' },
            { value: 'M', text: 'Männlich' },
            { value: 'F', text: 'Weiblich' },
          ]}
        />
      );
      const inputDomNodes = TestUtils.scryRenderedDOMComponentsWithTag(inputComponent, 'input');

      expect(inputDomNodes.length).toEqual(2);

      expect(inputDomNodes[0].id).toEqual('test-segment-test-radiobutton-list-M');
      expect(inputDomNodes[0].value).toEqual('M');
      expect(inputDomNodes[0].checked).toEqual(true);

      expect(inputDomNodes[1].id).toEqual('test-segment-test-radiobutton-list-F');
      expect(inputDomNodes[1].value).toEqual('F');
      expect(inputDomNodes[1].checked).toEqual(false);

      delete global.window;
      delete global.document;
      delete global.navigator;

      done();
    });
  });
});
