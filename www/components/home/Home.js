import React from 'react';
import { connectToStores } from 'fluxible-addons-react';
import { Element as ScrollElelement, scroller } from 'react-scroll';
import Intro from './Intro';
import Features from './Features';
import UseCases from './UseCases';
import Pricing from './Pricing';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleHomeBackgroundScroll = this.handleHomeBackgroundScroll.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    this.backgroundImageContainer = document.createElement('div');
    this.backgroundImageContainer.className = 'image';

    this.backgroundNode = document.createElement('div');
    this.backgroundNode.id = 'home-background';
    this.backgroundNode.appendChild(this.backgroundImageContainer);

    document.body.appendChild(this.backgroundNode);
    window.addEventListener('scroll', this.handleHomeBackgroundScroll);
    this.scrollToRouteSection();
  }

  componentWillReceiveProps() {
    this.scrollToRouteSection();
  }

  componentWillUnmount() {
    document.body.removeChild(this.backgroundNode);
    window.removeEventListener('scroll', this.handleHomeBackgroundScroll);
  }

  handleHomeBackgroundScroll() {
    this.backgroundImageContainer.style.transform =
      `translate(0, -${Math.round(this.getWindowScrollTop() * 0.5)}px)`;
  }

  scrollToRouteSection() {
    console.log('this.props.menuItemRoute', this.props.menuItemRoute);
    if (this.props.menuItemRoute) {
      scroller.scrollTo(this.props.menuItemRoute, {
        duration: 1000,
        delay: 50,
        offset: -55,
        smooth: true,
      });
    }
  }

  getWindowScrollTop() {
    const doc = document.documentElement;
    return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  }

  render() {
    return (
      <div>
        <ScrollElelement name="home">
          <Intro />
        </ScrollElelement>
        <ScrollElelement name="homeFeatures">
          <Features />
        </ScrollElelement>
        <ScrollElelement name="homeUseCases">
          <UseCases />
        </ScrollElelement>
        <ScrollElelement name="homePricing">
          <Pricing />
        </ScrollElelement>
      </div>
    );
  }
}

Home.propTypes = {
  menuItemRoute: React.PropTypes.string,
};

Home = connectToStores(Home,
  ['NavigationStore'], (component) => {
    const navigationStore = component.getStore('NavigationStore');
    return {
      menuItemRoute: navigationStore.getMenuItemRoute(),
    };
  });


export default Home;
