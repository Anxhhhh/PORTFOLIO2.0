"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink, FileText } from "lucide-react";

const ResumeModal = ({ isOpen, onClose, resumeUrl = "/resume.pdf" }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl h-[85vh] bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black/40 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-500/10 rounded-lg">
                  <FileText className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <h3 className="text-white font-medium tracking-wide">My Resume</h3>
                  <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">Anshraj Singh</p>
                </div>
              </div>

              <div className="flex items-center gap-2 md:gap-4">
                {/* Download Button */}
                <a
                  href={resumeUrl}
                  download="Anshraj_Singh_Resume.pdf"
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs md:text-sm font-medium transition-all group"
                >
                  <Download className="w-4 h-4 text-pink-500 group-hover:scale-110 transition-transform" />
                  <span className="hidden sm:inline text-white">Download</span>
                </a>

                {/* Open in New Tab */}
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all group"
                  title="Open in new tab"
                >
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </a>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 border border-transparent hover:border-white/10 rounded-full transition-all group"
                >
                  <X className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                </button>
              </div>
            </div>

            {/* Resume Viewer */}
            <div className="flex-1 bg-[#111] relative overflow-hidden">
               {/* Embedding the PDF */}
               <iframe
                src={`${resumeUrl}#toolbar=0`}
                className="w-full h-full border-none"
                title="Resume PDF"
              />
              
              {/* Fallback for browsers that don't support iframes or have issues with PDF display */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                 <p className="text-gray-500 text-sm">Loading Preview...</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal;
