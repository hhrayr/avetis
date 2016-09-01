import React from 'react';
import BaseFormElement from '../BaseFormElement';
import PaymentMethodsSelector from './PaymentMethodsSelector';
import CCPaymentMethod from './CCPaymentMethod';
import ECPaymentMethod from './ECPaymentMethod';
import { includes, merge } from 'lodash';

class Payment extends BaseFormElement {
  constructor(props) {
    super(props);
    this.onPaymentMethodValueChange = this.onPaymentMethodValueChange.bind(this);
    this.onCCValueChange = this.onCCValueChange.bind(this);
    this.onECValueChange = this.onECValueChange.bind(this);
    this.onCCElementFocus = this.onCCElementFocus.bind(this);
    this.onECElementFocus = this.onECElementFocus.bind(this);
    this.state = {
      value: this.props.value || {
        type: this.getDefaultPaymentMethod(),
      },
    };
  }

  onPaymentMethodValueChange(payload) {
    this.state.value = merge(this.state.value, { type: payload.value });
    this.fireOnValueChange();
  }

  onCCValueChange(payload) {
    this.state.value = merge(this.state.value, payload.value);
    this.fireOnValueChange();
  }

  onECValueChange(payload) {
    this.state.value = merge(this.state.value, payload.value);
    this.fireOnValueChange();
  }

  fireOnValueChange() {
    if (this.props.onValueChange) {
      this.props.onValueChange({
        id: this.props.id,
        segmentId: this.props.segmentId,
        value: this.getValue(),
      });
    }
  }

  onCCElementFocus(params) {
    this.fireOnElementFocus(params);
  }

  onECElementFocus(params) {
    this.fireOnElementFocus(params);
  }

  fireOnElementFocus(params) {
    const focusElemenParams = params;
    focusElemenParams.id = this.props.id;
    if (this.props.onElementFocus) {
      this.props.onElementFocus(focusElemenParams);
    }
  }

  getValue() {
    return this.state.value;
  }

  getDefaultPaymentMethod() {
    return includes(this.props.methods, 'CC') ? 'CC' : this.props.methods[0];
  }

  renderPaymentMethodsSelector() {
    if (this.props.methods.length > 1) {
      const paymentMethodsSelectorId = `${this.props.id}-payment-method-selector`;
      return (
        <PaymentMethodsSelector
          key={paymentMethodsSelectorId}
          id={paymentMethodsSelectorId}
          segmentId={this.props.segmentId}
          language={this.props.language}
          value={this.getValue().type}
          methods={this.props.methods}
          onValueChange={this.onPaymentMethodValueChange}
        />
      );
    }
    return null;
  }

  renderPaymentMethod() {
    switch (this.getValue().type) {
      case 'CC': return this.renderCCPaymentMethod();
      case 'EC': return this.renderECPaymentMethod();
      default: return null;
    }
  }

  renderCCPaymentMethod() {
    const id = `${this.props.id}-CC-payment-method`;
    return (
      <CCPaymentMethod
        id={id}
        key={id}
        segmentId={this.props.segmentId}
        language={this.props.language}
        isInValid={this.props.isInValid}
        value={this.getValue()}
        CCProviders={this.props.CCProviders}
        onValueChange={this.onCCValueChange}
        onElementFocus={this.onCCElementFocus}
      />
    );
  }

  renderECPaymentMethod() {
    const id = `${this.props.id}-EC-payment-method`;
    return (
      <ECPaymentMethod
        id={id}
        key={id}
        segmentId={this.props.segmentId}
        language={this.props.language}
        isInValid={this.props.isInValid}
        value={this.getValue()}
        onValueChange={this.onECValueChange}
        onElementFocus={this.onECElementFocus}
      />
    );
  }

  render() {
    return (
      <div className={`${this.getContainerClassName()} payment`}
        id={`${this.props.id}-container`}
        ref={`${this.props.id}-container`}
      >
        {this.renderPaymentMethodsSelector()}
        {this.renderPaymentMethod()}
      </div>
    );
  }
}

Payment.propTypes = {
  id: React.PropTypes.string,
  segmentId: React.PropTypes.any,
  language: React.PropTypes.string,
  onElementFocus: React.PropTypes.func,
  componentClass: React.PropTypes.string,
  value: React.PropTypes.object,
  methods: React.PropTypes.array,
  CCProviders: React.PropTypes.array,
};

export default Payment;
