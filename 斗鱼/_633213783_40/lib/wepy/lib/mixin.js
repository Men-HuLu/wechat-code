function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var o = e[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(t, o.key, o);
        }
    }
    return function(e, n, o) {
        return n && t(e.prototype, n), o && t(e, o), e;
    };
}(), n = function() {
    function n() {
        t(this, n), this.data = {}, this.components = {}, this.methods = {}, this.events = {};
    }
    return e(n, [ {
        key: "$init",
        value: function(t) {
            var e = this;
            Object.getOwnPropertyNames(this).concat(Object.getOwnPropertyNames(Object.getPrototypeOf(this))).forEach(function(n) {
                n[0] + n[1] !== "on" && "constructor" !== n && (t[n] || (t[n] = e[n]));
            }), [ "data", "events", "components" ].forEach(function(n) {
                Object.getOwnPropertyNames(e[n]).forEach(function(o) {
                    "init" === o || t[n][o] || (t[n][o] = e[n][o]);
                });
            });
        }
    } ]), n;
}();

exports.default = n;