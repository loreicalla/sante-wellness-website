/* Conversation polish for Lore’s SANTÉ Assistant.
   Keeps the existing chatbot and FAQ engine intact.
   This layer only improves fallback conversations and unsupported-question handling. */
(function () {
  'use strict';

  var processed = new WeakSet();

  function getLastUserMessage() {
    var users = document.querySelectorAll('.lore-chat-message.user');
    return users.length ? (users[users.length - 1].textContent || '').trim().toLowerCase() : '';
  }

  function getReplacement(botText) {
    var userText = getLastUserMessage();

    /* Athlete / sports-person question: the supplied FAQ does not specifically address this. */
    if (/sport|athlete|athletic|workout|gym|training/.test(userText)) {
      return 'Yes, I understand what you mean 😊 If you’re asking whether a sports person can take SANTÉ Barley, the FAQ doesn’t specifically give athlete or sports-specific guidance. It describes Barley as a whole-food supplement with naturally occurring nutrients, rather than as a sports supplement. 🌿\n\nSo I wouldn’t want to promise a special performance benefit for athletes. If you have a medical condition, take medication, or follow a specific sports nutrition plan, it’s best to check with your healthcare professional or sports nutritionist.\n\nAre you asking because you’re currently training, or because you’re looking for something to add to your daily nutrition routine?';
    }

    /* Replace the old FAQ-style fallback with a human, transparent response. */
    if (/I can answer many common SANTÉ Barley questions from our FAQ/i.test(botText) || /Try asking things like/i.test(botText)) {
      return 'Hmm, good question! 😊 I can help with SANTÉ products, Barley, ordering, and the business opportunity. If your question is something very specific, I’ll do my best to help without guessing.\n\nYou can simply ask me naturally — no need to use a particular format. 🌿';
    }

    return null;
  }

  function process(el) {
    if (!el || processed.has(el)) return;
    processed.add(el);
    var original = el.textContent || '';
    if (!original.trim()) return;
    var replacement = getReplacement(original);
    if (replacement) el.textContent = replacement;
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
