function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var a = t[n];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(t, n, a) {
        return n && e(t.prototype, n), a && e(t, a), t;
    };
}(), n = require("./../const/consts.js"), a = require("./../util/util.js"), o = require("./../const/modeConsts.js"), r = require("./../net/shopNet.js"), i = void 0, s = function() {
    function s() {
        e(this, s);
        var t = a.getStorageSync("newItem"), n = a.getStorageSync("newKnowledge");
        this.newItem = t || {}, this.newKnowledge = n || {};
    }
    return t(s, [ {
        key: "init",
        value: function(e) {
            i = e;
        }
    }, {
        key: "test_initSeeds",
        value: function() {
            i.mainData.role.allSeeds.itemConfs = {
                201004: {
                    id: 201004,
                    type: "福袋",
                    typeId: 1,
                    selfId: 4,
                    name: "大福袋",
                    desc: "使用后能够开出6件随机物品"
                },
                202001: {
                    id: 202001,
                    type: "兑换品",
                    typeId: 2,
                    selfId: 1,
                    name: "一袋王者币",
                    desc: "使用后获得100王者币"
                }
            };
        }
    }, {
        key: "hasAnyItems",
        value: function() {
            var e = i.mainData.role.items;
            if (e) for (var t in e) return !0;
            return !1;
        }
    }, {
        key: "hasAnyKnowledge",
        value: function() {
            if (i.mainData.role.knowInfo) for (var e in i.mainData.role.knowInfo) {
                if (i.mainData.role.knowInfo[e].level > 0) return !0;
                if (i.mainData.role.items) {
                    var t = this.getBookSeedIDBySelfId(e);
                    if ((i.mainData.role.items[t] || 0) > 0) return !0;
                }
            }
            return !1;
        }
    }, {
        key: "getItemInfos",
        value: function() {
            var e = [];
            for (var t in i.mainData.role.items) {
                var a = i.mainData.role.items[t] || 0, o = i.mainData.role.allSeeds.itemConfs[t];
                if (o) {
                    var r = o.typeId;
                    a > 0 && r > n.ItemType.gold && r < n.ItemType.book && e.push({
                        id: t,
                        num: a,
                        name: o.name,
                        desc: o.desc,
                        newCount: this.getNewItemCount(t)
                    });
                }
            }
            return e;
        }
    }, {
        key: "getItemDetail",
        value: function(e) {
            var t = {};
            t.num = i.mainData.role.items[e] || 0;
            var n = i.mainData.role.allSeeds.itemConfs[e];
            return t = a.assign(t, n);
        }
    }, {
        key: "getBookSeedIDBySelfId",
        value: function(e) {
            for (var t in i.mainData.role.allSeeds.itemConfs) {
                var a = i.mainData.role.allSeeds.itemConfs[t];
                if (a.selfId == e && a.typeId == n.ItemType.book) return a.id;
            }
            return 0;
        }
    }, {
        key: "getItemCount",
        value: function(e) {
            var t = i.mainData.role.items;
            return t && t[e] > 0 ? t[e] : 0;
        }
    }, {
        key: "subItem",
        value: function(e, t) {
            var n = i.mainData.role.items[e] || 0;
            i.mainData.role.items[e] = Math.max(0, n - t);
        }
    }, {
        key: "addItem",
        value: function(e, t) {
            if (2e5 != e) if (200001 != e) {
                i.mainData.role.items || (i.mainData.role.items = {});
                var a = i.mainData.role.items[e] || 0;
                i.mainData.role.items[e] = a ? a + t : t, i.mainData.role.allSeeds.itemConfs[e].typeId == n.ItemType.headframe ? this.refreshNewFrameFlag() : (this.addNewItemCount(e, t), 
                i.eventDispatcher.dispatchEventWith("onHasNewItem"));
            } else i.updateMindRoll(i.mainData.role.mindRoll + t); else i.updateGold(i.mainData.role.gold + t);
        }
    }, {
        key: "getNewItemCount",
        value: function(e) {
            return ~~this.newItem[e];
        }
    }, {
        key: "getNewKnowledgeCount",
        value: function(e) {
            return ~~this.newKnowledge[e];
        }
    }, {
        key: "addNewItemCount",
        value: function(e, t) {
            if (2e5 != e && !(t <= 0)) {
                var o = this.getItemDetail(e);
                o && (o.typeId == n.ItemType.book ? (this.newKnowledge[e] ? this.newKnowledge[e] += t : this.newKnowledge[e] = t, 
                a.setStorageSync("newKnowledge", this.newKnowledge)) : (this.newItem[e] ? this.newItem[e] += t : this.newItem[e] = t, 
                a.setStorageSync("newItem", this.newItem)));
            }
        }
    }, {
        key: "clearNewItemCount",
        value: function(e) {
            if (2e5 != e && 200001 != e) {
                var t = this.getItemDetail(e);
                t && (t.typeId == n.ItemType.book ? (delete this.newKnowledge[e], a.setStorageSync("newKnowledge", this.newKnowledge)) : (delete this.newItem[e], 
                a.setStorageSync("newItem", this.newItem)));
            }
        }
    }, {
        key: "allClearNewItemCount",
        value: function() {
            this.newItem = {}, a.setStorageSync("newItem", this.newItem);
        }
    }, {
        key: "allClearNewKnowledgeCount",
        value: function() {
            this.newKnowledge = {}, a.setStorageSync("newKnowledge", this.newKnowledge);
        }
    }, {
        key: "getKnowInfos",
        value: function() {
            for (var e = ~~i.getGameConf(n.gameConf.knowMaxLevel), t = [], o = 0; o < 6; o++) {
                var r = {};
                switch (o) {
                  case 0:
                    r.title = "文科", r.color = n.book_color[o];
                    break;

                  case 1:
                    r.title = "理科", r.color = n.book_color[o];
                    break;

                  case 2:
                    r.title = "文艺", r.color = n.book_color[o];
                    break;

                  case 3:
                    r.title = "流行", r.color = n.book_color[o];
                    break;

                  case 4:
                    r.title = "娱乐", r.color = n.book_color[o];
                    break;

                  case 5:
                    r.title = "生活", r.color = n.book_color[o];
                }
                r.index = o, r.items = [], t.push(r);
            }
            for (var s in i.mainData.role.knowInfo) {
                var l = this.getBookSeedIDBySelfId(s), u = parseInt(s) - 1, m = i.mainData.role.knowInfo[s], c = {};
                (c = a.assign(c, m)).bookNum = this.getItemCount(l);
                var f = i.mainData.role.allSeeds.itemConfs[l];
                (c = a.assign(c, f)).newCount = this.getNewKnowledgeCount(l), c.goldEnough = c.needGold <= i.mainData.role.gold, 
                c.levelMax = c.level >= e, c.desc = c.level < e ? "" + c.desc + c.curUp + "% > " + c.nextUp + "%" : "已经升到最高级！" + c.name + "类题目提高答对得分" + c.curUp + "%";
                var w = t[u = parseInt(u / 5)].items;
                w.push(c), t[u].row = Math.ceil(w.length / 2);
            }
            for (var g = t.length - 1; g >= 0; g--) 0 != t[g].items.length || t.splice(g, 1);
            return t;
        }
    }, {
        key: "refreshChangciBuffVal",
        value: function(e) {
            i.mainData.role.buff = e;
        }
    }, {
        key: "getExpBuffer",
        value: function() {
            return 0;
        }
    }, {
        key: "getGoldBffer",
        value: function() {
            return 0;
        }
    }, {
        key: "getScoreBuffer",
        value: function() {
            return 0;
        }
    }, {
        key: "haveNewHandItemCanBuy",
        value: function() {
            return !!i.mainData.role.newGift && !(i.mainData.role.purchaseCount && i.mainData.role.purchaseCount[506001] > 0);
        }
    }, {
        key: "hasBuybuybuy",
        value: function(e) {
            return !!(i.mainData.role.purchaseCount && ~~i.mainData.role.purchaseCount["" + e] > 0);
        }
    }, {
        key: "refreshPurchaseCount",
        value: function(e) {
            i.mainData.role.purchaseCount || (i.mainData.role.purchaseCount = {}), i.mainData.role.purchaseCount[e] || (i.mainData.role.purchaseCount[e] = 0), 
            i.mainData.role.purchaseCount[e]++;
        }
    }, {
        key: "getItemUrl",
        value: function(e) {
            return "https://question-resource-wscdn.hortorgames.com/image/new_skin/icon/icon_items/" + e + ".png?v=" + o.Version.toString();
        }
    }, {
        key: "createOrder",
        value: function(e, t, n, a) {
            var o = this;
            r.createOrder(e, function(r, i) {
                console.log("id = " + e, i), r ? (wx.showModal({
                    title: "购买失败",
                    content: r.errMsg,
                    showCancel: !1,
                    confirmText: "确定"
                }), n && n()) : o.requestPayment(i, t, n, a);
            });
        }
    }, {
        key: "requestPayment",
        value: function(e, t, n, o) {
            wx.requestPayment({
                timeStamp: e.timeStamp,
                nonceStr: e.nonceStr,
                package: e.package,
                signType: e.signType,
                paySign: e.paySign,
                success: function(e) {
                    t && t();
                },
                fail: function(e) {
                    a.ShowToast("支付失败"), n && n();
                },
                complete: function(e) {
                    console.log("支付完成"), o && o();
                }
            });
        }
    }, {
        key: "getItemIconUrl",
        value: function(e, t) {
            switch (t) {
              case n.ItemType.gold:
              case n.ItemType.luckyBag:
              case n.ItemType.exchange:
              case n.ItemType.buff:
              case n.ItemType.book:
                return "https://question-resource-wscdn.hortorgames.com/image/new_skin/icon/icon_items/" + e + ".png";

              case n.ItemType.headframe:
                return "https://question-resource-wscdn.hortorgames.com/image/new_skin/icon/tiers/" + e + ".png";

              case n.ItemType.cup:
                return "https://question-resource-wscdn.hortorgames.com/image/new_skin/icon/trophy/" + e + ".png?v=0.1";
            }
            return null;
        }
    }, {
        key: "refreshNewFrameFlag",
        value: function() {
            var e = a.getStorageSync("newHeadFrame");
            (e = e || {})[205001] = !0, a.setStorageSync("newHeadFrame", e);
        }
    }, {
        key: "newItemCount",
        get: function() {
            var e = 0;
            if (this.newItem) for (var t in this.newItem) this.newItem[t] && (e += this.newItem[t]);
            return e;
        }
    }, {
        key: "newKnowledgeCount",
        get: function() {
            var e = 0;
            if (this.newKnowledge) for (var t in this.newKnowledge) this.newKnowledge[t] && (e += this.newKnowledge[t]);
            return e;
        }
    } ]), s;
}();

module.exports = new s();