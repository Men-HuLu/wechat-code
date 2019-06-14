function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var s = t[i];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
            Object.defineProperty(e, s.key, s);
        }
    }
    return function(t, i, s) {
        return i && e(t.prototype, i), s && e(t, s), t;
    };
}(), i = require("../../../util/util.js"), s = (require("../../../util/Tween.js"), 
function() {
    function s(t, n) {
        e(this, s), this.canvasID = t, this.app = getApp(), this.maxValue = n, this.countDown = n, 
        this.preTime = i.getServerTime(), setTimeout(this.timer.bind(this), 1e3 / 30);
    }
    return t(s, [ {
        key: "timer",
        value: function() {
            if (!this.isDestroy) {
                if (this.visible) {
                    if (this.isPlay) {
                        var e = i.getServerTime();
                        this.countDown -= (e - this.preTime) / 1e3, this.countDown = Math.max(0, this.countDown), 
                        this.preTime = e;
                    } else this.isPlayReset && (this.countDown += .6, this.countDown > this.maxValue && (this.countDown = this.maxValue, 
                    this.isPlayReset = !1));
                    this.drawTimeView();
                } else this.clearTimeView();
                setTimeout(this.timer.bind(this), 1e3 / 30);
            }
        }
    }, {
        key: "setVisible",
        value: function(e) {
            this.visible = e, e ? this.drawTimeView() : this.clearTimeView();
        }
    }, {
        key: "destroy",
        value: function() {
            this.isDestroy = !0, clearTimeout(this.cTime);
        }
    }, {
        key: "play",
        value: function(e) {
            this.isPlay = !0, this.preTime = i.getServerTime(), this.countDown = Math.max(0, e);
        }
    }, {
        key: "stop",
        value: function() {
            this.isPlay = !1;
        }
    }, {
        key: "reset",
        value: function() {
            this.isPlayReset = !0;
        }
    }, {
        key: "drawTimeView",
        value: function() {
            if (this.visible) {
                var e = i.rpx2px(132) / 2, t = i.rpx2px(132) / 2, s = i.rpx2px(104), n = wx.createCanvasContext(this.canvasID);
                if (n.beginPath(), n.setLineWidth(i.rpx2px(28)), n.setLineCap("round"), n.arc(e, t, s / 2, 0, 2 * Math.PI), 
                n.setStrokeStyle("#ffffff"), n.stroke(), this.countDown > 0) {
                    n.beginPath(), n.setLineWidth(i.rpx2px(18)), n.setLineCap("round");
                    var a = (2 - 2 * this.countDown / this.maxValue - .5) * Math.PI, r = 1.5 * Math.PI;
                    n.arc(e, t, s / 2, a, r), n.setStrokeStyle("#FFA640"), n.stroke();
                }
                var o = Math.max(0, Math.ceil(this.countDown));
                n.setFontSize(i.rpx2px(36)), n.setFillStyle("white"), n.setTextAlign("center"), 
                n.setTextBaseline("middle"), n.fillText(o, e, t), n.draw();
            }
        }
    }, {
        key: "clearTimeView",
        value: function() {
            wx.createCanvasContext(this.canvasID).draw();
        }
    } ]), s;
}());

module.exports = s;