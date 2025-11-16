# Renvia IT — Automation MVP

This branch (feature/automation-mvp) provides a Netlify-ready, self-hosted, serverless front-end for Renvia IT. It's designed as a low-touch operational system for e-waste pickup, lead capture, payments (Stripe placeholders), client self-service dashboard, and a simple admin console.

Key features
- Automated lead capture via Formspree placeholder
- Stripe checkout simulation (ready for integration)
- Booking lifecycle: lead → booking → payment → confirmation
- Dashboard for clients (localStorage-backed) with downloads and impact metrics
- Admin console for internal staff to view & export bookings, toggle statuses, and simulate notifications
- Referral link generator and basic crediting
- Componentized HTML snippets in /components loaded at runtime

Deployment
- This is Netlify-ready. Connect the repository and build (no server-side build required).
- Replace placeholders: RENVIA_CONFIG.STRIPE_PUBLISHABLE and FORMSPREE_ID in index.html or via JS

Revenue model automation
- Subscription plans (Starter / Business / Enterprise) with automated local recording and placeholder checkout
- Data licensing: impact data export & paid access can be introduced by wiring Stripe/webhooks and a backend
- Referral credits tracked in localStorage — can be extended to give discounts on invoices

Manual onboarding (quick)
1. Replace Formspree ID and Stripe publishable key placeholders in index.html
2. Connect a Zapier flow: Formspree -> Google Sheets / Airtable / Calendar
3. Seed bookings by creating rows in localStorage via browser DevTools or create a test booking via the form
4. Connect Netlify site in your account and set the site name if desired

Roadmap
- Phase 2: Add a serverless backend (AWS Lambda / Netlify Functions) for persistent data and secure admin auth
- Phase 3: Stripe billing & subscription webhooks, license & invoicing automation
- Phase 4: API for partners, data licensing marketplace, and full SaaS productization

Notes
- No secret keys are committed. Only placeholders and instructions are included.