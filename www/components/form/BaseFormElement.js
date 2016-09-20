import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

class BaseFormElement extends React.Component {
  renderErrorMessage() {
    return (
      <span className="error">{this.props.error}</span>
    );
  }

  renderTooltip() {
    return <Tooltip id={`${this.props.id}-tooltip`}>{this.props.infotext}</Tooltip>;
  }

  renderInfoIcon() {
    if (this.props.infotext) {
      return (
        <OverlayTrigger
          id={`${this.props.id}-overlay-trigger`}
          overlay={this.renderTooltip()}
          placement="right"
          trigger="click"
        >
          <span className="info-icon" />
        </OverlayTrigger>
      );
    }
    return null;
  }

  getValue() {
    return null;
  }

  getContainerClassName() {
    const containerClassName = ['form-group'];
    if (this.props.isInValid) {
      containerClassName.push('error');
    }
    if (this.props.disabled) {
      containerClassName.push('disabled');
    }
    if (this.props.componentStyle && this.props.componentStyle.width) {
      containerClassName.push(`${this.props.componentStyle.width}`);
    }
    if (this.props.componentStyle && this.props.componentStyle.align) {
      containerClassName.push(`align-${this.props.componentStyle.align}`);
    }
    if (this.props.containerClassName) {
      containerClassName.push(this.props.containerClassName);
    }
    return containerClassName.join(' ');
  }
}

BaseFormElement.propTypes = {
  validation: React.PropTypes.object,
  id: React.PropTypes.string,
  error: React.PropTypes.string,
  isInValid: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  componentStyle: React.PropTypes.object,
  infotext: React.PropTypes.string,
  onValueChange: React.PropTypes.func,
  containerClassName: React.PropTypes.string,
};

export default BaseFormElement;
