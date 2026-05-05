"use client";
import { useState } from 'react';
// We use a simple button logic here. 
// For a real wallet, you'd eventually install 'thirdweb' or 'wagmi'

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
      } catch (err) {
        alert("Wallet connection failed!");
      }
    } else {
      alert("Please install MetaMask or another wallet!");
    }
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="ff-logo">Fin<span>Flow</span></div>
        </div>
        <nav>
          <div className="nav-item active">📊 Dashboard</div>
          <div className="nav-item">💳 Payments</div>
        </nav>
        
        <div className="sidebar-footer" style={{ marginTop: 'auto', paddingBottom: '20px' }}>
          <button 
            onClick={connectWallet}
            className="wallet-pill" 
            style={{ width: '100%', cursor: 'pointer', background: 'var(--border)', color: 'white', border: 'none', padding: '10px', borderRadius: '8px' }}
          >
            {walletAddress 
              ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}` 
              : "🔌 Connect Wallet"}
          </button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
          <div className="topbar-right">
            <button className="topbar-btn primary" onClick={connectWallet}>
               {walletAddress ? "Connected" : "Connect Wallet"}
            </button>
            <div className="avatar">KA</div>
          </div>
        </header>

        <div className="content">
          <div className="metrics-grid">
             {/* Your cards go here */}
             <div className="metric-card">
                <div className="metric-label">STATUS</div>
                <div className="metric-value" style={{ fontSize: '18px', color: walletAddress ? '#00ff88' : '#ff4444' }}>
                  {walletAddress ? "System Online" : "Wallet Required"}
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
