function t(t) {
    this.buffer = t, this.view = new DataView(t);
}

function e(t) {
    this.buffer = t, this.view = new DataView(t);
}

function n(t) {
    this.buffer = t, this.view = new DataView(t);
}

function r(t) {
    this.buffer = t, this.view = new DataView(t);
}

function i(t, e, n, r, i) {
    for (var o = new Uint8Array(t), a = new Uint8Array(e), u = 0; u < i; u++) a[u + r] = o[u + n];
}

function o(t) {
    var e = encodeURIComponent(t).replace(/%([0-9A-F]{2})/g, function(t, e) {
        return String.fromCharCode("0x" + e);
    }), n = new Uint8Array(e.length);
    return Array.prototype.forEach.call(e, function(t, e) {
        n[e] = t.charCodeAt(0);
    }), n;
}

function a(t) {
    var e = new Uint8Array(t), n = Array.prototype.map.call(e, function(t) {
        return String.fromCharCode(t);
    }).join("").replace(/(.)/g, function(t, e) {
        var n = e.charCodeAt(0).toString(16).toUpperCase();
        return n.length < 2 && (n = "0" + n), "%" + n;
    });
    return decodeURIComponent(n);
}

var u = require("./uuid");

t.actions = {
    heartbeat: 0,
    handShake: 1,
    payload: 8
}, t.prototype.action = function() {
    return this.view.getInt8(0);
}, t.prototype.ack = function() {
    return this.view.getUint32(1);
}, t.prototype.seq = function() {
    return this.view.getUint32(5);
}, t.prototype.payload = function() {
    return this.buffer.slice(9);
}, t.Gen = function(t, e, n, r) {
    var o = new ArrayBuffer(9 + r.byteLength), a = new DataView(o);
    return a.setUint8(0, t), a.setUint32(1, e), a.setUint32(5, n), i(r, o, 0, 9, r.byteLength), 
    o;
}, e.prototype.timestamp = function() {
    return this.view.getInt32(0);
}, e.Gen = function(t) {
    var e = new ArrayBuffer(4);
    return new DataView(e).setUint32(0, t), e;
}, n.actions = {
    newSession: 0,
    restoreSession: 1,
    success: 8,
    failed: 9
}, n.prototype.action = function() {
    return this.view.getUint8(0);
}, n.prototype.sessionId = function() {
    return u.bytesToUuid(new Uint8Array(this.buffer.slice(1)));
}, n.Gen = function(t, e) {
    var n = new ArrayBuffer(17);
    return new DataView(n).setUint8(0, t), e && i(u.uuidToBytes(e), n, 0, 1, 16), n;
}, r.actions = {
    request: 0,
    notify: 1,
    response: 8,
    push: 9
}, r.payloadFormat = {
    json: 0
}, r.prototype.action = function() {
    return this.view.getInt8(0);
}, r.prototype.reqId = function() {
    return this.view.getInt32(1);
}, r.prototype.payloadFormat = function() {
    return this.view.getInt8(5);
}, r.prototype.router = function() {
    var t = this.view.getInt16(6);
    return a(this.buffer.slice(8, 8 + t));
}, r.prototype.payloadJSON = function() {
    var t = this.view.getInt16(6), e = a(this.buffer.slice(8 + t));
    return JSON.parse(e);
}, r.Gen = function(t, e, n, r, a) {
    var u = o(r);
    "string" == typeof a && (a = o(a));
    var s = new ArrayBuffer(8 + u.byteLength + a.byteLength), f = new DataView(s);
    return f.setUint8(0, t), f.setUint32(1, e), f.setUint8(5, n), f.setUint16(6, u.byteLength), 
    i(u, s, 0, 8, u.byteLength), i(a, s, 0, 8 + u.byteLength, a.byteLength), s;
}, exports.CavenetPackage = t, exports.CavenetPackageHeartbeat = e, exports.CavenetPackageHandshake = n, 
exports.CavenetPackagePayload = r;