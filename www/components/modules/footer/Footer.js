import React from 'react';

const Footer = () => {
  const className = 'section footer-section';
  return (
    <div className={className}>
      <div className="viewport">
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 copy">
          ©{new Date().getFullYear()} Avetis. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
