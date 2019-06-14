function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function t(t, e) {
        for (var s = 0; s < e.length; s++) {
            var n = e[s];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, s, n) {
        return s && t(e.prototype, s), n && t(e, n), e;
    };
}(), s = require("./../data/MainData.js"), n = function() {
    function n(e) {
        var s = this;
        t(this, n), this.app = getApp(), this.page = e, this.page.audio_playEff = function(t, e) {
            s.play(s.effCtx, t);
        }, this.page.audio_playEffTimes = function(t, e, n) {
            s.playTimes(s.effCtx, t, n);
        }, this.page.audio_playBgm = function(t, e) {
            s.play(s.bgmCtx, t);
        }, this.page.audio_pause = function(t) {
            s.pause(t);
        }, this.page.audio_replay = function() {
            s.replay();
        }, this.page.audio_seekBgm = function(t) {
            s.seekBgm(t);
        }, this.page.audio_destory = function(t) {
            s.destory(t);
        }, this.soundGroup = {}, this.bgmCtx = wx.createInnerAudioContext(), this.effCtx = wx.createInnerAudioContext(), 
        this.lastRunTime = Date.now();
    }
    return e(n, [ {
        key: "addSound",
        value: function(t, e, s) {
            this.soundGroup[t] || (this.soundGroup[t] = {
                src: e,
                loop: s
            });
        }
    }, {
        key: "play",
        value: function(t, e) {
            if (!(s.role.settingsInfo || {}).soundOff && this.soundGroup[e]) {
                var n = this.soundGroup[e];
                t.pause(), t.src = n.src, t.loop = n.loop, t.seek && "function" == typeof t.seek && t.seek(0), 
                "startTime" in t && (t.startTime = 0), t.play(), this.lastRunTime = this.currentTime;
            }
        }
    }, {
        key: "playTimes",
        value: function(t, e, s) {
            var n = this;
            console.log("play sound times:" + s.toString() + ";name:" + e);
            var i = this.soundGroup[e];
            t.pause(), console.log(i.src), t.src = i.src, t.play();
            var o = s;
            t.onEnded(function() {
                console.log("on sound stop,name:", e), --o > 0 ? n.play(t, e) : t.offStop();
            });
        }
    }, {
        key: "pause",
        value: function(t) {
            this.bgmCtx && this.bgmCtx.pause();
        }
    }, {
        key: "replay",
        value: function() {
            this.bgmCtx && this.bgmCtx.play();
        }
    }, {
        key: "seekBgm",
        value: function(t) {
            this.bgmCtx && this.bgmCtx.seek(t);
        }
    }, {
        key: "destory",
        value: function() {
            this.bgmCtx && ("destory" in this.bgmCtx ? this.bgmCtx.destory() : this.bgmCtx.pause()), 
            this.effCtx && ("destory" in this.bgmCtx ? this.effCtx.destory() : this.effCtx.pause());
        }
    } ]), n;
}();

module.exports = n;