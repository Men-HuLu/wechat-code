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
}(), a = require("./../../../util/util.js"), o = (require("./../../../const/consts.js"), 
require("./../../../util/Tween.js"), require("./../../../util/ChallengeRoomDataManager.js")), i = require("./../../../net/challengeNet.js"), n = (getApp(), 
function() {
    function n(t) {
        var r = this;
        e(this, n), this.page = t;
        for (var m = [], s = 0; s < o.roomLimitCount.length; s++) {
            var l = o.roomLimitCount[s], u = Object.assign({}, l);
            u.selected = 2 == s, m.push(u);
        }
        var c = {
            createRoomView: {
                visible: !1,
                roomName: null,
                lenOfInputName: 0,
                moreSetting: !1,
                moreSettingIndex: 2,
                titleSelected: m[2].title,
                items: m,
                defaultRoomName: this.defaultRoomName,
                isCanCreateRoom: !0,
                isInputDisable: !0,
                isGetInputFocus: !1
            }
        };
        this.page.setData(c), this.page.onTapMoreSettingItem = function(e) {
            var t = e.currentTarget.dataset.id, a = {};
            a["createRoomView.moreSettingIndex"] = t, a["createRoomView.titleSelected"] = 0 == t ? r.page.data.createRoomView.items[t].title : "个人获得" + r.page.data.createRoomView.items[t].title;
            for (var o = 0; o < r.page.data.createRoomView.items.length; o++) a["createRoomView.items[" + o + "].selected"] = o == t;
            r.page.setData(a);
        }, this.page.onTapMoreSetting = function() {
            var e = {};
            e["createRoomView.moreSetting"] = !r.page.data.createRoomView.moreSetting, r.page.setData(e);
        }, this.page.callback_roomName_input = function(e) {
            var t = e.detail.value, o = {}, i = Math.ceil(a.getWordLength(t));
            o["createRoomView.lenOfInputName"] = i, o["createRoomView.isCanCreateRoom"] = t == r.defaultRoomName, 
            r.page.setData(o);
        }, this.page.callback_roomName_bindblur = function(e) {
            var t = e.detail.value;
            r.roomName = t, Math.ceil(a.getWordLength(t)) > 8 ? (a.ShowConfirm("提示", "房间名不得超过8个字", function() {}), 
            r.defaultRoomName = a.getWord(t, 5) + "…房间") : 0 == t.length ? a.ShowConfirm("提示", "房间名不得为空", function() {}) : (r.roomName = t, 
            r.defaultRoomName = t);
            var o = Math.ceil(a.getWordLength(r.defaultRoomName)), i = {};
            i["createRoomView.defaultRoomName"] = r.defaultRoomName, i["createRoomView.lenOfInputName"] = o, 
            r.page.setData(i);
        }, this.page.onTapCreateRoomViewCloseBtn = function() {
            var e = {};
            e["createRoomView.visible"] = !1, r.page.setData(e);
        }, this.page.onTapCheckRoomName = function(e) {
            if (r.startInput) i.checkWord(r.roomName, function(e, t) {
                if (e) a.ShowToast("房间名不合法"); else {
                    var o = {};
                    o["createRoomView.isCanCreateRoom"] = !0, r.page.setData(o), a.ShowToast("房间名合法");
                }
            }); else {
                var t = {};
                t["createRoomView.isGetInputFocus"] = !0, t["createRoomView.isInputDisable"] = !1, 
                r.page.setData(t), r.startInput = !0;
            }
        };
    }
    return t(n, [ {
        key: "show",
        value: function(e) {}
    }, {
        key: "setDefaultRoomName",
        value: function(e) {
            var t = e + "";
            this.defaultRoomName = t.substr(t.length - 8, t.length) + "房间", this.roomName = this.defaultRoomName;
            var o = {}, i = Math.ceil(a.getWordLength(this.defaultRoomName));
            o["createRoomView.lenOfInputName"] = i, o["createRoomView.defaultRoomName"] = this.defaultRoomName, 
            this.page.setData(o);
        }
    } ]), n;
}());

module.exports = n;