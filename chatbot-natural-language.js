/* Natural language cleanup for Lore’s SANTÉ Assistant.
   Keeps the FAQ knowledge intact while removing document-like wording from visitor-facing replies. */
(function () {
  'use strict';

  var processed = new WeakSet();

  var replacements = [
    [/According to the SANTÉ FAQ/g, 'Based on SANTÉ product information'],
    [/According to the FAQ/g, 'Based on the product information'],
    [/The supplied FAQ/g, 'The product information'],
    [/the supplied FAQ/g, 'the product information'],
    [/The FAQ specifically advises/g, 'The product information specifically advises'],
    [/The FAQ recommends drinking/g, 'The product guidance recommends drinking'],
    [/The FAQ recommends not mixing/g, 'The product guidance recommends not mixing'],
    [/The FAQ recommends/g, 'The product guidance recommends'],
    [/the FAQ recommends/g, 'the product guidance recommends'],
    [/The FAQ suggests/g, 'The product guidance suggests'],
    [/the FAQ suggests/g, 'the product guidance suggests'],
    [/The FAQ states/g, 'The product information states'],
    [/the FAQ states/g, 'the product information states'],
    [/The FAQ says/g, 'The product information says'],
    [/the FAQ says/g, 'the product information says'],
    [/The FAQ notes/g, 'The product information notes'],
    [/the FAQ notes/g, 'the product information notes'],
    [/The FAQ explains/g, 'The product information explains'],
    [/the FAQ explains/g, 'the product information explains'],
    [/The FAQ describes/g, 'The product information describes'],
    [/the FAQ describes/g, 'the product information describes'],
    [/The FAQ gives/g, 'The general serving guidance gives'],
    [/the FAQ gives/g, 'the general serving guidance gives'],
    [/The FAQ’s nutritional analysis/g, 'The product nutritional information'],
    [/the FAQ’s nutritional analysis/g, 'the product nutritional information'],
    [/The FAQ's nutritional analysis/g, 'The product nutritional information'],
    [/the FAQ's nutritional analysis/g, 'the product nutritional information'],
    [/The FAQ attributes/g, 'The product information attributes'],
    [/the FAQ attributes/g, 'the product information attributes'],
    [/The FAQ specifically/g, 'The product information specifically'],
    [/The FAQ/g, 'The product information'],
    [/the FAQ/g, 'the product information']
  ];

  function clean(text) {
    var result = text;
    replacements.forEach(function (item) {
      result = result.replace(item[0], item[1]);
    });
    return result;
  }

  function process(el) {
    if (!el || processed.has(el)) return;
    processed.add(el);
    var original = el.textContent || '';
    if (!original.trim()) return;
    var revised = clean(original);
    if (revised !== original) el.textContent = revised;
  }

  function scan() {
    document.querySelectorAll('.lore-chat-message.bot').forEach(process);
  }

  function init() {
    scan();
    var observer = new MutationObserver(function () { scan(); });
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(scan, 100);
    setTimeout(scan, 500);
    setTimeout(scan, 1200);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
