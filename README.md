# AMTRA Technologies — Official Website

The official website for **AMTRA Technologies**, a software development and IT solutions company based in Pakistan and working remotely with clients internationally.

The site is a responsive React marketing front end paired with a small Express API. Project inquiries are validated on both the client and the server, then delivered to `amtratechnologies@gmail.com` through **Google Gmail SMTP** using Nodemailer.

> **Brand:** Innovative Software. Intelligent Solutions. Digital Growth.
>
> **Message:** Turning Ideas Into Powerful Digital Solutions.

---

## Table of contents

- [What is included](#what-is-included)
- [Pages and routes](#pages-and-routes)
- [Services](#services)
- [Technology stack](#technology-stack)
- [Project structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Gmail SMTP setup](#gmail-smtp-setup)
- [How the inquiry flow works](#how-the-inquiry-flow-works)
- [API reference](#api-reference)
- [Form fields and validation](#form-fields-and-validation)
- [Available scripts](#available-scripts)
- [Testing](#testing)
- [SEO and metadata](#seo-and-metadata)
- [Security notes](#security-notes)
- [Deployment](#deployment)
- [Remaining configuration](#remaining-configuration)
- [Troubleshooting](#troubleshooting)

---

## What is included

- **Seven primary pages:** Home, About Us, Services, Our Process, Remote Working, Founder & Leadership, and Contact Us.
- **Thirteen service detail pages** at `/services/:serviceId`, each with an explanation, capabilities, business benefits, and a **Request This Service** action.
- **Automatic service preselection:** a service detail page links to `/contact?service=<id>#inquiry`, and the contact form opens with that service already selected.
- **13-stage delivery process** with a dedicated **CI/CD** subsection covering the 12-step workflow.
- **Remote Working** page describing global collaboration, virtual meetings, GitHub-based teamwork, client communication, progress updates, and digital project management. No physical office address is published.
- **Founder & Leadership** page for Ali Raza Chakrani with the approved biography and a text-based portrait placeholder. No generated or stock portrait is used.
- **Validated inquiry form** with inline errors, duplicate-submission prevention, loading state, data preservation on failure, and success shown only after the email provider accepts the message.
- **Gmail SMTP delivery** through Nodemailer. The authenticated Gmail account is the sender; the visitor's address is used only as `Reply-To`.
- **Responsive layout** tested at 320, 360, 375, 390, 414, 430, 600, 768, 820, 1024, 1280, 1440, and 1920 px.
- **Accessibility basics:** semantic landmarks, skip link, labelled form fields, visible focus states, keyboard-operable navigation, and reduced-motion support.
- **SEO basics:** per-page titles and descriptions, canonical URLs, Open Graph and Twitter metadata, Organization JSON-LD, `robots.txt`, and a build-time `sitemap.xml`.

### Deliberately not included

No admin dashboard, login, user registration, portfolio showcase, fake testimonials, invented statistics, client logos, awards, or achievements. No social profile links or office address are published because none have been verified.

---

## Pages and routes

| Route | Page |
| --- | --- |
| `/` | Home: hero, introduction, services preview, Why AMTRA, process preview, remote-working preview, founder preview, final call to action |
| `/about` | About Us: company introduction, mission, vision, six core values, approach, links to Founder and Remote Working |
| `/services` | Services: featured Custom Software and Payment Application sections, the remaining service grid, process preview |
| `/services/:serviceId` | Service detail: title, explanation, capabilities, benefits, delivery steps, related services, **Request This Service** |
| `/process` | Our Process: the 13 stages in order plus the 12-step CI/CD workflow |
| `/remote-working` | Remote Working: collaboration model, tools and workflows, location and availability |
| `/founder` | Founder & Leadership: biography, focus areas, and a replaceable portrait placeholder |
| `/contact` | Contact Us: email, WhatsApp, location, inquiry form at `#inquiry`, next steps, FAQ |
| any other path | Not-found page with links back to the site |

The navbar call to action is **Request a Service** and appears on every page, both in the desktop navigation and inside the mobile menu.

---

## Services

The service list is the single source of truth in `client/src/constants/services.js` and is mirrored for server-side validation in `server/src/constants/inquiry.js`.

1. Web Development
2. Mobile Application Development
3. Desktop Application Development
4. Custom Software Development *(featured)*
5. Payment Application Development *(featured)*
6. AI Solutions & Automation
7. Cybersecurity Services
8. Database Solutions
9. Cloud Computing & DevOps
10. Networking & IT Infrastructure
11. IT Consulting
12. Website Maintenance & Technical Support
13. Digital Marketing

**Custom Software** covers business management systems, ERP and CRM solutions, enterprise applications, workflow automation, API development and integration, and customized web and desktop applications.

**Payment Application Development** covers payment applications, gateway integration, digital payment interfaces, transaction management, billing systems, and wallet-related solutions. The site includes this disclaimer:

> Payment gateway availability, provider accounts, regulatory requirements, and third-party integrations depend on the client's requirements and chosen providers.

---

## Technology stack

| Area | Technology |
| --- | --- |
| Front end | React 19, Vite 7, JavaScript/JSX |
| Routing | React Router 7 |
| Styling | Tailwind CSS 4 |
| Icons | Lucide React |
| HTTP client | Axios |
| API | Express 5 |
| Validation | express-validator |
| Security | Helmet, CORS allow-list, express-rate-limit |
| Email | Nodemailer with Gmail SMTP |
| Tests | Node test runner + Supertest |
| Package layout | npm workspaces (`client`, `server`) |

There is no database. The inquiry form does not persist submissions; each inquiry is delivered by email.

---

## Project structure

```text
amtra/
├── client/
│   ├── index.html                  # Metadata, fonts, Organization JSON-LD
│   ├── scripts/
│   │   └── generate-sitemap.mjs    # Build-time sitemap.xml and robots.txt
│   ├── public/
│   │   └── favicon.svg
│   └── src/
│       ├── App.jsx                 # Route definitions
│       ├── main.jsx                # React root and BrowserRouter
│       ├── index.css               # Tailwind theme and motion settings
│       ├── components/
│       │   ├── common/             # Container, PageHero, SectionHeading, FAQ, etc.
│       │   ├── layout/             # Navbar, Footer, Layout
│       │   └── ui/                 # Button, ServiceCard
│       ├── constants/
│       │   ├── company.js          # Mission, vision, values, process, CI/CD, founder, FAQs
│       │   ├── inquiry.js          # Form options and limits
│       │   ├── services.js         # The 13 services
│       │   └── siteConfig.js       # Brand, navigation, contact details
│       ├── features/contact/       # Contact form UI and state hook
│       ├── hooks/usePageMeta.js    # Per-route title, description, canonical
│       ├── pages/                  # One folder per page
│       ├── services/               # Axios client and error mapping
│       └── utils/                  # Validation and class-name helpers
├── server/
│   ├── .env.example
│   ├── src/
│   │   ├── app.js                  # Express app assembly
│   │   ├── server.js               # Startup and graceful shutdown
│   │   ├── config/env.js           # Environment parsing
│   │   ├── constants/              # Shared inquiry options, HTTP status codes
│   │   ├── controllers/
│   │   ├── middlewares/            # CORS, rate limits, validation, errors
│   │   ├── routes/
│   │   ├── services/
│   │   │   ├── contact.service.js  # Delivery orchestration
│   │   │   └── email/
│   │   │       ├── smtp.provider.js
│   │   │       └── templates/      # HTML and plain-text emails
│   │   ├── utils/
│   │   └── validators/
│   └── tests/
├── package.json                    # Workspace scripts
└── README.md
```

---

## Prerequisites

- **Node.js 20.19 or newer** (see the `engines` field in both `package.json` files)
- **npm** (the repository uses npm workspaces)
- A **Gmail account** with 2-Step Verification enabled and an App Password, if you want live inquiry delivery

---

## Getting started

1. **Install dependencies** from the repository root:

   ```bash
   npm install
   ```

2. **Create the server environment file:**

   ```bash
   # macOS / Linux
   cp server/.env.example server/.env

   # Windows PowerShell
   Copy-Item server/.env.example server/.env
   ```

   Fill in `SMTP_USER` and `SMTP_PASS` as described in [Gmail SMTP setup](#gmail-smtp-setup). The API still starts without them, but the contact endpoint returns `503` until delivery is configured.

3. **Optional:** create the client environment file if you need a non-default API URL or a public site URL:

   ```bash
   cp client/.env.example client/.env
   ```

4. **Start both development servers** from the repository root:

   ```bash
   npm run dev
   ```

   - Front end: <http://localhost:5173>
   - API: <http://localhost:5000>
   - Health check: <http://localhost:5000/api/v1/health>

   During development, an unset `VITE_API_URL` uses the Vite proxy from `/api` to `http://localhost:5000`.

---

## Environment variables

### Client (`client/.env`)

| Variable | Default | Purpose |
| --- | --- | --- |
| `VITE_API_URL` | `/api/v1` | Base URL of the API, including the version prefix. Leave blank locally to use the Vite proxy. |
| `VITE_SITE_URL` | *(empty)* | Public production URL without a trailing slash. Used for canonical URLs and to generate `sitemap.xml` and `robots.txt` at build time. |

### Server (`server/.env`)

| Variable | Default | Purpose |
| --- | --- | --- |
| `NODE_ENV` | `development` | Set to `production` when deployed. |
| `PORT` | `5000` | API port. |
| `CLIENT_ORIGINS` | `http://localhost:5173` | Comma-separated list of allowed browser origins. |
| `TRUST_PROXY` | `false` | Set to `true` when running behind a trusted reverse proxy. |
| `RATE_LIMIT_WINDOW_MS` | `900000` | General API rate-limit window (15 minutes). |
| `RATE_LIMIT_MAX` | `300` | General API requests allowed per window. |
| `CONTACT_RATE_LIMIT_WINDOW_MS` | `900000` | Contact endpoint window (15 minutes). |
| `CONTACT_RATE_LIMIT_MAX` | `5` | Contact submissions allowed per window. |
| `SMTP_HOST` | `smtp.gmail.com` | SMTP host. |
| `SMTP_PORT` | `587` | SMTP port. |
| `SMTP_SECURE` | `false` | `false` for port 587 with STARTTLS; `true` for implicit TLS on port 465. |
| `SMTP_USER` | — | Full Gmail address used to authenticate and to send. |
| `SMTP_PASS` | — | Google App Password. Never commit this value. |
| `CONTACT_PUBLIC_EMAIL` | `amtratechnologies@gmail.com` | Public address shown to visitors and used in client-facing emails. |
| `CONTACT_RECEIVER_EMAIL` | `alirazachakrani090@gmail.com` | Private inbox that receives project inquiries. Server-side only; never expose it in the frontend or client emails. |
| `CONTACT_SEND_ACKNOWLEDGEMENT` | `true` | Send the visitor a confirmation email after the internal inquiry is delivered. Set to `false` to disable. |

Environment files are ignored by Git (`.env`, `.env.*`), while `.env.example` files are tracked.

---

## Gmail SMTP setup

The API sends mail as the authenticated Gmail account. It does **not** spoof the visitor: the visitor's email address is used only in the `Reply-To` header.

1. **Use the receiving Gmail account** (or another Gmail account you control) as the sender. For this project that is `amtratechnologies@gmail.com`.
2. **Enable 2-Step Verification** at <https://myaccount.google.com/security>. App Passwords are not available without it.
3. **Create an App Password** at <https://myaccount.google.com/apppasswords>. Choose a descriptive name such as `AMTRA Website`. Google shows a 16-character password once.
4. **Paste it into `server/.env`**, removing spaces:

   ```dotenv
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=amtratechnologies@gmail.com
   SMTP_PASS=abcdefghijklmnop
   CONTACT_PUBLIC_EMAIL=amtratechnologies@gmail.com
   CONTACT_RECEIVER_EMAIL=alirazachakrani090@gmail.com
   ```

5. **Restart the API** so the new environment is loaded.

Notes:

- Use the App Password, not the normal Gmail password. Normal passwords are rejected for SMTP.
- Google Workspace accounts may have App Passwords or SMTP access disabled by an administrator. If the option is missing, ask the workspace administrator.
- Gmail accounts have daily sending limits. Check Google's current limits before relying on this mailbox for high volume.
- Delivery depends on Google's SMTP service and the account's configuration. The repository cannot guarantee deliverability, and live delivery has **not** been tested here because no App Password is configured.
- Credentials stay on the server. They are never sent to the browser and are not written to logs.

---

## How the inquiry flow works

1. The visitor opens `/contact` or follows a service link such as `/contact?service=payment-application-development#inquiry`.
2. The form reads the `service` query parameter and preselects the matching service. The form is keyed by that parameter, so navigating between service links resets it correctly.
3. On submit, the browser validates every field and focuses the first invalid one.
4. A valid payload is sent to `POST /api/v1/contact`. The submit button is disabled while the request is in flight, and a ref prevents duplicate submissions.
5. The server applies rate limiting, body-size limits, field validation, and a honeypot check. The honeypot field is hidden from users; a filled value is rejected.
6. The contact service builds a professional HTML email and a plain-text alternative containing every inquiry field, the submission date and time (Asia/Karachi), and the source.
7. Nodemailer sends the message through `smtp.gmail.com` using the authenticated account. The visitor's email is set as `Reply-To`.
8. Only after the SMTP provider accepts the internal email does the API return `201`. If the optional acknowledgement email fails, the inquiry is still considered received and the failure is logged server-side.
9. On failure, the form keeps the visitor's data, shows a clear error, and allows a retry.

---

## API reference

Base URL: `/api/v1`

### `GET /health`

Returns a simple health response used to confirm the API is running.

### `POST /contact`

Accepts `application/json`.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `fullName` | string | Yes | 2–100 characters |
| `email` | string | Yes | Valid email, maximum 254 characters |
| `phone` | string | No | Maximum 30 characters; digits, spaces, `+`, `-`, `.`, `()`, `+` |
| `company` | string | No | Maximum 120 characters |
| `country` | string | No | Maximum 80 characters |
| `service` | string | Yes | One of the 13 services or `Other` |
| `budget` | string | No | One of the published budget ranges |
| `timeline` | string | No | One of the published timeline ranges |
| `description` | string | Yes | 20–5,000 characters |
| `contactMethod` | string | No | `Email`, `WhatsApp`, or `Phone` |
| `consent` | boolean | Yes | Must be `true` |
| `website` | string | No | Honeypot. Must be empty. |

Successful response (`201`):

```json
{
  "success": true,
  "message": "Thank you. Your project inquiry has been received and our team will review it shortly.",
  "data": {
    "id": "<message-id or null>",
    "receivedAt": "2026-01-01T00:00:00.000Z",
    "acknowledgementSent": true
  }
}
```

Error responses:

| Status | Meaning |
| --- | --- |
| `400` | Invalid JSON payload |
| `404` | Unknown API route |
| `413` | Request body larger than 32 KB |
| `422` | Validation failed. `errors` contains `{ field, message }` entries. |
| `429` | Rate limit exceeded |
| `502` | SMTP delivery failed |
| `503` | SMTP is not configured (`SMTP_USER` or `SMTP_PASS` missing) |

Example validation error:

```json
{
  "success": false,
  "message": "Please correct the highlighted fields.",
  "errors": [
    { "field": "email", "message": "Please enter a valid email address." }
  ]
}
```

---

## Form fields and validation

The contact form includes:

- **Full Name** — required
- **Business Email** — required, format checked
- **Phone / WhatsApp** — optional
- **Company Name** — optional
- **Country** — optional
- **Service Required** — required, preselected from a service detail link
- **Project Budget** — optional
- **Expected Project Timeline** — optional
- **Project Description** — required, 20–5,000 characters, live counter
- **Preferred Contact Method** — optional: Email, WhatsApp, or Phone
- **Privacy Consent** — required

Budget options: Not Decided Yet; Under $500; $500–$1,000; $1,000–$3,000; $3,000–$5,000; $5,000–$10,000; Above $10,000.

Timeline options: As Soon As Possible; Within 1 Month; 1–3 Months; 3–6 Months; Flexible.

Consent text: “I agree that AMTRA Technologies may contact me regarding my project inquiry.”

The same limits and option lists are enforced on the server. Client and server validation are intentionally duplicated so the API remains safe when called directly.

---

## Available scripts

Run these from the repository root.

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server and the Express API together |
| `npm run dev:client` | Start only the front end |
| `npm run dev:server` | Start only the API with Nodemon |
| `npm run build` | Build the client and generate `sitemap.xml` / `robots.txt` |
| `npm run preview` | Preview the production client build |
| `npm run start` | Start the API without Nodemon |
| `npm run lint` | Lint the client and server |
| `npm test` | Run the server test suite |

Client-only:

| Command | Description |
| --- | --- |
| `npm run sitemap --workspace client` | Regenerate `robots.txt` and `sitemap.xml` in `client/public` |

---

## Testing

```bash
npm run lint
npm test
npm run build
```

The server suite uses the Node test runner and Supertest. It covers:

- successful submissions and optional-field handling
- `422` validation errors and whitespace-only required fields
- honeypot rejection
- missing SMTP configuration (`503`)
- SMTP/provider failure handling (`502`) without leaking provider details
- the internal inquiry email recipient, `Reply-To`, subject, and content
- optional client acknowledgement behavior
- the SMTP adapter's transport options, authenticated sender, and missing-credential guard

No live SMTP request is made by the tests. The mailer is injected or replaced with a fake transport.

**Current status in this repository:** lint, 24 server tests, and the production build pass. Live Gmail delivery has not been verified because no real App Password is configured.

---

## SEO and metadata

- `client/index.html` provides baseline metadata, Open Graph and Twitter tags, font preconnects, and Organization JSON-LD.
- `client/src/hooks/usePageMeta.js` updates the title, description, and canonical URL on route changes when `VITE_SITE_URL` is set.
- `client/scripts/generate-sitemap.mjs` runs after `vite build`. When `VITE_SITE_URL` is a valid URL it writes `dist/sitemap.xml` and `dist/robots.txt` with the static routes and all 13 service detail routes.
- Without `VITE_SITE_URL`, the script writes a permissive `robots.txt` and skips the sitemap rather than generating incorrect absolute URLs.

Set the production URL before building:

```bash
# macOS / Linux
VITE_SITE_URL=https://www.example.com npm run build

# Windows PowerShell
$env:VITE_SITE_URL="https://www.example.com"; npm run build
```

---

## Security notes

- SMTP credentials exist only in `server/.env` and server-side environment variables.
- `SMTP_PASS` is never exposed to the client, returned in API responses, or logged.
- The sender is always the authenticated Gmail account. Visitor addresses are used only as `Reply-To`.
- Email headers are stripped of control characters to prevent header injection.
- HTML email content is escaped; the plain-text alternative is included with every message.
- The API applies Helmet, a CORS allow-list, a 32 KB JSON/URL-encoded body limit, a general rate limit, a stricter contact rate limit, server-side validation, and a honeypot.
- The client is not trusted: every constraint is re-checked on the server.
- No database or admin interface is present, so there is no stored inquiry data to secure beyond the receiving mailbox.

---

## Deployment

1. **Build the front end** with the public URL and API URL configured:

   ```bash
   VITE_SITE_URL=https://www.example.com VITE_API_URL=https://api.example.com/api/v1 npm run build
   ```

2. **Serve `client/dist`** from a static host or web server. Because the app uses client-side routing, rewrite unknown paths to `index.html` so deep links such as `/services/custom-software-development` work on refresh.

3. **Run the API** with `npm run start --workspace server` (or `node server/src/server.js`) and provide the server environment variables through the hosting platform.

4. **Set production values:**

   ```dotenv
   NODE_ENV=production
   PORT=5000
   CLIENT_ORIGINS=https://www.example.com
   TRUST_PROXY=true
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=amtratechnologies@gmail.com
   SMTP_PASS=<google-app-password>
   CONTACT_RECEIVER_EMAIL=amtratechnologies@gmail.com
   ```

5. **Verify after deployment:** health endpoint, every route and deep link, the mobile menu, service preselection, a real inquiry, the received email, and the optional acknowledgement.

Do not expose the API port directly if a reverse proxy is available. Keep `TRUST_PROXY` aligned with the actual proxy setup so rate limiting sees real client addresses.

---

## Remaining configuration

These items require information or credentials that are not in the repository:

1. **Gmail App Password** — add it to `server/.env` (or the hosting provider's environment) to enable live delivery.
2. **Production domain** — set `VITE_SITE_URL` and `CLIENT_ORIGINS`; the sitemap and canonical URLs depend on it.
3. **Founder photograph** — the Founder page currently uses a text monogram (`ARC`) as a deliberate placeholder. Replace it with a real portrait when available.
4. **Social profiles** — no social links are rendered because none are verified. Add only official URLs.
5. **Office address** — intentionally omitted. The site describes remote collaboration and Pakistan as the base location.
6. **Legal pages** — add a privacy policy and terms page if required for your jurisdiction or advertising channels.

---

## Troubleshooting

### The form returns `503`

`SMTP_USER` or `SMTP_PASS` is missing. Add both to `server/.env` and restart the API. The server logs a warning at startup when email delivery is not configured.

### The form returns `502`

The API reached the SMTP step but delivery failed. Check:

- the App Password is correct and has not been revoked
- 2-Step Verification is enabled on the Google account
- the account is not blocked from SMTP or App Passwords by a Workspace administrator
- outbound port 587 is allowed by the host or network
- the server clock is reasonably accurate

Provider error details are logged server-side and are not returned to the browser.

### Gmail reports “Username and Password not accepted”

Use a Google **App Password**, not the account password. Confirm that `SMTP_USER` is the full Gmail address and that `SMTP_PASS` contains the 16-character App Password without spaces.

### The form returns `429`

The contact rate limit was reached (default: 5 POST attempts per 15 minutes per client IP). Every attempt counts, including invalid payloads and failed SMTP sends, so repeated testing consumes the window quickly. The response includes a `Retry-After` header and the JSON message states how long to wait.

The limiter uses express-rate-limit's default **in-memory** store. Counters belong to one backend process, so **restarting the API resets them**. For multiple server instances or serverless deployments, use a shared store such as Redis so the limit is enforced consistently.

If you are testing locally, restart the backend instead of waiting, or temporarily raise `CONTACT_RATE_LIMIT_MAX` in `server/.env`. Do not disable rate limiting in production.

### The sitemap is missing after a build

`VITE_SITE_URL` was not set or was not a valid absolute URL. Set it before running `npm run build`.

### Deep links return 404 in production

Configure the static host to rewrite unknown paths to `index.html`. The API itself only serves `/api/v1/*`.

---

## Brand and contact

- **Company:** AMTRA Technologies
- **Founder & CEO:** Ali Raza Chakrani
- **Email:** amtratechnologies@gmail.com
- **WhatsApp:** +92 321 2192954
- **Location:** Pakistan
- **Tagline:** Innovative Software. Intelligent Solutions. Digital Growth.
