function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, n = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t;
    };
}(), o = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../config.js")), i = function() {
    function i(n) {
        var o = this;
        e(this, i);
        {
            if ("object" == (void 0 === n ? "undefined" : t(n))) {
                var r = {
                    data: {},
                    reqtype: void 0,
                    contentType: void 0,
                    path: ""
                };
                return "object" == (void 0 === n ? "undefined" : t(n)) && (r = Object.assign(r, n)), 
                new Promise(function(e, t) {
                    o.requestTask = o.ajax(r, e, t);
                });
            }
            console.log("请传入Object类型的参数");
        }
    }
    return n(i, [ {
        key: "ajax",
        value: function(e, t, n) {
            return wx.request({
                url: o.default.url + e.path,
                data: e.data,
                method: e.reqtype || "POST",
                header: {
                    "Content-Type": void 0 == e.contentType ? "application/x-www-form-urlencoded" : "application/json",
                    Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0YTJiZWRlMDZkOTE0OTIxOGFhMDQ0NzU2MTg4MTE0YTQ2NzMyMTE0Iiwic2NvcGUiOiJhY2Nlc3NfdG9rZW4iLCJpYXQiOjE1MjIxMjA1MDYsImV4cCI6MTUyNDI2Nzk5MH0.gbtccP_J_BH24BXX5XEq-Oq73-_MDjTroD6wAqZf7dM"
                },
                dataType: "JSON",
                success: function(e) {
                    console.log(e, "AJAX封装回调"), 200 == e.statusCode && ("string" == typeof (e = e.data) && "" != e && (e = JSON.parse(e.trim())), 
                    t(e));
                },
                fail: function(e) {
                    wx.hideLoading(), n(e);
                },
                complete: function(e) {}
            });
        }
    }, {
        key: "reqSucc",
        value: function(e) {}
    }, {
        key: "reqErr",
        value: function(e) {
            wx.hideLoading(), fail(res);
        }
    } ]), i;
}();

exports.default = i;