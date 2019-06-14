var e = require("./../../../net/roleNet.js"), n = require("./../../../util/util.js"), t = require("./../../../data/ItemsManager.js");

Page({
    data: {
        stageList: []
    },
    onLoad: function(a) {
        var o = this;
        e.ListSeasonReward(function(e, a) {
            if (e) console.warn("ListSeasonReward err", e); else {
                var i = [];
                for (var r in a) {
                    var s = a[r];
                    s.id = r;
                    var u = n.GetMatchInfo(s.id);
                    s.matchName = u.name;
                    for (var c = 0; c < s.items.length; c++) {
                        var f = s.items[c], d = t.getItemDetail(f.itemId);
                        f.name = d.name;
                    }
                    i.push(s);
                }
                i.sort(function(e, n) {
                    return n.id - e.id;
                }), o.setData({
                    stageList: i
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});