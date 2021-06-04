const express = require('express');
const fs = require('fs');
const { endianness } = require('os');
const FF = require('./ffmpeg');
// const { exec } = require('child_process');

var app = express();
const PORT = process.env.PORT || 3000;

const rawdata = fs.readFileSync('json/showing10.json');
const jsons = JSON.parse(rawdata);

app.listen(PORT, ()=>{
    console.log(`listening on ${PORT}`);
})

app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/index.html");
})

app.get('/mixer', (req, res, next)=>{

    req.setTimeout(500000);

    let output = Date.now() + ".mp4"
    
    let sid = req.query.id;
    let char1 = req.query.char1;
    let char2 = req.query.char2;
    let char3 = req.query.char3;
    let char4 = req.query.char4;

    // res.send(`Composing the Video now, please waiting 1-2 mins`)

    FF.FFMixer(sid, jsons, char1, char2, char3, char4, output).then(()=>{
        console.log("file is converted");

        res.download(output, (err) => {
            if(err) console.log(err)

            fs.unlinkSync(output);

            next();
        });

    }).catch(()=>{
        console.log('ff error');
    });


})


