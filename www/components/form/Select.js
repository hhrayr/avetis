import React from 'react';
import BaseFormElement from './BaseFormElement';
import { concat } from 'lodash';

class Select extends BaseFormElement {
  onChange(value) {
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
    return `${super.getContainerClassName()} select input`;
  }

  renderOptionElements() {
    if (this.props.options && this.props.options.length) {
      let options = this.props.options;
      if (!this.props.value && this.props.options[0].value) {
        options = concat({ text: this.props.optionsPlaceholder, value: '' }, options);
      }
      return options.map((option) => {
        return this.renderOptionElement(option);
      });
    }
    return null;
  }

  renderOptionElement(option) {
    const optionId = `${this.props.segmentId}-${this.props.id}-${option.value}`;
    return (
      <option
        key={optionId}
        id={optionId}
        value={option.value}
        dangerouslySetInnerHTML={{ __html: `&#160;&#160;&#160;${option.text}` }}
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
        <div className="select-wrapper form-control">
          <div className="select-inline">
            <select
              className={this.props.componentClass}
              id={this.props.id}
              name={this.props.id}
              value={this.props.value}
              onChange={(e) => { this.onChange(e.target.value); }}
              disabled={this.props.disabled}
            >
              {this.renderOptionElements()}
            </select>
          </div>
        </div>
        <div className="content-message">
          {this.props.isInValid && this.renderErrorMessage()}
        </div>
      </div>
    );
  }
}

Select.defaultProps = {
  optionsPlaceholder: '--',
};

Select.propTypes = {
  id: React.PropTypes.string,
  segmentId: React.PropTypes.any,
  options: React.PropTypes.array,
  onValueChange: React.PropTypes.any,
  label: React.PropTypes.string,
  value: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
  componentClass: React.PropTypes.string,
  optionsPlaceholder: React.PropTypes.string,
};

export default Select;
