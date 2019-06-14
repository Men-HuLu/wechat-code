function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
    };
}(), n = e(require("./util")), o = e(require("./storage")), u = [ "OPTIONS", "GET", "HEAD", "POST", "PUT", "DELETE", "TRACE", "CONNECT" ], a = function() {
    function e() {
        t(this, e), this.xhr = wx.request;
    }
    return r(e, [ {
        key: "checkArguments",
        value: function(e) {
            if (!e.length) return !1;
            var t = e[0], r = Object.create(null);
            if ("string" == typeof t && t.length) return r.url = t, r;
            if (n.default.isObject(t)) {
                var o = (t.method || "GET").toUpperCase();
                return -1 === u.toString().indexOf(o) ? (n.default.warn("HttpClient request warning : Request method should be " + u.join("/")), 
                o = "GET") : "POST" === o && (!n.default.isObject(t.header) && (t.header = {}), 
                t.header["content-type"] = "application/x-www-form-urlencoded"), Object.assign(r, t, {
                    method: o
                });
            }
            return !1;
        }
    }, {
        key: "request",
        value: function() {
            for (var e = this, t = arguments.length, r = Array(t), n = 0; n < t; n++) r[n] = arguments[n];
            var o = this.checkArguments(r);
            if (!o) throw new Error("HttpClient request error : Invalid parameters");
            return new Promise(function(t, r) {
                o.success = function(e) {
                    200 === e.statusCode ? t(e.data) : r(e);
                }, o.fail = r, e.xhr(o);
            });
        }
    }, {
        key: "requestStorageFirst",
        value: function(e) {
            var t = this;
            return this.getStorageRequestData(e).then(function(r) {
                return r ? (t.requestSetStorage(e), Promise.resolve(r)) : t.requestSetStorage(e);
            }, function(r) {
                return console.log(r), t.requestSetStorage(e);
            }).catch(function(r) {
                return console.log(r), t.requestSetStorage(e);
            });
        }
    }, {
        key: "requestSetStorage",
        value: function(e) {
            var t = this;
            return this.request(e).then(function(r) {
                return t.setRequestData(e, r), Promise.resolve(r);
            }, function(e) {
                return console.log(e), Promise.reject(e);
            }).catch(function(e) {
                return Promise.reject(e);
            });
        }
    }, {
        key: "getStorageRequestData",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = this.storageKey(e);
            return t ? Promise.resolve() : o.default.get(t).then(function(e) {
                if (e && e.data && "{}" !== JSON.stringify(e.data)) return Promise.resolve(JSON.parse(e.data));
            }, function(e) {
                return console.log(e), Promise.resolve();
            });
        }
    }, {
        key: "setRequestData",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1], r = this.storageKey(e);
            if (!r) {
                var n = JSON.stringify(t);
                return o.default.set(r, n);
            }
        }
    }, {
        key: "storageKey",
        value: function() {
            for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
            try {
                t = this.checkArguments(t);
            } catch (e) {
                return console.log(e), "";
            }
            if (!t) return console.error("HttpClient request error : Invalid parameters"), "";
            var n = t.url + "_" + (t.method || "GET");
            return t && t.data && Object.keys(t.data).forEach(function(e) {
                n = n + "_" + e.toString() + t.data[e];
            }), n;
        }
    } ]), e;
}();

exports.default = new a();