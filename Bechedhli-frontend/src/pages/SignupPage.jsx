import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import SolarLogo from '../components/SolarLogo';

export default function SignupPage({ onSwitchToLogin }) {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) { setError('Tous les champs sont obligatoires'); return; }
    if (password !== confirmPassword) { setError('Les mots de passe ne correspondent pas'); return; }
    if (password.length < 6) { setError('Le mot de passe doit contenir au moins 6 caractères'); return; }
    setLoading(true);
    try {
      await signup(name, email, password);
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
        <div style={{ textAlign: 'center', marginBottom: 36, animation: 'fadeIn .6s ease-out' }}>
          <div style={{ margin: '0 auto 16px', display: 'flex', justifyContent: 'center' }}>
            <SolarLogo size={64} />
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--fg)', marginBottom: 4, fontFamily: "'Space Grotesk', sans-serif" }}>Créer un compte</h1>
          <p style={{ fontSize: 14, color: 'var(--fg-muted)' }}>Rejoignez Bechedhli Solar Energy</p>
        </div>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, padding: 36, boxShadow: '0 24px 64px rgba(0,0,0,.5)', animation: 'slideUp .6s ease-out .1s both' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--fg-muted)', marginBottom: 8, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nom complet</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Ex: Ahmed Benali"
                style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,.03)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--fg)', fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: 'none', boxSizing: 'border-box' }}
                onFocus={e => { e.target.style.borderColor = 'var(--solar-orange)'; e.target.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.15)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--fg-muted)', marginBottom: 8, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="nom@bechedhli.dz"
                style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,.03)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--fg)', fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: 'none', boxSizing: 'border-box' }}
                onFocus={e => { e.target.style.borderColor = 'var(--solar-orange)'; e.target.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.15)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--fg-muted)', marginBottom: 8, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mot de passe</label>
              <div style={{ position: 'relative' }}>
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 6 caractères"
                  style={{ width: '100%', padding: '12px 16px', paddingRight: 44, background: 'rgba(255,255,255,.03)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--fg)', fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => { e.target.style.borderColor = 'var(--solar-orange)'; e.target.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.15)'; }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--fg-muted)', cursor: 'pointer', fontSize: 14, padding: '4px 8px' }}>
                  <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                </button>
              </div>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--fg-muted)', marginBottom: 8, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Confirmer le mot de passe</label>
              <input type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Répétez le mot de passe"
                style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,.03)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--fg)', fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: 'none', boxSizing: 'border-box' }}
                onFocus={e => { e.target.style.borderColor = 'var(--solar-orange)'; e.target.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.15)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }} />
            </div>
            {error && (
              <div style={{ background: 'rgba(239,68,68,.12)', border: '1px solid rgba(239,68,68,.3)', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#EF4444', display: 'flex', alignItems: 'center', gap: 10, animation: 'slideUp .3s ease-out' }}>
                <i className="fa-solid fa-exclamation-circle" />{error}
              </div>
            )}
            <button type="submit" disabled={loading}
              style={{ width: '100%', padding: 12, background: loading ? 'rgba(16,185,129,.6)' : 'linear-gradient(135deg, #10B981, #059669)', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: "'DM Sans', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 4 }}>
              {loading ? <><div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,.3)', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin-slow .8s linear infinite' }} />Inscription...</> : <><i className="fa-solid fa-user-plus" />Créer mon compte</>}
            </button>
          </form>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0', opacity: 0.5 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>OU</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>
          <button onClick={onSwitchToLogin}
            style={{ width: '100%', background: 'transparent', border: '1px solid var(--border)', color: 'var(--fg)', fontWeight: 500, borderRadius: 10, padding: 12, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
            <i className="fa-solid fa-arrow-left" />Retour à la connexion
          </button>
        </div>
        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--fg-muted)', marginTop: 24, letterSpacing: '0.03em' }}>© 2026 Bechedhli Solar Energy. Tous droits réservés.</p>
      </div>
    </div>
  );
}
