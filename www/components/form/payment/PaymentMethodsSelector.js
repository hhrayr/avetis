import React from 'react';
import BaseFormElement from '../BaseFormElement';
import { getTranslation } from '../../Tsl';
import RadioButtonList from '../RadioButtonList';

class PaymentMethodsSelector extends BaseFormElement {
  constructor(props) {
    super(props);
    this.onPaymentMethodValueChange = this.onPaymentMethodValueChange.bind(this);
  }

  onPaymentMethodValueChange(payload) {
    this.fireOnValueChange(payload.value);
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

  getValue() {
    return this.props.value;
  }

  getPaymentMethodOptions() {
    return this.props.methods.map((paymentMethod) => {
      return {
        value: paymentMethod,
        text: this.getPaymentMethodTitle(paymentMethod),
      };
    });
  }

  getPaymentMethodTitle(paymentMethod) {
    switch (paymentMethod) {
      case 'CC': return getTranslation(this.props.language,
        'registration.billingdetails.creditcard');
      case 'EC': return getTranslation(this.props.language,
        'registration.billingdetails.eccard');
      default:
        return null;
    }
  }

  render() {
    return (
      <RadioButtonList
        key={this.props.id}
        id={this.props.id}
        segmentId={this.props.segmentId}
        options={this.getPaymentMethodOptions()}
        value={this.props.value}
        onValueChange={this.onPaymentMethodValueChange}
      />
    );
  }
}

PaymentMethodsSelector.propTypes = {
  id: React.PropTypes.string,
  segmentId: React.PropTypes.any,
  language: React.PropTypes.string,
  value: React.PropTypes.string,
  methods: React.PropTypes.array,
};

export default PaymentMethodsSelector;
