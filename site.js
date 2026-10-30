// Página de vendas: patentes, tipos de trilha e os links do config.js.
(function () {
  var C = window.CPM_SITE || {};

  // Patentes (as mesmas do app): missões + questões no total para chegar a cada uma.
  var ranks = [
    ["Soldado", "começo", { stripes: 0 }], ["Cabo", "1 missão + 20 questões", { stripes: 2 }],
    ["3º Sargento", "2 missões + 40 questões", { stripes: 3 }], ["2º Sargento", "3 missões + 60 questões", { stripes: 3, arcs: 1 }],
    ["1º Sargento", "5 missões + 85 questões", { stripes: 3, arcs: 2 }], ["Subtenente", "7 missões + 110 questões", { triangle: true }],
    ["2º Tenente", "9 missões + 140 questões", { stars: 1 }], ["1º Tenente", "12 missões + 170 questões", { stars: 2 }],
    ["Capitão", "15 missões + 205 questões", { stars: 3 }], ["Major", "18 missões + 240 questões", { stars: 1, field: true }],
    ["Tenente-Coronel", "22 missões + 280 questões", { stars: 2, field: true }], ["Coronel", "26 missões + 320 questões", { stars: 3, field: true }],
  ];
  function insignia(i) {
    var g = "#e1ad66", parts = ['<path d="M4 14 Q4 3 20 3 Q36 3 36 14 L36 61 L4 61 Z" fill="#1a2547" stroke="' + g + '" stroke-width="2.5"/><circle cx="20" cy="11" r="4" fill="' + g + '"/>'];
    var k;
    if (i.stripes) for (k = 0; k < i.stripes; k++) parts.push('<path d="M8 ' + (30 + k * 8) + ' L20 ' + (22 + k * 8) + ' L32 ' + (30 + k * 8) + '" fill="none" stroke="' + g + '" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>');
    if (i.arcs) for (k = 0; k < i.arcs; k++) parts.push('<path d="M9 ' + (52 + k * 5) + ' Q20 ' + (58 + k * 5) + ' 31 ' + (52 + k * 5) + '" fill="none" stroke="' + g + '" stroke-width="2.6"/>');
    if (i.triangle) parts.push('<path d="M20 22 L30 40 L10 40 Z" fill="' + g + '"/>');
    if (i.stars) for (k = 0; k < i.stars; k++) parts.push('<text x="20" y="' + (32 + k * 10) + '" text-anchor="middle" font-size="11" fill="' + g + '">★</text>');
    if (i.field) parts.push('<rect x="7" y="52" width="26" height="5" rx="1.5" fill="' + g + '"/>');
    return '<svg viewBox="0 0 40 64" aria-hidden="true">' + parts.join("") + "</svg>";
  }
  var box = document.getElementById("ranks");
  if (box) box.innerHTML = ranks.map(function (r) { return '<div class="rank">' + insignia(r[2]) + "<b>" + r[0] + "</b><small>" + r[1] + "</small></div>"; }).join("");

  // Tipos de trilha (números reais do app).
  var T = {
    curta: { q: 279, r: 7, para: "Para quem está perto da prova: 9 questões por missão e uma revisão a cada 4 missões." },
    media: { q: 434, r: 10, para: "O meio-termo: 14 questões por missão (com Treino extra), revisão a cada 3 missões e o slide “Como caiu na prova”." },
    longa: { q: 558, r: 15, para: "Para quem começa cedo: o dobro de questões (18 por missão), revisão a cada 2 missões e mais slides para pensar." },
  };
  function pick(t) {
    document.querySelectorAll(".tabs button").forEach(function (b) { b.setAttribute("aria-selected", String(b.dataset.t === t)); });
    document.getElementById("t-q").textContent = T[t].q;
    document.getElementById("t-r").textContent = T[t].r;
    document.getElementById("t-for").textContent = T[t].para;
  }
  document.querySelectorAll(".tabs button").forEach(function (b) { b.addEventListener("click", function () { pick(b.dataset.t); }); });
  pick("media");

  // Links do config.js: lista de espera, checkout, contato, privacidade.
  if (C.waitlistUrl) {
    document.querySelectorAll('a[href="#lista"]').forEach(function (a) { if (!a.dataset.checkout) { a.href = C.waitlistUrl; a.target = "_blank"; a.rel = "noopener"; } });
    var b = document.getElementById("btn-lista"); b.href = C.waitlistUrl; b.target = "_blank"; b.rel = "noopener";
    document.getElementById("lista-em-breve").hidden = true;
  } else {
    document.getElementById("btn-lista").hidden = true;
  }
  var anyCheckout = false;
  document.querySelectorAll("[data-checkout]").forEach(function (a) {
    var url = C[a.dataset.checkout];
    if (url) { a.href = url; a.target = "_blank"; a.rel = "noopener"; a.textContent = "Assinar"; anyCheckout = true; }
    else if (C.waitlistUrl) { a.href = C.waitlistUrl; a.target = "_blank"; a.rel = "noopener"; }
  });
  if (anyCheckout) document.getElementById("planos-aviso").hidden = true;
  var email = document.getElementById("contato-email"), zap = document.getElementById("contato-zap");
  if (C.email) email.innerHTML = '<a href="mailto:' + C.email + '">' + C.email + "</a>"; else email.hidden = true;
  if (C.whatsapp) zap.innerHTML = '<a href="https://wa.me/55' + C.whatsapp + '" target="_blank" rel="noopener">WhatsApp</a>'; else zap.hidden = true;
  document.getElementById("contato-vazio").hidden = !!(C.email || C.whatsapp);
  if (C.appUrl) document.getElementById("link-privacidade").href = C.appUrl + "/privacidade";
})();
