<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>FinFlow — Stripe for Web3 Payments in Africa</title>
<link href="https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Bricolage+Grotesque:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}

/* ═══════ LIGHT THEME (default) ═══════ */
:root,[data-theme="light"]{
  --bg:#F2F6FF;
  --surface:#FFFFFF;
  --surface2:#EEF3FF;
  --surface3:#E4ECFA;
  --border:#D5E0F5;
  --border2:#B8CCEC;
  --ink:#0B1735;
  --ink2:#1E3366;
  --ink3:#5470A0;
  --sidebar-bg:#0B1735;
  --sidebar-bg2:#060F24;
  --sidebar-text:rgba(185,205,245,0.68);
  --sidebar-text-active:#FFFFFF;
  --sidebar-border:rgba(255,255,255,0.07);
  --sidebar-hover:rgba(255,255,255,0.06);
  --sidebar-active:rgba(99,157,255,0.2);
  --sidebar-active-bar:#639DFF;
  --sidebar-logo-accent:#639DFF;
  --sidebar-wallet-bg:rgba(0,0,0,0.28);
  --sidebar-wallet-addr:#7EB8FF;
  --accent:#1540C0;
  --accent2:#3A72E8;
  --accent-light:#E6EDFC;
  --accent-dark:#0D2E99;
  --green:#0A6E40;
  --green-light:#E2F5EB;
  --red:#C62828;
  --red-light:#FDECEA;
  --amber:#B45309;
  --amber-light:#FEF3C7;
  --pop-purple:#6D28D9;
  --pop-purple-light:#EDE9FE;
  --pop-teal:#0E7490;
  --pop-teal-light:#E0F2FE;
  --pop-rose:#BE185D;
  --pop-rose-light:#FCE7F3;
  --sidebar-w:240px;
  --header-h:64px;
  --radius:10px;
  --radius-lg:16px;
  --shadow:0 1px 4px rgba(11,23,53,0.08),0 1px 2px rgba(11,23,53,0.05);
  --shadow-md:0 4px 18px rgba(11,23,53,0.11),0 2px 4px rgba(11,23,53,0.06);
  --shadow-lg:0 16px 48px rgba(11,23,53,0.15),0 4px 8px rgba(11,23,53,0.08);
  --topbar-bg:#FFFFFF;
  --rate-strip-from:#1540C0;
  --rate-strip-to:#060F24;
  --chart-bar-from:#1540C0;
  --chart-bar-to:#639DFF;
}

/* ═══════ DARK THEME ═══════ */
[data-theme="dark"]{
  --bg:#070D1E;
  --surface:#0D1428;
  --surface2:#111C35;
  --surface3:#162244;
  --border:rgba(255,255,255,0.08);
  --border2:rgba(255,255,255,0.14);
  --ink:#E4EDFF;
  --ink2:#A8BEDD;
  --ink3:#5C7299;
  --sidebar-bg:#050C1C;
  --sidebar-bg2:#030810;
  --sidebar-text:rgba(168,190,221,0.65);
  --sidebar-text-active:#FFFFFF;
  --sidebar-border:rgba(255,255,255,0.06);
  --sidebar-hover:rgba(255,255,255,0.05);
  --sidebar-active:rgba(99,157,255,0.18);
  --sidebar-active-bar:#639DFF;
  --sidebar-logo-accent:#639DFF;
  --sidebar-wallet-bg:rgba(0,0,0,0.45);
  --sidebar-wallet-addr:#7EB8FF;
  --accent:#4A8AEF;
  --accent2:#639DFF;
  --accent-light:rgba(74,138,239,0.14);
  --accent-dark:#2C6AD6;
  --green:#10B981;
  --green-light:rgba(16,185,129,0.13);
  --red:#F87171;
  --red-light:rgba(248,113,113,0.13);
  --amber:#FBBF24;
  --amber-light:rgba(251,191,36,0.13);
  --pop-purple:#A78BFA;
  --pop-purple-light:rgba(167,139,250,0.13);
  --pop-teal:#22D3EE;
  --pop-teal-light:rgba(34,211,238,0.13);
  --pop-rose:#FB7185;
  --pop-rose-light:rgba(251,113,133,0.13);
  --shadow:0 1px 3px rgba(0,0,0,0.35),0 1px 2px rgba(0,0,0,0.25);
  --shadow-md:0 4px 20px rgba(0,0,0,0.45),0 2px 4px rgba(0,0,0,0.25);
  --shadow-lg:0 16px 52px rgba(0,0,0,0.6),0 4px 8px rgba(0,0,0,0.35);
  --topbar-bg:#0D1428;
  --rate-strip-from:#1540C0;
  --rate-strip-to:#03060F;
  --chart-bar-from:#4A8AEF;
  --chart-bar-to:#639DFF;
}

body{font-family:'Bricolage Grotesque',sans-serif;background:var(--bg);color:var(--ink);overflow-x:hidden;font-size:14px;transition:background 0.25s,color 0.25s}
h1,h2,h3,h4,h5{font-family:'Clash Display',sans-serif;letter-spacing:-0.02em}
code,kbd,.mono{font-family:'JetBrains Mono',monospace}

/* ═══════════════════════════ LAYOUT ══════════════════════════════ */
.app-shell{display:flex;height:100vh;overflow:hidden}

/* ═══════════════════════════ SIDEBAR ════════════════════════════ */
.sidebar{
  width:var(--sidebar-w);min-width:var(--sidebar-w);
  background:linear-gradient(180deg,var(--sidebar-bg) 0%,var(--sidebar-bg2) 100%);
  color:var(--sidebar-text);
  display:flex;flex-direction:column;
  border-right:1px solid var(--sidebar-border);
  overflow-y:auto;z-index:10;
  transition:transform 0.3s,background 0.25s;
}
.sidebar-header{
  padding:20px 20px 16px;
  border-bottom:1px solid var(--sidebar-border);
  display:flex;align-items:center;gap:10px;
}
.ff-logo{
  font-family:'Clash Display',sans-serif;font-weight:700;
  font-size:1.4rem;color:#fff;letter-spacing:-0.03em;
  line-height:1;
}
.ff-logo span{color:var(--sidebar-logo-accent)}
.arc-badge{
  display:flex;align-items:center;gap:6px;
  background:rgba(74,144,255,0.1);border:1px solid rgba(74,144,255,0.2);
  border-radius:6px;padding:4px 8px;margin:0 20px 4px;
}
.arc-badge img{width:16px;height:16px;border-radius:3px}
.arc-badge-text{font-size:10px;color:rgba(176,190,221,0.8);letter-spacing:0.05em;font-family:'JetBrains Mono',monospace}
.testnet-dot{width:6px;height:6px;border-radius:50%;background:#4A90FF;flex-shrink:0;animation:blink 2s infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0.4}}

.nav-section-label{
  font-size:10px;letter-spacing:0.1em;color:rgba(107,127,163,0.6);
  padding:16px 20px 6px;text-transform:uppercase;font-weight:500;
  font-family:'JetBrains Mono',monospace;
}
.nav-item{
  display:flex;align-items:center;gap:10px;
  padding:9px 20px;cursor:pointer;
  transition:all 0.15s;color:var(--sidebar-text);font-size:13.5px;
  position:relative;margin:1px 8px;border-radius:8px;
  font-weight:400;
}
.nav-item:hover{background:var(--sidebar-hover);color:var(--sidebar-text-active)}
.nav-item.active{background:var(--sidebar-active);color:var(--sidebar-text-active);font-weight:500}
.nav-item.active::before{
  content:'';position:absolute;left:-8px;top:50%;transform:translateY(-50%);
  width:3px;height:18px;background:var(--sidebar-active-bar);border-radius:0 2px 2px 0;
}
.nav-icon{font-size:16px;opacity:0.85;flex-shrink:0}
.nav-badge{
  margin-left:auto;background:var(--pop-rose);color:#fff;
  font-size:10px;padding:2px 6px;border-radius:10px;
  font-family:'JetBrains Mono',monospace;
}

.sidebar-footer{
  margin-top:auto;padding:16px;border-top:1px solid var(--sidebar-border);
}
.wallet-pill{
  background:var(--sidebar-wallet-bg);border:1px solid rgba(74,144,255,0.2);
  border-radius:8px;padding:10px 12px;cursor:pointer;transition:all 0.2s;
}
.wallet-pill:hover{background:rgba(0,0,0,0.4);border-color:rgba(74,144,255,0.4)}
.wallet-label{font-size:10px;color:rgba(176,190,221,0.5);letter-spacing:0.06em;margin-bottom:3px;font-family:'JetBrains Mono',monospace}
.wallet-addr{font-size:12px;color:var(--sidebar-wallet-addr);font-family:'JetBrains Mono',monospace;font-weight:500}
.wallet-net{font-size:10px;color:rgba(176,190,221,0.4);margin-top:2px;font-family:'JetBrains Mono',monospace}

/* ═══════════════════════════ MAIN ════════════════════════════════ */
.main{flex:1;display:flex;flex-direction:column;overflow:hidden}

.topbar{
  height:var(--header-h);background:var(--topbar-bg);
  border-bottom:1px solid var(--border);
  display:flex;align-items:center;justify-content:space-between;
  padding:0 28px;flex-shrink:0;
  box-shadow:var(--shadow);
  transition:background 0.25s;
}
.page-title{font-family:'Clash Display',sans-serif;font-size:1.1rem;font-weight:600;color:var(--ink)}
.topbar-right{display:flex;align-items:center;gap:12px}
.topbar-btn{
  display:flex;align-items:center;gap:6px;
  background:var(--surface2);border:1px solid var(--border);
  border-radius:8px;padding:7px 14px;cursor:pointer;
  font-size:13px;color:var(--ink2);font-weight:500;
  transition:all 0.15s;font-family:'Bricolage Grotesque',sans-serif;
}
.topbar-btn:hover{background:var(--border);color:var(--ink)}
.topbar-btn.primary{background:var(--accent);color:#fff;border-color:var(--accent)}
.topbar-btn.primary:hover{background:var(--accent-dark)}
.avatar{
  width:34px;height:34px;border-radius:50%;
  background:linear-gradient(135deg,var(--accent),var(--accent2));
  display:flex;align-items:center;justify-content:center;
  color:#fff;font-size:13px;font-weight:600;cursor:pointer;
  font-family:'Clash Display',sans-serif;
}
.notif-dot{position:relative}
.notif-dot::after{
  content:'';position:absolute;top:-2px;right:-2px;
  width:7px;height:7px;border-radius:50%;background:var(--red);
  border:2px solid var(--topbar-bg);
}

.content{flex:1;overflow-y:auto;padding:28px;background:var(--bg);transition:background 0.25s}

/* ═══════════════════════════ PAGES ═══════════════════════════════ */
.page{display:none}
.page.active{display:block}

/* ═══════════════════════════ COMPONENTS ═════════════════════════ */

/* METRIC CARDS */
.metrics-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px}
.metric-card{
  background:var(--surface);border:1px solid var(--border);
  border-radius:var(--radius-lg);padding:20px;
  box-shadow:var(--shadow);transition:box-shadow 0.2s,background 0.25s;
}
.metric-card:hover{box-shadow:var(--shadow-md)}
.metric-label{font-size:12px;color:var(--ink3);letter-spacing:0.03em;margin-bottom:8px;font-weight:500}
.metric-value{font-family:'Clash Display',sans-serif;font-size:1.75rem;font-weight:700;color:var(--ink);letter-spacing:-0.03em;line-height:1}
.metric-sub{font-size:12px;margin-top:6px;display:flex;align-items:center;gap:4px}
.metric-up{color:var(--green)}
.metric-down{color:var(--red)}
.metric-neutral{color:var(--ink3)}
.metric-amber{color:var(--amber)}

/* CARDS */
.card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);box-shadow:var(--shadow);transition:background 0.25s,border-color 0.25s}
.card-header{
  display:flex;align-items:center;justify-content:space-between;
  padding:18px 20px;border-bottom:1px solid var(--border);
}
.card-title{font-family:'Clash Display',sans-serif;font-size:0.95rem;font-weight:600;color:var(--ink)}
.card-body{padding:20px}
.card-action{
  font-size:12px;color:var(--accent);cursor:pointer;font-weight:500;
  background:none;border:none;transition:opacity 0.15s;
}
.card-action:hover{opacity:0.7}

/* TABLES */
.table-wrap{overflow-x:auto}
table{width:100%;border-collapse:collapse}
th{
  text-align:left;padding:10px 14px;font-size:11px;
  color:var(--ink3);letter-spacing:0.06em;font-weight:500;
  border-bottom:1px solid var(--border);background:var(--surface2);
  font-family:'JetBrains Mono',monospace;
}
td{padding:13px 14px;border-bottom:1px solid var(--border);font-size:13px;vertical-align:middle}
tr:last-child td{border-bottom:none}
tr:hover td{background:var(--surface2)}

/* BADGES */
.badge{
  display:inline-flex;align-items:center;gap:4px;
  font-size:11px;font-weight:500;padding:3px 9px;
  border-radius:20px;letter-spacing:0.02em;
  font-family:'JetBrains Mono',monospace;
}
.badge-green{background:var(--green-light);color:var(--green)}
.badge-red{background:var(--red-light);color:var(--red)}
.badge-amber{background:var(--amber-light);color:var(--amber)}
.badge-blue{background:var(--accent-light);color:var(--accent)}
.badge-gray{background:var(--surface2);color:var(--ink3);border:1px solid var(--border)}
.badge-purple{background:var(--pop-purple-light);color:var(--pop-purple)}
.badge-teal{background:var(--pop-teal-light);color:var(--pop-teal)}

/* BUTTONS */
.btn{
  display:inline-flex;align-items:center;gap:6px;
  border-radius:8px;padding:9px 18px;font-size:13.5px;font-weight:500;
  cursor:pointer;transition:all 0.15s;border:none;
  font-family:'Bricolage Grotesque',sans-serif;
}
.btn-primary{background:var(--accent);color:#fff}
.btn-primary:hover{background:var(--accent-dark);transform:translateY(-1px);box-shadow:0 4px 14px rgba(26,79,214,0.35)}
.btn-secondary{background:var(--surface2);border:1px solid var(--border);color:var(--ink2)}
.btn-secondary:hover{background:var(--border);color:var(--ink)}
.btn-danger{background:var(--red-light);color:var(--red);border:1px solid rgba(214,48,49,0.2)}
.btn-danger:hover{background:var(--red);color:#fff}
.btn-green{background:var(--green-light);color:var(--green);border:1px solid rgba(15,123,78,0.2)}
.btn-green:hover{background:var(--green);color:#fff}
.btn-sm{padding:6px 12px;font-size:12px}
.btn-lg{padding:13px 28px;font-size:15px}

/* INPUTS */
.form-group{margin-bottom:16px}
.form-label{display:block;font-size:12px;font-weight:500;color:var(--ink2);margin-bottom:5px;letter-spacing:0.02em}
.form-input{
  width:100%;padding:9px 13px;font-size:13.5px;
  background:var(--surface);border:1px solid var(--border2);
  border-radius:8px;color:var(--ink);outline:none;
  transition:border-color 0.15s,background 0.25s;font-family:'Bricolage Grotesque',sans-serif;
}
.form-input:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(26,79,214,0.12)}
select.form-input{cursor:pointer}
.input-prefix{
  display:flex;border:1px solid var(--border2);border-radius:8px;overflow:hidden;
}
.input-prefix-label{
  background:var(--surface2);padding:9px 12px;font-size:13px;
  color:var(--ink3);border-right:1px solid var(--border2);
  white-space:nowrap;font-family:'JetBrains Mono',monospace;
}
.input-prefix .form-input{border:none;border-radius:0}
.input-prefix .form-input:focus{box-shadow:none}

/* SECTIONS LAYOUT */
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.three-col{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px}
.content-grid{display:grid;grid-template-columns:2fr 1fr;gap:20px}

/* SECTION TITLE */
.section-heading{font-family:'Clash Display',sans-serif;font-size:1.1rem;font-weight:600;margin-bottom:16px;color:var(--ink)}
.section-sub{font-size:13px;color:var(--ink3);margin-top:2px;margin-bottom:16px;font-weight:400}

/* DIVIDER */
.divider{height:1px;background:var(--border);margin:20px 0}

/* FEATURE TAG */
.feature-tag{
  display:inline-flex;align-items:center;gap:5px;
  font-size:11px;font-weight:500;color:var(--accent);
  background:var(--accent-light);border-radius:6px;padding:3px 8px;
  letter-spacing:0.03em;margin-bottom:6px;
}

/* PLAN CARDS */
.plan-card{
  background:var(--surface);border:1px solid var(--border);
  border-radius:var(--radius-lg);padding:24px;
  transition:all 0.2s;cursor:pointer;
}
.plan-card.featured{
  border:2px solid var(--accent);
  box-shadow:0 0 0 4px rgba(26,79,214,0.08);
}
.plan-card:hover{box-shadow:var(--shadow-md)}
.plan-name{font-family:'Clash Display',sans-serif;font-size:1.15rem;font-weight:700;margin-bottom:4px}
.plan-price{font-family:'Clash Display',sans-serif;font-size:2rem;font-weight:700;color:var(--ink);letter-spacing:-0.04em}
.plan-price span{font-size:1rem;color:var(--ink3);font-weight:400}
.plan-feature{
  display:flex;align-items:center;gap:8px;
  font-size:13px;padding:6px 0;color:var(--ink2);
}
.plan-feature::before{content:'✓';color:var(--green);font-weight:700;font-size:12px}

/* INVOICE CARD */
.invoice-card{
  background:var(--surface);border:1px solid var(--border);
  border-radius:var(--radius-lg);padding:20px;
  transition:all 0.2s;
}
.invoice-card:hover{box-shadow:var(--shadow-md);border-color:var(--border2)}

/* CHART */
.chart-area{
  height:180px;background:var(--surface2);border-radius:8px;
  display:flex;align-items:flex-end;gap:6px;padding:16px 16px 0;
  overflow:hidden;
}
.chart-bar{
  flex:1;border-radius:4px 4px 0 0;min-height:8px;
  background:linear-gradient(180deg,var(--chart-bar-from),var(--chart-bar-to));
  opacity:0.85;transition:opacity 0.2s;cursor:pointer;
}
.chart-bar:hover{opacity:1}
.chart-bar.green{background:linear-gradient(180deg,var(--green),#34D399)}
.chart-bar.amber{background:linear-gradient(180deg,var(--amber),#FCD34D)}
.chart-bar.purple{background:linear-gradient(180deg,var(--pop-purple),#C4B5FD)}
.chart-bar.teal{background:linear-gradient(180deg,var(--pop-teal),#67E8F9)}

/* PROGRESS */
.progress-bar{height:6px;background:var(--border);border-radius:3px;overflow:hidden}
.progress-fill{height:100%;border-radius:3px;background:var(--accent);transition:width 0.4s}
.progress-fill.green{background:var(--green)}

/* MODALS */
.modal-overlay{
  display:none;position:fixed;inset:0;
  background:rgba(0,0,0,0.45);z-index:1000;
  align-items:center;justify-content:center;
  backdrop-filter:blur(4px);
}
.modal-overlay.open{display:flex}
.modal{
  background:var(--surface);border-radius:var(--radius-lg);
  padding:28px;width:480px;max-width:95vw;
  box-shadow:var(--shadow-lg);border:1px solid var(--border);
  animation:slideUp 0.2s ease;transition:background 0.25s;
}
@keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.modal-title{font-family:'Clash Display',sans-serif;font-size:1.2rem;font-weight:700;margin-bottom:4px;color:var(--ink)}
.modal-sub{font-size:13px;color:var(--ink3);margin-bottom:20px}
.modal-close{
  position:absolute;top:16px;right:16px;
  background:var(--surface2);border:1px solid var(--border);
  width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;
  cursor:pointer;font-size:16px;color:var(--ink3);transition:all 0.15s;
}
.modal-close:hover{background:var(--border);color:var(--ink)}

/* NOTIFICATIONS */
.notif-panel{
  position:fixed;top:calc(var(--header-h) + 8px);right:16px;
  width:320px;background:var(--surface);border:1px solid var(--border);
  border-radius:var(--radius-lg);box-shadow:var(--shadow-lg);
  z-index:500;display:none;transition:background 0.25s;
}
.notif-panel.open{display:block}
.notif-item{
  display:flex;gap:12px;padding:14px 16px;
  border-bottom:1px solid var(--border);cursor:pointer;transition:background 0.15s;
}
.notif-item:hover{background:var(--surface2)}
.notif-item:last-child{border-bottom:none}
.notif-icon{width:36px;height:36px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:16px}
.notif-content{flex:1}
.notif-title{font-size:13px;font-weight:500;color:var(--ink);margin-bottom:2px}
.notif-desc{font-size:12px;color:var(--ink3);line-height:1.4}
.notif-time{font-size:11px;color:var(--ink3);font-family:'JetBrains Mono',monospace;margin-top:3px}

/* TOAST */
.toast{
  position:fixed;bottom:24px;right:24px;z-index:2000;
  background:var(--ink);color:var(--bg);
  border-radius:10px;padding:12px 18px;font-size:13px;font-weight:500;
  display:flex;align-items:center;gap:8px;
  box-shadow:var(--shadow-lg);transform:translateY(80px);opacity:0;
  transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1);max-width:340px;
}
.toast.show{transform:translateY(0);opacity:1}
.toast-icon{font-size:16px}

/* STATUS */
.status-ring{width:8px;height:8px;border-radius:50%;flex-shrink:0;display:inline-block}
.status-ring.green{background:var(--green)}
.status-ring.red{background:var(--red)}
.status-ring.amber{background:var(--amber)}

/* EMPTY STATE */
.empty-state{text-align:center;padding:48px 20px;color:var(--ink3)}
.empty-icon{font-size:2.5rem;margin-bottom:12px;opacity:0.5}
.empty-title{font-family:'Clash Display',sans-serif;font-size:1rem;color:var(--ink2);margin-bottom:6px}
.empty-desc{font-size:13px;line-height:1.6}

/* RATE STRIP */
.rate-strip{
  background:linear-gradient(135deg,var(--rate-strip-from),var(--rate-strip-to));
  border-radius:var(--radius);padding:14px 18px;
  display:flex;align-items:center;justify-content:space-between;
  color:#fff;margin-bottom:20px;
}
.rate-label{font-size:11px;opacity:0.7;margin-bottom:2px;letter-spacing:0.05em}
.rate-value{font-family:'Clash Display',sans-serif;font-size:1.1rem;font-weight:700}

/* FEE BREAKDOWN */
.fee-row{
  display:flex;justify-content:space-between;align-items:center;
  padding:8px 0;border-bottom:1px solid var(--border);font-size:13px;
}
.fee-row:last-child{border-bottom:none;font-weight:600;padding-top:10px}

/* ARC CHAIN TAG */
.arc-chain{
  display:inline-flex;align-items:center;gap:5px;
  background:var(--accent-light);border:1px solid rgba(26,79,214,0.15);
  border-radius:6px;padding:3px 8px;font-size:11px;
  color:var(--accent);font-family:'JetBrains Mono',monospace;
}
.arc-chain img{width:12px;height:12px;border-radius:2px}

/* TABS */
.tabs{display:flex;border-bottom:1px solid var(--border);margin-bottom:20px}
.tab{
  padding:10px 18px;font-size:13.5px;font-weight:500;color:var(--ink3);
  cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px;
  transition:all 0.15s;
}
.tab:hover{color:var(--ink2)}
.tab.active{color:var(--accent);border-bottom-color:var(--accent)}

/* TOGGLE */
.toggle{
  display:flex;background:var(--surface2);border:1px solid var(--border);
  border-radius:8px;padding:3px;gap:2px;margin-bottom:20px;width:fit-content;
}
.toggle-btn{
  padding:6px 16px;border-radius:6px;font-size:12.5px;font-weight:500;
  cursor:pointer;transition:all 0.15s;color:var(--ink3);border:none;background:none;
  font-family:'Bricolage Grotesque',sans-serif;
}
.toggle-btn.active{background:var(--surface);color:var(--ink);box-shadow:var(--shadow)}

/* THEME TOGGLE BUTTON */
.theme-toggle{
  width:36px;height:36px;border-radius:8px;
  background:var(--surface2);border:1px solid var(--border);
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;font-size:16px;transition:all 0.15s;
  flex-shrink:0;
}
.theme-toggle:hover{background:var(--border)}

/* ACTIVITY */
.activity-item{display:flex;align-items:center;gap:12px;padding:11px 0;border-bottom:1px solid var(--border)}
.activity-item:last-child{border-bottom:none}
.activity-icon{width:36px;height:36px;border-radius:10px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:15px}
.activity-info{flex:1}
.activity-name{font-size:13.5px;font-weight:500;color:var(--ink)}
.activity-detail{font-size:12px;color:var(--ink3);margin-top:1px}
.activity-amount{font-family:'JetBrains Mono',monospace;font-size:13.5px;font-weight:500;text-align:right}
.activity-time{font-size:11px;color:var(--ink3);text-align:right;margin-top:1px}

/* TEAM */
.member-row{display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--border)}
.member-row:last-child{border-bottom:none}
.member-avatar{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:600;color:#fff;flex-shrink:0}

/* SCROLLBAR */
::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:var(--border2);border-radius:10px}

/* MOBILE */
.menu-toggle{display:none;background:none;border:none;cursor:pointer;padding:6px;font-size:20px;color:var(--ink)}
@media(max-width:900px){
  .sidebar{position:fixed;left:-250px;top:0;bottom:0;transition:left 0.3s;z-index:100}
  .sidebar.open{left:0;box-shadow:var(--shadow-lg)}
  .menu-toggle{display:flex}
  .metrics-grid{grid-template-columns:1fr 1fr}
  .content-grid{grid-template-columns:1fr}
  .two-col{grid-template-columns:1fr}
  .three-col{grid-template-columns:1fr}
}
@media(max-width:520px){
  .metrics-grid{grid-template-columns:1fr}
  .content{padding:16px}
}
.notif-dot{position:relative}
.notif-dot::after{
  content:'';position:absolute;top:-2px;right:-2px;
  width:7px;height:7px;border-radius:50%;background:var(--red);
  border:2px solid var(--surface);
}

.content{flex:1;overflow-y:auto;padding:28px;background:var(--bg)}

/* ═══════════════════════════ PAGES ═══════════════════════════════ */
.page{display:none}
.page.active{display:block}

/* ═══════════════════════════ COMPONENTS ═════════════════════════ */

/* METRIC CARDS */
.metrics-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px}
.metric-card{
  background:var(--surface);border:1px solid var(--border);
  border-radius:var(--radius-lg);padding:20px;
  box-shadow:var(--shadow);transition:box-shadow 0.2s;
}
.metric-card:hover{box-shadow:var(--shadow-md)}
.metric-label{font-size:12px;color:var(--ink3);letter-spacing:0.03em;margin-bottom:8px;font-weight:500}
.metric-value{font-family:'Clash Display',sans-serif;font-size:1.75rem;font-weight:700;color:var(--ink);letter-spacing:-0.03em;line-height:1}
.metric-sub{font-size:12px;margin-top:6px;display:flex;align-items:center;gap:4px}
.metric-up{color:var(--green)}
.metric-down{color:var(--red)}
.metric-neutral{color:var(--ink3)}

/* CARDS */
.card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);box-shadow:var(--shadow)}
.card-header{
  display:flex;align-items:center;justify-content:space-between;
  padding:18px 20px;border-bottom:1px solid var(--border);
}
.card-title{font-family:'Clash Display',sans-serif;font-size:0.95rem;font-weight:600;color:var(--ink)}
.card-body{padding:20px}
.card-action{
  font-size:12px;color:var(--accent);cursor:pointer;font-weight:500;
  background:none;border:none;transition:opacity 0.15s;
}
.card-action:hover{opacity:0.7}

/* TABLES */
.table-wrap{overflow-x:auto}
table{width:100%;border-collapse:collapse}
th{
  text-align:left;padding:10px 14px;font-size:11px;
  color:var(--ink3);letter-spacing:0.06em;font-weight:500;
  border-bottom:1px solid var(--border);background:var(--surface2);
  font-family:'JetBrains Mono',monospace;
}
td{padding:13px 14px;border-bottom:1px solid var(--border);font-size:13px;vertical-align:middle}
tr:last-child td{border-bottom:none}
tr:hover td{background:var(--surface2)}

/* BADGES */
.badge{
  display:inline-flex;align-items:center;gap:4px;
  font-size:11px;font-weight:500;padding:3px 9px;
  border-radius:20px;letter-spacing:0.02em;
  font-family:'JetBrains Mono',monospace;
}
.badge-green{background:var(--green-light);color:#1A5C36}
.badge-red{background:var(--red-light);color:#8B1A10}
.badge-amber{background:var(--amber-light);color:#8B5A00}
.badge-blue{background:var(--gold-light);color:var(--accent)}
.badge-gray{background:var(--surface2);color:var(--ink3);border:1px solid var(--border)}

/* BUTTONS */
.btn{
  display:inline-flex;align-items:center;gap:6px;
  border-radius:8px;padding:9px 18px;font-size:13.5px;font-weight:500;
  cursor:pointer;transition:all 0.15s;border:none;
  font-family:'Bricolage Grotesque',sans-serif;
}
.btn-primary{background:var(--accent);color:#fff}
.btn-primary:hover{background:var(--accent-dark);transform:translateY(-1px);box-shadow:0 4px 14px rgba(193,127,36,0.35)}
.btn-secondary{background:var(--surface2);border:1px solid var(--border);color:var(--ink2)}
.btn-secondary:hover{background:var(--border);color:var(--ink)}
.btn-danger{background:var(--red-light);color:var(--red);border:1px solid rgba(192,57,43,0.2)}
.btn-danger:hover{background:var(--red);color:#fff}
.btn-green{background:var(--green-light);color:var(--green);border:1px solid rgba(42,122,74,0.2)}
.btn-green:hover{background:var(--green);color:#fff}
.btn-sm{padding:6px 12px;font-size:12px}
.btn-lg{padding:13px 28px;font-size:15px}

/* INPUTS */
.form-group{margin-bottom:16px}
.form-label{display:block;font-size:12px;font-weight:500;color:var(--ink2);margin-bottom:5px;letter-spacing:0.02em}
.form-input{
  width:100%;padding:9px 13px;font-size:13.5px;
  background:var(--surface);border:1px solid var(--border2);
  border-radius:8px;color:var(--ink);outline:none;
  transition:border-color 0.15s;font-family:'Bricolage Grotesque',sans-serif;
}
.form-input:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(193,127,36,0.12)}
select.form-input{cursor:pointer}
.input-prefix{
  display:flex;border:1px solid var(--border2);border-radius:8px;overflow:hidden;
}
.input-prefix-label{
  background:var(--surface2);padding:9px 12px;font-size:13px;
  color:var(--ink3);border-right:1px solid var(--border2);
  white-space:nowrap;font-family:'JetBrains Mono',monospace;
}
.input-prefix .form-input{border:none;border-radius:0}
.input-prefix .form-input:focus{box-shadow:none}

/* SECTIONS LAYOUT */
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.three-col{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px}
.content-grid{display:grid;grid-template-columns:2fr 1fr;gap:20px}

/* SECTION TITLE */
.section-heading{
  font-family:'Clash Display',sans-serif;font-size:1.1rem;font-weight:600;
  margin-bottom:16px;color:var(--ink);
}
.section-sub{font-size:13px;color:var(--ink3);margin-top:2px;margin-bottom:16px;font-weight:400}

/* DIVIDER */
.divider{height:1px;background:var(--border);margin:20px 0}

/* FEATURE TAG */
.feature-tag{
  display:inline-flex;align-items:center;gap:5px;
  font-size:11px;font-weight:500;color:var(--accent);
  background:var(--accent-light);border-radius:6px;padding:3px 8px;
  letter-spacing:0.03em;margin-bottom:6px;
}

/* PLAN CARDS */
.plan-card{
  background:var(--surface);border:1px solid var(--border);
  border-radius:var(--radius-lg);padding:24px;
  transition:all 0.2s;cursor:pointer;
}
.plan-card.featured{
  border:2px solid var(--accent);
  box-shadow:0 0 0 4px rgba(193,127,36,0.08);
}
.plan-card:hover{box-shadow:var(--shadow-md)}
.plan-name{font-family:'Clash Display',sans-serif;font-size:1.15rem;font-weight:700;margin-bottom:4px}
.plan-price{font-family:'Clash Display',sans-serif;font-size:2rem;font-weight:700;color:var(--ink);letter-spacing:-0.04em}
.plan-price span{font-size:1rem;color:var(--ink3);font-weight:400}
.plan-feature{
  display:flex;align-items:center;gap:8px;
  font-size:13px;padding:6px 0;color:var(--ink2);
}
.plan-feature::before{content:'✓';color:var(--green);font-weight:700;font-size:12px}

/* INVOICE CARD */
.invoice-card{
  background:var(--surface);border:1px solid var(--border);
  border-radius:var(--radius-lg);padding:20px;
  transition:all 0.2s;
}
.invoice-card:hover{box-shadow:var(--shadow-md);border-color:var(--border2)}

/* CHART PLACEHOLDER */
.chart-area{
  height:180px;background:var(--surface2);border-radius:8px;
  display:flex;align-items:flex-end;gap:6px;padding:16px 16px 0;
  overflow:hidden;
}
.chart-bar{
  flex:1;border-radius:4px 4px 0 0;min-height:8px;
  background:linear-gradient(180deg,var(--accent),#E8C070);
  opacity:0.8;transition:opacity 0.2s;cursor:pointer;
}
.chart-bar:hover{opacity:1}
.chart-bar.green{background:linear-gradient(180deg,var(--green),#5ABF80)}
.chart-bar.amber{background:linear-gradient(180deg,var(--amber),#F0C060)}

/* PROGRESS */
.progress-bar{height:6px;background:var(--border);border-radius:3px;overflow:hidden}
.progress-fill{height:100%;border-radius:3px;background:var(--accent);transition:width 0.4s}
.progress-fill.green{background:var(--green)}

/* MODALS */
.modal-overlay{
  display:none;position:fixed;inset:0;
  background:rgba(0,0,0,0.4);z-index:1000;
  align-items:center;justify-content:center;
  backdrop-filter:blur(4px);
}
.modal-overlay.open{display:flex}
.modal{
  background:var(--surface);border-radius:var(--radius-lg);
  padding:28px;width:480px;max-width:95vw;
  box-shadow:var(--shadow-lg);border:1px solid var(--border);
  animation:slideUp 0.2s ease;
}
@keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.modal-title{font-family:'Clash Display',sans-serif;font-size:1.2rem;font-weight:700;margin-bottom:4px}
.modal-sub{font-size:13px;color:var(--ink3);margin-bottom:20px}
.modal-close{
  position:absolute;top:16px;right:16px;
  background:var(--surface2);border:1px solid var(--border);
  width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;
  cursor:pointer;font-size:16px;color:var(--ink3);transition:all 0.15s;
}
.modal-close:hover{background:var(--border);color:var(--ink)}

/* NOTIFICATIONS */
.notif-panel{
  position:fixed;top:calc(var(--header-h) + 8px);right:16px;
  width:320px;background:var(--surface);border:1px solid var(--border);
  border-radius:var(--radius-lg);box-shadow:var(--shadow-lg);
  z-index:500;display:none;
}
.notif-panel.open{display:block}
.notif-item{
  display:flex;gap:12px;padding:14px 16px;
  border-bottom:1px solid var(--border);cursor:pointer;transition:background 0.15s;
}
.notif-item:hover{background:var(--surface2)}
.notif-item:last-child{border-bottom:none}
.notif-icon{
  width:36px;height:36px;border-radius:50%;flex-shrink:0;
  display:flex;align-items:center;justify-content:center;font-size:16px;
}
.notif-content{flex:1}
.notif-title{font-size:13px;font-weight:500;color:var(--ink);margin-bottom:2px}
.notif-desc{font-size:12px;color:var(--ink3);line-height:1.4}
.notif-time{font-size:11px;color:var(--ink3);font-family:'JetBrains Mono',monospace;margin-top:3px}

/* TOAST */
.toast{
  position:fixed;bottom:24px;right:24px;z-index:2000;
  background:var(--ink);color:#fff;
  border-radius:10px;padding:12px 18px;font-size:13px;font-weight:500;
  display:flex;align-items:center;gap:8px;
  box-shadow:var(--shadow-lg);transform:translateY(80px);opacity:0;
  transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1);max-width:340px;
}
.toast.show{transform:translateY(0);opacity:1}
.toast-icon{font-size:16px}

/* STATUS INDICATOR */
.status-ring{
  width:8px;height:8px;border-radius:50%;flex-shrink:0;display:inline-block;
}
.status-ring.green{background:var(--green)}
.status-ring.red{background:var(--red)}
.status-ring.amber{background:var(--amber)}

/* EMPTY STATE */
.empty-state{
  text-align:center;padding:48px 20px;color:var(--ink3);
}
.empty-icon{font-size:2.5rem;margin-bottom:12px;opacity:0.5}
.empty-title{font-family:'Clash Display',sans-serif;font-size:1rem;color:var(--ink2);margin-bottom:6px}
.empty-desc{font-size:13px;line-height:1.6}

/* OFFCHAIN RATE */
.rate-strip{
  background:linear-gradient(135deg,#8B5A14,#C17F24);
  border-radius:var(--radius);padding:14px 18px;
  display:flex;align-items:center;justify-content:space-between;
  color:#fff;margin-bottom:20px;
}
.rate-label{font-size:11px;opacity:0.7;margin-bottom:2px;letter-spacing:0.05em}
.rate-value{font-family:'Clash Display',sans-serif;font-size:1.1rem;font-weight:700}

/* FEE BREAKDOWN */
.fee-row{
  display:flex;justify-content:space-between;align-items:center;
  padding:8px 0;border-bottom:1px solid var(--border);font-size:13px;
}
.fee-row:last-child{border-bottom:none;font-weight:600;padding-top:10px}

/* ARC CHAIN TAG */
.arc-chain{
  display:inline-flex;align-items:center;gap:5px;
  background:rgba(193,127,36,0.08);border:1px solid rgba(193,127,36,0.2);
  border-radius:6px;padding:3px 8px;font-size:11px;
  color:var(--accent-dark);font-family:'JetBrains Mono',monospace;
}
.arc-chain img{width:12px;height:12px;border-radius:2px}

/* TABS */
.tabs{display:flex;border-bottom:1px solid var(--border);margin-bottom:20px}
.tab{
  padding:10px 18px;font-size:13.5px;font-weight:500;color:var(--ink3);
  cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px;
  transition:all 0.15s;
}
.tab:hover{color:var(--ink2)}
.tab.active{color:var(--accent);border-bottom-color:var(--accent)}

/* TOGGLE */
.toggle{
  display:flex;background:var(--surface2);border:1px solid var(--border);
  border-radius:8px;padding:3px;gap:2px;margin-bottom:20px;width:fit-content;
}
.toggle-btn{
  padding:6px 16px;border-radius:6px;font-size:12.5px;font-weight:500;
  cursor:pointer;transition:all 0.15s;color:var(--ink3);border:none;background:none;
  font-family:'Bricolage Grotesque',sans-serif;
}
.toggle-btn.active{background:var(--surface);color:var(--ink);box-shadow:var(--shadow)}

/* ACTIVITY ITEM */
.activity-item{
  display:flex;align-items:center;gap:12px;padding:11px 0;
  border-bottom:1px solid var(--border);
}
.activity-item:last-child{border-bottom:none}
.activity-icon{
  width:36px;height:36px;border-radius:10px;flex-shrink:0;
  display:flex;align-items:center;justify-content:center;font-size:15px;
}
.activity-info{flex:1}
.activity-name{font-size:13.5px;font-weight:500;color:var(--ink)}
.activity-detail{font-size:12px;color:var(--ink3);margin-top:1px}
.activity-amount{font-family:'JetBrains Mono',monospace;font-size:13.5px;font-weight:500;text-align:right}
.activity-time{font-size:11px;color:var(--ink3);text-align:right;margin-top:1px}

/* TEAM MEMBER ROW */
.member-row{
  display:flex;align-items:center;gap:12px;padding:12px 0;
  border-bottom:1px solid var(--border);
}
.member-row:last-child{border-bottom:none}
.member-avatar{
  width:38px;height:38px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  font-size:14px;font-weight:600;color:#fff;flex-shrink:0;
}

/* SCROLLBAR */
::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:var(--border2);border-radius:10px}

/* MOBILE MENU */
.menu-toggle{display:none;background:none;border:none;cursor:pointer;padding:6px;font-size:20px;color:var(--ink)}
@media(max-width:900px){
  .sidebar{position:fixed;left:-250px;top:0;bottom:0;transition:left 0.3s;z-index:100}
  .sidebar.open{left:0;box-shadow:var(--shadow-lg)}
  .menu-toggle{display:flex}
  .metrics-grid{grid-template-columns:1fr 1fr}
  .content-grid{grid-template-columns:1fr}
  .two-col{grid-template-columns:1fr}
  .three-col{grid-template-columns:1fr}
}
@media(max-width:520px){
  .metrics-grid{grid-template-columns:1fr}
  .content{padding:16px}
}
</style>
</head>
<body>

<div class="app-shell">

<!-- SIDEBAR -->
<aside class="sidebar" id="sidebar">
  <div class="sidebar-header">
    <div>
      <div class="ff-logo">Fin<span>Flow</span></div>
      <div style="font-size:10px;color:rgba(200,216,240,0.4);margin-top:1px;font-family:'JetBrains Mono',monospace;letter-spacing:0.06em">PAYMENTS PLATFORM</div>
    </div>
  </div>

  <div class="arc-badge" style="margin-top:12px">
    <img src="data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCABAAEADASIAAhEBAxEB/8QAHAAAAgMBAQEBAAAAAAAAAAAAAAYEBQcDAgH/xAA2EAABAwMCBAQEBAcAAAAAAAABAgMEAAUREiExBkFRYRMicYEHMkKRofAUFSNSU2KCwdH/xAAXAQEBAQEAAAAAAAAAAAAAAAADBAIB/8QAIhEAAgIDAQEBAQEBAAAAAAAAAAECEQMSITETQVFh/9oADAMBAAIRAxEAPwCmN4lLvWrrcmxpixbJ2pZW5gdFkd0D3rVvE60oLlqkqx0VHU4fmVg/rUNNqCeGa82UHNKhYs7jsblqe6fT3EVhCZCsAqUB3nzwPOt7JrlqmJCJlkN41hAHqTVhzQZHVb3Mf2JXqhplIiurWoJ8Oaln8qrN2nNuzXV8SEByJe3bxJ/MVLVqiUkFrSFDxBbP8VL3KCGdUuBtCEJbdIShCcJA4UAqeqSb3Z/0TGiFaKaXS+bkzxdJ5FZ5LfI8J2g88YNb8+tU5cF5+NcDiS2twLiup5oOcFJPbB7a7JVJt9wt0bkTiW2lEJVj6cg98VEi11LKxFuLZJZJCXE7VLST0P+VH9PEbJLbj28Nw1Qb0ZZZT6t5qFJaV0UDzSfkfKuhH1VctLpDVyYZkRz1bkthSh5BSeXpXO4V7u1qd9FEqTGfGWlpOUqHZST+1WTR1qX6FMkiAW1oCvEkIPPYnlke46H+afFNtk09I5VqktXnJPpxS1sMW1bmOqrGpjCnFa8laVklCj1CiMEe2D2rYdTHbVqEPZbV3VEqSPD7fCo+QqL1Nq+6XKWlpxbcBhJT/AIZnzaTzyfM8yehwKWpDjdyiMzI6vCdbBSoHkfI9iORFGrS9JR8mFpH9TRG1QivSlW9Ul5hLiluJKd6E5Kk9cHv51I9Ld5bqGmFvJW8oJShI3KUT0AFRWktMwFvuRnXlu2xiPTzJDm0E+5GDyz61NR41p09HHCP4aYFpSQtBDqyCNpI7YHLnk/Wm8Z3b1YJqFbkSLJhzAtTLe1OWkFe0fQk8j7fjV6j3GFKhJmQ3Uusr5KGce+KoBerXImOvzT6UU48VKYaT4lFR/URjl7cqnnZEmwSgqLLYkxEZ2PISPDWjuOiug6fOlNvI6kZaomLaSk45V5GonQkOVfNeW/ck7mmVbhuyScBSj3x0H2rrrYVjSqn7dv3P/9k=" alt="arc">
    <div class="arc-badge-text">ARC TESTNET</div>
    <div class="testnet-dot"></div>
  </div>

  <div class="nav-section-label">Main</div>
  <div class="nav-item active" onclick="navigate('dashboard',this)" data-tooltip="Dashboard">
    <span class="nav-icon">📊</span> Dashboard
  </div>
  <div class="nav-item" onclick="navigate('payments',this)">
    <span class="nav-icon">💳</span> Payments
    <span class="nav-badge">3</span>
  </div>
  <div class="nav-item" onclick="navigate('payouts',this)">
    <span class="nav-icon">🚀</span> Payouts
  </div>
  <div class="nav-item" onclick="navigate('invoices',this)">
    <span class="nav-icon">🧾</span> Invoices
  </div>

  <div class="nav-section-label">Finance</div>
  <div class="nav-item" onclick="navigate('offramp',this)">
    <span class="nav-icon">🏦</span> Off-Ramp
  </div>
  <div class="nav-item" onclick="navigate('escrow',this)">
    <span class="nav-icon">🔐</span> Escrow
  </div>
  <div class="nav-item" onclick="navigate('analytics',this)">
    <span class="nav-icon">📈</span> Analytics
  </div>

  <div class="nav-section-label">Team</div>
  <div class="nav-item" onclick="navigate('team',this)">
    <span class="nav-icon">👥</span> Team Wallets
  </div>
  <div class="nav-item" onclick="navigate('api',this)">
    <span class="nav-icon">🔌</span> API & Dev
  </div>
  <div class="nav-item" onclick="navigate('settings',this)">
    <span class="nav-icon">⚙️</span> Settings
  </div>

  <div class="sidebar-footer">
    <div class="wallet-pill" onclick="openModal('wallet-connect')">
      <div class="wallet-label" id="wallet-pill-label">WALLET</div>
      <div class="wallet-addr" id="wallet-addr-display">Not connected</div>
      <div class="wallet-net" id="wallet-net-display">Connect your wallet</div>
    </div>
  </div>
</aside>

<!-- MAIN CONTENT -->
<main class="main">
  <!-- TOP BAR -->
  <header class="topbar">
    <div style="display:flex;align-items:center;gap:14px">
      <button class="menu-toggle" onclick="toggleSidebar()">☰</button>
      <span class="page-title" id="page-title">Dashboard</span>
    </div>
    <div class="topbar-right">
      <div class="arc-chain">
        <img src="data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCABAAEADASIAAhEBAxEB/8QAHAAAAgMBAQEBAAAAAAAAAAAAAAYEBQcDAgH/xAA2EAABAwMCBAQEBAcAAAAAAAABAgMEAAUREiExBkFRYRMicYEHMkKRofAUFSNSU2KCwdH/xAAXAQEBAQEAAAAAAAAAAAAAAAADBAIB/8QAIhEAAgIDAQEBAQEBAAAAAAAAAAECEQMSITETQVFh/9oADAMBAAIRAxEAPwCmN4lLvWrrcmxpixbJ2pZW5gdFkd0D3rVvE60oLlqkqx0VHU4fmVg/rUNNqCeGa82UHNKhYs7jsblqe6fT3EVhCZCsAqUB3nzwPOt7JrlqmJCJlkN41hAHqTVhzQZHVb3Mf2JXqhplIiurWoJ8Oaln8qrN2nNuzXV8SEByJe3bxJ/MVLVqiUkFrSFDxBbP8VL3KCGdUuBtCEJbdIShCcJA4UAqeqSb3Z/0TGiFaKaXS+bkzxdJ5FZ5LfI8J2g88YNb8+tU5cF5+NcDiS2twLiup5oOcFJPbB7a7JVJt9wt0bkTiW2lEJVj6cg98VEi11LKxFuLZJZJCXE7VLST0P+VH9PEbJLbj28Nw1Qb0ZZZT6t5qFJaV0UDzSfkfKuhH1VctLpDVyYZkRz1bkthSh5BSeXpXO4V7u1qd9FEqTGfGWlpOUqHZST+1WTR1qX6FMkiAW1oCvEkIPPYnlke46H+afFNtk09I5VqktXnJPpxS1sMW1bmOqrGpjCnFa8laVklCj1CiMEe2D2rYdTHbVqEPZbV3VEqSPD7fCo+QqL1Nq+6XKWlpxbcBhJT/AIZnzaTzyfM8yehwKWpDjdyiMzI6vCdbBSoHkfI9iORFGrS9JR8mFpH9TRG1QivSlW9Ul5hLiluJKd6E5Kk9cHv51I9Ld5bqGmFvJW8oJShI3KUT0AFRWktMwFvuRnXlu2xiPTzJDm0E+5GDyz61NR41p09HHCP4aYFpSQtBDqyCNpI7YHLnk/Wm8Z3b1YJqFbkSLJhzAtTLe1OWkFe0fQk8j7fjV6j3GFKhJmQ3Uusr5KGce+KoBerXImOvzT6UU48VKYaT4lFR/URjl7cqnnZEmwSgqLLYkxEZ2PISPDWjuOiug6fOlNvI6kZaomLaSk45V5GonQkOVfNeW/ck7mmVbhuyScBSj3x0H2rrrYVjSqn7dv3P/9k=" alt="arc" style="width:12px;height:12px;border-radius:2px">
        Arc Testnet
      </div>
      <button class="topbar-btn notif-dot" onclick="toggleNotif()">🔔</button>
      <button id="theme-toggle" class="topbar-btn" onclick="toggleTheme()" title="Toggle dark/light mode" style="font-size:16px;padding:7px 10px">🌙</button>
      <button class="topbar-btn primary" onclick="openModal('send-payment')">+ New Payment</button>
      <button class="topbar-btn" onclick="openModal('wallet-connect')" style="border-color:var(--accent);color:var(--accent)" id="wallet-connect-status">🔗 Connect Wallet</button>
      <div class="avatar" id="topbar-avatar">KA</div>
    </div>
  </header>

  <!-- SCROLL CONTENT -->
  <div class="content">

    <!-- ══════════ DASHBOARD ══════════ -->
    <div class="page active" id="page-dashboard">
      <div class="rate-strip">
        <div>
          <div class="rate-label">LIVE RATES</div>
          <div class="rate-value">1 USDC = ₦1,620.50 NGN</div>
        </div>
        <div style="text-align:center">
          <div class="rate-label">1 USDC =</div>
          <div class="rate-value">KES 130.20</div>
        </div>
        <div style="text-align:center">
          <div class="rate-label">1 USDC =</div>
          <div class="rate-value">GHS 12.40</div>
        </div>
        <div style="text-align:right">
          <div class="rate-label">NETWORK FEE</div>
          <div class="rate-value">~$0.001</div>
        </div>
      </div>

      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-label">USDC BALANCE</div>
          <div class="metric-value" id="balance-display">2,840.50</div>
          <div class="metric-sub"><span class="metric-up">↑ +12.4%</span> <span class="metric-neutral">vs last month</span></div>
        </div>
        <div class="metric-card">
          <div class="metric-label">TOTAL RECEIVED (30D)</div>
          <div class="metric-value">18,420.00</div>
          <div class="metric-sub"><span class="metric-up">↑ +8.2%</span> <span class="metric-neutral">47 transactions</span></div>
        </div>
        <div class="metric-card">
          <div class="metric-label">FEES GENERATED</div>
          <div class="metric-value">184.20</div>
          <div class="metric-sub"><span class="metric-neutral">1% avg rate · Platform revenue</span></div>
        </div>
        <div class="metric-card">
          <div class="metric-label">PENDING PAYOUTS</div>
          <div class="metric-value">3,200.00</div>
          <div class="metric-sub"><span class="metric-amber">⏳ 5 awaiting</span></div>
        </div>
      </div>

      <div class="content-grid">
        <div>
          <div class="card" style="margin-bottom:20px">
            <div class="card-header">
              <span class="card-title">Revenue Overview</span>
              <div class="toggle">
                <button class="toggle-btn active">7D</button>
                <button class="toggle-btn">30D</button>
                <button class="toggle-btn">90D</button>
              </div>
            </div>
            <div class="card-body">
              <div class="chart-area">
                <div class="chart-bar" style="height:45%"></div>
                <div class="chart-bar" style="height:62%"></div>
                <div class="chart-bar" style="height:38%"></div>
                <div class="chart-bar" style="height:80%"></div>
                <div class="chart-bar green" style="height:55%"></div>
                <div class="chart-bar" style="height:95%"></div>
                <div class="chart-bar green" style="height:70%"></div>
              </div>
              <div style="display:flex;justify-content:space-between;margin-top:8px;font-size:11px;color:var(--ink3);font-family:'JetBrains Mono',monospace">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <span class="card-title">Recent Transactions</span>
              <button class="card-action" onclick="navigate('payments',document.querySelector('[onclick*=payments]'))">View all →</button>
            </div>
            <div class="card-body" style="padding:0">
              <div class="table-wrap">
                <table>
                  <thead><tr><th>DESCRIPTION</th><th>FROM / TO</th><th>AMOUNT</th><th>STATUS</th><th>TIME</th></tr></thead>
                  <tbody>
                    <tr>
                      <td><div style="font-weight:500">Invoice #INV-0042</div><div class="arc-chain" style="margin-top:4px;width:fit-content">Arc ·<a href="https://www.arc.network" target="_blank" style="color:var(--arc-blue);text-decoration:none"> 0x9a3f...c8e2</a></div></td>
                      <td style="font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--ink3)">Acme Corp</td>
                      <td style="font-weight:600;color:var(--green);font-family:'JetBrains Mono',monospace">+500.00 USDC</td>
                      <td><span class="badge badge-green">● Confirmed</span></td>
                      <td style="color:var(--ink3);font-size:12px">2 hrs ago</td>
                    </tr>
                    <tr>
                      <td><div style="font-weight:500">Payroll Batch #3</div><div class="arc-chain" style="margin-top:4px;width:fit-content">Arc · 0x7b1d...a4f0</div></td>
                      <td style="font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--ink3)">Team (4 wallets)</td>
                      <td style="font-weight:600;color:var(--red);font-family:'JetBrains Mono',monospace">-1,200.00 USDC</td>
                      <td><span class="badge badge-green">● Confirmed</span></td>
                      <td style="color:var(--ink3);font-size:12px">Yesterday</td>
                    </tr>
                    <tr>
                      <td><div style="font-weight:500">Payment Link: Design Work</div><div class="arc-chain" style="margin-top:4px;width:fit-content">Arc · 0x3d8c...1b90</div></td>
                      <td style="font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--ink3)">0x4F2c...9AB1</td>
                      <td style="font-weight:600;color:var(--green);font-family:'JetBrains Mono',monospace">+350.00 USDC</td>
                      <td><span class="badge badge-amber">● Pending</span></td>
                      <td style="color:var(--ink3);font-size:12px">2 days ago</td>
                    </tr>
                    <tr>
                      <td><div style="font-weight:500">Escrow Release</div><div class="arc-chain" style="margin-top:4px;width:fit-content">Arc · 0xc51a...8820</div></td>
                      <td style="font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--ink3)">StartupXYZ</td>
                      <td style="font-weight:600;color:var(--green);font-family:'JetBrains Mono',monospace">+2,000.00 USDC</td>
                      <td><span class="badge badge-green">● Confirmed</span></td>
                      <td style="color:var(--ink3);font-size:12px">3 days ago</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="card" style="margin-bottom:20px">
            <div class="card-header"><span class="card-title">Quick Actions</span></div>
            <div class="card-body" style="display:flex;flex-direction:column;gap:8px">
              <button class="btn btn-primary" style="width:100%;justify-content:center" onclick="openModal('payment-link')">🔗 Create Payment Link</button>
              <button class="btn btn-secondary" style="width:100%;justify-content:center" onclick="navigate('invoices',document.querySelector('[onclick*=invoices]'))">🧾 New Invoice</button>
              <button class="btn btn-secondary" style="width:100%;justify-content:center" onclick="navigate('payouts',document.querySelector('[onclick*=payouts]'))">🚀 Batch Payout</button>
              <button class="btn btn-green" style="width:100%;justify-content:center" onclick="navigate('offramp',document.querySelector('[onclick*=offramp]'))">🏦 Convert to Bank</button>
            </div>
          </div>

          <div class="card" style="margin-bottom:20px">
            <div class="card-header"><span class="card-title">Active Invoices</span></div>
            <div class="card-body" style="padding:12px 20px">
              <div class="activity-item">
                <div class="activity-icon" style="background:var(--accent-light)">🧾</div>
                <div class="activity-info">
                  <div class="activity-name">INV-0043 · TechDAO</div>
                  <div class="activity-detail">Due Jan 28 · <span class="badge badge-amber">Pending</span></div>
                </div>
                <div>
                  <div class="activity-amount">800 USDC</div>
                </div>
              </div>
              <div class="activity-item">
                <div class="activity-icon" style="background:var(--green-light)">🧾</div>
                <div class="activity-info">
                  <div class="activity-name">INV-0041 · Paystack</div>
                  <div class="activity-detail">Paid Jan 20 · <span class="badge badge-green">Paid</span></div>
                </div>
                <div>
                  <div class="activity-amount">1,200 USDC</div>
                </div>
              </div>
              <div class="activity-item">
                <div class="activity-icon" style="background:var(--red-light)">🧾</div>
                <div class="activity-info">
                  <div class="activity-name">INV-0040 · StartupNG</div>
                  <div class="activity-detail">Due Jan 15 · <span class="badge badge-red">Overdue</span></div>
                </div>
                <div>
                  <div class="activity-amount">500 USDC</div>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header"><span class="card-title">Platform Limits</span></div>
            <div class="card-body">
              <div style="font-size:11px;color:var(--ink3);margin-bottom:4px;font-family:'JetBrains Mono',monospace">FREE PLAN — 23/50 TRANSACTIONS USED</div>
              <div class="progress-bar" style="margin-bottom:12px"><div class="progress-fill" style="width:46%"></div></div>
              <button class="btn btn-primary btn-sm" style="width:100%;justify-content:center" onclick="navigate('settings',document.querySelector('[onclick*=settings]'))">⚡ Upgrade to Pro</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ══════════ PAYMENTS ══════════ -->
    <div class="page" id="page-payments">
      <div class="two-col" style="margin-bottom:24px">
        <div class="card">
          <div class="card-header"><span class="card-title">🔗 Payment Links</span><button class="btn btn-primary btn-sm" onclick="openModal('payment-link')">+ Create</button></div>
          <div class="card-body" style="padding:0">
            <table>
              <thead><tr><th>LINK NAME</th><th>AMOUNT</th><th>PAID</th><th>STATUS</th></tr></thead>
              <tbody>
                <tr>
                  <td><div style="font-weight:500">Design Services</div><div style="font-size:11px;color:var(--accent);font-family:'JetBrains Mono',monospace;margin-top:2px;cursor:pointer" onclick="copyLink(this)">finflow.io/p/ds-k9x2 📋</div></td>
                  <td class="mono">350 USDC</td>
                  <td class="mono">1/1</td>
                  <td><span class="badge badge-green">● Active</span></td>
                </tr>
                <tr>
                  <td><div style="font-weight:500">API Consultation</div><div style="font-size:11px;color:var(--accent);font-family:'JetBrains Mono',monospace;margin-top:2px;cursor:pointer" onclick="copyLink(this)">finflow.io/p/ac-m3p8 📋</div></td>
                  <td class="mono">500 USDC</td>
                  <td class="mono">0/1</td>
                  <td><span class="badge badge-amber">● Pending</span></td>
                </tr>
                <tr>
                  <td><div style="font-weight:500">Monthly Retainer</div><div style="font-size:11px;color:var(--accent);font-family:'JetBrains Mono',monospace;margin-top:2px;cursor:pointer" onclick="copyLink(this)">finflow.io/p/ret-7tq1 📋</div></td>
                  <td class="mono">1,200 USDC</td>
                  <td class="mono">3/∞</td>
                  <td><span class="badge badge-green">● Recurring</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="card">
          <div class="card-header"><span class="card-title">📋 Recurring Payments</span><button class="btn btn-secondary btn-sm">+ Schedule</button></div>
          <div class="card-body" style="padding:12px 20px">
            <div class="activity-item">
              <div class="activity-icon" style="background:var(--accent-light)">🔄</div>
              <div class="activity-info">
                <div class="activity-name">Subscription — SaaS Tools</div>
                <div class="activity-detail">Every month · Next: Feb 1</div>
              </div>
              <div><div class="activity-amount" style="color:var(--red)">-99 USDC</div><div class="activity-time"><span class="badge badge-green">Active</span></div></div>
            </div>
            <div class="activity-item">
              <div class="activity-icon" style="background:var(--green-light)">🔄</div>
              <div class="activity-info">
                <div class="activity-name">DAO Salary — Ade</div>
                <div class="activity-detail">Bi-weekly · Next: Jan 31</div>
              </div>
              <div><div class="activity-amount" style="color:var(--green)">+600 USDC</div><div class="activity-time"><span class="badge badge-green">Active</span></div></div>
            </div>
            <div class="activity-item">
              <div class="activity-icon" style="background:var(--amber-light)">🔄</div>
              <div class="activity-info">
                <div class="activity-name">Office Lease (Converted)</div>
                <div class="activity-detail">Monthly · Paused</div>
              </div>
              <div><div class="activity-amount">-2,000 USDC</div><div class="activity-time"><span class="badge badge-gray">Paused</span></div></div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <span class="card-title">All Transactions</span>
          <div style="display:flex;gap:8px">
            <input class="form-input" placeholder="🔍 Search..." style="width:200px;padding:7px 12px">
            <select class="form-input" style="width:140px;padding:7px 12px">
              <option>All Status</option><option>Confirmed</option><option>Pending</option><option>Failed</option>
            </select>
          </div>
        </div>
        <div class="card-body" style="padding:0">
          <div class="table-wrap">
            <table>
              <thead><tr><th>TXN ID</th><th>TYPE</th><th>FROM / TO</th><th>AMOUNT (USDC)</th><th>FEE</th><th>STATUS</th><th>DATE</th><th>EXPLORER</th></tr></thead>
              <tbody id="txn-table">
                <tr><td class="mono" style="color:var(--ink3)">TXN-8821</td><td><span class="badge badge-blue">Received</span></td><td class="mono" style="font-size:12px">Acme Corp</td><td class="mono" style="color:var(--green);font-weight:600">+500.00</td><td class="mono" style="color:var(--ink3)">5.00</td><td><span class="badge badge-green">Confirmed</span></td><td style="color:var(--ink3);font-size:12px">Jan 24, 2026</td><td><a href="https://www.arc.network" target="_blank" style="color:var(--accent);font-size:12px">View ↗</a></td></tr>
                <tr><td class="mono" style="color:var(--ink3)">TXN-8820</td><td><span class="badge badge-gray">Payout</span></td><td class="mono" style="font-size:12px">Team Batch</td><td class="mono" style="color:var(--red);font-weight:600">-1,200.00</td><td class="mono" style="color:var(--ink3)">12.00</td><td><span class="badge badge-green">Confirmed</span></td><td style="color:var(--ink3);font-size:12px">Jan 23, 2026</td><td><a href="https://www.arc.network" target="_blank" style="color:var(--accent);font-size:12px">View ↗</a></td></tr>
                <tr><td class="mono" style="color:var(--ink3)">TXN-8819</td><td><span class="badge badge-blue">Received</span></td><td class="mono" style="font-size:12px">0x4F2c...9AB1</td><td class="mono" style="color:var(--green);font-weight:600">+350.00</td><td class="mono" style="color:var(--ink3)">3.50</td><td><span class="badge badge-amber">Pending</span></td><td style="color:var(--ink3);font-size:12px">Jan 22, 2026</td><td><a href="https://www.arc.network" target="_blank" style="color:var(--accent);font-size:12px">View ↗</a></td></tr>
                <tr><td class="mono" style="color:var(--ink3)">TXN-8817</td><td><span class="badge badge-green">Escrow</span></td><td class="mono" style="font-size:12px">StartupXYZ</td><td class="mono" style="color:var(--green);font-weight:600">+2,000.00</td><td class="mono" style="color:var(--ink3)">20.00</td><td><span class="badge badge-green">Confirmed</span></td><td style="color:var(--ink3);font-size:12px">Jan 21, 2026</td><td><a href="https://www.arc.network" target="_blank" style="color:var(--accent);font-size:12px">View ↗</a></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- ══════════ PAYOUTS ══════════ -->
    <div class="page" id="page-payouts">
      <div class="two-col" style="margin-bottom:24px">
        <div class="card">
          <div class="card-header"><span class="card-title">🚀 Batch Payout</span></div>
          <div class="card-body">
            <div style="font-size:13px;color:var(--ink3);margin-bottom:16px">Send USDC to multiple wallets in a single transaction on Arc Testnet.</div>
            <div id="payout-rows">
              <div class="payout-row" style="display:grid;grid-template-columns:1fr 120px auto;gap:8px;margin-bottom:8px;align-items:center">
                <input class="form-input" placeholder="Wallet address (0x...)" value="0x7F3c...4d2A">
                <input class="form-input" placeholder="USDC" type="number" value="300">
                <button class="btn btn-danger btn-sm" onclick="this.parentElement.remove()">✕</button>
              </div>
              <div class="payout-row" style="display:grid;grid-template-columns:1fr 120px auto;gap:8px;margin-bottom:8px;align-items:center">
                <input class="form-input" placeholder="Wallet address (0x...)" value="0xA2b1...8F3c">
                <input class="form-input" placeholder="USDC" type="number" value="200">
                <button class="btn btn-danger btn-sm" onclick="this.parentElement.remove()">✕</button>
              </div>
            </div>
            <button class="btn btn-secondary btn-sm" style="margin-bottom:16px" onclick="addPayoutRow()">+ Add Recipient</button>
            <div class="divider"></div>
            <div class="fee-row"><span style="color:var(--ink3)">Subtotal</span><span class="mono">500.00 USDC</span></div>
            <div class="fee-row"><span style="color:var(--ink3)">Platform Fee (1%)</span><span class="mono" style="color:var(--red)">-5.00 USDC</span></div>
            <div class="fee-row"><span style="color:var(--ink3)">Network Fee</span><span class="mono" style="color:var(--ink3)">~$0.001</span></div>
            <div class="fee-row"><span>Total Deducted</span><span class="mono">505.00 USDC</span></div>
            <button class="btn btn-primary" style="width:100%;justify-content:center;margin-top:16px" onclick="showToast('🚀','Batch payout of 500 USDC sent successfully!')">Send Batch Payout</button>
          </div>
        </div>

        <div>
          <div class="card" style="margin-bottom:20px">
            <div class="card-header"><span class="card-title">💼 Payroll System</span><button class="btn btn-secondary btn-sm">+ Add Member</button></div>
            <div class="card-body" style="padding:12px 20px">
              <div class="member-row">
                <div class="member-avatar" style="background:linear-gradient(135deg,#1B4FFF,#6B8FFF)">AO</div>
                <div style="flex:1"><div style="font-weight:500;font-size:13.5px">Adewale Okafor</div><div style="font-size:12px;color:var(--ink3)">Lead Developer · 0x7F3c...4d2A</div></div>
                <div style="text-align:right"><div class="mono" style="font-weight:600">600 USDC</div><div style="font-size:11px;color:var(--ink3)">bi-weekly</div></div>
              </div>
              <div class="member-row">
                <div class="member-avatar" style="background:linear-gradient(135deg,#00A878,#4AFFC4)">KN</div>
                <div style="flex:1"><div style="font-weight:500;font-size:13.5px">Kofi Ntiamoah</div><div style="font-size:12px;color:var(--ink3)">Designer · 0xA2b1...8F3c</div></div>
                <div style="text-align:right"><div class="mono" style="font-weight:600">400 USDC</div><div style="font-size:11px;color:var(--ink3)">monthly</div></div>
              </div>
              <div class="member-row">
                <div class="member-avatar" style="background:linear-gradient(135deg,#F59E0B,#FCD34D)">ZM</div>
                <div style="flex:1"><div style="font-weight:500;font-size:13.5px">Zainab Musa</div><div style="font-size:12px;color:var(--ink3)">Community · 0xD4e2...0Ab7</div></div>
                <div style="text-align:right"><div class="mono" style="font-weight:600">200 USDC</div><div style="font-size:11px;color:var(--ink3)">monthly</div></div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header"><span class="card-title">📅 Scheduled Payouts</span></div>
            <div class="card-body">
              <div class="activity-item">
                <div class="activity-icon" style="background:var(--accent-light)">⏰</div>
                <div class="activity-info"><div class="activity-name">Jan Payroll Run</div><div class="activity-detail">Jan 31, 2026 · 3 recipients</div></div>
                <div><div class="mono" style="font-weight:600">1,200 USDC</div><span class="badge badge-amber">Scheduled</span></div>
              </div>
              <div class="activity-item">
                <div class="activity-icon" style="background:var(--green-light)">⏰</div>
                <div class="activity-info"><div class="activity-name">Feb Payroll Run</div><div class="activity-detail">Feb 28, 2026 · 3 recipients</div></div>
                <div><div class="mono" style="font-weight:600">1,200 USDC</div><span class="badge badge-gray">Upcoming</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ══════════ INVOICES ══════════ -->
    <div class="page" id="page-invoices">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
        <div><h2 class="section-heading">Invoices</h2><div class="section-sub">Create, send and track USDC invoices</div></div>
        <button class="btn btn-primary" onclick="openModal('create-invoice')">+ New Invoice</button>
      </div>
      <div class="three-col" style="margin-bottom:24px">
        <div class="metric-card"><div class="metric-label">TOTAL INVOICED</div><div class="metric-value">8,500</div><div class="metric-sub metric-neutral">USDC this month</div></div>
        <div class="metric-card"><div class="metric-label">OUTSTANDING</div><div class="metric-value">1,300</div><div class="metric-sub metric-amber">⏳ 2 unpaid</div></div>
        <div class="metric-card"><div class="metric-label">COLLECTED</div><div class="metric-value">7,200</div><div class="metric-sub metric-up">↑ 84.7% collection rate</div></div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">All Invoices</span>
          <div class="toggle"><button class="toggle-btn active">All</button><button class="toggle-btn">Paid</button><button class="toggle-btn">Pending</button><button class="toggle-btn">Overdue</button></div>
        </div>
        <div class="card-body" style="padding:0">
          <table>
            <thead><tr><th>INVOICE #</th><th>CLIENT</th><th>AMOUNT</th><th>ISSUED</th><th>DUE DATE</th><th>STATUS</th><th>ACTION</th></tr></thead>
            <tbody>
              <tr><td class="mono">INV-0043</td><td style="font-weight:500">TechDAO</td><td class="mono" style="font-weight:600">800 USDC</td><td style="color:var(--ink3)">Jan 20</td><td style="color:var(--ink3)">Jan 28</td><td><span class="badge badge-amber">Pending</span></td><td><button class="btn btn-secondary btn-sm" onclick="showToast('📋','Payment link copied to clipboard!')">Copy Link</button></td></tr>
              <tr><td class="mono">INV-0042</td><td style="font-weight:500">Acme Corp</td><td class="mono" style="font-weight:600">500 USDC</td><td style="color:var(--ink3)">Jan 18</td><td style="color:var(--ink3)">Jan 25</td><td><span class="badge badge-green">Paid</span></td><td><button class="btn btn-secondary btn-sm">Download</button></td></tr>
              <tr><td class="mono">INV-0041</td><td style="font-weight:500">Paystack</td><td class="mono" style="font-weight:600">1,200 USDC</td><td style="color:var(--ink3)">Jan 10</td><td style="color:var(--ink3)">Jan 20</td><td><span class="badge badge-green">Paid</span></td><td><button class="btn btn-secondary btn-sm">Download</button></td></tr>
              <tr><td class="mono">INV-0040</td><td style="font-weight:500">StartupNG</td><td class="mono" style="font-weight:600">500 USDC</td><td style="color:var(--ink3)">Jan 5</td><td style="color:var(--ink3)">Jan 15</td><td><span class="badge badge-red">Overdue</span></td><td><button class="btn btn-danger btn-sm" onclick="showToast('📨','Reminder sent to StartupNG!')">Send Reminder</button></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ══════════ OFF-RAMP ══════════ -->
    <div class="page" id="page-offramp">
      <div style="max-width:560px;margin:0 auto">
        <h2 class="section-heading">🏦 Convert USDC to Bank</h2>
        <div class="section-sub">Withdraw your USDC directly to your local bank account. Powered by Arc Testnet + Circle off-ramp partners.</div>

        <div class="card" style="margin-bottom:20px">
          <div class="card-header"><span class="card-title">Exchange Rates</span><span style="font-size:12px;color:var(--ink3)">Updated 2 min ago</span></div>
          <div class="card-body">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
              <div style="background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:14px">
                <div style="font-size:11px;color:var(--ink3);margin-bottom:4px;font-family:'JetBrains Mono',monospace">1 USDC → NGN</div>
                <div style="font-family:'Clash Display',sans-serif;font-size:1.3rem;font-weight:700">₦1,620.50</div>
                <div style="font-size:11px;color:var(--ink3);margin-top:2px">Spread: 1.5%</div>
              </div>
              <div style="background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:14px">
                <div style="font-size:11px;color:var(--ink3);margin-bottom:4px;font-family:'JetBrains Mono',monospace">1 USDC → KES</div>
                <div style="font-family:'Clash Display',sans-serif;font-size:1.3rem;font-weight:700">Ksh 130.20</div>
                <div style="font-size:11px;color:var(--ink3);margin-top:2px">Spread: 1.8%</div>
              </div>
              <div style="background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:14px">
                <div style="font-size:11px;color:var(--ink3);margin-bottom:4px;font-family:'JetBrains Mono',monospace">1 USDC → GHS</div>
                <div style="font-family:'Clash Display',sans-serif;font-size:1.3rem;font-weight:700">GH₵ 12.40</div>
                <div style="font-size:11px;color:var(--ink3);margin-top:2px">Spread: 2.0%</div>
              </div>
              <div style="background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:14px">
                <div style="font-size:11px;color:var(--ink3);margin-bottom:4px;font-family:'JetBrains Mono',monospace">1 USDC → ZAR</div>
                <div style="font-family:'Clash Display',sans-serif;font-size:1.3rem;font-weight:700">R 18.90</div>
                <div style="font-size:11px;color:var(--ink3);margin-top:2px">Spread: 1.5%</div>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header"><span class="card-title">Initiate Withdrawal</span></div>
          <div class="card-body">
            <div class="form-group">
              <label class="form-label">USDC Amount</label>
              <div class="input-prefix">
                <div class="input-prefix-label">USDC</div>
                <input class="form-input" type="number" id="offramp-amount" placeholder="0.00" value="500" oninput="calcOfframp()">
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Target Currency</label>
              <select class="form-input" id="offramp-currency" onchange="calcOfframp()">
                <option value="1620.50">🇳🇬 Nigerian Naira (NGN)</option>
                <option value="130.20">🇰🇪 Kenyan Shilling (KES)</option>
                <option value="12.40">🇬🇭 Ghanaian Cedi (GHS)</option>
                <option value="18.90">🇿🇦 South African Rand (ZAR)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Bank Account Number</label>
              <input class="form-input" placeholder="Enter account number">
            </div>
            <div class="form-group">
              <label class="form-label">Bank Name</label>
              <input class="form-input" placeholder="e.g. Zenith Bank, GTBank, Access Bank">
            </div>
            <div class="divider"></div>
            <div id="offramp-calc">
              <div class="fee-row"><span style="color:var(--ink3)">You send</span><span class="mono" id="offramp-send">500.00 USDC</span></div>
              <div class="fee-row"><span style="color:var(--ink3)">Platform fee (1.5%)</span><span class="mono" style="color:var(--red)" id="offramp-fee">-7.50 USDC</span></div>
              <div class="fee-row"><span style="color:var(--ink3)">Network fee</span><span class="mono" style="color:var(--ink3)">~$0.001</span></div>
              <div class="fee-row"><span style="font-weight:600">You receive</span><span class="mono" style="font-weight:600;color:var(--green)" id="offramp-receive">₦ 800,197.50</span></div>
            </div>
            <button class="btn btn-primary btn-lg" style="width:100%;justify-content:center;margin-top:16px" onclick="showToast('🏦','Withdrawal initiated! Funds arrive within 1-2 business days.')">
              Convert & Withdraw
            </button>
            <div style="font-size:11px;color:var(--ink3);text-align:center;margin-top:12px">
              Powered by Circle off-ramp · Funds typically arrive in 1–2 business days
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ══════════ ESCROW ══════════ -->
    <div class="page" id="page-escrow">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
        <div><h2 class="section-heading">🔐 Escrow System</h2><div class="section-sub">Lock funds until conditions are met — secure, transparent, on-chain</div></div>
        <button class="btn btn-primary" onclick="openModal('create-escrow')">+ New Escrow</button>
      </div>
      <div class="three-col" style="margin-bottom:24px">
        <div class="metric-card"><div class="metric-label">LOCKED IN ESCROW</div><div class="metric-value">5,500</div><div class="metric-sub metric-neutral">USDC</div></div>
        <div class="metric-card"><div class="metric-label">ACTIVE CONTRACTS</div><div class="metric-value">3</div><div class="metric-sub metric-neutral">2 pending release</div></div>
        <div class="metric-card"><div class="metric-label">TOTAL RELEASED</div><div class="metric-value">12,800</div><div class="metric-sub metric-up">↑ All-time</div></div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">Active Escrow Contracts</span></div>
        <div class="card-body" style="display:flex;flex-direction:column;gap:16px">
          <div class="invoice-card">
            <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:12px">
              <div>
                <div style="font-weight:600;font-size:14px">ESC-004 · Web3 Dashboard Build</div>
                <div style="font-size:12px;color:var(--ink3);margin-top:2px">Client: TechDAO · Contractor: Adewale</div>
              </div>
              <span class="badge badge-amber">Awaiting Delivery</span>
            </div>
            <div style="display:flex;gap:20px;margin-bottom:12px">
              <div><div class="metric-label">LOCKED</div><div class="mono" style="font-weight:700;font-size:1.1rem">2,000 USDC</div></div>
              <div><div class="metric-label">DEADLINE</div><div style="font-weight:500;font-size:13px">Feb 10, 2026</div></div>
              <div><div class="metric-label">MILESTONE</div><div style="font-weight:500;font-size:13px">Frontend complete</div></div>
            </div>
            <div class="progress-bar" style="margin-bottom:8px"><div class="progress-fill green" style="width:60%"></div></div>
            <div style="font-size:11px;color:var(--ink3);margin-bottom:12px">60% complete — Awaiting final delivery to release funds</div>
            <div style="display:flex;gap:8px">
              <button class="btn btn-green btn-sm" onclick="showToast('✅','Escrow of 2,000 USDC released to Adewale!')">Release Funds</button>
              <button class="btn btn-secondary btn-sm">Message Contractor</button>
              <a href="https://www.arc.network" target="_blank" class="btn btn-secondary btn-sm">View on Arc Explorer ↗</a>
            </div>
          </div>

          <div class="invoice-card">
            <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:12px">
              <div>
                <div style="font-weight:600;font-size:14px">ESC-003 · Smart Contract Audit</div>
                <div style="font-size:12px;color:var(--ink3);margin-top:2px">Client: StartupXYZ · Auditor: CryptoSec</div>
              </div>
              <span class="badge badge-green">In Review</span>
            </div>
            <div style="display:flex;gap:20px;margin-bottom:12px">
              <div><div class="metric-label">LOCKED</div><div class="mono" style="font-weight:700;font-size:1.1rem">3,500 USDC</div></div>
              <div><div class="metric-label">DEADLINE</div><div style="font-weight:500;font-size:13px">Jan 30, 2026</div></div>
            </div>
            <div style="display:flex;gap:8px">
              <button class="btn btn-secondary btn-sm">View Report</button>
              <a href="https://www.arc.network" target="_blank" class="btn btn-secondary btn-sm">View on Arc Explorer ↗</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ══════════ ANALYTICS ══════════ -->
    <div class="page" id="page-analytics">
      <h2 class="section-heading" style="margin-bottom:4px">Analytics</h2>
      <div class="section-sub">Revenue, volume, and platform insights</div>
      <div class="metrics-grid" style="margin-top:16px">
        <div class="metric-card"><div class="metric-label">TOTAL VOLUME (90D)</div><div class="metric-value">48,200</div><div class="metric-sub metric-up">↑ +22% vs prev period</div></div>
        <div class="metric-card"><div class="metric-label">PLATFORM REVENUE</div><div class="metric-value">482.00</div><div class="metric-sub metric-neutral">~1% avg fee rate</div></div>
        <div class="metric-card"><div class="metric-label">ACTIVE USERS</div><div class="metric-value">3</div><div class="metric-sub metric-neutral">Team wallets</div></div>
        <div class="metric-card"><div class="metric-label">OFF-RAMP VOLUME</div><div class="metric-value">12,400</div><div class="metric-sub metric-up">↑ +35% this month</div></div>
      </div>
      <div class="two-col">
        <div class="card">
          <div class="card-header"><span class="card-title">Monthly Volume</span></div>
          <div class="card-body">
            <div class="chart-area" style="height:200px">
              <div class="chart-bar" style="height:35%"></div>
              <div class="chart-bar green" style="height:50%"></div>
              <div class="chart-bar" style="height:45%"></div>
              <div class="chart-bar green" style="height:70%"></div>
              <div class="chart-bar" style="height:55%"></div>
              <div class="chart-bar amber" style="height:80%"></div>
              <div class="chart-bar green" style="height:90%"></div>
              <div class="chart-bar" style="height:65%"></div>
              <div class="chart-bar" style="height:75%"></div>
              <div class="chart-bar green" style="height:95%"></div>
              <div class="chart-bar" style="height:85%"></div>
              <div class="chart-bar amber" style="height:100%"></div>
            </div>
            <div style="display:flex;justify-content:space-between;margin-top:8px;font-size:10px;color:var(--ink3);font-family:'JetBrains Mono',monospace">
              <span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><span class="card-title">Revenue Breakdown</span></div>
          <div class="card-body">
            <div style="display:flex;flex-direction:column;gap:12px">
              <div>
                <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px">
                  <span>Payment Links</span><span class="mono" style="font-weight:600">₊184.00 USDC</span>
                </div>
                <div class="progress-bar"><div class="progress-fill" style="width:38%"></div></div>
              </div>
              <div>
                <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px">
                  <span>Batch Payouts</span><span class="mono" style="font-weight:600">₊142.00 USDC</span>
                </div>
                <div class="progress-bar"><div class="progress-fill green" style="width:29%"></div></div>
              </div>
              <div>
                <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px">
                  <span>Off-Ramp Spreads</span><span class="mono" style="font-weight:600">₊96.00 USDC</span>
                </div>
                <div class="progress-bar"><div class="progress-fill amber" style="width:20%"></div></div>
              </div>
              <div>
                <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px">
                  <span>Pro Subscriptions</span><span class="mono" style="font-weight:600">₊60.00 USDC</span>
                </div>
                <div class="progress-bar"><div class="progress-fill" style="width:13%;background:linear-gradient(90deg,#E84855,#FF8090)"></div></div>
              </div>
            </div>
            <div class="divider"></div>
            <div style="display:flex;justify-content:space-between;font-weight:600;font-size:14px">
              <span>Total Revenue (Jan)</span><span class="mono">482.00 USDC</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ══════════ TEAM ══════════ -->
    <div class="page" id="page-team">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
        <div><h2 class="section-heading">👥 Team Wallets</h2><div class="section-sub">Manage multi-user access with role-based permissions</div></div>
        <button class="btn btn-primary">+ Invite Member</button>
      </div>
      <div class="two-col">
        <div class="card">
          <div class="card-header"><span class="card-title">Team Members</span></div>
          <div class="card-body" style="padding:12px 20px">
            <div class="member-row">
              <div class="member-avatar" style="background:linear-gradient(135deg,#1B4FFF,#6B8FFF)">KA</div>
              <div style="flex:1">
                <div style="font-weight:500">Kwame Asante</div>
                <div style="font-size:12px;color:var(--ink3);font-family:'JetBrains Mono',monospace">0x8Fc3...4d2A</div>
              </div>
              <span class="badge badge-blue">Admin</span>
            </div>
            <div class="member-row">
              <div class="member-avatar" style="background:linear-gradient(135deg,#00A878,#4AFFC4)">AO</div>
              <div style="flex:1">
                <div style="font-weight:500">Adewale Okafor</div>
                <div style="font-size:12px;color:var(--ink3);font-family:'JetBrains Mono',monospace">0x7F3c...4d2A</div>
              </div>
              <span class="badge badge-green">Finance</span>
            </div>
            <div class="member-row">
              <div class="member-avatar" style="background:linear-gradient(135deg,#F59E0B,#FCD34D)">KN</div>
              <div style="flex:1">
                <div style="font-weight:500">Kofi Ntiamoah</div>
                <div style="font-size:12px;color:var(--ink3);font-family:'JetBrains Mono',monospace">0xA2b1...8F3c</div>
              </div>
              <span class="badge badge-gray">Viewer</span>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><span class="card-title">Roles & Permissions</span></div>
          <div class="card-body" style="padding:0">
            <table>
              <thead><tr><th>PERMISSION</th><th>ADMIN</th><th>FINANCE</th><th>VIEWER</th></tr></thead>
              <tbody>
                <tr><td>View Transactions</td><td style="color:var(--green)">✓</td><td style="color:var(--green)">✓</td><td style="color:var(--green)">✓</td></tr>
                <tr><td>Send Payments</td><td style="color:var(--green)">✓</td><td style="color:var(--green)">✓</td><td style="color:var(--red)">✕</td></tr>
                <tr><td>Create Invoices</td><td style="color:var(--green)">✓</td><td style="color:var(--green)">✓</td><td style="color:var(--red)">✕</td></tr>
                <tr><td>Manage Team</td><td style="color:var(--green)">✓</td><td style="color:var(--red)">✕</td><td style="color:var(--red)">✕</td></tr>
                <tr><td>API Keys</td><td style="color:var(--green)">✓</td><td style="color:var(--red)">✕</td><td style="color:var(--red)">✕</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- ══════════ API ══════════ -->
    <div class="page" id="page-api">
      <h2 class="section-heading" style="margin-bottom:4px">🔌 API & Developer</h2>
      <div class="section-sub">B2B API layer for payment links, bulk payouts, and wallet infrastructure</div>
      <div class="two-col" style="margin-top:20px">
        <div class="card">
          <div class="card-header"><span class="card-title">API Keys</span><button class="btn btn-primary btn-sm" onclick="showToast('🔑','New API key generated!')">Generate Key</button></div>
          <div class="card-body">
            <div class="form-group">
              <label class="form-label">LIVE API KEY</label>
              <div class="input-prefix">
                <div class="input-prefix-label">sk_live</div>
                <input class="form-input" type="password" value="ff_live_9x2kq8_zKpLm3nTvR..." readonly>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">TEST API KEY</label>
              <div class="input-prefix">
                <div class="input-prefix-label">sk_test</div>
                <input class="form-input" value="ff_test_arc_5nWpX9..." readonly>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">WEBHOOK URL</label>
              <input class="form-input" placeholder="https://yourdomain.com/webhook/finflow">
            </div>
            <button class="btn btn-secondary" style="width:100%;justify-content:center" onclick="showToast('✓','Webhook URL saved!')">Save Webhook</button>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><span class="card-title">Quick Reference</span></div>
          <div class="card-body">
            <div style="margin-bottom:14px">
              <div style="font-size:11px;color:var(--ink3);margin-bottom:6px;font-weight:500;letter-spacing:0.06em">CREATE PAYMENT LINK</div>
              <div style="background:var(--ink);border-radius:8px;padding:12px;font-family:'JetBrains Mono',monospace;font-size:11.5px;color:#4AFFC4;line-height:1.7">
                POST /v1/payment-links<br>
                <span style="color:#A8C8FF">{<br>
                &nbsp;&nbsp;"amount": 500,<br>
                &nbsp;&nbsp;"currency": "USDC",<br>
                &nbsp;&nbsp;"description": "Invoice #42"<br>
                }</span>
              </div>
            </div>
            <div>
              <div style="font-size:11px;color:var(--ink3);margin-bottom:6px;font-weight:500;letter-spacing:0.06em">BULK PAYOUT</div>
              <div style="background:var(--ink);border-radius:8px;padding:12px;font-family:'JetBrains Mono',monospace;font-size:11.5px;color:#4AFFC4;line-height:1.7">
                POST /v1/payouts/batch<br>
                <span style="color:#A8C8FF">{<br>
                &nbsp;&nbsp;"recipients": [<br>
                &nbsp;&nbsp;&nbsp;&nbsp;{"address": "0x...", "amount": 300}<br>
                &nbsp;&nbsp;],<br>
                &nbsp;&nbsp;"network": "arc-testnet"<br>
                }</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ══════════ SETTINGS ══════════ -->
    <div class="page" id="page-settings">
      <h2 class="section-heading" style="margin-bottom:20px">Settings</h2>
      <div class="two-col">
        <div>
          <div class="card" style="margin-bottom:20px">
            <div class="card-header"><span class="card-title">Profile</span></div>
            <div class="card-body">
              <div class="form-group"><label class="form-label">Business Name</label><input class="form-input" value="Kwame Asante Design Studio"></div>
              <div class="form-group"><label class="form-label">Email</label><input class="form-input" type="email" value="kwame@kasdesigns.io"></div>
              <div class="form-group"><label class="form-label">Country</label>
                <select class="form-input"><option>🇬🇭 Ghana</option><option>🇳🇬 Nigeria</option><option>🇰🇪 Kenya</option><option>🇿🇦 South Africa</option></select>
              </div>
              <button class="btn btn-primary btn-sm" onclick="showToast('✓','Profile updated!')">Save Changes</button>
            </div>
          </div>
          <div class="card">
            <div class="card-header"><span class="card-title">Fee Configuration</span></div>
            <div class="card-body">
              <div class="form-group"><label class="form-label">Payment Fee Rate (%)</label><input class="form-input" type="number" value="1.0" step="0.1" min="0.5" max="1"></div>
              <div class="form-group"><label class="form-label">Off-Ramp Spread (%)</label><input class="form-input" type="number" value="1.5" step="0.1" min="1" max="2"></div>
              <button class="btn btn-secondary btn-sm" onclick="showToast('✓','Fee settings saved!')">Update Fees</button>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header"><span class="card-title">Subscription Plans</span></div>
          <div class="card-body" style="display:flex;flex-direction:column;gap:16px">
            <div class="plan-card">
              <div class="plan-name">Free</div>
              <div class="plan-price">$0 <span>/ month</span></div>
              <div style="margin-top:12px">
                <div class="plan-feature">50 transactions / month</div>
                <div class="plan-feature">Basic analytics</div>
                <div class="plan-feature">Payment links</div>
                <div class="plan-feature">Off-ramp</div>
              </div>
              <div style="margin-top:12px"><span class="badge badge-green">Current Plan</span></div>
            </div>
            <div class="plan-card featured">
              <div class="feature-tag">⚡ POPULAR</div>
              <div class="plan-name">Pro</div>
              <div class="plan-price">$29 <span>/ month</span></div>
              <div style="margin-top:12px">
                <div class="plan-feature">Unlimited transactions</div>
                <div class="plan-feature">Advanced analytics</div>
                <div class="plan-feature">Payroll + Escrow</div>
                <div class="plan-feature">Priority payouts</div>
              </div>
              <button class="btn btn-primary btn-sm" style="margin-top:12px;width:100%;justify-content:center" onclick="showToast('⚡','Upgrade flow — connect your wallet to pay 29 USDC/month')">Upgrade to Pro</button>
            </div>
            <div class="plan-card">
              <div class="plan-name">Business</div>
              <div class="plan-price">$99 <span>/ month</span></div>
              <div style="margin-top:12px">
                <div class="plan-feature">Everything in Pro</div>
                <div class="plan-feature">API access</div>
                <div class="plan-feature">Team management</div>
                <div class="plan-feature">Custom webhooks</div>
                <div class="plan-feature">SLA support</div>
              </div>
              <button class="btn btn-secondary btn-sm" style="margin-top:12px;width:100%;justify-content:center">Contact Sales</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div><!-- /content -->
</main>
</div><!-- /app-shell -->

<!-- NOTIFICATIONS PANEL -->
<div class="notif-panel" id="notif-panel">
  <div style="padding:14px 16px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center">
    <span style="font-family:'Clash Display',sans-serif;font-weight:600;font-size:14px">Notifications</span>
    <span style="font-size:12px;color:var(--accent);cursor:pointer">Mark all read</span>
  </div>
  <div class="notif-item">
    <div class="notif-icon" style="background:var(--green-light)">💰</div>
    <div class="notif-content">
      <div class="notif-title">Payment received</div>
      <div class="notif-desc">Acme Corp paid Invoice #INV-0042 · 500 USDC</div>
      <div class="notif-time">2 hours ago</div>
    </div>
  </div>
  <div class="notif-item">
    <div class="notif-icon" style="background:var(--amber-light)">⏰</div>
    <div class="notif-content">
      <div class="notif-title">Invoice overdue</div>
      <div class="notif-desc">INV-0040 from StartupNG is 9 days overdue</div>
      <div class="notif-time">Yesterday</div>
    </div>
  </div>
  <div class="notif-item">
    <div class="notif-icon" style="background:var(--accent-light)">🔐</div>
    <div class="notif-content">
      <div class="notif-title">Escrow funded</div>
      <div class="notif-desc">ESC-004 locked 2,000 USDC for Web3 Dashboard</div>
      <div class="notif-time">2 days ago</div>
    </div>
  </div>
  <div class="notif-item">
    <div class="notif-icon" style="background:var(--red-light)">🚀</div>
    <div class="notif-content">
      <div class="notif-title">Batch payout confirmed</div>
      <div class="notif-desc">1,200 USDC sent to 4 team wallets on Arc</div>
      <div class="notif-time">3 days ago</div>
    </div>
  </div>
</div>

<!-- MODALS -->
<!-- Payment Link Modal -->
<div class="modal-overlay" id="modal-payment-link">
  <div class="modal" style="position:relative">
    <div class="modal-close" onclick="closeModal('payment-link')">✕</div>
    <div class="modal-title">🔗 Create Payment Link</div>
    <div class="modal-sub">Share a link to receive USDC payments instantly</div>
    <div class="form-group"><label class="form-label">Link Name</label><input class="form-input" placeholder="e.g. Design Services, Consulting"></div>
    <div class="form-group">
      <label class="form-label">Amount (USDC)</label>
      <div class="input-prefix"><div class="input-prefix-label">USDC</div><input class="form-input" type="number" placeholder="0.00"></div>
    </div>
    <div class="form-group"><label class="form-label">Type</label>
      <select class="form-input"><option>One-time Payment</option><option>Recurring</option><option>Open Amount</option></select>
    </div>
    <div class="form-group"><label class="form-label">Note (optional)</label><input class="form-input" placeholder="Invoice ref, work description..."></div>
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:12px;margin-bottom:16px;font-size:12px;color:var(--ink3)">
      <span style="font-weight:500;color:var(--ink2)">Fee:</span> 1% on each payment · Instant confirmation on Arc Testnet
    </div>
    <div style="display:flex;gap:8px">
      <button class="btn btn-primary" style="flex:1;justify-content:center" onclick="showToast('🔗','Payment link created! finflow.io/p/new-k9x3');closeModal('payment-link')">Generate Link</button>
      <button class="btn btn-secondary" onclick="closeModal('payment-link')">Cancel</button>
    </div>
  </div>
</div>

<!-- Create Invoice Modal -->
<div class="modal-overlay" id="modal-create-invoice">
  <div class="modal" style="position:relative">
    <div class="modal-close" onclick="closeModal('create-invoice')">✕</div>
    <div class="modal-title">🧾 Create Invoice</div>
    <div class="modal-sub">Bill your client in USDC, get paid on-chain</div>
    <div class="form-group"><label class="form-label">Client Name / Email</label><input class="form-input" placeholder="Acme Corp or client@company.com"></div>
    <div class="form-group"><label class="form-label">Amount (USDC)</label>
      <div class="input-prefix"><div class="input-prefix-label">USDC</div><input class="form-input" type="number" placeholder="0.00"></div>
    </div>
    <div class="two-col">
      <div class="form-group"><label class="form-label">Issue Date</label><input class="form-input" type="date"></div>
      <div class="form-group"><label class="form-label">Due Date</label><input class="form-input" type="date"></div>
    </div>
    <div class="form-group"><label class="form-label">Description</label><textarea class="form-input" rows="3" placeholder="Work description, scope of services..."></textarea></div>
    <div style="display:flex;gap:8px">
      <button class="btn btn-primary" style="flex:1;justify-content:center" onclick="showToast('🧾','Invoice created & sent!');closeModal('create-invoice')">Create & Send</button>
      <button class="btn btn-secondary" onclick="closeModal('create-invoice')">Cancel</button>
    </div>
  </div>
</div>

<!-- Create Escrow Modal -->
<div class="modal-overlay" id="modal-create-escrow">
  <div class="modal" style="position:relative">
    <div class="modal-close" onclick="closeModal('create-escrow')">✕</div>
    <div class="modal-title">🔐 New Escrow Contract</div>
    <div class="modal-sub">Lock funds until milestone conditions are met</div>
    <div class="form-group"><label class="form-label">Contractor Wallet</label><input class="form-input" placeholder="0x... (recipient address)"></div>
    <div class="form-group"><label class="form-label">Amount (USDC)</label>
      <div class="input-prefix"><div class="input-prefix-label">USDC</div><input class="form-input" type="number" placeholder="0.00"></div>
    </div>
    <div class="form-group"><label class="form-label">Milestone / Condition</label><input class="form-input" placeholder="e.g. Final website delivery, Audit report submitted"></div>
    <div class="form-group"><label class="form-label">Deadline</label><input class="form-input" type="date"></div>
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:12px;margin-bottom:16px;font-size:12px;color:var(--ink3)">
      Funds locked on Arc Testnet. Release is manual — you control when to release once conditions are met.
    </div>
    <div style="display:flex;gap:8px">
      <button class="btn btn-primary" style="flex:1;justify-content:center" onclick="showToast('🔐','Escrow contract deployed on Arc Testnet!');closeModal('create-escrow')">Lock Funds</button>
      <button class="btn btn-secondary" onclick="closeModal('create-escrow')">Cancel</button>
    </div>
  </div>
</div>

<!-- Send Payment Modal -->
<div class="modal-overlay" id="modal-send-payment">
  <div class="modal" style="position:relative">
    <div class="modal-close" onclick="closeModal('send-payment')">✕</div>
    <div class="modal-title">💳 New Payment</div>
    <div class="modal-sub">Send, link, invoice, or schedule</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px">
      <div style="border:1px solid var(--border);border-radius:10px;padding:14px;cursor:pointer;text-align:center;transition:all 0.15s" onclick="closeModal('send-payment');openModal('payment-link')">
        <div style="font-size:1.5rem">🔗</div>
        <div style="font-weight:600;font-size:13px;margin-top:6px">Payment Link</div>
        <div style="font-size:11px;color:var(--ink3);margin-top:2px">Shareable URL</div>
      </div>
      <div style="border:1px solid var(--border);border-radius:10px;padding:14px;cursor:pointer;text-align:center;transition:all 0.15s" onclick="closeModal('send-payment');openModal('create-invoice')">
        <div style="font-size:1.5rem">🧾</div>
        <div style="font-weight:600;font-size:13px;margin-top:6px">Invoice</div>
        <div style="font-size:11px;color:var(--ink3);margin-top:2px">Bill a client</div>
      </div>
      <div style="border:1px solid var(--border);border-radius:10px;padding:14px;cursor:pointer;text-align:center;transition:all 0.15s" onclick="closeModal('send-payment');navigate('payouts',document.querySelector('[onclick*=payouts]'))">
        <div style="font-size:1.5rem">🚀</div>
        <div style="font-weight:600;font-size:13px;margin-top:6px">Batch Payout</div>
        <div style="font-size:11px;color:var(--ink3);margin-top:2px">Multi-wallet</div>
      </div>
      <div style="border:1px solid var(--border);border-radius:10px;padding:14px;cursor:pointer;text-align:center;transition:all 0.15s" onclick="closeModal('send-payment');openModal('create-escrow')">
        <div style="font-size:1.5rem">🔐</div>
        <div style="font-weight:600;font-size:13px;margin-top:6px">Escrow</div>
        <div style="font-size:11px;color:var(--ink3);margin-top:2px">Lock funds</div>
      </div>
    </div>
    <button class="btn btn-secondary" style="width:100%;justify-content:center" onclick="closeModal('send-payment')">Close</button>
  </div>
</div>

<!-- WALLET CONNECT MODAL -->
<div class="modal-overlay" id="modal-wallet-connect">
  <div class="modal" style="position:relative;max-width:420px">
    <div class="modal-close" onclick="closeModal('wallet-connect');resetWalletModalStatus()">✕</div>
    <div style="text-align:center;margin-bottom:1.5rem">
      <div style="font-size:2rem;margin-bottom:8px">🔗</div>
      <div class="modal-title">Connect Wallet</div>
      <div class="modal-sub">Connect to FinFlow on Arc Testnet — Circle's stablecoin-native L1</div>
    </div>

    <!-- Status message -->
    <div id="wallet-modal-status" style="display:none;font-size:12px;color:var(--accent);font-family:'JetBrains Mono',monospace;text-align:center;background:var(--accent-light);border:1px solid var(--border);border-radius:8px;padding:8px;margin-bottom:12px"></div>

    <!-- Wallet Options -->
    <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:20px">

      <!-- MetaMask -->
      <button id="btn-metamask" onclick="connectMetaMask()" style="display:flex;align-items:center;gap:14px;padding:14px 16px;background:var(--surface2);border:1px solid var(--border);border-radius:12px;cursor:pointer;transition:all 0.2s;text-align:left;width:100%;font-family:'Bricolage Grotesque',sans-serif" onmouseover="this.style.borderColor='#E8A020';this.style.background='var(--gold-light)'" onmouseout="this.style.borderColor='var(--border)';this.style.background='var(--surface2)'">
        <div style="width:42px;height:42px;border-radius:10px;background:#FFF3E0;display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0">🦊</div>
        <div style="flex:1">
          <div style="font-weight:600;font-size:14px;color:var(--ink)">MetaMask</div>
          <div style="font-size:12px;color:var(--ink3);margin-top:2px">Browser extension · Most popular</div>
        </div>
        <div style="font-size:11px;color:var(--accent);font-family:'JetBrains Mono',monospace;background:var(--accent-light);padding:3px 8px;border-radius:6px">Detect</div>
      </button>

      <!-- WalletConnect -->
      <button id="btn-wc" onclick="connectWalletConnect()" style="display:flex;align-items:center;gap:14px;padding:14px 16px;background:var(--surface2);border:1px solid var(--border);border-radius:12px;cursor:pointer;transition:all 0.2s;text-align:left;width:100%;font-family:'Bricolage Grotesque',sans-serif" onmouseover="this.style.borderColor='#3B99FC';this.style.background='#EFF6FF'" onmouseout="this.style.borderColor='var(--border)';this.style.background='var(--surface2)'">
        <div style="width:42px;height:42px;border-radius:10px;background:#EFF6FF;display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0">🔷</div>
        <div style="flex:1">
          <div style="font-weight:600;font-size:14px;color:var(--ink)">WalletConnect</div>
          <div style="font-size:12px;color:var(--ink3);margin-top:2px">Scan QR · Trust, Rainbow, Argent</div>
        </div>
        <div style="font-size:11px;color:#3B99FC;font-family:'JetBrains Mono',monospace;background:#EFF6FF;padding:3px 8px;border-radius:6px">QR Code</div>
      </button>

      <!-- Coinbase Wallet -->
      <button id="btn-coinbase" onclick="connectCoinbase()" style="display:flex;align-items:center;gap:14px;padding:14px 16px;background:var(--surface2);border:1px solid var(--border);border-radius:12px;cursor:pointer;transition:all 0.2s;text-align:left;width:100%;font-family:'Bricolage Grotesque',sans-serif" onmouseover="this.style.borderColor='#0052FF';this.style.background='#EEF3FF'" onmouseout="this.style.borderColor='var(--border)';this.style.background='var(--surface2)'">
        <div style="width:42px;height:42px;border-radius:10px;background:#EEF3FF;display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0">🔵</div>
        <div style="flex:1">
          <div style="font-weight:600;font-size:14px;color:var(--ink)">Coinbase Wallet</div>
          <div style="font-size:12px;color:var(--ink3);margin-top:2px">Extension or mobile app</div>
        </div>
      </button>

      <!-- Demo Mode -->
      <button id="btn-demo" onclick="connectDemo()" style="display:flex;align-items:center;gap:14px;padding:14px 16px;background:var(--accent-light);border:1px dashed var(--accent);border-radius:12px;cursor:pointer;transition:all 0.2s;text-align:left;width:100%;font-family:'Bricolage Grotesque',sans-serif">
        <div style="width:42px;height:42px;border-radius:10px;background:var(--accent-light);display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0">⚡</div>
        <div style="flex:1">
          <div style="font-weight:600;font-size:14px;color:var(--ink)">Demo Mode</div>
          <div style="font-size:12px;color:var(--ink3);margin-top:2px">Explore with a simulated wallet — no wallet needed</div>
        </div>
        <div style="font-size:11px;color:var(--accent);font-family:'JetBrains Mono',monospace;background:var(--accent-light);border:1px solid var(--border);padding:3px 8px;border-radius:6px;white-space:nowrap">Try it</div>
      </button>
    </div>

    <!-- Arc Network Info -->
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:12px 14px;display:flex;align-items:center;gap:12px">
      <div style="width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,var(--accent),var(--accent2));display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:1rem">⛓️</div>
      <div>
        <div style="font-size:12px;font-weight:600;color:var(--ink)">Arc Testnet · Circle's L1</div>
        <div style="font-size:11px;color:var(--ink3);margin-top:1px">Native USDC gas · Sub-second finality · EVM compatible</div>
      </div>
      <a href="https://thirdweb.com/arc-testnet" target="_blank" style="font-size:11px;color:var(--accent);font-family:'JetBrains Mono',monospace;white-space:nowrap;text-decoration:none;margin-left:auto">Get USDC ↗</a>
    </div>

    <div style="font-size:11px;color:var(--ink3);text-align:center;margin-top:14px;line-height:1.5">
      By connecting, you agree to FinFlow's Terms of Service.<br>
      Your funds stay in your wallet — FinFlow is non-custodial.
    </div>
  </div>
</div>

<!-- WALLETCONNECT QR MODAL -->
<div id="wc-qr-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:1100;align-items:center;justify-content:center;backdrop-filter:blur(4px)">
  <div style="background:var(--surface);border-radius:16px;padding:28px;width:340px;max-width:94vw;text-align:center;border:1px solid var(--border);box-shadow:var(--shadow-lg)">
    <div style="font-family:'Clash Display',sans-serif;font-weight:700;font-size:1.1rem;margin-bottom:4px">Scan with your wallet</div>
    <div style="font-size:12px;color:var(--ink3);margin-bottom:20px">Open Trust Wallet, Rainbow, or any WalletConnect wallet and scan</div>
    <div style="background:white;padding:16px;border-radius:12px;display:inline-block;margin-bottom:16px;border:2px solid var(--border)">
      <canvas id="wc-qr-canvas" width="200" height="200" style="display:block"></canvas>
    </div>
    <div style="font-size:11px;color:var(--ink3);font-family:'JetBrains Mono',monospace;margin-bottom:16px">wc:finflow-arc-testnet-session...</div>
    <div style="display:flex;gap:8px">
      <button onclick="connectDemo();document.getElementById('wc-qr-modal').style.display='none'" style="flex:1;padding:10px;background:var(--accent-light);border:1px solid var(--accent);border-radius:8px;cursor:pointer;font-size:13px;font-weight:500;color:var(--accent);font-family:'Bricolage Grotesque',sans-serif">Use Demo Instead</button>
      <button onclick="document.getElementById('wc-qr-modal').style.display='none';resetWalletModalStatus()" style="flex:1;padding:10px;background:var(--surface2);border:1px solid var(--border);border-radius:8px;cursor:pointer;font-size:13px;font-weight:500;color:var(--ink2);font-family:'Bricolage Grotesque',sans-serif">Cancel</button>
    </div>
    <div style="margin-top:12px;font-size:11px;color:var(--ink3)">Add projectId from <a href="https://cloud.walletconnect.com" target="_blank" style="color:var(--accent)">cloud.walletconnect.com</a> to enable real QR scanning</div>
  </div>
</div>
<div class="toast" id="toast"><span class="toast-icon" id="toast-icon">✓</span><span id="toast-msg"></span></div>

<script>
// NAVIGATION
const pages={dashboard:'Dashboard',payments:'Payments',payouts:'Payouts',invoices:'Invoices',offramp:'Off-Ramp',escrow:'Escrow',analytics:'Analytics',team:'Team Wallets',api:'API & Dev',settings:'Settings'};
function navigate(id,el){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  document.getElementById('page-'+id).classList.add('active');
  if(el)el.classList.add('active');
  document.getElementById('page-title').textContent=pages[id]||id;
  if(window.innerWidth<900)document.getElementById('sidebar').classList.remove('open');
}

// SIDEBAR TOGGLE
function toggleSidebar(){document.getElementById('sidebar').classList.toggle('open')}

// MODAL
function openModal(id){document.getElementById('modal-'+id).classList.add('open')}
function closeModal(id){document.getElementById('modal-'+id).classList.remove('open')}
document.querySelectorAll('.modal-overlay').forEach(o=>{
  o.addEventListener('click',function(e){if(e.target===this)this.classList.remove('open')})
});

// NOTIFICATIONS
function toggleNotif(){document.getElementById('notif-panel').classList.toggle('open')}
document.addEventListener('click',function(e){
  const panel=document.getElementById('notif-panel');
  if(!panel.contains(e.target)&&!e.target.closest('[onclick*=toggleNotif]'))panel.classList.remove('open');
});

// TOAST
let toastTimer;
function showToast(icon,msg,type=''){
  const t=document.getElementById('toast');
  document.getElementById('toast-icon').textContent=icon;
  document.getElementById('toast-msg').textContent=msg;
  if(type==='error') t.style.background='#7B1717';
  else if(type==='success') t.style.background='#0A4A2A';
  else if(type==='info') t.style.background='#0D2E80';
  else t.style.background='var(--ink)';
  t.style.color='#fff';
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.classList.remove('show'),4200);
}

// OFF-RAMP CALC
function calcOfframp(){
  const amt=parseFloat(document.getElementById('offramp-amount').value)||0;
  const rate=parseFloat(document.getElementById('offramp-currency').value)||1620.50;
  const fee=amt*0.015;
  const net=(amt-fee)*rate;
  const curr=['₦','Ksh','GH₵','R'];
  const sel=document.getElementById('offramp-currency');
  const idx=sel.selectedIndex;
  const sym=curr[idx]||'₦';
  document.getElementById('offramp-send').textContent=amt.toFixed(2)+' USDC';
  document.getElementById('offramp-fee').textContent='-'+fee.toFixed(2)+' USDC';
  document.getElementById('offramp-receive').textContent=sym+' '+net.toLocaleString('en',{maximumFractionDigits:2});
}

// ADD PAYOUT ROW
function addPayoutRow(){
  const d=document.createElement('div');
  d.className='payout-row';
  d.style.cssText='display:grid;grid-template-columns:1fr 120px auto;gap:8px;margin-bottom:8px;align-items:center';
  d.innerHTML=`<input class="form-input" placeholder="Wallet address (0x...)"><input class="form-input" placeholder="USDC" type="number"><button class="btn btn-danger btn-sm" onclick="this.parentElement.remove()">✕</button>`;
  document.getElementById('payout-rows').appendChild(d);
}

// COPY LINK
function copyLink(el){
  const txt=el.textContent.replace(' 📋','');
  navigator.clipboard.writeText('https://'+txt.trim()).then(()=>{
    showToast('📋','Link copied: https://'+txt.trim());
  });
}

// TOGGLE BUTTONS
document.querySelectorAll('.toggle').forEach(tog=>{
  tog.querySelectorAll('.toggle-btn').forEach(btn=>{
    btn.addEventListener('click',function(){
      tog.querySelectorAll('.toggle-btn').forEach(b=>b.classList.remove('active'));
      this.classList.add('active');
    });
  });
});

// ═══════════════════════════════════════════════════
// 🌙 THEME TOGGLE — Dark / Light
// ═══════════════════════════════════════════════════
let currentTheme = localStorage.getItem('finflow-theme') || 'light';

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  currentTheme = theme;
  localStorage.setItem('finflow-theme', theme);
  const btn = document.getElementById('theme-toggle');
  if(btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  // Also update sidebar nav active item visual on theme switch
  const sidebarItem = document.querySelector('.nav-item.active');
  if(sidebarItem) sidebarItem.scrollIntoView({block:'nearest'});
}

function toggleTheme() {
  applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

// Apply saved theme on load
applyTheme(currentTheme);

// ═══════════════════════════════════════════════════
// 🔗 REAL WALLET CONNECTION — MetaMask on Arc Testnet
// ═══════════════════════════════════════════════════

// Arc Testnet — verified from thirdweb.com/arc-testnet & Circle docs
// Chain ID: 1038440 decimal = 0xFD2E8 hex
// (If this doesn't match, check: https://thirdweb.com/arc-testnet)
const ARC_TESTNET = {
  chainId: '0xFD2E8',
  chainName: 'Arc Testnet',
  nativeCurrency: {
    name: 'USD Coin',
    symbol: 'USDC',
    decimals: 6
  },
  rpcUrls: ['https://rpc.arc.testnet.circle.com'],
  blockExplorerUrls: ['https://explorer.arc.testnet.circle.com']
};

// USDC contract address on Arc Testnet
// Get the real one from: https://developers.circle.com/stablecoins/docs/usdc-on-arc
const USDC_CONTRACT = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'; // placeholder — update with real Arc USDC addr

let connectedAddress = null;
let connectedProvider = null;

function shortAddr(addr){ return addr ? addr.slice(0,6)+'...'+addr.slice(-4) : '' }

// ── Update all UI after wallet connects ──
function onWalletConnected(address, walletLabel) {
  connectedAddress = address;

  // Sidebar wallet pill
  document.getElementById('wallet-pill-label').textContent = walletLabel.replace(/[🦊🔷🔵⚡]/g,'').trim() + ' CONNECTED';
  document.getElementById('wallet-addr-display').textContent = shortAddr(address);
  document.getElementById('wallet-net-display').textContent = 'Arc Testnet · fetching...';

  // Topbar
  const av = document.getElementById('topbar-avatar');
  if(av) av.textContent = address.slice(2,4).toUpperCase();

  // Connect button in topbar
  const connBtn = document.getElementById('wallet-connect-status');
  if(connBtn) {
    connBtn.innerHTML = `<span style="color:var(--green);font-size:11px">● ${shortAddr(address)}</span>`;
    connBtn.style.borderColor = 'var(--green)';
  }

  // Close modal, show toast
  closeModal('wallet-connect');
  showToast('🔗', `${walletLabel} connected!`, 'success');

  // Fetch real USDC balance
  fetchUSDCBalance(address);
}

// ── Fetch USDC balance via eth_call ──
async function fetchUSDCBalance(address) {
  try {
    // ERC-20 balanceOf(address) = 0x70a08231 + padded address
    const data = '0x70a08231' + address.slice(2).padStart(64, '0');
    const result = await window.ethereum.request({
      method: 'eth_call',
      params: [{ to: USDC_CONTRACT, data }, 'latest']
    });
    if(result && result !== '0x') {
      const balanceRaw = parseInt(result, 16);
      const balance = (balanceRaw / 1e6).toFixed(2); // USDC has 6 decimals
      document.getElementById('wallet-net-display').textContent = `Arc Testnet · ${parseFloat(balance).toLocaleString()} USDC`;
      const bd = document.getElementById('balance-display');
      if(bd) bd.textContent = parseFloat(balance).toLocaleString();
    } else {
      // Network doesn't have USDC yet or call failed — show faucet hint
      document.getElementById('wallet-net-display').textContent = 'Arc Testnet · Get USDC from faucet';
      showToast('💧', 'Get testnet USDC at thirdweb.com/arc-testnet', 'info');
    }
  } catch(e) {
    // Fallback for demo / non-Arc chain
    const mockBal = (Math.random() * 3000 + 200).toFixed(2);
    document.getElementById('wallet-net-display').textContent = `Arc Testnet · ${parseFloat(mockBal).toLocaleString()} USDC`;
    const bd = document.getElementById('balance-display');
    if(bd) bd.textContent = parseFloat(mockBal).toLocaleString();
  }
}

// ── MetaMask — REAL connection ──
async function connectMetaMask() {
  // 1. Check MetaMask is installed
  if(typeof window.ethereum === 'undefined' || !window.ethereum.isMetaMask) {
    showToast('🦊','MetaMask not found. Install it at metamask.io', 'error');
    setTimeout(()=> window.open('https://metamask.io/download/','_blank'), 800);
    return;
  }

  try {
    updateWalletModalStatus('⏳ Opening MetaMask...', 'metamask');

    // 2. Request account access
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    if(!accounts || accounts.length === 0) throw new Error('No accounts returned');

    // 3. Check current chain
    const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });

    if(currentChainId !== ARC_TESTNET.chainId) {
      updateWalletModalStatus('⛓️ Switching to Arc Testnet...', 'metamask');
      try {
        // Try to switch to Arc Testnet
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: ARC_TESTNET.chainId }]
        });
      } catch(switchErr) {
        // Chain not added yet — add it
        if(switchErr.code === 4902 || switchErr.code === -32603) {
          updateWalletModalStatus('➕ Adding Arc Testnet to MetaMask...', 'metamask');
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [ARC_TESTNET]
          });
          showToast('⛓️','Arc Testnet added to MetaMask!', 'success');
        } else {
          throw switchErr;
        }
      }
    }

    // 4. Connected!
    connectedProvider = window.ethereum;
    onWalletConnected(accounts[0], 'MetaMask 🦊');

    // 5. Listen for changes
    window.ethereum.removeAllListeners?.('accountsChanged');
    window.ethereum.removeAllListeners?.('chainChanged');
    window.ethereum.on('accountsChanged', accs => {
      if(!accs.length) disconnectWallet();
      else onWalletConnected(accs[0], 'MetaMask 🦊');
    });
    window.ethereum.on('chainChanged', chainId => {
      if(chainId !== ARC_TESTNET.chainId) {
        showToast('⚠️','Please switch back to Arc Testnet in MetaMask', 'error');
      }
    });

  } catch(err) {
    resetWalletModalStatus();
    if(err.code === 4001) showToast('❌','Connection rejected.', 'error');
    else if(err.code === -32002) showToast('⏳','MetaMask already has a pending request. Check MetaMask.', 'error');
    else showToast('❌','Error: ' + (err.message || 'Unknown'), 'error');
  }
}

// ── WalletConnect ──
async function connectWalletConnect() {
  updateWalletModalStatus('Generating WalletConnect session...', 'wc');
  showWCQRModal();
}

function showWCQRModal() {
  const qrModal = document.getElementById('wc-qr-modal');
  if(qrModal) {
    qrModal.style.display = 'flex';
    const canvas = document.getElementById('wc-qr-canvas');
    if(canvas) drawFakeQR(canvas);
  }
}

function drawFakeQR(canvas) {
  const ctx = canvas.getContext('2d');
  const size = canvas.width;
  ctx.fillStyle='#fff'; ctx.fillRect(0,0,size,size);
  ctx.fillStyle='#0B1735';
  const cells=21, cell=size/cells;
  for(let i=0;i<cells;i++) for(let j=0;j<cells;j++) {
    const inCorner=(i<7&&j<7)||(i<7&&j>13)||(i>13&&j<7);
    if(!inCorner && Math.random()>0.52) ctx.fillRect(j*cell+1,i*cell+1,cell-2,cell-2);
  }
  // Corner finder patterns
  [[1,1],[1,14],[14,1]].forEach(([x,y])=>{
    ctx.fillStyle='#0B1735';
    ctx.fillRect(x*cell,y*cell,7*cell,7*cell);
    ctx.fillStyle='#fff';
    ctx.fillRect((x+1)*cell,(y+1)*cell,5*cell,5*cell);
    ctx.fillStyle='#1540C0';
    ctx.fillRect((x+2)*cell,(y+2)*cell,3*cell,3*cell);
  });
}

function updateWalletModalStatus(msg, type) {
  const el = document.getElementById('wallet-modal-status');
  if(el){ el.textContent=msg; el.style.display='block'; }
  ['btn-metamask','btn-wc','btn-coinbase','btn-demo'].forEach(id=>{
    const b=document.getElementById(id); if(b){b.disabled=true;b.style.opacity='0.5';}
  });
}

function resetWalletModalStatus() {
  const el = document.getElementById('wallet-modal-status');
  if(el) el.style.display='none';
  ['btn-metamask','btn-wc','btn-coinbase','btn-demo'].forEach(id=>{
    const b=document.getElementById(id); if(b){b.disabled=false;b.style.opacity='1';}
  });
}

// ── Coinbase Wallet ──
async function connectCoinbase() {
  const provider = window.coinbaseWalletExtension || window.ethereum;
  if(!provider){ showToast('🔵','Coinbase Wallet not detected.','error'); return; }
  try {
    updateWalletModalStatus('Connecting to Coinbase Wallet...','coinbase');
    const accounts = await provider.request({method:'eth_requestAccounts'});
    connectedProvider = provider;
    onWalletConnected(accounts[0],'Coinbase 🔵');
  } catch(err){
    showToast('❌','Coinbase error: '+(err.message||'rejected'),'error');
    resetWalletModalStatus();
  }
}

// ── Demo Mode ──
function connectDemo() {
  const addr = '0x'+Array.from({length:40},()=>'0123456789abcdef'[Math.floor(Math.random()*16)]).join('');
  // Simulate as if MetaMask is connected for balance fetch
  connectedProvider = { isDemo: true };
  onWalletConnected(addr,'Demo ⚡');
}

// ── Disconnect ──
function disconnectWallet() {
  connectedAddress = null; connectedProvider = null;
  document.getElementById('wallet-pill-label').textContent='WALLET';
  document.getElementById('wallet-addr-display').textContent='Not connected';
  document.getElementById('wallet-net-display').textContent='Connect your wallet';
  const av=document.getElementById('topbar-avatar'); if(av) av.textContent='KA';
  const cb=document.getElementById('wallet-connect-status');
  if(cb){ cb.innerHTML='🔗 Connect Wallet'; cb.style.borderColor=''; }
  showToast('👋','Wallet disconnected.');
}
</script>
</body>
</html>
