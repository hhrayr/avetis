import { map } from 'lodash';
import React from 'react';
import UrlLink from '../modules/links/UrlLink';
import NavLink from '../modules/links/NavLink';
import defaultRoutes from '../../configs/routes';
import Tsl from '../Tsl';

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
      if (route.staticUrl && this.props.showStaticLinks) {
        return this.renderStaticUrl(route);
      } else if (route.list) {
        return this.renderNavUrl(route, routeName);
      }
      return null;
    });
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
};

export default NavList;
