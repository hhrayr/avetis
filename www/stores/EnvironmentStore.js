import BaseStore from 'fluxible/addons/BaseStore';
import RouteStore from './RouteStore';
import environment from '../configs/environment';

class EnvironmentStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.language = environment.defaults.language;
    this.config = environment;
  }

  getLanguage() {
    return this.language;
  }

  getConfig() {
    return environment;
  }

  checkRouteChange(payload) {
    this.dispatcher.waitFor(RouteStore, () => {
      const routeLanguage = payload.params.language || this.language;
      let changed = false;
      if (this.language !== routeLanguage) {
        this.language = routeLanguage;
        changed = true;
      }
      if (changed) {
        this.emitChange();
      }
    });
  }

  dehydrate() {
    return {
      language: this.language,
    };
  }

  rehydrate(state) {
    this.language = state.language;
  }
}

EnvironmentStore.storeName = 'EnvironmentStore';
EnvironmentStore.handlers = {
  NAVIGATE_SUCCESS: 'checkRouteChange',
  USER_LOGIN: 'userLogin',
  SET_ENDPOINT: 'setEndpoint',
  USER_LOGIN_CHECK: 'userLogin',
};

export default EnvironmentStore;
