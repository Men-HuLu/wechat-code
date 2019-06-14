function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var a = e[n];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(t, a.key, a);
        }
    }
    return function(e, n, a) {
        return n && t(e.prototype, n), a && t(e, a), e;
    };
}(), n = require("./../../const/notifyConsts.js"), a = require("./../../net/connectNotify.js"), i = require("./../../util/daliyTask/DailyTaskData.js"), o = void 0, r = function() {
    function r() {
        t(this, r);
    }
    return e(r, [ {
        key: "init",
        value: function(t) {
            o = t, a.register(n.ActionTaskUpdate, this.onActionTaskUpdate, this);
        }
    }, {
        key: "onActionTaskUpdate",
        value: function(t, e) {
            if (e) {
                i.taskComplete = i.taskComplete.concat(e);
                for (var n = 0; n < e.length; n++) {
                    var a = parseInt(e[n]);
                    i.completeTaskByHand(a);
                }
                o.eventDispatcher.dispatchEventWith("ActionTaskUpdate");
            }
        }
    } ]), r;
}();

module.exports = new r();