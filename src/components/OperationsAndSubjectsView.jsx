import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileSpreadsheet, 
  UserCheck, 
  Shield, 
  Heart,
  Search,
  Filter
} from 'lucide-react';
import { INITIAL_DEVIATIONS } from '../data/clinicalTrialsData';

export default function OperationsAndSubjectsView({ studies, onAddDeviation }) {
  const [activeSubTab, setActiveSubTab] = useState('funnel');
  const [selectedStudyId, setSelectedStudyId] = useState(studies[0].id);

  const selectedStudy = studies.find(s => s.id === selectedStudyId) || studies[0];

  // Synthetic Subject Records for selected study
  const syntheticSubjects = [
    { id: 'SUBJ-001', arm: 'Active Treatment', age: 44, gender: 'F', prakriti: 'Vata-Pitta', abhaId: '91-4521-8890-12', consentDate: '2024-03-15', visitStatus: 'Week 12 (Completed)', eCrfProgress: 100 },
    { id: 'SUBJ-002', arm: 'Placebo Control', age: 52, gender: 'M', prakriti: 'Kapha-Vata', abhaId: '91-3329-1092-44', consentDate: '2024-03-16', visitStatus: 'Week 12 (Completed)', eCrfProgress: 100 },
    { id: 'SUBJ-003', arm: 'Active Treatment', age: 39, gender: 'F', prakriti: 'Pitta-Vata', abhaId: '91-8821-3901-55', consentDate: '2024-04-02', visitStatus: 'Week 8 (In Window)', eCrfProgress: 66 },
    { id: 'SUBJ-004', arm: 'Active Treatment', age: 61, gender: 'M', prakriti: 'Vataja', abhaId: '91-6651-7890-33', consentDate: '2024-04-10', visitStatus: 'Week 4 (In Window)', eCrfProgress: 45 },
    { id: 'SUBJ-005', arm: 'Placebo Control', age: 48, gender: 'F', prakriti: 'Kapha-Pitta', abhaId: '91-1190-4456-78', consentDate: '2024-04-18', visitStatus: 'Baseline', eCrfProgress: 20 }
  ];

  return (
    <div>
      {/* Sub-tab Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[
            { id: 'funnel', label: 'Accrual Funnel & SoA Matrix', icon: Users },
            { id: 'deviations', label: 'Protocol Deviations Log', icon: AlertTriangle },
            { id: 'subjects', label: 'Participant Directory & Prakriti', icon: UserCheck }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`btn ${activeSubTab === tab.id ? 'btn-primary' : 'btn-ghost'}`}
                style={{ fontSize: '0.78rem', padding: '0.4rem 0.85rem', border: activeSubTab === tab.id ? 'none' : '1px solid var(--border-subtle)' }}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Study Selector Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Select Protocol:</span>
          <select
            value={selectedStudyId}
            onChange={(e) => setSelectedStudyId(e.target.value)}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '0.4rem',
              border: '1px solid var(--border-medium)',
              background: 'var(--bg-input)',
              color: 'var(--text-primary)',
              fontSize: '0.78rem',
              outline: 'none'
            }}
          >
            {studies.map(s => (
              <option key={s.id} value={s.id}>
                {s.protocolNumber} - {s.shortTitle}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tab 1: Funnel & Schedule of Assessments */}
      {activeSubTab === 'funnel' && (
        <div>
          {/* Recruitment Funnel Metrics */}
          <div className="card" style={{ padding: '1.25rem', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '0.95rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Accrual Funnel: {selectedStudy.title}
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '0.75rem',
              textAlign: 'center'
            }}>
              {[
                { label: 'Pre-Screened', val: selectedStudy.screened + 45, color: 'var(--text-muted)' },
                { label: 'Screened', val: selectedStudy.screened, color: 'var(--info-blue)' },
                { label: 'Consented', val: selectedStudy.currentEnrolled, color: 'var(--teal-400)' },
                { label: 'Randomized', val: selectedStudy.randomized, color: 'var(--ayush-gold)' },
                { label: 'On Protocol', val: selectedStudy.randomized - selectedStudy.completed - selectedStudy.discontinued, color: 'var(--success-green)' },
                { label: 'Completed', val: selectedStudy.completed, color: 'var(--teal-300)' },
                { label: 'Discontinued', val: selectedStudy.discontinued, color: 'var(--sae-red)' }
              ].map((step, idx) => (
                <div key={idx} style={{
                  background: 'rgba(0, 0, 0, 0.2)',
                  padding: '0.75rem 0.5rem',
                  borderRadius: '0.5rem',
                  border: '1px solid var(--border-subtle)'
                }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    {step.label}
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: step.color }}>
                    {step.val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule of Assessments (SoA) Visit Adherence */}
          <div className="card" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Schedule of Assessments (SoA) Compliance Matrix (Visit Window: ± 3 Days)
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Tracks prospective clinical evaluations, Ayurvedic dosha assessments, laboratory safety tests, and eCRF lock status.
            </p>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-medium)', textAlign: 'left', color: 'var(--text-secondary)' }}>
                    <th style={{ padding: '0.6rem' }}>Assessment Parameter</th>
                    <th style={{ padding: '0.6rem' }}>Screening (D-7 to D0)</th>
                    <th style={{ padding: '0.6rem' }}>Baseline (Day 1)</th>
                    <th style={{ padding: '0.6rem' }}>Week 2 (D14 ±3)</th>
                    <th style={{ padding: '0.6rem' }}>Week 4 (D28 ±3)</th>
                    <th style={{ padding: '0.6rem' }}>Week 8 (D56 ±3)</th>
                    <th style={{ padding: '0.6rem' }}>Week 12 (D84 ±3)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'DPDP Written & Video Informed Consent', s: 'Mandatory', b: 'Verified', w2: '-', w4: '-', w8: '-', w12: '-' },
                    { name: 'Ayurvedic Prakriti (Prakriti Pariksha)', s: 'Baseline', b: 'Classified', w2: '-', w4: '-', w8: '-', w12: 'Re-assessment' },
                    { name: 'Investigational Product Dispensation', s: '-', b: 'Batch Tracked', w2: 'Accountability', w4: 'Accountability', w8: 'Accountability', w12: 'Final Reconcile' },
                    { name: 'Liver & Renal Function Tests (LFT/RFT)', s: 'Eligible', b: 'Recorded', w2: 'Safety Screen', w4: 'Comprehensive', w8: 'Comprehensive', w12: 'Final Safety' },
                    { name: 'Primary Clinical Endpoint Questionnaire', s: '-', b: 'Baseline Score', w2: 'Interim', w4: 'Interim', w8: 'Interim', w12: 'Final Primary' },
                    { name: 'Adverse Drug Reaction / AE Screening', s: '-', b: 'Assessed', w2: 'Active Review', w4: 'Active Review', w8: 'Active Review', w12: 'Closeout Screen' }
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '0.6rem', fontWeight: 600, color: 'var(--text-primary)' }}>{row.name}</td>
                      <td style={{ padding: '0.6rem', color: 'var(--teal-300)' }}>{row.s}</td>
                      <td style={{ padding: '0.6rem' }}>{row.b}</td>
                      <td style={{ padding: '0.6rem' }}>{row.w2}</td>
                      <td style={{ padding: '0.6rem' }}>{row.w4}</td>
                      <td style={{ padding: '0.6rem' }}>{row.w8}</td>
                      <td style={{ padding: '0.6rem', fontWeight: 600, color: 'var(--success-green)' }}>{row.w12}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Protocol Deviations Log */}
      {activeSubTab === 'deviations' && (
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', margin: 0 }}>
                Protocol Deviations Registry & CAPA Tracking
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>
                Classified according to GCP-ASU & CDSCO monitoring guidelines (Major vs Minor).
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {INITIAL_DEVIATIONS.map(dev => (
              <div 
                key={dev.id}
                style={{
                  background: 'rgba(0, 0, 0, 0.2)',
                  border: dev.type === 'Major' ? '1px solid rgba(225, 29, 72, 0.4)' : '1px solid var(--border-medium)',
                  borderLeft: dev.type === 'Major' ? '4px solid var(--sae-red)' : '4px solid var(--warn-amber)',
                  borderRadius: '0.5rem',
                  padding: '1rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="clinical-code">{dev.id}</span>
                    <span className={dev.type === 'Major' ? 'badge badge-red' : 'badge badge-amber'}>
                      {dev.type} Deviation
                    </span>
                    <span className="badge badge-teal">{dev.category}</span>
                  </div>
                  <div style={{ fontSize: '0.73rem', color: 'var(--text-muted)' }}>
                    Site: <strong>{dev.site}</strong> • Reported: {dev.reportedDate}
                  </div>
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  {dev.description}
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                  <strong>Scientific Impact:</strong> {dev.impact}
                </div>

                <div style={{
                  fontSize: '0.73rem',
                  background: 'rgba(13, 148, 136, 0.1)',
                  padding: '0.4rem 0.65rem',
                  borderRadius: '4px',
                  color: 'var(--teal-300)'
                }}>
                  <strong>Corrective & Preventive Action (CAPA):</strong> {dev.actionTaken}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Participant Directory & Prakriti */}
      {activeSubTab === 'subjects' && (
        <div className="card" style={{ padding: '1.25rem' }}>
          <h3 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            De-Identified Participant Registry & ABDM Health ID Integration
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Integrated with Ayushman Bharat Digital Mission (ABDM) ABHA token and Prakriti Pariksha categorization.
          </p>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-medium)', textAlign: 'left', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '0.6rem' }}>Subject ID</th>
                <th style={{ padding: '0.6rem' }}>ABHA Token (ABDM)</th>
                <th style={{ padding: '0.6rem' }}>Demographics</th>
                <th style={{ padding: '0.6rem' }}>Dosha Prakriti</th>
                <th style={{ padding: '0.6rem' }}>Allocated Arm</th>
                <th style={{ padding: '0.6rem' }}>Visit Stage</th>
                <th style={{ padding: '0.6rem' }}>eCRF Progress</th>
              </tr>
            </thead>
            <tbody>
              {syntheticSubjects.map((s, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '0.6rem' }}><span className="clinical-code">{s.id}</span></td>
                  <td style={{ padding: '0.6rem', color: 'var(--info-blue)', fontFamily: 'var(--font-mono)' }}>{s.abhaId}</td>
                  <td style={{ padding: '0.6rem' }}>{s.age}y / {s.gender}</td>
                  <td style={{ padding: '0.6rem' }}>
                    <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>
                      {s.prakriti}
                    </span>
                  </td>
                  <td style={{ padding: '0.6rem' }}>{s.arm}</td>
                  <td style={{ padding: '0.6rem', color: 'var(--teal-300)' }}>{s.visitStatus}</td>
                  <td style={{ padding: '0.6rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <div style={{ width: '60px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>
                        <div style={{ width: `${s.eCrfProgress}%`, height: '100%', background: 'var(--teal-500)', borderRadius: '4px' }} />
                      </div>
                      <span>{s.eCrfProgress}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
