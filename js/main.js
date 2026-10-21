/* ===== 0. Intro: logo → social icons → "Designed by" → site ===== */
(function(){
  const intro=document.getElementById("intro"),root=document.documentElement;
  const fast=matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.classList.add("lock");
  const on=id=>document.getElementById(id).classList.add("on");
  const done=()=>{intro.classList.add("out");root.classList.remove("lock")};
  if(fast){["s1","s2","s3"].forEach(on);setTimeout(done,600);return}
  setTimeout(()=>on("s1"),200);
  setTimeout(()=>on("s2"),1100);
  setTimeout(()=>on("s3"),2100);
  setTimeout(done,3500);
  intro.addEventListener("click",e=>{if(!e.target.closest("a"))done()});
})();

/* ===== 1. Mobile menu (hamburger) ===== */
(function(){
  const burger=document.getElementById("burger"),menu=document.getElementById("menu");
  const set=open=>{
    burger.classList.toggle("open",open);
    menu.classList.toggle("open",open);
    burger.setAttribute("aria-expanded",open);
    burger.setAttribute("aria-label",open?"Close menu":"Open menu");
  };
  burger.addEventListener("click",()=>set(!menu.classList.contains("open")));
  menu.addEventListener("click",e=>{if(e.target.closest("a"))set(false)});
  document.addEventListener("click",e=>{if(!e.target.closest("nav"))set(false)});
  addEventListener("keydown",e=>{if(e.key==="Escape")set(false)});
  addEventListener("resize",()=>{if(innerWidth>800)set(false)});
})();

/* ===== 2. Projects → cards ===== */
const grid=document.getElementById("grid");
const hues=[250,270,215];
const gh=`<svg class="i" style="width:1em"><use href="#gh"/></svg>`;
grid.innerHTML=projects.map((p,i)=>{
  const h=hues[i%hues.length];
  const bg=p.img?`url(${p.img})`:`linear-gradient(135deg,hsl(${h} 60% 18%),hsl(${h+30} 70% 38%))`;
  return `<article class="card"><div class="thumb"><div class="thumb-img" style="background-image:${bg}"></div>${p.img?"":(p.emoji||"</>")}</div>
  <div class="body"><div class="cat">${p.cat||"Project"}</div><h3>${p.title}</h3><p>${p.desc}</p>
  <div class="tags">${(p.tags||[]).map(t=>`<span>${t}</span>`).join("")}</div><a href="${p.link||"#"}" target="_blank" rel="noopener">View project →</a></div></article>`}).join("")
 +`<article class="card"><div class="thumb" style="font-size:5rem"><div class="thumb-img" style="background-image:linear-gradient(135deg,hsl(250 60% 16%),hsl(275 65% 36%))"></div>${gh}</div>
  <div class="body"><div class="cat">Open source</div><h3>Everything on GitHub</h3><p>Websites, experiments and everything I’m learning, updated as I build.</p>
  <div class="tags"><span>GitHub</span></div><a href="https://github.com/SOUFIANE-X2" target="_blank" rel="noopener">Browse my repos →</a></div></article>
 <div class="soon"><div><b>Next project loading…</b>Something new is being built right now.</div></div>`;

/* ===== 2a. Card spotlight follows the cursor ===== */
if(!matchMedia("(prefers-reduced-motion: reduce)").matches){
  grid.querySelectorAll(".card").forEach(card=>card.addEventListener("pointermove",e=>{
    const r=card.getBoundingClientRect();
    card.style.setProperty("--mx",(e.clientX-r.left)+"px");
    card.style.setProperty("--my",(e.clientY-r.top)+"px");
  }));
}

/* ===== 2b. Skills → grouped icon tiles (falls back to initials if an icon fails to load) ===== */
document.getElementById("skills-grid").innerHTML=skillGroups.map(g=>
  `<div class="skill-group rv"><h3>${g.title}</h3><div class="skill-list">${g.items.map(s=>
    `<div class="skill"><img src="${DEVICON+s.icon}" alt="" loading="lazy" onerror="this.outerHTML='<span class=&quot;fb&quot;>${s.name.slice(0,2)}</span>'"><span>${s.name}</span></div>`).join("")}</div></div>`).join("");

/* ===== 3. Typing words in the hero (the "Hi, I'm Soufiane" part stays fixed) ===== */
const words=["Dev student","Web developer","Problem solver"],el=document.getElementById("word");
let wi=0,ci=0,del=false;
(function type(){
  const w=words[wi];el.textContent=w.slice(0,ci);
  if(!del&&ci===w.length){del=true;return setTimeout(type,1400)}
  if(del&&ci===0){del=false;wi=(wi+1)%words.length}
  ci+=del?-1:1;setTimeout(type,del?40:80);
})();

/* ===== 4. Scroll reveal ===== */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll(".rv").forEach(n=>io.observe(n));
document.querySelectorAll(".card:not(.rv)").forEach(c=>{c.classList.add("rv");io.observe(c)});

/* ===== 5. Live background: drifting network of connected dots ===== */
const cv=document.getElementById("bg"),ctx=cv.getContext("2d");
const css=getComputedStyle(document.documentElement);
const rgb=h=>{h=h.trim().replace("#","");return [0,2,4].map(i=>parseInt(h.substr(i,2),16)).join(",")};
const C1=rgb(css.getPropertyValue("--c1")),C2=rgb(css.getPropertyValue("--c2")),C3=rgb(css.getPropertyValue("--c3"));
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
const nodes=[],D=150;let W,H;
function size(){
  W=cv.width=innerWidth;H=cv.height=innerHeight;nodes.length=0;
  const n=Math.min(75,Math.round(W*H/20000));
  for(let i=0;i<n;i++)nodes.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,r:Math.random()*1.4+.7,k:Math.random()<.2})}
addEventListener("resize",()=>{size();if(reduce)frame()});size();
function frame(){
  ctx.clearRect(0,0,W,H);
  nodes.forEach(n=>{if(!reduce){n.x+=n.vx;n.y+=n.vy}if(n.x<0||n.x>W)n.vx*=-1;if(n.y<0||n.y>H)n.vy*=-1});
  ctx.lineWidth=1;
  for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){
    const a=nodes[i],b=nodes[j],d=Math.hypot(a.x-b.x,a.y-b.y);
    if(d<D){ctx.strokeStyle=`rgba(${C1},${(1-d/D)*.45})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}
  nodes.forEach(n=>{ctx.fillStyle=`rgba(${n.k?C3:C2},${n.k?.7:.55})`;ctx.beginPath();ctx.arc(n.x,n.y,n.r,0,6.283);ctx.fill()});
  if(!reduce)requestAnimationFrame(frame);
}
frame();