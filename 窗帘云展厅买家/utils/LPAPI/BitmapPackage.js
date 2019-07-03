function r(r, e, a, f, i) {
    if (r == a) {
        if (e == f) return;
        if (e > f) {
            for (e += i - f - 1, --i; i >= f; --i, --e) r[e] = a[i];
            return;
        }
    }
    for (;f < i; ++f, ++e) r[e] = a[f];
}

function e() {
    return z[0];
}

function a() {
    return [ 31, 40, 0, 136 ];
}

function f(r) {
    return (r = Math[z[1]]((r + 7) / 8)) >= 192 ? [ 31, 39, 2, 192 | r >> 8, 255 & r, 136 ] : [ 31, 39, 1, r, 136 ];
}

function i(r) {
    return r > 16383 ? [ 31, 38, 3, 192, 16383 | r >> 8, 255 & r, 136 ] : r >= 192 ? [ 31, 38, 2, 192 | r >> 8, 255 & r, 136 ] : [ 31, 38, 1, r, 136 ];
}

function n(r, e, a) {
    for (var f, i = 0, n = Math[z[1]]((e + 7) / 8), t = a - 1; t >= 0; t--) {
        for (var u = [ n ], o = 0; o < n; o++) u[o] = 0;
        for (var c = 0, s = 0, v = 0, l = 0, k = 0, b = 0, h = 0, g = 0, D = 0; D < e; D++) {
            var M = D % 8;
            0 == M && (c = 0, s = 0, v = 0, l = 0, k = 0, b = 0, h = 0, g = 0);
            var P = 4 * (e * t + D), w = r[P + 0], A = r[P + 1], E = r[P + 2];
            if (r[P + 3] > 0 && .3 * w + .59 * A + .11 * E <= B && (0 == M ? c = 128 : 1 == M ? s = 64 : 2 == M ? v = 32 : 3 == M ? l = 16 : 4 == M ? k = 8 : 5 == M ? b = 4 : 6 == M ? h = 2 : 7 == M && (g = 1)), 
            7 == M || D == e - 1) {
                var I = c | s | v | l | k | b | h | g;
                u[P = Math[z[1]](D / 8)] = I;
            }
        }
        for (var _ = n - 1; _ >= 0 && 0 == u[_]; _--) ;
        for (var m = 0; m < _ && 0 == u[m]; m++) ;
        var p = _ + 1 - m, y = [ p + 4 ];
        if (y[0] = 31, y[1] = 43, y[2] = m, y[3] = p, p > 0) for (var S = 0; S < p; S++) y[S + 4] = u[S + m];
        if (null == f) q(y), f = y; else if (y.toString() == f.toString()) i++; else {
            if (i > 0) {
                if (i <= 255) q(C = [ 31, 46, i - 1 ]); else for (var d = 255; d > 0; ) q(C = [ 31, 46, d - 1 ]), 
                d = (i -= d) > 255 ? 255 : i;
                i = 0;
            }
            q(y), f = y;
        }
    }
    if (i > 0) {
        var C = [ 31, 46, i - 1 ];
        q(C), i = 0;
    }
}

function t(r, e, a, f) {
    if (f <= 0) return !0;
    for (var i = 5 * e[z[7]] / 8, n = 15; f > 0; ) if (f >= J[n]) {
        f -= J[n];
        var t = n | (a ? 16 : 0);
        if (e[z[7]] = e[z[7]] + 1, 5 * e[z[7]] > 8 * T) return !1;
        switch (e[z[7]] % 8) {
          case 0:
            r[i++] |= t;
            break;

          case 1:
            r[i] |= t << 3;
            break;

          case 2:
            r[i++] |= t >>> 2, r[i] |= (3 & t) << 6;
            break;

          case 3:
            r[i] |= t << 1;
            break;

          case 4:
            r[i++] |= t >>> 4, r[i] |= (15 & t) << 4;
            break;

          case 5:
            r[i++] |= t >>> 1, r[i] |= (1 & t) << 7;
            break;

          case 6:
            r[i] |= t << 2;
            break;

          case 7:
            r[i++] |= t >>> 3, r[i] |= (7 & t) << 5;
        }
    } else --n;
    return !0;
}

function u(r, e, a) {
    if (e <= 0) return 0;
    for (var f = 0, i = 0, n = !1, u = 128, o = {
        value: 0
    }; ;) {
        if (0 != (r[i] & u)) if (n) ++f; else {
            if (!t(a, o, !1, f)) return 0;
            n = !0, f = 1;
        } else if (n) {
            if (!t(a, o, !0, f)) return 0;
            n = !1, f = 1;
        } else ++f;
        if (1 == u) {
            if (++i >= e) break;
            u = 128;
        } else u >>>= 1;
    }
    return n && !t(a, o, !0, f) ? 0 : o[z[7]];
}

function o(r, e, a, f, i) {
    var n = 0, u = 0, o = !1, c = 128, s = {
        value: 0
    }, v = Math[z[4]](e, f);
    if (v > 0) for (;;) {
        if ((a[u] & c) != (r[u] & c)) if (o) ++n; else {
            if (!t(i, s, !1, n)) return 0;
            o = !0, n = 1;
        } else if (o) {
            if (!t(i, s, !0, n)) return 0;
            o = !1, n = 1;
        } else ++n;
        if (1 == c) {
            if (++u >= v) break;
            c = 128;
        } else c >>>= 1;
    }
    if (e != f) for (e < f && (r = a, e = f), c = 128; ;) {
        if (0 != (r[u] & c)) if (o) ++n; else {
            if (!t(i, s, !1, n)) return 0;
            o = !0, n = 1;
        } else if (o) {
            if (!t(i, s, !0, n)) return 0;
            o = !1, n = 1;
        } else ++n;
        if (1 == c) {
            if (++u >= e) break;
            c = 128;
        } else c >>>= 1;
    }
    return o && !t(i, s, !0, n) ? 0 : s[z[7]];
}

function c(r, e, a) {
    return a >= 192 ? (r[e + 0] = a >>> 8 | 192, r[e + 1] = 255 & a, e + 2) : (r[e + 0] = a, 
    e + 1);
}

function s(r) {
    if (!(r <= 0)) {
        j += r;
        for (var e = [ 31, 46, 0, 0 ]; r > H; r -= H + 1) c(e, 2, H), q((f = require(z[8]))[z[9]](e));
        if (r > 0) {
            var a = c(e, 2, r - 1), f = require(z[8]);
            q(f[z[10]](e, a));
        }
    }
}

function v(r, e) {
    if (p < r ? p = r : r > 0 && (0 == S || S > r) && (S = r), d += r * e, e >= I[z[3]]) {
        for (a = 0; a < I[z[3]]; ++a) I[a] = r;
        _ = I[z[3]] * r, y < r && (y = r);
    } else {
        _ += e * r;
        for (var a = 0; a < e; ++a) _ -= I[m], I[m] = r, ++m >= I[z[3]] && (m = 0);
        var f = _ / I[z[3]];
        y < f && (y = f);
    }
}

function l(e, a, f) {
    if (!(f <= 0)) {
        var i = (5 * f + 8 - 1) / 8, n = [ 4 + i + 4 ];
        n[0] = 31, n[1] = e;
        var t = c(n, 2, f);
        r(n, t, a, 0, i), q(require(z[8])[z[11]](n, 0, t + i));
    }
}

function k() {
    if (!(M <= 0)) {
        for (var e = w, a = M, f = 0, i = 0, n = 0; f < P && 0 == e[f]; ++f) ;
        i = P - f;
        for (var t = f; t < P; ++t) n += b(e[t]);
        if (v(n, a), G > 0) {
            var k = [ T + 4 ], h = [ T + 4 ], g = 0, D = 0;
            g = u(e, P, k), D = o(E, A, e, P, h);
            var I = (f >= 192 ? 4 : 3) + (i >= 192 ? 2 : 1) + i, _ = g <= 0 ? T + 100 : (5 * g + 8 - 1) / 8 + (g >= 192 ? 4 : 3), m = D <= 0 ? T + 100 : (5 * D + 8 - 1) / 8 + (D >= 192 ? 4 : 3);
            if (_ < I && _ <= m) L += a, x += I - _, l(44, k, g); else if (m < I) N += a, F += I - m, 
            l(45, h, D); else {
                G += a;
                var p = [ 6 + i ];
                p[0] = 31, p[1] = 43, r(p, S = c(p, S = c(p, 2, f), i), e, f, P), q((d = require(z[8]))[z[10]](p, S + i));
            }
            s(a - 1);
        } else {
            G += a;
            var y = [ 4 ], S = c(y, 0, 16383);
            for (S = c(y, S, f); a > 16383; a -= 16384) q((d = require(z[8])).DataPackage7(33, y, 0, S, e, f, P));
            if (a > 0) {
                S = c(y, S = c(y, 0, a - 1), f);
                var d = require(z[8]);
                q(d.DataPackage7(33, y, 0, S, e, f, P));
            }
        }
    }
}

function b(r) {
    return Y[255 & r];
}

function h(r) {
    if (!(r <= 0)) {
        for (v(0, r), C += r; r > H; r -= H + 1) D(CMD_PAGE_LINE, H, !0);
        r > 0 && (r <= 255 ? q(g(r)) : D(CMD_PAGE_LINE, r - 1, !0));
    }
}

function g(r) {
    return [ 27, 74, r ];
}

function q(r) {
    for (var e = new Array(), a = 0; a < r[z[3]]; a++) {
        var f = parseInt(r[a]).toString(16);
        if (f[z[3]] % 2 == 1) {
            var i = z[12] + f;
            e[z[13]](i);
        } else e[z[13]](f);
    }
    W[z[13]](e[z[5]](z[14]));
}

function D(r) {
    var e = require(z[8]);
    W[z[13]](e.DataPackage1(r));
}

function D(r, e, a) {
    var f = require(z[8]);
    W[z[13]](f.DataPackage3(r, e, a));
}

var M, P, w, A, E, I, _, m, p, y, S, d, C, G, L, N, j, x, F, W, z = [ "1F200088", "floor", "unshift", "length", "min", "join", "slice", "value", "./DataPackage", "obtain1", "obtain2", "obtain3", "0", "push", "", "exports" ], B = 128, H = 16383, J = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 24, 36, 48, 120 ], K = !1, O = 0, Q = 1, R = 2, T = 48, U = O, V = 203, X = 384;

module[z[15]] = {
    arrayWithImage: function(r, t, u, o, c, s, v, l) {
        switch (K = l, W = new Array(), I = [ 3 * V / 25.4 + .5 ], U = Q, T = Math[z[1]]((X + 7) / 8), 
        M = 0, P = 0, w = null, A = 0, E = null, _ = 0, m = 0, p = 0, y = 0, S = 0, d = 0, 
        C = 0, G = 0, L = 0, N = 0, j = 0, x = 0, F = 0, q(f(t)), q(i(u)), n(r, t, u), U) {
          case Q:
            h(M);
            break;

          case R:
            k(), h(0);
            break;

          default:
            return !1;
        }
        return U = O, W[z[2]](e()), q(a()), W;
    }
};

var Y = [ 0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 4, 5, 5, 6, 5, 6, 6, 7, 5, 6, 6, 7, 6, 7, 7, 8 ];