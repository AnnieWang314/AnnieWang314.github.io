/**
 * Pages that are live. The gallery uses everything in this file for images and
 * taglines regardless; a slug listed here also gets a page and a clickable tile.
 * Add slugs one at a time as their writing is ready.
 */
export const ENABLED_PAGES: readonly string[] = [
  "modal",
  "thermominator",
  "somniac",
  "hackmit",
  "wodou",
];

export const pageIsLive = (slug?: string) =>
  Boolean(slug && ENABLED_PAGES.includes(slug));

export interface DetailSection {
  heading?: string;
  /** Each string is a paragraph. */
  body: string[];
  /**
   * Filename of one of this page's `images`, shown right after this section
   * instead of being left in the pile at the bottom.
   */
  image?: string;
}

export interface ProjectDetail {
  /** One line under the title. Sets up the story; not a summary. */
  blurb: string;
  /** A handful of words for the work index. Shorter than the blurb, on purpose. */
  tagline: string;
  /** Generated artwork to use instead of a photograph. */
  art?: "autoscale";
  sections: DetailSection[];
  /**
   * Filenames inside src/assets/projects/. Any that don't exist yet are simply
   * skipped, so you can list them ahead of time or add them whenever.
   */
  images?: {
    file: string;
    alt: string;
    caption?: string;
    /** Renders without the card border/shadow — for cutouts and renders. */
    transparent?: boolean;
    /** A logo or brand mark: small and centred rather than full width. */
    mark?: boolean;
    /** Render at a reduced width — for photos that don't need the full column. */
    small?: boolean;
  }[];
}

export const details: Record<string, ProjectDetail> = {
  modal: {
    art: "autoscale",
    tagline: "When should a container exist, and when should it stop?",
    blurb:
      "When should a container exist, and when should it stop?",
    sections: [
      {
        body: [
          "Modal runs your code in containers, on machines you never have to think about. The autoscaler determines how many of those containers exist for your function.",
          "I spent the summer working on this. Besides searching for the best formula or scaling algorithm, the hardest part was testing these potential changes.",
        ],
      },
      {
        heading: "You can't A/B test an autoscaler",
        body: [
          "The naive way is to ship a change and watch. It's slow, expensive, and not fair: traffic does not repeat exactly in production, so two versions never face the same test.",
          "So I built a simulator. It works as a discrete event model with one controller loop and one coroutine per simulated container. It can replay real production traffic, or generate synthetic patterns like spikes, waves, or redeploys. This means hours of traffic play in a couple seconds.",
          "With this, I could run different approaches against identical traffic across more than a hundred scenarios, and compare them on latency, cost, and wasted capacity. There was no clear winner but useful tradeoff curves instead.",
        ],
      },
    ],
    images: [
      { file: "modal-simulator.png", alt: "Autoscaler simulator output", caption: "Simulated container counts against a replayed production trace." },
    ],
  },

  somniac: {
    tagline: "A headband that catches you grinding your teeth.",
    blurb:
      "A headband that catches you grinding your teeth, useful in sleep.",
    sections: [
      {
        body: [
          "About 1/3 of people grind their teeth at night, mostly without knowing. The result is chipped teeth, migraines, and sometimes jaw fractures. People can only guess what causes it (stress, genetics, facial structure), but there's no real explanation.",
        ],
      },
      {
        heading: "The gap",
        body: [
          "One dentist I interviewed said he often thought a patient was clenching, but he wasn't be sure. Nothing tracks it, so by the time it's visible, this means the damage is already severe.",
        ],
      },
      {
        heading: "Reading the muscle",
        image: "somniac-emg.jpg",
        body: [
          "Clenching is a masseter (around temples) contraction. Muscle contractions leak electrical activity we can read off the skin using surface EMG.",
          "Across 8,751 samples the classifier hit 88% on a single user and 80% overall, once you account for the variation between people and between sessions. That gap is why the device calibrates to each user instead of shipping one model for everybody.",
        ],
      },
      {
        heading: "Making it wearable",
        body: [
          "I designed several versions of a custom circuit through two revisions, plus the firmware, BLE integration, and an iOS app to log clenching events and environment changes.",
        ],
      },
      {
        heading: "What's next",
        body: [
          "Detection, the circuit, and the app all work. What I didn't get to is comfort and intervention beyond. Maybe we could use muscle stimulation to interrupt a clench gently enough that nobody wakes up.",
        ],
      },
    ],
    images: [
      {
        file: "somniac-headband.jpg",
        small: true,
        alt: "The inside of the Somniac headband: three conductive fabric electrodes stitched into a maroon band, each with a wire running out of it",
        caption:
          "The inside of the band. Three fabric electrodes, sitting over the muscle that does the clenching.",
      },
      {
        file: "somniac-emg.jpg",
        alt: "Scatter plot of surface EMG values over time, with clenching samples in red and non-clenching samples in blue forming clearly separated bands",
        caption:
          "Surface EMG, clenching in red against everything else in blue.",
      },
    ],
  },

  hackmit: {
    tagline: "Fifteen engineers, five apps, and thousands of hackers.",
    blurb:
      "Running the software behind a hackathon.",
    sections: [
      {
        body: [
          "HackMIT hosts 1000+ undergraduate hackers; Blueprint is its sibling for high schoolers. I led the dev team of 15 in building five apps to make this possible.",
        ],
      },
      {
        heading: "Plume, the platform",
        body: [
          "Before I joined HackMIT, there were several disconnected tools: something to take hacker applications, something to check people in, something to collect projects, something to judge them, etc. Plume is the attempt to make it one thing. Visit [plume.hackmit.org](https://plume.hackmit.org) to see it today.",
     
        ],
      },
      {
        heading: "Pigeon, the inbox",
        body: [
          "A RAG email assistant that drafts replies out of the inbox's history. I oversaw its Chrome extension going into Gmail and Outlook.",
        ],
      },
      {
        heading: "What it taught me",
        body: [
          "How to motivate people, how to pick what to not build, how to review code, how to grow others and myself.",
        ],
      },
    ],
    images: [
      {
        file: "splash-blueprint-2025.jpg",
        alt: "Blueprint Splash",
        caption:
          "Blueprint 2025 landing page made with Three.js.",
      },
      { file: "plume-dashboard.png", alt: "Plume admin dashboard" },
      { file: "plume-judging.png", alt: "Plume judging interface" },
    ],
  },

  thermominator: {
    tagline: "Keeping a wearable alive on a tiny battery.",
    blurb:
      "A wearable heat monitor.",
    sections: [
      {
        body: [
          "Thermominator is a personal heat monitor. It's a wearable keychain-like device that tracks heat exposure. My team of 8 built this for MIT Office of Sustainability as part of our 6.900 project. I led firmware development.",
        ],
      },
      {
        heading: "Sleep is the whole problem",
        body: [
          "We were building a wearable greatly constrained by its battery. On an ESP32-C3, the difference between a device that lasts hours and one that lasts days is mainly about how aggressively it sleeps.",
          "I wrote the firmware as a C++ state machine between modem sleep, light sleep, and deep sleep, so that the device would sleep as much as possible without trading off too much functionality.",
        ],
      },
      {
        heading: "The integration surface",
        body: [
          "Firmware is where every other subteam's work has to meet: WiFi communication, the sensor stack, LCD display, and our backend server connection.",
        ],
      },

    ],
    images: [
      {
        file: "thermominator-device.png",
        alt: "CAD render of the Thermominator",
        caption:
          "The enclosure with its lid off. Includes LCD display, buttons, USB-C charging, battery.",
        transparent: true,
      },
      { file: "thermominator-team.jpg", alt: "The 6.900 team" },
    ],
  },

  fpgacetime: {
    tagline: "Live video and audio between two FPGAs, over eight pins.",
    blurb:
      "Two FPGAs, eight pins between them, and a live video link built out of nothing but RTL.",
    sections: [
      {
        body: [
          "FPGAceTime is a live video link between two RealDigital Urbana boards. Each one captures its own camera feed, downsamples it, packetizes it, ships it across to the other board, and composes what comes back into an HDMI display with a picture-in-picture selfie view. There is no processor anywhere in the path — every part of it is RTL.",
        ],
      },
      {
        heading: "Eight pins",
        body: [
          "The camera takes the entire PMOD A header, which leaves PMOD B — eight pins — for everything the two boards have to say to each other. Four for transmit, four for receive, and each direction gets exactly two differential pairs: one carrying data, one carrying a forwarded clock.",
          "That constraint decided the rest of the design. A 720p stream at 30FPS doesn't fit down a single serial line, so we downsample to 320×180 in RGB565 by keeping every fourth pixel and send it as 18-bit packets, two header bits and sixteen of payload. At 57,600 pixels a frame and ten frames a second that comes to 10.4 Mbit/s before overhead, which is what set our floor at a 12.5MHz link clock.",
        ],
      },
      {
        heading: "Finding the packet boundary",
        body: [
          "The receiver gets a clock and a single data bit. Nothing in that tells it where one 18-bit packet ends and the next one starts.",
          "We open every transmission with a long burst of a reserved sync word, picked for low autocorrelation and for being a pattern that can never show up in real pixel traffic. The deserializer shifts bits into an 18-bit window on each falling clock edge and compares it against that word. Because the burst repeats a million times, every possible bit phase gets tried, so alignment is guaranteed no matter how the two boards happened to power up. Once it locks we never resynchronize — alignment just holds, frame after frame, until something resets.",
        ],
      },
      {
        heading: "Where physics turned up",
        body: [
          "Pushing a fast edge across breadboard jumpers is where a tidy design meets the actual world. We ran the pairs as TMDS_33 through OBUFDS and IBUFDS primitives to get the FPGA's internal termination, then added external pull-up networks to bias each pair somewhere stable. Several resistance values later we settled on 220Ω.",
          "The other surprise was that PMOD B's pins aren't clock-capable, so the clock generation IP we had planned on was out. We ended up making the differential clock by counting down the board's own 100MHz system clock, which was both simpler and accurate enough.",
        ],
      },
      {
        heading: "Proving it",
        body: [
          "In simulation we wrote a cocotb testbench that swapped the frame buffer BRAMs for plain Python arrays, so we could push a real image in one end and write whatever fell out the other end to a file. Reconstruction came back pixel-accurate; the only differences at all were artifacts from the RGB565 colour conversion.",
          "On hardware we probed the pairs at 5, 12.5 and 25MHz with the scope in subtraction mode. Jitter on the edges gets visibly worse as the rate climbs, but decoding stayed correct the whole way up.",
        ],
      },
      {
        heading: "What isn't done",
        body: [
          "Audio exists, but it's not wired into the link yet. The microphone ADC reads over SPI into a ring buffer sized for a tenth of a second at 8ksps, and playback goes back out over PWM to the headphone jack — we had to repurpose the board's servo pins to get it connected at all, since the camera had already claimed everything else. Joining that ring buffer to the transmit state machine is the work still left.",
        ],
      },
    ],
    images: [
      {
        file: "fpgacetime-setup.jpg",
        alt: "Two RealDigital FPGA boards linked through a breadboard of twisted-pair jumpers and series resistors, with an OV5640 camera module and an audio cable",
        caption:
          "Camera in on the right, audio out on the left, and the breadboard in between where the link actually lives.",
      },
      {
        file: "fpgacetime-blockdiagram.png",
        alt: "Block diagram of the FPGAceTime dataflow, from camera through three frame buffers and the differential link to the HDMI display composer",
        caption:
          "Camera in, three frame buffers, serializer across the differential pair, composer out to HDMI.",
      },
      {
        file: "fpgacetime-scope-25mhz.jpg",
        alt: "Oscilloscope capture of the differential clock and data pairs running at 25MHz, with a subtraction trace showing clean digital transitions",
        caption:
          "The pairs at 25MHz. The purple trace is DATA_P minus DATA_N — the actual bits, pulled back out of two noisy lines.",
      },
    ],
  },

  wodou: {
    tagline: "Wordle-inspired Chinese calligraphy cipher puzzle.",
    blurb:
      "Wordle-inspired Chinese calligraphy cipher puzzle.",
    sections: [
      {
        body: [
          "Every year the HackMIT organizing team writes puzzles. Top X puzzle solvers are automatically admitted to the undergraduate hackathon. I made Wodou for HackMIT 2024.",
          "On the surface it's Wordle, except the board is prefilled with Chinese characters... and you're guessing 6 characters.",
          "Underneath, it's a cryptography puzzle. Good luck!",
        ],
      },
    ],
    images: [
      {
        file: "wodou-game.png",
        alt: "The Wodou board",
        caption:
          "What it looks like.",
      },
    ],
  },
};
