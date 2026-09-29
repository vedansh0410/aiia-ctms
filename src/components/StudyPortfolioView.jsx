import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  ShieldAlert, 
  FileCheck2, 
  ChevronRight, 
  ExternalLink,
  BookOpen,
  Building,
  AlertCircle,
  Clock,
  Sparkles,
  CheckCircle2,
  X
} from 'lucide-react';

export default function StudyPortfolioView({ studies, onSelectStudy, onOpenReportSae }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [phaseFilter, setPhaseFilter] = useState('ALL');
  const [selectedStudyModal, setSelectedStudyModal] = useState(null);

  const filteredStudies = studies.filter(study => {
    const matchesSearch = 
      study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.ctriId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.protocolNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.investigationalProduct.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPhase = phaseFilter === 'ALL' || study.phase.includes(phaseFilter);

    return matchesSearch && matchesPhase;
  });

  return (
    <div>
      {/* Search & Filter Controls */}
      <div className="card" style={{ padding: '0.85rem 1.25rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          {/* Search Box */}
          <div style={{
            position: 'relative',
            flex: '1',
            minWidth: '280px',
            maxWidth: '500px'
          }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              id="study-search-input"
              type="text"
              placeholder="Search by Protocol, CTRI ID, Formulation (e.g. Ashwagandha, Kashaya)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.55rem 0.85rem 0.55rem 2.4rem',
                borderRadius: '0.5rem',
                border: '1px solid var(--border-medium)',
                background: 'var(--bg-input)',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Phase Filter Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginRight: '0.25rem' }}>
              Phase:
            </span>
            {['ALL', 'Phase II', 'Phase III', 'Phase IV'].map((phase) => (
              <button
                key={phase}
                onClick={() => setPhaseFilter(phase)}
                className={`btn ${phaseFilter === phase ? 'btn-primary' : 'btn-ghost'}`}
                style={{
                  fontSize: '0.75rem',
                  padding: '0.35rem 0.75rem',
                  border: phaseFilter === phase ? 'none' : '1px solid var(--border-subtle)'
                }}
              >
                {phase === 'ALL' ? 'All Phases' : phase}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Studies Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr))',
        gap: '1.25rem'
      }}>
        {filteredStudies.map((study) => {
          const accrualPct = Math.round((study.currentEnrolled / study.targetEnrollment) * 100);
          const hasSae = study.saeCount > 0;
          const isCtriFilingSoon = study.daysToCtriFiling <= 30;

          return (
            <div 
              key={study.id} 
              className="card"
              style={{
                padding: '1.35rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                borderLeft: hasSae ? '4px solid var(--sae-red)' : '4px solid var(--teal-500)',
                background: hasSae ? 'rgba(225, 29, 72, 0.03)' : 'var(--bg-card)'
              }}
            >
              {/* Header: IDs & Badges */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span className="clinical-code">{study.protocolNumber}</span>
                    <a 
                      href={`https://ctri.nic.in/Clinicaltrials/pmaindet2.php?trialid=${study.ctriId}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="badge badge-teal"
                      style={{ textDecoration: 'none', gap: '0.25rem' }}
                      title="Clinical Trials Registry - India (Public Trial Record)"
                    >
                      <span>{study.ctriId}</span>
                      <ExternalLink size={10} />
                    </a>
                    <span className="badge badge-blue">{study.phase}</span>
                  </div>

                  <span className={`badge ${study.statusClass}`}>
                    {study.status}
                  </span>
                </div>

                {/* Title & Short Title */}
                <h3 style={{ fontSize: '1.05rem', lineHeight: 1.35, marginBottom: '0.45rem', color: 'var(--text-primary)' }}>
                  {study.shortTitle}
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                  {study.title}
                </p>

                {/* Investigational Product & Classical Reference */}
                <div style={{
                  background: 'rgba(13, 148, 136, 0.08)',
                  border: '1px solid rgba(13, 148, 136, 0.2)',
                  borderRadius: '0.5rem',
                  padding: '0.65rem 0.85rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                    <Sparkles size={14} color="var(--teal-400)" />
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--teal-300)' }}>
                      Investigational Formulation:
                    </span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                    {study.investigationalProduct}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.3rem', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    <BookOpen size={12} color="var(--ayush-gold)" />
                    <span>Classical Authority: <em>{study.classicalReference}</em></span>
                  </div>
                </div>

                {/* Accrual Progress Bar */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.35rem' }}>
                    <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
                      Accrual Progress: <strong>{study.currentEnrolled}</strong> / {study.targetEnrollment} Subjects
                    </span>
                    <span style={{ color: accrualPct >= 80 ? 'var(--success-green)' : 'var(--warn-amber)', fontWeight: 700 }}>
                      {accrualPct}% Target Reached
                    </span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: '9999px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${accrualPct}%`,
                      height: '100%',
                      background: accrualPct >= 80 
                        ? 'linear-gradient(90deg, var(--teal-500), var(--success-green))'
                        : 'linear-gradient(90deg, var(--warn-amber), var(--teal-500))',
                      borderRadius: '9999px'
                    }} />
                  </div>
                </div>

                {/* Participating Sites Badges */}
                <div style={{ marginBottom: '0.9rem' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.3rem', textTransform: 'uppercase', fontWeight: 600 }}>
                    Participating Sites ({study.participatingSites.length}):
                  </div>
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                    {study.participatingSites.map((site, i) => (
                      <span key={i} style={{
                        fontSize: '0.7rem',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-secondary)'
                      }}>
                        {site.name.split(',')[0]} ({site.enrolled}/{site.target})
                      </span>
                    ))}
                  </div>
                </div>

                {/* Compliance & Regulatory Alerts */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '0.5rem',
                  fontSize: '0.72rem',
                  padding: '0.65rem 0',
                  borderTop: '1px solid var(--border-subtle)',
                  borderBottom: '1px solid var(--border-subtle)',
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Calendar size={13} color="var(--teal-400)" />
                    <span>IEC Renewal: <strong>{study.iecRenewalDate}</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Clock size={13} color={isCtriFilingSoon ? 'var(--warn-amber)' : 'var(--text-muted)'} />
                    <span style={{ color: isCtriFilingSoon ? 'var(--warn-amber)' : 'inherit' }}>
                      CTRI Update: <strong>{study.daysToCtriFiling} days</strong>
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <AlertCircle size={13} color={study.protocolDeviations.major > 0 ? 'var(--sae-red)' : 'var(--text-muted)'} />
                    <span>Deviations: <strong>{study.protocolDeviations.major} Major</strong>, {study.protocolDeviations.minor} Minor</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <ShieldAlert size={13} color={hasSae ? 'var(--sae-red)' : 'var(--success-green)'} />
                    <span style={{ color: hasSae ? '#fb7185' : 'inherit', fontWeight: hasSae ? 700 : 400 }}>
                      Safety: <strong>{study.saeCount} SAE</strong>, {study.aeCount} AEs
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                <div style={{ fontSize: '0.73rem', color: 'var(--text-muted)' }}>
                  Lead PI: <strong>{study.leadPi}</strong>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {hasSae && (
                    <button
                      onClick={onOpenReportSae}
                      className="btn btn-danger"
                      style={{ fontSize: '0.72rem', padding: '0.35rem 0.65rem' }}
                    >
                      <ShieldAlert size={13} />
                      <span>Review SAE Clock</span>
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedStudyModal(study)}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.72rem', padding: '0.35rem 0.65rem' }}
                  >
                    <span>Dossier & Details</span>
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comprehensive Study Dossier Modal */}
      {selectedStudyModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          zIndex: 1000
        }}>
          <div className="card animate-fade-in" style={{
            maxWidth: '850px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '2rem',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-highlight)'
          }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <span className="clinical-code">{selectedStudyModal.protocolNumber}</span>
                  <span className="badge badge-teal">{selectedStudyModal.ctriId}</span>
                  <span className="badge badge-gold">{selectedStudyModal.phase}</span>
                  <span className={`badge ${selectedStudyModal.statusClass}`}>{selectedStudyModal.status}</span>
                </div>
                <h2 style={{ fontSize: '1.25rem', lineHeight: 1.3 }}>
                  {selectedStudyModal.title}
                </h2>
              </div>
              <button 
                onClick={() => setSelectedStudyModal(null)}
                className="btn btn-ghost"
                style={{ padding: '0.35rem', borderRadius: '50%' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Dossier Content Tabs / Sections */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="card" style={{ padding: '1rem', background: 'var(--bg-card)' }}>
                <h4 style={{ fontSize: '0.85rem', marginBottom: '0.5rem', color: 'var(--teal-300)' }}>
                  Clinical Protocol Specifications
                </h4>
                <div style={{ fontSize: '0.78rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <div><strong>Study Design:</strong> {selectedStudyModal.studyType}</div>
                  <div><strong>Therapeutic Domain:</strong> {selectedStudyModal.therapeuticArea}</div>
                  <div><strong>Investigational Drug:</strong> {selectedStudyModal.investigationalProduct}</div>
                  <div><strong>Comparator / Control:</strong> {selectedStudyModal.comparator}</div>
                  <div><strong>Classical Reference:</strong> <em>{selectedStudyModal.classicalReference}</em></div>
                </div>
              </div>

              <div className="card" style={{ padding: '1rem', background: 'var(--bg-card)' }}>
                <h4 style={{ fontSize: '0.85rem', marginBottom: '0.5rem', color: 'var(--ayush-gold)' }}>
                  Endpoints & Objectives
                </h4>
                <div style={{ fontSize: '0.78rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <div><strong>Primary Endpoint:</strong> {selectedStudyModal.primaryEndpoint}</div>
                  <div><strong>Secondary Endpoints:</strong> {selectedStudyModal.secondaryEndpoints.join(', ')}</div>
                  <div><strong>Est. Database Lock:</strong> {selectedStudyModal.dataLockEstimated}</div>
                  <div><strong>Budget:</strong> {selectedStudyModal.budgetUtilized} of {selectedStudyModal.budgetAllocated}</div>
                </div>
              </div>
            </div>

            {/* Site Performance Breakdown */}
            <div className="card" style={{ padding: '1rem', marginBottom: '1.5rem', background: 'var(--bg-card)' }}>
              <h4 style={{ fontSize: '0.85rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                Multi-Centre Site Accrual & Investigator Directory
              </h4>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-medium)', textAlign: 'left', color: 'var(--text-secondary)' }}>
                    <th style={{ padding: '0.5rem' }}>Site Name</th>
                    <th style={{ padding: '0.5rem' }}>Principal Investigator</th>
                    <th style={{ padding: '0.5rem' }}>Target</th>
                    <th style={{ padding: '0.5rem' }}>Enrolled</th>
                    <th style={{ padding: '0.5rem' }}>Velocity</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedStudyModal.participatingSites.map((site, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '0.5rem', fontWeight: 600 }}>{site.name}</td>
                      <td style={{ padding: '0.5rem', color: 'var(--teal-300)' }}>{site.pi}</td>
                      <td style={{ padding: '0.5rem' }}>{site.target}</td>
                      <td style={{ padding: '0.5rem', fontWeight: 700 }}>{site.enrolled}</td>
                      <td style={{ padding: '0.5rem' }}>
                        <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
                          {Math.round((site.enrolled / site.target) * 100)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button 
                onClick={() => setSelectedStudyModal(null)}
                className="btn btn-secondary"
              >
                Close Dossier
              </button>
              <button 
                onClick={() => {
                  setSelectedStudyModal(null);
                  onOpenReportSae();
                }}
                className="btn btn-danger"
              >
                <ShieldAlert size={14} />
                <span>Log AE / SAE for this Study</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
