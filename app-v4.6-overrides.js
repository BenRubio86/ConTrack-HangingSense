(() => {
  const STORE='contrack_hangingsense_v4_5';
  const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  const ENF={range1h:'Last 1 hour',range3h:'Last 3 hours',rangeDay:'Today',rangeAll:'Entire session',noData:'No data in this range.',minutesShort:'min',secondsShort:'s',duration:'Duration',interval:'Interval',intensity:'Pain intensity',events:'Events',avgDuration5:'Avg duration · last 5',avgInterval5:'Avg interval · last 5',secondsUnit:'sec',startToStart:'start-to-start',range1hShort:'1 h',range3hShort:'3 h',versionLine:'Local & offline-first',creatorLabel:'APP CREATOR',creatorDescription:'Product concept, UX direction and application development.',doulaSilvana:'Doula Silvana',wechatId:'WeChat ID',telegramId:'Telegram ID',instagram:'Instagram',email:'Email',wechat:'WeChat',telegram:'Telegram',theme_hanging:'Copper Glow',theme_terracotta:'Terracotta Bloom',theme_sage:'Sage & Copper',theme_plum:'Plum Ember',theme_night:'Midnight Copper',theme_ivory:'Ivory Minimal',ariaSettings:'Open settings',ariaHome:'ConTrack home',ariaUnifiedChart:'Unified contraction chart',ariaTrendChart:'Rolling average trend',pee:'Pee',painEvent:'Pain / discomfort',waters:'Waters / fluid',bleeding:'Bleeding',other:'Other',recording:'Recording',ready:'Ready',inProgress:'Contraction in progress',tapWhenBegins:'Tap when a contraction begins',stop:'Stop',start:'Start',secAgo:'s ago',noneYet:'None recorded yet',low:'Low',moderate:'Moderate',strong:'Strong',intense:'Intense',contractions:'Contraction',event:'Event',details:'Details',edit:'Edit',saved:'Contraction saved',eventPhoto:'Event photo'};
  let packs={};
  function state(){try{return JSON.parse(localStorage.getItem(STORE)||'{}')}catch{return {}}}
  function tr(k){const s=state(),p=packs[s.lang]||packs.en||{};return p[k]??packs.en?.[k]??ENF[k]??k}
  function locale(){return ({de:'de-DE',fr:'fr-FR',es:'es-ES',fa:'fa-IR',zh:'zh-CN',hi:'hi-IN',ar:'ar-SA',ru:'ru-RU',ko:'ko-KR',ja:'ja-JP'})[state().lang]||'en-US'}
  function session(){const s=state(),a=s.sessions||[];return a.find(x=>x.id===s.currentSessionId)||a.at(-1)||{contractions:[],events:[]}}
  function contractions(){return [...(session().contractions||[])].sort((a,b)=>a.start-b.start)}
  function events(){return [...(session().events||[])].sort((a,b)=>a.time-b.time)}
  function avg(a){const v=a.filter(Number.isFinite);return v.length?v.reduce((x,y)=>x+y,0)/v.length:null}
  function last5(a){return avg(a.filter(Number.isFinite).slice(-5))}
  function fmtClock(ts){return new Date(ts).toLocaleTimeString(locale(),{hour:'2-digit',minute:'2-digit'})}
  function fmtDateLong(ts){return new Date(ts).toLocaleDateString(locale(),{day:'numeric',month:'short',year:'numeric'})}
  function fmtDur(sec){if(sec==null||!Number.isFinite(+sec))return '—';sec=Math.round(+sec);const m=Math.floor(sec/60),s=sec%60;return m?`${m} ${tr('minutesShort')} ${String(s).padStart(2,'0')} ${tr('secondsShort')}`:`${s} ${tr('secondsShort')}`}
  function rangeStart(){const r=state().summaryRange||'60';if(r==='all')return -Infinity;if(r==='day'){const d=new Date();return new Date(d.getFullYear(),d.getMonth(),d.getDate()).getTime()}return Date.now()-Number(r)*60000}
  function rangeData(){const since=rangeStart(),raw=contractions().filter(c=>c.start>=since),ev=events().filter(e=>e.time>=since);return {cs:raw.map((c,i)=>({...c,intervalSec:i?Math.max(0,Math.round((c.start-raw[i-1].start)/1000)):null})),ev}}
  function rolling(cs){const d=[],iv=[];return cs.map(c=>{d.push(+c.durationSec||0);if(Number.isFinite(c.intervalSec))iv.push(c.intervalSec);return {...c,avgDur:last5(d),avgInt:last5(iv)}})}
  function rangeLabel(){const r=state().summaryRange||'60';return r==='60'?tr('range1h'):r==='180'?tr('range3h'):r==='day'?tr('rangeDay'):tr('rangeAll')}
  function rangeText(cs,ev){const times=[...cs.map(c=>c.start),...ev.map(e=>e.time)];if(!times.length)return tr('noData');const a=Math.min(...times),b=Math.max(...times),same=new Date(a).toDateString()===new Date(b).toDateString();return same?`${fmtDateLong(a)} · ${fmtClock(a)}–${fmtClock(b)}`:`${fmtDateLong(a)} ${fmtClock(a)} – ${fmtDateLong(b)} ${fmtClock(b)}`}
  function eventMeta(type){return {pee:['🚻',tr('pee')],pain:['⚡',tr('painEvent')],waters:['💧',tr('waters')],bleeding:['●',tr('bleeding')],other:['＋',tr('other')]}[type]||['＋',tr('other')]}
  function intensityLabel(v){v=+v;return v<=2?tr('low'):v<=5?tr('moderate'):v<=7?tr('strong'):tr('intense')}
  function tickStep(min,max){const r=state().summaryRange||'60',span=max-min;if(r==='60')return 15*60000;if(r==='180')return 30*60000;if(r==='day')return 3*3600000;const approx=span/6,choices=[15*60000,30*60000,3600000,2*3600000,3*3600000,6*3600000,12*3600000,24*3600000,48*3600000,7*86400000];return choices.find(x=>x>=approx)||choices.at(-1)}
  function axisTime(ts,min,max){const cross=new Date(min).toDateString()!==new Date(max).toDateString();return new Date(ts).toLocaleString(locale(),cross?{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}:{hour:'2-digit',minute:'2-digit'})}
  function mkFactory(svg){const ns='http://www.w3.org/2000/svg';return (tag,a={},txt='')=>{const e=document.createElementNS(ns,tag);Object.entries(a).forEach(([k,v])=>e.setAttribute(k,v));if(txt)e.textContent=txt;svg.appendChild(e);return e}}
  function drawXAxis(svg,mk,W,H,p,min,max){const step=tickStep(min,max),start=Math.ceil(min/step)*step;for(let ts=start;ts<=max;ts+=step){const x=p.l+(ts-min)/Math.max(1,max-min)*(W-p.l-p.r);mk('line',{x1:x,y1:p.t,x2:x,y2:H-p.b,class:'chart-grid-minor'});mk('text',{x,y:H-13,'text-anchor':'middle',class:'axis-label'},axisTime(ts,min,max))}}
  function drawUnified(){const svg=$('#unifiedChart');if(!svg)return;const {cs,ev}=rangeData(),W=760,H=360,p={l:64,r:60,t:68,b:58};svg.innerHTML='';svg.setAttribute('aria-label',tr('ariaUnifiedChart'));if(!cs.length&&!ev.length){svg.innerHTML=`<text x="380" y="180" text-anchor="middle" fill="var(--muted)">${tr('noData')}</text>`;return}const mk=mkFactory(svg),times=[...cs.map(c=>c.start),...ev.map(e=>e.time)],min=Math.min(...times),max=Math.max(Math.max(...times),min+60000),x=ts=>p.l+(ts-min)/(max-min)*(W-p.l-p.r),maxDur=Math.max(60,...cs.map(c=>+c.durationSec||0)),maxInt=Math.max(60,...cs.map(c=>c.intervalSec||0)),yDur=v=>H-p.b-(v/maxDur)*(H-p.t-p.b),yInt=v=>H-p.b-(v/maxInt)*(H-p.t-p.b),yPain=v=>H-p.b-(v/10)*(H-p.t-p.b);[0,.25,.5,.75,1].forEach(q=>{const y=p.t+(H-p.t-p.b)*q;mk('line',{x1:p.l,y1:y,x2:W-p.r,y2:y,class:'chart-grid-major'})});drawXAxis(svg,mk,W,H,p,min,max);cs.forEach(c=>{const by=yDur(c.durationSec);mk('rect',{x:x(c.start)-8,y:by,width:16,height:H-p.b-by,rx:6,fill:'var(--primary2)',opacity:.8});if(c.intensity!=null)mk('circle',{cx:x(c.start),cy:yPain(c.intensity),r:5.5,fill:'var(--rose)',stroke:'var(--surface)','stroke-width':2})});const pts=cs.filter(c=>Number.isFinite(c.intervalSec));if(pts.length>1)mk('polyline',{points:pts.map(c=>`${x(c.start)},${yInt(c.intervalSec)}`).join(' '),fill:'none',stroke:'var(--teal)','stroke-width':3});pts.forEach(c=>mk('circle',{cx:x(c.start),cy:yInt(c.intervalSec),r:4,fill:'var(--teal)'}));ev.forEach(e=>{const xx=x(e.time),yy=H-p.b-10;mk('rect',{x:xx-5,y:yy-5,width:10,height:10,transform:`rotate(45 ${xx} ${yy})`,fill:'var(--accent)'})});mk('text',{x:8,y:40,class:'axis-label'},`${tr('duration')} · ${tr('secondsUnit')}`);mk('text',{x:W-8,y:40,'text-anchor':'end',class:'axis-label'},`${tr('interval')} / ${tr('intensity')} 0–10`);mk('text',{x:W/2+18,y:17,'text-anchor':'middle',class:'chart-date-label'},rangeText(cs,ev));placeLabels(svg,mk,cs.flatMap(c=>[{x:x(c.start),y:yDur(c.durationSec),text:fmtDur(c.durationSec),color:'--primary2',series:'duration'},...(Number.isFinite(c.intervalSec)?[{x:x(c.start),y:yInt(c.intervalSec),text:fmtDur(c.intervalSec),color:'--teal',series:'interval'}]:[]),...(c.intensity!=null?[{x:x(c.start),y:yPain(c.intensity),text:`${c.intensity}/10`,color:'--rose',series:'pain'}]:[])]),W,H,p)}
  function drawTrend(){const svg=$('#trendChart');if(!svg)return;const {cs}=rangeData(),W=760,H=290,p={l:72,r:82,t:68,b:58};svg.innerHTML='';svg.setAttribute('aria-label',tr('ariaTrendChart'));if(!cs.length){svg.innerHTML=`<text x="380" y="145" text-anchor="middle" fill="var(--muted)">${tr('noData')}</text>`;return}const rs=rolling(cs),mk=mkFactory(svg),min=rs[0].start,max=Math.max(rs.at(-1).start,min+60000),x=ts=>p.l+(ts-min)/(max-min)*(W-p.l-p.r),maxD=Math.max(10,...rs.map(r=>r.avgDur||0)),maxI=Math.max(60,...rs.map(r=>r.avgInt||0)),yD=v=>H-p.b-(v/maxD)*(H-p.t-p.b),yI=v=>H-p.b-(v/maxI)*(H-p.t-p.b);[0,.25,.5,.75,1].forEach(q=>{const y=p.t+(H-p.t-p.b)*q;mk('line',{x1:p.l,y1:y,x2:W-p.r,y2:y,class:'chart-grid-major'});const vd=Math.round(maxD*(1-q)),vi=Math.round(maxI*(1-q));mk('text',{x:p.l-9,y:y+4,'text-anchor':'end',class:'axis-label'},`${vd}${tr('secondsShort')}`);mk('text',{x:W-p.r+9,y:y+4,'text-anchor':'start',class:'axis-label'},vi>=60?`${(vi/60).toFixed(vi%60?1:0)} ${tr('minutesShort')}`:`${vi}${tr('secondsShort')}`)});drawXAxis(svg,mk,W,H,p,min,max);const d=rs.filter(r=>Number.isFinite(r.avgDur)),i=rs.filter(r=>Number.isFinite(r.avgInt));if(d.length>1)mk('polyline',{points:d.map(r=>`${x(r.start)},${yD(r.avgDur)}`).join(' '),fill:'none',stroke:'var(--primary2)','stroke-width':3,'stroke-linecap':'round','stroke-linejoin':'round'});d.forEach(r=>mk('circle',{cx:x(r.start),cy:yD(r.avgDur),r:4,fill:'var(--primary2)'}));if(i.length>1)mk('polyline',{points:i.map(r=>`${x(r.start)},${yI(r.avgInt)}`).join(' '),fill:'none',stroke:'var(--teal)','stroke-width':3,'stroke-linecap':'round','stroke-linejoin':'round'});i.forEach(r=>mk('circle',{cx:x(r.start),cy:yI(r.avgInt),r:4,fill:'var(--teal)'}));mk('text',{x:8,y:40,class:'axis-label'},`${tr('avgDuration5')} · ${tr('secondsUnit')}`);mk('text',{x:W-8,y:40,'text-anchor':'end',class:'axis-label'},`${tr('avgInterval5')} · ${tr('minutesShort')}`);mk('text',{x:W/2+18,y:17,'text-anchor':'middle',class:'chart-date-label'},rangeText(cs,[]));placeLabels(svg,mk,rs.flatMap(r=>[{x:x(r.start),y:yD(r.avgDur),text:fmtDur(r.avgDur),color:'--primary2',series:'avg-duration'},...(Number.isFinite(r.avgInt)?[{x:x(r.start),y:yI(r.avgInt),text:fmtDur(r.avgInt),color:'--teal',series:'avg-interval'}]:[])]),W,H,p)}
  // Keep values legible when two series share a point, with small leader lines
  // only when a label needs to move away from its marker.
  function placeLabels(svg,mk,values,W,H,p){
    const boxes=[];
    for(const v of values){
      const label=mk('text',{class:'chart-value-label','data-series':v.series,
        fill:`var(${v.color})`,'text-anchor':'middle'},v.text);
      let best=null;
      for(const dy of [-10,20,-26,36,-42,52]){
        for(const dx of [0,26,-26,52,-52]){
          label.setAttribute('x',Math.max(38,Math.min(W-38,v.x+dx)));
          label.setAttribute('y',Math.max(p.t-10,Math.min(H-p.b+30,v.y+dy)));
          const b=label.getBBox();
          const overlap=boxes.reduce((n,a)=>n+(b.x<a.x+a.width+4&&b.x+b.width+4>a.x&&b.y<a.y+a.height+3&&b.y+b.height+3>a.y?1:0),0);
          const score=overlap*1000+Math.abs(dx)+Math.abs(dy+10);
          if(!best||score<best.score)best={x:label.getAttribute('x'),y:label.getAttribute('y'),b,score};
          if(!overlap)break;
        }
        if(best.score<1000)break;
      }
      label.setAttribute('x',best.x);label.setAttribute('y',best.y);boxes.push(best.b);
      if(Math.abs(+best.x-v.x)>8||Math.abs(+best.y-v.y)>24){
        const line=mk('line',{x1:v.x,y1:v.y,x2:best.x,y2:+best.y-4,stroke:`var(${v.color})`,'stroke-width':.7,opacity:.55});
        svg.insertBefore(line,label);
      }
    }
  }
  // Reports are standalone documents/images: resolve the live CSS into each
  // SVG instead of exporting var(--...) and classes without their stylesheet.
  function chartSnapshot(id){
    id==='unifiedChart'?drawUnified():drawTrend();
    const source=document.getElementById(id),copy=source.cloneNode(true);
    const originals=[source,...source.querySelectorAll('*')],clones=[copy,...copy.querySelectorAll('*')];
    const properties=['fill','fill-opacity','stroke','stroke-width','stroke-opacity','stroke-dasharray','stroke-linecap','stroke-linejoin','opacity','font-family','font-size','font-weight','text-anchor','paint-order','direction','unicode-bidi'];
    originals.forEach((el,i)=>{
      const css=getComputedStyle(el);
      for(const prop of properties)clones[i].style.setProperty(prop,css.getPropertyValue(prop));
      for(const attr of ['fill','stroke'])if(el.hasAttribute(attr))clones[i].setAttribute(attr,css.getPropertyValue(attr));
    });
    const root=getComputedStyle(document.documentElement),color=k=>root.getPropertyValue(k).trim();
    const mk=mkFactory(copy),W=760,H=source.viewBox.baseVal.height;
    const legend=id==='unifiedChart'?[
      ['bar','--primary2',tr('duration')],['line','--teal',`${tr('interval')} · ${tr('startToStart')}`],
      ['dot','--rose',`${tr('intensity')} · 0–10`],['diamond','--accent',tr('events')]
    ]:[['line','--primary2',tr('avgDuration5')],['line','--teal',tr('avgInterval5')]];
    legend.forEach(([shape,key,text],i)=>{
      const x=24+(i%2)*370,y=H+18+Math.floor(i/2)*26,c=color(key);
      if(shape==='bar')mk('rect',{x,y:y-10,width:10,height:14,rx:3,fill:c});
      else if(shape==='diamond')mk('rect',{x:x+2,y:y-7,width:9,height:9,transform:`rotate(45 ${x+6.5} ${y-2.5})`,fill:c});
      else{if(shape==='line')mk('line',{x1:x,y1:y-3,x2:x+22,y2:y-3,stroke:c,'stroke-width':3});mk('circle',{cx:x+11,cy:y-3,r:4,fill:c})}
      mk('text',{x:x+30,y,fill:color('--text'),'font-size':11,'font-weight':500,'text-anchor':'start',direction:'ltr'},text);
    });
    const height=H+Math.ceil(legend.length/2)*26+14;
    copy.setAttribute('xmlns','http://www.w3.org/2000/svg');
    copy.setAttribute('viewBox',`0 0 ${W} ${height}`);copy.setAttribute('width',W);copy.setAttribute('height',height);
    copy.style.setProperty('width','100%');copy.style.setProperty('height','auto');copy.style.setProperty('min-width','0');
    return copy;
  }
  window.ConTrackCharts={snapshot:chartSnapshot};
  function patchStatic(){const s=state(),p=packs[s.lang]||packs.en||{};document.documentElement.lang=s.lang||'en';document.documentElement.dir=['ar','fa'].includes(s.lang)?'rtl':'ltr';$$('[data-i18n]').forEach(el=>{const k=el.dataset.i18n;const v=p[k]??ENF[k];if(v!=null)el.textContent=v});$('[data-screen="more"] .page-head p')?.remove();const ver=$('.brand-panel .version');if(ver)ver.textContent=`ConTrack V4.5 · ${tr('versionLine')}`;const cl=$('.creator-panel .eyebrow');if(cl)cl.textContent=tr('creatorLabel');const cd=$('.creator-panel p');if(cd)cd.textContent=tr('creatorDescription');const contact=$('.contact-section');if(contact){contact.querySelector('h2').textContent=tr('doulaSilvana');const rows=contact.querySelectorAll('.contact-list > *');if(rows[0])rows[0].innerHTML=`💬 <b>${tr('wechatId')}:</b> <span>HangingSense</span>`;if(rows[1])rows[1].innerHTML=`✈️ <b>${tr('telegramId')}:</b> <span>HangingSense</span>`;if(rows[2])rows[2].innerHTML=`📸 <b>${tr('instagram')}:</b> @hangingsense`;if(rows[3])rows[3].innerHTML=`✉️ <b>${tr('email')}:</b> hangingsense@gmail.com`;const caps=contact.querySelectorAll('figcaption');if(caps[0])caps[0].textContent=`💬 ${tr('wechat')}`;if(caps[1])caps[1].textContent=`✈️ ${tr('telegram')}`}
    const sel=$('#editEventType');if(sel){const vals=['pee','pain','waters','bleeding','other'],icons=['🚻','⚡','💧','●','＋'];[...sel.options].forEach((o,i)=>{if(vals[i])o.textContent=`${icons[i]} ${eventMeta(vals[i])[1]}`})}
    $$('[data-range]').forEach(b=>{if(b.dataset.range==='60')b.textContent=tr('range1hShort');if(b.dataset.range==='180')b.textContent=tr('range3hShort')});
    $('#quickSettings')?.setAttribute('aria-label',tr('ariaSettings'));$('.brand-mini')?.setAttribute('aria-label',tr('ariaHome'));$('#intensitySlider')?.setAttribute('aria-label',tr('intensity'));$('#photoViewer')?.setAttribute('alt',tr('eventPhoto'));
    const ids=['hanging','terracotta','sage','plum','night','ivory'];$$('.theme-card').forEach((b,i)=>{const n=b.querySelector('.theme-name');if(n&&ids[i]){const check=n.querySelector('.theme-check')?.outerHTML||'';n.innerHTML=`${tr('theme_'+ids[i])}${check}`}})
  }
  function patchDynamic(){const s=state(),active=!!s.activeStart;if($('#heroState'))$('#heroState').textContent=active?tr('recording'):tr('ready');if($('#heroSub'))$('#heroSub').textContent=active?tr('inProgress'):tr('tapWhenBegins');if($('#timerCaption'))$('#timerCaption').textContent=active?tr('stop'):tr('start');const last=contractions().at(-1);if($('#lastValue'))$('#lastValue').textContent=last?`${fmtDur(last.durationSec)} · ${Math.max(0,Math.round((Date.now()-(last.end||last.start))/1000))}${tr('secAgo')}`:tr('noneYet');const r=rangeData();if($('#rangeDescription'))$('#rangeDescription').textContent=`${rangeLabel()} · ${rangeText(r.cs,r.ev)}`;const v=+($('#intensitySlider')?.value||5),ev=+($('#editIntensity')?.value||5);if($('#intensityLabel'))$('#intensityLabel').textContent=intensityLabel(v);if($('#editIntensityLabel'))$('#editIntensityLabel').textContent=intensityLabel(ev);const ss=state();if(ss.pendingIntensityId){const c=contractions().find(x=>x.id===ss.pendingIntensityId);if(c&&$('#savedDuration'))$('#savedDuration').textContent=fmtDur(c.durationSec)}const edit=$('#editSheet');if(edit&&!edit.hidden){if(!$('#editContractionFields')?.hidden)$('#editTitle').textContent=tr('contractions');else{const type=$('#editEventType')?.value||'other';$('#editTitle').textContent=eventMeta(type)[1]}}}
  function refresh(){patchStatic();patchDynamic();drawUnified();drawTrend()}
  function openManualSameTab(){const s=state();location.href=`user-manual-v2.html?lang=${encodeURIComponent(s.lang||'en')}&theme=${encodeURIComponent(s.theme||'hanging')}&return=more`}
  function install(){refresh();const m=$('#openManual');if(m)m.onclick=openManualSameTab;if(new URLSearchParams(location.search).get('screen')==='more')setTimeout(()=>document.querySelector('[data-nav="more"]')?.click(),20);document.addEventListener('click',e=>{if(e.target.closest('[data-range],[data-history-filter],[data-nav],#saveEdit,#saveEvent,#saveIntensity,.theme-card,.record-edit,#editLastBtn'))setTimeout(refresh,100)},true);$('#languageSelect')?.addEventListener('change',()=>setTimeout(refresh,100));$('#intensitySlider')?.addEventListener('input',patchDynamic);$('#editIntensity')?.addEventListener('input',patchDynamic);$('#editEventType')?.addEventListener('change',patchDynamic);setInterval(patchDynamic,1000);const extra=document.createElement('script');extra.src='report-v46.js';extra.defer=true;document.head.appendChild(extra)}
  fetch('i18n-v46.json',{cache:'no-store'}).then(r=>r.json()).then(j=>{packs=j;install()}).catch(()=>{packs={en:ENF};install()});
})();