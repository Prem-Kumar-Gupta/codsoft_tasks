const posts=[
{id:1,title:"Designing Interfaces People Actually Trust",excerpt:"Trust in software isn't an accident — it's built through consistent, honest interface decisions.",category:"Design",tags:["UX","Trust","Product"],date:"Sep 2, 2026",img:"https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&q=70&auto=format&fit=crop",content:["Trust is one of the least discussed variables in interface design, yet it shapes nearly every decision a user makes on a page.","Consistency, clear feedback, and honest error states do more for perceived trust than any visual polish ever could."]},
{id:2,title:"The Quiet Return of Server-Rendered Apps",excerpt:"After years of client-heavy frameworks, teams are rediscovering the simplicity of the server.",category:"Tech",tags:["Web","Backend","Frameworks"],date:"Aug 28, 2026",img:"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=70&auto=format&fit=crop",content:["Server rendering never really left, but the pendulum is swinging back toward it as teams tire of client-side complexity.","Simpler mental models mean fewer bugs and faster onboarding for new engineers."]},
{id:3,title:"What Slow Mornings Taught Me About Focus",excerpt:"A small routine change reshaped how I think about deep work.",category:"Life",tags:["Habits","Focus"],date:"Aug 20, 2026",img:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=70&auto=format&fit=crop",content:["Slowing down the first hour of the day changed how the rest of it unfolded.","Focus, it turns out, is less about willpower and more about the conditions you set before you even start."]},
{id:4,title:"Color Systems That Scale Beyond One Product",excerpt:"Building a palette that survives contact with five different teams.",category:"Design",tags:["Color","Design Systems"],date:"Aug 14, 2026",img:"https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=900&q=70&auto=format&fit=crop",content:["A color system built for one product rarely survives contact with a second.","Token-based palettes with clear semantic names hold up far better across teams."]},
{id:5,title:"Rethinking API Versioning for Small Teams",excerpt:"You probably don't need the versioning strategy the big companies use.",category:"Tech",tags:["API","Architecture"],date:"Aug 5, 2026",img:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=70&auto=format&fit=crop",content:["Most versioning advice online is written for companies with hundreds of API consumers.","Small teams can often get away with simpler, additive-only changes for years."]},
{id:6,title:"On Keeping a Very Slow Reading List",excerpt:"Why finishing fewer books made me a better reader.",category:"Life",tags:["Reading","Habits"],date:"Jul 30, 2026",img:"https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=70&auto=format&fit=crop",content:["Reading one book slowly taught me more than finishing ten quickly ever did.","A slower list also makes room for rereading, which is where most of the value lives."]},
{id:7,title:"Typography Choices Nobody Notices (Until They're Wrong)",excerpt:"The invisible decisions that make text feel effortless to read.",category:"Design",tags:["Typography","UX"],date:"Jul 22, 2026",img:"https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=900&q=70&auto=format&fit=crop",content:["Good typography disappears; bad typography is the only kind readers ever consciously notice.","Line height and measure do more work than font choice in most real layouts."]},
{id:8,title:"A Practical Case for Boring Technology",excerpt:"Why the most reliable systems are often the least exciting ones.",category:"Tech",tags:["Architecture","Engineering"],date:"Jul 15, 2026",img:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=70&auto=format&fit=crop",content:["Boring technology has fewer surprises, and fewer surprises is exactly what production systems need.","Novelty is a cost that has to be paid back somewhere, usually during an incident."]},
];

let currentCategory='all', visibleCount=6, currentPost=null, comments={};

function renderHero(){
const p=posts[0];
document.getElementById('heroSection').innerHTML=`
<div class="hero-card" onclick="openPost(${p.id})">
<img class="hero-img" src="${p.img}" alt="${p.title}">
<div class="hero-body">
<span class="tag">${p.category}</span>
<h1>${p.title}</h1>
<p class="meta" style="margin-bottom:.8rem">${p.date}</p>
<p>${p.excerpt}</p>
</div>
</div>`;
}

function renderChips(){
const cats=['all','Design','Tech','Life'];
document.getElementById('chips').innerHTML=cats.map(c=>
`<button class="chip ${currentCategory===c?'active':''}" onclick="filterCategory('${c}')">${c==='all'?'All':c}</button>`
).join('');
}

function filterCategory(c){currentCategory=c;visibleCount=6;renderChips();renderGrid();}

function getFiltered(){
const q=document.getElementById('searchInput').value.toLowerCase();
return posts.filter(p=>(currentCategory==='all'||p.category===currentCategory)&&
(p.title.toLowerCase().includes(q)||p.excerpt.toLowerCase().includes(q)));
}

function cardHTML(p){
return `<div class="card" onclick="openPost(${p.id})">
<img class="card-img" src="${p.img}" alt="${p.title}">
<div class="card-body">
<span class="tag">${p.category}</span>
<h3>${p.title}</h3>
<p>${p.excerpt}</p>
<p class="meta">${p.date}</p>
<div class="card-tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div>
</div></div>`;
}

function renderGrid(){
const filtered=getFiltered();
document.getElementById('grid').innerHTML=filtered.slice(0,visibleCount).map(cardHTML).join('')||'<p style="color:var(--muted)">No articles found.</p>';
document.getElementById('loadMoreBtn').style.display=visibleCount>=filtered.length?'none':'block';
}

function loadMore(){visibleCount+=6;renderGrid();}

function openPost(id){
currentPost=posts.find(p=>p.id===id);
document.getElementById('homeView').style.display='none';
document.getElementById('detailView').style.display='block';
window.scrollTo(0,0);
document.getElementById('detailImg').src=currentPost.img;
document.getElementById('detailCat').textContent=currentPost.category;
document.getElementById('detailTitle').textContent=currentPost.title;
document.getElementById('detailMeta').textContent=currentPost.date+' · Fieldnote Team';
document.getElementById('detailContent').innerHTML=currentPost.content.map(c=>`<p>${c}</p>`).join('');
document.getElementById('detailTags').innerHTML=currentPost.tags.map(t=>`<span>${t}</span>`).join('');
const url=encodeURIComponent('https://fieldnote.example.com/post/'+currentPost.id);
const title=encodeURIComponent(currentPost.title);
document.getElementById('shareBtns').innerHTML=`
<a href="https://twitter.com/intent/tweet?text=${title}&url=${url}" target="_blank">Share on X</a>
<a href="https://www.facebook.com/sharer/sharer.php?u=${url}" target="_blank">Share on Facebook</a>
<a href="https://www.linkedin.com/sharing/share-offsite/?url=${url}" target="_blank">Share on LinkedIn</a>`;
const related=posts.filter(p=>p.category===currentPost.category&&p.id!==currentPost.id).slice(0,3);
document.getElementById('relatedGrid').innerHTML=related.map(cardHTML).join('');
renderComments();
}

function showHome(){
document.getElementById('detailView').style.display='none';
document.getElementById('homeView').style.display='block';
window.scrollTo(0,0);
}

function renderComments(){
const list=comments[currentPost.id]||[];
document.getElementById('commentCount').textContent=list.length;
document.getElementById('commentList').innerHTML=list.map(c=>`<div class="comment"><b>${c.name}</b>${c.text}</div>`).join('');
}

function addComment(){
const name=document.getElementById('commentName').value.trim();
const text=document.getElementById('commentText').value.trim();
if(!name||!text)return;
if(!comments[currentPost.id])comments[currentPost.id]=[];
comments[currentPost.id].push({name,text});
document.getElementById('commentName').value='';
document.getElementById('commentText').value='';
renderComments();
}

function toggleDark(){
const html=document.documentElement;
const isDark=html.getAttribute('data-theme')==='dark';
html.setAttribute('data-theme',isDark?'light':'dark');
document.getElementById('darkBtn').textContent=isDark?'🌙':'☀️';
}

renderHero();renderChips();renderGrid();