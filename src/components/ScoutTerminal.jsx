import React, { useState, useEffect, useRef } from 'react';

const ScoutTerminal = () => {
  const [logs, setLogs] = useState([
    { id: 1, type: 'info', message: 'ALPHA 100 CORE INITIALIZED' },
    { id: 2, type: 'success', message: 'Sovereign Data Breach Protocol: ACTIVE' },
    { id: 3, type: 'warning', message: 'Scanning domain: AGENT... [336+ Skills Loaded]' },
  ]);
  const terminalRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const messages = [
        "Infiltrating library metadata...",
        "Validating skill health: 100/100",
        "Handshake.json signature: VERIFIED",
        "Autonomous scout report: NO ANOMALIES",
        "GSAP 3D Engine: OPTIMIZED",
        "Refraction index: 1.8 - NOMINAL"
      ];
      const newLog = {
        id: Date.now(),
        type: Math.random() > 0.85 ? 'warning' : 'info',
        message: messages[Math.floor(Math.random() * messages.length)]
      };
      setLogs(prev => [...prev.slice(-25), newLog]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="scout-terminal glass gold-border-gradient">
      <div className="terminal-header">
        <div className="header-dot gold-text">●</div>
        <span className="gold-text">TELEMETRY MONITOR — ALPHA 100 V2</span>
      </div>
      <div className="terminal-body" ref={terminalRef}>
        {logs.map(log => (
          <div key={log.id} className={`log-line ${log.type}`}>
            <span className="log-time">[{new Date(log.id).toLocaleTimeString()}]</span>
            <span className="log-cursor gold-text">_</span>
            <span className="log-message">{log.message}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .scout-terminal {
          height: 100%;
          display: flex;
          flex-direction: column;
          border-radius: 4px; /* Brutalist edge */
          overflow: hidden;
        }
        .terminal-header {
          padding: 12px 20px;
          background: rgba(255, 215, 0, 0.05);
          border-bottom: 1px solid var(--glass-border);
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          font-weight: 600;
        }
        .header-dot {
          font-size: 14px;
          filter: drop-shadow(0 0 5px var(--gold-glow));
        }
        .terminal-body {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          font-family: 'Space Grotesk', monospace;
          font-size: 0.75rem;
          line-height: 1.6;
        }
        .log-line {
          margin-bottom: 8px;
          display: flex;
          gap: 12px;
          opacity: 0.8;
        }
        .log-line.warning { color: #FFA500; }
        .log-line.success { color: var(--gold-primary); font-weight: 600; }
        .log-line.info { color: #FFFFFF; }
        .log-time { color: rgba(255, 255, 255, 0.4); font-size: 0.65rem; }
        .log-cursor { animation: blink 1s infinite; }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default ScoutTerminal;
