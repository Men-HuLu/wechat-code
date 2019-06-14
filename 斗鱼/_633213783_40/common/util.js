function e(e) {
    e instanceof Date || (e = new Date(e));
    var t = new Date().getFullYear() === e.getFullYear() ? "" : e.getFullYear() + "-", r = (1 + e.getMonth()).toString();
    r = r.length > 1 ? r : "0" + r;
    var n = e.getDate().toString();
    return n = n.length > 1 ? n : "0" + n, t + r + "-" + n;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, r = e, n = exports.formatterChineseDate = function(e) {
    e instanceof Date || (e = new Date(e));
    var t = new Date().getFullYear() === e.getFullYear() ? "" : e.getFullYear() + "年", r = (1 + e.getMonth()).toString();
    r = r.length > 1 ? r : "0" + r;
    var n = e.getDate().toString();
    return n = n.length > 1 ? n : "0" + n, t + r + "月" + n + "日";
};

exports.default = {
    isObject: function(e) {
        return "object" === (void 0 === e ? "undefined" : t(e)) && null !== e;
    },
    isFunc: function(e) {
        return "function" == typeof e;
    },
    warn: function(e) {
        return console.warn(e);
    },
    log: function(e) {
        return console.log("Log : " + Date() + " " + e);
    },
    wait: function(e, t) {
        return new Promise(function(r) {
            setTimeout(function() {
                return r(t);
            }, e);
        });
    },
    decodeFlashData: function(e) {
        if (e && e[1] && "string" == typeof e[1]) {
            var t = Object.create(null);
            e[1].split("/").forEach(function(e) {
                var r = /(\S+?)@\=([^\/]*)$/.exec(e);
                r && r.length > 2 && (t[r[1]] = r[2].replace(/@S/g, "/").replace(/@A/g, "@"));
            }), e[1] = t;
        }
        return e;
    },
    encodeFlashData: function(e) {
        return Object.keys(e).map(function(t) {
            return t + "@=" + ("" + e[t]).replace(/\//g, "@S").replace(/@/g, "@A").replace(/\\/g, "\\\\");
        }).join("/");
    },
    htmlEncode: function(e) {
        var t = "";
        return 0 === e.length ? "" : (t = e.replace(/&/g, "&amp;"), t = t.replace(/</g, "&lt;"), 
        t = t.replace(/>/g, "&gt;"), t = t.replace(/ /g, "&nbsp;"), t = t.replace(/\'/g, "&#39;"), 
        t = t.replace(/\"/g, "&quot;"), t = t.replace(/\n/g, "<br/>"));
    },
    htmlDecode: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = "";
        return 0 === e.length ? "" : (t = e.replace(/&amp;/g, "&"), t = t.replace(/&lt;/g, "<"), 
        t = t.replace(/&gt;/g, ">"), t = t.replace(/&nbsp;/g, " "), t = t.replace(/&#39;/g, "'"), 
        t = t.replace(/&quot;/g, "'"), t = t.replace(/<br\/>/g, "\n"));
    },
    numberUpperFormat: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, r = function(e) {
            for (var t = -1, r = e; r >= 1; ) t += 1, r /= 10;
            return t;
        }, n = function(e, n, o, a) {
            var i = r(e);
            if (i > 3) {
                var l = i % 8;
                l >= 5 && (l = 4);
                var u = n / Math.pow(10, l + o - a);
                return -1 === (u = Math.round(u) / Math.pow(10, t)).toString().indexOf(".") && (u += ".0"), 
                u + "万";
            }
            return Math.round(n / Math.pow(10, o - a)) / Math.pow(10, t);
        }, o = null == t ? 2 : t, a = Math.floor(e), i = r(a), l = [];
        if (i > 3) {
            var u = Math.floor(i / 8);
            if (u >= 1) {
                var c = Math.round(a / Math.pow(10, 8 * u));
                l.push(n(c, e, 8 * u, o));
                for (var f = 0; f < u; f += 1) l.push("亿");
                return l.join("");
            }
            return n(a, e, 0, o);
        }
        return e;
    },
    secToTime: function(e) {
        var t = void 0;
        if (e > -1) {
            var r = Math.floor(e / 3600), n = Math.floor(e / 60) % 60, o = e % 60;
            t = r < 10 ? r < 1 ? "" : "0" + r + ":" : r + ":", n < 10 && (t += "0"), t += n + ":", 
            o < 10 && (t += "0"), t += o.toFixed(0);
        }
        return t;
    },
    getFormattedDate: r,
    getDateTimeDiff: function(t) {
        var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : new Date(), n = {};
        t instanceof Date || (t = new Date(t));
        var o = r.getTime() - t.getTime(), a = Math.floor(o / 864e5);
        n.Days = a;
        var i = Math.floor(a / 365);
        n.Years = i;
        var l = Math.floor(a / 30);
        n.Months = l;
        var u = o % 864e5, c = Math.floor(u / 36e5);
        n.Hours = c;
        var f = u % 36e5, g = Math.floor(f / 6e4);
        n.Minutes = g;
        var p = f % 6e4, v = Math.round(p / 1e3);
        n.Seconds = v;
        var h = "";
        return h = i >= 1 ? e(t) : l >= 1 ? e(t) : a >= 1 ? e(t) : c >= 1 ? c + "小时前" : g >= 1 ? g + "分钟前" : "刚刚", 
        n.PubTime = h, n;
    },
    scanCodeParse: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = {};
        if (e.q) {
            getApp().initApp();
            var r = decodeURIComponent(e.q);
            if (-1 !== r.indexOf("?")) {
                for (var n = r.split("?")[1].split("&"), o = 0; o < n.length; o++) t[n[o].split("=")[0]] = n[o].split("=")[1];
                return t.rid && (t.roomId = t.rid), t.vid && (t.videoId = t.vid), t.t && (t.type = t.t), 
                t.iv && (t.is_vertical = t.iv), t;
            }
        }
    },
    broadcast: function(e, t) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        e.forEach(function(e) {
            e[t] && e[t](r);
        });
    },
    formatterChineseDate: n
};