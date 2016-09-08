import { map } from 'lodash';
import React from 'react';
import UrlLink from '../modules/links/UrlLink';
import NavLink from '../modules/links/NavLink';
import defaultRoutes from '../../configs/routes';
import Tsl from '../Tsl';
import { connectToStores } from 'fluxible-addons-react';
import { navigateMenuItemRoute } from '../../action/navigationActions';
import navigateAction from '../../action/navigateAction';

class NavList extends React.Component {
  render() {
    return (
      <div className="nav-list">
          <ul className="nav navbar-nav">
            { this.renderItemList() }
          </ul>
      </div>
    );
  }

  renderItemList() {
    return map(this.props.routes, (route, routeName) => {
      if (route.menuRouteName) {
        return this.renderMenuRoute(route, routeName);
      } else if (route.staticUrl && this.props.showStaticLinks) {
        return this.renderStaticUrl(route);
      } else if (route.list) {
        return this.renderNavUrl(route, routeName);
      }
      return null;
    });
  }

  renderMenuRoute(route, routeName) {
    const self = this;
    return (
      <li key={ route.path }>
        <a onClick={() => {
          self.context.executeAction(navigateMenuItemRoute, route.menuRouteName);
          if (self.props.currentRouteName !== route.page) {
            self.context.executeAction(navigateAction, {
              routeName,
              params: {
                language: self.props.language,
              },
            });
          }
        }}
        >
          <Tsl id={`generics.navigation.${routeName}`} />
        </a>
      </li>
    );
  }

  renderNavUrl(route, routeName) {
    return (
      <li key={ route.path }>
        <NavLink routeName={ route.page }>
          <Tsl id={`generics.navigation.${routeName}`} />
        </NavLink>
      </li>
    );
  }

  renderStaticUrl(route) {
    return (
      <li key={ route.path }>
        <UrlLink
          url={route.path}
          componentClass=""
          onClick={route.onClick}
        >
          <Tsl id={`generics.navigation.${route.page}.text`} />
        </UrlLink>
      </li>
    );
  }
}

NavList.defaultProps = {
  routes: defaultRoutes,
  showStaticLinks: false,
};

NavList.propTypes = {
  routes: React.PropTypes.object,
  showStaticLinks: React.PropTypes.bool,
  currentRouteName: React.PropTypes.string,
  language: React.PropTypes.string,
};

NavList.contextTypes = {
  executeAction: React.PropTypes.func,
};

NavList = connectToStores(NavList,
  ['EnvironmentStore', 'RouteStore'], (component) => {
    const currentRoute = component.getStore('RouteStore').getCurrentRoute();
    const environmentStore = component.getStore('EnvironmentStore');
    return {
      currentRouteName: currentRoute.name,
      language: environmentStore.getLanguage(),
    };
  });

export default NavList;
