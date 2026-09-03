/* Health-topic knowledge layer for Lore’s SANTÉ Assistant.
   Adds simple answers from the supplied SANTÉ product information without replacing the core chatbot. */
(function () {
  'use strict';

  var processed = new WeakSet();

  function lastUserText() {
    var users = document.querySelectorAll('.lore-chat-message.user');
    return users.length ? (users[users.length - 1].textContent || '').trim() : '';
  }

  function answer(text) {
    var t = (text || '').toLowerCase();

    if (/kidney|renal|bato/.test(t)) {
      return 'Kung may kidney disease, kidney problem, o renal failure, mas mabuting magtanong muna sa healthcare professional bago uminom ng SANTÉ Barley. 🌿 May potassium ang Barley, kaya mahalagang malaman kung bagay ito sa iyong kondisyon.';
    }

    if (/gluten|gluten.?free|celiac/.test(t)) {
      return 'Yes 😊 The product information says SANTÉ Pure Barley is made from young barley grass leaves, not mature barley grain, and the ingredients are stated to contain no gluten. 🌿 If you have a known grass allergy, it’s best to check with a healthcare professional first.';
    }

    if (/allerg|grass allergy|barley allergy|allergy/.test(t)) {
      return 'Most people can use SANTÉ Barley, but the product information notes that people with grass allergies may rarely react. 🌿 If you have a known allergy or have reacted to it before, please check with a healthcare professional before using it.';
    }

    if (/diabet|blood sugar|sugar level|glucose/.test(t)) {
      return 'If you have diabetes or you’re managing your blood sugar, SANTÉ Barley is a food supplement—not a medicine for diabetes. 🌿 The product information reports no known adverse effects associated with blood sugar levels, but if you take diabetes medication or have concerns about your glucose, please check with your healthcare professional before adding a supplement.';
    }

    if (/high blood pressure|hypertension|blood pressure|cholesterol|ldl/.test(t)) {
      return 'SANTÉ Barley is a food supplement that provides naturally occurring nutrients, including fiber and antioxidants. 🌿 It should not be used as a treatment or replacement for prescribed medicine for high blood pressure or cholesterol. If you have either condition, continue your medical care and ask your healthcare professional whether a supplement is appropriate for you.';
    }

    if (/gout|uric acid|inflammation|joint|kasukasuan/.test(t)) {
      return 'SANTÉ Barley provides naturally occurring nutrients and antioxidants. 🌿 The product information discusses it in relation to inflammation and uric acid, but it should not be treated as a cure for gout or joint disease. If you have gout or high uric acid, please follow your healthcare professional’s advice.';
    }

    if (/anemia|anaemia|red blood cell|hemoglobin|haemoglobin/.test(t)) {
      return 'SANTÉ Barley contains nutrients such as iron, B-vitamins and chlorophyll. 🌿 However, it should not be used as a treatment for anemia. If you have low red blood cells or low iron, it’s important to get the cause checked by a healthcare professional.';
    }

    if (/immune|immunity|immune system|impeksyon|infection/.test(t)) {
      return 'SANTÉ Barley contains naturally occurring nutrients and antioxidants, including vitamin C and zinc according to the product information. 🌿 These nutrients support normal body functions, but Barley is not a treatment for infections or illness.';
    }

    if (/constipat|diarrhea|diarrhoea|digest|digestion|acid reflux|reflux|stomach|tiyan|colon|bowel/.test(t)) {
      return 'SANTÉ Barley is a whole-food supplement with naturally occurring nutrients and fiber. 🌿 The product information discusses it in relation to digestion and regularity. If you have persistent, severe, or worsening stomach symptoms, it’s better to get medical advice rather than rely on a supplement alone.';
    }

    if (/fatigue|tired|pagod|energy|enerhiya/.test(t)) {
      return 'SANTÉ Barley provides naturally occurring nutrients such as B-vitamins and minerals that are part of normal energy metabolism. 🌿 It is not a medicine for chronic fatigue. If you are unusually or persistently tired, it’s best to discuss the cause with a healthcare professional.';
    }

    if (/prenatal|pregnan|buntis|pregnancy/.test(t)) {
      return 'The product information mentions SANTÉ Barley as a prenatal supplement. 💚 Because pregnancy has individual nutritional and medical needs, please confirm with your prenatal healthcare provider before taking any supplement.';
    }

    if (/detox|cleansing|cleanse|cleansing reaction/.test(t)) {
      return 'The supplied product information describes possible “cleansing/detoxification” symptoms, but that wording is a product claim—not a medical diagnosis. 💚 If you develop vomiting, diarrhea, rash, severe headache, or other concerning symptoms after taking a supplement, stop and seek appropriate medical advice.';
    }

    return null;
  }

  function process(el) {
    if (!el || processed.has(el)) return;
    processed.add(el);
    var user = lastUserText();
    if (!user) return;
    var replacement = answer(user);
    if (replacement) el.textContent = replacement;
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
    setTimeout(scan, 2500);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
