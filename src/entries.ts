export type EntryKind = "role" | "project";

export interface Entry {
  kind: EntryKind;
  title: string;
  /** Present when this entry has a dedicated page at /work/<slug>. */
  slug?: string;
  /** Short label for compact lists, when the title or org is unwieldy. */
  short?: string;
  /**
   * Gallery tile overrides. `tagline` is required for entries with no page;
   * `image` lets an entry frame itself differently in the grid than on its page.
   */
  tile?: { tagline?: string; image?: string; art?: "web"; contain?: boolean };
  /** Company for roles; course or event context for projects. */
  org?: string;
  dates: string;
  location?: string;
  points: string[];
  technologies: string[];
  links?: {
    github?: string;
    demo?: string;
    demoLabel?: string;
  };
}

/**
 * Hand-ordered, most recent first. HackMIT's apps sit under the HackMIT role
 * rather than interleaving by date, since they share one span.
 */
export const entries: Entry[] = [
  {
    kind: "role",
    title: "Member of Technical Staff Intern",
    slug: "modal",
    short: "Autoscaling at Modal",
    org: "Modal Labs",
    dates: "2026 Aug",
    location: "San Francisco",
    points: [
      "Worked across the worker, input plane, and control plane on how containers schedule work and decide to scale.",
      "Replaced a first-call heuristic with recent-call history so workers stop mis-guessing how long inputs take — ~48% less queue time on a mixed-duration benchmark.",
      "Built a discrete-event simulator that replays production traffic, then used it to try 100+ autoscaling scenarios that never had to touch prod.",
      "Made container lifecycles legible: why one started, drained, or died.",
    ],
    technologies: ["Go", "Python", "Rust", "Protobuf", "Redis", "ClickHouse"],
  },
  {
    kind: "role",
    title: "Firmware Lead",
    slug: "thermominator",
    short: "Thermominator",
    org: "6.900",
    dates: "2026 May",
    points: [
      "A wearable heat monitor, built by eight people across firmware, power, sensors, server, and industrial design. I led firmware.",
      "A C++ state machine juggling modem, light, and deep sleep to keep an ESP32-C3 alive on a small battery.",
      "Then wiring it to everything else: WiFi, sensors, LCD, battery management, server.",
    ],
    technologies: ["C++", "ESP32", "Firmware", "IoT"],
  },
  {
    kind: "role",
    title: "Undergraduate Researcher",
    short: "Biomechatronics Researcher",
    tile: {
      tagline:
        "Spider-web-like extensions for the body, wired so movement comes out as sound.",
      // Drawn web until there's a photo; drop sonic-body.jpg in to replace it.
      art: "web",
      image: "sonic-body.jpg",
    },
    org: "Biomechatronics · MIT Media Lab",
    dates: "2026 Feb — May",
    location: "Cambridge",
    points: [
      "Spider-web-like body extensions, wired so movement comes out as sound.",
      "Arduino and capacitive touch sensing, plus the firmware that listened to them.",
    ],
    technologies: ["Arduino", "Firmware", "Sensing", "HCI"],
  },
  {
    kind: "project",
    title: "FPGAceTime",
    slug: "fpgacetime",
    org: "6.205",
    dates: "2025 Oct — Dec",
    points: [
      "A live video link between two FPGAs, built with Sanjith Udupa — camera in, 18-bit packets across a differential pair, HDMI out.",
      "Verified pixel-accurate in cocotb and on a scope up to 25MHz.",
    ],
    technologies: ["SystemVerilog", "FPGA", "RTL", "cocotb", "Vivado"],
    links: { demo: "https://youtu.be/gpY-w5pYmGA", demoLabel: "Demo video" },
  },
  {
    kind: "project",
    title: "Somniac",
    slug: "somniac",
    // The page shows the band upright; the grid wants a landscape crop.
    // The whole band, shown end to end rather than cropped into the box.
    tile: { image: "somniac-tile.jpg", contain: true },
    org: "YC Summer Fellow",
    dates: "2025 Aug",
    points: [
      "A headband that catches you grinding your teeth in your sleep.",
      "Custom circuit, firmware, BLE, an EMG classifier, and the iOS app it reports to.",
    ],
    technologies: ["Embedded", "EMG", "BLE", "KiCad", "Python", "iOS"],
    links: {
      demo: "https://docs.google.com/presentation/d/17iF5BbpLBcd3Ha-fie5XmguQPzD8lpGrEFD4IB72a4E",
      demoLabel: "Slides",
    },
  },
  {
    kind: "role",
    title: "DevOps Head",
    slug: "hackmit",
    short: "HackMIT Platform",
    org: "HackMIT",
    dates: "2023 Oct — 2025 Mar",
    location: "Cambridge",
    points: [
      "Ran 15 engineers building the software behind HackMIT and Blueprint, for 1000+ hackers, across five apps on EC2 behind Nginx and Cloudflare.",
      "Two years of learning that most of leading is deciding what not to build.",
    ],
    technologies: ["React", "TypeScript", "Flask", "PostgreSQL", "AWS"],
    links: {
      github: "https://github.com/techx",
      demo: "https://hackmit.org/",
      demoLabel: "hackmit.org",
    },
  },
  {
    kind: "project",
    title: "Wodou",
    slug: "wodou",
    org: "HackMIT admission puzzle",
    dates: "2024 Jun",
    points: [
      "Wordle, but in Chinese calligraphy — and also a cryptography puzzle.",
      "The puzzle prospective HackMIT organizers had to solve to get in.",
    ],
    technologies: ["React", "Next.js", "Redis", "Vercel"],
    links: {
      github: "https://github.com/AnnieWang314/wodou",
      demo: "https://wodou.vercel.app/",
      demoLabel: "wodou.vercel.app",
    },
  },
  {
    kind: "project",
    title: "On the Hilbert Series of the Rational Cherednik Algebra",
    short: "Math Paper",
    tile: {
      tagline: "Working out a Hilbert series, as first author.",
      image: "math-paper.jpg",
    },
    org: "MIT PRIMES",
    dates: "2023 Feb",
    points: [
      "Pinned down the Hilbert series for a specific case of the algebra's polynomial representation. First author, presented at the 2023 Joint Mathematics Meetings.",
      "I came into MIT assuming I'd be a mathematician.",
    ],
    technologies: ["Math", "Research", "Python"],
    links: {
      demo: "https://math.mit.edu/research/highschool/primes/materials/2022/WangAn.pdf",
      demoLabel: "Paper (PDF)",
    },
  },
];

/** What to call an entry: its own name, or the company when it's a job. */
export function label(entry: Entry) {
  if (entry.short) return entry.short;
  return entry.kind === "role" ? (entry.org ?? entry.title) : entry.title;
}

/** The other half: the job title for a role, the context for a project. */
export function sublabel(entry: Entry) {
  return entry.kind === "role" ? entry.title : entry.org;
}

/**
 * Not on the site, kept so the writing isn't lost. Move one back into `entries`
 * (and give it a `tile` or a `slug`) to bring it back.
 */
export const archived: Entry[] = [
  {
    kind: "role",
    title: "Software Engineer Intern",
    org: "DianaHR",
    dates: "2024 May — Aug",
    location: "San Francisco",
    points: [
      "First technical hire, building the core product with the CTO and shipping a lot of fullstack fast — LLM workflows that scrape, read email, and file HR reports so nobody has to.",
      "It's also where I noticed I liked the problems more than the layer I was solving them in, and started looking for something I could hold.",
    ],
    technologies: ["Python", "LLMs", "Automation"],
  },
  {
    kind: "role",
    title: "Software Engineer Intern",
    org: "Nectar Climate",
    dates: "2023 Jun — Aug",
    location: "San Francisco",
    points: [
      "My first software job. Dashboards that made CO2 emissions data legible to the clients paying for it, and adaptive filtering in Next.js that doubled how deep an analyst could dig.",
      "At this point I was pretty sure I was a web person.",
    ],
    technologies: ["Next.js", "React", "Data Viz"],
  },
  {
    kind: "role",
    title: "Summer Fellow",
    org: "Y Combinator",
    dates: "2025 May — Aug",
    location: "San Francisco",
    points: [
      "One of 29 fellows out of 10,000+ applicants.",
      "Built toward neuromotor disorders, starting with bruxism — 8,751 samples of surface EMG, and a classifier that hit 88% on one user but 80% across everyone.",
      "Interviewed dentists and patients, then built the iOS app they'd actually hold.",
    ],
    technologies: ["Signal Processing", "ML", "Hardware", "iOS"],
  },
  {
    kind: "project",
    title: "Blank[space]",
    org: "Hack@Brown",
    dates: "2024",
    points: [
      "A writing assistant that adapts to why you're writing, not just what you last typed. Led four people end-to-end and won Best Use of MongoDB Atlas.",
      "One of the last things I built before the hardware classes got me.",
    ],
    technologies: ["React", "Express", "MongoDB", "AI"],
    tile: {
      tagline: "A writing assistant that adapts to why you're writing.",
      image: "blankspace.png",
    },
    links: { github: "https://github.com/AnnieWang314/blankspace" },
  },
  {
    kind: "project",
    title: "SlangZ",
    short: "SlangZ",
    org: "Web Lab (6.9620)",
    dates: "2024",
    points: [
      "Duolingo x Quizlet, for Gen Z slang.",
      "Led three people end-to-end, flashcards and progress tracking included.",
    ],
    technologies: ["React", "Express", "TypeScript", "MongoDB"],
    tile: {
      tagline: "Duolingo x Quizlet, for Gen Z slang.",
      image: "slangz.png",
    },
    links: { github: "https://github.com/AnnieWang314/slangz" },
  },
];
