function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../common/httpClient")), a = t(require("../config/index")), i = t(require("../common/util")), n = (t(require("../common/storage")), 
t(require("../common/navigator"))), o = t(require("../common/point"));

getApp();

Page({
    data: {
        activeIndex: 0,
        scrollLeft: 0,
        cate1Info: [],
        errImgList: {},
        currentCate1Id: 0,
        isLoading: !0,
        isError: !1,
        isChangeFinish: !0
    },
    onLoad: function() {
        this.init();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    onPageScroll: function() {},
    onTabItemTap: function() {},
    chooseCatalog: function(t) {
        var e = this;
        this.activeIndex = t.detail.activeIndex, this.currentCate1Id = this.cate1Info[this.activeIndex].cate1Id;
        var i = {
            cid: this.currentCate1Id
        };
        o.default.postPoint(a.default.Point.INIT_PAGE_LIVE, a.default.Point.PAGE_LIVE, 0, i), 
        this.setData({
            activeIndex: this.activeIndex,
            index: this.activeIndex,
            currentCate1Id: this.currentCate1Id
        }, function() {
            e.setData({});
        });
    },
    errImg: function(t) {
        var e = t.currentTarget.dataset.errImgIndex;
        this.data.errImgList[e] = "../assets/images/catalogs-cover.png", this.setData({
            errImgList: this.data.errImgList
        });
    },
    changeFinish: function(t) {
        this.isChangeFinish = !0, this.setData({
            isChangeFinish: this.isChangeFinish
        });
    },
    reload: function() {
        this.isLoading = !0, this.isError = !1, this.setData({
            isLoading: this.isLoading,
            isError: this.isError
        }), this.init();
    },
    goCatalogList: function(t) {
        var e = t.currentTarget.dataset.i;
        n.default.disDoubleNavigate("calalogue-list?type=" + e.shortName + "&name=" + e.cate2Name);
    },
    getCataStorageData: function() {
        return e.default.requestStorageFirst({
            url: a.default.API.GETCATALOGDATA,
            complete: function() {}
        });
    },
    fakeLazyLoad: function() {
        var t = 0, e = [];
        if (this.cate2Info.length < 30) return this.cate2Info;
        for (;t < 30; t += 1) e.push(this.cate2Info[t]);
        return e;
    },
    orderCate2Info: function() {
        var t = this, e = this.cate1Info, a = void 0, n = e.length || 0, o = this.cate2Info.length || 0, r = [];
        for (a = 0; a < o; a += 1) r[this.cate2Info[a].cate1Id] || (r[this.cate2Info[a].cate1Id] = []), 
        this.cate2Info[a].cate2Name = i.default.htmlDecode(this.cate2Info[a].cate2Name), 
        r[this.cate2Info[a].cate1Id].push(this.cate2Info[a]);
        for (a = 0; a < n; a += 1) {
            var s = e[a].cate1Id;
            e[a].cate2Info = r[s];
        }
        var c = {
            cate1Id: 0,
            cate1Name: "全部分类",
            shortName: "qbfl",
            cate2Info: this.fakeLazyLoad()
        };
        e.unshift(c), this.cate1Info = e, this.currentCate1Id = e[0].cate1Id, this.setData({
            cate1Info: this.cate1Info,
            currentCate1Id: this.currentCate1Id
        }), setTimeout(function() {
            var a = {
                cate1Id: 0,
                cate1Name: "全部分类",
                shortName: "qbfl",
                cate2Info: t.cate2Info
            };
            e[0] = a, t.cate1Info = e, t.setData({
                cate1Info: t.cate1Info
            });
        }, 100);
    },
    init: function() {
        var t = this;
        this.getCataStorageData().then(function(e) {
            t.cate1Info = e.data.cate1Info, t.cate2Info = e.data.cate2Info, t.orderCate2Info();
            var i = {
                cid: 0
            };
            o.default.postPoint(a.default.Point.INIT_PAGE_LIVE, a.default.Point.PAGE_LIVE, 0, i), 
            t.isLoading = !1, t.isError = !1, t.setData({
                cate1Info: t.cate1Info,
                cate2Info: t.cate2Info,
                isLoading: t.isLoading,
                isError: t.isError
            });
        }, function(e) {
            t.isLoading = !1, t.isError = !0, t.setData({
                isLoading: t.isLoading,
                isError: t.isError
            });
        });
    }
});