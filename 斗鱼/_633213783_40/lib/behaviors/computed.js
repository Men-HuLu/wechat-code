Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = Behavior({
    lifetimes: {
        created: function() {
            this._computedCache = {}, this._originalSetData = this.setData, this.setData = this._setData;
        },
        attached: function() {
            this.initComputed();
        }
    },
    definitionFilter: function(t) {
        var e = t.computed || {}, a = Object.keys(e), i = !1, o = function(i, o) {
            var n = {}, s = t.data = t.data || {};
            if (o) {
                var c = t.properties || {};
                Object.keys(c).forEach(function(t) {
                    void 0 === s[t] && (s[t] = c[t].value);
                });
            }
            for (var r = i._computedCache || i.data, d = 0, h = a.length; d < h; d++) {
                var l = a[d], u = e[l];
                if ("function" == typeof u) {
                    var f = u.call(i);
                    r[l] !== f && (n[l] = f, r[l] = f);
                }
                o && (s[l] = n[l]);
            }
            return n;
        };
        t.methods.initComputed = function() {
            i = !0, o(t, !0), i = !1;
        }, t.methods = t.methods || {}, t.methods._setData = function(t, a) {
            var n = this._originalSetData;
            if (i) console.warn("can't call setData in computed getter function!"); else {
                i = !0;
                for (var s = Object.keys(t), c = 0, r = s.length; c < r; c++) {
                    var d = s[c];
                    e[d] && delete t[d];
                }
                n.call(this, t, a);
                var h = o(this);
                n.call(this, h), i = !1;
            }
        };
    }
});