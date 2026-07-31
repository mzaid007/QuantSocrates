<div align="center">

# 🧠 QuantSocrates — Adaptive AI MBA Quant Tutor

[![Open Source](https://img.shields.io/badge/Open%20Source-%E2%9D%A4-10b981?style=for-the-badge&logo=open-source-initiative&logoColor=white)](LICENSE)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg?style=for-the-badge)](LICENSE)
[![AI Engine](https://img.shields.io/badge/AI-Gemini%202.5-06b6d4?style=for-the-badge&logo=google&logoColor=white)](https://aistudio.google.com/)
[![Deployment](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://quant-socrates.vercel.app)
[![Math Engine](https://img.shields.io/badge/Math-KaTeX-14b8a6?style=for-the-badge)](https://katex.org/)

**A modern, adaptive, mobile-first AI Quantitative Reasoning Tutor built for high-stakes MBA entrance exams (CAT, GMAT, GRE).**

[Live App Demo](https://quant-socrates.vercel.app) • [Report Bug](https://github.com/mzaid007/QuantSocrates/issues) • [Request Feature](https://github.com/mzaid007/QuantSocrates/issues)

</div>

---

## 🌟 Key Features

* **🧠 Socratic AI Coach**: Powered by Google Gemini (`gemini-2.5-flash` via `@google/genai`). Never gives away answers outright; guides students with targeted Socratic questions and identifies conceptual traps.
* **📈 5-Level IRT-Inspired Adaptive Engine**: Dynamic level progression across 5 Quant topics (*Arithmetic*, *Algebra*, *Geometry*, *Modern Math*, *Data Sufficiency*). 2 consecutive correct answers advance level (+1); 1 wrong answer drops difficulty (-1).
* **✨ Dynamic AI Question Generator (`/api/generate-question`)**: Generates infinite fresh, high-yield CAT 99th percentile and GMAT 700+ questions on demand.
* **🧮 KaTeX Mathematical Formatting**: Clean rendering of algebraic fractions, exponents, square roots, and equations with mobile overflow protection.
* **📱 Mobile-First Experience**: Inline Socratic AI hint cards, floating bottom AI hint drawer, and 48px+ touch targets built for one-thumb smartphone study.
* **☁️ Multi-Device Persistence**: Hybrid storage engine syncing progress to **MongoDB Atlas (Free Tier)** with automatic fallback to browser `localStorage`.
* **🛡️ Conceptual Error Log Matrix**: Logs missed questions categorized by trap type (*Additive Fallacy*, *Sign Flop*, *Inclusion-Exclusion Overlap*, etc.) with filterable tags and retry options.

---

## 🛠️ System Specifications & Stack

* **Frontend**: React (Vite), Tailwind CSS v4, Lucide Icons
* **Math Rendering**: KaTeX (`katex`)
* **AI Integration**: Google Gemini API (`@google/genai` v2)
* **Backend Architecture**: Vercel Serverless Functions (`/api/tutor.js`, `/api/diagnose.js`, `/api/generate-question.js`, `/api/progress/`)
* **Database**: MongoDB Atlas via `mongoose` (with cached serverless connections) & Browser `localStorage`

---

## 🚀 Quick Start (Local Development)

### 1. Clone the Repository
```bash
git clone https://github.com/mzaid007/QuantSocrates.git
cd QuantSocrates
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Add your API keys to `.env`:
```env
GEMINI_API_KEY=your_gemini_api_key_from_google_ai_studio
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/quantsocrates?retryWrites=true&w=majority
```

### 4. Run Development Server
```bash
npm run dev
```

---

## 🔒 Free-Tier & Zero-Cost Architecture

QuantSocrates is strictly designed to run within zero-cost free-tier APIs and open-source packages:
* **Client-Side Grading**: Instant local answer validation for 0ms latency and 0 API cost.
* **Serverless Proxies**: API keys stay completely private on Vercel backend `/api` routes.
* **Gemini Free Tier**: Operates cleanly within Google AI Studio's free-tier rate limits.

---

## 📄 License

Distributed under the **GNU Affero General Public License v3 (AGPL-3.0)**. See [`LICENSE`](LICENSE) for more information.

---

<div align="center">
Built with ❤️ for CAT, GMAT, and GRE aspirants worldwide.
</div>
