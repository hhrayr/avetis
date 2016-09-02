import { forEach } from 'lodash';
import xmlbuilder from 'xmlbuilder';
import routes from '../../www/configs/routes';
import genSitemapUrls from '../utils/genSitemapUrls';

export default (req, res) => {
  res.set('Content-Type', 'text/xml');

  const doc = xmlbuilder.begin().dec('1.0', 'UTF-8');

  const urlmap = doc
    .ele('urlset', {
      xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
      'xmlns:xhtml': 'http://www.w3.org/1999/xhtml',
    });

  forEach(routes, (route) => {
    genSitemapUrls(route, (urldata, alternates) => {
      const url = urlmap.ele('url');

      forEach(urldata, (data, key) => {
        url.ele(key, data);
      });

      alternates.forEach((alternate) => {
        url.ele('xhtml:link', alternate);
      });
    });
  });

  res.send(doc.end());
};
