import expect from 'expect';
import { describe, it } from 'mocha';
import { isSchemaElementValid } from '../../utils/schemaElementValidation';
import sinon from 'sinon';

describe('Schema Element Validation', () => {
  it('should accept correct values', (done) => {
    const validationElements = [
      { validation: { required: true, pattern: 'email' }, value: 'test@excample.com' },
      { validation: { required: true, pattern: 'number' }, value: '1232498' },
      { validation: { required: true, pattern: 'digits' }, value: '1232498' },
      { validation: { required: true, pattern: 'password' }, value: '12abcdefg' },
      { validation: { required: true, pattern: 'mobilenumber' },
        value: { number: '015781470361', countryCode: '+49' } },
      { validation: { required: true }, value: 'value' },
      { validation: { required: false }, value: undefined },
      { validation: undefined, value: undefined },
      { validation: { minLength: 5, maxLength: 5 }, value: '12345' },
      { validation: { length: 5 }, value: '12345' },
    ];

    for (let i = 0; i < validationElements.length; i++) {
      const validationElement = validationElements[i];
      const isValid = isSchemaElementValid(
        validationElement.validation,
        validationElement.value);
      expect(isValid).toEqual(true);
    }

    done();
  });

  it('should not accept incorrect values', (done) => {
    const validationElements = [
      { validation: { required: true, pattern: 'email' }, value: 'testexcample.com' },
      { validation: { required: true, pattern: 'number' }, value: '12345sa' },
      { validation: { required: true, pattern: 'digits' }, value: '12345sa' },
      { validation: { required: true, pattern: 'password' }, value: '1abcdefghj' },
      { validation: { required: true, pattern: 'mobilenumber' },
        value: { number: '089781470361', countryCode: '0049' } },
      { validation: { required: true }, value: '' },
      { validation: { required: true }, value: undefined },
      { validation: { minLength: 5 }, value: '1234' },
      { validation: { maxLength: 5 }, value: '123456' },
      { validation: { length: 5 }, value: '123456' },
    ];

    for (let i = 0; i < validationElements.length; i++) {
      const validationElement = validationElements[i];
      const isValid = isSchemaElementValid(
        validationElement.validation,
        validationElement.value);
      expect(isValid).toEqual(false);
    }

    done();
  });

  it('should accept empty values for min/max length', (done) => {
    const validationElements = [
      { validation: { maxLength: 5 }, value: '' },
      { validation: { maxLength: 5 }, value: undefined },
      { validation: { minLength: 5 }, value: '' },
      { validation: { minLength: 5 }, value: undefined },
    ];

    for (let i = 0; i < validationElements.length; i++) {
      const validationElement = validationElements[i];
      const isValid = isSchemaElementValid(
        validationElement.validation,
        validationElement.value);
      expect(isValid).toEqual(true);
    }

    done();
  });

  it('should accept correct date values', (done) => {
    const clock = sinon.useFakeTimers(new Date(2010, 7 - 1, 6).getTime());

    const validationElements = [
      { validation: { pattern: 'date', required: false }, value: null },
      { validation: { pattern: 'date' }, value: undefined },
      { validation: { pattern: 'date' } },
      { validation: { pattern: 'date', required: true }, value: { year: 2010, month: 1, day: 1 } },
      { validation: { pattern: 'date' }, value: { year: 2016, month: 2, day: 29 } },
      { validation: { pattern: 'date', required: true }, value: { year: 1900, month: 1, day: 1 } },
      { validation: { pattern: 'date', required: true, minYearsSince: 1 },
        value: { year: 1900, month: 1, day: 1 } },
      { validation: { pattern: 'date', required: true, minYearsSince: 1 },
          value: { year: 2009, month: 7, day: 5 } },
      { validation: { pattern: 'date', required: true, inFuture: true },
          value: { year: 2010, month: 7, day: 7 } },
      { validation: { pattern: 'date', required: true, inFuture: true, maxYearsInFuture: 2 },
          value: { year: 2012, month: 7, day: 5 } },
    ];

    for (let i = 0; i < validationElements.length; i++) {
      const validationElement = validationElements[i];
      const isValid = isSchemaElementValid(
        validationElement.validation,
        validationElement.value);
      expect(isValid).toEqual(true);
    }

    clock.restore();
    done();
  });

  it('should not accept incorrect date values', (done) => {
    const clock = sinon.useFakeTimers(new Date(2010, 7 - 1, 6).getTime());

    const validationElements = [
      { validation: { pattern: 'date', required: true }, value: null },
      { validation: { pattern: 'date', required: true }, value: undefined },
      { validation: { pattern: 'date', required: true } },
      { validation: { pattern: 'date', required: true }, value: { year: 2015, month: 2, day: 29 } },
      { validation: { pattern: 'date', required: true }, value: { year: 2016, month: 14, day: 1 } },
      { validation: { pattern: 'date', required: true }, value: { year: 2016, month: 1, day: 32 } },
      { validation: { pattern: 'date', required: true, minYearsSince: 1 },
        value: { year: 2009, month: 7, day: 6 } },
      { validation: { pattern: 'date', required: true, inFuture: true },
          value: { year: 2010, month: 7, day: 6 } },
      { validation: { pattern: 'date', required: true, inFuture: true, maxYearsInFuture: 2 },
          value: { year: 2012, month: 7, day: 6 } },
    ];

    for (let i = 0; i < validationElements.length; i++) {
      const validationElement = validationElements[i];
      const isValid = isSchemaElementValid(
        validationElement.validation,
        validationElement.value);
      expect(isValid).toNotEqual(true);
    }

    clock.restore();
    done();
  });

  it('should accept correct payment values', (done) => {
    const clock = sinon.useFakeTimers(new Date(2010, 7 - 1, 6).getTime());

    const validationElements = [
      { validation: { pattern: 'payment', required: false }, value: null },
      { validation: { pattern: 'payment', required: false }, value: undefined },
      { validation: { pattern: 'payment', required: false } },
      { validation: { pattern: 'payment' } },
      { validation: { pattern: 'payment', required: true }, value: {
        type: 'CC',
        issuer: 'VISA',
        number: '4111111111111111',
        validity: { year: 2020, month: 12 },
        seccode: '124',
      } },
      { validation: { pattern: 'payment', required: true }, value: {
        type: 'CC',
        issuer: 'MasterCard',
        number: '4111111111111111',
        validity: { year: 2010, month: 8 },
        seccode: '124',
      } },
      { validation: { pattern: 'payment', required: true }, value: {
        type: 'EC',
        bank: 'MyBank',
        IBAN: 'DE43702501500028720614',
        BIC: 'AARBDE5W360',
        billpay: true,
      } },
    ];

    for (let i = 0; i < validationElements.length; i++) {
      const validationElement = validationElements[i];
      const isValid = isSchemaElementValid(
        validationElement.validation,
        validationElement.value);
      expect(isValid).toEqual(true);
    }

    clock.restore();
    done();
  });

  it('should not accept incorrect payment values', (done) => {
    const clock = sinon.useFakeTimers(new Date(2010, 7 - 1, 6).getTime());

    const validationElements = [
      { validation: { pattern: 'payment', required: true }, value: null },
      { validation: { pattern: 'payment', required: true }, value: undefined },
      { validation: { pattern: 'payment', required: true } },
      { validation: { pattern: 'payment', required: true }, value: {
        issuer: 'MasterCard',
        number: '4111111111111111',
        validity: { year: 2010, month: 8 },
        seccode: '124',
      } },
      { validation: { pattern: 'payment', required: true }, value: {
        type: 'CC',
        issuer: 'VISA',
        number: '4111111111111111',
        validity: { year: 2010, month: 7 },
        seccode: '124',
      } },
      { validation: { pattern: 'payment', required: true }, value: {
        type: 'CC',
        issuer: 'MasterCard',
        number: '4111111111111111',
        validity: { year: 1900, month: 8 },
        seccode: '124',
      } },
      { validation: { pattern: 'payment', required: true }, value: {
        type: 'CC',
        issuer: '',
        number: '4111111111111111',
        validity: { year: 2010, month: 8 },
        seccode: '124',
      } },
      { validation: { pattern: 'payment', required: true }, value: {
        type: 'CC',
        issuer: 'MasterCard',
        number: '41111111111111113434324',
        validity: { year: 2010, month: 8 },
        seccode: '124',
      } },
      { validation: { pattern: 'payment', required: true }, value: {
        type: 'CC',
        issuer: 'MasterCard',
        number: '4111111111111111',
        seccode: '124',
      } },
      { validation: { pattern: 'payment', required: true }, value: {
        type: 'CC',
        issuer: 'MasterCard',
        number: '4111111111111111',
        validity: { year: 2010, month: 8 },
      } },
      { validation: { pattern: 'payment', required: true }, value: {
        type: 'EC',
        bank: 'MyBank',
        IBAN: 'D34432403242343241500028720614',
        BIC: 'AARBDE5W360',
        billpay: true,
      } },
      { validation: { pattern: 'payment', required: true }, value: {
        type: 'EC',
        bank: 'MyBank',
        IBAN: 'DE43702501500028720614',
        BIC: 'E5W360',
        billpay: true,
      } },
      { validation: { pattern: 'payment', required: true }, value: {
        type: 'EC',
        bank: '',
        IBAN: 'DE43702501500028720614',
        BIC: 'AARBDE5W360',
        billpay: true,
      } },
      { validation: { pattern: 'payment', required: true }, value: {
        type: 'EC',
        BIC: 'AARBDE5W360',
        billpay: true,
      } },
      { validation: { pattern: 'payment', required: true }, value: {
        type: 'EC',
        bank: 'MyBank',
        IBAN: 'DE43702501500028720614',
        BIC: 'AARBDE5W360',
        billpay: false,
      } },
      { validation: { pattern: 'payment', required: true }, value: {
        type: 'EC',
        bank: 'MyBank',
        IBAN: 'DE43702501500028720614',
      } },
    ];

    for (let i = 0; i < validationElements.length; i++) {
      const validationElement = validationElements[i];
      const isValid = isSchemaElementValid(
        validationElement.validation,
        validationElement.value);
      expect(isValid).toEqual(false);
    }

    clock.restore();
    done();
  });

  it('should accept correct Codice Fiscales', (done) => {
    const validationElements = [
      { value: 'RSSMRA80A01C004M',
        validation: { dateOfBirth: { year: 1980, month: 1, day: 1 }, gender: 'M' } },
      { value: 'BRTRRT90R50C004S',
        validation: { dateOfBirth: { year: 1990, month: 10, day: 10 }, gender: 'F' } },
      { value: 'bmbPCL08H06F205D',
        validation: { dateOfBirth: { year: 2008, month: 6, day: 6 }, gender: 'M' } },
    ];

    for (let i = 0; i < validationElements.length; i++) {
      const validationElement = validationElements[i];
      const isValid = isSchemaElementValid(
        validationElement.validation,
        validationElement.value);
      expect(isValid).toEqual(true);
    }

    done();
  });

  it('should not accept incorrect Codice Fiscales', (done) => {
    const validationElements = [
      { value: 'RSSMRA80A01C004M',
        validation: { dateOfBirth: { year: 1981, month: 1, day: 1 }, gender: 'M' } },
      { value: 'RSSMRA80A01C004M',
        validation: { dateOfBirth: { year: 1980, month: 2, day: 1 }, gender: 'M' } },
      { value: 'RSSMRA80A01C004M',
        validation: { dateOfBirth: { year: 1980, month: 1, day: 3 }, gender: 'M' } },
      { value: 'RSSMRA80A01C004M',
        validation: { dateOfBirth: { year: 1980, month: 1, day: 1 }, gender: 'F' } },
      { value: 'RSSMRA80A01C004M',
        validation: { dateOfBirth: { month: 1, day: 1 }, gender: 'F' } },
      { value: 'RSSMRA80A01C004M',
        validation: { dateOfBirth: { year: 1980, month: 1, day: 1 } } },
      { value: 'BRTRRT90R50C004S',
        validation: { dateOfBirth: { year: 1990, month: 10, day: 10 }, gender: 'M' } },
      { value: 'bmbPCL08H06F205E',
        validation: { dateOfBirth: { year: 2008, month: 6, day: 6 }, gender: 'M' } },
      {},
      { validation: { } },
    ];

    for (let i = 0; i < validationElements.length; i++) {
      const validationElement = validationElements[i];
      const isValid = isSchemaElementValid(
        validationElement.validation,
        validationElement.value);
      expect(isValid).toEqual(true);
    }

    done();
  });
});
