const CACHE='family_menu-shell-v2';
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(['/offline.html','/icon-192.png','/icon-512.png'])));self.skipWaiting();});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>(key.startsWith('sobrano-shell-')||key.startsWith('family_menu-shell-'))&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));});
// Authenticated HTML, app records and API responses are never cached by the worker.
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;if(event.request.mode==='navigate')event.respondWith(fetch(event.request).catch(()=>caches.match('/offline.html')));});
