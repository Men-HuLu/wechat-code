function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var a = e[i];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(t, a.key, a);
        }
    }
    return function(e, i, a) {
        return i && t(e.prototype, i), a && t(e, a), e;
    };
}(), i = (getApp(), require("./../../../../net/dailyChallengeNet.js")), a = require("./../../../../util/DailyChallengeManager.js"), n = require("./../../../../util/util.js"), o = require("./../../../../util/Tween.js"), r = function() {
    function r(e) {
        t(this, r), this.page = e, this.name = "choose", this.selectedIndex = -1;
    }
    return e(r, [ {
        key: "start",
        value: function(t) {
            t.timeOut ? this.page.stateChange("chooseEnd", {
                timeOut: !0
            }) : (this.page.btnLock = !1, this.round = a.round, this.countDown = a.getCD(), 
            this.endTime = n.getServerTime() + this.countDown, this.onTimer(), this.playTimeAni());
        }
    }, {
        key: "update",
        value: function(t) {}
    }, {
        key: "end",
        value: function() {
            this.isEnd = !0, clearTimeout(this.timer), o.removeTweens("tapEff" + this.round);
        }
    }, {
        key: "mySelect",
        value: function(t) {
            var e = n.getServerTime();
            this.endTime - e <= 0 ? (this.page.setData({
                "battleViewData.countDown": 0
            }), this.page.stateChange("chooseEnd", {
                timeOut: !0
            })) : (this.page.btnLock = !0, this.choose(t));
        }
    }, {
        key: "choose",
        value: function(t) {
            this.page.audioTapCtx && this.page.audioTapCtx.play(), this.playTapAni(t), this.sendChooseCmd(t), 
            this.stopTimeAni(), clearTimeout(this.timer);
        }
    }, {
        key: "sendChooseCmd",
        value: function(t) {
            var e = this, o = t + 1;
            this.waitCmd = !0, i.choose(this.round, o, function(i, o) {
                i ? (console.error("choose err", i), n.ShowConfirm(i.errCode, i.errMsg, function() {})) : (a.setTrueIndex(e.round, o.answer - 1), 
                a.setSelectIndex(e.round, t), e.waitCmd = !1, e.checkEnd());
            });
        }
    }, {
        key: "onTimer",
        value: function() {
            var t = n.getServerTime();
            this.countDown = Math.max(0, this.endTime - t);
            var e = Math.ceil(this.countDown / 1e3);
            this.page.setData({
                "battleViewData.countDown": e
            }), this.countDown > 0 ? this.timer = setTimeout(this.onTimer.bind(this), 100) : this.page.stateChange("chooseEnd", {
                timeOut: !0
            });
        }
    }, {
        key: "checkEnd",
        value: function() {
            this.tapAniPlaying || this.waitCmd || this.page.stateChange("chooseEnd");
        }
    }, {
        key: "playTapAni",
        value: function(t) {
            var e = this;
            this.tapAniPlaying = !0;
            var i = o.fastGet("tapEff" + this.round);
            i.call(function() {
                var i = wx.createAnimation();
                i.scale(1.01).step({
                    timingFunction: "cubic-bezier(.17,.67,.68,1.29)",
                    duration: 150
                });
                var a = {};
                a["battleViewData.answer[" + t + "].ani"] = i, a["battleViewData.answer[" + t + "].className"] = "selected", 
                e.page.setData(a);
            }), i.wait(500), i.call(function() {
                e.tapAniPlaying = !1, e.checkEnd();
            });
        }
    }, {
        key: "playTimeAni",
        value: function() {
            var t = {}, e = Math.max(0, this.countDown - 5e3), i = Math.max(0, this.countDown - e);
            if (e > 0) {
                var a = wx.createAnimation();
                a.rotateZ(180).step({
                    timingFunction: "linear",
                    duration: e,
                    transformOrigin: "0% 50%",
                    delay: 0
                }), t["battleViewData.ovalViewRight"] = a.export();
            }
            var n = wx.createAnimation();
            n.rotateZ(180).step({
                timingFunction: "linear",
                duration: i,
                transformOrigin: "100% 50%",
                delay: e
            }), t["battleViewData.ovalViewLeft"] = n.export(), this.page.setData(t);
        }
    }, {
        key: "stopTimeAni",
        value: function() {
            var t = Math.max(0, this.countDown - 5e3), e = Math.max(0, this.countDown - t), i = t >= 5e3 ? 0 : 180 * (5e3 - t) / 5e3, a = e >= 5e3 ? 0 : 180 * (5e3 - e) / 5e3, n = wx.createAnimation();
            n.rotateZ(i).step({
                timingFunction: "step-start",
                duration: 0,
                delay: 0,
                transformOrigin: "0% 50%"
            });
            var o = wx.createAnimation();
            o.rotateZ(a).step({
                timingFunction: "step-start",
                duration: 0,
                delay: 0,
                transformOrigin: "100% 50%"
            });
            var r = {};
            r["battleViewData.ovalViewLeft"] = o.export(), r["battleViewData.ovalViewRight"] = n.export(), 
            this.page.setData(r);
        }
    } ]), r;
}();

module.exports = r;