function e(e, a) {
    if (!(e instanceof a)) throw new TypeError("Cannot call a class as a function");
}

var a = function() {
    function e(e, a) {
        for (var t = 0; t < a.length; t++) {
            var n = a[t];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(a, t, n) {
        return t && e(a.prototype, t), n && e(a, n), a;
    };
}(), t = (require("./../../../const/consts.js"), require("./../../../util/Tween.js")), n = (require("./../../../util/PVERoomDataManager.js"), 
function() {
    function n(a) {
        e(this, n), this.page = a, this.name = "StateChooseEnd";
    }
    return a(n, [ {
        key: "init",
        value: function() {
            this.round = this.page.round, this.page.answerBtnLock = !0, this.playAni();
        }
    }, {
        key: "playAni",
        value: function() {
            var e = this, a = t.fastGet("StateEndAni");
            a.call(function() {
                for (var a = {}, t = 0; t < 4; t++) {
                    var n = "battleViewData.answer[" + t + "]", i = t == e.page.getTrueIndex(e.round), r = !1, o = !1;
                    if (i && (a[n + ".className"] = i ? "true" : "", r = !0, o = !0), t == e.page.selectIndex[e.round].a && (a[n + ".lImg"] = i ? 2 : 1, 
                    a[n + ".className"] = i ? "true" : "false", r = !0, o = "ob" == e.page.type || "obChallenge" == e.page.type), 
                    t == e.page.selectIndex[e.round].b && (a[n + ".rImg"] = i ? 2 : 1, a[n + ".className"] = i ? "true" : "false", 
                    r = !0, o = t != e.page.selectIndex[e.round].a), r) {
                        if (o) {
                            var s = wx.createAnimation();
                            s.scale(1.1).step({
                                timingFunction: "ease-in",
                                duration: 150
                            }), s.scale(1).step({
                                timingFunction: "linear",
                                duration: 50
                            }), a[n + ".ani"] = s;
                        }
                    } else {
                        var u = wx.createAnimation();
                        u.scale(0).step({
                            timingFunction: "ease-in",
                            duration: 200
                        }), a[n + ".ani"] = u;
                    }
                }
                a.fullShadeVisible = !1, a["battleViewData.contributor"] = "", a["battleViewData.contributorZhihu"] = !1, 
                a["battleViewData.partner"] = 0, e.page.setData(a);
            }), a.wait(2500), a.call(function() {
                for (var a = {}, t = 0; t < 4; t++) {
                    var n = wx.createAnimation();
                    n.scale(0).step({
                        timingFunction: "ease-in",
                        duration: 300
                    }), a["battleViewData.answer[" + t + "].ani"] = n.export();
                }
                var i = wx.createAnimation();
                i.opacity(0).step({
                    duration: 300
                }), a["battleViewData.questionViewAni"] = i.export(), e.page.setData(a);
            }), a.wait(700), a.call(function() {
                e.isEnd || (e.page.playerLogout || e.round >= e.page.roundMax ? (e.page.line2 = e.page.isLine2(), 
                e.page.line3 = e.page.isLine3(), e.page.stateChange("StateResult")) : e.page.stateChange("StateBegin"));
            });
        }
    }, {
        key: "update",
        value: function(e) {}
    }, {
        key: "end",
        value: function(e) {
            this.isEnd = !0;
        }
    } ]), n;
}());

module.exports = n;