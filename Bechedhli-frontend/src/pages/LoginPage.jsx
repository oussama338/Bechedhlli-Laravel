import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginPage = ({ onLoginSuccess }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@bechedhli.dz');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const result = login(email, password);
    
    if (result.success) {
      setIsLoading(false);
      if (onLoginSuccess) onLoginSuccess();
    } else {
      setError(result.error);
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background mesh effect */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none'
      }}>
        <div style={{
          position: 'absolute',
          top: '-30%',
          right: '-20%',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(249,115,22,.06) 0%, transparent 70%)',
          animation: 'float 15s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-20%',
          left: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(59,130,246,.05) 0%, transparent 70%)',
          animation: 'float 18s ease-in-out infinite reverse'
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '440px' }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '48px',
          animation: 'fadeIn .6s ease-out'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            background: 'linear-gradient(135deg, #F97316, #EA580C)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            boxShadow: '0 8px 24px rgba(249,115,22,.3)'
          }}>
            <i className="fa-solid fa-solar-panel" style={{ fontSize: '28px', color: '#fff' }} />
          </div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: 'var(--fg)',
            marginBottom: '8px',
            fontFamily: "'Space Grotesk', sans-serif"
          }}>
            Bechedhli Solar
          </h1>
          <p style={{
            fontSize: '14px',
            color: 'var(--fg-muted)',
            letterSpacing: '0.05em'
          }}>
            Espace Directeur Commercial
          </p>
        </div>

        {/* Login Card */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 24px 64px rgba(0, 0, 0, .5)',
          animation: 'slideUp .6s ease-out .1s both'
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Email Field */}
            <div>
              <label style={{
                fontSize: '12px',
                fontWeight: '600',
                color: 'var(--fg-muted)',
                marginBottom: '8px',
                display: 'block',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@bechedhli.dz"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'rgba(255,255,255,.03)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  color: 'var(--fg)',
                  fontSize: '14px',
                  fontFamily: "'DM Sans', sans-serif",
                  transition: 'all .25s',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--solar-orange)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border)';
                  e.target.style.boxShadow = 'none';
                }}
                disabled={isLoading}
              />
            </div>

            {/* Password Field */}
            <div>
              <label style={{
                fontSize: '12px',
                fontWeight: '600',
                color: 'var(--fg-muted)',
                marginBottom: '8px',
                display: 'block',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Mot de passe
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 16px',
                    paddingRight: '44px',
                    background: 'rgba(255,255,255,.03)',
                    border: '1px solid var(--border)',
                    borderRadius: '10px',
                    color: 'var(--fg)',
                    fontSize: '14px',
                    fontFamily: "'DM Sans', sans-serif",
                    transition: 'all .25s',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--solar-orange)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.15)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border)';
                    e.target.style.boxShadow = 'none';
                  }}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--fg-muted)',
                    cursor: 'pointer',
                    fontSize: '14px',
                    padding: '4px 8px',
                    transition: 'color .2s'
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--fg)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--fg-muted)'}
                >
                  <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div style={{
                background: 'rgba(239,68,68,.12)',
                border: '1px solid rgba(239,68,68,.3)',
                borderRadius: '10px',
                padding: '12px 16px',
                fontSize: '13px',
                color: '#EF4444',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                animation: 'slideUp .3s ease-out'
              }}>
                <i className="fa-solid fa-exclamation-circle" />
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '12px',
                background: isLoading 
                  ? 'rgba(249,115,22,.6)'
                  : 'linear-gradient(135deg, #F97316, #EA580C)',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '600',
                fontFamily: "'DM Sans', sans-serif",
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all .25s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '8px'
              }}
              onMouseEnter={(e) => !isLoading && (e.target.style.transform = 'translateY(-1px)', e.target.style.boxShadow = '0 6px 24px rgba(249,115,22,.35)')}
              onMouseLeave={(e) => !isLoading && (e.target.style.transform = 'translateY(0)', e.target.style.boxShadow = 'none')}
            >
              {isLoading ? (
                <>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(255,255,255,.3)',
                    borderTop: '2px solid #fff',
                    borderRadius: '50%',
                    animation: 'spin-slow .8s linear infinite'
                  }} />
                  Connexion...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-arrow-right" />
                  Connexion
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            margin: '24px 0',
            opacity: 0.5
          }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            <span style={{ fontSize: '12px', color: 'var(--fg-muted)' }}>OU</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
          </div>

          {/* Demo Credentials */}
          <div style={{
            background: 'rgba(249,115,22,.08)',
            border: '1px solid rgba(249,115,22,.2)',
            borderRadius: '10px',
            padding: '14px',
            fontSize: '12px',
            color: 'var(--fg-muted)',
            textAlign: 'center',
            lineHeight: 1.6
          }}>
            <p style={{ margin: '0 0 8px 0', color: 'var(--fg)' }}>
              <strong>Identifiants de démonstration</strong>
            </p>
            <p style={{ margin: '4px 0' }}>
              <strong>Admin:</strong> admin@bechedhli.dz / admin123
            </p>
            <p style={{ margin: '4px 0' }}>
              <strong>Employé:</strong> employe@bechedhli.dz / employe123
            </p>
          </div>
        </div>

        {/* Footer */}
        <p style={{
          textAlign: 'center',
          fontSize: '12px',
          color: 'var(--fg-muted)',
          marginTop: '24px',
          letterSpacing: '0.03em'
        }}>
          © 2026 Bechedhli Solar Energy. Tous droits réservés.
        </p>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes slideUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>
    </div>
  );
};

export default LoginPage;
