'use strict';

const FF = require('./ffmpeg');
const fs = require('fs');

let rawdata = fs.readFileSync('json/showing10.json');
let json = JSON.parse(rawdata);


FF.FFMixer(10, json, 13, 13, 13, 13).then(()=>{
    console.log('success');
});

