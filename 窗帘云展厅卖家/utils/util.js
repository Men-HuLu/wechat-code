module.exports = {
    getSearchMusic: function(t, e, a, o) {
        wx.request({
            url: "https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp",
            data: {
                g_tk: 5381,
                uin: 0,
                format: "json",
                inCharset: "utf-8",
                outCharset: "utf-8",
                notice: 0,
                platform: "h5",
                needNewCode: 1,
                w: t,
                zhidaqu: 1,
                catZhida: 1,
                t: 0,
                flag: 1,
                ie: "utf-8",
                sem: 1,
                aggr: 0,
                perpage: 20,
                n: a,
                p: e,
                remoteplace: "txt.mqq.all",
                _: Date.now()
            },
            method: "GET",
            header: {
                "content-Type": "application/json"
            },
            success: function(t) {
                200 == t.statusCode && o(t.data);
            }
        });
    }
};