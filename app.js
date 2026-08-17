/* ============================================================================
 *  Chicago's Environmental Storyworlds — course map controller
 *  Reads window.COURSE_NAV_CONFIG (config.js), wires the SVG districts to a
 *  week panel, and builds an accessible text fallback. No dependencies.
 * ========================================================================== */
(function () {
  "use strict";

  var CFG = window.COURSE_NAV_CONFIG || { sections: [], linkTarget: "_top" };
  var ACCENT = { storyworlds: "#2a9d8f", audio: "#6a5acd", video: "#e76f51", chicago2125: "#3f5aa6" };

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
        a.href = "#";
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
    lastFocus = document.activeElement;
    closeBtn.focus();
    document.addEventListener("keydown", onKeydown);
  }

  function closePanel() {
    panel.hidden = true;
    backdrop.hidden = true;
    document.removeEventListener("keydown", onKeydown);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function onKeydown(e) {
    if (e.key === "Escape") closePanel();
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
