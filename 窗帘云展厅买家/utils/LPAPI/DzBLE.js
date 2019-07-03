function e(e) {
    wx[o[7]]({
        success: function(n) {
            setTimeout(function() {
                c(function(n) {
                    e(n);
                });
            }, 200);
        }
    });
}

function n() {
    wx[o[8]]({
        success: function(e) {}
    });
}

function c(e) {
    wx[o[27]]({
        success: function(n) {
            for (var c = new Array(), t = 0; t < n[o[24]][o[12]]; t++) i(n[o[24]][t][o[25]]) && c[o[26]](n[o[24]][t]);
            e(c);
        }
    });
}

function t(e) {
    var n = new Uint8Array(e[o[36]](/[\da-f]{2}/gi)[o[35]](function(e) {
        return parseInt(e, 16);
    }));
    wx[o[38]]({
        deviceId: r,
        serviceId: u,
        characteristicId: a,
        value: n[o[37]],
        success: function(e) {}
    });
}

function i(e) {
    var n = e[o[39]](), c = n[o[41]](o[40]), t = !1;
    if (p[o[12]] > 0) for (u = 0; u < p[o[12]]; u++) {
        var i = p[u];
        if (!(i[o[12]] > 0)) {
            t = !0;
            break;
        }
        if (n[o[42]](0, i[o[12]])[o[39]]() == i[o[39]]()) {
            t = !0;
            break;
        }
    } else t = !0;
    if (t && c[o[12]] > 1) {
        if ((n = c[c[o[12]] - 1])[o[12]] < 8) return !1;
        if (!new RegExp(o[43], o[44])[o[45]](n)) return !1;
        if (n[o[46]](3) == o[47]) return !0;
        var r = 2 * (n[o[46]](0) - o[47]);
        r += 3 * (n[o[46]](1) - o[47]), r += 5 * (n[o[46]](2) - o[47]);
        for (var u = 4; u < n[o[12]]; ++u) r += (n[o[46]](u) - o[47]) * (0 == (1 & u) ? 7 : 9);
        return s[o[46]](r % 10) == n[o[46]](3);
    }
    return !1;
}

var o = [ "5682904137", "", "exports", "初始化蓝牙适配器成功！", "log", "onBluetoothAdapterStateChange", "openBluetoothAdapter", "startBluetoothDevicesDiscovery", "stopBluetoothDevicesDiscovery", "已连接蓝牙设备：", "uuid", "services", "length", "characteristics", "notify", "properties", "write", "read", "获取特征值失败", "getBLEDeviceCharacteristics", "getBLEDeviceServices", "连接蓝牙设备失败", "createBLEConnection", "closeBLEConnection", "devices", "name", "push", "getBluetoothDevices", "正在发送数据", "loading", "showToast", "slice", "splice", "发送完成", "hideToast", "map", "match", "buffer", "writeBLECharacteristicValue", "toUpperCase", "-", "split", "substring", "^[0-9]+", "g", "exec", "charAt", "0" ], s = o[0], r = o[1], u = o[1], a = o[1], f = o[1], l = o[1], v = null, d = [], p = [];

module[o[2]] = {
    setSupportPrefixs: function(e) {
        p = e;
    },
    initBLE: function(n) {
        wx[o[6]]({
            success: function(c) {
                console[o[4]](o[3]), e(n), wx[o[5]](function(e) {});
            }
        });
    },
    startScanPeripherals: e,
    stopScanPeripherals: n,
    connectPeripheral: function(e) {
        n(), wx[o[22]]({
            deviceId: e,
            success: function(n) {
                r = e, console[o[4]](o[9] + r), wx[o[20]]({
                    deviceId: r,
                    success: function(e) {
                        u = e[o[11]][0][o[10]], wx[o[19]]({
                            deviceId: r,
                            serviceId: u,
                            success: function(e) {
                                for (var n = 0; n < e[o[13]][o[12]]; n++) e[o[13]][n][o[15]][o[14]] && (l = e[o[13]][n][o[10]]), 
                                e[o[13]][n][o[15]][o[16]] && (a = e[o[13]][n][o[10]]), e[o[13]][n][o[15]][o[17]] && (f = e[o[13]][n][o[10]]);
                            },
                            fail: function() {
                                console[o[4]](o[18]);
                            },
                            complete: function() {}
                        });
                    }
                });
            },
            fail: function() {
                console[o[4]](o[21]);
            },
            complete: function() {}
        });
    },
    disconnectPeripheral: function() {
        wx[o[23]]({
            deviceId: r,
            success: function(e) {}
        });
    },
    scanedPeripherals: c,
    sendData: function(e) {
        if (null == d && (d = new Array()), console[o[4]](e), null != e && (d[o[26]](e), 
        d[o[12]] > 0)) {
            var n = d[0];
            n[o[12]] > 0 ? (wx[o[30]]({
                title: o[28],
                icon: o[29],
                image: o[1],
                duration: 1e4,
                mask: !0,
                success: function(e) {},
                fail: function(e) {},
                complete: function(e) {}
            }), v = setInterval(function() {
                var e, c = n[0];
                c[o[12]] > 150 ? (e = c[o[31]](0, 150), n[0] = c[o[31]](0, 150)) : (e = c, n[o[32]](0, 1)), 
                t(e), n[o[12]] > 0 ? console[o[4]](e) : (clearInterval(v), d[o[32]](0, 1), console[o[4]](e), 
                console[o[4]](o[33]), wx[o[34]]());
            }, 30)) : (clearInterval(v), d[o[32]](0, 1), console[o[4]](o[33]), wx[o[34]]());
        }
    }
};