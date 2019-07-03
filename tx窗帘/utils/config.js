function o(o) {
    var t = [];
    for (var e in o) t.push(encodeURIComponent(e) + "=" + encodeURIComponent(o[e]));
    return t.join("&");
}

module.exports = {
    json2Form: o
}, module.exports = {
    httpGet: function(o, t, e) {
        wx.request({
            url: o,
            data: t,
            method: "GET",
            success: function(o) {
                e(o.data);
            },
            fail: function(o) {
                wx.showToast({
                    title: o.errMsg,
                    icon: "fail",
                    duration: 2e3
                });
            },
            error: function(o) {
                console.log(o);
            },
            complete: function(o) {}
        });
    },
    httpPost: function(t, e, n) {
        wx.request({
            url: t,
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
                Cookie: wx.getStorageSync("Cookie")
            },
            data: o(e),
            method: "POST",
            success: function(o) {
                n(o.data);
            },
            fail: function(o) {
                wx.showToast({
                    title: o.errMsg,
                    icon: "fail",
                    duration: 2e3
                });
            },
            complete: function(o) {}
        });
    }
};