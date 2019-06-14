var t = require("./../../util/util.js"), a = require("./../../util/AnimationQueue.js"), e = require("../../util/ActivityManager.js"), n = getApp(), i = {
    onLoad: function(a) {
        this.imageId = a.imageId, a.headId && (this.headId = a.headId), this.btnText = a.btnText, 
        t.showShareMenu(), this.activity = e.getActivity("shareTest", !1), this.shareTestType = this.activity.subType, 
        t.setNavigationBarTitle(this.activity.name);
    },
    onReady: function() {
        var t = {};
        t.shareTestType = this.shareTestType, t.imageId = this.imageId, t.userInfo = n.mainData.role.userInfo, 
        this.headId && (t.headId = this.headId), t.btnText = this.btnText, this.setData(t), 
        this.createImg();
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        var a = this, e = n.shareManager.getShareTestResultShareData(this.imageId);
        return n.shareConf(e, !0, function() {
            a.playMenuOut();
        });
    },
    playMenuIn: function() {
        var t = this, e = a.get("shareTestPageIn");
        e.call(function() {
            var a = {};
            a.menuViewVisible = !0, t.setData(a);
        }), e.wait(100), e.call(function() {
            var a = wx.createAnimation();
            a.bottom("0px").step({
                timingFunction: "ease-in",
                duration: 200
            }), t.setData({
                ani: a.export()
            });
        });
    },
    playMenuOut: function() {
        var t = this, e = a.get("shareTestPageIn");
        e.wait(100), e.call(function() {
            var a = wx.createAnimation();
            a.bottom("-170px").step({
                timingFunction: "ease-in",
                duration: 200
            }), t.setData({
                ani: a.export()
            });
        }), e.wait(200), e.call(function() {
            var a = {};
            a.menuViewVisible = !1, t.setData(a);
        });
    },
    onTapShareMenuBtn: function() {
        this.playMenuIn();
    },
    onTapCloseMenuBtn: function() {
        this.playMenuOut();
    },
    onTapSharBtn: function() {},
    onTapMoreBtn: function() {
        n.needGotoSP = !0, wx.navigateBack({});
    },
    onTapSaveBtn: function() {
        this.btnLock || (this.btnLock = !0, this.saveImg());
    },
    createImg: function() {
        var t = this;
        this.loadSaveImgBg(function(a) {
            t.bgPath = a, t.loadAvatarImg(function(a) {
                t.avatarPath = a, t.loadResultImg(function(a) {
                    t.resultPath = a, t.drawImg();
                });
            });
        });
    },
    loadSaveImgBg: function(a) {
        var e = "https://question-resource-wscdn.hortorgames.com/image/new_skin/activity/activity_" + this.shareTestType + "/img_share11.png";
        t.downloadFile(e, function(e, n) {
            n && 200 == n.statusCode ? t.invokeCallback(a, n.tempFilePath) : t.invokeCallback(a, null);
        });
    },
    loadAvatarImg: function(a) {
        var e = n.mainData.role.userInfo.avatarUrl;
        t.downloadFile(e, function(e, n) {
            n && 200 == n.statusCode ? t.invokeCallback(a, n.tempFilePath) : t.invokeCallback(a, null);
        });
    },
    loadResultImg: function(a) {
        var e = "https://question-resource-wscdn.hortorgames.com/image/new_skin/activity/activity_" + this.shareTestType + "/img_result2/" + this.imageId + ".png";
        t.downloadFile(e, function(e, n) {
            n && 200 == n.statusCode ? t.invokeCallback(a, n.tempFilePath) : t.invokeCallback(a, null);
        });
    },
    drawImg: function() {
        if (this.bgPath && this.avatarPath && this.resultPath) {
            var t = wx.createCanvasContext("shareCanvas");
            if (t.drawImage(this.bgPath, 0, 0, 750, 1334), t.drawImage(this.resultPath, 0, 346, 750, 664), 
            t.setFillStyle("#000000"), t.setFontSize(36), t.setTextAlign && t.setTextAlign("center"), 
            t.fillText(n.mainData.role.userInfo.nickName, 375, 450), "clip" in t) {
                t.beginPath(), t.arc(373, 386, 31, 0, 2 * Math.PI), t.fill(), t.clip(), t.drawImage(this.avatarPath, 342, 355, 62, 62);
            }
            t.draw();
        }
    },
    saveImg: function() {
        var a = this;
        this.bgPath && this.avatarPath && this.resultPath ? wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 750,
            height: 1334,
            destWidth: 750,
            destHeight: 1334,
            canvasId: "shareCanvas",
            success: function(e) {
                e.tempFilePath ? wx.saveImageToPhotosAlbum({
                    filePath: e.tempFilePath,
                    success: function(e) {
                        t.ShowConfirm("", "已保存到相册，你可以进行分享了。", function() {}), a.btnLock = !1;
                    },
                    fail: function(e) {
                        t.ShowToast("保存失败。"), a.btnLock = !1;
                    }
                }) : t.ShowConfirm("", "保存失败。", function() {
                    a.btnLock = !1;
                });
            }
        }, this) : t.ShowConfirm("", "保存失败。", function() {
            a.btnLock = !1;
        });
    }
};

Page(i);