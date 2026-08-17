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
        { n: 1, title: "Welcome to Chicago's Environmental Storyworlds",            url: "https://canvas.uic.edu/courses/56270/modules/227370" },
        { n: 2, title: "Storyworld 1 — Climate Resilience",                         url: "https://canvas.uic.edu/courses/56270/modules/227372" },
        { n: 3, title: "Storyworld 2 — Lake Michigan, Water & the Great Lakes",     url: "https://canvas.uic.edu/courses/56270/modules/227373" },
        { n: 4, title: "Storyworld 3 — Environmental Justice",                      url: "https://canvas.uic.edu/courses/56270/modules/227376" },
      ],
    },
    {
      id: "audio",
      title: "Audio",
      weekRange: "Weeks 5–8",
      weeks: [
        { n: 5, title: "How Environmental Stories Work",       url: "https://canvas.uic.edu/courses/56270/modules/227378" },
        { n: 6, title: "Finding & Reporting a Community Story", url: "https://canvas.uic.edu/courses/56270/modules/227379" },
        { n: 7, title: "Environmental Audio Storytelling",      url: "https://canvas.uic.edu/courses/56270/modules/227380" },
        { n: 8, title: "Audio, Audience, and Advocacy",         url: "https://canvas.uic.edu/courses/56270/modules/227398" },
      ],
    },
    {
      id: "video",
      title: "Video",
      weekRange: "Weeks 9–11",
      weeks: [
        { n: 9,  title: "Personal Stories of Place: Environmental Video",   url: "https://canvas.uic.edu/courses/56270/modules/227415" },
        { n: 10, title: "Making an Environmental Video",                    url: "https://canvas.uic.edu/courses/56270/modules/227416" },
        { n: 11, title: "Visual Storytelling & Looking Toward the Future",  url: "https://canvas.uic.edu/courses/56270/modules/227434" },
      ],
    },
    {
      id: "chicago2125",
      title: "Chicago 2125",
      weekRange: "Weeks 12–15",
      weeks: [
        { n: 12, title: "Chicago 2125: Environmental Futures", url: "https://canvas.uic.edu/courses/56270/modules/227436" },
        { n: 13, title: "Building the Future World",           url: "https://canvas.uic.edu/courses/56270/modules/227437" },
        { n: 14, title: "Future Stories as Advocacy",          url: "https://canvas.uic.edu/courses/56270/modules/227438" },
        { n: 15, title: "Chicago 2125: Stories for the Future", url: "https://canvas.uic.edu/courses/56270/modules/227439" },
      ],
    },
  ],
};
