import React from 'react';
import BaseFormElement from './BaseFormElement';
import Input from './Input';
import Button from './Button';
import Tsl from '../Tsl';
import { trimSpace } from '../../../shared/utils/stringUtils';

class Promocode extends BaseFormElement {
  constructor(props) {
    super(props);
    this.onInputValueChange = this.onInputValueChange.bind(this);
    this.validatePromocode = this.validatePromocode.bind(this);
    this.state = {};
  }

  onInputValueChange(payload) {
    this.setState({ value: payload.value });
  }

  validatePromocode() {
    const value = trimSpace(this.getValue());
    this.setState({ value });
    if (value && value.length) {
      this.refs.input.setValue(value);
      if (this.props.onLoadPromocode) {
        this.props.onLoadPromocode(value);
      }
    }
  }

  getValue() {
    return this.state.value;
  }

  getContainerClassName() {
    const containerClassName = [
      super.getContainerClassName(),
      'promocode-input-container',
      'input',
    ];
    if (!this.props.promocode || !this.props.promocode.isValid) {
      containerClassName.push('not-validated');
    }
    return containerClassName.join(' ');
  }

  isInvalid() {
    if (this.getValue() && this.props.promocode &&
      !this.props.promocode.isValid &&
      this.props.promocode.errorMessage) {
      return true;
    }
    return false;
  }

  renderButton() {
    if (!this.props.promocode || !this.props.promocode.isValid) {
      return (
        <div className="button-container">
          <Button
            onClick={this.validatePromocode}
            color="blue"
          >
            <Tsl id="registration.button.promocode.validate" />
          </Button>
        </div>
      );
    }
    return null;
  }

  render() {
    if (this.props.canAcceptPromocode) {
      return (
        <div className={this.getContainerClassName()}>
          <Input
            {...this.props}
            value={this.state.value}
            onValueChange={this.onInputValueChange}
            ref="input"
            disabled={this.props.promocode && this.props.promocode.isValid}
            error={this.props.promocode && this.props.promocode.errorMessage}
            isInValid={this.isInvalid()}
          />
        {this.renderButton()}
        </div>
      );
    }
    return null;
  }
}

Promocode.propTypes = {
  onValueChange: React.PropTypes.any,
  onLoadPromocode: React.PropTypes.func,
  id: React.PropTypes.string,
  segmentId: React.PropTypes.any,
  canAcceptPromocode: React.PropTypes.bool,
  successText: React.PropTypes.string,
  price: React.PropTypes.string,
  promocode: React.PropTypes.object,
};

export default Promocode;
