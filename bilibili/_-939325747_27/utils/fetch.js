var t = getApp();

module.exports = {
    fetch: function(t) {
        var e = t.url, n = t.type, c = t.data, o = t.header;
        return new Promise(function(t, i) {
            wx.request({
                url: e,
                data: c || {},
                method: n || "GET",
                header: o || {},
                success: function(e) {
                    t(e);
                },
                fail: function() {
                    i();
                },
                complete: function() {}
            });
        });
    },
    fetchImg: function(t) {
        var e = /https/g.test(t) ? t : t.replace(/http/g, "https");
        return new Promise(function(t, n) {
            wx.getImageInfo({
                src: e,
                success: function(e) {
                    t(e);
                },
                fail: function() {
                    n();
                }
            });
        });
    },
    reportbili: function(e) {
        var n = new Date().getTime(), c = "001479" + n + n + "|" + e.join("|") + "|" + t.globalData.wx_uid;
        wx.request({
            url: "https://dataflow.biliapi.com/log/web?" + c,
            method: "GET",
            header: {},
            success: function(t) {},
            fail: function() {
                reject();
            },
            complete: function() {}
        });
    }
};