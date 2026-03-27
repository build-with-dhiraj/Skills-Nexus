import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

console.log("🚀 Skills Nexus Initializing...");

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, errorInfo: any) {
    console.error("NEXUS CRITICAL ERROR CAUGHT:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ background: '#050505', color: '#CCFF00', padding: '100px', fontFamily: 'monospace' }}>
          <h1>NEXUS CRITICAL ERROR</h1>
          <pre style={{ border: '1px solid #CCFF00', padding: '20px', marginTop: '20px', color: 'white' }}>
            {this.state.error?.toString()}
          </pre>
          <button onClick={() => window.location.reload()} style={{ background: '#CCFF00', color: 'black', border: 'none', padding: '10px 20px', cursor: 'pointer', marginTop: '20px' }}>
            RETRY HANDSHAKE
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("❌ Root element not found!");
} else {
  console.log("✅ Root element secured. Mounting Skills Nexus v1.0.4 (Debug Mode)...");
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>,
  )
}
