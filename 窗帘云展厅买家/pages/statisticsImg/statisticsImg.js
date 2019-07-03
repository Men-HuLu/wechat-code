function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var t = function(a) {
    if (a && a.__esModule) return a;
    var t = {};
    if (null != a) for (var e in a) Object.prototype.hasOwnProperty.call(a, e) && (t[e] = a[e]);
    return t.default = a, t;
}(require("../../ec-canvas/echarts")), e = a(require("../../utils/interface.js")), i = a(require("../../libs/ajax.js")), o = getApp(), n = null;

Page({
    onShareAppMessage: function(a) {
        return {
            title: "商品统计",
            path: "/pages/statisticsImg/statisticsImg",
            success: function() {},
            fail: function() {}
        };
    },
    data: {
        ec: {
            onInit: function(a, e, i) {
                console.log(e, i), n = t.init(a, null, {
                    width: e,
                    height: i
                }), a.setChart(n);
                return n;
            }
        },
        dataName: [],
        dataNum: [],
        tabCli: "browse",
        array: [ "今日", "昨日", "本周", "本月", "今年" ],
        index: "0"
    },
    onLoad: function(a) {
        var t = this;
        wx.hideShareMenu(), wx.showLoading({
            title: "加载中..."
        });
        var n = new i.default({
            reqtype: "GET",
            data: {
                uid: o.globalData.uid,
                time: this.data.index,
                tab: this.data.tabCli
            },
            path: e.default.statisticsImg
        });
        n.then(function(a) {
            var e = a.data.dataName.length;
            console.log(e), t.setData({
                dataName: a.data.dataName,
                dataNum: a.data.dataNum,
                length: e
            }), console.log(t.data), wx.hideLoading(), t.echareShow();
        }), n.catch(function(a) {
            o.showLoading();
        });
    },
    onReady: function() {},
    tabTitle: function(a) {
        var t = this, n = a.target.dataset.tab;
        console.log(n), this.setData({
            tabCli: n
        }), wx.showLoading({
            title: "加载中..."
        });
        var d = new i.default({
            reqtype: "GET",
            data: {
                uid: o.globalData.uid,
                time: this.data.index,
                tab: this.data.tabCli
            },
            path: e.default.statisticsImg
        });
        d.then(function(a) {
            var e = a.data.dataName.length;
            console.log(e), t.setData({
                dataName: a.data.dataName,
                dataNum: a.data.dataNum,
                length: e
            }), console.log(t.data), t.echareShow(), wx.hideLoading();
        }), d.catch(function(a) {
            o.showLoading();
        });
    },
    bindPickerChange: function(a) {
        var t = this;
        console.log("picker发送选择改变，携带值为", a.detail.value), this.setData({
            index: a.detail.value
        }), wx.showLoading({
            title: "加载中..."
        });
        var n = new i.default({
            reqtype: "GET",
            data: {
                uid: o.globalData.uid,
                time: this.data.index,
                tab: this.data.tabCli
            },
            path: e.default.statisticsImg
        });
        n.then(function(a) {
            var e = a.data.dataName.length;
            console.log(e), t.setData({
                dataName: a.data.dataName,
                dataNum: a.data.dataNum,
                length: e
            }), console.log(t.data), t.echareShow(), wx.hideLoading();
        }), n.catch(function(a) {
            o.showLoading();
        });
    },
    echareShow: function() {
        var a = this;
        setTimeout(function() {
            console.log(a.data);
            var t = {
                color: [ "#87c441", "#87c441", "#87c441" ],
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow"
                    }
                },
                grid: {
                    left: 0,
                    right: 20,
                    bottom: 0,
                    top: 0,
                    containLabel: !0
                },
                xAxis: [ {
                    type: "value",
                    axisLine: {
                        lineStyle: {
                            color: "#999"
                        }
                    },
                    axisLabel: {
                        color: "#666"
                    }
                } ],
                yAxis: [ {
                    type: "category",
                    axisTick: {
                        show: !1
                    },
                    data: a.data.dataName,
                    axisLine: {
                        lineStyle: {
                            color: "#999"
                        }
                    },
                    axisLabel: {
                        color: "#666"
                    },
                    max: a.data.length
                } ],
                series: [ {
                    name: "热度",
                    type: "bar",
                    barCategoryGap: 80,
                    label: {
                        normal: {
                            show: !0,
                            position: "inside"
                        }
                    },
                    barWidth: 15,
                    data: a.data.dataNum,
                    itemStyle: {}
                } ]
            };
            n.setOption(t), wx.hideLoading();
        }, 400);
    }
});