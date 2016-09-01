import React from 'react';
import MobileNavigation from './mobilenavigation/MobileNavigation';
import { connectToStores } from 'fluxible-addons-react';

let MobileNavigationContainer = (props) => {
  return (
    <MobileNavigation {...props} />
  );
};

MobileNavigationContainer.propTypes = {
  language: React.PropTypes.string.isRequired,
  currentRouteName: React.PropTypes.string.isRequired,
  isLanguageSlideoutVisible: React.PropTypes.bool.isRequired,
};

MobileNavigationContainer = connectToStores(MobileNavigationContainer,
  ['EnvironmentStore', 'RouteStore'], (component) => {
    const environmentStore = component.getStore('EnvironmentStore');
    const currentRoute = component.getStore('RouteStore').getCurrentRoute();
    return {
      language: environmentStore.getLanguage(),
      currentRouteName: currentRoute.name,
    };
  });

export default MobileNavigationContainer;
