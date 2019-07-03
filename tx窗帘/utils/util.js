function e(e) {
    return (e = e.toString())[1] ? e : "0" + e;
}

module.exports = {
    formatTime: function(n) {
        if (void 0 != n && "" != n) {
            n = n.replace(/(\d{4})-(\d{2})-(\d{2})T(.*)?\.(.*)/, "$1/$2/$3 $4");
            var t = (n = new Date(n)).getFullYear(), o = n.getMonth() + 1, r = n.getDate(), i = n.getHours(), u = n.getMinutes(), a = n.getSeconds();
            return [ t, o, r ].map(e).join("-") + " " + [ i, u, a ].map(e).join(":");
        }
    },
    json2Form: function(e) {
        var n = [];
        for (var t in e) n.push(encodeURIComponent(t) + "=" + encodeURIComponent(e[t]));
        return n.join("&");
    }
};