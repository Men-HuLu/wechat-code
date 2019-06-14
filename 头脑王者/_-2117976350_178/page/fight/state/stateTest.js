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
}(), i = (require("./../../../util/util.js"), require("./../../../net/fightNet.js"), 
require("./../../../util/Tween.js")), a = (require("./../../../util/LoginManager.js"), 
getApp()), n = function() {
    function n(e) {
        t(this, n), this.page = e, this.name = "StateTest";
    }
    return e(n, [ {
        key: "init",
        value: function() {
            var t = this;
            this.page.type = "pve";
            getApp();
            var e = {};
            e["matchViewData.visible"] = !1, e["battleViewData.visible"] = !0, e["resultViewData.visible"] = !1, 
            e["matchViewData.vsViewVisible"] = !1, e["matchViewData.aViewVisible"] = !1, e["matchViewData.bViewVisible"] = !1, 
            e["levelUpViewData.visible"] = !1, this.page.setData(e), this.playInit(), setTimeout(function() {
                t.playAni({
                    baseGold: 1e3,
                    baseExp: 2e3,
                    extraGold: {
                        3: 300,
                        4: 400
                    },
                    extraExp: {
                        1: 100,
                        2: 200
                    },
                    isWin: 2
                });
            }, 1e3);
        }
    }, {
        key: "playAni",
        value: function(t) {
            var e = this, n = {};
            n["resultViewData.funcBtnLabel"] = "继续挑战", n["resultViewData.shareBtnVisible"] = !0, 
            n.testResultBtnVisible = !1, t.itemInfo && t.itemInfo.itemId > 0 && t.itemInfo.itemNum > 0 && (n["resultViewData.rewardItem.id"] = t.itemInfo.itemId, 
            n["resultViewData.rewardItem.num"] = t.itemInfo.itemNum, n["resultViewData.rewardItem.visible"] = !0), 
            n["resultViewData.showKnowBtn"] = !0, n["resultViewData.isWin"] = t.isWin, n["resultViewData.shareText"] = a.getShareRewardText(), 
            n["resultViewData.hasShareReward"] = !!a.getShareRewardText(), n["resultViewData.visible"] = !0, 
            2 == t.isWin && (n["resultViewData.rowWinNumRight"] = this.page.data.b.userInfo.rowWinNum + 1), 
            this.page.setData(n);
            var r = i.fastGet("stateResult"), s = 0;
            s = this.playMainOut(r, t), r.wait(s), s = this.playScoreIn(r, t), r.wait(s + 200), 
            s = this.playTitleIn(r, t), r.wait(s), s = this.playAddIn(r, t), r.wait(s), s = this.playBtnIn(r, t), 
            r.wait(s), this.isLevelUp && r.call(function() {
                e.showLevelUpView();
            });
        }
    }, {
        key: "playInit",
        value: function() {
            var t = wx.createAnimation();
            t.width("0px").step({
                timingFunction: "step-start",
                duration: 0
            });
            var e = wx.createAnimation();
            e.width("0px").step({
                timingFunction: "step-start",
                duration: 0
            });
            var i = wx.createAnimation();
            i.scale(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var a = wx.createAnimation();
            a.scale(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var n = wx.createAnimation();
            n.scale(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var r = wx.createAnimation();
            r.scale(0).opacity(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var s = wx.createAnimation();
            s.left("-200rpx").step({
                timingFunction: "step-start",
                duration: 0
            });
            var o = wx.createAnimation();
            o.right("-200rpx").step({
                timingFunction: "step-start",
                duration: 0
            });
            var u = wx.createAnimation();
            u.left("-300rpx").step({
                timingFunction: "step-start",
                duration: 0
            });
            var c = wx.createAnimation();
            c.right("-300rpx").step({
                timingFunction: "step-start",
                duration: 0
            });
            var p = wx.createAnimation();
            p.left("-750rpx").step({
                timingFunction: "step-start",
                duration: 0
            });
            var l = wx.createAnimation();
            l.left("-750rpx").step({
                timingFunction: "step-start",
                duration: 0
            });
            var w = wx.createAnimation();
            w.left("-750rpx").step({
                timingFunction: "step-start",
                duration: 0
            });
            var m = wx.createAnimation();
            m.scaleX(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var d = wx.createAnimation();
            d.scaleX(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var x = wx.createAnimation();
            x.scale(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var g = wx.createAnimation();
            g.scale(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var A = wx.createAnimation();
            A.opacity(0).scale(5).step({
                timingFunction: "step-start",
                duration: 0
            });
            var v = wx.createAnimation();
            v.scale(0).opacity(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var V = wx.createAnimation();
            V.scale(0).opacity(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var D = wx.createAnimation();
            D.scale(0).opacity(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var f = wx.createAnimation();
            f.scale(0).opacity(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var h = wx.createAnimation();
            h.bottom("-200rpx").step({
                timingFunction: "step-start",
                duration: 0
            });
            var F = {};
            F["resultViewData.scoreViewLeftAni"] = t.export(), F["resultViewData.scoreViewRightAni"] = e.export(), 
            F["resultViewData.scoreTextViewLeftAni"] = i.export(), F["resultViewData.scoreTextViewRightAni"] = a.export(), 
            F["resultViewData.titleAni"] = n.export(), F["resultViewData.criticalAni"] = r.export(), 
            F["resultViewData.comboLeftAni"] = s.export(), F["resultViewData.comboRightAni"] = o.export(), 
            F["resultViewData.wwLeftAni"] = u.export(), F["resultViewData.wwRightAni"] = c.export(), 
            F["resultViewData.goldViewAni"] = p.export(), F["resultViewData.expViewAni"] = l.export(), 
            F["resultViewData.rewardViewAni"] = w.export(), F["resultViewData.goldLineAni"] = m.export(), 
            F["resultViewData.expLineAni"] = d.export(), F["resultViewData.funcBntAni"] = x.export(), 
            F["resultViewData.shareBtnAni"] = g.export(), F["resultViewData.shareDescAni"] = A.export(), 
            F["resultViewData.buff1Ani"] = v.export(), F["resultViewData.buff2Ani"] = V.export(), 
            F["resultViewData.buff3Ani"] = D.export(), F["resultViewData.buff4Ani"] = f.export(), 
            F["resultViewData.reportImgAni"] = h.export(), this.page.setData(F);
        }
    }, {
        key: "playMainOut",
        value: function(t, e) {
            var i = this;
            return t.call(function() {
                var t = {}, e = wx.createAnimation();
                e.scale(0).step({
                    timingFunction: "ease-in",
                    duration: 100
                });
                var a = wx.createAnimation();
                a.left("-200rpx").step({
                    timingFunction: "ease-in",
                    duration: 200
                });
                var n = wx.createAnimation();
                n.right("-200rpx").step({
                    timingFunction: "ease-in",
                    duration: 200
                });
                for (var r = 0; r < 4; r++) {
                    var s = wx.createAnimation();
                    s.scale(0).step({
                        timingFunction: "step-start",
                        duration: 0
                    }), t["battleViewData.answer[" + r + "].ani"] = s.export();
                }
                var o = wx.createAnimation();
                o.opacity(0).step({
                    timingFunction: "step-start",
                    duration: 0
                }), t["battleViewData.questionViewAni"] = o.export(), t["battleViewData.timeViewAni"] = e.export(), 
                t["battleViewData.leftScoreViewAni"] = a.export(), t["battleViewData.rightScoreViewAni"] = n.export(), 
                i.page.setData(t);
            }), 200;
        }
    }, {
        key: "playScoreIn",
        value: function(t, e) {
            var a = this;
            return t.call(function() {
                var t = wx.createAnimation(), n = wx.createAnimation();
                switch (t.width("50%").step({
                    timingFunction: "ease-in",
                    duration: 100
                }), n.width("50%").step({
                    timingFunction: "ease-in",
                    duration: 100
                }), e.isWin) {
                  case 0:
                    t.width("40%").step({
                        timingFunction: "ease-in",
                        duration: 250,
                        delay: 200
                    }), n.width("40%").step({
                        timingFunction: "ease-in",
                        duration: 250,
                        delay: 200
                    });
                    break;

                  case 1:
                    t.width("60%").step({
                        timingFunction: "ease-in",
                        duration: 250,
                        delay: 200
                    }), n.width("40%").step({
                        timingFunction: "ease-in",
                        duration: 250,
                        delay: 200
                    });
                    break;

                  case 2:
                    t.width("40%").step({
                        timingFunction: "ease-in",
                        duration: 250,
                        delay: 200
                    }), n.width("60%").step({
                        timingFunction: "ease-in",
                        duration: 250,
                        delay: 200
                    });
                }
                var r = wx.createAnimation();
                r.scale(1.2).step({
                    timingFunction: "ease-in",
                    duration: 150
                }), r.scale(1).step({
                    timingFunction: "ease-out",
                    duration: 50
                });
                var s = wx.createAnimation();
                s.scale(1.2).step({
                    timingFunction: "ease-in",
                    duration: 150
                }), s.scale(1).step({
                    timingFunction: "ease-out",
                    duration: 50
                });
                var o = wx.createAnimation();
                o.left("-2rpx").step({
                    timingFunction: "ease-in",
                    duration: 200,
                    delay: 500
                }), o.left("-10rpx").step({
                    timingFunction: "ease-out",
                    duration: 100
                });
                var u = wx.createAnimation();
                u.right("-2rpx").step({
                    timingFunction: "ease-in",
                    duration: 200,
                    delay: 500
                }), u.right("-10rpx").step({
                    timingFunction: "ease-out",
                    duration: 100
                });
                var c = wx.createAnimation();
                c.left("-2rpx").step({
                    timingFunction: "ease-in",
                    duration: 200,
                    delay: 650
                }), c.left("-10rpx").step({
                    timingFunction: "ease-out",
                    duration: 100
                });
                var p = wx.createAnimation();
                p.right("-2rpx").step({
                    timingFunction: "ease-in",
                    duration: 200,
                    delay: 650
                }), p.right("-10rpx").step({
                    timingFunction: "ease-out",
                    duration: 100
                });
                var l = {};
                l["resultViewData.scoreViewLeftAni"] = t.export(), l["resultViewData.scoreViewRightAni"] = n.export(), 
                l["resultViewData.scoreTextViewLeftAni"] = r.export(), l["resultViewData.scoreTextViewRightAni"] = s.export(), 
                l["resultViewData.comboLeftAni"] = o.export(), l["resultViewData.comboRightAni"] = u.export(), 
                l["resultViewData.wwLeftAni"] = c.export(), l["resultViewData.wwRightAni"] = p.export(), 
                a.page.setData(l);
                var w = e.score, m = e.rivalScore, d = i.fastGet("scoreText", !0);
                d.wait(110), d.update(function(t) {
                    var e = {};
                    e["resultViewData.scoreLeft"] = Math.ceil(w * t), e["resultViewData.scoreRight"] = Math.ceil(m * t), 
                    a.page.setData(e);
                }, 550);
            }), 750;
        }
    }, {
        key: "playTitleIn",
        value: function(t, e) {
            var i = this;
            return t.call(function() {
                var t = wx.createAnimation();
                t.scale(1.5).step({
                    timingFunction: "ease-in",
                    duration: 250
                }), t.scale(1).step({
                    timingFunction: "ease-out",
                    duration: 50
                });
                var e = wx.createAnimation();
                e.scale(5).opacity(0).step({
                    timingFunction: "step-start",
                    duration: 500
                }), e.scale(.8).opacity(1).step({
                    timingFunction: "ease-in",
                    duration: 200
                }), e.scale(1).opacity(1).step({
                    timingFunction: "ease-out",
                    duration: 100
                });
                var a = {};
                a["resultViewData.titleAni"] = t.export(), a["resultViewData.criticalAni"] = e.export(), 
                i.page.setData(a);
            }), 650;
        }
    }, {
        key: "playAddIn",
        value: function(t, e) {
            var i = this, a = e.baseGold, n = e.baseExp, r = 0, s = 0, o = 0;
            return t.call(function() {
                var t = wx.createAnimation();
                t.scale(0, 1).step({
                    timingFunction: "step-start",
                    duration: 50
                }), t.scale(.2, 1).step({
                    timingFunction: "linear",
                    duration: 100
                }), t.scale(1.5, 1).step({
                    timingFunction: "ease-in",
                    duration: 100,
                    delay: 50
                }), t.scale(1).step({
                    timingFunction: "ease-out",
                    duration: 100
                });
                var e = wx.createAnimation();
                e.scale(0, 1).step({
                    timingFunction: "step-start",
                    duration: 50
                }), e.scale(.2, 1).step({
                    timingFunction: "linear",
                    duration: 100
                }), e.scale(1.5, 1).step({
                    timingFunction: "ease-in",
                    duration: 100,
                    delay: 50
                }), e.scale(1).step({
                    timingFunction: "ease-out",
                    duration: 100
                });
                var a = {};
                a["resultViewData.goldLineAni"] = t.export(), a["resultViewData.expLineAni"] = e.export(), 
                i.page.setData(a);
            }), t.wait(400), t.call(function() {
                var t = wx.createAnimation();
                t.left("302rpx").step({
                    timingFunction: "ease-in-out",
                    duration: 200
                });
                var e = wx.createAnimation();
                e.left("302rpx").step({
                    timingFunction: "ease-in-out",
                    duration: 200,
                    delay: 100
                });
                var a = {};
                a["resultViewData.goldViewAni"] = t.export(), a["resultViewData.expViewAni"] = e.export(), 
                i.page.setData(a);
            }), t.wait(500), t.update(function(t) {
                var e = {};
                e["resultViewData.addGold"] = (a >= 0 ? "+" : "") + Math.ceil(a * t), i.page.setData(e);
            }, 500), t.update(function(t) {
                var e = {};
                e["resultViewData.addExp"] = (n >= 0 ? "+" : "") + Math.ceil(n * t), i.page.setData(e);
            }, 500), "pve" == this.page.type && e.extraGold && (e.extraGold.hasOwnProperty("3") && (o = ~~e.extraGold[3], 
            t.call(function() {
                var t = wx.createAnimation();
                t.scale(1).opacity(1).step({
                    timingFunction: "ease-in",
                    duration: 100
                }), t.scale(5).opacity(0).step({
                    timingFunction: "ease-out",
                    duration: 200,
                    delay: 500
                });
                var e = {};
                e["resultViewData.buff3Ani"] = t.export(), i.page.setData(e);
            }), t.wait(1e3), t.update(function(t) {
                var e = {};
                e["resultViewData.addGold"] = (a >= 0 ? "+" : "") + (a + Math.ceil(o * t)), i.page.setData(e);
            }, 500), t.wait(500)), e.extraGold.hasOwnProperty("4") && (~~e.extraGold[4], t.call(function() {
                var t = wx.createAnimation();
                t.scale(1).opacity(1).step({
                    timingFunction: "ease-in",
                    duration: 200
                }), t.scale(5).opacity(0).step({
                    timingFunction: "ease-out",
                    duration: 200,
                    delay: 500
                });
                var e = {};
                e["resultViewData.buff4Ani"] = t.export(), i.page.setData(e);
            }), t.wait(1e3), t.update(function(t) {
                var e = {};
                e["resultViewData.addGold"] = (a >= 0 ? "+" : "") + (a + o + Math.ceil(o * t)), 
                i.page.setData(e);
            }, 500))), "pve" == this.page.type && e.extraExp && (e.extraExp.hasOwnProperty("1") && (r = e.extraExp[1], 
            t.call(function() {
                var t = wx.createAnimation();
                t.scale(1).opacity(1).step({
                    timingFunction: "ease-in",
                    duration: 100
                }), t.scale(5).opacity(0).step({
                    timingFunction: "ease-out",
                    duration: 200,
                    delay: 500
                });
                var e = {};
                e["resultViewData.buff1Ani"] = t.export(), i.page.setData(e);
            }), t.wait(1e3), t.update(function(t) {
                var e = {};
                e["resultViewData.addExp"] = (n >= 0 ? "+" : "") + (n + Math.ceil(r * t)), i.page.setData(e);
            }, 500)), e.extraExp.hasOwnProperty("2") && (s = e.extraExp[2], t.call(function() {
                var t = wx.createAnimation();
                t.scale(1).opacity(1).step({
                    timingFunction: "ease-in",
                    duration: 100
                }), t.scale(5).opacity(0).step({
                    timingFunction: "ease-out",
                    duration: 200,
                    delay: 500
                });
                var e = {};
                e["resultViewData.buff2Ani"] = t.export(), i.page.setData(e);
            }), t.wait(1e3), t.update(function(t) {
                var e = {};
                e["resultViewData.addExp"] = (n >= 0 ? "+" : "") + (n + r + Math.ceil(s * t)), i.page.setData(e);
            }, 500))), t.wait(100), t.call(function() {
                var t = wx.createAnimation();
                t.left("0px").step({
                    timingFunction: "ease-in-out",
                    duration: 200
                });
                var e = wx.createAnimation();
                e.scale(1.5).step({
                    timingFunction: "ease-in",
                    duration: 150,
                    delay: 200
                }), e.scale(1).step({
                    timingFunction: "ease-out",
                    duration: 100
                });
                var a = {};
                a["resultViewData.rewardViewAni"] = t.export(), a["resultViewData.rewardItemAni"] = e.export(), 
                i.page.setData(a);
            }), t.wait(450), 100;
        }
    }, {
        key: "playBtnIn",
        value: function(t) {
            var e = this;
            return t.call(function() {
                var t = wx.createAnimation();
                t.scale(1.2).step({
                    timingFunction: "ease-in",
                    duration: 200
                }), t.scale(1).step({
                    timingFunction: "ease-out",
                    duration: 100
                });
                var i = wx.createAnimation();
                i.scale(1.2).step({
                    timingFunction: "ease-in",
                    duration: 200,
                    delay: 200
                }), i.scale(1).step({
                    timingFunction: "ease-out",
                    duration: 100
                });
                var a = wx.createAnimation();
                a.opacity(1).scale(.8).step({
                    timingFunction: "ease-in",
                    duration: 200,
                    delay: 400
                }), a.scale(1).step({
                    timingFunction: "ease-out",
                    duration: 100
                });
                var n = wx.createAnimation();
                n.bottom("10px").step({
                    timingFunction: "ease-in",
                    duration: 300,
                    delay: 600
                });
                var r = {};
                r["resultViewData.funcBntAni"] = t.export(), r["resultViewData.shareBtnAni"] = i.export(), 
                r["resultViewData.shareDescAni"] = a.export(), r["resultViewData.reportImgAni"] = n.export(), 
                e.page.setData(r);
            }), 1e3;
        }
    }, {
        key: "update",
        value: function(t) {}
    }, {
        key: "end",
        value: function(t) {}
    } ]), n;
}();

module.exports = n;