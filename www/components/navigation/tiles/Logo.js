import React from 'react';
import UrlLink from '../../modules/links/UrlLink';

export default () => {
  return (
    <div className="navbar-brand-logo col-sm-2 col-xs-6">
      <UrlLink url="home" componentClass="">
        <img
          className="logo"
          src="/assets/images/navigation/logo.svg"
        />
    </UrlLink>
    </div>
  );
};
