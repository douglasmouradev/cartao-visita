(() => {
  const PORTFOLIO = "https://portifolio-douglas-moura.vercel.app/";
  const WHATSAPP =
    "https://wa.me/5571997087082?text=Ol%C3%A1%20Douglas%2C%20vim%20pelo%20seu%20cart%C3%A3o%20de%20visita.";

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

  renderQr("qr-portfolio", PORTFOLIO);
  renderQr("qr-whatsapp", WHATSAPP);
})();
