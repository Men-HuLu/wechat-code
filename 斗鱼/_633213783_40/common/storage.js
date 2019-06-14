Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.default = {
    get: function(e) {
        var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        return new Promise(function(n, r) {
            if (t) wx.getStorage({
                key: e,
                success: function(e) {
                    return n(e);
                },
                fail: function(e) {
                    return r(e);
                }
            }); else try {
                wx.getStorageSync(e), n();
            } catch (e) {
                r(e);
            }
        });
    },
    set: function(e, t) {
        var n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
        return new Promise(function(r, c) {
            if (n) wx.setStorage({
                key: e,
                data: t,
                success: function(e) {
                    return r(e);
                },
                fail: function(e) {
                    return c(e);
                }
            }); else try {
                wx.setStorageSync(e, t), r();
            } catch (e) {
                c(e);
            }
        });
    },
    remove: function(e) {
        var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        return new Promise(function(n, r) {
            if (t) wx.removeStorage({
                key: e,
                success: function(e) {
                    return n(e);
                },
                fail: function(e) {
                    return r(e);
                }
            }); else try {
                wx.removeStorageSync(e), n();
            } catch (e) {
                r(e);
            }
        });
    },
    getAll: function() {
        var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
        return new Promise(function(t, n) {
            if (e) wx.getStorageInfo({
                success: function(e) {
                    return t(e);
                },
                fail: function(e) {
                    return n(e);
                }
            }); else try {
                var r = wx.getStorageInfoSync();
                t(r);
            } catch (e) {
                n(e);
            }
        });
    },
    clear: function() {
        var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
        return new Promise(function(t, n) {
            if (e) wx.clearStorage({
                success: function(e) {
                    return t(e);
                },
                fail: function(e) {
                    return n(e);
                }
            }); else try {
                wx.clearStorageSync(), t();
            } catch (e) {
                n(e);
            }
        });
    }
};