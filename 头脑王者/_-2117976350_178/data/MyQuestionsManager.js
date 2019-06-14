function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, i, n) {
        return i && t(e.prototype, i), n && t(e, n), e;
    };
}(), i = (require("./../const/consts.js"), require("./../util/util.js"), void 0), n = function() {
    function n() {
        t(this, n);
    }
    return e(n, [ {
        key: "init",
        value: function(t) {
            i = t;
        }
    }, {
        key: "test_initData",
        value: function() {
            var t = [], e = "学习效果评估术语词汇各类常用英语词汇standardized test", n = this.getTypeList(), l = this.getSubjectList(1), s = this.getLeveList();
            t.push({
                id: 0,
                stem: e,
                stem_simple: e,
                answers: [ {
                    id: 0,
                    title: "a",
                    editting: !1
                }, {
                    id: 1,
                    title: "b",
                    editting: !1
                }, {
                    id: 2,
                    title: "c",
                    editting: !1
                }, {
                    id: 3,
                    title: "d",
                    editting: !1
                } ],
                type: 1,
                typeText: n[0].title,
                subject: 1,
                subjectText: l[0].title,
                level: 1,
                levelText: s[0].title,
                status: 2,
                statusSetting: this.getQuestionStatus(2)
            });
            for (var u = t.length, a = 5 - u, o = 0; o < a; o++) t.push({
                id: u + o,
                stem: null,
                answers: [ {
                    id: 0,
                    title: "",
                    editting: !1
                }, {
                    id: 1,
                    title: "",
                    editting: !1
                }, {
                    id: 2,
                    title: "",
                    editting: !1
                }, {
                    id: 3,
                    title: "",
                    editting: !1
                } ]
            });
            i.mainData.myQuestions.myQuestions = t, i.mainData.myQuestions.selectedItem = null;
        }
    }, {
        key: "setMyQuestions",
        value: function(t, e) {
            if (e) {
                for (var n = this.getTypeList(), l = [], s = 0; s < e.length; s++) {
                    var u = e[s], a = this.getSubjectList(u.schoolId), o = (u.quizType - 1) % 5 + 1, d = {
                        id: u.id,
                        stem: u.title,
                        stem_simple: u.title,
                        answers: [ {
                            id: 0,
                            title: u.option0,
                            editting: !1
                        }, {
                            id: 1,
                            title: u.option1,
                            editting: !1
                        }, {
                            id: 2,
                            title: u.option2,
                            editting: !1
                        }, {
                            id: 3,
                            title: u.option3,
                            editting: !1
                        } ],
                        type: u.schoolId,
                        typeText: n[u.schoolId - 1].title,
                        subject: o,
                        subjectText: a[o - 1].title,
                        status: u.status,
                        statusSetting: this.getQuestionStatus(u.status),
                        reason: u.reason,
                        createdAt: u.createdAt
                    };
                    l.push(d);
                }
                i.mainData.myQuestions.myQuestions[t] = l;
            }
        }
    }, {
        key: "setQuestionWithObj",
        value: function(t) {
            for (var e = i.mainData.myQuestions.myQuestions[t.status], n = 0; n < e.length; n++) if (e[n].id == t.id) {
                e[n] = t;
                break;
            }
        }
    }, {
        key: "getNewQuestion",
        value: function() {
            return {
                stem: null,
                status: 0,
                answers: [ {
                    id: 0,
                    title: "",
                    editting: !1
                }, {
                    id: 1,
                    title: "",
                    editting: !1
                }, {
                    id: 2,
                    title: "",
                    editting: !1
                }, {
                    id: 3,
                    title: "",
                    editting: !1
                } ]
            };
        }
    }, {
        key: "getMyQuestions",
        value: function() {
            return i.mainData.myQuestions.myQuestions;
        }
    }, {
        key: "isAllowedMakeNew",
        value: function() {
            return !this.isFull();
        }
    }, {
        key: "getSelectedItem",
        value: function() {
            return i.mainData.myQuestions.selectedItem;
        }
    }, {
        key: "setSelectedItem",
        value: function(t) {
            i.mainData.myQuestions.selectedItem = t;
        }
    }, {
        key: "getBackupSelectedItem",
        value: function(t) {
            return i.mainData.myQuestions.backupSelectedItem;
        }
    }, {
        key: "setBackupSelectedItem",
        value: function(t) {
            i.mainData.myQuestions.backupSelectedItem = t;
        }
    }, {
        key: "getTypeAndSubjectText",
        value: function(t, e) {
            var i = this.getTypeList(), n = this.getSubjectList(t), l = (e - 1) % 5;
            return {
                type: i[t - 1].title,
                subject: n[l].title
            };
        }
    }, {
        key: "getTypeList",
        value: function() {
            return [ {
                id: 1,
                title: "文科"
            }, {
                id: 2,
                title: "理科"
            }, {
                id: 3,
                title: "文艺"
            }, {
                id: 4,
                title: "流行"
            }, {
                id: 5,
                title: "娱乐"
            }, {
                id: 6,
                title: "生活"
            } ];
        }
    }, {
        key: "getSubjectList",
        value: function(t) {
            var e = t - 1;
            return this.getAllSubjectList()[e];
        }
    }, {
        key: "getLeveList",
        value: function() {
            return [ {
                id: 1,
                title: "难度1"
            }, {
                id: 2,
                title: "难度2"
            }, {
                id: 3,
                title: "难度3"
            }, {
                id: 4,
                title: "难度4"
            }, {
                id: 5,
                title: "难度5"
            } ];
        }
    }, {
        key: "getQuestionStatus",
        value: function(t) {
            return this.questionStatus || (this.questionStatus = [ {
                title: "审核中",
                color: "#F5A623",
                image: "icon_qf_wait.png"
            }, {
                title: "审核未过",
                color: "#FF7063",
                image: "icon_qf_notpass.png"
            }, {
                title: "审核通过",
                color: "#417505",
                image: "icon_qf_pass.png"
            } ]), this.questionStatus[t];
        }
    }, {
        key: "getAllSubjectList",
        value: function() {
            return this.allSubjectList || (this.allSubjectList = [ [ {
                id: 1,
                title: "语文",
                iconId: 204001
            }, {
                id: 2,
                title: "外语",
                iconId: 204002
            }, {
                id: 3,
                title: "历史",
                iconId: 204003
            }, {
                id: 4,
                title: "经济",
                iconId: 204004
            }, {
                id: 5,
                title: "哲学",
                iconId: 204005
            } ], [ {
                id: 1,
                title: "数学",
                iconId: 204006
            }, {
                id: 2,
                title: "理化",
                iconId: 204007
            }, {
                id: 3,
                title: "天文",
                iconId: 204008
            }, {
                id: 4,
                title: "地理",
                iconId: 204009
            }, {
                id: 5,
                title: "生物",
                iconId: 204010
            } ], [ {
                id: 1,
                title: "文化",
                iconId: 204011
            }, {
                id: 2,
                title: "文学",
                iconId: 204012
            }, {
                id: 3,
                title: "演艺",
                iconId: 204013
            }, {
                id: 4,
                title: "艺术",
                iconId: 204014
            }, {
                id: 5,
                title: "设计",
                iconId: 204015
            } ], [ {
                id: 1,
                title: "名人",
                iconId: 204016
            }, {
                id: 2,
                title: "时尚",
                iconId: 204017
            }, {
                id: 3,
                title: "体育",
                iconId: 204018
            }, {
                id: 4,
                title: "商业",
                iconId: 204019
            }, {
                id: 5,
                title: "科技",
                iconId: 204020
            } ], [ {
                id: 1,
                title: "电影",
                iconId: 204021
            }, {
                id: 2,
                title: "电视",
                iconId: 204022
            }, {
                id: 3,
                title: "音乐",
                iconId: 204023
            }, {
                id: 4,
                title: "动漫",
                iconId: 204024
            }, {
                id: 5,
                title: "游戏",
                iconId: 204025
            } ], [ {
                id: 1,
                title: "常识",
                iconId: 204026
            }, {
                id: 2,
                title: "世界",
                iconId: 204027
            }, {
                id: 3,
                title: "日常",
                iconId: 204028
            }, {
                id: 4,
                title: "健康",
                iconId: 204029
            }, {
                id: 5,
                title: "饮食",
                iconId: 204030
            } ] ]), this.allSubjectList;
        }
    }, {
        key: "isFull",
        value: function() {
            return i.mainData.myQuestions.myQuestions[0].length >= i.mainData.role.allSeeds.baseConf.ugcMaxNum;
        }
    }, {
        key: "getMax",
        value: function() {
            return i.mainData.role.allSeeds.baseConf.ugcMaxNum;
        }
    }, {
        key: "getReasonList",
        value: function() {
            return null == this.QuizReason && (this.QuizReason = [ {
                id: 0,
                title: "其他",
                online: !0
            }, {
                id: 1,
                title: "题目不够严谨",
                online: !0
            }, {
                id: 2,
                title: "题目重复了",
                online: !0
            }, {
                id: 3,
                title: "题目不明确",
                online: !0
            }, {
                id: 4,
                title: "题目中有错别字",
                online: !0
            }, {
                id: 5,
                title: "题目类别有误",
                online: !0
            }, {
                id: 6,
                title: "题目答案有误",
                online: !0
            } ]), this.QuizReason;
        }
    }, {
        key: "setList2DeltaParam",
        value: function(t) {
            i.mainData.myQuestions.list2DeltaParam = t;
        }
    }, {
        key: "getList2DeltaParam",
        value: function() {
            return i.mainData.myQuestions.list2DeltaParam;
        }
    } ]), n;
}();

module.exports = new n();