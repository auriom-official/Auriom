import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const seoData = {
  default: {
    title: "AURIOM - India's #1 Ultimate Gadgets Brand | Smart Watches, Bluetooth Speakers, Tech Accessories",
    description: "AURIOM is India's fastest-growing ultimate gadgets brand. Shop smart watches, Bluetooth speakers, wireless chargers, power banks, and premium tech accessories. Free shipping, 1-year warranty, COD available.",
    keywords: "auriom, auriom india, auriom official, auriom.in, ultimate gadgets, gadgets, smart gadgets, tech brand, smart watches, bluetooth speakers, tech accessories, mobile accessories, premium gadgets, smart technology, wireless charger, power bank, best smart watch india, best bluetooth speaker india, buy gadgets online india, free shipping gadgets, cod gadgets, 1 year warranty, auriom smart watch review, best smart watch under 3000, best speaker under 2000, amoled smart watch, calling smart watch, fitness tracker, health watch, portable speaker, party speaker, bass speaker",
    url: "https://www.auriom.in",
    image: "https://www.auriom.in/assets/auriom.png"
  },
  shop: {
    title: "Shop All Ultimate Gadgets, Smart Watches & Tech Accessories | AURIOM India",
    description: "Explore AURIOM's wide range of premium ultimate gadgets including Smart Watches, Bluetooth Speakers, and tech accessories. Best prices, free shipping, COD available across India.",
    keywords: "shop gadgets online, auriom shop, buy smart watch online, buy bluetooth speaker, online gadget store india, online electronics store, smart gadgets shop, tech accessories shop, best deals gadgets, discount smart watch, sale gadgets, auriom products, auriom collection, auriom store, all products, shop all, browse gadgets, explore gadgets, filter by category, sort by price, smart watch collection, speaker collection, accessories collection, new arrivals, trending products, popular gadgets, top rated products, featured products, best price guarantee",
  },
  bestsellers: {
    title: "Top Rated Bestsellers - Most Loved Gadgets & Tech Accessories | AURIOM",
    description: "Discover AURIOM's most popular and highest-rated ultimate gadgets. Shop our bestselling smart watches, Bluetooth speakers, and accessories. Trusted by thousands of happy customers across India.",
    keywords: "auriom bestsellers, top rated gadgets, top smart watches, trending tech, best tech gifts, highest rated bluetooth speakers, auriom top products, most popular smart watch, best selling speaker, customer favorite gadgets, trending gadgets 2026, 5 star rated gadgets, top picks, staff favorites, editor choice, award winning gadgets, must have gadgets, best value gadgets, fan favorite, community pick, top 10 smart watch, top 10 speaker",
  },
  newLaunches: {
    title: "New Launches - Latest Ultimate Gadgets 2026 | AURIOM",
    description: "Be the first to own AURIOM's latest tech gadgets and smart wearables. Explore the newest, most innovative tech releases including smart watches with calling, and powerful Bluetooth speakers.",
    keywords: "new gadgets 2026, latest auriom products, latest smart watches, upcoming tech accessories, innovative gear, auriom new releases, freshly launched gadgets, just launched, new arrival, coming soon, pre order, new smart watch 2026, new speaker 2026, latest tech india, newest gadgets, fresh stock, just in, brand new, recently launched, first to market, exclusive launch, early access, new collection 2026",
  },
  about: {
    title: "About AURIOM - India's Fastest-Growing Ultimate Tech Brand",
    description: "Learn about AURIOM, India's fastest-growing smart tech brand. We engineer premium devices and wearables combining stunning design with cutting-edge technology. Our mission is to make world-class tech accessible to everyone.",
    keywords: "about auriom, auriom brand story, auriom history, indian tech startup, ultimate gadgets brand, smart wearables company, tech innovators india, auriom mission, auriom vision, auriom values, who is auriom, auriom founder, auriom team, auriom journey, made in india brand, indian gadget company, auriom quality, auriom design philosophy, tech of the future, auriom manufacturing, auriom innovation, auriom technology, auriom R&D",
  },
  contact: {
    title: "Contact AURIOM - Customer Support & Assistance | AURIOM India",
    description: "Reach out to AURIOM's customer support team for queries, complaints, warranty claims, or business inquiries. We're here to help via email, phone, and WhatsApp. Fast response guaranteed.",
    keywords: "contact auriom, auriom support, auriom customer care, auriom helpline, auriom email, auriom phone number, auriom whatsapp, auriom complaint, auriom feedback, reach auriom, talk to auriom, auriom address, auriom office, auriom headquarters, auriom service center, support@auriom.in, business inquiry auriom, bulk order auriom, corporate order auriom",
  },
  warranty: {
    title: "Warranty Registration & Claims | AURIOM India",
    description: "Register your AURIOM product warranty and submit claims easily. All AURIOM products come with a 1-year manufacturer warranty. Free doorstep service available across India.",
    keywords: "auriom warranty, warranty registration, warranty claim, product registration, 1 year warranty, manufacturer warranty, auriom guarantee, auriom replacement, auriom repair, free warranty, warranty policy, how to claim warranty, warranty process, warranty terms, warranty coverage, defective product, faulty product, product issue, warranty support",
  },
  returnPolicy: {
    title: "Return & Refund Policy | AURIOM India",
    description: "Read AURIOM's return and refund policy. Easy 2-day return window for all products. Hassle-free returns and quick refunds. Your satisfaction is our priority.",
    keywords: "auriom return policy, auriom refund, return product, exchange product, refund policy, how to return, return process, easy return, hassle free return, 2 day return, return window, refund timeline, money back, exchange policy, damaged product return, wrong product received",
  },
  terms: {
    title: "Terms & Conditions | AURIOM India",
    description: "Read the terms and conditions of using the AURIOM website and purchasing products. Understand your rights as a customer.",
    keywords: "auriom terms, terms and conditions, user agreement, purchase terms, website terms, legal terms, conditions of use, terms of service, auriom policies",
  },
  privacy: {
    title: "Privacy Policy | AURIOM India",
    description: "Learn how AURIOM collects, uses, and protects your personal data. We are committed to your privacy and data security.",
    keywords: "auriom privacy policy, data protection, personal data, privacy, data security, cookie policy, information collection, data usage, auriom data, privacy notice, gdpr, data privacy",
  },
  corporateGifting: {
    title: "Corporate Gifting Solutions - Premium Tech Gifts | AURIOM",
    description: "Explore AURIOM's corporate gifting solutions. Premium smart watches and speakers perfect for employee gifts, client appreciation, and festive gifting. Bulk discounts available.",
    keywords: "corporate gifting, corporate gifts, bulk order, employee gifts, client gifts, business gifts, premium gifts, tech gifts, gadget gifts, festive gifts, diwali corporate gifts, christmas corporate gifts, auriom bulk order, auriom corporate, branded gifts, custom gifts, engraved gifts, gift hamper, gift set, gift combo, corporate discount, wholesale gadgets",
  },
  blog: {
    title: "Tech Blog - Latest Gadget News & Reviews | AURIOM",
    description: "Read the latest tech news, gadget reviews, buying guides, and tech tips on the AURIOM blog. Stay updated with the newest technology trends.",
    keywords: "tech blog, gadget blog, smart watch review, speaker review, buying guide, tech news, tech tips, technology trends, gadget comparison, best of 2026, tech guide, product review, unboxing, hands on review",
  },
  news: {
    title: "Latest News & Announcements | AURIOM India",
    description: "Stay updated with the latest news, product launches, partnerships, and announcements from AURIOM. Be the first to know about our newest innovations.",
    keywords: "auriom news, auriom updates, auriom announcement, product launch, new product, auriom partnership, auriom event, press release, media coverage, auriom in news, auriom collaboration",
  },
  serviceCenters: {
    title: "Service Centers - Find Nearest AURIOM Repair Center | AURIOM India",
    description: "Find the nearest AURIOM service center for warranty claims, repairs, and product support. Authorized service centers across India with expert technicians.",
    keywords: "auriom service center, service center near me, repair center, warranty service, product repair, auriom repair, authorized service, expert technician, doorstep service, pickup service, auriom support center, nearest auriom store",
  }
};

const SEO = ({ title, description, keywords, image, url, type = 'website' }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  let meta = seoData.default;

  if (currentPath === '/shop') meta = { ...meta, ...seoData.shop };
  else if (currentPath === '/bestsellers') meta = { ...meta, ...seoData.bestsellers };
  else if (currentPath === '/new-launches') meta = { ...meta, ...seoData.newLaunches };
  else if (currentPath === '/about') meta = { ...meta, ...seoData.about };
  else if (currentPath === '/contact') meta = { ...meta, ...seoData.contact };
  else if (currentPath === '/warranty') meta = { ...meta, ...seoData.warranty };
  else if (currentPath === '/return-policy') meta = { ...meta, ...seoData.returnPolicy };
  else if (currentPath === '/terms') meta = { ...meta, ...seoData.terms };
  else if (currentPath === '/privacy') meta = { ...meta, ...seoData.privacy };
  else if (currentPath === '/corporate-gifting') meta = { ...meta, ...seoData.corporateGifting };
  else if (currentPath === '/blog') meta = { ...meta, ...seoData.blog };
  else if (currentPath === '/news') meta = { ...meta, ...seoData.news };
  else if (currentPath === '/service-centers') meta = { ...meta, ...seoData.serviceCenters };

  // Override with props if provided (e.g. for dynamic product pages)
  const finalTitle = title || meta.title;
  const finalDescription = description || meta.description;
  const finalKeywords = keywords || meta.keywords;
  const finalImage = image || meta.image;
  const finalUrl = url || `${meta.url}${currentPath}`;

  useEffect(() => {
    document.title = finalTitle;
    
    const setMetaTag = (selector, content) => {
      let tag = document.querySelector(selector);
      if (tag) {
        tag.setAttribute('content', content);
      }
    };

    setMetaTag('meta[name="description"]', finalDescription);
    setMetaTag('meta[name="keywords"]', finalKeywords);
    
    // Open Graph
    setMetaTag('meta[property="og:title"]', finalTitle);
    setMetaTag('meta[property="og:description"]', finalDescription);
    setMetaTag('meta[property="og:image"]', finalImage);
    setMetaTag('meta[property="og:url"]', finalUrl);
    setMetaTag('meta[property="og:type"]', type);
    
    // Twitter
    setMetaTag('meta[name="twitter:title"]', finalTitle);
    setMetaTag('meta[name="twitter:description"]', finalDescription);
    setMetaTag('meta[name="twitter:image"]', finalImage);
    
    // Canonical
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', finalUrl);

  }, [finalTitle, finalDescription, finalKeywords, finalImage, finalUrl, type]);

  return null;
};

export default SEO;
