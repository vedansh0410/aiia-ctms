import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Activity, 
  Clock, 
  UserCheck, 
  Sun, 
  Moon, 
  ChevronDown, 
  FileWarning, 
  Building2, 
  Flame,
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import { USER_ROLES } from '../data/clinicalTrialsData';

export default function Navbar({ 
  currentRole, 
  onRoleChange, 
  theme, 
  onToggleTheme, 
  onOpenReportSae,
  activeSaeCount,
  urgentClockTimeRemaining
}) {
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const selectedRole = USER_ROLES.find(r => r.id === currentRole) || USER_ROLES[0];

  return (
    <header className="navbar-container" style={{
      background: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border-medium)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'var(--glass-blur)',
      padding: '0.65rem 1.5rem'
    }}>
      {/* Top Banner: Institutional Branding & Emergency Regulatory Clock Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        {/* Left: AIIA & NPvCC Emblem & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', maxWidth: '100%' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #0d9488 0%, #042f2e 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(13, 148, 136, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            position: 'relative',
            flexShrink: 0
          }}>
            <Activity size={22} color="#5eead4" />
            <div style={{
              position: 'absolute',
              bottom: '-3px',
              right: '-3px',
              background: '#d97706',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              border: '2px solid var(--bg-secondary)'
            }} title="NPvCC National Host" />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                background: 'linear-gradient(90deg, #5eead4, #14b8a6, #fde68a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                AIIA CTMS
              </span>
              <span className="badge badge-gold" style={{ fontSize: '0.62rem', padding: '0.1rem 0.35rem' }}>
                NPvCC HOST
              </span>
              <span className="badge badge-teal" style={{ fontSize: '0.62rem', padding: '0.1rem 0.35rem' }}>
                GCP-ASU • NDCT 2019
              </span>
            </div>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 500, margin: 0 }}>
              All India Institute of Ayurveda • Ministry of Ayush, Govt. of India
            </p>
          </div>
        </div>

        {/* Center: Live 24-Hour Regulatory Clock Ticker */}
        {activeSaeCount > 0 && (
          <div className="pulse-red-badge" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'rgba(225, 29, 72, 0.12)',
            border: '1px solid rgba(225, 29, 72, 0.45)',
            padding: '0.35rem 0.75rem',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            maxWidth: '100%',
            flexWrap: 'wrap'
          }} onClick={onOpenReportSae} title="Click to view urgent regulatory expedited reporting clock">
            <Flame size={16} color="#f43f5e" />
            <div style={{ maxWidth: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#fb7185', textTransform: 'uppercase' }}>
                  NDCT 2019 Rule 42 Clock:
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#fff',
                  background: '#be123c',
                  padding: '0.05rem 0.35rem',
                  borderRadius: '4px'
                }}>
                  {urgentClockTimeRemaining}
                </span>
              </div>
              <span style={{ fontSize: '0.68rem', color: '#fca5a5' }}>
                1 Expedited CDSCO/IEC 24h initial report pending transmission
              </span>
            </div>
          </div>
        )}

        {/* Right: Actions, Role Selector & Theme Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', maxWidth: '100%' }}>
          {/* Quick Action: Report AE/SAE Button */}
          <button 
            id="btn-report-sae-nav"
            className="btn btn-danger"
            style={{ fontSize: '0.78rem', padding: '0.45rem 0.85rem' }}
            onClick={onOpenReportSae}
          >
            <ShieldAlert size={15} />
            <span>Report SAE (CT-16)</span>
          </button>

          {/* Role-Based Access Control Switcher */}
          <div style={{ position: 'relative' }}>
            <button
              id="role-switcher-btn"
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-medium)',
                borderRadius: '0.5rem',
                padding: '0.35rem 0.75rem',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'rgba(13, 148, 136, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--teal-400)'
              }}>
                <UserCheck size={16} />
              </div>
              <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                  Active Persona:
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {selectedRole.label}
                </div>
              </div>
              <ChevronDown size={14} color="var(--text-secondary)" />
            </button>

            {/* Role Dropdown Menu */}
            {roleMenuOpen && (
              <div className="role-dropdown-menu" style={{
                position: 'absolute',
                right: 0,
                top: 'calc(100% + 8px)',
                width: '320px',
                maxWidth: '92vw',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-medium)',
                borderRadius: '0.75rem',
                boxShadow: 'var(--shadow-lg)',
                padding: '0.5rem',
                zIndex: 200,
                backdropFilter: 'var(--glass-blur)'
              }}>
                <div style={{
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  borderBottom: '1px solid var(--border-subtle)'
                }}>
                  Select Role-Based View (RBAC)
                </div>

                <div style={{ maxHeight: '360px', overflowY: 'auto', paddingTop: '0.35rem' }}>
                  {USER_ROLES.map((role) => (
                    <div
                      key={role.id}
                      onClick={() => {
                        onRoleChange(role.id);
                        setRoleMenuOpen(false);
                      }}
                      style={{
                        padding: '0.6rem 0.75rem',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        background: role.id === currentRole ? 'rgba(13, 148, 136, 0.15)' : 'transparent',
                        border: role.id === currentRole ? '1px solid rgba(13, 148, 136, 0.4)' : '1px solid transparent',
                        marginBottom: '0.25rem',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (role.id !== currentRole) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                      }}
                      onMouseLeave={(e) => {
                        if (role.id !== currentRole) e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.15rem' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {role.label}
                        </span>
                        <span className={`badge ${role.badgeClass}`} style={{ fontSize: '0.62rem' }}>
                          {role.badge}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.73rem', color: 'var(--teal-300)', fontWeight: 600 }}>
                        {role.personaName}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                        {role.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Theme Switcher */}
          <button
            id="theme-toggle-btn"
            onClick={onToggleTheme}
            className="btn btn-ghost"
            style={{ padding: '0.45rem', borderRadius: '0.5rem', border: '1px solid var(--border-subtle)' }}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Clinical Mode`}
          >
            {theme === 'dark' ? <Sun size={17} color="#fde68a" /> : <Moon size={17} color="#0d9488" />}
          </button>
        </div>
      </div>
    </header>
  );
}
