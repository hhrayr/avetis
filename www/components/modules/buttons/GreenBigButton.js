import React from 'react';
import Tsl from '../../Tsl';
import NavLink from '../../modules/links/NavLink';

const GreenBigButton = ({ labelKey, label, routeName }) => {
  const buttonLabel = labelKey ? <Tsl id={ labelKey } /> : label;
  return (
    <div className="button green">
      {routeName ?
        <NavLink routeName={routeName}>
          {buttonLabel}
        </NavLink> : buttonLabel
      }
    </div>
  );
};

GreenBigButton.propTypes = {
  labelKey: React.PropTypes.string,
  label: React.PropTypes.string,
  routeName: React.PropTypes.string,
};

export default GreenBigButton;
