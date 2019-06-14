var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, n = require("./../../../data/ItemsManager.js"), a = require("./../../../util/util.js"), t = require("./../../../data/SpecialData.js");

Page({
    data: {
        des: "",
        animates: {},
        awardConfig: []
    },
    onLoad: function() {
        a.showShareMenu();
    },
    onShow: function() {
        this.loadRewardConfig(t.data);
    },
    loadRewardConfig: function(a) {
        for (var t = a.award, o = [], i = 0; i < t.length; i++) {
            var r = t[i], d = n.getItemDetail(r.itemId), s = {};
            s.description = "object" === (void 0 === d ? "undefined" : e(d)) ? d.name + "x" + r.itemNum : "未知", 
            s.name = r.beginRank.toString(), s.icon = "", 1 === r.beginRank && 1 === r.endRank && (s.icon = "icon_gold"), 
            2 === r.beginRank && 2 === r.endRank && (s.icon = "icon_silver"), 3 === r.beginRank && 3 === r.endRank && (s.icon = "icon_brass"), 
            s.imgUrl = n.getItemUrl(r.itemId), r.endRank - r.beginRank > 0 && (s.name += "-" + r.endRank), 
            o.push(s);
        }
        this.setData({
            awardConfig: o,
            des: a.des
        });
    },
    onShareAppMessage: function() {
        var e = getApp(), n = e.shareManager.getSpecialShareData(t.isZjwMath());
        return e.shareConf(n);
    }
});