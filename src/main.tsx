import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

console.log("🚀 Skills Nexus v1.1.0 Initializing...");

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("❌ Root element not found!");
} else {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}
