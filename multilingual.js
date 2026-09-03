(function(){
  'use strict';

  /* Custom, in-page language switcher. No Google Translate, no browser translation bar. */
  var LANGS=[
    ['en','🇬🇧','English'],
    ['tl','🇵🇭','Filipino'],
    ['es','🇪🇸','Español'],
    ['fr','🇫🇷','Français'],
    ['id','🇮🇩','Bahasa Indonesia'],
    ['ar','🇸🇦','العربية'],
    ['zh-CN','🇨🇳','简体中文']
  ];

  var FILIPINO={
    'Home':'Tahanan','Stories':'Mga Kuwento','About':'Tungkol sa Akin','Products':'Mga Produkto','Business':'Negosyo','Get Info':'Kumuha ng Impormasyon','Contact':'Makipag-ugnayan',
    'WELCOME TO SANTÉ WELLNESS':'MALIGAYANG PAGDATING SA SANTÉ WELLNESS',
    'Wellness for your life.':'Kalusugan para sa iyong buhay.',
    'Opportunity for your future.':'Oportunidad para sa iyong kinabukasan.',
    'Discover wellness and lifestyle products designed to complement your everyday routine—and explore an opportunity that can grow alongside your goals.':'Tuklasin ang mga produktong pangkalusugan at lifestyle na maaaring maging bahagi ng iyong pang-araw-araw na gawain—at tuklasin ang isang oportunidad na maaaring lumago kasama ng iyong mga layunin.',
    'Explore Products':'Tuklasin ang mga Produkto','Get Free Information':'Kumuha ng Libreng Impormasyon',
    'WELLNESS':'KALUSUGAN','Everyday lifestyle choices':'Mga pagpipilian sa araw-araw','QUALITY':'KALIDAD','Products for your routine':'Mga produkto para sa iyong routine','COMMUNITY':'KOMUNIDAD','People growing together':'Lumago nang sama-sama',
    'REAL PEOPLE. REAL JOURNEYS.':'TUNAY NA TAO. TUNAY NA MGA KUWENTO.',
    'Every journey begins with a story.':'Bawat paglalakbay ay nagsisimula sa isang kuwento.',
    'Discover inspiring journeys centered on wellness, growth, and new possibilities.':'Tuklasin ang mga kuwentong nagbibigay-inspirasyon tungkol sa kalusugan, paglago, at mga bagong posibilidad.',
    'Choosing a healthier lifestyle.':'Pagpili ng mas malusog na pamumuhay.','Small daily choices can become the beginning of a meaningful wellness journey.':'Ang maliliit na pagpili araw-araw ay maaaring maging simula ng isang makabuluhang paglalakbay tungo sa mas mabuting kalusugan.','Explore products →':'Tuklasin ang mga produkto →',
    'Turning ambition into opportunity.':'Gawing oportunidad ang ambisyon.','One decision can open doors to growth, new experiences, and bigger possibilities.':'Ang isang desisyon ay maaaring magbukas ng pinto tungo sa paglago, bagong karanasan, at mas malalaking posibilidad.','Explore the opportunity →':'Tuklasin ang oportunidad →',
    'Growing together, going further.':'Sama-samang lumago, sama-samang umunlad.','Great journeys become even more meaningful when shared with a supportive community.':'Mas nagiging makabuluhan ang paglalakbay kapag kasama ang isang komunidad na sumusuporta.','Let’s connect →':'Mag-ugnayan tayo →',"Let's connect →":'Mag-ugnayan tayo →',
    'MEET YOUR SANTÉ WELLNESS PARTNER':'KILALANIN ANG IYONG SANTÉ WELLNESS PARTNER',
    "Hi, I'm":"Kumusta, ako ay",'Lore.':'Kuwento.',
    'Your guide to wellness products and business opportunities with SANTÉ.':'Ang iyong gabay sa mga produktong pangkalusugan at mga oportunidad sa negosyo kasama ang SANTÉ.',
    "I'm here to help you discover products that can fit naturally into your everyday life—and explore an opportunity to build an additional source of income.":'Nandito ako para tulungan kang matuklasan ang mga produktong natural na akma sa iyong pang-araw-araw na buhay—at tuklasin ang pagkakataong magkaroon ng karagdagang pinagkukunan ng kita.',
    'Wellness':'Kalusugan','Everyday choices':'Mga pagpipilian sa araw-araw','Opportunity':'Oportunidad','Build your future':'Buuin ang iyong kinabukasan','Global':'Pandaigdigan','Beyond borders':'Higit pa sa mga hangganan','Community':'Komunidad','Grow together':'Lumago nang sama-sama',
    'Connect With Me →':'Makipag-ugnayan sa Akin →','Explore the Business →':'Galugarin ang Negosyo →',
    'I believe that when we take care of our wellness, we create more energy, more possibilities, and more freedom for the life we want.':'Naniniwala ako na kapag inalagaan natin ang ating kalusugan, lumilikha tayo ng mas maraming enerhiya, posibilidad, at kalayaan para sa buhay na gusto natin.',
    '— Lore':'— Lore',
    'WELLNESS FOR EVERY DAY':'KALUSUGAN PARA SA ARAW-ARAW','Wellness That Fits Your Lifestyle.':'Kalusugang Akma sa Iyong Pamumuhay.','Simple wellness choices designed to complement your everyday routine.':'Mga simpleng pagpipilian para sa kalusugan na maaaring maging bahagi ng iyong pang-araw-araw na gawain.',
    'Daily Wellness':'Pang-araw-araw na Kalusugan','Explore Products →':'Tuklasin ang mga Produkto →','Better Coffee Choice':'Mas Mainam na Pagpipiliang Kape','Explore Coffee →':'Tuklasin ang Kape →','Business Opportunity':'Oportunidad sa Negosyo','Learn More →':'Alamin Pa →',
    'OUR COLLECTION':'ANG AMING KOLEKSIYON','Featured SANTÉ Products':'Mga Tampok na Produkto ng SANTÉ','Explore some of the products available through the SANTÉ wellness collection.':'Tuklasin ang ilan sa mga produktong makukuha sa SANTÉ wellness collection.',
    'SANTÉ Barley Canister':'SANTÉ Barley Canister','Certified organic barley grass powder from New Zealand.':'Certified organic barley grass powder mula New Zealand.','Explore →':'Tuklasin →','SANTÉ Barley Fusion':'SANTÉ Barley Fusion','Coffee mix with barley grass for your everyday coffee routine.':'Coffee mix na may barley grass para sa iyong pang-araw-araw na coffee routine.','SANTÉ Barliccino':'SANTÉ Barliccino','Cappuccino coffee mix with SANTÉ barley and stevia.':'Cappuccino coffee mix na may SANTÉ barley at stevia.',
    'SHOP BY CATEGORY':'MAMILI AYON SA KATEGORYA','Something for Every Routine':'May Para sa Bawat Routine','Barley and wellness-focused products.':'Mga produktong barley at nakatuon sa wellness.','Coffee and beverage choices for your routine.':'Mga kape at inumin para sa iyong routine.','Beauty and lifestyle products.':'Mga produktong pang-beauty at lifestyle.','Everyday personal care essentials.':'Mga pangunahing personal care para sa araw-araw.',
    'PRODUCT COLLECTION':'KOLEKSIYON NG PRODUKTO','Explore More Products':'Tuklasin ang Iba Pang Produkto','Browse the collection and choose the products that fit your routine.':'Tingnan ang koleksyon at piliin ang mga produktong akma sa iyong routine.',
    'MORE THAN PRODUCTS':'HIGIT PA SA MGA PRODUKTO','Build an Opportunity Around Your Lifestyle.':'Bumuo ng Oportunidad Ayon sa Iyong Pamumuhay.','Looking for an additional income opportunity? Explore how you can become a SANTÉ partner, share products, and build something that can grow alongside your lifestyle.':'Naghahanap ka ba ng karagdagang income opportunity? Alamin kung paano maging SANTÉ partner, magbahagi ng mga produkto, at bumuo ng isang bagay na maaaring lumago kasabay ng iyong pamumuhay.',
    'How would you like to connect?':'Paano mo gustong makipag-ugnayan?','Choose the channel that works best for you. I’ll be happy to connect with you.':'Piliin ang paraan na pinakaangkop sa iyo. Masaya akong makipag-ugnayan sa iyo.','Chat with Lore directly':'Direktang makipag-chat kay Lore','Message +63 961 355 2176':'Mag-message sa +63 961 355 2176','Facebook Messenger':'Facebook Messenger','SANTÉ Wellness International':'SANTÉ Wellness International','Live Chat Assistant':'Live Chat Assistant','Chat with Lore’s SANTÉ Assistant':'Makipag-chat sa SANTÉ Assistant ni Lore'
  };

  var originalNodes=new Map();
  var observer=null;
  var translating=false;

  function addStyles(){
    if(document.getElementById('custom-language-styles'))return;
    var s=document.createElement('style');
    s.id='custom-language-styles';
    s.textContent='.ml-switcher{position:fixed;right:18px;bottom:86px;z-index:99990;font:600 14px/1.2 Arial,sans-serif}.ml-toggle{border:1px solid rgba(32,54,45,.18);background:#fff;color:#20362d;border-radius:999px;padding:11px 15px;box-shadow:0 8px 28px rgba(0,0,0,.14);cursor:pointer}.ml-menu{display:none;position:absolute;right:0;bottom:50px;width:190px;max-height:310px;overflow:auto;padding:8px;background:#fff;border-radius:16px;box-shadow:0 14px 40px rgba(0,0,0,.2)}.ml-switcher.open .ml-menu{display:block}.ml-menu button{display:block;width:100%;padding:11px 12px;border:0;background:transparent;text-align:left;border-radius:10px;color:#20362d;cursor:pointer;font:600 14px Arial}.ml-menu button:hover,.ml-menu button.active{background:#eef6f0}.ml-menu button[data-lang="es"],.ml-menu button[data-lang="fr"],.ml-menu button[data-lang="id"],.ml-menu button[data-lang="ar"],.ml-menu button[data-lang="zh-CN"]{opacity:.6}.ml-note{position:absolute;right:0;bottom:50px;width:220px;padding:12px 14px;background:#fff;border:1px solid #d9e5de;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.14);font:500 12px/1.45 Arial;color:#52645d;display:none}.ml-switcher.notice .ml-note{display:block}@media(max-width:680px){.ml-switcher{right:14px;bottom:82px}.ml-menu{width:185px}}';
    document.head.appendChild(s);
  }

  function shouldSkip(node){
    var p=node.parentElement;
    if(!p)return true;
    if(['SCRIPT','STYLE','NOSCRIPT','TEXTAREA','INPUT'].indexOf(p.tagName)>-1)return true;
    if(p.closest('.ml-switcher'))return true;
    return false;
  }

  function translateNode(node){
    if(node.nodeType!==3||shouldSkip(node))return;
    var raw=node.nodeValue;
    var trimmed=raw.trim();
    if(!trimmed)return;
    if(!originalNodes.has(node))originalNodes.set(node,raw);
    var translated=FILIPINO[trimmed];
    if(translated){
      node.nodeValue=raw.replace(trimmed,translated);
    }
  }

  function translatePage(){
    translating=true;
    var walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    var node;
    while(node=walker.nextNode())translateNode(node);
    translating=false;
  }

  function restoreEnglish(){
    translating=true;
    originalNodes.forEach(function(raw,node){if(node&&node.isConnected)node.nodeValue=raw});
    translating=false;
  }

  function setActive(lang){
    document.querySelectorAll('.ml-menu button').forEach(function(b){b.classList.toggle('active',b.dataset.lang===lang)});
    var toggle=document.querySelector('.ml-toggle');
    if(toggle)toggle.textContent=lang==='tl'?'🌐 Wika':'🌐 Language';
  }

  function changeLanguage(lang,box){
    box.classList.remove('open');
    box.classList.remove('notice');
    if(lang==='en'){
      restoreEnglish();
      document.documentElement.lang='en';
      document.documentElement.dir='ltr';
      localStorage.setItem('santewithlore-language','en');
      setActive('en');
      return;
    }
    if(lang!=='tl'){
      box.classList.add('notice');
      setTimeout(function(){box.classList.remove('notice')},2600);
      return;
    }
    translatePage();
    document.documentElement.lang='tl';
    document.documentElement.dir='ltr';
    localStorage.setItem('santewithlore-language','tl');
    setActive('tl');
  }

  function build(){
    addStyles();
    var box=document.createElement('div');
    box.className='ml-switcher';
    box.setAttribute('data-ml-ignore','');
    box.innerHTML='<button class="ml-toggle" type="button" aria-expanded="false">🌐 Language</button><div class="ml-menu" role="menu"></div><div class="ml-note">Filipino translation is available now. Other languages are being prepared for this custom translator.</div>';
    var menu=box.querySelector('.ml-menu');
    LANGS.forEach(function(l){
      var b=document.createElement('button');
      b.type='button';b.dataset.lang=l[0];b.textContent=l[1]+' '+l[2];
      b.addEventListener('click',function(){changeLanguage(l[0],box)});
      menu.appendChild(b);
    });
    box.querySelector('.ml-toggle').addEventListener('click',function(){box.classList.toggle('open');box.classList.remove('notice');this.setAttribute('aria-expanded',box.classList.contains('open')?'true':'false')});
    document.body.appendChild(box);

    observer=new MutationObserver(function(records){
      if(translating)return;
      if((localStorage.getItem('santewithlore-language')||'en')!=='tl')return;
      records.forEach(function(record){record.addedNodes.forEach(function(n){
        if(n.nodeType===3)translateNode(n);
        else if(n.nodeType===1){var w=document.createTreeWalker(n,NodeFilter.SHOW_TEXT),x;while(x=w.nextNode())translateNode(x)}
      })});
    });
    observer.observe(document.body,{childList:true,subtree:true});

    var saved=localStorage.getItem('santewithlore-language')||'en';
    if(saved==='tl'){translatePage();document.documentElement.lang='tl';setActive('tl')}
    else setActive('en');
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();
