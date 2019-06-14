function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function t(t, e) {
        for (var a = 0; a < e.length; a++) {
            var i = e[a];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(e, a, i) {
        return a && t(e.prototype, a), i && t(e, i), e;
    };
}(), a = require("./../../../../util/DailyChallengeManager.js"), i = require("./../../../../net/dailyChallengeNet.js"), n = (require("./../../../../const/consts.js"), 
require("./../../../../util/util.js")), r = require("./../../../../util/Tween.js"), o = getApp(), s = function() {
    function s(e) {
        t(this, s), this.name = "findQuiz", this.page = e;
    }
    return e(s, [ {
        key: "start",
        value: function(t) {
            this.isEntry = t.entry, this.page.audioFalseCtx && this.page.audioFalseCtx.seek(0), 
            this.page.audioTrueCtx && this.page.audioTrueCtx.seek(0), this.page.audioTapCtx && this.page.audioTapCtx.seek(0), 
            this.findQuiz();
        }
    }, {
        key: "update",
        value: function(t) {}
    }, {
        key: "end",
        value: function() {
            this.isEnd = !0, r.removeTweens("dcStateFindQuizAni");
        }
    }, {
        key: "findQuiz",
        value: function(t) {
            var e = this;
            i.findQuiz(function(t, a) {
                if (!e.isEnd) if (t) o.exitGame(t.errCode, t.errMsg); else {
                    var i = a;
                    a.encryptedData && (i = o.aesDecrypt(a.encryptedData)), n.setServerTime(i.curTime), 
                    i.endTime < i.curTime ? e.page.stateChange("choose", {
                        timeOut: !0
                    }) : e.setData(i);
                }
            });
        }
    }, {
        key: "setData",
        value: function(t) {
            this.page.btnLock = !0;
            var e = a.isLastRound(t.num), i = 1e3 * t.endTime - n.getServerTime();
            a.setCD(i), a.round = t.num;
            var r = {};
            r["battleViewData.visible"] = !0, r["battleViewData.roundText"] = e ? "最后一题" : "第 " + t.num + " 题", 
            r["battleViewData.countDown"] = Math.min(10, Math.max(0, Math.ceil(i / 1e3))), r["battleViewData.contributor"] = "本题目由" + n.formatName(t.contributor, 10) + "贡献", 
            r["battleViewData.partner"] = t.partner, r["battleViewData.typeID"] = t.typeID, 
            r["battleViewData.questionTypeName"] = t.type, r["battleViewData.question"] = t.quiz, 
            r["battleViewData.imageId"] = t.imageId || 0, r["battleViewData.answer"] = [ {
                index: 0,
                answer: t.options[0],
                className: "",
                lImg: 0,
                scale: n.getTextScale(t.options[0], 40, 334)
            }, {
                index: 1,
                answer: t.options[1],
                className: "",
                lImg: 0,
                scale: n.getTextScale(t.options[1], 40, 334)
            }, {
                index: 2,
                answer: t.options[2],
                className: "",
                lImg: 0,
                scale: n.getTextScale(t.options[2], 40, 334)
            }, {
                index: 3,
                answer: t.options[3],
                className: "",
                lImg: 0,
                scale: n.getTextScale(t.options[3], 40, 334)
            } ], this.playAni(r);
        }
    }, {
        key: "playAni",
        value: function(t) {
            var e = this, a = r.fastGet("dcStateFindQuizAni"), i = 0;
            this.isEntry && (this.playDotIn(a), a.wait(i)), i = this.playTitleInOut(a, t), a.wait(i), 
            i = this.playQuestionIn(a), a.wait(i), i = this.playBtnIn(a), a.wait(i), a.call(function() {
                e.page.stateChange("choose");
            });
        }
    }, {
        key: "playDotIn",
        value: function(t) {
            var e = this;
            return t.call(function() {
                for (var t = 0, a = {}, i = 11; i >= 0; i--) {
                    var n = wx.createAnimation();
                    n.opacity(0).step({
                        timingFunction: "step-start",
                        duration: 0,
                        delay: t
                    }), t += 50, a["battleViewData.dotAni[" + i + "]"] = n.export();
                    var r = wx.createAnimation();
                    r.top("40rpx").step({
                        timingFunction: "step-start",
                        duration: 0,
                        delay: t
                    }), a["battleViewData.dotIconAni[" + i + "]"] = r.export();
                }
                e.page.setData(a);
            }), 200;
        }
    }, {
        key: "playTitleInOut",
        value: function(t, e) {
            var a = this;
            return t.call(function() {
                var t = wx.createAnimation();
                t.scale(1 * o.systemInfo.windowWidth / 750).step({
                    timingFunction: "cubic-bezier(.1,1.07,.75,1.57)",
                    duration: 500
                });
                var i = wx.createAnimation();
                i.opacity(1).top("260rpx").step({
                    timingFunction: "ease-in",
                    duration: 300
                }).opacity(0).step({
                    duration: 200,
                    delay: 1e3
                });
                var n = wx.createAnimation();
                n.opacity(1).scale(1).step({
                    timingFunction: "cubic-bezier(.1,1.07,.75,1.57)",
                    duration: 500
                }).opacity(0).scale(0).step({
                    duration: 200,
                    delay: 800
                }), e["battleViewData.timeViewAni"] = t.export(), e["battleViewData.titleViewAni"] = i.export(), 
                e["battleViewData.roundAni"] = n.export(), a.playTimeAni(e), a.page.setData(e);
            }), 1500;
        }
    }, {
        key: "playQuestionIn",
        value: function(t) {
            var e = this;
            return t.call(function() {
                var t = wx.createAnimation();
                t.opacity(1).step({
                    timingFunction: "ease-in",
                    duration: 500
                });
                var a = {};
                a["battleViewData.questionViewAni"] = t.export(), e.page.setData(a);
            }), 1e3;
        }
    }, {
        key: "playBtnIn",
        value: function(t) {
            var e = this;
            return t.call(function() {
                for (var t = {}, a = 0; a < 4; a++) {
                    var i = "battleViewData.answer[" + a + "].ani", n = wx.createAnimation();
                    n.opacity(1).scale(1).step({
                        timingFunction: "cubic-bezier(.17,.67,.68,1.29)",
                        duration: 300
                    }), t[i] = n.export();
                }
                e.page.setData(t);
            }), 500;
        }
    }, {
        key: "playTimeAni",
        value: function(t) {
            var e = a.getCD(), i = Math.max(0, e - 5e3), n = Math.max(0, e - i), r = i >= 5e3 ? 0 : 180 * (5e3 - i) / 5e3, o = n >= 5e3 ? 0 : 180 * (5e3 - n) / 5e3, s = wx.createAnimation();
            s.rotateZ(r).step({
                timingFunction: "ease-in",
                duration: 200,
                delay: 200,
                transformOrigin: "0% 50%"
            });
            var u = wx.createAnimation();
            return u.rotateZ(o).step({
                timingFunction: "ease-in",
                duration: 200,
                delay: 0,
                transformOrigin: "100% 50%"
            }), t["battleViewData.ovalViewRight"] = s.export(), t["battleViewData.ovalViewLeft"] = u.export(), 
            t;
        }
    }, {
        key: "playNoAni",
        value: function(t) {
            this.page.setData(t), this.page.stateChange("choose");
        }
    } ]), s;
}();

module.exports = s;