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
}(), a = require("./../../../util/util.js"), i = require("./../../../net/roleNet.js"), n = (require("./../../../const/consts.js"), 
getApp()), l = function() {
    function l(t) {
        var a = this;
        e(this, l), this.page = t, this.page.onTapMillionsShareView_close = function() {
            a.setVisible(!1);
        }, this.page.onTapMillionsShareView_save = function() {
            a.saveImg();
        };
    }
    return t(l, [ {
        key: "setVisible",
        value: function(e) {
            var t = this, l = {};
            l["millionsShareViewData.visible"] = e, this.page.setData(l), e && i.getSeasonMoney(!1, function(e, i) {
                e || (t.matchName = a.GetMatchInfo(i.matchId).name, t.answerNum = i.answerNum, t.beatNum = i.beatNum, 
                t.matchId = i.matchId, t.isKing = 300014 == t.matchId, (l = {})["millionsShareViewData.avatarUrl"] = n.mainData.role.userInfo.avatarUrl, 
                l["millionsShareViewData.matchName"] = t.matchName, l["millionsShareViewData.answerNum"] = t.answerNum, 
                l["millionsShareViewData.beatNum"] = t.beatNum, l["millionsShareViewData.isKing"] = t.isKing, 
                t.page.setData(l));
            });
        }
    }, {
        key: "saveImg",
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
        key: "loadRes",
        value: function(e) {
            var t = this;
            this.avatarUrl = void 0, a.cacheFile("Avatar", n.mainData.role.userInfo.avatarUrl, function(a) {
                t.avatarUrl = a || "/image/qr/avatar.png", t.checkLoadEnd(e);
            });
        }
    }, {
        key: "checkLoadEnd",
        value: function(e) {
            this.avatarUrl && e();
        }
    }, {
        key: "drawShareImage",
        value: function(e) {
            var t = wx.createCanvasContext("millionsShareViewCanvas");
            t.drawImage("../../image/season/img_share.jpg", 0, 0, 750, 1e3), t.setStrokeStyle("#ffffff"), 
            t.beginPath(), t.setLineCap("round"), t.setLineWidth(120), t.moveTo(152, 130), t.lineTo(598, 130), 
            t.stroke(), this.isKing ? (t.setFontSize(32), t.setFillStyle("#436DBF"), t.setTextAlign("left"), 
            t.setTextBaseline("middle"), t.fillText("击败" + this.beatNum + "位挑战者", 236, 105), 
            t.setFontSize(38), t.setFillStyle("#F16928"), t.setTextAlign("left"), t.setTextBaseline("middle"), 
            t.fillText("晋级第三赛季头脑王者", 236, 155)) : (t.setFontSize(30), t.setFillStyle("#3663CD"), 
            t.setTextAlign("left"), t.setTextBaseline("middle"), t.fillText("晋级第三赛季", 236, 130), 
            t.setFontSize(38), t.setFillStyle("#F16928"), t.setTextAlign("left"), t.setTextBaseline("middle"), 
            t.fillText("" + this.matchName, 430, 130)), t.setFontSize(42), t.setFillStyle("white"), 
            t.setTextAlign("left"), t.setTextBaseline("middle"), t.setShadow(0, 2, 4, "rgba(0, 0, 0, 0.5)"), 
            t.fillText("我共回答了" + this.answerNum + "道题目，", 63, 300), t.setFontSize(52), t.setFillStyle("white"), 
            t.setTextAlign("left"), t.setTextBaseline("middle"), t.setShadow(0, 2, 4, "rgba(0, 0, 0, 0.5)"), 
            t.fillText("只为每天了解世界多一点。", 63, 369), "clip" in t && (t.beginPath(), t.arc(152, 130, 52, 0, 2 * Math.PI), 
            t.fill(), t.clip(), t.drawImage(this.avatarUrl, 100, 78, 104, 104)), t.draw(), setTimeout(function() {
                a.invokeCallback(e);
            }, 100);
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
                canvasId: "millionsShareViewCanvas",
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
    } ]), l;
}();

module.exports = l;