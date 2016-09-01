import React from 'react';
import BaseFormElement from './BaseFormElement';

class Checkbox extends BaseFormElement {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
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
    return this.refs[this.props.id].checked;
  }

  getContainerClassName() {
    return `${super.getContainerClassName()} checkbox-input`;
  }

  render() {
    return (
      <div className={this.getContainerClassName()}
        id={`${this.props.id}-container`}
        ref={`${this.props.id}-container`}
      >
        <input type="checkbox"
          ref={this.props.id}
          className={this.props.componentClass}
          id={this.props.id}
          name={this.props.name}
          value={this.props.value}
          onClick={this.onClick}
          disabled={this.props.disabled}
        />
        <label
          htmlFor={this.props.id}
          dangerouslySetInnerHTML={{ __html: this.props.label }}
        />
      </div>
    );
  }
}

Checkbox.contextTypes = {
  executeAction: React.PropTypes.func,
};

Checkbox.propTypes = {
  language: React.PropTypes.string,
  id: React.PropTypes.string,
  segmentId: React.PropTypes.any,
  onValueChange: React.PropTypes.any,
  overlays: React.PropTypes.array,
};

export default Checkbox;
