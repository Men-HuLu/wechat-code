for (var r = [], t = 0; t < 256; ++t) r[t] = (t + 256).toString(16).substr(1);

exports.bytesToUuid = function(t, u) {
    var e = u || 0, n = r;
    return n[t[e++]] + n[t[e++]] + n[t[e++]] + n[t[e++]] + "-" + n[t[e++]] + n[t[e++]] + "-" + n[t[e++]] + n[t[e++]] + "-" + n[t[e++]] + n[t[e++]] + "-" + n[t[e++]] + n[t[e++]] + n[t[e++]] + n[t[e++]] + n[t[e++]] + n[t[e++]];
}, exports.uuidToBytes = function(r) {
    var t = [];
    return r.replace(/[a-fA-F0-9]{2}/g, function(r) {
        t.push(parseInt(r, 16));
    }), t;
};