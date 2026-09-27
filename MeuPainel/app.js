let D=null;
const $=id=>document.getElementById(id);
const store={
 get(k,f){try{const v=localStorage.getItem(k);return v?JSON.parse(v):f}catch{return f}},
 set(k,v){localStorage.setItem(k,JSON.stringify(v))},
 del(k){localStorage.removeItem(k)}
};
const temNuvem=()=>typeof MEU_BACKEND!=='undefined'&&MEU_BACKEND.SUPABASE_URL&&MEU_BACKEND.SUPABASE_ANON_KEY;
const APP_VER=(typeof APP_VERSION!=='undefined')?APP_VERSION:'2.0.0';
let SBU=null, RT_OK=false, POLL_H=null, INSTALL_EV=null;
function setPill(modo){
  const p=$('connPill');if(!p)return;
  if(modo==='realtime'){p.className='connpill live';p.textContent='● realtime';}
  else if(modo==='nuvem'){p.className='connpill live';p.textContent='● nuvem';}
  else{p.className='connpill local';p.textContent='● local';}
  const v=$('ver');if(v)v.textContent='v'+APP_VER+' • '+modo;
  $('conn').textContent=modo==='realtime'?'realtime — atualiza na hora, sem F5':(modo==='nuvem'?'nuvem conectada':'local (nuvem não configurada)');
}
const XP_POR_TASK=20;
const NIVEIS=['Novato','Explorador','Construtor','Estrategista','Mestre','Lenda Mz4'];
const MEDALHAS=[
 {n:1,e:'🥉',t:'Bronze'},
 {n:5,e:'🥈',t:'Prata'},
 {n:10,e:'🥇',t:'Ouro'},
 {n:20,e:'💎',t:'Diamante'},
 {n:50,e:'👑',t:'Coroa Mz4'}
];
// ---------- game ----------
function gm(){return store.get('mz4-gm',{xp:0,done:0,medals:[]})}
function nivelDo(xp){return Math.min(Math.floor(xp/100),NIVEIS.length-1)}
function toast(msg){const t=$('toast');t.textContent=msg;t.classList.add('show');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('show'),2600)}
function confetti(){
 if(!store.get('mz4-fx',true))return;
 const cores=['#fb1404','#ff5a3c','#ffffff','#ffc93c'];
 for(let i=0;i<40;i++){const c=document.createElement('div');c.className='confete';
  c.style.left=Math.random()*100+'vw';c.style.background=cores[i%4];
  c.style.animationDuration=(1.4+Math.random()*1.4)+'s';c.style.transform=`rotate(${Math.random()*360}deg)`;
  document.body.appendChild(c);setTimeout(()=>c.remove(),3000)}
}
function gainXp(qtd,motivo){
 const g=gm();g.xp=Math.max(0,g.xp+qtd);
 if(qtd>0)g.done+=1;else g.done=Math.max(0,g.done-1);
 const antes=nivelDo(g.xp-qtd>0?g.xp-qtd:0),agora=nivelDo(g.xp);
 // medalhas
 MEDALHAS.forEach(m=>{if(g.done>=m.n&&!g.medals.includes(m.t)){g.medals.push(m.t);
  setTimeout(()=>{toast(`${m.e} Medalha ${m.t} desbloqueada!`);confetti()},qtd>0?600:0)}});
 store.set('mz4-gm',g);renderGame();
 if(qtd>0){toast(`+${qtd} xp! ${motivo||'Boa! 🔥'}`);if(agora>antes)setTimeout(()=>{toast(`⬆️ Nível ${agora+1}: ${NIVEIS[agora]}!`);confetti()},900)}
 return g;
}
function renderGame(){
 const g=gm(),nv=nivelDo(g.xp),base=nv*100,prog=Math.min(100,(g.xp-base));
 $('hd-xp').textContent=`Nv ${nv+1} • ${g.xp} xp`;
 const nome=store.get('mz4-name','');
 $('hm-hello').textContent=`Olá${nome?' '+nome:''} 👋`;
 $('hm-level').textContent=`${NIVEIS[nv]} • ${g.xp} xp • ${g.done} tasks concluídas`;
 $('hm-bar').style.width=prog+'%';
 $('hm-next').textContent=nv>=NIVEIS.length-1?'NÍVEL MÁXIMO. Você é a lenda 👑':`Faltam ${100-(g.xp-base)} xp pra virar ${NIVEIS[nv+1]}`;
 $('hm-medals').innerHTML=MEDALHAS.map(m=>{const got=g.medals.includes(m.t);
  return `<div class="medal${got?' got':''}"><span class="em">${m.e}</span>${m.t}<br><span class="mut">${m.n} tasks</span></div>`}).join('');
 const el=$('pf-c-nivel');if(el)el.textContent=nv+1;
}
// ---------- tema ----------
function setTheme(t){store.set('mz4-theme',t);applyTheme()}
function applyTheme(){
 const t=store.get('mz4-theme','dark');
 document.documentElement.dataset.theme=t;
 const m=$('meta-theme');if(m)m.content=t==='light'?'#faf7f2':'#060606';
 $('th-dark').classList.toggle('on',t==='dark');$('th-light').classList.toggle('on',t==='light');
}
function setFx(v){store.set('mz4-fx',v);applyFx();toast(v?'Confete ligado 🎉':'Confete desligado')}
function applyFx(){const v=store.get('mz4-fx',true);$('fx-on').classList.toggle('on',v);$('fx-off').classList.toggle('on',!v)}
// ---------- perfil / foto ----------
const PH_DEFAULT='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#1a1a1c"/><text x="50" y="66" font-size="44" text-anchor="middle" fill="#fb1404">👤</text></svg>');
function setPhoto(input){
 const f=input.files[0];if(!f)return;
 const img=new Image();
 img.onload=()=>{
  const c=document.createElement('canvas'),M=256;
  const s=Math.min(1,M/Math.max(img.width,img.height));
  c.width=img.width*s;c.height=img.height*s;
  c.getContext('2d').drawImage(img,0,0,c.width,c.height);
  const url=c.toDataURL('image/jpeg',.82);
  try{store.set('mz4-photo',url)}catch{toast('Foto muito pesada 😅 tente outra menor');return}
  renderProfile();toast('Foto atualizada! 📸');
 };
 img.src=URL.createObjectURL(f);
}
function saveProfile(){
 const n=$('pf-in-name').value.trim(),r=$('pf-in-role').value.trim();
 if(n)store.set('mz4-name',n);
 if(r)store.set('mz4-role',r);
 renderProfile();toast('Perfil salvo na empresa 🏢');
}
function renderProfile(){
 const ph=store.get('mz4-photo',PH_DEFAULT);
 $('pf-photo').src=ph;$('hd-photo').src=ph;
 const n=store.get('mz4-name','Você'),r=store.get('mz4-role','Fundador');
 $('pf-name').textContent=n;$('pf-role').textContent=(r+' • MZ4 AGENCY').toUpperCase();
 $('pf-c-nome').textContent=n;$('pf-c-cargo').textContent=r;
 if(!$('pf-in-name').value)$('pf-in-name').placeholder='Seu nome (atual: '+n+')';
 renderGame();
}
// ---------- entrada (nuvem: email+senha; local: direto) ----------
function checkAuth(){
  if(temNuvem()){
   $('auth-cloud').style.display='block';
   $('login-hint').textContent='Com nuvem: entre com e-mail e senha do Supabase.';
  }
  if(store.get('mz4-entered')){showApp();return}
  $('login').style.display='block';
}
async function doLogin(){
  const n=$('lg-name').value.trim();
  if(n)store.set('mz4-name',n);
  if(temNuvem()&&sbClient()){
   const em=$('lg-email').value.trim(),pw=$('lg-pass').value;
   if(em&&pw){
    const r=await sbClient().auth.signInWithPassword({email:em,password:pw});
    if(r.error){toast('Login falhou: '+r.error.message);return;}
   }
  }
  store.set('mz4-entered',true);showApp();
}
function togglePw(){
  const p=$('lg-pass'),show=p.type==='password';
  p.type=show?'text':'password';
  document.querySelector('.auth-eye').textContent=show?'🙈':'👁️';
}
async function doLogout(){
  try{if(temNuvem()&&sbClient())await sbClient().auth.signOut();}catch{}
  store.del('mz4-entered');location.reload();
}
// ---------- update sem F5 + instalar ----------
function atualizarApp(){
  if(navigator.serviceWorker&&navigator.serviceWorker.controller)
    navigator.serviceWorker.controller.postMessage('SKIP_WAITING');
  location.reload();
}
function instalarApp(){
  if(INSTALL_EV){INSTALL_EV.prompt();INSTALL_EV=null;$('installBtn').style.display='none';}
}
function wipeData(){if(!confirm('Apagar nome, foto, xp, medalhas e tarefas deste celular?'))return;
 ['mz4-entered','mz4-gm','mz4-photo','mz4-name','mz4-role','mz4-theme','mz4-fx','mp-tasks','mp-sites','mp-toks'].forEach(k=>store.del(k));location.reload()}
function showApp(){$('login').style.display='none';$('app').style.display='block';applyTheme();applyFx();renderProfile();load()}
// ---------- navegação ----------
function go(id,el){document.querySelectorAll('.tab').forEach(t=>t.classList.remove('on'));$(id).classList.add('on');document.querySelectorAll('nav button').forEach(b=>b.classList.remove('on'));el.classList.add('on');window.scrollTo({top:0})}
// ---------- dados ----------
function sb(path,opt={}){
 return fetch(MEU_BACKEND.SUPABASE_URL+'/rest/v1/'+path,{...opt,
  headers:{apikey:MEU_BACKEND.SUPABASE_ANON_KEY,Authorization:'Bearer '+MEU_BACKEND.SUPABASE_ANON_KEY,'Content-Type':'application/json',...(opt.headers||{})}});
}
function sbClient(){
  if(SBU)return SBU;
  if(!temNuvem()||typeof supabase==='undefined')return null;
  SBU=supabase.createClient(MEU_BACKEND.SUPABASE_URL,MEU_BACKEND.SUPABASE_ANON_KEY);
  return SBU;
}
async function nuvemPull(){
  const c=sbClient();if(!c)throw 0;
  const [s,t,j,a,u,q]=await Promise.all([
   c.from('sites').select('*'),c.from('tasks').select('*'),
   c.from('jobs').select('*').order('inicio',{ascending:false}).limit(10),
   c.from('approvals').select('*').order('criado_em',{ascending:false}).limit(20),
   c.from('uploads').select('*').order('criado_em',{ascending:false}).limit(30),
   c.from('commands').select('*').order('criado_em',{ascending:false}).limit(20)]);
  if(s.error||t.error||j.error)throw s.error||t.error||j.error;
  D={atualizadoEm:new Date().toLocaleString('pt-BR'),
   sites:s.data||[],tasks:t.data||[],
   pipeline:{jobAtual:(j.data||[]).find(x=>x.status==='gerando')||(j.data||[])[0]||{nome:'Nenhum job',status:'ocioso'},historico:j.data||[]},
   tokens:(j.data||[]).filter(x=>x.tokens>0).map(x=>({ia:x.ia,qtd:x.tokens})),
   aprovs:a.data||[],fotosNuvem:u.data||[],cmds:(q.data||[])};
}
function nuvemRT(){
  const c=sbClient();if(!c)return;
  try{
   c.channel('mz4-rt')
    .on('postgres_changes',{event:'*',schema:'public',table:'sites'},()=>nuvemPull().then(renderAll))
    .on('postgres_changes',{event:'*',schema:'public',table:'tasks'},()=>nuvemPull().then(renderAll))
    .on('postgres_changes',{event:'*',schema:'public',table:'jobs'},()=>nuvemPull().then(()=>{renderAll();pingJob();}))
    .on('postgres_changes',{event:'*',schema:'public',table:'approvals'},()=>nuvemPull().then(()=>{renderAll();pingAprov();}))
    .on('postgres_changes',{event:'*',schema:'public',table:'uploads'},()=>nuvemPull().then(renderAll))
    .on('postgres_changes',{event:'*',schema:'public',table:'commands'},()=>nuvemPull().then(renderAll))
    .subscribe((st)=>{RT_OK=(st==='SUBSCRIBED');setPill(RT_OK?'realtime':'nuvem');});
  }catch{setPill('nuvem');}
}
function pingJob(){try{new Notification('Mz4 agency',{body:'Pipeline atualizou ⚡ abra o app.'})}catch{}toast('Pipeline atualizou ⚡');}
function pingAprov(){toast('🔐 Pedido de aprovação novo!');try{new Notification('Mz4 agency',{body:'🔐 Preciso da sua autorização!'})}catch{}}
async function load(){
  if(temNuvem()&&sbClient()){
   try{await nuvemPull();renderAll();nuvemRT();return;}catch{}
   setPill('nuvem');
  }else setPill('local');
  try{const r=await fetch('data.json',{cache:'no-store'});D=await r.json()}catch{D=store.get('mp-data',null)}
  if(!D)return;
  if(!D.aprovs)D.aprovs=store.get('mp-aprovs',[]);
  if(!D.fotosLocal)D.fotosLocal=store.get('mp-fotos',[]);
  renderAll();
}
function renderAll(){renderSites();renderTasks();renderPipe();renderStats();renderAprovs();renderFotos();renderCmds()}
function mySites(){return store.get('mp-sites',[])}
function renderSites(){
 const all=[...(D.sites||[]),...mySites()];
 $('sites').innerHTML=all.map(s=>{const nome=s.nome||s.name||'?';const id=s.id||nome;
  const falta=Array.isArray(s.falta)?s.falta.join(' • '):(s.falta||'—');
  const prd=s.prd_resumo||s.prdResumo||'';
  return `<div class="card"><span class="badge">${s.status||'site'}</span>
  <h2>${nome}</h2><p>${s.desc||s.descricao||''}</p>
  ${prd?`<p><b>📄 PRD:</b> ${prd}</p>`:''}
  <p class="mut"><b>Falta:</b> ${falta}</p>
  <p class="mut"><b>Feito recente:</b> ${s.feitoRecente||s.feito_recente||'—'}</p>
  ${s.url_publica||s.urlPublica?`<a class="btn" href="${s.url_publica||s.urlPublica}" target="_blank">Abrir site</a>`:`<p class="mut">Sem URL pública ainda.</p>`}</div>`}).join('')||'<div class="card">Nenhum site.</div>';
}
function allTasks(){return [...(D.tasks||[]),...store.get('mp-tasks',[])]}
function renderTasks(){
 const t=allTasks();
 $('tasks').innerHTML=t.map(x=>{const ti=x.titulo||x.title||'?';const id=x.id;
  return `<div class="task"><input type="checkbox" ${x.feito?'checked':''} onchange="tgTask('${id}')">
  <span class="${x.feito?'done':''}">${ti} <span class="mut">· ${x.site_id||x.site||''}</span></span></div>`}).join('')||'<p class="mut">Sem tasks.</p>';
}
async function tgTask(id){
 const cur=allTasks().find(x=>String(x.id)===String(id));
 const marcando=!cur?.feito;
 if(temNuvem()){try{await sb('tasks?id=eq.'+id,{method:'PATCH',body:JSON.stringify({feito:marcando})});gainXp(marcando?XP_POR_TASK:-XP_POR_TASK,marcando?'Task concluída!':'Task reaberta');load();return}catch{}}
 const base=(D.tasks||[]).map(x=>String(x.id)===String(id)?{...x,feito:marcando}:x);
 const mine=store.get('mp-tasks',[]).map(x=>String(x.id)===String(id)?{...x,feito:marcando}:x);
 if(base.some(x=>String(x.id)===String(id)))D.tasks=base;else store.set('mp-tasks',mine);
 gainXp(marcando?XP_POR_TASK:-XP_POR_TASK,marcando?'Task concluída!':'Task reaberta');
 renderTasks();renderStats();
}
async function addTask(){
 const v=$('nt').value.trim();if(!v)return;
 if(temNuvem()){try{await sb('tasks',{method:'POST',body:JSON.stringify({id:'t'+Date.now(),titulo:v})});$('nt').value='';load();return}catch{}}
 const m=store.get('mp-tasks',[]);m.push({id:'m'+Date.now(),site:'geral',titulo:v,feito:false});store.set('mp-tasks',m);$('nt').value='';renderTasks();renderStats();
}
function addSite(){const n=$('ns-nome').value.trim(),u=$('ns-url').value.trim();if(!n||!u)return alert('Preencha nome e URL');
 const m=mySites();m.push({id:'s'+Date.now(),nome:n,urlPublica:u,desc:'Site anexado pelo celular.',status:'anexado',falta:[],prdResumo:''});
 store.set('mp-sites',m);$('ns-nome').value='';$('ns-url').value='';renderSites();renderStats();toast('Site anexado! 🌐')}
// ---------- aprovações SIM/NAO (realtime; sem F5) ----------
function aprovsAll(){
  if(D&&D.aprovs)return D.aprovs;
  return store.get('mp-aprovs',[]);
}
function renderAprovs(){
  const el=$('aprovs');if(!el)return;
  const list=aprovsAll();
  const pend=list.filter(a=>(a.status||'pendente')==='pendente');
  if(!pend.length){el.innerHTML='<p class="mut">Nenhum pedido pendente 🎉</p>';return;}
  el.innerHTML=pend.map(a=>{
   const id=a.id,pg=(a.pergunta||a.titulo||'?'),dt=(a.detalhe||''),pj=(a.projeto||a.site_id||'');
   return `<div class="aprov pendente"><b>🔐 ${pg}</b><p class="mut">${dt} · ${pj}</p>
   <div class="simnao"><button class="sim" onclick="responderAprov('${id}',true)">SIM ✓</button>
   <button class="nao" onclick="responderAprov('${id}',false)">NAO ✕</button></div></div>`}).join('');
}
async function responderAprov(id,ok){
  const st=ok?'aprovado':'negado';
  if(temNuvem()&&sbClient()){
   try{await sbClient().from('approvals').update({status:st,respondido_em:new Date().toISOString()}).eq('id',id);
    toast(ok?'Aprovado ✓ o PC continua':'Negado ✕ o PC para');return;}catch{}
  }
  const m=store.get('mp-aprovs',[]).map(a=>String(a.id)===String(id)?{...a,status:st}:a);
  store.set('mp-aprovs',m);if(D)D.aprovs=m;renderAprovs();
  toast(ok?'Aprovado ✓':'Negado ✕');
}
// ---------- fotos (nuvem: storage; local: aparelho) ----------
function fotosAll(){
  if(D&&D.fotosNuvem&&D.fotosNuvem.length)return D.fotosNuvem.map(f=>({url:f.url,nome:f.nome||''}));
  return store.get('mp-fotos',[]);
}
function renderFotos(){
  const el=$('fotos');if(!el)return;
  const list=fotosAll();
  el.innerHTML=list.length?list.map(f=>`<img src="${f.url}" alt="${(f.nome||'foto').replace(/"/g,'')}" loading="lazy">`).join(''):'<p class="mut">Nenhuma foto ainda 📸</p>';
}
function enviarFoto(input){
  const f=input.files[0];if(!f)return;
  const img=new Image();
  img.onload=async()=>{
   const c=document.createElement('canvas'),M=1024;
   const s=Math.min(1,M/Math.max(img.width,img.height));
   c.width=Math.round(img.width*s);c.height=Math.round(img.height*s);
   c.getContext('2d').drawImage(img,0,0,c.width,c.height);
   c.toBlob(async(b)=>{
    const nome='peca-'+Date.now()+'.jpg';
    if(temNuvem()&&sbClient()){
     try{
      const path='pecas/'+nome;
      const up=await sbClient().storage.from('w3-fotos').upload(path,b,{contentType:'image/jpeg',upsert:true});
      if(up.error)throw up.error;
      const pub=sbClient().storage.from('w3-fotos').getPublicUrl(path);
      await sbClient().from('uploads').insert({site_id:'w3optica',nome,url:pub.data.publicUrl});
      toast('Foto enviada! 📸 Caiu na coleção.');input.value='';return;
     }catch(e){toast('Nuvem falhou, salvei no aparelho 📸');}
    }
    const url=c.toDataURL('image/jpeg',.8);
    try{
     const m=store.get('mp-fotos',[]);m.unshift({url,nome});store.set('mp-fotos',m.slice(0,30));
     if(D)D.fotosLocal=m;renderFotos();toast('Foto salva no aparelho 📸');
    }catch{toast('Foto muito pesada 😅 tente outra menor')}
    input.value='';
   },'image/jpeg',.82);
  };
  img.src=URL.createObjectURL(f);
}
// ---------- comandos do celular p/ o PC ----------
function cmdsAll(){
  if(D&&D.cmds)return D.cmds;
  return store.get('mp-cmds',[]);
}
function renderCmds(){
  const el=$('cmds');if(!el)return;
  const list=cmdsAll().slice(0,10);
  el.innerHTML=list.length?list.map(c=>{
   const st=c.status||'pendente';
   return '<div class="aprov'+(st==='pendente'?' pendente':'')+'"><b>⌨️ '+(c.texto||'?')+'</b><p class="mut">status: '+st+(c.resposta?' · resp: '+c.resposta:'')+'</p></div>';
  }).join(''):'<p class="mut">Nenhum comando ainda ⌨️</p>';
}
async function enviarComando(){
  const t=$('cmd-text').value.trim();if(!t)return;
  if(temNuvem()&&sbClient()){
   try{
    await sbClient().from('commands').insert({texto:t,status:'pendente'});
    $('cmd-text').value='';toast('Comando enviado! 📡 O PC puxa em segundos.');return;
   }catch{toast('Nuvem falhou, tente de novo');return;}
  }
  try{
   const top=(D&&D.ntfyTopico)?D.ntfyTopico:'w3-gabriel-a8f3k9p2x7q4m';
   await fetch('https://ntfy.sh/'+top+'-cmd',{method:'POST',body:'CMD:'+t});
   const m=store.get('mp-cmds',[]);m.unshift({texto:t,status:'enviado 📡'});
   store.set('mp-cmds',m.slice(0,20));if(D)D.cmds=m;
   $('cmd-text').value='';renderCmds();toast('Comando enviado! 📡');
  }catch{toast('Sem internet 😅');}
}
function renderStats(){
 const t=allTasks(),abertas=t.filter(x=>!x.feito).length,g=gm();
 const tk=[...(D.tokens||[]),...store.get('mp-toks',[])];
 const tot=tk.reduce((a,x)=>a+(+x.qtd||0),0);
 $('hm-stats').innerHTML=`🌐 ${(D.sites||[]).length+mySites().length} site(s) • ✅ ${abertas} task(s) aberta(s)<br>🔥 ${tot.toLocaleString('pt-BR')} tokens registrados • 🏅 ${g.medals.length} medalha(s)`;
}
function renderPipe(){
 const j=D.pipeline?.jobAtual||{};
 let html=`<p><b>${j.nome||j.name||'—'}</b></p><p class="mut">status: ${j.status||'—'}${j.mensagem?' · '+j.mensagem:''}</p>`;
 if(j.status==='gerando'&&j.inicio){
  const el=(Date.now()-new Date(j.inicio).getTime())/60000,tot=j.estimativa_min||j.estimativaMin||10;
  const rest=Math.max(0,tot-el),pct=Math.min(100,el/tot*100);
  html+=`<p class="mut">falta ~${rest.toFixed(0)} min (estimativa, não exato)</p><div class="bar"><i style="width:${pct}%"></i></div>`;
 }else html+='<p class="mut">Quando uma IA começar a gerar, o PC registra aqui e o app avisa.</p>';
 $('job').innerHTML=html;
 const tk=[...(D.tokens||[]),...store.get('mp-toks',[])];
 const tot={};tk.forEach(t=>tot[t.ia]=(tot[t.ia]||0)+(+t.qtd||0));
 $('toks').innerHTML=Object.keys(tot).length?Object.entries(tot).map(([k,v])=>`<p>${k}: <b>${v.toLocaleString('pt-BR')}</b> tokens</p>`).join(''):'<p class="mut">Nenhum gasto registrado.</p>';
}
function addTok(){const ia=$('tk-ia').value.trim()||'ia',q=+$('tk-qtd').value||0;if(!q)return;
 const m=store.get('mp-toks',[]);m.push({ia,qtd:q});store.set('mp-toks',m);$('tk-ia').value='';$('tk-qtd').value='';renderPipe();renderStats()}
// ---------- avisos (canal próprio) ----------
async function ativarAvisos(){
 try{
  const p=await Notification.requestPermission();
  if(p!=='granted'){alert('Permita notificações no navegador.');return}
  if(!MEU_BACKEND.VAPID_PUBLIC_KEY||!temNuvem()){alert('Avisos locais ativos ✅. Push com app fechado liga após configurar a nuvem (config.js).');return}
  const reg=await navigator.serviceWorker.ready;
  const sub=await reg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:urlB64(MEU_BACKEND.VAPID_PUBLIC_KEY)});
  await sb('push_subs',{method:'POST',body:JSON.stringify({endpoint:sub.endpoint,p256dh:b64(sub.getKey('p256dh')),auth:b64(sub.getKey('auth'))})});
  alert('Push da Mz4 ativo neste celular 📲');
 }catch(e){alert('Não deu: '+e.message)}
}
function testeMeuCanal(){try{new Notification('Mz4 agency',{body:'Canal próprio OK — é este aviso que chega quando o código ficar pronto.'})}catch{toast('Ative os avisos primeiro 🔔')}}
function b64(b){return btoa(String.fromCharCode(...new Uint8Array(b)))}
function urlB64(s){s=s.replace(/-/g,'+').replace(/_/g,'/');return Uint8Array.from(atob(s),c=>c.charCodeAt(0))}
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('sw.js').catch(()=>{});
  navigator.serviceWorker.addEventListener('message',(e)=>{
    if(e.data&&e.data.tipo==='SW_UPDATED')$('updatebar').classList.add('show');
  });
}
window.addEventListener('beforeinstallprompt',(e)=>{e.preventDefault();INSTALL_EV=e;$('installBtn').style.display='block';});
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&$('app').style.display!=='none')load();});
window.addEventListener('online',()=>load());
applyTheme();applyFx();checkAuth();
POLL_H=setInterval(()=>{if($('app').style.display==='none')return;if(!temNuvem()||!RT_OK)load();},15000);
