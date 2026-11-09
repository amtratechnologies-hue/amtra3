# AMTRA Technologies — Official Website & Secure Admin Panel

The official website for **AMTRA Technologies**, a software development and IT solutions company based in Pakistan and working remotely with clients internationally.

The site is a responsive React marketing front end paired with an Express API and MongoDB. Public project inquiries are validated on both the client and the server, saved to MongoDB, and then announced to the administrator through **Google Gmail SMTP** using Nodemailer. A small, read-only admin panel lets authorised staff review and read every request.

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
- [Admin panel](#admin-panel)
- [Gmail SMTP setup](#gmail-smtp-setup)
- [How the inquiry flow works](#how-the-inquiry-flow-works)
- [Database models](#database-models)
- [API reference](#api-reference)
- [Form fields and validation](#form-fields-and-validation)
- [Available scripts](#available-scripts)
- [Testing](#testing)
- [SEO and metadata](#seo-and-metadata)
- [Security notes](#security-notes)
- [CI/CD and deployment](#cicd-and-deployment)
- [Remaining configuration](#remaining-configuration)
- [Troubleshooting](#troubleshooting)

---

## What is included

### Public website

- **Seven primary pages:** Home, About Us, Services, Our Process, Remote Working, Founder & Leadership, and Contact Us.
- **Thirteen service detail pages** at `/services/:serviceId`, each with an explanation, capabilities, business benefits, and a **Request This Service** action.
- **Automatic service preselection:** a service detail page links to `/contact?service=<id>#inquiry`, and the contact form opens with that service already selected.
- **13-stage delivery process** with a dedicated **CI/CD** subsection covering the 12-step workflow.
- **Remote Working** page describing global collaboration, virtual meetings, GitHub-based teamwork, client communication, progress updates, and digital project management. No physical office address is published.
- **Founder & Leadership** page for Ali Raza Chakrani with the approved biography and a text-based portrait placeholder.
- **Validated inquiry form** with inline errors, duplicate-submission prevention, loading state, data preservation on failure, and a success message shown only after the request is saved.
- **Responsive layout** tested at 320, 360, 375, 390, 414, 430, 600, 768, 820, 1024, 1280, 1440, and 1920 px.
- **Accessibility basics:** semantic landmarks, skip link, labelled form fields, visible focus states, keyboard-operable navigation, and reduced-motion support.
- **SEO basics:** per-page titles and descriptions, canonical URLs, Open Graph and Twitter metadata, Organization JSON-LD, `robots.txt`, and a build-time `sitemap.xml`.

### Secure admin panel

- **Login, dashboard, request list, and request details only.** The panel is strictly read-only.
- **MongoDB-backed sessions** through `express-session` and `connect-mongo`, with an HTTP-only cookie, `SameSite`, `Secure` in production, and an 8-hour TTL.
- **CSRF protection** using a per-session token sent in the `X-CSRF-Token` header for authenticated state-changing requests.
- **Login rate limiting** that counts failed attempts only, so a legitimate administrator is not locked out after successful sign-ins.
- **Session regeneration on login** to prevent session fixation, and full session invalidation on logout.
- **Backend authorisation on every admin API route.** Unauthenticated requests receive `401`; direct visits to admin pages redirect to `/admin/login`.
- **Responsive admin UI:** mobile cards, a desktop table, and a desktop sidebar with no horizontal scrolling at the tested breakpoints.
- **No client acknowledgement email.** Public visitors never receive a copy of their request data.

### Deliberately not included

The admin panel has **no editing, deletion, approval/rejection, client management, employee management, role management, analytics, finance, or settings screens**. It cannot send email to clients. These features are intentionally outside the current scope.

No fake testimonials, invented statistics, client logos, awards, or achievements are included. No social profile links or office address are published because none have been verified.

---

## Pages and routes

### Public

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

### Admin

| Route | Page |
| --- | --- |
| `/admin/login` | Administrator sign-in |
| `/admin/dashboard` | Read-only overview with totals and the latest requests |
| `/admin/requests` | Paginated list of all service requests |
| `/admin/requests/:id` | Complete details for one request |
| `/admin` and any unknown `/admin/*` path | Redirect to `/admin/dashboard` (guarded) or `/admin/login` |

Admin pages are excluded from search indexes with `noindex,nofollow`, and `robots.txt` disallows `/admin`.

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
| Database | MongoDB with Mongoose |
| Admin auth | bcryptjs, express-session, connect-mongo |
| Security | Helmet, CORS allow-list, express-rate-limit, CSRF token |
| Email | Nodemailer with Gmail SMTP |
| Tests | Node test runner + Supertest |
| Package layout | npm workspaces (`client`, `server`) |

MongoDB stores service requests, administrator accounts, and admin sessions. It is required for the contact form and the admin panel.

---

## Project structure

```text
amtra/
├── .github/
│   └── workflows/
│       ├── ci.yml                    # Lint, test, and build on PR and pushes
│       └── deploy.yml                # Production deploy hooks after CI on main
├── client/
│   ├── scripts/
│   │   └── generate-sitemap.mjs      # Build-time sitemap.xml and robots.txt
│   ├── public/
│   │   └── robots.txt
│   └── src/
│       ├── admin/                    # Auth provider, guarded routes, admin shell
│       ├── components/               # Common, layout, and UI components
│       ├── constants/                # Services, inquiry options, company content
│       ├── features/contact/         # Contact form UI and state hook
│       ├── hooks/                    # Page metadata and no-index hooks
│       ├── pages/                    # Public pages and pages/Admin/*
│       ├── services/                 # Public API, admin API, error mapping
│       └── utils/                    # Validation, class names, date formatting
├── server/
│   ├── .env.example
│   ├── src/
│   │   ├── app.js                    # Express app assembly
│   │   ├── server.js                 # Startup, DB connection, seed, shutdown
│   │   ├── config/                   # Environment parsing and MongoDB connection
│   │   ├── constants/                # Inquiry options and HTTP status codes
│   │   ├── controllers/              # Public contact and admin controllers
│   │   ├── middlewares/              # CORS, sessions, auth, CSRF, rate limits
│   │   ├── models/                   # Admin and ServiceRequest schemas
│   │   ├── repositories/             # Database access for admins and requests
│   │   ├── routes/                   # Public and admin route definitions
│   │   ├── scripts/                  # seedAdmin.js
│   │   ├── services/                 # Inquiry, admin auth, admin seed, email
│   │   ├── utils/                    # Errors, logging, password, serializers
│   │   └── validators/               # Request validation rules
│   └── tests/                        # Node test runner suites
├── package.json                      # Workspace scripts
└── README.md
```

---

## Prerequisites

- **Node.js 20.19 or newer** (see the `engines` field in both `package.json` files)
- **npm** (the repository uses npm workspaces)
- **MongoDB 6 or newer**, or a MongoDB Atlas cluster, with a connection string
- A **Gmail account** with 2-Step Verification enabled and an App Password, if you want live administrator notifications

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

3. **Set the required values** in `server/.env`:

   - `MONGODB_URI` — your MongoDB connection string.
   - `SESSION_SECRET` — a long random value. Generate one with:

     ```bash
     node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
     ```

   - `SMTP_USER` and `SMTP_PASS` — the Gmail account and App Password used for administrator notifications.
   - `ADMIN_USERNAME` and `ADMIN_INITIAL_PASSWORD` — the bootstrap administrator credentials.

   The API starts without SMTP credentials, but administrator notifications will be skipped. It cannot save requests or serve the admin panel without `MONGODB_URI`.

4. **Optional:** create the client environment file if you need a non-default API URL or a public site URL:

   ```bash
   cp client/.env.example client/.env
   ```

5. **Create the initial administrator** (see [Admin panel](#admin-panel)):

   ```bash
   # Set ADMIN_SEED_ENABLED=true in server/.env first.
   npm run seed:admin

   # Then set ADMIN_SEED_ENABLED=false again.
   ```

6. **Start both development servers** from the repository root:

   ```bash
   npm run dev
   ```

   - Front end: <http://localhost:5173>
   - Admin panel: <http://localhost:5173/admin/login>
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
| `NODE_ENV` | `development` | Set to `production` when deployed. Enables secure cookies and strict session-secret checks. |
| `PORT` | `5000` | API port. |
| `CLIENT_ORIGINS` | `http://localhost:5173` | Comma-separated list of allowed browser origins. Admin sessions require an exact match. |
| `TRUST_PROXY` | `false` | Set to `true` when running behind a trusted reverse proxy. |
| `MONGODB_URI` | *(required)* | MongoDB connection string. Never commit it. |
| `RATE_LIMIT_WINDOW_MS` | `900000` | General API rate-limit window (15 minutes). |
| `RATE_LIMIT_MAX` | `300` | General API requests allowed per window. |
| `CONTACT_RATE_LIMIT_WINDOW_MS` | `900000` | Contact endpoint window (15 minutes). |
| `CONTACT_RATE_LIMIT_MAX` | `5` | Contact submissions allowed per window. |
| `SMTP_HOST` | `smtp.gmail.com` | SMTP host. |
| `SMTP_PORT` | `587` | SMTP port. |
| `SMTP_SECURE` | `false` | `false` for port 587 with STARTTLS; `true` for implicit TLS on port 465. |
| `SMTP_USER` | — | Full Gmail address used to authenticate and to send. |
| `SMTP_PASS` | — | Google App Password. Never commit this value. |
| `CONTACT_PUBLIC_EMAIL` | `amtratechnologies@gmail.com` | Public address shown to visitors. |
| `CONTACT_RECEIVER_EMAIL` | `amtratechnologies@gmail.com` | Private inbox that receives new-request notifications. Server-side only. |
| `ADMIN_USERNAME` | *(required for seed)* | Bootstrap administrator username. |
| `ADMIN_INITIAL_PASSWORD` | *(required for seed)* | Bootstrap password, minimum 12 characters. Used only when creating the account. |
| `ADMIN_SEED_ENABLED` | `false` | Set to `true` only while creating the initial administrator. |
| `SESSION_SECRET` | *(required in production)* | Long random value used to sign admin session cookies. |
| `ADMIN_SESSION_TTL_MS` | `28800000` | Admin session lifetime (8 hours). |
| `ADMIN_COOKIE_NAME` | `amtra_admin_sid` | Admin session cookie name. |
| `ADMIN_COOKIE_PATH` | `/api/v1/admin` | Cookie path. The cookie is only sent to admin API routes. |
| `ADMIN_COOKIE_SAME_SITE` | `lax` | `lax`, `strict`, or `none`. Use `none` only with `Secure` and a cross-site frontend. |
| `ADMIN_COOKIE_SECURE` | `true` in production | Forces the `Secure` cookie attribute. Always `true` when `NODE_ENV=production`. |
| `ADMIN_LOGIN_RATE_LIMIT_WINDOW_MS` | `900000` | Failed-login rate-limit window. |
| `ADMIN_LOGIN_RATE_LIMIT_MAX` | `10` | Failed login attempts allowed per window. |

Environment files are ignored by Git (`.env`, `.env.*`), while `.env.example` files are tracked. Never commit real credentials.

---

## Admin panel

### URLs

- Admin UI: `/admin/login`
- Admin API base: `/api/v1/admin`
- Health check: `/api/v1/health`

### Bootstrap credentials

The initial account is created from server-side environment variables:

| Setting | Value |
| --- | --- |
| Username | `amtratechnologies123` |
| Initial password | `StrongPassword123` |

These values are **not hardcoded in the frontend**. The password is stored only as a bcrypt hash (12 rounds) in MongoDB. Set the values in `server/.env` or the hosting provider's environment variables; never commit them.

### Seed instructions

The seed is idempotent and safe to run repeatedly:

1. Set the following in `server/.env` (or the hosting environment):

   ```dotenv
   MONGODB_URI=mongodb+srv://...
   ADMIN_SEED_ENABLED=true
   ADMIN_USERNAME=amtratechnologies123
   ADMIN_INITIAL_PASSWORD=<a strong password, at least 12 characters>
   ```

2. Run the seed from the repository root:

   ```bash
   npm run seed:admin
   ```

3. Set `ADMIN_SEED_ENABLED=false` again and restart the API.

The seed:

- creates the account only when no account with that username exists;
- never overwrites an existing password on restart;
- refuses passwords shorter than 12 characters;
- never logs the username, password, or password hash.

The server also runs the same idempotent seed at startup when `ADMIN_SEED_ENABLED=true`. Leaving it enabled is safe because an existing account is never modified, but disabling it after the first run is recommended.

### Changing the password later

There is no password-management UI because it is outside the approved scope. To rotate the password safely:

1. Generate a bcrypt hash locally from the repository root:

   ```bash
   node --input-type=module -e "import bcrypt from 'bcryptjs'; console.log(await bcrypt.hash(process.argv[1], 12));" "NewStrongPassword123"
   ```

2. Replace the hash in MongoDB with `mongosh`:

   ```javascript
   use <your-database>
   db.admins.updateOne(
     { username: "amtratechnologies123" },
     { $set: { passwordHash: "<the generated hash>" } }
   )
   ```

3. Sign out existing sessions by deleting the `adminSessions` collection, or wait for the 8-hour session TTL.

Alternatively, delete the administrator document and run the seed again with a new `ADMIN_INITIAL_PASSWORD`. Do this only during a controlled maintenance window.

### Session security

- The cookie is `HttpOnly`, so JavaScript cannot read it.
- `SameSite=Lax` by default; `Secure` is enabled automatically in production.
- The cookie path is `/api/v1/admin`, so it is not sent to public endpoints.
- Sessions expire after 8 hours and are refreshed on activity (`rolling: true`).
- Login regenerates the session ID to prevent session fixation.
- Logout destroys the session server-side and clears the cookie.
- Admin API routes return `401` without a valid session.
- Authenticated state-changing requests require the CSRF token returned by login or `GET /api/v1/admin/me`.

---

## Gmail SMTP setup

The API sends administrator notifications as the authenticated Gmail account. It does **not** spoof the client: the client's email address is used only in the `Reply-To` header.

1. **Use the receiving Gmail account** (or another Gmail account you control) as the sender. For this project that is `amtratechnologies@gmail.com`.
2. **Enable 2-Step Verification** at <https://myaccount.google.com/security>. App Passwords are not available without it.
3. **Create an App Password** at <https://myaccount.google.com/apppasswords>. Choose a descriptive name such as `AMTRA Website`. Google shows a 16-character password once.
4. **Paste it into `server/.env`**, removing spaces:

   ```dotenv
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=amtratechnologies@gmail.com
   SMTP_PASS=<google-app-password>
   CONTACT_PUBLIC_EMAIL=amtratechnologies@gmail.com
   CONTACT_RECEIVER_EMAIL=amtratechnologies@gmail.com
   ```

5. **Restart the API** so the new environment is loaded.

Notes:

- Use the App Password, not the normal Gmail password. Normal passwords are rejected for SMTP.
- Google Workspace accounts may have App Passwords or SMTP access disabled by an administrator.
- Gmail accounts have daily sending limits.
- Delivery depends on Google's SMTP service. The repository cannot guarantee deliverability, and live delivery has **not** been verified here because no App Password is configured.
- Credentials stay on the server. They are never sent to the browser and are not written to logs.

### Notification content

The administrator notification uses the exact subject:

```text
New Service Request Received — AMTRA Technologies
```

It includes the client name, requested service, submission date and time, and a note that the full request is available in the secure admin panel. It intentionally does **not** include the full request body or the client's email address in the body. The client's address is set only as `Reply-To`.

**No acknowledgement email is sent to the client.**

---

## How the inquiry flow works

1. The visitor opens `/contact` or follows a service link such as `/contact?service=payment-application-development#inquiry`.
2. The form reads the `service` query parameter and preselects the matching service. The form is keyed by that parameter, so navigating between service links resets it correctly.
3. On submit, the browser validates every field and focuses the first invalid one.
4. A valid payload is sent to `POST /api/v1/contact`. The submit button is disabled while the request is in flight, and a ref prevents duplicate submissions.
5. The server applies rate limiting, body-size limits, field validation, and a honeypot check. The honeypot field is hidden from users; a filled value is rejected.
6. **The request is saved to MongoDB first.** A database failure returns an error, so the client never sees a false success.
7. After the save succeeds, the server attempts a best-effort notification email to `CONTACT_RECEIVER_EMAIL`.
8. If SMTP is not configured or delivery fails, the request stays saved and visible in the admin panel. The failure is logged server-side and recorded as `notificationStatus: "failed"`. The API still returns success because the request was received.
9. The API returns `201` with only the request ID and received timestamp. It never returns the client's data or claims that an email was delivered.
10. On a validation or database failure, the form keeps the visitor's data, shows a clear error, and allows a retry.

---

## Database models

### `serviceRequests` collection

| Field | Type | Notes |
| --- | --- | --- |
| `fullName` | String | Required, maximum 100 characters |
| `email` | String | Required, lowercase, maximum 254 characters |
| `phone` | String | Optional, maximum 30 characters |
| `company` | String | Optional, maximum 120 characters |
| `country` | String | Optional, maximum 80 characters |
| `service` | String | Required, one of the published services or `Other` |
| `budget` | String | Optional, one of the published ranges |
| `timeline` | String | Optional, one of the published ranges |
| `description` | String | Required, maximum 5,000 characters |
| `contactMethod` | String | Optional: `Email`, `WhatsApp`, or `Phone` |
| `notificationStatus` | String | `pending`, `sent`, or `failed` |
| `createdAt` | Date | Set automatically; indexed descending |

### `admins` collection

| Field | Type | Notes |
| --- | --- | --- |
| `username` | String | Required, unique, lowercase, 3–64 characters |
| `passwordHash` | String | Required, bcrypt hash, excluded from queries unless explicitly selected |
| `role` | String | `admin` |
| `lastLoginAt` | Date | Updated after a successful login |
| `createdAt` | Date | Set automatically |

### `adminSessions` collection

Managed by `connect-mongo`. Sessions expire automatically according to `ADMIN_SESSION_TTL_MS`.

No existing collections are modified or deleted. The application only adds these collections and indexes.

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
| `phone` | string | No | Maximum 30 characters; digits, spaces, `+`, `-`, `.`, `()` |
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
    "id": "<MongoDB ObjectId>",
    "receivedAt": "2026-01-01T00:00:00.000Z"
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
| `500` | The request could not be saved |
| `503` | MongoDB is not connected |

SMTP failures do **not** change the response: the request is already saved and the API returns `201`.

### Admin authentication

| Method | Route | Auth | Purpose |
| --- | --- | --- | --- |
| `POST` | `/admin/login` | Origin check + rate limit | Sign in and receive the admin object and CSRF token |
| `GET` | `/admin/me` | Session | Restore the current admin and CSRF token |
| `POST` | `/admin/logout` | Session + CSRF | Destroy the session and clear the cookie |

Login response:

```json
{
  "success": true,
  "message": "Signed in successfully.",
  "data": {
    "admin": {
      "id": "<MongoDB ObjectId>",
      "username": "amtratechnologies123",
      "role": "admin"
    },
    "csrfToken": "<64-character hex token>"
  }
}
```

### Admin service requests

| Method | Route | Auth | Purpose |
| --- | --- | --- | --- |
| `GET` | `/admin/requests?page=1&limit=10` | Session | Paginated list, newest first |
| `GET` | `/admin/requests/:id` | Session | Complete request details |

List response:

```json
{
  "success": true,
  "message": "Service requests retrieved.",
  "data": {
    "items": [
      {
        "id": "<MongoDB ObjectId>",
        "fullName": "Ada Lovelace",
        "email": "ada@example.com",
        "service": "Web Development",
        "createdAt": "2026-01-01T10:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "totalPages": 1
    }
  }
}
```

Unauthenticated admin API requests return `401`. Invalid request IDs and missing requests return `404`.

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
| `npm run seed:admin` | Create the initial administrator when the seed is enabled |

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
- malformed JSON and oversized/missing bodies
- contact rate limiting
- persistence before notification, including a repository-order assertion
- administrator notification recipient, `Reply-To`, exact subject, and content
- no client acknowledgement and no full request body in email
- HTML escaping and email-header injection prevention
- saved requests surviving SMTP failure and missing SMTP configuration
- database errors not leaking to the client
- admin routes returning `401` without a session
- invalid credentials, validation errors, and untrusted origins
- secure HTTP-only session cookies and CSRF tokens
- session restoration via `GET /admin/me`
- request list and detail serialization
- missing requests returning `404`
- logout requiring CSRF and invalidating the session
- idempotent admin seeding with bcrypt hashes
- the SMTP adapter's transport options, authenticated sender, and missing-credential guard

No live SMTP or MongoDB request is made by the tests. The mailer and repositories are injected or replaced with in-memory fakes, and the session store falls back to memory under the Node test runner.

**Current status in this repository:** lint, **39 server tests**, and the production build pass. Live MongoDB persistence, admin login against a real database, and live Gmail delivery have **not** been verified locally because MongoDB and a real App Password were not available.

---

## SEO and metadata

- `client/index.html` provides baseline metadata, Open Graph and Twitter tags, font preconnects, and Organization JSON-LD.
- `client/src/hooks/usePageMeta.js` updates the title, description, and canonical URL on route changes when `VITE_SITE_URL` is set.
- `client/src/hooks/useNoIndex.js` adds `noindex,nofollow` to every admin page.
- `client/scripts/generate-sitemap.mjs` runs after `vite build`. When `VITE_SITE_URL` is a valid URL it writes `dist/sitemap.xml` and `dist/robots.txt` with the static routes and all 13 service detail routes. `robots.txt` always disallows `/admin`.
- Without `VITE_SITE_URL`, the script writes a permissive `robots.txt` (with `/admin` disallowed) and skips the sitemap rather than generating incorrect absolute URLs.

Set the production URL before building:

```bash
# macOS / Linux
VITE_SITE_URL=https://www.example.com npm run build

# Windows PowerShell
$env:VITE_SITE_URL="https://www.example.com"; npm run build
```

---

## Security notes

- SMTP, MongoDB, session, and bootstrap credentials exist only in `server/.env` and server-side environment variables.
- `SMTP_PASS`, `MONGODB_URI`, and `SESSION_SECRET` are never exposed to the client, returned in API responses, or logged.
- The sender is always the authenticated Gmail account. Client addresses are used only as `Reply-To`.
- Email headers are stripped of control characters to prevent header injection.
- HTML email content is escaped; a plain-text alternative is included with every message.
- Administrator notifications contain only the client name, service, submission time, and a pointer to the admin panel.
- No acknowledgement or request data is sent to the client.
- Passwords are stored only as bcrypt hashes with 12 rounds. The hash is excluded from normal queries.
- Failed logins take roughly the same time whether or not the username exists, reducing username enumeration.
- Admin sessions use HTTP-only, `SameSite`, `Secure`-in-production cookies scoped to `/api/v1/admin`.
- Sessions are regenerated on login, expire after 8 hours, and are destroyed on logout.
- Authenticated state-changing requests require a CSRF token compared in constant time.
- Login has a dedicated rate limit that counts failed attempts only.
- The API applies Helmet, a CORS allow-list with credentials restricted to configured origins, a 32 KB body limit, a general rate limit, a stricter contact rate limit, server-side validation, and a honeypot.
- The client is not trusted: every constraint is re-checked on the server.
- MongoDB credentials previously committed to `server/.env.example` should be rotated, and Git history should be reviewed if the repository was ever public.

---

## CI/CD and deployment

### Continuous integration

`.github/workflows/ci.yml` runs on every pull request and on pushes to `main` and `dev`:

1. Check out the repository.
2. Install Node.js 22 and `npm ci`.
3. Run `npm run lint`.
4. Run `npm test`.
5. Run `npm run build`.

The build reads optional repository variables `VITE_SITE_URL` and `VITE_API_URL`. Failed lint, tests, or build steps fail the workflow.

### Continuous deployment

`.github/workflows/deploy.yml` runs only after the **CI** workflow completes successfully for a push to `main`:

- Pull requests never deploy.
- Failed CI runs never deploy.
- Frontend and backend are separate jobs with separate environments (`production-frontend`, `production-backend`).
- A single `deploy-production` concurrency group serializes deployments, so two releases are never deployed in parallel.
- Each job calls a provider deploy hook from GitHub Actions secrets:
  - `FRONTEND_DEPLOY_HOOK`
  - `BACKEND_DEPLOY_HOOK`

Deploy hooks are supported by Vercel, Netlify, Render, Railway, and similar providers. If a hook secret is not configured, the job logs a notice and skips that deployment instead of claiming success.

### Hosting status

No hosting-provider configuration (Vercel, Netlify, Render, Railway, Docker, or similar) exists in this repository. Production deployment therefore **has not been configured or verified**. To enable it:

1. Create the frontend and backend services with your provider.
2. Add `FRONTEND_DEPLOY_HOOK` and `BACKEND_DEPLOY_HOOK` as GitHub Actions secrets.
3. Add the server environment variables from [Environment variables](#environment-variables) to the backend hosting service.
4. Set `NODE_ENV=production`, `TRUST_PROXY=true` if behind a proxy, and a production `CLIENT_ORIGINS` value.
5. Optionally set the `VITE_SITE_URL` and `VITE_API_URL` repository variables.
6. Confirm the release in the provider dashboard; a green workflow only means the deploy hook was accepted.

### Manual deployment

1. **Build the front end** with the public URL and API URL configured:

   ```bash
   VITE_SITE_URL=https://www.example.com VITE_API_URL=https://api.example.com/api/v1 npm run build
   ```

2. **Serve `client/dist`** from a static host or web server. Because the app uses client-side routing, rewrite unknown paths to `index.html` so deep links such as `/services/custom-software-development` and `/admin/login` work on refresh.

3. **Run the API** with `npm run start --workspace server` (or `node server/src/server.js`) and provide the server environment variables through the hosting platform.

4. **Verify after deployment:** health endpoint, every public route and deep link, the mobile menu, service preselection, a real inquiry (saved and visible in the admin panel), the administrator notification, admin login/logout, and the responsive admin pages.

Do not expose the API port directly if a reverse proxy is available. Keep `TRUST_PROXY` aligned with the actual proxy setup so rate limiting sees real client addresses.

---

## Remaining configuration

These items require information or credentials that are not in the repository:

1. **MongoDB connection string** — set `MONGODB_URI` to a real cluster before using the contact form or admin panel.
2. **Gmail App Password** — add it to `server/.env` (or the hosting provider's environment) to enable administrator notifications.
3. **Session secret** — set a long random `SESSION_SECRET` in production.
4. **Bootstrap password** — choose a strong `ADMIN_INITIAL_PASSWORD`, run the seed once, then disable the seed.
5. **Production domain** — set `VITE_SITE_URL` and `CLIENT_ORIGINS`; the sitemap and canonical URLs depend on it.
6. **Hosting provider and deploy hooks** — no provider is configured yet.
7. **Founder photograph** — the Founder page currently uses a text monogram (`ARC`) as a deliberate placeholder.
8. **Social profiles** — no social links are rendered because none are verified.
9. **Office address** — intentionally omitted. The site describes remote collaboration and Pakistan as the base location.
10. **Legal pages** — add a privacy policy and terms page if required for your jurisdiction or advertising channels.
11. **Credential rotation** — rotate any MongoDB credentials or Google App Password that were ever committed to the repository or shared in plain text.

---

## Troubleshooting

### The form returns `503`

MongoDB is not connected. Check `MONGODB_URI`, network access, and the MongoDB Atlas IP allow-list. The server logs a startup error when the connection string is missing or the connection fails.

### The request is saved but no notification arrives

The admin panel is the source of truth. Check:

- `SMTP_USER` and `SMTP_PASS` are set and the App Password is still valid.
- 2-Step Verification is enabled on the Google account.
- The account is not blocked from SMTP or App Passwords by a Workspace administrator.
- Outbound port 587 is allowed by the host or network.
- The request's `notificationStatus` is `failed` in MongoDB, and the server log contains the provider error.

The API deliberately does not report SMTP failure to the public visitor, because the request was saved successfully.

### The admin login returns `401`

- Confirm the account exists: `db.admins.findOne({ username: "amtratechnologies123" })`.
- Confirm the seed ran with `ADMIN_SEED_ENABLED=true`.
- Check `CLIENT_ORIGINS` matches the browser origin exactly, including scheme and port.
- Clear the `amtra_admin_sid` cookie and try again.
- Remember that the login rate limit counts failed attempts; wait for the window or restart the API during local testing.

### The admin session does not persist

- Set `SESSION_SECRET` to a stable value. A temporary development secret changes on every restart.
- In production, ensure `MONGODB_URI` is set so `connect-mongo` can persist sessions.
- If the frontend and API are on different sites, set `ADMIN_COOKIE_SAME_SITE=none`, `ADMIN_COOKIE_SECURE=true`, and use HTTPS. Cross-site cookies require both.

### `429 Too Many Requests`

The contact limit is 5 POST attempts per 15 minutes per client IP. Every attempt counts, including invalid payloads and failed saves, so repeated testing consumes the window quickly. The response includes a `Retry-After` header. The limiter uses an in-memory store by default; restarting the API resets it. For multiple instances, use a shared store such as Redis.

### The sitemap is missing after a build

`VITE_SITE_URL` was not set or was not a valid absolute URL. Set it before running `npm run build`.

### Deep links return `404` in production

Configure the static host to rewrite unknown paths to `index.html`. The API itself only serves `/api/v1/*`.

---

## Brand and contact

- **Company:** AMTRA Technologies
- **Founder & CEO:** Ali Raza Chakrani
- **Email:** amtratechnologies@gmail.com
- **WhatsApp:** +92 321 2192954
- **Location:** Pakistan
- **Tagline:** Innovative Software. Intelligent Solutions. Digital Growth.
