import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Flame, 
  X, 
  Clock, 
  Sparkles, 
  AlertCircle,
  FileCheck2
} from 'lucide-react';

export default function ReportSaeModal({ 
  isOpen, 
  onClose, 
  studies, 
  onSubmitNewRecord,
  currentRole 
}) {
  const [studyId, setStudyId] = useState(studies[0].id);
  const [subjectId, setSubjectId] = useState('');
  const [aeTerm, setAeTerm] = useState('');
  const [medDraSOC, setMedDraSOC] = useState('Gastrointestinal disorders');
  const [severity, setSeverity] = useState('Moderate');
  const [isSAE, setIsSAE] = useState(true);
  const [seriousnessCriteria, setSeriousnessCriteria] = useState('Hospitalization Prolonged');
  const [causality, setCausality] = useState('Possible');
  const [batchNo, setBatchNo] = useState('GMP-BATCH-2024-09');
  const [actionTaken, setActionTaken] = useState('Study medication temporarily paused; patient monitored');
  const [outcome, setOutcome] = useState('Recovering');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subjectId.trim() || !aeTerm.trim()) return;

    const newId = isSAE 
      ? `SAE-2024-${Math.floor(100 + Math.random() * 900)}` 
      : `AE-2024-${Math.floor(100 + Math.random() * 900)}`;

    const newRecord = {
      id: newId,
      studyId,
      subjectId: subjectId.toUpperCase(),
      trialArm: 'Investigational ASU Regimen',
      aeTermReported: aeTerm,
      medDraPT: aeTerm,
      medDraSOC,
      medDraCode: '100' + Math.floor(10000 + Math.random() * 90000),
      severity,
      seriousnessCriteria: isSAE ? seriousnessCriteria : 'Non-Serious Event',
      isSAE,
      onsetTimestamp: new Date().toISOString(),
      reportedTimestamp: new Date().toISOString(),
      regClock24hDeadline: isSAE ? new Date(Date.now() + 24 * 3600 * 1000).toISOString() : 'N/A',
      regClock24hStatus: isSAE ? 'URGENT_ACTION_REQUIRED' : 'LOGGED',
      regClock14dDeadline: isSAE ? new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString() : 'N/A',
      regClock14dStatus: isSAE ? 'PENDING_CAUSALITY' : 'ROUTINE_MONITORING',
      whoUmcCausality: causality,
      naranjoScore: 5,
      investigationalProductBatch: batchNo,
      ayushHerbalDetails: {
        botanicalName: 'Standardized Ayurvedic Formulation (API Monograph Compliant)',
        heavyMetalsAnalysis: 'Verified within API Limits',
        microbialContamination: 'Passed testing'
      },
      actionTaken,
      outcome,
      reportedBy: `${currentRole} - Rapid Safety Reporter`,
      iecNotified: false,
      cdscoNotified: false,
      dsmbReviewRequested: isSAE
    };

    onSubmitNewRecord(newRecord);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      zIndex: 1000
    }}>
      <div className="card animate-fade-in" style={{
        maxWidth: '680px',
        width: '100%',
        maxHeight: '92vh',
        overflowY: 'auto',
        padding: '2rem',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-highlight)'
      }}>
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              background: 'rgba(225, 29, 72, 0.2)',
              padding: '0.5rem',
              borderRadius: '0.5rem',
              color: '#fb7185'
            }}>
              <Flame size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>
                Intake Form: Adverse Drug Reaction / SAE (NDCT Form CT-16)
              </h2>
              <p style={{ fontSize: '0.73rem', color: 'var(--text-secondary)', margin: '0.1rem 0 0 0' }}>
                NPvCC Expedited Safety Triage • Automatically triggers NDCT Rule 42 24h & 14d Regulatory Timers.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="btn btn-ghost" 
            style={{ padding: '0.35rem', borderRadius: '50%' }}
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Study & Subject */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                Target Clinical Trial *
              </label>
              <select
                value={studyId}
                onChange={(e) => setStudyId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem',
                  borderRadius: '0.4rem',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-primary)',
                  fontSize: '0.8rem'
                }}
              >
                {studies.map(s => (
                  <option key={s.id} value={s.id}>{s.protocolNumber} - {s.shortTitle}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                De-Identified Subject Identifier *
              </label>
              <input
                id="sae-subject-id-input"
                type="text"
                required
                placeholder="e.g. SUBJ-ASH-105"
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem',
                  borderRadius: '0.4rem',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-primary)',
                  fontSize: '0.8rem'
                }}
              />
            </div>
          </div>

          {/* Seriousness Checkbox */}
          <div style={{
            background: isSAE ? 'rgba(225, 29, 72, 0.12)' : 'rgba(0, 0, 0, 0.25)',
            border: isSAE ? '1px solid rgba(225, 29, 72, 0.4)' : '1px solid var(--border-subtle)',
            borderRadius: '0.5rem',
            padding: '0.85rem',
            marginBottom: '1rem'
          }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
              <input
                id="is-sae-checkbox"
                type="checkbox"
                checked={isSAE}
                onChange={(e) => setIsSAE(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: '#e11d48' }}
              />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: isSAE ? '#fb7185' : 'var(--text-primary)' }}>
                This is a Serious Adverse Event (SAE)
              </span>
            </label>
            {isSAE && (
              <div style={{ marginTop: '0.5rem', fontSize: '0.73rem', color: '#fca5a5' }}>
                ⚠️ <strong>Statutory Regulatory Warning:</strong> Marking as SAE starts the mandatory 24-hour countdown clock for initial reporting to CDSCO, Licensing Authority, and Institutional Ethics Committee under NDCT Rules 2019 Rule 42.
              </div>
            )}
          </div>

          {/* Adverse Event Term & MedDRA SOC */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                Adverse Event Clinical Term *
              </label>
              <input
                id="sae-term-input"
                type="text"
                required
                placeholder="e.g. Severe maculopapular rash, Transaminitis"
                value={aeTerm}
                onChange={(e) => setAeTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem',
                  borderRadius: '0.4rem',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-primary)',
                  fontSize: '0.8rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                MedDRA System Organ Class (SOC)
              </label>
              <select
                value={medDraSOC}
                onChange={(e) => setMedDraSOC(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem',
                  borderRadius: '0.4rem',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-primary)',
                  fontSize: '0.8rem'
                }}
              >
                <option value="Hepatobiliary disorders">Hepatobiliary disorders</option>
                <option value="Gastrointestinal disorders">Gastrointestinal disorders</option>
                <option value="Metabolism and nutrition disorders">Metabolism and nutrition disorders</option>
                <option value="Skin and subcutaneous tissue disorders">Skin and subcutaneous tissue disorders</option>
                <option value="Immune system disorders">Immune system disorders</option>
                <option value="Renal and urinary disorders">Renal and urinary disorders</option>
                <option value="General disorders and administration site conditions">General disorders</option>
              </select>
            </div>
          </div>

          {/* Causality & Batch */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                Severity
              </label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem',
                  borderRadius: '0.4rem',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-primary)',
                  fontSize: '0.8rem'
                }}
              >
                <option value="Mild (Grade 1)">Mild (Grade 1)</option>
                <option value="Moderate (Grade 2)">Moderate (Grade 2)</option>
                <option value="Severe (Grade 3)">Severe (Grade 3)</option>
                <option value="Life Threatening (Grade 4)">Life Threatening (Grade 4)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                WHO-UMC Causality
              </label>
              <select
                value={causality}
                onChange={(e) => setCausality(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem',
                  borderRadius: '0.4rem',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-primary)',
                  fontSize: '0.8rem'
                }}
              >
                <option value="Probable">Probable</option>
                <option value="Possible">Possible</option>
                <option value="Certain">Certain</option>
                <option value="Unlikely">Unlikely</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                Ayurvedic Drug Batch No
              </label>
              <input
                type="text"
                value={batchNo}
                onChange={(e) => setBatchNo(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem',
                  borderRadius: '0.4rem',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-primary)',
                  fontSize: '0.8rem'
                }}
              />
            </div>
          </div>

          {/* Action Taken & Outcome */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
              Action Taken with Investigational Product *
            </label>
            <input
              type="text"
              required
              value={actionTaken}
              onChange={(e) => setActionTaken(e.target.value)}
              style={{
                width: '100%',
                padding: '0.55rem',
                borderRadius: '0.4rem',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-medium)',
                color: 'var(--text-primary)',
                fontSize: '0.8rem',
                marginBottom: '0.75rem'
              }}
            />

            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
              Subject Clinical Outcome
            </label>
            <input
              type="text"
              value={outcome}
              onChange={(e) => setOutcome(e.target.value)}
              style={{
                width: '100%',
                padding: '0.55rem',
                borderRadius: '0.4rem',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-medium)',
                color: 'var(--text-primary)',
                fontSize: '0.8rem'
              }}
            />
          </div>

          {/* Submit Footer */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
              style={{ fontSize: '0.8rem' }}
            >
              Cancel
            </button>
            <button
              id="submit-sae-report-btn"
              type="submit"
              className={isSAE ? 'btn btn-danger' : 'btn btn-primary'}
              style={{ fontSize: '0.8rem' }}
            >
              <FileCheck2 size={15} />
              <span>{isSAE ? 'Commit SAE & Start 24h Clock' : 'Log Adverse Event'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
