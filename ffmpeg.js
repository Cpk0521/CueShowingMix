const ffmpeg = require('fluent-ffmpeg');

function FFMixer(showingid, Movie, showingclip, char1, char2, char3, char4, output = "output.mp4", Callback = ()=>{}){
    return new Promise((resolve, reject) => {
        let command = ffmpeg()
            .addInput(Movie)
            .on('progress', Callback)
            .on('stderr', (stderrLine)=>{
                console.log(stderrLine);
            });
            
        showingclip.forEach((clip) => {
            let url = 'https://cpk0521.github.io/CUE-Showing-Audio-Mixer/Voice/Showing_10';
            let charid;
                switch (clip.charid) {
                    case 1:
                        charid = char1;
                        break;
                    case 2:
                        charid = char2;
                        break;
                    case 3:
                        charid = char3;
                        break;
                    case 4:
                        charid = char4;
                        break;
                }

                let clipname = `${url}/${String("00"+ clip.charid).slice(-2)}/char_${String("00"+ charid).slice(-2)}/anime_${String("00"+ charid).slice(-2)}_${String("00"+ showingid).slice(-2)}${String("00"+ clip.charid).slice(-2)}_${clip.clipid}`
                command.addInput(clipname)
        });
        
        const tagFilter = [];
        const delayFilter = showingclip.map((clip, index) => {
            let delaytime = clip.Time;
            let cliptag = `[a${index}]`;

            tagFilter.push(cliptag);
            return `[${index + 1}:0] adelay=${delaytime}|${delaytime} ${cliptag}`;
        });
        const alltagFilter = `[0:1] ${tagFilter.join('')} amix=inputs=${tagFilter.length+1}:dropout_transition=240, loudnorm, volume=2`;

        command
            .complexFilter(delayFilter.concat([alltagFilter]))
            .outputOption('-map 0:0')
            .outputOption('-strict -2')
            .audioCodec('aac')
            .videoCodec('copy')
            .save(output)
    });
}

module.exports = {
    FFMixer
};