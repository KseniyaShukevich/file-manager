import { wrapFunction } from './helpers.js';
import { goUp, goToDirectory, printDirectoryContent } from './navigationWorkingDirectory.js';
import { printFileContent, createEmptyFile, renameFile, copyFile, deleteFile, moveFile } from './operationsWithFiles.js';
import { OS_OPERATIONS } from './operationsSystemInfo.js';
import { printCalculatedHashForFile } from './hash.js';
import { compressFile, decompressFile } from './compressDecompressFile.js';

const COMANDS = {
  up: () => wrapFunction(goUp),
  cd: (...args) => wrapFunction(goToDirectory, ...args),
  ls: () => wrapFunction(printDirectoryContent),
  cat: (...args) => wrapFunction(printFileContent, ...args),
  add: (...args) => wrapFunction(createEmptyFile, ...args),
  rn: (...args) => wrapFunction(renameFile, ...args),
  cp: (...args) => wrapFunction(copyFile, ...args),
  rm: (...args) => wrapFunction(deleteFile, ...args),
  mv: (...args) => wrapFunction(moveFile, ...args),
  os: (...args) => wrapFunction(OS_OPERATIONS[args[0]]),
  hash: (...args) => wrapFunction(printCalculatedHashForFile, ...args),
  compress: (...args) => wrapFunction(compressFile, ...args),
  decompress: (...args) => wrapFunction(decompressFile, ...args),
};

export default COMANDS;
