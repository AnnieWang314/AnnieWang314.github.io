/**
 * Project pages are off for now — the gallery still uses everything in here for
 * images and taglines, it just doesn't link through. Flip this back to true to
 * turn the pages (and the tile links) back on.
 */
export const PROJECT_PAGES_ENABLED = false;

export interface DetailSection {
  heading?: string;
  /** Each string is a paragraph. */
  body: string[];
}

export interface ProjectDetail {
  /** One line under the title. Sets up the story; not a summary. */
  blurb: string;
  /** A handful of words for the work index. Shorter than the blurb, on purpose. */
  tagline: string;
  /** Generated artwork to use instead of a photograph. */
  art?: "autoscale";
  /** Short label/value pairs shown as a strip near the top. */
  facts?: { label: string; value: string }[];
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
  }[];
}

export const details: Record<string, ProjectDetail> = {
  modal: {
    art: "autoscale",
    tagline: "When should a container exist, and when should it stop?",
    blurb:
      "Three months on a single question: when should a container exist, and when should it stop?",
    facts: [
      { label: "Where", value: "Modal Labs" },
      { label: "When", value: "Summer 2026" },
      { label: "Stack", value: "Go · Python · Rust" },
    ],
    sections: [
      {
        body: [
          "Modal runs your code in containers, on machines you never have to think about. Somebody calls a function, and somewhere a container has to be alive and ready to take that call. Deciding how many containers should exist, right now, is the autoscaler's job — and it's a job with no free mistakes. Too few containers and work sits in a queue. Too many and you're paying for machines doing nothing.",
          "I spent the summer across three parts of that system: the Rust worker that runs containers, the Go input plane that routes work to them, and the Python control plane that decides how many there should be.",
        ],
      },
      {
        heading: "A container that guesses wrong",
        body: [
          "Before a worker finishes the input it's running, it decides whether to reach for another one. To decide well it needs a sense of how long inputs take. The existing logic formed that sense from the very first call it saw.",
          "The first call is the worst possible sample. It's a warm-up — imports, model loads, cold caches — and it's rarely representative of anything. But the failure I found was the opposite of what you'd expect: when that first call happened to be fast, the container concluded that all its work would be fast, and kept claiming more. Slow inputs then piled onto that one container while other containers sat with nothing to do.",
          "I replaced the single sample with a rolling history of recent call times, ignoring the first one. On a benchmark mixing fast and slow inputs, queue time dropped by roughly half. The behavior worth preserving — genuinely fast inputs continuing to run efficiently on one container — stayed intact.",
        ],
      },
      {
        heading: "You can't A/B test an autoscaler",
        body: [
          "The obvious way to evaluate an autoscaling policy is to ship it and watch. That's slow, expensive, and not even a fair comparison: traffic is never the same twice, so two policies never face the same test.",
          "So I built a simulator instead — a discrete-event model with one controller loop and one coroutine per simulated container, able to replay real production traffic or generate synthetic patterns: steady load, ramps, spikes, gaps and resumptions, redeploys mid-flight.",
          "That turned a months-long question into an afternoon. I ran policies across more than a hundred scenarios and compared them on latency, cost, and containers that were created but never given work. The useful output wasn't a winner. It was a tradeoff curve — and the finding that several intuitive policies were quietly amplifying noise rather than predicting demand. A good chunk of the summer's value was deciding what not to ship.",
        ],
      },
      {
        heading: "Why did this container die?",
        body: [
          "A container can stop for a lot of reasons. The autoscaler drained it. A redeploy replaced it. It was preempted, or cancelled, or timed out, or ran out of memory, or crashed. From the outside all of these looked roughly the same, which made them hard to explain to users and hard to debug internally.",
          "I catalogued the start and stop paths and designed lifecycle records so that each one carries its reason, along with the autoscaler state that produced the decision. The point is that months later somebody can ask why a container disappeared and get an actual answer instead of an inference.",
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
      "A headband that catches you grinding your teeth — for a problem nobody can yet explain.",
    facts: [
      { label: "Where", value: "Y Combinator Summer Fellowship" },
      { label: "When", value: "2025" },
      { label: "Cohort", value: "29 fellows from 10,000+" },
      { label: "Built", value: "Circuit · Firmware · Model · iOS" },
    ],
    sections: [
      {
        body: [
          "About a third of people grind their teeth, mostly at night and mostly without knowing it. In a 2021 survey by the American Dental Association, 70% of dentists reported seeing more of it. It starts as the occasional toothache and ends at chipped teeth, chronic migraines, and in the worst cases jaw fractures.",
          "Nobody knows what causes it. Stress, genetics, facial structure — the honest answer is that it's unsettled.",
        ],
      },
      {
        heading: "The gap",
        body: [
          "A dentist I interviewed put the problem plainly: there had been a lot of times he thought a patient was clenching, but couldn't be sure. Nothing tracks grinding, or tracks whatever might be causing it, so by the time a dentist can see the evidence it's already in the enamel.",
          "The existing options sit at the wrong end of the tradeoff. A night guard is noninvasive but completely passive — it protects the teeth and does nothing about the grinding. Surgery is proactive and invasive. We went after the corner nobody was in: proactive and noninvasive.",
        ],
      },
      {
        heading: "Reading the muscle",
        body: [
          "Clenching is a masseter contraction, and a contracting muscle leaks electrical activity you can pick up on the surface of the skin. Surface EMG is small, noisy, and easily swamped by an ordinary head moving on a pillow, so most of the work is deciding what in the signal is actually real.",
          "Across 8,751 samples the classifier reached 88% accuracy on a single user, and 80% overall once you account for the variation between people and between recording sessions. That gap is the real research problem, and it's why the device calibrates to each user instead of shipping one model for everybody.",
        ],
      },
      {
        heading: "Making it wearable",
        body: [
          "Detection on a bench isn't a product. I designed the custom circuit through two revisions, along with the firmware, the BLE integration, and a power budget that has to survive an entire night — a wearable that dies at 3am has measured nothing.",
          "The headband pairs with an iOS app I built, which logs each event and its intensity and also pulls in room temperature, humidity, and noise, on the theory that whatever sets off a night of grinding might show up in the environment around it.",
        ],
      },
      {
        heading: "What works, and what is still ahead",
        body: [
          "Detection, the custom circuit, and the app all work. The piece still ahead is intervention: using electrical muscle stimulation to interrupt a clench gently enough that the person stays asleep. That's the entire point of the device, and it's the part that isn't built yet.",
          "Somniac was built over the Y Combinator Summer Fellowship, as one of 29 fellows selected from more than 10,000 applicants.",
        ],
      },
    ],
    images: [
      {
        file: "somniac-headband.jpg",
        alt: "The inside of the Somniac headband: three conductive fabric electrodes stitched into a maroon band, each with a wire running out of it",
        caption:
          "The inside of the band. Three fabric electrodes, sitting over the muscle that does the clenching.",
      },
      {
        file: "somniac-emg.jpg",
        alt: "Scatter plot of surface EMG values over time, with clenching samples in red and non-clenching samples in blue forming clearly separated bands",
        caption:
          "Surface EMG, clenching in red against everything else in blue. Separable — but not equally separable for every person.",
      },
      {
        file: "somniac-app.jpg",
        alt: "The Somniac iOS app showing a grinding history dashboard with total events, duration, average intensity and a per-event intensity timeline",
        caption: "The app: what a night of grinding looks like the morning after.",
      },
    ],
  },

  hackmit: {
    tagline: "Two years, fifteen engineers, five apps, a thousand hackers.",
    blurb:
      "Running the software behind a hackathon — and the apps it turned out to need.",
    facts: [
      { label: "Where", value: "HackMIT & Blueprint" },
      { label: "When", value: "2023 Oct — 2025 Mar" },
      { label: "Team", value: "15 engineers" },
      { label: "Scale", value: "1000+ participants" },
    ],
    sections: [
      {
        body: [
          "HackMIT is a thousand-person hackathon; Blueprint is its sibling for high schoolers. Both run on software that somebody has to build, and for two years that was my team — fifteen engineers, most of them students picking up the stack as they went, on a deadline that doesn't move because the event is on a specific weekend.",
          "Five apps, deployed to EC2 behind Nginx and Cloudflare. Three of them are worth describing here; the organizer admission puzzle gets its own page.",
        ],
      },
      {
        heading: "Plume — the platform",
        body: [
          "Running a hackathon for a thousand people involves a surprising number of separate softwares: something to take applications, something to check people in, something to collect projects, something to judge them, and a pile of admin tooling to fix all the things that go wrong at 2am. HackMIT had been doing this across several disconnected tools. Plume is the attempt to make it one thing.",
          "I built the judging and ranking system, which is the part with actual teeth. Judges see a small number of projects each, no judge sees everything, and the scores have to combine into a ranking that's defensible when a team asks why they didn't win.",
        ],
      },
      {
        heading: "Pigeon — the inbox",
        body: [
          "A RAG email assistant that drafts replies out of the inbox's own history, so the same question asked three hundred times doesn't get answered three hundred times by hand. I oversaw its Chrome extension going into Gmail and Outlook, and added authentication and document imports.",
        ],
      },
      {
        heading: "Splash — the front door",
        body: [
          "The landing page is the first and often only thing someone sees before deciding whether the event is for them. For a lot of Blueprint's audience it's also their first hackathon of any kind, so the page is doing persuasion, not just information.",
          "Rather than a hero image with a nav bar on top, the 2025 site is a single isometric room rendered in Three.js: a bakery, with the dates chalked onto the blackboard, the navigation propped up on an easel by the door, and a fox working the counter. The information lives in the room. It's also a lot of bytes to put in front of someone on a school laptop, which is the tension the whole build runs on.",
        ],
      },
      {
        heading: "What it taught me",
        body: [
          "Mostly that leading fifteen people to a fixed deadline is an exercise in deciding what not to build. The MVP shipped because we were ruthless about everything that wasn't in it.",
        ],
      },
    ],
    images: [
      {
        file: "splash-blueprint-2025.jpg",
        alt: "The Blueprint 2025 landing page: an isometric 3D bakery with the event dates on a chalkboard",
        caption:
          "Blueprint 2025. The dates are chalked on the board and the nav sits on the easel.",
      },
      { file: "plume-dashboard.png", alt: "Plume admin dashboard" },
      { file: "plume-judging.png", alt: "Plume judging interface" },
    ],
  },

  thermominator: {
    tagline: "Keeping a wearable alive on a very small battery.",
    blurb:
      "A wearable heat monitor, and the firmware that keeps it alive on a very small battery.",
    facts: [
      { label: "Course", value: "6.900 — Engineering for Impact" },
      { label: "When", value: "2026 Feb — May 2026" },
      { label: "Team", value: "8 people, 5 subteams" },
      { label: "My role", value: "Firmware lead" },
    ],
    sections: [
      {
        body: [
          "Thermominator is a personal heat monitor: a wearable that tracks heat exposure and warns the person wearing it before they're in trouble. A team of eight built it across firmware, power, sensors, server, and industrial design. I led firmware.",
        ],
      },
      {
        heading: "Sleep is the whole problem",
        body: [
          "A wearable's real constraint is the battery, and on an ESP32-C3 the difference between a device that lasts hours and one that lasts days is entirely about how aggressively it sleeps. But sleep is in tension with everything else: a sleeping radio isn't reporting, a sleeping sensor isn't sampling.",
          "I wrote the firmware as a C++ state machine that moved deliberately between modem sleep, light sleep, and deep sleep, so the device was only ever as awake as the moment required.",
        ],
      },
      {
        heading: "The integration surface",
        body: [
          "Firmware is where every other subteam's work has to meet. I integrated WiFi communication, the sensor stack, the LCD display, battery management, and the backend server connection — which in practice meant being the person who found out that two subsystems disagreed about timing.",
        ],
      },

    ],
    images: [
      {
        file: "thermominator-device.png",
        alt: "CAD render of the Thermominator: an oval enclosure with a lanyard loop, opened to show the PCB, LCD, two buttons, USB-C, buzzer, and battery connector",
        caption:
          "The enclosure with its lid off — LCD, two buttons, buzzer, USB-C, and the battery that all the sleep logic exists to protect.",
        transparent: true,
      },
      { file: "thermominator-team.jpg", alt: "The 6.900 team" },
    ],
  },

  fpgacetime: {
    tagline: "Live video and audio between two FPGAs, over eight pins.",
    blurb:
      "Two FPGAs, eight pins between them, and a live video link built out of nothing but RTL.",
    facts: [
      { label: "Course", value: "6.205 — Digital Systems" },
      { label: "When", value: "2025 Oct — Dec" },
      { label: "With", value: "Sanjith Udupa" },
      { label: "Stack", value: "SystemVerilog · cocotb · Vivado" },
    ],
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
    facts: [
      { label: "Where", value: "HackMIT" },
      { label: "When", value: "2024" },
    ],
    sections: [
      {
        body: [
          "Every year HackMIT admits new organizers, and every year the application involves a puzzle. Wodou was mine.",
          "On the surface it's Wordle, except you're guessing Chinese characters rather than English words — which changes the game, because a character carries structure that a five-letter word doesn't. Strokes, radicals, and shape all become information you can reason from.",
          "Underneath, it's a cryptography puzzle. Solving the game is the beginning rather than the end, and the algorithmic layer is what actually separated applicants.",
        ],
      },
      {
        heading: "Why a puzzle at all",
        body: [
          "A puzzle is a better filter than an essay. It selects for people who will sit with something confusing for an evening and not put it down — which is most of what organizing turns out to require.",
        ],
      },
    ],
    images: [
      {
        file: "wodou-game.png",
        alt: "The Wodou board: a five-by-six grid of Chinese characters with an empty input row beneath it",
        caption:
          "Five characters across, six guesses down — the same shape as Wordle, with far more to reason from in each tile.",
      },
    ],
  },
};
