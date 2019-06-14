function e(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

var r = function() {
    function e(e, r) {
        for (var n = 0; n < r.length; n++) {
            var t = r[n];
            t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), 
            Object.defineProperty(e, t.key, t);
        }
    }
    return function(r, n, t) {
        return n && e(r.prototype, n), t && e(r, t), r;
    };
}(), n = function() {
    function n() {
        e(this, n);
    }
    return r(n, [ {
        key: "register",
        value: function(e, r, n) {
            this.handlers = this.handlers || {}, this.handlers[e] = this.handlers[e] || [];
            for (var t = -1, i = this.handlers[e].length - 1; i >= 0; i--) {
                var a = this.handlers[e][i];
                a && a.cb == r && (t = i);
            }
            -1 == t && this.handlers[e].push({
                cb: r,
                thisObj: n
            });
        }
    }, {
        key: "remove",
        value: function(e, r) {
            if (this.handlers && this.handlers[e]) for (var n = this.handlers[e].length - 1; n >= 0; n--) this.handlers[e][n].cb == r && this.handlers[e].splice(n, 1);
        }
    }, {
        key: "receive",
        value: function(e, r) {
            if (this.handlers) {
                var n = this.handlers[e];
                if (n) {
                    var t = !0, i = !1, a = void 0;
                    try {
                        for (var s, h = n[Symbol.iterator](); !(t = (s = h.next()).done); t = !0) {
                            var l = s.value;
                            l && "function" == typeof l.cb && l.cb.call(l.thisObj, e, r);
                        }
                    } catch (e) {
                        i = !0, a = e;
                    } finally {
                        try {
                            !t && h.return && h.return();
                        } finally {
                            if (i) throw a;
                        }
                    }
                }
            }
        }
    } ]), n;
}();

module.exports = new n();