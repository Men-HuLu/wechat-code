var t = getApp();

Page({
    data: {
        statusBarHeight: t.globalData.statusBarHeight,
        platform: t.globalData.platform,
        list: [],
        selected: 0,
        scrollHeight: 0,
        subCategory: []
    },
    onLoad: function() {
        mockData[0].selected = !0, this.setData({
            list: mockData,
            subCategory: mockData[0].subCategory,
            selected: 0
        });
    },
    changeTab: function(t) {
        var a = t.target.dataset.idx;
        this.data.list.forEach(function(t) {
            t.selected = !1;
        }), this.data.list[a].selected = !0, this.setData({
            list: this.data.list,
            subCategory: this.data.list[a].subCategory,
            selected: a
        });
    }
});