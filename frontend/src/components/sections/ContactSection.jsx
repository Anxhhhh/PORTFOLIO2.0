import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  Mail, Phone, MapPin, ArrowRight, Send, 
  CheckCircle, Github, Linkedin, Twitter, Instagram,
  Sparkles
} from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form Animation Refs & Values
  const formRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for tilt
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), { stiffness: 150, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), { stiffness: 150, damping: 25 });
  
  // Magnetic glow values
  const glowX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const glowY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e) => {
    if (!formRef.current) return;
    const rect = formRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/Anxhhhh", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/anshraj-singh-thakur-349ab533b/", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://www.instagram.com/itsansh_123/", label: "Instagram" },
  ];

  const contactMethods = [
    {
      title: "Email",
      value: "anshforworkhere@gmail.com",
      icon: Mail,
      link: "mailto:anshforworkhere@gmail.com",
    },
    {
      title: "Phone",
      value: "6264902102",
      icon: Phone,
      link: "tel:+91 6264902102",
    },
    {
      title: "Location",
      value: "Bhopal, Madhya Pradesh, India",
      icon: MapPin,
      link: "https://www.google.com/maps/place/Bhopal,+Madhya+Pradesh+462039/@23.1815135,77.440342,14z/data=!3m1!4b1!4m6!3m5!1s0x397c43ba796cc34f:0x1969d70d0ba13163!8m2!3d23.1940843!4d77.4386429!16s%2Fg%2F1hhwmyz3_?entry=ttu&g_ep=EgoyMDI2MDMxOC4xIKXMDSoASAFQAw%3D%3D",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://127.0.0.1:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        alert(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to connect to the server. Please check if the backend is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  };

  const slideVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const floatVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="contact" className="relative bg-[#030303] text-white py-32 px-6 md:px-12 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/15 via-emerald-500/5 to-transparent rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/10 via-transparent to-transparent rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
        <motion.div animate={{ y: [0, -30, 0], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur-[80px]" />
        <motion.div animate={{ y: [0, 20, 0], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-1/3 left-1/3 w-48 h-48 rounded-full bg-gradient-to-r from-violet-500/15 to-emerald-500/15 blur-[60px]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24 items-start"
        >
          {/* Left Block: Heading + Contact Cards */}
          <div className="space-y-12">
            <motion.div variants={slideVariants} className="space-y-6">
              <motion.div variants={floatVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 backdrop-blur-sm">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                </motion.div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-emerald-400/90 font-medium">Get In Touch</span>
              </motion.div>

              <h3 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-[0.95]">
                Let's Work
                <span className="block mt-2 bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">Together</span>
              </h3>
              <p className="text-base text-gray-400 font-light leading-relaxed max-w-md">
                Have a project in mind? Drop me a message and let's create something extraordinary.
              </p>
            </motion.div>

            {/* Contact Methods moved here */}
            <motion.div variants={slideVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.link}
                  whileHover={{ y: -4, scale: 1.02, backgroundColor: "rgba(255,255,255,0.06)" }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm overflow-hidden transition-all duration-300"
                >
                  <div className="relative flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-emerald-500/30 transition-colors">
                      <method.icon className="w-4 h-4 text-gray-400 group-hover:text-emerald-400 transition-colors" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] uppercase tracking-[0.15em] text-gray-500 mb-0.5">{method.title}</p>
                      <p className="text-xs text-gray-200 font-medium tracking-wide truncate">{method.value}</p>
                    </div>
                  </div>
                </motion.a>
              ))}

              {/* Social Links merged into grid */}
              <div className="group relative p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm flex flex-col justify-center gap-3">
                <p className="text-[9px] uppercase tracking-[0.15em] text-gray-500">Follow Me</p>
                <div className="flex gap-2">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2, scale: 1.1 }}
                      className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300"
                    >
                      <social.icon className="w-3.5 h-3.5 text-gray-400 hover:text-emerald-400 transition-colors" strokeWidth={1.5} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Block: Form with 3D Tilt & Magnetic Glow */}
          <motion.div 
            variants={slideVariants} 
            ref={formRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
            className="relative"
          >
            {/* Form Glow Follower */}
            <motion.div 
              style={{ 
                left: useTransform(glowX, (val) => `calc(50% + ${val}px)`),
                top: useTransform(glowY, (val) => `calc(50% + ${val}px)`),
                translateX: "-50%",
                translateY: "-50%"
              }}
              className="absolute pointer-events-none w-[400px] h-[400px] bg-emerald-500/15 rounded-full blur-[80px] z-0"
            />
            
            {/* Glass Container */}
            <div className="relative rounded-[2.5rem] bg-gradient-to-b from-white/[0.1] to-white/[0.02] backdrop-blur-3xl border border-white/[0.12] shadow-2xl overflow-hidden p-8 md:p-12">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
              
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="py-20 flex flex-col items-center justify-center text-center space-y-6">
                    <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center"><CheckCircle className="w-10 h-10 text-emerald-400" /></div>
                    <div className="space-y-2">
                      <h4 className="text-2xl font-bold text-white">Message Sent!</h4>
                      <p className="text-gray-400">I'll get back to you shortly.</p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    <div className="space-y-2 mb-4">
                      <h4 className="text-2xl font-bold text-white tracking-tight">Send a message</h4>
                      <p className="text-sm text-gray-500 font-light">I'm usually responding within 24 hours.</p>
                    </div>

                    <div className="space-y-6">
                      {['name', 'email'].map((field) => (
                        <div key={field} className="relative group/input">
                          <input
                            type={field === 'email' ? 'email' : 'text'}
                            value={formData[field]}
                            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                            onFocus={() => setFocusedField(field)}
                            onBlur={() => setFocusedField(null)}
                            required
                            className="w-full bg-white/[0.04] border border-white/10 rounded-2xl py-5 px-6 pl-14 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/30 transition-all duration-300"
                            placeholder={field === 'name' ? 'Your Name' : 'Email Address'}
                          />
                          <div className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === field ? 'text-emerald-400' : 'text-gray-600'}`}>
                            {field === 'name' ? <Sparkles className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                          </div>
                        </div>
                      ))}

                      <div className="relative group/input">
                        <textarea
                          rows="4"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full bg-white/[0.04] border border-white/10 rounded-2xl py-5 px-6 pl-14 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/30 transition-all duration-300 resize-none"
                          placeholder="How can I help you?"
                        />
                        <div className={`absolute left-5 top-6 transition-colors duration-300 ${focusedField === 'message' ? 'text-emerald-400' : 'text-gray-600'}`}>
                          <Send className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative w-full py-5 rounded-2xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 text-black text-sm tracking-widest uppercase transition-all duration-300 disabled:opacity-50"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                        {!isSubmitting && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                      </span>
                    </motion.button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes gradient { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .animate-gradient { animation: gradient 3s ease infinite; }
      `}</style>
    </section>
  );
};

export default ContactSection;
