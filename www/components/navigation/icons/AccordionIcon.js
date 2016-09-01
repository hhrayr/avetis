import React from 'react';

const AccordionIcon = ({ isActive }) => {
  const isAccordionActive = isActive ? 'close_white' : 'arrows/arrow_black';
  return (
    <img className="navbar-mobile-accordion-icon"
      src={`/assets/images/${isAccordionActive}.svg`}
    />
  );
};

AccordionIcon.propTypes = {
  isActive: React.PropTypes.bool.isRequired,
};

export default AccordionIcon;
