var e = require("./barcode"), r = require("./qrcode");

module.exports = {
    barcode: function(r, c, o, d, i, t) {
        e.code128(r, c, o, d, i, t);
    },
    qrcode: function(e, c, o, d, i, t) {
        r.api.draw(c, {
            ctx: e,
            x: o,
            y: d,
            width: i,
            height: t
        });
    }
};