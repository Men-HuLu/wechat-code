function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var r = t[i];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, i, r) {
        return i && e(t.prototype, i), r && e(t, r), t;
    };
}(), i = function() {
    function i(t) {
        e(this, i), this.game = t, this.model = this.game.gameModel, this.full2D = this.game.full2D, 
        this.UI = this.game.UI, this.viewer = this.game.viewer, this.name = "game";
    }
    return t(i, [ {
        key: "show",
        value: function(e) {
            this.UI.showScore(), this.UI.resetScorePos(), this.UI.scoreText.changeStyle({
                textAlign: "left"
            }), this.viewer.open(), e && e.usingProp && this.UI.showProp(e.usingProp);
        }
    }, {
        key: "hide",
        value: function() {
            this.viewer.close(), this.UI.hideProp(), this.UI.hideAdAvator(), this.UI.hideScore();
        }
    } ]), i;
}();

exports.default = i;