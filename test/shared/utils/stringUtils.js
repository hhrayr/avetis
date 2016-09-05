import expect from 'expect';
import { describe, it } from 'mocha';
import { trimSpace, trimMinusSpace } from '../../../shared/utils/stringUtils';

describe('String Utils', () => {
  it('trimSpace: should behave as expected with blank values', (done) => {
    expect(trimSpace('')).toEqual('');
    expect(trimSpace(null)).toEqual(null);
    expect(trimSpace()).toEqual(undefined);
    done();
  });

  it('trimSpace: should trim spaces', (done) => {
    expect(trimSpace(' ')).toEqual('');
    expect(trimSpace(' - - - ')).toEqual('---');
    expect(trimSpace(' a ')).toEqual('a');
    expect(trimSpace(' t e s t ')).toEqual('test');
    done();
  });

  it('trimMinusSpace: should behave as expected with blank values', (done) => {
    expect(trimMinusSpace('')).toEqual('');
    expect(trimMinusSpace(null)).toEqual(null);
    expect(trimMinusSpace()).toEqual(undefined);
    done();
  });

  it('trimMinusSpace: should trim spaces and minuses', (done) => {
    expect(trimMinusSpace(' - - ')).toEqual('');
    expect(trimMinusSpace(' - t - e - s - t - ')).toEqual('test');
    done();
  });
});
