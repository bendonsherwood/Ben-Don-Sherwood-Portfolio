
async function loadGallery(){
  const res = await fetch('gallery.json');
  const items = await res.json();
  const grid = document.querySelector('#grid');
  const filters = document.querySelector('#filters');
  const uniqueTags = Array.from(new Set(items.flatMap(i=>i.tags||[])));
  uniqueTags.sort();
  uniqueTags.forEach(tag=>{
    const b = document.createElement('button');
    b.className = 'filter';
    b.textContent = tag;
    b.onclick = ()=>applyFilter(tag);
    filters.appendChild(b);
  });
  const allBtn = document.createElement('button');
  allBtn.className = 'filter active';
  allBtn.textContent = 'All';
  allBtn.onclick = ()=>applyFilter(null);
  filters.prepend(allBtn);

  function render(list){
    grid.innerHTML = '';
    list.forEach((it)=>{
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${it.thumb || it.src}" alt="${it.title||'Artwork'}" loading="lazy">
        <div class="meta"><strong>${it.title||'Untitled'}</strong><small>${it.year||''}</small></div>
      `;
      card.onclick = ()=>openModal(it);
      grid.appendChild(card);
    });
  }

  function applyFilter(tag){
    document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));
    const btn = [...document.querySelectorAll('.filter')].find(b=>b.textContent=== (tag||'All'));
    if(btn) btn.classList.add('active');
    if(!tag) render(items); else render(items.filter(i=> (i.tags||[]).includes(tag)));
  }

  function openModal(it){
    const modal = document.querySelector('#modal');
    const content = modal.querySelector('.modal-content');
    content.innerHTML = '';
    if((it.src||'').toLowerCase().endsWith('.mp4')){
      const video = document.createElement('video');
      video.controls = true; video.autoplay = true; video.playsInline = true;
      video.src = it.src;
      content.appendChild(video);
    } else {
      const img = document.createElement('img');
      img.src = it.src;
      img.alt = it.title||'Artwork';
      content.appendChild(img);
    }
    const header = document.createElement('div');
    header.className='modal-header';
    header.innerHTML = `<div>
        <strong>${it.title||'Untitled'}</strong>
        <div class="badges">${(it.tags||[]).map(t=>`<span class='badge'>${t}</span>`).join('')}</div>
      </div>
      <span class="close" aria-label="Close">✕</span>`;
    header.querySelector('.close').onclick = ()=>modal.classList.remove('open');
    content.prepend(header);
    modal.classList.add('open');
    modal.onclick = (e)=>{ if(e.target.id==='modal') modal.classList.remove('open'); };
  }

  render(items);
}
document.addEventListener('DOMContentLoaded', loadGallery);
