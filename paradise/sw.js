importScripts("/data/all.js", "/tmp/config.js", "/tmp/bundle.js", "/tmp/sw.js");
let playgroundData = null;
const {
    ScramjetServiceWorker: ScramjetServiceWorker
} = $scramjetLoadWorker(), scramjet = new ScramjetServiceWorker, v = new UVServiceWorker;
async function handleFetch(e) {
    try {
        const t = e.request.url;
        if (new URL(t).origin !== self.location.origin) return fetch(e.request);
        if (/\/cdn-cgi\//i.test(t)) return new Response(null, {
            status: 204
        });
        try {
            await scramjet.loadConfig()
        } catch (t) {
            return console.warn("[sw] scramjet.loadConfig failed, falling back to direct fetch", t), fetch(e.request)
        }
        try {
            if (scramjet ? .route ? .(e)) return scramjet.fetch(e)
        } catch (t) {
            return console.warn("[sw] scramjet route/fetch failed, falling back to direct fetch", t), fetch(e.request)
        }
        try {
            if (v ? .route ? .(e)) return v.fetch(e)
        } catch (t) {
            return console.warn("[sw] uv route/fetch failed, falling back to direct fetch", t), fetch(e.request)
        }
        return fetch(e.request)
    } catch (t) {
        return console.warn("[sw] handleFetch crashed, falling back to direct fetch", t), fetch(e.request)
    }
}
self.__LUNAR_SW_VERSION__ = "ads-failopen-2026-04-21", self.addEventListener("install", () => {
    self.skipWaiting()
}), self.addEventListener("activate", e => {
    e.waitUntil(self.clients.claim())
}), self.addEventListener("message", e => {
    const {
        type: t,
        data: r
    } = e.data || {};
    "playgroundData" === t && (playgroundData = e.data)
}), self.addEventListener("fetch", e => {
    e.respondWith(handleFetch(e))
});