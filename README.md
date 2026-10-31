# AMTRA Technologies — Official Website

A production-ready foundation for the official AMTRA Technologies website, built with the MERN stack. The project includes a responsive marketing site, a modular Express API, a validated contact form, centralized error handling, security middleware, and a small automated test suite.

> **Project status:** Initial foundation. Business-specific content such as approved case studies, individual team profiles, contact details, and open roles is intentionally left as clearly marked placeholders. Nothing in this repository should be treated as a real client claim or vacancy.

---

## Table of contents

- [Technology stack](#technology-stack)
- [Project structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Available scripts](#available-scripts)
- [API reference](#api-reference)
- [Architecture notes](#architecture-notes)
- [Content placeholders](#content-placeholders)
- [Testing and quality checks](#testing-and-quality-checks)
- [Development workflow](#development-workflow)
- [Deployment notes](#deployment-notes)

---

## Technology stack

| Layer | Technology |
| --- | --- |
| Frontend | React 19, Vite 7, JavaScript (JSX), Tailwind CSS 4 |
| Routing | React Router DOM 7 |
| HTTP client | Axios with a centralized API client |
| Icons | Lucide React |
| Backend | Node.js, Express 5 |
| Database | MongoDB with Mongoose 9 |
| Validation | express-validator |
| Security | Helmet, CORS allow-list, express-rate-limit |
| Tooling | ESLint 10, Nodemon, Node test runner, Supertest, npm workspaces |

No authentication, admin dashboard, payment flow, or additional APIs are included in this initial version.

---

## Project structure

```text
amtra-technologies/
├── client/
│   ├── public/
│   │   ├── images/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── assets/                 # Local images and icons
│   │   ├── components/
│   │   │   ├── common/             # Container, SectionHeading, PageHero, etc.
│   │   │   ├── layout/             # Navbar, Footer, Layout
│   │   │   └── ui/                 # Button, ServiceCard, ProjectCard, TeamCard
│   │   ├── constants/              # Site, services, team, project, and company data
│   │   ├── features/
│   │   │   └── contact/            # Contact form and form state hook
│   │   ├── hooks/                  # Reusable hooks (page metadata)
│   │   ├── pages/                  # Route-level page components
│   │   ├── services/               # Axios client and API services
│   │   ├── utils/                  # Class-name and validation helpers
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── src/
│   │   ├── config/                 # Environment and MongoDB configuration
│   │   ├── constants/              # HTTP status constants
│   │   ├── controllers/            # Request/response handling
│   │   ├── middlewares/            # CORS, rate limiting, validation, errors
│   │   ├── models/                 # Mongoose schemas
│   │   ├── routes/                 # Versioned API routes
│   │   ├── services/               # Business logic
│   │   ├── utils/                  # ApiError, response helpers, logger
│   │   ├── validators/             # express-validator rule sets
│   │   ├── app.js                  # Express app factory
│   │   └── server.js               # Process entry point
│   ├── tests/                      # API integration tests
│   ├── .env.example
│   ├── eslint.config.js
│   └── package.json
│
├── .editorconfig
├── .gitignore
├── package.json                    # Workspace root and shared commands
└── README.md
```

The frontend is organized by responsibility rather than by framework convention alone: page composition lives in `pages`, reusable presentation lives in `components`, domain data lives in `constants`, and the contact workflow lives in `features/contact`. Global state is intentionally omitted because the current application has no shared client state requirement.

The backend follows a modular MVC-inspired flow:

```text
route -> validator -> controller -> service -> model
                              |
                         error middleware
```

The Express app is exported as a factory (`createApp`) so tests can inject a fake contact service without requiring a running MongoDB instance.

---

## Prerequisites

- **Node.js** `>= 20.19.0` (Node 22 or 24 recommended)
- **npm** `>= 10`
- **MongoDB** 6+ running locally, or a MongoDB Atlas connection string

---

## Getting started

1. **Install dependencies** from the repository root. npm workspaces install both apps:

   ```bash
   npm install
   ```

2. **Create the server environment file:**

   ```bash
   cp server/.env.example server/.env
   ```

   Update `MONGODB_URI` if your database is not running at the default local address.

3. **Create the client environment file (optional for local development):**

   ```bash
   cp client/.env.example client/.env
   ```

   If `VITE_API_URL` is omitted, the Vite dev server proxies `/api` requests to `http://localhost:5000`.

4. **Start both applications:**

   ```bash
   npm run dev
   ```

   | Service | URL |
   | --- | --- |
   | Frontend | http://localhost:5173 |
   | API | http://localhost:5000 |
   | Health check | http://localhost:5000/api/v1/health |

   You can also run each app separately:

   ```bash
   npm run dev:client
   npm run dev:server
   ```

> The API process connects to MongoDB before it starts listening. Make sure MongoDB is available before running `npm run dev:server`.

---

## Environment variables

### Client (`client/.env`)

| Variable | Required | Description |
| --- | --- | --- |
| `VITE_API_URL` | Production: yes | Full base URL of the API, including `/api/v1`. In local development it can be omitted to use the Vite proxy. |

Example:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

Only variables prefixed with `VITE_` are exposed to the browser. Never place secrets in client environment files.

### Server (`server/.env`)

| Variable | Default | Description |
| --- | --- | --- |
| `NODE_ENV` | `development` | `development`, `test`, or `production` |
| `PORT` | `5000` | API port |
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/amtra` | MongoDB connection string |
| `CLIENT_ORIGINS` | `http://localhost:5173` | Comma-separated allowed frontend origins |
| `TRUST_PROXY` | `false` | Set to `true` only behind a trusted reverse proxy |
| `RATE_LIMIT_WINDOW_MS` | `900000` | General API rate-limit window (15 minutes) |
| `RATE_LIMIT_MAX` | `300` | General API request limit per window |
| `CONTACT_RATE_LIMIT_WINDOW_MS` | `900000` | Contact form rate-limit window |
| `CONTACT_RATE_LIMIT_MAX` | `5` | Contact submissions allowed per window |

Example:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/amtra
CLIENT_ORIGINS=http://localhost:5173
TRUST_PROXY=false
```

Real `.env` files are ignored by Git. Commit only `.env.example`.

---

## Available scripts

Run these from the repository root:

| Command | Description |
| --- | --- |
| `npm run dev` | Run client and server together with `concurrently` |
| `npm run dev:client` | Start the Vite dev server |
| `npm run dev:server` | Start the API with Nodemon |
| `npm run build` | Create the production client build in `client/dist` |
| `npm run preview` | Preview the production client build |
| `npm start` | Start the API with plain Node.js |
| `npm run lint` | Lint both apps |
| `npm test` | Run the server test suite |

Workspace-specific commands are also available, for example:

```bash
npm run lint --workspace client
npm test --workspace server
```

---

## API reference

Base URL: `http://localhost:5000/api/v1`

All responses use a consistent JSON envelope.

### `GET /health`

Returns basic application health information.

**Response — `200 OK`**

```json
{
  "success": true,
  "message": "API is healthy.",
  "data": {
    "status": "ok",
    "uptimeSeconds": 42,
    "timestamp": "2026-01-01T00:00:00.000Z",
    "environment": "development"
  }
}
```

### `POST /contact`

Validates, sanitizes, and stores a contact message in MongoDB.

**Request body**

| Field | Type | Rules |
| --- | --- | --- |
| `name` | string | Required, 2–80 characters |
| `email` | string | Required, valid email, max 254 characters |
| `subject` | string | Required, 3–120 characters |
| `message` | string | Required, 20–2000 characters |

```json
{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "subject": "New web platform",
  "message": "We would like to discuss a new web application for our operations team."
}
```

**Success — `201 Created`**

```json
{
  "success": true,
  "message": "Thank you — your message has been received.",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "receivedAt": "2026-01-01T00:00:00.000Z"
  }
}
```

**Validation error — `422 Unprocessable Entity`**

```json
{
  "success": false,
  "message": "Please correct the highlighted fields.",
  "errors": [
    {
      "field": "email",
      "message": "Please enter a valid email address."
    }
  ]
}
```

**Rate limited — `429 Too Many Requests`**

```json
{
  "success": false,
  "message": "Too many requests. Please try again later."
}
```

**Other behavior**

- Unknown API routes return a JSON `404`.
- Malformed JSON returns a `400` without parser internals.
- Internal failures return a generic `500` message. Stack traces and database errors are logged server-side only.
- The general API limiter allows 300 requests per 15 minutes by default. Contact submissions are limited to 5 per 15 minutes by default.
- CORS requests from origins not listed in `CLIENT_ORIGINS` are rejected with `403`.

---

## Architecture notes

### Frontend

- Pages are lazy-loaded through React Router and rendered inside a shared `Layout`.
- `services/apiClient.js` is the single Axios instance. It normalizes network, timeout, validation, and server errors into an `ApiError`.
- `features/contact/useContactForm.js` owns form state, client-side validation, submission status, and field-error clearing.
- Design tokens (navy and accent palettes, typography) live in `src/index.css` using Tailwind CSS 4's `@theme` block. There is no `tailwind.config.js`.
- All user-facing page metadata is set with `usePageMeta`.
- The UI is responsive from small mobile screens through large desktop layouts and includes skip navigation, visible focus styles, labelled form controls, live regions for form status, and reduced-motion handling.

### Backend

- `src/app.js` builds the Express app without starting a listener. `src/server.js` handles MongoDB connection, listening, and graceful shutdown.
- Controllers stay thin. Contact persistence lives in `services/contact.service.js`.
- Validation rules live in `validators`, and the reusable validation middleware converts express-validator output into the standard error envelope.
- The error handler maps body-parser, Mongoose, duplicate-key, and operational errors without exposing internals.
- Rate limiting and CORS are configured through environment variables.
- Request bodies are capped at 10 KB.
- `express.json()` and `express.urlencoded()` are both enabled, with URL-encoded bodies restricted to non-extended parsing.

### Data model

`ContactMessage` stores only the fields required to respond to an inquiry:

- `name`, `email`, `subject`, `message`
- `createdAt`, `updatedAt` (Mongoose timestamps)
- An index on `createdAt` for future administrative reads

No authentication or admin UI is present, so messages are currently readable only through the database or a future protected interface.

---

## Content placeholders

The following content is deliberately not fabricated:

| Area | Location | Current behavior |
| --- | --- | --- |
| Contact details | `client/src/constants/siteConfig.js` | Empty; the Contact page explains that official channels will be published later |
| Portfolio | `client/src/constants/projects.js` | Empty array; the Portfolio page shows an honest empty state |
| Team | `client/src/constants/team.js` | Team disciplines, not invented people; individual profiles marked as coming soon |
| Careers | `client/src/pages/Careers/CareersPage.jsx` | States that there are no open positions |
| Company achievements | Throughout | No invented metrics, clients, testimonials, or certifications |

Update these files when approved business information becomes available. `ProjectCard` and the portfolio grid are already implemented and will render automatically when `projects` contains entries.

---

## Testing and quality checks

Run all checks before opening a pull request:

```bash
npm run lint
npm test
npm run build
```

The server test suite uses Node's built-in test runner and Supertest. It covers:

- Health endpoint response and security headers
- CORS allow-list behavior
- JSON 404 handling
- Contact success path with input trimming and email normalization
- Validation failures and field-level errors
- Internal error redaction
- Malformed JSON handling
- Contact rate limiting

Tests inject a fake contact service, so no MongoDB instance is required to run them.

---

## Development workflow

### Branches

Use short-lived branches from `main`:

```text
feat/contact-form
fix/mobile-nav-focus
chore/dependency-updates
docs/api-reference
```

### Commits

Prefer clear, conventional commit messages:

```text
feat(client): add portfolio empty state
fix(server): return 422 for invalid contact payloads
docs: document environment variables
```

### Pull requests

1. Keep the change focused on one concern.
2. Run `npm run lint`, `npm test`, and `npm run build`.
3. Include a short description of the change and any trade-offs.
4. Include screenshots for visible UI changes and note the tested screen sizes.
5. Do not commit `.env` files, credentials, or generated build output.
6. Require at least one review before merging to `main`.
7. Squash or rebase to keep history readable.

### Adding a page

1. Add the page folder under `client/src/pages`.
2. Compose it from `Container`, `SectionHeading`, `PageHero`, and existing UI components.
3. Register the route in `client/src/App.jsx` with `lazy`.
4. Add navigation only if the page is ready for public use.
5. Call `usePageMeta` with a specific title and description.

### Adding an API endpoint

1. Add validation rules under `server/src/validators`.
2. Add business logic to a service.
3. Add a thin controller.
4. Register the route under `server/src/routes`.
5. Add tests for success, validation, and failure paths.
6. Document the endpoint in this README.

---

## Deployment notes

### Client

```bash
npm run build
```

Deploy the contents of `client/dist` to a static host or CDN. Set `VITE_API_URL` at build time to the public API base URL, for example:

```env
VITE_API_URL=https://api.example.com/api/v1
```

Because the client uses `BrowserRouter`, configure the host to rewrite unknown paths to `index.html` so deep links work.

### Server

1. Set `NODE_ENV=production`.
2. Provide `MONGODB_URI`, `CLIENT_ORIGINS`, and `PORT` through the hosting platform's environment settings.
3. Set `TRUST_PROXY=true` only when running behind a trusted reverse proxy, and ensure the proxy forwards the real client IP.
4. Start with `npm start` (from the server workspace or the root).
5. Terminate TLS at the proxy or platform edge. Helmet is enabled, but transport security still depends on HTTPS.

### Operational checklist

- Restrict MongoDB network access and use a dedicated database user.
- Keep `CLIENT_ORIGINS` limited to the real production domains.
- Monitor API logs for internal errors; client responses intentionally stay generic.
- Add a database backup and retention policy before collecting real inquiries.
- Add a privacy policy before launching the contact form publicly.

---

## License

Internal project for AMTRA Technologies. All rights reserved.
