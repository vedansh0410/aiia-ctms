import React, { useState } from 'react';
import { 
  FileCode, 
  Download, 
  Database, 
  Share2, 
  CheckCircle, 
  Copy, 
  ExternalLink,
  Layers,
  Sparkles,
  FileCheck
} from 'lucide-react';
import { CDISC_SDTM_DATA } from '../data/clinicalTrialsData';

export default function StandardsAndInteroperabilityView() {
  const [activeStandard, setActiveStandard] = useState('sdtm');
  const [selectedDomain, setSelectedDomain] = useState('DM');
  const [selectedFhirResource, setSelectedFhirResource] = useState('ResearchStudy');
  const [copied, setCopied] = useState(false);

  // FHIR R4 Synthetic Resources
  const fhirResources = {
    ResearchStudy: {
      resourceType: "ResearchStudy",
      id: "aiia-ct-2024-001",
      identifier: [
        { use: "official", system: "https://ctri.nic.in", value: "CTRI/2024/03/064210" },
        { use: "secondary", system: "https://aiia.gov.in/protocols", value: "AIIA/KAYA/2024/01" }
      ],
      title: "Evaluation of Standardized Withania somnifera Extract vs Placebo in Post-Viral Fatigue",
      status: "active",
      phase: {
        coding: [{ system: "http://terminology.hl7.org/CodeSystem/research-study-phase", code: "phase-3", display: "Phase 3" }]
      },
      category: [{ text: "Ayurveda - Kayachikitsa" }],
      focus: [{ text: "Withania somnifera (Ashwagandha)" }],
      sponsor: { display: "All India Institute of Ayurveda (AIIA)" },
      principalInvestigator: { display: "Dr. Anand Kumar, MD (Ayu)" },
      site: [
        { display: "All India Institute of Ayurveda, New Delhi" },
        { display: "IPGT&RA, Jamnagar" },
        { display: "National Institute of Ayurveda, Jaipur" }
      ]
    },
    ResearchSubject: {
      resourceType: "ResearchSubject",
      id: "subj-aiia-001-001",
      identifier: [{ system: "https://aiia.gov.in/subjects", value: "AIIA-001-001" }],
      status: "active",
      period: { start: "2024-03-15" },
      study: { reference: "ResearchStudy/aiia-ct-2024-001" },
      individual: {
        reference: "Patient/patient-delhi-882",
        display: "De-identified Participant (ABHA: 91-4521-8890-12)"
      },
      assignedArm: "Ashwagandha Extract 500mg BID",
      actualArm: "Ashwagandha Extract 500mg BID"
    },
    AdverseEvent: {
      resourceType: "AdverseEvent",
      id: "ae-2024-001",
      identifier: [{ system: "https://aiia.gov.in/npvcc", value: "SAE-2024-001" }],
      actuality: "actual",
      category: [{ coding: [{ system: "http://terminology.hl7.org/CodeSystem/adverse-event-category", code: "product-use-error", display: "Adverse Drug Reaction" }] }],
      event: {
        coding: [{ system: "https://www.meddra.org", code: "10072268", display: "Drug-induced liver injury" }],
        text: "Drug-Induced Liver Injury (Grade 3 Transaminitis)"
      },
      subject: { reference: "Patient/SUBJ-SG-042" },
      date: "2026-09-28T16:30:00Z",
      seriousness: {
        coding: [{ system: "http://terminology.hl7.org/CodeSystem/adverse-event-seriousness", code: "serious", display: "Serious" }]
      },
      outcome: { coding: [{ system: "http://terminology.hl7.org/CodeSystem/adverse-event-outcome", code: "recovering", display: "Recovering" }] },
      recorder: { display: "Dr. Suresh Kumar, PI" },
      suspectEntity: [
        {
          instance: { display: "Shallaki-Guggulu Extract (Batch SG-GMP-2024-B04)" },
          causality: [{ assessmentMethod: { text: "WHO-UMC Causality Scale" }, result: { text: "Possible" } }]
        }
      ]
    }
  };

  // Define-XML 2.0 Sample
  const defineXmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<ODM xmlns="http://www.cdisc.org/ns/odm/v1.3"
     xmlns:def="http://www.cdisc.org/ns/def/v2.0"
     FileOID="AIIA.CTMS.SDTM.DEFINE.2.0"
     CreationDateTime="2026-09-29T10:00:00Z">
  <Study OID="AIIA-CT-2024-001">
    <GlobalVariables>
      <StudyName>Ashwagandha in Post-Viral Fatigue (Phase III)</StudyName>
      <StudyDescription>Standardized Withania somnifera Extract in Chronic Asthenia</StudyDescription>
      <ProtocolName>AIIA/KAYA/2024/01</ProtocolName>
    </GlobalVariables>
    <MetaDataVersion OID="MDV.AIIA.SDTM.3.3" Name="AIIA SDTM v3.3 Metadata">
      <!-- Standard CDISC Domains: DM, AE, VS, CM -->
      <ItemGroupDef OID="IG.DM" Name="DM" Repeating="No" IsReferenceData="No" SASDatasetName="DM" def:Structure="One record per subject" def:Class="SPECIAL PURPOSE">
        <ItemRef ItemOID="IT.STUDYID" Mandatory="Yes"/>
        <ItemRef ItemOID="IT.DOMAIN" Mandatory="Yes"/>
        <ItemRef ItemOID="IT.USUBJID" Mandatory="Yes" KeySequence="1"/>
        <ItemRef ItemOID="IT.AGE" Mandatory="Yes"/>
        <ItemRef ItemOID="IT.SEX" Mandatory="Yes"/>
        <ItemRef ItemOID="IT.ARM" Mandatory="Yes"/>
      </ItemGroupDef>
      <ItemGroupDef OID="IG.AE" Name="AE" Repeating="Yes" IsReferenceData="No" SASDatasetName="AE" def:Structure="One record per adverse event" def:Class="EVENTS">
        <ItemRef ItemOID="IT.STUDYID" Mandatory="Yes"/>
        <ItemRef ItemOID="IT.USUBJID" Mandatory="Yes"/>
        <ItemRef ItemOID="IT.AETERM" Mandatory="Yes"/>
        <ItemRef ItemOID="IT.AEDECOD" Mandatory="Yes"/>
        <ItemRef ItemOID="IT.AEBODSYS" Mandatory="Yes"/>
        <ItemRef ItemOID="IT.AESER" Mandatory="Yes"/>
      </ItemGroupDef>
    </MetaDataVersion>
  </Study>
</ODM>`;

  // CSV Exporter
  const handleExportCsv = () => {
    const data = CDISC_SDTM_DATA[selectedDomain];
    if (!data || data.length === 0) return;
    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];
    data.forEach(row => {
      const values = headers.map(h => `"${row[h] || ''}"`);
      csvRows.push(values.join(','));
    });
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CDISC_SDTM_${selectedDomain}_AIIA.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // JSON Exporter
  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(CDISC_SDTM_DATA, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AIIA_CDISC_SDTM_Package.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Define-XML Download
  const handleExportDefineXml = () => {
    const blob = new Blob([defineXmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `define_v2_0.xml`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      {/* Standards Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {[
            { id: 'sdtm', label: 'CDISC SDTM Tabulation', icon: Database },
            { id: 'define', label: 'Define-XML 2.0 Metadata', icon: FileCode },
            { id: 'fhir', label: 'HL7 FHIR R4 & ABDM APIs', icon: Share2 }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveStandard(tab.id)}
                className={`btn ${activeStandard === tab.id ? 'btn-primary' : 'btn-ghost'}`}
                style={{ fontSize: '0.78rem', padding: '0.4rem 0.85rem', border: activeStandard === tab.id ? 'none' : '1px solid var(--border-subtle)' }}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button 
            id="btn-export-sdtm-json"
            onClick={handleExportJson}
            className="btn btn-secondary"
            style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
          >
            <Download size={13} />
            <span>Export Full SDTM JSON</span>
          </button>
          <button 
            id="btn-export-define-xml"
            onClick={handleExportDefineXml}
            className="btn btn-primary"
            style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
          >
            <Download size={13} />
            <span>Download Define-XML 2.0</span>
          </button>
        </div>
      </div>

      {/* Tab 1: CDISC SDTM Viewer */}
      {activeStandard === 'sdtm' && (
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h3 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', margin: 0 }}>
                CDISC Study Data Tabulation Model (SDTM v3.3)
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>
                Standardized submission datasets ready for regulatory filing (CDSCO / US FDA / PMDA).
              </p>
            </div>

            {/* Domain Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Domain:</span>
              {['DM', 'AE', 'VS', 'CM'].map(d => (
                <button
                  key={d}
                  onClick={() => setSelectedDomain(d)}
                  className={`btn ${selectedDomain === d ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', border: selectedDomain === d ? 'none' : '1px solid var(--border-subtle)' }}
                >
                  {d}
                </button>
              ))}

              <button
                id="btn-export-domain-csv"
                onClick={handleExportCsv}
                className="btn btn-secondary"
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}
              >
                <Download size={13} />
                <span>Export {selectedDomain}.csv</span>
              </button>
            </div>
          </div>

          {/* Table display */}
          <div className="table-responsive">
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-medium)', textAlign: 'left', color: 'var(--teal-400)' }}>
                  {Object.keys(CDISC_SDTM_DATA[selectedDomain][0] || {}).map((col, idx) => (
                    <th key={idx} style={{ padding: '0.55rem' }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CDISC_SDTM_DATA[selectedDomain].map((row, rIdx) => (
                  <tr key={rIdx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    {Object.values(row).map((val, cIdx) => (
                      <td key={cIdx} style={{ padding: '0.55rem', whiteSpace: 'nowrap' }}>
                        {String(val)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Define-XML 2.0 Metadata */}
      {activeStandard === 'define' && (
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <div>
              <h3 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', margin: 0 }}>
                Define-XML 2.0 (CDISC Electronic Data Dictionary)
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>
                Machine-readable metadata specification transmitting variable definitions, code lists, and derivations.
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(defineXmlContent)}
              className="btn btn-secondary"
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
            >
              {copied ? <CheckCircle size={13} color="var(--success-green)" /> : <Copy size={13} />}
              <span>{copied ? 'Copied XML!' : 'Copy XML'}</span>
            </button>
          </div>

          <pre style={{
            background: 'var(--bg-secondary)',
            padding: '1rem',
            borderRadius: '0.5rem',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            color: '#a7f3d0',
            overflowX: 'auto',
            maxHeight: '400px'
          }}>
            {defineXmlContent}
          </pre>
        </div>
      )}

      {/* Tab 3: HL7 FHIR R4 & ABDM Building Blocks */}
      {activeStandard === 'fhir' && (
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h3 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', margin: 0 }}>
                HL7 FHIR R4 Clinical Research Resources & ABDM Interoperability
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>
                Standards-compliant REST payloads supporting ABDM Ayushman Bharat Digital Mission M1/M2/M3 bridges.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {['ResearchStudy', 'ResearchSubject', 'AdverseEvent'].map(res => (
                <button
                  key={res}
                  onClick={() => setSelectedFhirResource(res)}
                  className={`btn ${selectedFhirResource === res ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', border: selectedFhirResource === res ? 'none' : '1px solid var(--border-subtle)' }}
                >
                  {res}
                </button>
              ))}
            </div>
          </div>

          <pre style={{
            background: 'var(--bg-secondary)',
            padding: '1rem',
            borderRadius: '0.5rem',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            color: '#67e8f9',
            overflowX: 'auto',
            maxHeight: '400px'
          }}>
            {JSON.stringify(fhirResources[selectedFhirResource], null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
