const V="bajo-v1",BASE=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(BASE)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
 const u=new URL(e.request.url);
 if(e.request.method!=="GET"||!(u.origin===location.origin||u.hostname==="cdn.jsdelivr.net"))return;
 e.respondWith(caches.match(e.request).then(hit=>{
  const net=fetch(e.request).then(r=>{if(r&&(r.ok||r.type==="opaque")){const c=r.clone();caches.open(V).then(ch=>ch.put(e.request,c))}return r}).catch(()=>hit);
  return hit||net;
 }));
});
