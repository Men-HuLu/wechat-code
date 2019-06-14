function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var i = t[a];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, a, i) {
        return a && e(t.prototype, a), i && e(t, i), t;
    };
}(), a = getApp(), i = require("./../../../../net/dailyChallengeNet.js"), n = require("./../../../../data/ItemsManager.js"), r = require("./../../../../util/DailyChallengeManager.js"), o = require("./../../../../util/Tween.js"), u = require("./../../../../util/util.js"), s = function() {
    function s(t) {
        e(this, s), this.page = t, this.name = "chooseEnd";
    }
    return t(s, [ {
        key: "start",
        value: function(e) {
            this.round = r.round, this.page.btnLock = !0, e.timeOut ? r.canRevival() ? this.showRevival() : this.showResult() : (this.trueIndex = r.getTrueIndex(this.round), 
            this.selectIndex = r.getSelectIndex(this.round), this.yes = this.trueIndex == this.selectIndex, 
            this.playAni());
        }
    }, {
        key: "update",
        value: function(e) {}
    }, {
        key: "end",
        value: function(e) {
            this.isEnd = !0, o.removeTweens("chooseEndAni");
        }
    }, {
        key: "showResult",
        value: function(e) {
            var t = this;
            i.findResult(r.curId, function(i, r) {
                if (i) u.ShowConfirm(i.errCode, i.errMsg, function() {}); else {
                    var o = r.items[0], s = !0, l = !1, c = void 0;
                    try {
                        for (var d, f = r.items[Symbol.iterator](); !(s = (d = f.next()).done); s = !0) {
                            var v = d.value;
                            n.addItem(v.itemId, v.itemNum);
                        }
                    } catch (i) {
                        l = !0, c = i;
                    } finally {
                        try {
                            !s && f.return && f.return();
                        } finally {
                            if (l) throw c;
                        }
                    }
                    a.mainData.role.dailyChallenge.curId = 0, t.page.dcResultView.show(e, o.itemId, o.itemNum, function() {
                        wx.navigateBack({});
                    }), e && t.page.audio_playEff("win", "sound_eff");
                }
            });
        }
    }, {
        key: "showRevival",
        value: function() {
            var e = this;
            this.page.audio_playEff("warnning", "sound_eff"), this.page.dcRevivalView.show(function(t) {
                t ? e.revival() : e.showResult(!1);
            });
        }
    }, {
        key: "revival",
        value: function() {
            var e = this;
            i.revival(r.curId, function(t, i) {
                t ? u.ShowConfirm(t.errCode, t.errMsg, function() {}) : (a.updateGold(i.gold), r.revival(), 
                e.page.stateChange("findQuiz"));
            });
        }
    }, {
        key: "playAni",
        value: function() {
            var e = this, t = o.fastGet("chooseEndAni");
            t.call(function() {
                for (var t = {}, a = 0; a < 4; a++) {
                    var i = "battleViewData.answer[" + a + "]", n = a == e.trueIndex, r = !1, o = !1;
                    if (n && (t[i + ".className"] = n ? "true" : "", o = !0, r = !0), a == e.selectIndex && (t[i + ".lImg"] = n ? 2 : 1, 
                    t[i + ".className"] = n ? "true" : "false", o = !0, r = !0, n ? e.page.audioTrueCtx && e.page.audioTrueCtx.play() : e.page.audioFalseCtx && e.page.audioFalseCtx.play(), 
                    n)) {
                        var u = wx.createAnimation();
                        if (u.opacity(1).step({
                            duration: 300
                        }), t["battleViewData.dotAni[" + (e.round - 1) + "]"] = u.export(), 4 == e.round || 8 == e.round || 12 == e.round) {
                            12 != e.round && e.page.audio_playEff("point", "sound_eff");
                            var s = wx.createAnimation();
                            s.top("0rpx").step({
                                duration: 100,
                                timingFunction: "cubic-bezier(.17,.67,.68,1.29)"
                            }), t["battleViewData.dotIconAni[" + (e.round - 1) + "]"] = s.export();
                        }
                    }
                    if (r) {
                        if (o) {
                            var l = wx.createAnimation();
                            l.scale(1.1).step({
                                timingFunction: "ease-in",
                                duration: 150
                            }), l.scale(1).step({
                                timingFunction: "linear",
                                duration: 50
                            }), t[i + ".ani"] = l;
                        }
                    } else {
                        var c = wx.createAnimation();
                        c.scale(0).step({
                            timingFunction: "ease-in",
                            duration: 200
                        }), t[i + ".ani"] = c;
                    }
                }
                e.page.setData(t);
            }), t.wait(2500), t.call(function() {
                for (var t = {}, a = 0; a < 4; a++) {
                    var i = wx.createAnimation();
                    i.scale(0).step({
                        timingFunction: "ease-in",
                        duration: 300
                    }), t["battleViewData.answer[" + a + "].ani"] = i.export();
                }
                var n = wx.createAnimation();
                n.opacity(0).step({
                    duration: 300
                }), t["battleViewData.questionViewAni"] = n.export(), e.page.setData(t);
            }), t.wait(1500), t.call(function() {
                e.yes ? r.isLastRound(e.round) ? e.showResult(!0) : e.page.stateChange("findQuiz") : r.canRevival() ? e.showRevival() : e.showResult(!1);
            });
        }
    } ]), s;
}();

module.exports = s;