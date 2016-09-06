import React from 'react';
import Intro from './Intro';
import Features from './Features';
import UseCases from './UseCases';
import Pricing from './Pricing';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleHomeBackgroundScroll = this.handleHomeBackgroundScroll.bind(this);
  }

  componentDidMount() {
    this.backgroundImageContainer = document.createElement('div');
    this.backgroundImageContainer.className = 'image';

    this.backgroundNode = document.createElement('div');
    this.backgroundNode.id = 'home-background';
    this.backgroundNode.appendChild(this.backgroundImageContainer);

    document.body.appendChild(this.backgroundNode);
    window.addEventListener('scroll', this.handleHomeBackgroundScroll);
  }

  componentWillUnmount() {
    document.body.removeChild(this.backgroundNode);
    window.removeEventListener('scroll', this.handleHomeBackgroundScroll);
  }

  handleHomeBackgroundScroll() {
    this.backgroundImageContainer.style.transform =
      `translate(0, -${Math.round(this.getWindowScrollTop() * 0.75)}px)`;
  }

  getWindowScrollTop() {
    const doc = document.documentElement;
    return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  }

  render() {
    return (
      <div>
        <Intro />
        <Features />
        <UseCases />
        <Pricing />
      </div>
    );
  }
}

Home.contextTypes = {
  executeAction: React.PropTypes.func,
};

export default Home;
