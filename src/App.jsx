import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import KpiOverview from './components/KpiOverview';
import StudyPortfolioView from './components/StudyPortfolioView';
import PharmacovigilanceView from './components/PharmacovigilanceView';
import OperationsAndSubjectsView from './components/OperationsAndSubjectsView';
import StandardsAndInteroperabilityView from './components/StandardsAndInteroperabilityView';
import AuditAndIntegrityView from './components/AuditAndIntegrityView';
import ReportSaeModal from './components/ReportSaeModal';

import { 
  INITIAL_STUDIES, 
  INITIAL_SAFETY_RECORDS, 
  INITIAL_AUDIT_TRAIL, 
  INITIAL_DEVIATIONS 
} from './data/clinicalTrialsData';

import { 
  FolderGit2, 
  ShieldAlert, 
  Users, 
  Database, 
  FileCheck2,
  Clock,
  Sparkles,
  CheckCircle2,
  BellRing
} from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [currentRole, setCurrentRole] = useState('DIRECTOR');
  const [activeTab, setActiveTab] = useState('portfolio');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Core Clinical State
  const [studies, setStudies] = useState(INITIAL_STUDIES);
  const [safetyRecords, setSafetyRecords] = useState(INITIAL_SAFETY_RECORDS);
  const [auditTrail, setAuditTrail] = useState(INITIAL_AUDIT_TRAIL);
  const [deviations, setDeviations] = useState(INITIAL_DEVIATIONS);

  // Dynamic Ticking Countdown for the 24-Hour NDCT 2019 Regulatory Clock
  const [secondsRemaining, setSecondsRemaining] = useState(16345); // ~4 hours 32 mins

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Real-time ticking clock
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Transmit Form CT-16 to CDSCO Action
  const handleTransmitToCdsco = (saeId) => {
    setSafetyRecords(prev => prev.map(rec => {
      if (rec.id === saeId) {
        return {
          ...rec,
          cdscoNotified: true,
          regClock24hStatus: 'TRANSMITTED_ON_TIME',
          regClock14dStatus: 'PENDING_CAUSALITY'
        };
      }
      return rec;
    }));

    // Add immutable audit entry
    const newAudit = {
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
      user: 'NPvCC Duty Officer',
      role: currentRole,
      studyId: 'AIIA-CT-2024-004',
      action: 'EXPEDITED_SAE_TRANSMITTED',
      entity: `Form CT-16 (${saeId})`,
      fieldName: 'cdscoTransmissionStatus',
      oldVal: 'Pending_Transmission',
      newVal: 'Transmitted_Ack_Received',
      reasonForChange: 'Mandatory 24-hour expedited initial safety alert dispatched to CDSCO and Ethics Committee per NDCT 2019 Rule 42',
      ipAddress: '14.139.60.18 (AIIA Campus LAN)',
      sha256Hash: Array.from(crypto.getRandomValues(new Uint8Array(16)))
        .map(b => b.toString(16).padStart(2, '0')).join('') + '...',
      verified21CFRPart11: true
    };
    setAuditTrail(prev => [newAudit, ...prev]);

    showToast(`Form CT-16 for ${saeId} successfully dispatched to CDSCO & IEC. Regulatory clock stopped.`);
  };

  // Report New Adverse Event / SAE
  const handleReportNewSafetyRecord = (newRecord) => {
    setSafetyRecords(prev => [newRecord, ...prev]);

    // Update study SAE count if serious
    if (newRecord.isSAE) {
      setStudies(prev => prev.map(s => {
        if (s.id === newRecord.studyId) {
          return { ...s, saeCount: s.saeCount + 1 };
        }
        return s;
      }));
    }

    // Add to audit trail
    const newAudit = {
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
      user: 'Reporting Investigator / Safety Officer',
      role: currentRole,
      studyId: newRecord.studyId,
      action: newRecord.isSAE ? 'EXPEDITED_SAE_LOGGED' : 'AE_RECORDED',
      entity: `Subject ${newRecord.subjectId}`,
      fieldName: 'safetyIntakeForm',
      oldVal: 'None',
      newVal: newRecord.aeTermReported,
      reasonForChange: `Initial clinical safety event logged with MedDRA coding: ${newRecord.medDraSOC}`,
      ipAddress: '14.139.60.18 (AIIA Campus LAN)',
      sha256Hash: Array.from(crypto.getRandomValues(new Uint8Array(16)))
        .map(b => b.toString(16).padStart(2, '0')).join('') + '...',
      verified21CFRPart11: true
    };
    setAuditTrail(prev => [newAudit, ...prev]);

    showToast(`${newRecord.isSAE ? 'Serious Adverse Event' : 'Adverse Event'} logged successfully.`);
  };

  // Add generic audit entry from E-signature modal
  const handleAddAuditEntry = (entry) => {
    setAuditTrail(prev => [entry, ...prev]);
    showToast(`21 CFR Part 11 Electronic Signature validated and sealed into immutable ledger.`);
  };

  const activeSaeCount = safetyRecords.filter(r => r.isSAE && r.regClock24hStatus === 'URGENT_ACTION_REQUIRED').length;

  return (
    <div className="app-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          background: 'var(--teal-800)',
          color: '#fff',
          padding: '0.85rem 1.25rem',
          borderRadius: '0.5rem',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--teal-400)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          zIndex: 2000,
          fontSize: '0.82rem',
          animation: 'fadeIn 0.25s ease'
        }}>
          <CheckCircle2 size={18} color="#5eead4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Header & Navigation */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        theme={theme}
        onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
        onOpenReportSae={() => setIsReportModalOpen(true)}
        activeSaeCount={activeSaeCount}
        urgentClockTimeRemaining={formatTime(secondsRemaining)}
      />

      {/* Main Viewport */}
      <main className="main-viewport">
        {/* Dynamic Role-Tailored KPI Bar */}
        <KpiOverview
          studies={studies}
          safetyRecords={safetyRecords}
          deviations={deviations}
          currentRole={currentRole}
          onTabChange={setActiveTab}
        />

        {/* Tab Navigation Pill Bar */}
        <div className="tab-pill-bar">
          {[
            { id: 'portfolio', label: 'Research Portfolio & Lifecycle', icon: FolderGit2, badge: `${studies.length}` },
            { id: 'safety', label: 'NPvCC Pharmacovigilance & Safety', icon: ShieldAlert, badge: activeSaeCount > 0 ? 'Urgent Clock' : 'Normal', badgeAlert: activeSaeCount > 0 },
            { id: 'operations', label: 'Trial Operations & SoA Funnel', icon: Users },
            { id: 'standards', label: 'CDISC & HL7 FHIR Interoperability', icon: Database, badge: 'Define-XML' },
            { id: 'audit', label: 'ALCOA+ Audit Trail & Governance', icon: FileCheck2, badge: '21 CFR Part 11' }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`btn ${isActive ? 'btn-primary' : 'btn-ghost'}`}
                style={{
                  fontSize: '0.82rem',
                  padding: '0.55rem 1rem',
                  borderRadius: '0.5rem',
                  border: isActive ? 'none' : '1px solid transparent'
                }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={tab.badgeAlert ? 'badge badge-red pulse-red-badge' : 'badge badge-teal'} style={{ fontSize: '0.65rem' }}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Tab View Rendering */}
        <div className="tab-content-area">
          {activeTab === 'portfolio' && (
            <StudyPortfolioView
              studies={studies}
              onOpenReportSae={() => setIsReportModalOpen(true)}
            />
          )}

          {activeTab === 'safety' && (
            <PharmacovigilanceView
              safetyRecords={safetyRecords}
              onTransmitToCdsco={handleTransmitToCdsco}
              onOpenReportModal={() => setIsReportModalOpen(true)}
              urgentClockTimeRemaining={formatTime(secondsRemaining)}
            />
          )}

          {activeTab === 'operations' && (
            <OperationsAndSubjectsView
              studies={studies}
            />
          )}

          {activeTab === 'standards' && (
            <StandardsAndInteroperabilityView />
          )}

          {activeTab === 'audit' && (
            <AuditAndIntegrityView
              auditTrail={auditTrail}
              onAddAuditEntry={handleAddAuditEntry}
              currentRole={currentRole}
            />
          )}
        </div>
      </main>

      {/* Emergency Report AE / SAE Modal */}
      <ReportSaeModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        studies={studies}
        onSubmitNewRecord={handleReportNewSafetyRecord}
        currentRole={currentRole}
      />
    </div>
  );
}
