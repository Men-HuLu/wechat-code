var t = getApp();

Component({
    externalClasses: [ "my_class" ],
    options: {
        multipleSlots: !0
    },
    properties: {
        title: String
    },
    data: {
        statusBarHeight: t.globalData.statusBarHeight,
        platform: t.globalData.platform,
        needExit: !1
    },
    methods: {
        back: function() {
            wx.navigateBack();
        },
        exitMiniProgram: function() {}
    },
    ready: function() {
        1 == getCurrentPages().length && this.setData({
            needExit: !0
        });
    }
});