function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var s = e[i];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
            Object.defineProperty(t, s.key, s);
        }
    }
    return function(e, i, s) {
        return i && t(e.prototype, i), s && t(e, s), e;
    };
}(), i = require("./../data/MainData.js"), s = function() {
    function s(e) {
        var i = this;
        t(this, s), this.app = getApp(), this.page = e, this.page.audio_playEff = function(t, e) {
            i.playEff(t, e);
        }, this.page.audio_playBgm = function(t, e) {
            i.playBgm(t, e);
        }, this.page.audio_pause = function(t) {
            i.pause(t);
        }, this.page.audio_replay = function() {
            i.replay();
        }, this.page.audio_seekBgm = function(t) {
            i.seekBgm(t);
        }, this.page.audio_destory = function(t) {
            i.destory(t);
        }, this.soundGroup = {};
    }
    return e(s, [ {
        key: "addSound",
        value: function(t, e, i) {
            this.soundGroup[t] || (this.soundGroup[t] = {
                src: e,
                loop: i
            });
        }
    }, {
        key: "playBgm",
        value: function(t, e) {
            if (this.bgmCtx || (this.bgmCtx = wx.createAudioContext(e)), !(i.role.settingsInfo || {}).soundOff && this.soundGroup[t]) {
                var s = this.soundGroup[t];
                this.bgmCtx.setSrc(s.src), this.bgmCtx.play();
            }
        }
    }, {
        key: "playEff",
        value: function(t, e) {
            if (this.effCtx || (this.effCtx = wx.createAudioContext(e)), !(i.role.settingsInfo || {}).soundOff && this.soundGroup[t]) {
                var s = this.soundGroup[t];
                this.effCtx.setSrc(s.src), this.effCtx.play();
            }
        }
    }, {
        key: "seekBgm",
        value: function(t) {
            this.bgmCtx && this.bgmCtx.seek(t);
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
        key: "destory",
        value: function() {
            this.bgmCtx && this.bgmCtx.pause(), this.effCtx && this.effCtx.pause();
        }
    } ]), s;
}();

module.exports = s;