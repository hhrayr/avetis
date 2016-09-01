import React from 'react';
import LanguageSelector from '../tiles/LanguageSelector';
import NavList from '../NavList';

const MobileNavigation = (props) => {
  return (
    <div className="mobile-slidebar-drawer-wrap clearfix">
      <div className="navbar-mobile-container">
        <LanguageSelector {...props} showAccordionIcon />
        <NavList showStaticLinks />
        <div className="container-fluid">
          Something
        </div>
      </div>
    </div>
  );
};

MobileNavigation.propTypes = {
  language: React.PropTypes.string.isRequired,
  currentRouteName: React.PropTypes.string.isRequired,
  isLanguageSlideoutVisible: React.PropTypes.bool.isRequired,
};

export default MobileNavigation;
