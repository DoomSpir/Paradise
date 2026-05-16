const encode = e => {
        if (!e) return e;
        let n = "";
        for (let t = 0; t < e.length; t++) n += t % 2 ? String.fromCharCode(7 ^ e.charCodeAt(t)) : e[t];
        return encodeURIComponent(n)
    },
    decode = e => {
        if (!e) return e;
        const [n, ...t] = e.split("?");
        let o = "";
        const r = decodeURIComponent(n);
        for (let e = 0; e < r.length; e++) o += e % 2 ? String.fromCharCode(7 ^ r.charCodeAt(e)) : r[e];
        return o + (t.length ? "?" + t.join("?") : "")
    };
tmpConfig = {
    prefix: "/v1/tmp/",
    encodeUrl: encode,
    decodeUrl: decode,
    handler: "/tmp/handler.js",
    client: "/tmp/client.js",
    bundle: "/tmp/bundle.js",
    config: "/tmp/config.js",
    sw: "/tmp/sw.js"
}, self.__uv$config = tmpConfig;