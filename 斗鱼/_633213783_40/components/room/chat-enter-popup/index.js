getApp();

Component({
    data: {
        isPopup: !0
    },
    properties: {},
    methods: {
        onGotUserInfo: function(t) {
            if (this.setData({
                isPopup: !1
            }), t.detail.userInfo) {
                var e = t.detail.userInfo;
                this.triggerEvent("enterChatroom", e);
            } else wx.showToast({
                title: "进入聊天室需要您的授权哦~",
                icon: "none",
                duration: 2e3
            });
        }
    }
});