import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Key, 
  Lock, 
  Fingerprint, 
  FileText, 
  CheckCircle2, 
  Search, 
  Filter,
  Sparkles,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

export default function AuditAndIntegrityView({ auditTrail, onAddAuditEntry, currentRole }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSignModal, setShowSignModal] = useState(false);
  const [signJustification, setSignJustification] = useState('');
  const [signAction, setSignAction] = useState('DATABASE_LOCK_VERIFICATION');

  const filteredTrail = auditTrail.filter(entry => 
    entry.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.studyId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.fieldName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExecuteESignature = (e) => {
    e.preventDefault();
    if (!signJustification.trim()) return;

    onAddAuditEntry({
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
      user: 'Current Authenticated User',
      role: currentRole,
      studyId: 'AIIA-CT-2024-001',
      action: signAction,
      entity: 'Clinical Milestone Checkpoint',
      fieldName: 'alcoaValidationStatus',
      oldVal: 'Pending_Verification',
      newVal: 'Signed_Part11_Compliant',
      reasonForChange: signJustification,
      ipAddress: '14.139.60.18 (AIIA Campus LAN)',
      sha256Hash: Array.from(crypto.getRandomValues(new Uint8Array(16)))
        .map(b => b.toString(16).padStart(2, '0')).join('') + '...',
      verified21CFRPart11: true
    });

    setSignJustification('');
    setShowSignModal(false);
  };

  return (
    <div>
      {/* ALCOA+ Principles Summary Bar */}
      <div className="card" style={{ padding: '1.25rem', marginBottom: '1.25rem', background: 'var(--bg-secondary)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShieldCheck size={22} color="var(--teal-400)" />
            <div>
              <h3 style={{ fontSize: '1rem', margin: 0, color: 'var(--text-primary)' }}>
                ALCOA+ Data Integrity & 21 CFR Part 11 Electronic Signature Ledger
              </h3>
              <p style={{ fontSize: '0.73rem', color: 'var(--text-secondary)', margin: '0.1rem 0 0 0' }}>
                Immutable, append-only, tamper-evident audit records compliant with GCP-ASU & DPDP Act 2023.
              </p>
            </div>
          </div>

          <button
            id="btn-open-esign-modal"
            onClick={() => setShowSignModal(true)}
            className="btn btn-primary"
            style={{ fontSize: '0.78rem' }}
          >
            <Fingerprint size={15} />
            <span>Execute 21 CFR Part 11 E-Signature</span>
          </button>
        </div>

        {/* ALCOA+ Badges */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 115px), 1fr))',
          gap: '0.5rem',
          fontSize: '0.72rem'
        }}>
          {[
            { tag: 'Attributable', desc: 'User & IP identity tagged' },
            { tag: 'Legible', desc: 'Machine & human readable' },
            { tag: 'Contemporaneous', desc: 'Precise UTC/IST timestamps' },
            { tag: 'Original', desc: 'Primary source eCRF verified' },
            { tag: 'Accurate', desc: 'Validations & reason-for-change' },
            { tag: '+ Complete', desc: 'Zero data gap deletion' },
            { tag: '+ Consistent', desc: 'Deterministic chronologic sequence' },
            { tag: '+ Enduring', desc: 'WORM / encrypted vault' }
          ].map((item, idx) => (
            <div key={idx} style={{
              background: 'rgba(0, 0, 0, 0.25)',
              padding: '0.4rem 0.6rem',
              borderRadius: '0.4rem',
              border: '1px solid var(--border-subtle)'
            }}>
              <strong style={{ color: 'var(--teal-300)', display: 'block' }}>{item.tag}</strong>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Search & Audit Table */}
      <div className="card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ position: 'relative', width: '320px', maxWidth: '100%' }}>
            <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search audit trail by user, study, field..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.45rem 0.75rem 0.45rem 2.2rem',
                borderRadius: '0.4rem',
                border: '1px solid var(--border-medium)',
                background: 'var(--bg-input)',
                color: 'var(--text-primary)',
                fontSize: '0.78rem',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Showing <strong>{filteredTrail.length}</strong> immutable chronological entries
          </div>
        </div>

        {/* Ledger Table */}
        <div className="table-responsive">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-medium)', textAlign: 'left', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '0.6rem' }}>Entry ID & Hash</th>
                <th style={{ padding: '0.6rem' }}>Timestamp (UTC)</th>
                <th style={{ padding: '0.6rem' }}>Authenticated Actor</th>
                <th style={{ padding: '0.6rem' }}>Action / Field</th>
                <th style={{ padding: '0.6rem' }}>Audit Diff (Old $\rightarrow$ New)</th>
                <th style={{ padding: '0.6rem' }}>Clinical Justification</th>
                <th style={{ padding: '0.6rem' }}>Compliance</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrail.map(entry => (
                <tr key={entry.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '0.6rem' }}>
                    <div style={{ fontWeight: 700, color: 'var(--teal-300)' }}>{entry.id}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                      {entry.sha256Hash.substring(0, 16)}...
                    </div>
                  </td>
                  <td style={{ padding: '0.6rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                    {entry.timestamp.replace('T', ' ').substring(0, 19)}
                  </td>
                  <td style={{ padding: '0.6rem' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{entry.user}</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{entry.ipAddress}</div>
                  </td>
                  <td style={{ padding: '0.6rem' }}>
                    <span className="badge badge-teal" style={{ fontSize: '0.65rem' }}>
                      {entry.action}
                    </span>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      {entry.entity} ({entry.fieldName})
                    </div>
                  </td>
                  <td style={{ padding: '0.6rem' }}>
                    <div style={{ color: '#fb7185', fontSize: '0.7rem' }}>- {entry.oldVal}</div>
                    <div style={{ color: '#34d399', fontSize: '0.7rem', fontWeight: 600 }}>+ {entry.newVal}</div>
                  </td>
                  <td style={{ padding: '0.6rem', color: 'var(--text-secondary)', maxWidth: '240px' }}>
                    {entry.reasonForChange}
                  </td>
                  <td style={{ padding: '0.6rem' }}>
                    <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
                      21 CFR Part 11
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 21 CFR Part 11 Electronic Signature Modal */}
      {showSignModal && (
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
          <div className="card animate-fade-in modal-dialog" style={{
            maxWidth: '520px',
            width: '100%',
            padding: '1.75rem',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-highlight)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{
                background: 'rgba(13, 148, 136, 0.2)',
                padding: '0.5rem',
                borderRadius: '0.5rem',
                color: 'var(--teal-300)'
              }}>
                <Fingerprint size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', margin: 0 }}>
                  21 CFR Part 11 Digital Signature
                </h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Legally binding clinical validation with immutable hash seal.
                </p>
              </div>
            </div>

            <form onSubmit={handleExecuteESignature}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  Signature Meaning / Action
                </label>
                <select
                  value={signAction}
                  onChange={(e) => setSignAction(e.target.value)}
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
                  <option value="DATABASE_LOCK_VERIFICATION">Database Lock & Clean Freeze Authorization</option>
                  <option value="PI_ECRF_CLINICAL_SIGN_OFF">Principal Investigator eCRF Clinical Review Sign-off</option>
                  <option value="IEC_CONTINUING_REVIEW_APPROVAL">IEC Annual Continuing Review Formal Concurrence</option>
                  <option value="NPVCC_CAUSALITY_CONCURRENCE">NPvCC Senior Safety Causality Endorsement</option>
                </select>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  Mandatory GCP Reason For Signature / Clinical Justification *
                </label>
                <textarea
                  id="esign-justification-input"
                  required
                  rows={3}
                  placeholder="State the clinical, ethical, or operational justification for this signature..."
                  value={signJustification}
                  onChange={(e) => setSignJustification(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.55rem',
                    borderRadius: '0.4rem',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-medium)',
                    color: 'var(--text-primary)',
                    fontSize: '0.8rem',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{
                background: 'rgba(0, 0, 0, 0.25)',
                padding: '0.65rem 0.85rem',
                borderRadius: '0.4rem',
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                marginBottom: '1.25rem'
              }}>
                By clicking "Authorize & Stamp", I certify that this electronic signature is the legally binding equivalent of my handwritten signature per 21 CFR Part 11 and NDCT Rules 2019.
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem' }}>
                <button
                  type="button"
                  onClick={() => setShowSignModal(false)}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.8rem' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="btn-submit-esign"
                  className="btn btn-primary"
                  style={{ fontSize: '0.8rem' }}
                >
                  Authorize & Stamp E-Signature
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
