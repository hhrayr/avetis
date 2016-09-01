import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import { describe, it } from 'mocha';
import GreenButton from '../../../../components/modules/buttons/GreenBigButton';

describe('GreenButtonComponent', () => {
  it('should render', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<GreenButton />);
    const actual = renderer.getRenderOutput().type === 'div' &&
    renderer.getRenderOutput().props.className.includes('button green');
    const expected = true;
    expect(actual).toEqual(expected);
    done();
  });

  it('should have a button text of value text', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<GreenButton label="text"/>);
    const actual = renderer.getRenderOutput().props.children.includes('text');
    const expected = true;
    expect(actual).toEqual(expected);
    done();
  });
});
