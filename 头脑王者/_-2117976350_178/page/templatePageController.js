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
}(), a = function() {
    function a() {
        e(this, a);
    }
    return t(a, [ {
        key: "showTemplatePage",
        value: function(e, t, a) {
            var n = this;
            console.log("on show template page,name:" + a);
            var o = new t(), r = a + "Data", i = r + ".data", s = r + ".visible";
            this.bindTapEvents(e, o);
            var l = function(t) {
                console.log("on template page set data:" + JSON.stringify(t));
                var a = {};
                a[i] = t, e.setData(a);
            }.bind(o);
            o.setData = l, o.close = function() {
                n.hideTemplatePage(a, e, o);
            };
            var v = {};
            return v[s] = !0, e.setData(v), o.onLoad(), o;
        }
    }, {
        key: "bindTapEvents",
        value: function(e, t) {
            for (var a in t.tapEvents) {
                var n = t.tapEvents[a];
                e[a] = n;
            }
        }
    }, {
        key: "removeTapEvents",
        value: function(e, t) {
            for (var a in t.tapEvents) delete e[a];
        }
    }, {
        key: "hideTemplatePage",
        value: function(e, t, a) {
            console.log("on close template page,name:" + e), this.removeTapEvents(t, a);
            var n = {};
            n[e + "Data.visible"] = !1, t.setData(n);
        }
    } ]), a;
}();

module.exports = new a();