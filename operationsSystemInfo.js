import os from 'os';

const printEndOfLine = () => {
  process.stdout.write(`${JSON.stringify(os.EOL)}\n`);
};

const printHostMachineInfo = () => {
  const hostMachineInfo = os.cpus();

  process.stdout.write(`Overall amount of CPUS: ${hostMachineInfo.length}\n`);

  hostMachineInfo.forEach((item) => {
    const multiplier = 1000;
    const clockRateMHz = item.speed;
    const clockRateGHz = clockRateMHz / multiplier;

    process.stdout.write(`Model: ${item.model} clock rate (in GHz): ${clockRateGHz}\n`);
  });
};

const printHomeDirectory = () => {
  process.stdout.write(`${os.homedir}\n`);
};

const printCurrentSystemUserName = () => {
  process.stdout.write(`${os.userInfo().username}\n`);
};

const printCPUArchitecture = () => {
  process.stdout.write(`${os.arch()}\n`);
};

const OS_OPERATIONS = {
  '--EOL': printEndOfLine,
  '--cpus': printHostMachineInfo,
  '--homedir': printHomeDirectory,
  '--username': printCurrentSystemUserName,
  '--architecture': printCPUArchitecture,
};

export { 
  OS_OPERATIONS,
};
