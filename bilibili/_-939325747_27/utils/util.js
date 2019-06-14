var t = require("../utils/xmlParse/dom-parser"), e = require("../utils/md5"), r = function(t) {
    return (t = t.toString())[1] ? t : "0" + t;
};

module.exports = {
    formatTime: function(t) {
        var e = t.getFullYear(), n = t.getMonth() + 1, u = t.getDate(), s = t.getHours(), i = t.getMinutes(), a = t.getSeconds();
        return [ e, n, u ].map(r).join("/") + " " + [ s, i, a ].map(r).join(":");
    },
    xml2Obj: function(e) {
        for (var r = [], n = {}, u = new t.DOMParser().parseFromString(e).getElementsByTagName("d"), s = 0; u[s]; ) u[s].attributes[0].value.split(","), 
        n.text = u[s].firstChild.data, n.color = "#ffffff", n.time = s, r.push(n), n = {}, 
        s++;
        return r;
    },
    splitData: function(t) {
        for (var e = [], r = 0; r < t.length; r += 10) e.push(t.slice(r, r + 10));
        return e;
    },
    getTime: function() {
        var t = new Date();
        return t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate();
    },
    setToken: function() {
        var t = "bilibili_" + Date.parse(new Date()) / 1e3;
        return e.hexMD5(t);
    },
    getNetWorkType: function() {
        return new Promise(function(t, e) {
            wx.getNetworkType({
                success: function(e) {
                    t(e);
                },
                fail: function() {
                    e();
                }
            });
        });
    },
    strLen: function(t) {
        var e = 0, r = [], n = [], u = t.replace(/\s+/g, "");
        if ("" === u) return e;
        for (var s = 0; s < u.length; s++) u.substr(s, 1).charCodeAt(0) > 255 ? e += 2 : e++, 
        e <= 34 ? r.push(u.substr(s, 1)) : e <= 68 && n.push(u.substr(s, 1));
        return n.length && 68 === e && n.push("..."), {
            str1: r,
            str2: n
        };
    }
};