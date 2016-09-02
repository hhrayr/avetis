import os from 'os';
import path from 'path';
import fs from 'fs';
import async from 'async';
import { getEnvironment } from '../../shared/utils/env';

const env = getEnvironment();

export default (req, res) => {
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
};
