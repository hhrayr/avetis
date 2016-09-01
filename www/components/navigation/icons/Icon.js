import React from 'react';

const Icon = ({ isActive, activeIcon, defaultIcon, iconPath, alternativePath }) => {
  const activeIconState = `${alternativePath || iconPath}${activeIcon}`;
  const defaultIconState = `${iconPath}${defaultIcon}`;
  const stateDependingIcon = isActive ? activeIconState : defaultIconState;
  return (
    <img src={stateDependingIcon} />
  );
};

Icon.propTypes = {
  activeIcon: React.PropTypes.string.isRequired,
  defaultIcon: React.PropTypes.string.isRequired,
  iconPath: React.PropTypes.string.isRequired,
  alternativePath: React.PropTypes.string,
  isActive: React.PropTypes.bool,
};

export default Icon;
