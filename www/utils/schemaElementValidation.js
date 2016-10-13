import {
  isEmail,
  isNumeric,
  isPassword,
  isValidLength,
  isMobilePhoneNumber,
  isDate,
  isCreditCardNumber,
  isCreditCardValidity,
  isIBAN,
  isBIC,
} from '../../shared/utils/validation';

class SchemaElementValidation {
  constructor(validation, value) {
    this._validation = validation;
    this._value = this.getNormalizedValue(value);
  }

  getNormalizedValue(value) {
    let res = value;
    const validation = this.getValidation();
    if (validation && validation.pattern === 'date' && !isDate(value)) {
      res = null;
    }
    return res;
  }

  isValid() {
    return this.isValidRequired() && this.isValidPattern() && this.isValidCustom();
  }

  getValue() {
    return this._value;
  }

  getValidation() {
    return this._validation;
  }

  isValidRequired() {
    const value = this.getValue();
    if (!value) {
      const validation = this.getValidation();
      return !validation || !validation.required;
    }
    return true;
  }

  isValidPattern() {
    if (this.getValidation() && this.getValidation().pattern) {
      switch (this.getValidation().pattern) {
        case 'email': return this.isValidEmail();
        case 'digits':
        case 'number': return this.isValidNumber();
        case 'password': return this.isValidPassword();
        case 'mobilenumber': return this.isValidMobilePhoneNumber();
        case 'date': return this.isValidDate();
        case 'payment': return this.isValidPayment();
        default: return true;
      }
    }
    return true;
  }

  isValidEmail() {
    const value = this.getValue();
    return !value || isEmail(value);
  }

  isValidNumber() {
    const value = this.getValue();
    return !value || isNumeric(value);
  }

  isValidPassword() {
    const value = this.getValue();
    return !value || isPassword(value);
  }

  isValidMobilePhoneNumber() {
    const value = this.getValue();
    return !value || isMobilePhoneNumber(value);
  }

  isValidDate() {
    const value = this.getValue();
    if (value) {
      const validation = this.getValidation();
      if (validation) {
        const dateValue = new Date(value.year, value.month - 1, value.day);
        if (validation.inFuture) {
          return this.isValidFutureDate(dateValue, validation.maxYearsInFuture);
        }
        if (validation.minYearsSince) {
          return this.isValidPastDate(dateValue, validation.minYearsSince);
        }
      }
    }
    return true;
  }

  isValidFutureDate(dateValue, maxYearsInFuture) {
    const currentDate = new Date();
    return dateValue > currentDate && (!maxYearsInFuture ||
      dateValue < new Date(
        currentDate.getFullYear() + (maxYearsInFuture || 0),
        currentDate.getMonth(),
        currentDate.getDate()));
  }

  isValidPastDate(dateValue, minYearsInPast) {
    const currentDate = new Date();
    return dateValue < new Date(
      currentDate.getFullYear() - (minYearsInPast || 0),
      currentDate.getMonth(),
      currentDate.getDate());
  }

  isValidPayment() {
    const value = this.getValue();
    if (value) {
      switch (value.type) {
        case 'CC': return this.isValidCCPayment();
        case 'EC': return this.isValidECPayment();
        default: return false;
      }
    }
    return true;
  }

  isValidCCPayment() {
    const value = this.getValue();
    return value &&
      isValidLength(value.issuer, 1) &&
      isCreditCardNumber(value.number) &&
      isCreditCardValidity(value.validity) &&
      isValidLength(value.seccode, 1);
  }

  isValidECPayment() {
    const value = this.getValue();
    return value &&
      isValidLength(value.bank, 1) &&
      isIBAN(value.IBAN) &&
      isBIC(value.BIC) &&
      value.billpay;
  }

  isValidCustom() {
    const validation = this.getValidation();
    if (validation) {
      if (validation.length) {
        return this.isValidExactLength(validation.length);
      }
      if (validation.maxLength) {
        return this.isValidMaxLength(validation.maxLength);
      }
      if (validation.minLength) {
        return this.isValidMinLength(validation.minLength);
      }
    }
    return true;
  }

  isValidExactLength(length) {
    return this.isValidMaxLength(length) && this.isValidMinLength(length);
  }

  isValidMaxLength(maxLength) {
    const value = this.getValue();
    return !value || isValidLength(value, 0, maxLength);
  }

  isValidMinLength(minLength) {
    const value = this.getValue();
    return !value || isValidLength(value, minLength);
  }
}

export function isSchemaElementValid(validation, value) {
  return new SchemaElementValidation(validation, value).isValid();
}
