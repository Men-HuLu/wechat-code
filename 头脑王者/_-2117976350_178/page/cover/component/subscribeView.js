var o = {
    properties: {
        innerText: {
            type: String,
            value: "default value"
        },
        visible: {
            type: Boolean,
            value: !1,
            observer: function(o, t) {
                o ? wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: "#4e6de5"
                }) : wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: "#4E84E5"
                });
            }
        }
    },
    data: {
        someData: {}
    },
    methods: {
        onTapClose: function() {
            this.setData({
                visible: !1
            });
        },
        onTapCopy: function() {
            wx.setClipboardData && wx.setClipboardData({
                data: "头脑王者",
                success: function() {
                    wx.showToast({
                        title: "复制成功。",
                        icon: "none",
                        duration: 2e3
                    });
                },
                fail: function() {
                    wx.showToast({
                        title: "复制失败。",
                        icon: "none",
                        duration: 2e3
                    });
                }
            });
        }
    }
};

Component(o);