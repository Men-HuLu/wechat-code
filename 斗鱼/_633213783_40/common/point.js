function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
}, r = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), o = e(require("./httpClient")), a = e(require("../config/index")), i = getApp(), u = function() {
    function e() {
        t(this, e);
    }
    return r(e, [ {
        key: "postPoint",
        value: function(e, t) {
            var r = this, u = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0, l = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
            this.userInfo || (this.userInfo = wx.getStorageSync("dyUserInfo"));
            try {
                var c = new Date();
                setTimeout(function() {
                    i.getToken(function(f) {
                        var s = [ {
                            dateline: "",
                            i: r.userInfo.uid || 0,
                            d: f.hashOid,
                            ip: "",
                            rid: u,
                            ct: "mpro",
                            pro: i.globalData.systemInfo.platform || "",
                            av: "",
                            ac: e,
                            pc: t,
                            u: "",
                            rpc: "",
                            ru: "",
                            pt: c.getTime(),
                            oct: c.getTime(),
                            net: i.globalData.network_type,
                            up: "",
                            dur: 0,
                            e: n({
                                openid: f.hashOid,
                                unionid: i.globalData.unionid,
                                mtype: a.default.MT
                            }, l)
                        } ];
                        o.default.request({
                            url: i.globalData.$SYS.dotServer,
                            method: "POST",
                            data: {
                                multi: JSON.stringify(s),
                                v: 1.5
                            }
                        });
                    });
                }, 200);
            } catch (e) {
                console.log(e);
            }
        }
    } ]), e;
}();

exports.default = new u();