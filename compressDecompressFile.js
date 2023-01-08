import { createReadStream, createWriteStream } from 'fs';
import zlib from 'zlib';

import { ERROR_MASSAGE_MANDATORY_ARGUMENTS } from './errorMessages.js';

const pipeStream = async (pathToFile, pathToDestination, callbackStream) => {
  const fileReadStream = createReadStream(pathToFile);

  await new Promise((resolve, reject) => {
    fileReadStream.on('error', (err) => {
      reject(err);
    })

    fileReadStream.on('open', () => {
      const fileWriteStream = createWriteStream(pathToDestination);
      const stream = fileReadStream.pipe(callbackStream).pipe(fileWriteStream);
  
      stream.on('finish', () => {
        resolve();
      });
    })
  });
}

const compressFile = async (...args) => {
  const [ pathToFile, pathToDestination ] = args;

  if (!pathToFile || !pathToDestination) {
    process.stdout.write(`\n${ERROR_MASSAGE_MANDATORY_ARGUMENTS}\n`);

    return;
  }

  await pipeStream(pathToFile, pathToDestination, zlib.createBrotliCompress());
};

const decompressFile = async (...args) => {
  const [ pathToFile, pathToDestination ] = args;

  if (!pathToFile || !pathToDestination) {
    process.stdout.write(`\n${ERROR_MASSAGE_MANDATORY_ARGUMENTS}\n`);

    return;
  }

  await pipeStream(pathToFile, pathToDestination, zlib.createBrotliDecompress());
};

export {
  compressFile,
  decompressFile,
}
