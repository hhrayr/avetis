import React from 'react';
import { connectToStores } from 'fluxible-addons-react';
import { NavLink as NavLinkBase } from 'fluxible-router';

class NavLink extends React.Component {
  render() {
    const linkProps = this.getNavLinkProps();
    return (
       <NavLinkBase {...linkProps}>
         { this.props.children }
       </NavLinkBase>
    );
  }

  getNavLinkProps() {
    return {
      routeName: this.props.routeName,
      target: this.getLinkTarget(),
      navParams: this.getNavParams(),
      className: this.props.className,
    };
  }

  getLinkTarget() {
    return this.props.isNewWindow ? '_blank' : '_self';
  }

  getNavParams() {
    return {
      language: this.props.overwriteLanguage || this.props.language,
    };
  }
}

NavLink.propTypes = {
  routeName: React.PropTypes.string.isRequired,
  children: React.PropTypes.any,
  language: React.PropTypes.string,
  overwriteLanguage: React.PropTypes.string,
  isNewWindow: React.PropTypes.bool,
  className: React.PropTypes.string,
};

NavLink.defaultProps = {
  isNewWindow: false,
};

NavLink = connectToStores(NavLink, ['EnvironmentStore'], (component) => {
  const environmentStore = component.getStore('EnvironmentStore');
  return {
    language: environmentStore.getLanguage(),
  };
});

export default NavLink;
