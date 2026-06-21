# Oxygen Sports - Sports Event Sponsorship & Kit Donation Tracker
## Student 1 (Frontend) - Internship Logbook

### Day 1: 02 June 2026
* **Tasks Undertaken**:
  * Read and analyzed the project introduction and background for Oxygen Sports.
  * Summarized the business problem: the lack of a centralized digital system for tracking equipment donations and sponsorships, resulting in scattered tracking (spreadsheets, WhatsApp, registers) and an inability to calculate sponsorship ROI or brand equity.
  * Sketched the required fields for the **Sports Event Sponsorship & Kit Donation Entry Form** (Event Details, Kit Items Donated, Brand Visibility metrics).
  * Outlined the interface components, filter criteria, and columns for the **Sports Event Sponsorship & Kit Donation Dashboard**.
* **Understanding of the Business Problem**:
  * Sponsors and donations to tournaments/schools should build long-term brand equity for Oxygen Sports. Without tracking "visibility received" and linking it to specific events/donations, sponsorship spend is a black box. A frontend dashboard showing statuses and visibility levels enables the management to optimize where they allocate equipment.

### Day 2: 03 June 2026
* **Tasks Undertaken**:
  * Formulated the concrete **Problem Statement** describing the operational issues resulting from manual workflow management of sponsorships and kit donations.
  * Defined the purpose and scope of all four required frontend screens: Entry Form, Dashboard, Detail/History View, and Analytics.
  * Penned the **Project Abstract** detailing the application's capabilities, users, and value added for Oxygen Sports.
* **Key Decisions**:
  * Decided on a unified data-entry layout that groups information into clean, logical sections (Event details, Item list, Visibility checklists) to keep the form intuitive for staff.

### Day 3: 04 June 2026
* **Tasks Undertaken**:
  * Defined 5 testable frontend user-perspective objectives.
  * Initialized the frontend workspace configuration.
  * Created the required component files: [SportsEventSponsorship&KitDonationEntryForm.jsx](file:///C:/Users/Shiva/.gemini/antigravity/scratch/oxygen-sports-tracker/frontend/SportsEventSponsorship&KitDonationEntryForm.jsx), [SportsEventSponsorship&KitDonationDashboard.jsx](file:///C:/Users/Shiva/.gemini/antigravity/scratch/oxygen-sports-tracker/frontend/SportsEventSponsorship&KitDonationDashboard.jsx), [Detail&HistoryView.jsx](file:///C:/Users/Shiva/.gemini/antigravity/scratch/oxygen-sports-tracker/frontend/Detail&HistoryView.jsx), and [Reports&AnalyticsDashboard.jsx](file:///C:/Users/Shiva/.gemini/antigravity/scratch/oxygen-sports-tracker/frontend/Reports&AnalyticsDashboard.jsx).
* **Environment Verification**:
  * Confirmed all files are properly created in the `/frontend` directory, ready for implementation.

### Day 4: 05 June 2026
* **Tasks Undertaken**:
  * Designed detailed layout wireframes for all four main screen states (Entry Form, Dashboard, Details Modal, Analytics Trends).
  * Labeled form inputs representing database criteria (`items donated`, `brand visibility received`, `status`, `created_date`, `notes`) into structural layout patterns.
  * Documented layouts to [wireframes.md](file:///C:/Users/Shiva/.gemini/antigravity/scratch/oxygen-sports-tracker/docs/wireframes.md).
* **Key Decisions**:
  * Decided to layout the Quick Stats widget at the very top of the main Dashboard to give managers instant operational signals.

### Day 5: 06 June 2026
* **Tasks Undertaken**:
  * Drafted Slide outlines for Title slide, Company Background, Problem Statement, and Wireframe explanations.
  * Detailed visual structures and prepared speaker scripts timed for a 3-minute delivery.
  * Compiled materials into [presentation_review1.md](file:///C:/Users/Shiva/.gemini/antigravity/scratch/oxygen-sports-tracker/docs/presentation_review1.md).

### Day 6: 06 June 2026
* **Tasks Undertaken**:
  * Delivered the final Review 1 presentation to the primary evaluator, **Pamba Vamshi Krishna Sir**.
  * Handled the wireframe demonstrations explaining field names (`items donated`, `brand visibility received`, `status`, `created_date`, `notes`) and walked through the user journeys.
  * Noted review feedback regarding UI requirements, status badges, and interactive form layout modifications.
* **Review Outcomes**:
  * Successfully passed Review 1. Evaluator approved our problem statements and wireframe layouts, directing the team to proceed with implementation phases.

### Day 7: 08 June 2026
* **Tasks Undertaken**:
  * Updated [wireframes.md](file:///C:/Users/Shiva/.gemini/antigravity/scratch/oxygen-sports-tracker/docs/wireframes.md) based on feedback (added dynamic item row updates, status pill indicators, and live text filtering notes).
  * Researched 2 existing donation/sponsorship systems (OpenSponsorship and CSRBOX) and logged UI behaviors in [literature_survey.md](file:///C:/Users/Shiva/.gemini/antigravity/scratch/oxygen-sports-tracker/docs/literature_survey.md).
  * Built initial interactive logic for [SportsEventSponsorship&KitDonationEntryForm.jsx](file:///C:/Users/Shiva/.gemini/antigravity/scratch/oxygen-sports-tracker/frontend/SportsEventSponsorship&KitDonationEntryForm.jsx) implementing React states, budget rule alerts, and dynamic rows.
* **Key Decisions**:
  * Grouped the entry fields strictly in fieldsets with dark glassmorphic CSS specifications to make data entry intuitive.

### Day 8: 09 June 2026
* **Tasks Undertaken**:
  * Completed UI/UX evaluations for benchmark systems (OpenSponsorship, CSRBOX) highlighting interface differences.
  * Authored a 300-word comparative review detailing the UI advantages of our tracker (single-screen inputs, instant budget alert flags, status color layout).
  * Uploaded findings to [existing_system_analysis_frontend.md](file:///C:/Users/Shiva/.gemini/antigravity/scratch/oxygen-sports-tracker/docs/existing_system_analysis_frontend.md).
* **Key Decisions**:
  * Highlighted the dynamic item-row manipulation of the entry form as a key competitive advantage over legacy portals in the presentation materials.

### Day 9: 10 June 2026
* **Tasks Undertaken**:
  * Formulated proposed screen description parameters (purposes, actors, inputs, and outputs) for all 4 screens.
  * Created a business shift comparison table mapping the manual processes at Oxygen Sports against the digital tracker's design.
  * Logged all specifications under [proposed_system_frontend.md](file:///C:/Users/Shiva/.gemini/antigravity/scratch/oxygen-sports-tracker/docs/proposed_system_frontend.md).
* **Key Decisions**:
  * Decided to clearly isolate dashboard inputs (like searches/status dropdown selections) from outputs (tables/stats widgets) to keep development layouts consistent.

### Day 10: 11 June 2026
* **Tasks Undertaken**:
  * Polished the React entry form [SportsEventSponsorship&KitDonationEntryForm.jsx](file:///C:/Users/Shiva/.gemini/antigravity/scratch/oxygen-sports-tracker/frontend/SportsEventSponsorship&KitDonationEntryForm.jsx) with clean responsive glassmorphic styles and custom field input state arrays.
  * Built local validation states checking items, quantities, boundary budget limits, and visibility selections.
* **Key Decisions**:
  * Enforced dynamic item array calculations on user key press to enable immediate warnings when budget targets are exceeded.

### Day 11: 12 June 2026
* **Tasks Undertaken**:
  * Programmed the [SportsEventSponsorship&KitDonationDashboard.jsx](file:///C:/Users/Shiva/.gemini/antigravity/scratch/oxygen-sports-tracker/frontend/SportsEventSponsorship&KitDonationDashboard.jsx) data grid component.
  * Integrated fetch logic to communicate with GET `/api/sports_event_sponsorship_kit_donati` requesting paginated results.
  * Programmed search filters matching text, status dropdown hooks, loading spinner layout, and no-data messages.
* **Key Decisions**:
  * Triggered search requests on state updates with page resets to keep index counters accurate on queries.

### Day 12: 13 June 2026
* **Tasks Undertaken**:
  * Created `feature/frontend` branch to push and verify screens logic (Entry Form, Dashboard layout).
  * Ran local merge verification checks ensuring both the dynamic form validation and dashboard grids display database data successfully on integration.
* **Key Decisions**:
  * Kept API calls targeted to absolute paths (localhost:5000) to ensure local configurations compile properly during local reviews.

### Day 13: 15 June 2026
* **Tasks Undertaken**:
  * Built the [Detail&HistoryView.jsx](file:///C:/Users/Shiva/.gemini/antigravity/scratch/oxygen-sports-tracker/frontend/Detail&HistoryView.jsx) drawer component.
  * Programmed progress meters for ROI indexing, dynamic text styling for trend alerts, and formatted layout stats displaying budget utilizations.
* **Key Decisions**:
  * Employed color-coded warning alert containers inside the drawer to instantly flag critical over-budget/low-visibility entries to managers.

### Day 14: 16 June 2026
* **Tasks Undertaken**:
  * Finalized all frontend UI screens, verifying component stability.
  * Drafted slides templates and scripts outlining the visual layouts, UI choices, and user flows.
  * Saved slides to [presentation_review2.md](file:///C:/Users/Shiva/.gemini/antigravity/scratch/oxygen-sports-tracker/docs/presentation_review2.md) and rehearsed presentation timed to 3 minutes.
* **Key Decisions**:
  * Selected a flow layout emphasizing the instant feedback mechanism of our client form validations to satisfy review constraints.

### Day 15: 17 June 2026
* **Tasks Undertaken**:
  * Designed the visual components schema layout showing data traffic routes.
  * Documented component connections and saved findings to [architecture.md](file:///C:/Users/Shiva/.gemini/antigravity/scratch/oxygen-sports-tracker/docs/architecture.md) in Mermaid format.
  * Planned screen interfaces scheduled for the next iteration (Edit Forms, Audit logs grid, Reports panels).
* **Key Decisions**:
  * Used Mermaid syntax for architecture diagrams to make it easy for team updates during implementation phases.

### Day 16: 18 June 2026
* **Tasks Undertaken**:
  * Updated [SportsEventSponsorship&KitDonationEntryForm.jsx](file:///C:/Users/Shiva/.gemini/antigravity/scratch/oxygen-sports-tracker/frontend/SportsEventSponsorship&KitDonationEntryForm.jsx) to support editing pre-filled records and dispatching PUT calls.
  * Integrated status colored filter tabs (All, Active, Completed, Archived) and status PATCH transitions on [SportsEventSponsorship&KitDonationDashboard.jsx](file:///C:/Users/Shiva/.gemini/antigravity/scratch/oxygen-sports-tracker/frontend/SportsEventSponsorship&KitDonationDashboard.jsx).
  * Tested the full CRUD update flow locally in browser.
* **Key Decisions**:
  * Added safety browser pop-up checks (`window.confirm`) on critical status transitions to avoid accidental clicks.

### Day 17: 20 June 2026
* **Tasks Undertaken**:
  * Participated in the Review 2 presentation day, demonstrating the live frontend tracking system to primary evaluator **Pamba Vamshi Krishna Sir**.
  * Walked through form submissions showing real data and the dashboard displaying populated logs.
  * Documented feedback regarding ROI score indicator tooltips.
* **Key Decisions**:
  * Decided to introduce info tooltips on the next iteration to explain the weighted calculation parameters of the ROI score.

### Day 18: 20 June 2026
* **Tasks Undertaken**:
  * Built the **Reports and Analytics Dashboard** screen: [Reports&AnalyticsDashboard.jsx](file:///C:/Users/Shiva/.gemini/antigravity/scratch/oxygen-sports-tracker/frontend/Reports&AnalyticsDashboard.jsx).
  * Designed custom SVG visual rendering graphs: a Bar Chart for category budget spreads and a 30-day line chart tracking daily expenditures.
  * Configured date-range inputs (From Date, To Date) and hooked CSV export downloads.
  * Implemented ROI index tooltip info icon on [Detail&HistoryView.jsx](file:///C:/Users/Shiva/.gemini/antigravity/scratch/oxygen-sports-tracker/frontend/Detail&HistoryView.jsx).
  * Maintained CSS style definitions in [style.css](file:///C:/Users/Shiva/.gemini/antigravity/scratch/oxygen-sports-tracker/frontend/style.css).
* **Key Decisions**:
  * Selected SVG graphic models over external canvas frameworks to avoid heavy libraries and guarantee cross-device styling stability.

### Day 19: 22 June 2026
* **Tasks Undertaken**:
  * Programmed the top header breadcrumb navigation bar in [App.jsx](file:///C:/Users/Shiva/.gemini/antigravity/scratch/oxygen-sports-tracker/frontend/App.jsx).
  * Designed and coded the **Home Dashboard Summary metrics widget** fetching live overall spends, active counts, and critical flags.
  * Linked dynamic updates between component switches to automatically trigger metrics updates.
  * Executed comprehensive layout navigation tests in browser.
* **Key Decisions**:
  * Rendered the home summary card at the root level of `App.jsx` so that the metrics display remains accessible during both Dashboard list views and Reports view.

### Day 20: 23 June 2026
* **Tasks Undertaken**:
  * Created the full-screen details view component [SportsEventSponsorship&KitDonationDetailPage.jsx](file:///C:/Users/Shiva/.gemini/antigravity/scratch/oxygen-sports-tracker/frontend/SportsEventSponsorship&KitDonationDetailPage.jsx) displaying itemized tables, branding outputs, and joined audit trails.
  * Added print action trigger firing browser-native PDF export overrides.
  * Link detailed page state in [App.jsx](file:///C:/Users/Shiva/.gemini/antigravity/scratch/oxygen-sports-tracker/frontend/App.jsx) replacing drawer modals.
  * Added CSS declarations in [style.css](file:///C:/Users/Shiva/.gemini/antigravity/scratch/oxygen-sports-tracker/frontend/style.css).
* **Key Decisions**:
  * Built custom print media css rule blocks (`@media print`) to hide navigation layouts, headers, and buttons, ensuring printed invoice details remain clean.

### Day 21: 24 June 2026
* **Tasks Undertaken**:
  * Performed a complete UI visual audit ensuring standard spacing, typography, and button heights on an 8px grid.
  * Added standardized loading spinner overlays using CSS keyframe animations for all asynchronous actions.
  * Created customized glassmorphic empty state cards for every list page when searches/filters match zero rows.
  * Fixed responsive mobile and tablet issues at 375px and 768px viewports.
* **Key Decisions**:
  * Enforced global font inheritance of the 'Inter' family on all elements including inputs/buttons in stylesheet rather than inline blocks to keep files lean.

### Day 22: 25 June 2026
* **Tasks Undertaken**:
  * Configured client application pages to pull the base API target URL dynamically via environment variables (`import.meta.env.VITE_API_URL`).
  * Run and audited production builds (`npm run build`) ensuring 100% compliance and zero compilation alerts.
  * Deployed frontend code to Vercel via GitHub connection and checked live URL loading behaviors.
* **Key Decisions**:
  * Chose to maintain `http://localhost:5000` as local fallback in env variables to preserve local offline execution.

### Day 23: 26 June 2026
* **Tasks Undertaken**:
  * Tested every feature on the deployed Vercel URL under simulated mobile, tablet, and desktop viewports, correcting minor alignment offsets.
  * Authored **Chapter 1 (Introduction)** and **Chapter 4 (UI Design)** of the final project report.
* **Key Decisions**:
  * Outlined wireframe references and glassmorphic styling choices directly in Chapter 4 to satisfy documentation guidelines.

### Day 24: 27 June 2026
* **Tasks Undertaken**:
  * Recorded a 5-minute unlisted YouTube demo walkthrough video demonstrating form entries, dynamic validations, ROI calculations, and detail/history pages.
  * Added video link paths inside the main README.md.
  * Formulated Slide deck Part 1 (slides 1 to 7) detailing problem parameters and UI solution screens.
* **Key Decisions**:
  * Decided to record the E2E walkthrough video using Vercel production builds to demonstrate live database synchronization with the Render backend.

### Day 25: 29 June 2026
* **Tasks Undertaken**:
  * Presented the final Review 3 live demo to evaluators showing form validations, dynamic chart statistics, details logs, and mobile stack layouts.
  * Answered evaluator UX questions on badge colors and navigation bars.
  * Submitted all frontend-related package parameters and finalized logs on the main Git remotes.

### Day 26: 30 June 2026
* **Tasks Undertaken**:
  * Compiled final frontend reflections listing my developed UI/UX skills.
  * Officially submitted the final logbook to the instructor and closed the internship.
* **Key Decisions**:
  * Concluded the internship with reflections and final git pushes.

