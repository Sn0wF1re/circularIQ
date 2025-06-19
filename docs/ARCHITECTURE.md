# CircularIQ Platform Architecture and Product Plan

## 📓 Executive Summary

CircularIQ is a modular, AI-enhanced platform that enables African businesses to track plastic usage, ensure regulatory compliance (especially with Kenya's EMCA and EPR laws), and build sustainability intelligence. This document defines the software architecture and product development plan for an AI agent (like Copilot or Cursor) to optimally scaffold, code, and evolve the platform using Nuxt 3, Node.js, and Supabase.

---

## 📊 Vision & Strategic Pillars

* **Empower SMEs and enterprises** to meet environmental obligations
* **Automate** the collection, processing, and reporting of packaging and waste data
* **Embed circular economy principles** into day-to-day business workflows
* **Bridge policy and tech** with real-time, localized regulation tracking

---

## 🚀 Technology Stack Overview

| Layer        | Technology                                   |
| ------------ | -------------------------------------------- |
| Frontend     | Nuxt 3, Composition API, Tailwind v4, Pinia  |
| Backend      | Node.js with Express.js                      |
| Database     | Supabase (PostgreSQL + Storage + Auth)       |
| File Uploads | Supabase Storage                             |
| Auth         | Supabase Auth (email-based, magic link)      |
| Analytics    | Supabase Realtime + custom charting (ApexJS) |
| AI Features  | OpenAI API (via backend route)               |
| Exports      | PDFKit, CSVKit (Node modules)                |

---

## 🌈 Tailwind v4 Color Theme

Define brand colors directly in `assets/css/main.css` using `@theme`:

```css
@import 'tailwindcss';

@theme {
  colors: {
    primary: #28A745;       /* Leaf Green */
    accent: #98FF98;        /* Mint Green */
    forest: #14532D;        /* Forest Green */
    background: #EFFBF0;    /* Off-white */
    surface: #F4F4F4;       /* Light Gray */
    muted: #6B7280;         /* Tailwind Gray 500 */
    success: #34D399;
    warning: #FBBF24;
    danger: #EF4444;
    info: #3B82F6;
  }
}
```

You can now use classes like `bg-primary`, `text-accent`, `bg-background`, `text-muted`, etc. in all your components and pages.

---

## 📑 Modular Architecture

### 1. User Onboarding Module

* Company identity capture (name, country, sector, registration no.)
* Regulatory pathway selection (e.g., NEMA vs. EU SUP)
* Guided onboarding (manual or CSV upload)
* **Pages:** `/register`, `/onboarding`

### 2. Data Collection & Validation Module

* Manual entry + CSV upload of SKU data
* Material, weight, recyclability %, volume
* Real-time validation engine
* Data templates per sector

### 3. Plastic Footprint Calculator

* Total plastic use, intensity, recyclability
* Monthly/annual reports
* Conversion to CO2 equivalent

### 4. Compliance & Circularity Engine

* Country-specific rules (Kenya, EU, etc.)
* EPR readiness scoring
* Non-compliant SKU flagging
* Circularity score formula:
  `(Recyclability% * 0.4) + (Recycled% * 0.3) + (Reuse% * 0.2) + (Compliance * 0.1)`

### 5. Dashboards & Reporting

* KPI cards, bar/pie/line charts, trend tracking
* Report generator: CSV, PDF
* Alerts for compliance deadlines
* Visual tools for strategy design

### 6. Recommendations Engine (Phase 2)

* AI-generated suggestions per SKU or material
* Budget, impact, ROI estimates
* Smart readiness filter (Easy/Medium/Advanced)

### 7. Supplier & Recycler Matching

* Partner directory with filters
* Admin-controlled database
* Contact trigger

### 8. Multi-Tenant & Roles Management

* Admin, Analyst, Viewer roles
* Branches/locations
* Invitation + permission settings

---

## 📊 Supabase Schema

**Tables:**

* `users` (auth, role, org)
* `companies` (sector, size, region, EPR status)
* `products` (SKU, material, weight, recycled%, recyclability%)
* `uploads` (original file, parsed rows)
* `footprint_reports` (per company, per month)
* `compliance_scores` (country, product, score, flags)
* `recommendations` (linked to product or company)
* `partners` (name, region, service\_type)
* `billing_plans` (tier, price, limits)
* `activity_logs`, `notifications`

---

## 🔧 Backend Services

**REST API Endpoints:**

* `POST /api/auth/signup`
* `POST /api/companies`
* `POST /api/uploads`
* `POST /api/calculate-footprint`
* `GET /api/compliance-check/:companyId`
* `POST /api/recommendations`
* `GET /api/reports/pdf`

**Jobs & Workers:**

* Upload validator
* Monthly compliance engine
* Score recalculation
* Email notification cron

**Integrations (Future):**

* NEMA portal integration
* WhatsApp API (support)
* Local plastic databases (e.g., PETCO, KEPRO)

---

## 👥 User Roles & Permissions

| Role    | Permissions                                    |
| ------- | ---------------------------------------------- |
| Admin   | All company data, billing, user invites        |
| Analyst | Data entry, report generation, recommendations |
| Viewer  | Dashboard-only access                          |

---

## 🏐 Product Sitemap

**Public:**

* `/` (Home)
* `/features`
* `/pricing`
* `/about`
* `/contact`
* `/login`, `/signup`
* `/resources` or `/blog`
* `/faqs`, `/privacy-policy`, `/terms`

**Protected (Post-login):**

* `/dashboard`
* `/onboarding`
* `/data`
* `/reports`
* `/compliance`
* `/team`
* `/settings`

---

## 📊 Pricing Model Logic

* Stored in `billing_plans` table
* Metered usage fields:

  * `sku_count`
  * `report_count`
  * `user_count`
* Rate limits per tier
* Stripe or M-Pesa for payments (optional Phase 2)

---

## ✨ AI Agent Development Instructions

1. Use file-based routing in Nuxt 3
2. Scaffold pages based on sitemap and onboarding form structure
3. Generate Supabase schema based on table definitions
4. Build validators based on plastic data CSV schema
5. Use tailwind and composables to unify UI blocks
6. Create calculation services as standalone Node modules
7. Prompt OpenAI with structured product data + company goal
8. Enable export-to-PDF via backend route
9. Build `components/ui/` folder with reusable Tailwind-based UI components like `BaseCard.vue`, `GreenButton.vue`, `Badge.vue`, `StatusDot.vue`, and `FormInput.vue`
10. Create `/style-guide.vue` route that previews brand colors, component examples, and typography
11. Store Stitch-generated UI layouts and prompts in `/docs/ui-prompts/` to preserve design intent
12. Check UI pages from Figma (from Stitch (by Google) designs) as PDFs to visually reference expected layout and component structure. Use the layouts as reference but not strictly. Use them as a starting point to create visually attractive UIs.
13. Integration with Supabase, API logic, validation, and dynamic rendering

---

## 💸 Business KPIs & Projections (Year 1)

| Tier           | Starting Clients                         | MRR (Avg)  | Growth Rate |
| -------------- | ---------------------------------------- | ---------- | ----------- |
| Starter        | 10                                       | KES 3,500  | 15%         |
| Pro            | 5                                        | KES 15,000 | 20%         |
| Enterprise     | 2                                        | KES 60,000 | 25%         |
| Onboarding Fee | Avg KES 30,000 per client (Month 1 only) |            |             |

Target Annual Revenue: **KES 12M–15M**


## ✅ Summary

This architecture enables a phased, AI-augmented development cycle where:

* Product-market fit is validated early
* Regulatory compliance is baked in
* African SME needs are directly addressed
* CircularIQ becomes the default sustainability intelligence platform for the continent
