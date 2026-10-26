'use strict';
const $=sel=>document.querySelector(sel);
const make=(tag, cls, content)=>{const el=document.createElement(tag); if(cls)el.className=cls;if(content!==undefined)el.textContent=content;return el;};
const safeUrl = url => {try {const u=new URL(url,window.location.href);return ['https:','http:','mailto:'].includes(u.protocol) || (u.origin===location.origin); } catch{return false;}};
const setLink=(selector,url)=>{const el=$(selector);if(!el||!url||!safeUrl(url))return;el.href=url;el.removeAttribute('aria-disabled');el.classList.remove('disabled-link');el.target=url.startsWith('http')?'_blank':'_self';if(el.target==='_blank')el.rel='noopener noreferrer';return true;};
const addImage=(el,path,alt)=>{if(!path)return;el.style.backgroundImage=`url(${JSON.stringify(path)})`;el.setAttribute('role','img');el.setAttribute('aria-label',alt);el.textContent='';};
function videoEmbed(url){if(!url||!safeUrl(url))return null;try{const u=new URL(url);let embed='';if(['youtube.com','www.youtube.com','m.youtube.com'].includes(u.hostname)){const id=u.searchParams.get('v')||(u.pathname.startsWith('/shorts/')?u.pathname.split('/')[2]:'');if(/^[a-zA-Z0-9_-]{11}$/.test(id))embed=`https://www.youtube-nocookie.com/embed/${id}`;}else if(u.hostname==='youtu.be'){const id=u.pathname.split('/')[1];if(/^[a-zA-Z0-9_-]{11}$/.test(id))embed=`https://www.youtube-nocookie.com/embed/${id}`;}else if(['vimeo.com','www.vimeo.com','player.vimeo.com'].includes(u.hostname)){const id=u.pathname.split('/').filter(Boolean).pop();if(/^\d+$/.test(id)){const hash=u.searchParams.get('h');embed=`https://player.vimeo.com/video/${id}${hash?'?h='+encodeURIComponent(hash):''}`;}}return embed||null;}catch{return null;}}

function init(){
  const c=SITE_CONTENT;
  $('#year').textContent=new Date().getFullYear();
  const nav=$('#nav'),btn=$('.menu-button');
  if(btn){
    btn.addEventListener('click',()=>{const open=nav.classList.toggle('open');btn.setAttribute('aria-expanded',String(open));btn.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
  }
  if(nav){
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');if(btn)btn.setAttribute('aria-expanded','false');}));
  }
  
  if(c.portrait){const p=$('#portrait');if(p){p.style.backgroundImage=`url(${JSON.stringify(c.portrait)})`;p.querySelectorAll('*').forEach(n=>n.remove());p.setAttribute('role','img');p.setAttribute('aria-label','AJ portrait');}}
  if(c.cv){if(setLink('#cv-link',c.cv)){$('#cv-link').textContent='View my CV ↗';$('#cv-note').textContent='Public-facing CV';}}
  setLink('#paper-link',c.paper);
  setLink('#data-link',c.dataset);

  // GALLERY SLIDESHOW
  const galleryContainer=$('#gallery');
  if(galleryContainer){
    let currentFilter='all';
    let currentIndex=0;
    
    function renderSlideshow(){
      galleryContainer.innerHTML='';
      const filtered=c.gallery.filter(item=>currentFilter==='all'||item.category===currentFilter);
      if(filtered.length===0){galleryContainer.textContent='No photos found.';return;}
      if(currentIndex>=filtered.length)currentIndex=0;
      
      const wrapper=make('div','slideshow-container');
      filtered.forEach((item,i)=>{
        const slide=make('div','slideshow-slide'+(i===currentIndex?' active':''));
        const photo=make('div','slideshow-photo');
        if(item.image)addImage(photo,item.image,item.alt||item.heading);
        slide.append(photo);
        
        const content=make('div','slideshow-content');
        content.append(make('small','eyebrow',item.category.toUpperCase()),make('h3','',item.heading),make('p','',item.caption));
        slide.append(content);
        wrapper.append(slide);
      });
      
      const controls=make('div','slideshow-controls');
      const btns=make('div','slideshow-btns');
      const prev=make('button','slide-btn','← Previous');
      const next=make('button','slide-btn','Next →');
      
      prev.addEventListener('click',()=>{currentIndex=(currentIndex-1+filtered.length)%filtered.length;renderSlideshow();});
      next.addEventListener('click',()=>{currentIndex=(currentIndex+1)%filtered.length;renderSlideshow();});
      btns.append(prev,next);
      
      const counter=make('span','slide-counter',`PHOTO ${currentIndex+1} OF ${filtered.length}`);
      controls.append(btns,counter);
      wrapper.append(controls);
      galleryContainer.append(wrapper);
    }
    
    document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{
      document.querySelectorAll('.filter').forEach(k=>{k.classList.toggle('active',k===b);k.setAttribute('aria-pressed',String(k===b));});
      currentFilter=b.dataset.filter;
      currentIndex=0;
      renderSlideshow();
    }));
    
    renderSlideshow();
  }

  // VIDEOS GRID
  const vids=$('#video-grid');
  if(vids && c.videos){
    c.videos.forEach(v=>{
      const card=make('article','video-card'),thumb=make('div','video-thumb'),src=videoEmbed(v.video);
      if(src){const iframe=make('iframe');iframe.src=src;iframe.title=v.heading;iframe.loading='lazy';iframe.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';iframe.allowFullscreen=true;thumb.append(iframe);}else thumb.append(make('span','','VIDEO COMING SOON'));
      const body=make('div','video-body');body.append(make('small','',v.label),make('h3','',v.heading),make('p','',v.description));card.append(thumb,body);vids.append(card);
    });
  }

  // MEDIA LIST
  const media=$('#media-list');
  if(media && c.media){
    c.media.forEach((m,i)=>{
      const row=make('article','media-row');row.append(make('span','index',String(i+1).padStart(2,'0')));const middle=make('div');middle.append(make('h3','',m.title),make('p','',m.detail));row.append(middle);if(m.url&&safeUrl(m.url)){const a=make('a','','Read / watch ↗');a.href=m.url;a.target='_blank';a.rel='noopener noreferrer';row.append(a);}else row.append(make('span','pending',m.detail.toLowerCase().includes('future')?'PLANNED':'LINK TO BE ADDED'));media.append(row);
    });
  }

  // CONTACT LINKS
  const contacts=$('#contact-links');
  if(contacts){
    [['LinkedIn',c.linkedin],['Instagram',c.instagram],['GitHub',c.github],['Email',c.email?'mailto:'+c.email:'']].forEach(([name,url])=>{if(!url||!safeUrl(url))return;const a=make('a','',name+' ↗');a.href=url;if(url.startsWith('https:')){a.target='_blank';a.rel='noopener noreferrer';}contacts.append(a);});
  }
}
document.addEventListener('DOMContentLoaded',init);
