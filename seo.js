/* Additive SEO layer for the public homepage. */
(function () {
  const siteUrl = 'https://santewithlore.com/';
  const title = 'SANTÉ Wellness Products & Business Opportunity | Lore';
  const description = 'Explore SANTÉ wellness products, coffee, beauty and personal care, and learn about a flexible business opportunity with Lore.';
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

  setMeta('meta[name="description"]', 'content', description);
  setMeta('meta[property="og:title"]', 'content', title);
  setMeta('meta[property="og:description"]', 'content', description);
  setMeta('meta[property="og:url"]', 'content', siteUrl);
  setMeta('meta[property="og:image"]', 'content', image);
  setMeta('meta[property="og:image:secure_url"]', 'content', image);
  setMeta('meta[property="og:image:alt"]', 'content', 'SANTÉ Wellness with Lore');
  setMeta('meta[name="twitter:title"]', 'content', title);
  setMeta('meta[name="twitter:description"]', 'content', description);
  setMeta('meta[name="twitter:image"]', 'content', image);

  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = siteUrl;

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
          '@type': 'WebPage',
          '@id': siteUrl + '#webpage',
          url: siteUrl,
          name: title,
          description: description,
          isPartOf: { '@id': siteUrl + '#website' },
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
})();
