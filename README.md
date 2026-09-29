# AIIA Clinical Trials Dashboard & NPvCC CTMS Platform
> **Real-Time, Cloud-Based, GCP-Compliant Clinical Trial Management System (CTMS) for Ayurveda Research**
> Hosted by the **All India Institute of Ayurveda (AIIA)** • Anchoring the **National Pharmacovigilance Coordination Centre (NPvCC)** for ASU&H Drugs • Ministry of Ayush, Government of India.

---

## 🌟 Key Capabilities & Features

1. **Research Portfolio & Lifecycle Tracking**:
   - End-to-end monitoring across Scientific Advisory Committee (SAC), Institutional Ethics Committee (IEC), prospective CTRI registration, site activation, subject accrual, and study close-out.
   - 4 pre-seeded synthetic Ayurvedic clinical trials (*Ashwagandha in Chronic Asthenia*, *Nishakathakadi Kashaya in Type 2 Diabetes*, *Rasa Aushadhi Safety Registry*, *Shallaki-Guggulu in Osteoarthritis*).

2. **NPvCC Pharmacovigilance & Safety Engine**:
   - **Live 24-Hour Regulatory Clock**: Enforces statutory expedited initial reporting to CDSCO, Licensing Authority, and IEC under **NDCT Rules 2019 Rule 42**.
   - **14-Day Comprehensive Form CT-17 Report Clock**.
   - Standardized coding with **MedDRA** (System Organ Class, Preferred Term) & classical Ayurvedic botanical monographs.
   - Interactive **WHO-UMC & Naranjo Causality Assessment Calculator**.
   - One-click regulatory transmission of Form CT-16 with automatic receipt generation.

3. **7 Role-Based Access Control (RBAC) Perspectives**:
   - Institutional Leadership / Director
   - Principal Investigator (PI)
   - Study Coordinator (CRC)
   - Clinical Research Associate / Monitor (CRA)
   - Institutional Ethics Committee (IEC)
   - NPvCC Pharmacovigilance Officer
   - CDSCO Inspector / Auditor (Read-Only)

4. **CDISC & HL7 FHIR Interoperability**:
   - **CDISC SDTM v3.3** domain browser (`DM`, `AE`, `VS`, `CM`) with CSV and JSON package exports.
   - **Define-XML 2.0** metadata export generator.
   - **HL7 FHIR R4** research resource explorer (`ResearchStudy`, `ResearchSubject`, `AdverseEvent`).
   - ABDM (Ayushman Bharat Digital Mission) ABHA health ID integration mockups.

5. **ALCOA+ Data Integrity & E-Signatures**:
   - Immutable audit trail with cryptographic SHA-256 hash chaining.
   - **21 CFR Part 11** electronic signature modal with mandatory GCP clinical justification.
   - DPDP Act 2023 & 2025 Rules consent lifecycle tracking.

---

## 🚀 Free Deployment on Vercel

Vercel offers **100% free hosting** for frontend applications on their Hobby plan (includes free SSL/HTTPS, global CDN, and automatic builds).

### Option 1: Deploy via GitHub (Recommended)

1. **Initialize Git & Commit**:
   ```bash
   git init
   git add .
   git commit -m "feat: AIIA CTMS & NPvCC Pharmacovigilance platform"
   ```

2. **Push to GitHub**:
   - Go to [GitHub](https://github.com/new) and create a new repository named `aiia-ctms`.
   - Run:
     ```bash
     git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/aiia-ctms.git
     git branch -M main
     git push -u origin main
     ```

3. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in with your GitHub account (Free).
   - Click **"Add New..."** > **"Project"**.
   - Select your `aiia-ctms` repository and click **"Import"**.
   - Vercel automatically detects **Vite**:
     - *Build Command*: `npm run build`
     - *Output Directory*: `dist`
     - *Install Command*: `npm install`
   - Click **"Deploy"**.
   - Your site will be live at `https://aiia-ctms.vercel.app` in ~30 seconds!

---

### Option 2: Deploy Directly via Terminal (No GitHub Required)

If you don't want to create a GitHub repository right now, deploy straight from your terminal:

1. Open PowerShell or Command Prompt in this folder (`c:\Users\HP\Downloads\Ayurveda`).
2. Run:
   ```bash
   npx vercel
   ```
3. Follow the one-time interactive prompts:
   - Log in via browser when prompted.
   - Set up and deploy? **Y**
   - Which scope? Select your free personal account.
   - Link to existing project? **N**
   - Project name? **aiia-ctms**
   - In which directory? **./**
   - Auto-detected Vite settings? **Y**
4. Once deployment finishes, Vercel gives you your live URL immediately!
