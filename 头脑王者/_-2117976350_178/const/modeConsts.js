var t = module.exports;

t.RunModeType = {
    Dev: "Dev",
    Dev2: "Dev2",
    DevZdq: "DevZdq",
    DevZyx: "DevZyx",
    Test: "Test",
    Test1: "Test1",
    Prod: "Prod",
    Temp: "Temp",
    CashDev: "CashDev",
    Tomato: "Tomato"
}, t.NetURL = {
    Dev: {
        httpURL: "http://10.1.1.150:16001"
    },
    Dev2: {
        httpURL: "http://192.168.1.152:16001"
    },
    DevZdq: {
        httpURL: "http://192.168.1.93:16001"
    },
    DevZyx: {
        httpURL: "http://192.168.1.3:16001"
    },
    Test: {
        httpURL: "http://211.159.149.238:16001"
    },
    Test1: {
        httpURL: "https://question.hortor010.com",
        resURL: "test-resource.hortor010.com"
    },
    Prod: {
        httpURL: "https://question-zh.hortor.net",
        resURL: "https://question-resource-wscdn.hortorgames.com"
    },
    Tomato: {
        httpURL: "http://192.168.1.218:16001"
    }
}, t.CashNetURL = {
    Dev: {
        httpURL: "http://192.168.1.136:14101",
        wsURL: "ws://192.168.1.136:14101/ws"
    },
    Dev2: {
        httpURL: "http://192.168.1.136:14101",
        wsURL: "ws://192.168.1.136:14101/ws"
    },
    Test1: {
        httpURL: "https://cash.hortor010.com",
        wsURL: "wss://cash.hortor010.com/ws"
    },
    Temp: {
        httpURL: "https://cash-temp.hortor010.com",
        wsURL: "wss://cash-temp.hortor010.com/ws"
    },
    Prod: {
        httpURL: "https://cash.hortor.net",
        wsURL: "wss://cash.hortor.net/ws"
    }
}, t.Version = "1.0.8", t.ClientVer = "3.9.24", t.ResVer = "0.0.1", t.RunMode = t.RunModeType.Prod, 
t.CashRunMode = t.RunModeType.Prod, t.AppKey = {
    TNWZ: 1,
    ZH: 2
}, t.CurAppKey = t.AppKey.TNWZ;