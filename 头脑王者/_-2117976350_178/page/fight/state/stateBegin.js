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
}(), a = require("./../../../util/util.js"), i = (require("./../../../const/consts.js"), 
require("./../../../net/fightNet.js")), n = require("./../../../util/Tween.js"), r = require("./../../../util/ChallengeRoomDataManager.js"), o = (require("./../../../data/SpecialData.js"), 
getApp()), s = function() {
    function s(e) {
        t(this, s), this.page = e, this.name = "StateBegin";
    }
    return e(s, [ {
        key: "init",
        value: function() {
            var t = this.page.roomId;
            this.page.audioFalseCtx && this.page.audioFalseCtx.seek(0), this.page.audioTrueCtx && this.page.audioTrueCtx.seek(0), 
            this.page.audioTapCtx && this.page.audioTapCtx.seek(0), this.findQuiz(t, this.page.round + 1);
        }
    }, {
        key: "playAni",
        value: function() {
            var t = this;
            this.page.countDownView.setVisible(!0), this.page.countDownView.reset();
            var e = n.fastGet("StateBeginAni");
            if (this.page.data.battleViewData.isFirstShow) {
                this.page.data.battleViewData.isFirstShow = !1;
                var a = 0;
                a = this.playFirstIn(e), e.wait(a), a = this.playTitleInOut(e), e.wait(a), a = this.playScoreIn(e), 
                e.wait(a), a = this.playTimeViewIn(e), e.wait(a), a = this.playQuestionIn(e), e.wait(a), 
                a = this.playBtnIn(e), e.wait(a);
            } else {
                var i = 0;
                e.wait(i), i = this.playTitleInOut(e), e.wait(i), i = this.playQuestionIn(e), e.wait(i), 
                i = this.playBtnIn(e), e.wait(i);
            }
            e.call(function() {
                t.isEnd || t.page.stateChange("StateChoose");
            });
        }
    }, {
        key: "getCountDown",
        value: function(t) {
            var e = Math.ceil((1e3 * t - a.getServerTime()) / 1e3);
            return e = Math.max(0, e);
        }
    }, {
        key: "findQuiz",
        value: function(t, e) {
            var n = this;
            if ("challenge" != this.page.type && "obChallenge" != this.page.type || !r.isChallengeStatusReady()) {
                "challenge" != this.page.type && "obChallenge" != this.page.type || this.page.audienceViewController && this.page.audienceViewController.clear(), 
                this.page.cfTime = -1;
                var s = a.getServerTime();
                i.findQuiz(t, e, function(t, e) {
                    if (!n.isEnd) if (t) o.exitGame(t.errCode, t.errMsg); else {
                        n.page.cfTime = a.getServerTime() - s;
                        var i = e;
                        if (e.encryptedData && (i = o.aesDecrypt(e.encryptedData)), !i) return console.error("findQuiz解码失败"), 
                        void n.page.stateChange("StateResult");
                        a.setServerTime(i.curTime);
                        var r = n.getCountDown(i.endTime);
                        n.setData(i, r), n.page.num = i.num, 0 == r && i.num >= n.page.roundMax && n.page.stateChange("StateChooseEnd");
                    }
                });
            } else 0 == this.page.roomId ? wx.navigateBack({
                delta: 1
            }) : this.page.stateChange("StateResult");
        }
    }, {
        key: "setData",
        value: function(t, e) {
            this.page.round = t.num, this.page.answerBtnLock = !0, this.page.endTime = t.endTime;
            var i = !1;
            e > 4 && (i = !0, e -= 4, e = Math.min(10, e)), this.doubleLabelVisible = this.page.hasDouble && t.num >= this.page.roundMax;
            var n = "第 " + t.num + " 题";
            t.num >= this.page.roundMax && (n = "最后一题", this.lastRound = !0), this.countDown = e;
            var r = e, o = !1, s = 0, p = "";
            t.contributor ? "知乎" == t.contributor ? o = !0 : p = "本题目由" + a.formatName(t.contributor, 10) + "贡献" : t.partner > 0 && (s = t.partner);
            var u = [];
            u.push(t.imageId ? a.getTextScale(t.options[0], 40, 334) : a.getTextScale(t.options[0], 28, 224)), 
            u.push(t.imageId ? a.getTextScale(t.options[1], 40, 334) : a.getTextScale(t.options[1], 28, 224)), 
            u.push(t.imageId ? a.getTextScale(t.options[2], 40, 334) : a.getTextScale(t.options[2], 28, 224)), 
            u.push(t.imageId ? a.getTextScale(t.options[3], 40, 334) : a.getTextScale(t.options[3], 28, 224));
            var c = {};
            c["battleViewData.visible"] = !0, c["battleViewData.roundText"] = n, c["battleViewData.countDown"] = this.countDown, 
            c["battleViewData.countDownStr"] = r, c["battleViewData.contributor"] = p, c["battleViewData.contributorZhihu"] = o, 
            c["battleViewData.partner"] = s, c["battleViewData.typeID"] = t.typeID, c["battleViewData.questionTypeName"] = t.type, 
            c["battleViewData.question"] = t.quiz, c["battleViewData.imageId"] = t.imageId || "", 
            c["battleViewData.answer"] = [ {
                index: 0,
                answer: t.options[0],
                formMode: 1 == t.num,
                className: "",
                lImg: 0,
                rImg: 0,
                scale: u[0]
            }, {
                index: 1,
                answer: t.options[1],
                formMode: 1 == t.num,
                className: "",
                lImg: 0,
                rImg: 0,
                scale: u[1]
            }, {
                index: 2,
                answer: t.options[2],
                formMode: 1 == t.num,
                className: "",
                lImg: 0,
                rImg: 0,
                scale: u[2]
            }, {
                index: 3,
                answer: t.options[3],
                formMode: 1 == t.num,
                className: "",
                lImg: 0,
                rImg: 0,
                scale: u[3]
            } ], this.page.setData(c), i ? this.playAni() : (this.playNoAni(), this.isEnd || this.page.stateChange("StateChoose"));
        }
    }, {
        key: "playFirstIn",
        value: function(t) {
            var e = this;
            return t.call(function() {
                var t = {}, a = wx.createAnimation();
                a.left("17rpx").step({
                    timingFunction: "cubic-bezier(.91,.11,.56,1.28)",
                    duration: 400
                }), t["a.avatarAni"] = a.export();
                var i = wx.createAnimation();
                i.right("17rpx").step({
                    timingFunction: "cubic-bezier(.91,.11,.56,1.28)",
                    duration: 400
                }), t["b.avatarAni"] = i.export();
                var n = wx.createAnimation();
                n.width("340rpx").step({
                    timingFunction: "ease-in",
                    duration: 200,
                    delay: 500
                }), t["a.avatarBgAni"] = n.export();
                var r = wx.createAnimation();
                r.width("340rpx").step({
                    timingFunction: "ease-in",
                    duration: 200,
                    delay: 500
                }), t["b.avatarBgAni"] = r.export();
                var o = wx.createAnimation();
                o.scale(1).step({
                    timingFunction: "cubic-bezier(.91,.11,.56,1.28)",
                    duration: 300,
                    delay: 500
                }), t["a.scoreAni"] = o.export();
                var s = wx.createAnimation();
                s.scale(1).step({
                    timingFunction: "cubic-bezier(.91,.11,.56,1.28)",
                    duration: 300,
                    delay: 500
                }), t["b.scoreAni"] = s.export();
                var p = wx.createAnimation();
                p.scale(1).step({
                    timingFunction: "cubic-bezier(.91,.11,.56,1.28)",
                    duration: 300,
                    delay: 500
                }), t["a.avatarNameAni"] = p.export();
                var u = wx.createAnimation();
                u.scale(1).step({
                    timingFunction: "cubic-bezier(.91,.11,.56,1.28)",
                    duration: 300,
                    delay: 500
                }), t["b.avatarNameAni"] = u.export(), t["battleViewData.timeVisible"] = !0, e.page.setData(t);
            }), 200;
        }
    }, {
        key: "playTitleInOut",
        value: function(t) {
            var e = this;
            return t.call(function() {
                "ob" != e.page.type && e.page.emojiSelectController.setVisible(!0);
                var t = wx.createAnimation();
                t.opacity(1).top("197rpx").step({
                    timingFunction: "ease-in",
                    duration: 200,
                    delay: 0
                }), t.opacity(0).top("230rpx").step({
                    timingFunction: "ease-in",
                    duration: 300,
                    delay: 1200
                });
                var a = wx.createAnimation();
                a.scale(1.3).opacity(1).step({
                    timingFunction: "ease-in",
                    duration: 300
                }), a.scale(1).opacity(1).step({
                    timingFunction: "linear",
                    duration: 100
                }), 0 == e.page.round || e.lastRound ? (a.scale(10).opacity(0).step({
                    timingFunction: "ease-in",
                    duration: 200,
                    delay: 1100
                }), a.scale(0).step({
                    timingFunction: "step-start",
                    duration: 0
                })) : a.scale(0).opacity(0).step({
                    timingFunction: "ease-in",
                    duration: 200,
                    delay: 1100
                });
                var i = {};
                if (e.lastRound) {
                    var n = wx.createAnimation();
                    n.opacity(1).step({
                        timingFunction: "ease-in",
                        duration: 200,
                        delay: 300
                    }), n.opacity(0).step({
                        timingFunction: "ease-in",
                        duration: 500,
                        delay: 700
                    }), i["battleViewData.doubleAni"] = n.export();
                }
                i["battleViewData.titleViewAni"] = t.export(), i["battleViewData.roundAni"] = a.export(), 
                e.page.setData(i);
            }), 2200;
        }
    }, {
        key: "playTimeViewIn",
        value: function(t) {
            return 0;
        }
    }, {
        key: "playScoreIn",
        value: function(t) {
            var e = this;
            return t.call(function() {
                var t = wx.createAnimation();
                t.left("10rpx").step({
                    timingFunction: "ease-in",
                    duration: 200,
                    delay: 150
                });
                var a = wx.createAnimation();
                a.right("10rpx").step({
                    timingFunction: "ease-in",
                    duration: 200,
                    delay: 150
                });
                var i = {};
                i["battleViewData.leftScoreViewAni"] = t.export(), i["battleViewData.rightScoreViewAni"] = a.export(), 
                e.page.setData(i);
            }), 0;
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
                var a = wx.createAnimation();
                a.opacity(0).top(" -100rpx").step({
                    duration: 50
                });
                var i = {};
                i["battleViewData.questionViewAni"] = t.export(), i["battleViewData.titleViewAni"] = a.export(), 
                e.page.setData(i);
            }), 1500;
        }
    }, {
        key: "playBtnIn",
        value: function(t) {
            var e = this;
            return t.call(function() {
                for (var t = {}, a = 0; a < 4; a++) {
                    var i = "battleViewData.answer[" + a + "].ani", n = wx.createAnimation();
                    n.opacity(1).scale(1.1).step({
                        timingFunction: "ease-in",
                        duration: 200
                    }), n.scale(1).step({
                        timingFunction: "linear",
                        duration: 100
                    }), t[i] = n.export();
                }
                e.page.setData(t);
            }), 300;
        }
    }, {
        key: "playNoAni",
        value: function() {
            this.page.countDownView.setVisible(!0), this.page.countDownView.reset(), "ob" != this.page.type && this.page.emojiSelectController.setVisible(!0);
            var t = wx.createAnimation();
            t.opacity(0).top("230rpx").step({
                timingFunction: "step-start",
                duration: 0,
                delay: 0
            });
            var e = wx.createAnimation();
            e.scale(0).opacity(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var a = Math.max(0, this.countDown - 5), i = Math.max(0, this.countDown - a), n = a >= 5 ? 0 : 180 * (5 - a) / 5, r = i >= 5 ? 0 : 180 * (5 - i) / 5, o = wx.createAnimation();
            o.rotateZ(n).step({
                timingFunction: "step-start",
                duration: 0,
                delay: 0,
                transformOrigin: "0% 50%"
            });
            var s = wx.createAnimation();
            s.rotateZ(r).step({
                timingFunction: "step-start",
                duration: 0,
                delay: 0,
                transformOrigin: "100% 50%"
            });
            var p = {};
            if (this.lastRound) {
                var u = wx.createAnimation();
                u.opacity(0).step({
                    timingFunction: "step-start",
                    duration: 0,
                    delay: 0
                }), p["battleViewData.doubleAni"] = u.export();
            }
            p["battleViewData.ovalViewRight"] = o.export(), p["battleViewData.ovalViewLeft"] = s.export(), 
            p["battleViewData.titleViewAni"] = t.export(), p["battleViewData.roundAni"] = e.export();
            var c = wx.createAnimation();
            c.opacity(1).step({
                timingFunction: "step-start",
                duration: 0
            }), p["battleViewData.questionViewAni"] = c.export();
            for (var l = 0; l < 4; l++) {
                var g = "battleViewData.answer[" + l + "].ani", m = wx.createAnimation();
                m.opacity(1).scale(1.1).step({
                    timingFunction: "step-start",
                    duration: 0
                }), m.scale(1).step({
                    timingFunction: "step-start",
                    duration: 0
                }), p[g] = m.export();
            }
            var d = wx.createAnimation();
            d.left("17rpx").step({
                timingFunction: "step-start",
                duration: 0
            }), p["a.avatarAni"] = d.export();
            var w = wx.createAnimation();
            w.right("17rpx").step({
                timingFunction: "step-start",
                duration: 0
            }), p["b.avatarAni"] = w.export();
            var h = wx.createAnimation();
            h.width("340rpx").step({
                timingFunction: "step-start",
                duration: 0
            }), p["a.avatarBgAni"] = h.export();
            var x = wx.createAnimation();
            x.width("340rpx").step({
                timingFunction: "step-start",
                duration: 0
            }), p["b.avatarBgAni"] = x.export();
            var v = wx.createAnimation();
            v.scale(1).step({
                timingFunction: "step-start",
                duration: 0
            }), p["a.scoreAni"] = v.export();
            var y = wx.createAnimation();
            y.scale(1).step({
                timingFunction: "step-start",
                duration: 0
            }), p["b.scoreAni"] = y.export();
            var b = wx.createAnimation();
            b.scale(1).step({
                timingFunction: "step-start",
                duration: 0
            }), p["a.avatarNameAni"] = b.export();
            var A = wx.createAnimation();
            A.scale(1).step({
                timingFunction: "step-start",
                duration: 0
            }), p["b.avatarNameAni"] = A.export(), p["battleViewData.timeVisible"] = !0, this.page.setData(p);
        }
    }, {
        key: "update",
        value: function(t) {}
    }, {
        key: "end",
        value: function(t) {
            this.isEnd = !0, n.removeTweens("StateBeginAni");
        }
    } ]), s;
}();

module.exports = s;