function e(e, i) {
    if (!(e instanceof i)) throw new TypeError("Cannot call a class as a function");
}

var i = function() {
    function e(e, i) {
        for (var t = 0; t < i.length; t++) {
            var a = i[t];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(i, t, a) {
        return t && e(i.prototype, t), a && e(i, a), i;
    };
}(), t = (require("./../util/util.js"), require("./../util/Tween.js"), require("./../net/fightNet.js")), a = require("./../util/RoomDataManager.js"), n = (require("./../util/PVERoomDataManager.js"), 
function() {
    function n(i, a) {
        var o = this;
        e(this, n);
        getApp();
        this.page = i, this.panelVisible = !1, this.emojiController = a, this.page.emojiSelectController_onTapClosedBtn = function(e) {
            o.btnLock || o.setPanelVisible(!1);
        }, this.page.emojiSelectController_onTapItem = function(e) {
            if (!o.btnLock) {
                o.btnLock = !0;
                var i = e.currentTarget.dataset.faceId;
                o.emojiController && o.emojiController.showFace(i), o.roomId && t.SendEmot(i, o.roomId, function(e, i) {}), 
                o.setPanelVisible(!1);
            }
        }, this.page.emojiSelectController_onTapBtn = function(e) {
            o.btnLock || "ob" == o.page.type || "obChallenge" == o.page.type || o.setPanelVisible(!o.panelVisible);
        };
        var l = {};
        l["emojiSelectData.visible"] = !0, l["emojiSelectData.emotioVisible"] = "ob" != this.page.type && "obChallenge" != this.page.type, 
        l["emojiSelectData.dataSource"] = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ], 
        i.setData(l);
    }
    return i(n, [ {
        key: "refreshEmotioVisible",
        value: function() {
            var e = a.getData(), i = this.page.getViewType(e.userInfo, e.rivalUser), t = {};
            3 != i && (t["emojiSelectData.visible"] = !0), t["emojiSelectData.emotioVisible"] = 3 != i, 
            this.page.setData(t);
        }
    }, {
        key: "setEmojiController",
        value: function(e) {
            this.emojiController = e;
        }
    }, {
        key: "setRoomId",
        value: function(e) {
            this.roomId = e;
        }
    }, {
        key: "setVisible",
        value: function(e) {
            var i = {};
            i["emojiSelectData.visible"] = e, this.page.setData(i);
        }
    }, {
        key: "setPanelVisible",
        value: function(e) {
            if (!this.panelVisibleChange) if (this.btnLock = !0, this.panelVisibleChange = !0, 
            this.panelVisible = e, e) {
                var i = wx.createAnimation();
                i.opacity(1).scale(1).step({
                    timingFunction: "ease-in-out",
                    duration: 300,
                    transformOrigin: "0% 10%"
                });
                var t = wx.createAnimation();
                t.scale(2).opacity(0).step({
                    timingFunction: "ease-in-out",
                    duration: 200,
                    transformOrigin: "0% 50%"
                });
                var a = {};
                a["emojiSelectData.panelVisibleAni"] = i.export(), a["emojiSelectData.btnAni"] = t.export(), 
                a["emojiSelectData.panelVisible"] = !0, this.page.setData(a), this.setPanelVisibleTimeout();
            } else {
                var n = wx.createAnimation();
                n.opacity(0).scale(0).step({
                    timingFunction: "ease-in-out",
                    duration: 300,
                    transformOrigin: "0% 0%"
                });
                var o = wx.createAnimation();
                o.scale(1).opacity(1).step({
                    timingFunction: "ease-in-out",
                    duration: 200,
                    transformOrigin: "0% 0%"
                });
                var l = {};
                l["emojiSelectData.panelVisibleAni"] = n.export(), l["emojiSelectData.btnAni"] = o.export(), 
                l["emojiSelectData.panelVisible"] = !1, this.page.setData(l), this.setPanelVisibleTimeout();
            }
        }
    }, {
        key: "setPanelVisibleTimeout",
        value: function() {
            var e = this;
            this.clearPanelVisibleTimeout(), this.panelVisibleTimeout = setTimeout(function() {
                e.btnLock = !1, e.panelVisibleChange = !1, e.panelVisibleTimeout = void 0;
            }, 300);
        }
    }, {
        key: "clearPanelVisibleTimeout",
        value: function() {
            this.panelVisibleTimeout && (clearTimeout(this.panelVisibleTimeout), this.panelVisibleTimeout = void 0);
        }
    } ]), n;
}());

module.exports = n;