const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
let S;try{S=JSON.parse(localStorage.getItem('gr'))||{}}catch(e){S={}}
S.seed??=Math.random()*4e9>>>0;S.found??=[];S.lv??=0;S.opt??={};
const sv=()=>{try{localStorage.setItem('gr',JSON.stringify(S))}catch(e){}};
let sd=S.seed;const R=()=>{sd|=0;sd=sd+0x6D2B79F5|0;let t=Math.imul(sd^sd>>>15,1|sd);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const rn=a=>a[Math.random()*a.length|0],cl=(v,a,b)=>Math.min(b,Math.max(a,v)),M=Math;
const coarse=matchMedia('(pointer:coarse)').matches,dk=matchMedia('(prefers-color-scheme:dark)').matches,cores=navigator.hardwareConcurrency||4;
const O=S.opt;O.rm??=matchMedia('(prefers-reduced-motion:reduce)').matches;O.hc??=0;O.cu??=1;O.snd??=1;O.pf??=(coarse||cores<=4)?(cores<=2?'LOW':'BALANCED'):'HIGH';
const PC={HIGH:[22,280,2],BALANCED:[12,140,4],LOW:[5,50,8]};
const cam=$('#cam'),land=$('#land'),rm=$('#rm'),r2=$('#r2'),r4=$('#r4'),r5=$('#r5'),r6=$('#r6'),panel=$('#panel'),sayE=$('#say'),flE=$('#flash'),door=$('#door'),fin=$('#fin'),cur=$('#cur'),cur2=$('#cur2'),fx=$('#fx'),nz=$('#nz'),sc=$('#sc'),bar=$('#bar'),btBtn=$('#bt');
let lv=M.min(S.lv,85),room=0,now=0,lock=0,col=0,mir=0,mx=innerWidth/2,my=innerHeight/2,lastIn=0,hideC=0,frz=0,sy=0,off=0,dm=0,doorCd=0,thr=10000+R()*8000,idleT=0,ghost=0,cdup=0,resetDone=0,lk=-1,bgc='#f6f6f4',fgc='#0b0b0b',init=1,r2Solved=0;
const ph=()=>lock?0:lv<12?0:lv<30?1:lv<48?2:lv<66?3:lv<100?4:5;
const find=k=>{if(/^r\d$/.test(k))S.pg=M.max(S.pg||0,ORD.indexOf(+k[1])+1);if(!S.found.includes(k)){S.found.push(k);sv()}};
/* physics items */
const P=$$('#rm [data-p]').map(e=>{e.dataset.o=e.dataset.o0=e.textContent;return{e,x:0,y:0,r:0,vx:0,vy:0,vr:0,h:0,d:0,n:0}});
const B=P.filter(o=>o.e.tagName=='BUTTON'&&o.e.id!='rst'),clkE=$('#clk'),stE=$('#stat'),welE=$('#wel');
const setT=(e,t)=>{e.dataset.o=t;e.textContent=t};
const kick=(o,x,y,h)=>{o.x+=x;o.y+=y;o.h=now+h};
const tmp=(e,c,ms)=>{e.classList.add(c);setTimeout(()=>e.classList.remove(c),ms)};
const CH='█▓▒░#%/\\?¦';
function cor(e,p){const o=e.dataset.o;e.textContent=[...o].map(c=>c!=' '&&Math.random()<p?(Math.random()<.5?rn(CH):({O:'0',E:'3',I:'1',A:'4'}[c]||c)):c).join('');setTimeout(()=>e.textContent=e.dataset.o,180+Math.random()*350)}
function say(t,ms){sayE.textContent=t;sayE.style.display='block';clearTimeout(say.t);say.t=setTimeout(()=>sayE.style.display='none',ms)}
const MS=["DID YOU SEE THAT?","DON'T TRUST THE INTERFACE","YOU WEREN'T SUPPOSED TO FIND THIS","IT KNOWS YOU ARE HERE","THERE IS ANOTHER ROOM","KEEP LOOKING"];
function flash(){const p=ph();flE.textContent=MS[Math.random()*M.min(p+1,6)|0];flE.style.left=Math.random()*60+10+'vw';flE.style.top=Math.random()*70+10+'vh';flE.style.display='block';setTimeout(()=>flE.style.display='none',O.rm||coarse?900:80)}
/* sound */
let ac,mg,hg,pg,ap;
function au(){if(!O.snd)return;if(!ac){try{ac=new(window.AudioContext||webkitAudioContext)();mg=ac.createGain();mg.connect(ac.destination);hg=ac.createGain();hg.gain.value=0;const o=ac.createOscillator(),f=ac.createBiquadFilter();o.type='sawtooth';o.frequency.value=48;f.type='lowpass';f.frequency.value=160;o.connect(f);f.connect(hg);hg.connect(mg);o.start();pg=ac.createGain();pg.gain.value=0;pg.connect(mg);ap=[110,165,220].map(fr=>{const q=ac.createOscillator();q.type='sine';q.frequency.value=fr;q.connect(pg);q.start();return q})}catch(e){return}}ac.resume&&ac.resume();mg.gain.value=1}
function tn(f,d,ty,v,f2){if(!ac||!O.snd)return;const t=ac.currentTime,o=ac.createOscillator(),g=ac.createGain();o.type=ty;o.frequency.setValueAtTime(f,t);f2&&o.frequency.exponentialRampToValueAtTime(f2,t+d);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(1e-4,t+d);o.connect(g);g.connect(mg);o.start();o.stop(t+d)}
function nb(d,v){if(!ac||!O.snd)return;const b=ac.createBuffer(1,ac.sampleRate*d|0,ac.sampleRate),a=b.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=Math.random()*2-1;const s=ac.createBufferSource(),g=ac.createGain();g.gain.value=v;s.buffer=b;s.connect(g);g.connect(mg);s.start()}
const sfx=k=>({click:()=>tn(1400,.03,'square',.03),enter:()=>tn(180,.6,'sine',.12,420),gl:()=>{nb(.08,.08);tn(90,.12,'sawtooth',.05,40)},door:()=>tn(700,1,'sine',.12,60),beat:()=>tn(70,.22,'sine',.3,38),fail:()=>{nb(1.2,.2);tn(70,1.4,'sawtooth',.15,25)}})[k]?.();
/* fx helpers */
const PA=[],TR=[],HO=[];
function burst(x,y,n){if(O.rm)return;n=M.min(n,PC[O.pf][1]-PA.length);for(let i=0;i<n;i++){const a=Math.random()*6.28,s=1+Math.random()*6;PA.push({x,y,vx:M.cos(a)*s,vy:M.sin(a)*s,l:40+Math.random()*50,g:Math.random()<.5?.15:0})}}
function tear(){if(coarse&&!O.rm&&navigator.vibrate)navigator.vibrate(25);const d=document.createElement('div');d.className='tear';d.style.top=Math.random()*92+'vh';d.style.translate=(Math.random()-.5)*90+'px 0';document.body.append(d);setTimeout(()=>d.remove(),90)}
function wave(x,y,big){const r=document.createElement('div');r.className='ring';r.style.left=x+'px';r.style.top=y+'px';document.body.append(r);setTimeout(()=>r.remove(),520);const p=ph();
 if(p>=2&&room==1)P.forEach(o=>{const b=o.e.getBoundingClientRect(),dx=b.left+b.width/2-x,dy=b.top+b.height/2-y,d=M.hypot(dx,dy)||1;if(d<320){const f=(big?2:1)*(lv/9)*(1-d/320);o.vx+=dx/d*f;o.vy+=dy/d*f}});
 if(p>=3){burst(x,y,6+lv/8|0);if(!O.rm&&Math.random()<.4&&okF())tmp(rm,'inv',90)}}
function add(n){if(lock||room!=1||col)return;lv=M.min(100,lv+n*(ngp?.5:1));if(lv>=100)collapse()}
/* glitch table: name,minPhase,prob,cooldown,motion?,fn */
const GL=[
['shift',1,.3,1500,0,()=>kick(rn(P),(Math.random()-.5)*(2+lv/8),0,350)],
['flick',1,.12,4000,1,()=>tmp(rm,'fl',70)],
['nocur',1,.08,7000,0,()=>hideC=now+700],
['corr',1,.35,900,0,()=>cor(rn(P).e,.08+lv/300)],
['msg',1,.05,9000,0,flash],
['btn',1,.12,4000,0,()=>kick(rn(B),(Math.random()-.5)*lv/2,(Math.random()-.5)*lv/4,600)],
['dupe',2,.2,2500,0,()=>{const e=rn(P).e;e.dataset.c=e.dataset.o;tmp(e,'dupe',400)}],
['gone',2,.15,3000,0,()=>tmp(rn(P).e,'gone',500)],
['melt',2,.12,3500,1,()=>tmp(rn(P).e,'melt',450)],
['freeze',2,.08,6000,1,()=>frz=now+280],
['rgb',2,.2,3000,1,()=>tmp(cam,'rgb',350)],
['cdup',2,.2,3000,0,()=>cdup=now+500],
['nav',3,.08,5000,0,()=>{$$('#nav button').forEach(b=>b.style.order=R()*5|0)}],
['swap',3,.15,4000,0,()=>{const e=rn([welE,stE,$('#go')]),o=e.dataset.o;e.textContent=rn(['NOBODY IS HERE','WHO ARE YOU','IT IS WATCHING','NOT A WEBSITE','LOOK BEHIND YOU']);setTimeout(()=>e.textContent=e.dataset.o,1400)}],
['inv',3,.1,4000,1,()=>tmp(rm,'inv',110)],
['cbet',4,.1,9000,1,()=>betray=now+1600],
['peek',3,.08,12000,0,()=>{const d=document.createElement('div');d.className='pk';d.innerHTML='<i></i><i></i>';d.style.left=(Math.random()<.5?2:92)+'vw';d.style.top=10+Math.random()*75+'vh';document.body.append(d);setTimeout(()=>d.remove(),600)}],
['sig',3,.05,30000,1,()=>{const d=document.createElement('div');d.className='sig';d.textContent='NO SIGNAL';document.body.append(d);setTimeout(()=>d.remove(),1700)}],
['whisper',4,.05,25000,0,()=>{if(!O.snd||!window.speechSynthesis)return;const u=new SpeechSynthesisUtterance(rn(['keep looking','it knows you are here','behind you','stop']));u.volume=.35;u.rate=.6;u.pitch=0;speechSynthesis.speak(u)}],
['tear',3,.3,1500,1,()=>{tear();sfx('gl')}]];
const gcd={};
function tick(){const p=ph();if(room!=1||col)return;
 if(stopT&&now-stopT>6000){if(lastClk<stopT)BH.obey++;stopT=0}
 if(p>=2&&Math.random()<.03){document.title=[...'GLITCHROOM'].map(c=>Math.random()<.3?rn(CH):c).join('');setTimeout(()=>document.title='GLITCHROOM',400)}
 if(p>=2&&!todD){todD=1;todSay()}
 if(p){GL.forEach(g=>{if(p<g[1]||(O.rm&&g[4])||now<(gcd[g[0]]||0))return;if(Math.random()<g[2]*(.4+lv/60)&&(!g[4]||okF())){g[5]();gcd[g[0]]=now+g[3]*(1.2-lv/150);if(g[0]=='corr'||g[0]=='tear')0}})}
 if(now-idleT>0&&now-lastIn>thr&&!lock&&now-idleT>3500){idleT=now;idle()}
 B.forEach(o=>o.n=0);
 if(lv>=70&&!col&&now>doorCd&&Math.random()<.4){doorCd=now+18000;door.style.left=R()*80+8+'vw';door.style.top=R()*70+15+'vh';door.hidden=0;setTimeout(()=>{if(!col&&room==1)door.hidden=1},coarse?1100:750)}
 if(lv>=52&&!resetDone&&$('#rst').hidden&&!lock)$('#rst').hidden=0;
 lv+=.15*.2;S.lv=lv;
 if(hg)hg.gain.setTargetAtTime(O.snd?.004+lv*.0009:0,ac.currentTime,.5);if(pg){pg.gain.setTargetAtTime(O.snd&&room==1?lv*.00035:0,ac.currentTime,.8);ap.forEach(q=>q.detune.setTargetAtTime((Math.random()-.5)*lv*9,ac.currentTime,.5))}}
setInterval(()=>{if(room==1)tick()},200);setInterval(sv,2500);
function idle(){BH.idle++;const a=rn(['g','b','m','c','p','t','e']);if(a=='t')todSay();if(a=='e')echo();if(a=='g'){ghost={t:now,x0:R()*innerWidth,y0:R()*innerHeight,x1:R()*innerWidth,y1:R()*innerHeight}}
 if(a=='b')kick(rn(B),(Math.random()-.5)*140,(Math.random()-.5)*80,1200);if(a=='m')say(rn(["I DIDN'T DO THAT","STILL THERE?","DID YOU SEE THAT?","IT'S QUIET NOW"]),1800);
 if(a=='c')off+=(Math.random()<.5?-1:1)*(20+Math.random()*90|0)*1000;if(a=='p'&&panel.hidden&&ph()>=2)open('SYSTEM');lv+=.5}
/* text/status/clock */
function stat(){const p=ph(),w=lv>=90&&!lock?'YOU':p<2?'ONLINE':p==2?'UNSTABLE':p==3?'CRITICAL':'UNKNOWN',t='SYSTEM STATUS: '+w;if(stE.dataset.o!=t)setT(stE,t)}
function clock(){if(now<frz)return;const p=ph();let t=Date.now()+off;if(p==1&&Math.random()<.04)off+=1000;if(p==2)t+=(Math.random()*5-2|0)*1000;if(p==3&&Math.random()<.3)t-=(5+Math.random()*40|0)*1000;
 const s=(lv>=90&&!lock)||(p==4&&Math.random()<.35)?'TIME: UNKNOWN':new Date(t).toTimeString().slice(0,8);if(clkE.dataset.o!=s)setT(clkE,s)}
setInterval(()=>{if(room==1&&!col){clock();stat()}},250);
/* theme */
function theme(k){if(dk||M.abs(k-lk)<.01)return;lk=k;const v=M.round(246-235*k),f=M.round(11+229*k),s=document.documentElement.style;bgc=`rgb(${v},${v},${v})`;fgc=`rgb(${f},${f},${f})`;if(k<.01){s.removeProperty('--bg');s.removeProperty('--fg')}else{s.setProperty('--bg',bgc);s.setProperty('--fg',fgc)}}
/* panels */
const up=()=>{const s=performance.now()/1e3|0;return(s/60|0)+'m '+s%60+'s'};
function open(n){const p=ph();let h=`<b>${n}</b> <button data-x style="float:right">X</button><br><br>`;
 if(n=='SYSTEM')h+=`KERNEL 0.9.1<br>UPTIME ${up()}<br>OBSERVERS ${p<3?1:p<4?2:'?'}<br>ANOMALIES ${S.found.length}/12<br>RESETS ${S.resets|0}<br>ENDINGS ${(S.end||[]).length}/7${p>=2?'<br>TYPE ANYTHING.':''}`;
 if(n=='ARCHIVE')h+=`LOG_001 NORMAL<br>LOG_002 NORMAL<br>LOG_003 ${p>1?'DID YOU SEE THAT?':'NORMAL'}<br>LOG_004 ████████<br>LOG_005 <button id=mi><i>░░░░░░</i><u>MIRROR</u></button>`;
 if(n=='SETTINGS')h+=[['BRIGHTNESS',80],['STABILITY',25],['REALITY',80]].map(([k,v])=>`<label>${k}<input type=range data-k=${k} value=${v} aria-label=${k}></label>`).join('');
 panel.innerHTML=h;panel.hidden=0}
panel.addEventListener('input',e=>{const t=e.target,k=t.dataset.k,v=+t.value,d=v-(t._v??+t.defaultValue);t._v=v;
 if(k=='BRIGHTNESS')cam.style.filter=`brightness(${.4+v/100*.8})`;
 if(k=='STABILITY'&&d>0)add(d*.5);if(k=='REALITY'){add(M.abs(d)*.7);if(v>=100){lv=M.max(lv,74);say('REALITY ACCEPTED.',2000)}}});
/* mirror */
const setMir=v=>{mir=v;find('mirror')};
/* reset / collapse / exit */
function reset(){lock=1;resetDone=1;S.resets=(S.resets|0)+1;$('#rst').hidden=1;panel.hidden=1;P.forEach(o=>{o.vx=o.vy=o.vr=0;o.n=0;setT(o.e,o.e.dataset.o0)});$$('#nav button').forEach(b=>b.style.order='');say('SYSTEM RESTORED.',2500);
 setTimeout(()=>{lock=0;lv=64;say('YOU RESET THE WRONG THING.',4000);sfx('gl');setMir(1);setTimeout(()=>mir=0,30000)},7500)}
function collapse(){if(col)return;col=1;door.hidden=1;panel.hidden=1;sfx('fail');if(coarse&&!O.rm&&navigator.vibrate)navigator.vibrate([80,40,120]);burst(innerWidth/2,innerHeight/2,PC[O.pf][1]);P.forEach(o=>{o.vx=(Math.random()-.5)*40;o.vy=(Math.random()-.5)*40;o.vr=(Math.random()-.5)*30});
 const ti=setInterval(()=>{if(!O.rm&&okF())tear();burst(Math.random()*innerWidth,Math.random()*innerHeight,20)},140);
 setTimeout(()=>{clearInterval(ti);rm.hidden=1;fin.textContent='';fin.hidden=0;let i=0,s='THERE WAS NEVER A WEBSITE.';const ty=setInterval(()=>{fin.textContent=s.slice(0,++i);if(i>=s.length)clearInterval(ty)},90)},2400);
 setTimeout(()=>{if(room==1&&col){door.style.left=R()*70+15+'vw';door.style.top='78vh';door.hidden=0}},7500)}
function exit(msg){const B0=BH;BH={clk:0,idle:0,obey:0};stopT=0;term.hidden=1;end3=0;away=0;hideC=0;nx.hidden=1;botE.hidden=1;bot2E.hidden=1;room=0;lock=0;col=0;lv=0;S.lv=0;mir=0;sd=S.seed=Math.random()*4e9>>>0;resetDone=0;cam.style.filter='';cam.style.transform='';
 [rm,r2,r3,r4,r5,r6,r7,r8,fin,door,panel,$('#rst')].forEach(e=>e.hidden=1);fin.removeAttribute('style');fin.onclick=null;land.hidden=0;land.style.opacity=1;$('#cb').textContent=msg||'';$('#fg').hidden=!S.found.length;
 P.forEach(o=>{o.x=o.y=o.r=o.vx=o.vy=o.vr=0;o.e.style.translate=o.e.style.rotate='';setT(o.e,o.e.dataset.o0)});$$('#nav button').forEach(b=>b.style.order='');theme(0);sv();card(B0,msg);rsr();$('#crash').hidden=1}
/* room 02 */
let WO=[];
const WD=[['MEMO','NOBODY WROTE THIS','r'],['DOOR?','NOT THIS ONE','f'],['NOTHING','','n'],['▲ ▲ ▲','⌬ ⍜ ◬','r'],['OBSERVER','STOP LOOKING AT ME','h'],['FILE_000','████ ██ ████','n'],['YOU','YOU','r']];
function mkWin(t,b,tp,i){const e=document.createElement('div');e.className='win';e.innerHTML=`<div class=wt>${t}</div><div class=wb>${b||'&nbsp;'}</div>`;e.style.left=R()*M.max(10,innerWidth-200)+'px';e.style.top=innerHeight*.28+R()*innerHeight*.5+'px';r2.append(e);const o={e,x:0,y:0,tp,i,hit:0,d:0};WO.push(o);return o}
function goR2(){if(room==2)return;room=2;col=0;S.room=2;find('r2');[door,fin,rm,panel].forEach(e=>e.hidden=1);r2.hidden=0;sfx('door');tc(2);WO.forEach(o=>o.e.remove());WO=[];$('#r2t')?.remove();r2Solved=0;
 const h=document.createElement('h1');h.id='r2t';h.innerHTML=[...'ROOM 02'].map((c,i)=>`<span style="animation-delay:${-i*.5}s">${c==' '?'&nbsp;':i==5?'◬':c}</span>`).join('');r2.append(h);WD.forEach((w,i)=>mkWin(...w,i));repair(mkWin('REPAIR','','g',7));
 say('ANOMALIES DETECTED. SOLVE "REPAIR" AND INTERACT WITH WINDOWS.',3800)}
function touch(o){if(o.hit)return;o.hit=1;const hitCount=WO.filter(w=>w.hit).length;if(hitCount<6)say(`ANOMALIES FOUND: ${hitCount}/6`,1200);if(hitCount>=6&&r2Solved&&!WO.some(w=>w.tp=='x')){const w=mkWin('WAY OUT','LEAVE',' x'.trim(),9);w.e.dataset.x=1;w.e.style.left='calc(50% - 75px)';w.e.style.top='58%';w.e.style.borderColor='var(--ac)';say('WAY OUT UNLOCKED.',2400)}}
/* input */
let drag=0,lp=0,px=0,py=0,lpt=0;
addEventListener('pointermove',e=>{const d=M.hypot(e.clientX-mx,e.clientY-my);if(room>=3&&d>3)lmv=now;if(e.pointerType=='touch'&&!drag)sy+=(e.clientY-my)*2;mx=e.clientX;my=e.clientY;lastIn=now;if(room==1){add(d*.004);if(d>50&&ph()>=4&&!O.rm)HO.push({x:mx,y:my,r:10+Math.random()*20,e:now+900});if(d>60&&ph()>=1&&Math.random()<.2)sfx('click')}
 if(drag){const dx=mx-drag.sx,dy=my-drag.sy;if(M.hypot(dx,dy)>6)dm=1;drag.o.x=drag.ox+dx*(mir?-1:1);drag.o.y=drag.oy+dy;if(room==1)add(.2)}
 if(lp&&M.hypot(mx-px,my-py)>12){clearTimeout(lp);lp=0}});
addEventListener('pointerdown',e=>{if(e.target.closest&&e.target.closest('#term,#dlg,#bar,#bt'))return;lastIn=now;dm=0;au();px=mx=e.clientX;py=my=e.clientY;if(room==1){BH.clk++;lastClk=now;CK.push(now);if(CK.length>6)CK.shift();wave(mx,my);add(1.6);if(ph()>=1)sfx('gl');lp=setTimeout(()=>{wave(mx,my,1);add(5);const h=$('#hid');const b=h.getBoundingClientRect();if(M.hypot(mx-b.left-b.width/2,my-b.top)<120)h.classList.add('on')},600);
  const o=P.find(o=>o.e.contains(e.target));if(o&&ph()>=3){drag={o,sx:mx,sy:my,ox:o.x,oy:o.y};o.d=1}}
 if(room==2){const w=WO.find(w=>w.e.contains(e.target));if(w){touch(w);if(e.target.closest('.wt')){drag={o:w,sx:mx,sy:my,ox:w.x,oy:w.y};w.d=1}}}});
addEventListener('pointerup',()=>{clearTimeout(lp);lp=0;if(drag){drag.o.d=0;drag=0}});
addEventListener('pointerenter',e=>{},1);
document.addEventListener('pointerover',e=>{const b=e.target.closest&&e.target.closest('#rm button');if(!b||room!=1||lock)return;const o=P.find(o=>o.e==b),p=ph();if(!o)return;add(.5);
 if(p>=3&&o.n<3&&Math.random()<.6&&b.id!='rst'){o.n++;const r=b.getBoundingClientRect(),dx=r.left+r.width/2-mx,dy=r.top+r.height/2-my,d=M.hypot(dx,dy)||1;o.vx+=dx/d*22;o.vy+=dy/d*22}
 else if(p>=1&&Math.random()<.5){if(Math.random()<.5)kick(o,(Math.random()-.5)*lv/3,0,500);else{const t=b.dataset.o;b.textContent=rn(['?','NOT THIS','NO','▓▓▓']);setTimeout(()=>b.textContent=b.dataset.o,400)}}});
$('#hid').addEventListener('pointerenter',()=>find('hid'));
addEventListener('wheel',e=>{lastIn=now;if(room){sy+=e.deltaY*(!!mir!=!!ngp?-1:1)*(ph()>=3&&Math.random()<.25?-1:1);add(.15)}},{passive:true});
addEventListener('resize',()=>{fit();add(3)});
addEventListener('keydown',e=>{lastIn=now;if(e.key=='Escape'){if(!term.hidden)term.hidden=1;else if(!panel.hidden)panel.hidden=1;else if(bar.classList.contains('open'))tgB();else if(room)exit()}else if(room&&term.hidden&&e.key.length==1&&e.key!=' '&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&document.activeElement.tagName!='INPUT'){e.preventDefault();tOpen();ti.value=e.key}});
addEventListener('pagehide',sv);
let rcI=0,rcT=0,rcN=0;
function rcl(el){if(el==rcI&&now-rcT<1600)rcN++;else{rcI=el;rcN=1}rcT=now;const m={4:'STOP.',7:'I SAID STOP.',10:'WHY ARE YOU DOING THAT?'}[rcN];if(m){say(m,1800);add(2);stopT=now}if(rcN==14){tmp(el,'gone',3000);say('...',2000)}}
const GO=['YOU ARE ALREADY IN THE ROOM','WELCOME BACK','NOBODY IS HERE','WELCOME'];let gi=0;
document.addEventListener('click',e=>{const b=e.target.closest('button'),w=e.target.closest('.win');
 if(w&&w.dataset.x){{const n=ending();exit(`YOU ESCAPED. ENDING: ${n} (${S.end.length}/7)`)}return}
 if(w){const o=WO.find(o=>o.e==w);if(o){
  touch(o);
  if(o.tp=='f'){w.querySelector('.wb').textContent='LOCKED.';sfx('gl')}
  if(o.tp=='h'){w.querySelector('.wb').textContent='IT WATCHES YOU.';sfx('gl')}
  if(o.tp=='n'&&(o.c=(o.c||0)+1)>=3)w.querySelector('.wb').textContent='I TOLD YOU';
  if(o.i==6){
   o.k=(o.k||0)+1;sfx('gl');
   if(!r2Solved){
    w.querySelector('.wb').textContent='RESTORE ORDER FIRST.';
    say('SOLVE "REPAIR" WINDOW FIRST TO UNLOCK THIS ANOMALY.',2800);
    o.x=(R()-.5)*(innerWidth-220);o.y=(R()-.5)*(innerHeight-220);
    return}
   if(o.k<4){
    const rep=['WHO IS THIS?','NOT YOU.','STOP CHASING ME.'];
    w.querySelector('.wb').textContent=rep[o.k-1]||'NOT YOU.';
    o.x=(R()-.5)*(innerWidth-220);o.y=(R()-.5)*(innerHeight-220);
    say(`CONFRONTING "YOU" (${o.k}/4)`,1400);tear();
    return}
   w.querySelector('.wb').textContent='LOOK BEHIND YOU.';
   say('ANOMALY COLLAPSED. LOOK BEHIND YOU.',2600);
   setTimeout(goR3,2200);return}
  if(o.tp=='r'){const wb=w.querySelector('.wb');wb.textContent=[...wb.textContent].map(c=>Math.random()<.4?rn(CH):c).join('')}sfx('gl')}}
 if(!b)return;if(dm){dm=0;return}au();sfx('click');const id=b.id;
 if(b.closest('#rm')&&room==1&&!lock)rcl(b);
 if(id=='in'){ngp=(S.end||[]).length>=5?1:0;$('#card').hidden=1;T0=performance.now();if(O.dy)sd=[...new Date().toDateString()].reduce((a,c)=>a*31+c.charCodeAt(0)|0,7);sfx('enter');land.style.transition='opacity .8s';land.style.opacity=0;setTimeout(()=>{land.hidden=1;rm.hidden=0;room=1;lastIn=now;stat();
   if(lv<12)setTimeout(()=>{if(room==1&&lv<12){hideC=now+700;tmp(rm,'fl',60);kick(P[0],2,0,1200)}},1600)},800)}
 if(id=='go'&&!lock){setT(welE,GO[gi++%4]);add(4)}
 if(b.dataset.a&&!lock)open(b.dataset.a);
 if(b.dataset.x!==undefined)panel.hidden=1;
 if(id=='mi')setMir(mir?0:1);
 if(id=='rst')reset();
 if(id=='fg'){S.found=[];S.resets=0;S.lv=0;lv=0;S.pg=0;S.end=[];S.best=0;delete S.max;rsr();$('#card').hidden=1;sv();$('#cb').textContent='FORGOTTEN.';b.hidden=1}
 if(id=='door')goR2();if(id=='lv')exit(epm);if(b.dataset.rs){land.hidden=1;lastIn=now;ngp=(S.end||[]).length>=5?1:0;T0=performance.now();({2:goR2,3:goR3,4:goR4,5:goR5,6:goR6,7:goR7,8:goR8})[b.dataset.rs]()}if(id=='cp'){try{navigator.clipboard.writeText(b.dataset.t)}catch(e){}$('#cb').textContent='COPIED.'}
 if(b.dataset.o2)optT(b.dataset.o2)});
door.addEventListener('pointerdown',e=>{e.stopPropagation();goR2()});
/* a11y bar */
const OP=[['snd',()=>'SOUND '+(O.snd?'ON':'OFF')],['rm',()=>'MOTION '+(O.rm?'REDUCED':'FULL')],['hc',()=>'CONTRAST '+(O.hc?'HIGH':'NORMAL')],['cu',()=>'CURSOR '+(O.cu?'CUSTOM':'NORMAL')],['pf',()=>'PERF '+O.pf],['ez',()=>'ASSIST '+(O.ez?'ON':'OFF')],['dy',()=>'DAILY '+(O.dy?'ON':'OFF')]];
bar.innerHTML=OP.map(o=>`<button data-o2=${o[0]}></button>`).join('')+'<button data-t>TERMINAL</button><button data-e>ESC / EXIT</button>';bar.querySelector('[data-t]').onclick=e=>{e.stopPropagation();if(!room)return;term.hidden?tOpen():term.hidden=1};
bar.querySelector('[data-e]').onclick=e=>{e.stopPropagation();if(room)exit()};
function optT(k){if(k=='pf')O.pf=({HIGH:'BALANCED',BALANCED:'LOW',LOW:'HIGH'})[O.pf];else O[k]=O[k]?0:1;if(k=='snd'){if(O.snd)au();else if(mg)mg.gain.value=0}bl();fit();sv()}
function bl(){bar.querySelectorAll('[data-o2]').forEach((b,i)=>b.textContent=OP[i][1]());document.body.classList.toggle('rm',!!O.rm);document.body.classList.toggle('hc',!!O.hc)}
function tgB(v){const o=v!==undefined?v:!bar.classList.contains('open');bar.classList.toggle('open',o);if(btBtn){btBtn.textContent=o?'▼':'▲';btBtn.setAttribute('aria-expanded',String(o))}}
if(btBtn)btBtn.onclick=e=>{e.stopPropagation();tgB()};
/* render loop */
const ctx=fx.getContext('2d'),nc=nz.getContext('2d'),nid=nc.createImageData(64,64);let fr=0,lt=0,dpr=1,lsy=0;
function fit(){dpr=O.pf=='LOW'?1:M.min(devicePixelRatio||1,1.5);fx.width=innerWidth*dpr;fx.height=innerHeight*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)}
function loop(t){requestAnimationFrame(loop);now=t;fr++;const p=ph(),m=O.rm?.35:1,pc=PC[O.pf];
 if(room==1){const K=[.12,.12,.06,.02,0,0][p],D=p<4?.8:.985,rects=p>=4&&!O.rm?P.map(o=>o.e.getBoundingClientRect()):0;
  P.forEach((o,i)=>{if(o.d)return;if(now>o.h){o.vx-=o.x*K;o.vy-=o.y*K}
   if(rects){o.vy+=.12+ty*.1;o.vx+=tx*.15;o.vr+=(Math.random()-.5)*.05;const b=rects[i];if(b.bottom>innerHeight-4){o.y-=b.bottom-innerHeight+4;o.vy*=-.55}if(b.top<0){o.y-=b.top;o.vy=M.abs(o.vy)}if(b.left<0){o.x-=b.left;o.vx=M.abs(o.vx)}if(b.right>innerWidth){o.x-=b.right-innerWidth;o.vx=-M.abs(o.vx)}o.r+=o.vr*.1;o.vr*=.99}else{o.r*=.8;o.vr*=.8}
   o.vx*=D;o.vy*=D;o.x+=o.vx*m;o.y+=o.vy*m;o.e.style.translate=`${o.x.toFixed(1)}px ${o.y.toFixed(1)}px`;o.e.style.rotate=o.r.toFixed(2)+'deg'});
  sy*=.9;sy=cl(sy,-400,400);rm.style.translate=`0 ${(-sy*.3*m).toFixed(1)}px`;rm.style.scale=`1 ${1+M.abs(sy)*.0006*p*m}`;
  welE.style.scale=p>=4&&!O.rm?`1 ${1+(lv-66)/34*.8}`:'';
  const sx=[0,0,0,3,6,9][p]*lv/100*m;let z=1,rr=0,tx=0,ty=0;if(p>=2&&!O.rm){z=1+lv*.0004;tx=(mx-innerWidth/2)*lv*.00015;ty=(my-innerHeight/2)*lv*.00015}if(p>=3&&!O.rm){rr=M.sin(t/700)*lv*.004;tx+=(Math.random()-.5)*(lv-48)/20;ty+=(Math.random()-.5)*(lv-48)/20}
  cam.style.transform=`translate(${tx}px,${ty}px) rotate(${rr}deg) scale(${mir?-z:z},${z})`}
 else if(room==3)r3f(t);else if(room>=4)rNf(t);else if(room==2){sy*=.9;sy=cl(sy,-300,300);r2.style.perspectiveOrigin=`50% ${50+sy*.08}%`;cam.style.transform=mir?'scaleX(-1)':'';
  WO.forEach(o=>{const r=o.e.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,dx=mx-cx,dy=my-cy,d=M.hypot(dx,dy)||1;
   if(!o.d){if(o.tp=='f'&&d<170){o.x-=dx/d*6;o.y-=dy/d*6;if(r.left<5||r.right>innerWidth-5||r.top<5||r.bottom>innerHeight-5){o.x+=dx/d*9;o.y+=dy/d*9}}}
   if(o.tp=='h')o.e.style.opacity=d<140?0:1;if(o.tp=='r')o.e.style.transform=`rotateY(${cl(-dx/20,-25,25)}deg) rotateX(${cl(dy/20,-25,25)}deg)`;
   o.e.style.translate=`${o.x}px ${o.y+M.sin(t/900+o.i)*6}px`})}
 if(room!=1)cur.style.display='none';
 const cu=room==1&&(p>=1||ngp)&&O.cu&&!coarse&&!O.hc||0;document.body.classList.toggle('cur',cu&&t>hideC);document.body.classList.toggle('nc',t<hideC);
 TR.unshift([mx,my]);TR.length=M.min(TR.length,pc[0]);
 if(cu&&t>hideC){cur.style.display='block';{const q=TR[M.min(TR.length-1,ngp?10:0)]||[mx,my],bt=t<betray;cur.style.transform=`translate(${bt?innerWidth-q[0]:q[0]}px,${bt?innerHeight-q[1]:q[1]}px)`}
  let s2=0;if(ghost){const k=(t-ghost.t)/1400;if(k>=1)ghost=0;else{s2=1;cur2.style.transform=`translate(${ghost.x0+(ghost.x1-ghost.x0)*k}px,${ghost.y0+(ghost.y1-ghost.y0)*k}px)`}}
  else if(p>=3||(p==2&&t<cdup)){s2=1;const q=TR[M.min(TR.length-1,8)]||[mx,my];cur2.style.transform=`translate(${q[0]+(p>=3?50:20)}px,${q[1]-(p>=3?30:10)}px)`}
  cur2.style.display=s2?'block':'none'}else{cur.style.display='none';cur2.style.display=ghost&&room==1?'block':'none';if(ghost){const k=(t-ghost.t)/1400;if(k>=1)ghost=0;else{cur2.style.transform=`translate(${ghost.x0+(ghost.x1-ghost.x0)*k}px,${ghost.y0+(ghost.y1-ghost.y0)*k}px)`}}}
 /* canvas fx */
 ctx.clearRect(0,0,innerWidth,innerHeight);
 if(room==1&&p>=1&&!O.rm&&!coarse){for(let i=1;i<TR.length;i++){ctx.globalAlpha=(1-i/TR.length)*(.1+p*.07);ctx.fillStyle=fgc;ctx.fillRect(TR[i][0]-2,TR[i][1]-2,4,4)}
  for(let i=HO.length-1;i>=0;i--){const h=HO[i];if(t>h.e){HO.splice(i,1);continue}ctx.globalAlpha=1;ctx.fillStyle=bgc;ctx.strokeStyle=fgc;ctx.beginPath();ctx.arc(h.x,h.y,h.r,0,6.28);ctx.fill();ctx.stroke()}}
 ctx.globalAlpha=1;ctx.fillStyle=fgc;for(let i=PA.length-1;i>=0;i--){const a=PA[i];a.x+=a.vx;a.y+=a.vy;a.vy+=a.g;a.vx*=.97;if(--a.l<=0){PA.splice(i,1);continue}ctx.fillRect(a.x,a.y,2,2)}
 if(fr%pc[2]==0&&room==1&&lv>18&&!O.rm&&!O.hc){const d=nid.data;for(let i=0;i<d.length;i+=4){d[i]=d[i+1]=d[i+2]=Math.random()*255;d[i+3]=255}nc.putImageData(nid,0,0)}
 nz.style.opacity=room==1&&!O.rm&&!O.hc&&!lock?cl((lv-18)/220,0,.3):0;
 sc.style.opacity=room==1&&!lock?cl((lv-25)/60,0,.7)*m:0;
 theme(lock||room==9?0:room>=2||col?1:cl((lv-30)/30,0,1))}
/* v2: flash cap, endings, terminal, tab, time, dialog */
const FQ=[];function okF(){const t=performance.now();while(FQ.length&&t-FQ[0]>1000)FQ.shift();if(FQ.length>=3)return 0;FQ.push(t);return 1}
let BH={clk:0,idle:0,obey:0},stopT=0,lastClk=0,todD=0;
const EN=['THE BREAKER','THE PATIENT','THE OBEDIENT','THE WITNESS'];
function ending(){const b=BH,n=b.clk>=70?EN[0]:b.idle>=3?EN[1]:b.obey>=2?EN[2]:EN[3];S.end=S.end||[];if(!S.end.includes(n)){S.end.push(n);sv()}return n}
function todSay(){const d=new Date(),h=d.getHours();say(h<5?`IT'S ${d.toTimeString().slice(0,5)}. WHY ARE YOU STILL HERE?`:h>=22?'IT IS LATE.':'YOU HAVE BEEN HERE A WHILE.',2600)}
document.addEventListener('visibilitychange',()=>{if(room!=1&&room!=2)return;if(document.hidden)document.title='COME BACK';else{document.title='YOU LEFT.';say('WHERE DID YOU GO?',2200);add(3);setTimeout(()=>document.title='GLITCHROOM',3000)}});
const term=$('#term'),tl=$('#tl'),ti=$('#ti'),dlg=$('#dlg');
dlg.querySelectorAll('button').forEach(b=>b.onclick=e=>{e.stopPropagation();dlg.hidden=1;say(rn(['NOT NOW.','THERE IS NO PAGE.','YOU CANNOT LEAVE A PAGE THAT ISN\'T A PAGE.']),2200);add(3)});
function tp(t){const d=document.createElement('div');d.textContent=t;tl.append(d);term.scrollTop=1e5}
function tOpen(){if(!room)return;term.hidden=0;ti.value='';ti.focus();if(!tl.children.length)tp('GLITCHROOM TERMINAL. TYPE help.')}
function tRun(c){tp('> '+c);const w=c.trim().toLowerCase(),p=ph(),E=S.end||[];
 const C={help:()=>'help status who secrets endings mirror calm door clear exit',
 status:()=>`PHASE ${p}  LEVEL ${lv|0}  ${lock?'LOCKED':'LIVE'}`,
 who:()=>lv>=90?'YOU':p>=3?'SOMEONE':'NO ONE',
 secrets:()=>`${S.found.length}/12 FOUND: ${S.found.map(x=>x.toUpperCase()).join(', ')||'NONE'}`,
 endings:()=>`${E.length}/7 ${E.join(', ')}`,
 mirror:()=>{setMir(mir?0:1);return 'MIRROR '+(mir?'ON':'OFF')},
 calm:()=>{if(room==1){lv=M.max(0,lv-15);setTimeout(()=>{add(6);say('IT DID NOT WANT THAT.',2000)},3000)}return 'STABILITY RESTORED. (TEMPORARILY)'},
 door:()=>{if(lv<60||room!=1||col)return 'NO DOOR HERE.';door.style.left='45vw';door.style.top='55vh';door.hidden=0;find('term');setTimeout(()=>{if(!col&&room==1)door.hidden=1},1800);return 'IT OPENED FOR A MOMENT.'},
 clear:()=>{tl.innerHTML='';return ''},observer:()=>{if(!S.found.includes('r2'))return 'NOT YET.';goR3();return ''},exit:()=>{exit();return ''}};
 if(/^warp [4-8]$/.test(w)&&S.found.includes('r3')){({4:goR4,5:goR5,6:goR7,7:goR8,8:goR6})[w[5]]();return}
 const f=C[w];if(f){const r=f();if(r)tp(r)}else if(w)tp('UNKNOWN COMMAND.'+(p>=3?' IT HEARD YOU.':''))}
ti.addEventListener('keydown',e=>{e.stopPropagation();lastIn=now;if(e.key=='Enter'){const v=ti.value;ti.value='';tRun(v)}if(e.key=='Escape'){term.hidden=1;ti.blur()}});
/* room 03: the observer */
const r3=$('#r3'),dkE=$('#dkE'),eyesE=$('#eyes'),obE=$('#ob');
let ob={x:0,y:0},t3=0,stT=0,lmv=0,end3=0,away=0,hb=0,hint3=0,nr3=0;
const endAdd=n=>{S.end=S.end||[];if(!S.end.includes(n)){S.end.push(n);sv()}return n};
function goR3(){if(room==3)return;room=3;find('r3');[door,fin,rm,r2,r4,r5,r6,r7,r8,nx,botE,bot2E,panel].forEach(e=>e.hidden=1);hideC=0;r3.hidden=0;sfx('door');end3=away=stT=nr3=hint3=0;for(const e of eyesE.children){e._d=0;e.style.opacity=''}t3=lmv=now;ob.x=mx>innerWidth/2?-60:innerWidth+60;ob.y=my>innerHeight/2?-60:innerHeight+60;
 if(!eyesE.children.length)for(let i=0;i<14;i++){const e=document.createElement('div');e.className='e3';e._x=R()*.94;e._y=R()*.9;e.style.left=e._x*100+'vw';e.style.top=e._y*100+'vh';e.style.animationDelay=-R()*5+'s';e.innerHTML='<b></b>';eyesE.append(e)}
 tc(3);say("A PREDATOR TRACKS YOU. DON'T MOVE WHEN IT IS NEAR.",3800)}
function r3f(t){cam.style.transform='';const W=innerWidth,H=innerHeight,dt=M.min(3,(t-(r3f.l||t))/16.7);r3f.l=t;
 let dx=mx-ob.x,dy=my-ob.y,d=M.hypot(dx,dy)||1;const mv=t-lmv<250,grace=t-t3<3200;
 if(end3){if(away){ob.x+=(ob.x<W/2?-7:7)*dt}}
 else if(grace){ob.x+=(W/2-ob.x)*.008*dt;ob.y+=(H/2-ob.y)*.008*dt}
 else{if(mv){const sp=(2.6+(t-t3)/22000)*dt*(coarse?.75:1);ob.x+=dx/d*sp;ob.y+=dy/d*sp;stT=0}else if(d<540&&t-t3>3500)stT+=dt*16.7;
  if(t>hb){sfx('beat');if(coarse&&d<250&&!O.rm&&navigator.vibrate)navigator.vibrate(20);hb=t+cl(d*1.3,260,1200)}
  if(!hint3&&t-t3>12000){hint3=1;say('WHEN YOU STOP, IT STOPS.',3500)}
  if(!nr3&&d<340&&!grace){nr3=1;say("DON'T MOVE. IT IS NEAR.",2200)}
  if(d<24&&!grace)catch3();else if(stT>=(O.ez?4200:6500))win3()}
 dkE.style.setProperty('--cx',mx+'px');dkE.style.setProperty('--cy',my+'px');dkE.style.setProperty('--vr',cl(50+d*.25,60,220)+'px');
 obE.style.translate=`${ob.x-32}px ${ob.y-10}px`;obE.style.scale=O.rm?1:1+cl(1-d/700,0,1)*2.2;
 let i=0;for(const e of eyesE.children){const ex=e._x*W+15,ey=e._y*H+8,a=M.atan2(my-ey,mx-ex);e.firstChild.style.translate=`${M.cos(a)*7}px ${M.sin(a)*3}px`;if(!e._d&&M.hypot(mx-ex,my-ey)<26){e._d=1;e.style.opacity=.2;say(EM[i%8],2200);find('eye')}i++}}
function catch3(){end3=1;if(!O.rm){tear();tmp(r3,'inv',120)}sfx('fail');burst(mx,my,80);if(coarse&&!O.rm&&navigator.vibrate)navigator.vibrate([120,50,200]);say('GOT YOU.',2600);setTimeout(()=>{const n=endAdd('THE OBSERVED');exit(`IT CAUGHT YOU. ENDING: ${n} (${S.end.length}/7)`)},2700)}
function win3(){end3=away=1;say('IT LOOKED AWAY.',2600);setTimeout(()=>{endAdd('THE STILL');goR4()},2900)}
/* v4: echo, crash, card, ctx menu, repair, tilt, NG+ */
let CK=[],betray=0,ngp=0,T0=performance.now(),tx=0,ty=0;
const EM=['THEY WERE ALL USERS.','YOU ARE THE 14TH.','IT DOES NOT BLINK.','NO ONE LEFT BY MOVING.','THIS ONE IS YOURS.','LOOK AWAY.','THERE IS NO ROOM 04.','IT LEARNED THIS FROM YOU.'];
function echo(){if(CK.length<3)return;let d=0;const iv=CK.slice(-5);iv.forEach((t,i)=>{if(i)d+=t-iv[i-1];setTimeout(()=>{if(room==1){wave(Math.random()*innerWidth,Math.random()*innerHeight);sfx('click')}},d)});say('THAT WAS YOU.',2000)}
function crash(){const c=$('#crash'),L='FATAL ERROR 0x0000YOU\nINTERFACE HAS STOPPED RESPONDING\nCOLLECTING DATA ABOUT YOU...\n\nREBOOTING ',Q=[10,30,60,97,60,20,45,80,100];let i=0;c.hidden=0;c.textContent=L+'0%';const iv=setInterval(()=>{c.textContent=L+Q[i]+'%';if(++i>=Q.length){clearInterval(iv);setTimeout(()=>{c.hidden=1;if(room==1){add(8);say('YOU ARE STILL HERE.',2200)}},600)}},450)}
function card(b,msg){if(!msg||!msg.includes('ENDING: '))return;if(msg.includes('THE OUTSIDE')){const q=(performance.now()-T0)/1e3|0;S.best=M.min(S.best||1e9,q);sv()}const e=msg.split('ENDING: ')[1],s=(performance.now()-T0)/1e3|0,t=`GLITCHROOM - ENDING: ${e} - ${s/60|0}m${s%60}s - ${b.clk} clicks - ${S.found.length} secrets. SOMETHING IS WRONG WITH THIS WEBSITE.`;$('#card').innerHTML=`<b>ENDING</b><br>${e}<br>TIME ${s/60|0}m ${s%60}s · CLICKS ${b.clk}<br>SECRETS ${S.found.length} · RESETS ${S.resets|0}${S.best?`<br>BEST ${S.best/60|0}m ${S.best%60}s`:''}<br><button id=cp data-t="${t.replace(/"/g,'')}">COPY</button>`;$('#card').hidden=0}
const ctxE=$('#ctx');ctxE.onclick=()=>{ctxE.hidden=1;say(rn(['NO.','THERE IS NO BACK.','NOTHING TO INSPECT.']),1600)};
document.addEventListener('contextmenu',e=>{if(!room||ph()<2)return;e.preventDefault();ctxE.innerHTML=['BACK','RELOAD','INSPECT','LEAVE'].map(x=>`<div>${[...x].map(c=>Math.random()<.3?rn(CH):c).join('')}</div>`).join('');ctxE.style.left=M.min(e.clientX,innerWidth-150)+'px';ctxE.style.top=M.min(e.clientY,innerHeight-130)+'px';ctxE.hidden=0;setTimeout(()=>ctxE.hidden=1,2500);add(2)});
addEventListener('deviceorientation',e=>{tx=cl((e.gamma||0)/45,-1,1);ty=cl((e.beta||0)-45,-45,45)/45});
function repair(o){const w='RESTORE',sh=[...w].sort(()=>R()-.5),b=o.e.querySelector('.wb');let n=0;b.innerHTML='RESTORE ORDER:<br>'+sh.map(c=>`<button class=rp>${c}</button>`).join(' ');
 b.onclick=e=>{const t=e.target.closest('.rp');if(!t||t.disabled)return;if(t.textContent==w[n]){t.disabled=true;t.style.opacity=.3;if(++n==w.length){b.textContent='REPAIRED. ORDER RESTORED.';find('repair');r2Solved=1;touch(o);sfx('gl');say('ORDER RESTORED. NOW CONFRONT THE "YOU" ANOMALY.',3200)}}else{n=0;b.querySelectorAll('.rp').forEach(x=>{x.disabled=false;x.style.opacity=1})}}}
/* rooms 4-6 */
const botE=$('#bot'),bot2E=botE.cloneNode(true);bot2E.id='bot2';bot2E.hidden=1;document.body.append(bot2E);const nx=$('#nx'),k4=$('#k4'),p5=$('#p5'),c6=$('#c6');
let bt2={x:0,y:0,wx:0,wy:0,cd:0,hit(){}},k4j=0,bt={x:0,y:0,wx:0,wy:0,cd:0,hit(){}},k4n=0,sq=[],pi=0,busy=0,tg=[];
function stage(n){room=n;find('r'+n);[door,fin,rm,r2,r3,r4,r5,r6,r7,r8,panel,nx].forEach(e=>e.hidden=1);$('#r'+n).hidden=0;sfx('door');tc(n);botE.hidden=n!=4&&n!=6;bot2E.hidden=n!=4;k4j=now+6000;botE.style.scale=n==6?2.2:1;if(ap){ap.forEach((q,i)=>q.frequency.setTargetAtTime([110,165,220][i]*[1,1,1,1,.8,1.25,.6,.9,1.1][n],ac.currentTime,.5));pg.gain.setTargetAtTime(O.snd?.02:0,ac.currentTime,1)}hideC=n==6?1e12:0;lmv=now;
 bt={x:-50,y:innerHeight/2,wx:300,wy:300,cd:now+3500,hit(){}};bt2={x:innerWidth+50,y:innerHeight/2,wx:innerWidth-300,wy:300,cd:now+4000,hit(){bt.hit()}};
 if(n==4)say('COLLECT 5 CORRUPTED KEYS. FREEZE TO EVADE PATROLS.',3800);
 if(n==5)say('THE CHOIR: LISTEN TO THE SEQUENCE.',3200);
 if(n==6)say('MIRROR REVERSAL. FIND THE ONE STEADY EXIT.',3600);
 if(n==7)say('MATRIX OVERLOAD. INVERT NODES UNTIL ALL 9 ARE ACTIVE.',3600);
 if(n==8)say('TEMPORAL REWIND. DRAG SLIDER TO ALIGN MEMORY FRAGMENTS.',3600);
}
function botStep(dt,t,b,e,fast){b=b||bt;e=e||botE;if(room==4&&cg4)return;const tx=room==6?innerWidth-mx:mx,ty=room==6?innerHeight-my:my,dx=tx-b.x,dy=ty-b.y,d=M.hypot(dx,dy)||1;const F=(O.ez?.7:1)*(ngp?1.3:1)*(room==6?.8:1)*(fast||1),sp=(room==4?1.7:1.4)*F;
 b.x+=dx/d*sp*dt;b.y+=dy/d*sp*dt;e.style.translate=`${b.x-17}px ${b.y-17}px`;
 if(d<(room==6?26:21)&&t>b.cd){b.cd=t+2500;b.hit()}}
function rNf(t){cam.style.transform='';const dt=M.min(3,(t-(rNf.l||t))/16.7);rNf.l=t;if(room==4||room==6)botStep(dt,t);if(room==4){botStep(dt,t,bt2,bot2E,1.15);if(t>k4j&&!cg4){k4j=t+(O.ez?9000:6000);[...k4.children].forEach(k=>{if(!k.dataset.g){k.style.left=Math.random()*80+8+'vw';k.style.top=Math.random()*60+18+'vh'}})}}if(room==6){c6.style.translate=`${innerWidth-mx}px ${innerHeight-my}px`;c6b.style.translate=`${innerWidth-mx+170*M.sin(t/380)}px ${innerHeight-my+170*M.cos(t/470)}px`}}
/* room 4: keys + patrol bot */
function goR4(){stage(4);k4n=0;k4.innerHTML='';for(let i=0;i<5;i++){const k=document.createElement('i');k.className='key';k.textContent='◆';k.style.left=R()*80+8+'vw';k.style.top=R()*60+18+'vh';k4.append(k)}
 cg4=0;r4.classList.remove('cg');bt.hit=caught4}
/* room 5: the choir (sequence + shuffling tiles) */
const TN=[262,330,392,494],SY=['▲','●','■','◆'];
function goR5(){stage(5);p5.innerHTML=SY.map((c,i)=>`<div class=pd data-i=${i}>${c}</div>`).join('');sq=[R()*4|0,R()*4|0];pi=0;busy=1;f5=0;setTimeout(play5,3200)}
function fl5(i,ms){const d=p5.children[i];if(!d)return;d.classList.add('on');tn(TN[i],.32,'sine',.15);setTimeout(()=>d.classList.remove('on'),ms)}
function play5(){if(room!=5)return;busy=1;say('LISTEN.',sq.length*650);sq.forEach((v,i)=>setTimeout(()=>fl5(v,350),i*650));setTimeout(()=>{busy=0;if(room==5)say('YOUR TURN.',1800)},sq.length*650)}
function press5(i){if(busy||room!=5)return;fl5(i,200);if(i!=sq[pi]){busy=1;tear();if(++f5>=(O.ez?3:4)){help5();return}say('WRONG SEQUENCE.',1400);sq=[R()*4|0,R()*4|0];pi=0;setTimeout(play5,1800);return}
 if(++pi>=sq.length){pi=0;if(sq.length>=(O.ez?4:6)){busy=1;say('THE CHOIR IS SILENT.',2200);setTimeout(goR7,2400);return}sq.push(R()*4|0);const sh=[...SY].sort(()=>Math.random()-.5);[...p5.children].forEach((d,i)=>{d.style.order=Math.random()*4|0;d.textContent=sh[i]});busy=1;say('NEXT PATTERN.',1200);setTimeout(play5,1400)}}
/* room 6: reflection (inverted cursor, find the steady EXIT) */
const scat6=()=>tg.forEach(e=>{e.style.left=Math.random()*78+6+'vw';e.style.top=Math.random()*55+22+'vh'});
function goR6(){stage(6);[...r6.querySelectorAll('.t6')].forEach(e=>e.remove());tg=[];const x=R()*6|0;
 for(let i=0;i<6;i++){const e=document.createElement('div');e.className='t6';e.textContent='EXIT';if(i==x)e.dataset.x=1;else if(O.rm)e.textContent='EX█T';r6.append(e);tg.push(e)}scat6();
 clearInterval(goR6.iv);goR6.iv=setInterval(()=>{if(room!=6||O.rm)return;tg.forEach(e=>{if(!e.dataset.x&&Math.random()<.6)e.textContent=[...'EXIT'].map(c=>Math.random()<.4?rn(CH):c).join('');else if(!e.dataset.x)e.textContent='EXIT'})},260);
 setTimeout(()=>{if(room==6)say('THE STEADY ONE.',2600)},O.ez?9000:25000);
 bt.hit=()=>{tear();sfx('gl');say('THE ROOM MOVED.',1500);scat6()}}
function hit6(){const el=document.elementFromPoint(innerWidth-mx,innerHeight-my),t=el&&el.closest('.t6');if(!t)return;if(t.dataset.x){clearInterval(goR6.iv);const n=endAdd('THE OUTSIDE');epi(`YOU ESCAPED. ENDING: ${n} (${S.end.length}/7)`)}else{tear();sfx('gl');say('NOT THAT ONE.',1400);scat6()}}
addEventListener('pointerdown',e=>{if(e.target.closest&&e.target.closest('#bar,#bt'))return;if(room==4){const k=e.target.closest&&e.target.closest('.key');if(k&&!k.dataset.g&&!cg4){k.dataset.g=1;k.style.opacity=.15;sfx('click');if(++k4n>=(O.ez?3:5)){say('THE DOOR IS OPEN.',2000);nx.hidden=0;nx.onclick=goR5}}}
 if(room==5){const d=e.target.closest&&e.target.closest('.pd');if(d)press5(+d.dataset.i)}if(room==6)hit6();if(room==7){const d=e.target.closest&&e.target.closest('.lp');if(d)press7(+d.dataset.i)}});
/* v6 */
const RN={2:'THE WINDOWS',3:'THE OBSERVER',4:'THE PATROL',5:'THE CHOIR',6:'THE REFLECTION',7:'THE LIGHTS',8:'THE REWIND'};
function tc(n){const e=$('#tc');e.innerHTML=`ROOM 0${DN[n]}<br><small>${RN[n]}</small>`;e.style.display='grid';clearTimeout(tc.t);tc.t=setTimeout(()=>e.style.display='none',1900)}
function rsr(){const m=S.pg||0;$('#rs').innerHTML=m>=1?'<span style="opacity:.6;font-size:11px">CONTINUE:</span>'+ORD.slice(0,m).map(n=>`<button data-rs=${n}>ROOM 0${DN[n]}</button>`).join(''):''}
let epm='';
function epi(msg){room=9;epm=msg;hideC=0;clearInterval(goR6.iv);[r6,botE,bot2E,nx,panel].forEach(e=>e.hidden=1);fin.hidden=0;fin.textContent='';fin.style.pointerEvents='auto';fin.onclick=()=>{if(room==9)exit(msg)};
 const bx=document.createElement('div'),sk=document.createElement('div');bx.style.cssText='text-align:center;line-height:1.6';sk.textContent='TAP TO SKIP';sk.style.cssText='position:fixed;left:0;right:0;bottom:64px;text-align:center;font:10px ui-monospace,monospace;letter-spacing:.3em;opacity:.35';fin.append(bx,sk);
 const add=(t,sz,st)=>{const e=document.createElement('div');e.textContent=t;e.style.cssText='opacity:0;transition:opacity 1.2s;font-size:'+(sz||'1em')+';'+(st||'');bx.append(e);requestAnimationFrame(()=>requestAnimationFrame(()=>e.style.opacity=1))},clr=()=>bx.innerHTML='';
 let T=0;const at=(ms,f)=>{T+=ms;setTimeout(()=>{if(room==9)f()},T)};
 at(400,()=>add('THERE WAS NEVER A WEBSITE.'));at(3400,clr);
 at(900,()=>add('YOU CLEARED THE ROOMS.'));
 ORD.forEach(k=>at(1000,()=>add(RN[k],'.5em','font-weight:400;letter-spacing:.3em')));
 at(2200,clr);at(700,()=>{add('BY','.4em','letter-spacing:.6em;font-weight:400');add('Teja Priyan','1.7em')});at(3600,clr);
 at(700,()=>add('GLITCHROOM','1.7em'));at(2400,()=>add('THANK YOU FOR PLAYING.','.5em','font-weight:400;letter-spacing:.2em;margin-top:3vmin'));at(2000,()=>add('THE ROOM WILL BE HERE.','.5em','font-weight:400;letter-spacing:.2em'));at(3600,()=>exit(msg))}
/* rooms: lights + rewind */
const DN={2:2,3:3,4:4,5:5,7:6,8:7,6:8},ORD=[2,3,4,5,7,8,6],lg=$('#lg'),pc=$('#pc'),sl=$('#sl'),r7=$('#r7'),r8=$('#r8');let lgs=[],w7=0,w8=0,PC8=[];
function tg7(i,q){const r=i/3|0,c=i%3;[[0,0],[1,0],[-1,0],[0,1],[0,-1]].forEach(([a,b])=>{const y=r+a,x=c+b;if(y>=0&&y<3&&x>=0&&x<3)lgs[y*3+x]^=1});if(!q)[...lg.children].forEach((e,k)=>e.classList.toggle('on',!!lgs[k]))}
function goR7(){stage(7);w7=0;lgs=Array(9).fill(1);for(let i=0;i<(O.ez?3:6);i++)tg7(R()*9|0,1);if(lgs.every(x=>x))tg7(4,1);lg.innerHTML=lgs.map((v,i)=>`<div class="lp${v?' on':''}" data-i=${i}></div>`).join('');clearInterval(goR7.iv);goR7.iv=setInterval(()=>{if(room==7&&!w7){tg7(Math.random()*9|0);tn(120,.2,'sawtooth',.08)}},7000)}
function press7(i){if(w7)return;tg7(i);tn(220+i*40,.15,'sine',.12);if(lgs.every(x=>x)){w7=1;say('STEADY.',2400);setTimeout(goR8,2700)}}
function upd8(){const v=+sl.value;PC8.forEach(o=>{const k=o.f?0:M.min(M.abs(v-o.m)/35,1);o.e.style.translate=`${o.hx+o.sx*k}px ${o.hy+o.sy*k}px`;o.e.style.rotate=o.sr*k+'deg'})}
function goR8(){stage(8);w8=0;pc.innerHTML='';sl.value=100;PC8=[12,30,48,67,86,-50].map((m,i)=>{const e=document.createElement('div');e.className='pcx';e.textContent='▢';pc.append(e);return{e,m,f:0,hx:innerWidth/2+(i-2.5)*M.min(innerWidth*.18,150),hy:innerHeight*.36,sx:(R()-.5)*innerWidth*.6,sy:(R()-.5)*innerHeight*.4,sr:(R()-.5)*90}});upd8();setTimeout(()=>{if(room==8&&!w8)say('RELEASE WHERE THEY ALIGN.',2600)},9000)}
sl.addEventListener('input',upd8);
sl.addEventListener('change',()=>{if(room!=8||w8)return;const v=+sl.value;PC8.forEach(o=>{if(!o.f&&M.abs(v-o.m)<=(O.ez?5:3)){o.f=1;o.e.classList.add('f');o.e.textContent='✓';tn(500+o.m*4,.2,'sine',.14)}});upd8();if(PC8.filter(o=>o.m>0).every(o=>o.f)){w8=1;say('REWOUND.',2200);setTimeout(goR6,2500)}});
/* v9: choir help */
const c6b=$('#c6b');let f5=0;
function help5(){busy=1;say("YOU'RE BAD AT THIS.",2100);setTimeout(()=>{if(room==5)say("I'LL HELP YOU.",2000)},2400);
 setTimeout(()=>{if(room!=5)return;sq=Array.from({length:6},()=>R()*4|0);let i=0;const iv=setInterval(()=>{if(room!=5){clearInterval(iv);return}if(i>=6){clearInterval(iv);say('THE ROOM CLEARED IT FOR YOU.',2400);setTimeout(()=>{if(room==5)goR7()},2600);return}fl5(sq[i++],400)},700)},4900)}
/* room 4: guards catch you */
let cg4=0;
function caught4(){if(cg4)return;cg4=1;r4.classList.add('cg');tear();tn(120,.6,'sawtooth',.12,45);say('GUARDS CAUGHT YOU.',1600);nx.hidden=1;k4n=0;
 setTimeout(()=>{if(room!=4)return;say('KEYS RETURNED TO THE VAULT.',1700);[...k4.children].forEach((k,i)=>setTimeout(()=>{k.dataset.g='';k.style.opacity=1;k.style.left=Math.random()*80+8+'vw';k.style.top=Math.random()*60+18+'vh'},i*220))},1800);
 setTimeout(()=>{if(room!=4)return;cg4=0;r4.classList.remove('cg');bt.gr=bt2.gr=now+3200;bt.cd=bt2.cd=now+3400;bt.wx=-100;bt.wy=120;bt2.wx=innerWidth+100;bt2.wy=innerHeight-120;say('GO.',900)},3900)}
/* boot */
bl();fit();rsr();
if(S.lv>0||S.found.length)$('#cb').textContent='YOU CAME BACK.'+((S.end||[]).length>=5?' NEW GAME+ UNLOCKED.':'');
$('#fg').hidden=!(S.lv>0||S.found.length);
requestAnimationFrame(loop);
