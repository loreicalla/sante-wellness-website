/* Homepage quick-start guide. */
(function(){
  function addGuide(){
    if(document.querySelector('.lore-guide-promo')) return;
    var trust=document.querySelector('.trust-strip');
    if(!trust) return setTimeout(addGuide,150);
    var section=document.createElement('section');
    section.className='lore-guide-promo';
    section.setAttribute('aria-labelledby','lore-guide-heading');
    section.innerHTML=`<div class="lore-guide-promo-inner reveal">
      <div class="lore-guide-intro"><span class="eyebrow">OFFICIAL SANTÉLORE'S WEBSITE</span><h2 id="lore-guide-heading">Choose your next step.</h2><p>Whether you are here for wellness, better pricing, an opportunity, or personal guidance, start with the path that fits you.</p></div>
      <div class="lore-guide-grid">
        <a href="#products" class="lore-guide-item"><b>🛍️ <span>Shop Wellness</span></b><small>Find the right products</small><em>Explore →</em></a>
        <a href="#business-packages" class="lore-guide-item"><b>💼 <span>Preferred Member</span></b><small>Get better pricing / Affiliate</small><em>Explore →</em></a>
        <a href="#business" class="lore-guide-item"><b>🚀 <span>Business Owner</span></b><small>Build an opportunity</small><em>Explore →</em></a>
        <a href="#contact" class="lore-guide-item"><b>👩‍💼 <span>Corporate Support</span></b><small>Get guided by Lore</small><em>Connect →</em></a>
      </div>
    </div>`;
    trust.insertAdjacentElement('afterend',section);
    var style=document.createElement('style');
    style.textContent=`.lore-guide-promo{padding:34px 20px;background:#f7f9f6}.lore-guide-promo-inner{max-width:1180px;margin:0 auto;padding:34px;border:1px solid #dce6df;border-radius:28px;background:linear-gradient(135deg,#fff 0%,#f0f7f2 100%);box-shadow:0 16px 38px rgba(18,54,39,.08)}.lore-guide-intro{max-width:760px;margin:0 auto 24px;text-align:center}.lore-guide-promo h2{margin:7px 0 10px;color:#19352a;font-size:clamp(1.8rem,3vw,2.6rem)}.lore-guide-promo p{margin:0;color:#58665f;line-height:1.7;font-size:1rem}.lore-guide-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.lore-guide-item{position:relative;display:block;min-height:132px;padding:20px;border:1px solid #d9e5dc;border-radius:18px;background:rgba(255,255,255,.88);color:#234033;text-decoration:none!important;transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease}.lore-guide-item:hover{transform:translateY(-4px);border-color:#80ad8d;box-shadow:0 14px 28px rgba(23,75,48,.1)}.lore-guide-item b{display:block;font-size:.96rem}.lore-guide-item small{display:block;margin-top:8px;color:#68776f;font-size:.82rem;line-height:1.45}.lore-guide-item em{position:absolute;left:20px;bottom:17px;color:#1b7047;font-size:.76rem;font-style:normal;font-weight:850}.lore-guide-item b span{margin-left:3px}@media(max-width:900px){.lore-guide-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:600px){.lore-guide-promo{padding:24px 16px}.lore-guide-promo-inner{padding:26px 18px}.lore-guide-grid{grid-template-columns:1fr}.lore-guide-item{min-height:108px}}`;
    document.head.appendChild(style);
  }
  addGuide();
})();
