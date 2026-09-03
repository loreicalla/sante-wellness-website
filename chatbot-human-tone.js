/* Human tone layer for Lore’s SANTÉ Assistant.
   Keeps the existing chatbot/FAQ engine intact and only improves how known replies are presented. */
(function () {
  'use strict';

  var processed = new WeakSet();

  var toneReplies = [
    {
      test: 'The FAQ suggests taking SANTÉ Pure Barley on an empty stomach',
      reply: 'Sure! 😊 If you’re just starting with SANTÉ Barley, here’s the simple way:\n\n🌿 Take it on an empty stomach — around 20 minutes before a meal or about 2 hours after.\n💧 Mix it with cold or room-temperature liquid and sip it slowly.\n🥄 For general use, the FAQ gives 1 teaspoon (3g) twice a day, 30 minutes before a meal.\n\nIf you’re taking medication or have a medical condition, it’s best to check with your healthcare professional before adding a supplement.\n\nAre you new to Barley, or have you been taking it for a while?'
    },
    {
      test: 'According to the SANTÉ FAQ, barley grass is organically grown',
      reply: 'Absolutely! 🌿 The barley grass is organically grown without chemical pesticides, herbicides or fertilizers. It’s harvested when the leaves have a broad spectrum of nutrients, then processed at low temperature into the concentrate juice powder.\n\nWould you like to know more about the product itself or how to take it?'
    },
    {
      test: 'The FAQ recommends taking it on an empty stomach',
      reply: 'Yes 😊 It’s recommended to take SANTÉ Barley on an empty stomach — either before a meal or a couple of hours after eating. It can be taken by itself rather than together with a meal.\n\nIf you tell me what time you usually eat breakfast and dinner, I can help you understand how that timing could fit into your routine.'
    },
    {
      test: 'For preparation, the FAQ recommends cold or room-temperature liquid',
      reply: 'For preparation, use **cold or room-temperature liquid**. 💧 The product guidance advises avoiding hot or warm drinks because heat can affect the product’s live enzymes and nutrients.\n\nIf you want, I can also tell you what drinks are best to avoid when mixing it.'
    },
    {
      test: 'The FAQ says to keep SANTÉ Barley away from moisture',
      reply: 'Easy one 😊 Keep your SANTÉ Barley away from moisture and direct sunlight, and make sure the container is tightly closed. It’s also best not to keep it in the refrigerator because condensation can be an issue.\n\nSo basically: **cool, dry, tightly closed, and away from sunlight.** 🌿'
    },
    {
      test: 'The FAQ states that SANTÉ Pure Barley has a shelf life of 3 years',
      reply: 'Yes 😊 SANTÉ Pure Barley has a **3-year shelf life**. Just make sure it’s stored properly — away from moisture and sunlight and tightly closed.'
    },
    {
      test: 'The FAQ states that SANTÉ Pure Barley has 20 calories per serving',
      reply: 'Yes 😊 SANTÉ Pure Barley has **20 calories per serving**.\n\nIf you’re asking because you’re watching your calorie intake or working on weight management, I can also explain how it can fit into your routine.'
    },
    {
      test: 'No. The FAQ states that SANTÉ Pure Barley contains no caffeine',
      reply: 'Nope 😊 **SANTÉ Pure Barley doesn’t contain caffeine.**\n\nSome people report feeling more energetic after taking it, but that’s different from getting a caffeine boost.\n\nAre you asking because you’re trying to avoid caffeine, or because you’re looking for something for your energy?'
    },
    {
      test: 'No. The FAQ says SANTÉ Pure Barley is not intended to replace a meal',
      reply: 'Right 😊 SANTÉ Pure Barley is **not meant to replace a meal**. It’s a supplement that can be taken as part of your overall diet.\n\nIf you tell me what your usual meals look like, I can help you understand where the Barley routine could fit.'
    },
    {
      test: 'The FAQ notes that SANTÉ Pure Barley has 20 calories per serving',
      reply: 'Yes 😊 SANTÉ Pure Barley has **20 calories per serving** and can be included in a weight-management routine. It shouldn’t be treated as a guaranteed weight-loss product, though.\n\nIf your goal is weight management, I can also help you understand the product’s general use and timing.'
    },
    {
      test: 'The FAQ says the capsules and juice powder are the same product',
      reply: 'Good question! 🌿 The **capsules and juice powder are the same product**. The powder is instantly soluble, and it’s described as being assimilated more rapidly than the capsules.\n\nIf you tell me which one you’re considering, I can help you compare them based on how you prefer to take supplements.'
    },
    {
      test: 'Taste can vary because it is a natural product',
      reply: 'The taste can take a little getting used to 😊 Since it’s a natural product, people experience the taste differently. Some people mix it with fruit juice, and capsules are another option if you’d rather not taste the powder.\n\nAre you trying Barley for the first time?'
    },
    {
      test: 'The FAQ says the juice powder comes from young barley grass leaves',
      reply: 'Good question. 🌿 The juice powder comes from **young barley grass leaves**, not mature barley grain, and the product information states that the ingredients contain no gluten.\n\nIt also notes that people with grass allergies may rarely react. If you have a known allergy or have reacted before, please check with a healthcare professional before using it.'
    },
    {
      test: 'The FAQ says people taking medication should consider',
      reply: 'If you’re taking medication, I’d be a little more careful here. 😊 Medication interactions can vary from person to person and by medicine.\n\nSo the safest approach is to check with your healthcare professional before adding SANTÉ Barley to your routine.'
    },
    {
      test: 'The FAQ says there are no known adverse effects associated with SANTÉ Pure Barley and blood sugar levels',
      reply: 'If you’re asking about diabetes or blood sugar, the product information reports no known adverse effects associated with SANTÉ Pure Barley and blood sugar levels, while also advising people with concerns to consult their health practitioner.\n\nIf you take medication for blood sugar, please check with your healthcare professional before adding a supplement. 💚'
    },
    {
      test: 'The FAQ specifically advises people with kidney disorders',
      reply: 'This is one where I’d want you to be careful. 💚 People with kidney disorders, kidney disease, or renal failure are advised to consult their health practitioner because SANTÉ Barley contains potassium.\n\nThe nutritional analysis lists 214 mg of potassium in a 5-gram serving.\n\nIf this applies to you, please check with your healthcare professional before using it.'
    },
    {
      test: 'The FAQ says SANTÉ Pure Barley can be used as a prenatal supplement',
      reply: 'The product information says SANTÉ Pure Barley can be used as a prenatal supplement. 💚 Because pregnancy has individual nutritional and medical considerations, though, I’d recommend confirming it with your prenatal healthcare provider before using any supplement.'
    },
    {
      test: 'The FAQ describes SANTÉ Pure Barley as mildly alkaline',
      reply: 'The product information describes SANTÉ Pure Barley as mildly alkaline and says it may help settle the stomach. 😊\n\nIf you’re having persistent or severe stomach symptoms, though, it’s better to speak with a healthcare professional rather than rely on a supplement.'
    },
    {
      test: 'The FAQ says SANTÉ Pure Barley has traditionally been used to promote regularity',
      reply: 'SANTÉ Pure Barley has traditionally been used to support regularity. 🌿\n\nIf you’re dealing with persistent or severe diarrhea or constipation, though, please get medical advice rather than relying on a supplement alone.'
    },
    {
      test: 'Yes. The FAQ states that SANTÉ Pure Barley contains many enzymes',
      reply: 'Yes 😊 SANTÉ Pure Barley contains many enzymes, including digestive enzymes such as amylase.'
    },
    {
      test: 'The FAQ describes SANTÉ Barley as containing naturally occurring antioxidants',
      reply: 'Yes 🌿 SANTÉ Barley contains naturally occurring antioxidants and nutrients such as beta-carotene, chlorophyll, SOD, catalase, Lutonarin, Saponarin, polyphenol oxidase, vitamin E, phosphorus and zinc.\n\nThese are naturally occurring nutrients in the product rather than ingredients added to it.\n\nWant me to explain one of these nutrients in simple terms?'
    },
    {
      test: 'The FAQ describes barley juice as a whole-food supplement',
      reply: 'Sure! 🌿 Barley juice is described as a whole-food supplement containing naturally occurring vitamins, minerals, enzymes, protein, chlorophyll, antioxidants and other phytochemicals.\n\nThere are quite a few things we can talk about. 😊 What are you most curious about — **how to take it, what’s in it, or how it fits your routine?**'
    },
    {
      test: 'For general use, the FAQ gives 1 teaspoon (3g) twice a day',
      reply: 'For general use, the guidance is **1 teaspoon (3g) twice a day**, 30 minutes before a meal. 🥄🌿\n\nThere are higher serving suggestions in the supplied material for people who are ill, but I won’t recommend increasing the serving for illness. If that’s your situation, it’s better to get individualized guidance from a qualified healthcare professional.'
    },
    {
      test: 'The FAQ attributes symptoms such as fatigue, rash, headache',
      reply: 'I want to be careful with this one. 💚 The supplied product information attributes symptoms such as fatigue, rash, headache, nausea, vomiting, diarrhea, insomnia or constipation to a possible “cleansing/detoxification” reaction.\n\nThat explanation is a claim in the supplied material, not a medical diagnosis. If your symptoms are severe, persistent, worsening, or concerning, stop using the product and seek medical care.'
    },
    {
      test: 'The FAQ recommends not mixing SANTÉ Pure Barley with hot drinks',
      reply: 'For mixing, it’s best to avoid hot drinks, cranberry or prune juice, and carbonated drinks. 🌿 The product guidance says heat and acidity can affect enzymatic activity.\n\nIf you want the simplest option, cold or room-temperature water is the straightforward choice.'
    },
    {
      test: 'The FAQ recommends drinking the prepared SANTÉ Pure Barley soon after mixing',
      reply: 'Yes 😊 It’s best to drink it soon after mixing. The supplied guidance recommends consuming the prepared drink within about **20 minutes**.\n\nSo if you mix it, it’s better not to leave it sitting around for a long time.'
    }
  ];

  function humanize(text) {
    for (var i = 0; i < toneReplies.length; i++) {
      if (text.indexOf(toneReplies[i].test) !== -1) return toneReplies[i].reply;
    }
    return text;
  }

  function process(el) {
    if (!el || processed.has(el)) return;
    processed.add(el);
    var original = el.textContent || '';
    if (!original.trim()) return;

    if (original.indexOf('Kumusta! 👋 Welcome. I’m Lore’s SANTÉ Assistant.') === 0) {
      el.textContent = 'Hi! 👋 I’m Lore’s SANTÉ Wellness Assistant. Think of me as your quick guide while you explore the site. I can answer common Barley questions, help you explore products and the business opportunity, or point you to Lore when you’d like personal help. 😊\n\nYou can chat with me in English or Filipino. What would you like to know?';
      return;
    }

    var revised = humanize(original);
    if (revised !== original) el.textContent = revised;
  }

  function scan() {
    document.querySelectorAll('.lore-chat-message.bot').forEach(process);
  }

  function init() {
    scan();
    var observer = new MutationObserver(function () { scan(); });
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(scan, 300);
    setTimeout(scan, 1000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

/* Load the next conversation-polish layer after the existing tone layer. */
(function () {
  var s = document.createElement('script');
  s.src = 'chatbot-conversation-polish.js?v=20260903';
  document.head.appendChild(s);
})();
