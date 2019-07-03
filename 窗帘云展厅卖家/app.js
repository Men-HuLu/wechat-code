function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var e = a(require("./config.js")), t = a(require("./libs/ajax.js")), o = a(require("./utils/interface.js")), n = new (require("./map/qqmap-wx-jssdk.min.js"))({
    key: "NTZBZ-XOO3V-AL3PC-UM5HQ-PPR56-HCFRM"
});

App({
    onLaunch: function(a) {
        var e = a.scene;
        this.globalData.scene = e, this.MUSIC();
    },
    login: function(a, e, s) {
        wx.login({
            success: function(l) {
                var i = new t.default({
                    data: {
                        code: l.code,
                        address: e.globalData.address,
                        version: "2.08"
                    },
                    path: o.default.login
                });
                i.then(function(l) {
                    if ("" == e.globalData.has_phone && a.setData({
                        has_phone: l.data.has_phone
                    }), 1 == l.errcode) return void 0 == a.data.login ? wx.navigateTo({
                        url: "/pages/login/login"
                    }) : wx.showToast({
                        title: "登录失败，请重新登陆",
                        icon: "none"
                    }), !1;
                    e.globalData.has_phone = l.data.has_phone, e.globalData.uid = l.data.uid, e.globalData.oldMan = l.data.has_follow, 
                    wx.getLocation({
                        type: "wgs84",
                        success: function(a) {
                            var s = a.latitude, l = a.longitude;
                            n.reverseGeocoder({
                                location: {
                                    latitude: s,
                                    longitude: l
                                },
                                success: function(a) {
                                    console.log(a.result.address), e.globalData.address = a.result.address, new t.default({
                                        data: {
                                            userId: e.globalData.uid,
                                            lbs: a.result.address
                                        },
                                        path: o.default.addressPost
                                    }).then(function(a) {
                                        console.log(a);
                                    });
                                },
                                fail: function(a) {
                                    console.log(a);
                                },
                                complete: function(a) {
                                    console.log(a);
                                }
                            });
                        }
                    }), s();
                }), i.catch(function(a) {
                    console.log(a.msg);
                });
            },
            fail: function(a) {
                console.log(a.msg), wx.hideLoading();
            }
        }), wx.getSetting({
            success: function(e) {
                e.authSetting["scope.userInfo"] ? a.setData({
                    has_info: !0
                }) : a.setData({
                    has_info: !1
                });
            }
        }), a.setData({
            has_phone: this.globalData.has_phone
        });
    },
    MUSIC: function() {
        var a = this, e = wx.createInnerAudioContext();
        this.globalData.innerAudioContext = e, e.autoplay = !0;
        var n = [], s = 0;
        e.onEnded(function() {
            s = Math.floor(Math.random() * n.length), e.src = n[s], e.play();
        });
        var l = new t.default({
            reqtype: "GET",
            path: o.default.music,
            data: {
                userId: ""
            }
        });
        l.then(function(t) {
            n = t.data, s = Math.floor(Math.random() * n.length), a.globalData.musicsIndex = s, 
            e.src = n[s];
        }), l.catch(function(a) {
            console.log(a);
        });
    },
    getUserInfo: function(a) {
        var e = this;
        wx.getSetting({
            success: function(a) {
                if (a.authSetting["scope.userInfo"]) wx.getUserInfo({
                    success: function(a) {
                        var n = JSON.parse(a.rawData);
                        e.globalData.nickName = n.nickName, e.globalData.userHeadImg = n.avatarUrl, e.globalData.userInfo = n;
                        var s = new t.default({
                            path: o.default.UserInfo,
                            data: {
                                userId: e.globalData.uid,
                                userInfo: JSON.stringify(e.globalData.userInfo)
                            }
                        });
                        s.then(function(a) {
                            console.log(a.msg);
                        }), s.catch(function(a) {
                            console.log(a.msg);
                        });
                    }
                }), e.globalData.has_info = !0; else {
                    var n = a;
                    JSON.stringify(n.authSetting).length >= 40 && (new t.default({
                        data: {
                            userId: e.globalData.uid
                        },
                        path: o.default.allRemove
                    }).then(function(a) {
                        console.log("已删除全部关注数据");
                    }), wx.reLaunch({
                        url: "/pages/infor/infor"
                    }));
                }
            }
        }), this.globalData.has_info = !0, a.setData({
            has_info: !0
        });
    },
    getPhoneNumber: function(a, e) {
        var n = this;
        wx.login({
            success: function(s) {
                if ("getPhoneNumber:fail user deny" == a.detail.errMsg || "getPhoneNumber:fail:cancel to confirm login" == a.detail.errMsg) {
                    if (1 != n.globalData.oldMan) {
                        var l = new t.default({
                            data: {
                                userId: n.globalData.uid
                            },
                            path: o.default.allRemove
                        });
                        return l.then(function(a) {
                            console.log(s), console.log("已删除全部关注数据");
                        }), l.catch(function(a) {
                            wx.showToast({
                                title: a.msg,
                                icon: "none"
                            });
                        }), void wx.reLaunch({
                            url: "/pages/infor/infor"
                        });
                    }
                    e.setData({
                        has_phone: !0
                    });
                } else {
                    var i = new t.default({
                        data: {
                            userId: n.globalData.uid,
                            code: s.code,
                            iv: a.detail.iv,
                            data: a.detail.encryptedData
                        },
                        path: o.default.getNumber
                    });
                    i.then(function(a) {
                        console.log("获取手机号码成功"), e.setData({
                            has_phone: !0
                        }), n.globalData.has_phone = !0;
                    }), i.catch(function(a) {
                        n.globalData.has_phone = !1;
                    });
                }
            },
            fail: function(a) {
                console.log(a.msg);
            }
        });
    },
    callPhone: function(a) {
        var e = a.currentTarget.dataset.num;
        wx.makePhoneCall({
            phoneNumber: e
        });
    },
    tackphoto: function(a) {
        var e = a;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                wx.showLoading({
                    title: "图片上传中"
                });
                var t = a.tempFilePaths;
                wx.uploadFile({
                    url: "https://www.clyzt.cn/member/upload-img",
                    filePath: t[0],
                    name: "file",
                    formData: {
                        id: ""
                    },
                    header: {
                        "Content-Type": "multipart/form-data"
                    },
                    success: function(a) {
                        wx.hideLoading();
                        var t = JSON.parse(a.data);
                        wx.setStorageSync("background", t.data.path), wx.navigateTo({
                            url: "/pages/web-view/web-view?img=" + t.data.path + "&id=" + e
                        });
                    },
                    fail: function(a) {
                        wx.showToast({
                            title: "图片上传失败",
                            icon: "none"
                        });
                    }
                });
            }
        });
    },
    globalData: {
        uid: null,
        userInfo: "",
        userHeadImg: "",
        nickName: "",
        address: "",
        scene: "",
        index: !1,
        myExhibition: !1,
        has_phone: !1,
        oldMan: !1,
        has_info: !1,
        shop: !1,
        musics: [],
        musicsIndex: 0,
        innerAudioContext: "",
        nav: e.default.navBar
    }
});