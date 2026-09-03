/* Health + FAQ knowledge layer for Lore’s SANTÉ Assistant.
   This layer only replaces the answer to a detected health/product question.
   It does not replace the existing chatbot UI, menus, business flows, or product engine. */
(function () {
  'use strict';

  var processed = new WeakSet();

  function lastUserText() {
    var users = document.querySelectorAll('.lore-chat-message.user');
    return users.length ? (users[users.length - 1].textContent || '').trim() : '';
  }

  function answer(text) {
    var t = (text || '').toLowerCase().trim();

    /* ATHLETES / SPORTS / EXERCISE */
    if (/athlete|athletes|sports person|sport person|sportsman|sportswoman|triathlete|runner|running|run |jog|walking|walk |exercise|workout|gym|training/.test(t)) {
      return 'Yes! 🏃‍♀️🌿 SANTÉ Barley can be part of a wellness routine for athletes and active people. SANTÉ has a triathlete team that takes SANTÉ Barley, and it can also fit the routine of people who run, walk, exercise, or train.\n\nIn simple terms, Barley provides naturally occurring nutrients such as amino acids, minerals, B-vitamins and antioxidants. It is a food supplement, not a medicine or a replacement for proper food, training and rest.';
    }

    /* PREPARATION / HOW TO TAKE */
    if (/how do you take barley|how to take barley|how to consume barley|how do i take barley|how should i take barley|how to drink barley|paano inumin|paano ito inumin|paano gamitin|empty stomach|walang laman ang tiyan/.test(t)) {
      return 'Sure! 😊 Here’s the simple way:\n\n🌿 Take SANTÉ Pure Barley on an empty stomach — about 20 minutes before a meal or about 2 hours after.\n💧 Use cold or room-temperature liquid and sip it slowly.\n🥄 For general use, the FAQ gives 1 teaspoon (3g) twice a day, 30 minutes before a meal.\n\nIf you have a medical condition or take medication, check with your healthcare professional before adding a supplement.';
    }

    if (/hot water|warm water|iced water|cold water|room temperature|hot beverage|hot drink|mainit na tubig|maligamgam|malamig na tubig/.test(t)) {
      return 'For preparation, the FAQ recommends cold or room-temperature liquid. 💧 It advises avoiding hot, warm, iced, or hot beverages because the product guidance says heat can affect its live enzymes and nutrients.';
    }

    if (/storage|store barley|refrigerator|refrigerate|where should i store|saan itago|ref/.test(t)) {
      return 'Easy! 😊 Keep SANTÉ Barley away from moisture and sunlight and keep the container tightly closed. The FAQ advises against refrigerator storage because condensation may affect the product.';
    }

    if (/shelf life|expire|expiration|expiry|how long does barley retain|ilang taon/.test(t)) {
      return 'Yes 😊 The FAQ states that SANTÉ Pure Barley has a 3-year shelf life when stored properly.';
    }

    if (/calories|how many calories|20 calories|calorie/.test(t)) {
      return 'SANTÉ Pure Barley has 20 calories per serving, according to the supplied FAQ. 🌿';
    }

    if (/caffeine|contains caffeine|may caffeine|may kape/.test(t)) {
      return 'Nope 😊 SANTÉ Pure Barley contains no caffeine, according to the FAQ. Some customers report feeling more energetic, but that is different from a caffeine effect.';
    }

    if (/meal replacement|replace a meal|instead of food|pamalit sa pagkain/.test(t)) {
      return 'No 😊 SANTÉ Pure Barley is not meant to replace a meal. The FAQ says it should be treated as a supplement and part of an overall diet.';
    }

    if (/weight loss|lose weight|slimming|papayat|pampapayat|timbang/.test(t)) {
      return 'The FAQ says SANTÉ Pure Barley has 20 calories per serving and can be included in a weight-management program. 🌿 It should not be treated as a guaranteed weight-loss product or a replacement for a balanced diet.';
    }

    if (/capsules|capsule|powder|difference between capsules|capsule vs powder|pulbos|kapsula/.test(t)) {
      return 'The FAQ says the capsules and juice powder are the same product. 🌿 The powder is instantly soluble and is described in the FAQ as being assimilated more rapidly than the capsules. Choose the form that is easier for you to use consistently.';
    }

    if (/taste|what does it taste like|masarap|lasa/.test(t)) {
      return 'The taste can vary because SANTÉ Barley is a natural product. 😊 If you’re new to it, the FAQ suggests starting with a small amount. Some people mix it with fruit juice, and capsules are another option if you prefer not to taste the powder.';
    }

    /* SAFETY / MEDICATION / ALLERGIES */
    if (/gluten|gluten.?free|celiac|may gluten/.test(t)) {
      return 'The supplied FAQ says the juice powder comes from young barley grass leaves, not mature barley grain, and states that its ingredients contain no gluten. 🌿 If you have a known grass allergy or a previous reaction, please check with a healthcare professional before using it.';
    }

    if (/allerg|grass allergy|barley allergy|allergy sa damo/.test(t)) {
      return 'Most people can use SANTÉ Barley, but the FAQ notes that people with grass allergies may rarely react. 🌿 If you have a known allergy or reacted before, please check with a healthcare professional before using it.';
    }

    if (/medication|medicine|taking medication|take with medicine|gamot|umiinom ng gamot/.test(t)) {
      return 'If you take medication, I’d be careful here. 😊 Medication and supplement considerations can vary from person to person. The safest step is to check with your healthcare professional before adding SANTÉ Barley to your routine.';
    }

    if (/kidney|renal failure|kidney disease|kidney disorder|bato|renal/.test(t)) {
      return 'If you have kidney disease, a kidney disorder, or renal failure, please ask your healthcare professional before taking SANTÉ Barley. 💚 The FAQ specifically mentions potassium and lists 214 mg of potassium in a 5-gram serving according to its nutritional analysis.';
    }

    if (/pregnant|pregnancy|prenatal|unborn baby|buntis|pagbubuntis/.test(t)) {
      return 'The supplied FAQ mentions SANTÉ Pure Barley as a prenatal supplement. 💚 Because pregnancy has special nutritional and medical needs, please confirm with your prenatal healthcare provider before taking any supplement.';
    }

    /* ULcer / specific medical-condition questions: route to Lore instead of guessing. */
    if (/\bulcer\b|ulcers|peptic ulcer|gastric ulcer|duodenal ulcer|ulcerative/.test(t)) {
      return 'That’s an important health question, and I don’t want to guess or give you the wrong advice. 💚 For concerns involving an ulcer, please talk directly to Lore, the SANTÉ Wellness expert, via WhatsApp or Viber so your concern can be addressed properly and you can get the right guidance for your situation.';
    }

    /* BLOOD SUGAR / HEART / OTHER HEALTH CONCERNS */
    if (/diabet|blood sugar|sugar level|glucose|asukal sa dugo|diabetic ba/.test(t)) {
      return 'Yes, a person with diabetes may take SANTÉ Pure Barley as a food supplement. 🌿 The SANTÉ product information discusses Barley for people with diabetes and blood-sugar concerns and describes it as a whole-food supplement.\n\nSANTÉ Barley is not diabetes medicine and should not replace prescribed treatment. If you take blood-sugar medication or closely monitor your glucose, please check with your healthcare professional before adding any supplement. 💚\n\nWould you like me to explain how SANTÉ Barley is commonly taken or what nutrients it contains?';
    }

    if (/high blood pressure|hypertension|blood pressure|cholesterol|ldl|mataas na presyon/.test(t)) {
      return 'The supplied product information discusses SANTÉ Barley as a source of naturally occurring nutrients, fiber and antioxidants in relation to heart-health concerns. 🌿 It is a food supplement, not a treatment for high blood pressure or high cholesterol. Keep following your healthcare professional’s advice and ask whether a supplement is appropriate for you.';
    }

    if (/gout|uric acid|inflammation|joint|kasukasuan|pamamaga/.test(t)) {
      return 'The supplied product information discusses barley grass in relation to inflammation and uric acid. 🌿 SANTÉ Barley is a food supplement, not a cure for gout or joint disease. If you have gout or high uric acid, please follow your healthcare professional’s advice.';
    }

    if (/anemia|anaemia|red blood cell|hemoglobin|haemoglobin|mababang dugo/.test(t)) {
      return 'SANTÉ Barley contains nutrients such as iron, B-vitamins and chlorophyll according to the supplied product information. 🌿 But it should not be used as a treatment for anemia. If you have low blood or low iron, it is important to have the cause checked by a healthcare professional.';
    }

    if (/immune|immunity|immune system|impeksyon|infection|mahina ang resistensya/.test(t)) {
      return 'SANTÉ Barley contains naturally occurring nutrients and antioxidants, including vitamin C and zinc according to the supplied product information. 🌿 These nutrients are part of normal body functions, but Barley is not a treatment for infection or illness.';
    }

    if (/constipat|diarrhea|diarrhoea|digest|digestion|acid reflux|reflux|stomach|tiyan|colon|bowel|pagtatae/.test(t)) {
      return 'SANTÉ Barley is a whole-food supplement with naturally occurring nutrients and fiber. 🌿 The FAQ discusses it in relation to digestion and regularity. If stomach or bowel symptoms are severe, persistent, or getting worse, please get medical advice rather than relying on a supplement alone.';
    }

    if (/fatigue|tired|pagod|energy|enerhiya/.test(t)) {
      return 'SANTÉ Barley provides naturally occurring nutrients such as B-vitamins and minerals that are involved in normal energy metabolism. 🌿 It is not a medicine for chronic fatigue. If you are unusually or persistently tired, it is best to discuss the cause with a healthcare professional.';
    }

    /* DETOX / CLEANSING */
    if (/detox|cleansing|cleanse|cleansing reaction/.test(t)) {
      return 'The supplied product information describes possible “cleansing/detoxification” symptoms. 💚 That is a claim in the product material, not a medical diagnosis. If you develop vomiting, diarrhea, rash, severe headache, or other concerning symptoms after taking a supplement, stop and seek appropriate medical advice.';
    }

    /* NUTRIENTS / PRODUCT INFORMATION */
    if (/digestive enzymes|enzymes|amylase|enzyme/.test(t)) {
      return 'Yes 😊 The FAQ states that SANTÉ Pure Barley contains many enzymes, including digestive enzymes such as amylase.';
    }

    if (/antioxidant|antioxidants|orac|free radicals|sod|chlorophyll|beta carotene/.test(t)) {
      return 'The FAQ describes SANTÉ Barley as containing naturally occurring antioxidants and nutrients such as beta-carotene, chlorophyll, SOD, catalase, Lutonarin, Saponarin, polyphenol oxidase, vitamin E, phosphorus and zinc. 🌿 These are described as naturally occurring in the product, not added ingredients.';
    }

    if (/why barley juice|why barley|what is barley good for|benefits of barley|benefits|bakit barley|ano ang benefits/.test(t)) {
      return 'In simple terms, the supplied FAQ describes SANTÉ Barley as a whole-food supplement with naturally occurring vitamins, minerals, enzymes, protein, chlorophyll, antioxidants and other plant nutrients. 🌿 It is meant to complement an overall healthy diet and lifestyle.';
    }

    if (/how is barley juice powder processed|how is barley processed|processed|processing|organic|organically grown|pesticide|herbicide|fertilizer/.test(t)) {
      return 'According to the FAQ, the barley grass is organically grown without chemical pesticides, herbicides or fertilizers. 🌿 It is harvested when the leaves have a broad spectrum of nutrients, then low-temperature processing is used to make the concentrate juice powder.';
    }

    if (/after meal|with meal|take after meals|take with meals/.test(t)) {
      return 'The FAQ says you can drink SANTÉ Barley anytime, but suggests taking it alone rather than with a meal so it can be taken without other foods present. 🌿 For the general routine, the FAQ gives 1 teaspoon (3g) twice a day, 30 minutes before a meal.';
    }

    if (/fasting|hallelujah diet/.test(t)) {
      return 'The supplied FAQ says SANTÉ Pure Barley can be used during fasting and is compatible with the Hallelujah Diet. 🌿 If your fasting is medically supervised or you have a health condition, follow your healthcare professional’s guidance.';
    }

    if (/hot drink|cranberry|prune juice|carbonated|softdrink|soda/.test(t)) {
      return 'The FAQ recommends not mixing SANTÉ Pure Barley with hot drinks, cranberry or prune juice, or carbonated drinks. 🌿 For the simplest preparation, use cold or room-temperature liquid.';
    }

    if (/prepared|prepare a large amount|keep it in the refrigerator|after mixing|20 minutes/.test(t)) {
      return 'The supplied FAQ recommends drinking SANTÉ Barley soon after mixing and says to consume the prepared drink within about 20 minutes. 😊 So it’s better to mix it when you’re ready to drink it.';
    }

    if (/chlorophyll do|what does chlorophyll do|green|why so green/.test(t)) {
      return 'The green color comes from chlorophyll. 🌿 The FAQ describes chlorophyll as a naturally occurring component of barley grass and lists it among the product’s naturally occurring nutrients.';
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
