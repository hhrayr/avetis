import React from 'react';
import BaseFormElement from './BaseFormElement';
import Input from './Input';
import Button from './Button';
import Tsl from '../Tsl';
import { validateRejsekort } from '../../action/registrationActions';
import { trimSpace } from '../../utils/stringUtils';

class Rejsekort extends BaseFormElement {
  constructor(props) {
    super(props);
    this.onInputValueChange = this.onInputValueChange.bind(this);
    this.validate = this.validate.bind(this);
    this.state = {};
  }

  componentWillReceiveProps(props) {
    if (props.value && props.value.cardnumber) {
      this.setState({ value: props.value.cardnumber });
    }
  }

  onInputValueChange(payload) {
    this.setState({ value: payload.value });
  }

  validate() {
    const value = trimSpace(this.getValue());
    this.setState({ value });
    if (value && value.length) {
      this.refs.input.setValue(value);
      this.context.executeAction(validateRejsekort, {
        rejsekortNumber: value,
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
      'rejsekort-input-container',
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
            onClick={this.validate}
            color="blue"
          >
            <Tsl id="registration.button.rejsekort.validate" />
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
          error={this.props.validationError || this.props.error}
          value={this.state.value}
          onValueChange={this.onInputValueChange}
          disabled={this.props.isValidated}
          ref="input"
        />
      {this.renderButton()}
      </div>
    );
  }
}

Rejsekort.contextTypes = {
  executeAction: React.PropTypes.func,
};

Rejsekort.propTypes = {
  validationError: React.PropTypes.string,
  isValidated: React.PropTypes.bool,
  value: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.string]),
};

export default Rejsekort;
