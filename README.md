# Chicago's Environmental Storyworlds — Canvas Navigation Map

An interactive, vector-drawn map of the Chicago region that acts as the front-page
navigation for the course in **Canvas**. The map has four clickable districts —
**Storyworlds** (Weeks 1–4), **Audio** (Weeks 5–8), **Video** (Weeks 9–11), and
**Chicago 2125** (Weeks 12–15). Clicking a district opens a panel of that section's
weekly modules, each linking to its Canvas module page.

> **Why it's hosted outside Canvas:** Canvas's page editor strips JavaScript and most
> interactive SVG, so a live clickable/animated widget can't run inside a Canvas page.
> Instead we host these static files (free) and embed them with an `<iframe>`. All the
> interactivity stays intact, and you only ever edit one settings file.

---

## Files

| File | What it is | Do you edit it? |
|------|------------|-----------------|
| `config.js`  | **Settings** — all week titles + the Canvas URLs | ✅ **Yes — this is the one you edit** |
| `index.html` | The app (inline SVG map + panel) | Only for art/layout tweaks |
| `styles.css` | Colors & styling | Only to retheme |
| `app.js`     | Interaction logic | No |
| `map.svg`    | Standalone copy of the artwork | No (art source) |
| `SETTINGS.md`| Step-by-step guide to filling in URLs | Read it |

There are **no libraries, fonts, or external images** to install — everything is
self-contained. The only dependency is a static web host (below).

---

## 1. Fill in your Canvas links

Open **`config.js`** and replace every `PASTE_CANVAS_URL` with the matching Canvas
module URL. Full instructions and screenshots-in-words are in **`SETTINGS.md`**.

Until a URL is filled in, that week shows as a greyed-out "link not set" item, so it's
easy to see what's left to do.

---

## 2. Host the files (GitHub Pages — free)

1. Create a free account at <https://github.com>.
2. Create a new **public** repository, e.g. `chicago-storyworlds-map`.
3. Upload all the files in this folder (`index.html`, `config.js`, `styles.css`,
   `app.js`, `map.svg`) to the repository — drag-and-drop works on github.com.
4. In the repo, go to **Settings → Pages**.
5. Under **Build and deployment → Source**, choose **Deploy from a branch**, pick
   `main` and `/ (root)`, then **Save**.
6. Wait ~1 minute. GitHub gives you a public URL like:
   `https://YOUR-USERNAME.github.io/chicago-storyworlds-map/`
7. Open that URL to confirm the map works.

*Alternative host:* drag the folder onto <https://app.netlify.com/drop> for an instant
URL — same result.

---

## 3. Embed on the Canvas front page

1. In Canvas, open the course **front page** (or any page) and click **Edit**.
2. Click the **`</>`** (HTML editor) button in the Rich Content Editor toolbar.
3. Paste this, replacing the `src` with **your** Pages URL from step 2:

   ```html
   <div style="position:relative; width:100%; max-width:1000px; margin:0 auto; padding-top:72%;">
     <iframe src="https://YOUR-USERNAME.github.io/chicago-storyworlds-map/"
             style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;"
             title="Course Navigation Map" allowfullscreen></iframe>
   </div>
   ```

4. **Save** the page.

> **Why the wrapper?** The map now contains only the interactive artwork (the text module
> list beneath it was removed). The map has a fixed shape (1000 × 720), so the wrapper's
> `padding-top:72%` (720 ÷ 1000) makes the frame scale to that exact shape at any column
> width — no blank space below and no inner scrollbar. If your theme prefers a plain
> fixed-height frame instead, this also works:
> `<iframe src="…" width="100%" height="720" style="border:0; max-width:1000px; display:block; margin:0 auto;" title="Course Navigation Map"></iframe>`

### If the map area shows up blank in Canvas
Some schools restrict which sites can be embedded. If you see an empty box, email your
Canvas administrator and ask them to **add `github.io` (or your host's domain) to the
allowed iframe/embed domains** ("Content Security Policy allowed domains" in Canvas
admin). This is a one-time approval.

### Do the module links work inside the iframe?
Yes. Links use `target="_top"` by default (set in `config.js`), so clicking a week
navigates the whole Canvas page to that module. Change `linkTarget` to `"_blank"` in
`config.js` if you'd rather links open in a new tab.

---

## 4. Updating the map later

- **Changed a link or title?** Edit `config.js`, save/commit. On GitHub Pages the change
  is live in ~1 minute — no need to touch Canvas again.
- **Tip:** if a change doesn't appear, hard-refresh (Ctrl/Cmd + Shift + R) to clear the
  browser cache.

---

## Course banner (`banner.svg` / `banner.png`)

A separate horizontal banner illustration for the course — Chicago skyline, Lake Michigan,
lakefront park, a wind turbine, and five media icons (audio, video, visual, web, social)
reflecting the course themes. Same palette as the map.

- **`banner.png`** — ready-to-upload raster (3200×840, ~3.8:1). Use this in Canvas.
- **`banner.svg`** — the editable vector source. Change the title text near the bottom of
  the file, then re-export to PNG if you edit it.

**Add it to the Canvas front page:** Edit the page → **Insert → Image → Upload Image** →
choose `banner.png` → place it at the top of the page (above the map iframe). For a full-width
look, after inserting, set its width to 100% in the image properties or the HTML editor.

*Note:* Canvas renders uploaded **PNG** images reliably; prefer `banner.png` over the SVG for
embedding. Keep `banner.svg` as your source of truth for edits.

## Accessibility

- Districts are keyboard-focusable (Tab) and open with Enter/Space; Esc closes the panel.
- The SVG has descriptive `title`/`desc`, and every district has an ARIA label.
- A plain-text list of every module is included for screen readers but **hidden from view**
  (screen-reader-only), so it no longer shows beneath the map while remaining accessible to
  assistive technology.
