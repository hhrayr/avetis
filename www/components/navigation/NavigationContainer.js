import React from 'react';
import Navigation from './desktopnavigation/Navigation';
import { connectToStores } from 'fluxible-addons-react';

let NavigationContainer = (props) => {
  return (
    <Navigation
      language={props.language}
      isMobileNavbarVisible={props.isMobileNavbarVisible}
      currentRouteName={props.currentRouteName}
      isLanguageSlideoutVisible={props.isLanguageSlideoutVisible}
    />
  );
};

NavigationContainer.propTypes = {
  language: React.PropTypes.string.isRequired,
  isMobileNavbarVisible: React.PropTypes.bool.isRequired,
  currentRouteName: React.PropTypes.string.isRequired,
  isLanguageSlideoutVisible: React.PropTypes.bool.isRequired,
};

NavigationContainer = connectToStores(NavigationContainer,
  ['EnvironmentStore'], (component) => {
    const environmentStore = component.getStore('EnvironmentStore');
    const currentRoute = component.getStore('RouteStore').getCurrentRoute();
    return {
      language: environmentStore.getLanguage(),
      currentRouteName: currentRoute.name,
    };
  });

export default NavigationContainer;
