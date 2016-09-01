import geoip from 'geoip-lite';
import environment, { getLanguageByCountry } from '../configs/environment';

export function getRecommendedLanguageFromIP(ip) {
  const geo = geoip.lookup(ip);
  if (!geo) {
    return environment.defaults.language;
  }
  return getLanguageByCountry(geo.country);
}
