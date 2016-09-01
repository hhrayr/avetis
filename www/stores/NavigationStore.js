import BaseStore from 'fluxible/addons/BaseStore';

class NavigationStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.isMobileNavbarVisible = false;
    this.isLanguageSlideoutVisible = false;
  }

  toggleMobileNavigationButton() {
    this.isMobileNavbarVisible = !this.isMobileNavbarVisible;
    this.isLanguageSlideoutVisible = false;
    this.emitChange();
  }

  closeMobileNavigation() {
    this.isLanguageSlideoutVisible = false;
    this.isMobileNavbarVisible = false;
    this.emitChange();
  }

  toggleLanguageSlideoutVisibility() {
    this.isLanguageSlideoutVisible = !this.isLanguageSlideoutVisible;
    this.emitChange();
  }

  getIsMobileNavbarVisible() {
    return this.isMobileNavbarVisible;
  }

  getIsLanguageSlideoutVisible() {
    return this.isLanguageSlideoutVisible;
  }
}

NavigationStore.storeName = 'NavigationStore';
NavigationStore.handlers = {
  TOGGLE_MOBILE_NAVIGATION_BUTTON: 'toggleMobileNavigationButton',
  CLOSE_MOBILE_NAVGATION: 'closeMobileNavigation',
  TOGGLE_LANGUAGE_SLIDEOUT_VISIBILITY: 'toggleLanguageSlideoutVisibility',
};

export default NavigationStore;
