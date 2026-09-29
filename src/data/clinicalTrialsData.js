// ============================================================================
// AIIA CTMS - Synthetic Clinical Trials, NPvCC Safety & CDISC / FHIR Models
// All data is clinically representative, de-identified and synthetic.
// Compliant with GCP-ASU, ICMR Ethical Guidelines, CTRI, NDCT Rules 2019.
// ============================================================================

export const USER_ROLES = [
  {
    id: 'DIRECTOR',
    label: 'Institutional Leadership / Director',
    badge: 'Executive',
    badgeClass: 'badge-gold',
    personaName: 'Prof. (Dr.) Tanuja Nesari',
    designation: 'Director, All India Institute of Ayurveda',
    description: 'Macro portfolio oversight, site accrual velocity, institutional compliance, and safety alerts.'
  },
  {
    id: 'PI',
    label: 'Principal Investigator (PI)',
    badge: 'Clinical Lead',
    badgeClass: 'badge-teal',
    personaName: 'Dr. Anand Kumar, MD (Ayu)',
    designation: 'Head, Dept. of Kayachikitsa & Lead PI',
    description: 'Protocol oversight, subject safety sign-offs, eCRF reviews, and protocol deviation management.'
  },
  {
    id: 'CRC',
    label: 'Study Coordinator (CRC)',
    badge: 'Operations',
    badgeClass: 'badge-blue',
    personaName: 'Dr. Priya Sharma, BAMS, CCRP',
    designation: 'Senior Clinical Research Coordinator',
    description: 'Participant screening, Schedule of Assessments (SoA) visit tracking, and eCRF data entry.'
  },
  {
    id: 'CRA',
    label: 'Monitor / Clinical Research Associate (CRA)',
    badge: 'Quality/SDR',
    badgeClass: 'badge-amber',
    personaName: 'Vikram Mehta, M.Pharm',
    designation: 'Lead Clinical Monitor & Quality Auditor',
    description: 'Source Data Verification (SDV), site monitoring reports, and protocol deviation tracking.'
  },
  {
    id: 'IEC',
    label: 'Institutional Ethics Committee (IEC)',
    badge: 'Ethics Oversight',
    badgeClass: 'badge-emerald',
    personaName: 'Dr. K. S. Murthy, Ph.D.',
    designation: 'Member Secretary, Institutional Ethics Committee',
    description: 'Protocol approval gating, continuing reviews, informed consent verifications, and SAE reports.'
  },
  {
    id: 'NPVCC',
    label: 'NPvCC Pharmacovigilance Officer',
    badge: 'Safety / NPvCC',
    badgeClass: 'badge-red',
    personaName: 'Dr. Meera Nambiar, MD (Ayu)',
    designation: 'Coordinator, National Pharmacovigilance Centre (NPvCC)',
    description: 'National ASU&H ADR triage, 24h/14d regulatory clocks, MedDRA/WHO-Drug coding, and DSMB alerts.'
  },
  {
    id: 'AUDITOR',
    label: 'CDSCO Regulator / Inspector (Read-Only)',
    badge: 'Auditor',
    badgeClass: 'badge-teal',
    personaName: 'Central Drugs Standard Control Org.',
    designation: 'Senior Drugs Inspector, CDSCO Ayush Wing',
    description: 'Immutable ALCOA+ audit trails, 21 CFR Part 11 e-signatures, and CDISC SDTM/Define-XML packages.'
  }
];

export const INITIAL_STUDIES = [
  {
    id: 'AIIA-CT-2024-001',
    protocolNumber: 'AIIA/KAYA/2024/01',
    ctriId: 'CTRI/2024/03/064210',
    title: 'Evaluation of Standardized Withania somnifera (Ashwagandha) Root Extract vs Placebo in Post-Viral Fatigue & Chronic Asthenia',
    shortTitle: 'Ashwagandha in Post-Viral Fatigue (Phase III)',
    phase: 'Phase III',
    studyType: 'Interventional Randomized Double-Blind Multi-Centre',
    therapeuticArea: 'Kayachikitsa (Internal Medicine) / Immunology',
    investigationalProduct: 'Ashwagandha Extract (500mg BID, standardized to 5% withanolides)',
    comparator: 'Identical Microcrystalline Cellulose Placebo Capsule',
    classicalReference: 'Charaka Samhita, Sutrasthana 4/13 (Balya Mahakashaya)',
    status: 'Recruiting',
    statusClass: 'badge-emerald',
    leadPi: 'Dr. Anand Kumar, MD (Ayu)',
    leadCenter: 'AIIA New Delhi',
    participatingSites: [
      { name: 'AIIA, New Delhi (Apex)', target: 90, enrolled: 78, pi: 'Dr. Anand Kumar' },
      { name: 'IPGT&RA, Jamnagar (Gujarat)', target: 50, enrolled: 44, pi: 'Dr. H. M. Chandola' },
      { name: 'NIA, Jaipur (Rajasthan)', target: 50, enrolled: 41, pi: 'Dr. Sanjeev Sharma' },
      { name: 'Faculty of Ayurveda, IMS BHU (Varanasi)', target: 50, enrolled: 32, pi: 'Dr. P. S. Byadgi' }
    ],
    targetEnrollment: 240,
    currentEnrolled: 195,
    screened: 278,
    randomized: 195,
    completed: 112,
    discontinued: 9,
    iecApprovalDate: '2024-02-14',
    iecRenewalDate: '2025-02-13',
    ctriRegDate: '2024-03-01',
    lastCtriUpdate: '2024-08-15',
    daysToCtriFiling: 45, // days until next mandatory 6-month status filing
    primaryEndpoint: 'Mean change in Chalder Fatigue Scale (CFS-11) score from Baseline to Week 12',
    secondaryEndpoints: ['Serum Cortisol levels', 'WHO-QOL BREF score', 'Ojas assessment scale'],
    protocolDeviations: { major: 1, minor: 4 },
    openDataQueries: 3,
    monitoringVisitDate: '2024-09-12',
    nextMonitoringDate: '2024-10-15',
    saeCount: 0,
    aeCount: 14,
    budgetAllocated: '₹ 1.45 Cr',
    budgetUtilized: '₹ 88.5 L',
    dataLockEstimated: '2025-06-30'
  },
  {
    id: 'AIIA-CT-2024-002',
    protocolNumber: 'AIIA/PANC/2024/03',
    ctriId: 'CTRI/2024/01/061180',
    title: 'Randomized Controlled Trial of Nishakathakadi Kashaya as Adjuvant to Metformin in Newly Diagnosed Type 2 Diabetes Mellitus (Madhumeha)',
    shortTitle: 'Nishakathakadi Kashaya in Type 2 Diabetes (Phase IIb)',
    phase: 'Phase IIb',
    studyType: 'Interventional Parallel-Group Active-Controlled',
    therapeuticArea: 'Prameha / Metabolic Disorders',
    investigationalProduct: 'Nishakathakadi Kashaya Tablet (1000mg BID)',
    comparator: 'Metformin 500mg alone',
    classicalReference: 'Sahasrayogam, Kashaya Prakarana 42',
    status: 'Active Follow-up',
    statusClass: 'badge-teal',
    leadPi: 'Dr. Rama Kant Sharma, MD (Ayu)',
    leadCenter: 'AIIA New Delhi',
    participatingSites: [
      { name: 'AIIA, New Delhi (Apex)', target: 120, enrolled: 120, pi: 'Dr. Rama Kant Sharma' },
      { name: 'Govt. Ayurveda College, Thiruvananthapuram', target: 60, enrolled: 60, pi: 'Dr. S. Gopakumar' }
    ],
    targetEnrollment: 180,
    currentEnrolled: 180,
    screened: 215,
    randomized: 180,
    completed: 142,
    discontinued: 6,
    iecApprovalDate: '2023-12-18',
    iecRenewalDate: '2024-12-17',
    ctriRegDate: '2024-01-10',
    lastCtriUpdate: '2024-07-02',
    daysToCtriFiling: 72,
    primaryEndpoint: 'Absolute reduction in Glycated Hemoglobin (HbA1c) at Week 16 vs Baseline',
    secondaryEndpoints: ['Fasting Blood Glucose', 'HOMA-IR Insulin Sensitivity', 'Prakriti stability'],
    protocolDeviations: { major: 0, minor: 2 },
    openDataQueries: 1,
    monitoringVisitDate: '2024-09-01',
    nextMonitoringDate: '2024-11-10',
    saeCount: 1, // Non-fatal hypoglycemia
    aeCount: 8,
    budgetAllocated: '₹ 95.0 L',
    budgetUtilized: '₹ 76.2 L',
    dataLockEstimated: '2025-01-31'
  },
  {
    id: 'AIIA-CT-2023-005',
    protocolNumber: 'AIIA/RSBK/2023/12',
    ctriId: 'CTRI/2023/11/059842',
    title: 'Prospective Multi-Centric Observational Safety and Pharmacovigilance Cohort Registry of Classical Herbo-Mineral Preparations (Rasa Aushadhies) in Amavata',
    shortTitle: 'Rasa Aushadhi Long-Term Safety Registry (Amavata)',
    phase: 'Phase IV Registry',
    studyType: 'Prospective Observational Safety Registry / NPvCC Active Surveillance',
    therapeuticArea: 'Rasashastra & Bhasma Safety / Rheumatology',
    investigationalProduct: 'Swarna Sameerpannaga Rasa & Maha Yograj Guggulu (Standardized GMP batches)',
    comparator: 'Non-comparative longitudinal registry',
    classicalReference: 'Rasendra Sara Sangraha, Amavata Rogadhikara',
    status: 'Recruiting',
    statusClass: 'badge-emerald',
    leadPi: 'Prof. (Dr.) Galib, MD (Ayu), Ph.D.',
    leadCenter: 'AIIA New Delhi (NPvCC Host)',
    participatingSites: [
      { name: 'AIIA, New Delhi', target: 200, enrolled: 168, pi: 'Prof. Galib' },
      { name: 'SDM College of Ayurveda, Udupi', target: 150, enrolled: 132, pi: 'Dr. Ravindra Angadi' },
      { name: 'Govt. Akhandanand Ayurveda College, Ahmedabad', target: 150, enrolled: 110, pi: 'Dr. Kalpesh Panara' }
    ],
    targetEnrollment: 500,
    currentEnrolled: 410,
    screened: 440,
    randomized: 410,
    completed: 280,
    discontinued: 14,
    iecApprovalDate: '2023-10-05',
    iecRenewalDate: '2024-10-04', // 5 days left!
    ctriRegDate: '2023-11-20',
    lastCtriUpdate: '2024-05-18',
    daysToCtriFiling: 12, // Alert! CTRI update due
    primaryEndpoint: 'Renal (Serum Creatinine, eGFR) and Hepatic (SGOT, SGPT, ALP) biomonitoring at 3, 6, and 12 months',
    secondaryEndpoints: ['Heavy metal blood concentrations (Pb, Hg, As by ICP-MS)', 'DAS-28 Remission'],
    protocolDeviations: { major: 0, minor: 7 },
    openDataQueries: 6,
    monitoringVisitDate: '2024-08-20',
    nextMonitoringDate: '2024-10-02',
    saeCount: 0,
    aeCount: 22,
    budgetAllocated: '₹ 1.80 Cr',
    budgetUtilized: '₹ 1.25 Cr',
    dataLockEstimated: '2025-11-30'
  },
  {
    id: 'AIIA-CT-2024-004',
    protocolNumber: 'AIIA/SHAL/2024/02',
    ctriId: 'CTRI/2024/05/067520',
    title: 'Phase II Double-Blind Clinical Investigation of Standardized Shallaki-Guggulu Extract in Primary Osteoarthritis of the Knee (Sandhigata Vata)',
    shortTitle: 'Shallaki-Guggulu in Knee Osteoarthritis (Phase II)',
    phase: 'Phase II',
    studyType: 'Interventional Double-Blind Controlled Trial',
    therapeuticArea: 'Shalya / Musculoskeletal (Sandhigata Vata)',
    investigationalProduct: 'Shallaki (Boswellia serrata 300mg) + Guggulu (Commiphora mukul 200mg)',
    comparator: 'Active control: Glucosamine Sulfate (1500mg OD)',
    classicalReference: 'Bhavaprakasha Nighantu, Vatadi Varga',
    status: 'Active / NPvCC Red Alert',
    statusClass: 'badge-red',
    leadPi: 'Dr. Suresh Kumar, MD (Ayu)',
    leadCenter: 'AIIA New Delhi',
    participatingSites: [
      { name: 'AIIA, New Delhi', target: 80, enrolled: 52, pi: 'Dr. Suresh Kumar' },
      { name: 'National Institute of Ayurveda (NIA), Jaipur', target: 40, enrolled: 24, pi: 'Dr. B. K. Sevatkar' }
    ],
    targetEnrollment: 120,
    currentEnrolled: 76,
    screened: 98,
    randomized: 76,
    completed: 38,
    discontinued: 5,
    iecApprovalDate: '2024-04-10',
    iecRenewalDate: '2025-04-09',
    ctriRegDate: '2024-05-02',
    lastCtriUpdate: '2024-06-15',
    daysToCtriFiling: 88,
    primaryEndpoint: 'Change in WOMAC Osteoarthritis Index Total Score at Week 12',
    secondaryEndpoints: ['VAS Pain Score', 'Knee Joint Range of Motion (ROM)', 'Paracetamol rescue count'],
    protocolDeviations: { major: 2, minor: 3 },
    openDataQueries: 4,
    monitoringVisitDate: '2024-09-18',
    nextMonitoringDate: '2024-10-25',
    saeCount: 1, // Serious Adverse Event - Ticking Clock!
    aeCount: 9,
    budgetAllocated: '₹ 75.0 L',
    budgetUtilized: '₹ 38.4 L',
    dataLockEstimated: '2025-08-31'
  }
];

// Active Pharmacovigilance & NPvCC AE / SAE Records
export const INITIAL_SAFETY_RECORDS = [
  {
    id: 'SAE-2024-001',
    studyId: 'AIIA-CT-2024-004',
    subjectId: 'SUBJ-SG-042',
    trialArm: 'Shallaki-Guggulu Extract (500mg BID)',
    aeTermReported: 'Drug-Induced Liver Injury (Grade 3 Transaminitis)',
    medDraPT: 'Drug-induced liver injury',
    medDraSOC: 'Hepatobiliary disorders',
    medDraCode: '10072268',
    severity: 'Severe (Grade 3)',
    seriousnessCriteria: 'Hospitalization / Medically Significant',
    isSAE: true,
    onsetTimestamp: '2026-09-28T16:30:00Z', // Occurred ~19 hours ago
    reportedTimestamp: '2026-09-29T08:00:00Z',
    // Regulatory 24-Hour Initial CDSCO/IEC Clock (NDCT Rules 2019 Rule 42)
    // 24 hours deadline from onset
    regClock24hDeadline: '2026-09-29T16:30:00Z',
    regClock24hStatus: 'URGENT_ACTION_REQUIRED', // 4 hours 45 mins left!
    // 14-Day Comprehensive Form CT-17 Report Deadline
    regClock14dDeadline: '2026-10-12T16:30:00Z',
    regClock14dStatus: 'PENDING_CAUSALITY',
    whoUmcCausality: 'Possible',
    naranjoScore: 5,
    investigationalProductBatch: 'SG-GMP-2024-B04',
    ayushHerbalDetails: {
      botanicalName: 'Boswellia serrata + Commiphora mukul',
      heavyMetalsAnalysis: 'Within Ayurvedic Pharmacopoeia of India (API) permissible limits',
      microbialContamination: 'Nil detected',
      aflatoxins: 'Negative'
    },
    actionTaken: 'Study drug permanently withdrawn; Patient admitted to AIIA Kayachikitsa HDU; Liver function tests monitored daily; NAC infusion given.',
    outcome: 'Recovering / Transaminases trending downward (SGPT dropped from 420 to 210 U/L)',
    reportedBy: 'Dr. Suresh Kumar, PI',
    iecNotified: true,
    cdscoNotified: false, // Needs one-click transmission
    dsmbReviewRequested: true
  },
  {
    id: 'SAE-2024-002',
    studyId: 'AIIA-CT-2024-002',
    subjectId: 'SUBJ-NK-018',
    trialArm: 'Nishakathakadi Kashaya + Metformin 500mg',
    aeTermReported: 'Symptomatic Hypoglycemia requiring IV Dextrose',
    medDraPT: 'Hypoglycaemia',
    medDraSOC: 'Metabolism and nutrition disorders',
    medDraCode: '10020993',
    severity: 'Moderate',
    seriousnessCriteria: 'Medically Significant (Synergistic Hypoglycemic Effect)',
    isSAE: true,
    onsetTimestamp: '2026-09-15T10:15:00Z',
    reportedTimestamp: '2026-09-15T14:00:00Z',
    regClock24hDeadline: '2026-09-16T10:15:00Z',
    regClock24hStatus: 'TRANSMITTED_ON_TIME',
    regClock14dDeadline: '2026-09-29T10:15:00Z',
    regClock14dStatus: 'FILED_COMPLIANT',
    whoUmcCausality: 'Probable',
    naranjoScore: 7,
    investigationalProductBatch: 'NK-GMP-2023-B12',
    ayushHerbalDetails: {
      botanicalName: 'Curcuma longa, Strychnos potatorum, Emblica officinalis, Salacia reticulata',
      heavyMetalsAnalysis: 'Pass (AAS / ICP-MS certified)',
      microbialContamination: 'Nil'
    },
    actionTaken: 'Metformin dose titrated from 1000mg to 500mg OD. Kashaya continuation permitted under self-monitoring.',
    outcome: 'Resolved without sequelae; blood glucose stabilized at 108 mg/dL.',
    reportedBy: 'Dr. Rama Kant Sharma, PI',
    iecNotified: true,
    cdscoNotified: true,
    dsmbReviewRequested: false
  },
  {
    id: 'AE-2024-019',
    studyId: 'AIIA-CT-2024-001',
    subjectId: 'SUBJ-ASH-098',
    trialArm: 'Ashwagandha Root Extract (500mg BID)',
    aeTermReported: 'Mild Epigastric Burning Sensation (Amlapitta-like symptoms)',
    medDraPT: 'Dyspepsia',
    medDraSOC: 'Gastrointestinal disorders',
    medDraCode: '10013946',
    severity: 'Mild (Grade 1)',
    seriousnessCriteria: 'Non-Serious Adverse Event',
    isSAE: false,
    onsetTimestamp: '2026-09-20T09:00:00Z',
    reportedTimestamp: '2026-09-20T11:30:00Z',
    regClock24hDeadline: 'N/A (Non-Serious)',
    regClock24hStatus: 'LOGGED',
    regClock14dDeadline: 'N/A',
    regClock14dStatus: 'ROUTINE_MONITORING',
    whoUmcCausality: 'Probable',
    naranjoScore: 6,
    investigationalProductBatch: 'WS-2024-02',
    ayushHerbalDetails: {
      botanicalName: 'Withania somnifera (Dunal)',
      heavyMetalsAnalysis: 'Compliant with API Vol I',
      microbialContamination: 'Nil'
    },
    actionTaken: 'Advised to take capsule strictly post-prandial with warm milk (Anupana).',
    outcome: 'Resolved completely in 48 hours without drug interruption.',
    reportedBy: 'Dr. Priya Sharma, CRC',
    iecNotified: false,
    cdscoNotified: false,
    dsmbReviewRequested: false
  },
  {
    id: 'AE-2024-020',
    studyId: 'AIIA-CT-2023-005',
    subjectId: 'SUBJ-RSBK-214',
    trialArm: 'Swarna Sameerpannaga Rasa (125mg OD with honey)',
    aeTermReported: 'Localized Erythematous Pruritic Rash on Forearms (Kandu)',
    medDraPT: 'Rash erythematous',
    medDraSOC: 'Skin and subcutaneous tissue disorders',
    medDraCode: '10037855',
    severity: 'Mild (Grade 1)',
    seriousnessCriteria: 'Non-Serious Adverse Event',
    isSAE: false,
    onsetTimestamp: '2026-09-24T14:00:00Z',
    reportedTimestamp: '2026-09-25T10:00:00Z',
    regClock24hDeadline: 'N/A',
    regClock24hStatus: 'LOGGED',
    regClock14dDeadline: 'N/A',
    regClock14dStatus: 'ROUTINE_MONITORING',
    whoUmcCausality: 'Possible',
    naranjoScore: 4,
    investigationalProductBatch: 'SSR-GMP-2023-LOT7',
    ayushHerbalDetails: {
      botanicalName: 'Classical Kupipakwa Rasayana (Purified Parada, Gandhaka, Somala, Haritala, Vatsanabha)',
      heavyMetalsAnalysis: 'Bhasma Pariksha verified (Varitara, Rekhapurna, Apunarbhava passed)',
      microbialContamination: 'Pass'
    },
    actionTaken: 'Topical application of Shatadhauta Ghrita advised. Blood arsenic and mercury levels sent for ICP-MS confirmation.',
    outcome: 'Rash resolved within 4 days. Serum metal levels returned below baseline threshold.',
    reportedBy: 'Prof. Galib, PI',
    iecNotified: false,
    cdscoNotified: false,
    dsmbReviewRequested: false
  }
];

// CDISC SDTM Domains (Synthetic Subset)
export const CDISC_SDTM_DATA = {
  DM: [
    { STUDYID: 'AIIA-CT-2024-001', DOMAIN: 'DM', USUBJID: 'AIIA-001-001', SUBJID: '001', RFSTDTC: '2024-03-15', BRTHDTC: '1982-05-12', AGE: 44, AGEU: 'YEARS', SEX: 'F', RACE: 'ASIAN - INDIAN', ETHNIC: 'NOT HISPANIC OR LATINO', ARMCD: 'ASHWA', ARM: 'Ashwagandha Extract 500mg BID', COUNTRY: 'IND', PRAKRITI: 'Vata-Pitta' },
    { STUDYID: 'AIIA-CT-2024-001', DOMAIN: 'DM', USUBJID: 'AIIA-001-002', SUBJID: '002', RFSTDTC: '2024-03-16', BRTHDTC: '1976-11-20', AGE: 49, AGEU: 'YEARS', SEX: 'M', RACE: 'ASIAN - INDIAN', ETHNIC: 'NOT HISPANIC OR LATINO', ARMCD: 'PBO', ARM: 'Placebo Capsule BID', COUNTRY: 'IND', PRAKRITI: 'Kapha-Pitta' },
    { STUDYID: 'AIIA-CT-2024-002', DOMAIN: 'DM', USUBJID: 'AIIA-002-018', SUBJID: '018', RFSTDTC: '2024-01-22', BRTHDTC: '1968-04-03', AGE: 58, AGEU: 'YEARS', SEX: 'M', RACE: 'ASIAN - INDIAN', ETHNIC: 'NOT HISPANIC OR LATINO', ARMCD: 'NK_MET', ARM: 'Nishakathakadi + Metformin', COUNTRY: 'IND', PRAKRITI: 'Kapha-Vata' },
    { STUDYID: 'AIIA-CT-2024-004', DOMAIN: 'DM', USUBJID: 'AIIA-004-042', SUBJID: '042', RFSTDTC: '2024-05-18', BRTHDTC: '1963-09-14', AGE: 63, AGEU: 'YEARS', SEX: 'F', RACE: 'ASIAN - INDIAN', ETHNIC: 'NOT HISPANIC OR LATINO', ARMCD: 'SHAL_GUG', ARM: 'Shallaki-Guggulu Extract', COUNTRY: 'IND', PRAKRITI: 'Vataja' }
  ],
  AE: [
    { STUDYID: 'AIIA-CT-2024-004', DOMAIN: 'AE', USUBJID: 'AIIA-004-042', AESTDTC: '2026-09-28', AETERM: 'Drug-Induced Liver Injury', AEDECOD: 'Drug-induced liver injury', AEBODSYS: 'Hepatobiliary disorders', AESEV: 'SEVERE', AESER: 'Y', AEREL: 'POSSIBLE', AEOUT: 'RECOVERING' },
    { STUDYID: 'AIIA-CT-2024-002', DOMAIN: 'AE', USUBJID: 'AIIA-002-018', AESTDTC: '2026-09-15', AETERM: 'Symptomatic Hypoglycemia', AEDECOD: 'Hypoglycaemia', AEBODSYS: 'Metabolism and nutrition disorders', AESEV: 'MODERATE', AESER: 'Y', AEREL: 'PROBABLE', AEOUT: 'RESOLVED' },
    { STUDYID: 'AIIA-CT-2024-001', DOMAIN: 'AE', USUBJID: 'AIIA-001-098', AESTDTC: '2026-09-20', AETERM: 'Epigastric Burning', AEDECOD: 'Dyspepsia', AEBODSYS: 'Gastrointestinal disorders', AESEV: 'MILD', AESER: 'N', AEREL: 'PROBABLE', AEOUT: 'RESOLVED' }
  ],
  VS: [
    { STUDYID: 'AIIA-CT-2024-001', DOMAIN: 'VS', USUBJID: 'AIIA-001-001', VSTESTCD: 'SYSBP', VSTEST: 'Systolic Blood Pressure', VSORRES: '122', VSORRESU: 'mmHg', VISIT: 'Baseline', VSDTC: '2024-03-15' },
    { STUDYID: 'AIIA-CT-2024-001', DOMAIN: 'VS', USUBJID: 'AIIA-001-001', VSTESTCD: 'DIABP', VSTEST: 'Diastolic Blood Pressure', VSORRES: '78', VSORRESU: 'mmHg', VISIT: 'Baseline', VSDTC: '2024-03-15' },
    { STUDYID: 'AIIA-CT-2024-001', DOMAIN: 'VS', USUBJID: 'AIIA-001-001', VSTESTCD: 'PULSE', VSTEST: 'Pulse Rate', VSORRES: '72', VSORRESU: 'beats/min', VISIT: 'Baseline', VSDTC: '2024-03-15' },
    { STUDYID: 'AIIA-CT-2024-004', DOMAIN: 'VS', USUBJID: 'AIIA-004-042', VSTESTCD: 'SYSBP', VSTEST: 'Systolic Blood Pressure', VSORRES: '138', VSORRESU: 'mmHg', VISIT: 'Week 8', VSDTC: '2026-09-28' }
  ],
  CM: [
    { STUDYID: 'AIIA-CT-2024-002', DOMAIN: 'CM', USUBJID: 'AIIA-002-018', CMTRT: 'Metformin Hydrochloride', CMDECOD: 'Metformin', CMINDC: 'Type 2 Diabetes Mellitus', CMDOS: '500', CMDOSU: 'mg', CMDOSFRQ: 'QD' },
    { STUDYID: 'AIIA-CT-2024-004', DOMAIN: 'CM', USUBJID: 'AIIA-004-042', CMTRT: 'Paracetamol', CMDECOD: 'Paracetamol', CMINDC: 'Rescue Analgesic for Knee Pain', CMDOS: '650', CMDOSU: 'mg', CMDOSFRQ: 'PRN' }
  ]
};

// Initial Immutable ALCOA+ Audit Trail
export const INITIAL_AUDIT_TRAIL = [
  {
    id: 'AUD-8921',
    timestamp: '2026-09-29T10:14:22Z',
    user: 'Dr. Anand Kumar (PI)',
    role: 'Principal Investigator',
    studyId: 'AIIA-CT-2024-001',
    action: 'eCRF_SIGN_OFF',
    entity: 'Subject AIIA-001-045 Week 12 Visit',
    fieldName: 'investigatorSignOffStatus',
    oldVal: 'Pending_Signature',
    newVal: 'Signed_Verified',
    reasonForChange: 'Completed source data verification and clinical outcome validation',
    ipAddress: '14.139.60.18 (AIIA Campus LAN)',
    sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    verified21CFRPart11: true
  },
  {
    id: 'AUD-8920',
    timestamp: '2026-09-29T08:00:15Z',
    user: 'Dr. Suresh Kumar (PI)',
    role: 'Principal Investigator',
    studyId: 'AIIA-CT-2024-004',
    action: 'SAE_LOGGED',
    entity: 'Subject SUBJ-SG-042',
    fieldName: 'seriousnessCriteria',
    oldVal: 'None',
    newVal: 'Hospitalization / DILI Grade 3',
    reasonForChange: 'Patient admitted with acute transaminitis post week 8 Shallaki-Guggulu regimen',
    ipAddress: '14.139.60.22 (AIIA Kayachikitsa ICU)',
    sha256Hash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    verified21CFRPart11: true
  },
  {
    id: 'AUD-8919',
    timestamp: '2026-09-28T14:30:10Z',
    user: 'Vikram Mehta (CRA)',
    role: 'Clinical Research Associate',
    studyId: 'AIIA-CT-2024-001',
    action: 'PROTOCOL_DEVIATION_RECORDED',
    entity: 'Site 02 (IPGT&RA Jamnagar)',
    fieldName: 'deviationSeverity',
    oldVal: 'None',
    newVal: 'Minor (Out of visit window +4 days)',
    reasonForChange: 'Subject delayed due to regional transit disruption',
    ipAddress: '117.218.45.109 (Secure VPN)',
    sha256Hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    verified21CFRPart11: true
  },
  {
    id: 'AUD-8918',
    timestamp: '2026-09-27T11:20:00Z',
    user: 'Dr. Priya Sharma (CRC)',
    role: 'Study Coordinator',
    studyId: 'AIIA-CT-2024-001',
    action: 'DPDP_CONSENT_CAPTURED',
    entity: 'Subject AIIA-001-195',
    fieldName: 'informedConsentStatus',
    oldVal: 'Unconsented',
    newVal: 'Consented_Digital_Bilingual_Hindi_English',
    reasonForChange: 'Participant voluntary written and audio-video consent obtained per GCP-ASU & DPDP 2023',
    ipAddress: '14.139.60.34 (OPD-12 AIIA)',
    sha256Hash: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
    verified21CFRPart11: true
  }
];

// Protocol Deviations Registry
export const INITIAL_DEVIATIONS = [
  {
    id: 'DEV-01',
    studyId: 'AIIA-CT-2024-004',
    subjectId: 'SUBJ-SG-019',
    site: 'AIIA New Delhi',
    type: 'Major',
    category: 'Prohibited Concomitant Medication',
    description: 'Subject self-administered systemic NSAID (Diclofenac 50mg) for 5 days without reporting to PI.',
    impact: 'Potential confounding of primary WOMAC pain score.',
    actionTaken: 'Subject counseled on protocol adherence; rescue medication logs re-verified; statistical sensitivity analysis flagged.',
    status: 'IEC Notified & Resolved',
    reportedDate: '2024-08-14'
  },
  {
    id: 'DEV-02',
    studyId: 'AIIA-CT-2024-004',
    subjectId: 'SUBJ-SG-031',
    site: 'NIA Jaipur',
    type: 'Major',
    category: 'Informed Consent Version Discrepancy',
    description: 'Subject re-consented on Amendment v2.0 four days past the 30-day window due to remote residence.',
    impact: 'Administrative GCP compliance variance; no clinical risk to subject.',
    actionTaken: 'Corrective and Preventive Action (CAPA) implemented at NIA site.',
    status: 'CAPA Filed',
    reportedDate: '2024-08-28'
  },
  {
    id: 'DEV-03',
    studyId: 'AIIA-CT-2024-001',
    subjectId: 'SUBJ-ASH-062',
    site: 'IPGT&RA Jamnagar',
    type: 'Minor',
    category: 'Visit Window Out of Bounds',
    description: 'Week 8 assessment performed at Day 61 (+5 days past allowable window of +/- 3 days).',
    impact: 'Minimal effect on longitudinal biomarker analysis.',
    actionTaken: 'Logged in SDTM DV domain as scheduled.',
    status: 'Resolved',
    reportedDate: '2024-09-02'
  }
];
