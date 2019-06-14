function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var n = t[a];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, a, n) {
        return a && e(t.prototype, a), n && e(t, n), t;
    };
}(), a = require("../net/dailyChallengeNet.js"), n = require("../data/ItemsManager.js"), i = require("../util/util.js"), l = void 0, r = function() {
    function r() {
        e(this, r), this.data = void 0;
    }
    return t(r, [ {
        key: "setCD",
        value: function(e) {
            this._cd = Math.min(1e4, Math.max(0, ~~e));
        }
    }, {
        key: "getCD",
        value: function() {
            return this._cd;
        }
    }, {
        key: "round",
        set: function(e) {
            this._round = e;
        },
        get: function() {
            return ~~this._round;
        }
    } ]), t(r, [ {
        key: "init",
        value: function(e) {
            l = e;
        }
    }, {
        key: "loadData",
        value: function(e) {
            var t = this;
            this.data ? i.invokeCallback(e) : a.list(function(a, n) {
                a ? i.invokeCallback(e, a) : (t.data = n, i.invokeCallback(e));
            });
        }
    }, {
        key: "getData",
        value: function() {
            return l.mainData.role.dailyChallenge || {};
        }
    }, {
        key: "getRes",
        value: function(e) {
            return this.data && this.data.list ? this.data.list[e - 1] : {};
        }
    }, {
        key: "getResList",
        value: function() {
            return this.data && this.data.list ? this.data.list : [ {}, {}, {} ];
        }
    }, {
        key: "onLogin",
        value: function(e) {
            0 != l.mainData.role.dailyChallenge.curId ? a.findResult(l.mainData.role.dailyChallenge.curId, function(t, a) {
                if (!t) {
                    l.mainData.role.dailyChallenge.curId = 0;
                    var r = !0, u = !1, o = void 0;
                    try {
                        for (var s, c = a.items[Symbol.iterator](); !(r = (s = c.next()).done); r = !0) {
                            var d = s.value;
                            n.addItem(d.itemId, d.itemNum);
                        }
                    } catch (t) {
                        u = !0, o = t;
                    } finally {
                        try {
                            !r && c.return && c.return();
                        } finally {
                            if (u) throw o;
                        }
                    }
                }
                i.invokeCallback(e);
            }) : i.invokeCallback(e);
        }
    }, {
        key: "onHomeShow",
        value: function(e) {
            var t = this;
            try {
                var a = i.getServerTime();
                if (1e3 * l.mainData.role.dailyChallenge.flushTime < a) {
                    l.mainData.role.dailyChallenge.num = 0;
                    var n = new Date(new Date(a).toLocaleDateString()).getTime();
                    l.mainData.role.dailyChallenge.flushTime = ~~((n + 864e5) / 1e3);
                }
            } catch (e) {
                i.reportAnalytics_Try(e);
            }
            this.loadData(function() {
                t.onLogin(e);
            });
        }
    }, {
        key: "beginFight",
        value: function(e) {
            this.curId = e, this.selectIndex = {}, this.trueAnswerIndex = {}, this.revivalCount = 1, 
            this.dailyChallengeData = this.getRes(this.curId), this.quizNum = this.dailyChallengeData.quizNum, 
            l.mainData.role.dailyChallenge.num += 1;
        }
    }, {
        key: "canRevival",
        value: function() {
            return this.revivalCount > 0;
        }
    }, {
        key: "revivalCost",
        value: function() {
            return ~~this.getRes(this.curId).revivalGold;
        }
    }, {
        key: "revival",
        value: function() {
            this.revivalCount--;
        }
    }, {
        key: "isLastRound",
        value: function(e) {
            return e >= this.dailyChallengeData.quizNum;
        }
    }, {
        key: "setTrueIndex",
        value: function(e, t) {
            this.trueAnswerIndex[e] = t;
        }
    }, {
        key: "getTrueIndex",
        value: function(e) {
            return this.trueAnswerIndex[e];
        }
    }, {
        key: "setSelectIndex",
        value: function(e, t) {
            this.selectIndex[e] = t;
        }
    }, {
        key: "getSelectIndex",
        value: function(e) {
            return this.selectIndex[e];
        }
    } ]), r;
}();

module.exports = new r();