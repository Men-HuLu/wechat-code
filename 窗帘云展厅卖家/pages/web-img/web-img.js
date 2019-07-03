function o(o) {
    return o && o.__esModule ? o : {
        default: o
    };
}

o(require("../../libs/userLogin.js"));

var n = o(require("../../utils/interface.js")), e = (o(require("../../libs/ajax.js")), 
getApp());

Page({
    data: {
        img: ""
    },
    onLoad: function(o) {
        var n = o.img;
        this.setData({
            img: n
        });
    },
    downLoad: function() {
        wx.downloadFile({
            url: this.data.img,
            success: function(o) {
                wx.playVoice({
                    filePath: "https://www.clyzt.cn" + n.default.loadImg,
                    data: {
                        id: e.globalData.uid
                    }
                }), wx.saveImageToPhotosAlbum({
                    filePath: o.tempFilePath,
                    success: function(o) {
                        wx.showToast({
                            title: "下载到系统相册成功",
                            icon: "none"
                        });
                    },
                    fail: function(o) {
                        console.log(o), "saveImageToPhotosAlbum:fail auth deny" === o.errMsg && (console.log("打开设置窗口"), 
                        wx.openSetting({
                            success: function(o) {
                                console.log(o), o.authSetting["scope.writePhotosAlbum"] ? console.log("获取权限成功，再次点击图片保存到相册") : console.log("获取权限失败");
                            }
                        }));
                    }
                });
            },
            fail: function(o) {
                console.log(o);
            }
        }).onProgressUpdate(function(o) {
            o.progress < 100 ? wx.showLoading({
                title: "已下载" + o.progress + "%"
            }) : (wx.hideLoading(), wx.reLaunch({
                url: "/pages/index/index"
            }));
        });
    },
    navigation: function(o) {
        wx.navigateBack({});
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});