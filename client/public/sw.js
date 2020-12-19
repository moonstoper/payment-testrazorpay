console.warn("ws file in public folder");
console.log(5+222);
const CACHE ="appV1";

let self = this;
self.addEventListener("install",(event)=>{
    event.waitUntil(
        caches.open(CACHE).then((cache)=>{
            cache.addAll([
                "/static/js/main.chunk.js",
                "/static/js/bundle.js",
                "/static/js/0.chunk.js",
                "/index.html",
                "/"
            ])
        })
    )
})

self.addEventListener("fetch",(event)=>{
    event.respondWith(
        caches.match(event.request).then(res=>{
            if(res)
            return res
        })
    )
})