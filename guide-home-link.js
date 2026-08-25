/* Homepage internal link to Lore's Expert Guide. */
(function(){
  function addGuideLink(){
    if(document.querySelector('.lore-guide-promo')) return;
    const about=document.querySelector('#about');
    if(!about) return setTimeout(addGuideLink,150);

    const section=document.createElement('section');
    section.className='lore-guide-promo';
    section.setAttribute('aria-labelledby','lore-guide-heading');
    section.innerHTML=`
      <div class="lore-guide-promo-inner reveal">
        <div class="lore-guide-promo-copy">
          <span class="eyebrow">GUIDANCE FROM LORE</span>
          <h2 id="lore-guide-heading">Not sure where to start?</h2>
          <p>Explore Lore's Expert Guide for practical information about choosing SANTÉ products, understanding the available options, and learning more about the business opportunity.</p>
        </div>
        <a class="lore-guide-promo-button" href="lore-expert-guide.html" aria-label="Read Lore's Expert Guide">Read Lore's Expert Guide <span aria-hidden="true">→</span></a>
      </div>`;

    about.insertAdjacentElement('afterend',section);

    const style=document.createElement('style');
    style.textContent=`
      .lore-guide-promo{padding:34px 20px;background:#f7f8f5}
      .lore-guide-promo-inner{max-width:1180px;margin:0 auto;padding:34px 38px;border:1px solid #dce6df;border-radius:26px;background:linear-gradient(135deg,#fff 0%,#f2f7f3 100%);display:flex;align-items:center;justify-content:space-between;gap:30px;box-shadow:0 14px 35px rgba(18,54,39,.07)}
      .lore-guide-promo-copy{max-width:760px}.lore-guide-promo h2{margin:7px 0 10px;color:#19352a;font-size:clamp(1.8rem,3vw,2.6rem)}
      .lore-guide-promo p{margin:0;color:#58665f;line-height:1.7;font-size:1.02rem}.lore-guide-promo-button{flex:0 0 auto;display:inline-flex;align-items:center;gap:10px;padding:15px 22px;border-radius:999px;background:#176b42;color:#fff!important;text-decoration:none!important;font-weight:800;box-shadow:0 10px 24px rgba(23,107,66,.2);transition:transform .2s ease,background .2s ease}.lore-guide-promo-button:hover{background:#123f2b;transform:translateY(-2px)}
      @media(max-width:760px){.lore-guide-promo{padding:24px 16px}.lore-guide-promo-inner{padding:28px 24px;display:block}.lore-guide-promo-button{margin-top:22px;width:100%;justify-content:center}}
    `;
    document.head.appendChild(style);
  }
  addGuideLink();
})();
