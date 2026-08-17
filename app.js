/* ============================================================================
 *  Chicago's Environmental Storyworlds — course map controller
 *  Reads window.COURSE_NAV_CONFIG (config.js), wires the SVG districts to a
 *  week panel, and builds an accessible text fallback. No dependencies.
 * ========================================================================== */
(function () {
  "use strict";

  var CFG = window.COURSE_NAV_CONFIG || { sections: [], linkTarget: "_top" };
  // Accent per section — matches the WCAG-AA district fills in styles.css.
  var ACCENT = { storyworlds: "#0f766e", audio: "#6a5acd", video: "#b8452b", chicago2125: "#3f5aa6" };

  var byId = {};
  (CFG.sections || []).forEach(function (s) { byId[s.id] = s; });

  var panel     = document.getElementById("week-panel");
  var backdrop  = document.getElementById("panel-backdrop");
  var titleEl   = document.getElementById("panel-title");
  var rangeEl   = document.getElementById("panel-range");
  var weeksEl   = document.getElementById("panel-weeks");
  var closeBtn  = document.getElementById("panel-close");
  var lastFocus = null;

  var PLACEHOLDER = "PASTE_CANVAS_URL";
  function isSet(url) { return url && url.indexOf(PLACEHOLDER) === -1; }

  /* ---------- open / close the week panel ---------- */
  function openSection(id) {
    var sec = byId[id];
    if (!sec) return;

    titleEl.textContent = sec.title;
    rangeEl.textContent = sec.weekRange || "";
    weeksEl.innerHTML = "";

    var accent = ACCENT[id] || "#2a9d8f";
    panel.style.setProperty("--accent", accent);

    (sec.weeks || []).forEach(function (wk) {
      var li = document.createElement("li");
      var a  = document.createElement("a");

      if (isSet(wk.url)) {
        a.href = wk.url;
        a.target = CFG.linkTarget || "_top";
        if (a.target === "_blank") a.rel = "noopener";
      } else {
        // No href => not a link and not keyboard-focusable (avoids a dead "#" stop).
        a.setAttribute("aria-disabled", "true");
      }

      var num = document.createElement("span");
      num.className = "wk-num";
      num.textContent = "Wk " + wk.n;

      var t = document.createElement("span");
      t.className = "wk-title";
      t.textContent = wk.title;

      a.appendChild(num);
      a.appendChild(t);
      li.appendChild(a);
      weeksEl.appendChild(li);
    });

    backdrop.hidden = false;
    panel.hidden = false;
    panel.scrollTop = 0;
    lastFocus = document.activeElement;
    closeBtn.focus();
    document.addEventListener("keydown", onKeydown);
    // Show the "scroll for more" hint if the list overflows the frame.
    if (window.requestAnimationFrame) requestAnimationFrame(updateScrollHint);
    else updateScrollHint();
  }

  /* Toggle the scroll affordance based on whether more content lies below. */
  function updateScrollHint() {
    var scrollable = panel.scrollHeight > panel.clientHeight + 4;
    var atBottom = panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 4;
    panel.classList.toggle("is-scrollable", scrollable && !atBottom);
  }
  panel.addEventListener("scroll", updateScrollHint);
  window.addEventListener("resize", function () { if (!panel.hidden) updateScrollHint(); });

  function closePanel() {
    panel.hidden = true;
    backdrop.hidden = true;
    document.removeEventListener("keydown", onKeydown);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function onKeydown(e) {
    if (e.key === "Escape") { closePanel(); return; }
    // Trap focus inside the modal dialog (aria-modal) — WCAG 2.1.2 / 2.4.3.
    if (e.key === "Tab") {
      var f = panel.querySelectorAll("button, a[href]");
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  /* ---------- wire the SVG districts ---------- */
  var districts = document.querySelectorAll(".district");
  Array.prototype.forEach.call(districts, function (d) {
    var id = d.getAttribute("data-section");
    d.addEventListener("click", function () { openSection(id); });
    d.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openSection(id); }
    });
  });

  closeBtn.addEventListener("click", closePanel);
  backdrop.addEventListener("click", closePanel);

  /* ---------- size a card box to fit its text exactly ----------
     Font metrics vary by OS/browser (incl. inside Canvas), so measure the
     rendered text and grow the white card to wrap it + padding. The static
     rect in the SVG is a safe (generous) fallback if this can't run. */
  function fitBox(boxSel, textSels, padX, padTop, padBottom) {
    var box = document.querySelector(boxSel);
    if (!box || typeof box.getBBox !== "function") return;
    try {
      var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity, found = false;
      textSels.forEach(function (sel) {
        var el = document.querySelector(sel);
        if (!el) return;
        var r = el.getBBox();
        found = true;
        minX = Math.min(minX, r.x); minY = Math.min(minY, r.y);
        maxX = Math.max(maxX, r.x + r.width); maxY = Math.max(maxY, r.y + r.height);
      });
      if (!found) return;
      box.setAttribute("x", (minX - padX).toFixed(1));
      box.setAttribute("y", (minY - padTop).toFixed(1));
      box.setAttribute("width", (maxX - minX + padX * 2).toFixed(1));
      box.setAttribute("height", (maxY - minY + padTop + padBottom).toFixed(1));
    } catch (e) { /* keep the static fallback box */ }
  }
  function fitBoxes() {
    fitBox(".title-box", [".banner", ".subbanner"], 22, 14, 12);
    fitBox(".hint-box", [".hint-text"], 22, 11, 11);
  }
  fitBoxes();
  // Re-fit once web fonts have settled (metrics can shift after font load).
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitBoxes);
  window.addEventListener("load", fitBoxes);

  /* ---------- accessible text fallback (always rendered) ---------- */
  var nav = document.getElementById("fallback-nav");
  if (nav) {
    var heading = document.createElement("h3");
    heading.textContent = "Course modules";
    nav.appendChild(heading);

    (CFG.sections || []).forEach(function (sec) {
      var h = document.createElement("h3");
      h.textContent = sec.title + " — " + (sec.weekRange || "");
      nav.appendChild(h);

      var ul = document.createElement("ul");
      (sec.weeks || []).forEach(function (wk) {
        var li = document.createElement("li");
        if (isSet(wk.url)) {
          var a = document.createElement("a");
          a.href = wk.url;
          a.target = CFG.linkTarget || "_top";
          if (a.target === "_blank") a.rel = "noopener";
          a.textContent = "Week " + wk.n + ": " + wk.title;
          li.appendChild(a);
        } else {
          li.textContent = "Week " + wk.n + ": " + wk.title + " (link not set)";
        }
        ul.appendChild(li);
      });
      nav.appendChild(ul);
    });
  }
})();
