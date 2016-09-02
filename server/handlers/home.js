import isCrawler from '../utils/isCrawler';
import { getRecommendedLanguageFromIP } from '../../www/utils/geo';

export default (req, res) => {
  // send crawlers to /en for SEO
  if (isCrawler(req.header('User-Agent'))) {
    res.redirect(301, '/en');
    return;
  }

  const recLanguage = getRecommendedLanguageFromIP(req.get('true-client-ip') || req.ip);
  res.redirect(302, `/${recLanguage}`);
};
