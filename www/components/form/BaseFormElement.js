import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { trackDevEvent } from '../../utils/tracking';

class BaseFormElement extends React.Component {
  constructor(props) {
    super(props);
    this.onInfoIconOverlayEnter = this.onInfoIconOverlayEnter.bind(this);
  }
  renderErrorMessage() {
    return (
      <span className="error">{this.props.error}</span>
    );
  }

  onInfoIconOverlayEnter() {
    trackDevEvent({
      category: 'registration',
      action: 'infoIconOverlayEnter',
      label: `${this.props.segmentId}.${this.props.id}`,
    });
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
          onEnter={this.onInfoIconOverlayEnter}
        >
          <span className="info-icon" />
        </OverlayTrigger>
      );
    }
    return null;
  }

  getValue() {
    return this.props.value;
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
  id: React.PropTypes.string.isRequired,
  segmentId: React.PropTypes.string.isRequired,
  validation: React.PropTypes.object,
  error: React.PropTypes.string,
  isInValid: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  componentStyle: React.PropTypes.object,
  infotext: React.PropTypes.string,
  onValueChange: React.PropTypes.func,
  containerClassName: React.PropTypes.string,
  value: React.PropTypes.any,
};

export default BaseFormElement;
