function r(r) {
    if (Array.isArray(r)) {
        for (var o = 0, e = Array(r.length); o < r.length; o++) e[o] = r[o];
        return e;
    }
    return Array.from(r);
}

function o(o) {
    for (var e = arguments.length, t = Array(e > 1 ? e - 1 : 0), a = 1; a < e; a++) t[a - 1] = arguments[a];
    var c = [ "[html5 player]" ].concat(r(t.map(function(r) {
        return "[" + r + "]";
    })));
    return function() {
        for (var e = arguments.length, t = Array(e), a = 0; a < e; a++) t[a] = arguments[a];
        n && o.call.apply(o, [ console ].concat(r(c), t));
    };
}

function e() {
    for (var r = arguments.length, e = Array(r), n = 0; n < r; n++) e[n] = arguments[n];
    return {
        log: o.apply(void 0, [ console.log ].concat(e)),
        debug: o.apply(void 0, [ console.debug ].concat(e)),
        info: o.apply(void 0, [ console.info ].concat(e)),
        warn: o.apply(void 0, [ console.warn ].concat(e)),
        error: o.apply(void 0, [ console.error ].concat(e))
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.setEnable = function(r) {
    n = r;
}, exports.makeLogger = e;

var n = (0, require("./util").getIsDebug)();

exports.default = e("core");