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
}(), t = require("./../util/util.js"), a = function() {
    function a(i) {
        e(this, a), this.curPage != i && (this.curPage = i, i.liveExpiredView_onTapCloseBtn = this.liveExpiredView_onTapCloseBtn.bind(this), 
        i.liveExpiredView_onTapShareBtn = this.liveExpiredView_onTapShareBtn.bind(this), 
        i.liveExpiredView_onTapPVEBtn = this.liveExpiredView_onTapPVEBtn.bind(this));
    }
    return i(a, [ {
        key: "liveExpiredView_onTapCloseBtn",
        value: function() {
            if (this.curPage) {
                t.setPageData(this.curPage, {
                    "liveExpiredViewData.visible": !1
                });
            }
        }
    }, {
        key: "liveExpiredView_onTapShareBtn",
        value: function() {
            this.curPage && t.setPageData(this.curPage, {
                "liveExpiredViewData.visible": !1
            });
        }
    }, {
        key: "liveExpiredView_onTapPVEBtn",
        value: function() {
            getApp().gotoPVE(function() {}, function() {}), this.curPage && t.setPageData(this.curPage, {
                "liveExpiredViewData.visible": !1
            });
        }
    }, {
        key: "show",
        value: function(e, i) {
            this.curPage && (t.setPageData(this.curPage, {
                "liveExpiredViewData.title": e,
                "liveExpiredViewData.visible": !0,
                "liveExpiredViewData.isZjw": i
            }), this.title = "");
        }
    } ]), a;
}();

module.exports = a;