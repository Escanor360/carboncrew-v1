import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';

interface ShapeConfig {
  name: string;
  getPosition: (index: number, total: number, radius: number) => { x: number; y: number; z: number };
}

const SHAPES: Record<string, ShapeConfig> = {
  // Perfect Sphere - clean and elegant for home
  sphere: {
    name: 'sphere',
    getPosition: (index, total, radius) => {
      const r = radius * 0.85;
      // Fibonacci sphere for perfect distribution
      const phi = Math.acos(1 - 2 * (index / total));
      const theta = Math.PI * (1 + Math.sqrt(5)) * index;
      
      return {
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.cos(phi),
        z: r * Math.sin(phi) * Math.sin(theta),
      };
    },
  },
  
  // Lightbulb - for services/ideas
  bulb: {
    name: 'bulb',
    getPosition: (index, total, radius) => {
      const t = index / total;
      const r = radius;
      
      if (t < 0.7) {
        // Spherical bulb top
        const localT = t / 0.7;
        const phi = Math.acos(1 - 2 * localT);
        const theta = Math.PI * (1 + Math.sqrt(5)) * index;
        const bulbR = r * 0.72;
        return {
          x: bulbR * Math.sin(phi) * Math.cos(theta),
          y: -r * 0.15 + bulbR * Math.cos(phi) * 0.75,
          z: bulbR * Math.sin(phi) * Math.sin(theta),
        };
      } else {
        // Base screw part
        const localT = (t - 0.7) / 0.3;
        const angle = localT * Math.PI * 14;
        const baseR = r * 0.22 * (1 - localT * 0.35);
        return {
          x: baseR * Math.cos(angle),
          y: r * 0.45 + localT * r * 0.38,
          z: baseR * Math.sin(angle),
        };
      }
    },
  },
  
  // Thick C Logo - bold and recognizable
  cLogo: {
    name: 'cLogo',
    getPosition: (index, total, radius) => {
      const t = index / total;
      const r = radius;
      
      if (t < 0.85) {
        // The C shape - thicker distribution
        const localT = t / 0.85;
        const startAngle = Math.PI * 0.3;
        const endAngle = Math.PI * 1.7;
        const angle = startAngle + localT * (endAngle - startAngle);
        
        // Create thick C by varying radius in layers
        const layer = Math.floor((index % 5)) / 5; // 5 layers for thickness
        const thickness = r * 0.28; // Thicker C
        const baseR = r * 0.55;
        const radiusVar = baseR + (layer - 0.5) * thickness;
        
        // Add depth variation for 3D feel
        const zLayer = (layer - 0.5) * r * 0.25;
        
        return {
          x: radiusVar * Math.cos(angle),
          y: radiusVar * Math.sin(angle),
          z: zLayer,
        };
      } else {
        // The dot - sphere
        const localT = (t - 0.85) / 0.15;
        const phi = Math.acos(1 - 2 * localT);
        const theta = Math.PI * (1 + Math.sqrt(5)) * (index - total * 0.85);
        const dotR = r * 0.15;
        const dotX = r * 0.42;
        const dotY = -r * 0.05;
        
        return {
          x: dotX + dotR * Math.sin(phi) * Math.cos(theta),
          y: dotY + dotR * Math.cos(phi),
          z: dotR * Math.sin(phi) * Math.sin(theta),
        };
      }
    },
  },
  
  // Rocket - sleek design
  rocket: {
    name: 'rocket',
    getPosition: (index, total, radius) => {
      const t = index / total;
      const r = radius;
      
      if (t < 0.28) {
        // Nose cone
        const localT = t / 0.28;
        const angle = localT * Math.PI * 10;
        const coneR = localT * r * 0.24;
        return {
          x: coneR * Math.cos(angle),
          y: -r * 0.85 + localT * r * 0.32,
          z: coneR * Math.sin(angle),
        };
      } else if (t < 0.62) {
        // Body cylinder
        const localT = (t - 0.28) / 0.34;
        const angle = localT * Math.PI * 12;
        const bodyR = r * 0.24;
        return {
          x: bodyR * Math.cos(angle),
          y: -r * 0.53 + localT * r * 0.85,
          z: bodyR * Math.sin(angle),
        };
      } else if (t < 0.78) {
        // Window circle
        const localT = (t - 0.62) / 0.16;
        const angle = localT * Math.PI * 2;
        const windowR = r * 0.09;
        return {
          x: windowR * Math.cos(angle),
          y: -r * 0.32 + windowR * Math.sin(angle) * 0.5,
          z: r * 0.25,
        };
      } else {
        // 3 Fins
        const localT = (t - 0.78) / 0.22;
        const finIdx = Math.floor(localT * 3);
        const finT = (localT * 3) % 1;
        const baseAngle = (finIdx / 3) * Math.PI * 2;
        const finR = r * 0.24 + finT * r * 0.28;
        const finY = r * 0.08 + finT * r * 0.38;
        return {
          x: finR * Math.cos(baseAngle),
          y: finY,
          z: finR * Math.sin(baseAngle),
        };
      }
    },
  },
  
  // Chat bubble - WhatsApp style speech bubble
  message: {
    name: 'message',
    getPosition: (index, total, radius) => {
      const t = index / total;
      const r = radius;
      
      if (t < 0.85) {
        // Main bubble - rounded speech bubble shape
        const localT = t / 0.85;
        const angle = localT * Math.PI * 2;
        
        // Create a rounded bubble shape (like WhatsApp)
        // Use parametric equation for a smoother bubble
        const baseRadius = r * 0.7;
        
        // Make it slightly wider than tall
        const xScale = 1.15;
        const yScale = 0.85;
        
        // Add slight squircle effect for rounded corners
        const squircle = Math.pow(Math.abs(Math.cos(angle)), 0.3) + Math.pow(Math.abs(Math.sin(angle)), 0.3);
        const radiusMod = baseRadius / Math.pow(squircle, 0.5);
        
        // Add layers for 3D depth
        const layer = (index % 5) / 5;
        const zOffset = (layer - 0.5) * r * 0.35;
        const layerScale = 0.85 + layer * 0.3;
        
        return {
          x: Math.cos(angle) * radiusMod * xScale * layerScale,
          y: Math.sin(angle) * radiusMod * yScale * layerScale - r * 0.05,
          z: zOffset,
        };
      } else {
        // Tail/pointer at bottom-left (like WhatsApp bubble tail)
        const localT = (t - 0.85) / 0.15;
        
        // Create a triangular tail pointing down-left
        const tailProgress = localT;
        const layer = (index % 4) / 4;
        
        // Tail starts from bottom-left of bubble and points down
        const startX = -r * 0.55;
        const startY = r * 0.35;
        const endX = -r * 0.75;
        const endY = r * 0.7;
        
        // Interpolate along tail with some spread
        const spread = (1 - tailProgress) * r * 0.18;
        
        return {
          x: startX + (endX - startX) * tailProgress + (layer - 0.5) * spread,
          y: startY + (endY - startY) * tailProgress,
          z: (layer - 0.5) * r * 0.12,
        };
      }
    },
  },
};

// Updated section shapes: home=sphere, services=bulb, why=cLogo, projects=rocket, contact=message
const SECTION_SHAPES: Record<string, string> = {
  home: 'sphere',
  services: 'bulb',
  why: 'cLogo',
  projects: 'rocket',
  contact: 'message',
};

const SECTION_POSITIONS: Record<string, 'left' | 'right'> = {
  home: 'right',
  services: 'left',
  why: 'right',
  projects: 'left',
  contact: 'right',
};

interface Particle {
  id: number;
  currentX: number;
  currentY: number;
  currentZ: number;
  targetX: number;
  targetY: number;
  targetZ: number;
  velocityX: number;
  velocityY: number;
  velocityZ: number;
  size: number;
  baseOpacity: number;
  colorIndex: number;
  orbitOffset: number;
}

const CHERRY_COLORS = [
  { h: 346, s: 84, l: 50 },
  { h: 350, s: 89, l: 60 },
  { h: 353, s: 96, l: 72 },
  { h: 355, s: 100, l: 82 },
  { h: 340, s: 82, l: 58 },
];

const Antimatter: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const rotationRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0, isHovering: false });
  const scatterRef = useRef(0);
  const timeRef = useRef(0);
  const currentShapeRef = useRef('sphere');
  
  const [currentSection, setCurrentSection] = useState('home');
  const [isMobile, setIsMobile] = useState(false);
  const [position, setPosition] = useState<'left' | 'right'>('right');
  
  const PARTICLE_COUNT = useMemo(() => isMobile ? 200 : 350, [isMobile]);
  const BASE_RADIUS = useMemo(() => isMobile ? 85 : 125, [isMobile]);
  const CANVAS_SIZE = useMemo(() => isMobile ? 340 : 550, [isMobile]);
  
  const initializeParticles = useCallback((shape: string) => {
    const shapeConfig = SHAPES[shape] || SHAPES.sphere;
    const particles: Particle[] = [];
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const pos = shapeConfig.getPosition(i, PARTICLE_COUNT, BASE_RADIUS);
      const colorIndex = Math.floor(Math.random() * CHERRY_COLORS.length);
      
      particles.push({
        id: i,
        currentX: pos.x + (Math.random() - 0.5) * 60,
        currentY: pos.y + (Math.random() - 0.5) * 60,
        currentZ: pos.z + (Math.random() - 0.5) * 60,
        targetX: pos.x,
        targetY: pos.y,
        targetZ: pos.z,
        velocityX: 0,
        velocityY: 0,
        velocityZ: 0,
        size: 1.8 + Math.random() * 1.4,
        baseOpacity: 0.75 + Math.random() * 0.25,
        colorIndex,
        orbitOffset: Math.random() * Math.PI * 2,
      });
    }
    
    particlesRef.current = particles;
    currentShapeRef.current = shape;
  }, [PARTICLE_COUNT, BASE_RADIUS]);
  
  const morphToShape = useCallback((shape: string) => {
    if (currentShapeRef.current === shape) return;
    
    const shapeConfig = SHAPES[shape] || SHAPES.sphere;
    
    particlesRef.current.forEach((particle, index) => {
      const pos = shapeConfig.getPosition(index, PARTICLE_COUNT, BASE_RADIUS);
      particle.targetX = pos.x;
      particle.targetY = pos.y;
      particle.targetZ = pos.z;
    });
    
    currentShapeRef.current = shape;
  }, [PARTICLE_COUNT, BASE_RADIUS]);
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'why', 'projects', 'contact'];
      const scrollY = window.scrollY + window.innerHeight * 0.45;
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetHeight = el.offsetHeight;
          if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
            if (currentSection !== sectionId) {
              setCurrentSection(sectionId);
              morphToShape(SECTION_SHAPES[sectionId] || 'sphere');
              setPosition(SECTION_POSITIONS[sectionId] || 'right');
            }
            break;
          }
        }
      }
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSection, morphToShape]);
  
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  
  useEffect(() => {
    initializeParticles('sphere');
  }, [initializeParticles]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left - rect.width / 2;
      mouseRef.current.y = e.clientY - rect.top - rect.height / 2;
    };
    
    const handleEnter = () => { mouseRef.current.isHovering = true; };
    const handleLeave = () => { mouseRef.current.isHovering = false; };
    
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseenter', handleEnter);
    canvas.addEventListener('mouseleave', handleLeave);
    
    return () => {
      canvas.removeEventListener('mousemove', handleMove);
      canvas.removeEventListener('mouseenter', handleEnter);
      canvas.removeEventListener('mouseleave', handleLeave);
    };
  }, []);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const dpr = window.devicePixelRatio || 1;
    canvas.width = CANVAS_SIZE * dpr;
    canvas.height = CANVAS_SIZE * dpr;
    canvas.style.width = CANVAS_SIZE + 'px';
    canvas.style.height = CANVAS_SIZE + 'px';
    ctx.scale(dpr, dpr);
    
    const animate = () => {
      const cx = CANVAS_SIZE / 2;
      const cy = CANVAS_SIZE / 2;
      
      ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      
      timeRef.current += 0.005;
      
      // Smooth slow rotation
      rotationRef.current.y += 0.0025;
      rotationRef.current.x = Math.sin(timeRef.current * 0.15) * 0.04;
      
      // Very smooth scatter interpolation
      const targetScatter = mouseRef.current.isHovering ? 1 : 0;
      scatterRef.current += (targetScatter - scatterRef.current) * 0.04;
      
      // Sort by Z for depth
      const sorted = [...particlesRef.current].sort((a, b) => a.currentZ - b.currentZ);
      
      sorted.forEach((p) => {
        // Smoother spring physics
        const spring = 0.045;
        const damping = 0.88;
        
        const dx = p.targetX - p.currentX;
        const dy = p.targetY - p.currentY;
        const dz = p.targetZ - p.currentZ;
        
        p.velocityX = p.velocityX * damping + dx * spring;
        p.velocityY = p.velocityY * damping + dy * spring;
        p.velocityZ = p.velocityZ * damping + dz * spring;
        
        p.currentX += p.velocityX;
        p.currentY += p.velocityY;
        p.currentZ += p.velocityZ;
        
        // Gentle scatter on hover
        let sx = 0, sy = 0, sz = 0;
        if (scatterRef.current > 0.01) {
          const mdx = p.currentX - mouseRef.current.x;
          const mdy = p.currentY - mouseRef.current.y;
          const dist = Math.sqrt(mdx * mdx + mdy * mdy) + 1;
          const force = Math.min(70 / dist, 1.8) * scatterRef.current;
          sx = (mdx / dist) * force * 35;
          sy = (mdy / dist) * force * 35;
          sz = (Math.random() - 0.5) * force * 20;
        }
        
        const x = p.currentX + sx;
        const y = p.currentY + sy;
        const z = p.currentZ + sz;
        
        // Gentle orbit
        const orbit = 1.2;
        const ox = Math.sin(timeRef.current * 0.4 + p.orbitOffset) * orbit;
        const oy = Math.cos(timeRef.current * 0.4 + p.orbitOffset) * orbit;
        
        // 3D rotation
        const cosY = Math.cos(rotationRef.current.y);
        const sinY = Math.sin(rotationRef.current.y);
        const rx = (x + ox) * cosY - z * sinY;
        const rz = (x + ox) * sinY + z * cosY;
        
        const cosX = Math.cos(rotationRef.current.x);
        const sinX = Math.sin(rotationRef.current.x);
        const ry = (y + oy) * cosX - rz * sinX;
        const fz = (y + oy) * sinX + rz * cosX;
        
        // Perspective
        const perspective = 420;
        const scale = perspective / (perspective + fz);
        const px = cx + rx * scale;
        const py = cy + ry * scale;
        
        // Depth-based rendering
        const depth = Math.max(0, Math.min(1, (fz + BASE_RADIUS) / (BASE_RADIUS * 2)));
        const size = Math.max(0.5, p.size * scale * (0.55 + depth * 0.55));
        const opacity = Math.max(0, p.baseOpacity * (0.45 + depth * 0.55) * (1 - scatterRef.current * 0.12));
        
        // Glow
        const glowR = Math.max(1, size * 3.5);
        const grad = ctx.createRadialGradient(px, py, 0, px, py, glowR);
        
        const color = CHERRY_COLORS[p.colorIndex];
        const hue = color.h + Math.sin(timeRef.current + p.id * 0.025) * 4;
        const sat = color.s;
        const light = color.l + depth * 10;
        
        grad.addColorStop(0, `hsla(${hue},${sat}%,${light + 12}%,${opacity})`);
        grad.addColorStop(0.35, `hsla(${hue},${sat}%,${light}%,${opacity * 0.45})`);
        grad.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(px, py, glowR, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        
        // Core
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue},100%,90%,${opacity})`;
        ctx.fill();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [isMobile, BASE_RADIUS, CANVAS_SIZE]);
  
  const posStyle = position === 'left' 
    ? { left: '3%', right: 'auto' }
    : { left: 'auto', right: '3%' };
  
  return (
    <motion.div
      className="fixed top-1/2 z-30 pointer-events-none hidden md:block"
      initial={false}
      animate={{
        ...posStyle,
        y: '-50%',
      }}
      transition={{
        type: 'spring',
        stiffness: 45,
        damping: 22,
        mass: 1.1,
      }}
    >
      {/* Ambient glow */}
      <div 
        className="absolute inset-0 -m-20 rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(244, 63, 94, 0.5) 0%, rgba(225, 29, 72, 0.25) 50%, transparent 70%)',
        }}
      />
      
      <motion.div
        className="relative pointer-events-auto"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 350, damping: 22 }}
      >
        <canvas
          ref={canvasRef}
          className="cursor-pointer"
          style={{
            filter: 'drop-shadow(0 0 35px rgba(244, 63, 94, 0.35))',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Antimatter;
