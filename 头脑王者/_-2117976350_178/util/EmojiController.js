function t(t, i) {
    if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
}

var i = function() {
    function t(t, i) {
        for (var e = 0; e < i.length; e++) {
            var a = i[e];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(t, a.key, a);
        }
    }
    return function(i, e, a) {
        return e && t(i.prototype, e), a && t(i, a), i;
    };
}(), e = require("./../util/Tween.js"), a = function() {
    function a(i, e, n) {
        t(this, a);
        getApp();
        this.page = i, this.variableName = e, this.inLeft = n, this.nextId = 1, this.itemList = [];
        var r = {};
        r[this.variableName] = {
            inLeft: n
        }, this.page.setData(r);
    }
    return i(a, [ {
        key: "setInLeft",
        value: function(t) {
            this.inLeft = t;
            var i = {};
            i[this.variableName + ".inLeft"] = t, this.page.setData(i);
        }
    }, {
        key: "showFace",
        value: function(t) {
            var i = {
                id: this.nextId,
                fid: t,
                ani: null
            };
            this.itemList.push(i);
            var e = {};
            e[this.variableName + ".itemList"] = this.itemList, this.page.setData(e), this.inLeft ? this.playLeftEmojiAni(i) : this.playRightEmojiAni(i), 
            this.nextId++;
        }
    }, {
        key: "playLeftEmojiAni",
        value: function(t) {
            var i = this, a = e.fastGet(this.variableName + "_emojiItem" + t.id);
            a.wait(100), a.call(function() {
                var e = i.getItemIndex(t), a = wx.createAnimation();
                a.scale(1.7).opacity(1).step({
                    timingFunction: "ease-in",
                    transformOrigin: "50% 50% 0",
                    duration: 300
                }), a.scale(1.5).step({
                    timingFunction: "ease-out",
                    transformOrigin: "50% 50% 0",
                    duration: 200
                }), t.ani = a.export();
                var n = {};
                n[i.variableName + ".itemList[" + e + "]"] = t, i.page.setData(n);
            }), a.wait(1e3), a.call(function() {
                var e = i.getItemIndex(t), a = wx.createAnimation();
                a.left("200px").opacity(0).scale(1.5).step({
                    timingFunction: "ease-out",
                    transformOrigin: "50% 50% 0",
                    duration: 800
                }), t.ani = a.export();
                var n = {};
                n[i.variableName + ".itemList[" + e + "]"] = t, i.page.setData(n);
            }), a.wait(800);
        }
    }, {
        key: "playRightEmojiAni",
        value: function(t) {
            var i = this, a = (this.getItemIndex(t), e.fastGet(this.variableName + "_emojiItem" + t.id));
            a.wait(100), a.call(function() {
                var e = i.getItemIndex(t), a = wx.createAnimation();
                a.scale(1.7).opacity(1).step({
                    timingFunction: "ease-in",
                    transformOrigin: "50% 50% 0",
                    duration: 300
                }), a.scale(1.5).step({
                    timingFunction: "ease-out",
                    transformOrigin: "50% 50% 0",
                    duration: 200
                }), t.ani = a.export();
                var n = {};
                n[i.variableName + ".itemList[" + e + "]"] = t, i.page.setData(n);
            }), a.wait(1e3), a.call(function() {
                var e = i.getItemIndex(t), a = wx.createAnimation();
                a.right("200px").opacity(0).scale(1.5).step({
                    timingFunction: "ease-out",
                    transformOrigin: "50% 50% 0",
                    duration: 800
                }), t.ani = a.export();
                var n = {};
                n[i.variableName + ".itemList[" + e + "]"] = t, i.page.setData(n);
            }), a.wait(800), a.call(function() {
                var e = i.getItemIndex(t);
                if (e >= 0) {
                    i.itemList.splice(e, 1);
                    var a = {};
                    a[i.variableName + ".itemList"] = i.itemList, i.page.setData(a);
                }
            });
        }
    }, {
        key: "getItemIndex",
        value: function(t) {
            for (var i = this.itemList.length - 1; i >= 0; i--) if (this.itemList[i].id == t.id) return i;
            return -1;
        }
    } ]), a;
}();

module.exports = a;