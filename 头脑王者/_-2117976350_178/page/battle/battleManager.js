function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

var n = function() {
    function e(e, n) {
        for (var t = 0; t < n.length; t++) {
            var r = n[t];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(n, t, r) {
        return t && e(n.prototype, t), r && e(n, r), n;
    };
}(), t = require("./controller/battleShareTest.js"), r = function() {
    function r() {
        e(this, r);
    }
    return n(r, [ {
        key: "enter",
        value: function(e) {
            this.controller = e, this.controller.enter();
        }
    }, {
        key: "end",
        value: function() {}
    }, {
        key: "enterShareTest",
        value: function() {
            var e = new t();
            this.enter(e);
        }
    } ]), r;
}();

module.exports = new r();