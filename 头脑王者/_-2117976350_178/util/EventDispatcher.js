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
}(), n = function() {
    function n() {
        e(this, n), this.eventTarget = this, this.eventMap = {}, this.ONCE_EVENT_LIST = [];
    }
    return t(n, [ {
        key: "addEventListener",
        value: function(e, t, n) {
            this.$addListener(e, t, n);
        }
    }, {
        key: "once",
        value: function(e, t, n) {
            this.$addListener(e, t, n, !0);
        }
    }, {
        key: "$addListener",
        value: function(e, t, n) {
            var i = arguments.length > 3 && void 0 !== arguments[3] && arguments[3], r = this.eventMap[e];
            r || (r = this.eventMap[e] = []), this.$insertEventBin(r, e, t, n, i);
        }
    }, {
        key: "$insertEventBin",
        value: function(e, t, n, i) {
            for (var r = arguments.length > 4 && void 0 !== arguments[4] && arguments[4], a = e.length, s = 0; s < a; s++) {
                var v = e[s];
                if (v && v.listener == n && v.thisObject == i && v.target == this) return !1;
            }
            var u = {
                type: t,
                listener: n,
                thisObject: i,
                target: this,
                dispatchOnce: !!r
            };
            return e.push(u), !0;
        }
    }, {
        key: "removeEventListener",
        value: function(e, t, n) {
            var i = this.eventMap[e];
            i && (this.$removeEventBin(i, t, n), 0 == i.length && (this.eventMap[e] = null));
        }
    }, {
        key: "$removeEventBin",
        value: function(e, t, n) {
            for (var i = e.length; i >= 0; i--) {
                var r = e[i];
                r && r.listener == t && r.thisObject == n && r.target == this && e.splice(i, 1);
            }
            return !1;
        }
    }, {
        key: "hasEventListener",
        value: function(e) {
            return !!this.eventMap[e];
        }
    }, {
        key: "dispatchEvent",
        value: function(e) {
            return e.currentTarget = this.eventTarget, e.target = this.eventTarget, this.$notifyListener(e, !1);
        }
    }, {
        key: "$notifyListener",
        value: function(e) {
            var t = this.eventMap[e.type];
            if (!t) return !0;
            var n = t.length;
            if (0 == n) return !0;
            for (var i = this.ONCE_EVENT_LIST, r = 0; r < n; r++) {
                var a = t[r];
                if (a && (a.listener && "function" == typeof a.listener && a.listener.call(a.thisObject, e), 
                a.dispatchOnce && i.push(a)), e.stop) break;
            }
            for (;i.length; ) {
                var s = i.pop();
                s.target.removeEventListener(s.type, s.listener, s.thisObject);
            }
        }
    }, {
        key: "dispatchEventWith",
        value: function(e, t) {
            if (this.hasEventListener(e)) {
                var n = {
                    type: e,
                    data: t
                };
                return this.dispatchEvent(n);
            }
            return !0;
        }
    } ]), n;
}();

module.exports = n;