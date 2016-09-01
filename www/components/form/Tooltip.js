import React from 'react';

class Tooltip extends React.Component {
    construct(props) {
        super(props);
        this.state = {
            disabled : this.props.disabled
        };
    }

    componentDidUpdate() {
        this.props.infoText && !this.state.disabled ? alert(this.props.infoText): null;
    }

    onClick() {
      this.setState(
        disabled: !this.state.disabled
      );
    }

    render() {
        let componentClass = 'tooltip' + this.props.disabled ? ' disabled': null;

        return (
            <div className={ componentClass } onClick={ this.onClick }></div>
        );
    }
}

Tooltip.propTypes = {
    disabled: React.PropTypes.bool.isRequired,
    infoText: React.PropTypes.string.isRequired
};

export default Tooltip;
