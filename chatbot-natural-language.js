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
    [/The FAQ's nutritional analysis/g, 'the product nutritional information'],
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

  function isAthleteQuestion(text) {
    var t = (text || '').toLowerCase();
    return /\b(sports? person|sportsperson|athlete|athletes|triathlete|triathlon|runner|runners|running|run|jog|jogging|walk|walking|exercise|exercises|workout|work out|gym)\b/.test(t) ||
      /sports? person|athlete|triathlete|takbo|tumatakbo|nag-?eexercise|nag-?exercise|nagwo-?workout|nag-?gym|naglalakad|naglalakad/.test(t);
  }

  function athleteAnswer(language) {
    if (language === 'tl') {
      return 'Oo! 😊 Puwedeng inumin ang SANTÉ Barley ng athletes at ng mga taong active sa sports. Ginagamit din ito ng Team SANTÉ triathletes. Kahit runner ka, mahilig maglakad, o regular na nag-e-exercise, maaari itong maging bahagi ng daily nutrition mo.\n\n🏃 Simple benefits:\n• 💪 May amino acids na tumutulong sa muscle repair at development.\n• ⚡ May magnesium at B-vitamins na tumutulong sa normal energy production.\n• 🌿 May natural nutrients tulad ng chlorophyll, iron, at minerals na sumusuporta sa katawan.\n• 🛡️ May antioxidants na tumutulong protektahan ang cells laban sa stress mula sa physical activity.\n\nHindi ito kapalit ng proper food, water, at rest—supportive nutrition lang ito para sa active lifestyle. 😊';
    }
    return 'Yes! 😊 SANTÉ Barley can be taken by athletes and people who are active in sports. It is also taken by Team SANTÉ triathletes. Whether you run, walk, or exercise regularly, it can be part of your daily nutrition.\n\n🏃 Simple benefits:\n• 💪 Has amino acids that help support muscle repair and development.\n• ⚡ Has magnesium and B-vitamins that help support normal energy production.\n• 🌿 Has natural nutrients like chlorophyll, iron, and minerals that support the body.\n• 🛡️ Has antioxidants that help protect cells from stress caused by physical activity.\n\nIt is not a replacement for proper food, water, or rest—it is supportive nutrition for an active lifestyle. 😊';
  }

  function process(el) {
    if (!el || processed.has(el)) return;
    processed.add(el);
    var original = el.textContent || '';
    if (!original.trim()) return;
    var revised = clean(original);
    if (revised !== original) el.textContent = revised;
  }

  function scanAthleteAnswers() {
    var messages = Array.prototype.slice.call(document.querySelectorAll('.lore-chat-message'));
    var lastUser = null;
    var lastBot = null;

    messages.forEach(function (el) {
      if (el.classList.contains('user')) lastUser = el;
      if (el.classList.contains('bot')) lastBot = el;
    });

    if (!lastUser || !lastBot || !isAthleteQuestion(lastUser.textContent)) return;

    var key = lastUser.textContent.trim() + '|' + lastBot.textContent.trim();
    if (lastBot.dataset.athletePolished === key) return;

    var language = /\b(paano|maaari|puwede|pwede|athlete|sports?|takbo|tumatakbo|nag-?eexercise|nag-?exercise|nagwo-?workout|nag-?gym|naglalakad)\b/i.test(lastUser.textContent) ? 'tl' : 'en';
    lastBot.textContent = athleteAnswer(language);
    lastBot.dataset.athletePolished = key;
  }

  function scan() {
    document.querySelectorAll('.lore-chat-message.bot').forEach(process);
    scanAthleteAnswers();
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
