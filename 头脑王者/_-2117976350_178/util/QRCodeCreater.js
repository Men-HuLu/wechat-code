function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var o = t[a];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, a, o) {
        return a && e(t.prototype, a), o && e(t, o), t;
    };
}(), a = (require("../const/consts.js"), require("../util/util.js")), o = require("../net/friendNet.js"), s = getApp(), i = [ "虽然文科不太好", "虽然对宇宙认识不深", "虽然没啥文艺范儿", "虽然没追上潮流", "虽然不怎么熟悉娱乐圈", "虽然生活阅历不太多" ], n = [ "但是个文科学霸", "但是上知天文下知地理", "但仍是个文艺青年", "但是永远站在流行前沿", "但影视歌动漫游门儿清", "但是生活阅历相当丰富" ], r = function() {
    function r() {
        e(this, r);
    }
    return t(r, [ {
        key: "showQRCode",
        value: function() {
            this.createQRCode();
        }
    }, {
        key: "createQRCode",
        value: function() {
            var e = this;
            a.showLoading("生成中..."), this.findFriend(function() {
                e.loadRes(function() {
                    e.drawQRCode(function() {
                        e.canvasToTempFilePath(function(t) {
                            a.hideLoading(), e.saveImage(t);
                        });
                    });
                });
            });
        }
    }, {
        key: "findFriend",
        value: function(e) {
            var t = this;
            o.findFriend(s.mainData.role.uid, function(a, o) {
                if (a) return console.warn(a), void t.fail();
                if (o) {
                    t.scoreStats = [], t.scoreStats.push(o.scoreStats[1] || 0), t.scoreStats.push(o.scoreStats[2] || 0), 
                    t.scoreStats.push(o.scoreStats[3] || 0), t.scoreStats.push(o.scoreStats[4] || 0), 
                    t.scoreStats.push(o.scoreStats[5] || 0), t.scoreStats.push(o.scoreStats[6] || 0);
                    for (var s = 0, i = 5, n = t.scoreStats.length, r = t.scoreStats[0], c = t.scoreStats[5], l = 1; l < n; l++) t.scoreStats[l] > r && (s = l, 
                    r = t.scoreStats[l]);
                    for (var h = 5; h >= 0; h--) t.scoreStats[h] < c && (i = h, c = t.scoreStats[h]);
                    t.maxType = s + 1, t.minType = i + 1, e();
                }
            });
        }
    }, {
        key: "drawQRCode",
        value: function(e) {
            var t = wx.createCanvasContext("QRCodeCanvas");
            t.drawImage("/image/qr/img_share_user.jpg", 0, 0, 750, 1060), t.drawImage("/image/user_detail/img_info_coordinate.png", 138.5, 271, 473, 476), 
            t.setFillStyle("rgba(255,255,255,1)"), t.fillRect(465, 729, 285, 331), t.drawImage(this.baseQRCodeUrl, 505.5, 770.5, 215, 215), 
            t.drawImage("/image/qr/img_share_user_small.png", 465, 729, 285, 331), t.setFillStyle("rgba(122,251,255,0.5)"), 
            t.beginPath();
            for (var o = {
                "-90": this.scoreStats[2],
                "-30": this.scoreStats[3],
                30: this.scoreStats[4],
                90: this.scoreStats[5],
                150: this.scoreStats[1],
                210: this.scoreStats[0]
            }, s = -90; s < 270; s += 60) {
                var r = Math.PI / 180 * s, c = 70 + Math.min(100, o[s + ""]) / 100 * 110, l = 375 + c * Math.cos(r), h = 512 + c * Math.sin(r);
                -90 == s ? t.moveTo(l, h) : t.lineTo(l, h);
            }
            t.closePath(), t.fill(), t.beginPath(), t.setStrokeStyle("rgba(217,180,66,1)");
            for (var u = -90; u < 270; u += 60) {
                var f = Math.PI / 180 * u, d = 70 + Math.min(100, o[u + ""]) / 100 * 110, v = 375 + d * Math.cos(f), m = 512 + d * Math.sin(f);
                -90 == u ? t.moveTo(v, m) : t.lineTo(v, m);
            }
            t.closePath(), t.setFillStyle("#8EBCFE"), t.setFontSize(36), t.fillText(i[this.minType - 1], 231, 105), 
            t.setFillStyle("#4353A4"), t.fillText(n[this.maxType - 1], 231, 150), "clip" in t && (t.beginPath(), 
            t.arc(130.5, 113.5, 52.5, 0, 2 * Math.PI), t.fill(), t.clip(), t.drawImage(this.avatarUrl, 78, 61, 105, 105)), 
            t.draw(), setTimeout(function() {
                a.invokeCallback(e);
            }, 100);
        }
    }, {
        key: "loadRes",
        value: function(e) {
            var t = this;
            this.avatarUrl = void 0, this.baseQRCodeUrl = void 0, a.cacheFile("Avatar", s.mainData.role.userInfo.avatarUrl, function(a) {
                t.avatarUrl = a || "/image/qr/avatar.png", t.checkLoadEnd(e);
            }), a.cacheFile("BaseQRCode", "https://questionimage.hortor.net/images/prod/qr" + s.mainData.role.shareCode + ".png", function(a) {
                t.baseQRCodeUrl = a || "/image/qr/base_code.png", t.checkLoadEnd(e);
            });
        }
    }, {
        key: "checkLoadEnd",
        value: function(e) {
            this.avatarUrl && this.baseQRCodeUrl && e();
        }
    }, {
        key: "canvasToTempFilePath",
        value: function(e) {
            var t = this;
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 750,
                height: 1060,
                destWidth: 750,
                destHeight: 1060,
                canvasId: "QRCodeCanvas",
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
            var t = this;
            "function" == typeof wx.saveImageToPhotosAlbum ? wx.saveImageToPhotosAlbum({
                filePath: e,
                success: function(e) {
                    a.ShowConfirm("", "已保存到相册，你可以进行分享了。", function() {}), t.btnLock = !1;
                },
                fail: function(e) {
                    a.ShowToast("保存失败。"), t.btnLock = !1;
                }
            }) : a.ShowConfirm("", "保存失败。", function() {
                t.btnLock = !1;
            });
        }
    }, {
        key: "fail",
        value: function() {
            a.hideLoading(), a.ShowToast("生成失败");
        }
    } ]), r;
}();

module.exports = r;