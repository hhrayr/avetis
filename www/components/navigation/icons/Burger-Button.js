import React from 'react';
import { toggleMobileNavigationButton } from '../../../action/navigationActions';


class BurgerButton extends React.Component {
  constructor(props) {
    super(props);
    this.onHandleBurgerButtonClick = this.onHandleBurgerButtonClick.bind(this);
  }
  onHandleBurgerButtonClick() {
    this.context.executeAction(toggleMobileNavigationButton);
  }
  renderBurgerButtonIcon() {
    return (
      <img className="close-button"
        src="/assets/images/close_black.svg"
      />
    );
  }
  renderCloseButtonIcon() {
    return (
      <img className="burger-button"
        src="/assets/images/navigation/burger_button_black.svg"
      />
    );
  }
  render() {
    return (
      <div
        className="navbar-burger-button visible-xs col-xs-3"
        onClick={this.onHandleBurgerButtonClick}
      >
        {this.props.isBurgerButtonActive
          ? this.renderBurgerButtonIcon()
          : this.renderCloseButtonIcon()
        }
      </div>
    );
  }
}

BurgerButton.propTypes = {
  isBurgerButtonActive: React.PropTypes.bool.isRequired,
};

BurgerButton.contextTypes = {
  executeAction: React.PropTypes.func,
};

export default BurgerButton;
