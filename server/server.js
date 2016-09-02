import express from 'express';
import expressDomainMiddleware from 'express-domain-middleware';
import compression from 'compression';
import path from 'path';
import locale from 'locale';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import favicon from 'serve-favicon';
import environmentConfig from '../www/configs/environment';
import logger from '../shared/utils/logger';
import { cacheHeaders, pullTranslations } from '../shared/utils/server';
import { handleApiRequest } from '../api/handlers';
import sitemapHandler from './handlers/sitemap';
import infoHandler from './handlers/info';
import homeHandler from './handlers/home';
import webAppHandler from './handlers/webApp';
import { getEnvironment } from '../shared/utils/env';
const env = getEnvironment();

locale.Locale.default = environmentConfig.defaults.language;

const server = express();

server.use(morgan(
  ':remote-addr :req[True-Client-IP] [:date[iso]] ' +
  '":method :url" :status ":user-agent" :req[X-Unique-Id]', {
    stream: logger.getAccessLogStream(),
  }
));
server.use(expressDomainMiddleware);
server.use(favicon(`${__dirname}/../www/assets/favicon.ico`));
server.use(compression());
server.use(bodyParser.json());
server.all('/api/:area/:method', handleApiRequest);
server.use('/wti-pull', pullTranslations);
server.get('/sitemap.xml', sitemapHandler);
server.get('/info', infoHandler);
server.use(cacheHeaders);
server.use('/assets', express.static(path.join(__dirname, '/../www/assets')));
server.use('/public', express.static(path.join(__dirname, '/../www/build')));
server.use(locale(environmentConfig.availableLanguages));

server.get('/', homeHandler);
server.use(webAppHandler);

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
