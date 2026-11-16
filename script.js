(() => {
  const PORTFOLIO = "https://portifolio-douglas-moura.vercel.app/";
  const WHATSAPP_BASE = "https://wa.me/5571997087082";
  const LANG_KEY = "cartao-lang";
  const PORTFOLIO_LANG_KEY = "portfolio-lang";

  const translations = {
    pt: {
      status: "Disponível para projetos",
      role: "Dev Full Stack · Sites & Sistemas",
      pitch: "Do briefing à publicação — Help Desk, CRM e produtos em produção.",
      portfolio: "Ver portfólio",
      whatsapp: "WhatsApp",
      qrPortfolio: "Portfólio",
      qrWhatsapp: "WhatsApp",
      actionsAria: "Contatos principais",
      qrAria: "QR Codes para compartilhar",
      langAria: "Idioma",
      title: "Douglas Moura · Cartão de Visita",
      description:
        "Cartão de visita digital de Douglas Moura — Dev Full Stack. Portfólio e WhatsApp.",
      ogDescription:
        "Sites e sistemas do briefing à publicação. Fale no WhatsApp ou veja o portfólio.",
      waText: "Olá Douglas, vim pelo seu cartão de visita.",
    },
    en: {
      status: "Available for projects",
      role: "Full Stack Dev · Websites & Systems",
      pitch: "From briefing to launch — Help Desk, CRM, and products in production.",
      portfolio: "View portfolio",
      whatsapp: "WhatsApp",
      qrPortfolio: "Portfolio",
      qrWhatsapp: "WhatsApp",
      actionsAria: "Main contacts",
      qrAria: "QR codes to share",
      langAria: "Language",
      title: "Douglas Moura · Business Card",
      description:
        "Douglas Moura digital business card — Full Stack Dev. Portfolio and WhatsApp.",
      ogDescription:
        "Websites and systems from briefing to launch. Message on WhatsApp or view the portfolio.",
      waText: "Hi Douglas, I found you through your business card.",
    },
  };

  function detectLang() {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === "pt" || saved === "en") return saved;
    const nav = (navigator.language || "pt").toLowerCase();
    return nav.startsWith("pt") ? "pt" : "en";
  }

  let currentLang = detectLang();

  function whatsappUrl(lang) {
    const text = encodeURIComponent(translations[lang].waText);
    return `${WHATSAPP_BASE}?text=${text}`;
  }

  function setMeta(selector, content) {
    const el = document.querySelector(selector);
    if (el && content) el.setAttribute("content", content);
  }

  function applyLanguage(lang) {
    const t = translations[lang];
    if (!t) return;
    currentLang = lang;

    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    document.title = t.title;
    setMeta('meta[name="description"]', t.description);
    setMeta('meta[property="og:description"]', t.ogDescription);
    setMeta('meta[property="og:title"]', t.title);
    setMeta('meta[property="og:locale"]', lang === "pt" ? "pt_BR" : "en_US");

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key && t[key]) el.textContent = t[key];
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      if (key && t[key]) el.setAttribute("aria-label", t[key]);
    });

    const langToggle = document.querySelector(".lang-toggle");
    if (langToggle) langToggle.setAttribute("aria-label", t.langAria);

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });

    const waBtn = document.getElementById("btn-whatsapp");
    if (waBtn) waBtn.href = whatsappUrl(lang);
    renderQr("qr-whatsapp", whatsappUrl(lang));

    localStorage.setItem(LANG_KEY, lang);
    localStorage.setItem(PORTFOLIO_LANG_KEY, lang);
  }

  function renderQr(elementId, text) {
    const host = document.getElementById(elementId);
    if (!host || typeof qrcode !== "function") return;

    const qr = qrcode(0, "M");
    qr.addData(text);
    qr.make();
    host.innerHTML = qr.createImgTag(4, 0);
    const img = host.querySelector("img");
    if (img) {
      img.alt = "";
      img.width = 96;
      img.height = 96;
    }
  }

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      if (lang === "pt" || lang === "en") applyLanguage(lang);
    });
  });

  applyLanguage(currentLang);
  renderQr("qr-portfolio", PORTFOLIO);
  renderQr("qr-whatsapp", whatsappUrl(currentLang));
})();
