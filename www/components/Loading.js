import React from 'react';
const path = '/assets/images';

class Loading extends React.Component {
  shouldComponentMount() {
    return true;
  }
  render() {
    return (
      <div className="loader" style={{
        backgroundColor: this.props.backgroundColor,
      }}
      >
        <img style={{
          width: `${this.props.width} rem`,
          height: `${this.props.height} rem`,
          marginLeft: (`-${this.props.width / 2} rem`),
          marginTop: (`-${this.props.height / 2} rem`),
        }}
          src={`${path}/loading-${this.props.type}.svg?color=${this.props.color}`}
          alt="Loading..."
        />
      </div>
    );
  }
}

Loading.defaultProps = {
  width: 2,
  height: 2,
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
