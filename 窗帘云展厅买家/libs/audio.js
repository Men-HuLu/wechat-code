function e(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = function() {
    function e(e, r) {
        for (var o = 0; o < r.length; o++) {
            var n = r[o];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(r, o, n) {
        return o && e(r.prototype, o), n && e(r, n), r;
    };
}(), o = function() {
    function o() {
        e(this, o), this.recorderManager = wx.getRecorderManager();
    }
    return r(o, [ {
        key: "start",
        value: function(e) {
            console.log(this.recorderManager), this.recorderManager.onStart(function() {
                console.log("开始"), e.setData({
                    isStart: !0
                });
            });
            var r = {
                duration: 1e5,
                sampleRate: 44100,
                numberOfChannels: 1,
                encodeBitRate: 192e3,
                format: "aac",
                frameSize: 50
            };
            this.recorderManager.start(r);
        }
    }, {
        key: "stop",
        value: function(e) {
            var r = this;
            this.recorderManager.stop(), this.recorderManager.onStop(function(o) {
                console.log("停止", o);
                var n = o.tempFilePath;
                e.setData({
                    isStart: !1,
                    src: n
                }), r.audionew(n);
            });
        }
    }, {
        key: "audionew",
        value: function(e) {
            console.log(1);
            var r = wx.createInnerAudioContext();
            r.src = e, r.autoplay = !0, r.onPlay(function() {
                console.log("开始播放");
            }), r.onError(function(e) {
                console.log(e.errMsg), console.log(e.errCode);
            });
        }
    } ]), o;
}();

exports.default = o;