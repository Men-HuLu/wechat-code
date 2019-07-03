function n(n, r, t, u, e) {
    if (n == t) {
        if (r == u) return;
        if (r > u) {
            for (r += e - u - 1, --e; e >= u; --e, --r) n[r] = t[e];
            return;
        }
    }
    for (;u < e; ++u, ++r) n[r] = t[u];
}

function r(n) {
    return u(0, n), f();
}

function t(t, u, e) {
    if (0 == u && e == t.length) return r(t);
    var a = [ e - u ];
    return n(a, 0, t, u, e), r(a);
}

function u(n, r) {
    return o = n, c = r, f();
}

function e() {
    return c.length;
}

function a() {
    var n = e();
    return 0 == o ? n : n >= 192 ? n + 5 : n + 4;
}

function i(n) {
    return i(n, 0, n.length);
}

function i(n, r, t) {
    for (var u = 0; r < t; ++r) u += parseInt(n[r]);
    return ~u;
}

function f() {
    if (0 == o) return c;
    var r = [ a() ];
    r[0] = g, r[1] = o;
    var t = e();
    return t >= 192 ? (r[2] = t >>> 8 | 192, r[3] = 255 & t, n(r, 4, c, 0, t), r[t + 4] = i(r, 1, t + 4)) : (r[2] = t, 
    n(r, 3, c, 0, t), r[t + 3] = i(r, 1, t + 3)), r;
}

var o, c, g = 31;

module.exports = {
    obtain1: r,
    obtain2: function(n, r) {
        return t(n, 0, r);
    },
    obtain3: t,
    DataPackage1: function(n) {
        return o = n, c = null, f();
    },
    DataPackage2: u,
    DataPackage3: function(n, r, t) {
        return o = n, t ? r >= 192 ? ((c = [ 2 ])[0] = r >>> 8 | 192, c[1] = 255 & r) : (c = [ 1 ])[0] = 255 & r : ((c = [ 2 ])[0] = r >>> 8, 
        c[1] = 255 & r), f();
    },
    DataPackage7: function(r, t, u, e, a, i, g) {
        return o = r, c = [ e - u + (g - i) ], n(c, 0, t, u, e), n(c, e - u, a, i, g), f();
    }
};