/* Stable loader: preserves existing website logic, then layers guided chatbot, packages, and package visuals. */
(function(){
  function load(src,next){const s=document.createElement('script');s.src=src;s.onload=next;s.onerror=()=>console.error('Unable to load '+src);document.head.appendChild(s)}
  load('core.js',()=>load('lore-expert-guide.js',()=>load('package-images.js',()=>{})));
})();
