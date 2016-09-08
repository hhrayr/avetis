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

  navigateMenuItemRoute(payload) {
    this.menuItemRoute = payload;
    this.emitChange();
  }

  getIsMobileNavbarVisible() {
    return this.isMobileNavbarVisible;
  }

  getIsLanguageSlideoutVisible() {
    return this.isLanguageSlideoutVisible;
  }

  getMenuItemRoute() {
    return this.menuItemRoute;
  }
}

NavigationStore.storeName = 'NavigationStore';
NavigationStore.handlers = {
  TOGGLE_MOBILE_NAVIGATION_BUTTON: 'toggleMobileNavigationButton',
  CLOSE_MOBILE_NAVGATION: 'closeMobileNavigation',
  TOGGLE_LANGUAGE_SLIDEOUT_VISIBILITY: 'toggleLanguageSlideoutVisibility',
  NAVIGATE_MENU_ITEM_ROUTE: 'navigateMenuItemRoute',
};

export default NavigationStore;
