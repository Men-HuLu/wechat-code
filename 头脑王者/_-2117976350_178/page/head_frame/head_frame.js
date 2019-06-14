var a = require("./../../net/roleNet.js"), e = require("./../../net/shopNet.js"), t = require("./../../util/util.js"), i = (require("./../../const/consts.js"), 
require("./../../data/ItemsManager.js")), n = getApp();

Page({
    data: {},
    onLoad: function(a) {
        t.showShareMenu();
    },
    onReady: function() {},
    onShow: function() {
        var e = this;
        a.headList(function(a, i) {
            e.btnLock = !1, a ? t.ShowConfirm(a.errCode, a.errMsg, function() {}) : (0 == t.getShopClosedDesc().length ? e.exList = i.exList || [] : e.exList = [], 
            e.dataList = i.list, e.initData(e.dataList, e.exList));
        });
    },
    initData: function(a) {
        a = a && a.length > 0 ? a : [];
        var e = this.getFrameNotOwen(a);
        e = e.concat(a);
        var i = {};
        i.headList = e;
        for (var d = !1, r = 0; r < i.headList.length; r++) {
            var s = i.headList[r];
            s.id == n.mainData.role.headId ? (s.selected = !0, d = !0) : s.selected = !1, s.expiredAt > 0 && (s.textExpiredAt = "使用期限：" + t.formatTime_ddhhmm(s.expiredAt));
        }
        i.headList.length > 0 && i.headList.unshift({
            id: 0,
            name: "无头像框",
            desc: "就喜欢这种纯粹",
            type: 0,
            expiredAt: 0
        }), i.headList.sort(function(a, e) {
            var t = ~~a.notOwn - ~~e.notOwn;
            return 0 == t && (t = a.id - e.id), t;
        }), i.usingHead = this.getHeadInfo(i.headList, n.mainData.role.headId), i.usingHead ? i.curHead = i.usingHead : !d && i.headList.length > 0 && (i.headList[0].selected = !0, 
        i.curHead = i.headList[0]), i.avatarUrl = n.mainData.role.userInfo.avatarUrl, this.setData(i);
    },
    getFrameNotOwen: function(a) {
        for (var e = [], i = 0; i < this.exList.length; i++) {
            for (var n = this.exList[i], d = !1, r = 0; r < a.length; r++) if (a[r].id == n.itemId) {
                d = !0;
                break;
            }
            if (!d) {
                var s = {};
                (s = t.assign(s, n)).notOwn = 1, s.id = s.itemId, e.push(s);
            }
        }
        return e;
    },
    getHeadInfo: function(a, e) {
        for (var t = 0; t < a.length; t++) {
            var i = a[t];
            if (i.id == e) return i;
        }
        return null;
    },
    callback_item_clicked: function(a) {
        for (var e = a.currentTarget.dataset.hid, t = this.data.headList, i = 0; i < t.length; i++) {
            var n = t[i];
            n.selected = n.id == e;
        }
        var d = {};
        d.headList = t, d.curHead = this.getHeadInfo(this.data.headList, e), this.setData(d);
    },
    callback_btnUse_clicked: function() {
        var e = this;
        a.useHead(this.data.curHead.id, function(a, i) {
            if (e.btnLock = !1, a) t.ShowConfirm(a.errCode, a.errMsg, function() {}); else {
                var d = {};
                d.usingHead = e.data.curHead, e.setData(d), n.mainData.role.headId = e.data.curHead.id, 
                n.eventDispatcher.dispatchEventWith("onHeadFrameChanged");
            }
        });
    },
    callback_btnExchange_clicked: function() {
        var a = this;
        if (!this.btnLock) {
            this.btnLock = !0;
            var d = this.data.curHead.price;
            1 == this.data.curHead.onsale && this.checkOnsale(this.data.curHead) && (d = this.data.curHead.cost), 
            0 == this.data.curHead.type && n.mainData.role.gold < d ? (t.ShowToast("金币不足"), 
            this.btnLock = !1) : 1 == this.data.curHead.type && n.mainData.role.diamond < d ? (t.ShowToast("钻石不足"), 
            this.btnLock = !1) : e.exchange(this.data.curHead.exId, function(e, d) {
                if (a.btnLock = !1, e) t.ShowConfirm("兑换失败", e.errMsg, null); else {
                    var r = d.diamond;
                    n.updateDiamond(r);
                    var s = d.gold;
                    n.updateGold(s);
                    var o = n.mainData.role.allSeeds.itemConfs[d.itemId];
                    t.ShowToast("兑换成功，获得" + o.name + a.data.curHead.itemNum), i.addItem(a.data.curHead.itemId, a.data.curHead.itemNum);
                    var h = {};
                    h["curHead.notOwn"] = !1;
                    for (var c = a.data.headList, u = 0; u < c.length; u++) if (c[u].id == a.data.curHead.id) {
                        h["headList[" + u + "].notOwn"] = !1;
                        break;
                    }
                    a.setData(h);
                }
            });
        }
    },
    onHide: function() {},
    onUnload: function() {
        t.setStorageSync("newHeadFrame", {});
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var a = n.shareManager.getCompareShareData("cover");
        return n.shareConf(a);
    }
});