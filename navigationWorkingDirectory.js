import fs from 'fs';

import { ERROR_MASSAGE_MANDATORY_ARGUMENTS } from './errorMessages.js';
import { checkNotRootDirectory } from './helpers.js';

const TYPE_DIRECTORY = 'directory';
const TYPE_FILE = 'file';

const goUp = () => {
  process.chdir('..');
};

const goToDirectory = (...args) => {
  const [ newDirectory ] = args;

  if (!newDirectory) {
    process.stdout.write(`\n${ERROR_MASSAGE_MANDATORY_ARGUMENTS}\n`);

    return;
  }

  if (checkNotRootDirectory(newDirectory)) {
    return;
  }

  process.chdir(newDirectory);
};

const getFormattedDirectoryData = (data) => {
  const directories = data
    .filter((item) => !item.isFile())
    .map((item) => ({ name: item.name, type: TYPE_DIRECTORY}));
  
  const files = data
    .filter((item) => item.isFile())
    .map((item) => ({ name: item.name, type: TYPE_FILE}));

  return [...directories, ...files];
};

const printDirectoryContent = async () => {
  const currentDirectory = process.cwd();

  await new Promise((resolve, reject) => {
    fs.readdir(currentDirectory, { withFileTypes: true }, (err, data) => {
      if (err) reject(err);
  
      const formattedData = getFormattedDirectoryData(data);

      resolve(formattedData);
    });
  }).then((data) => console.table(data));
};

export {
  goUp,
  goToDirectory,
  printDirectoryContent,
};
