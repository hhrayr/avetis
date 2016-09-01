import fs from 'fs';
import path from 'path';

const accessLogStream = fs.createWriteStream(path.join(
  __dirname, '../../logs/access.log'), { flags: 'a' });

const errorLogStream = fs.createWriteStream(path.join(
  __dirname, '../../logs/error.log'), { flags: 'a' });

const uncaughtExceptionLogStream = fs.createWriteStream(path.join(
  __dirname, '../../logs/uncaughtException.log'), { flags: 'a' });


function getCurrentTime() {
  return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

export default {
  getAccessLogStream() {
    return accessLogStream;
  },
  logUncaughtException(message) {
    uncaughtExceptionLogStream.write(`\n${getCurrentTime()} ${message}`);
  },
  logError(error) {
    errorLogStream.write(`\n${getCurrentTime()} ${error.message}`);
  },
};
