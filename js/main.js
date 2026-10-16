/* Shared behaviour: mobile menu, word stagger, scroll reveals, work grid. */
(function () {
  "use strict";

  var ICON_VIDEO = '<svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M10 8.5v7l6-3.5z"/></svg>';
  var ICON_IMAGE = '<svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="1.6"/><path d="M21 16l-5-5-8 9"/></svg>';
  var ICON_PLUS = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function isVideoFile(src) { return /\.(mp4|webm|mov|m4v)(\?|$)/i.test(src || ""); }
  function categoryOf(p) { return p.kind === "graphic" ? "Graphic Design" : "Video Production"; }

  /* ---------- Always start at the top ----------
     Browsers restore the last scroll position on reload (and Live Server reloads on save),
     and a #section in the address would also jump there. We take control:
     - plain open / refresh → top of the page
     - arriving with a #section (e.g. "Back to work" from a project page) → that section once,
       then the #section is removed so a refresh starts at the top again
     - nav links scroll smoothly without adding #section to the address */
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var target = null;
    try { target = document.querySelector(a.getAttribute("href")); } catch (err) { return; }
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  });

  var arrivalTarget = null;
  if (window.location.hash) {
    try { arrivalTarget = document.querySelector(window.location.hash); } catch (err) { arrivalTarget = null; }
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }
  function settleScroll() {
    // Jump instantly (never animate) so the browser's own scroll restore can't win the race.
    var root = document.documentElement;
    var prev = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    if (arrivalTarget) arrivalTarget.scrollIntoView({ block: "start" });
    else window.scrollTo(0, 0);
    root.style.scrollBehavior = prev;
  }
  // Run once the work grid exists (end of this script), again after everything loads,
  // and twice more just after, because some browsers restore the old position late.
  window.addEventListener("load", function () {
    settleScroll();
    setTimeout(settleScroll, 60);
    setTimeout(settleScroll, 250);
  });
  // Safari/Chrome back-forward cache: the page can come back without reloading.
  window.addEventListener("pageshow", function (e) { if (e.persisted) settleScroll(); });

  /* ---------- Mobile menu ---------- */
  var btn = document.querySelector(".menu-btn");
  var menu = document.getElementById("mobile-menu");
  if (btn && menu) {
    var label = btn.querySelector(".menu-label");
    var setOpen = function (open) {
      btn.setAttribute("aria-expanded", String(open));
      menu.hidden = !open;
      if (label) label.textContent = open ? "Close" : "Menu";
    };
    btn.addEventListener("click", function () { setOpen(menu.hidden); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !menu.hidden) { setOpen(false); btn.focus(); } });
  }

  /* ---------- Word-by-word stagger delays ---------- */
  document.querySelectorAll("[data-stagger]").forEach(function (el) {
    var parts = el.getAttribute("data-stagger").split(",");
    var base = parseFloat(parts[0]) || 0, step = parseFloat(parts[1]) || 0.06;
    el.querySelectorAll(".word").forEach(function (w, i) {
      w.style.animationDelay = (base + i * step).toFixed(2) + "s";
    });
  });

  /* ---------- Scroll reveals ---------- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  function showWith(el) {
    el.classList.add("is-visible");
    if (el.id) {
      document.querySelectorAll('[data-reveal-with="#' + el.id + '"]').forEach(function (b) { b.classList.add("is-visible"); });
    }
  }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { showWith(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.5, rootMargin: "0px 0px -15% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(showWith);
  }

  /* ---------- Logo carousel: whole-pixel loop ----------
     The CSS slides the strip by exactly one group. Rounding each group up to a whole
     number of pixels makes the frames just before and after each restart pixel-identical. */
  var groups = Array.prototype.slice.call(document.querySelectorAll(".marquee-group"));
  if (groups.length) {
    var snapGroups = function () {
      groups.forEach(function (g) { g.style.width = ""; });
      var w = Math.ceil(groups[0].getBoundingClientRect().width);
      if (w) groups.forEach(function (g) { g.style.width = w + "px"; });
    };
    var logoImgs = Array.prototype.slice.call(groups[0].querySelectorAll("img"));
    Promise.all(logoImgs.map(function (img) {
      return img.complete ? Promise.resolve() : new Promise(function (r) {
        img.addEventListener("load", r, { once: true });
        img.addEventListener("error", r, { once: true });
      });
    })).then(snapGroups);
    var snapTimer;
    window.addEventListener("resize", function () { clearTimeout(snapTimer); snapTimer = setTimeout(snapGroups, 150); });
  }

  /* ---------- Work grid ---------- */
  var grid = document.getElementById("work-grid");
  if (grid && window.PROJECTS) {
    var visible = window.PROJECTS.filter(function (p) { return !p.hidden; });
    var isLocalFile = function (src) { return !!src && !/^https?:\/\//i.test(src); };

    grid.innerHTML = visible.map(function (p, i) {
      var cat = categoryOf(p);
      var catClass = p.kind === "graphic" ? "cat-graphic" : "cat-video";
      var media;
      if (isLocalFile(p.thumbnail)) {
        // Your own thumbnail file in assets/ fills the whole card
        media = isVideoFile(p.thumbnail)
          ? '<video src="' + esc(p.thumbnail) + '" muted loop playsinline autoplay preload="metadata"></video>'
          : '<img src="' + esc(p.thumbnail) + '" alt="" loading="lazy">';
      } else {
        // Placeholder first; replaced by the video's own thumbnail once it loads (below)
        media = '<div class="placeholder" data-thumb-slot="' + i + '">' + (p.kind === "graphic" ? ICON_IMAGE : ICON_VIDEO) + "</div>";
      }
      var tags = (p.tools || []).map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("");
      return (
        '<a class="card" data-kind="' + esc(p.kind) + '" href="project.html?p=' + encodeURIComponent(p.slug) + '" aria-label="' + esc(p.title + " — " + cat) + '">' +
          '<div class="card-media" aria-hidden="true">' + media + "</div>" +
          '<div class="card-scrim" aria-hidden="true"></div>' +
          '<div class="tags">' + tags + "</div>" +
          '<div class="card-info">' +
            '<div class="roll-wrap"><div class="roll"><span>' + esc(p.title) + '</span><span aria-hidden="true">View Case</span></div></div>' +
            '<div class="category ' + catClass + '"><span class="dot"></span><span>' + cat + "</span></div>" +
          "</div>" +
          '<span class="plus" aria-hidden="true">' + ICON_PLUS + "</span>" +
        "</a>"
      );
    }).join("");

    // Fill in thumbnails from Vimeo / Google Drive
    if (window.PortfolioMedia) {
      visible.forEach(function (p, i) {
        if (isLocalFile(p.thumbnail)) return;
        var slot = grid.querySelector('[data-thumb-slot="' + i + '"]');
        if (!slot) return;
        window.PortfolioMedia.thumbFor(p).then(function (url) {
          if (!url) return;
          var tall = (function () {
            var a = String(p.aspect || "").split("/").map(parseFloat);
            return a.length === 2 && a[1] > a[0];
          })();
          var img = new Image();
          img.alt = "";
          img.decoding = "async";
          img.onload = function () {
            var frame = document.createElement("div");
            frame.className = "thumb " + (tall ? "thumb-tall" : "thumb-wide");
            frame.appendChild(img);
            slot.replaceWith(frame);
          };
          img.src = url; // if it fails to load, the placeholder simply stays
        });
      });
    }

    // Apple-style drift: the thumbnail follows the cursor slightly
    grid.querySelectorAll(".card").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        if (e.pointerType !== "mouse") return;
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
        card.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
      });
      card.addEventListener("pointerleave", function () {
        card.style.setProperty("--mx", 0);
        card.style.setProperty("--my", 0);
      });
    });

    // Filters
    var filters = document.querySelectorAll(".filter");
    filters.forEach(function (f) {
      f.addEventListener("click", function () {
        var want = f.getAttribute("data-filter");
        filters.forEach(function (o) { o.setAttribute("aria-pressed", String(o === f)); });
        grid.querySelectorAll(".card").forEach(function (c) {
          c.hidden = !(want === "all" || c.getAttribute("data-kind") === want);
        });
      });
    });
  }

  settleScroll();
})();
