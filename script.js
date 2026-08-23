/* Stable loader: preserves the existing website logic, then adds the guided chatbot and package layer. */
(function(){
  function load(src,next){const s=document.createElement('script');s.src=src;s.onload=next;s.onerror=()=>console.error('Unable to load '+src);document.head.appendChild(s)}
  load('core.js',()=>load('lore-expert-guide.js',()=>{}));
})();
