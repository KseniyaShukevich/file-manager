import { createReadStream, open, close, rename, createWriteStream, rm } from 'fs';

import { ERROR_MASSAGE_MANDATORY_ARGUMENTS } from './errorMessages.js';

const printFileContent = async (...args) => {
  const [ urlFileToRead ] = args;

  if (!urlFileToRead) {
    process.stdout.write(`\n${ERROR_MASSAGE_MANDATORY_ARGUMENTS}\n`);

    return;
  }

  const fileStream = createReadStream(urlFileToRead);

  await new Promise((resolve, reject) => {
    fileStream.on('data', (data) => {
      process.stdout.write(`${data}`);
    });

    fileStream.on('error', (err) => {
      reject(err);
    });

    fileStream.on('end', () => {
      resolve();
    });
  });
};

const createEmptyFile = async (...args) => {
  const [ fileName ] = args;

  if (!fileName) {
    process.stdout.write(`\n${ERROR_MASSAGE_MANDATORY_ARGUMENTS}\n`);

    return;
  };

  await new Promise((resolve, reject) => {
    open(fileName, "wx", (err, fd) => {
      if (err) {
        reject(err)
      } else {
        close(fd);
        resolve();
      };
    });
  });
};

const renameFile = async (...args) => {
  const [ pathToFile, newFileName ] = args;

  if (!pathToFile || !newFileName) {
    process.stdout.write(`\n${ERROR_MASSAGE_MANDATORY_ARGUMENTS}\n`);

    return;
  }

  await new Promise((resolve, reject) => {
    rename(pathToFile, newFileName, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      };
    });
  });
};

const copyFile = async (...args) => {
  const [ pathToFile, pathToNewDirectory ] = args;

  if (!pathToFile || !pathToNewDirectory) {
    process.stdout.write(`\n${ERROR_MASSAGE_MANDATORY_ARGUMENTS}\n`);

    return;
  }

  const fileReadStream = createReadStream(pathToFile);

  await new Promise((resolve, reject) => {
    fileReadStream.on('error', (err) => {
      reject(err);
    })

    fileReadStream.on('open', () => {
      const fileWriteStream = createWriteStream(pathToNewDirectory);
      const stream = fileReadStream.pipe(fileWriteStream);
  
      stream.on('finish', () => {
        resolve();
      });
    })
  });
};

const deleteFile = async (...args) => {
  const [ pathToFile ] = args;

  if (!pathToFile) {
    process.stdout.write(`\n${ERROR_MASSAGE_MANDATORY_ARGUMENTS}\n`);

    return;
  }

  await new Promise((resolve, reject) => {
    rm(pathToFile, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      };
    });
  });
};

const moveFile = async (...args) => {
  const [ pathToFile, pathToNewDirectory ] = args;

  if (!pathToFile || !pathToNewDirectory) {
    process.stdout.write(`\n${ERROR_MASSAGE_MANDATORY_ARGUMENTS}\n`);

    return;
  }

  await copyFile(pathToFile, pathToNewDirectory);
  await deleteFile(pathToFile);
};

export {
  printFileContent,
  createEmptyFile,
  renameFile,
  copyFile,
  deleteFile,
  moveFile,
};
