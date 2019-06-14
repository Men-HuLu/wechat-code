var e = require("./../../util/util.js"), t = require("./../../const/consts.js"), r = require("./../../const/modeConsts.js"), o = void 0, n = function() {
    this.Server_URL = r.CashNetURL[r.CashRunMode].httpURL;
};

module.exports = new n(), n.prototype.init = function(e) {
    this.initEnd || (this.initEnd = !0, o = e);
}, n.prototype.updateURL = function(e) {
    r.NetURL[r.CashRunMode].serverURL = e.http, r.NetURL[r.CashRunMode].wsURL = e.ws, 
    this.Server_URL = e.http;
};

n.prototype.get = function(e, r) {
    if (t.MessageHead.Login != e && t.MessageHead.Entry != e && 0 == o.uid) return console.warn(e + " not get,when uid is 0."), 
    void o.exitGame(t.ExitCode.UidErr);
    r.retry = 0, this.request("GET", e, r);
}, n.prototype.post = function(e, r) {
    if (t.MessageHead.Login != e && t.MessageHead.Entry != e && t.MessageHead.Query != e && 0 == o.uid) return console.warn(e + " not post,when uid is 0."), 
    void o.exitGame(t.ExitCode.UidErr);
    r.retry = 0, this.request("POST", e, r);
}, n.prototype.request = function(n, s, i) {
    var u = this, a = e.assign({}, i.params), d = "", c = "";
    a.uid = o.uid, a.t = Date.now();
    for (var p in a) "" != d && (d += "&", c += "&"), d += p + "=" + encodeURIComponent(a[p]), 
    c += p + "=" + a[p];
    r.RunMode != r.RunModeType.Prod && console.warn(n, s, d);
    var h = e.GenNetSign(o.token + o.uid, c);
    "GET" == n ? (a.sign = h, d = a) : d += "&sign=" + h;
    var l = this.Server_URL + s;
    wx.request({
        url: l,
        data: d,
        method: n,
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(e) {
            var t = e.data;
            i.success(t);
        },
        fail: function(r) {
            var o = r && r.errMsg ? r.errMsg : "";
            console.warn("request fail: ", o, s), e.reportAnalytics_cmd_err(s, d, "", "", o), 
            i.retry < 2 ? (i.retry++, setTimeout(function() {
                console.log("请求失败，重试", i.retry), u.request(n, s, i);
            }, 500)) : i.fail({
                errMsg: o,
                errCode: t.ExitCode.requestFail
            });
        },
        complete: function() {}
    });
};