var r = require("./../../../util/util.js"), e = (require("./../../../const/consts.js"), 
require("./../../../net/fightNet.js")), a = require("./../../../net/connectNotify.js"), t = getApp();

module.exports = {
    enterWithUrl_pvr: function(t, o) {
        var i = this;
        this.roomIdPvr = t, this.friendCode = o, setTimeout(function() {
            e.shareRoomInfo(t, o, function(e, t) {
                e ? r.log("点开影子对战链接，查询房间信息:", e) : t ? (r.log("让cover来决定下一步操作"), i.roomInfo = t, 
                a.receive("pvr.shareRoomInfo", t), i.makeMyShareImage()) : r.log("点开影子对战链接，查询房间信息，返回既没有报错，也没有房间信息");
            });
        }, 1400);
    },
    onCoverLoad: function(e) {
        var t = this;
        this.cover = e, a.register("pvr.shareRoomInfo", this.onGetShareRoomInfo, this), 
        e.onPvrPopup_closed = function() {
            r.setPageData(t.cover, {
                "pvr.visible": !1
            });
        };
    },
    onCoverUnLoad: function(r) {
        a.remove("pvr.shareRoomInfo", this.onGetShareRoomInfo);
    },
    onGetShareRoomInfo: function(e, a) {
        a.expire ? r.setPageData(this.cover, {
            "pvr.visible": !0,
            "pvr.expire": !0,
            "pvr.isFull": !1
        }) : a.isFull ? a.had ? wx.navigateTo({
            url: "/page/pvr/pvr"
        }) : r.setPageData(this.cover, {
            "pvr.visible": !0,
            "pvr.isFull": !0,
            "pvr.expire": !1
        }) : wx.navigateTo({
            url: "/page/pvr/pvr"
        });
    },
    shareRoomInfo: function(a) {
        var t = this;
        e.shareRoomInfo(this.roomIdPvr, this.friendCode, function(e, o) {
            e ? r.log("从影子战斗返回，查询房间信息:", e) : o ? (r.log("让pvr来决定下一步操作"), t.roomInfo = o, a && a()) : (t.roomInfo = null, 
            r.log("从影子战斗返回，查询房间信息，返回既没有报错，也没有房间信息"));
        });
    },
    makeMyShareImage: function() {
        if (this.roomInfo.list && 0 != this.roomInfo.list.length) if (this.roomInfo.had && !this.itsMe()) {
            for (var e = null, a = null, o = 0; o < this.roomInfo.list.length; o++) {
                var i = this.roomInfo.list[o];
                i.rivalUser.uid == this.roomInfo.rivalUser.uid ? a = i : i.rivalUser.uid == t.uid && (e = i);
            }
            e || (e = {
                rivalUser: {
                    avatarUrl: t.mainData.role.userInfo.avatarUrl
                }
            });
            var s = {
                isWin: this.roomInfo.myScore > a.score,
                rivalAvatarUrl: a.rivalUser.avatarUrl,
                userAvatarUrl: e.rivalUser.avatarUrl,
                score: this.roomInfo.myScore
            };
            this.pvrShareImg = null, this.saveShareImg2(s);
        } else {
            r.log("准备生成单图1");
            for (var n = null, v = 0; v < this.roomInfo.list.length; v++) {
                var l = this.roomInfo.list[v];
                if (l.rivalUser.uid == this.roomInfo.rivalUser.uid) {
                    n = l;
                    break;
                }
            }
            var h = {
                rivalAvatarUrl: n.rivalUser.avatarUrl,
                score: n.score
            };
            this.pvrShareImg = null, r.log("准备生成单图2"), this.saveShareImg1(h);
        }
    },
    saveShareImg2: function(e) {
        var a = this;
        r.cacheFile("rivalAvatar", e.rivalAvatarUrl, function(t) {
            a.rivalAvatarPath = t, r.cacheFile("Avatar", e.userAvatarUrl, function(t) {
                if (a.userAvatarPath = t, a.rivalAvatarPath && a.userAvatarPath) {
                    var o = wx.createCanvasContext("pvrShareCanvas");
                    o.drawImage(a.userAvatarPath, 37, 90, 107, 107), o.drawImage(a.rivalAvatarPath, 265, 90, 107, 107), 
                    o.drawImage("/image/pvr/img_ad_challenge_4.png", 0, 0, 400, 320), 1 == e.isWin && o.drawImage("/image/pvr/img_ad_challenge_4_banner.png", 76, 6, 248, 81), 
                    o.setFillStyle("#ffffff"), o.setTextAlign && o.setTextAlign("center"), o.setFontSize(60), 
                    o.fillText(e.score, 199.5, 255), o.draw(!0, function(e) {
                        console.log("======context.draw", e), wx.canvasToTempFilePath({
                            x: 0,
                            y: 0,
                            width: 400,
                            height: 320,
                            destWidth: 400,
                            destHeight: 320,
                            canvasId: "pvrShareCanvas",
                            success: function(e) {
                                e.tempFilePath && (a.pvrShareImg = e.tempFilePath, r.log("生在分享图this.pvrShareImg:", a.pvrShareImg));
                            }
                        }, a);
                    });
                }
            });
        });
    },
    saveShareImg1: function(e) {
        var a = this;
        r.cacheFile("rivalAvatar", e.rivalAvatarUrl, function(t) {
            a.rivalAvatarPath = t;
            var o = wx.createCanvasContext("pvrShareCanvas");
            o.drawImage(a.rivalAvatarPath, 142, 43, 112, 112), o.drawImage("/image/pvr/img_ad_new20.png", 0, 0, 400, 320), 
            o.setFillStyle("#fff336"), o.setTextAlign && o.setTextAlign("center"), o.setFontSize(40), 
            o.fillText(e.score, 199.5, 190), r.log("开始画"), o.draw(!0, function(e) {
                console.log(e), wx.canvasToTempFilePath({
                    x: 0,
                    y: 0,
                    width: 400,
                    height: 320,
                    destWidth: 400,
                    destHeight: 320,
                    canvasId: "pvrShareCanvas",
                    success: function(e) {
                        r.log("画完成功回调"), e.tempFilePath && (a.pvrShareImg = e.tempFilePath, r.log("生在分享图this.pvrShareImg:", a.pvrShareImg));
                    }
                }, a);
            });
        });
    },
    makeMyShareTitle: function() {
        if (this.roomInfo.had && !this.itsMe()) {
            for (var r = null, e = 0; e < this.roomInfo.list.length; e++) {
                var a = this.roomInfo.list[e];
                if (a.rivalUser.uid == this.roomInfo.rivalUser.uid) {
                    r = a;
                    break;
                }
            }
            return t.shareManager.getPvrShareData({
                isWin: this.roomInfo.myScore > r.score,
                nickName: r.rivalUser.nickName,
                score: this.roomInfo.myScore,
                friendCode: this.friendCode,
                roomID: this.roomIdPvr,
                shareImage: this.pvrShareImg
            });
        }
        return t.shareManager.getPvrShareData2({
            friendCode: this.friendCode,
            roomID: this.roomIdPvr,
            shareImage: this.pvrShareImg
        });
    },
    itsMe: function() {
        return this.friendCode == t.mainData.role.shareCode;
    }
};