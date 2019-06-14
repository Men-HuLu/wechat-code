var i = require("./../../../util/util.js");

Page({
    onLoad: function(t) {
        this.src = "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46", 
        i.initAudio(this, "myAudio", this.src);
    },
    data: {
        src: ""
    },
    audioPlay: function() {
        this.audio_play(this.src);
    },
    audioPause: function() {
        this.audio_pause();
    },
    audio14: function() {
        this.audioCtx.seek(14);
    },
    audioStart: function() {
        this.audioCtx.seek(0);
    },
    onUnload: function() {
        this.audio_destory();
    }
});