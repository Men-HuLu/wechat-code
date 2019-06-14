function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var i = e(require("./service/cart.js")), n = e(require("./service/login.js"));

App({
    onLaunch: function(e) {
        var i = this;
        wx.getSystemInfo({
            success: function(e) {
                e.model.toLowerCase().indexOf("iphone x") > -1 && (i.globalData.isIpx = !0);
            }
        });
    },
    onShow: function(e) {
        i.default.setTabBarCount();
    },
    onHide: function() {
        this.globalData.hideTime = Date.now();
    },
    onError: function(e) {},
    onPageNotFound: function(e) {
        wx.switchTab({
            url: "/pages/index/index"
        });
    },
    globalData: {
        mobile: n.default.getLoginMobile(),
        dataset: {},
        appVersion: 1800,
        openid: "",
        sessionKey: "",
        uid: "",
        delivery: "pick",
        location: {
            success: !1
        },
        locationCityInfo: null,
        selectedCityInfo: null,
        shopInfo: null,
        addressInfo: null,
        nearbyAddressInfo: null,
        searchAddressInfo: null,
        mapChannel: "GCJ-02",
        dispatchMsg: "",
        deviceNo: {
            ios: "WC39ZUyXRgdE/uPSGGGRKFQZWbwjq+nDb6Ncnfb4hbQIsUl9eyN0fi9Hut8i43TiXx2vbhTga2ptX8UJlcRodkX1I3dbt6CMkrDXshh2MZA1+OHVHozjxtBglkFwtMx+yo4sUfxtxrE3rRo7JG2f8p0NI8mX7/mbxDRzv6L59KU0JtOtyGfeSX3T4fG2FWJDUjpQOtuy1hKV0xH3COYIQ1yfHcDoH/FTLhkq3pE+MRQk/8slNy9spNCr4frWO7MTBDccr2HlqkJs=1487577677129",
            android: "android_3f109ee2-d413-37b9-9bbc-ecd180d1ad96"
        },
        modal: {
            confirmText: "确定",
            confirmColor: "#7CA7D2",
            cancelText: "取消",
            cancelColor: "#999999"
        },
        loginStatistic: {},
        share: {
            title: "汤唯邀你品尝大师咖啡",
            imageUrl: "https://static.luckincoffeecdn.com/mini/images/share/tangwei.jpg",
            path: "/pages/index/home"
        },
        hideTime: "",
        imgClickUrl: "",
        clearFlag: !1,
        inviterObj: {},
        isIpx: !1
    }
});