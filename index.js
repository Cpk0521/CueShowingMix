const express = require('express');
const fs = require('fs');
const FF = require('./ffmpeg');

var app = express();
const PORT = process.env.PORT || 3000;

const rawdata = fs.readFileSync('./json/showing10.json');
const jsons = JSON.parse(rawdata);

app.use(express.static('public'));

// app.get('/', (req, res)=>{
//     res.sendFile(__dirname + "/index.html");
// })

app.get('/mixer', (req, res)=>{

    let sid = req.query.id;
    let char1 = req.query.char1;
    let char2 = req.query.char2;
    let char3 = req.query.char3;
    let char4 = req.query.char4;

    let outputid = `showing${sid}_${char1}_${char2}_${char3}_${char4}_${Date.now()}`
    let output = `${outputid}.mp4`;

    res.write('<p>Composing the Video maybe waiting 1-2 mins<p>');
    res.write('<div style="height:70%; width:70%; margin:auto; overflow: scroll;">');
    var writeline = (date)=>{res.write(`<p>${date}<p>`)}

    FF.FFMixer(sid, jsons, char1, char2, char3, char4, output, writeline).then(()=>{
        console.log("file is converted");
        
        res.write('</div>');
        res.write(`<div style="width:70%; margin:auto;"><button class='btn mx-auto' onclick="window.location.href='/'" style="width: 100%; height: 20%;margin: 20px 0;">
                        Back to main page
                    </button></div>`);

        res.write(`<script>
                        window.location.href="/download?vid=${outputid}";
                    </script>`);

        res.end();

    }).catch((err)=>{

        if(fs.existsSync(output)){
            fs.unlinkSync(output);
        }

        console.log('ff error : ' + err);
    });

})
  
app.get('/download', (req, res)=>{

    const {vid} = req.query;

    if(fs.existsSync(`${vid}.mp4`)){
        res.download(`${vid}.mp4`, (err) => {
            if(err) console.log(err)
            
            console.log(`${vid} is downloaded`);

            fs.unlinkSync(`${vid}.mp4`);
            console.log(`${vid} removed`)
        });
    }else{
        res.redirect('/');
    }
})

app.all('*', (req, res)=>{
    res.status(404).send("404 NOT FOUND");
})

app.listen(PORT, ()=>{
    console.log(`listening on ${PORT}`);
})