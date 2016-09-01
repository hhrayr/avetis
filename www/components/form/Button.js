import React from 'react';

const Button = ({ onClick, text, disabled, color, children }) => {
  const classes = `button ${disabled ? 'disabled' : color}`;
  return (
    <div className={ classes } onClick={ onClick }>
      {typeof children !== 'undefined'
        ? children :
        <span className="text">{ text }</span>
      }
    </div>
  );
};

Button.defaultProps = {
  color: 'green',
};

Button.propTypes = {
  onClick: React.PropTypes.func,
  text: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  color: React.PropTypes.string,
  children: React.PropTypes.any,
};

export default Button;
