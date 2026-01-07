import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyCarbonCrew from './components/WhyCarbonCrew';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Antimatter from './components/Antimatter';

const App: React.FC = () => {
  return (
    <div className="min-h-screen font-sans antialiased overflow-x-hidden bg-dark-950">
      {/* Antimatter Particle Effect - Fixed position, moves based on section */}
      <Antimatter />
      
      <Navigation />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="services">
          <Services />
        </section>
        <section id="why">
          <WhyCarbonCrew />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;
