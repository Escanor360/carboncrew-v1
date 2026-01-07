import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const reasons = [
  { number: '01', title: 'Expert Team', description: 'Skilled developers and designers delivering excellence.' },
  { number: '02', title: 'Cutting-Edge Tech', description: 'Latest technologies for future-proof solutions.' },
  { number: '03', title: 'Agile Process', description: 'Flexible development with rapid delivery.' },
  { number: '04', title: '24/7 Support', description: 'Round-the-clock dedicated support.' },
];

const stats = [
  { value: '99%', label: 'Retention' },
  { value: '150+', label: 'Clients' },
  { value: '24/7', label: 'Support' },
  { value: '50+', label: 'Projects' },
];

const WhyCarbonCrew: React.FC = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [headerRef, headerInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="why" className="relative min-h-screen flex items-center py-20 overflow-hidden bg-gray-900">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-cherry-600/5 rounded-full blur-3xl" />
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cherry-500/25 to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-xl">
          {/* Header */}
          <motion.div ref={headerRef} className="mb-10">
            <motion.span 
              initial={{ opacity: 0, y: 15 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4"
              style={{
                background: 'rgba(225, 29, 72, 0.12)',
                border: '1px solid rgba(244, 63, 94, 0.2)',
                color: '#FB7185'
              }}
            >
              Why Choose Us
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl lg:text-5xl font-bold text-white mb-4"
            >
              Why{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cherry-400 via-cherry-500 to-rose-500">
                CarbonCrew
              </span>
              ?
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="text-gray-400 text-base"
            >
              Your partners in digital transformation
            </motion.p>
          </motion.div>
          
          {/* Reasons list - compact */}
          <div ref={ref} className="space-y-3 mb-10">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group"
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <motion.div 
                  className="flex gap-4 p-4 rounded-xl cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                    border: hoveredIdx === index ? '1px solid rgba(244, 63, 94, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)',
                    boxShadow: hoveredIdx === index ? '0 4px 20px rgba(225, 29, 72, 0.08)' : 'none',
                  }}
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Number */}
                  <div 
                    className="flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(225, 29, 72, 0.12) 0%, rgba(244, 63, 94, 0.06) 100%)',
                      border: '1px solid rgba(244, 63, 94, 0.18)',
                    }}
                  >
                    <span className="text-cherry-400 text-sm font-mono font-bold">{reason.number}</span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 
                      className="text-base font-bold mb-0.5 transition-colors duration-200"
                      style={{ color: hoveredIdx === index ? '#FB7185' : 'white' }}
                    >
                      {reason.title}
                    </h3>
                    <p className="text-gray-400 text-sm truncate">{reason.description}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
          
          {/* Stats row - compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-4 gap-3"
          >
            {stats.map((stat, i) => (
              <motion.div 
                key={i} 
                className="text-center p-3 rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
                whileHover={{ y: -3, borderColor: 'rgba(244, 63, 94, 0.25)' }}
                transition={{ duration: 0.2 }}
              >
                <div 
                  className="text-2xl font-bold mb-0.5"
                  style={{
                    background: 'linear-gradient(135deg, #FB7185 0%, #E11D48 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyCarbonCrew;
