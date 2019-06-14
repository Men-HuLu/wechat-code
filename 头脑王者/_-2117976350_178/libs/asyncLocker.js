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
}(), n = require("./cavenet/defer"), t = {}, o = function() {
    function o(r, t) {
        e(this, o), this.key = r, this.debug = t, this.defer = n(), this.promise = this.defer.promise;
    }
    return r(o, [ {
        key: "release",
        value: function() {
            t[this.key].shift();
            console.error("releaselock:" + this.key + ":" + this.debug + "  " + t[this.key].length), 
            t[this.key].length > 0 && t[this.key][0].defer.resolve(t[this.key][0]);
        }
    } ]), o;
}();

exports.lock = function(e, r) {
    return console.error("getlock:" + e + ":" + r), new Promise(function(n, i) {
        if (t[e] || (t[e] = []), 0 == t[e].length) {
            s = new o(e, r);
            return t[e].push(s), console.error("lock new:" + r + "  " + t[e].length), n(s);
        }
        var s = new o(e, r);
        t[e].push(s), console.error("lock old:" + r + "  " + t[e].length), s.promise.then(function() {
            console.error("lock then old:" + r), n(s);
        });
    });
};