const V='ttfu-v14',A=['./','index.html','pet.html','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.png'],OPT=['intro.mp4','intro.webm','bg.jpg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(A).then(()=>Promise.all(OPT.map(u=>c.add(u).catch(()=>{}))))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.origin!==location.origin)return;
 if(r.mode==='navigate'){e.respondWith(fetch(r).then(x=>{if(x.ok){const c=x.clone();caches.open(V).then(k=>k.put('index.html',c))}return x}).catch(()=>caches.match('index.html')));return}
 if(r.headers.has('range')){e.respondWith(caches.match(u.href).then(async x=>{if(!x)return fetch(r);const b=await x.blob(),m=/bytes=(\d*)-(\d*)/.exec(r.headers.get('range')),s=+m[1]||0,en=m[2]?Math.min(+m[2],b.size-1):b.size-1;return new Response(b.slice(s,en+1),{status:206,headers:{'Content-Type':x.headers.get('Content-Type')||'video/mp4','Content-Range':'bytes '+s+'-'+en+'/'+b.size,'Content-Length':String(en-s+1)}})}));return}
 e.respondWith(caches.match(r).then(x=>x||fetch(r).then(y=>{if(y.ok){const c=y.clone();caches.open(V).then(k=>k.put(r,c))}return y})))});
