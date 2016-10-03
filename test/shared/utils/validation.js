import expect from 'expect';
import { describe, it } from 'mocha';
import sinon from 'sinon';
import {
  isEmail,
  isNumeric,
  isPassword,
  isValidLength,
  getPasswordSecurityLevel,
  isMobilePhoneNumber,
  formatNationalNumber,
  formatCountryCode,
  isDate,
  isCreditCardNumber,
  isCreditCardValidity,
  isIBAN,
  isBIC,
} from '../../../shared/utils/validation';

describe('Validation Utils', () => {
  it('should not accept empty email', (done) => {
    expect(isEmail('')).toNotEqual(true);
    expect(isEmail(null)).toNotEqual(true);
    expect(isEmail()).toNotEqual(true);
    done();
  });

  it('should accept correct email', (done) => {
    expect(isEmail('test@excample.com')).toEqual(true);
    done();
  });

  it('should not accept incorrect email', (done) => {
    expect(isEmail('testexcample.com')).toNotEqual(true);
    done();
  });

  it('should not accept empty number', (done) => {
    expect(isNumeric('')).toNotEqual(true);
    expect(isNumeric(null)).toNotEqual(true);
    expect(isNumeric()).toNotEqual(true);
    done();
  });

  it('should not accept incorect number', (done) => {
    expect(isNumeric(' 2')).toNotEqual(true);
    expect(isNumeric('3t4')).toNotEqual(true);
    expect(isNumeric('123t')).toNotEqual(true);
    done();
  });

  it('should accept correct number', (done) => {
    expect(isNumeric('2')).toEqual(true);
    expect(isNumeric(2)).toEqual(true);
    expect(isNumeric('12678')).toEqual(true);
    done();
  });

  it('should not accept empty min-max', (done) => {
    expect(isValidLength('')).toNotEqual(true);
    expect(isValidLength(null)).toNotEqual(true);
    expect(isValidLength()).toNotEqual(true);
    expect(isValidLength('', 1, 2)).toNotEqual(true);
    expect(isValidLength(null, 1, 2)).toNotEqual(true);
    expect(isValidLength(undefined, 1, 2)).toNotEqual(true);
    done();
  });

  it('should accept blank min-max', (done) => {
    expect(isValidLength('test')).toEqual(true);
    expect(isValidLength('test', undefined)).toEqual(true);
    expect(isValidLength('test', undefined, undefined)).toEqual(true);
    done();
  });

  it('should accept correct min-max', (done) => {
    expect(isValidLength('test', 4)).toEqual(true);
    expect(isValidLength('test', undefined, 4)).toEqual(true);
    expect(isValidLength('test', 4, 4)).toEqual(true);
    expect(isValidLength('test', 1, 14)).toEqual(true);
    done();
  });

  it('should not accept incorrect min-max', (done) => {
    expect(isValidLength('test', 5)).toNotEqual(true);
    expect(isValidLength('test', undefined, 3)).toNotEqual(true);
    expect(isValidLength('test', 1, 3)).toNotEqual(true);
    expect(isValidLength('test', 5, 14)).toNotEqual(true);
    done();
  });

  it('should accept correct password', (done) => {
    expect(isPassword('12abcdef')).toEqual(true);
    expect(isPassword('1abcdef2')).toEqual(true);
    expect(isPassword('abcdef12')).toEqual(true);
    expect(isPassword('%$abcdef')).toEqual(true);
    expect(isPassword('!abcdef_')).toEqual(true);
    expect(isPassword('abcdef%#')).toEqual(true);
    done();
  });

  it('should not accept empty password', (done) => {
    expect(isPassword('')).toNotEqual(true);
    expect(isPassword(null)).toNotEqual(true);
    expect(isPassword()).toNotEqual(true);
    done();
  });

  it('should not accept incorrect password', (done) => {
    expect(isPassword('1234567')).toNotEqual(true);
    expect(isPassword('1234567890123456')).toNotEqual(true);
    expect(isPassword('12345678')).toNotEqual(true);
    expect(isPassword('abcdefgh')).toNotEqual(true);
    expect(isPassword('äbcdefgh12')).toNotEqual(true);
    done();
  });

  it('should get the correct password security level', (done) => {
    expect(getPasswordSecurityLevel('')).toEqual(0);
    expect(getPasswordSecurityLevel()).toEqual(0);
    expect(getPasswordSecurityLevel(null)).toEqual(0);
    expect(getPasswordSecurityLevel('1')).toEqual(1);
    expect(getPasswordSecurityLevel('123')).toEqual(1);
    expect(getPasswordSecurityLevel('1234')).toEqual(2);
    expect(getPasswordSecurityLevel('1234567')).toEqual(2);
    expect(getPasswordSecurityLevel('12345678')).toEqual(2);
    expect(getPasswordSecurityLevel('abcdefgh')).toEqual(2);
    expect(getPasswordSecurityLevel('1abcdefg')).toEqual(2);
    expect(getPasswordSecurityLevel('a1233456789123456')).toEqual(2);
    expect(getPasswordSecurityLevel('12abcdef')).toEqual(3);
    done();
  });

  it('validate phone number - shold accept correct mobile phone numbers', (done) => {
    const validPhoneNumbers = [
      { number: '15781470361', countryCode: '+49', nationalNumber: '15781470361',
        formatedCountryCode: '+49' },
      { number: '015781470361', countryCode: '0049', nationalNumber: '15781470361',
        formatedCountryCode: '+49' },
      { number: '15781470361', countryCode: '+49', nationalNumber: '15781470361',
        formatedCountryCode: '+49' },
      { number: '157 81 470361', countryCode: '0049', nationalNumber: '15781470361',
        formatedCountryCode: '+49' },
      { number: '700123456', countryCode: '0046', nationalNumber: '700123456',
        formatedCountryCode: '+46' },
      { number: '+46 7 30 123 456', countryCode: '+46', nationalNumber: '730123456',
        formatedCountryCode: '+46' },
      { number: '0046790123456', countryCode: '0046', nationalNumber: '790123456',
        formatedCountryCode: '+46' },
      { number: '60386943', countryCode: '+45', nationalNumber: '60386943',
        formatedCountryCode: '+45' },
      { number: '20 386 943', countryCode: '0045', nationalNumber: '20386943',
        formatedCountryCode: '+45' },
      { number: '20386943', countryCode: '+45', nationalNumber: '20386943',
        formatedCountryCode: '+45' },
      { number: '20386943', countryCode: '0045', nationalNumber: '20386943',
        formatedCountryCode: '+45' },
      { number: '0650 123 456', countryCode: '+43', nationalNumber: '650123456',
        formatedCountryCode: '+43' },
      { number: '664123456', countryCode: '0043', nationalNumber: '664123456',
        formatedCountryCode: '+43' },
      { number: '0677123456', countryCode: '+43', nationalNumber: '677123456',
        formatedCountryCode: '+43' },
      { number: '688123456', countryCode: '0043', nationalNumber: '688123456',
        formatedCountryCode: '+43' },
      { number: '07312123456', countryCode: '+44', nationalNumber: '7312123456',
        formatedCountryCode: '+44' },
      { number: '7912123456', countryCode: '0044', nationalNumber: '7912123456',
        formatedCountryCode: '+44' },
      { number: '07624 123456', countryCode: '+44', nationalNumber: '7624123456',
        formatedCountryCode: '+44' },
      { number: '7812123456', countryCode: '0044', nationalNumber: '7812123456',
        formatedCountryCode: '+44' },
      { number: '7911812345', countryCode: '+44', nationalNumber: '7911812345',
        formatedCountryCode: '+44' },
      { number: '7911212345', countryCode: '0044', nationalNumber: '7911212345',
        formatedCountryCode: '+44' },
      { number: '0468123456', countryCode: '+32', nationalNumber: '468123456',
        formatedCountryCode: '+32' },
      { number: '471234567', countryCode: '0032', nationalNumber: '471234567',
        formatedCountryCode: '+32' },
      { number: '470123456', countryCode: '+32', nationalNumber: '470123456',
        formatedCountryCode: '+32' },
      { number: '491234567', countryCode: '0032', nationalNumber: '491234567',
        formatedCountryCode: '+32' },
      { number: '3342123456', countryCode: '+39', nationalNumber: '3342123456',
        formatedCountryCode: '+39' },
      { number: '3342123456', countryCode: '0039', nationalNumber: '3342123456',
        formatedCountryCode: '+39' },
      { number: '091368164', countryCode: '00374', nationalNumber: '91368164',
        formatedCountryCode: '+374' },
    ];

    for (let i = 0; i < validPhoneNumbers.length; i++) {
      const validNumber = validPhoneNumbers[i];
      expect(isMobilePhoneNumber(validNumber)).toEqual(true);
      expect(formatNationalNumber(validNumber)).toEqual(validNumber.nationalNumber);
      expect(formatCountryCode(validNumber)).toEqual(validNumber.formatedCountryCode);
    }

    done();
  });

  it('validate phone number - shold not accept incorrect mobile phone numbers', (done) => {
    const invalidPhoneNumbers = [
      undefined,
      null,
      { },
      { number: '89781470361' },
      { countryCode: '+49' },
      { number: '89781470361', countryCode: '+49' },
      { number: '089781470361', countryCode: '+49' },
      { number: '004989781470361', countryCode: '+49' },
      { number: '897 81 470361', countryCode: '+49' },
      { number: '210123456', countryCode: '+46' },
      { number: '2 10 123 456', countryCode: '+46' },
      { number: '210123456', countryCode: '+46' },
      { number: '10386943', countryCode: '+45' },
      { number: '19 386 943', countryCode: '+45' },
      { number: '18386943', countryCode: '+45' },
      { number: '17386943', countryCode: '+45' },
      { number: '0450 123 456', countryCode: '+43' },
      { number: '414123456', countryCode: '+43' },
      { number: '0267123456', countryCode: '+43' },
      { number: '158123456', countryCode: '+43' },
      { number: '06312123456', countryCode: '+44' },
      { number: '6912123456', countryCode: '+44' },
      { number: '06624 123456', countryCode: '+44' },
      { number: '6812123456', countryCode: '+44' },
      { number: '6911812345', countryCode: '+44' },
      { number: '7911345', countryCode: '+44' },
      { number: '0168123456', countryCode: '+32' },
      { number: '47123', countryCode: '+32' },
      { number: '370123456', countryCode: '+32' },
      { number: '991234567', countryCode: '+32' },
      { number: '42123456', countryCode: '+39' },
      { number: '5452123456', countryCode: '+39' },
      { number: '33421234', countryCode: '+39' },
    ];

    for (let i = 0; i < invalidPhoneNumbers.length; i++) {
      expect(isMobilePhoneNumber(invalidPhoneNumbers[i])).toEqual(false);
    }

    done();
  });

  it('should accept correct dates', (done) => {
    const validDates = [
      { year: 2020, month: 12, day: 31 },
      { year: 2016, month: 2, day: 29 },
      { year: 1900, month: 1, day: 1 },
    ];
    for (let i = 0; i < validDates.length; i++) {
      expect(isDate(validDates[i])).toEqual(true);
    }
    done();
  });

  it('should not accept incorrect dates', (done) => {
    const invalidDates = [
      { year: 2020, month: 13, day: 1 },
      { year: 2015, month: 2, day: 29 },
      { year: 2015, month: 0, day: 0 },
      { year: 2015, month: 1, day: 32 },
      { year: 1900, day: 1 },
      null,
      undefined,
      {},
    ];
    for (let i = 0; i < invalidDates.length; i++) {
      expect(isDate(invalidDates[i])).toNotEqual(true);
    }
    done();
  });

  it('should accept correct credit card numbers', (done) => {
    const validCCNumbers = [
      '4111111111111111',
      '375093951061002',
      '4344992424580012',
    ];
    for (let i = 0; i < validCCNumbers.length; i++) {
      expect(isCreditCardNumber(validCCNumbers[i])).toEqual(true);
    }
    done();
  });

  it('should not accept incorrect credit card numbers', (done) => {
    const invalidCCNumbers = [
      '1111111111111',
      '37593951061002',
      '434492424580012',
      '',
      null,
      undefined,
    ];
    for (let i = 0; i < invalidCCNumbers.length; i++) {
      expect(isCreditCardNumber(invalidCCNumbers[i])).toEqual(false);
    }
    done();
  });

  it('should accept correct IBAN', (done) => {
    const validIBANs = [
      'DE43702501500028720614',
      'DE19123412341234123412',
    ];
    for (let i = 0; i < validIBANs.length; i++) {
      expect(isIBAN(validIBANs[i])).toEqual(true);
    }
    done();
  });

  it('should not accept incorrect IBAN', (done) => {
    const invalidIBANs = [
      'D43702501500028714',
      '37593951061002',
      '434480012',
      '',
      null,
      undefined,
    ];
    for (let i = 0; i < invalidIBANs.length; i++) {
      expect(isIBAN(invalidIBANs[i])).toEqual(false);
    }
    done();
  });

  it('should accept correct BIC', (done) => {
    const validBICs = [
      'AARBDE5W360',
      'EADSDEMM',
      'BCMADEFF',
      'BYLADEM1KMS',
    ];
    for (let i = 0; i < validBICs.length; i++) {
      expect(isBIC(validBICs[i])).toEqual(true);
    }
    done();
  });

  it('should not accept incorrect BIC', (done) => {
    const invalidBICs = [
      '28714',
      'AAA',
      '',
      null,
      undefined,
    ];
    for (let i = 0; i < invalidBICs.length; i++) {
      expect(isBIC(invalidBICs[i])).toEqual(false);
    }
    done();
  });

  it('should accept correct credit card validities', (done) => {
    const clock = sinon.useFakeTimers(new Date(2010, 7 - 1, 6).getTime());

    const validValidities = [
      { year: 2010, month: 8 },
      { year: 2011, month: 6 },
      { year: 2012, month: 12 },
    ];

    for (let i = 0; i < validValidities.length; i++) {
      expect(isCreditCardValidity(validValidities[i])).toEqual(true);
    }

    clock.restore();
    done();
  });

  it('should not accept incorrect credit card validities', (done) => {
    const clock = sinon.useFakeTimers(new Date(2010, 7 - 1, 6).getTime());

    const invalidValidities = [
      { year: 2010, month: 7 },
      { year: 1900, month: 6 },
      { year: 2009, month: 12 },
      { year: 2012, month: 13 },
      { year: 2012, month: 0 },
      { year: 2012 },
      { month: 6 },
      { },
      null,
      undefined,
    ];

    for (let i = 0; i < invalidValidities.length; i++) {
      expect(isCreditCardValidity(invalidValidities[i])).toEqual(false);
    }

    clock.restore();
    done();
  });
});
