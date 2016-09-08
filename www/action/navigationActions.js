export function toggleMobileNavigationButton(context, payload, done) {
  context.dispatch('TOGGLE_MOBILE_NAVIGATION_BUTTON', payload);
  done();
}

export function closeMobileNavigation(context, payload, done) {
  context.dispatch('CLOSE_MOBILE_NAVGATION', payload);
  done();
}

export function toggleLanguageSlideoutVisibility(context, payload, done) {
  context.dispatch('TOGGLE_LANGUAGE_SLIDEOUT_VISIBILITY', payload);
  done();
}

export function navigateMenuItemRoute(context, payload, done) {
  context.dispatch('NAVIGATE_MENU_ITEM_ROUTE', payload);
  done();
}
