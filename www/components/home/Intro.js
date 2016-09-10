import React from 'react';

class Intro extends React.Component {
  componentDidMount() {
    this.setIntroHeight();
  }

  setIntroHeight() {
    const introContainer = document.getElementById('intro');
    introContainer.style.minHeight = `${this.getWindowHeight() - this.props.offset}px`;
  }

  getWindowHeight() {
    return window.innerHeight;
  }

  render() {
    return (
      <div id="intro">
        intro
      </div>
    );
  }
}

Intro.propTypes = {
  offset: React.PropTypes.number,
};

export default Intro;
