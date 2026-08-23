/* Final package card layer: additive only. Keeps existing package, chatbot and location logic intact. */
(function(){
  const preferred={
    src:'image/sante-barley-preferred-pack.png',
    alt:'SANTÉ Barley Preferred Pack'
  };
  const intro={
    src:'image/sante-barley-intro-pack.png',
    alt:'SANTÉ Barley Intro Pack'
  };

  function apply(){
    const section=document.querySelector('.package-restore');
    if(!section) return setTimeout(apply,150);
    const cards=section.querySelectorAll('.package-card');
    if(cards.length<2) return setTimeout(apply,150);

    const styleId='package-final-style';
    if(!document.getElementById(styleId)){
      const style=document.createElement('style');
      style.id=styleId;
      style.textContent=`
        .package-card .package-image-wrap{width:100%;height:300px;margin:0 0 20px;display:flex;align-items:center;justify-content:center;overflow:hidden;border-radius:0;background:linear-gradient(135deg,#f5f7f4,#eef2ee)}
        .package-card .package-image-wrap img{width:100%;height:100%;object-fit:contain;display:block;padding:0}
        .package-card .package-discount{display:inline-flex;align-items:center;gap:7px;margin:4px 0 12px;padding:8px 12px;border-radius:999px;background:#e8f4eb;color:#176b42;font-weight:800;font-size:.9rem}
        @media(max-width:700px){.package-card .package-image-wrap{height:220px}}
      `;
      document.head.appendChild(style);
    }

    [[cards[0],preferred],[cards[1],intro]].forEach(([card,data])=>{
      let wrap=card.querySelector('.package-image-wrap');
      if(!wrap){
        wrap=document.createElement('div');
        wrap.className='package-image-wrap';
        card.insertBefore(wrap,card.firstChild);
      }
      let img=wrap.querySelector('img');
      if(!img){
        img=document.createElement('img');
        wrap.appendChild(img);
      }
      img.src=data.src;
      img.alt=data.alt;
      img.loading='eager';
    });

    const left=cards[0],right=cards[1];
    const leftLabel=left.querySelector('.eyebrow'); if(leftLabel) leftLabel.textContent='PREFERRED / AFFILIATE PACK';
    const leftTitle=left.querySelector('h3'); if(leftTitle) leftTitle.textContent='Start with products. Enjoy preferred pricing.';
    const leftList=left.querySelector('ul');
    if(leftList) leftList.innerHTML='<li>2 boxes of SANTÉ Barley Powder, 10 sachets each</li><li>Automatic registration</li><li>30% lifetime discount</li>';

    const rightLabel=right.querySelector('.eyebrow'); if(rightLabel) rightLabel.textContent='INTRO PACK';
    const rightTitle=right.querySelector('h3'); if(rightTitle) rightTitle.textContent='Ready to take the next step?';
    const rightText=right.querySelector('h3 + p'); if(rightText) rightText.remove();
    const rightList=right.querySelector('ul');
    if(rightList) rightList.innerHTML='<li>2 boxes of SANTÉ Barley Powder, 30 sachets each</li><li>Entry point for exploring the SANTÉ opportunity</li><li><strong>40% discount</strong></li><li>Choose your country before continuing</li>';
    if(!right.querySelector('.package-discount')){
      const badge=document.createElement('div');
      badge.className='package-discount';
      badge.textContent='✨ 40% Discount';
      const list=right.querySelector('ul');
      if(list) right.insertBefore(badge,list); else right.insertBefore(badge,right.querySelector('button'));
    }
  }
  apply();
})();
