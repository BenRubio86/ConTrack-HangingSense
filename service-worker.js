const CACHE='contrack-v3-1-1';
const ASSETS=[
  './','./index.html','./styles.css','./app.js','./manifest.webmanifest','./icon-192.png','./icon-512.png',
  './brand-app-icon.png','./brand-mark.png','./brand-lockup.png','./brand-lockup-vertical.png',
  './creator-benyima-ai.png','./contact-wechat.jpg','./contact-telegram.jpg'
];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{
    const copy=resp.clone();
    caches.open(CACHE).then(c=>c.put(e.request,copy));
    return resp;
  }).catch(()=>caches.match('./index.html'))));
});
