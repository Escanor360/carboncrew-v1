import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 border-t border-white/5 py-12">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-cherry-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-white font-bold">
              Carbon<span className="text-cherry-500">Crew</span>
            </span>
          </div>
          
          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            {['Home', 'Services', 'Projects', 'Contact'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-gray-500 hover:text-white transition-colors">
                {link}
              </a>
            ))}
          </div>
          
          {/* Copyright */}
          <p className="text-gray-600 text-sm">
            © 2026 CarbonCrew. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
