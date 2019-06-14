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
}(), a = require("./../../../util/util.js"), i = require("./../../../net/fightNet.js"), n = (require("./../../../net/connectNotify.js"), 
require("./../../../const/notifyConsts.js")), s = (require("./../../../const/consts"), 
require("./../../../util/Tween.js")), r = require("./../../../libs/md5/md5.js"), o = getApp(), l = function() {
    function l(t) {
        e(this, l), this.page = t, this.name = "StateChoose", this.selected = {
            a: !1,
            b: !1
        }, this.emptyAnswer = {
            option: 0,
            yes: !1,
            score: 0,
            answer: 0,
            totalScore: 0
        };
    }
    return t(l, [ {
        key: "init",
        value: function() {
            if (this.round = this.page.round, this.roomID = this.page.roomId, this.page.answerBtnLock = !1, 
            this.countDown = this.page.data.battleViewData.countDown, this.preTime = a.getServerTime(), 
            this.timeFlag = setInterval(this.onTimer.bind(this), 100), this.page.playerLogout) this.page.stateChange("StateChooseEnd"); else {
                var e = !0, t = !1, i = void 0;
                try {
                    for (var s, r = this.page.answerList[Symbol.iterator](); !(e = (s = r.next()).done); e = !0) {
                        var o = s.value;
                        o.num == this.round && this.onFightAnswer(n.ActionFightAnswer, o);
                    }
                } catch (e) {
                    t = !0, i = e;
                } finally {
                    try {
                        !e && r.return && r.return();
                    } finally {
                        if (t) throw i;
                    }
                }
                this.playTimeAni(this.countDown);
            }
        }
    }, {
        key: "checkEnd",
        value: function() {
            !this.isEnd && this.selected.a && this.selected.b && this.waitCmd && console.log("稀有情况发生啦！", this.isEnd, this.selected.a, this.selected.b, this.waitCmd), 
            !this.isEnd && this.selected.a && this.selected.b && !this.waitCmd && (this.stopTimeAni(), 
            this.page.stateChange("StateChooseEnd"));
        }
    }, {
        key: "getScoreBarHeight",
        value: function(e) {
            return 100 * Math.min(e / 1200, 1) + "%";
        }
    }, {
        key: "onFightAnswer",
        value: function(e, t) {
            var a = "ob" != this.page.type && "obChallenge" != this.page.type;
            t.uid == this.page.data.a.uid ? this.abSelect(t, "a", a) : t.uid == this.page.data.b.uid && this.abSelect(t, "b", a);
        }
    }, {
        key: "abSelect",
        value: function(e, t, a) {
            var i = this;
            if (!this.selected[t]) {
                this.selected[t] = !0;
                var n = e.option - 1, s = e.yes;
                this.page.selectIndex[this.round][t] = n, e.answer > 0 && this.page.setTrueIndex(this.round, e.answer - 1);
                var r = {};
                if (r = this.playBuffAni(e, r, t), r = this.playAddScore(t, e.totalScore, r), !s) {
                    var o = wx.createAnimation();
                    o.backgroundColor("#FA537F").step({
                        timingFunction: "step-start",
                        duration: 100
                    }), o.backgroundColor("#47E5FF").step({
                        timingFunction: "ease-in",
                        duration: 200,
                        delay: 400
                    }), r[t + ".scoreProgressAni"] = o.export();
                }
                a ? setTimeout(function() {
                    i.checkEnd();
                }, 500) : this.checkEnd(), this.page.setData(r);
            }
        }
    }, {
        key: "mySelect",
        value: function(e) {
            var t = this, a = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            if (this.page.answerBtnLock = !0, e >= 0) {
                this.tapEffPlaying = !0;
                var i = s.fastGet("tapEff" + this.round);
                i.call(function() {
                    var a = wx.createAnimation();
                    a.scale(1.1).step({
                        timingFunction: "ease-in",
                        duration: 150
                    }), a.scale(1).step({
                        timingFunction: "linear",
                        duration: 50
                    });
                    var i = {};
                    i["battleViewData.answer[" + e + "].ani"] = a, i["battleViewData.answer[" + e + "].className"] = "selected", 
                    t.page.setData(i);
                }), i.wait(500), i.call(function() {
                    a || (t.tapEffPlaying = !1, t.playChooseAni());
                });
            }
            this.choose(e, a);
        }
    }, {
        key: "choose",
        value: function(e, t) {
            var n = this;
            t || (this.page.selectIndex[this.round].a = e, this.selected.a = !0);
            var s = e + 1;
            this.waitCmd = !0, this.cmdData = void 0;
            var l = "";
            try {
                var c = [];
                c.push(this.page.data.battleViewData.answer[0].answer), c.push(this.page.data.battleViewData.answer[1].answer), 
                c.push(this.page.data.battleViewData.answer[2].answer), c.push(this.page.data.battleViewData.answer[3].answer), 
                c.sort(function(e, t) {
                    return e > t ? 1 : -1;
                }), l = c[0] + c[1] + c[2] + c[3], l = r.hex_md5(l);
            } catch (e) {}
            i.choose(this.roomID, this.round, s, l, this.page.cfTime, a.getServerTime(), function(e, a) {
                if (!n.isEnd) if (e) o.exitGame(e.errCode, e.errMsg); else if (a && a.answer > 0 && n.page.setTrueIndex(n.round, a.answer - 1), 
                n.cmdData = a, n.waitCmd = !1, t) n.page.audienceViewController && s > 0 && n.page.audienceViewController.remindAnswer(o.mainData.role.userInfo.nickName, n.page.data.battleViewData.answer[s - 1].answer), 
                n.checkEnd(); else {
                    if (a.enemyAnswer > 0 && !n.selected.b) {
                        console.log("对手短连接传来的答题");
                        var i = a.enemyAnswer - 1, r = {
                            option: a.enemyAnswer,
                            yes: n.page.getTrueIndex(n.round) == i,
                            totalScore: a.enemyScore,
                            answer: 0
                        };
                        n.abSelect(r, "b", !1);
                    }
                    n.page.selectIndex[n.round].a = a.option - 1, n.playChooseAni();
                }
            });
        }
    }, {
        key: "onTimer",
        value: function() {
            var e = this, t = a.getServerTime() - this.preTime;
            this.preTime = a.getServerTime(), this.countDown = Math.max(0, this.countDown - t / 1e3);
            var n = {
                "battleViewData.countDownStr": Math.ceil(this.countDown),
                "battleViewData.countDown": this.countDown
            };
            this.page.setData(n), this.countDown <= 0 && (clearInterval(this.timeFlag), this.timeFlag = void 0, 
            this.page.answerBtnLock = !0, "obChallenge" == this.page.type ? i.getAnswer(this.roomID, this.round, function(t, a) {
                t ? console.error("getAnswer err", t) : a && (console.log("getAnswer data", a), 
                a.answer > 0 && e.page.setTrueIndex(e.round, a.answer - 1), e.selected.a && e.selected.b && e.checkEnd(), 
                e.selected.a || e.abSelect(e.emptyAnswer, "a", !1), e.selected.b || e.abSelect(e.emptyAnswer, "b", !1));
            }) : "ob" == this.page.type ? (this.selected.a || this.abSelect(this.emptyAnswer, "a", !1), 
            this.selected.b || this.abSelect(this.emptyAnswer, "b", !1)) : (this.selected.a || this.waitCmd || this.mySelect(-1), 
            this.selected.b || this.abSelect(this.emptyAnswer, "b", !1)));
        }
    }, {
        key: "playChooseAni",
        value: function() {
            if (!this.tapEffPlaying && !this.waitCmd) if (this.page.selectIndex[this.round].a >= 0 && this.cmdData) {
                var e = this.cmdData.yes, t = (this.page.data.a.score, this.cmdData.score, {});
                e ? (this.page.audioTrueCtx && this.page.audioTrueCtx.play(), t = this.playTrueAni(t), 
                t = this.playBuffAni(this.cmdData, t, "a")) : (this.page.audioFalseCtx && this.page.audioFalseCtx.play(), 
                t = this.playFalseAni(t), t = this.playErrEff(t)), this.checkEnd(), this.page.setData(t);
            } else this.checkEnd();
        }
    }, {
        key: "playTrueAni",
        value: function(e) {
            var t = this.page.selectIndex[this.round].a;
            return e["battleViewData.answer[" + t + "].className"] = "true", e["battleViewData.answer[" + t + "].lImg"] = 2, 
            e = this.playAddScore("a", this.cmdData.score + this.page.data.a.score, e);
        }
    }, {
        key: "playFalseAni",
        value: function(e) {
            var t = this.page.selectIndex[this.round].a;
            return e["battleViewData.answer[" + t + "].className"] = "false", e["battleViewData.answer[" + t + "].lImg"] = 1, 
            e;
        }
    }, {
        key: "playBuffAni",
        value: function(e, t, a) {
            if (e.extraScore) {
                var i = ~~e.extraScore[5], n = ~~e.extraScore[6], s = 204e3 + this.page.data.battleViewData.typeID;
                if (i > 0 || n > 0) if ("a" == a) {
                    var r = wx.createAnimation();
                    r.left("-8rpx").step({
                        timingFunction: "ease-in",
                        duration: 500
                    }), r.left("-400rpx").step({
                        timingFunction: "ease-in",
                        duration: 200,
                        delay: 2500
                    }), i > 0 && (t["battleViewData.buffScoreLeft"] = "+" + i), n > 0 && (t["battleViewData.bookScoreLeft"] = "+" + n), 
                    t["battleViewData.bookTypeLeft"] = s, t["battleViewData.leftComboViewAni"] = r.export();
                } else {
                    var o = wx.createAnimation();
                    o.right("-8rpx").step({
                        timingFunction: "ease-in",
                        duration: 500
                    }), o.right("-400rpx").step({
                        timingFunction: "ease-in",
                        duration: 200,
                        delay: 2500
                    }), i > 0 && (t["battleViewData.buffScoreRight"] = "+" + i), n > 0 && (t["battleViewData.bookScoreRight"] = "+" + n), 
                    t["battleViewData.bookTypeRight"] = s, t["battleViewData.rightComboViewAni"] = o.export();
                }
            }
            return t;
        }
    }, {
        key: "playErrEff",
        value: function(e) {
            var t = this, a = s.fastGet("fullShade");
            a.call(function() {
                var e = wx.createAnimation();
                e.backgroundColor("rgba(232,232,232,0.6)").step({
                    timingFunction: "step-start",
                    duration: 100
                }), e.backgroundColor("rgba(232,126,126,0.5)").step({
                    timingFunction: "step-start",
                    duration: 100
                }), e.backgroundColor("rgba(232,126,126,0)").step({
                    timingFunction: "linear",
                    duration: 1e3
                });
                var a = {};
                a["battleViewData.fullShadeAni"] = e.export(), t.page.setData(a);
            }), a.wait(1200), a.call(function() {
                t.page.setData({
                    "battleViewData.fullShadeVisible": !1
                });
            }), (a = s.fastGet("mainViewAni")).call(function() {
                var e = {}, a = wx.createAnimation();
                a.left("5rpx").top("-5rpx").step({
                    timingFunction: "linear",
                    duration: 50
                }), e["battleViewData.mainViewAni"] = a.export(), t.page.setData(e);
            }), a.wait(50), a.call(function() {
                var e = {}, a = wx.createAnimation();
                a.left("-5rpx").top("5rpx").step({
                    timingFunction: "linear",
                    duration: 50
                }), e["battleViewData.mainViewAni"] = a.export(), t.page.setData(e);
            }), a.wait(50), a.call(function() {
                var e = {}, a = wx.createAnimation();
                a.left("5rpx").top("-5rpx").step({
                    timingFunction: "linear",
                    duration: 50
                }), e["battleViewData.mainViewAni"] = a.export(), t.page.setData(e);
            }), a.wait(50), a.call(function() {
                var e = {}, a = wx.createAnimation();
                a.left("-5rpx").top("5rpx").step({
                    timingFunction: "linear",
                    duration: 50
                }), e["battleViewData.mainViewAni"] = a.export(), t.page.setData(e);
            }), a.wait(50), a.call(function() {
                var e = {}, a = wx.createAnimation();
                a.left("0px").top("0px").step({
                    timingFunction: "linear",
                    duration: 50
                }), e["battleViewData.mainViewAni"] = a.export(), t.page.setData(e);
            });
            var i = wx.createAnimation();
            return i.backgroundColor("#FA537F").step({
                timingFunction: "step-start",
                duration: 100
            }), i.backgroundColor("#47E5FF").step({
                timingFunction: "ease-in",
                duration: 200,
                delay: 400
            }), e["a.scoreProgressAni"] = i.export(), e["battleViewData.fullShadeVisible"] = !0, 
            e;
        }
    }, {
        key: "playAddScore",
        value: function(e, t, a) {
            var i = this, n = this.page.data[e].score, r = t - n;
            if (r > 0) {
                a[e + ".score"] = t;
                var o = wx.createAnimation();
                o.height(this.getScoreBarHeight(t)).step({
                    timingFunction: "ease-in",
                    duration: 300
                }), a[e + ".scoreProgressViewAni"] = o.export(), s.fastGet(e + "AddScore").update(function(t) {
                    var a = {};
                    a[e + ".scoreStr"] = Math.ceil(n + r * t), i.page.setData(a);
                }, 300);
            }
            return a;
        }
    }, {
        key: "playTimeAni",
        value: function(e) {
            this.page.countDownView.play(e);
        }
    }, {
        key: "stopTimeAni",
        value: function() {
            this.page.countDownView.stop();
        }
    }, {
        key: "update",
        value: function(e) {}
    }, {
        key: "end",
        value: function(e) {
            this.isEnd = !0, clearInterval(this.timeFlag);
        }
    }, {
        key: "onPlayerLogout",
        value: function() {
            this.isEnd || this.page.stateChange("StateChooseEnd");
        }
    } ]), l;
}();

module.exports = l;