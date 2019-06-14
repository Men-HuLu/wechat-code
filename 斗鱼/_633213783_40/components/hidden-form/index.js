function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../config/index")), o = t(require("../../common/httpClient")), r = getApp();

Component({
    properties: {
        sid: {
            type: String,
            value: ""
        }
    },
    data: {},
    methods: {
        formSubmit: function(t) {
            var e = this;
            setTimeout(function() {
                console.log("formSubmit: " + t), e.reportFormId(t.detail.formId, t.currentTarget.dataset.id || 0);
            }, 200);
        },
        reportFormId: function(t) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
            return console.log("reportFormId: " + t), o.default.request({
                url: e.default.API.REPORT_FORMID,
                method: "POST",
                data: {
                    form_id: t,
                    token: r.globalData.userInfo.token || "",
                    act_id: n
                }
            });
        }
    },
    behaviors: [],
    created: function() {},
    attached: function() {},
    ready: function() {},
    moved: function() {},
    detached: function() {}
});