var a = getApp();

Page({
    data: {
        ProductList: null,
        SortBy: "",
        SortOrder: "asc",
        KeyWord: "",
        PageIndex: 1,
        PageSize: 10,
        Num: 0,
        SortClass: ""
    },
    onLoad: function(a) {
        var t = a.keyword;
        void 0 == t && (t = "");
        var e = this;
        e.setData({
            KeyWord: t
        }), e.loadData(e, !1);
    },
    onReady: function() {},
    onShow: function() {
        var a = "";
        void 0 == this.data.keyword && (a = "");
        var t = this;
        t.setData({
            KeyWord: a
        }), t.loadData(t, !1);
    },
    onHide: function() {},
    onUnload: function() {},
    onSearch: function(a) {
        var t = this;
        t.setData({
            PageIndex: 1
        }), t.loadData(t, !1);
    },
    onReachBottom: function() {
        var a = this, t = a.data.PageIndex + 1;
        a.setData({
            PageIndex: t
        }), a.loadData(a, !0);
    },
    bindKeyWordInput: function(a) {
        this.setData({
            KeyWord: a.detail.value
        });
    },
    bindBlurInput: function(a) {
        wx.hideKeyboard();
    },
    gotoKeyWordPage: function(a) {
        wx.navigateTo({
            url: "../search/search?SourceUrl=productlist"
        });
    },
    onConfirmSearch: function(a) {
        var t = this, e = a.detail.value;
        t.setData({
            KeyWord: e,
            PageIndex: 1
        }), t.loadData(t, !1);
    },
    onSortClick: function(a) {
        var t = this, e = a.target.dataset.sortby, o = a.currentTarget.dataset.num, d = "asc", r = "shengxu";
        t.data.SortOrder == d && (d = "desc", r = "jiangxu"), t.setData({
            PageIndex: 1,
            SortBy: e,
            SortOrder: d,
            Num: o,
            SortClass: r
        }), t.loadData(t, !1);
    },
    goToProductDetail: function(a) {
        var t = a.currentTarget.dataset.productid, e = a.currentTarget.dataset.activeid, o = "../productdetail/productdetail?id=" + t;
        1 == a.currentTarget.dataset.activetype && (o = "../countdowndetail/countdowndetail?id=" + e), 
        wx.navigateTo({
            url: o
        });
    },
    loadData: function(t, e) {
        wx.showNavigationBarLoading(), a.getOpenId(function(o) {
            wx.request({
                url: a.getUrl("GetProducts"),
                data: {
                    openId: o,
                    keyword: t.data.KeyWord,
                    pageIndex: t.data.PageIndex,
                    pageSize: t.data.PageSize,
                    sortBy: t.data.SortBy,
                    sortOrder: t.data.SortOrder
                },
                success: function(a) {
                    if ("OK" == a.data.Status) {
                        var o = a.data.Data;
                        if (e) {
                            var d = t.data.ProductList;
                            d.push.apply(d, o), t.setData({
                                ProductList: d
                            });
                        } else t.setData({
                            ProductList: o
                        });
                        wx.hideNavigationBarLoading();
                    } else "NOUser" == a.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : wx.showModal({
                        title: "提示",
                        content: a.data.Message,
                        showCancel: !1,
                        success: function(a) {
                            a.confirm && wx.navigateBack({
                                delta: 1
                            });
                        }
                    });
                }
            });
        });
    }
});