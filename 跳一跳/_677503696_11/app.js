var a = require("./lib/qqmap-wx-jssdk.min.js"), t = require("./lib/config.js"), s = t.QQMapKey, e = t.appid, i = new a({
    key: s
}), o = require("./utils/util.js");

App({
    onLaunch: function() {
        this.getSysInfo(), this.globalData.selfAppid = e;
    },
    globalData: {
        scrollTop: 0,
        qqmapsdk: i,
        location: {
            city: "广州",
            address: "TIT创意园",
            coordinate: {
                lat: 23.1111,
                lng: 113.1111
            }
        }
    },
    getSysInfo: function() {
        var a = wx.getSystemInfoSync();
        Object.assign(this.globalData, a);
        var t = !!wx.enterContact;
        this.globalData.canUseCustomer = t, this.globalData.clientCustomer = o.compareVersion(this.globalData.SDKVersion, "2.5.0") >= 0;
    }
});