import React from 'react';
import Input from './Input';
import { getPasswordSecurityLevel } from '../../utils/validation';
import Tsl from '../Tsl';
import BaseFormElement from './BaseFormElement';

class Password extends BaseFormElement {
  constructor(props) {
    super(props);
    this.onInputValueChange = this.onInputValueChange.bind(this);
    this.onShowHidePasswordClick = this.onShowHidePasswordClick.bind(this);
    this.state = {
      passwordSecurityLevel: 0,
      type: 'password',
    };
  }

  getContainerClassName() {
    return `${super.getContainerClassName()} password-input-container input`;
  }

  getValue() {
    return this.refs['input-component'].getValue();
  }

  onInputValueChange(payload) {
    this.setState({
      passwordSecurityLevel: getPasswordSecurityLevel(payload.value),
    });
    if (this.props.onValueChange) {
      this.props.onValueChange(payload);
    }
  }

  onShowHidePasswordClick() {
    this.setState({
      type: this.state.type === 'password' ? 'text' : 'password',
    });
  }

  renderShowHidePasswordButton() {
    return (
      <a className="show-password" onClick={this.onShowHidePasswordClick}>
        {this.state.type === 'password'
          ? <img src="/assets/images/registration/eye.svg" />
          : <img src="/assets/images/registration/closed-eye.svg" />
        }
      </a>
    );
  }

  renderSecurityIndicator() {
    return (
      <div className="security-indicator">
        {this.state.passwordSecurityLevel ?
          <span className={`level-${this.state.passwordSecurityLevel}`}>
            <img src="/assets/images/registration/key.svg" />
            <Tsl id={`registration.password.security.level-${this.state.passwordSecurityLevel}`} />
          </span>
          : null
        }
      </div>
    );
  }

  render() {
    return (
      <div className={this.getContainerClassName()}>
        <Input
          {...this.props}
          ref="input-component"
          type={this.state.type}
          onValueChange={this.onInputValueChange}
        />
        {this.renderShowHidePasswordButton()}
        {this.renderSecurityIndicator()}
      </div>
    );
  }
}

Password.defaultProps = {
  maxLength: 15,
};

export default Password;
