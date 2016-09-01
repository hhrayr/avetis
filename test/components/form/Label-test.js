import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import { describe, it } from 'mocha';
import Label from '../../../components/form/Label';

describe('LabelComponent', () => {
  it('should render', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Label label="test"/>);
    const actual = renderer.getRenderOutput().props.children.type === 'label';
    const expected = true;
    expect(actual).toEqual(expected);
    done();
  });

  it('should have a label text', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Label label="text"/>);
    const actual = renderer.getRenderOutput().props.children.props.children.includes('text');
    const expected = true;
    expect(actual).toEqual(expected);
    done();
  });

  it('should have a class of test', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Label componentClass="test" label="test"/>);
    const actual = renderer.getRenderOutput().props.children.props.className.includes('test');
    const expected = true;
    expect(actual).toEqual(expected);
    done();
  });

  it('should have a class of label by default', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Label label="test"/>);
    const actual = renderer.getRenderOutput().props.children.props.className;
    const expected = 'label';
    expect(actual).toEqual(expected);
    done();
  });
});
