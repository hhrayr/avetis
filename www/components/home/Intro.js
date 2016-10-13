import React from 'react';
import Tsl from '../Tsl';

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
        <div className="body-text">
          <Tsl id="home.intro.text" />
        </div>
      </div>
    );
  }
}

Intro.propTypes = {
  offset: React.PropTypes.number,
};

export default Intro;
