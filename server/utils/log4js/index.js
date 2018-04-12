/* eslint no-unused-expressions:0 no-param-reassign: 0 */
import fs from 'fs';
import log4js from 'log4js';
import colors from 'colors';
import { loggDir } from '../../config';

!fs.existsSync(loggDir) && fs.mkdirSync(loggDir);

const themes = {
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'red',
  info: 'green',
  data: 'blue',
  help: 'cyan',
  warn: 'yellow',
  debug: 'magenta',
  error: 'red',
  fatal: 'rainbow',
};
colors.setTheme(themes);

log4js.configure(
  {
    appenders: [
      {
        type: 'dateFile',
        filename: `${loggDir}/${process.env.PROJECT_NAME || 'zhib_api'}`,
        pattern: '-yyyy-MM-dd.log',
        alwaysIncludePattern: true,
      },
    ],
  },
  {},
);

const logger = log4js.getLogger('logs');

const info = (message = '') => {
  if (typeof message !== 'string') {
    message = JSON.stringify(message);
  }
  console.log(message.info);
  logger.info(message);
};

const debug = (message = '') => {
  if (typeof message !== 'string') {
    message = JSON.stringify(message);
  }
  console.log(message.debug);
  logger.debug(message);
};

const trace = (message = '') => {
  if (typeof message !== 'string') {
    message = JSON.stringify(message);
  }
  console.log(message.trace);
  logger.trace(message);
};

const warn = (message = '') => {
  if (typeof message !== 'string') {
    message = JSON.stringify(message);
  }
  console.log(message.warn);
  logger.warn(message);
};

const error = (message = '') => {
  if (typeof message !== 'string') {
    message = JSON.stringify(message);
  }
  console.log(message.red);
  logger.error(message);
};

const fatal = (message = '') => {
  if (typeof message !== 'string') {
    message = JSON.stringify(message);
  }
  console.log(message.rainbow);
  logger.fatal(message);
};

export default {
  info,
  debug,
  warn,
  error,
  fatal,
  trace,
};
