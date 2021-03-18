import os


char1id = 11
char2id = 11
char3id = 11
char4id = 11


clipdata = [
    [3500, "anime_%s_1001_001.wav" % char1id],
    [11000, "anime_%s_1002_002.wav" % char2id],
    [13500, "anime_%s_1001_003.wav" % char1id],
    [16500, "anime_%s_1003_004.wav" % char3id],
    [20000, "anime_%s_1004_005.wav" % char4id],
    [23300, "anime_%s_1001_006.wav" % char1id],
    [29000, "anime_%s_1003_007.wav" % char3id],
    [34000, "anime_%s_1004_008.wav" % char4id],
    [39000, "anime_%s_1001_009.wav" % char1id],
    [46200, "anime_%s_1001_010.wav" % char1id],
    [52300, "anime_%s_1002_011.wav" % char2id],
    [55700, "anime_%s_1001_012.wav" % char1id],
    [59400, "anime_%s_1002_ad001.wav" % char2id],
    [68000, "anime_%s_1003_013.wav" % char3id],
    [82000, "anime_%s_1001_014.wav" % char1id],
    [95600, "anime_%s_1004_015.wav" % char4id],
    [102000, "anime_%s_1003_016.wav" % char3id],
    [106000, "anime_%s_1001_017.wav" % char1id],
    [117000, "anime_%s_1001_018.wav" % char1id],
    [119800, "anime_%s_1003_019.wav" % char3id],
    [125000, "anime_%s_1004_020.wav" % char4id],
    [128000, "anime_%s_1002_021.wav" % char2id],
    [137090, "anime_%s_1004_022.wav" % char4id],
    [139000, "anime_%s_1003_023.wav" % char3id],
    [142380, "anime_%s_1001_024.wav" % char1id],
    [156000, "anime_%s_1003_025.wav" % char3id],
    [162000, "anime_%s_1001_ad001.wav" % char1id],
    [162000, "anime_%s_1002_ad002.wav" % char2id],
    [168190, "anime_%s_1004_ad001.wav" % char4id],
    [172200, "anime_%s_1004_026.wav" % char4id],
    [181000, "anime_%s_1001_027.wav" % char1id],
    [188000, "anime_%s_1002_ad003.wav" % char2id],
    [190400, "anime_%s_1001_028.wav" % char1id],
    [192000, "anime_%s_1002_029.wav" % char2id],
    [199000, "anime_%s_1001_030.wav" % char1id],
    [201500, "anime_%s_1003_031.wav" % char3id],
    [203000, "anime_%s_1004_032.wav" % char4id],
    [205000, "anime_%s_1002_033.wav" % char2id],
    [217000, "anime_%s_1002_034.wav" % char2id],
    [217000, "anime_%s_1001_ad002.wav" % char1id],
    [225000, "anime_%s_1002_035.wav" % char2id],
    [228000, "anime_%s_1001_036.wav" % char1id]
]

fcmd = "ffmpeg -i showing010.mp4"
mcmd = " -filter_complex \""
ncmd = "[0:1]"
lcmd = " -map 0:0 -c:a aac -strict -2 -c:v copy outputtest.mp4"


for i in range(len(clipdata)):
    fcmd += " -i " + clipdata[i][1]
    mcmd += "["+ str(i+1) +":0]adelay=" + str(clipdata[i][0]) + "|" + str(clipdata[i][0]) + "[a" + str(i) + "];"
    ncmd += "[a" + str(i) + "]"

print(fcmd + mcmd + ncmd + " amix=inputs="+ str(len(clipdata)+1) +":dropout_transition=240,loudnorm,volume=2\"" + lcmd)
