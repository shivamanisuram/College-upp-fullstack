# CollegeSignal

A full-stack college discovery MVP based on the Collegupp internship assignment requirements. It is built to show discovery, filters, compare, shortlisting, clean information architecture, and system design thinking.

## Run Locally

```bash
npm install
npm run dev
```

- Frontend: `http://127.0.0.1:5173`
- Backend health: `http://127.0.0.1:4000/api/health`
- Listings API: `http://127.0.0.1:4000/api/colleges`

## Deploy

This project is Vercel-ready. The frontend builds to `frontend/dist`, and Express is exposed through `api/index.ts` as a serverless function.

## Structure

```text
backend/src
  data        Seed repository
  middleware  Error handling
  routes      API contracts
  services    Query and compare logic
frontend/src
  components  Reusable UI components
  lib         API client and formatting helpers
database      PostgreSQL schema
docs          Technical notes and product analysis
```

## Assignment Coverage

- Browse and search colleges.
- Apply filters for location, stream, exam, and fees.
- Compare colleges with structured decision metrics.
- Save/bookmark colleges.
- Clean responsive UI.
- Node API with validation, layered architecture, and consistent responses.
- PostgreSQL schema for production data modeling.
- Research/reverse-engineering doc with page architecture, granular data breakdown, data model, and competitive analysis.

## Live Deployment

- Product: https://files-mentioned-by-the-user-collegu.vercel.app
- API health: https://files-mentioned-by-the-user-collegu.vercel.app/api/health
- GitHub: https://github.com/shivamanisuram/College-upp-fullstack
