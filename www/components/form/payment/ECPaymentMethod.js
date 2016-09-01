import React from 'react';
import { merge } from 'lodash';
import BaseFormElement from '../BaseFormElement';
import { getTranslation } from '../../Tsl';
import Input from '../Input';
import Checkbox from '../Checkbox';
import { isValidLength, isIBAN, isBIC } from '../../../utils/validation';

class ECPaymentMethod extends BaseFormElement {
  constructor(props) {
    super(props);
    this.onIBANValueChange = this.onIBANValueChange.bind(this);
    this.onBICValueChange = this.onBICValueChange.bind(this);
    this.onEcBankValueChange = this.onEcBankValueChange.bind(this);
    this.onBillpayValueChange = this.onBillpayValueChange.bind(this);
    this.onIBANFocus = this.onIBANFocus.bind(this);
    this.onBICFocus = this.onBICFocus.bind(this);
    this.onEcBankFocus = this.onEcBankFocus.bind(this);
  }

  onEcBankValueChange(payload) {
    const value = merge(this.getValue(), { bank: payload.value });
    this.fireOnValueChange(value);
  }

  onIBANValueChange(payload) {
    const value = merge(this.getValue(), { IBAN: payload.value });
    this.fireOnValueChange(value);
  }

  onBICValueChange(payload) {
    const value = merge(this.getValue(), { BIC: payload.value });
    this.fireOnValueChange(value);
  }

  onBillpayValueChange(payload) {
    const value = merge(this.getValue(), { billpay: payload.value });
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

  onIBANFocus(params) {
    this.fireOnElementFocus(params);
  }

  onBICFocus(params) {
    this.fireOnElementFocus(params);
  }

  onEcBankFocus(params) {
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

  renderIBANElement() {
    const ibanId = `${this.props.id}-IBAN`;
    return (
      <Input
        key={ibanId}
        id={ibanId}
        name={ibanId}
        segmentId={this.props.segmentId}
        value={this.getValue().IBAN}
        label={getTranslation(this.props.language,
          'registration.billingdetails.ecaccount')}
        error={getTranslation(this.props.language,
          'registration.billingdetails.error.ecaccount')}
        onValueChange={this.onIBANValueChange}
        isInValid={this.getIBANIsInValid()}
        onFocus={this.onIBANFocus}
      />
    );
  }

  getIBANIsInValid() {
    return this.props.isInValid && !isIBAN(this.getValue().IBAN);
  }

  renderBICElement() {
    const bicId = `${this.props.id}-BIC`;
    return (
      <Input
        key={bicId}
        id={bicId}
        name={bicId}
        segmentId={this.props.segmentId}
        value={this.getValue().BIC}
        label={getTranslation(this.props.language,
          'registration.billingdetails.ecbankcode')}
        infotext={getTranslation(this.props.language,
          'registration.billingdetails.infotext.ecbankcode')}
        error={getTranslation(this.props.language,
          'registration.billingdetails.error.ecbankcode')}
        onValueChange={this.onBICValueChange}
        isInValid={this.getBICIsInValid()}
        componentStyle={{ width: 'p30', align: 'left' }}
        onFocus={this.onBICFocus}
      />
    );
  }

  getBICIsInValid() {
    return this.props.isInValid && !isBIC(this.getValue().BIC);
  }

  renderEcBankElement() {
    const ecBankId = `${this.props.id}-ecbank`;
    return (
      <Input
        key={ecBankId}
        id={ecBankId}
        name={ecBankId}
        segmentId={this.props.segmentId}
        value={this.getValue().bank}
        label={getTranslation(this.props.language,
          'registration.billingdetails.ecbank')}
        infotext={getTranslation(this.props.language,
          'registration.billingdetails.infotext.ecbank')}
        error={getTranslation(this.props.language,
          'registration.billingdetails.error.ecbank')}
        onValueChange={this.onEcBankValueChange}
        isInValid={this.getEcbankIsInValid()}
        componentStyle={{ width: 'p70', align: 'right' }}
        onFocus={this.onEcBankFocus}
      />
    );
  }

  getEcbankIsInValid() {
    return this.props.isInValid && !isValidLength(this.getValue().bank, 1);
  }

  renderBillpayElement() {
    const billpayId = `${this.props.id}-billpay`;
    return (
      <Checkbox
        language={this.props.language}
        key={billpayId}
        id={billpayId}
        segmentId={this.props.segmentId}
        label={getTranslation(this.props.language,
          'registration.billingdetails.billpay')}
        overlays={[
          { elementId: 'open-billpay-overlay',
            modal: {
              html: getTranslation(this.props.language,
                'registration.billingdetails.infotext.billpay'),
            },
          },
        ]}
        value={this.getValue().billpay}
        onValueChange={this.onBillpayValueChange}
        isInValid={this.getBillpayIsInValid()}
      />
    );
  }

  getBillpayIsInValid() {
    return this.props.isInValid && !this.getValue().billpay;
  }

  renderBillpayinfoLabel() {
    return (
      <label className="billpayinfo"
        dangerouslySetInnerHTML={{ __html: getTranslation(this.props.language,
          'registration.billingdetails.billpayinfo') }}
      />
    );
  }

  render() {
    return (
      <div className={this.getContainerClassName()}
        id={`${this.props.id}-container`}
        ref={`${this.props.id}-container`}
      >
        {this.renderIBANElement()}
        {this.renderBICElement()}
        {this.renderEcBankElement()}
        {this.renderBillpayinfoLabel()}
        {this.renderBillpayElement()}
      </div>
    );
  }
}

ECPaymentMethod.propTypes = {
  id: React.PropTypes.string,
  segmentId: React.PropTypes.any,
  language: React.PropTypes.string,
  value: React.PropTypes.object,
  onElementFocus: React.PropTypes.func,
};

export default ECPaymentMethod;
