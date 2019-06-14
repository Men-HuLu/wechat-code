function r(r, n) {
    return 1 - 3 * n + 3 * r;
}

function n(r, n) {
    return 3 * n - 6 * r;
}

function t(r) {
    return 3 * r;
}

function u(u, e, o) {
    return ((r(e, o) * u + n(e, o)) * u + t(e)) * u;
}

function e(u, e, o) {
    return 3 * r(e, o) * u * u + 2 * n(e, o) * u + t(e);
}

function o(r, n, t, e, o) {
    var f, i, a = 0;
    do {
        (f = u(i = n + (t - n) / 2, e, o) - r) > 0 ? t = i : n = i;
    } while (Math.abs(f) > c && ++a < v);
    return i;
}

function f(r, n, t, o) {
    for (var f = 0; f < i; ++f) {
        var a = e(n, t, o);
        if (0 === a) return n;
        n -= (u(n, t, o) - r) / a;
    }
    return n;
}

var i = 4, a = .001, c = 1e-7, v = 10, s = 11, l = 1 / (s - 1), w = "function" == typeof Float32Array;

module.exports = function(r, n, t, i) {
    function c(n) {
        for (var u = 0, i = 1, c = s - 1; i !== c && v[i] <= n; ++i) u += l;
        var w = u + (n - v[--i]) / (v[i + 1] - v[i]) * l, y = e(w, r, t);
        return y >= a ? f(n, w, r, t) : 0 === y ? w : o(n, u, u + l, r, t);
    }
    if (!(0 <= r && r <= 1 && 0 <= t && t <= 1)) throw new Error("bezier x values must be in [0, 1] range");
    var v = w ? new Float32Array(s) : new Array(s);
    if (r !== n || t !== i) for (var y = 0; y < s; ++y) v[y] = u(y * l, r, t);
    return function(e) {
        return r === n && t === i ? e : 0 === e ? 0 : 1 === e ? 1 : u(c(e), n, i);
    };
};