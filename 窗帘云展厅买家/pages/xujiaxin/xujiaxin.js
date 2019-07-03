function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

a(require("../../libs/audio.js"));

var e = a(require("../../libs/ajax.js")), t = (a(require("../../libs/userLogin.js")), 
getApp(), require("../../utils/interface.js"));

Page({
    data: {
        index: "0",
        array: [ "美国", "中国", "巴西", "日本" ],
        teamContent: "",
        teamContentProgress: ""
    },
    bindPickerChange: function(a) {
        console.log("picker发送选择改变，携带值为", a.detail.value), this.setData({
            index: a.detail.value
        });
    },
    onLoad: function(a) {
        wx.hideShareMenu();
    },
    onReady: function() {},
    onShow: function() {
        var a = this;
        wx.showLoading({
            title: "加载中..."
        });
        var s = new e.default({
            reqtype: "GET",
            path: t.team
        });
        s.then(function(e) {
            for (var t = [], s = 0; s < e.data.length; s++) e.data[s].successProgress = e.data[s].archivedCount / e.data[s].projectCount * 100, 
            isNaN(e.data[s].successProgress) && (e.data[s].successProgress = 0), e.data[s].fileProgress = e.data[s].abortedCount / e.data[s].projectCount * 100, 
            isNaN(e.data[s].fileProgress) && (e.data[s].fileProgress = 0), e.data[s].unfinished = 100 - (e.data[s].fileProgress + e.data[s].archivedCount), 
            isNaN(e.data[s].unfinished) && (e.data[s].unfinished = 0), t[s] = e.data[s].projectCount, 
            console.log(e.data[s].successProgress);
            console.log(e.data), a.setData({
                teamContent: e.data
            }), console.log(a.data.teamContent.length), wx.hideLoading();
        }), s.catch(function(a) {
            console.log(a);
        });
        var n = this.data.taskSuccess / this.data.taskAll * 100, o = this.data.taskEnd / this.data.taskAll * 100, i = 100 - (o + n);
        this.setData({
            progressSuccess: n,
            progressFail: o,
            unfinished: i
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        wx.hideShareMenu();
    }
});