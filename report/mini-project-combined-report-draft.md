# Mini Project Report Draft
## Integrated VCET Web Platform (Backend + Frontend)

Prepared from two repositories:
- Backend repository: vcet (Laravel API + CMS)
- Frontend repository: vcet.edu.in (React website + Admin panel)

---

## Contents
1. Introduction
1.1 Introduction
1.2 Problem Statement and Objectives
1.3 Scope

2. Literature Survey
2.1 Survey of Existing System/SRS
2.2 Limitations of Existing System or Research Gap
2.3 Mini Project Contribution

3. Proposed System
3.1 Introduction
3.2 Architecture/Framework/Block Diagram
3.3 Algorithms and Process Design
3.4 Details of Hardware and Software
3.5 Experiment and Results for Validation and Verification
3.6 Analysis
3.7 Conclusion and Future Work

References

4. Annexure
4.1 Published Paper / Camera Ready Paper / Business Pitch / Proof of Concept

---

## 1. Introduction

### 1.1 Introduction
The VCET digital platform has been developed using a two-repository architecture to provide a scalable, maintainable, and modern institutional website.

1. The backend repository (vcet) is built in Laravel 12 and acts as the central API and content management layer.
2. The frontend repository (vcet.edu.in) is built in React 19 with TypeScript and serves both public-facing pages and an authenticated admin panel.
3. The platform supports dynamic content publishing across key institutional modules such as notices, events, placements, departments, faculty, galleries, achievements, and enquiry management.

This architecture ensures clean separation of concerns between data and presentation while supporting long-term growth.

### 1.2 Problem Statement and Objectives

#### Problem Statement
Traditional institutional websites often face these challenges:
1. Fragmented content updates across many pages.
2. Delayed publishing due to non-centralized workflows.
3. Limited maintainability when design and data logic are tightly coupled.
4. Weak traceability for testing and release readiness.

#### Objectives
The project aims to:
1. Build a centralized CMS-backed API for college website data.
2. Provide a modern frontend with reusable components and responsive design.
3. Enable secure admin-side CRUD operations for all major content modules.
4. Implement verified workflows for enquiries, media, and page content updates.
5. Establish repeatable QA validation with documented test-cycle evidence.

### 1.3 Scope

#### In Scope
1. Backend API development for core website resources.
2. Frontend rendering for public pages and dynamic sections.
3. Admin panel features for content management and enquiry handling.
4. Data validation, authentication, and controlled file serving.
5. Manual functional QA cycles for homepage and admin modules.

#### Out of Scope (Current Phase)
1. AI-driven personalization and recommendation engine.
2. Large-scale analytics dashboards beyond operational admin needs.
3. Native mobile app clients.

---

## 2. Literature Survey

### 2.1 Survey of Existing System/SRS
The redevelopment follows an SRS-aligned approach where the existing institutional website is treated as factual source-of-truth for content while improving technical architecture.

Observed baseline needs from existing system context:
1. Institutional information consistency across departments and committees.
2. Frequent updates for notices, events, and admission-related announcements.
3. Need for dedicated admin workflows for non-technical users.
4. Need for secure and reliable backend integration for public pages.

The current implementation addresses these via:
1. REST JSON APIs in Laravel.
2. Public and admin route separation.
3. CMS module-wise CRUD operations.
4. Structured frontend service and hook layers for data access.

### 2.2 Limitations of Existing System or Research Gap
Key limitations/gaps addressed by this project:
1. Limited modularity in legacy update workflows.
2. Lack of a unified, repository-driven engineering process.
3. Reduced traceability of validation and regression checks.
4. Inconsistent scalability for media-backed dynamic sections.

### 2.3 Mini Project Contribution
The mini project contributes:
1. A complete two-repo implementation for institutional web modernization.
2. Standardized API-driven content flow from backend to frontend.
3. Admin panel capabilities for end-to-end lifecycle operations (create, update, activate/deactivate, read/unread management, delete, restore where applicable).
4. QA verification evidence with cycle-by-cycle status and commit mapping.

---

## 3. Proposed System

### 3.1 Introduction
The proposed system is a decoupled web architecture with a Laravel backend and React frontend. It supports dynamic data rendering, media/file delivery, authenticated administration, and continuous QA validation.

### 3.2 Architecture / Framework / Block Diagram

#### High-Level Architecture
1. Client Browser accesses React frontend.
2. Frontend sends HTTP requests to backend API endpoints (/api/*).
3. Laravel backend controllers process requests.
4. Eloquent models interact with MySQL/SQLite database.
5. Backend returns JSON and streams files/images as needed.
6. Admin actions are protected with authentication and CSRF/session controls.

#### Textual Block Diagram
User (Public/Admin)
-> React Frontend (vcet.edu.in)
-> Service Layer and Hooks
-> Laravel API (vcet)
-> Controllers and Validation Layer
-> Models
-> Database and File Storage
-> JSON/File Response
-> Frontend UI Update

### 3.3 Algorithms and Process Design

Process-oriented design patterns used in the project:
1. Resource-wise CRUD flows for notices, events, placements, galleries, testimonials, hero slides, and more.
2. Status-driven workflows such as active/inactive toggles and scheduling.
3. Enquiry processing pipeline including anti-bot protections and admin review actions.
4. Public listing and ordering mechanisms for homepage and section cards.
5. Form validation and error handling at API and UI layers.

### 3.4 Details of Hardware and Software

#### Software Stack

| Layer | Technology |
|---|---|
| Backend | Laravel 12, PHP 8.x, Composer |
| Frontend | React 19, TypeScript, Vite 6 |
| Styling/UI | Tailwind CSS, componentized architecture |
| Database | SQLite (development), MySQL (production) |
| Auth/Security | Laravel Fortify/Sanctum-style session and CSRF architecture |
| Testing/Quality | Laravel tests, frontend build checks, linting/formatting |

#### Hardware Requirements (Recommended)

| Component | Minimum |
|---|---|
| CPU | Dual-core modern processor |
| RAM | 8 GB (16 GB recommended) |
| Storage | 20 GB free for project, dependencies, and media |
| OS | Windows/Linux/macOS |
| Network | Stable internet for dependency installation and deployment workflows |

### 3.5 Experiment and Results for Validation and Verification
Validation has been performed through manual functional QA and targeted backend test execution.

#### Evidence from QA Cycles
1. Multiple test cycles recorded in the admin-homepage QA log.
2. Verified modules include:
   - MMS and general enquiry submission and visibility
   - Read/unread status updates
   - Enquiry deletion workflows
   - Export features (Excel/PDF)
   - MMS content editor and admission details editor updates
3. Backend feature tests for enquiries were executed and reported as passing in logged cycles.
4. Frontend production build checks completed successfully during cycles, with only known non-blocking chunk-size warnings.

#### Result Summary
Overall status for tracked scope: Working.

### 3.6 Analysis
1. Decoupled architecture improves maintainability and independent deployment flexibility.
2. API-centric module design reduces duplication and supports future platform expansion.
3. Admin panel integration significantly improves content governance and update speed.
4. QA log-based verification creates traceability for feature reliability and regression control.
5. Current residual technical risk is mainly performance tuning and continued content consistency enforcement.

### 3.7 Conclusion and Future Work

#### Conclusion
The integrated VCET platform successfully modernizes institutional web operations using a robust backend and a scalable frontend. Core content modules, admin management features, and enquiry workflows are implemented and verified.

#### Future Work
1. Add richer SEO metadata automation (OpenGraph, structured schema).
2. Increase automated test coverage for frontend interaction paths.
3. Add observability dashboards for API and admin usage metrics.
4. Optimize frontend bundle/chunk strategy for large route groups.
5. Extend role-based access control for granular admin permissions.

---

## References
1. vcet/README.md
2. vcet/BACKEND_PRD.md
3. vcet/DOCS/architecture_analysis.md
4. vcet/DOCS/api_data_flow_analysis.md
5. vcet.edu.in/README.md
6. vcet.edu.in/CONTEXT.md
7. vcet.edu.in/report/admin-homepage-qa-verification-log.md

---

## 4. Annexure

### 4.1 Published Paper / Camera Ready Paper / Business Pitch / Proof of Concept
Use this section to attach supporting artifacts:
1. Architecture diagrams and API module map.
2. Test cycle screenshots and admin workflow evidence.
3. Commit references linked to validated feature bundles.
4. Build/test output snapshots.
5. Published paper or camera-ready manuscript (if available).
6. Business pitch or proof-of-concept deck/document.

### Suggested Annexure Table Template

| Annexure ID | Artifact Name | Description | File/Link | Date |
|---|---|---|---|---|
| A1 | Architecture Diagram | High-level backend-frontend integration | <add> | <add> |
| A2 | API Endpoint List | Public/admin endpoint catalog | <add> | <add> |
| A3 | QA Cycle Evidence | Screenshots and logs from verification cycles | <add> | <add> |
| A4 | Build and Test Reports | Backend test and frontend build evidence | <add> | <add> |
| A5 | Published Paper / PoC | Camera-ready or proof material | <add> | <add> |
