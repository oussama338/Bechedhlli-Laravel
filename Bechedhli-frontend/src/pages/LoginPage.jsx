import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage({ onSwitchToSignup }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@bechedhli.dz');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-30%', right: '-20%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(249,115,22,.06) 0%, transparent 70%)', animation: 'float 15s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(59,130,246,.05) 0%, transparent 70%)', animation: 'float 18s ease-in-out infinite reverse' }} />
      </div>
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 440 }}>
        <div style={{ textAlign: 'center', marginBottom: 48, animation: 'fadeIn .6s ease-out' }}>
          <div style={{ width: 64, height: 64, background: 'linear-gradient(135deg, #F97316, #EA580C)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 8px 24px rgba(249,115,22,.3)' }}>
            <i className="fa-solid fa-solar-panel" style={{ fontSize: 28, color: '#fff' }} />
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--fg)', marginBottom: 8, fontFamily: "'Space Grotesk', sans-serif" }}>Bechedhli Solar</h1>
          <p style={{ fontSize: 14, color: 'var(--fg-muted)', letterSpacing: '0.05em' }}>Espace de Gestion</p>
        </div>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, padding: 40, boxShadow: '0 24px 64px rgba(0,0,0,.5)', animation: 'slideUp .6s ease-out .1s both' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--fg-muted)', marginBottom: 8, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@bechedhli.dz"
                style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,.03)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--fg)', fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: 'none', boxSizing: 'border-box' }}
                onFocus={e => { e.target.style.borderColor = 'var(--solar-orange)'; e.target.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.15)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                disabled={loading} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--fg-muted)', marginBottom: 8, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mot de passe</label>
              <div style={{ position: 'relative' }}>
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                  style={{ width: '100%', padding: '12px 16px', paddingRight: 44, background: 'rgba(255,255,255,.03)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--fg)', fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => { e.target.style.borderColor = 'var(--solar-orange)'; e.target.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.15)'; }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                  disabled={loading} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--fg-muted)', cursor: 'pointer', fontSize: 14, padding: '4px 8px' }}>
                  <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                </button>
              </div>
            </div>
            {error && (
              <div style={{ background: 'rgba(239,68,68,.12)', border: '1px solid rgba(239,68,68,.3)', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#EF4444', display: 'flex', alignItems: 'center', gap: 10, animation: 'slideUp .3s ease-out' }}>
                <i className="fa-solid fa-exclamation-circle" />{error}
              </div>
            )}
            <button type="submit" disabled={loading}
              style={{ width: '100%', padding: 12, background: loading ? 'rgba(249,115,22,.6)' : 'linear-gradient(135deg, #F97316, #EA580C)', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: "'DM Sans', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 8 }}>
              {loading ? <><div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,.3)', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin-slow .8s linear infinite' }} />Connexion...</> : <><i className="fa-solid fa-arrow-right" />Connexion</>}
            </button>
          </form>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0', opacity: 0.5 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>OU</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>
          <button onClick={onSwitchToSignup}
            style={{ width: '100%', background: 'transparent', border: '2px dashed rgba(249,115,22,.4)', color: '#F97316', fontWeight: 600, borderRadius: 10, padding: 12, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all .25s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(249,115,22,.08)'; e.currentTarget.style.borderColor = 'rgba(249,115,22,.6)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(249,115,22,.4)'; }}>
            <i className="fa-solid fa-user-plus" />Créer un compte
          </button>
          <div style={{ background: 'rgba(249,115,22,.08)', border: '1px solid rgba(249,115,22,.2)', borderRadius: 10, padding: 14, fontSize: 12, color: 'var(--fg-muted)', textAlign: 'center', lineHeight: 1.6, marginTop: 20 }}>
            <p style={{ margin: '0 0 8px 0', color: 'var(--fg)' }}><strong>Identifiants de démonstration</strong></p>
            <p style={{ margin: '4px 0' }}><strong>Admin:</strong> admin@bechedhli.dz / admin123</p>
          </div>
        </div>
        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--fg-muted)', marginTop: 24, letterSpacing: '0.03em' }}>© 2026 Bechedhli Solar Energy. Tous droits réservés.</p>
      </div>
    </div>
  );
}
