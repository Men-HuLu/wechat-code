function t(t, a) {
    if (!(t instanceof a)) throw new TypeError("Cannot call a class as a function");
}

var a = function() {
    function t(t, a) {
        for (var e = 0; e < a.length; e++) {
            var i = a[e];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(a, e, i) {
        return e && t(a.prototype, e), i && t(a, i), a;
    };
}(), e = require("./../../../../util/Tween.js"), i = getApp(), n = function() {
    function n(a) {
        t(this, n), this.page = a, this.name = "test", this.round = 1, this.isFirst = !0;
    }
    return a(n, [ {
        key: "start",
        value: function() {
            this.playAni();
        }
    }, {
        key: "update",
        value: function(t) {}
    }, {
        key: "end",
        value: function(t) {}
    }, {
        key: "mySelect",
        value: function(t) {
            this.playTapAni(t, !0);
        }
    }, {
        key: "checkEnd",
        value: function() {
            var t = this, a = e.fastGet("test"), i = this.playQuestionAndBtnOut(a);
            a.wait(i), a.call(function() {
                t.round += 1, t.playAni();
            });
        }
    }, {
        key: "playAni",
        value: function() {
            var t = e.fastGet("test"), a = 0;
            this.isFirst && (this.playDotIn(t), t.wait(a), this.isFirst = !1), a = this.playTitleInOut(t), 
            t.wait(a), a = this.playQuestionIn(t), t.wait(a), a = this.playBtnIn(t), t.wait(a), 
            t.call(function() {});
        }
    }, {
        key: "playDotIn",
        value: function(t) {
            var a = this;
            return t.call(function() {
                for (var t = 0, e = {}, i = 11; i >= 0; i--) {
                    var n = wx.createAnimation();
                    n.opacity(0).step({
                        duration: 300,
                        delay: t
                    }), t += 100, e["battleViewData.dotAni[" + i + "]"] = n.export();
                    var o = wx.createAnimation();
                    o.top("40rpx").step({
                        timingFunction: "cubic-bezier(.17,.67,.68,1.29)",
                        duration: 100,
                        delay: t
                    }), e["battleViewData.dotIconAni[" + i + "]"] = o.export();
                }
                a.page.setData(e);
            }), 100;
        }
    }, {
        key: "playTitleInOut",
        value: function(t) {
            var a = this;
            return t.call(function() {
                var t = {}, e = wx.createAnimation();
                e.scale(1 * i.systemInfo.windowWidth / 750).step({
                    timingFunction: "cubic-bezier(.1,1.07,.75,1.57)",
                    duration: 500
                });
                var n = wx.createAnimation();
                n.opacity(1).top("260rpx").step({
                    timingFunction: "ease-in",
                    duration: 300
                }).opacity(0).step({
                    duration: 200,
                    delay: 1e3
                });
                var o = wx.createAnimation();
                o.opacity(1).scale(1).step({
                    timingFunction: "cubic-bezier(.1,1.07,.75,1.57)",
                    duration: 500
                }).opacity(0).scale(0).step({
                    duration: 200,
                    delay: 800
                }), t["battleViewData.timeViewAni"] = e.export(), t["battleViewData.titleViewAni"] = n.export(), 
                t["battleViewData.roundAni"] = o.export(), a.page.setData(t);
            }), 1500;
        }
    }, {
        key: "playQuestionIn",
        value: function(t) {
            var a = this;
            return t.call(function() {
                var t = wx.createAnimation();
                t.opacity(1).step({
                    timingFunction: "ease-in",
                    duration: 500
                });
                var e = {};
                e["battleViewData.questionViewAni"] = t.export(), a.page.setData(e);
            }), 1e3;
        }
    }, {
        key: "playBtnIn",
        value: function(t) {
            var a = this;
            return t.call(function() {
                for (var t = {}, e = 0; e < 4; e++) {
                    var i = "battleViewData.answer[" + e + "].ani", n = wx.createAnimation();
                    n.opacity(1).scale(1).step({
                        timingFunction: "cubic-bezier(.17,.67,.68,1.29)",
                        duration: 300
                    }), t[i] = n.export();
                }
                a.page.setData(t);
            }), 500;
        }
    }, {
        key: "playTapAni",
        value: function(t, a) {
            var i = this;
            this.tapEffPlaying = !0;
            var n = e.fastGet("tapEff" + this.round);
            n.call(function() {
                var a = wx.createAnimation();
                a.scale(1.01).step({
                    timingFunction: "cubic-bezier(.17,.67,.68,1.29)",
                    duration: 150
                });
                var e = {};
                e["battleViewData.answer[" + t + "].ani"] = a, e["battleViewData.answer[" + t + "].className"] = "selected", 
                i.page.setData(e);
            }), n.wait(500), n.call(function() {
                i.tapEffPlaying = !1, i.playChooseAni(t, a);
            });
        }
    }, {
        key: "playChooseAni",
        value: function(t, a) {
            if (!this.tapEffPlaying && !this.waitCmd) if (t >= 0) {
                var e = {};
                if (a) {
                    this.page.audioTrueCtx && this.page.audioTrueCtx.play(), e["battleViewData.answer[" + t + "].className"] = "true", 
                    e["battleViewData.answer[" + t + "].lImg"] = 2;
                    var i = wx.createAnimation();
                    if (i.opacity(1).step({
                        duration: 300
                    }), e["battleViewData.dotAni[" + (this.round - 1) + "]"] = i.export(), 4 == this.round || 8 == this.round || 12 == this.round) {
                        var n = wx.createAnimation();
                        n.top("0rpx").step({
                            duration: 100,
                            timingFunction: "cubic-bezier(.17,.67,.68,1.29)"
                        }), e["battleViewData.dotIconAni[" + (this.round - 1) + "]"] = n.export();
                    }
                } else this.page.audioFalseCtx && this.page.audioFalseCtx.play(), e["battleViewData.answer[" + t + "].className"] = "false", 
                e["battleViewData.answer[" + t + "].lImg"] = 1;
                this.page.setData(e), this.checkEnd();
            } else this.checkEnd();
        }
    }, {
        key: "playQuestionAndBtnOut",
        value: function(t) {
            var a = this;
            return t.call(function() {
                var t = {}, e = wx.createAnimation();
                e.opacity(0).step({
                    timingFunction: "ease-in",
                    duration: 200,
                    delay: 1500
                }), t["battleViewData.questionViewAni"] = e.export();
                for (var i = 0; i < 4; i++) {
                    var n = "battleViewData.answer[" + i + "].ani", o = wx.createAnimation();
                    o.opacity(0).scale(0).step({
                        timingFunction: "ease-in",
                        duration: 200,
                        delay: 1500
                    }), t[n] = o.export();
                }
                var r = wx.createAnimation();
                r.opacity(0).top("230rpx").step({
                    timingFunction: "ease-in",
                    duration: 200
                }), t["battleViewData.titleViewAni"] = r.export();
                var s = wx.createAnimation();
                s.opacity(0).scale(0).step({
                    duration: 200
                }), t["battleViewData.roundAni"] = s.export(), a.page.setData(t);
            }), 2e3;
        }
    } ]), n;
}();

module.exports = n;