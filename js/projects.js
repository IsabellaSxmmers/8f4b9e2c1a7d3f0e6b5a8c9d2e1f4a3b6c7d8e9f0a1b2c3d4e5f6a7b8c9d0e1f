/* ==========================================================
   PROGRAMS — the statement shown on the RIGHT side of a project page.
   A project picks one with   program: "skykit"   (or leave it out for none).
   ========================================================== */
window.PROGRAMS = {
  skykit: "Skykit is a cloud-based digital signage platform designed to streamline internal communications across multiple offices via displays.",
  arriveIn5: "Arrive in 5 is an internal video podcast designed to deliver concise company updates in under five minutes.",
  presidentsClub: "President’s Club is an annual incentive program honoring top sales achievers through ongoing hype campaigns.",
  marchMadness: "March Madness is an annual sales tournament that drives brokers to compete for a seat at the Final Four.",
  fantasyFreight: "Fantasy Freight is an annual sales tournament where sales managers draft employees to compete for an ultimate prize.",
  marketUpdate: "Market Updates are external monthly reports designed to share industry insights with prospective customers."
};

/* ==========================================================
   PROJECT LIST — the order here is the order on the site.

     slug         short id used in the page link (project.html?p=slug). Letters, numbers, dashes.
     title        project name
     kind         "video"   → "Video Production"     "graphic" → "Graphic Design"
     tools        pills shown on the card and project page
     year         e.g. "2025" (leave "" to hide)
     program      which PROGRAMS statement goes on the right side
     description  the LEFT-side text on the project page
     link         the Vimeo or Google Drive share link. The page embeds it automatically.
                  (Drive files must be shared as "Anyone with the link can view".)
     thumbnail    card image. Leave "" to use the video's own thumbnail automatically,
                  or point to your own file, e.g. "assets/media/award-thumb.jpg".
     aspect       optional media shape: "16 / 9" (default), "8.5 / 11" (portrait PDF), "1 / 1" …
     hidden       true hides a project without deleting it
   ========================================================== */
window.PROJECTS = [
  /* ---------- Video Production ---------- */
  {
    slug: "arrive-in-5-award-management",
    title: "Arrive in 5: Award Management",
    kind: "video",
    tools: ["Premiere Pro", "Google Slides"],
    year: "",
    program: "arriveIn5",
    description: "A quick look at award management strategy to help protect service, maintain margins, and align KPIs in dynamic markets.",
    link: "https://vimeo.com/1156656884/480354be26",
    thumbnail: "https://i.vimeocdn.com/video/2110325020-ce1c62a531f10888366ff0413ba28eccce98bfc906abae99d6d3863e0bf842a6-d_1280x720"
  },
  {
    slug: "arrive-in-5-carrier-success-assistants",
    title: "Arrive in 5: Carrier Success Assistants",
    kind: "video",
    tools: ["Premiere Pro"],
    year: "",
    program: "arriveIn5",
    description: "Discover how the Carrier Success Department scales up to handle 10K daily loads and power high-volume operational growth.",
    link: "https://vimeo.com/1191973010/2a5c8e9321",
    thumbnail: "https://i.vimeocdn.com/video/2157498101-98f7509a90a9629dc51fb474fd4e75c14775819a65b57603f48b346506eccd36-d_1280x720"
  },
  {
    slug: "march-madness-season-opener",
    title: "March Madness: Season Opener",
    kind: "video",
    tools: ["Premiere Pro", "Envato", "After Effects"],
    year: "",
    program: "marchMadness",
    description: "A company-wide look at the 2026 tournament kickoff across all offices, prompting teams to check their standings and motivate friendly competition.",
    link: "https://vimeo.com/1165831185/80215b782c",
    thumbnail: "https://i.vimeocdn.com/video/2124088820-9a4258dc980d38b777094b3de0b4cba02206c3d466299a5dcd75608ddbc8b32b-d_1280x720"
  },
  {
    slug: "presidents-club-2025-ceremony-video",
    title: "President’s Club 2025: Ceremony Video",
    kind: "video",
    tools: ["Premiere Pro", "Envato", "After Effects"],
    year: "",
    program: "presidentsClub",
    description: "A commemorative video shown the first night of President’s Club, celebrating the top 1% of performers in front of executive leadership to drive excitement and appreciation of this elite group of sales representatives.",
    link: "https://vimeo.com/1185641251/6d7bbfde86",
    thumbnail: "https://i.vimeocdn.com/video/2149128851-b1b2697268716b664fb621800339ba2ed4066349d0f63faf32101ac0eac71c11-d_1280x720"
  },
  {
    slug: "presidents-club-2026-claim-your-spot",
    title: "President’s Club 2026: Claim Your Spot!",
    kind: "video",
    tools: ["Premiere Pro", "Envato"],
    year: "",
    program: "presidentsClub",
    description: "A motivational look at what it takes to hit your targets early, escape Slack, and earn an all-expenses trip to Mexico.",
    link: "https://vimeo.com/1221846247/05f439c20b",
    thumbnail: "https://i.vimeocdn.com/video/2194659057-4c71ad0d1b29deadbc0d9f48c102d07dde7f57ed4a51f25f7cfe0c73b0c015ad-d_1280x720"
  },

  /* ---------- Graphic Design ---------- */
  {
    slug: "skykit-sales-enablement-2026",
    title: "Skykit: Sales Enablement 2026",
    kind: "graphic",
    tools: ["After Effects", "Google Slides"],
    year: "",
    program: "skykit",
    description: "A motion graphic featuring newly designed sales slides, prompting internal teams to update their decks with the fresh materials.",
    link: "https://drive.google.com/file/d/17H5iNQGhPOfgiORP6hzhIXMzOXvPuM6c/view?usp=sharing",
    thumbnail: ""
  },
  {
    slug: "fantasy-freight-mvps",
    title: "Fantasy Freight MVPs",
    kind: "graphic",
    tools: ["Envato", "Premiere Pro"],
    year: "",
    program: "fantasyFreight",
    description: "Highlights top sales reps weekly during the competition, featured in company meetings and on Skykit digital signage.",
    link: "https://vimeo.com/1235686291/b15c634ab2",
    thumbnail: "https://i.vimeocdn.com/video/2211990888-2bc1c7585e09b575b553400ae8f452f6a3ed474cb2899bb882c3f5fceb37b241-d_1280x720"
  },
  {
    slug: "skykit-fall-merch-drop",
    title: "Skykit: Fall Merch Drop",
    kind: "graphic",
    tools: ["After Effects"],
    year: "",
    program: "skykit",
    description: "A quick lookbook design announcing the company’s internal merchandise drop, driving employees to check out new gameday and festival gear online.",
    link: "https://drive.google.com/file/d/1MAT5SWNuAueSHN756QggseoUV262VcdU/view?usp=sharing",
    thumbnail: ""
  },
  {
    slug: "market-update-september-2025",
    title: "Market Update: September 2025",
    kind: "graphic",
    tools: ["InDesign"],
    year: "",
    program: "marketUpdate",
    description: "An overview of monthly freight market insights, breaking down truckload demand trends, carrier supply, and rate forecasts.",
    link: "https://drive.google.com/file/d/1BHbRp3IWvbLIr3iCDiWKg2C_gRsAaPit/view?usp=sharing",
    thumbnail: "",
    aspect: "8.5 / 11"
  },

  /* Not in the latest list — hidden for now. Set hidden: false (and add a link) to bring it back. */
  {
    slug: "skykit-one-pager-announcement",
    title: "Skykit: One-Pager Announcement",
    kind: "graphic",
    tools: ["Premiere Pro", "Google Slides"],
    year: "",
    program: "skykit",
    description: "",
    link: "",
    thumbnail: "",
    hidden: true
  }
];
