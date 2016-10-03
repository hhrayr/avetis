import React from 'react';
import BaseFormElement from './BaseFormElement';

class Textarea extends BaseFormElement {
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
      this.props.isInValid !== nextProps.isInValid ||
      this.props.type !== nextProps.type ||
      this.props.value !== nextProps.value;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value && this.getValue() !== nextProps.value) {
      this.setValue(nextProps.value);
      this.updateLabelPosition();
    }
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
    return this.refs.textarea.value;
  }

  setValue(value) {
    this.refs.textarea.value = value;
  }

  getContainerClassName() {
    const containerClassName = [
      super.getContainerClassName(),
      'input',
      'textarea',
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
    return labelText || '';
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
        <label htmlFor={this.props.id}>
          {this.getLabelText()}
          {this.state.labelPosition === 'top' ? this.renderInfoIcon() : null}
        </label>
        <textarea
          ref="textarea"
          style={{ height: `${this.props.height}px` }}
          className={`form-control ${this.props.componentClass || ''}`}
          id={this.props.id}
          name={this.props.name}
          maxLength={this.getMaxLengthAttr()}
          defaultValue={this.props.value}
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

Textarea.defaultProps = {
  height: 140,
};

Textarea.propTypes = {
  segmentId: React.PropTypes.any,
  label: React.PropTypes.string,
  name: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  height: React.PropTypes.number,
  value: React.PropTypes.string,
  maxLength: React.PropTypes.number,
  validation: React.PropTypes.object,
  error: React.PropTypes.string,
  onValueChange: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  onFocus: React.PropTypes.func,
};

export default Textarea;
