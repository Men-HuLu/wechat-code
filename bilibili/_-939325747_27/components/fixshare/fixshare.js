getApp();

var e = require("../../utils/util.js").getTime;

Component({
    properties: {
        title: String,
        desc: String,
        cover: String
    },
    data: {
        deviceHeight: 0,
        deviceWidth: 0,
        qrcode: "",
        nickName: "",
        avatarUrl: ""
    },
    ready: function() {
        console.log("123", new Date());
        var e = this;
        wx.getSystemInfo({
            success: function(t) {
                console.log(t.model), console.log(t.pixelRatio), console.log(t.windowWidth), console.log(t.windowHeight), 
                console.log(t.language), console.log(t.version), console.log(t.platform), e.setData({
                    deviceWidth: t.windowWidth,
                    deviceHeight: t.windowHeight
                });
            }
        });
    },
    methods: {
        canvasTextAutoLine: function(e, t, i, a) {
            console.log(e);
            for (var o = wx.createCanvasContext("shareCanvas"), s = 0, n = this.data.deviceWidth, l = 0, r = [], c = [], h = 0; h < e.length; h++) (s += o.measureText(e[h]).width) > n - t && (r.push(e.substring(l, h)), 
            a, s = 0, l = h), h == e.length - 1 && c.push(e.substring(l, h + 1) + "...");
            return {
                1: r,
                2: c
            };
        },
        onGotUserInfo: function(e) {
            var t = e.detail.userInfo, i = t.nickName, a = t.avatarUrl;
            this.setData({
                nickName: i,
                avatarUrl: a
            });
        },
        setPost: function() {
            var t = wx.createCanvasContext("shareCanvas"), i = this.data, a = i.deviceWidth, o = i.deviceHeight, s = i.nickName, n = i.avatarUrl, l = this.data.title.substring(0, 40), r = this.data.desc.substring(0, 23);
            t.setFillStyle("#ffffff"), t.fillRect(0, 0, a, o), t.drawImage(this.data.cover, 0, 0, a, 210);
            var c = this.canvasTextAutoLine(l, 180, 0, 20);
            t.setFontSize(20), t.setFillStyle("#212121"), c[1][0] && t.fillText(c[1][0], 0, 242), 
            c[2][0] && t.fillText(c[2][0], 16, 272), t.stroke(), t.setFontSize(12), t.setFillStyle("#999"), 
            t.fillText(r, 16, 292), t.stroke(), t.beginPath(), t.setLineWidth(.5), t.moveTo(16, 300), 
            t.lineTo(58, 300), t.closePath(), t.stroke(), t.save(), t.setFontSize(14), t.setFillStyle("#212121"), 
            t.fillText(s, 40, 365), t.stroke(), t.setFontSize(12), t.setFillStyle("#999"), t.fillText("在" + e() + "观看这个视频", 16, 385), 
            t.stroke(), t.save(), t.beginPath(), t.arc(26, 360, 10, 0, 2 * Math.PI), t.setFillStyle("#EEEEEE"), 
            t.fill(), t.clip(), t.drawImage(n, 16, 350, 20, 20), t.restore(), t.closePath(), 
            t.restore(), t.drawImage("../../image/icon-post.png", 0, o - 113, a, 113), t.draw(!0, function() {
                wx.canvasToTempFilePath({
                    x: 0,
                    y: 0,
                    width: a,
                    height: o,
                    canvasId: "shareCanvas",
                    success: function(e) {
                        console.log(e.tempFilePath), wx.saveImageToPhotosAlbum({
                            filePath: e.tempFilePath,
                            success: function(e) {
                                console.log(e);
                            }
                        });
                    }
                });
            });
        },
        backHome: function() {
            wx.redirectTo({
                url: "../newindex/index"
            });
        }
    }
});