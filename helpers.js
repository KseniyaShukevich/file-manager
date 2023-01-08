import { ERROR_MESSAGE_OPERATION_FAILED } from './errorMessages.js';

const closeFileManager = (userName) => {
  process.stdout.write(`\nThank you for using File Manager, ${userName}, goodbye!`);
  process.exit();
};

const getMessageWithCWD = () => {
  return `\nYou are currently in ${process.cwd()}\n\n`;
};

const printDefaultMessages = () => {
  process.stdout.write(getMessageWithCWD());
  process.stdout.write(`Please, print comand: `);
};

const wrapFunction = async (callback, ...args) => {
  try {
    await callback(...args);
  } catch(err) {
    process.stdout.write(`\n${ERROR_MESSAGE_OPERATION_FAILED}: ${err}\n`);
  };
};

const checkNotRootDirectory = (newDirectory) => {  
  const rootDirectory = process.env.HOMEDRIVE;
  const isNewDirectoryInRootDrive = newDirectory.startsWith(rootDirectory);
  const isNewDirectoryWithDrive = newDirectory.includes(':');

  return isNewDirectoryWithDrive && !isNewDirectoryInRootDrive;
};

export { 
  closeFileManager, 
  printDefaultMessages,
  wrapFunction,
  checkNotRootDirectory,
};
