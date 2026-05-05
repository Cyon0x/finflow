import React from 'react';

// --- Sub-Components to keep the code clean ---

const SidebarItem = ({ icon, label, active = false, badge }) => (
  <div className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-[#1e2230] text-white' : 'text-gray-500 hover:bg-white/5'}`}>
    <div className="flex items-center gap-3">
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </div>
    {badge && <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{badge}</span>}
  </div>
);

const StatCard = ({ label, value, trend, subtext }) => (
  <div className="bg-[#12141c] p-5 rounded-2xl border border-white/5">
    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-3">{label}</p>
    <h3 className="text-2xl font-bold mb-1">{value} <span className="text-xs font-normal text-gray-500">USDC</span></h3>
    <div className="flex items-center gap-1.5">
      <span className={`text-[10px] ${trend.includes('↑') ? 'text-emerald-400' : 'text-gray-400'}`}>{trend}</span>
      <span className="text-[10px] text-gray-600">{subtext}</span>
    </div>
  </div>
);

// --- Main Page ---

export default function FinFlowDashboard() {
  return (
    <div className="flex min-h-screen bg-[#0a0c12] text-white font-sans">
      
      {/* 1. LEFT SIDEBAR */}
      <aside className="w-64 border-r border-white/5 flex flex-col p-6 space-y-8">
        <div className="mb-4">
          <h1 className="text-xl font-bold tracking-tight text-blue-500">FinFlow</h1>
          <p className="text-[8px] text-gray-600 uppercase tracking-[0.2em]">Payments Platform</p>
        </div>

        <nav className="flex-1 space-y-1">
          <p className="text-[10px] text-gray-700 uppercase font-bold mb-4 tracking-widest">Main</p>
          <SidebarItem icon="📊" label="Dashboard" active />
          <SidebarItem icon="💳" label="Payments" badge="3" />
          <SidebarItem icon="🚀" label="Payouts" />
          <SidebarItem icon="📄" label="Invoices" />
          
          <p className="text-[10px] text-gray-700 uppercase font-bold mt-8 mb-4 tracking-widest">Finance</p>
          <SidebarItem icon="🏦" label="Off-Ramp" />
          <SidebarItem icon="🔒" label="Escrow" />
          <SidebarItem icon="📈" label="Analytics" />
        </nav>

        {/* Wallet Status at Bottom */}
        <div className="bg-[#12141c] p-4 rounded-xl border border-white/5">
          <p className="text-[10px] text-gray-500 uppercase">Wallet</p>
          <p className="text-xs font-bold text-gray-400 mt-1 italic">Not connected</p>
          <button className="text-[10px] text-blue-500 mt-2 hover:underline">Connect your wallet</button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 p-10 overflow-y-auto">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <div className="flex items-center gap-4">
            <div className="bg-[#12141c] border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2 text-xs">
              <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"></div>
              Arc Testnet
            </div>
            <button className="bg-blue-600 hover:bg-blue-500 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-900/20">
              + New Payment
            </button>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-xs">KA</div>
          </div>
        </header>

        {/* Live Rates Bar (Gold) */}
        <section className="bg-[#b38b3d]/10 border border-[#b38b3d]/20 rounded-2xl p-4 flex justify-between items-center mb-8">
           <div className="flex items-center gap-8">
              <div className="text-[10px] font-black text-[#b38b3d] uppercase tracking-tighter">Live Rates</div>
              <div className="flex gap-1 text-sm font-bold italic">1 USDC = <span className="text-white">₦1,620.50 NGN</span></div>
              <div className="flex gap-1 text-sm font-bold italic">1 USDC = <span className="text-white">KES 130.20</span></div>
              <div className="flex gap-1 text-sm font-bold italic">1 USDC = <span className="text-white">GHS 12.40</span></div>
           </div>
           <div className="text-right">
              <p className="text-[9px] text-gray-500 uppercase">Network Fee</p>
              <p className="text-sm font-mono text-[#00ff88]">~$0.001</p>
           </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-4 gap-5 mb-8">
          <StatCard label="USDC Balance" value="2,840.50" trend="↑ +12.4%" subtext="vs last month" />
          <StatCard label="Total Received (30D)" value="18,420.00" trend="↑ +8.2%" subtext="47 transactions" />
          <StatCard label="Fees Generated" value="184.20" trend="1% avg rate" subtext="Platform revenue" />
          <StatCard label="Pending Payouts" value="3,200.00" trend="⌛ 5 awaiting" subtext="" />
        </section>

        {/* Bottom Section: Chart and Quick Actions */}
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 bg-[#12141c] rounded-3xl border border-white/5 p-8 min-h-[350px]">
             <div className="flex justify-between mb-8">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Revenue Overview</h3>
                <div className="flex gap-1 bg-black/40 p-1 rounded-lg border border-white/5">
                   <button className="px-4 py-1.5 rounded-md bg-[#1e2230] text-[10px] font-bold">7D</button>
                   <button className="px-4 py-1.5 rounded-md text-gray-500 text-[10px] font-bold">30D</button>
                </div>
             </div>
             {/* Chart Visual Placeholder */}
             <div className="flex items-end justify-between h-48 gap-4 px-4">
                {[40, 70, 45, 90, 60, 100, 80].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-lg bg-gradient-to-t from-blue-500/20 to-blue-400/60 transition-all hover:to-blue-400" style={{ height: `${h}%` }}></div>
                ))}
             </div>
             <div className="flex justify-between mt-4 text-[10px] text-gray-600 px-4">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
             </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Quick Actions</h3>
            <button className="w-full group bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 p-4 rounded-2xl flex justify-between items-center transition-all">
               <span className="text-sm font-semibold text-blue-400">Create Payment Link</span>
               <span className="group-hover:translate-x-1 transition-transform text-blue-400">🔗</span>
            </button>
            <button className="w-full bg-white/5 hover:bg-white/10 border border-white/5 p-4 rounded-2xl flex justify-between items-center text-gray-300">
               <span className="text-sm font-semibold">New Invoice</span>
               <span className="text-xs opacity-50">📄</span>
            </button>
            <button className="w-full bg-white/5 hover:bg-white/10 border border-white/5 p-4 rounded-2xl flex justify-between items-center text-gray-300">
               <span className="text-sm font-semibold text-orange-400/80">Batch Payout</span>
               <span className="text-xs opacity-50">🚀</span>
            </button>
            <button className="w-full bg-[#00ff88]/5 hover:bg-[#00ff88]/10 border border-[#00ff88]/10 p-4 rounded-2xl flex justify-between items-center text-[#00ff88]">
               <span className="text-sm font-semibold">Convert to Bank</span>
               <span className="text-xs">🏦</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
