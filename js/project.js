/* Fills project.html from js/projects.js using the ?p=slug in the link. */
(function () {
  "use strict";

  var list = window.PROJECTS || [];
  var programs = window.PROGRAMS || {};
  var slug = new URLSearchParams(window.location.search).get("p");
  var p = list.filter(function (x) { return x.slug === slug; })[0];
  if (!p) { window.location.replace("index.html#work"); return; }

  function el(id) { return document.getElementById(id); }

  var cat = p.kind === "graphic" ? "Graphic Design" : "Video Production";
  document.title = p.title + " — Isabella Sommers";

  // Title + category + year
  el("project-title").textContent = p.title;
  var catEl = el("project-category");
  catEl.classList.add(p.kind === "graphic" ? "cat-graphic" : "cat-video");
  catEl.querySelector(".cat-label").textContent = cat;
  if (p.year) {
    el("project-year").textContent = p.year;
  } else {
    el("project-year").remove();
    var sep = document.querySelector(".meta-sep");
    if (sep) sep.remove();
  }

  // Tool pills
  var tags = el("project-tags");
  (p.tools || []).forEach(function (t) {
    var s = document.createElement("span");
    s.className = "tag";
    s.textContent = t;
    tags.appendChild(s);
  });

  // Two text columns: project (left) + program (right)
  el("project-desc").textContent = p.description || "";
  var programText = p.program ? programs[p.program] : "";
  if (programText) el("project-program").textContent = programText;
  else el("project-program").remove();
  if (!p.description && !programText) el("project-copy").remove();

  // Media
  var frame = el("media-frame");
  var inner = el("media-inner");
  var aspect = p.aspect || "16 / 9";
  inner.style.setProperty("--aspect", aspect);
  var parts = aspect.split("/").map(function (n) { return parseFloat(n); });
  if (parts.length === 2 && parts[1] > parts[0]) frame.classList.add("is-tall");

  var m = window.PortfolioMedia ? window.PortfolioMedia.parseLink(p.link) : null;
  if (m) {
    inner.innerHTML = "";
    var iframe = document.createElement("iframe");
    iframe.src = m.embed;
    iframe.title = p.title;
    iframe.allow = "autoplay; fullscreen; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.loading = "lazy";
    inner.appendChild(iframe);

    var open = el("media-open");
    open.href = m.open;
    open.querySelector(".open-label").textContent = m.openLabel;
    open.hidden = false;
  }
})();
