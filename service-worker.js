const CACHE='contrack-hangingsense-v4-6-20261002-i18n-manual2';
const ASSETS=['./','./index.html','./styles.css','./v45.css','./app-v4.5.js','./app-v4.6-overrides.js','./report-v46.js','./i18n-v46.json','./manual-v46.js','./user-manual.html','./user-manual-v2.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./brand-app-icon.png','./brand-lockup.png','./brand-lockup-vertical.png','./contact-wechat.jpg','./contact-telegram.jpg','./creator-benyima-ai.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  const fromManual=(e.request.referrer||'').includes('user-manual');
  const rootPath=u.pathname.endsWith('/ConTrack-HangingSense/')||u.pathname.endsWith('/ConTrack-HangingSense/index.html');
  if(e.request.mode==='navigate'&&fromManual&&rootPath&&!u.searchParams.has('screen')){
    const target=new URL('./?screen=more',u);
    e.respondWith(Promise.resolve(Response.redirect(target.href,302)));
    return;
  }
  if(e.request.mode==='navigate'&&u.pathname.endsWith('/user-manual-v2.html')){
    e.respondWith((async()=>{
      const base=await caches.match('./user-manual-v2.html')||await fetch(e.request);
      let html=await base.text();
      if(!html.includes('manual-v46.js'))html=html.replace('</body>','<script src="manual-v46.js"></script></body>');
      return new Response(html,{status:200,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}});
    })());
    return;
  }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{const copy=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return resp}).catch(()=>caches.match('./index.html'))));
});