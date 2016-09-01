import { remove } from 'lodash';
import { getEnvironment } from './env';

const enabledFeatures = {
  test: ['local', 'beta'],
};

function storeFeatureFlags(featureFlags) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('enabledFeatures', JSON.stringify(featureFlags));
  }
}

export function getFeatureFlags() {
  const persistFlags =
    (typeof window !== 'undefined') &&
    window.localStorage &&
    window.localStorage.getItem('enabledFeatures');
  return persistFlags ? JSON.parse(persistFlags) : enabledFeatures;
}

export function isEnabled(feature, environment = getEnvironment()) {
  const featureFlags = getFeatureFlags();
  if (!featureFlags[feature] ||
    featureFlags[feature].indexOf(environment) === -1) {
    return false;
  }
  return true;
}

export function enableFeature(feature, environment = getEnvironment()) {
  const featureFlags = getFeatureFlags();
  if (!featureFlags[feature] || isEnabled(feature, environment)) {
    return true;
  }
  featureFlags[feature].push(environment);
  storeFeatureFlags(featureFlags);
  return isEnabled(feature, environment);
}

export function disableFeature(feature, environment = getEnvironment()) {
  const featureFlags = getFeatureFlags();
  if (!featureFlags[feature] || !isEnabled(feature, environment)) {
    return true;
  }
  remove(featureFlags[feature], (featureEnvironment) => {
    return featureEnvironment === environment;
  });
  storeFeatureFlags(featureFlags);
  return !isEnabled(feature, environment);
}
