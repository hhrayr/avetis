import React from 'react';

const Footer = () => {
  const className = 'section footer-section';
  return (
    <div className={className}>
      <div className="viewport">
        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
          Menu items here
        </div>
        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
          Other things
        </div>
        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
          Copy, adddress and so
        </div>
      </div>
    </div>
  );
};

export default Footer;
