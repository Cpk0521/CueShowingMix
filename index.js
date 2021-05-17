const express = require('express');
const fs = require('fs');
const { exec } = require('child_process');

// var app = express();
// const PORT = process.env.PORT || 3000;
 
// app.get('/', (req, res)=>{
//     res.sendFile(__dirname + "/index.html");
// })

// app.get('/mixer', (req, res)=>{

//     path = "https://cpk0521.github.io/CUE-Showing-Audio-Mixer/Video/showing010.mp4"
//     ffcomm = 'ffmpeg'

//     // const obj = JSON.parse(__dirname + "/json/showing10.json");

//     var output = Date.now() + "output.mp4"
//     exec(`ffmpeg -i ${path} -c copy ${output}`,  (error, stdout, stderr)=>{
//         if (error) {
//             console.log(`error: ${error.message}`);
//             return;
//         }else{
//             res.download(output,(err) => {
//                 if(err) throw err
                
//                 // fs.unlinkSync(req.file.path)
//                 fs.unlinkSync(output)
//             })
//         }
//         console.log(`stdout: ${stdout}`);
//         // console.error(`stderr: ${stderr}`);
//     });
// })

// app.listen(PORT, ()=>{
//     console.log(`listening on ${PORT}`);
// })
