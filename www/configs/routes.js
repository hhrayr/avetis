import _404 from '../components/_404';
import Home from '../components/home/Home';
import Features from '../components/Features';
import Subpage from '../components/Subpage';
import ContactUs from '../components/Subpage';
import Registration from '../components/Subpage';

export default {
  _404: {
    path: '/:language/404',
    method: 'get',
    page: '_404',
    name: '_404',
    handler: _404,
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
    handler: Features,
    sitemap: false,
  },
  homeFeatures: {
    path: '/:language/features',
    page: 'home',
    list: true,
    handler: Home,
  },
  homeUseCases: {
    path: '/:language/usecases',
    page: 'home',
    list: true,
    handler: Home,
  },
  homePricing: {
    path: '/:language/pricing',
    page: 'home',
    list: true,
    handler: Home,
  },
  contactUs: {
    path: '/:language/contact',
    method: 'get',
    page: 'contactUs',
    handler: ContactUs,
    sitemap: false,
    list: true,
  },
  registration: {
    path: '/:language/registration',
    method: 'get',
    page: 'registration',
    handler: Registration,
    sitemap: false,
    list: true,
  },
  home: {
    path: '/:language',
    method: 'get',
    page: 'home',
    handler: Home,
    sitemap: true,
  },
};
