import React, { useState, useEffect } from 'react';
import { Palette, Brush, Sparkles } from 'lucide-react';

function Hire() {
  const [typewriterText, setTypewriterText] = useState('');
  const fullText = "I'm an artist who paints stories yet to be told.";

  useEffect(() => {
    let index = 0;
    let isTyping = true;
    let timer;

    const typeWriter = () => {
      if (isTyping) {
        if (index < fullText.length) {
          setTypewriterText(fullText.slice(0, index + 1));
          index++;
        } else {
          isTyping = false;
          timer = setTimeout(typeWriter, 2000); // Pause for 2 seconds when fully typed
          return;
        }
      } else {
        if (index > 0) {
          setTypewriterText(fullText.slice(0, index - 1));
          index--;
        } else {
          isTyping = true;
        }
      }

      timer = setTimeout(typeWriter, isTyping ? 100 : 50); // Type slower, erase faster
    };

    typeWriter();

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white font-mono border-2 border-white shadow-lg shadow-white">
      <div className="w-full max-w-4xl p-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center animate-pulse">
          About Me<span className="text-white">^_^</span>
        </h1>
        <div className="bg-gray-900 rounded-lg p-6 mb-8 border border-white shadow-lg shadow-green-400/20">
          <p className="text-xl md:text-2xl mb-4 h-20 md:h-10">{typewriterText}<span className="animate-blink">|</span></p>
          <p className="text-sm md:text-base">Ready to Draw Something That You Have Never Seen Before.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SkillCard
            icon={<Palette className="w-8 h-8" />}
            title="Traditional Artist"
            description="Bringing ideas to life with pencils, brushes, and timeless techniques."
          />

          <SkillCard
            icon={<Brush className="w-8 h-8" />}
            title="Digital Artist"
            description="Crafting vibrant worlds with precision tools and digital mastery."
          />

          <SkillCard
            icon={<Sparkles className="w-8 h-8" />}
            title="Creative Visionary"
            description="Blending tradition and technology to create captivating visual stories."
          />

        </div>
        
      </div>
    </div>
  );
}

function SkillCard({ icon, title, description }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-black hover:shadow-md hover:shadow-green-400/50 transition duration-300">
      <div className="flex items-center mb-2">
        {icon}
        <h3 className="text-lg font-semibold ml-2">{title}</h3>
      </div>
      <p className="text-sm text-gray-300">{description}</p>
    </div>
  );
}

export default Hire;