import ua from 'universal-analytics';
import { forEach, merge } from 'lodash';
import config from '../configs/tracking';
import { getEnvironment } from '../../shared/utils/env';

const isProd = (getEnvironment() === 'production');
const getVisitor = (id) => {
  const visitor = ua(id, { https: (getEnvironment() !== 'local') });
  return isProd ? visitor : visitor.debug();
};
const visitors = {
  dev: getVisitor(config.ga.dev.id),
  business: getVisitor(config.ga.business.id),
};

const fireEvent = (name, data) => {
  const params = {
    ec: data.category,
    ea: data.action,
    el: data.label,
    cd: [],
  };
  if (data.custom) {
    const cdConfig = config.ga[name].cd;
    forEach(data.custom, (dimension, key) => {
      if (dimension) {
        params.cd[cdConfig[key]] = dimension;
      }
    });
  }
  visitors[name].event(params).send();
};

export function trackBusinessEvent(data) {
  if (isProd) {
    fireEvent('business', data);
  }
}
export function trackDevEvent(data) {
  fireEvent('dev', data);
}

export function trackEvent(data) {
  trackBusinessEvent(data);
  trackDevEvent(data);
}

export function pageView(path) {
  if (isProd) {
    visitors.business.pageview(path).send();
  }
  visitors.dev.pageview(path).send();
}

function gtmSet(value) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(value);
  }
}

export function gtmSetCountry(country) {
  gtmSet({ country });
}

export function gtmSetLanguage(language) {
  gtmSet({ language });
}

export function gtmEvent(event, data) {
  gtmSet(merge({ event }, data));
}
