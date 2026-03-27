import React, { useState } from 'react';

const SovereignShare = () => {
    const [copied, setCopied] = useState(false);
    const installCommand = 'curl -sSL https://raw.githubusercontent.com/antigravity/skills-master/main/install.sh | bash';

    const copyToClipboard = () => {
        navigator.clipboard.writeText(installCommand);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="sovereign-share glass glass-card">
            <h2 className="heading-font text-gold">SOVEREIGN SHARING</h2>
            <p className="text-secondary">Distribute the Skills Master Library to any Antigravity-enabled environment.</p>
            
            <div className="share-box glass">
                <code className="mono">{installCommand}</code>
                <button 
                    className={`copy-btn mono ${copied ? 'copied' : ''}`}
                    onClick={copyToClipboard}
                >
                    {copied ? 'COPIED' : 'COPY COMMAND'}
                </button>
            </div>

            <style jsx>{`
                .sovereign-share {
                    margin-top: 2rem;
                }
                .text-gold { color: var(--accent-gold); }
                .share-box {
                    margin-top: 1rem;
                    padding: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: rgba(0,0,0,0.3);
                }
                .share-box code {
                    font-size: 0.8rem;
                    color: var(--text-primary);
                }
                .copy-btn {
                    background: var(--accent-gold);
                    color: #000;
                    border: none;
                    padding: 0.5rem 1rem;
                    font-size: 0.7rem;
                    cursor: pointer;
                    font-weight: bold;
                    transition: all 0.2s;
                }
                .copy-btn:hover {
                    opacity: 0.8;
                }
                .copy-btn.copied {
                    background: #00ff00;
                }
            `}</style>
        </div>
    );
};

export default SovereignShare;
