import express from 'express';
import compression from 'compression';
import path from 'path';
import forEach from 'lodash/forEach';
import serialize from 'serialize-javascript';
import navigateAction from './www/action/navigateAction';
import debugLib from 'debug';
import React from 'react';
import ReactDOM from 'react-dom/server';
import locale from 'locale';
import wwwApp from './www/app';
import os from 'os';
import async from 'async';
import fs from 'fs';
import HtmlComponent from './www/components/Html';
import { createElementWithContext } from 'fluxible-addons-react';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import expressDomainMiddleware from 'express-domain-middleware';
import routes from './www/configs/routes';
import environmentConfig from './www/configs/environment';
import logger from './shared/utils/logger';
import xmlbuilder from 'xmlbuilder';
import genSitemapUrls from './www/utils/genSitemapUrls';
import { getRecommendedLanguageFromIP } from './www/utils/geo';
import { cacheHeaders, pullTranslations } from './shared/utils/server';
import { handleApiRequest } from './api/handlers';


const env = process.env.NODE_ENV;
locale.Locale.default = 'en';

const debug = debugLib('avetis');

const favicon = require('serve-favicon');

const server = express();

server.all('/api/:area/:method', handleApiRequest);

server.use(cacheHeaders);
server.use('/assets', express.static(path.join(__dirname, '/www/assets')));
server.use('/public', express.static(path.join(__dirname, '/www/build')));

server.use(locale(environmentConfig.availableLanguages));
server.use(morgan(
  ':remote-addr :req[True-Client-IP] [:date[iso]] ' +
  '":method :url" :status ":user-agent" :req[X-Unique-Id]', {
    stream: logger.getAccessLogStream(),
  }
));

server.use(expressDomainMiddleware);

server.use(favicon(`${__dirname}/www/assets/favicon.ico`));

server.get('/sitemap.xml', (req, res) => {
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
});

server.use('/wti-pull', pullTranslations);

server.get('/info', (req, res) => {
  const serviceInformation = {
    env,
    hostname: os.hostname(),
    version: path.basename(fs.realpathSync(process.cwd())),
  };

  if (req.query.cache) {
    GLOBAL.magicCache.keys((err, keys) => {
      if (err) throw err;
      serviceInformation.cache = {
        stats: GLOBAL.magicCache.getStats(),
        keys: {},
      };
      async.each(keys,
        (key, cb) => {
          GLOBAL.magicCache.getTtl(key, (nErr, ts) => {
            serviceInformation.cache.keys[key] = Math.floor((ts - Date.now()) / 1000);
            cb();
          });
        },
        () => {
          res.status(200).send(serviceInformation);
        });
    });
  } else {
    res.status(200).send(serviceInformation);
  }
});

server.use(compression());
server.use(bodyParser.json());

function isCrawler(userAgent) {
  const botPattern = '(googlebot\/|Googlebot-Mobile|Googlebot-Image|' +
  'Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|' +
  'Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|' +
  'jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|' +
  'seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|' +
  'webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|' +
  'fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|' +
  'ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|' +
  'purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|' +
  'spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|' +
  'Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|' +
  'europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|' +
  'domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|' +
  'gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|' +
  'lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|' +
  'lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|' +
  'gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|' +
  'content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|' +
  'ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|' +
  'blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|' +
  'psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|' +
  'GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|' +
  'Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|' +
  'Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|' +
  'ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|' +
  'crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)';
  const re = new RegExp(botPattern, 'i');
  return re.test(userAgent);
}

server.get('/', (req, res) => {
  // send crawlers to /en for SEO
  if (isCrawler(req.header('User-Agent'))) {
    res.redirect(301, '/en');
    return;
  }

  const recLanguage = getRecommendedLanguageFromIP(req.get('true-client-ip'));
  res.redirect(302, `/${recLanguage}`);
});

server.use((req, res, next) => {
  const context = wwwApp.createContext({ req, res });

  debug('Executing navigate action');
  context.getActionContext().executeAction(navigateAction, {
    url: req.url,
  }, (err) => {
    if (err && err.statusCode !== 404) {
      next(err);
      return;
    }

    debug('Exposing context state');
    const exposed = `window.App=${serialize(wwwApp.dehydrate(context))};`;

    debug('Rendering Application component into html');
    const markup = ReactDOM.renderToString(createElementWithContext(context));
    const htmlElement = React.createElement(HtmlComponent, {
      clientFile: env !== 'local' ? 'main.min.js' : 'main.js',
      context: context.getComponentContext(),
      state: exposed,
      markup,
    });
    const html = ReactDOM.renderToStaticMarkup(htmlElement);

    debug('Sending markup');
    res.type('html');
    res.write(`<!DOCTYPE html>${html}`);
    res.end();
  });
});

if (env !== 'local') {
  server.use((err, req, res, next) => {
    logger.logError(err);
    res.status(500).send();
    next();
  });
}

const port = process.env.PORT || 5050;
server.listen(port, '0.0.0.0');
console.log(`Application listening on port ${port}`);

// do not touch, already bad practice app has to crash
if (env !== 'local') {
  process.on('uncaughtException', (err) => {
    Error.stackTraceLimit = 1;
    Error.captureStackTrace(err);
    logger.logUncaughtException(err.stack.replace(/(\r\n|\n|\r)/gm, ''));
    process.exit(1);
  });
}

export default server;
