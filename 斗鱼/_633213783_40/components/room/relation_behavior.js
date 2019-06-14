module.exports = Behavior({
    methods: {
        _parent: function() {
            var e = this.getRelationNodes("../record_item/record_item");
            return e && 0 !== e.length ? e[0] : this;
        },
        _sibling: function(e) {
            var t = this._parent().getRelationNodes("../" + e + "/" + index);
            if (t && t.length > 0) return t[0];
        }
    }
});