const express = require('express');
const fs = require('fs');
const { endianness } = require('os');
const FF = require('./ffmpeg');
const { exec } = require('child_process');

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

app.get('/mixer', (req, res)=>{

    req.setTimeout(30000);
    
    let sid = req.query.id;
    let char1 = req.query.char1;
    let char2 = req.query.char2;
    let char3 = req.query.char3;
    let char4 = req.query.char4;

    let outputid = `showing${sid}${char1}${char2}${char3}${char4}${Date.now()}`
    let output = `${outputid}.mp4`;


    res.write('<p>Composing the Video maybe waiting 1-2 mins<p>');
    res.write('<div style="height:70%; width:70%; margin:auto; overflow: scroll;">');
    var writeline = (date)=>{res.write(`<p>${date}<p>`)}

    FF.FFMixer(sid, jsons, char1, char2, char3, char4, output, writeline).then(()=>{
        console.log("file is converted");
        

        res.write('</div>');
        res.write(`<form action="/download" method="get" id="dform" style="width:70%; margin:auto;">
                        <input type="hidden" name="vid" value="${outputid}">
                        <button type='submit' class='btn mx-auto' form="dform" value="Submit" onclick="(this)=>{this.style.display = 'none'}" style="width: 100%; height: 20%;margin 20px 0">
                            Download
                        </button>
                    <form>`);
        res.end();
        // res.download(output, (err) => {
        //     if(err) console.log(err)

        //     fs.unlinkSync(output);
        //     next();
        // });

    }).catch((err)=>{
        console.log('ff error : ' + err);
    });


})
  
app.get('/download', (req, res)=>{

    let vid = req.query.vid;

    if(fs.existsSync(`${vid}.mp4`)){
        res.download(`${vid}.mp4`, (err) => {
            if(err) console.log(err)
    
            fs.unlinkSync(`${vid}.mp4`);
            // next();
        });
    }else{
        res.redirect('/');
    }

})
