module.exports = function() {
    var e, r, o = new Promise(function(o, t) {
        e = o, r = t;
    });
    return {
        resolve: e,
        reject: r,
        promise: o
    };
};