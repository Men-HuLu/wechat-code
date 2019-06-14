Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.checkError = function(t) {
    if (0 !== t.error) throw new Error("API ERROR error=" + t.error + " msg=" + t.msg);
    return t.data;
}, exports.getIsDebug = function() {
    return !0;
}, exports.getDid = function() {
    return r ? r.globalData.did || "10000000000000000000000000001501" : "10000000000000000000000000001501";
}, exports.getUnixTimestamp = function() {
    return parseInt(new Date().getTime() / 1e3, 10);
}, exports.md5 = function(e) {
    return t.CryptoJS.MD5(e).toString();
}, exports.isInBlackword = function(t) {
    return !!t && n.some(function(e) {
        return -1 !== t.indexOf(e);
    });
}, exports.bindAll = function(t, e) {
    void 0 === e && (e = Object.getPrototypeOf(t)), Object.getOwnPropertyNames(e).forEach(function(e) {
        var r = t[e];
        "function" == typeof r && (t[e] = r.bind(t));
    });
}, exports.get = function(t) {
    var r = t.url, n = t.data, o = t.type, u = e.default.request({
        url: r,
        method: "GET",
        data: n,
        dataType: o
    });
    return Object.defineProperty(u, "abort", {
        get: function() {
            return function() {
                return 0;
            };
        }
    }), u;
}, exports.post = function(t) {
    var r = t.url, n = t.data, o = t.type, u = e.default.request({
        url: r,
        method: "POST",
        data: n,
        dataType: o
    });
    return Object.defineProperty(u, "abort", {
        get: function() {
            return function() {
                return 0;
            };
        }
    }), u;
};

var t = require("../../CryptoJS"), e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../httpClient")), r = getApp(), n = [ "风云直播", "YY直播", "yy直播", "泽东", "泽民", "锦涛", "恩来", "大法", "法轮", "九评", "退党", "明慧", "办证", "我操", "毛主席", "近平", "薄熙来", "共产" ];