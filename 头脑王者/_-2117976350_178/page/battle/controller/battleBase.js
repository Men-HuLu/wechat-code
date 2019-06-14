function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
    };
}(), n = require("../../../util/util.js"), i = getApp(), o = function() {
    function o() {
        e(this, o), this.type = "", this.title = "对战", this.roundMax = 5, this.hasDoubleScore = !1;
    }
    return t(o, [ {
        key: "onLoad",
        value: function(e) {
            this.registerConnectNotify(), this.registerEvent(), n.setNavigationBarTitle(this.title);
        }
    }, {
        key: "onShow",
        value: function() {}
    }, {
        key: "onHide",
        value: function() {}
    }, {
        key: "onUnload",
        value: function() {
            this.removeConnectNotify(), this.removeEvent();
        }
    }, {
        key: "onShareAppMessage",
        value: function() {}
    }, {
        key: "setMatchPage",
        value: function(e) {
            this.matchPage = e;
        }
    }, {
        key: "setBattlePage",
        value: function(e) {
            this.battlePage = e;
        }
    }, {
        key: "setResultPage",
        value: function(e) {
            this.resultPage = e;
        }
    }, {
        key: "enter",
        value: function() {}
    }, {
        key: "registerConnectNotify",
        value: function() {}
    }, {
        key: "removeConnectNotify",
        value: function() {}
    }, {
        key: "registerEvent",
        value: function() {
            i.eventDispatcher.addEventListener("onLogin", this.onLogin, this);
        }
    }, {
        key: "removeEvent",
        value: function() {
            i.eventDispatcher.removeEventListener("onLogin", this.onLogin, this);
        }
    }, {
        key: "onLogin",
        value: function() {
            this.reLogin = !0;
        }
    }, {
        key: "onTapChooseBtn",
        value: function(e) {}
    }, {
        key: "getTrueIndex",
        value: function(e) {
            return this.trueAnswerIndex[e];
        }
    }, {
        key: "setTrueIndex",
        value: function(e, t) {
            this.trueAnswerIndex[e] = t;
        }
    } ]), o;
}();

module.exports = o;