function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var s = t[i];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
            Object.defineProperty(e, s.key, s);
        }
    }
    return function(t, i, s) {
        return i && e(t.prototype, i), s && e(t, s), t;
    };
}(), i = (require("./../../../util/util.js"), require("./../../../net/roleNet.js"), 
require("./../../../const/consts.js"), require("../template/MillionsImageCreater.js"), 
getApp(), function() {
    function i(t) {
        var s = this;
        e(this, i), this.page = t, this.page.subscribeGuide_show = function(e) {
            s.setVisible(!0);
        }, this.page.subscribeGuide_onTapClose = function(e) {
            s.setVisible(!1);
        }, this.setVisible(!1);
    }
    return t(i, [ {
        key: "setVisible",
        value: function(e) {
            var t = {};
            t["subscribeGuideData.visible"] = e, this.page.setData(t), e && (this.btnLock = !1);
        }
    } ]), i;
}());

module.exports = i;