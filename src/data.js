export const NAME = "Usman Yousuf";
export const ROLE_TAG = "Full-Stack Software Engineer";
export const EMAIL = "usmanyousuf02@gmail.com";
export const PHONE = "+92 300 3482848";
export const LOCATION = "Karachi, Pakistan";

// Headshot lives at public/profile.png and appears in the hero + about.
export const PROFILE_IMG = "/profile.png";
// Résumé is served from public/resume.html
export const RESUME_URL = "/resume.html";

export const NAV_LINKS = [
  { label: "Services", href: "#Services" },
  { label: "Experience", href: "#Experience" },
  { label: "Works", href: "#Works" },
  { label: "About", href: "#About" },
  { label: "Contact", href: "#Contact" },
];

// TODO: replace "#" with your real LinkedIn/GitHub profile URLs — until then
// these are hidden from the UI so there are no dead links.
export const SOCIAL_LINKS = [
  { label: "Linkedin", href: "#" },
  { label: "Github", href: "#" },
];

export const SERVICES = [
  {
    index: "01",
    title: "Full-Stack Web Development",
    description:
      "I build complete web applications end to end — from React interfaces to Node.js/Express APIs backed by MongoDB or MySQL — shipped independently across the stack in production.",
    items: ["React, Redux, TanStack Query", "Node.js, Express.js, REST APIs", "MongoDB, MySQL"],
  },
  {
    index: "02",
    title: "Mobile App Development",
    description:
      "I build cross-platform apps with React Native, including native Android modules in Java when the JS layer isn't enough, focused on performance and a smaller footprint.",
    items: ["React Native, Android Studio", "Native module development (Java)", "Firebase Analytics"],
  },
  {
    index: "03",
    title: "Performance & Systems",
    description:
      "I care about what happens after launch — profiling, refactoring, and applying ML where it earns its place, so systems stay fast and cheap to run as they scale.",
    items: ["Performance optimization & refactoring", "Python, OpenCV, PyTorch (YOLO)", "Docker, Git, code review"],
  },
];

export const PROJECTS = [
  {
    title: "PDF Customization Tool",
    name: "Ain Finance",
    category: "Full-Stack",
    year: "2024",
    featured: true,
    href: "#",
    description:
      "Live PDF editor for transaction documents — text, colors, and layout with real-time rendering, layout persistence, and one-click export. Built independently, frontend and backend.",
  },
  {
    title: "Client-Facing Portal Redesign",
    name: "Ain Finance",
    category: "Full-Stack",
    year: "2024",
    featured: true,
    href: "#",
    description:
      "Complete redesign and rebuild of a client-facing portal on a modern stack, lifting user acceptance by 20%.",
  },
  {
    title: "Whisper Transcription API",
    name: "Epaging",
    category: "Backend",
    year: "2023",
    href: "#",
    description:
      "Backend server API around OpenAI Whisper for audio transcription, built for seamless integration and end-user accessibility.",
  },
  {
    title: "YOLO Fire Detection System",
    name: "Epaging",
    category: "ML / Computer Vision",
    year: "2023",
    href: "#",
    description:
      "Trained YOLO models with OpenCV and PyTorch for remote camera monitoring, powering fire detection and SOP compliance.",
  },
  {
    title: "Data Security Dashboard",
    name: "Epaging",
    category: "Full-Stack",
    year: "2023",
    href: "#",
    description:
      "Full-featured dashboard built with React, Redux, and TanStack Query for a mobile data-security platform.",
  },
];

export const METRICS = [
  { value: "3+", label: "Years shipping production" },
  { value: "20+", label: "Projects delivered" },
  { value: "50%", label: "Faster mobile load times" },
  { value: "20%", label: "Higher user adoption" },
];

export const SKILLS = [
  {
    title: "Frontend",
    items: ["JavaScript", "React", "React Native", "Tailwind CSS", "Material UI", "Ant Design", "Redux", "TanStack Query"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "Python", "Flask"],
  },
  {
    title: "Database",
    items: ["MongoDB", "MySQL"],
  },
  {
    title: "Tools",
    items: ["Docker", "Git", "Webpack", "Android Studio"],
  },
];

export const ABOUT_PARAGRAPHS = [
  "I'm a full-stack engineer who builds production web and mobile apps end to end — React and React Native on the surface, Node.js and Express underneath. I like owning a feature from a rough idea to something people rely on: writing it, shipping it, then going back to make it faster and cheaper to run.",
];

// The parts most people skip past — the substance behind the statement above.
// Rendered as an editorial list in the About section instead of prose columns.
export const ABOUT_PRINCIPLES = [
  {
    title: "Validation before users hit it",
    body: "Input logic that catches errors early — the calculation and validation layer I wrote at Ain Finance eliminated user-side input errors outright.",
  },
  {
    title: "Speed on a bad connection",
    body: "Pixel-perfect, responsive screens that stay fast where it counts — cutting mobile load time 50% and the storage footprint alongside it.",
  },
  {
    title: "Down to the native layer",
    body: "When the JS layer isn't enough I drop into a native Android module in Java — whatever moves the number that actually matters.",
  },
];

export const EDUCATION = {
  degree: "Bachelor's in Computer Science",
  school: "DHA Suffa University, Karachi",
  dates: "Nov 2018 – Feb 2023",
};

export const EXPERIENCE = [
  {
    index: "01",
    role: "Software Developer",
    company: "Ain Finance",
    location: "Karachi",
    dates: "Feb 2024 — Present",
    items: [
      "Designed and shipped a full-stack PDF customization editor end to end, working solo across frontend and backend.",
      "Rebuilt the client-facing portal on a modern stack — user acceptance up 20%.",
      "Wrote React calculation and validation logic that eliminated user-side input errors.",
      "Cut mobile load time 50% and storage footprint 10% through pixel-perfect, responsive screens.",
      "Mentored incoming interns into productive contributors on the team.",
    ],
  },
  {
    index: "02",
    role: "MERN Stack Developer",
    company: "Epaging Pvt. Ltd",
    location: "Karachi",
    dates: "Jul 2023 — Feb 2024",
    items: [
      "Built the backend API around OpenAI Whisper for audio transcription.",
      "Trained YOLO models (Python, OpenCV, PyTorch) for remote camera monitoring and fire detection.",
      "Built a native Android module in Java for React Native to optimize PDF text extraction.",
      "Built the data-security platform's dashboard in React, Redux, and TanStack Query.",
    ],
  },
  {
    index: "03",
    role: "Mobile Application Developer",
    company: "Thinkwyser (Bryt)",
    location: "Karachi",
    dates: "Oct 2022 — May 2023",
    items: [
      "Integrated TanStack Query to streamline data retrieval and state management.",
      "Built a flashcard quiz feature to boost student engagement and retention.",
    ],
  },
];
