import assert from 'assert';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { describe, it } from 'mocha';
import CityList from '../../../components/international/CityList';
import CityListItem from '../../../components/international/CityListItem';

describe('CityListComponent', () => {
  const fixtureData = { availableCities: ['Munich', 'Berlin', 'Hamburg'] };
  it('should render', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<CityList />);
    const available = renderer.getRenderOutput().props.className.includes('l-city-list');
    const expected = true;
    assert.equal(available, expected);
    done();
  });

  it('should have an headline of type h3', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<CityList />);
    const actual = renderer.getRenderOutput().props.children.props.children[0].type;
    const expected = 'h3';
    assert.equal(actual, expected);
    done();
  });

  it('should have children elements of type CityListItems', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<CityList availableCities={ fixtureData.availableCities }/>);
    const actual = renderer.getRenderOutput().props.children.props.children[1][0].type;
    const expected = CityListItem;
    assert.equal(actual, expected);
    done();
  });

  it('should have provided amount of CityListItems', (done) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<CityList availableCities={ fixtureData.availableCities }/>);
    const actual = renderer.getRenderOutput().props.children.props.children[1].length;
    const expected = fixtureData.availableCities.length;
    assert.equal(actual, expected);
    done();
  });
});
