const TITLES = {
  dashboard: 'Tableau de Bord',
  employees: 'Gestion des Employés',
  stock: 'Gestion du Stock',
  clients: 'Suivi Clients',
  livraison: 'Livraison & Facturation',
  steg: 'Suivi STEG',
};

export default function Header({ activeView, user, onLogout }) {
  const dateStr = new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  return (
    <header style={{ height: 64, borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', background: 'rgba(6,11,24,0.8)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 50 }}>
      <h2 style={{ fontSize: 16, fontWeight: 700 }}>{TITLES[activeView] || activeView}</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <span style={{ fontSize: 13, color: 'var(--fg-muted)' }}>{dateStr}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{user?.name}</span>
          <button onClick={onLogout} style={{ width: 38, height: 38, borderRadius: 10, border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(239,68,68,0.4)'; e.currentTarget.style.color = '#EF4444'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--fg-muted)'; }}
            aria-label="Déconnexion">
            <i className="fa-solid fa-right-from-bracket" style={{ fontSize: 14 }} />
          </button>
        </div>
      </div>
    </header>
  );
}
