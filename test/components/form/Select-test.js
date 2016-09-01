import React from 'react';
import jsdom from 'jsdom';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import { describe, it } from 'mocha';
import Select from '../../../components/form/Select';
import { trimSpace } from '../../../utils/stringUtils';

describe('Select Component', () => {
  it('should render', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Select id="test-select" />);
    const component = renderer.getRenderOutput();
    expect(component.props.id).toEqual('test-select-container');
    done();
  });

  it('should render with error', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Select id="test-select" isInValid={true} error="test-error" />);
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
        <Select
          id="test-select"
          segmentId="test-segment"
          value="M"
          options={[
            { value: '', text: '--' },
            { value: 'M', text: 'Männlich' },
            { value: 'F', text: 'Weiblich' },
          ]}
        />
      );
      const inputDomNodes = TestUtils.scryRenderedDOMComponentsWithTag(inputComponent, 'option');

      expect(inputDomNodes.length).toEqual(3);

      expect(inputDomNodes[0].id).toEqual('test-segment-test-select-');
      expect(inputDomNodes[0].value).toEqual('');
      expect(trimSpace(inputDomNodes[0].textContent)).toEqual('--');

      expect(inputDomNodes[1].id).toEqual('test-segment-test-select-M');
      expect(inputDomNodes[1].value).toEqual('M');
      expect(trimSpace(inputDomNodes[1].textContent)).toEqual('Männlich');

      expect(inputDomNodes[2].id).toEqual('test-segment-test-select-F');
      expect(inputDomNodes[2].value).toEqual('F');
      expect(trimSpace(inputDomNodes[2].textContent)).toEqual('Weiblich');

      delete global.window;
      delete global.document;
      delete global.navigator;

      done();
    });
  });
});
