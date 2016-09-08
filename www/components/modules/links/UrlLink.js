import React from 'react';
import NavLink from './NavLink';

class UrlLink extends React.Component {
  render() {
    return this.isValidUrl() ? this.renderUrlLink() : this.renderNavLink();
  }

  isValidUrl() {
    return /^(\/\/|http|https)/.test(this.props.url);
  }

  renderUrlLink() {
    const linkProps = {
      className: this.props.componentClass,
      href: this.props.url,
    };
    if (this.props.onClick) {
      linkProps.onClick = this.props.onClick;
    }
    if (this.props.isNewWindow) {
      linkProps.target = '_blank';
    }
    return (
      <a {...linkProps}>
        { this.props.children }
      </a>
    );
  }

  renderNavLink() {
    return (
      <NavLink
        className={ this.props.componentClass }
        routeName={ this.props.url }
      >
        { this.props.children }
      </NavLink>
    );
  }
}

UrlLink.propTypes = {
  url: React.PropTypes.string,
  isNewWindow: React.PropTypes.bool,
  componentClass: React.PropTypes.string,
  children: React.PropTypes.any,
  onClick: React.PropTypes.any,
};

UrlLink.defaultProps = {
  componentClass: 'link',
  isNewWindow: true,
};

export default UrlLink;
