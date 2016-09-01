import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import { describe, it } from 'mocha';
import CarBarButton from '../../../../components/modules/map/CarBarButton';

describe('CarBarButtonComponent', () => {
  it('should render', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<CarBarButton className="carBar"/>);
    const actual = renderer.getRenderOutput().props.className.includes('button');
    const expected = true;
    expect(actual).toEqual(expected);
    done();
  });

  it('should have an class of test', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<CarBarButton className="test"/>);
    const actual = renderer.getRenderOutput().props.className.includes('test');
    const expected = true;
    expect(actual).toEqual(expected);
    done();
  });

  it('should not have an class of loading by default', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<CarBarButton />);
    const actual = renderer.getRenderOutput().props.className.includes('loading');
    const expected = false;
    expect(actual).toEqual(expected);
    done();
  });

  it('should have a class of loading', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<CarBarButton isLoading/>);
    const actual = renderer.getRenderOutput().props.className.includes('loading');
    const expected = true;
    expect(actual).toEqual(expected);
    done();
  });

  it('should have a loading bar children', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<CarBarButton isLoading/>);
    const actual = renderer.getRenderOutput().props.children
    .props.className.includes('loadingContainer');
    const expected = true;
    expect(actual).toEqual(expected);
    done();
  });

  it('should have a loading bar with a color of #ffffff', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<CarBarButton isLoading/>);
    const actual = renderer.getRenderOutput().props.children.props.children.props.color;
    const expected = '#ffffff';
    expect(actual).toEqual(expected);
    done();
  });
});
