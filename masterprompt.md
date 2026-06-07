Yeh lo — ek ultra-detailed master prompt jo aap Antigravity (ya kisi bhi AI coding tool) mein directly paste kar sakte ho:


You are an expert full-stack developer. Build a complete, production-ready website for **Zentrix IT Solutions** — a Bangalore-based Digital Forensics, Data Recovery, Corporate Investigation, and Cyber Intelligence company.

## TECH STACK
- **Backend:** Laravel 12 (PHP 8.3+)
- **Frontend:** React 19 + Inertia.js (SSR-ready)
- **Styling:** Tailwind CSS v4
- **Database:** MySQL 8
- **Admin Panel:** Custom Laravel admin (NOT Filament/Nova) with full CMS
- **Auth:** Laravel Breeze (admin only)
- **Email:** Laravel Mail + Queue (Mailgun/SMTP config)
- **Rich Text:** TipTap editor for CMS content blocks
- **File Storage:** Laravel Storage (local + S3-ready)
- **SEO:** Meta tags, OG tags, schema.org JSON-LD per page
- **Cache:** Laravel Cache (Redis-ready)

---

## DATABASE SCHEMA — Create migrations for all these tables:

### Core CMS Tables
```sql
pages (id, slug, title, meta_title, meta_description, og_image, is_active, created_at, updated_at)
page_sections (id, page_id, section_key, section_type, title, subtitle, content_json, image, order, is_active)
-- section_type: hero | cards | timeline | stats | faq | cta | text | gallery | team | testimonial

### Services
services (id, slug, title, short_description, long_description, icon, image, meta_title, meta_description, order, is_active)
service_features (id, service_id, title, description, icon, order)
service_faqs (id, service_id, question, answer, order)

### Blog & Case Studies
posts (id, slug, title, excerpt, content, featured_image, category_id, author_id, post_type, status, published_at, meta_title, meta_description, views)
-- post_type: blog | case_study | guide | news
post_categories (id, name, slug, description, color)
post_tags (id, name, slug)
post_tag_pivot (post_id, tag_id)

### Contact & Leads
contact_submissions (id, name, email, phone, service_type, message, urgency, source_page, ip_address, status, notes, created_at)
-- status: new | in_review | contacted | closed
-- urgency: normal | urgent | emergency

### Newsletter
newsletter_subscribers (id, email, name, status, subscribed_at, unsubscribed_at, token)
-- status: active | unsubscribed
email_campaigns (id, subject, content, template, status, scheduled_at, sent_at, sent_count, open_count)
campaign_recipients (id, campaign_id, subscriber_id, status, opened_at, clicked_at)

### Testimonials
testimonials (id, name, designation, company, content, rating, image, service_id, is_featured, order, is_active)

### Team
team_members (id, name, designation, bio, image, order, is_active, show_public)

### Case Studies (extended)
case_studies (id, slug, title, industry, challenge, solution, outcome, is_featured, is_confidential, thumbnail, order)

### Site Settings
settings (id, key, value, type, group)
-- keys: site_name, site_email, phone, address, whatsapp, facebook, linkedin, google_maps_embed, smtp_*, recaptcha_*, analytics_id

### Media Library
media (id, filename, original_name, mime_type, size, path, alt_text, caption, uploaded_by)


ADMIN PANEL — Build at route /admin
Auth
Login page: /admin/login (email + password)
Single admin user seeded by default (email: admin@zentrixit.com, password: Admin@123)
Remember me, session timeout after 2 hours
Admin Sidebar Navigation
Dashboard
├── Analytics Overview
└── Quick Stats

Content Management
├── Pages
│ └── Page Sections (drag & drop order)
├── Services
├── Blog Posts
├── Case Studies
└── Media Library

Leads & Communication
├── Contact Submissions
│ ├── All Leads
│ ├── Urgent Cases
│ └── Export CSV
├── Newsletter
│ ├── Subscribers
│ ├── Create Campaign
│ └── Sent Campaigns

Website Elements
├── Testimonials
├── Team Members
├── FAQs (global)
└── Settings
├── General Settings
├── SEO Settings
├── Email/SMTP Settings
└── Social Media Links

Dashboard Features
Cards: Total Leads (today/week/month), New Subscribers, Active Services, Published Posts
Chart: Lead submissions over last 30 days (line chart)
Table: Latest 5 contact submissions
Quick action buttons: Create Post, View Leads, Send Campaign
Pages CMS
List all pages with edit button
Each page has: Meta fields (title, description, OG image)
Page Sections: drag-drop reorder, enable/disable toggle per section
Per section: WYSIWYG content (TipTap), image upload, JSON config for repeating items (cards, FAQs, stats)
DO NOT allow deleting core pages, only editing
Contact Submissions
Full data table with columns: Date, Name, Phone, Email, Service, Urgency badge, Status, Actions
Filter by: Service type, Urgency, Status, Date range
Click row to view full submission detail modal
Status update dropdown (New → In Review → Contacted → Closed)
Admin notes field per submission
Export to CSV button
Send reply email button (opens compose modal with template)
Mark as urgent toggle
Newsletter Module
Subscribers list: email, name, subscribed date, status, unsubscribe option
Import subscribers CSV
Export subscribers CSV
Create Campaign:Subject, From Name, Preheader text
TipTap rich text editor for email body
Preview in browser button
Select recipients: All | Active only | Custom segment
Schedule send (datetime picker) OR send now
Test send (send to admin email first)
Campaign history: status, sent count, open rate display
Blog/Posts Editor
Create/Edit post with: Title, Slug (auto-generated, editable), Excerpt, TipTap content editor, Featured image upload, Category, Tags (multi-select), Post type, Status (Draft/Published/Archived), Scheduled publish date, SEO fields
Settings Panel
General: Site name, tagline, address, phone, email, WhatsApp number
Email/SMTP: Host, port, username, password, from name, from email — with "Send Test Email" button
SEO: Default meta description, default OG image
Social: Facebook, LinkedIn, Twitter, Instagram URLs
Google: Maps embed code, Analytics ID, reCAPTCHA keys
Appearance: Logo upload, favicon upload

PUBLIC WEBSITE — 10 Pages with Inertia.js + React
Global Elements
Navbar (sticky):

Logo left
Nav links: Home | Services (dropdown) | About | Case Studies | Blog | Contact
Right: Phone number + "Free Consultation" button (accent colored)
Mobile: Hamburger menu with slide-in drawer
Scroll behavior: transparent on hero, white/dark on scroll
Footer:

Column 1: Logo, tagline, social icons, trust badges
Column 2: Services links
Column 3: Company links (About, Blog, Careers, Privacy Policy)
Column 4: Contact info + WhatsApp button
Bottom bar: Copyright, Privacy Policy, Terms, Sitemap
Newsletter signup inline in footer
Floating Elements:

WhatsApp sticky button (bottom right, always visible)
"Call Now" sticky button (bottom left on mobile)
Cookie consent banner (first visit)

PAGE 1: Homepage (/)
Section 1 — Animated Hero

Full-screen dark background with CSS animated particle network (canvas-based, pure JS)
H1: "Digital Investigations. Legal Data Recovery. Corporate Intelligence."
Subtext: Company tagline
Two CTAs: "Request Consultation" (primary) + "Our Services" (outline)
Scroll-down indicator
Section 2 — Marquee Trust Ticker

Infinite scrolling marquee: "✓ Trusted by Law Firms · ✓ Corporate Organizations · ✓ Financial Institutions · ✓ 500+ Cases Resolved · ✓ 100% Confidential"
Section 3 — Problem Statement

Bold centered headline: "Digital threats don't wait. Evidence degrades every second."
3 problem columns with icons: "Evidence lost?", "Fraud suspected?", "Need verification?"
Section 4 — Services Grid

6 animated cards (hover effect: lift + glow border)
Each: Icon, Service name, 1-line description, "Learn More" link
Services: Data Recovery | Digital Forensics | Corporate Investigations | Background Verification | Cyber Intelligence | Evidence Preservation
Section 5 — Stats Counter

Dark background section
4 animated counters (CountUp.js on scroll enter): 500+ Cases Resolved | 98% Success Rate | 10+ Years Experience | 100% Confidential
Section 6 — Why Choose Zentrix

4-column grid: Confidentiality First | Legal & Ethical | Expert Team | Timely Reports
Each with icon, title, 2-line description
Section 7 — How It Works

3-step horizontal process: Step 1: Free Consultation → Step 2: Investigation/Recovery → Step 3: Detailed Report
Animated connecting line between steps
Section 8 — Industries We Serve

Icon grid: Law Firms | Corporates | Financial | Startups | Insurance | Individuals | Education | Healthcare
Section 9 — Featured Case Study

Dark card with blurred/anonymized case details
Industry badge, challenge snippet, outcome result
"Read Case Study" button
Section 10 — Testimonials Carousel

Star ratings, quote, client name + company/role
Auto-play carousel with pause on hover
Section 11 — Tools & Technology

"Forensic-grade tools we trust" heading
Logo badges: FTK Imager, Cellebrite, EnCase, Autopsy, Maltego, Wireshark
Section 12 — Blog Preview

3 latest posts as cards: thumbnail, category badge, title, excerpt, "Read More"
Section 13 — Urgency Banner

High-contrast strip: "Digital evidence has a window. The sooner you act, the more we can recover."
CTA button inline
Section 14 — FAQ Accordion

5 most common questions with smooth expand/collapse animation
Section 15 — Confidentiality Pledge

Centered with seal icon: "Every case is handled under strict NDA. Your identity and case details are never disclosed."
Section 16 — Mini Contact Form

Name, Phone, Service dropdown, Submit
On submit: POST to /api/contact, show success toast
Section 17 — Map + Office Info

Two columns: Left = contact details, Right = Google Maps embed
Section 18 — CTA Final

Full-width gradient: "Ready to uncover the truth?" + Consultation button

PAGE 2: Services Overview (/services)
Hero with breadcrumb
Sticky horizontal tab nav for 6 services (smooth scroll to section)
Each service: Full card with icon, name, description, sub-services list, "Learn More" link
Process timeline: 5 horizontal steps
Tools grid
Legal compliance callout box (Indian IT Act, DPDP Act)
CTA: Request a Quote form
Footer
PAGE 3: Digital Forensics (/services/digital-forensics)
Build full deep-dive service page with all sections from the plan above. Load content from services table via slug.

PAGE 4: Data Recovery (/services/data-recovery)
Full service page. Include success rate animated bars per device type (HDD 92%, SSD 85%, Mobile 88%, USB 78%). "No Recovery, No Fee" badge prominently.

PAGE 5: Corporate Investigations (/services/corporate-investigations)
Full service page. Include fraud cost stat infographic. Retainer packages table.

PAGE 6: Background Verification (/services/background-verification)
Full service page. Interactive checklist UI. Sample report (blurred PDF preview image).

PAGE 7: Cyber Intelligence (/services/cyber-intelligence)
Full service page. Forced dark theme for this page. Network node SVG animation in hero.

PAGE 8: About Us (/about)
Company story, mission/vision, values
Team section (show_public=true members only, masked photos if show_public but no image)
Milestones horizontal scroll timeline
Certifications, legal registration trust signals
Stats counters
Privacy commitment section
PAGE 9: Blog & Case Studies (/blog)
Filter bar: All | Blog | Case Study | Guide | News
3-column card grid (loads from posts table)
Pagination (12 per page)
Search bar
Featured post full-width at top
Newsletter signup mid-page
Single Post Page (/blog/[slug])

Full content render
Author, date, category, tags
Related posts (3 cards)
Share buttons
CTA sidebar: "Need help with a similar case?"
PAGE 10: Contact (/contact)
Hero with urgency message
NDA/confidentiality assurance badge
Main contact form: Name, Email, Phone, Service (dropdown), Message, Urgency (Normal/Urgent/Emergency), Captcha
On submit:Save to contact_submissions table
Send confirmation email to user (queued)
Send notification email to admin
Show success message with "What happens next" steps
WhatsApp direct button
Google Maps embed
Office hours
Emergency contact highlight
FAQ accordion

API ROUTES (Laravel)
// Public
POST /api/contact // Submit contact form
POST /api/newsletter/subscribe // Newsletter signup
GET /api/newsletter/unsubscribe/{token} // Unsubscribe

// Inertia pages (web routes)
GET / | /services | /services/{slug} | /about | /blog | /blog/{slug} | /contact

// Admin (auth:admin middleware)
GET/POST/PUT/DELETE /admin/pages
GET/POST/PUT/DELETE /admin/pages/{id}/sections
GET/POST/PUT/DELETE /admin/services
GET/POST/PUT/DELETE /admin/posts
GET/POST/PUT/DELETE /admin/case-studies
GET/POST/PUT/DELETE /admin/testimonials
GET/POST/PUT/DELETE /admin/team
GET/POST/PUT/DELETE /admin/contact-submissions
GET/POST/PUT/DELETE /admin/newsletter/subscribers
GET/POST/PUT/DELETE /admin/newsletter/campaigns
POST /admin/newsletter/campaigns/{id}/send
POST /admin/newsletter/campaigns/{id}/test
GET/POST /admin/settings
POST /admin/media/upload
DELETE /admin/media/{id}
POST /admin/email/test


EMAIL TEMPLATES (Blade + inline CSS)
Create these email templates:

contact_confirmation.blade.php — Sent to user after form submit

"Thank you for reaching out to Zentrix IT Solutions"
Their submission details
"We will respond within 2 hours"
Company contact details
contact_admin_notification.blade.php — Sent to admin

New lead alert
All form fields
Direct link to admin panel submission
newsletter_campaign.blade.php — Used for newsletter sends

Header with logo
Dynamic content block from TipTap
Unsubscribe link at bottom
newsletter_welcome.blade.php — On subscription

Welcome message
What to expect

QUEUE SETUP
Configure Laravel Queue with database driver (default)
All emails dispatched as queued jobs
php artisan queue:work runs as background process
Failed jobs table migration included

SEEDER DATA
Create DatabaseSeeder with:

Admin user: admin@zentrixit.com / Admin@123
6 services with full content
10 pages (all site pages with default CMS sections)
5 sample testimonials
3 sample blog posts
3 sample case studies
Default settings (site name, placeholder contact info)
4 team members (show_public = false by default)

DESIGN SYSTEM (Tailwind Config)
// tailwind.config.js
colors: {
primary: {
50: '#E6F0FF',
100: '#B3CFFF',
500: '#1A4FBF',
600: '#153FA6',
700: '#0F2E8C',
900: '#061547',
},
accent: '#00D4FF', // Electric cyan for CTAs
dark: '#080E1A', // Near-black background
surface: '#0F1829', // Card backgrounds in dark sections
muted: '#8899BB', // Secondary text
}

// Custom fonts (Google Fonts in layout.blade.php):
// Display: 'Syne' (bold headings)
// Body: 'DM Sans' (clean readable body)

Global CSS rules:

Dark hero sections: bg-dark
Light sections: bg-white or bg-gray-50
Accent color (#00D4FF) for: CTA buttons, hover states, active borders, counter numbers
All buttons: rounded-full (pill shape)
Cards: rounded-2xl, shadow-lg, hover:-translate-y-1 transition
Section padding: py-20 (desktop), py-12 (mobile)

ANIMATIONS & INTERACTIONS
Use these libraries (install via npm):

framer-motion — Page transitions, section reveals on scroll
react-countup — Stats counters
swiper — Testimonials carousel
react-hot-toast — Form submit notifications
tippy.js — Tooltips
aos (Animate on Scroll) — Section entrance animations
Scroll animations: fade-up on all section headings, stagger children cards with 100ms delay each.


PERFORMANCE & SEO
Implement Laravel Route caching
Image lazy loading on all img tags
Implement <meta> tags via Laravel SEO package or custom meta component in React
Schema.org JSON-LD on:Homepage: LocalBusiness schema
Service pages: Service schema
Blog posts: Article schema
Sitemap: Auto-generated at /sitemap.xml (update on post/service publish)
robots.txt: Allow all except /admin
OG image fallback to default if page has no OG image set

SECURITY
CSRF on all forms
Rate limiting: 5 requests/minute on /api/contact, 3/minute on /api/newsletter/subscribe
Admin routes behind auth:admin middleware
File upload validation: mime type check, max 5MB, images only for images
XSS protection via Inertia shared data sanitization
SQL injection protection via Eloquent ORM
Admin login: max 5 failed attempts then 15-minute lockout (Laravel's built-in throttle)
All admin passwords bcrypt hashed
Sensitive settings (SMTP password, API keys) encrypted in DB using Laravel Crypt

FOLDER STRUCTURE
zentrix/
├── app/
│ ├── Http/Controllers/
│ │ ├── Admin/
│ │ │ ├── DashboardController.php
│ │ │ ├── PageController.php
│ │ │ ├── ServiceController.php
│ │ │ ├── PostController.php
│ │ │ ├── ContactSubmissionController.php
│ │ │ ├── NewsletterController.php
│ │ │ ├── CampaignController.php
│ │ │ ├── TeamController.php
│ │ │ ├── TestimonialController.php
│ │ │ ├── MediaController.php
│ │ │ └── SettingsController.php
│ │ ├── Api/
│ │ │ ├── ContactController.php
│ │ │ └── NewsletterController.php
│ │ └── Web/
│ │ ├── HomeController.php
│ │ ├── ServiceController.php
│ │ ├── PostController.php
│ │ ├── AboutController.php
│ │ └── ContactController.php
│ ├── Models/ (all models)
│ ├── Mail/ (all Mailable classes)
│ ├── Jobs/ (queued email jobs)
│ └── Services/ (NewsletterService, CampaignService)
├── resources/
│ ├── js/
│ │ ├── Pages/
│ │ │ ├── Home.jsx
│ │ │ ├── Services/
│ │ │ │ ├── Index.jsx
│ │ │ │ └── Show.jsx
│ │ │ ├── Blog/
│ │ │ │ ├── Index.jsx
│ │ │ │ └── Show.jsx
│ │ │ ├── About.jsx
│ │ │ ├── Contact.jsx
│ │ │ └── Admin/
│ │ │ ├── Dashboard.jsx
│ │ │ ├── Pages/Index.jsx, Edit.jsx
│ │ │ ├── Services/Index.jsx, Edit.jsx
│ │ │ ├── Posts/Index.jsx, Edit.jsx
│ │ │ ├── Contact/Index.jsx, Show.jsx
│ │ │ ├── Newsletter/Subscribers.jsx, Campaigns.jsx, Create.jsx
│ │ │ ├── Team/Index.jsx, Edit.jsx
│ │ │ ├── Testimonials/Index.jsx, Edit.jsx
│ │ │ ├── Media/Index.jsx
│ │ │ └── Settings/Index.jsx
│ │ ├── Components/
│ │ │ ├── Layout/Navbar.jsx, Footer.jsx, AdminSidebar.jsx
│ │ │ ├── UI/Button.jsx, Card.jsx, Badge.jsx, Modal.jsx, Toast.jsx
│ │ │ ├── Forms/ContactForm.jsx, NewsletterForm.jsx
│ │ │ ├── Sections/ (HeroSection, StatsSection, TestimonialsSection, etc.)
│ │ │ └── Admin/ (DataTable.jsx, RichEditor.jsx, ImageUpload.jsx, etc.)
│ │ └── app.jsx
│ └── views/
│ ├── app.blade.php (Inertia root)
│ ├── admin.blade.php (Admin root)
│ └── emails/ (all email templates)
├── database/
│ ├── migrations/
│ └── seeders/
└── routes/
├── web.php
├── api.php
└── admin.php


SETUP COMMANDS (include in README.md)
composer install
npm install
cp .env.example .env
php artisan key:generate
# Configure DB in .env
php artisan migrate --seed
php artisan storage:link
npm run build
php artisan serve
# In another terminal:
php artisan queue:work


DELIVERABLE
Generate the COMPLETE codebase. Every file. Every migration. Every React component. Every controller. Every email template. Do not skip any file. Do not use placeholder comments like "// implement this". Write full working code for every single file listed above.

Start with:

All migrations in order
All models with relationships
All seeders
Routes (web, api, admin)
Controllers
React pages and components (all of them)
Email templates
tailwind.config.js and app.jsx setup
README.md with setup instructions


=== ADD THIS SECTION TO THE MASTER PROMPT (Replace "PAGE 1 to PAGE 10" section) ===

## PUBLIC WEBSITE — 10 PAGES — COMPLETE SECTION-BY-SECTION SPECIFICATION

### GLOBAL COMPONENTS (used on every page)

**Navbar (sticky, always on top):**
- Logo left side (from settings table)
- Nav links center: Home | Services (mega-dropdown with 6 services) | About | Case Studies | Blog | Contact
- Right side: Phone number clickable + "Free Consultation" pill button (accent color)
- Scroll behavior: bg-transparent on hero, bg-dark/95 backdrop-blur after 80px scroll
- Mobile: hamburger → full-screen slide-in drawer with same links
- Active link indicator: accent color underline

**Footer (global):**
- Col 1: Logo, tagline, social icons (LinkedIn, Facebook, Instagram, Twitter), "Licensed & Confidential" badge
- Col 2: Services (6 links)
- Col 3: Company (About, Blog, Case Studies, Careers, Privacy Policy, Terms)
- Col 4: Contact block (address, phone, email, WhatsApp button, business hours)
- Middle strip: Newsletter inline form (email input + Subscribe button)
- Bottom bar: Copyright 2025 Zentrix IT Solutions | Privacy Policy | Terms | Sitemap
- Background: bg-dark (near black)

**Floating Elements (all pages):**
- WhatsApp button: fixed bottom-right, green circle with WhatsApp icon, pulse animation
- Call Now button: fixed bottom-left mobile only, accent colored
- Back to top button: appears after 300px scroll, bottom-center

---

### PAGE 1: HOMEPAGE (route: /)
React component: resources/js/Pages/Home.jsx

**SECTION 1 — Full Screen Animated Hero**
- Background: Pure black (#080E1A) with canvas-based particle network animation (white/cyan dots connected by lines, mouse-interactive, particles flow slowly)
- Eyebrow label: Small caps badge "Digital Investigation & Intelligence Services"
- H1 (large, Syne font, white): "Digital Investigations. Legal Data Recovery. Corporate Intelligence."
- Subtext (DM Sans, muted color): "We help individuals, businesses, law firms, and organizations recover critical digital evidence, conduct lawful investigations, and protect valuable information."
- CTA row: "Request Consultation" (solid accent button) + "Explore Services" (outline white button)
- Bottom: Animated scroll indicator (bouncing chevron down)
- Trust micro-badges row below CTAs: ✓ Confidential  ✓ Legal & Ethical  ✓ Bangalore-based
- Entire section height: 100vh

**SECTION 2 — Infinite Marquee Trust Ticker**
- Dark strip (slightly lighter than hero bg)
- Infinite left-scrolling marquee (CSS animation, no library needed)
- Content: "✓ Trusted by Law Firms · ✓ Corporate Organizations · ✓ Financial Institutions · ✓ 500+ Cases Resolved · ✓ 100% Confidential · ✓ Evidence Preservation · ✓ Bangalore's #1 Digital Forensics · ✓ Legal Compliance Guaranteed ·" (repeats)
- Font: 13px uppercase tracking-widest, muted color
- Pauses on hover

**SECTION 3 — Problem Statement Hook**
- White background section
- Centered H2 (dark): "Digital threats don't wait. Evidence degrades every second."
- Subheading: "Whatever your situation — we have the expertise to help."
- 3-column icon cards below:
  - Card 1: 🔍 Icon, "Lost Critical Data?", "Accidental deletion, hardware failure, or corruption — we recover what others can't."
  - Card 2: 🕵 Icon, "Suspected Fraud or Misconduct?", "Internal threats, employee fraud, or corporate espionage — we investigate discreetly."
  - Card 3: ⚖️ Icon, "Need Legal Digital Evidence?", "Court-admissible forensic reports with full chain-of-custody documentation."
- Cards: white bg, subtle border, hover lift effect, rounded-2xl

**SECTION 4 — Services Grid (6 Cards)**
- Light gray background (bg-gray-50)
- Section label: "What We Do"
- H2: "Comprehensive Digital Investigation Services"
- 3x2 grid of service cards (responsive: 1 col mobile, 2 col tablet, 3 col desktop)
- Each card: Large icon (accent color), Service name (bold), 2-line description, "Learn More →" link
- Card hover: border color accent, slight lift, icon glow
- Services:
  1. Data Recovery — "HDD, SSD, Mobile, USB recovery from any failure scenario"
  2. Digital Forensics — "Court-ready forensic examination of all electronic devices"
  3. Corporate Investigations — "Fraud, misconduct, and due diligence investigations"
  4. Background Verification — "Employment, address, education, identity checks"
  5. Cyber Intelligence — "OSINT, digital footprint, and risk intelligence"
  6. Evidence Preservation — "Chain-of-custody documentation for legal proceedings"
- Bottom CTA: "View All Services →" centered link

**SECTION 5 — Stats Counter (Dark Background)**
- bg-dark section, full width
- Diagonal cut top edge (CSS clip-path)
- 4 stat blocks in a row:
  - "500+" label "Cases Resolved" subtext
  - "98%" label "Recovery Success Rate" subtext
  - "10+" label "Years of Experience" subtext
  - "100%" label "Client Confidentiality" subtext
- Numbers animate with CountUp when section enters viewport (IntersectionObserver)
- Numbers color: accent (#00D4FF)
- Dividers between stats: thin vertical lines

**SECTION 6 — Why Choose Zentrix (4 Pillars)**
- White background
- H2: "Why Clients Trust Zentrix IT Solutions"
- 4-column grid (2x2 on mobile):
  - Pillar 1: Shield icon, "Confidentiality First", "Every case handled under strict NDA. Zero information shared."
  - Pillar 2: Scale icon, "100% Legal & Ethical", "All services comply with Indian IT Act, IPC, and applicable laws."
  - Pillar 3: CPU icon, "Forensic-Grade Technology", "Industry-leading tools: FTK, Cellebrite, EnCase, Maltego."
  - Pillar 4: Clock icon, "Timely Reporting", "Clear structured reports delivered within agreed timelines."
- Each pillar: icon in accent-colored circle, bold title, description text
- Subtle background pattern (dot grid CSS)

**SECTION 7 — How It Works (3-Step Process)**
- Light section
- H2: "Simple. Confidential. Effective."
- Horizontal 3-step layout with connecting animated dashed line between steps:
  - Step 1: Circle "01", "Free Confidential Consultation", "Share your situation. We listen without judgment and propose a plan."
  - Step 2: Circle "02", "Investigation or Recovery", "Our team gets to work using forensic methodologies and advanced tools."
  - Step 3: Circle "03", "Detailed Report Delivered", "You receive a clear, structured, court-ready report with findings."
- On mobile: vertical stacked layout
- CTA below: "Start with a Free Consultation →" button

**SECTION 8 — Industries We Serve**
- Dark background section
- H2: "Serving Clients Across Every Sector"
- 4x2 icon grid (8 industries):
  1. ⚖️ Law Firms
  2. 🏢 Corporate Organizations
  3. 🏦 Financial Institutions
  4. 🚀 Startups
  5. 🛡️ Insurance Companies
  6. 👤 Individuals
  7. 🎓 Educational Institutions
  8. 🏥 Healthcare Organizations
- Each: Icon + Label, hover: accent colored border card
- Subtle description below grid: "Tailored solutions for every client's unique requirements."

**SECTION 9 — Featured Case Study Teaser**
- Split layout: Left text, Right dark card
- Left: "Real Results. Real Cases." label, H2 "We've solved what others couldn't.", description about confidential handling
- Right card (dark, accent border): 
  - "CASE #ZIT-2024-047" in monospace font
  - Industry badge: "Corporate · Financial Fraud"
  - Challenge: "Internal data theft suspected across 3 departments..."
  - Outcome badge: "✓ Culprit Identified | ✓ Evidence Court-Admissible"
  - "Details Confidential" watermark overlay
  - "Read Full Case Study" button
- Card has subtle glitch/scan-line CSS animation on hover

**SECTION 10 — Testimonials Carousel**
- Light gray background
- H2: "What Our Clients Say"
- Swiper.js carousel, 1 slide visible, autoplay 4s, pause on hover
- Each slide: Large quote mark (accent), quote text, star rating (5 stars), client name, designation/company
- Navigation dots below
- Prev/Next arrow buttons
- Load testimonials from testimonials table (is_featured = true, limit 6)

**SECTION 11 — Video/Explainer Placeholder**
- Dark section
- H2: "See How We Work"
- Full-width video embed container (YouTube embed or placeholder with play button overlay)
- Overlay: dark gradient with play button circle in center
- Below video: 3 quick stat pills "Confidential Process · Court-Admissible Reports · 48hr Turnaround"

**SECTION 12 — Tools & Technology**
- White section
- H2: "Forensic-Grade Tools We Trust"
- Subtext: "Industry-leading software and hardware for accurate results"
- Tool logo badges grid (grayscale, hover: color):
  FTK Imager | Cellebrite UFED | EnCase | Autopsy | Maltego | Wireshark | X-Ways | Oxygen Forensic
- Below: "Every tool used maintains evidence integrity for legal admissibility."

**SECTION 13 — Blog/Insights Preview**
- Light gray background
- Section label: "Knowledge Hub"
- H2: "Latest from Zentrix Insights"
- 3 blog post cards in a row:
  - Each: Featured image (or colored placeholder), Category badge (colored), Title (bold), Excerpt (2 lines), Read time, Date, "Read Article →" link
- Load from posts table (status=published, order by published_at desc, limit 3)
- Bottom: "View All Articles →" centered button

**SECTION 14 — FAQ Accordion**
- White background
- H2: "Frequently Asked Questions"
- 6 accordion items with smooth expand/collapse:
  1. "Is data recovery guaranteed?" — "Recovery depends on device condition, damage level..."
  2. "Are your investigations legal and ethical?" — "Yes. All services follow Indian IT Act..."
  3. "Is my information kept confidential?" — "Absolutely. Every case is handled under NDA..."
  4. "Do you work with businesses and law firms?" — "Yes. We have dedicated corporate..."
  5. "Can your forensic reports be used in court?" — "Yes. Our reports follow chain-of-custody..."
  6. "What is your typical turnaround time?" — "Depends on service and complexity..."
- Only one item open at a time
- Plus/minus icon animates on toggle

**SECTION 15 — Urgency CTA Banner**
- Full-width, accent gradient background (dark blue to cyan gradient)
- Bold white text: "Digital evidence has a time window."
- Subtext: "The longer you wait, the less we can recover. Contact us now."
- Two buttons: "Call Now" (white solid) + "WhatsApp Us" (outline white)
- Subtle pulsing border animation on section

**SECTION 16 — Team Preview**
- Dark section
- H2: "Expert Investigators & Forensic Specialists"
- Subtext: "Our team identities remain protected for operational security"
- 3 team member cards:
  - Silhouette avatar (CSS generated, no real photo unless show_public=true)
  - Role title (e.g., "Lead Digital Forensics Analyst")
  - Short expertise tags (e.g., "Mobile Forensics · OSINT · Evidence Preservation")
  - No real name if privacy protected
- Below cards: "Our team brings combined experience from law enforcement, corporate security, and IT forensics."

**SECTION 17 — Confidentiality Pledge**
- White background, centered layout
- Large seal/badge SVG illustration (centered, accent colored)
- Bold H2: "Your Privacy Is Our Highest Priority"
- 3 pledge points:
  - "Every case begins with a Non-Disclosure Agreement"
  - "Client identity never shared with any third party"
  - "All case data permanently deleted post-engagement"
- "We take confidentiality as seriously as you do."

**SECTION 18 — Mini Contact Form**
- Light gray background
- Left column: H2 "Start a Confidential Consultation", contact details (phone, email, WhatsApp, hours)
- Right column: Form with fields:
  - Full Name (text)
  - Phone Number (tel)
  - Email Address (email)
  - Service Required (select dropdown: 6 services + "Not Sure")
  - Brief Description (textarea, 3 rows)
  - Submit button: "Send Confidential Inquiry"
- Form validation: client-side + server-side
- On success: Show success card with "We'll respond within 2 hours"
- POST to /api/contact

**SECTION 19 — Map & Location**
- Split layout
- Left: Office details card:
  - "Zentrix IT Solutions" bold
  - Address: Bangalore, Karnataka, India
  - Phone (clickable tel: link)
  - Email (clickable mailto: link)
  - Business Hours: Mon–Sat 9AM–7PM
  - WhatsApp button (green)
- Right: Google Maps embed (from settings table: google_maps_embed key)
- Map height: 350px, rounded corners

**SECTION 20 — Footer**
(Global footer as described above)

---

### PAGE 2: SERVICES OVERVIEW (route: /services)
React component: resources/js/Pages/Services/Index.jsx

**SECTION 1 — Page Hero**
- Dark hero, shorter than homepage (60vh)
- Breadcrumb: Home > Services
- H1: "Our Services"
- Subtext: "Comprehensive digital investigation, forensics, and intelligence services for individuals and organizations."
- Background: dark with subtle hex grid pattern CSS

**SECTION 2 — Service Navigator (Sticky Tab Bar)**
- Sticky horizontal tab bar (sticks below navbar on scroll)
- 6 tabs: Data Recovery | Digital Forensics | Corporate Investigations | Background Verification | Cyber Intelligence | Evidence Preservation
- Click: smooth scroll to that service section on same page
- Active tab: accent underline + color
- On mobile: horizontal scrollable tabs

**SECTION 3 — Data Recovery Service Block**
- ID: #data-recovery (scroll target)
- Split: Left = content, Right = icon illustration
- Badge: "Service 01"
- H2: "Digital Data Recovery"
- Description paragraph
- Sub-services list with check icons:
  ✓ Hard Drive Recovery  ✓ SSD Recovery  ✓ Mobile Data Recovery
  ✓ Memory Card Recovery  ✓ USB Recovery  ✓ Formatted Drive Recovery
- "Learn More" button → /services/data-recovery

**SECTION 4 — Digital Forensics Service Block**
- ID: #digital-forensics
- Alternating layout (Right content, Left illustration)
- Same structure as above with forensics sub-services

**SECTION 5 — Corporate Investigations Service Block**
- ID: #corporate-investigations
- Same pattern, alternating layout

**SECTION 6 — Background Verification Service Block**
- ID: #background-verification
- Same pattern

**SECTION 7 — Cyber Intelligence Service Block**
- ID: #cyber-intelligence
- Same pattern

**SECTION 8 — Evidence Preservation Service Block**
- ID: #evidence-preservation
- Same pattern

**SECTION 9 — Process Timeline**
- Light section
- H2: "Our Investigation & Recovery Process"
- 5-step horizontal timeline:
  Step 1: "Initial Consultation" — Understand your situation confidentially
  Step 2: "Case Assessment" — Evaluate scope, devices, requirements
  Step 3: "Investigation/Recovery" — Deploy tools and methodologies
  Step 4: "Analysis & Verification" — Verify findings, maintain chain of custody
  Step 5: "Report Delivery" — Structured professional report
- Animated progress line connecting steps
- On mobile: vertical timeline

**SECTION 10 — Tools We Use**
- Dark background
- H2: "Industry-Leading Forensic Tools"
- 4x2 tool cards: Tool name, category badge (Hardware/Software), brief description
- FTK Imager | Cellebrite UFED | EnCase | Autopsy | Maltego | Wireshark | X-Ways Forensics | Oxygen Forensic Detective

**SECTION 11 — Legal Compliance Callout**
- Accent-bordered info box (full width)
- Icon: Scale/Law
- Bold: "All Services Are Legally & Ethically Conducted"
- Text: "We operate strictly within Indian IT Act 2000 (amended 2008), IPC, CrPC, and the DPDP Act 2023. All evidence handling follows court-admissible chain-of-custody protocols."

**SECTION 12 — Turnaround Time Table**
- White section
- H2: "Service Delivery Timelines"
- Clean table:
  | Service | Standard | Urgent | Emergency |
  | Data Recovery | 3-7 days | 24-48 hrs | Same day |
  | Digital Forensics | 5-10 days | 48-72 hrs | 24 hrs |
  | Background Verification | 2-5 days | 24-48 hrs | 12 hrs |
  | Corporate Investigation | 7-21 days | 3-5 days | 48 hrs |
  | Cyber Intelligence | 3-7 days | 24-48 hrs | 12 hrs |
- Note below: "Timelines depend on case complexity. Emergency cases handled on priority."

**SECTION 13 — Emergency Services Banner**
- Red-tinted dark banner
- "🚨 Emergency Case? We're Available."
- "Critical evidence can degrade within hours. Call our emergency line immediately."
- Large phone number button + WhatsApp button

**SECTION 14 — FAQ Section**
- Light gray background
- H2: "Common Questions About Our Services"
- 6 accordion items covering general service questions

**SECTION 15 — Related Case Studies**
- Dark section
- H2: "Proven Results Across Cases"
- 3 blurred/anonymized case study cards:
  Each: Industry tag, Challenge headline, Outcome tag, "View Details" button
- Load from case_studies table (is_featured=true, limit 3)

**SECTION 16 — Pricing Inquiry CTA**
- Centered white section
- H2: "Get a Custom Quote"
- Text: "Every case is unique. We provide tailored pricing based on your specific requirements."
- Form: Name, Email, Phone, Service type, Brief description
- Submit → POST /api/contact with source_page='services-pricing'

**SECTION 17 — Client Sectors Strip**
- Dark thin strip
- "Trusted by professionals across:" + 8 industry text badges in a row

**SECTION 18 — Footer**

---

### PAGE 3: DIGITAL FORENSICS DEEP PAGE (route: /services/digital-forensics)
React component: resources/js/Pages/Services/Show.jsx (reusable, loads by slug)

**SECTION 1 — Service Hero**
- Dark hero (60vh) with forensics-specific background (circuit board pattern CSS)
- Breadcrumb: Home > Services > Digital Forensics
- H1: "Digital Forensics Services"
- Subtext: "Professional forensic examination of electronic devices for legal, corporate, and personal matters."
- Two CTAs: "Request Forensic Analysis" + "Download Service Guide"
- Right side: Floating stats card (Cases: 200+, Admissibility Rate: 100%, Avg Turnaround: 5 days)

**SECTION 2 — What Is Digital Forensics**
- White section, split layout
- Left: H2 "What Is Digital Forensics?", explanation paragraph, 4 bullet points of what it covers
- Right: Illustrated infographic (SVG or styled div) showing device → examination → report flow

**SECTION 3 — When Do You Need It (Scenario Cards)**
- Light gray background
- H2: "Is Digital Forensics Right for You?"
- 6 scenario cards in 2x3 grid:
  1. "Employee deleted company files before leaving"
  2. "Suspected internal fraud or data leak"
  3. "Need evidence for legal proceedings"
  4. "Cyber attack or unauthorized access"
  5. "Divorce or custody digital evidence"
  6. "Insurance claim requiring digital proof"
- Each card: Icon, scenario title, "This is for you if..." subtext, accent border on hover

**SECTION 4 — Our Forensic Process (Animated Vertical Timeline)**
- Dark background section
- H2: "Our Forensic Investigation Process"
- Vertical timeline (left line, right content), 6 steps:
  Step 1: "Case Intake & NDA" — Sign confidentiality agreement, brief intake form
  Step 2: "Device Receipt & Logging" — Secure chain-of-custody documentation begins
  Step 3: "Forensic Imaging" — Bit-by-bit clone using write-blockers, hash verification
  Step 4: "Analysis & Examination" — Deep examination using FTK, Cellebrite, Autopsy
  Step 5: "Findings Documentation" — All findings recorded with timestamps and metadata
  Step 6: "Report Generation & Delivery" — Court-ready report with expert attestation
- Each step: Number circle (accent), Step title (bold), Description, Tool/Method badge
- Line animates drawing on scroll

**SECTION 5 — Computer Forensics Sub-Service**
- White, split layout
- Icon, "Computer Forensics", description, sub-features list
- What we recover: Deleted files, emails, browsing history, chat logs, documents, timestamps

**SECTION 6 — Mobile Device Forensics Sub-Service**
- Light gray, alternating layout
- Mobile phone illustration (CSS/SVG)
- Supports: iOS, Android, feature phones, tablets
- Can recover: WhatsApp, Telegram, deleted messages, call logs, photos, app data

**SECTION 7 — Evidence Collection Sub-Service**
- White section
- Chain-of-custody flowchart (horizontal steps):
  Device Received → Hash Verified → Imaged → Examined → Documented → Sealed
- "Every piece of evidence is handled with strict chain-of-custody to ensure court admissibility"

**SECTION 8 — Metadata Analysis Sub-Service**
- Dark section
- Visual showing layers: File Layer → Metadata Layer → System Layer
- "We extract creation dates, modification history, GPS coordinates, device identifiers, and more"
- Use cases: Document authenticity, photo location proof, file tampering detection

**SECTION 9 — Forensic Report Preview**
- White section
- H2: "Professional Forensic Reports"
- Left: Blurred/redacted sample report preview image with "SAMPLE - CONFIDENTIAL" watermark
- Right: What our reports include:
  ✓ Executive Summary
  ✓ Methodology used
  ✓ Chain of custody log
  ✓ Detailed findings with timestamps
  ✓ Screenshots and evidence exhibits
  ✓ Expert opinion and conclusions
  ✓ Investigator attestation

**SECTION 10 — Court Admissibility**
- Accent-bordered info box
- "Our Reports Are Designed for Court Use"
- Checklist: ISO/IEC 27037 aligned, Hash verification included, Write-blocker used, Expert attestable, Chain of custody maintained

**SECTION 11 — Tools & Technology**
- Light gray grid
- H2: "Tools We Use for Digital Forensics"
- Tool cards: FTK Imager, Cellebrite UFED, EnCase, Autopsy, X-Ways, Oxygen Forensics
- Each card: Logo placeholder, Tool name, Category, What it does in 1 line

**SECTION 12 — Case Statistics**
- Dark section, 4 counters:
  200+ Devices Examined | 100% Court Admissibility | 48hr Express Option | 15+ Evidence Types

**SECTION 13 — Who It's For**
- White, H2 "Who Uses Our Forensic Services?"
- 3-column: Law Firms (legal proceedings), HR & Corporate (employee misconduct), Individuals (personal/civil matters)
- Each: Icon, Title, 3 use-case bullet points

**SECTION 14 — Anonymized Case Study**
- Dark card, full width
- "CASE STUDY — CONFIDENTIAL"
- Industry: IT Company, Bangalore
- Challenge: "Suspected data exfiltration by a departing senior employee..."
- Investigation: "Forensic imaging of company laptop revealed 47GB transferred to external drive 3 days before resignation..."
- Outcome: "Evidence presented in civil court. Employee's legal claims dropped. Company recovered ₹28 lakh in damages."
- Note: "All identifying details changed for confidentiality."

**SECTION 15 — Testimonial**
- Accent-left-bordered testimonial block
- Long quote from law firm or corporate client
- Star rating, name, designation, company type

**SECTION 16 — Service-Specific FAQ**
- 6 accordion items specific to digital forensics

**SECTION 17 — Related Services**
- Light gray, H2 "You May Also Need"
- 3 related service cards: Data Recovery | Evidence Preservation | Cyber Intelligence

**SECTION 18 — Urgency CTA**
- Full-width dark banner
- "Digital evidence is time-sensitive."
- "Devices that are powered on, overwritten, or damaged further reduce recovery chances."
- "Contact us immediately for a confidential assessment." + CTA button

**SECTION 19 — Contact Form (Pre-filled Service)**
- H2: "Request a Forensic Analysis"
- Form with service pre-selected as "Digital Forensics"
- Fields: Name, Email, Phone, Device Type (dropdown), Brief Description of Situation, Urgency level, Submit

**SECTION 20 — Footer**

---

### PAGE 4: DATA RECOVERY (route: /services/data-recovery)
React component: Same Services/Show.jsx with slug='data-recovery'

**SECTION 1 — Hero**
- Dark hero
- H1: "Professional Data Recovery Services"
- Subtext: "Lost data doesn't always mean lost forever. Our lab-grade recovery process retrieves what you thought was gone."
- CTA: "Evaluate My Device" + "How It Works"
- Stats badges: 98% Success Rate | No Recovery No Fee | 48hr Express

**SECTION 2 — Recovery Types Grid**
- White, H2 "What We Recover"
- 6 service cards:
  1. HDD Recovery — Mechanical failure, head crash, motor failure
  2. SSD Recovery — Controller failure, firmware issues, NAND damage
  3. Mobile Recovery — Broken screen, water damage, deleted data
  4. USB/Flash Recovery — Physical damage, file system corruption
  5. Memory Card Recovery — SD, CF, microSD from cameras/drones
  6. RAID Recovery — RAID 0,1,5,6,10 array reconstruction

**SECTION 3 — Failure Cause Cards**
- Light gray, H2 "We Recover From Any Failure Scenario"
- 4 cards with warning-colored icons:
  🔴 Physical Damage — Head crash, PCB failure, fire/water damage
  🟡 Logical Failure — Corrupted file system, bad sectors, partition loss
  🟠 Accidental Deletion — Emptied recycle bin, formatted drive
  🔵 Firmware Issues — Corrupted firmware, factory reset data

**SECTION 4 — Success Rate Meter**
- Dark section, H2 "Our Recovery Success Rates"
- Animated horizontal progress bars (animate on scroll entry):
  HDD Recovery: 94%
  SSD Recovery: 87%
  Mobile Recovery: 91%
  USB/Flash: 82%
  Memory Card: 89%
  RAID Recovery: 85%
- Note: "Success rates depend on damage severity and time elapsed."

**SECTION 5 — Recovery Process (5 Steps)**
- White, horizontal 5-step flowchart:
  1. "Submit Device" → 2. "Free Evaluation (24hrs)" → 3. "Recovery Quote Sent" → 4. "Recovery Performed" → 5. "Data Delivered Securely"
- CTA after: "Submit Your Device →"

**SECTION 6 — What NOT To Do (Warning Cards)**
- Light gray, H2 "Stop. Don't Make It Worse."
- 4 red-bordered warning cards:
  ❌ "Don't keep running the device"
  ❌ "Don't use DIY recovery software on failing drives"
  ❌ "Don't attempt to open the drive yourself"
  ❌ "Don't write new data to the affected drive"
- Below: "Every minute a failing drive runs reduces recovery chances."

**SECTION 7 — Lab Environment**
- Dark section, split layout
- Left: "Professional Handling Standards"
  - Anti-static environment
  - Hardware write-blockers used on all devices
  - Forensic imaging before any recovery attempt
  - Chain-of-custody documentation
- Right: Illustrated lab setup (styled CSS illustration or placeholder image)

**SECTION 8 — Turnaround Options**
- White, pricing-style 3-column cards:
  Standard (3-7 days): Full recovery process, detailed report
  Urgent (24-48 hrs): Priority queue, dedicated analyst
  Emergency (Same Day): On-site or immediate drop-off, top priority
- Each: Check list of what's included, "Get Quote" button
- Note: "Final pricing depends on device type and damage assessment."

**SECTION 9 — No Recovery No Fee Policy**
- Full-width accent-gradient banner
- Large badge/seal: "No Recovery. No Fee."
- "If we cannot recover your data, you pay nothing for the recovery attempt. Evaluation fee may apply."

**SECTION 10 — Mobile Recovery Deep Dive**
- White, split layout
- Phone SVG/CSS illustration
- H3: "Mobile Data Recovery"
- Supports: iOS 14+, Android 8+, Feature phones
- Can recover: Photos, videos, WhatsApp chats, contacts, call logs, notes, deleted apps data
- "Broken screen? We can still extract data directly from storage chip."

**SECTION 11 — RAID Recovery Section**
- Dark section (technical, for IT/corporate audience)
- H3: "RAID Array Recovery"
- RAID levels supported: 0, 1, 5, 6, 10, 50, 60
- "Controller failure, drive failure, or accidental rebuild — we reconstruct arrays and retrieve data."
- Who needs this: IT managers, businesses, data centers

**SECTION 12 — Forensic-Grade Recovery**
- White, H3 "Court-Admissible Data Recovery"
- "When your recovered data needs to be used as legal evidence, our forensic recovery maintains full chain-of-custody."
- Who needs this: Law firms, HR departments, fraud investigators

**SECTION 13 — Customer Stories**
- Light gray, H2 "Recovery Success Stories"
- 3 testimonial cards: specific recovery scenarios, outcome, star rating

**SECTION 14 — Free Evaluation CTA**
- Dark, H2 "Not Sure If Your Data Is Recoverable?"
- "Send us your device for a FREE evaluation. No obligation."
- Form: Name, Phone, Device Type, Description of issue, Urgency
- Or: "Call Us Now" button

**SECTION 15 — Data Security Post-Recovery**
- White, H3 "Your Data's Security After Recovery"
- How recovered data is delivered: encrypted drive, secure download link
- Data retention policy: deleted from our systems after 30 days
- NDA applies throughout

**SECTION 16 — FAQ**
- 6 data recovery specific questions accordion

**SECTION 17 — Courier Device Submission**
- Light gray
- H3 "Can't Come In Person? Use Our Courier Service"
- Instructions: Pack securely, use anti-static bag, insure the package
- Send to: (address from settings)
- "We'll notify you upon receipt with tracking confirmation."

**SECTION 18 — Device Submission Form**
- Full form: Name, Contact, Device type dropdown, Problem description, Data urgency, Preferred contact time
- Submit → POST /api/contact with source_page='data-recovery'

**SECTION 19 — Related Services**
- Data Recovery → Digital Forensics | Evidence Preservation | Mobile Forensics

**SECTION 20 — Footer**

---

### PAGE 5: CORPORATE INVESTIGATIONS (route: /services/corporate-investigations)

**SECTION 1 — Hero**
- Dark, serious enterprise tone
- H1: "Corporate Investigation Services"
- Subtext: "Protect your business from internal threats, fraud, and operational risks."
- B2B CTAs: "Schedule Private Consultation" + "Download Corporate Brochure"
- Right side: Trust badges for corporate clients

**SECTION 2 — Risk Scenarios (Tiles)**
- White, H2 "Scenarios We Investigate"
- 6 scenario tiles (icon + title + 1-line description):
  1. Employee Data Theft
  2. Internal Financial Fraud
  3. Vendor Scam / Procurement Fraud
  4. Intellectual Property Theft
  5. Expense Report Fraud
  6. Corporate Espionage

**SECTION 3 — Cost of Fraud Infographic**
- Dark section
- H2 "The Real Cost of Corporate Fraud in India"
- Large stat: "₹7,200 Crore lost to corporate fraud in India annually" (ACFE India Report)
- 3 sub-stats: Average per-company loss | Cases go unreported | Time to detect fraud
- Note: "Source: ACFE Global Fraud Report (approximate illustrative figures)"

**SECTION 4 — Investigation Services Grid**
- Light gray, 6 service cards:
  1. Internal Fraud Investigation
  2. Employee Background Verification
  3. Due Diligence Checks
  4. Vendor & Supplier Verification
  5. Corporate Risk Assessment
  6. Asset Tracing & Verification

**SECTION 5 — Employee Misconduct Deep Section**
- White, split layout
- Scenarios: Data theft, harassment evidence, policy violation, IP theft
- "We gather admissible evidence while maintaining full legal compliance and employee privacy laws."

**SECTION 6 — Due Diligence Section**
- Dark, split layout
- For: M&A, Joint ventures, Business partnerships, Key hires
- What we verify: Company records, financial health, litigation history, director backgrounds

**SECTION 7 — Internal Fraud Investigation**
- White section
- Types: Payroll fraud, procurement fraud, financial statement fraud, expense fraud
- Process: Confidential tipoff intake, digital forensics of financial systems, report

**SECTION 8 — Asset Verification**
- Light gray
- Property verification, vehicle records, financial asset tracing
- "Know who you're dealing with before any significant transaction."

**SECTION 9 — Investigation Process**
- Dark, 5-step confidential process:
  1. Confidential Briefing (NDA signed)
  2. Scope Definition
  3. Covert Investigation
  4. Evidence Compilation
  5. Confidential Report

**SECTION 10 — Legal Admissibility**
- White, compliance callout
- All corporate investigation evidence: IT Act 2000, IPC 420, CrPC compliant
- "Evidence we gather can be used in civil courts, labor tribunals, and criminal proceedings."

**SECTION 11 — Industries Served**
- Dark, icon grid: Banking/Finance, Manufacturing, IT/Tech, Pharma, Real Estate, Retail, Education, Healthcare

**SECTION 12 — Retainer Packages**
- White, 3-column pricing-style table:
  Basic Retainer: Monthly monitoring + 1 investigation/month
  Professional: Priority response + 3 investigations/month + dedicated analyst
  Enterprise: Unlimited cases + on-site support + quarterly risk reports
- "Contact for custom pricing" CTA

**SECTION 13 — NDA First Policy**
- Accent-bordered callout
- "Before we discuss your case, we sign an NDA. Always."
- Download NDA Template button (PDF)

**SECTION 14 — Corporate Case Study**
- Dark card: Anonymized ₹28 lakh fraud recovery case
- Industry, challenge, investigation method (redacted), outcome

**SECTION 15 — Corporate Testimonials**
- 2 detailed testimonials from corporate context

**SECTION 16 — FAQ**
- 6 corporate investigation specific questions

**SECTION 17 — Consultation Form**
- Split: Left urgency message, Right form
- Fields: Company name, Your role, Type of concern (dropdown), Preferred contact, NDA preference toggle

**SECTION 18 — Footer**

---

### PAGE 6: BACKGROUND VERIFICATION (route: /services/background-verification)

**SECTION 1 — Hero**
- "Know Who You're Trusting."
- Subtext: "Pre-employment, pre-partnership, and pre-marriage verification services."

**SECTION 2 — Why Verify Stats**
- 3 shocking stats: % candidates with false credentials, % fraud by unverified employees, avg cost of bad hire

**SECTION 3 — Verification Services Grid**
- 5 cards:
  1. Employment History Verification
  2. Address Verification
  3. Education & Credential Verification
  4. Identity Verification (Aadhaar, PAN)
  5. Reference & Character Checks

**SECTION 4 — Interactive Verification Checklist**
- React interactive component
- User clicks checkboxes for what they need
- Shows "Recommended Package" based on selection
- CTA: "Get Quote for Selected Checks"

**SECTION 5 — Individual vs Corporate**
- Two-column comparison:
  Individual: Pre-marriage, tenant verification, domestic staff, business partner
  Corporate: Pre-hire, vendor, contractor, partner verification

**SECTION 6 — Verification Process Timeline**
- 4 steps: Submit Request → Document Collection → Field Verification → Report Delivery

**SECTION 7 — Turnaround Times**
- Table: Check type vs Standard / Express timing

**SECTION 8 — Sample Report Preview**
- Blurred verification report with "SAMPLE" watermark
- Callout boxes showing what's included in report

**SECTION 9 — Bulk Packages**
- For HR teams and staffing agencies
- "Verify 10 candidates for the price of 8" style offers

**SECTION 10 — Legal & Ethical Compliance**
- DPDP Act 2023, GDPR-aligned methodology note
- "Subject consent obtained wherever required by law."

**SECTION 11 — Use Cases by Type**
- Tabs or accordion: Pre-Employment | Pre-Marriage | Tenant | Business Partner | Domestic Help

**SECTION 12 — Success Stories**
- 3 testimonials with BGV context

**SECTION 13 — FAQ**
- 6 BGV-specific questions

**SECTION 14 — Submit Verification Request Form**
- Fields: Your name, contact, Person to verify (name), Type of relationship, Checks required (multi-select checkboxes), Timeline needed

**SECTION 15 — Related Services**
- BGV → Corporate Investigations | Cyber Intelligence

**SECTION 16 — Footer**

---

### PAGE 7: CYBER INTELLIGENCE (route: /services/cyber-intelligence)

DESIGN NOTE: This page uses FORCED DARK THEME regardless of user preference. Override Tailwind with dark: classes forced.

**SECTION 1 — Hero (Dark, Tech)**
- Full screen dark hero
- Animated network node SVG in background (nodes connecting/disconnecting)
- H1: "Cyber Intelligence & OSINT Services"
- Subtext: "Legal open-source intelligence gathering, digital footprint analysis, and online risk assessment."
- Cyan glow CTAs

**SECTION 2 — What Is OSINT**
- Dark section
- H2: "What Is Open-Source Intelligence?"
- Simple explanation: "OSINT is the collection and analysis of information from publicly available sources — websites, social media, public records, databases — to build intelligence profiles and assess risks."
- No hacking. No illegal access. 100% legal.

**SECTION 3 — Use Cases (Scenario Grid)**
- 6 use case cards (dark surface, accent borders):
  1. Verify a business before investment
  2. Investigate online defamation
  3. Locate hidden digital assets
  4. Pre-litigation intelligence
  5. Reputation damage assessment
  6. Corporate threat intelligence

**SECTION 4 — Cyber Intelligence Services**
- 5 service deep cards:
  1. Online Presence Analysis — Social media, web mentions, leaked data
  2. Digital Footprint Assessment — What information exists about you/your company
  3. Reputation Risk Assessment — Negative content, defamation, fake profiles
  4. Public Record Research — Court filings, company records, property
  5. Risk Intelligence — Threat actors, competitive intelligence (legal)

**SECTION 5 — Online Reputation Service**
- Split: Visual (phone/laptop with social icons) + Content
- "Monitor and analyze your online reputation across 50+ platforms"
- Deliverable: Reputation score, risk areas, recommended actions

**SECTION 6 — Digital Footprint Analysis**
- What your footprint reveals: Email leaks, data breaches, social profiles, forum posts, image traces
- "Most people are shocked by what's publicly available about them."

**SECTION 7 — Public Record Research**
- Court records (eCourts India), ROC filings, property registrations, news archives, gazette notifications

**SECTION 8 — Dark Web Monitoring (Legal, Passive)**
- Important disclaimer callout: "We do NOT engage with illegal marketplaces. We monitor indexed/public dark web mentions only."
- Use case: Check if company data, credentials, or personal info has been compromised

**SECTION 9 — Tools Used**
- Dark grid of OSINT tool logos/names:
  Maltego | Shodan | theHarvester | SpiderFoot | Recon-ng | Google Dorks | Wayback Machine | Social Searcher

**SECTION 10 — Legal Boundaries Section**
- Important dark callout box
- "What We Do: Public data collection, social media analysis, public record search"
- "What We Don't Do: Unauthorized system access, SIM swapping, illegal surveillance"
- "All activities comply with Indian IT Act 2000 and international privacy standards."

**SECTION 11 — OSINT Process**
- 4-step dark timeline:
  1. Scoping & Target Definition
  2. Intelligence Gathering (OSINT sources)
  3. Data Analysis & Pattern Recognition
  4. Intelligence Report with Risk Score

**SECTION 12 — Sample Intelligence Report**
- Blurred/redacted intelligence report preview
- Report sections shown: Executive Summary | Digital Footprint Map | Risk Score | Findings | Recommendations

**SECTION 13 — Corporate Threat Intelligence**
- For businesses: Competitor monitoring, insider threat signals, brand protection
- "Proactive intelligence is cheaper than reactive damage control."

**SECTION 14 — FAQ**
- 6 OSINT/Cyber intel specific questions

**SECTION 15 — Confidential Inquiry Form**
- Dark form, H2 "Request an Intelligence Report"
- Fields: Name, Organization, Subject of interest (person/company/situation), Objective, Timeline

**SECTION 16 — Footer**

---

### PAGE 8: ABOUT US (route: /about)

**SECTION 1 — Hero**
- Dark hero, Bangalore skyline subtle bg image (or CSS illustrated cityscape)
- H1: "About Zentrix IT Solutions"
- Subtext: "Bangalore's trusted digital investigation and forensics company."
- Breadcrumb: Home > About

**SECTION 2 — Company Story**
- White, split layout
- Left: H2 "Who We Are", narrative paragraphs about founding, purpose, evolution
- Right: Company founding year badge, location, key focus areas list

**SECTION 3 — Mission & Vision**
- Light gray, 2 cards side by side:
  Mission: "To help individuals and organizations uncover facts, recover valuable information, and make informed decisions through ethical investigative methods."
  Vision: "To be India's most trusted digital investigation and forensic intelligence firm."

**SECTION 4 — Core Values**
- Dark section, 5-column (or 3+2) values grid:
  1. 🔒 Integrity — We never compromise on ethical conduct
  2. 🎯 Precision — Every detail matters in investigation
  3. 🤫 Confidentiality — Client privacy above all else
  4. ⚖️ Legal Compliance — We operate within the law, always
  5. 💡 Innovation — Continuously adopting latest forensic technologies

**SECTION 5 — Our Approach**
- White, illustrated triangle or 3-pillar visual:
  Technology + Ethics + Experience = "Reliable Results"
- Paragraph explaining methodology

**SECTION 6 — Team Section**
- Light gray
- H2: "Our Expert Team"
- Subtext: "Our team's identities are protected for operational security."
- Team cards (load from team_members where show_public=true):
  - Avatar (image if exists, else generated silhouette)
  - Role title
  - Expertise tags
  - If show_public=false: No name shown, "Identity Protected" badge
- Below: "Our team brings backgrounds in law enforcement, corporate security, cyber forensics, and legal practice."

**SECTION 7 — Certifications**
- Dark section
- H2: "Professional Certifications & Training"
- Badge grid: CFCE | CEH | CHFI | CCE | ACE | CISSP (professional certification logos/text)
- Note: "Our team maintains current certifications in digital forensics and cybersecurity."

**SECTION 8 — Legal Registration**
- White, trust signals grid:
  ✓ Registered Company (CIN: displayed from settings)
  ✓ GST Registered
  ✓ Bangalore, Karnataka Based
  ✓ PAN Verified
- "Full legal compliance for all services rendered."

**SECTION 9 — Key Numbers (Counters)**
- Dark, 4 counters: Cases Solved | Years Experience | Recovery Rate | Client Satisfaction

**SECTION 10 — Company Milestones Timeline**
- Light gray, horizontal scroll timeline on desktop, vertical on mobile:
  2015: Company Founded
  2016: First Corporate Client
  2018: Digital Forensics Lab Established
  2020: Mobile Forensics Division Added
  2022: OSINT Services Launched
  2024: 500+ Cases Milestone
  2025: Expanded to Evidence Preservation Services

**SECTION 11 — Office & Lab**
- White, 2-column:
  Left: Office address, working environment description, visiting info
  Right: Placeholder/actual office/lab photo with caption

**SECTION 12 — Our Technology**
- Dark, capability list:
  Hardware: Write-blockers, Chip-off equipment, Cleanroom tools
  Software: FTK, Cellebrite, EnCase, Autopsy, Maltego, custom scripts

**SECTION 13 — Privacy Commitment**
- White, detailed section:
  - "How we handle your data during a case"
  - "Data destruction post-engagement (30-day policy)"
  - "NDA signed before every case briefing"
  - "No client data ever shared with third parties"

**SECTION 14 — Legal Compliance Framework**
- Light gray
- Laws we operate under:
  Indian IT Act 2000 (amended 2008)
  Indian Penal Code (relevant sections)
  CrPC evidence handling provisions
  DPDP Act 2023 (data privacy)
  Evidence Act (digital evidence admissibility)

**SECTION 15 — Industry Associations**
- Dark, memberships and associations (if any), or "Pending DFIR Association Membership" placeholder

**SECTION 16 — Media & Press**
- White, section for any press mentions or "Available for media interviews and expert commentary on digital forensics topics."

**SECTION 17 — Join Our Team**
- Dark CTA section
- "We're Always Looking for Exceptional Investigators"
- "If you have a background in digital forensics, cybersecurity, law enforcement, or legal practice, we'd like to hear from you."
- "Send your CV to careers@zentrixit.com" button

**SECTION 18 — Footer**

---

### PAGE 9: BLOG & CASE STUDIES (route: /blog)

**SECTION 1 — Hero**
- Dark, medium height
- H1: "Zentrix Insights"
- Subtext: "Expert knowledge on digital forensics, investigations, and cyber intelligence."

**SECTION 2 — Search Bar**
- White bar, prominent
- "Search articles, case studies, guides..."
- Search input → filters cards below via JS

**SECTION 3 — Category Filter Bar**
- Pill buttons: All | Blog | Case Study | Guide | News | Forensics | Data Recovery | Cyber Intelligence
- Active filter: accent filled pill
- Click filters the grid (client-side filtering using React state)

**SECTION 4 — Featured Post (Full Width)**
- Large card: Left = large featured image, Right = category badge, title, excerpt, author, date, "Read Article" button
- Load: Most recent featured post from posts table

**SECTION 5 — Recent Posts Grid**
- 3-column card grid (1 col mobile, 2 col tablet, 3 col desktop)
- Each card: Image, category badge (color-coded by post_type), title, excerpt (2 lines), read time estimate, date, "Read →" link
- Hover: card lift effect, image slight zoom

**SECTION 6 — Case Studies Section**
- Separate section heading: "Case Studies"
- 3 case study cards (different design — darker, more serious):
  Each: Industry badge, "Challenge" snippet, "Outcome" tag, "CONFIDENTIAL" subtle watermark, "Read Case Study" button

**SECTION 7 — Knowledge Guides**
- Light gray section
- H2: "Free Knowledge Guides"
- 3-4 guide cards: "How to Preserve Digital Evidence", "What to Do After Data Loss", "Corporate Fraud Prevention Checklist"
- Each: Download icon, title, description, "Download Free Guide" button (leads to contact form gating or direct PDF)

**SECTION 8 — Forensics Glossary Teaser**
- White section
- H3: "Digital Forensics Glossary"
- 6 term previews: Chain of Custody | Hash Value | Write Blocker | Forensic Image | OSINT | Metadata
- "View Full Glossary →" link

**SECTION 9 — Video Section**
- Dark, H2 "Expert Video Insights"
- 2-3 video embed placeholders (YouTube) with thumbnail and title

**SECTION 10 — Newsletter Signup (Mid-page)**
- Accent-gradient section
- H2: "Get Digital Intelligence Insights in Your Inbox"
- "Monthly newsletter on forensics, investigations, and cyber intelligence."
- Email input + Subscribe button
- POST to /api/newsletter/subscribe

**SECTION 11 — News & Updates**
- Light gray
- H3: "Latest News"
- 3 news cards: Cybercrime updates, legal tech news, Indian IT Act updates (static content initially, manageable from admin)

**SECTION 12 — Popular Tags**
- White tag cloud:
  Digital Forensics | Data Recovery | OSINT | Background Verification | Evidence | Mobile Forensics | Corporate Fraud | Cybercrime | IT Act India

**SECTION 13 — Sidebar (if layout allows)**
- Recent posts list (5 items)
- Categories list with post count
- Newsletter mini-signup

**SECTION 14 — Pagination**
- Previous / Next page buttons
- Page number pills
- "Showing X-Y of Z articles"

**SECTION 15 — CTA Strip**
- Dark banner
- "Facing a situation similar to what you've read about?"
- "Talk to our experts confidentially." + Contact button

**SECTION 16 — Footer**

**SINGLE POST PAGE (route: /blog/{slug})**

**SECTION 1 — Post Hero**
- Post title (H1), category badge, author, date, read time, featured image

**SECTION 2 — Post Content**
- Full TipTap rendered content
- Typography optimized: large body text, proper heading hierarchy, blockquote styling

**SECTION 3 — Author Box**
- "Written by" card: masked author name, designation, expertise tags

**SECTION 4 — Share Buttons**
- LinkedIn, Twitter, WhatsApp, Copy Link

**SECTION 5 — Tags**
- Tag pills related to post

**SECTION 6 — Related Posts**
- 3 cards same category

**SECTION 7 — CTA**
- "Need Help With a Similar Case?" → Contact form

**SECTION 8 — Comments Disabled Notice**
- "For confidential inquiries related to this article, contact us directly."

---

### PAGE 10: CONTACT (route: /contact)

**SECTION 1 — Hero**
- Dark, high-urgency messaging
- H1: "Contact Zentrix IT Solutions"
- Subtext: "Every minute counts when evidence is at stake. Reach out now."
- Quick contact: Phone button + WhatsApp button prominently in hero

**SECTION 2 — NDA Assurance Badge**
- Prominent before form: Full-width dark strip
- "🔒 Everything you share with us is protected by a Non-Disclosure Agreement."
- "We never share your inquiry with any third party."

**SECTION 3 — Main Contact Form**
- Light gray background, centered card
- H2: "Send a Confidential Inquiry"
- Fields:
  - Full Name* (text)
  - Email Address* (email)
  - Phone Number* (tel, with +91 prefix)
  - Service Required* (select: Data Recovery | Digital Forensics | Corporate Investigations | Background Verification | Cyber Intelligence | Evidence Preservation | Not Sure)
  - Brief Description of Your Situation* (textarea, 5 rows, placeholder: "Describe your situation confidentially. This information is protected.")
  - Urgency Level* (radio: Normal — Within a week | Urgent — Within 48 hours | Emergency — Today)
  - How did you hear about us? (select: Google | Referral | Social Media | LinkedIn | Other)
  - reCAPTCHA (if keys configured in settings)
  - Submit button: "Send Confidential Inquiry" (full width, accent colored)
- Client-side validation with inline error messages
- On success: Hide form, show success card:
  "✓ Inquiry Received"
  "We will contact you within [2 hours / 1 hour / 30 minutes] based on your urgency level."
  "Check your email for a confirmation."
  [What happens next: 3 steps shown]

**SECTION 4 — WhatsApp Direct Button**
- Large green WhatsApp card
- "Prefer WhatsApp?"
- "Message us directly for faster response"
- "WhatsApp Now →" large button (opens wa.me link from settings)
- Available hours note

**SECTION 5 — Call Now Section**
- Dark card
- "Speak to an Investigator Directly"
- Large clickable phone number
- "Available Monday–Saturday, 9AM–7PM"
- "For emergencies, leave a voicemail — we respond within 30 minutes."

**SECTION 6 — Office Information**
- White, 2-column:
  Left: Full address (from settings), Landmark (if any), City/State/PIN
  Right: Business hours table:
    Monday–Saturday: 9:00 AM – 7:00 PM
    Sunday: Emergency cases only
    Public Holidays: Emergency line only

**SECTION 7 — Google Maps Embed**
- Full-width map embed (iframe from settings: google_maps_embed)
- Height: 400px, rounded corners
- "Click for directions" button below map

**SECTION 8 — Emergency Contact Highlight**
- Red-bordered dark card
- "🚨 Emergency? Evidence is Time-Sensitive."
- "For urgent cases involving active data loss or time-critical evidence:"
- Emergency phone number (larger, prominent)
- "Available for emergency consultations outside business hours."

**SECTION 9 — Response Time Promise**
- 3-column cards:
  Normal Inquiries: "Response within 2 hours during business hours"
  Urgent Cases: "Response within 1 hour"
  Emergency Cases: "Response within 30 minutes"
- Each with clock icon and accent-colored timing

**SECTION 10 — What Happens Next**
- Light gray, H2 "After You Contact Us"
- 3-step horizontal process:
  1. "We review your inquiry" — Within response timeframe
  2. "Confidential consultation call" — We discuss your case
  3. "Tailored plan presented" — We propose approach and timeline

**SECTION 11 — Service Quick Select**
- White section
- H3: "Know what you need?"
- 6 service pill buttons (click → scroll to form + pre-select service)

**SECTION 12 — Consultation Preparation Guide**
- Dark section
- H3: "How to Prepare for Your Consultation"
- Checklist (do not do any additional action on device, have device serial numbers ready, note down timeline of events):
  ✓ Stop using the affected device immediately
  ✓ Note down when you first noticed the issue
  ✓ List all devices involved
  ✓ Prepare any relevant documents (contracts, communications)
  ✓ Note any suspects or persons of interest (corporate cases)
  ✓ Have device purchase receipts if available

**SECTION 13 — Remote Consultation Option**
- White section
- H3: "Can't Visit In Person?"
- "We offer secure video consultations for clients outside Bangalore."
- "All remote consultations are end-to-end encrypted."
- "Device courier service available for physical evidence."
- "Book Remote Consultation →" button

**SECTION 14 — Corporate Inquiry Path**
- Dark, separate section for B2B
- H3: "Corporate & Institutional Inquiries"
- "For law firms, corporations, and institutional clients, we offer:"
  - Dedicated relationship manager
  - Priority response SLA
  - Retainer arrangements
  - On-site consultation available
- "Corporate Inquiry →" button → separate form or same form with source tagged as 'corporate'

**SECTION 15 — Social Proof Strip**
- Light gray
- Before final submission: show 1 testimonial quote + star rating
- "Join 500+ clients who trusted Zentrix with their most sensitive cases."

**SECTION 16 — FAQ**
- 6 contact/process questions:
  1. How soon will you respond?
  2. Is my inquiry confidential?
  3. Do you offer consultations outside Bangalore?
  4. What information should I have ready?
  5. Can I remain anonymous initially?
  6. Do you handle emergency cases after hours?

**SECTION 17 — Privacy Note**
- Small, below FAQ
- "How We Handle Your Inquiry Data: Your submission is stored securely in our encrypted system. Only authorized Zentrix staff can access it. All inquiry data is permanently deleted after 90 days or upon case closure. We never use your information for marketing without explicit consent."

**SECTION 18 — Footer**

---

END OF PAGE SPECIFICATIONS — ADD THESE TO THE MASTER PROMPT

=== DESIGN SYSTEM & VISUAL SPECIFICATION — ADD THIS TO MASTER PROMPT ===

## MANDATORY DESIGN PHILOSOPHY

This website must look like it belongs alongside award-winning agency websites 
on Awwwards, CSS Design Awards, and FWA. The design language is:

"Dark Cinematic Intelligence" — think CIA operations center meets luxury tech 
consultancy. Every pixel must communicate: precision, trust, secrecy, expertise.

REFERENCE AESTHETIC: Combine the darkness of Palantir.com, the typography 
refinement of Linear.app, the motion feel of Stripe.com, and the seriousness 
of a global law firm website.

DO NOT produce a generic Bootstrap/template-looking website.
DO NOT use purple gradients on white — that is generic AI website aesthetic.
DO NOT use rounded pill buttons everywhere — use sharp or slightly rounded.
DO NOT use stock-photo-style placeholder layouts.
EVERY section must feel intentionally designed, not just "content in a box".

## COLOR SYSTEM (Mandatory — No Deviations)
(See CSS variables for Void, Dark, Surface, Elevated, Accent #00C8FF, Gold #C9A84C)
Alternate dark/light sections. Accent used ONLY for CTAs and highlights.

## TYPOGRAPHY SYSTEM (Mandatory)
Fonts: Syne (Display), DM Sans (Body), JetBrains Mono (Mono)
Use eyebrow labels before every H2 in Mono font.
Use Mono for case numbers and technical labels.

## SPACING & TAILWIND CONFIG
Update Tailwind config to support new colors, fonts, shadows (accent glow, gold glow), and animations (marquee, scan-line, fade-up, border-flow).

## ANIMATION SYSTEM
Scroll reveals on ALL sections (staggered fade-ups).
Hover micro-interactions: card translations (-4px), borders glow, scan-lines.
Page transitions via Framer Motion.

## ADMIN PANEL
Light, clean, professional. Blue primary (#1E40AF). Inter font. High density tables. No animations.
=== END DESIGN SPECIFICATION ===