import React from 'react';
import NavigationContainer from './navigation/NavigationContainer';
import MobileNavigationContainer from './navigation/MobileNavigationContainer';
import Footer from './modules/footer/Footer';
import { connectToStores, provideContext } from 'fluxible-addons-react';
import { handleHistory, History } from 'fluxible-router';

let Application = (props) => {
  const Handler = props.currentRoute.handler;
  const activeSidebar = props.isMobileNavbarVisible ? 'active-mobile-sidebar' : '';
  return (
    <div className={`main-container ${activeSidebar} ${props.currentRoute.name}`}>
      {props.isMobileNavbarVisible &&
        <MobileNavigationContainer
          isLanguageSlideoutVisible={props.isLanguageSlideoutVisible}
        />
      }
      <div className={'content-wrap'}>
        <NavigationContainer
          isMobileNavbarVisible={props.isMobileNavbarVisible}
          isLanguageSlideoutVisible={props.isLanguageSlideoutVisible}
        />
        <div className="handler-content page-content">
          <Handler />
        </div>
        <Footer isLimited={props.currentRoute.isFooterLimited} />
      </div>
    </div>
  );
};

Application.propTypes = {
  currentRoute: React.PropTypes.object,
  isMobileNavbarVisible: React.PropTypes.bool.isRequired,
  isLanguageSlideoutVisible: React.PropTypes.bool.isRequired,
};

Application = handleHistory(Application, {
  /*--------------------------------------------------------------------------------
  because of performance issues on mobile FF
  caused by calling replaceState method of browser History API
  we have to override that method as it's being called on window scroll event
  --------------------------------------------------------------------------------*/
  historyCreator: () => {
    const res = new History();
    res.replaceState = () => {
      void(0);
    };
    return res;
  },
});

export default provideContext(connectToStores(
    Application, ['NavigationStore', 'EnvironmentStore'],
  (context) => {
    const navigationStore = context.getStore('NavigationStore');
    return {
      isMobileNavbarVisible: navigationStore.getIsMobileNavbarVisible(),
      isLanguageSlideoutVisible: navigationStore.getIsLanguageSlideoutVisible(),
    };
  }
));
