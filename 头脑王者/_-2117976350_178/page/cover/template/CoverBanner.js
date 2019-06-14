function n(n, e) {
    if (!(n instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function n(n, e) {
        for (var r = 0; r < e.length; r++) {
            var a = e[r];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(n, a.key, a);
        }
    }
    return function(e, r, a) {
        return r && n(e.prototype, r), a && n(e, a), e;
    };
}(), r = require("./../../../util/util.js"), a = require("./../../../const/consts.js"), t = require("./CoverBannerMillion.js"), i = require("./CoverBannerSpecial.js"), s = getApp(), o = function() {
    function o(e) {
        n(this, o), this.page = e, this.banner = null;
    }
    return e(o, [ {
        key: "onShow",
        value: function() {
            this.refreshBanner();
        }
    }, {
        key: "refreshBanner",
        value: function() {
            if (!s.mainData.role.bannerInfo) return this.killBanner(), void r.log("controller.refreshBanner：bannerInfo为空 killBanner");
            if (!this.banner) switch (s.mainData.role.bannerInfo.base.typeName) {
              case a.coverBannerType.million:
                this.banner = new t(this);
                break;

              case a.coverBannerType.special:
                this.banner = new i(this);
            }
            this.banner && this.banner.refreshBanner && this.banner.refreshBanner();
        }
    }, {
        key: "killBanner",
        value: function() {
            r.setPageData(this.page, {
                "banner.visible": !1
            }), this.banner && this.banner.onUnload(), this.banner = null, s.mainData.role.bannerInfo = null;
        }
    }, {
        key: "setBannerStatus",
        value: function(n) {
            this.banner && this.banner.setBannerStatus && this.banner.setBannerStatus(n);
        }
    }, {
        key: "onUnload",
        value: function() {
            this.banner && this.banner.onUnload && this.banner.onUnload();
        }
    }, {
        key: "onHide",
        value: function() {
            this.banner && this.banner.onHide && this.banner.onHide();
        }
    } ]), o;
}();

module.exports = o;