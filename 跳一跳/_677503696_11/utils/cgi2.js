function e(e, o, t) {
    return e + (e.indexOf("?") > -1 ? "&" : "?") + o + "=" + t;
}

function o(e) {
    for (var o = void 0; o = e.shift(); ) n(o);
}

function t(e) {
    r.session_id = e;
}

function n(n) {
    if (p >= 5) h.push(n); else {
        var i = n.success, s = n.fail, a = n.complete, l = f + n.url;
        l = e(l, "session_id", r.session_id), p++, wx.request({
            url: l,
            data: n.data || {},
            header: n.header || {},
            method: (n.method || "GET").toUpperCase(),
            dataType: n.dataType || "json",
            success: function(e) {
                if (200 === e.statusCode) {
                    var o = e.data;
                    if (o.err_code === u && (t(""), n.retry >= 0)) return void c(n);
                    "function" == typeof i && i(o);
                } else "function" == typeof s && s();
            },
            fail: function(e) {
                "function" == typeof s && s();
            },
            complete: function() {
                "function" == typeof a && a(), p = Math.max(p - 1, 0), o(h);
            }
        });
    }
}

function i() {
    a = !0, l--, wx.login({
        success: function(e) {
            console.log("wx login succ"), a = !1, n({
                url: "/wxastore/loginfromc?code=" + e.code + "&appid=" + r.selfAppid + "&real_appid=" + r.storeAppid,
                success: function(e) {
                    0 === e.err_code ? (console.log("loginfromc success"), t(e.session_id), o(d)) : console.log("loginfromc err_code:" + e.err_code);
                },
                fail: function() {
                    console.log("loginfromc fail");
                }
            });
        },
        fail: function(e) {
            if (console.log("wx login fail", e), a = !1, l) i(); else for (var o = void 0; o = d.shift(); ) "function" == typeof o.fail && o.fail();
        }
    });
}

function s() {
    return !!r.session_id || (a || i(), !1);
}

function c(e) {
    void 0 === e.retry && (e.retry = 1), e.retry < 0 || (e.retry--, s() ? n(e) : d.push(e));
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.get = function(e) {
    e.method = "GET", e.header = e.header || {
        "content-type": "application/json"
    }, c(e);
}, exports.post = function(e) {
    e.method = "POST", e.header = e.header || {
        "content-type": "application/x-www-form-urlencoded"
    }, c(e);
};

var r = getApp().globalData, f = "https://mp.weixin.qq.com", a = !1, l = 2, u = -5, d = [], p = 0, h = [];