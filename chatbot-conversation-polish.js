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

  function addExpertButtons(el) {
    if (!el || el.querySelector('.lore-expert-contact')) return;

    var wrap = document.createElement('div');
    wrap.className = 'lore-expert-contact';
    wrap.style.cssText = 'display:flex;flex-wrap:wrap;gap:10px;margin-top:14px;';

    var whatsapp = document.createElement('a');
    whatsapp.href = 'https://wa.me/639613552176';
    whatsapp.target = '_blank';
    whatsapp.rel = 'noopener noreferrer';
    whatsapp.textContent = '💬 WhatsApp Lore';
    whatsapp.style.cssText = 'display:inline-flex;align-items:center;justify-content:center;padding:11px 16px;border-radius:999px;background:#3f7f55;color:#fff;text-decoration:none;font-weight:700;font-size:14px;';

    var viber = document.createElement('a');
    viber.href = 'viber://chat?number=%2B639613552176';
    viber.textContent = '💜 Viber Lore';
    viber.style.cssText = 'display:inline-flex;align-items:center;justify-content:center;padding:11px 16px;border-radius:999px;background:#fff;color:#3f7f55;text-decoration:none;font-weight:700;font-size:14px;border:1px solid #d6e2da;';

    wrap.appendChild(whatsapp);
    wrap.appendChild(viber);
    el.appendChild(wrap);
  }

  function getReplacement(botText) {
    var userText = getLastUserMessage();

    /* Athlete / sports-person question: the supplied FAQ does not specifically address this. */
    if (/sport|athlete|athletic|workout|gym|training/.test(userText)) {
      return 'Yes, I understand what you mean 😊 If you’re asking whether a sports person can take SANTÉ Barley, the FAQ doesn’t specifically give athlete or sports-specific guidance. It describes Barley as a whole-food supplement with naturally occurring nutrients, rather than as a sports supplement. 🌿\n\nSo I wouldn’t want to promise a special performance benefit for athletes. If you have a medical condition, take medication, or follow a specific sports nutrition plan, it’s best to check with your healthcare professional or sports nutritionist.\n\nAre you asking because you’re currently training, or because you’re looking for something to add to your daily nutrition routine?';
    }

    /* Escalate questions that the bot cannot answer confidently to Lore the expert. */
    if (/I can answer many common SANTÉ Barley questions from our FAQ/i.test(botText) || /Try asking things like/i.test(botText)) {
      return 'Hmm, that’s a question I don’t want to guess on. 😊 I want to make sure your concern is addressed properly.\n\nPlease talk directly to Lore, the SANTÉ Wellness expert, via WhatsApp or Viber, and she can assist you personally. 💚\n\nYour concern deserves a proper answer — and Lore can help you right away.';
    }

    return null;
  }

  function process(el) {
    if (!el || processed.has(el)) return;
    processed.add(el);
    var original = el.textContent || '';
    if (!original.trim()) return;
    var replacement = getReplacement(original);
    if (replacement) {
      el.textContent = replacement;
      if (/I want to make sure your concern is addressed properly/i.test(replacement)) {
        addExpertButtons(el);
      }
    }
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
