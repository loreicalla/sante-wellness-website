/* Natural language cleanup for Lore’s SANTÉ Assistant.
   Keeps the FAQ knowledge intact while making replies simple and conversational. */
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
    replacements.forEach(function (item) { result = result.replace(item[0], item[1]); });
    return result;
  }

  function isAthleteQuestion(text) {
    var t = (text || '').toLowerCase();
    return /\b(sports? person|sportsperson|athlete|athletes|triathlete|triathlon|runner|runners|running|run|jog|jogging|walk|walking|exercise|exercises|workout|work out|gym)\b/.test(t) || /sports? person|athlete|triathlete|takbo|tumatakbo|nag-?eexercise|nag-?exercise|nagwo-?workout|nag-?gym|naglalakad/.test(t);
  }

  function athleteAnswer(language) {
    if (language === 'tl') return 'Oo! 😊 Puwedeng inumin ang SANTÉ Barley ng athletes at mga taong active sa sports. Ginagamit din ito ng Team SANTÉ triathletes. Kahit runner ka, mahilig maglakad, o regular na nag-e-exercise, maaari itong maging bahagi ng daily nutrition mo.\n\n🏃 Simple benefits:\n• 💪 May amino acids na tumutulong sa muscle repair at development.\n• ⚡ May magnesium at B-vitamins na tumutulong sa normal energy production.\n• 🌿 May natural nutrients tulad ng chlorophyll, iron, at minerals na sumusuporta sa katawan.\n• 🛡️ May antioxidants na tumutulong protektahan ang cells mula sa stress ng physical activity.\n\nHindi ito kapalit ng proper food, water, at rest—supportive nutrition ito para sa active lifestyle. 😊';
    return 'Yes! 😊 SANTÉ Barley can be taken by athletes and people who are active in sports. It is also taken by Team SANTÉ triathletes. Whether you run, walk, or exercise regularly, it can be part of your daily nutrition.\n\n🏃 Simple benefits:\n• 💪 Has amino acids that help support muscle repair and development.\n• ⚡ Has magnesium and B-vitamins that help support normal energy production.\n• 🌿 Has natural nutrients like chlorophyll, iron, and minerals that support the body.\n• 🛡️ Has antioxidants that help protect cells from stress caused by physical activity.\n\nIt is not a replacement for proper food, water, or rest—it is supportive nutrition for an active lifestyle. 😊';
  }

  function isHealthQuestion(text) {
    var t = (text || '').toLowerCase();
    return /\b(high blood pressure|hypertension|cholesterol|heart|diabetes|blood sugar|constipation|digestive|digestion|acid reflux|immune|immune system|fatigue|gout|uric acid|inflammation|anemia|red blood cells|gluten|gluten free|health concern|health concerns|sakit|karamdaman|presyon|kolesterol|diabetes|asukal sa dugo|constipation|tiyan|immune system|pagod|gout|uric acid|pamamaga|anemia|gluten)\b/.test(t);
  }

  function healthAnswer(text, language) {
    var t = (text || '').toLowerCase();
    var tl = language === 'tl';

    if (/gluten/.test(t)) return tl ? 'Ayon sa product information, ang SANTÉ Barley juice powder ay mula sa young barley grass leaves at sinasabing gluten-free. Kung may known allergy ka, mas mabuting kumonsulta muna sa health professional bago gumamit.' : 'The product information says SANTÉ Barley juice powder comes from young barley grass leaves and is gluten-free. If you have a known allergy, it is best to check with a health professional before using it.';

    if (/kidney|renal|bato/.test(t)) return tl ? 'Kung may kidney disease o renal problem, mag-ingat. May potassium ang SANTÉ Barley, kaya mas mabuting kumonsulta muna sa health professional bago gumamit.' : 'If you have kidney disease or a renal problem, please be careful. SANTÉ Barley contains potassium, so it is best to check with your health professional before using it.';

    if (/diabetes|blood sugar|asukal sa dugo/.test(t)) return tl ? 'Para sa diabetes o blood sugar concerns, ang product information ay may discussion tungkol dito, pero ang SANTÉ Barley ay food supplement at hindi gamot. Kung umiinom ka ng gamot para sa blood sugar, kumonsulta muna sa health professional.' : 'For diabetes or blood sugar concerns, the product information discusses SANTÉ Barley in this area, but it is a food supplement, not medicine. If you take blood-sugar medication, please check with your health professional first.';

    if (/high blood pressure|hypertension|presyon|cholesterol|kolesterol|heart/.test(t)) return tl ? 'Ang product information ay nagha-highlight ng nutrients at antioxidants sa barley grass. Pero ang SANTÉ Barley ay food supplement, hindi gamot para sa high blood pressure, cholesterol, o sakit sa puso. Kung may ganitong condition ka, sundin pa rin ang payo ng iyong healthcare professional.' : 'The product information highlights nutrients and antioxidants in barley grass. But SANTÉ Barley is a food supplement, not a medicine for high blood pressure, cholesterol, or heart disease. If you have one of these conditions, continue following your healthcare professional’s advice.';

    if (/constipation|digestive|digestion|acid reflux|tiyan/.test(t)) return tl ? 'Ang product information ay naglalarawan sa barley grass bilang source ng nutrients at fiber at may discussion tungkol sa digestion at regularity. Hindi ito dapat ituring na gamot. Kung tuloy-tuloy o matindi ang digestive symptoms, magpatingin sa health professional.' : 'The product information describes barley grass as a source of nutrients and fiber and discusses digestion and regularity. It should not be treated as medicine. If digestive symptoms are persistent or severe, please see a health professional.';

    if (/immune|fatigue|pagod/.test(t)) return tl ? 'Ang SANTÉ Barley ay may natural nutrients at antioxidants na bahagi ng isang balanced diet. Ang product information discusses energy and immune support, pero hindi ito gamot para sa chronic fatigue o infection. Kung madalas o matindi ang pagkapagod, magpatingin sa health professional.' : 'SANTÉ Barley contains natural nutrients and antioxidants that can be part of a balanced diet. The product information discusses energy and immune support, but it is not medicine for chronic fatigue or infection. If you have ongoing or severe fatigue, please see a health professional.';

    if (/gout|uric acid|inflammation|pamamaga/.test(t)) return tl ? 'Ang product information ay may discussion tungkol sa barley grass, alkalinity, at nutrients. Pero hindi dapat ituring ang SANTÉ Barley bilang gamot para sa gout, uric acid, o inflammation. Kung may ganitong condition ka, kumonsulta sa healthcare professional.' : 'The product information discusses barley grass, alkalinity, and nutrients. But SANTÉ Barley should not be treated as medicine for gout, uric acid, or inflammation. If you have one of these conditions, please consult your healthcare professional.';

    if (/anemia|red blood cells/.test(t)) return tl ? 'May iron, B-vitamins, at chlorophyll ang barley grass ayon sa product information. Gayunman, hindi dapat ituring ang SANTÉ Barley bilang treatment para sa anemia. Kung mababa ang iyong red blood cells o hemoglobin, magpatingin sa healthcare professional.' : 'Barley grass contains iron, B-vitamins, and chlorophyll according to the product information. However, SANTÉ Barley should not be treated as a treatment for anemia. If your red blood cells or hemoglobin are low, please see a healthcare professional.';

    return tl ? 'Ang SANTÉ Barley ay food supplement, hindi gamot. May natural nutrients at antioxidants ito, at may product information tungkol sa iba’t ibang health concerns. Kung may diagnosed condition ka, mas mabuting kumonsulta sa healthcare professional para sa tamang advice.' : 'SANTÉ Barley is a food supplement, not medicine. It contains natural nutrients and antioxidants, and the product information discusses different health concerns. If you have a diagnosed condition, it is best to consult a healthcare professional for the right advice.';
  }

  function latestMessages() {
    var messages = Array.prototype.slice.call(document.querySelectorAll('.lore-chat-message'));
    var lastUser = null, lastBot = null;
    messages.forEach(function (el) {
      if (el.classList.contains('user')) lastUser = el;
      if (el.classList.contains('bot')) lastBot = el;
    });
    return {user:lastUser, bot:lastBot};
  }

  function scanSpecialAnswers() {
    var pair = latestMessages();
    if (!pair.user || !pair.bot) return;
    var question = pair.user.textContent || '';
    var language = /\b(paano|maaari|puwede|pwede|ba|ang|ito|sakit|karamdaman|presyon|kolesterol|asukal|tiyan|pagod|pamamaga|bato|buntis|takbo|tumatakbo|nag-?exercise|nagwo-?workout|nag-?gym|naglalakad)\b/i.test(question) ? 'tl' : 'en';
    var key = question.trim() + '|' + pair.bot.textContent.trim();

    if (isAthleteQuestion(question)) {
      if (pair.bot.dataset.athletePolished === key) return;
      pair.bot.textContent = athleteAnswer(language);
      pair.bot.dataset.athletePolished = key;
      return;
    }

    if (isHealthQuestion(question)) {
      if (pair.bot.dataset.healthPolished === key) return;
      pair.bot.textContent = healthAnswer(question, language);
      pair.bot.dataset.healthPolished = key;
    }
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
    scanSpecialAnswers();
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
