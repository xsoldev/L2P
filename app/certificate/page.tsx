'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Target, Zap } from 'lucide-react';

// Certificate Shape Component
const CertificateShape = ({ shapeConfig, size = 'large' }: { shapeConfig: any; size?: 'large' | 'small' }) => {
  if (!shapeConfig) return null;

  const sizeClasses = size === 'large' ? 'w-40 h-40' : 'w-24 h-24';

  if (shapeConfig.type === 'circle') {
    return (
      <div className={`relative ${sizeClasses}`}>
        {/* 4 layered glow effects */}
        <div className="absolute -inset-4 rounded-full animate-ping opacity-30"
          style={{ backgroundColor: shapeConfig.colors.primary, animationDuration: '3s' }}></div>
        <div className="absolute -inset-2 rounded-full animate-pulse opacity-40"
          style={{ backgroundColor: shapeConfig.colors.primary, animationDuration: '2.5s', animationDelay: '0.3s' }}></div>
        <div className="absolute inset-0 rounded-full animate-ping"
          style={{ backgroundColor: `${shapeConfig.colors.primary}50`, animationDuration: '2s' }}></div>
        <div className="absolute inset-3 rounded-full animate-pulse"
          style={{ backgroundColor: `${shapeConfig.colors.primary}60`, animationDuration: '1.5s', animationDelay: '0.5s' }}></div>

        {/* Core orb with enhanced multi-layer glow */}
        <div className="absolute inset-8 rounded-full"
          style={{
            backgroundColor: shapeConfig.colors.primary,
            boxShadow: `
              0 0 60px ${shapeConfig.colors.glow},
              0 0 120px ${shapeConfig.colors.glow.replace('0.8', '0.6')},
              0 0 180px ${shapeConfig.colors.glow.replace('0.8', '0.4')},
              inset 0 0 30px rgba(255,255,255,0.6),
              inset 0 0 60px ${shapeConfig.colors.glow.replace('0.8', '0.3')}
            `
          }}></div>
      </div>
    );
  }

  if (shapeConfig.type === 'square') {
    return (
      <div className={`relative ${sizeClasses}`}>
        {/* 4 layered glow effects */}
        <div className="absolute -inset-4 rounded-lg animate-ping opacity-30"
          style={{ backgroundColor: shapeConfig.colors.primary, animationDuration: '3s' }}></div>
        <div className="absolute -inset-2 rounded-lg animate-pulse opacity-40"
          style={{ backgroundColor: shapeConfig.colors.primary, animationDuration: '2.5s', animationDelay: '0.3s' }}></div>
        <div className="absolute inset-0 rounded-lg animate-ping"
          style={{ backgroundColor: `${shapeConfig.colors.primary}50`, animationDuration: '2s' }}></div>
        <div className="absolute inset-3 rounded-lg animate-pulse"
          style={{ backgroundColor: `${shapeConfig.colors.primary}60`, animationDuration: '1.5s', animationDelay: '0.5s' }}></div>

        {/* Core orb */}
        <div className="absolute inset-8 rounded-lg"
          style={{
            backgroundColor: shapeConfig.colors.primary,
            boxShadow: `
              0 0 60px ${shapeConfig.colors.glow},
              0 0 120px ${shapeConfig.colors.glow.replace('0.8', '0.6')},
              0 0 180px ${shapeConfig.colors.glow.replace('0.8', '0.4')},
              inset 0 0 30px rgba(255,255,255,0.6),
              inset 0 0 60px ${shapeConfig.colors.glow.replace('0.8', '0.3')}
            `
          }}></div>
      </div>
    );
  }

  if (shapeConfig.type === 'triangle') {
    return (
      <div className={`relative ${sizeClasses} flex items-center justify-center`}>
        {/* 4 layered glow effects */}
        <div className="absolute -inset-4 opacity-30 animate-ping" style={{ animationDuration: '3s' }}>
          <div className="w-full h-full" style={{
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            backgroundColor: shapeConfig.colors.primary
          }}></div>
        </div>
        <div className="absolute -inset-2 opacity-40 animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.3s' }}>
          <div className="w-full h-full" style={{
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            backgroundColor: shapeConfig.colors.primary
          }}></div>
        </div>
        <div className="absolute inset-0 animate-ping" style={{ animationDuration: '2s' }}>
          <div className="w-full h-full" style={{
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            backgroundColor: `${shapeConfig.colors.primary}50`
          }}></div>
        </div>
        <div className="absolute inset-3 animate-pulse" style={{ animationDuration: '1.5s', animationDelay: '0.5s' }}>
          <div className="w-full h-full" style={{
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            backgroundColor: `${shapeConfig.colors.primary}60`
          }}></div>
        </div>

        {/* Core orb */}
        <div className="absolute inset-8" style={{
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          backgroundColor: shapeConfig.colors.primary,
          boxShadow: `
            0 0 60px ${shapeConfig.colors.glow},
            0 0 120px ${shapeConfig.colors.glow.replace('0.8', '0.6')},
            0 0 180px ${shapeConfig.colors.glow.replace('0.8', '0.4')}
          `
        }}></div>
      </div>
    );
  }

  return null;
};

export default function CertificatePage() {
  // Sample shape - you can cycle through different shapes
  const sampleShape = {
    name: 'Radiant Pulse',
    type: 'circle',
    colors: {
      primary: '#70BEFA',
      secondary: '#4A9FD8',
      accent: '#A0D8FF',
      glow: 'rgba(112, 190, 250, 0.8)'
    }
  };

  const userName = 'Alex Chen';
  const score = 185;
  const completedLessons = 7;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 sm:p-8">
      {/* Social Media Share Card - Beautiful Design with Orb Hero */}
      <div className="relative mx-auto max-w-2xl w-full px-4 sm:px-0">
        {/* Outer glow effect for the card */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#70BEFA]/20 via-transparent to-[#70BEFA]/20 rounded-3xl blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>

        {/* Animated floating particles */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          <defs>
            <radialGradient id="particleGlow">
              <stop offset="0%" stopColor="#70BEFA" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#70BEFA" stopOpacity="0"/>
            </radialGradient>
          </defs>

          {/* Floating particles with different animations */}
          <circle cx="10%" cy="20%" r="2" fill="url(#particleGlow)">
            <animate attributeName="cy" from="20%" to="80%" dur="8s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;1;0" dur="8s" repeatCount="indefinite"/>
          </circle>
          <circle cx="90%" cy="70%" r="3" fill="url(#particleGlow)">
            <animate attributeName="cy" from="70%" to="10%" dur="10s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;1;0" dur="10s" repeatCount="indefinite"/>
          </circle>
          <circle cx="30%" cy="90%" r="2.5" fill="url(#particleGlow)">
            <animate attributeName="cy" from="90%" to="30%" dur="12s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;1;0" dur="12s" repeatCount="indefinite"/>
          </circle>
          <circle cx="70%" cy="40%" r="2" fill="url(#particleGlow)">
            <animate attributeName="cy" from="40%" to="85%" dur="9s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;1;0" dur="9s" repeatCount="indefinite"/>
          </circle>
          <circle cx="50%" cy="15%" r="3" fill="url(#particleGlow)">
            <animate attributeName="cy" from="15%" to="95%" dur="11s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;1;0" dur="11s" repeatCount="indefinite"/>
          </circle>

          {/* Rotating ring animation */}
          <circle cx="50%" cy="50%" r="45%" fill="none" stroke="#70BEFA" strokeWidth="0.5" opacity="0.2">
            <animate attributeName="r" from="40%" to="50%" dur="6s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.4;0.1;0.4" dur="6s" repeatCount="indefinite"/>
          </circle>
        </svg>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
          className="relative bg-gradient-to-br from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D] border-2 border-[#70BEFA] rounded-3xl overflow-hidden shadow-2xl shadow-[#70BEFA]/30"
          style={{ zIndex: 2 }}
        >
          {/* Grid Background Pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(112, 190, 250, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(112, 190, 250, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          ></div>

          {/* Radial gradient spotlight behind orb */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 rounded-full opacity-40 blur-3xl"
            style={{
              background: `radial-gradient(circle, ${sampleShape.colors.primary}90 0%, transparent 70%)`
            }}
          ></div>

          {/* Animated corner accents */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-[#70BEFA]/50 rounded-tl-lg"></div>
            <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-[#70BEFA]/50 rounded-tr-lg"></div>
            <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-[#70BEFA]/50 rounded-bl-lg"></div>
            <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-[#70BEFA]/50 rounded-br-lg"></div>
          </div>

          {/* Hero Section - Orb Takes Center Stage */}
          <div className="relative z-10 bg-gradient-to-b from-black/50 via-black/30 to-transparent flex flex-col items-center justify-center gap-3 sm:gap-4 pt-8 sm:pt-12 pb-6 sm:pb-10">
            {/* Large Prominent Orb */}
            <div className="flex-shrink-0">
              <CertificateShape shapeConfig={sampleShape} size="large" />
            </div>

            {/* Shape Name Badge */}
            <div className="px-4 sm:px-5 py-1.5 sm:py-2 bg-gradient-to-r from-[#0D0D0D]/90 to-[#1A1A1A]/90 border border-[#70BEFA]/50 rounded-full backdrop-blur-md shadow-lg shadow-[#70BEFA]/20">
              <p className="text-xs sm:text-sm font-mono text-[#70BEFA] tracking-[0.2em] font-bold">
                {sampleShape.name.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Content Section */}
          <div className="relative z-10 px-4 sm:px-8 pb-6 sm:pb-10 space-y-4 sm:space-y-6">
            {/* Main Message */}
            <div className="text-center space-y-1 sm:space-y-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight">
                Course Complete!
              </h2>
              <p className="text-base sm:text-lg md:text-xl font-bold text-[#70BEFA]">{userName}</p>
            </div>

            {/* Stats - Beautiful Spacing */}
            <div className="flex justify-center gap-3 sm:gap-6 py-2 sm:py-4">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#70BEFA] font-mono">{score}</div>
                <div className="text-[10px] sm:text-xs text-gray-400 font-mono tracking-wider mt-1">POINTS</div>
              </div>
              <div className="text-center border-l border-r border-gray-700/50 px-3 sm:px-6">
                <div className="text-2xl sm:text-3xl font-bold text-white font-mono">{completedLessons}</div>
                <div className="text-[10px] sm:text-xs text-gray-400 font-mono tracking-wider mt-1">LESSONS</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#70BEFA] font-mono">100%</div>
                <div className="text-[10px] sm:text-xs text-gray-400 font-mono tracking-wider mt-1">COMPLETE</div>
              </div>
            </div>

            {/* Achievement badges - Better Visual Hierarchy */}
            <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
              <div className="bg-gradient-to-r from-[#1A1A1A] to-[#0D0D0D] border border-[#70BEFA]/30 rounded-full px-4 py-2 flex items-center gap-2 shadow-lg shadow-[#70BEFA]/10">
                <CheckCircle className="w-4 h-4 text-[#70BEFA]" />
                <span className="text-xs font-mono text-gray-300 tracking-wider">CLARITY</span>
              </div>
              <div className="bg-gradient-to-r from-[#1A1A1A] to-[#0D0D0D] border border-[#70BEFA]/30 rounded-full px-4 py-2 flex items-center gap-2 shadow-lg shadow-[#70BEFA]/10">
                <Target className="w-4 h-4 text-[#70BEFA]" />
                <span className="text-xs font-mono text-gray-300 tracking-wider">SPECIFICITY</span>
              </div>
              <div className="bg-gradient-to-r from-[#1A1A1A] to-[#0D0D0D] border border-[#70BEFA]/30 rounded-full px-4 py-2 flex items-center gap-2 shadow-lg shadow-[#70BEFA]/10">
                <Zap className="w-4 h-4 text-[#70BEFA]" />
                <span className="text-xs font-mono text-gray-300 tracking-wider">ITERATION</span>
              </div>
            </div>

            {/* Branding Footer - Elegant Separator */}
            <div className="border-t border-gray-800/50 pt-3 sm:pt-4 text-center space-y-1">
              <div className="text-sm sm:text-base font-bold text-[#70BEFA] tracking-wide">Novagen Labs</div>
              <div className="text-[10px] sm:text-xs text-gray-500 font-mono tracking-wider">AI PROMPT ENGINEERING</div>
            </div>

            {/* Call to Action - More Prominent */}
            <div className="bg-gradient-to-r from-[#70BEFA]/10 to-[#70BEFA]/5 border border-[#70BEFA]/30 rounded-xl p-3 sm:p-4 text-center shadow-lg shadow-[#70BEFA]/10">
              <div className="text-[10px] sm:text-xs text-gray-400 tracking-wider">Try it yourself:</div>
              <div className="text-xs sm:text-sm font-bold text-[#70BEFA] font-mono tracking-wide mt-1">
                learn2prompt.xyz
              </div>
              <div className="text-[10px] sm:text-xs text-gray-500 mt-1">Beat my score! 🎯</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
