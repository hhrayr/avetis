import React from 'react';
import { merge } from 'lodash';
import BaseFormElement from '../BaseFormElement';
import { getTranslation } from '../../Tsl';
import { trimMinusSpace } from '../../../utils/stringUtils';
import Select from '../Select';
import Input from '../Input';
import CCValidUntil from './CCValidUntil';
import { isValidLength, isCreditCardNumber, isCreditCardValidity } from '../../../utils/validation';

class CCPaymentMethod extends BaseFormElement {
  constructor(props) {
    super(props);
    this.onCardProviderValueChange = this.onCardProviderValueChange.bind(this);
    this.onCardNumberValueChange = this.onCardNumberValueChange.bind(this);
    this.onValidUntilValueChange = this.onValidUntilValueChange.bind(this);
    this.onSecurityCodeValueChange = this.onSecurityCodeValueChange.bind(this);
    this.onCardNumberFocus = this.onCardNumberFocus.bind(this);
    this.onSecurityCodeFocus = this.onSecurityCodeFocus.bind(this);
  }

  onCardProviderValueChange(payload) {
    const value = merge(this.getValue(), { issuer: payload.value });
    this.fireOnValueChange(value);
  }

  onCardNumberValueChange(payload) {
    const value = merge(this.getValue(), { number: trimMinusSpace(payload.value) });
    this.fireOnValueChange(value);
  }

  onValidUntilValueChange(payload) {
    const value = merge(this.getValue(), { validity: payload.value });
    this.fireOnValueChange(value);
  }

  onSecurityCodeValueChange(payload) {
    const value = merge(this.getValue(), { seccode: payload.value });
    this.fireOnValueChange(value);
  }

  fireOnValueChange(value) {
    if (this.props.onValueChange) {
      this.props.onValueChange({
        id: this.props.id,
        segmentId: this.props.segmentId,
        value,
      });
    }
  }

  onCardNumberFocus(params) {
    this.fireOnElementFocus(params);
  }

  onSecurityCodeFocus(params) {
    this.fireOnElementFocus(params);
  }

  fireOnElementFocus(params) {
    if (this.props.onElementFocus) {
      this.props.onElementFocus(params);
    }
  }

  getValue() {
    return this.props.value;
  }

  renderCardProvidersElement() {
    const cardProvidersId = `${this.props.id}-card-provider`;
    return (
      <Select
        key={cardProvidersId}
        id={cardProvidersId}
        segmentId={this.props.segmentId}
        options={this.getCardProvidersOptions()}
        value={this.getValue().issuer}
        label={getTranslation(this.props.language,
          'registration.billingdetails.cardproviders')}
        error={getTranslation(this.props.language,
          'registration.billingdetails.error.cardproviders')}
        onValueChange={this.onCardProviderValueChange}
        isInValid={this.getCardProvidersIsInValid()}
      />
    );
  }

  getCardProvidersOptions() {
    return this.props.CCProviders.map((provider) => {
      return {
        value: provider,
        text: provider,
      };
    });
  }

  getCardProvidersIsInValid() {
    return this.props.isInValid && !isValidLength(this.getValue().issuer, 1);
  }

  renderCardNumberElement() {
    const cardNumberId = `${this.props.id}-card-number`;
    return (
      <Input
        key={cardNumberId}
        id={cardNumberId}
        name={cardNumberId}
        segmentId={this.props.segmentId}
        value={this.getValue().number}
        label={getTranslation(this.props.language,
          'registration.billingdetails.cardnumber')}
        error={getTranslation(this.props.language,
          'registration.billingdetails.error.cardnumber')}
        onValueChange={this.onCardNumberValueChange}
        onFocus={this.onCardNumberFocus}
        isInValid={this.getCardNumbersIsInValid()}
      />
    );
  }

  getCardNumbersIsInValid() {
    return this.props.isInValid && !isCreditCardNumber(this.getValue().number);
  }

  renderValidUntilElement() {
    const validUntilId = `${this.props.id}-valid-until`;
    return (
      <CCValidUntil
        key={validUntilId}
        id={validUntilId}
        segmentId={this.props.segmentId}
        label={getTranslation(this.props.language,
          'registration.billingdetails.valid')}
        error={getTranslation(this.props.language,
          'registration.billingdetails.error.valid')}
        infotext={getTranslation(this.props.language,
          'registration.billingdetails.infotext.valid')}
        value={this.getValue().validity}
        onValueChange={this.onValidUntilValueChange}
        isInValid={this.getValidUntilIsInValid()}
        containerClassName="p50-sm break-line"
      />
    );
  }

  getValidUntilIsInValid() {
    const validity = this.getValue().validity;
    return this.props.isInValid && !isCreditCardValidity(validity);
  }

  renderSecurityCodeElement() {
    const securityCodeId = `${this.props.id}-security-code`;
    return (
      <Input
        key={securityCodeId}
        id={securityCodeId}
        name={securityCodeId}
        segmentId={this.props.segmentId}
        value={this.getValue().seccode}
        label={getTranslation(this.props.language,
          'registration.billingdetails.securitycode')}
        infotext={getTranslation(this.props.language,
          'registration.billingdetails.infotext.securitycode')}
        error={getTranslation(this.props.language,
          'registration.billingdetails.error.securitycode')}
        onValueChange={this.onSecurityCodeValueChange}
        isInValid={this.getSecurityCodeIsInValid()}
        containerClassName="p50-sm break-line"
        onFocus={this.onSecurityCodeFocus}
      />
    );
  }

  getSecurityCodeIsInValid() {
    return this.props.isInValid && !isValidLength(this.getValue().seccode);
  }

  render() {
    return (
      <div className={this.getContainerClassName()}
        id={`${this.props.id}-container`}
        ref={`${this.props.id}-container`}
      >
        {this.renderCardProvidersElement()}
        {this.renderCardNumberElement()}
        {this.renderValidUntilElement()}
        {this.renderSecurityCodeElement()}
      </div>
    );
  }
}

CCPaymentMethod.propTypes = {
  id: React.PropTypes.string,
  segmentId: React.PropTypes.any,
  language: React.PropTypes.string,
  value: React.PropTypes.object,
  CCProviders: React.PropTypes.array,
  onElementFocus: React.PropTypes.func,
};

export default CCPaymentMethod;
