var e = require("./../util/util.js"), r = require("./../const/consts.js"), t = require("./../const/modeConsts.js"), o = void 0, s = function() {
    this.Server_URL = t.NetURL[t.RunMode].httpURL;
};

module.exports = new s(), s.prototype.init = function(e) {
    this.initEnd || (this.initEnd = !0, o = e);
}, s.prototype.updateURL = function(e) {
    this.Server_URL = e.http;
};

s.prototype.get = function(e, t) {
    if (r.MessageHead.Login != e && r.MessageHead.Entry != e && 0 == o.uid) return console.warn(e + " not get,when uid is 0."), 
    void o.exitGame(r.ExitCode.UidErr);
    t.retry = 0, this.request("GET", e, t);
}, s.prototype.post = function(e, t) {
    if (r.MessageHead.Login != e && r.MessageHead.Entry != e && r.MessageHead.Query != e && 0 == o.uid) return console.warn(e + " not post,when uid is 0."), 
    void o.exitGame(r.ExitCode.UidErr);
    t.retry = 0, this.request("POST", e, t);
}, s.prototype.request = function(s, n, i) {
    var d = this, a = e.assign({}, i.params), u = "", c = "";
    a.uid = o.uid, a.t = Date.now();
    for (var g in a) "" != u && (u += "&", c += "&"), u += g + "=" + encodeURIComponent(a[g]), 
    c += g + "=" + a[g];
    t.RunMode != t.RunModeType.Prod && console.warn(s, n, u);
    var p = e.GenNetSign(o.token + o.uid, c);
    "GET" == s ? (a.sign = p, u = a) : u += "&sign=" + p;
    var f = this.Server_URL + n;
    wx.request({
        url: f,
        data: u,
        method: s,
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(r) {
            var s = r.data;
            if (0 != s.errcode || 200 != r.statusCode) {
                var d = {};
                return s.errmsg ? (d.errMsg = s.errmsg, d.errCode = s.errcode) : (d.errMsg = s, 
                d.errCode = r.statusCode), console.warn("req fail: ", d.errMsg, d.errCode, n, JSON.stringify(a)), 
                e.reportAnalytics_cmd_err(n, u, d.errCode, r.statusCode, d.errMsg), 401 != d.errCode && 20015 != d.errCode && 20016 != d.errCode || o.exitGame(d.errCode, d.errMsg), 
                void i.fail(d);
            }
            t.RunMode != t.RunModeType.Prod && console.warn("request success : ", f, n, JSON.stringify(s.data)), 
            i.success(s.data);
        },
        fail: function(t) {
            var o = t && t.errMsg ? t.errMsg : "";
            console.warn("request fail: ", o, n), e.reportAnalytics_cmd_err(n, u, "", "", o), 
            i.retry < 2 ? (i.retry++, setTimeout(function() {
                console.log("请求失败，重试", i.retry), d.request(s, n, i);
            }, 500)) : i.fail({
                errMsg: o,
                errCode: r.ExitCode.RequestErr
            });
        },
        complete: function() {}
    });
};