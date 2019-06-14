var e = function(e, n) {
    var o = n || getApp(), i = null, r = (e.host || o.globalData.httpHead) + e.url, c = o.globalData.systemInfo, l = c.model.split(" ")[0], s = c.system.split(" "), u = {
        "User-Agent-Mini": "KuaikanMiniProgram/1.0.0/10000(" + ("iOS" == s[0] ? l + ";" + s.reverse().join(";") : s.join(";") + ";" + l) + ";wechat;WIFI;" + c.pixelRatio * c.screenHeight + "*" + c.pixelRatio * c.screenWidth + ")",
        "content-type": "application/x-www-form-urlencoded"
    };
    try {
        (i = wx.getStorageSync("headerInfo")) && (u.Cookie = "session=" + i.session + "; uid=" + i.uid + ";");
    } catch (e) {
        console.log(e);
    }
    "DELETE" == e.method && e.data && (r += "?" + Object.keys(e.data).map(function(a) {
        return encodeURIComponent(a) + "=" + encodeURIComponent(e.data[a]);
    }).join("&")), wx.request({
        method: e.method,
        url: r,
        data: e.data || {},
        dataType: "json",
        header: u,
        success: function(n) {
            switch (n.data.code) {
              case 200:
                var o = function() {
                    e.callback && e.callback(n.data);
                };
                if (i) o(); else {
                    var r = n.header["Set-Cookie"];
                    if (r) {
                        var c = r.indexOf("session="), l = r.indexOf("uid=");
                        if (-1 !== c && -1 !== l) {
                            var s = r.substring(c + 8);
                            s = s.substring(0, s.indexOf(";"));
                            var u = r.substring(l + 4);
                            u = u.substring(0, u.indexOf(";")), wx.setStorage({
                                key: "headerInfo",
                                data: {
                                    session: s,
                                    uid: u
                                },
                                complete: function(e) {
                                    o();
                                }
                            });
                        } else o();
                    } else o();
                }
                break;

              case 401:
              case 402:
                t(!e.notRoute);
                break;

              case 10550:
              case 10551:
              case 10500:
              case 10552:
              case 10553:
              case 6002:
              case 6003:
                e.error && e.error(n.data);
                break;

              default:
                a({
                    title: n.data.message,
                    type: "warning"
                }), e.error && e.error();
            }
        },
        fail: function(t) {
            a({
                title: "系统错误",
                type: "warning"
            }), e.error && e.error();
        }
    });
}, a = function(e) {
    var a = {
        title: e.title,
        duration: e.duration || 1500,
        mask: e.mask || !1,
        success: function() {
            e.callback && e.callback();
        }
    };
    e.title && (e.title.length < 8 ? a.image = "/image/ico-" + e.type + ".png" : a.icon = "none", 
    wx.showToast(a));
}, t = function(e) {
    getApp().globalData.userInfo && (wx.removeStorageSync("searchHis"), wx.removeStorageSync("forUpload"), 
    wx.removeStorageSync("tobeUpload")), wx.removeStorageSync("headerInfo"), wx.removeStorageSync("reddot"), 
    e && wx.navigateTo({
        url: "/pages/login/login"
    });
}, n = function(e) {
    return ("00" + e).substr(("" + e).length);
};

module.exports = {
    getSystemInfo: function(e) {
        wx.getSystemInfo({
            success: function(a) {
                e(a);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    ajax: e,
    checkLogin: function(a) {
        e({
            url: "/v2/users/me",
            method: "GET",
            notRoute: !0,
            data: {
                user_id: a.uid
            },
            callback: function(e) {
                a.callback(e.data);
            },
            error: function() {
                t(), a.app.loginedFlag = !0;
            }
        }, a.app);
    },
    usLogin: function(a) {
        e({
            url: "/v1/passport/mini/phone_signin",
            method: "POST",
            data: {
                phone: a.phone,
                password: a.password
            },
            callback: function(e) {
                a.callback(e);
            }
        });
    },
    usLogout: t,
    addSuffix: function(e, a) {
        if (-1 !== e.indexOf("imageMogr2")) return e;
        var t = getApp().globalData.systemInfo, n = e;
        /-c.w/.test(n) ? n = n.split("-c.w")[0] : /-w/.test(n) && (n = n.split("-w")[0]);
        var o = 1080, i = t.pixelRatio * t.screenWidth;
        switch (a) {
          case 1:
            o = i > 900 ? 1080 : i > 720 ? 750 : i > 640 ? 720 : i > 540 ? 640 : i > 480 ? 540 : 480;
            break;

          case 2:
            o = i > 900 ? 480 : i > 720 ? 350 : i > 480 ? 290 : 250;
            break;

          case 3:
            o = i > 900 ? 350 : i > 720 ? 250 : i > 540 ? 190 : i > 480 ? 170 : 150;
        }
        return n + "?imageMogr2/format/" + (-1 === t.system.indexOf("iOS") ? "webp" : "jpg") + "/thumbnail/" + o + "x>/quality/70";
    },
    startCount: function() {
        var e = wx.getStorageSync("startCount") || 0;
        e++, wx.setStorage({
            key: "startCount",
            data: e
        });
    },
    getBubble: function() {
        var a = getApp();
        e({
            method: "GET",
            url: "/mini/v1/comic/favourite/remind_layer",
            callback: function(e) {
                var t = e.data || null;
                a.globalData.bubble = t, a.globalData.bubbledCallback && a.globalData.bubbledCallback(t);
            }
        });
    },
    getReddot: function() {
        var a = getApp();
        wx.getStorageSync("reddot") ? wx.showTabBarRedDot({
            index: 2
        }) : e({
            method: "GET",
            url: "/v2/timeline/all_status",
            data: {
                start_time: new Date().getTime()
            },
            callback: function(e) {
                e.data.favourite_unread && (wx.setStorageSync("reddot", !0), wx.showTabBarRedDot({
                    index: 2
                }), a.globalData.reddotCallback && a.globalData.reddotCallback());
            }
        });
    },
    toast: a,
    returnQuery: function(e) {
        var a = !0, t = "";
        for (var n in e) t += a ? "?" : "&", t += n + "=" + e[n], a && (a = !1);
        return t;
    },
    praise: function(t) {
        e({
            url: "/v2/like/" + t.target + "/" + t.id,
            method: t.type ? "POST" : "DELETE",
            callback: function(e) {
                t.callback(e);
            },
            error: function(e) {
                a({
                    title: e.message,
                    type: "warning"
                }), t.error(e);
            }
        });
    },
    follow: function(t) {
        e({
            url: "/mini/v1/comic/favourite/topic",
            method: t.type ? "POST" : "DELETE",
            data: {
                topic_id: t.id
            },
            callback: function(e) {
                t.callback(e), a({
                    title: (t.type ? "关注" : "取关") + "成功",
                    type: "success"
                });
            }
        });
    },
    arrayArrange: function(e) {
        var a = {}, t = [], n = void 0, o = e.length;
        for (n = 0; n < o; n++) a[e[n]] || (a[e[n]] = !0, t.push(e[n]));
        return t;
    },
    transNum: function(e) {
        var a = e + "", t = a.length;
        return t > 8 ? a.slice(0, -8) + "." + a.slice(-8, -6) + "亿" : t > 5 ? a.slice(0, -4) + "万" : a;
    },
    transTime: function(e) {
        var a = new Date(e);
        return a.getFullYear() + "-" + n(a.getMonth() + 1) + "-" + n(a.getDate());
    },
    checkAcconts: function(e) {
        var a = e.page, t = getApp().globalData.userInfo, n = wx.getStorageSync("environment"), o = n && "stage" === n ? -2 : -1;
        t && (a.data.gender = 1 == t.base_info.gender ? 1 : 0, o = t.user.id), a.data.userId == o ? e.always && e.always() : (a.data.userId = o, 
        a.pageInit());
    },
    checkLoginBack: function(e) {
        if (getApp().globalData.userInfo) {
            var a = e.data.eventCache || null;
            e.data.following ? (e.data.following = !1, e.handleFav(a)) : e.data.praising && (e.data.praising = !1, 
            e.handlePraise(a));
        }
    },
    jumpTopic: function(e) {
        if (e.id) {
            var a = "/pages/topic/topic?topicId=" + e.id + "&origin=";
            a += e.ori || "0", e.tab && (a += "&tab=" + e.tab), wx.navigateTo({
                url: a
            });
        }
    },
    jumpComic: function(e) {
        if (e.id) {
            var a = "/pages/comic/comic?comicId=" + e.id;
            e.rate && (a += "&rate=" + e.rate), wx.navigateTo({
                url: a
            });
        }
    },
    jumpRank: function(e) {
        wx.navigateTo({
            url: "/pages/rank/rank?type=" + e.type
        });
    },
    jumpList: function(e) {
        wx.navigateTo({
            url: "/pages/topic-list/topic-list?id=" + e.id + "&tit=" + e.tit
        });
    }
};