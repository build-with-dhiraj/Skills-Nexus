import React from 'react';

const ResearchPortal = () => {
  const citations = [
    {
      id: 1,
      topic: "Agentic Tool Use",
      source: "Alpha 100 Mastery Audit (NotebookLM)",
      snippet: "Autonomous skill selection requires a deterministic gatekeeper protocol (using-superpowers)."
    },
    {
      id: 2,
      topic: "Vibe Coding",
      source: "Antigravity Research (NotebookLM)",
      snippet: "High-level abstractions in agent orchestration reduce context-window pressure."
    }
  ];

  return (
    <div className="research-portal glass glass-card">
      <h2 className="heading-font">RESEARCH BIBLE CITATIONS</h2>
      <div className="citation-list">
        {citations.map(citation => (
          <div key={citation.id} className="citation-item">
            <h4 className="mono text-gold">{citation.topic}</h4>
            <p className="text-secondary">{citation.snippet}</p>
            <div className="citation-source mono">{citation.source}</div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .research-portal {
          height: 100%;
          overflow-y: auto;
        }
        .research-portal h2 {
          color: var(--accent-gold);
          font-size: 1rem;
          margin-bottom: 1.5rem;
          letter-spacing: 2px;
          border-bottom: 1px solid var(--glass-border);
          padding-bottom: 0.5rem;
        }
        .citation-item {
          margin-bottom: 2rem;
        }
        .text-gold { color: var(--accent-gold); }
        .text-secondary { color: var(--text-secondary); font-size: 0.9rem; margin: 0.5rem 0; }
        .citation-source {
          font-size: 0.7rem;
          opacity: 0.5;
          text-transform: uppercase;
        }
      `}</style>
    </div>
  );
};

export default ResearchPortal;
