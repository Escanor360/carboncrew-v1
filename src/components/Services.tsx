import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const services = [
  { 
    icon: '🌐', 
    title: 'Web Development', 
    description: 'Custom websites and web apps with cutting-edge tech.',
    tags: ['React', 'Next.js', 'TypeScript'],
  },
  { 
    icon: '📱', 
    title: 'Mobile Apps', 
    description: 'Native and cross-platform mobile experiences.',
    tags: ['React Native', 'iOS', 'Android'],
  },
  { 
    icon: '🎨', 
    title: 'UI/UX Design', 
    description: 'Beautiful, intuitive designs that convert.',
    tags: ['Figma', 'Prototyping'],
  },
  { 
    icon: '☁️', 
    title: 'Cloud Solutions', 
    description: 'Scalable infrastructure and DevOps.',
    tags: ['AWS', 'Docker', 'CI/CD'],
  },
  { 
    icon: '🤖', 
    title: 'AI Integration', 
    description: 'Smart AI-powered features and automation.',
    tags: ['ML', 'OpenAI', 'NLP'],
  },
  { 
    icon: '🔒', 
    title: 'Security', 
    description: 'Robust protection for your data.',
    tags: ['Auth', 'Encryption'],
  },
];

const ServiceCard: React.FC<{ service: typeof services[0]; index: number; inView: boolean }> = ({ service, index, inView }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="relative h-full p-5 rounded-xl overflow-hidden cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
          border: isHovered ? '1px solid rgba(244, 63, 94, 0.35)' : '1px solid rgba(255, 255, 255, 0.06)',
          boxShadow: isHovered ? '0 8px 24px rgba(225, 29, 72, 0.12)' : 'none',
        }}
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {/* Icon */}
        <motion.div 
          className="w-11 h-11 rounded-lg flex items-center justify-center text-xl mb-3"
          style={{
            background: 'linear-gradient(135deg, rgba(225, 29, 72, 0.12) 0%, rgba(244, 63, 94, 0.06) 100%)',
            border: '1px solid rgba(244, 63, 94, 0.18)',
          }}
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.25 }}
        >
          {service.icon}
        </motion.div>
        
        {/* Title */}
        <h3 
          className="text-base font-bold mb-1.5 transition-colors duration-200"
          style={{ color: isHovered ? '#FB7185' : 'white' }}
        >
          {service.title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-3">
          {service.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {service.tags.map((tag, i) => (
            <span 
              key={i} 
              className="px-2 py-0.5 rounded text-xs font-medium"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: isHovered ? '#FB7185' : '#9ca3af',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [headerRef, headerInView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section id="services" className="relative min-h-screen flex items-center py-20 overflow-hidden bg-gray-950">
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cherry-600/5 rounded-full blur-3xl" />
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cherry-500/25 to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Header - aligned right for left Antimatter */}
        <motion.div
          ref={headerRef}
          className="ml-auto max-w-2xl text-right mb-12"
        >
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
            What We Offer
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl lg:text-5xl font-bold text-white mb-4"
          >
            Services That{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cherry-400 via-cherry-500 to-rose-500">
              Transform
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-gray-400 text-base max-w-md ml-auto"
          >
            Comprehensive digital solutions tailored to elevate your business
          </motion.p>
        </motion.div>
        
        {/* Services grid - compact */}
        <div ref={ref} className="ml-auto max-w-4xl">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
