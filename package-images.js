/* Restores only the two missing package cards without changing existing products or layout. */
(function(){
  function restoreMissingPackages(){
    if(document.getElementById('preferred-intro-pack-restore')) return;
    var anchor=document.querySelector('.package-restore') || document.querySelector('#business');
    if(!anchor) return setTimeout(restoreMissingPackages,120);
    var section=document.createElement('section');
    section.id='preferred-intro-pack-restore';
    section.className='package-restore';
    section.innerHTML=''
      +'<div class="package-restore-inner">'
      +'<div class="package-restore-heading"><span class="eyebrow">GET STARTED</span><h2>Choose Your SANTÉ Pack</h2><p>Explore the available starter pack options and choose your location to continue.</p></div>'
      +'<div class="package-restore-grid">'
      +'<article class="package-card"><div class="package-image-wrap"><img src="image/sante-barley-preferred-pack.png" alt="SANTÉ Preferred Pack" loading="lazy"></div><div class="package-card-content"><span class="package-label">AFFILIATE PACK</span><h3>Preferred Pack</h3><p>A preferred package option for starting your SANTÉ journey.</p><a href="https://partner.mysante.com/epackage?ref=WEALTHYLORE&country=PH&package=preferred" class="product-link">Explore →</a></div></article>'
      +'<article class="package-card"><div class="package-image-wrap"><img src="image/sante-barley-intro-pack.png" alt="SANTÉ Intro Pack" loading="lazy"></div><div class="package-card-content"><span class="package-label">STARTER PACK</span><h3>Intro Pack</h3><p>A simple introduction to begin exploring the SANTÉ opportunity.</p><a href="https://partner.mysante.com/epackage?ref=WEALTHYLORE&country=PH&package=intro" class="product-link">Explore →</a></div></article>'
      +'</div></div>';
    anchor.insertAdjacentElement('afterend',section);
    var style=document.createElement('style');
    style.textContent=''
      +'#preferred-intro-pack-restore{padding:72px 20px;background:#fff}'
      +'#preferred-intro-pack-restore .package-restore-inner{max-width:1180px;margin:0 auto}'
      +'#preferred-intro-pack-restore .package-restore-heading{text-align:center;max-width:700px;margin:0 auto 34px}'
      +'#preferred-intro-pack-restore h2{margin:8px 0 10px;color:#19352a;font-size:clamp(2rem,4vw,3rem)}'
      +'#preferred-intro-pack-restore p{color:#617169;line-height:1.65}'
      +'#preferred-intro-pack-restore .package-restore-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px;max-width:900px;margin:0 auto}'
      +'#preferred-intro-pack-restore .package-card{padding:24px;border:1px solid #dce6df;border-radius:24px;background:#fff;box-shadow:0 14px 35px rgba(18,54,39,.07)}'
      +'#preferred-intro-pack-restore .package-image-wrap{width:100%;height:240px;margin:0 0 22px;display:flex;align-items:center;justify-content:center;overflow:hidden;border-radius:18px;background:linear-gradient(135deg,#f4f8f5,#edf3ee)}'
      +'#preferred-intro-pack-restore .package-image-wrap img{width:100%;height:100%;object-fit:contain;padding:8px}'
      +'#preferred-intro-pack-restore .package-label{display:block;color:#2b7a4b;font-size:.72rem;font-weight:900;letter-spacing:.14em}'
      +'#preferred-intro-pack-restore h3{margin:8px 0;color:#19352a;font-size:1.45rem}'
      +'#preferred-intro-pack-restore .product-link{display:inline-block;margin-top:8px;color:#176b42;font-weight:800;text-decoration:none}'
      +'@media(max-width:700px){#preferred-intro-pack-restore{padding:54px 16px}#preferred-intro-pack-restore .package-restore-grid{grid-template-columns:1fr}#preferred-intro-pack-restore .package-image-wrap{height:210px}}';
    document.head.appendChild(style);
  }
  restoreMissingPackages();
})();