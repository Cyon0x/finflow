"use client";
import { useState } from 'react';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-shell">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="ff-logo">Fin<span>Flow</span></div>
        </div>
        
        <nav>
          <div className="nav-item active">📊 Dashboard</div>
          <div className="nav-item">💳 Payments</div>
          <div className="nav-item">🚀 Payouts</div>
          <div className="nav-item">🧾 Invoices</div>
        </nav>
      </aside>

      {/* Main Area */}
      <main className="main">
        <header className="topbar">
          <button 
            style={{ background: 'none', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer' }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button style={{ background: 'var(--primary)', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
              + New Payment
            </button>
            <div className="avatar">KA</div>
          </div>
        </header>

        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-label">USDC BALANCE</div>
            <div className="metric-value">2,840.50</div>
            <div className="metric-sub">↑ +12.4%</div>
          </div>
          
          <div className="metric-card">
            <div className="metric-label">TOTAL REVENUE</div>
            <div className="metric-value">$42,105</div>
            <div className="metric-sub">↑ +8.2%</div>
          </div>

          <div className="metric-card">
            <div className="metric-label">ACTIVE PAYOUTS</div>
            <div className="metric-value">12</div>
            <div className="metric-sub">Processing...</div>
          </div>
        </div>

        <div style={{ padding: '0 32px' }}>
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
            <h3 style={{ marginBottom: '16px', fontFamily: 'Clash Display' }}>Recent Activity</h3>
            <p style={{ color: 'var(--text-muted)' }}>No recent transactions to show.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
