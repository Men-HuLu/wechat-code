function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
    };
}(), n = function() {
    function n(t) {
        e(this, n), this.game = t, this.model = this.game.gameModel, this.full2D = this.game.full2D, 
        this.name = "groupRankList";
    }
    return t(n, [ {
        key: "show",
        value: function(e, t) {
            this.full2D.showGroupRankList(e, t);
        }
    }, {
        key: "hide",
        value: function() {
            this.full2D.hide2D();
        }
    } ]), n;
}();

exports.default = n;