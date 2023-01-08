import crypto from 'crypto';
import { readFile } from 'fs';

import { ERROR_MASSAGE_MANDATORY_ARGUMENTS } from './errorMessages.js';

const getCalculatedHash = async (toHash) => {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(toHash);                    

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string                  
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return hashHex;
};

const printCalculatedHashForFile = async (...args) => {
  const [ pathToFile ] = args;

  if (!pathToFile) {
    process.stdout.write(`\n${ERROR_MASSAGE_MANDATORY_ARGUMENTS}\n`);

    return;
  }

  await new Promise((resolve, reject) => {
    readFile(pathToFile, async (err, data) => {
      if (err) {
        reject(err);
      } else {
        const hashedData = await getCalculatedHash(data);

        process.stdout.write(hashedData);
        resolve();
      };
    });
  });
};

export {
  printCalculatedHashForFile,
};
