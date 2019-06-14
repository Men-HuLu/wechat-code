var t = getApp();

Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        titleText: {
            type: String,
            value: ""
        }
    },
    data: {
        statusBarHeight: 0,
        navigatorHeight: 0
    },
    attached: function() {
        this.setHeight();
    },
    methods: {
        setHeight: function() {
            this.setData({
                statusBarHeight: t.globalData.systemInfo.statusBarHeight,
                navigatorHeight: t.globalData.navbarHeight
            });
        },
        backHome: function() {
            wx.reLaunch({
                url: "/pages/find/find",
                complete: function(t) {
                    console.log(t);
                }
            });
        }
    }
});