import React from 'react';
import BaseFormElement from './BaseFormElement';

class RadioButtonList extends BaseFormElement {
  onClick(value) {
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

  getValue() {
    return this.props.value;
  }

  getContainerClassName() {
    return `${super.getContainerClassName()} radio-button-list input`;
  }

  renderOptionElements() {
    if (this.props.options) {
      return this.props.options.map((option) => {
        if (this.isValidOption(option)) {
          return this.renderOptionElement(option);
        }
        return null;
      });
    }
    return null;
  }

  isValidOption(option) {
    return option.value;
  }

  renderOptionElement(option) {
    const inputName = `${this.props.segmentId}-${this.props.id}`;
    const inputId = `${inputName}-${option.value}`;
    const isChecked = option.value === this.props.value;
    return (
      <span key={`${inputId}-container`}>
        <input
          type="radio"
          name={inputName}
          id={inputId}
          value={option.value}
          defaultChecked={isChecked}
          onClick={() => { this.onClick(option.value); }}
          disabled={this.props.disabled}
        />
      <label htmlFor={inputId}>{option.text}</label>
      </span>
    );
  }

  render() {
    return (
      <div className={this.getContainerClassName()}
        id={`${this.props.id}-container`}
        ref={`${this.props.id}-container`}
      >
        <label htmlFor={this.props.id}>{this.props.label}</label>
        {this.renderOptionElements()}
        <div className="content-message">
          {this.props.isInValid && this.renderErrorMessage()}
        </div>
      </div>
    );
  }
}

RadioButtonList.propTypes = {
  id: React.PropTypes.string,
  segmentId: React.PropTypes.any,
  options: React.PropTypes.array,
  onValueChange: React.PropTypes.any,
  label: React.PropTypes.string,
  value: React.PropTypes.string,
};

export default RadioButtonList;
