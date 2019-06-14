Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getAndShowCard = function(e, c, t) {
    o.get({
        url: "/wxastore/getpoicardinfo",
        data: {
            poi_id: e.poi_id
        },
        success: function(o) {
            if (0 == o.err_code) {
                var e = -1, a = -1;
                o.poi_card_info_list.forEach(function(o, c) {
                    10 == o.card_type || 27 == o.card_type ? e = c : a = c;
                }), c.setData({
                    memberCardIdx: e,
                    discountCardIdx: a,
                    card_info_list: o.poi_card_info_list
                }), console.log("card_info_list", o.poi_card_info_list), "function" == typeof t && t();
            }
        }
    });
}, exports.clickCard = function(e, c, t) {
    var a = e.e;
    if (!c.getcard_loading) {
        var d = a.target.dataset.opr, i = c.data.card_info_list[a.currentTarget.dataset.idx];
        "get" == d ? (c.getcard_loading = !0, o.post({
            url: "/wxastore/insertcard",
            data: {
                safe_poi_id: c.data.poi.poi_id,
                card_id: i.card_id
            },
            success: function(o) {
                0 == o.err_code ? wx.showToast({
                    title: "已领取到卡包"
                }) : wx.showModal({
                    content: "卡券领取失败",
                    showCancel: !1
                });
            },
            complete: function() {
                setTimeout(function() {
                    c.getcard_loading = !1;
                }, 1e3);
            }
        })) : "" == i.code ? (console.log("add Card"), wx.addCard({
            cardList: [ {
                cardId: i.card_id,
                cardExt: i.card_ext
            } ],
            success: function(o) {
                console.log("on success -> "), wx.showToast({
                    title: "已领取到卡包"
                });
            },
            fail: function(o) {
                console.log(o), o.errMsg.indexOf("cancel") > -1 || wx.showModal({
                    content: "卡券领取失败" + JSON.stringify(o.errMsg),
                    showCancel: !1
                });
            },
            complete: function(o) {}
        })) : (console.log("open Card"), wx.openCard({
            cardList: [ {
                cardId: i.card_id,
                code: i.code
            } ],
            success: function(o) {
                console.log(o);
            },
            fail: function(o) {
                console.log(o), wx.showModal({
                    content: "卡券查看失败" + i.card_id + "," + i.code + JSON.stringify(o.errMsg),
                    showCancel: !1
                });
            },
            complete: function(o) {
                console.log(o);
            }
        }));
    }
};

var o = require("./cgi2.js");