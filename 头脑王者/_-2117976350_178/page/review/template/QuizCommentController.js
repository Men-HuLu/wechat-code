function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function t(t, e) {
        for (var a = 0; a < e.length; a++) {
            var n = e[a];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, a, n) {
        return a && t(e.prototype, a), n && t(e, n), e;
    };
}(), a = require("./../../../util/util.js"), n = (require("./../../../const/consts.js"), 
require("../../../data/CommentData.js")), i = require("../../../net/commentNet.js"), o = require("../../../util/Tween.js"), s = getApp(), m = function() {
    function m(e) {
        var n = this;
        t(this, m), this.page = e, this.page.onTapBtn_CommentPraise = function(t) {
            if (!n.page.data.isCommentInputing) {
                var e = t.currentTarget.dataset.id, a = n.page.data.review.items[n.page.data.index].quizId;
                n.request_commentPraise(a, e, function() {});
            }
        }, this.page.onTapBtn_QuizPraise = function(t) {
            if (!n.page.data.isCommentInputing) {
                var e = t.currentTarget.dataset.id;
                n.request_quizPraise(e, function() {});
            }
        }, this.page.onTapBtn_CommentViewTitle = function() {
            if (!n.page.data.isCommentInputing) {
                var t = n.page.data.review.items[n.page.data.index].quizId, e = n.getCommnet(t);
                if (!n.page.data.isFullView && e.list.length + e.mList.length == 0) {
                    var a = {};
                    return a.getFocus = !0, void n.page.setData(a);
                }
                var i = s.systemInfo.windowHeight - 133 - (n.page.isIphoneX ? 50 : 0);
                if (n.page.data.isFullView) {
                    var m = o.fastGet("commentController", !0);
                    m.call(function() {
                        var t = wx.createAnimation();
                        t.opacity(0).step({
                            timingFunction: "ease-out",
                            duration: 200
                        });
                        var e = {};
                        e.ani_commentClose = t.export(), n.page.setData(e);
                    }), m.wait(200), m.call(function() {
                        var t = i - 150, e = wx.createAnimation();
                        e.bottom(-t - 10 + "px").step({
                            timingFunction: "ease-out",
                            duration: 200
                        }), e.bottom(-t + "px").step({
                            timingFunction: "ease-in",
                            duration: 200
                        });
                        var a = {};
                        a.ani_bottom = e.export(), n.page.setData(a);
                    });
                } else {
                    var r = o.fastGet("commentController", !0);
                    r.call(function() {
                        var t = wx.createAnimation();
                        t.bottom("10px").step({
                            timingFunction: "ease-out",
                            duration: 200
                        }), t.bottom(0).step({
                            timingFunction: "ease-in",
                            duration: 200
                        });
                        var e = {};
                        e.ani_bottom = t.export(), n.page.setData(e);
                    }), r.wait(400), r.call(function() {
                        var t = wx.createAnimation();
                        t.opacity(1).step({
                            timingFunction: "ease-out",
                            duration: 200
                        });
                        var e = {};
                        e.ani_commentClose = t.export(), n.page.setData(e);
                    });
                }
                var u = {};
                u.isFullView = !n.page.data.isFullView, n.page.setData(u);
            }
        }, this.page.commentInput_onBindfocus = function(t) {
            var e = {};
            e.isCommentInputing = !0, n.page.setData(e);
        }, this.page.commentInput_onBindblur = function(t) {
            setTimeout(function() {
                var t = {};
                t.isCommentInputing = !1, t.getFocus = !1, n.page.setData(t);
            }, 500);
        }, this.page.commentInput_onInput = function(t) {
            n.content = t.detail.value;
            var e = {};
            e.inputContent = n.content, e.isCommentInputing = !0, n.page.setData(e);
        }, this.page.commentInput_onConfirm = function(t) {
            n.page.onTapBtn_commentSend();
        }, this.page.onTapBtn_commentSend = function() {
            if (!n.page.btnLock && n.content) {
                n.page.btnLock = !0;
                var t = n.page.data.review.items[n.page.data.index].quizId;
                n.request_comment(t, n.content, function() {
                    n.content = "";
                    var t = {};
                    t.inputContent = n.content, n.page.setData(t);
                });
            }
        }, this.page.onTapBtn_commentBlack = function(t) {
            if (!n.page.data.isCommentInputing) {
                var e = t.currentTarget.dataset.id;
                a.ShowConfirmCancel("举报", "这条评论违规", function() {
                    var t = n.page.data.review.items[n.page.data.index].quizId;
                    n.request_commentBlack(t, e, function() {});
                });
            }
        }, this.page.comment_onBindscrolltolower = function(t) {
            n.page.data.isCommentInputing;
        }, this.page.comment_handletouchmove = function(t) {
            if (!n.page.data.isCommentInputing) {
                var e = t.touches[0].pageX, a = t.touches[0].pageY;
                a - n.lastY < -10 && !n.page.data.isFullView ? n.page.onTapBtn_CommentViewTitle() : a - n.lastY > 10 && n.page.data.isFullView && n.page.onTapBtn_CommentViewTitle(), 
                n.lastX = e, n.lastY = a;
            }
        }, this.page.comment_handletouchtart = function(t) {
            n.page.data.isCommentInputing || (n.lastX = t.touches[0].pageX, n.lastY = t.touches[0].pageY);
        }, this.page.comment_handletap = function(t) {
            n.page.data.isCommentInputing;
        };
    }
    return e(m, [ {
        key: "onShow",
        value: function(t) {}
    }, {
        key: "getCommnet",
        value: function(t) {
            return n.data.group[t] ? n.data.group[t] : {
                list: [],
                mList: [],
                total: 0
            };
        }
    }, {
        key: "setCommnet",
        value: function(t) {
            n.data.group["" + t.quizId] = t;
        }
    }, {
        key: "getCommentItemIndex",
        value: function(t, e) {
            for (var a = this.page.data.commentList, n = 0; n < a.length; n++) if (a[n].id == e) return n;
            return -1;
        }
    }, {
        key: "addOneComment",
        value: function(t, e) {
            var n = this.page.data.review.items[this.page.data.index].quizId, i = a.getServerTimeBaseSecond(), o = {
                id: t,
                uid: s.uid,
                name: s.mainData.role.userInfo.nickName,
                avatar: s.mainData.role.userInfo.avatarUrl,
                content: e,
                status: 0,
                textStatus: "[待审核]",
                praiseNum: 0,
                createdAt: i,
                isPraise: !1,
                textCreateAt: a.showPastTime(0)
            }, m = this.getCommnet(n);
            m.total++, m.mList.unshift(o);
            var r = this.page.data.commentList || [];
            r.unshift(o);
            var u = {};
            u.commentList = r, u.commentTitle = this.getTotalText(m), this.page.setData(u);
        }
    }, {
        key: "getTotalText",
        value: function(t) {
            return t && t.total ? t.total + "条评论" : "还没有人评论，快来秀才华";
        }
    }, {
        key: "initCommentView",
        value: function(t) {
            var e = [];
            t.mList && t.mList.length > 0 && (e = e.concat(t.mList));
            for (var i = 0; i < e.length; i++) {
                var o = e[i];
                o.uid = s.uid, o.name = s.mainData.role.userInfo.nickName, o.avatar = s.mainData.role.userInfo.avatarUrl;
            }
            t.list && t.list.length > 0 && (e = e.concat(t.list));
            for (var m = a.getServerTimeBaseSecond(), r = 0; r < e.length; r++) {
                var u = e[r];
                u.textCreatedAt = a.showPastTime(m - u.createdAt), u.textStatus = 0 == u.status ? "[待审核]" : 1 == u.status ? "" : "[未通过]", 
                u.isBlack = !!n.data.cacheBlackComment["" + u.id];
            }
            t.total = e.length;
            var c = {};
            c.commentList = e, c.commentTitle = this.getTotalText(t), this.page.setData(c);
        }
    }, {
        key: "request_listBase",
        value: function(t, e, n) {
            var o = this;
            a.log("<request_listBase> quizId:", t, "/page:", 1), i.commentListBase(t, 1, function(t, i) {
                t ? n && n() : (a.log("<request_listBase response> data:", i), o.setCommnet(i), 
                o.curQuizComment = i, o.initCommentView(o.curQuizComment), e && e(i));
            });
        }
    }, {
        key: "request_listMore",
        value: function(t, e, n) {
            var o = this;
            a.log("<request_listMore> quizId:", t, "/page:", 1), i.commentListBase(t, 1, function(t, i) {
                t ? n && n() : (a.log("<request_listBase response> data:", i), o.setCommnet(i), 
                o.curQuizComment = i, o.initCommentView(o.curQuizComment), e && e(i));
            });
        }
    }, {
        key: "request_comment",
        value: function(t, e, o) {
            var s = this;
            return this.page.quizCommentController.isCommentOpen() ? n.data.isMute ? (a.ShowToast("由于评论违规，你已经被系统禁言"), 
            void setTimeout(function() {
                s.page.btnLock = !1;
            }, 1e3)) : void i.commentComment(t, e, function(t, i) {
                if (s.page.btnLock = !1, t) return 41e3 == t.errCode && (n.data.isMute = !0), void a.ShowConfirm("提示", t.errMsg);
                a.log("<request_comment response> data:", i), s.addOneComment(i.id, e), o && o();
            }) : (a.ShowToast("评论功能暂时关闭"), void setTimeout(function() {
                s.page.btnLock = !1;
            }, 1e3));
        }
    }, {
        key: "request_commentPraise",
        value: function(t, e, n) {
            var o = this, s = this.getCommentItemIndex(t, e), m = this.page.data.commentList[s].isPraise, r = m ? 1 : 0;
            i.commentPraise(t, e, r, function(t, e) {
                if (o.page.btnLock = !1, t) a.ShowConfirm("提示", t.errMsg); else {
                    a.log("<request_commentPraise response> data:", e);
                    var i = {};
                    i["commentList[" + s + "].praiseNum"] = e.num, i["commentList[" + s + "].isPraise"] = !m, 
                    o.page.setData(i), n && n();
                }
            });
        }
    }, {
        key: "request_quizPraise",
        value: function(t, e) {
            var n = this, o = this.page.data.review.items[t].quizId, s = this.page.data.review.items[t].isPraise, m = s ? 1 : 0;
            i.commentPraise(o, 0, m, function(i, o) {
                if (n.page.btnLock = !1, i) a.ShowConfirm("提示", i.errMsg); else {
                    a.log("<request_commentPraise response> data:", o);
                    var m = {};
                    m["review.items[" + t + "].praiseNum"] = o.num, m["review.items[" + t + "].isPraise"] = !s, 
                    n.page.setData(m), e && e();
                }
            });
        }
    }, {
        key: "request_commentBlack",
        value: function(t, e, o) {
            var s = this, m = this.getCommentItemIndex(t, e);
            i.commentBlack(t, e, function(t, i) {
                if (s.page.btnLock = !1, t) a.ShowConfirm("提示", t.errMsg); else {
                    a.log("<request_commentPraise response> data:", i);
                    var r = {};
                    r["commentList[" + m + "].isBlack"] = !0, s.page.setData(r), n.data.cacheBlackComment["" + e] = e, 
                    o && o();
                }
            });
        }
    }, {
        key: "onUnload",
        value: function() {
            o.removeTweens("commentController");
        }
    }, {
        key: "isCommentOpen",
        value: function() {
            return void 0 == s.mainData.role.gameConf.comment || s.mainData.role.gameConf.comment;
        }
    } ]), m;
}();

module.exports = m;