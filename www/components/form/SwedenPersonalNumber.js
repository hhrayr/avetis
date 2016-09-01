import React from 'react';
import BaseFormElement from './BaseFormElement';
import { validateSwedenPersonalNumber } from '../../action/registrationActions';
import Input from './Input';
import Button from './Button';
import Tsl from '../Tsl';
import { trimSpace } from '../../utils/stringUtils';


class SwedenPersonalNumber extends BaseFormElement {
  constructor(props) {
    super(props);
    this.onInputValueChange = this.onInputValueChange.bind(this);
    this.validatePersonalNumber = this.validatePersonalNumber.bind(this);
    this.state = { value: this.props.value };
  }

  onInputValueChange(payload) {
    this.setState({ value: payload.value });
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

  validatePersonalNumber() {
    const value = trimSpace(this.getValue());
    this.setState({ value });
    if (value && value.length) {
      this.refs.input.setValue(value);
      this.context.executeAction(validateSwedenPersonalNumber, {
        personalNumber: value,
        elementId: this.props.id,
      });
    }
  }

  getValue() {
    return this.state.value;
  }

  getContainerClassName() {
    const containerClassName = [
      super.getContainerClassName(),
      'se-personal-number-input-container',
      'input',
    ];
    if (!this.props.isValidated) {
      containerClassName.push('not-validated');
    }
    return containerClassName.join(' ');
  }

  renderButton() {
    if (!this.props.isValidated) {
      return (
        <div className="button-container">
          <Button
            onClick={this.validatePersonalNumber}
            color="blue"
          >
            <Tsl id="registration.button.swedenPersonalNumber.validate" />
          </Button>
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div className={this.getContainerClassName()}>
        <Input
          {...this.props}
          ref="input"
          value={this.state.value}
          onValueChange={this.onInputValueChange}
          disabled={this.props.isValidated}
        />
        {this.renderButton()}
      </div>
    );
  }
}

SwedenPersonalNumber.contextTypes = {
  executeAction: React.PropTypes.func,
};

SwedenPersonalNumber.propTypes = {
  isValidated: React.PropTypes.bool,
};

export default SwedenPersonalNumber;
