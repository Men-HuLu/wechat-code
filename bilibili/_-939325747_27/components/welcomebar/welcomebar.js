getApp();

Component({
    data: {
        isShow: !0
    },
    ready: function() {
        wx.getSystemInfo({
            success: function(o) {
                console.log(o.model), console.log(o.pixelRatio), console.log(o.windowWidth), console.log(o.windowHeight), 
                console.log(o.language), console.log(o.version), console.log(o.platform);
            }
        });
    },
    methods: {
        startwatch: function() {
            wx.setStorageSync("confirm", !0), this.setData({
                isShow: !1
            });
        }
    }
});