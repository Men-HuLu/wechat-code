var e = getApp();

Page({
    data: {
        disabled: !0,
        userName: "",
        password: ""
    },
    onLoad: function(e) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    bindUserNameInput: function(e) {
        this.setData({
            userName: e.detail.value
        });
    },
    bindPwdInput: function(e) {
        this.setData({
            password: e.detail.value
        }), this.data.userName.length > 0 && this.data.password.length > 0 ? this.setData({
            disabled: !1
        }) : this.setData({
            disabled: !0
        });
    },
    loginbyUser: function(a) {
        var t = this.data.userName, n = this.data.password;
        n.length < 6 ? e.showErrorModal("密码长度不能少于6位") : (wx.showLoading({
            title: "正在登录"
        }), e.getWxUserInfo(function(a) {
            wx.request({
                url: e.getUrl("GetLoginByUserName"),
                data: {
                    openId: a.openId,
                    userName: t,
                    password: n,
                    nickName: a.nikeName,
                    unionId: a.unionId,
                    encryptedData: a.encryptedData,
                    session_key: a.session_key,
                    iv: a.iv
                },
                success: function(a) {
                    "OK" == a.data.Status ? (wx.hideLoading(), e.setUserInfo(a.data.Data), wx.switchTab({
                        url: "../home/home"
                    })) : (wx.hideLoading(), e.showErrorModal(a.data.Message));
                }
            });
        }));
    },
    quickLogin: function(a) {
        e.getWxUserInfo(function(a) {
            wx.request({
                url: e.getUrl("GetQuickLogin"),
                data: {
                    openId: a.openId,
                    nickName: a.nikeName,
                    unionId: a.unionId,
                    headImage: a.headImage,
                    encryptedData: a.encryptedData,
                    session_key: a.session_key,
                    iv: a.iv
                },
                success: function(a) {
                    "OK" == a.data.Status ? (e.setUserInfo(a.data.Data), wx.switchTab({
                        url: "../home/home"
                    })) : wx.showToast({
                        title: a.data.Message
                    });
                }
            });
        });
    }
});