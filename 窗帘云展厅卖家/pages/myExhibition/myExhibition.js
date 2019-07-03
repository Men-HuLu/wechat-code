function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

function t(a, t, i) {
    return t in a ? Object.defineProperty(a, t, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = i, a;
}

a(require("../../libs/userLogin.js"));

var i = a(require("../../utils/interface.js")), e = a(require("../../libs/ajax.js")), o = getApp(), n = 0, l = 1;

Page({
    data: {
        loading: !1,
        loadingText: "加载更多...",
        allData2: "",
        col1: [],
        col2: [],
        images: [],
        tabbu: 1,
        page: 1
    },
    UserInfoMask: function() {
        o.getUserInfo(this);
    },
    PhoneNumberMask: function(a) {
        o.getPhoneNumber(a, this);
    },
    has_phone: function() {
        var a = this, t = new e.default({
            data: {
                uid: o.globalData.uid
            },
            path: i.default.has_phone
        });
        t.then(function(t) {
            a.setData({
                has_phone: t.msg.has_phone
            });
        }), t.catch(function(a) {
            console.log(a.msg);
        });
    },
    navigator: function(a) {
        var t = this.data.uid, i = a.currentTarget.dataset.id;
        o.globalData.myExhibition = !1, console.log(this.data), wx.setStorageSync("myExhibitionData", this.data), 
        wx.navigateTo({
            url: "/pages/CommodityDetails/CommodityDetails?id=" + i + "&share=0&isMySelf=true&pageId=" + t
        });
    },
    photoChange: function(a) {
        var t = a.currentTarget.dataset.id;
        o.tackphoto(t);
    },
    onLoad: function(a) {
        var t = this;
        wx.hideShareMenu(), o.globalData.myExhibition = !1, wx.removeStorageSync("myExhibitionData"), 
        this.setData({
            uid: a.uid
        }), o.login(this, o, function() {
            0 == o.globalData.has_phone ? t.has_phone() : t.setData({
                has_phone: !0
            });
        });
    },
    previewImage: function(a) {
        wx.previewImage({
            current: a.currentTarget.dataset.src,
            urls: [ a.currentTarget.dataset.src ],
            success: function(a) {},
            fail: function(a) {},
            complete: function(a) {}
        });
    },
    load: function(a) {
        wx.downloadFile({
            url: a.currentTarget.dataset.download,
            complete: function(a) {
                200 == a.statusCode ? (wx.playVoice({
                    filePath: "https://www.clyzt.cn" + i.default.loadImg,
                    data: {
                        id: o.globalData.uid
                    }
                }), wx.saveImageToPhotosAlbum({
                    filePath: a.tempFilePath,
                    success: function(a) {
                        wx.showToast({
                            title: "下载到系统相册成功",
                            icon: "none"
                        });
                    },
                    fail: function(a) {
                        console.log(a), "saveImageToPhotosAlbum:fail auth deny" === a.errMsg && (console.log("打开设置窗口"), 
                        wx.openSetting({
                            success: function(a) {
                                console.log(a), a.authSetting["scope.writePhotosAlbum"] ? console.log("获取权限成功，再次点击图片保存到相册") : console.log("获取权限失败");
                            }
                        }));
                    }
                })) : (console.log(a), wx.showToast({
                    title: "服务器请求失败",
                    icon: "none"
                }));
            }
        });
    },
    search: function(a) {
        wx.setStorageSync("myExhibitionData", this.data), wx.navigateTo({
            url: "/pages/search/search?callPage=myExhibition"
        });
    },
    onShareAppMessage: function(a) {
        return {
            title: "分享云展厅",
            success: function(a) {
                wx.showToast({
                    title: "分享成功"
                });
            },
            fail: function(a) {
                wx.showToast({
                    title: "分享失败",
                    icon: "none"
                });
            }
        };
    },
    onReady: function() {},
    clear: function() {
        var a = this;
        o.globalData.myExhibition = !1, this.setData({
            page: 1
        });
        var t = new e.default({
            reqtype: "GET",
            path: i.default.myExhibition,
            data: {
                userId: o.globalData.uid,
                uid: this.data.uid,
                page: this.data.page,
                data: ""
            }
        });
        t.then(function(t) {
            console.log(t), a.setData({
                data: t,
                hallName: t.infor.hallName
            }), "" == t.infor.hallName ? wx.setNavigationBarTitle({
                title: "云展厅"
            }) : wx.setNavigationBarTitle({
                title: t.infor.hallName
            }), wx.hideLoading();
        }), t.catch(function(a) {
            console.log(a);
        });
    },
    onShow: function() {
        var a = this;
        "" != wx.getStorageSync("myExhibitionData") ? this.setData({
            data: myExhibitionData.data,
            hallName: myExhibitionData.hallName,
            loading: myExhibitionData.loading,
            loadingText: myExhibitionData.loadingText,
            page: myExhibitionData.page,
            uid: myExhibitionData.uid
        }) : (this.setData({
            page: 1,
            col1: [],
            col2: [],
            images: []
        }), n = 0, l = 1, wx.getStorage({
            key: "myExhibition",
            success: function(t) {
                var n = "";
                if (1 == o.globalData.myExhibition) {
                    n = wx.getStorageSync("myExhibition");
                    var l = wx.getStorageSync("myExhibitioninput");
                    "" != l ? a.setData({
                        input: l
                    }) : a.setData({
                        input: ""
                    });
                }
                wx.showLoading({
                    title: "加载中..."
                });
                var s = new e.default({
                    reqtype: "GET",
                    path: i.default.myExhibition,
                    data: {
                        userId: o.globalData.uid,
                        uid: a.data.uid,
                        page: a.data.page,
                        data: n
                    }
                });
                s.then(function(t) {
                    a.setData({
                        data: t,
                        hallName: t.infor.hallName
                    }), a.CloneData(), "" == t.infor.hallName ? wx.setNavigationBarTitle({
                        title: "云展厅"
                    }) : wx.setNavigationBarTitle({
                        title: t.infor.hallName
                    }), wx.hideLoading();
                }), s.catch(function(a) {
                    console.log(a);
                });
            },
            fail: function(t) {
                var n = new e.default({
                    reqtype: "GET",
                    path: i.default.myExhibition,
                    data: {
                        userId: o.globalData.uid,
                        uid: a.data.uid,
                        page: a.data.page,
                        data: ""
                    }
                });
                n.then(function(t) {
                    a.setData({
                        data: t,
                        hallName: t.infor.hallName
                    }), a.CloneData(), "" == t.infor.hallName ? wx.setNavigationBarTitle({
                        title: "云展厅"
                    }) : wx.setNavigationBarTitle({
                        title: t.infor.hallName
                    }), wx.hideLoading();
                }), n.catch(function(a) {
                    console.log(a);
                });
            }
        }));
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var a = this;
        o.globalData.myExhibition = !1, this.setData({
            "data.list": "",
            page: 1,
            col1: [],
            col2: [],
            images: []
        }), wx.getStorage({
            key: "myExhibition",
            success: function(t) {
                var n = "";
                1 == o.globalData.myExhibition && (n = wx.getStorageSync("myExhibition")), wx.showLoading({
                    title: "加载中..."
                });
                var l = new e.default({
                    reqtype: "GET",
                    path: i.default.myExhibition,
                    data: {
                        userId: o.globalData.uid,
                        uid: a.data.uid,
                        page: a.data.page,
                        data: n
                    }
                });
                l.then(function(t) {
                    a.setData({
                        data: t,
                        hallName: t.infor.hallName
                    }), a.CloneData(), "" == t.infor.hallName ? wx.setNavigationBarTitle({
                        title: "云展厅"
                    }) : wx.setNavigationBarTitle({
                        title: t.infor.hallName
                    }), wx.hideLoading();
                }), l.catch(function(a) {
                    console.log(a);
                });
            },
            fail: function(t) {
                wx.showLoading({
                    title: "加载中..."
                });
                var n = new e.default({
                    reqtype: "GET",
                    path: i.default.myExhibition,
                    data: {
                        userId: o.globalData.uid,
                        uid: a.data.uid,
                        page: a.data.page,
                        data: ""
                    }
                });
                n.then(function(t) {
                    a.setData({
                        data: t,
                        hallName: t.infor.hallName
                    }), "" == t.infor.hallName ? wx.setNavigationBarTitle({
                        title: "云展厅"
                    }) : wx.setNavigationBarTitle({
                        title: t.infor.hallName
                    }), wx.hideLoading();
                }), n.catch(function(a) {
                    console.log(a);
                });
            }
        }), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        var a = this, n = this.data.page;
        n++, this.setData({
            page: n,
            loading: !0
        });
        try {
            var l = "";
            1 == o.globalData.myExhibition && (l = wx.getStorageSync("myExhibition"));
            var s = this.data.uid, h = new e.default({
                contentType: !0,
                reqtype: "GET",
                path: i.default.myExhibition,
                data: {
                    userId: o.globalData.uid,
                    uid: s,
                    page: this.data.page,
                    data: l
                }
            });
            h.then(function(i) {
                if (0 == i.list.length) a.setData({
                    loadingText: "暂无其它数据"
                }); else {
                    var e = a.data.data.list, o = e[e.length - 1].time, n = i.list[0].time;
                    i.data = i.list, o === n && (e[e.length - 1].commodity = e[e.length - 1].commodity.concat(i.list[0].commodity), 
                    i.data = i.list.slice(1)), i.data.forEach(function(a, t) {
                        e = e.concat(a);
                    }), a.setData(t({}, "data.list", e)), a.CloneData();
                }
            }), h.catch(function(a) {
                console.log(a);
            });
        } catch (a) {
            wx.showToast({
                title: "获取本地缓存失败"
            });
        }
    },
    CloneData: function() {
        var a = [], t = this.data.data.list;
        console.log(t);
        var i = [];
        t.forEach(function(t) {
            var e = t.time, o = t.temp;
            t.commodity.forEach(function(t) {
                t.time = e, t.temp = o, a.push(t);
                var n = {};
                n.src = t.image, n.id = t.id, i.push(n);
            });
        }), this.setData({
            "allData2.list": a,
            images: i
        });
    },
    onImageLoad: function(a) {
        for (var t = a.currentTarget.id, i = a.detail.width, e = a.detail.height * (155.5 / i), o = null, s = this.data.allData2.list, h = 0; h < s.length; h++) {
            var d = s[h];
            if (d.id === t) {
                o = d;
                break;
            }
        }
        var c = this.data.col1, u = this.data.col2;
        n <= l ? (n += e, c.push(o)) : (l += e, u.push(o)), this.setData({
            col1: c,
            col2: u
        });
    },
    tabBu: function(a) {
        console.log(this.data), 0 == this.data.tabbu ? this.setData({
            tabbu: 1
        }) : this.setData({
            tabbu: 0
        });
    }
});