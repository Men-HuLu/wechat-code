Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.initWxPay = function(t, o) {
    e.get({
        url: "/wxastore/storewxacgi_getmdinfo",
        data: {
            poi_id: t.poi_id
        },
        success: function(e) {
            if (e.qr_key) {
                var t = {
                    qr_key: e.qr_key,
                    promotion_txt: e.promotion_txt
                };
                o.setData({
                    wxpay_info: t
                }), console.log("get wxpay success", t);
            }
        }
    });
}, exports.clickWxpay = function(e, t) {
    e.e;
    wx.canIUse("navigateToMiniProgram") ? wx.navigateToMiniProgram({
        appId: "wx79e1c8c3513d082b",
        path: "pages/index/index?key=" + t.data.wxpay_info.qr_key + "&from=mp_shop",
        scene: 1026,
        success: function(e) {},
        fail: function(e) {
            wx.showModal({
                title: "跳转失败",
                content: JSON.stringify(e.errMsg)
            });
        }
    }) : wx.showModal({
        title: "跳转失败",
        content: "请更新到最新微信版本体验此功能"
    });
};

var e = require("./cgi2.js");