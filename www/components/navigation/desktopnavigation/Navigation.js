import React from 'react';
import BurgerButton from '../icons/Burger-Button';
import LanguageSelector from '../tiles/LanguageSelector';
import Logo from '../tiles/Logo';
import NavList from '../NavList';

class Navigation extends React.Component {
  render() {
    return (
      <nav className="navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <BurgerButton isBurgerButtonActive={ this.props.isMobileNavbarVisible } />
            <Logo />
            { this.renderNavigationList() }
            { this.renderRightBar() }
          </div>
        </div>
      </nav>
    );
  }

  renderNavigationList() {
    return (
      <div className="col-sm-8 hidden-xs">
        <NavList />
      </div>
    );
  }

  renderderLanguageSelector() {
    return (
      <div className={
          `top-navbar-lng-selector-container tile ${
          this.props.isLanguageSlideoutVisible ? 'active' : ''
        }`}
      >
        <LanguageSelector {...this.props} />
      </div>
    );
  }

  renderRightBar() {
    return (
      <div className="navbar-right-icons menu hidden-xs col-sm-2">
        { this.renderderLanguageSelector() }
      </div>
    );
  }
}

Navigation.propTypes = {
  language: React.PropTypes.string.isRequired,
  isMobileNavbarVisible: React.PropTypes.bool.isRequired,
  currentRouteName: React.PropTypes.string,
  isLanguageSlideoutVisible: React.PropTypes.bool.isRequired,
};

export default Navigation;
