# Settings guide — filling in the course links

Everything you need to change lives in **`config.js`**. You do **not** need to touch any
other file. This guide shows exactly what to edit.

---

## 1. What a link entry looks like

Inside `config.js`, each week is one line like this:

```js
{ n: 2, title: "Storyworld 1 — Climate Resilience", url: "PASTE_CANVAS_URL" },
```

- `n` — the week number (leave as-is)
- `title` — the module name shown on the map (change only if the schedule changes)
- `url` — **replace `PASTE_CANVAS_URL` with the real Canvas link** (keep the quotes)

Filled in, it becomes:

```js
{ n: 2, title: "Storyworld 1 — Climate Resilience", url: "https://canvas.YOURSCHOOL.edu/courses/12345/modules/67890", },
```

---

## 2. How to find a module's URL in Canvas

You can link to a **module** (the whole week) or to a **specific page** within it. Both work.

**To link to a module (recommended):**
1. In your course, open **Modules**.
2. Each module has a title. Right-click the module's title and choose **Copy link
   address** (or open the module and copy the address bar URL).
3. It looks like:
   `https://canvas.YOURSCHOOL.edu/courses/COURSE_ID/modules/MODULE_ID`
4. Paste it between the quotes for the matching week.

**To link to a specific page/assignment instead:**
- Open that item and copy its URL, e.g.
  `https://canvas.YOURSCHOOL.edu/courses/COURSE_ID/pages/welcome`

**Tip — jump to a module on the Modules page:** open Modules, click a module's title so
it's expanded, and copy the URL; it may include `#module_MODULE_ID`, which scrolls
straight to it.

---

## 3. Where each week goes (already laid out for you)

| District | Weeks | Modules |
|----------|-------|---------|
| **Storyworlds** | 1–4 | Welcome; Storyworld 1 Climate Resilience; Storyworld 2 Lake Michigan/Water; Storyworld 3 Environmental Justice |
| **Audio** | 5–8 | How Environmental Stories Work; Finding & Reporting a Community Story; Environmental Audio Storytelling; Audio, Audience & Advocacy |
| **Video** | 9–11 | Personal Stories of Place; Making an Environmental Video; Visual Storytelling & Looking Toward the Future |
| **Chicago 2125** | 12–15 | Environmental Futures; Building the Future World; Future Stories as Advocacy; Stories for the Future |

These are already in `config.js` in this order — just add the URLs.

---

## 4. Optional settings (top of `config.js`)

```js
courseTitle: "Chicago's Environmental Storyworlds",  // shown as the banner
linkTarget: "_top",   // "_top" = navigate the Canvas page (recommended)
                      // "_blank" = open each module in a new browser tab
```

---

## 5. After editing

1. Save `config.js`.
2. Re-upload / commit it to your host (GitHub Pages or Netlify — see `README.md`).
3. Refresh the map. Any week you haven't filled in yet appears greyed out with a small
   **"link not set"** note, so it's easy to track what's left.

That's it — you never have to re-embed anything in Canvas after the first time.
