import _404 from '../components/_404';
import Home from '../components/home/Home';
import Features from '../components/Features';
import Subpage from '../components/Subpage';

export default {
  _404: {
    path: '/:language/404',
    method: 'get',
    page: '_404',
    name: '_404',
    handler: _404,
    list: false,
    sitemap: false,
  },
  privacy: {
    path: '/:language/privacy',
    method: 'get',
    page: 'privacy',
    handler: Subpage,
    sitemap: true,
  },
  'legal-notice': {
    path: '/:language/legal-notice',
    method: 'get',
    page: 'legal-notice',
    handler: Subpage,
    sitemap: true,
  },
  featureFlags: {
    path: '/:language/feature-flags',
    method: 'get',
    page: 'featureFlags',
    list: false,
    handler: Features,
    sitemap: false,
  },
  home: {
    path: '/:language',
    method: 'get',
    page: 'home',
    list: false,
    handler: Home,
    sitemap: true,
  },
};
