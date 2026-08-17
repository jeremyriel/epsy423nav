/* ============================================================================
 *  COURSE NAVIGATION — SETTINGS FILE
 *  ----------------------------------------------------------------------------
 *  This is the ONLY file you need to edit to update the map's links.
 *
 *  1. Paste each Canvas module URL between the quotes where you see
 *     "PASTE_CANVAS_URL".  (See SETTINGS.md for how to find these URLs.)
 *  2. You can also change week titles here if the schedule changes.
 *  3. Save the file, then redeploy (see README.md → "Updating the map").
 *
 *  Do NOT rename the sections/ids — the map artwork is wired to them.
 * ========================================================================== */

window.COURSE_NAV_CONFIG = {
  courseTitle: "EPSY/CI 423 Digital Environmental Storytelling & Advocacy",

  /* Where links open:
   *   "_top"   = replace the Canvas page the map is embedded in (recommended)
   *   "_blank" = open the module in a new browser tab                         */
  linkTarget: "_top",

  sections: [
    {
      id: "storyworlds",
      title: "Storyworlds",
      weekRange: "Weeks 1–4",
      weeks: [
        { n: 1, title: "Welcome to Chicago's Environmental Storyworlds",            url: "PASTE_CANVAS_URL" },
        { n: 2, title: "Storyworld 1 — Climate Resilience",                         url: "PASTE_CANVAS_URL" },
        { n: 3, title: "Storyworld 2 — Lake Michigan, Water & the Great Lakes",     url: "PASTE_CANVAS_URL" },
        { n: 4, title: "Storyworld 3 — Environmental Justice",                      url: "PASTE_CANVAS_URL" },
      ],
    },
    {
      id: "audio",
      title: "Audio",
      weekRange: "Weeks 5–8",
      weeks: [
        { n: 5, title: "How Environmental Stories Work",       url: "PASTE_CANVAS_URL" },
        { n: 6, title: "Finding & Reporting a Community Story", url: "PASTE_CANVAS_URL" },
        { n: 7, title: "Environmental Audio Storytelling",      url: "PASTE_CANVAS_URL" },
        { n: 8, title: "Audio, Audience, and Advocacy",         url: "PASTE_CANVAS_URL" },
      ],
    },
    {
      id: "video",
      title: "Video",
      weekRange: "Weeks 9–11",
      weeks: [
        { n: 9,  title: "Personal Stories of Place: Environmental Video",   url: "PASTE_CANVAS_URL" },
        { n: 10, title: "Making an Environmental Video",                    url: "PASTE_CANVAS_URL" },
        { n: 11, title: "Visual Storytelling & Looking Toward the Future",  url: "PASTE_CANVAS_URL" },
      ],
    },
    {
      id: "chicago2125",
      title: "Chicago 2125",
      weekRange: "Weeks 12–15",
      weeks: [
        { n: 12, title: "Chicago 2125: Environmental Futures", url: "PASTE_CANVAS_URL" },
        { n: 13, title: "Building the Future World",           url: "PASTE_CANVAS_URL" },
        { n: 14, title: "Future Stories as Advocacy",          url: "PASTE_CANVAS_URL" },
        { n: 15, title: "Chicago 2125: Stories for the Future", url: "PASTE_CANVAS_URL" },
      ],
    },
  ],
};
