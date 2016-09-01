import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import { describe, it } from 'mocha';
import Input from '../../../components/form/Input';
import jsdom from 'jsdom';

describe('InputComponent', () => {
  it('should render', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Input />);
    const actual = renderer.getRenderOutput().props.children[1].type === 'input';
    const expected = true;
    expect(actual).toEqual(expected);
    done();
  });

  it('should has maxLength set as 15', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Input maxLength={15} />);
    const actual = renderer.getRenderOutput().props.children[1].props.maxLength === 15;
    const expected = true;
    expect(actual).toEqual(expected);
    done();
  });

  it('should has maxLength set as 10 (validation.length)', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Input validation={{ length: 10 }} />);
    const actual = renderer.getRenderOutput().props.children[1].props.maxLength === 10;
    const expected = true;
    expect(actual).toEqual(expected);
    done();
  });

  it('should have an id of test', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Input id="test" />);
    const actual = renderer.getRenderOutput().props.children[1].props.id.includes('test');
    const expected = true;
    expect(actual).toEqual(expected);
    done();
  });

  it('should have a class of test', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Input componentClass="test" />);
    const actual = renderer.getRenderOutput().props.children[1].props.className.includes('test');
    const expected = true;
    expect(actual).toEqual(expected);
    done();
  });

  it('should have a name of test', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Input name="test" />);
    const actual = renderer.getRenderOutput().props.children[1].props.name.includes('test');
    const expected = true;
    expect(actual).toEqual(expected);
    done();
  });

  it('should have a type of number', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Input type="number" />);
    const actual = renderer.getRenderOutput().props.children[1].props.type.includes('number');
    const expected = true;
    expect(actual).toEqual(expected);
    done();
  });

  it('should have a fallback type of text', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Input />);
    const actual = renderer.getRenderOutput().props.children[1].props.type.includes('text');
    const expected = true;
    expect(actual).toEqual(expected);
    done();
  });

  it('should have a fallback type of text', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Input />);
    const actual = renderer.getRenderOutput().props.children[1].props.type.includes('text');
    const expected = true;
    expect(actual).toEqual(expected);
    done();
  });

  it('should render empty label', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Input />);
    const label = renderer.getRenderOutput().props.children[0];
    expect(label.props.children).toNotExist();
    done();
  });

  it('should render a proper placeholder', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Input label="label-text" placeholder="placeholder-text" />);
    const label = renderer.getRenderOutput().props.children[0];
    expect(label.props.children).toBe('placeholder-text');
    done();
  });

  it('should render a proper label if no placeholder is provided', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Input label="label-text" />);
    const label = renderer.getRenderOutput().props.children[0];
    expect(label.props.children).toBe('label-text');
    done();
  });

  it('should change the component state if keydow event is fired', (done) => {
    jsdom.env('<html><body></body></html>', [], (err, window) => {
      global.window = window;
      global.document = window.document;
      global.navigator = window.navigator;

      const inputComponent = TestUtils.renderIntoDocument(
        <Input id="test-input" label="label-text" placeholder="placeholder-text" />
      );
      const inputDomNode = TestUtils.findRenderedDOMComponentWithTag(
         inputComponent, 'input'
      );
      expect(inputComponent.state.labelPosition).toBe('inside');

      inputDomNode.value = 'test';
      TestUtils.Simulate.focus(inputDomNode);
      expect(inputComponent.state.labelPosition).toBe('top');

      delete global.window;
      delete global.document;
      delete global.navigator;

      done();
    });
  });

  it('should change the label text if a different placeholder is provided', (done) => {
    jsdom.env('<html><body></body></html>', [], (err, window) => {
      global.window = window;
      global.document = window.document;
      global.navigator = window.navigator;

      const inputComponent = TestUtils.renderIntoDocument(
        <Input id="test-input" label="label-text" placeholder="placeholder-text" />
      );
      const inputDomNode = TestUtils.findRenderedDOMComponentWithTag(
         inputComponent, 'input'
      );
      const labelDomNode = TestUtils.findRenderedDOMComponentWithTag(
         inputComponent, 'label'
      );
      expect(labelDomNode.textContent).toBe('placeholder-text');
      inputDomNode.value = 'test';
      TestUtils.Simulate.focus(inputDomNode);
      expect(labelDomNode.textContent).toBe('label-text');

      delete global.window;
      delete global.document;
      delete global.navigator;

      done();
    });
  });

  it('should render a proper label if a placeholder and a value are provided', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Input label="label-text" placeholder="placeholder-text" value="test" />);
    const label = renderer.getRenderOutput().props.children[0];
    expect(label.props.children).toBe('label-text');
    done();
  });

  it('should render an error validation message', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Input isInValid />);
    const errorLabel = renderer.getRenderOutput().props.children[2];
    expect(errorLabel).toExist();
    done();
  });

  it('should accept blank value if it\'s not required', (done) => {
    jsdom.env('<html><body></body></html>', [], (err, window) => {
      global.window = window;
      global.document = window.document;
      global.navigator = window.navigator;

      const errorMessage = 'test error message';
      const inputComponent = TestUtils.renderIntoDocument(
        <Input id="test-input" error={errorMessage} />
      );
      const inputDomNode = TestUtils.findRenderedDOMComponentWithTag(
         inputComponent, 'input'
      );
      TestUtils.Simulate.blur(inputDomNode);
      expect(TestUtils.scryRenderedDOMComponentsWithTag(
        inputComponent, 'span'
      ).length).toBe(0);

      delete global.window;
      delete global.document;
      delete global.navigator;

      done();
    });
  });

  it('should accept filled in value if it\'s required', (done) => {
    jsdom.env('<html><body></body></html>', [], (err, window) => {
      global.window = window;
      global.document = window.document;
      global.navigator = window.navigator;

      const errorMessage = 'test error message';
      const inputComponent = TestUtils.renderIntoDocument(
        <Input id="test-input" validation={{ required: true }} error={errorMessage} />
      );
      const inputDomNode = TestUtils.findRenderedDOMComponentWithTag(
         inputComponent, 'input'
      );
      inputDomNode.value = 'something';
      TestUtils.Simulate.blur(inputDomNode);
      expect(TestUtils.scryRenderedDOMComponentsWithTag(
        inputComponent, 'span'
      ).length).toBe(0);

      delete global.window;
      delete global.document;
      delete global.navigator;

      done();
    });
  });
});
