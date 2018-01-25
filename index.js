'use strict';

const neeoapi = require('neeo-sdk');

console.log('[ NEEO SDK ] INIT DEVICES');

//include devices installed via npm
const oppo = require('neeo-oppo-udp-20x');

//place constructed devices in araay
const devices = [oppo];



function startSdkExample(brain) {
  console.log('- Start server');
  neeoapi.startServer({
    brain,
    port: 6336,
    name: 'multidevice-adapter',
    devices: devices
  })
  .then(() => {
    console.log('# READY! use the NEEO app to search for "NEEO Multiple Devices".');
  })
  .catch((error) => {
    //if there was any error, print message out to console
    console.error('ERROR!', error.message);
    process.exit(1);
  });
}

console.log('[ NEEO SDK ] CONNECTING TO BRAIN');
const brainIp = process.env.BRAINIP;
if (brainIp) {
  console.log('- use NEEO Brain IP from env variable', brainIp);
  startSdkExample(brainIp);
} else {
  console.log('- discover one NEEO Brain...');
  neeoapi.discoverOneBrain()
    .then((brain) => {
      console.log('- Brain discovered:', brain.name);
      startSdkExample(brain);
    });
}