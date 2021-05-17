'use strict';

const FF = require('./ffmpeg');
const fs = require('fs');

console.log('mix.js');

let rawdata = fs.readFileSync('json/showing10.json');
let show10 = JSON.parse(rawdata);

// console.log(show10.soundClip)

FF.FFMixer(show10.id, show10.movieurl, show10.soundClip, 13, 13, 13, 13);

// var s = `HIHIHI${String("00"+ show10.id).slice(-2)}`

// console.log(s);
