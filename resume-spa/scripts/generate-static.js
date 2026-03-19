/**
 * 简历SPA - 静态页面生成器 v5.3
 * 超浅色配色 + 头像支持
 */

const fs = require('fs');
const path = require('path');

const projectDir = path.join(__dirname, '..');
const srcDir = path.join(projectDir, 'src');
const outDir = path.join(projectDir, '../docs');
const dataFile = path.join(srcDir, 'data', 'resume.json');

const resumeData = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 超浅色配色
const css = `:root{
  --bg:#FAFBFC;--fg:#1F2937;--fg-secondary:#6B7280;--primary:#60A5FA;--primary-hover:#3B82F6;
  --accent:#A78BFA;--accent2:#F472B6;--muted:#93C5FD;--border:#E5E7EB;
  --card-bg:#FFFFFF;--card-shadow:0 2px 12px rgba(0,0,0,0.04);
  --glass:rgba(255,255,255,0.95);--glass-border:#E5E7EB;--glow:rgba(96,165,250,0.15)
}
[data-theme="dark"]{
  --bg:#111827;--fg:#F9FAFB;--fg-secondary:#D1D5DB;--primary:#60A5FA;--primary-hover:#3B82F6;
  --accent:#A78BFA;--accent2:#F472B6;--muted:#1E3A5F;--border:#374151;
  --card-bg:#1F2937;--card-shadow:0 2px 12px rgba(0,0,0,0.3);
  --glass:rgba(31,41,55,0.95);--glass-border:#374151;--glow:rgba(96,165,250,0.2)
}
*{box-sizing:border-box;margin:0;padding:0}
a{text-decoration:none;color:inherit}
html{scroll-behavior:smooth}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Noto Sans SC',sans-serif;background:var(--bg);color:var(--fg);line-height:1.7;min-height:100vh;transition:background 0.4s,color 0.4s}
.bg-particles{position:fixed;inset:0;pointer-events:none;z-index:-1;overflow:hidden}
.particle{position:absolute;width:6px;height:6px;background:var(--primary);border-radius:50%;opacity:0.3;animation:particleFloat 15s ease-in-out infinite}
@keyframes particleFloat{0%,100%{transform:translateY(0) rotate(0deg);opacity:0.3}50%{transform:translateY(-100px) rotate(180deg);opacity:0.6}}
::-webkit-scrollbar{width:8px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:var(--primary);border-radius:4px}
.layout{max-width:1240px;margin:0 auto;display:flex;min-height:100vh;position:relative}
.sidebar{width:340px;min-width:340px;background:var(--glass);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-right:1px solid var(--glass-border);padding:2.5rem 2rem;position:sticky;top:0;height:100vh;overflow-y:auto;display:flex;flex-direction:column;transition:all 0.4s ease}
.sidebar-avatar{width:130px;height:130px;border-radius:50%;background:linear-gradient(135deg,#60A5FA,#93C5FD);margin:0 auto 1.5rem;display:flex;align-items:center;justify-content:center;font-size:3.5rem;color:#fff;font-weight:800;box-shadow:0 8px 32px rgba(96,165,250,0.25);position:relative;overflow:hidden}
.sidebar-avatar img,.sidebar-avatar .avatar-img{width:100%;height:100%;object-fit:cover;border-radius:50%}
.sidebar-avatar::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,transparent 40%,rgba(255,255,255,0.4) 100%)}
.sidebar-avatar:hover{transform:scale(1.08) rotate(5deg);box-shadow:0 12px 40px rgba(96,165,250,0.35)}
.sidebar-name{text-align:center;font-size:1.75rem;font-weight:800;margin-bottom:0.3rem;color:var(--fg)}
.sidebar-label{text-align:center;color:var(--primary);font-weight:600;font-size:1rem;margin-bottom:1rem}
.sidebar-summary{color:var(--fg-secondary);font-size:0.9rem;line-height:1.7;margin-bottom:1.5rem;text-align:center;padding:1rem;background:rgba(96,165,250,0.08);border-radius:12px;border-left:3px solid var(--primary)}
.sidebar-section{margin-bottom:1.25rem;position:relative;z-index:1}
.sidebar-section-title{font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--fg-secondary);margin-bottom:0.6rem;display:flex;align-items:center;gap:0.5rem}
.sidebar-section-title::after{content:'';flex:1;height:1px;background:linear-gradient(to right,var(--border),transparent)}
.sidebar-contact{display:flex;flex-direction:column;gap:0.4rem}
.sidebar-contact a{display:flex;align-items:center;gap:0.6rem;color:var(--fg-secondary);font-size:0.85rem;padding:0.5rem 0.75rem;background:rgba(96,165,250,0.08);border-radius:10px;border:1px solid transparent;transition:all 0.3s}
.sidebar-contact a:hover{color:var(--primary);transform:translateX(8px) scale(1.02);border-color:var(--primary);background:rgba(96,165,250,0.15);box-shadow:0 4px 16px var(--glow)}
.sidebar-contact .icon{font-size:1.1rem;width:24px;text-align:center}
.sidebar-skills{display:flex;flex-wrap:wrap;gap:0.45rem}
.sidebar-skill{padding:0.4rem 0.75rem;background:rgba(96,165,250,0.1);border:1px solid rgba(96,165,250,0.2);border-radius:20px;font-size:0.8rem;color:var(--fg-secondary);cursor:default;transition:all 0.3s}
.sidebar-skill:hover{background:var(--primary);color:#fff;border-color:var(--primary);transform:translateY(-3px) scale(1.08);box-shadow:0 6px 20px rgba(96,165,250,0.3)}
.theme-toggle{width:100%;padding:0.75rem;margin-top:auto;background:var(--primary);border:none;border-radius:12px;cursor:pointer;color:#fff;font-size:0.9rem;font-weight:600;transition:all 0.3s;box-shadow:0 4px 16px rgba(96,165,250,0.25)}
.theme-toggle:hover{background:var(--primary-hover);transform:translateY(-2px) scale(1.02);box-shadow:0 8px 24px rgba(96,165,250,0.35)}
.main{flex:1;padding:3rem 4rem;max-width:900px;position:relative;z-index:1}
.section{margin-bottom:3rem}
.section-title{font-size:1.4rem;font-weight:800;margin-bottom:1.5rem;padding-bottom:0.75rem;border-bottom:2px solid var(--primary);display:flex;align-items:center;gap:0.6rem;position:relative;color:var(--fg)}
.section-title::after{content:'';position:absolute;bottom:-2px;left:0;width:50px;height:2px;background:var(--accent)}
.section-title .icon{font-size:1.3rem}
.timeline{position:relative;padding-left:2rem}
.timeline::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--primary);border-radius:2px}
.timeline-item{position:relative;margin-bottom:2rem;padding:1.25rem 1.5rem;background:var(--card-bg);border-radius:16px;border:1px solid var(--border);transition:all 0.4s}
.timeline-item::before{content:'';position:absolute;left:-2rem;top:1.5rem;width:12px;height:12px;background:var(--primary);border:3px solid var(--bg);border-radius:50%;box-shadow:0 0 12px var(--glow);transition:all 0.3s}
.timeline-item:hover{transform:translateX(8px);box-shadow:0 8px 32px var(--glow)}
.timeline-item:hover::before{background:var(--accent);transform:scale(1.4)}
.timeline-header{display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.5rem}
.timeline-title{font-size:1.1rem;font-weight:700;color:var(--fg)}
.timeline-company{color:var(--primary);font-weight:600;font-size:0.95rem}
.timeline-date{color:var(--fg-secondary);font-size:0.85rem;padding:0.2rem 0.6rem;background:rgba(96,165,250,0.1);border-radius:20px}
.timeline-summary{color:var(--fg-secondary);margin-bottom:0.6rem;font-size:0.9rem}
.timeline-highlights{list-style:none;padding:0}
.timeline-highlights li{color:var(--fg-secondary);margin-bottom:0.4rem;padding-left:1.1rem;position:relative;font-size:0.9rem;line-height:1.6}
.timeline-highlights li::before{content:'✓';position:absolute;left:0;color:var(--primary);font-weight:bold}
.project-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.25rem}
.project-card{background:var(--card-bg);border:1px solid var(--border);border-radius:20px;padding:1.5rem;box-shadow:var(--card-shadow);transition:all 0.4s cubic-bezier(0.175,0.885,0.32,1.275)}
.project-card:hover{transform:translateY(-10px) scale(1.02);box-shadow:0 20px 40px rgba(96,165,250,0.15)}
.project-card h3{font-size:1.1rem;font-weight:700;margin-bottom:0.5rem;display:flex;align-items:center;gap:0.5rem;color:var(--fg)}
.project-card .desc{color:var(--fg-secondary);margin-bottom:0.75rem;font-size:0.9rem;line-height:1.6}
.project-card .keywords{display:flex;flex-wrap:wrap;gap:0.4rem;margin-top:0.75rem}
.project-card .kw{padding:0.25rem 0.55rem;background:rgba(96,165,250,0.1);border-radius:12px;font-size:0.75rem;color:var(--fg-secondary)}
.project-card .links{margin-top:1rem}
.project-card .links a{display:inline-flex;align-items:center;gap:0.4rem;padding:0.5rem 1rem;background:var(--primary);color:#fff;border-radius:25px;font-size:0.85rem;font-weight:600;transition:all 0.3s;box-shadow:0 4px 16px rgba(96,165,250,0.25)}
.project-card .links a:hover{transform:scale(1.08);box-shadow:0 6px 24px rgba(96,165,250,0.35)}
.edu-card{background:var(--card-bg);border:1px solid var(--border);border-radius:16px;padding:1.25rem 1.5rem;margin-bottom:0.75rem;box-shadow:var(--card-shadow);transition:all 0.3s}
.edu-card:hover{transform:translateX(8px);box-shadow:0 8px 24px var(--glow)}
.edu-card h3{font-size:1.05rem;font-weight:700;margin-bottom:0.15rem;color:var(--fg)}
.edu-card .study{color:var(--primary);font-weight:600;font-size:0.9rem}
.edu-card .date{color:var(--fg-secondary);font-size:0.8rem}
.tag-cloud{display:flex;flex-wrap:wrap;gap:0.6rem}
.tag{padding:0.5rem 1rem;background:var(--card-bg);border:1px solid var(--border);border-radius:25px;font-size:0.85rem;color:var(--fg-secondary);transition:all 0.3s;cursor:default}
.tag:hover{background:var(--primary);color:#fff;border-color:var(--primary);transform:scale(1.1)}
.cursor-dot{position:fixed;width:16px;height:16px;background:var(--primary);border-radius:50%;pointer-events:none;z-index:9999;opacity:0.5;mix-blend-mode:multiply}
.cursor-outline{position:fixed;width:44px;height:44px;border:2px solid var(--primary);border-radius:50%;pointer-events:none;z-index:9998;opacity:0.25;transition:transform 0.1s ease}
.scroll-progress{position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,var(--primary),var(--accent));z-index:9999;transition:width 0.1s}
@media(max-width:1100px){.sidebar{width:300px;min-width:300px;padding:2rem 1.5rem}.main{padding:2.5rem 3rem}}
@media(max-width:900px){.sidebar{width:260px;min-width:260px}.main{padding:2rem}}
@media(max-width:768px){.layout{flex-direction:column}.sidebar{width:100%;min-width:100%;height:auto;position:relative;border-right:none;border-bottom:1px solid var(--glass-border);padding:2rem 1.5rem}.main{padding:1.5rem}.sidebar-avatar{width:110px;height:110px;font-size:3rem}.sidebar-name{font-size:1.5rem}.project-grid{grid-template-columns:1fr}.cursor-dot,.cursor-outline{display:none}}
@media(max-width:480px){.main{padding:1.25rem}.sidebar{padding:1.5rem 1rem}.timeline-item{padding:1rem}}
`;

const js = `<script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.2/anime.min.js"></script>
<script>
(function(){
  var saved = localStorage.getItem('theme');
  var prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var isDark = saved === 'dark' || (!saved && prefers);
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  
  window.toggleTheme = function() {
    var html = document.documentElement;
    var isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    anime({targets:'.layout',opacity:[0.8,1],duration:400,easing:'easeOutQuad'});
  };
  
  for(var i=0;i<15;i++){
    var p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random()*100+'%';
    p.style.top = Math.random()*100+'%';
    p.style.animationDelay = Math.random()*15+'s';
    p.style.animationDuration = (10+Math.random()*10)+'s';
    document.querySelector('.bg-particles').appendChild(p);
  }
  
  var progress = document.createElement('div');
  progress.className = 'scroll-progress';
  document.body.appendChild(progress);
  window.addEventListener('scroll',function(){
    var scrolled = window.scrollY;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var percent = max > 0 ? (scrolled / max) * 100 : 0;
    progress.style.width = percent + '%';
  });
  
  var dot = document.createElement('div');dot.className = 'cursor-dot';
  var outline = document.createElement('div');outline.className = 'cursor-outline';
  document.body.appendChild(dot);document.body.appendChild(outline);
  var mouseX=0,mouseY=0,outlineX=0,outlineY=0;
  document.addEventListener('mousemove',function(e){mouseX=e.clientX;mouseY=e.clientY;dot.style.left=mouseX-8+'px';dot.style.top=mouseY-8+'px'});
  function animateOutline(){outlineX+=(mouseX-outlineX)*0.12;outlineY+=(mouseY-outlineY)*0.12;outline.style.left=outlineX-22+'px';outline.style.top=outlineY-22+'px';requestAnimationFrame(animateOutline)}animateOutline();
  
  document.querySelectorAll('a,button,.sidebar-skill,.tag,.project-card,.timeline-item').forEach(function(el){
    el.addEventListener('mouseenter',function(){anime({targets:outline,scale:1.6,duration:250,easing:'easeOutQuad'})});
    el.addEventListener('mouseleave',function(){anime({targets:outline,scale:1,duration:250,easing:'easeOutQuad'})});
  });
  
  var animKey = 'resume_anim_v53';
  if(!sessionStorage.getItem(animKey)){
    sessionStorage.setItem(animKey,'true');
    anime({targets:'.particle',scale:[0,1],opacity:[0,0.5],duration:800,delay:anime.stagger(100),easing:'easeOutQuad'});
    anime({targets:'.sidebar',opacity:[0,1],translateX:[-60,0],duration:800,easing:'easeOutExpo'});
    anime({targets:'.sidebar-avatar',scale:[0,1],rotate:[360,0],duration:1200,delay:200,easing:'easeOutElastic(1,.6)'});
    anime({targets:'.sidebar-name',opacity:[0,1],translateY:[20,0],duration:600,delay:400,easing:'easeOutExpo'});
    anime({targets:'.sidebar-summary',opacity:[0,1],translateY:[15,0],duration:500,delay:550,easing:'easeOutExpo'});
    anime({targets:'.sidebar-contact a',opacity:[0,1],translateX:[-15,0],delay:anime.stagger(60,{start:650}),duration:400,easing:'easeOutExpo'});
    anime({targets:'.sidebar-skill',opacity:[0,1],scale:[0,1],delay:anime.stagger(40,{start:900}),duration:400,easing:'easeOutElastic(1,.5)'});
    anime({targets:'.theme-toggle',opacity:[0,1],translateY:[20,0],duration:500,delay:1300,easing:'easeOutExpo'});
    anime({targets:'.sidebar-avatar',scale:[1,1.03,1],duration:2000,delay:1500,loop:true,easing:'easeInOutSine'});
  }
  
  document.querySelectorAll('.sidebar-skill,.project-card,.tag').forEach(function(el){
    el.addEventListener('mouseenter',function(){anime({targets:el,scale:1.15,rotate:'2deg',duration:200,easing:'easeOutQuad'})});
    el.addEventListener('mouseleave',function(){anime({targets:el,scale:1,rotate:'0deg',duration:200,easing:'easeOutQuad'})});
  });
  
  var avatar = document.querySelector('.sidebar-avatar');
  if(avatar){
    avatar.addEventListener('mouseenter',function(){anime({targets:avatar,scale:1.1,rotate:'5deg',duration:400,easing:'easeOutQuad'})});
    avatar.addEventListener('mouseleave',function(){anime({targets:avatar,scale:1,rotate:'0deg',duration:400,easing:'easeOutQuad'})});
  }
  
  anime({targets:'.timeline-item::before',boxShadow:['0 0 8px var(--glow)','0 0 20px var(--glow)','0 0 8px var(--glow)'],duration:1500,delay:anime.stagger(200,{start:800}),loop:true,easing:'easeInOutSine'});
  anime({targets:'.particle',translateY:[0,-80,0],translateX:[0,30,0],duration:function(){return 10000+Math.random()*10000},direction:'alternate',loop:true,easing:'easeInOutSine'});
})();
</script>`;

const b = resumeData.basics;
const { skills, work, education, projects, languages, interests } = resumeData;

// 头像：如果有avatar则显示图片，否则显示首字
const avatarHtml = b.avatar 
  ? '<img src="'+b.avatar+'" alt="头像" class="avatar-img">' 
  : '<span>'+(b.name ? b.name.charAt(0) : '?')+'</span>';

function generateContact() {
  let html = '';
  if (b.email) html += '<a href="mailto:'+b.email+'"><span class="icon">✉️</span>'+b.email+'</a>';
  if (b.phone) html += '<a href="tel:'+b.phone+'"><span class="icon">📱</span>'+b.phone+'</a>';
  if (b.url) html += '<a href="'+b.url+'" target="_blank"><span class="icon">🌐</span>个人网站</a>';
  if (b.profiles) b.profiles.forEach(function(p){ html += '<a href="'+p.url+'" target="_blank"><span class="icon">🔗</span>'+p.network+'</a>'; });
  return html;
}

function generateSkills() { if (!skills) return ''; return skills.map(function(s){ return '<span class="sidebar-skill">'+s.name+'</span>'; }).join(''); }
function generateTimeline() { if (!work) return ''; return work.map(function(w){ return '<div class="timeline-item"><div class="timeline-header"><div><div class="timeline-title">'+w.position+'</div><div class="timeline-company">'+w.name+'</div></div><div class="timeline-date">'+w.startDate+' - '+(w.endDate||'至今')+'</div></div>'+(w.summary?'<p class="timeline-summary">'+w.summary+'</p>':'')+(w.highlights?'<ul class="timeline-highlights">'+w.highlights.map(function(h){return'<li>'+h+'</li>'}).join('')+'</ul>':'')+'</div>'; }).join(''); }
function generateProjects() { if (!projects) return ''; var icons = ['🚀','💻','🔧','🎨','📱','🌐','⚡','🔮','🤖','📊']; return projects.map(function(p,i){ return '<div class="project-card"><h3><span>'+icons[i%icons.length]+'</span>'+p.name+'</h3><p class="desc">'+(p.description||'')+'</p>'+(p.highlights?'<ul class="timeline-highlights">'+p.highlights.map(function(h){return'<li>'+h+'</li>'}).join('')+'</ul>':'')+(p.keywords?'<div class="keywords">'+p.keywords.map(function(k){return'<span class="kw">'+k+'</span>'}).join('')+'</div>':'')+(p.url?'<div class="links"><a href="'+p.url+'" target="_blank">查看项目 →</a></div>':'')+'</div>'; }).join(''); }
function generateEducation() { if (!education) return ''; return education.map(function(e){ return '<div class="edu-card"><h3>'+e.institution+'</h3><div class="study">'+e.studyType+'</div><div class="date">'+e.startDate+' - '+e.endDate+'</div></div>'; }).join(''); }
function generateTags(arr) { if (!arr) return ''; return arr.map(function(item){ return '<span class="tag">'+(item.name||item.language||'')+'</span>'; }).join(''); }

const html = '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>'+b.name+' - '+(b.label||'简历')+'</title><meta name="description" content="'+(b.summary||'')+'"><style>'+css+'</style></head><body><div class="bg-particles"></div><div class="layout"><aside class="sidebar"><div class="sidebar-avatar">'+avatarHtml+'</div><div class="sidebar-name">'+b.name+'</div><div class="sidebar-label">'+(b.label||'')+'</div>'+(b.summary?'<p class="sidebar-summary">'+b.summary+'</p>':'')+'<div class="sidebar-section"><div class="sidebar-section-title">联系方式</div><div class="sidebar-contact">'+generateContact()+'</div></div>'+(skills?'<div class="sidebar-section"><div class="sidebar-section-title">专业技能</div><div class="sidebar-skills">'+generateSkills()+'</div></div>':'')+'<button class="theme-toggle" onclick="toggleTheme()">🌓 切换主题</button></aside><main class="main">'+(work?'<section class="section"><h2 class="section-title"><span>💼</span>工作经历</h2><div class="timeline">'+generateTimeline()+'</div></section>':'')+(projects?'<section class="section"><h2 class="section-title"><span>🚀</span>项目经验</h2><div class="project-grid">'+generateProjects()+'</div></section>':'')+(education?'<section class="section"><h2 class="section-title"><span>🎓</span>教育背景</h2>'+generateEducation()+'</section>':'')+(languages?'<section class="section"><h2 class="section-title"><span>🌍</span>语言能力</h2><div class="tag-cloud">'+generateTags(languages)+'</div></section>':'')+(interests?'<section class="section"><h2 class="section-title"><span>❤️</span>兴趣爱好</h2><div class="tag-cloud">'+generateTags(interests)+'</div></section>':'')+'</main></div>'+js+'</body></html>';

fs.writeFileSync(path.join(outDir,'index.html'),html);
console.log('✅ index.html 生成完成');

const favSrc=path.join(srcDir,'app','favicon.ico');
if(fs.existsSync(favSrc)){fs.copyFileSync(favSrc,path.join(outDir,'favicon.ico'));console.log('✅ favicon.ico')}
console.log('\n🎉 v5.3 头像功能完成!\n');
