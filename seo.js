/* SEO layer for the public homepage. */
(function () {
  const siteUrl = 'https://santewithlore.com/';
  const title = 'SANTÉ Wellness Products, SANTÉ Barley & Business Opportunity | Lore';
  const description = 'Explore SANTÉ wellness products, including SANTÉ Barley, coffee, beauty and personal care, and learn about a flexible business opportunity with Lore.';
  const image = 'https://santewithlore.com/images2/ChatGPT%20Image%20Aug%2023%2C%202026%2C%2001_02_35%20PM.png';

  document.title = title;

  function setMeta(selector, attribute, value) {
    let el = document.head.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      const match = selector.match(/\[([^=]+)="([^"]+)"\]/);
      if (match) el.setAttribute(match[1], match[2]);
      document.head.appendChild(el);
    }
    el.setAttribute(attribute, value);
  }

  function setLink(rel, href) {
    let el = document.head.querySelector('link[rel="' + rel + '"]');
    if (!el) {
      el = document.createElement('link');
      el.rel = rel;
      document.head.appendChild(el);
    }
    el.href = href;
  }

  setMeta('meta[name="description"]', 'content', description);
  setMeta('meta[name="robots"]', 'content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  setMeta('meta[property="og:title"]', 'content', title);
  setMeta('meta[property="og:description"]', 'content', description);
  setMeta('meta[property="og:type"]', 'content', 'website');
  setMeta('meta[property="og:url"]', 'content', siteUrl);
  setMeta('meta[property="og:site_name"]', 'content', 'SANTÉ Wellness with Lore');
  setMeta('meta[property="og:image"]', 'content', image);
  setMeta('meta[property="og:image:secure_url"]', 'content', image);
  setMeta('meta[property="og:image:alt"]', 'content', 'SANTÉ Wellness products and business opportunity with Lore');
  setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
  setMeta('meta[name="twitter:title"]', 'content', title);
  setMeta('meta[name="twitter:description"]', 'content', description);
  setMeta('meta[name="twitter:image"]', 'content', image);
  setMeta('meta[name="twitter:image:alt"]', 'content', 'SANTÉ Wellness products and business opportunity with Lore');
  setMeta('meta[name="theme-color"]', 'content', '#1f7a4d');

  setLink('canonical', siteUrl);
  setLink('alternate', siteUrl);
  const alternate = document.head.querySelector('link[rel="alternate"]');
  if (alternate) alternate.setAttribute('hreflang', 'en');

  if (!document.getElementById('website-structured-data')) {
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': siteUrl + '#website',
          url: siteUrl,
          name: 'SANTÉ Wellness with Lore',
          description: description,
          inLanguage: 'en'
        },
        {
          '@type': 'Organization',
          '@id': siteUrl + '#organization',
          name: 'SANTÉ Wellness with Lore',
          url: siteUrl,
          logo: 'https://santewithlore.com/images1/sante-logo.jpg',
          description: 'An independent SANTÉ wellness information and partner resource hosted by Lore.',
          areaServed: 'Worldwide'
        },
        {
          '@type': 'WebPage',
          '@id': siteUrl + '#webpage',
          url: siteUrl,
          name: title,
          description: description,
          isPartOf: { '@id': siteUrl + '#website' },
          about: { '@id': siteUrl + '#organization' },
          primaryImageOfPage: image,
          inLanguage: 'en'
        }
      ]
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'website-structured-data';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  if (!document.querySelector('script[data-lore-chatbot]')) {
    const chatbot = document.createElement('script');
    chatbot.src = 'chatbot.js';
    chatbot.defer = true;
    chatbot.setAttribute('data-lore-chatbot', 'true');
    document.body.appendChild(chatbot);
  }
})();
