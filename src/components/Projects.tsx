import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const projects = [
  { 
    title: 'FinTech Dashboard', 
    category: 'Web App', 
    description: 'Real-time analytics with advanced data visualization.',
    tags: ['React', 'D3.js', 'Node.js'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
  },
  { 
    title: 'E-Commerce Platform', 
    category: 'Full Stack', 
    description: 'Scalable marketplace with AI recommendations.',
    tags: ['Next.js', 'Stripe', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
  },
  { 
    title: 'Health & Wellness', 
    category: 'Mobile', 
    description: 'Cross-platform fitness app with health tracking.',
    tags: ['React Native', 'Firebase'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop',
  },
  { 
    title: 'AI Content Studio', 
    category: 'SaaS', 
    description: 'Generative AI platform for content creation.',
    tags: ['Python', 'OpenAI', 'FastAPI'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
  },
];

const ProjectCard: React.FC<{ project: typeof projects[0]; index: number; inView: boolean }> = ({ project, index, inView }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="relative h-[260px] rounded-xl overflow-hidden cursor-pointer"
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 350, damping: 22 }}
      >
        {/* Image */}
        <div className="absolute inset-0">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent" />
          <div className="absolute inset-0 bg-cherry-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
        </div>
        
        {/* Border */}
        <div 
          className="absolute inset-0 rounded-xl border transition-all duration-300"
          style={{
            borderColor: isHovered ? 'rgba(244, 63, 94, 0.35)' : 'rgba(255, 255, 255, 0.08)',
            boxShadow: isHovered ? '0 8px 28px rgba(244, 63, 94, 0.12)' : 'none'
          }}
        />
        
        {/* Content */}
        <div className="absolute inset-0 p-5 flex flex-col justify-end">
          {/* Category */}
          <span 
            className="absolute top-4 left-4 px-2.5 py-0.5 rounded-full text-xs font-medium"
            style={{ 
              background: 'rgba(225, 29, 72, 0.18)',
              border: '1px solid rgba(244, 63, 94, 0.25)',
              color: '#FB7185'
            }}
          >
            {project.category}
          </span>
          
          {/* Title & Description */}
          <div>
            <motion.h3 
              className="text-xl font-bold text-white mb-1.5"
              animate={{ y: isHovered ? -6 : 0 }}
              transition={{ duration: 0.25 }}
            >
              {project.title}
            </motion.h3>
            
            <AnimatePresence>
              {isHovered && (
                <motion.p
                  initial={{ opacity: 0, y: 10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: 5, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-gray-300 text-sm mb-3"
                >
                  {project.description}
                </motion.p>
              )}
            </AnimatePresence>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag, i) => (
                <span 
                  key={i} 
                  className="px-2 py-0.5 rounded text-xs font-medium"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#e5e7eb'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Arrow */}
          <motion.div
            className="absolute bottom-4 right-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(244, 63, 94, 0.25)',
                border: '1px solid rgba(244, 63, 94, 0.4)'
              }}
            >
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [headerRef, headerInView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section id="projects" className="relative min-h-screen flex items-center py-20 overflow-hidden bg-gray-950">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cherry-600/5 rounded-full blur-3xl" />
      
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
            Our Work
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl lg:text-5xl font-bold text-white mb-4"
          >
            Featured{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cherry-400 via-cherry-500 to-rose-500">
              Projects
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-gray-400 text-base max-w-md ml-auto"
          >
            A showcase of our recent digital creations
          </motion.p>
        </motion.div>
        
        {/* Projects grid */}
        <div ref={ref} className="ml-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
