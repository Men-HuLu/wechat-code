Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = /^[\d\s\!\@\#\$\%\^\&\*\(\)\-\=]+$/, e = getApp(), n = [ function(e) {
    return this.txt && t.test(this.txt) ? e - .5 : e;
}, function(t) {
    var n = e.globalData.userInfo.uid;
    return n && n === this.uid ? t + 1 : t;
}, function(t) {
    return this.txt && this.txt.length < 2 ? t - .2 : t;
} ];

exports.default = function(t, e) {
    return t.forEach(function(t) {
        t.weight = n.reduce(function(e, n) {
            return n.call(t, e);
        }, 1);
    }), t.sort(function(t, e) {
        return e.weight - t.weight;
    }).slice(0, e);
};