import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Clock, 
  Flame, 
  AlertTriangle, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Activity, 
  FileSpreadsheet, 
  HelpCircle,
  ExternalLink,
  Info,
  Building2,
  Filter
} from 'lucide-react';

export default function PharmacovigilanceView({ 
  safetyRecords, 
  onTransmitToCdsco, 
  onOpenReportModal,
  urgentClockTimeRemaining
}) {
  const [filterType, setFilterType] = useState('ALL');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showCausalityTool, setShowCausalityTool] = useState(false);

  // Causality tool state
  const [calcTemporal, setCalcTemporal] = useState(true);
  const [calcDechallenge, setCalcDechallenge] = useState(true);
  const [calcRechallenge, setCalcRechallenge] = useState(false);
  const [calcAltCause, setCalcAltCause] = useState(false);

  const filteredRecords = safetyRecords.filter(rec => {
    if (filterType === 'SAE') return rec.isSAE;
    if (filterType === 'URGENT') return rec.regClock24hStatus === 'URGENT_ACTION_REQUIRED';
    if (filterType === 'AE') return !rec.isSAE;
    return true;
  });

  // Calculate Naranjo score interactively
  const computedScore = (calcTemporal ? 2 : 0) + (calcDechallenge ? 2 : 0) + (calcRechallenge ? 2 : 0) + (!calcAltCause ? 2 : -1);
  const computedCategory = computedScore >= 9 ? 'Definite' : computedScore >= 5 ? 'Probable' : computedScore >= 1 ? 'Possible' : 'Doubtful';

  return (
    <div>
      {/* NPvCC Mandate Alert Banner */}
      <div className="card" style={{
        padding: '1.25rem',
        marginBottom: '1.5rem',
        background: 'linear-gradient(135deg, rgba(225, 29, 72, 0.1) 0%, rgba(15, 23, 32, 0.6) 100%)',
        border: '1px solid rgba(225, 29, 72, 0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            background: 'rgba(225, 29, 72, 0.2)',
            width: '44px',
            height: '44px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fb7185'
          }}>
            <ShieldAlert size={26} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h2 style={{ fontSize: '1.1rem', color: '#fff', margin: 0 }}>
                National Pharmacovigilance Coordination Centre (NPvCC) Hub
              </h2>
              <span className="badge badge-red" style={{ fontSize: '0.65rem' }}>
                NDCT 2019 Rule 42 Active
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0 0' }}>
              Anchoring nationwide safety surveillance for Ayurveda, Siddha, Unani & Homoeopathy (ASU&H) clinical trials and spontaneous ADR reports.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button 
            onClick={() => setShowCausalityTool(!showCausalityTool)}
            className="btn btn-secondary"
            style={{ fontSize: '0.78rem' }}
          >
            <Activity size={15} color="var(--ayush-gold)" />
            <span>WHO-UMC Causality Tool</span>
          </button>
          <button 
            onClick={onOpenReportModal}
            className="btn btn-danger"
            style={{ fontSize: '0.78rem' }}
          >
            <Flame size={15} />
            <span>Report New AE / SAE (Form CT-16)</span>
          </button>
        </div>
      </div>

      {/* Interactive WHO-UMC & Naranjo Causality Calculator Modal / Drawer */}
      {showCausalityTool && (
        <div className="card animate-fade-in" style={{
          padding: '1.25rem',
          marginBottom: '1.5rem',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-highlight)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={18} color="var(--teal-400)" />
              <h3 style={{ fontSize: '0.95rem', margin: 0 }}>
                Ayurvedic Pharmacovigilance Causality Assessment Calculator (WHO-UMC / Naranjo Scale)
              </h3>
            </div>
            <button 
              onClick={() => setShowCausalityTool(false)} 
              className="btn btn-ghost" 
              style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
            >
              Close Tool
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={calcTemporal} onChange={(e) => setCalcTemporal(e.target.checked)} />
              <span>Clear temporal sequence post-administration (+2)</span>
            </label>
            <label style={{ fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={calcDechallenge} onChange={(e) => setCalcDechallenge(e.target.checked)} />
              <span>Positive De-challenge (recedes on withdrawal) (+2)</span>
            </label>
            <label style={{ fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={calcRechallenge} onChange={(e) => setCalcRechallenge(e.target.checked)} />
              <span>Positive Re-challenge (reappears on re-exposure) (+2)</span>
            </label>
            <label style={{ fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={calcAltCause} onChange={(e) => setCalcAltCause(e.target.checked)} />
              <span>Alternative etiology or co-medication present (-1)</span>
            </label>
          </div>

          <div style={{
            background: 'rgba(0, 0, 0, 0.25)',
            padding: '0.65rem 1rem',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.8rem'
          }}>
            <div>
              Calculated Naranjo Score: <strong>{computedScore}</strong>
            </div>
            <div>
              WHO-UMC Causality Classification: <span className="badge badge-teal" style={{ fontSize: '0.75rem' }}>{computedCategory}</span>
            </div>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {[
            { id: 'ALL', label: 'All Signals' },
            { id: 'URGENT', label: 'Urgent 24h Clocks (<5h)' },
            { id: 'SAE', label: 'Serious Adverse Events (SAE)' },
            { id: 'AE', label: 'Non-Serious AEs' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`btn ${filterType === tab.id ? 'btn-primary' : 'btn-ghost'}`}
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem', border: filterType === tab.id ? 'none' : '1px solid var(--border-subtle)' }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Showing <strong>{filteredRecords.length}</strong> active pharmacovigilance reports
        </div>
      </div>

      {/* Safety Reports Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredRecords.map(record => {
          const isUrgent = record.regClock24hStatus === 'URGENT_ACTION_REQUIRED';

          return (
            <div 
              key={record.id}
              className="card"
              style={{
                padding: '1.25rem',
                borderLeft: record.isSAE ? '4px solid var(--sae-red)' : '4px solid var(--ayush-gold)',
                background: isUrgent ? 'rgba(225, 29, 72, 0.04)' : 'var(--bg-card)'
              }}
            >
              {/* Header: ID, Study, MedDRA SOC, Status */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <span className="clinical-code">{record.id}</span>
                  <span className="badge badge-teal">{record.studyId}</span>
                  <span className="clinical-code">{record.subjectId}</span>
                  <span className={record.isSAE ? 'badge badge-red' : 'badge badge-amber'}>
                    {record.severity}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="badge badge-blue">
                    SOC: {record.medDraSOC}
                  </span>
                  <span className="badge badge-gold">
                    MedDRA PT: {record.medDraPT} ({record.medDraCode})
                  </span>
                </div>
              </div>

              {/* Event Description & Clinical Narrative */}
              <div style={{ marginBottom: '0.85rem' }}>
                <h4 style={{ fontSize: '0.98rem', color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
                  {record.aeTermReported}
                </h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>
                  <strong>Clinical Action Taken:</strong> {record.actionTaken}
                </p>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  <strong>Subject Outcome:</strong> {record.outcome}
                </p>
              </div>

              {/* Ayurvedic Botanical & Formulation Details */}
              <div style={{
                background: 'rgba(217, 119, 6, 0.08)',
                border: '1px solid rgba(217, 119, 6, 0.25)',
                borderRadius: '0.5rem',
                padding: '0.6rem 0.85rem',
                fontSize: '0.75rem',
                marginBottom: '1rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '0.5rem'
              }}>
                <div>
                  <strong style={{ color: 'var(--ayush-gold)' }}>Formulation / Batch:</strong> {record.investigationalProductBatch}
                </div>
                <div>
                  <strong style={{ color: 'var(--ayush-gold)' }}>Botanical / Mineral:</strong> {record.ayushHerbalDetails.botanicalName}
                </div>
                <div>
                  <strong style={{ color: 'var(--ayush-gold)' }}>Heavy Metal Assay:</strong> {record.ayushHerbalDetails.heavyMetalsAnalysis}
                </div>
                <div>
                  <strong style={{ color: 'var(--ayush-gold)' }}>Causality (WHO-UMC):</strong> <strong>{record.whoUmcCausality}</strong> (Naranjo: {record.naranjoScore})
                </div>
              </div>

              {/* Regulatory Clocks & Action Bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid var(--border-subtle)'
              }}>
                {/* Countdown Status */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  {record.isSAE ? (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem' }}>
                        <Clock size={15} color={isUrgent ? 'var(--sae-red)' : 'var(--success-green)'} />
                        <span>
                          <strong>24h CDSCO/IEC Clock:</strong>{' '}
                          {record.cdscoNotified ? (
                            <span style={{ color: 'var(--success-green)', fontWeight: 600 }}>Transmitted & Verified</span>
                          ) : (
                            <span style={{ color: 'var(--sae-red)', fontWeight: 700 }}>
                              {urgentClockTimeRemaining} remaining!
                            </span>
                          )}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <Calendar size={14} />
                        <span>14-Day Form CT-17 Report Due: <strong>{record.regClock14dDeadline.split('T')[0]}</strong></span>
                      </div>
                    </>
                  ) : (
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Non-Serious Event • Routine Periodic Safety Update (PSUR) Cohort
                    </div>
                  )}
                </div>

                {/* Transmit Button */}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {record.isSAE && !record.cdscoNotified && (
                    <button
                      id={`btn-transmit-${record.id}`}
                      onClick={() => onTransmitToCdsco(record.id)}
                      className="btn btn-danger"
                      style={{ fontSize: '0.75rem', padding: '0.4rem 0.85rem' }}
                    >
                      <Send size={13} />
                      <span>Transmit Form CT-16 to CDSCO & IEC</span>
                    </button>
                  )}

                  {record.cdscoNotified && (
                    <span className="badge badge-emerald" style={{ fontSize: '0.72rem', gap: '0.35rem' }}>
                      <CheckCircle2 size={13} />
                      CDSCO Ack Receipt Generated
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Calendar({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}
