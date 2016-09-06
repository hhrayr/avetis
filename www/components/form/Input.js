import React from 'react';
import BaseFormElement from './BaseFormElement';

class Input extends BaseFormElement {
  constructor(props) {
    super(props);
    this.onFocus = this.onFocus.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.state = {
      labelPosition: this.props.value ? 'top' : 'inside',
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.labelPosition !== nextState.labelPosition ||
      this.props.disabled !== nextProps.disabled ||
      this.props.error !== nextProps.error ||
      this.props.isInValid !== nextProps.isInValid;
  }

  updateLabelPosition() {
    this.setState({
      labelPosition: 'top',
    });
  }

  onFocus() {
    this.updateLabelPosition();
    if (this.props.onFocus) {
      this.props.onFocus({
        id: this.props.id,
        segmentId: this.props.segmentId,
        value: this.getValue(),
      });
    }
  }

  onBlur() {
    if (this.props.onBlur) {
      this.props.onBlur({
        id: this.props.id,
        segmentId: this.props.segmentId,
        validation: this.props.validation,
        value: this.getValue(),
      });
    }
  }

  onChange() {
    if (this.getValue()) {
      this.updateLabelPosition();
    }
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

  getValue() {
    return this.refs.input.value;
  }

  setValue(value) {
    this.refs.input.value = value;
  }

  getContainerClassName() {
    const containerClassName = [
      super.getContainerClassName(),
      'input',
      'floating-placeholder',
    ];
    if (this.state.labelPosition === 'top') {
      containerClassName.push('label-pos-top');
    }
    return containerClassName.join(' ');
  }

  getLabelText() {
    let labelText = this.props.placeholder || this.props.label;
    if (this.state.labelPosition === 'top') {
      labelText = this.props.label;
    }
    return labelText;
  }

  getMaxLengthAttr() {
    if (this.props.maxLength) {
      return this.props.maxLength;
    }
    if (this.props.validation) {
      if (this.props.validation.length) {
        return this.props.validation.length;
      }
      if (this.props.validation.maxLength) {
        return this.props.validation.maxLength;
      }
    }
    return null;
  }

  render() {
    return (
      <div className={this.getContainerClassName()}
        id={`${this.props.id}-container`}
        ref={`${this.props.id}-container`}
      >
        <label htmlFor={this.props.id}>{this.getLabelText()}</label>
        <input
          ref="input"
          className={`form-control ${this.props.componentClass || ''}`}
          id={this.props.id}
          name={this.props.name}
          maxLength={this.getMaxLengthAttr()}
          defaultValue={this.props.value}
          type={this.props.type}
          onFocus={this.onFocus}
          onChange={this.onChange}
          onBlur={this.onBlur}
          disabled={this.props.disabled}
        />
        <div className="content-message">
          {this.props.isInValid && this.renderErrorMessage()}
        </div>
      </div>
    );
  }
}

Input.defaultProps = {
  type: 'text',
  isInValid: false,
};

Input.propTypes = {
  label: React.PropTypes.string,
  id: React.PropTypes.string,
  segmentId: React.PropTypes.any,
  name: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  type: React.PropTypes.string,
  value: React.PropTypes.string,
  maxLength: React.PropTypes.number,
  validation: React.PropTypes.object,
  error: React.PropTypes.string,
  onValueChange: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  onFocus: React.PropTypes.func,
};

export default Input;
