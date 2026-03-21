import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from "framer-motion";
import { Layers, Layout, Server, Sparkles, Puzzle, Database } from "lucide-react";
import TechMarquee from "../ui/TechMarquee";
import NextSectionButton from "../ui/NextSectionButton";

const SkillCard = ({ skill, variants }) => {
  const Icon = skill.icon;
  const cardRef = useRef(null);
  
  // Mouse motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-150, 150], [15, -15]);
  const rotateY = useTransform(x, [-150, 150], [-15, 15]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX - width / 2);
    y.set(mouseY - height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      variants={variants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        rotateX, 
        rotateY, 
        transformStyle: "preserve-3d" 
      }}
      whileHover={{ y: -5 }}
      className="group relative bg-zinc-900/80 backdrop-blur-2xl border border-white/10 p-6 md:p-8 min-h-[250px] flex flex-col justify-between hover:bg-zinc-800/90 hover:border-red-500/40 transition-all duration-500 overflow-hidden cursor-pointer shadow-2xl"
    >
      {/* Glossy Border Reveal */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: useMotionTemplate`radial-gradient(200px circle at ${x}px ${y}px, rgba(239,68,68,0.15), transparent)`
        }}
      />
      
      {/* Premium Inner Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(239,68,68,0.05)_0%,transparent_70%)]" />

      <div 
	style={{ transform: "translateZ(60px)" }}
	className="relative z-10 w-12 h-12 rounded-full border border-red-500/20 bg-red-500/5 flex items-center justify-center mb-12 group-hover:bg-red-500/20 group-hover:border-red-500/40 group-hover:scale-110 transition-all duration-500 shadow-[0_0_20px_rgba(239,68,68,0.0)] group-hover:shadow-[0_0_25px_rgba(239,68,68,0.2)]"
      >
	<Icon className="w-5 h-5 text-red-500 group-hover:text-red-400 group-hover:rotate-[360deg] transition-all duration-700" strokeWidth={1.5} />
      </div>

      <div style={{ transform: "translateZ(40px)" }} className="relative z-10">
	<h3 className="text-2xl font-normal text-gray-100 mb-3 tracking-wide group-hover:text-white group-hover:translate-x-1 transition-all duration-300">{skill.title}</h3>
	<p className="text-gray-400 text-[14px] leading-relaxed font-light group-hover:text-gray-200 transition-colors">{skill.description}</p>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const col1Y = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const col2Y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const col3Y = useTransform(scrollYProgress, [0, 1], [-30, 30]);

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
    <div id="skills" ref={sectionRef} className="relative min-h-[80vh] bg-black text-white pt-16 pb-4 px-6 md:px-12 font-sans overflow-hidden">
      <motion.div
	className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4"
	variants={containerVariants}
	initial="hidden"
	whileInView="visible"
	viewport={{ once: true, margin: "-100px" }}
      >
        {/* Infinite Tech Marquee */}
        <div className="md:col-span-3 -mt-8 md:-mt-16">
          <TechMarquee speed={5} />
        </div>

	{/* Column 1 */}
	<motion.div style={{ y: col1Y }} className="flex flex-col gap-4">
	  <motion.div
	    initial={{ opacity: 0, y: 20 }}
	    whileInView={{ opacity: 1, y: 0 }}
	    transition={{ duration: 0.6 }}
	    viewport={{ once: true }}
	    className="mb-4 md:mb-8 mt-2 ml-2"
	  >
	    <h2 className="text-[clamp(3.5rem,6vw,5rem)] font-light leading-none uppercase tracking-wide text-white mb-2">
	      SKILLS
	    </h2>
	    <p className="text-gray-400 text-[15px] font-light tracking-wide">Technical Excellence</p>
	  </motion.div>

	  <div className="flex flex-col gap-4">
	    <SkillCard skill={skills[0]} variants={itemVariants} />
	    <SkillCard skill={skills[3]} variants={itemVariants} />
	  </div>
	</motion.div>

	{/* Column 2 */}
	<motion.div style={{ y: col2Y }} className="flex flex-col gap-4 md:mt-16">
	  <SkillCard skill={skills[1]} variants={itemVariants} />
	  <SkillCard skill={skills[4]} variants={itemVariants} />
	</motion.div>

	{/* Column 3 */}
	<motion.div style={{ y: col3Y }} className="flex flex-col gap-4 md:mt-8">
	  <SkillCard skill={skills[2]} variants={itemVariants} />
	  <SkillCard skill={skills[5]} variants={itemVariants} />
	</motion.div>
      </motion.div>

      {/* Skills Next Button */}
      <NextSectionButton targetId="tech-stack" label="Next" />
    </div>
  );
};

export default Skills;
