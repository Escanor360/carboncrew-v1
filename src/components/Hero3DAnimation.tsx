import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const Hero3DAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 30, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

  useEffect(() => {
    setIsVisible(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, mouseX, mouseY]);

  // Code snippets for floating elements
  const codeSnippets = useMemo(() => [
    { code: '<div>', color: 'text-code-blue', x: -40, y: -30 },
    { code: '{ }', color: 'text-code-yellow', x: 45, y: -25 },
    { code: '/>', color: 'text-code-green', x: -35, y: 35 },
    { code: '()', color: 'text-code-purple', x: 40, y: 30 },
    { code: '=>', color: 'text-code-orange', x: 0, y: -45 },
    { code: '[]', color: 'text-code-cyan', x: -50, y: 0 },
  ], []);

  // Tech icons
  const techIcons = useMemo(() => [
    { icon: '⚛️', name: 'React', angle: 0 },
    { icon: '📱', name: 'Mobile', angle: 60 },
    { icon: '🚀', name: 'Deploy', angle: 120 },
    { icon: '⚡', name: 'Fast', angle: 180 },
    { icon: '💻', name: 'Code', angle: 240 },
    { icon: '☁️', name: 'Cloud', angle: 300 },
  ], []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px] perspective-1000"
    >
      {/* Background Glow */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-40"
        style={{
          background: 'radial-gradient(circle at center, rgba(225, 29, 72, 0.25) 0%, transparent 60%)',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main 3D Container */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center preserve-3d"
        style={isMobile ? {} : { rotateX, rotateY }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Outer Orbital Rings */}
        <motion.div
          className="absolute w-[240px] sm:w-[280px] md:w-[340px] lg:w-[400px] xl:w-[440px] aspect-square rounded-full border border-white/5"
          style={{ transform: 'rotateX(70deg)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        
        <motion.div
          className="absolute w-[200px] sm:w-[240px] md:w-[290px] lg:w-[340px] xl:w-[380px] aspect-square rounded-full border-2 border-cherry-600/20"
          style={{ transform: 'rotateX(70deg)' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {/* Orbiting Tech Icons */}
          {techIcons.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="absolute w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 glass rounded-xl flex items-center justify-center"
              style={{
                left: '50%',
                top: '50%',
                transform: `rotate(${tech.angle}deg) translateX(${isMobile ? 100 : 150}px) rotate(-${tech.angle}deg)`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.2 }}
            >
              <span className="text-base sm:text-lg md:text-xl">{tech.icon}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="absolute w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] xl:w-[320px] aspect-square rounded-full border border-dashed border-white/10"
          style={{ transform: 'rotateX(70deg) rotateY(15deg)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        {/* Vertical Ring */}
        <motion.div
          className="absolute w-[140px] sm:w-[170px] md:w-[200px] lg:w-[240px] xl:w-[280px] aspect-square rounded-full border border-cherry-600/15 hidden sm:block"
          style={{ transform: 'rotateY(90deg)' }}
          animate={{ rotateZ: 360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        />

        {/* Main Code Terminal */}
        <motion.div
          className="relative w-[180px] sm:w-[200px] md:w-[240px] lg:w-[280px] xl:w-[320px]"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {/* Terminal Window */}
          <div className="glass-card overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 border-b border-white/5">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-cherry-500" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-code-yellow" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-code-green" />
              <span className="ml-2 text-[10px] sm:text-xs text-dark-400 font-mono">carbon.tsx</span>
            </div>
            
            {/* Terminal Body - Code */}
            <div className="p-3 sm:p-4 font-mono text-[10px] sm:text-xs md:text-sm space-y-1.5 sm:space-y-2">
              <CodeLine number={1} delay={0.5}>
                <span className="text-code-purple">const</span>{' '}
                <span className="text-code-blue">CarbonCrew</span>{' '}
                <span className="text-white">=</span>{' '}
                <span className="text-code-yellow">{'{'}</span>
              </CodeLine>
              
              <CodeLine number={2} delay={0.7}>
                <span className="text-code-cyan ml-4">passion</span>
                <span className="text-white">:</span>{' '}
                <span className="text-code-green">'∞'</span>
                <span className="text-white">,</span>
              </CodeLine>
              
              <CodeLine number={3} delay={0.9}>
                <span className="text-code-cyan ml-4">quality</span>
                <span className="text-white">:</span>{' '}
                <span className="text-code-orange">100</span>
                <span className="text-white">,</span>
              </CodeLine>
              
              <CodeLine number={4} delay={1.1}>
                <span className="text-code-cyan ml-4">build</span>
                <span className="text-white">:</span>{' '}
                <span className="text-code-purple">() =&gt;</span>{' '}
                <span className="text-code-green">'🚀'</span>
              </CodeLine>
              
              <CodeLine number={5} delay={1.3}>
                <span className="text-code-yellow">{'}'}</span>
                <span className="text-white">;</span>
              </CodeLine>
            </div>

            {/* Typing Cursor */}
            <motion.div
              className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-2 h-4 sm:h-5 bg-cherry-500"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>

          {/* Glow Effect Behind Terminal */}
          <motion.div
            className="absolute -inset-4 sm:-inset-6 rounded-3xl -z-10"
            style={{
              background: 'radial-gradient(circle, rgba(225, 29, 72, 0.15) 0%, transparent 70%)',
            }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>

        {/* Floating Code Snippets */}
        {codeSnippets.map((snippet, index) => (
          <motion.div
            key={index}
            className={`absolute font-mono font-bold text-sm sm:text-base md:text-lg lg:text-xl ${snippet.color} opacity-60`}
            style={{
              left: `calc(50% + ${snippet.x * (isMobile ? 0.6 : 1)}%)`,
              top: `calc(50% + ${snippet.y * (isMobile ? 0.6 : 1)}%)`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={isVisible ? {
              opacity: [0.4, 0.7, 0.4],
              y: [0, -10, 0],
              scale: 1,
            } : {}}
            transition={{
              opacity: { duration: 3, repeat: Infinity, delay: index * 0.3 },
              y: { duration: 4, repeat: Infinity, delay: index * 0.2 },
              scale: { duration: 0.5, delay: 0.8 + index * 0.1 },
            }}
          >
            {snippet.code}
          </motion.div>
        ))}

        {/* Floating Particles */}
        {[...Array(isMobile ? 10 : 20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-cherry-400/40"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Status Indicator */}
      <motion.div
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 glass px-3 py-1.5 sm:px-4 sm:py-2 rounded-full flex items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          className="w-2 h-2 rounded-full bg-code-green"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="text-[10px] sm:text-xs font-mono text-dark-300">Ready to build</span>
      </motion.div>
    </div>
  );
};

// Code Line Component with typing animation
const CodeLine: React.FC<{ number: number; delay: number; children: React.ReactNode }> = ({ 
  number, 
  delay, 
  children 
}) => {
  return (
    <motion.div
      className="flex items-start gap-2 sm:gap-3"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <span className="text-dark-500 select-none w-3 sm:w-4 text-right flex-shrink-0 text-[9px] sm:text-[10px]">
        {number}
      </span>
      <div className="flex-1 whitespace-nowrap overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
};

export default Hero3DAnimation;
