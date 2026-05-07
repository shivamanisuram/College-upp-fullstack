# CollegeSignal Technical Notes

## Product Surface

The assignment asks for a better college discovery and decision product, not a copied UI. This MVP focuses on the core flows:

- Discovery: searchable college listing with location, stream, exam, fee, and sort filters.
- Decision support: compare up to four colleges on fees, placements, exams, and decision signals.
- Shortlisting: browser-backed saved colleges that can later map to `saved_colleges`.
- Information clarity: detail panel with outcomes, courses, facilities, deadlines, and missing-data-safe fields.

## System Design

Frontend:

- React + Vite.
- Component-driven structure: filters, cards, compare tray, detail panel.
- Client state is intentionally small: filters, saved IDs, compare IDs, selected profile.
- Data fetching uses API boundaries instead of importing seed data directly.

Backend:

- Node + Express + TypeScript.
- Layered structure:
  - `routes`: HTTP contract and validation.
  - `services`: search/filter/compare logic.
  - `data`: seed repository, replaceable by PostgreSQL.
  - `middleware`: consistent error responses.
- Zod validates query inputs before service execution.
- Responses use `{ data, meta }` or `{ error }` consistently.

Database:

- PostgreSQL schema is in `database/schema.sql`.
- Core entities: colleges, courses, exams, users, saved colleges, reviews.
- Relationships model many courses per college and many exams per college.
- Indexes support read-heavy listing and filter queries.

## Competitive Takeaways

| Platform | Best At | Weakness | Gap To Improve |
| --- | --- | --- | --- |
| Collegedunia | SEO surface and data breadth | Dense pages and high clutter | Cleaner decision support |
| Careers360 | Predictors and exam journeys | Heavy content paths | Faster shortlisting |
| Shiksha | Listings and admission content | Ads and visual noise | Better comparison UX |
| GetMyUni | Counselling-led funnels | Less transparent decision data | More structured outcomes |
| CollegeVidya | Online education clarity | Narrower use case | Broader discovery |
| Zollege | Simple listings | Limited depth | Stronger trust signals |

## Tradeoffs

- Seed data is local for demo speed, but the API shape mirrors a PostgreSQL-backed service.
- Saved colleges use local storage; in production they should use authenticated `saved_colleges`.
- Filtering is in-memory now; at scale it belongs in indexed SQL plus optional OpenSearch/Meilisearch for typo-tolerant search.
- Images are limited to a single hero asset to keep the product fast and focused.

## Deployment Plan

- Frontend: Vercel or Netlify.
- Backend: Render or Railway.
- Database: Neon, Supabase, Railway Postgres, or Render Postgres.
- Required environment variables in production:
  - `PORT`
  - `DATABASE_URL`
  - `CORS_ORIGIN`
