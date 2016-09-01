import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import { describe, it } from 'mocha';
import DnCountrySelector from '../../../components/form/DnCountrySelector';

describe('Dn Country Selector Component', () => {
  it('should render', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<DnCountrySelector id="test-select" />);
    const component = renderer.getRenderOutput();
    expect(component.props.id).toEqual('test-select-container');
    done();
  });

  it('should render with error', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<DnCountrySelector id="test-select" isInValid={true} error="test-error" />);
    const component = renderer.getRenderOutput();
    expect(component.props.children.props.isInValid).toEqual(true);
    done();
  });
});
