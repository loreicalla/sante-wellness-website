/* Stable additive loader: preserves existing website logic, then layers guided chatbot and package enhancements. */
(function(){
  function load(src,next){const s=document.createElement('script');s.src=src;s.onload=next;s.onerror=()=>console.error('Unable to load '+src);document.head.appendChild(s)}
  load('seo.js',()=>load('core.js',()=>load('lore-expert-guide.js',()=>load('package-images.js',()=>load('package-fix.js',()=>{})))));
})();
