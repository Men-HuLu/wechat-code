function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function i(t, i) {
    if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
}

function e(t, i) {
    var e = t.events ? t.events[i] : t.$events[i] ? t.$events[i] : void 0, n = void 0 === e ? "undefined" : a(e), o = void 0;
    if ("string" === n) {
        var r = t.methods && t.methods[e];
        "function" == typeof r && (o = r);
    } else ("function" === n || Array.isArray(e)) && (o = e);
    return o;
}

var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = function() {
    function t(t, i) {
        for (var e = 0; e < i.length; e++) {
            var n = i[e];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(i, e, n) {
        return e && t(i.prototype, e), n && t(i, n), i;
    };
}(), a = "function" == typeof Symbol && "symbol" === n(Symbol.iterator) ? function(t) {
    return void 0 === t ? "undefined" : n(t);
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : n(t);
}, r = t(require("./event.js")), s = t(require("./util.js")), p = {
    check: function(t, i) {
        switch (t) {
          case String:
            return "string" == typeof i;

          case Number:
            return "number" == typeof i;

          case Boolean:
            return "boolean" == typeof i;

          case Function:
            return "function" == typeof i;

          case Object:
            return "object" === (void 0 === i ? "undefined" : a(i));

          case Array:
            return "[object Array]" === toString.call(i);

          default:
            return i instanceof t;
        }
    },
    build: function(t) {
        var i = {};
        return "string" == typeof t ? i[t] = {} : "[object Array]" === toString.call(t) ? t.forEach(function(t) {
            i[t] = {};
        }) : Object.keys(t).forEach(function(e) {
            "function" == typeof t[e] ? i[e] = {
                type: [ t[e] ]
            } : "[object Array]" === toString.call(t[e]) ? i[e] = {
                type: t[e]
            } : i[e] = t[e], i[e].type && "[object Array]" !== toString.call(i[e].type) && (i[e].type = [ i[e].type ]);
        }), i;
    },
    valid: function(t, i, e) {
        var n = this, o = !1;
        if (t[i]) {
            if (t[i].type) return t[i].type.some(function(t) {
                return n.check(t, e);
            });
            o = !0;
        }
        return o;
    },
    getValue: function(t, i, e) {
        var n;
        return n = void 0 !== e && this.valid(t, i, e) ? e : "function" == typeof t[i].default ? t[i].default() : t[i].default, 
        t[i].coerce ? t[i].coerce(n) : n;
    }
}, f = function() {
    function t() {
        i(this, t), this.$com = {}, this.$events = {}, this.$mixins = [], this.$isComponent = !0, 
        this.$prefix = "", this.$mappingProps = {}, this.data = {}, this.methods = {};
    }
    return o(t, [ {
        key: "$init",
        value: function(t, i, e) {
            var n = this;
            this.$wxpage = t, this.$isComponent && (this.$root = i || this.$root, this.$parent = e || this.$parent, 
            this.$wxapp = this.$root.$parent.$wxapp), this.props && (this.props = p.build(this.props));
            var o = void 0, r = {}, f = this.props, h = void 0, c = void 0, $ = void 0, u = !1, l = void 0;
            if (void 0 === this.$initData ? this.$initData = s.default.$copy(this.data, !0) : this.data = s.default.$copy(this.$initData, !0), 
            this.$props) for (h in this.$props) for ($ in this.$props[h]) /\.sync$/.test($) && (this.$mappingProps[this.$props[h][$]] || (this.$mappingProps[this.$props[h][$]] = {}), 
            this.$mappingProps[this.$props[h][$]][h] = $.substring(7, $.length - 5));
            if (f) for (h in f) c = void 0, e && e.$props && e.$props[this.$name] && (c = e.$props[this.$name][h], 
            ($ = e.$props[this.$name]["v-bind:" + h + ".once"] || e.$props[this.$name]["v-bind:" + h + ".sync"]) ? "object" === (void 0 === $ ? "undefined" : a($)) ? function() {
                f[h].repeat = $.for, f[h].item = $.item, f[h].index = $.index, f[h].key = $.key, 
                f[h].value = $.value, u = !0;
                var t = $.for, i = e;
                t.split(".").forEach(function(t) {
                    i = i ? i[t] : {};
                }), !i || "object" !== (void 0 === i ? "undefined" : a(i)) && "string" != typeof i || (l = Object.keys(i)[0]), 
                n.$mappingProps[h] || (n.$mappingProps[h] = {}), n.$mappingProps[h].parent = {
                    mapping: $.for,
                    from: h
                };
            }() : (c = e[$], f[h].twoWay && (this.$mappingProps[h] || (this.$mappingProps[h] = {}), 
            this.$mappingProps[h].parent = $)) : "object" === (void 0 === c ? "undefined" : a(c)) && void 0 !== c.value && (this.data[h] = c.value)), 
            this.data[h] || f[h].repeat || (c = p.getValue(f, h, c), this.data[h] = c);
            "function" == typeof this.data && (this.data = this.data.apply(this.data));
            for (o in this.data) r["" + this.$prefix + o] = this.data[o], this[o] = this.data[o];
            if (this.$data = s.default.$copy(this.data, !0), u && void 0 !== l && this.$setIndex(l), 
            this.computed) for (o in this.computed) {
                var d = this.computed[o];
                r["" + this.$prefix + o] = d.call(this), this[o] = s.default.$copy(r["" + this.$prefix + o], !0);
            }
            this.setData(r);
            var y = Object.getOwnPropertyNames(this.$com);
            y.length && y.forEach(function(t) {
                var e = n.$com[t];
                e.$init(n.getWxPage(), i, n), [].concat(e.$mixins, e).forEach(function(t) {
                    t.onLoad && t.onLoad.call(e);
                }), e.$apply();
            });
        }
    }, {
        key: "$initMixins",
        value: function() {
            var t = this;
            this.mixins ? "function" == typeof this.mixins && (this.mixins = [ this.mixins ]) : this.mixins = [], 
            this.mixins.forEach(function(i) {
                var e = new i();
                e.$init(t), t.$mixins.push(e);
            });
        }
    }, {
        key: "onLoad",
        value: function() {}
    }, {
        key: "setData",
        value: function(t, i) {
            if ("string" == typeof t) {
                if (i) {
                    var e = {};
                    e[t] = i, t = e;
                } else {
                    var n = {};
                    n[t] = this.data["" + t], t = n;
                }
                return this.$wxpage.setData(t);
            }
            var o = null, a = new RegExp("^" + this.$prefix.replace(/\$/g, "\\$"), "ig");
            for (o in t) {
                var r = o.replace(a, "");
                this.$data[r] = s.default.$copy(t[o], !0), void 0 === t[o] && delete t[o];
            }
            return "function" == typeof i ? this.$root.$wxpage.setData(t, i) : this.$root.$wxpage.setData(t);
        }
    }, {
        key: "getWxPage",
        value: function() {
            return this.$wxpage;
        }
    }, {
        key: "getCurrentPages",
        value: function(t) {
            function i() {
                return t.apply(this, arguments);
            }
            return i.toString = function() {
                return t.toString();
            }, i;
        }(function() {
            return getCurrentPages();
        })
    }, {
        key: "$setIndex",
        value: function(t) {
            var i = this;
            this.$index = t;
            var e = this.props, n = this.$parent, o = void 0, r = void 0, p = void 0;
            if (e) {
                for (o in e) r = void 0, n && n.$props && n.$props[this.$name] && (r = n.$props[this.$name][o], 
                (p = n.$props[this.$name]["v-bind:" + o + ".once"] || n.$props[this.$name]["v-bind:" + o + ".sync"]) && "object" === (void 0 === p ? "undefined" : a(p)) && function() {
                    var a = p.for, f = n;
                    a.split(".").forEach(function(t) {
                        f = f ? f[t] : {};
                    }), t = Array.isArray(f) ? +t : t, r = e[o].value === e[o].item ? f[t] : e[o].value === e[o].index ? t : e[o].value === e[o].key ? t : n[e[o].value], 
                    i.$index = t, i.data[o] = r, i[o] = r, i.$data[o] = s.default.$copy(i[o], !0);
                }());
                for (o in this.$com) this.$com[o].$index = void 0;
            }
        }
    }, {
        key: "$getComponent",
        value: function(t) {
            var i = this;
            if ("string" == typeof t) {
                if (-1 === t.indexOf("/")) return this.$com[t];
                if ("/" === t) return this.$parent;
                t.split("/").forEach(function(e, n) {
                    0 === n ? t = "" === e ? i.$root : "." === e ? i : ".." === e ? i.$parent : i.$getComponent(e) : e && (t = t.$com[e]);
                });
            }
            return "object" !== (void 0 === t ? "undefined" : a(t)) ? null : t;
        }
    }, {
        key: "$invoke",
        value: function(t, i) {
            if (!(t = this.$getComponent(t))) throw new Error("Invalid path: " + t);
            for (var e = t.methods ? t.methods[i] : "", n = arguments.length, o = Array(n > 2 ? n - 2 : 0), a = 2; a < n; a++) o[a - 2] = arguments[a];
            if ("function" == typeof e) {
                var s = new r.default("", this, "invoke"), p = e.apply(t, o.concat(s));
                return t.$apply(), p;
            }
            if ("function" == typeof (e = t[i])) return e.apply(t, o);
            throw new Error("Invalid method: " + i);
        }
    }, {
        key: "$broadcast",
        value: function(t) {
            for (var i = arguments.length, n = Array(i > 1 ? i - 1 : 0), o = 1; o < i; o++) n[o - 1] = arguments[o];
            for (var a = this, s = "string" == typeof t ? new r.default(t, this, "broadcast") : s, p = [ a ]; p.length && s.active; ) {
                var f = p.shift();
                for (var h in f.$com) if ("break" === function(i) {
                    i = f.$com[i], p.push(i);
                    var o = e(i, t);
                    if (o && i.$apply(function() {
                        o.apply(i, n.concat(s));
                    }), !s.active) return "break";
                    h = i;
                }(h)) break;
            }
        }
    }, {
        key: "$emit",
        value: function(t) {
            for (var i = this, n = arguments.length, o = Array(n > 1 ? n - 1 : 0), a = 1; a < n; a++) o[a - 1] = arguments[a];
            var s = this, p = this, f = new r.default(t, p, "emit");
            if (o = o.concat(f), this.$parent && this.$parent.$events && this.$parent.$events[this.$name]) {
                var h = this.$parent.$events[this.$name]["v-on:" + t];
                if (h && this.$parent.methods) {
                    var c = this.$parent.methods[h];
                    if ("function" == typeof c) return void this.$parent.$apply(function() {
                        c.apply(i.$parent, o);
                    });
                    throw new Error("Invalid method from emit, component is " + this.$parent.$name + ", method is " + h + ". Make sure you defined it already.\n");
                }
            }
            for (;s && void 0 !== s.$isComponent && f.active; ) !function() {
                var i = s, n = e(i, t);
                n && ("function" == typeof n ? i.$apply(function() {
                    n.apply(i, o);
                }) : Array.isArray(n) && (n.forEach(function(t) {
                    t.apply(i, o);
                }), i.$apply())), s = i.$parent;
            }();
        }
    }, {
        key: "$on",
        value: function(t, i) {
            var e = this;
            if ("string" == typeof t) (this.$events[t] || (this.$events[t] = [])).push(i); else if (Array.isArray(t)) t.forEach(function(t) {
                e.$on(t, i);
            }); else if ("object" === (void 0 === t ? "undefined" : a(t))) for (var n in t) this.$on(n, t[n]);
            return this;
        }
    }, {
        key: "$once",
        value: function(t, i) {
            var e = this, n = function n() {
                e.$off(t, n), i.apply(e, arguments);
            };
            n.fn = i, this.$on(t, n);
        }
    }, {
        key: "$off",
        value: function(t, i) {
            var e = this;
            if (void 0 === t) this.$events = {}; else if ("string" == typeof t) if (i) {
                for (var n = this.$events[t], o = n.length; o--; ) if (i === n[o] || i === n[o].fn) {
                    n.splice(o, 1);
                    break;
                }
            } else this.$events[t] = []; else Array.isArray(t) && t.forEach(function(t) {
                e.$off(t, i);
            });
            return this;
        }
    }, {
        key: "$apply",
        value: function(t) {
            "function" == typeof t ? (t.call(this), this.$apply()) : this.$$phase ? this.$$phase = "$apply" : this.$digest();
        }
    }, {
        key: "$digest",
        value: function() {
            var t = this, i = void 0, e = this.$data;
            for (this.$$phase = "$digest", this.$$dc = 0; this.$$phase; ) {
                if (++this.$$dc >= 3) throw new Error("Can not call $apply in $apply process");
                var n = {};
                if (this.computed) for (i in this.computed) {
                    var o = this.computed[i].call(this);
                    s.default.$isEqual(this[i], o) || (n[this.$prefix + i] = o, this[i] = s.default.$copy(o, !0));
                }
                for (i in e) if (!s.default.$isEqual(this[i], e[i])) {
                    if (this.watch && this.watch[i] && ("function" == typeof this.watch[i] ? this.watch[i].call(this, this[i], e[i]) : "string" == typeof this.watch[i] && "function" == typeof this.methods[i] && this.methods[i].call(this, this[i], e[i])), 
                    n[this.$prefix + i] = this[i], this.data[i] = this[i], e[i] = s.default.$copy(this[i], !0), 
                    this.$repeat && this.$repeat[i]) {
                        var r = this.$repeat[i];
                        this.$com[r.com].data[r.props] = this[i], this.$com[r.com].$setIndex(0), this.$com[r.com].$apply();
                    }
                    this.$mappingProps[i] && Object.keys(this.$mappingProps[i]).forEach(function(e) {
                        var n = t.$mappingProps[i][e];
                        "object" === (void 0 === n ? "undefined" : a(n)) ? t.$parent.$apply() : "parent" !== e || s.default.$isEqual(t.$parent.$data[n], t[i]) ? "parent" === e || s.default.$isEqual(t.$com[e].$data[n], t[i]) || (t.$com[e][n] = t[i], 
                        t.$com[e].data[n] = t[i], t.$com[e].$apply()) : (t.$parent[n] = t[i], t.$parent.data[n] = t[i], 
                        t.$parent.$apply());
                    });
                }
                if (Object.keys(n).length) this.setData(n, function() {
                    if (t.$$nextTick) {
                        var i = t.$$nextTick;
                        t.$$nextTick = null, i.promise ? i() : i.call(t);
                    }
                }); else if (this.$$nextTick) {
                    var p = this.$$nextTick;
                    this.$$nextTick = null, p.promise ? p() : p.call(this);
                }
                this.$$phase = "$apply" === this.$$phase && "$digest";
            }
        }
    }, {
        key: "$nextTick",
        value: function(t) {
            var i = this;
            if (void 0 === t) return new Promise(function(t, e) {
                i.$$nextTick = function() {
                    t();
                }, i.$$nextTick.promise = !0;
            });
            this.$$nextTick = t;
        }
    } ]), t;
}();

exports.default = f;