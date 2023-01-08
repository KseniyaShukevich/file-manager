import COMANDS from './comands.js';
import { ERROR_MESSAGE_INVALID_INPUT } from './errorMessages.js';
import { closeFileManager, printDefaultMessages } from './helpers.js';

const INDEX_START_ARGUMNETS = 2;
const ARGUMNET_NAME = '--username=';
const EXIT = '.exit';

const argumentNameLength = ARGUMNET_NAME.length;
const allArguments = process.argv.slice(INDEX_START_ARGUMNETS);
const argumentUserName = allArguments.find((item) => item.startsWith(ARGUMNET_NAME));
const userName = argumentUserName?.slice(argumentNameLength) || 'Anonymous';

process.stdin.resume();

process.stdout.write(`Welcome to the File Manager, ${userName}!\n`);
printDefaultMessages();

process.stdin.on('data', async (data) => {
  const comandString = data.toString();
  const [comand, ...args] = comandString.slice(0, comandString.length - 2).split(' ');

  if (comand === EXIT) {
    closeFileManager(userName);
  }

  try {
    await COMANDS[comand](...args);
  } catch(err) {
    process.stdout.write(`\n${ERROR_MESSAGE_INVALID_INPUT}: ${err}\n`);
  };

  printDefaultMessages();
});
