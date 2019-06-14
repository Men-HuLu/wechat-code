var t = require("../lib/config.js").appid, e = function(t) {
    return (t = t.toString())[1] ? t : "0" + t;
};

module.exports = {
    formatTime: function(t) {
        var n = t.getFullYear(), r = t.getMonth() + 1, o = t.getDate(), a = t.getHours(), i = t.getMinutes(), u = t.getSeconds();
        return [ n, r, o ].map(e).join("/") + " " + [ a, i, u ].map(e).join(":");
    },
    formatDistance: function(t) {
        return t < 10 ? "<10m" : t < 1e3 ? parseInt(t) + "m" : (t / 1e3).toFixed(1) + "km";
    },
    showToast: function(t, e) {
        wx.showToast({
            title: t,
            icon: e || "none"
        });
    },
    generateBig: function() {
        for (var t = [], e = 0; e < 26; e++) t.push(String.fromCharCode("A".charCodeAt(0) + e));
        return t;
    },
    getStorageSync: function(e) {
        try {
            return wx.getStorageSync(t + "_" + e);
        } catch (t) {
            return console.log("getStorageSync " + e + " failed"), null;
        }
    },
    setStorageSync: function(e, n) {
        try {
            wx.setStorageSync(t + "_" + e, n);
        } catch (t) {
            console.log("setStorageSync " + e + " failed");
        }
    },
    copy: function(t) {
        return t = t || {}, JSON.parse(JSON.stringify(t));
    },
    compareVersion: function(t, e) {
        t = t.split("."), e = e.split(".");
        for (var n = Math.max(t.length, e.length); t.length < n; ) t.push("0");
        for (;e.length < n; ) e.push("0");
        for (var r = 0; r < n; r++) {
            var o = parseInt(t[r]), a = parseInt(e[r]);
            if (o > a) return 1;
            if (o < a) return -1;
        }
        return 0;
    },
    addQueryString: function(t, e, n) {
        return t + (t.indexOf("?") > -1 ? "&" : "?") + e + "=" + n;
    },
    getNow: function() {
        return parseInt(Date.now() / 1e3);
    }
};