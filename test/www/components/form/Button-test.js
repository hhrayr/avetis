 import React from 'react';
 import TestUtils from 'react-addons-test-utils';
 import expect from 'expect';
 import { describe, it } from 'mocha';
 import Button from '../../../../www/components/form/Button';

 describe('Button Component', () => {
   it('should render', (done) => {
     const renderer = TestUtils.createRenderer();
     renderer.render(<Button />);
     const actual = renderer.getRenderOutput().props.className.includes('button');
     const expected = true;
     expect(actual).toEqual(expected);
     done();
   });

   it('should have class for color', (done) => {
     const renderer = TestUtils.createRenderer();
     renderer.render(<Button color="orange" />);
     const actual = renderer.getRenderOutput().props.className.includes('orange');
     const expected = true;
     expect(actual).toEqual(expected);
     done();
   });

   it('should have a button text', (done) => {
     const btnText = 'Test';
     const renderer = TestUtils.createRenderer();
     renderer.render(<Button text={btnText} />);
     const actual = renderer.getRenderOutput().props.children.props.children.includes(btnText);
     const expected = true;
     expect(actual).toEqual(expected);
     done();
   });

   it('should have a disabled state', (done) => {
     const renderer = TestUtils.createRenderer();
     renderer.render(<Button disabled />);
     const actual = renderer.getRenderOutput().props.className.includes('disabled');
     const expected = true;
     expect(actual).toEqual(expected);
     done();
   });

   it('should have a default fallback color', (done) => {
     const renderer = TestUtils.createRenderer();
     renderer.render(<Button />);
     const actual = renderer.getRenderOutput().props.className.includes('green');
     const expected = true;
     expect(actual).toEqual(expected);
     done();
   });
 });
