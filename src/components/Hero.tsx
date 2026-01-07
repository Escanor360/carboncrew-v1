import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Dark background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />
      
      {/* Subtle animated grid */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Ambient glow - subtle and clean */}
      <div 
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cherry-600/6 rounded-full blur-[160px] pointer-events-none"
      />
      
      {/* Main content container */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-2xl lg:max-w-3xl">
          
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <div 
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full backdrop-blur-sm"
              style={{
                background: 'rgba(244, 63, 94, 0.08)',
                border: '1px solid rgba(244, 63, 94, 0.2)',
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cherry-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cherry-500"></span>
              </span>
              <span className="text-sm text-cherry-300/90 font-medium">Innovation Driven Studio</span>
            </div>
          </motion.div>
          
          {/* Headline - clean and impactful */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
              <span className="text-white">Building</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cherry-400 via-cherry-500 to-rose-500">
                Digital Excellence
              </span>
            </h1>
          </motion.div>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-lg leading-relaxed"
          >
            We transform innovative ideas into exceptional digital experiences. 
            Your vision, our expertise.
          </motion.p>
          
          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <motion.a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-white"
              style={{
                background: 'linear-gradient(135deg, #E11D48 0%, #BE123C 100%)',
                boxShadow: '0 4px 20px rgba(225, 29, 72, 0.25)',
              }}
              whileHover={{ 
                scale: 1.02, 
                boxShadow: '0 8px 30px rgba(225, 29, 72, 0.35)' 
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              Start Your Project
              <svg className="w-4.5 h-4.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
            
            <motion.a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-gray-300 backdrop-blur-sm transition-colors"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
              whileHover={{ 
                scale: 1.02,
                background: 'rgba(255, 255, 255, 0.06)',
                borderColor: 'rgba(244, 63, 94, 0.25)',
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              View Our Work
            </motion.a>
          </motion.div>
          
          {/* Stats - clean minimal cards */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-8 md:gap-12"
          >
            {[
              { value: '50+', label: 'Projects' },
              { value: '98%', label: 'Satisfaction' },
              { value: '5+', label: 'Years' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="group"
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-cherry-400 group-hover:text-cherry-300 transition-colors">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-gray-500"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
