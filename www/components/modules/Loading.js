import React from 'react';
const imagesPath = '/assets/images';

const Loading = (props) => {
  return (
    <div className="loader" style={{
      backgroundColor: props.backgroundColor,
    }}
    >
      <img style={{
        width: `${props.width}px`,
        height: `${props.height}px`,
        marginLeft: `-${props.width / 2}px`,
        marginTop: `-${props.height / 2}px`,
      }}
        src={`${imagesPath}/loading-${props.type}.svg?color=${props.color}`}
        alt="Loading..."
      />
    </div>
  );
};

Loading.defaultProps = {
  width: 30,
  height: 30,
  type: 'spin',
  color: 'red',
  backgroundColor: 'transparent',
};

Loading.propTypes = {
  backgroundColor: React.PropTypes.string,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  type: React.PropTypes.string,
  color: React.PropTypes.string,
};

export default Loading;
