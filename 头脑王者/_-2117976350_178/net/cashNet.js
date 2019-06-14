require("./../util/util.js");

var e = require("./../net/network.js"), r = require("./../const/consts.js");

module.exports.recordForm = function(s, o) {
    e.post(r.MessageHead.CashRecordForm, {
        params: {
            formId: s
        },
        success: function(e) {
            o(null, e);
        },
        fail: function(e) {
            o(e);
        }
    });
};