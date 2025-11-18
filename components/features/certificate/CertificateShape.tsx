// Certificate Shape Component - Renders animated geometric shapes

import React from 'react';
import type { Shape } from '@/lib/game/shape-library';

interface CertificateShapeProps {
  shapeConfig: Shape;
  size?: 'small' | 'large';
}

export const CertificateShape: React.FC<CertificateShapeProps> = ({
  shapeConfig,
  size = 'large'
}) => {
  if (!shapeConfig) return null;

  const sizeClasses = size === 'large' ? 'w-40 h-40' : 'w-24 h-24';

  if (shapeConfig.type === 'circle') {
    return (
      <div className={`relative ${sizeClasses}`}>
        {/* Outermost glow ring - slowest pulse */}
        <div
          className="absolute -inset-4 rounded-full animate-ping opacity-30"
          style={{
            backgroundColor: shapeConfig.colors.primary,
            animationDuration: '3s'
          }}
        ></div>
        {/* Second glow layer */}
        <div
          className="absolute -inset-2 rounded-full animate-pulse opacity-40"
          style={{
            backgroundColor: shapeConfig.colors.primary,
            animationDuration: '2.5s',
            animationDelay: '0.3s'
          }}
        ></div>
        {/* Third glow layer */}
        <div
          className="absolute inset-0 rounded-full animate-ping"
          style={{
            backgroundColor: `${shapeConfig.colors.primary}50`,
            animationDuration: '2s'
          }}
        ></div>
        {/* Fourth glow layer */}
        <div
          className="absolute inset-3 rounded-full animate-pulse"
          style={{
            backgroundColor: `${shapeConfig.colors.primary}60`,
            animationDuration: '1.5s',
            animationDelay: '0.5s'
          }}
        ></div>
        {/* Core orb with enhanced multi-layer glow */}
        <div
          className="absolute inset-8 rounded-full"
          style={{
            backgroundColor: shapeConfig.colors.primary,
            boxShadow: `
              0 0 60px ${shapeConfig.colors.glow},
              0 0 120px ${shapeConfig.colors.glow.replace('0.8', '0.6')},
              0 0 180px ${shapeConfig.colors.glow.replace('0.8', '0.4')},
              inset 0 0 30px rgba(255,255,255,0.6),
              inset 0 0 60px ${shapeConfig.colors.glow.replace('0.8', '0.3')}
            `
          }}
        ></div>
      </div>
    );
  }

  if (shapeConfig.type === 'square') {
    return (
      <div
        className={`relative ${sizeClasses}`}
        style={{ transform: `rotate(${shapeConfig.rotation}deg)` }}
      >
        {/* Outermost glow layer */}
        <div
          className="absolute -inset-4 animate-ping opacity-30"
          style={{
            backgroundColor: shapeConfig.colors.primary,
            borderRadius: '12px',
            animationDuration: '3s'
          }}
        ></div>
        {/* Second glow layer */}
        <div
          className="absolute -inset-2 animate-pulse opacity-40"
          style={{
            backgroundColor: shapeConfig.colors.primary,
            borderRadius: '10px',
            animationDuration: '2.5s',
            animationDelay: '0.3s'
          }}
        ></div>
        {/* Third glow layer */}
        <div
          className="absolute inset-0 animate-ping"
          style={{
            backgroundColor: `${shapeConfig.colors.primary}50`,
            borderRadius: '8px',
            animationDuration: '2s'
          }}
        ></div>
        {/* Fourth glow layer */}
        <div
          className="absolute inset-3 animate-pulse"
          style={{
            backgroundColor: `${shapeConfig.colors.primary}60`,
            borderRadius: '6px',
            animationDuration: '1.5s',
            animationDelay: '0.5s'
          }}
        ></div>
        {/* Core square with enhanced glow */}
        <div
          className="absolute inset-8"
          style={{
            backgroundColor: shapeConfig.colors.primary,
            borderRadius: '4px',
            boxShadow: `
              0 0 60px ${shapeConfig.colors.glow},
              0 0 120px ${shapeConfig.colors.glow.replace('0.8', '0.6')},
              0 0 180px ${shapeConfig.colors.glow.replace('0.8', '0.4')},
              inset 0 0 30px rgba(255,255,255,0.6),
              inset 0 0 60px ${shapeConfig.colors.glow.replace('0.8', '0.3')}
            `
          }}
        ></div>
      </div>
    );
  }

  if (shapeConfig.type === 'triangle') {
    const isUp = shapeConfig.orientation === 'up';
    const triangleStyle = isUp
      ? 'polygon(50% 0%, 0% 100%, 100% 100%)'
      : 'polygon(50% 100%, 0% 0%, 100% 0%)';

    return (
      <div className={`relative ${sizeClasses}`}>
        {/* Outermost glow layer */}
        <div
          className="absolute -inset-4 animate-ping opacity-30"
          style={{
            backgroundColor: shapeConfig.colors.primary,
            clipPath: triangleStyle,
            animationDuration: '3s'
          }}
        ></div>
        {/* Second glow layer */}
        <div
          className="absolute -inset-2 animate-pulse opacity-40"
          style={{
            backgroundColor: shapeConfig.colors.primary,
            clipPath: triangleStyle,
            animationDuration: '2.5s',
            animationDelay: '0.3s'
          }}
        ></div>
        {/* Third glow layer */}
        <div
          className="absolute inset-0 animate-ping"
          style={{
            backgroundColor: `${shapeConfig.colors.primary}50`,
            clipPath: triangleStyle,
            animationDuration: '2s'
          }}
        ></div>
        {/* Fourth glow layer */}
        <div
          className="absolute inset-3 animate-pulse"
          style={{
            backgroundColor: `${shapeConfig.colors.primary}60`,
            clipPath: triangleStyle,
            animationDuration: '1.5s',
            animationDelay: '0.5s'
          }}
        ></div>
        {/* Core triangle with enhanced glow */}
        <div
          className="absolute inset-8"
          style={{
            backgroundColor: shapeConfig.colors.primary,
            clipPath: triangleStyle,
            boxShadow: `
              0 0 60px ${shapeConfig.colors.glow},
              0 0 120px ${shapeConfig.colors.glow.replace('0.8', '0.6')},
              0 0 180px ${shapeConfig.colors.glow.replace('0.8', '0.4')}
            `
          }}
        ></div>
      </div>
    );
  }

  return null;
};
