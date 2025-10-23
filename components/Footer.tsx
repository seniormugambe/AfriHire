
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal text-white mt-auto">
      <div className="container mx-auto px-6 py-4 text-center">
        <p>&copy; {new Date().getFullYear()} Afri-Hire AI. All Rights Reserved.</p>
        <p className="text-sm text-stone-400">Built with Gemini & Hedera</p>
      </div>
    </footer>
  );
};

export default Footer;
