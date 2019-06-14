var t = require("./../../net/groupNet.js"), a = (require("./../../net/connectNotify.js"), 
require("./../../const/notifyConsts.js"), require("./../../util/util.js")), e = (require("./../../const/consts.js"), 
require("./../../util/PVERoomDataManager.js"), require("./../../util/Tween.js")), n = getApp();

Page({
    data: {
        status: 0,
        page: 0,
        myGroup: {
            id: 123,
            name: "",
            openGId: ""
        },
        members: null,
        shareRewardText: ""
    },
    onTapRedpack: function() {},
    callback_item_clicked: function(t) {
        var a = this;
        if (!this.btnLock) for (var e = t.currentTarget.dataset.uid, i = 0; i < this.data.members.length; i++) {
            var o = this.data.members[i];
            o.uid == e && (n.mainData.user_to_detail = o, this.btnLock = !0, wx.navigateTo({
                url: "../../page/user_detail/user_detail",
                complete: function() {
                    setTimeout(function() {
                        a.btnLock = !1;
                    }, 500);
                }
            }));
        }
    },
    onLoad: function(t) {
        var i = this;
        a.showShareMenu(), n.eventDispatcher.addEventListener("shareTextUpdate", this.onShareTextUpdate, this);
        var o = {
            "myGroup.id": t.groupId,
            "myGroup.name": t.groupName,
            "myGroup.openGId": t.openGId,
            shareRewardText: n.getShareRewardText()
        };
        this.setData(o), this.init(t);
        var r = e.fastGet("compare_to_group");
        r.wait(500), r.call(function() {
            var t = wx.createAnimation({
                timingFunction: "ease-out",
                duration: 400
            });
            t.translate3d(0, "0px", 0).step();
            var a = i.data;
            a.ani_head_panel = t.export(), i.setData(a);
        }), r.wait(500), r.call(function() {
            var t = wx.createAnimation({
                duration: 200,
                timingFunction: "ease-out"
            });
            t.scale(1).step(), i.setData({
                ani_logo: t.export()
            });
        }), r.wait(300), r.call(function() {
            var t = wx.createAnimation({
                duration: 200,
                timingFunction: "ease-out"
            });
            t.scale(1, 1).step(), i.setData({
                ani_brow: t.export()
            });
        }), r.wait(300), r.call(function() {
            var t = wx.createAnimation({
                duration: 400,
                timingFunction: "ease-out"
            });
            t.translate3d(0, 0, 0).step(), i.setData({
                ani_list: t.export()
            });
        }), r.wait(500), r.call(function() {
            var t = wx.createAnimation({
                duration: 400,
                timingFunction: "ease-out"
            });
            t.translate3d(0, 0, 0).step(), i.setData({
                ani_foot: t.export()
            });
        }), r.wait(500), r.call(function() {
            var t = wx.createAnimation({
                duration: 200,
                timingFunction: "ease-in"
            });
            t.scale(1).opacity(1).step(), i.setData({
                ani_groupName: t.export()
            });
        });
    },
    onShareTextUpdate: function() {
        this.setData({
            shareRewardText: this.shared ? "" : n.getShareRewardText()
        });
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        this.shared = !1, this.backgroundPositionInterval || (this.backgroundPosition || (this.backgroundPosition = {
            x: 0 == a.randomInt(0, 1) ? a.randomInt(500, 1e3) : -a.randomInt(500, 1e3),
            y: 0 == a.randomInt(0, 1) ? a.randomInt(500, 1e3) : -a.randomInt(500, 1e3)
        }, this.setData({
            backgroundPosition: this.backgroundPosition.x + "rpx " + this.backgroundPosition.y + "rpx "
        })), this.backgroundPositionInterval = setInterval(function() {
            t.backgroundPosition.x += 0 == a.randomInt(0, 1) ? a.randomInt(500, 1e3) : -a.randomInt(500, 1e3), 
            t.backgroundPosition.y += 0 == a.randomInt(0, 1) ? a.randomInt(500, 1e3) : -a.randomInt(500, 1e3), 
            t.setData({
                backgroundPosition: t.backgroundPosition.x + "rpx " + t.backgroundPosition.y + "rpx "
            });
        }, 1e4));
    },
    onHide: function() {
        this.backgroundPositionInterval && (clearInterval(this.backgroundPositionInterval), 
        this.backgroundPositionInterval = void 0);
    },
    onUnload: function() {
        e.removeTweens("compare_to_group"), n.eventDispatcher.removeEventListener("shareTextUpdate", this.onShareTextUpdate, this);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        this.shared = !0;
        var a = n.shareManager.getCompareShareData("compare_to_group");
        return n.shareConf(a);
    },
    init: function() {
        var e = this;
        t.matchInfo(this.data.myGroup.id, function(t, i) {
            if (i && i.list) {
                for (var o = 0; o < i.list.length; o++) {
                    var r = i.list[o];
                    r.matchName = a.GetMatchInfo(r.curMatch).name;
                }
                i.list.sort(function(t, a) {
                    return 0 == a.curMath && 0 != t.curMath ? 1 : 0 != a.curMath && 0 == t.curMath ? -1 : a.curMatch == t.curMatch ? a.star - t.star : a.curMatch - t.curMatch;
                });
                for (var s = 0; s < i.list.length; s++) {
                    var u = i.list[s];
                    u.rank = s + 1, u.uid == n.mainData.role.uid && (u.itsMe = !0);
                }
                e.setData({
                    members: i.list,
                    listHeight: 186 * i.list.length + 100
                });
            }
        });
    }
});