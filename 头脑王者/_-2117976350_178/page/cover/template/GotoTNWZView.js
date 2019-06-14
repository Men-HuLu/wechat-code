function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, i, n) {
        return i && t(e.prototype, i), n && t(e, n), e;
    };
}(), i = require("./../../../util/util.js"), n = (require("./../../../const/consts.js"), 
getApp()), o = function() {
    function o(e) {
        var i = this;
        t(this, o), this.page = e, this.onShowNum = 0, this.page.gotoTNWZView_onTapCancelBtn = function(t) {
            i.setVisible(!1);
        }, this.page.gotoTNWZView_onTapOKBtn = function(t) {
            i.btnLock || (i.btnLock = !0, i.goto(), i.setVisible(!1));
        }, this.page.gotoTNWZView_onTapClose = function(t) {
            i.setVisible(!1);
        }, this.page.setData({
            gotoTNWZData: {
                visible: !1
            }
        });
    }
    return e(o, [ {
        key: "goto",
        value: function() {
            wx.navigateToMiniProgram && wx.navigateToMiniProgram({
                path: "page/login/login",
                appId: "wxdc2909b7b61bb6ae",
                success: function(t) {},
                fail: function(t) {}
            }), this.setVisible(!1);
        }
    }, {
        key: "onShow",
        value: function() {
            i.getServerTime() < (n.mainData.role.seasonInfo ? 1e3 * n.mainData.role.seasonInfo.endTime : Math.Infinity) && n.getGameConf("zhshow") && (this.onShowNum++, 
            n.isBeginnerTestUser() ? this.setVisible(!0) : n.mainData.loginArgs.friendCode ? this.setVisible(2 == this.onShowNum) : this.setVisible(1 == this.onShowNum));
        }
    }, {
        key: "setVisible",
        value: function(t) {
            var e = {};
            e["gotoTNWZData.avatarUrl"] = "../../image/qr/avatar.png", e["gotoTNWZData.visible"] = t, 
            this.page.setData(e), t && (this.onShowNum = 3, this.btnLock = !1);
        }
    } ]), o;
}();

module.exports = o;