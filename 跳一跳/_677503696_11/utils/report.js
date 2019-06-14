var e = require("../lib/config.js").host, t = require("./cgi.js"), r = getApp().globalData, o = function(o) {
    var i = r.curPage;
    t.getKey().then(function(p) {
        var s = p.uin, a = p.passkey, n = p.pass_ticket, u = {
            location: r.location.coordinate,
            page: i,
            reportTime: parseInt(Date.now() / 1e3)
        };
        o.extraInfo = u;
        var c = e + "/wxaweb/wxapoipage?action=report&uin=" + s + "&key=" + a + "&pass_ticket=" + n;
        t.post({
            url: c,
            data: JSON.stringify(o)
        });
    });
}, i = [], p = null;

module.exports = {
    report: o,
    reportIndex: function() {
        o({
            reportType: 4
        });
    },
    reportPOI: function(e) {
        e.reportType = 3, o(e);
    },
    reportAppExposed: function(e) {
        i.push(e), clearTimeout(p), p = setTimeout(function() {
            var e = [], t = [];
            i.forEach(function(o) {
                var i = !1;
                o.customer && o.customer.avatar && (1 == o.poi_type && r.canUseCustomer && (i = !0), 
                2 == o.poi_type && r.canUseCustomer && r.clientCustomer && (i = !0)), i && e.push({
                    appid: o.appid,
                    type: o.type,
                    poi_id: o.sotre_id,
                    has_service: o.service_infos.length > 0 ? 1 : 0
                }), t.push({
                    appid: o.appid,
                    type: o.type,
                    poi_id: o.poi_id,
                    store_id: o.store_id,
                    service: o.service_infos,
                    friend_use_num: o.friend_use_num
                });
            }), i = [], o({
                reportType: 1,
                app: t,
                customer: e
            });
        }, 500);
    }
};