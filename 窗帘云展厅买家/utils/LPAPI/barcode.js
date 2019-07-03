function t(t) {
    for (var r = [], i = 0; i < t.length; i++) r.push(t.charCodeAt(i));
    return r;
}

function r(r) {
    var g = {
        currcs: d.C
    }, A = t(r), B = A[0] == h ? 1 : 0, v = A.length > 0 ? s(A[B++]) : d.AB, C = A.length > 0 ? s(A[B++]) : d.AB;
    g.currcs = function(t, r) {
        var i = 0;
        return i += t == d.A ? 1 : 0, i += t == d.B ? -1 : 0, i += r == d.A ? 1 : 0, (i += r == d.B ? -1 : 0) > 0 ? d.A : d.B;
    }(v, C), g.currcs = function(t, r) {
        for (var i = 0; i < t.length; i++) {
            var e = t[i];
            if ((e < 48 || e > 57) && e != h) return r;
        }
        return d.C;
    }(A, g.currcs);
    var _ = new Array();
    switch (g.currcs) {
      case d.A:
        _.push(n);
        break;

      case d.B:
        _.push(c);
        break;

      default:
        _.push(a);
    }
    for (var w = 0; w < A.length; w++) {
        var b = A[w];
        b in p && (_.push(p[b]), b = A[++w]);
        var R = A.length > w + 1 ? A[w + 1] : -1;
        _ = _.concat(function(t, r, s) {
            var h = [], n = -1;
            if (e(t, s)) s == d.C && (-1 == r ? (n = o, s = d.B) : -1 == r || e(r, s) || (e(r, d.A) ? (n = f, 
            s = d.A) : (n = o, s = d.B))); else if (-1 == r || e(r, s)) n = u; else switch (s) {
              case d.A:
                n = o, s = d.B;
                break;

              case d.B:
                n = f, s = d.A;
            }
            return -1 != n ? (h.push(n), h.push(i(r))) : s == d.C ? h.push(i(t, r)) : h.push(i(t)), 
            g.currcs = s, h;
        }(b, R, g.currcs)), g.currcs == d.C && w++;
    }
    for (var I = _[0], y = 1; y < _.length; y++) I += y * _[y];
    return _.push(I % 103), _.push(l), _;
}

function i(t, r) {
    return void 0 === r ? t >= 32 ? t - 32 : t + 64 : parseInt(String.fromCharCode(t) + String.fromCharCode(r));
}

function e(t, r) {
    var i = s(t);
    return i == d.ANY || (i == d.AB || (i == d.A && r == d.A || i == d.B && r == d.B));
}

function s(t) {
    return t >= 48 && t <= 57 ? d.ANY : t >= 32 && t <= 95 ? d.AB : t < 32 ? d.A : d.B;
}

var h = 126, n = 103, c = 104, a = 105, u = 98, f = 101, o = 100, l = 106, p = {
    CHAR_TILDE: 102
}, d = {
    ANY: 1,
    AB: 2,
    A: 3,
    B: 4,
    C: 5
};

exports.code128 = function(t, i, e, s, h, n) {
    e = parseInt(e), s = parseInt(s), h = parseInt(h), n = parseInt(n);
    for (var c = r(i), a = new g(t, h, n), u = a.area.width / (11 * (c.length - 3) + 35), f = a.area.left, o = a.area.top, l = 0; l < c.length; l++) for (var p = c[l], d = 0; d < 8; d += 2) {
        var B = A[p][d] * u, v = n - o, C = A[p][d + 1] * u;
        B > 0 && a.fillFgRect(e + f, s + o, B, v), f += B + C;
    }
};

var g = function(t, r, i) {
    this.width = r, this.height = i, this.quiet = Math.round(this.width / 40), this.border_size = 0, 
    this.padding_width = 0, this.area = {
        width: r - 2 * this.padding_width - 2 * this.quiet,
        height: i - 2 * this.border_size,
        top: this.border_size - 4,
        left: this.padding_width + this.quiet
    }, this.ctx = t, this.fg = "#000000", this.bg = "#ffffff", this.fillBgRect(0, 0, r, i), 
    this.fillBgRect(0, this.border_size, r, i - 2 * this.border_size);
};

g.prototype._fillRect = function(t, r, i, e, s) {
    this.ctx.setFillStyle(s), this.ctx.fillRect(t, r, i, e);
}, g.prototype.fillFgRect = function(t, r, i, e) {
    this._fillRect(t, r, i, e, this.fg);
}, g.prototype.fillBgRect = function(t, r, i, e) {
    this._fillRect(t, r, i, e, this.bg);
};

var A = [ [ 2, 1, 2, 2, 2, 2, 0, 0 ], [ 2, 2, 2, 1, 2, 2, 0, 0 ], [ 2, 2, 2, 2, 2, 1, 0, 0 ], [ 1, 2, 1, 2, 2, 3, 0, 0 ], [ 1, 2, 1, 3, 2, 2, 0, 0 ], [ 1, 3, 1, 2, 2, 2, 0, 0 ], [ 1, 2, 2, 2, 1, 3, 0, 0 ], [ 1, 2, 2, 3, 1, 2, 0, 0 ], [ 1, 3, 2, 2, 1, 2, 0, 0 ], [ 2, 2, 1, 2, 1, 3, 0, 0 ], [ 2, 2, 1, 3, 1, 2, 0, 0 ], [ 2, 3, 1, 2, 1, 2, 0, 0 ], [ 1, 1, 2, 2, 3, 2, 0, 0 ], [ 1, 2, 2, 1, 3, 2, 0, 0 ], [ 1, 2, 2, 2, 3, 1, 0, 0 ], [ 1, 1, 3, 2, 2, 2, 0, 0 ], [ 1, 2, 3, 1, 2, 2, 0, 0 ], [ 1, 2, 3, 2, 2, 1, 0, 0 ], [ 2, 2, 3, 2, 1, 1, 0, 0 ], [ 2, 2, 1, 1, 3, 2, 0, 0 ], [ 2, 2, 1, 2, 3, 1, 0, 0 ], [ 2, 1, 3, 2, 1, 2, 0, 0 ], [ 2, 2, 3, 1, 1, 2, 0, 0 ], [ 3, 1, 2, 1, 3, 1, 0, 0 ], [ 3, 1, 1, 2, 2, 2, 0, 0 ], [ 3, 2, 1, 1, 2, 2, 0, 0 ], [ 3, 2, 1, 2, 2, 1, 0, 0 ], [ 3, 1, 2, 2, 1, 2, 0, 0 ], [ 3, 2, 2, 1, 1, 2, 0, 0 ], [ 3, 2, 2, 2, 1, 1, 0, 0 ], [ 2, 1, 2, 1, 2, 3, 0, 0 ], [ 2, 1, 2, 3, 2, 1, 0, 0 ], [ 2, 3, 2, 1, 2, 1, 0, 0 ], [ 1, 1, 1, 3, 2, 3, 0, 0 ], [ 1, 3, 1, 1, 2, 3, 0, 0 ], [ 1, 3, 1, 3, 2, 1, 0, 0 ], [ 1, 1, 2, 3, 1, 3, 0, 0 ], [ 1, 3, 2, 1, 1, 3, 0, 0 ], [ 1, 3, 2, 3, 1, 1, 0, 0 ], [ 2, 1, 1, 3, 1, 3, 0, 0 ], [ 2, 3, 1, 1, 1, 3, 0, 0 ], [ 2, 3, 1, 3, 1, 1, 0, 0 ], [ 1, 1, 2, 1, 3, 3, 0, 0 ], [ 1, 1, 2, 3, 3, 1, 0, 0 ], [ 1, 3, 2, 1, 3, 1, 0, 0 ], [ 1, 1, 3, 1, 2, 3, 0, 0 ], [ 1, 1, 3, 3, 2, 1, 0, 0 ], [ 1, 3, 3, 1, 2, 1, 0, 0 ], [ 3, 1, 3, 1, 2, 1, 0, 0 ], [ 2, 1, 1, 3, 3, 1, 0, 0 ], [ 2, 3, 1, 1, 3, 1, 0, 0 ], [ 2, 1, 3, 1, 1, 3, 0, 0 ], [ 2, 1, 3, 3, 1, 1, 0, 0 ], [ 2, 1, 3, 1, 3, 1, 0, 0 ], [ 3, 1, 1, 1, 2, 3, 0, 0 ], [ 3, 1, 1, 3, 2, 1, 0, 0 ], [ 3, 3, 1, 1, 2, 1, 0, 0 ], [ 3, 1, 2, 1, 1, 3, 0, 0 ], [ 3, 1, 2, 3, 1, 1, 0, 0 ], [ 3, 3, 2, 1, 1, 1, 0, 0 ], [ 3, 1, 4, 1, 1, 1, 0, 0 ], [ 2, 2, 1, 4, 1, 1, 0, 0 ], [ 4, 3, 1, 1, 1, 1, 0, 0 ], [ 1, 1, 1, 2, 2, 4, 0, 0 ], [ 1, 1, 1, 4, 2, 2, 0, 0 ], [ 1, 2, 1, 1, 2, 4, 0, 0 ], [ 1, 2, 1, 4, 2, 1, 0, 0 ], [ 1, 4, 1, 1, 2, 2, 0, 0 ], [ 1, 4, 1, 2, 2, 1, 0, 0 ], [ 1, 1, 2, 2, 1, 4, 0, 0 ], [ 1, 1, 2, 4, 1, 2, 0, 0 ], [ 1, 2, 2, 1, 1, 4, 0, 0 ], [ 1, 2, 2, 4, 1, 1, 0, 0 ], [ 1, 4, 2, 1, 1, 2, 0, 0 ], [ 1, 4, 2, 2, 1, 1, 0, 0 ], [ 2, 4, 1, 2, 1, 1, 0, 0 ], [ 2, 2, 1, 1, 1, 4, 0, 0 ], [ 4, 1, 3, 1, 1, 1, 0, 0 ], [ 2, 4, 1, 1, 1, 2, 0, 0 ], [ 1, 3, 4, 1, 1, 1, 0, 0 ], [ 1, 1, 1, 2, 4, 2, 0, 0 ], [ 1, 2, 1, 1, 4, 2, 0, 0 ], [ 1, 2, 1, 2, 4, 1, 0, 0 ], [ 1, 1, 4, 2, 1, 2, 0, 0 ], [ 1, 2, 4, 1, 1, 2, 0, 0 ], [ 1, 2, 4, 2, 1, 1, 0, 0 ], [ 4, 1, 1, 2, 1, 2, 0, 0 ], [ 4, 2, 1, 1, 1, 2, 0, 0 ], [ 4, 2, 1, 2, 1, 1, 0, 0 ], [ 2, 1, 2, 1, 4, 1, 0, 0 ], [ 2, 1, 4, 1, 2, 1, 0, 0 ], [ 4, 1, 2, 1, 2, 1, 0, 0 ], [ 1, 1, 1, 1, 4, 3, 0, 0 ], [ 1, 1, 1, 3, 4, 1, 0, 0 ], [ 1, 3, 1, 1, 4, 1, 0, 0 ], [ 1, 1, 4, 1, 1, 3, 0, 0 ], [ 1, 1, 4, 3, 1, 1, 0, 0 ], [ 4, 1, 1, 1, 1, 3, 0, 0 ], [ 4, 1, 1, 3, 1, 1, 0, 0 ], [ 1, 1, 3, 1, 4, 1, 0, 0 ], [ 1, 1, 4, 1, 3, 1, 0, 0 ], [ 3, 1, 1, 1, 4, 1, 0, 0 ], [ 4, 1, 1, 1, 3, 1, 0, 0 ], [ 2, 1, 1, 4, 1, 2, 0, 0 ], [ 2, 1, 1, 2, 1, 4, 0, 0 ], [ 2, 1, 1, 2, 3, 2, 0, 0 ], [ 2, 3, 3, 1, 1, 1, 2, 0 ] ];