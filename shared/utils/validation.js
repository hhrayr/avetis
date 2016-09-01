import { PhoneNumberFormat, PhoneNumberUtil, PhoneNumberType } from './libphonenumber';
import { find, countBy, includes } from 'lodash';
import { trimSpace } from './stringUtils';

export function isEmail(value) {
  const emailRegexPattern = /^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegexPattern.test(value);
}

export function isNumeric(value) {
  const numberRegexPattern = /^\d+$/;
  return numberRegexPattern.test(value);
}

export function isValidLength(value, min, max) {
  if (!value ||
    (!isNaN(min) && value.length < min) ||
    (!isNaN(max) && value.length > max)) {
    return false;
  }
  return true;
}

export function isPassword(value) {
  if (!value || value.length < 8 || value.length > 15) {
    return false;
  }

  const umlauts = ['ä', 'ö', 'ü'];
  const containsUmlaut = find(value, (e) => {
    if (includes(umlauts, e)) {
        return true;
    }
  });
  if (containsUmlaut) {
    return false;
  }

  const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const special = ['_', '-', '#', '(', ')', '@', '§', '!', '%', '&', '$'].concat(numbers);

  const result = countBy(value, function (e) {
    if (includes(special, e)) {
        return 'special';
    } else {
        return 'other';
    }
  });

  if (!result['special'] || !result['other'] || result['special'] < 2) {
    return false;
  }

  return true;
}

export function getPasswordSecurityLevel(value) {
  if (!value) {
    return 0;
  }
  const securityLevelBreaks = [3, 7];
  for (let i = 0; i < securityLevelBreaks.length; i++) {
    if (value.length <= securityLevelBreaks[i]) {
      return ++i;
    }
  }
  return isPassword(value) ? ++securityLevelBreaks.length : securityLevelBreaks.length;
}

export function isMobilePhoneNumber(value) {
  if (value && value.number && value.countryCode) {
    try {
      const phoneUtil = PhoneNumberUtil.getInstance();
      const regionCode = phoneUtil.getRegionCodeForCountryCode(parseInt(value.countryCode.replace('+', '').replace('00', '')));
      const phoneNumber = phoneUtil.parse(value.number, regionCode);
      return includes([PhoneNumberType.MOBILE, PhoneNumberType.FIXED_LINE_OR_MOBILE], phoneUtil.getNumberType(phoneNumber));
    } catch (err) { }
  }
  return false;
}

export function formatNationalNumber(value) {
  if (value && value.number && value.countryCode) {
    try {
      const phoneUtil = PhoneNumberUtil.getInstance();
      const regionCode = phoneUtil.getRegionCodeForCountryCode(parseInt(value.countryCode.replace('+', '').replace('00', '')));
      const phoneNumber = phoneUtil.parse(value.number, regionCode);
      return phoneNumber.getNationalNumber();
    } catch (err) { }
    return value.number;
  }
  return null;
}

export function formatCountryCode(value) {
  if (value && value.countryCode) {
    let countryCode = value.countryCode;
    if (countryCode.length > 0 && countryCode[0] !== '+') {
      countryCode = `+${countryCode.substr(2)}`;
    }
    return countryCode;
  }
  return null;
}

export function isDate(value) {
  if (value && value.year && value.month && value.day) {
    const composedDate = new Date(value.year, value.month - 1, value.day);
    return composedDate &&
      composedDate.getDate() === value.day &&
      composedDate.getMonth() === value.month - 1 &&
      composedDate.getFullYear() === value.year;
  }
  return false;
}

export function isCreditCardNumber(value) {
  const ccNumberRegexPattern = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
  return ccNumberRegexPattern.test(value);
}

export function isCreditCardNumber(value) {
  const ccNumberRegexPattern = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
  return ccNumberRegexPattern.test(value);
}

export function isIBAN(value) {
  const ibanRegexPattern = /^[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){17}$/;
  return ibanRegexPattern.test(value);
}

export function isBIC(value) {
  if (value) {
    const bicRegexPattern = /^[a-zA-Z]{6}[a-zA-Z0-9]{2}([a-zA-Z0-9]?){3}$/;
    return bicRegexPattern.test(value);
  }
  return false;
}

export function isCreditCardValidity(value) {
  if (value && isNumeric(value.year) && isNumeric(value.month)) {
    const curDate = new Date();
    const curYear = curDate.getFullYear();
    if (value.year >= curYear && value.month >= 1 && value.month <= 12) {
      const curMonth = curDate.getMonth() + 1;
      return value.year > curYear || value.month > curMonth;
    }
  }
  return false;
}

export function isCodiceFiscale(value, validation) {
  if (value && validation && validation.gender && isDate(validation.dateOfBirth)) {
    // got from http://forum.html.it/forum/showthread/t-990885.html
    const cf = trimSpace(value.toUpperCase());
    if(/^[A-Z0-9]{16}$/.test(cf)) {
      const set1 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const set2 = 'ABCDEFGHIJABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const setpari = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const setdisp = 'BAKPLCQDREVOSFTGUHMINJWZYX';

      let s = 0;
      for (let i = 0; i <= 14; i += 2) {
        s += setdisp.indexOf(set2.charAt(set1.indexOf(cf.charAt(i))));
      }
      for (let i = 1; i <= 13; i += 2) {
        s += setpari.indexOf(set2.charAt(set1.indexOf(cf.charAt(i))));
      }

      if (s % 26 !== cf.charCodeAt(15) - 'A'.charCodeAt(0)) {
        return false;
      }

      if (cf.substr(6, 2) !== validation.dateOfBirth.year.toString().substr(2, 2)) {
        return false;
      }

      let messe;
      switch (validation.dateOfBirth.month) {
        case 1: messe = 'A'; break;
        case 2: messe = 'B'; break;
        case 3: messe = 'C'; break;
        case 4: messe = 'D'; break;
        case 5: messe = 'E'; break;
        case 6: messe = 'H'; break;
        case 7: messe = 'L'; break;
        case 8: messe = 'M'; break;
        case 9: messe = 'P'; break;
        case 10: messe = 'R'; break;
        case 11: messe = 'S'; break;
        case 12: messe = 'T'; break;
        default: break;
      }
      if (cf.substr(8, 1) !== messe) {
        return false;
      }

      let giorno = validation.dateOfBirth.day +
        (validation.gender === 'F' ? 40 : 0);
      giorno = (giorno < 10 ? '0' : '') + giorno;

      if (cf.substr(9, 2) !== giorno) {
        return false;
      }

      return true;
    }
  }
  return false;
}
