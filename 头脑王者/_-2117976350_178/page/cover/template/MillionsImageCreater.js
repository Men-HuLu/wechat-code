function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var i = t[a];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, a, i) {
        return a && e(t.prototype, a), i && e(t, i), t;
    };
}(), a = (require("../../../const/consts.js"), require("../../../util/util.js")), i = (getApp(), 
function() {
    function i(t) {
        e(this, i), this.page = t;
    }
    return t(i, [ {
        key: "setNickname",
        value: function(e) {
            this.nickName = e;
        }
    }, {
        key: "setAvatarUrl",
        value: function(e) {
            this.avatar = e;
        }
    }, {
        key: "setNumData",
        value: function(e, t) {
            this.beatNum = e, this.answerNum = t;
        }
    }, {
        key: "showShareImage",
        value: function() {
            this.createShareImage();
        }
    }, {
        key: "createShareImage",
        value: function() {
            var e = this;
            a.showLoading("生成中..."), this.loadRes(function() {
                e.drawShareImage(function() {
                    e.canvasToTempFilePath(function(t) {
                        a.hideLoading(), e.saveImage(t);
                    });
                });
            });
        }
    }, {
        key: "drawShareImage",
        value: function(e) {
            var t = wx.createCanvasContext("shareImageCanvas");
            t.drawImage("../../image/season/img_share.jpg", 0, 0, 750, 1e3), t.setStrokeStyle("#ffffff"), 
            t.beginPath(), t.setLineCap("round"), t.setLineWidth(120), t.moveTo(152, 130), t.lineTo(598, 130), 
            t.stroke(), t.setFontSize(32), t.setFillStyle("#436DBF"), t.setTextAlign("left"), 
            t.setTextBaseline("middle"), t.fillText("击败" + this.beatNum + "位挑战者", 236, 105), 
            t.setFontSize(38), t.setFillStyle("#F16928"), t.setTextAlign("left"), t.setTextBaseline("middle"), 
            t.fillText("晋级第三赛季头脑王者", 236, 155), t.setFontSize(42), t.setFillStyle("white"), 
            t.setTextAlign("left"), t.setTextBaseline("middle"), t.setShadow(0, 2, 4, "rgba(0, 0, 0, 0.5)"), 
            t.fillText("我共回答了" + this.answerNum + "道题目，", 63, 300), t.setFontSize(52), t.setFillStyle("white"), 
            t.setTextAlign("left"), t.setTextBaseline("middle"), t.setShadow(0, 2, 4, "rgba(0, 0, 0, 0.5)"), 
            t.fillText("只为每天了解世界多一点。", 63, 369), "clip" in t && (t.beginPath(), t.arc(152, 130, 52, 0, 2 * Math.PI), 
            t.fill(), t.clip(), t.drawImage(this.avatarUrl, 100, 78, 104, 104)), t.draw(), setTimeout(function() {
                a.invokeCallback(e);
            }, 100);
        }
    }, {
        key: "loadRes",
        value: function(e) {
            var t = this;
            this.avatarUrl = void 0, a.cacheFile("Avatar", this.avatar, function(a) {
                t.avatarUrl = a || "/image/qr/avatar.png", t.checkLoadEnd(e);
            });
        }
    }, {
        key: "checkLoadEnd",
        value: function(e) {
            this.avatarUrl && e();
        }
    }, {
        key: "canvasToTempFilePath",
        value: function(e) {
            var t = this;
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 750,
                height: 1e3,
                destWidth: 750,
                destHeight: 1e3,
                canvasId: "shareImageCanvas",
                success: function(t) {
                    e(t.tempFilePath);
                },
                fail: function(e) {
                    console.log(e), t.fail();
                }
            });
        }
    }, {
        key: "saveImage",
        value: function(e) {
            "function" == typeof wx.saveImageToPhotosAlbum ? wx.saveImageToPhotosAlbum({
                filePath: e,
                success: function(e) {
                    a.ShowConfirm("", "已保存到相册，你可以进行分享了。", function() {});
                },
                fail: function(e) {
                    a.ShowToast("保存失败。");
                }
            }) : a.ShowConfirm("", "保存失败。", function() {});
        }
    }, {
        key: "fail",
        value: function() {
            a.hideLoading(), a.ShowToast("生成失败");
        }
    } ]), i;
}());

module.exports = i;