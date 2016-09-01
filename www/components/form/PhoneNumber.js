import React from 'react';
import { merge } from 'lodash';
import Input from './Input';
import { formatNationalNumber, formatCountryCode } from '../../utils/validation';
import BaseFormElement from './BaseFormElement';

class PhoneNumber extends BaseFormElement {
  constructor(props) {
    super(props);
    this.onCountryCodeElementValueChange = this.onCountryCodeElementValueChange.bind(this);
    this.onNumberElementValueChange = this.onNumberElementValueChange.bind(this);
    this.onCountryCodeElementBlur = this.onCountryCodeElementBlur.bind(this);
    this.onNumberElementBlur = this.onNumberElementBlur.bind(this);
    this.onCountryCodeElementFocus = this.onCountryCodeElementFocus.bind(this);
    this.onNumberElementFocus = this.onNumberElementFocus.bind(this);
  }

  onCountryCodeElementValueChange(payload) {
    this.fireOnValueChange(merge(this.getValue(), { countryCode: payload.value }));
  }

  onNumberElementValueChange(payload) {
    this.fireOnValueChange(merge(this.getValue(), { number: payload.value }));
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

  onCountryCodeElementBlur() {
    const value = this.getValue();
    if (value && value.number) {
      const formatedCountryCode = formatCountryCode(value);
      if (formatedCountryCode && formatedCountryCode !== value.countryCode) {
        this.refs['country-code-input-component'].setValue(formatedCountryCode);
        this.fireOnValueChange(merge(this.getValue(), { countryCode: formatedCountryCode }));
      }
    }
    this.fireOnBlur();
  }

  onNumberElementBlur() {
    const value = this.getValue();
    if (value && value.number) {
      const nationalNumber = formatNationalNumber(value);
      if (nationalNumber && nationalNumber.toString() !== value.number) {
        this.refs['number-input-component'].setValue(nationalNumber.toString());
        this.fireOnValueChange(merge(this.getValue(), { number: nationalNumber.toString() }));
      }
    }
    this.fireOnBlur();
  }

  fireOnBlur() {
    if (this.props.onBlur) {
      this.props.onBlur({
        id: this.props.id,
        segmentId: this.props.segmentId,
        validation: this.props.validation,
        value: this.getValue(),
      });
    }
  }

  onCountryCodeElementFocus() {
    this.fireOnFocus();
  }

  onNumberElementFocus() {
    this.fireOnFocus();
  }

  fireOnFocus() {
    if (this.props.onFocus) {
      this.props.onFocus({
        id: this.props.id,
        segmentId: this.props.segmentId,
        value: this.getValue(),
      });
    }
  }

  getValue() {
    return this.props.value;
  }

  getContainerClassName() {
    return `${super.getContainerClassName()} phone-number input`;
  }

  renderCountryCodeInput() {
    const countryCodeElementId = `${this.props.id}-country-code`;
    return (
      <Input
        ref="country-code-input-component"
        key={countryCodeElementId}
        id={countryCodeElementId}
        name={countryCodeElementId}
        segmentId={this.props.segmentId}
        value={this.props.value ? this.props.value.countryCode : undefined}
        placeholder={this.props.placeholder ? this.props.placeholder.countryCode : undefined}
        onValueChange={this.onCountryCodeElementValueChange}
        onBlur={this.onCountryCodeElementBlur}
        onFocus={this.onCountryCodeElementFocus}
        isInValid={this.props.isInValid}
        componentStyle={{ width: 'p20', align: 'left' }}
        disabled={this.props.disabled}
      />
    );
  }

  renderNumberInput() {
    const numberElementId = `${this.props.id}-number`;
    return (
      <Input
        ref="number-input-component"
        key={numberElementId}
        id={numberElementId}
        name={numberElementId}
        segmentId={this.props.segmentId}
        value={this.props.value ? this.props.value.number : undefined}
        placeholder={this.props.placeholder ? this.props.placeholder.number : undefined}
        onValueChange={this.onNumberElementValueChange}
        onBlur={this.onNumberElementBlur}
        onFocus={this.onNumberElementFocus}
        isInValid={this.props.isInValid}
        componentStyle={{ width: 'p80', align: 'right' }}
        disabled={this.props.disabled}
      />
    );
  }

  render() {
    return (
      <div className={this.getContainerClassName()}
        id={`${this.props.id}-container`}
        ref={`${this.props.id}-container`}
      >
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <div className="phone-number-elements">
          {this.renderCountryCodeInput()}
          {this.renderNumberInput()}
        </div>
        <div className="content-message">
          {this.props.isInValid && this.renderErrorMessage()}
        </div>
      </div>
    );
  }
}

PhoneNumber.propTypes = {
  label: React.PropTypes.string,
  id: React.PropTypes.string,
  segmentId: React.PropTypes.any,
  name: React.PropTypes.string,
  placeholder: React.PropTypes.object,
  type: React.PropTypes.string,
  value: React.PropTypes.object,
  maxLength: React.PropTypes.number,
  validation: React.PropTypes.object,
  error: React.PropTypes.string,
  onValueChange: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  onFocus: React.PropTypes.func,
};

export default PhoneNumber;
