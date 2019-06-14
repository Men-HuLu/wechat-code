function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../common/point")), a = t(require("../../config/index")), c = t(require("../../common/navigator"));

getApp();

Component({
    properties: {
        cate1Info: {
            type: Array,
            value: [],
            observer: function(t, e, a) {
                var c = this;
                setTimeout(function() {
                    c.calAllScrollItem();
                }, 150);
            }
        },
        activeIndex: {
            type: Number,
            value: 0,
            twoWay: !0
        },
        currentCate1Id: {
            type: String,
            value: 0,
            twoWay: !0
        },
        showRightBtn: {
            type: Boolean,
            value: !1
        },
        showActivity: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        scrollLeft: 0
    },
    methods: {
        onShow: function() {
            this.calAllScrollItem();
        },
        chooseCatalog: function(t) {
            this.activeIndex = t.currentTarget.dataset.index, this.currentCate1Id = this.data.cate1Info[this.activeIndex].cate1Id, 
            this.setData({
                activeIndex: this.activeIndex,
                currentCate1Id: this.currentCate1Id
            }), this.calcScrollLeft();
            var c = this.data.cate1Info[this.activeIndex];
            this.triggerEvent("chooseCallBack", {
                item: c,
                activeIndex: this.activeIndex
            });
            var i = {
                cid: this.currentCate1Id
            };
            e.default.postPoint(a.default.Point.INIT_PAGE_LIVE, a.default.Point.PAGE_LIVE, 0, i);
        },
        goCatalogue: function() {
            c.default.disDoubleNavigate("catalogue");
        },
        calcScrollLeft: function() {
            this.activeIndex < 2 && (this.scrollLeft = 0), this.calcTextLength(this.activeIndex);
        },
        calcTextLength: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
            if (!t || !this.data.cate1Info || !this.data.cate1Info.length) return 0;
            for (var e = 0, a = this.data.calScrollItems[t].width, c = 0; c < t; c += 1) e += this.data.calScrollItems[c].width;
            return this.scrollLeft = e - (wx.getSystemInfoSync().windowWidth - a) / 2, this.setData({
                scrollLeft: this.scrollLeft
            }), e;
        },
        calAllScrollItem: function() {
            var t = this, e = wx.createSelectorQuery().in(this).selectAll(".scroll-view-item");
            this.currentWidth = 0, e.boundingClientRect().exec(function(e) {
                e && e.length && (t.data.calScrollItems = e[0], t.setData({
                    calScrollItems: t.data.calScrollItems
                }));
            });
        }
    },
    behaviors: [],
    created: function() {},
    attached: function() {},
    ready: function() {
        this.calAllScrollItem();
    },
    moved: function() {},
    detached: function() {}
});