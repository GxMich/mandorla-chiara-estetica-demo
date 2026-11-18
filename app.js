(() => {
  "use strict";
  const config = window.LANDING_CONFIG || {};
  const setText = (selector, value) => {
    if (value === undefined || value === null || value === "") return;
    document.querySelectorAll(selector).forEach(node => { node.textContent = String(value); });
  };
  document.querySelectorAll("[data-copy]").forEach(node => {
    const value = config[node.dataset.copy];
    if (value) node.textContent = value;
  });
  setText("[data-discount]", config.discount != null ? config.discount : 20);
  setText("[data-location]", config.location);
  setText("[data-address]", config.address);
  setText("[data-business]", config.businessName);
  setText("[data-notice]", config.campaignNotice);
  setText("[data-year]", new Date().getFullYear());
  document.querySelectorAll("[data-wordmark]").forEach(link => {
    link.setAttribute("aria-label", `${config.businessName || "Centro estetico"}, torna all'inizio`);
  });

  document.title = config.pageTitle || `${config.campaignLabel || "Trattamenti viso"} | ${config.businessName || "Centro estetico"}`;
  const description = document.querySelector('meta[name="description"]');
  if (description && config.metaDescription) description.content = config.metaDescription;
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.content = document.title;
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription && description) ogDescription.content = description.content;
  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage && config.images && config.images.promotion) {
    ogImage.content = new URL(config.images.promotion, window.location.href).href;
  }
  document.querySelectorAll("[data-image]").forEach(img => {
    const images = config.images || {};
    const source = images[img.dataset.image];
    if (source) img.src = source;
    if (img.dataset.image === "hero" && images.heroSmall && images.hero) {
      img.srcset = `${images.heroSmall} 640w, ${images.hero} 1024w`;
    }
  });

  const phone = String(config.phone || "").replace(/[^+\d]/g, "");
  document.querySelectorAll("[data-call], [data-phone]").forEach(link => {
    if (!phone) { link.hidden = true; return; }
    link.href = `tel:${phone}`;
    link.setAttribute("aria-label", `Chiama il centro al ${config.phone}`);
    if (link.hasAttribute("data-phone")) link.textContent = config.phone;
  });
  document.querySelectorAll("[data-email]").forEach(link => {
    if (!config.email) { link.hidden = true; return; }
    link.href = `mailto:${config.email}`;
    link.textContent = config.email;
  });
  // Sito dimostrativo: WhatsApp, prenotazione online e mappa non aprono niente.
  // Al clic compare un avviso che spiega cosa succederebbe con un'attività reale.
  const toast = document.querySelector("[data-demo-toast]");
  const notices = config.demoNotice || {};
  let toastTimer;
  const showNotice = text => {
    if (!toast || !text) return;
    toast.textContent = text;
    toast.hidden = false;
    requestAnimationFrame(() => toast.classList.add("is-visible"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("is-visible");
      setTimeout(() => { toast.hidden = true; }, 250);
    }, 5200);
  };
  const simulate = (selector, key, label) => {
    document.querySelectorAll(selector).forEach(link => {
      link.href = "#";
      link.removeAttribute("target");
      if (label) link.setAttribute("aria-label", label);
      link.addEventListener("click", event => { event.preventDefault(); showNotice(notices[key]); });
    });
  };
  simulate("[data-whatsapp]", "whatsapp", "Scrivi al centro su WhatsApp (simulato)");
  simulate("[data-booking]", "booking");
  simulate("[data-directions]", "directions");

  const sticky = document.querySelector("[data-sticky-cta]");
  const heroActions = document.querySelector("[data-sticky-trigger]");
  const finalActions = document.querySelector("[data-final-actions]");
  if (!sticky || !heroActions) return;
  const mobile = window.matchMedia("(max-width: 760px)");
  const updateSticky = () => {
    const heroAbove = heroActions.getBoundingClientRect().bottom < 0;
    const finalRect = finalActions ? finalActions.getBoundingClientRect() : null;
    const finalVisible = finalRect && finalRect.bottom > 0 && finalRect.top < window.innerHeight;
    const visible = Boolean(mobile.matches && heroAbove && !finalVisible);
    sticky.classList.toggle("is-visible", visible);
    sticky.setAttribute("aria-hidden", String(!visible));
    sticky.inert = !visible;
  };
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(updateSticky, { threshold: [0, 0.1, 1] });
    observer.observe(heroActions);
    if (finalActions) observer.observe(finalActions);
  } else {
    let scheduled = false;
    window.addEventListener("scroll", () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => { updateSticky(); scheduled = false; });
    }, { passive: true });
  }
  window.addEventListener("resize", updateSticky, { passive: true });
  updateSticky();
})();
