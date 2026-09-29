import React from 'react';
import { 
  Users, 
  FolderGit2, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  FileText, 
  TrendingUp, 
  CheckCircle,
  HelpCircle,
  Layers,
  Activity
} from 'lucide-react';
import { USER_ROLES } from '../data/clinicalTrialsData';

export default function KpiOverview({ 
  studies, 
  safetyRecords, 
  deviations, 
  currentRole,
  onTabChange 
}) {
  const currentPersona = USER_ROLES.find(r => r.id === currentRole) || USER_ROLES[0];

  // Aggregated Metrics
  const totalStudies = studies.length;
  const totalTarget = studies.reduce((acc, s) => acc + s.targetEnrollment, 0);
  const totalEnrolled = studies.reduce((acc, s) => acc + s.currentEnrolled, 0);
  const overallAccrualPct = Math.round((totalEnrolled / totalTarget) * 100);

  const totalSaeCount = safetyRecords.filter(r => r.isSAE).length;
  const activeUrgentSae = safetyRecords.filter(r => r.isSAE && r.regClock24hStatus === 'URGENT_ACTION_REQUIRED').length;
  const totalAeCount = safetyRecords.length;

  const totalDeviations = deviations.length;
  const majorDeviations = deviations.filter(d => d.type === 'Major').length;
  const totalQueries = studies.reduce((acc, s) => acc + s.openDataQueries, 0);

  return (
    <div style={{ marginBottom: '1.75rem' }}>
      {/* Role Context & Regulatory Banner */}
      <div className="card" style={{
        padding: '0.85rem 1.25rem',
        marginBottom: '1rem',
        background: 'linear-gradient(90deg, rgba(13, 148, 136, 0.12) 0%, rgba(15, 23, 32, 0.4) 100%)',
        borderLeft: '4px solid var(--teal-500)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', maxWidth: '100%' }}>
          <div style={{
            background: 'rgba(13, 148, 136, 0.25)',
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--teal-300)',
            flexShrink: 0
          }}>
            <Activity size={20} />
          </div>
          <div style={{ maxWidth: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', maxWidth: '100%' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Viewing as: {currentPersona.personaName}
              </span>
              <span className={`badge ${currentPersona.badgeClass}`} style={{ fontSize: '0.65rem' }}>
                {currentPersona.designation}
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0.1rem 0 0 0', wordBreak: 'break-word' }}>
              {currentPersona.description}
            </p>
          </div>
        </div>

        {/* Quick regulatory statement badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', maxWidth: '100%' }}>
          <div style={{
            fontSize: '0.72rem',
            background: 'rgba(0, 0, 0, 0.25)',
            padding: '0.35rem 0.65rem',
            borderRadius: '6px',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-secondary)',
            wordBreak: 'break-word',
            maxWidth: '100%'
          }}>
            <strong>Compliance:</strong> CTRI (100% Prospective) • GCP-ASU • NDCT 2019 • DPDP Act 2023
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="kpi-cards-grid">
        {/* KPI 1: Research Portfolio */}
        <div 
          className="card" 
          style={{ padding: '1.15rem', cursor: 'pointer' }}
          onClick={() => onTabChange('portfolio')}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Clinical Portfolio
            </span>
            <div style={{ color: 'var(--teal-400)' }}>
              <FolderGit2 size={18} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {totalStudies}
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Active Protocols
            </span>
          </div>
          <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
            <span className="badge badge-teal" style={{ fontSize: '0.62rem' }}>2 Phase II/III</span>
            <span className="badge badge-emerald" style={{ fontSize: '0.62rem' }}>1 Phase IV Registry</span>
            <span className="badge badge-blue" style={{ fontSize: '0.62rem' }}>4 Multisite</span>
          </div>
        </div>

        {/* KPI 2: Subject Accrual vs Target */}
        <div 
          className="card" 
          style={{ padding: '1.15rem', cursor: 'pointer' }}
          onClick={() => onTabChange('operations')}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Subject Accrual
            </span>
            <div style={{ color: 'var(--success-green)' }}>
              <Users size={18} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {totalEnrolled}
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              / {totalTarget} Target ({overallAccrualPct}%)
            </span>
          </div>
          {/* Accrual Progress Bar */}
          <div style={{ marginTop: '0.65rem' }}>
            <div style={{
              width: '100%',
              height: '6px',
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '9999px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${overallAccrualPct}%`,
                height: '100%',
                background: 'linear-gradient(90deg, var(--teal-500), var(--success-green))',
                borderRadius: '9999px'
              }} />
            </div>
          </div>
        </div>

        {/* KPI 3: NPvCC Pharmacovigilance & Safety Alerts */}
        <div 
          className="card" 
          style={{ 
            padding: '1.15rem', 
            cursor: 'pointer',
            border: activeUrgentSae > 0 ? '1px solid rgba(225, 29, 72, 0.5)' : 'var(--glass-border)',
            background: activeUrgentSae > 0 ? 'rgba(225, 29, 72, 0.06)' : 'var(--bg-card)'
          }}
          onClick={() => onTabChange('safety')}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: activeUrgentSae > 0 ? '#fb7185' : 'var(--text-secondary)', textTransform: 'uppercase' }}>
              NPvCC Safety Signals
            </span>
            <div style={{ color: activeUrgentSae > 0 ? '#f43f5e' : 'var(--warn-amber)' }}>
              <AlertTriangle size={18} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.85rem', fontWeight: 800, color: activeUrgentSae > 0 ? '#fb7185' : 'var(--text-primary)' }}>
              {totalSaeCount} SAE
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              • {totalAeCount} Total AEs
            </span>
          </div>
          <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.5rem' }}>
            {activeUrgentSae > 0 ? (
              <span className="badge badge-red" style={{ fontSize: '0.62rem' }}>
                {'1 Clock < 5h (CDSCO/IEC)'}
              </span>
            ) : (
              <span className="badge badge-emerald" style={{ fontSize: '0.62rem' }}>
                All Regulatory Clocks Met
              </span>
            )}
            <span className="badge badge-gold" style={{ fontSize: '0.62rem' }}>
              MedDRA Coded
            </span>
          </div>
        </div>

        {/* KPI 4: Compliance & Monitoring Status */}
        <div 
          className="card" 
          style={{ padding: '1.15rem', cursor: 'pointer' }}
          onClick={() => onTabChange('deviations')}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Monitoring & Quality
            </span>
            <div style={{ color: 'var(--cdsco-blue)' }}>
              <ShieldCheck size={18} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {majorDeviations} Major
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              / {totalDeviations} Deviations
            </span>
          </div>
          <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.5rem' }}>
            <span className="badge badge-amber" style={{ fontSize: '0.62rem' }}>
              {totalQueries} EDC Queries Open
            </span>
            <span className="badge badge-teal" style={{ fontSize: '0.62rem' }}>
              ALCOA+ Verified
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
