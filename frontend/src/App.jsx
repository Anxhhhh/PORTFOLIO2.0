import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

void motion;
import {
  ArrowLeft,
  ArrowRight,
  Database,
  ExternalLink,
  Layers,
  Layout,
  Puzzle,
  Server,
  Sparkles,
  Trophy,
} from "lucide-react";

// ==========================================
// 1. PRELOADER COMPONENT
// ==========================================
const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const name = "ANSHRAJ";

  useEffect(() => {
    const removeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(removeTimer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#0c0c0c] font-sans text-white origin-top"
        >
          <style>{`
            @keyframes loadingLine {
              0% { width: 0%; transform: translateX(-100%); }
              100% { width: 100%; transform: translateX(0%); }
            }
          `}</style>

          <div
            className="absolute inset-0 z-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
            }}
          />

          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              className="flex py-4 text-4xl font-light tracking-[0.3em] uppercase md:text-5xl"
              variants={{
                hidden: { opacity: 1 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08, delayChildren: 0.2 },
                },
              }}
              initial="hidden"
              animate="visible"
            >
              {name.split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: {
                      y: 40,
                      opacity: 0,
                    },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className="inline-block"
                  style={{ textShadow: "0 0 20px rgba(255,255,255,0.2)" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.div>

            <div className="relative mt-8 h-[2px] w-64 overflow-hidden rounded-full bg-white/5">
              <div className="absolute top-0 left-0 h-full w-full animate-[loadingLine_2.5s_cubic-bezier(0.76,0,0.24,1)_forwards] bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ==========================================
// 2. HERO COMPONENT
// ==========================================
const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0c0c0c] font-sans text-white selection:bg-white/20 selection:text-white">
      <div className="absolute inset-0 bg-[#0c0c0c]" />

      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(1200px 600px at 50% 40%, rgba(255,255,255,0.08), transparent 100%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
      />
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-soft-light pointer-events-none"
        style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
      />

      <nav className="absolute top-0 z-20 flex w-full items-start justify-between px-8 py-8 text-[15px] font-normal tracking-wide md:px-12">
        <div className="flex gap-8">
          <a href="#about" className="transition-colors hover:text-gray-400">About</a>
          <a href="#services" className="transition-colors hover:text-gray-400">Services</a>
        </div>
        <div className="translate-y-[-2px] text-lg font-normal tracking-widest uppercase">PORTFOLIO</div>
        <div className="flex gap-8">
          <a href="#contact" className="transition-colors hover:text-gray-400">Contact</a>
        </div>
      </nav>

      <div className="absolute top-1/2 left-8 z-20 flex -translate-y-1/2 flex-col text-[15px] leading-tight font-normal text-gray-200 md:left-12">
        <span>PORTFOLIO</span>
        <span>WEBSITE</span>
      </div>

      <div className="absolute top-1/2 right-8 z-20 hidden -translate-y-1/2 md:right-12 md:block">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
          className="cursor-pointer text-white transition-all hover:rotate-12 hover:scale-110"
        >
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center">
        <div className="relative flex w-full flex-col items-center justify-center">
          <h1 className="flex w-full flex-col text-center text-[clamp(4rem,9vw,9.5rem)] leading-[0.85] font-medium tracking-tight">
            <span>ANSHRAJ</span>
            <span>FULL&ndash;STACK</span>
            <div className="relative mx-auto flex w-full items-center justify-center">
              <span className="mt-2 font-serif text-[clamp(4.5rem,10vw,10.5rem)] font-normal tracking-normal">
                DEVELOPER
              </span>

              <div className="absolute top-1/2 left-1/2 z-30 hidden max-w-[280px] -translate-y-1/2 pt-6 pl-[clamp(320px,28vw,540px)] text-left text-[14px] leading-relaxed font-normal tracking-normal whitespace-pre-wrap text-gray-300 lg:block">
                <p>
                  A passionate full-stack developer
                  <br />
                  building immersive digital
                  <br />
                  experiences with modern web
                  <br />
                  technologies and creative design.
                </p>
              </div>
            </div>
          </h1>

          <div className="mt-12 max-w-[300px] text-center text-[14px] leading-relaxed font-normal text-gray-300 lg:hidden">
            <p>
              The first full-stack Web3 creative agency integrating AI technology to deliver best-in-class
              client experience.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center justify-center">
        <div className="group relative flex h-32 w-32 cursor-pointer items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full animate-[spin_10s_linear_infinite] text-gray-400 transition-colors group-hover:text-white"
          >
            <path id="circlePath" d="M 50, 50 m -32, 0 a 32,32 0 1,1 64,0 a 32,32 0 1,1 -64,0" fill="transparent" />
            <text className="fill-current text-[10px] tracking-[0.2em] uppercase">
              <textPath href="#circlePath" startOffset="0%">
                SCROLL TO EXPLORE • SCROLL TO EXPLORE •
              </textPath>
            </text>
          </svg>
          <svg className="h-5 w-5 text-white transition-all duration-300 group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="miter" strokeWidth={1.5} d="M12 4v16m0 0l-6-6m6 6l6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. SKILLS COMPONENT
// ==========================================
const Skills = () => {
  const skills = [
    {
      title: "Full Stack Development",
      description: "Building scalable web applications using modern frontend and backend technologies.",
      icon: Layers,
    },
    {
      title: "React & Frontend",
      description: "Creating interactive UI with React, Tailwind CSS and responsive design principles.",
      icon: Layout,
    },
    {
      title: "Backend Development",
      description: "Developing REST APIs and server logic using Node.js and databases.",
      icon: Server,
    },
    {
      title: "Artificial Intelligence",
      description: "Working with machine learning models and AI-based problem solving.",
      icon: Sparkles,
    },
    {
      title: "Problem Solving",
      description: "Strong DSA foundation with competitive programming experience.",
      icon: Puzzle,
    },
    {
      title: "Database Management",
      description: "Designing and managing structured and NoSQL databases efficiently.",
      icon: Database,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="about" className="relative z-10 min-h-screen bg-[#0c0c0c] px-6 py-32 font-sans text-white md:px-12">
      <motion.div
        className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 md:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="flex flex-col gap-6">
          <motion.div variants={itemVariants} className="mt-4 mb-8 ml-2 md:mb-12">
            <h2 className="mb-2 text-[clamp(3.5rem,6vw,5rem)] leading-none font-light tracking-wide text-white uppercase">
              SKILLS
            </h2>
            <p className="text-[15px] font-light tracking-wide text-gray-400">Technical Excellence</p>
          </motion.div>

          <SkillCard skill={skills[0]} variants={itemVariants} />
          <SkillCard skill={skills[3]} variants={itemVariants} />
        </div>

        <div className="flex flex-col gap-6 md:mt-32">
          <SkillCard skill={skills[1]} variants={itemVariants} />
          <SkillCard skill={skills[4]} variants={itemVariants} />
        </div>

        <div className="flex flex-col gap-6 md:mt-16">
          <SkillCard skill={skills[2]} variants={itemVariants} />
          <SkillCard skill={skills[5]} variants={itemVariants} />
        </div>
      </motion.div>
    </section>
  );
};

const SkillCard = ({ skill, variants }) => {
  const Icon = skill.icon;
  return (
    <motion.div
      variants={variants}
      className="group relative flex min-h-[300px] flex-col justify-between overflow-hidden border border-white/5 bg-[#111111]/80 p-8 backdrop-blur-md transition-colors duration-500 hover:bg-[#161616] md:p-10"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: "radial-gradient(circle at center, rgba(239,68,68,0.04) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 mb-12 flex h-12 w-12 items-center justify-center rounded-full border border-red-500/20 bg-red-500/5 transition-all duration-500 group-hover:scale-110 group-hover:bg-red-500/10">
        <Icon className="h-5 w-5 text-red-500 transition-colors group-hover:text-red-400" strokeWidth={1.5} />
      </div>

      <div className="relative z-10">
        <h3 className="mb-3 text-2xl font-normal tracking-wide text-gray-100">{skill.title}</h3>
        <p className="text-[14px] leading-relaxed font-light text-gray-400">{skill.description}</p>
      </div>
    </motion.div>
  );
};

// ==========================================
// 4. OUR WORKS COMPONENT
// ==========================================
const workSections = {
  projects: {
    label: "PROJECTS",
    eyebrow: "Featured Builds",
    title: "Placeholder projects with horizontal storytelling.",
    description:
      "Swipe or use the arrows to move through the cards. This layout is ready for your real case studies later.",
  },
  hackathon: {
    label: "HACKATHON",
    eyebrow: "Coming Soon",
    title: "Hackathon entries will appear here soon.",
    description: "Not here yet, but soon.",
  },
  achievements: {
    label: "ACHIEVEMENTS",
    eyebrow: "Coming Soon",
    title: "Achievements and milestones will live here soon.",
    description: "Not here yet, but soon.",
  },
};

const placeholderProjects = [
  {
    title: "Nova Commerce",
    category: "E-commerce Platform",
    year: "2026",
    summary: "A premium storefront concept with immersive product storytelling, analytics surfaces, and lightning-fast checkout.",
    stack: ["React", "Node.js", "Stripe"],
  },
  {
    title: "Pulse Board",
    category: "Analytics Dashboard",
    year: "2026",
    summary: "A live operations dashboard concept designed to turn dense product metrics into elegant, readable motion-led UI.",
    stack: ["Vite", "Framer Motion", "Charts"],
  },
  {
    title: "Echo Space",
    category: "Collaboration Suite",
    year: "2026",
    summary: "A collaborative workspace prototype with team rooms, shared notes, and an opinionated minimal productivity aesthetic.",
    stack: ["React", "Firebase", "Tailwind"],
  },
];

const OurWorks = () => {
  const [activeSection, setActiveSection] = useState(null);
  const projectRailRef = useRef(null);

  const scrollProjects = (direction) => {
    if (!projectRailRef.current) return;

    const rail = projectRailRef.current;
    const amount = rail.clientWidth * 0.82;
    rail.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  const renderContent = () => {
    if (!activeSection) return null;

    if (activeSection === "projects") {
      return (
        <motion.div
          key="projects-panel"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-10"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <p className="text-xs tracking-[0.4em] text-red-400 uppercase">{workSections.projects.eyebrow}</p>
              <h3 className="text-3xl leading-tight font-light text-white md:text-5xl">
                {workSections.projects.title}
              </h3>
              <p className="max-w-xl text-base leading-relaxed text-gray-400">
                {workSections.projects.description}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollProjects("prev")}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-white/30 hover:bg-white/10"
                aria-label="Scroll projects left"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollProjects("next")}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-white/30 hover:bg-white/10"
                aria-label="Scroll projects right"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div
            ref={projectRailRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {placeholderProjects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative min-h-[360px] min-w-[85%] snap-center overflow-hidden border border-white/10 bg-white/[0.03] p-8 md:min-w-[48%] xl:min-w-[32%]"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_28%)] opacity-80" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

                <div className="relative z-10 flex h-full flex-col justify-between gap-10">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between gap-4 text-sm uppercase tracking-[0.25em] text-gray-400">
                      <span>{project.category}</span>
                      <span>{project.year}</span>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-3xl font-light text-white md:text-4xl">{project.title}</h4>
                      <p className="max-w-md text-sm leading-7 text-gray-300">{project.summary}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex flex-wrap gap-3">
                      {project.stack.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs uppercase tracking-[0.25em] text-gray-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      className="inline-flex items-center gap-2 text-sm tracking-[0.3em] text-white uppercase transition group-hover:text-red-300"
                    >
                      View Concept
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        key={`${activeSection}-panel`}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="flex min-h-[360px] items-center justify-center border border-dashed border-white/10 bg-white/[0.02] p-8 text-center"
      >
        <div className="max-w-xl space-y-5">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5">
            <Trophy className="h-7 w-7 text-red-400" />
          </div>
          <p className="text-xs tracking-[0.4em] text-red-400 uppercase">{workSections[activeSection].eyebrow}</p>
          <h3 className="text-3xl leading-tight font-light text-white md:text-5xl">
            {workSections[activeSection].title}
          </h3>
          <p className="text-base leading-relaxed text-gray-400">{workSections[activeSection].description}</p>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="services" className="relative overflow-hidden bg-[#080808] px-6 py-32 text-white md:px-12">
      <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_48%)]" />

      <div className="relative z-10 mx-auto max-w-[1400px] space-y-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs tracking-[0.45em] text-red-400 uppercase">Selected Work</p>
            <h2 className="text-[clamp(3rem,6vw,5rem)] leading-[0.95] font-light uppercase">
              Our Works
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-gray-400 md:text-lg">
              Tap a category to open the respective showcase. Projects now use three placeholder cards with a
              horizontal scroll effect, while the other sections announce what is coming next.
            </p>
          </div>

          {activeSection && (
            <button
              type="button"
              onClick={() => setActiveSection(null)}
              className="inline-flex items-center gap-3 self-start rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm tracking-[0.3em] text-white uppercase transition hover:border-white/30 hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </button>
          )}
        </div>

        {!activeSection && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-6 md:grid-cols-3"
          >
            {Object.entries(workSections).map(([key, item]) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveSection(key)}
                className="group min-h-[260px] border border-white/10 bg-white/[0.03] p-8 text-left transition duration-500 hover:-translate-y-1 hover:border-red-400/40 hover:bg-white/[0.06]"
              >
                <div className="flex h-full flex-col justify-between gap-12">
                  <span className="text-xs tracking-[0.4em] text-red-400 uppercase">{item.eyebrow}</span>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-light text-white md:text-4xl">{item.label}</h3>
                    <p className="max-w-sm text-sm leading-7 text-gray-400 transition group-hover:text-gray-200">
                      Click to open the {item.label.toLowerCase()} panel.
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </motion.div>
        )}

        <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
      </div>
    </section>
  );
};

// ==========================================
// 5. MAIN APP EXPORT
// ==========================================
export default function App() {
  return (
    <div className="min-h-screen bg-[#0c0c0c] selection:bg-white/20 selection:text-white">
      <Preloader />
      <Hero />
      <Skills />
      <OurWorks />
    </div>
  );
}
