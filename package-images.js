/* Visual layer for restored package cards. Does not replace existing package or chatbot logic. */
(function(){
  function addPackageImages(){
    const section=document.querySelector('.package-restore');
    if(!section) return setTimeout(addPackageImages,120);
    if(section.dataset.imagesAdded==='true') return;
    section.dataset.imagesAdded='true';

    const cards=section.querySelectorAll('.package-card');
    const images=[
      {src:'image/sante-barley-preferred-pack.png',alt:'SANTÉ Barley Preferred Pack'},
      {src:'image/sante-barley-intro-pack.png',alt:'SANTÉ Barley Intro Pack'}
    ];

    const style=document.createElement('style');
    style.textContent=`
      .package-card .package-image-wrap{width:100%;height:220px;margin:0 0 24px;display:flex;align-items:center;justify-content:center;overflow:hidden;border-radius:20px;background:linear-gradient(135deg,#f4f8f5,#edf3ee)}
      .package-card .package-image-wrap img{width:100%;height:100%;object-fit:contain;display:block;padding:8px;transition:transform .25s ease}
      .package-card:hover .package-image-wrap img{transform:scale(1.025)}
      @media(max-width:700px){.package-card .package-image-wrap{height:190px;margin-bottom:20px}}
    `;
    document.head.appendChild(style);

    cards.forEach((card,index)=>{
      const data=images[index];
      if(!data || card.querySelector('.package-image-wrap')) return;
      const wrap=document.createElement('div');
      wrap.className='package-image-wrap';
      const img=document.createElement('img');
      img.src=data.src;
      img.alt=data.alt;
      img.loading='eager';
      wrap.appendChild(img);
      card.insertBefore(wrap,card.firstChild);
    });
  }
  addPackageImages();
})();
