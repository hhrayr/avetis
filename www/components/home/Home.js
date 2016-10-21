import React from 'react';
import { connectToStores } from 'fluxible-addons-react';
import { Element as ScrollElelement, scroller } from 'react-scroll';
import Intro from './Intro';
import Features from './Features';
import UseCases from './UseCases';
import Pricing from './Pricing';

const headerHeight = 51;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleHomeBackgroundScroll = this.handleHomeBackgroundScroll.bind(this);
    this.windowScrolled = false;
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleHomeBackgroundScroll);
    this.handleHomeBackgroundScroll();
    this.scrollToRouteSection();
  }

  componentWillReceiveProps() {
    this.scrollToRouteSection();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleHomeBackgroundScroll);
  }

  handleHomeBackgroundScroll() {
    const windowScroll = this.getWindowScrollTop();
    if (windowScroll) {
      if (!this.windowScrolled) {
        document.body.className += ' clear-nav-color';
        this.windowScrolled = true;
      }
    } else {
      if (this.windowScrolled) {
        document.body.className = document.body.className.replace(/clear\-nav\-color/g, '');
        this.windowScrolled = false;
      }
    }
    const backgroundPositionX = Math.round(
      this.refs['home-main-container'].offsetHeight / 2 -
      windowScroll / 5
    );
    this.refs['home-main-container'].style.backgroundPosition = `center ${backgroundPositionX}px`;
  }

  scrollToRouteSection() {
    if (this.props.menuItemRoute) {
      scroller.scrollTo(this.props.menuItemRoute, {
        duration: 1000,
        delay: 50,
        offset: -headerHeight,
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
      <div className="home-main-container" ref="home-main-container">
        <ScrollElelement name="home" className="home-scroll-slide">
          <Intro offset={headerHeight} />
        </ScrollElelement>
        <ScrollElelement name="homeFeatures" className="home-scroll-slide">
          <Features />
        </ScrollElelement>
        <ScrollElelement name="homeUseCases" className="home-scroll-slide">
          <UseCases />
        </ScrollElelement>
        <ScrollElelement name="homePricing" className="home-scroll-slide">
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
