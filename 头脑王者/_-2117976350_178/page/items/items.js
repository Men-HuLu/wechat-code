var e = require("../../data/ItemsManager.js"), t = require("../../net/itemNet.js"), a = require("../../const/consts.js"), i = require("../../util/util.js"), l = require("../../util/ShakeController.js"), s = getApp();

Page({
    data: {
        notNull: !1,
        myItems: [],
        itemSelected: null,
        itemsFormFudai: null
    },
    onLoad: function(e) {
        i.showShareMenu(), this.shakeController = new l(this);
    },
    onReady: function() {},
    onShow: function() {
        var t = e.getItemInfos(), a = t && t.length > 0;
        this.setData({
            myItems: t,
            notNull: a
        });
    },
    onHide: function() {},
    onUnload: function() {
        this.shakeController.stop(), e.allClearNewItemCount();
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(e) {
        var t = s.shareManager.getCompareShareData("items");
        return s.shareConf(t);
    },
    getSelectedItem: function(t) {
        var a = e.getItemDetail(t);
        return a.num > 0 ? (a.callback_back_clicked = "callback_back_clicked", a.callback_use_clicked = "callback_use_clicked", 
        a) : null;
    },
    callback_item_clicked: function(t) {
        var a = this, i = t.currentTarget.dataset.id;
        e.clearNewItemCount(i);
        var l = e.getItemInfos(), s = this.getSelectedItem(i);
        this.setData({
            itemSelected: s,
            myItems: l
        }), this.isGoldBag(i) && this.data.itemSelected.num > 0 && this.shakeController.shake(function() {
            a.tryUse(!1);
            var e = {};
            e["itemSelected.ani_form"] = "shake-Z", a.setData(e), setTimeout(function() {
                if (a.data.itemSelected) {
                    var e = {};
                    e["itemSelected.ani_form"] = "", a.setData(e);
                }
            }, 1e3);
        });
    },
    isGoldBag: function(e) {
        return e >= 202001 && e <= 202006;
    },
    tryUse: function(l) {
        var n = this;
        if (this.data && this.data.itemSelected && !this.data.isSending) {
            var c = this.data.itemSelected;
            this.setData({
                isSending: !0
            }), this.isGoldBag(c.id) && (l = !1), console.log("use" + c.id), t.use(c.id, function(t, o) {
                if (setTimeout(function() {
                    n.setData({
                        isSending: !1
                    });
                }, 200), t) i.ShowToast("物品使用失败"); else {
                    e.subItem(c.id, 1);
                    var d = {};
                    switch (c.typeId) {
                      case a.ItemType.buff:
                        i.ShowToast("使用成功"), s.mainData.role.buff || (s.mainData.role.buff = {}), s.mainData.role.buff["" + c.selfId] = o.Buff.curVal;
                        break;

                      case a.ItemType.luckyBag:
                        for (var u = [], r = 0; r < o.items.length; r++) {
                            var m = o.items[r];
                            e.addItem(m.itemId, m.itemNum);
                            for (var f = null, h = 0; h < u.length; h++) {
                                var k = u[h];
                                if (k.id == m.itemId) {
                                    f = k;
                                    break;
                                }
                            }
                            if (f) f.num += m.itemNum; else {
                                if (f = e.getItemDetail(m.itemId), f.num = m.itemNum, 4 == f.typeId) {
                                    var g = Math.floor((f.selfId - 1) / 5);
                                    f.color = a.book_color[g];
                                }
                                u.push(f);
                            }
                        }
                        n.fudai = c;
                        var I = {
                            items: u,
                            fudai_id: c.id,
                            fudai_name: c.name,
                            callback_fudaiBack_clicked: "callback_fudaiBack_clicked"
                        };
                        d.itemsFormFudai = I;
                        break;

                      case a.ItemType.exchange:
                        var S = o.gold;
                        wx.showToast({
                            title: "王者币+" + S,
                            duration: 1e3
                        }), s.updateGold(s.mainData.role.gold + S);
                    }
                    var _ = e.getItemInfos();
                    d.myItems = _, d.notNull = _ && _.length > 0, d.itemSelected = l ? null : n.getSelectedItem(n.data.itemSelected.id), 
                    n.setData(d);
                }
            });
        }
    },
    callback_use_clicked: function() {
        this.tryUse(!0);
    },
    callback_back_clicked: function() {
        this.data.isSending || (this.setData({
            itemSelected: null
        }), this.shakeController.stop());
    },
    callback_fudaiBack_clicked: function() {
        this.fudai && (this.fudai = this.getSelectedItem(this.fudai.id), this.setData({
            itemsFormFudai: null,
            itemSelected: this.fudai
        }));
    }
});