import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import handshakeData from '../../navigation/Handshake.json';

const DOMAIN_ICONS = {
  AGENT: <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />, // Delta/Intelligence
  UI: <path d="M12 3a9 9 0 000 18 1 1 0 010-2 7 7 0 110-14 1 1 0 010-2zM7 12a5 5 0 1110 0 5 5 0 01-10 0z" />, // Orbitals/Design
  INFRA: <path d="M4 14.89V17c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-2.11c-1.16-.41-2-1.52-2-2.89s.84-2.48 2-2.89V7c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v2.11c1.16.41 2 1.52 2 2.89s-.84 2.48-2 2.89z" />, // Layers/Cloud
  DATA: <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />, // Charts/Data
  BACKEND: <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zM7 11h10v2H7v-2z" />, // Engine/Core
  MOBILE: <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />, // Layout/Device
  DEVOPS: <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />, // Shield/Cycle
  PRODUCT: <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />, // Star/Strategic
  DOCS: <path d="M14 2H6c-1.1 0-1.99.89-1.99 1.99L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />, // Document/Identity
  MCP: <path d="M12 2L1 21h22L12 2zm0 3.45l7.53 13.04H4.47L12 5.45zM11 15h2v2h-2v-2zm0-7h2v5h-2V8z" />, // Protocol/Warning
  OS: <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1a8.45 8.45 0 00-1.69-.98l-.38-2.65C14.46 3.19 14.24 3 14 3h-4c-.24 0-.46.19-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.31.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.23.25.42.49.42h4c.24 0 .46-.19.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.22.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />, // Cog/Utilities
  LABS: <path d="M13 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V9l-7-7zM6 20V4h6v5h5v11H6z" /> // Flask/Research
};

const HiveGrid = ({ onSelectDomain }) => {
  const [domains, setDomains] = useState([]);
  const gridRef = useRef(null);

  useEffect(() => {
    setDomains(handshakeData.domains);
    
    // Premium GSAP Staggered Entrance
    gsap.from('.hive-node', {
      duration: 1.2,
      y: 100,
      rotateX: -45,
      opacity: 0,
      stagger: 0.05,
      ease: 'expo.out',
    });
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const xPos = (clientX / innerWidth - 0.5) * 20;
    const yPos = (clientY / innerHeight - 0.5) * -20;

    gsap.to(gridRef.current, {
      rotateY: xPos,
      rotateX: yPos,
      duration: 0.5,
      ease: 'power2.out'
    });
  };

  return (
    <div className="hive-container" onMouseMove={handleMouseMove}>
      <div className="hive-grid" ref={gridRef} style={{ perspective: '1000px' }}>
        {domains.map((domain) => (
          <div 
            key={domain.name}
            className="hive-node glass hover-glow magnetic"
            onClick={() => onSelectDomain(domain)}
          >
            <div className="node-icon gold-text">
              <svg viewBox="0 0 24 24" fill="currentColor">
                {DOMAIN_ICONS[domain.name] || DOMAIN_ICONS.OS}
              </svg>
            </div>
            <div className="node-content">
              <h3 className="gold-text">{domain.name}</h3>
              <p className="glass-pill">{domain.skills_count} Units</p>
            </div>
            <div className="unit-indicator" style={{ 
              background: `conic-gradient(var(--gold-primary) ${domain.health}%, transparent 0)` 
            }}></div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .hive-container {
          padding: 40px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hive-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          width: 100%;
          max-width: 1200px;
          transform-style: preserve-3d;
        }
        .hive-node {
          cursor: pointer;
          position: relative;
          min-height: 220px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px;
          border-radius: 2px; /* Brutalist edge */
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .node-icon {
          width: 48px;
          height: 48px;
          margin-bottom: 20px;
        }
        .node-icon svg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 0 8px var(--gold-glow));
        }
        .node-content h3 {
          font-size: var(--text-base);
          font-weight: 600;
          letter-spacing: 0.1em;
          margin-bottom: 12px;
          text-transform: uppercase;
        }
        .node-content p {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.6);
          letter-spacing: 0.05em;
        }
        .unit-indicator {
          position: absolute;
          bottom: 20px;
          right: 20px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 1px solid var(--glass-border);
        }
        
        .hive-node:hover {
          transform: translateZ(30px);
        }

        @media (max-width: 1024px) {
          .hive-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .hive-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  );
};

export default HiveGrid;
