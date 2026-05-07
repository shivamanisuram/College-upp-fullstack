import express from "express";
import postgres from "postgres";
import { z, ZodError } from "zod";

const app = express();

type College = {
  id: string;
  name: string;
  city: string;
  state: string;
  type: "government" | "private" | "deemed";
  ownership: string;
  established: number;
  rating: number | null;
  ranking: number | null;
  accreditation: string[];
  exams: string[];
  courses: {
    id: string;
    name: string;
    stream: string;
    durationYears: number;
    totalFees: number | null;
    seats: number | null;
  }[];
  feesRange: { min: number; max: number };
  placement: { medianLpa: number | null; highestLpa: number | null; placementRate: number | null };
  reviewCount: number;
  decisionSignals: string[];
  facilities: string[];
  applicationDeadline: string | null;
};

const colleges: College[] = [
  {
    id: "iit-bombay",
    name: "Indian Institute of Technology Bombay",
    city: "Mumbai",
    state: "Maharashtra",
    type: "government",
    ownership: "Autonomous public technical institute",
    established: 1958,
    rating: 4.8,
    ranking: 3,
    accreditation: ["Institute of Eminence"],
    exams: ["JEE Advanced", "GATE"],
    courses: [
      { id: "cse-btech", name: "B.Tech Computer Science", stream: "Engineering", durationYears: 4, totalFees: 920000, seats: 120 },
      { id: "mtech-ai", name: "M.Tech Artificial Intelligence", stream: "Engineering", durationYears: 2, totalFees: 380000, seats: 46 }
    ],
    feesRange: { min: 380000, max: 920000 },
    placement: { medianLpa: 21.8, highestLpa: 68, placementRate: 86 },
    reviewCount: 412,
    decisionSignals: ["Top engineering brand", "Strong research labs", "Excellent placement depth"],
    facilities: ["Hostel", "Research parks", "Incubation center", "Sports complex"],
    applicationDeadline: "2026-06-15"
  },
  {
    id: "bits-pilani",
    name: "BITS Pilani",
    city: "Pilani",
    state: "Rajasthan",
    type: "private",
    ownership: "Deemed private university",
    established: 1964,
    rating: 4.6,
    ranking: 25,
    accreditation: ["NAAC A"],
    exams: ["BITSAT"],
    courses: [
      { id: "ece-btech", name: "B.E. Electronics", stream: "Engineering", durationYears: 4, totalFees: 2440000, seats: 150 },
      { id: "mba", name: "MBA Business Analytics", stream: "Management", durationYears: 2, totalFees: 1180000, seats: 80 }
    ],
    feesRange: { min: 1180000, max: 2440000 },
    placement: { medianLpa: 18.2, highestLpa: 60, placementRate: 82 },
    reviewCount: 287,
    decisionSignals: ["Flexible academic system", "Strong alumni network", "High product-company hiring"],
    facilities: ["Hostel", "Practice school", "Startup cell", "Library"],
    applicationDeadline: "2026-05-30"
  },
  {
    id: "srcc-delhi",
    name: "Shri Ram College of Commerce",
    city: "Delhi",
    state: "Delhi",
    type: "government",
    ownership: "University of Delhi constituent college",
    established: 1926,
    rating: 4.7,
    ranking: 1,
    accreditation: ["NAAC A++"],
    exams: ["CUET UG"],
    courses: [
      { id: "bcom", name: "B.Com Honours", stream: "Commerce", durationYears: 3, totalFees: 90000, seats: 625 },
      { id: "ba-eco", name: "B.A. Economics Honours", stream: "Arts", durationYears: 3, totalFees: 90000, seats: 155 }
    ],
    feesRange: { min: 90000, max: 90000 },
    placement: { medianLpa: 8.6, highestLpa: 35, placementRate: 72 },
    reviewCount: 524,
    decisionSignals: ["Best-fit for commerce careers", "Low fees", "Consulting and finance outcomes"],
    facilities: ["Library", "Seminar halls", "Commerce society", "Sports ground"],
    applicationDeadline: null
  },
  {
    id: "christ-university",
    name: "Christ University",
    city: "Bengaluru",
    state: "Karnataka",
    type: "deemed",
    ownership: "Private deemed university",
    established: 1969,
    rating: 4.2,
    ranking: 60,
    accreditation: ["NAAC A+"],
    exams: ["CUET", "Christ Entrance Test"],
    courses: [
      { id: "bba", name: "BBA", stream: "Management", durationYears: 3, totalFees: 720000, seats: 300 },
      { id: "bca", name: "BCA", stream: "Computer Applications", durationYears: 3, totalFees: 585000, seats: 180 }
    ],
    feesRange: { min: 585000, max: 720000 },
    placement: { medianLpa: 6.4, highestLpa: 18, placementRate: 68 },
    reviewCount: 739,
    decisionSignals: ["Urban campus", "Broad course catalogue", "Good student services"],
    facilities: ["Hostel", "Auditorium", "Counselling center", "Clubs"],
    applicationDeadline: "2026-05-25"
  },
  {
    id: "amity-noida",
    name: "Amity University Noida",
    city: "Noida",
    state: "Uttar Pradesh",
    type: "private",
    ownership: "Private university",
    established: 2005,
    rating: 3.9,
    ranking: null,
    accreditation: ["UGC", "NAAC A+"],
    exams: ["CUET", "Direct Application"],
    courses: [
      { id: "btech-cse", name: "B.Tech CSE", stream: "Engineering", durationYears: 4, totalFees: 1540000, seats: null },
      { id: "journalism", name: "BA Journalism", stream: "Media", durationYears: 3, totalFees: 510000, seats: 120 }
    ],
    feesRange: { min: 510000, max: 1540000 },
    placement: { medianLpa: 4.8, highestLpa: 24, placementRate: null },
    reviewCount: 1180,
    decisionSignals: ["Many program choices", "Easy application flow", "Large private campus"],
    facilities: ["Labs", "Hostel", "Media studio", "Food courts"],
    applicationDeadline: "2026-07-10"
  },
  {
    id: "manipal-mahe",
    name: "Manipal Academy of Higher Education",
    city: "Manipal",
    state: "Karnataka",
    type: "deemed",
    ownership: "Private deemed university",
    established: 1953,
    rating: 4.4,
    ranking: 16,
    accreditation: ["Institute of Eminence", "NAAC A++"],
    exams: ["MET", "NEET", "Direct Application"],
    courses: [
      { id: "mbbs", name: "MBBS", stream: "Medicine", durationYears: 5.5, totalFees: 7060000, seats: 250 },
      { id: "btech-data", name: "B.Tech Data Science", stream: "Engineering", durationYears: 4, totalFees: 1920000, seats: 120 }
    ],
    feesRange: { min: 1920000, max: 7060000 },
    placement: { medianLpa: 8.8, highestLpa: 45, placementRate: 76 },
    reviewCount: 668,
    decisionSignals: ["Strong health-science ecosystem", "International exposure", "Polished campus services"],
    facilities: ["Hospital", "Simulation labs", "Hostel", "Innovation center"],
    applicationDeadline: "2026-06-02"
  }
];

const includes = (value: string, term?: string) => !term || value.toLowerCase().includes(term.toLowerCase());

const databaseUrl = process.env.DATABASE_URL;
const sql = databaseUrl ? postgres(databaseUrl, { max: 1, ssl: "require" }) : null;
let databaseReady: Promise<void> | null = null;

const ensureDatabase = async () => {
  if (!sql) return;
  if (databaseReady) return databaseReady;

  databaseReady = (async () => {
    await sql`
      create table if not exists college_profiles (
        id text primary key,
        payload jsonb not null,
        state text not null,
        fees_min integer not null,
        rating numeric,
        median_lpa numeric,
        search_document text not null,
        updated_at timestamptz not null default now()
      )
    `;
    await sql`create index if not exists idx_college_profiles_filters on college_profiles (state, fees_min, rating, median_lpa)`;
    await sql`create index if not exists idx_college_profiles_search on college_profiles using gin (to_tsvector('english', search_document))`;

    const [{ count }] = await sql<{ count: string }[]>`select count(*)::text as count from college_profiles`;
    if (Number(count) === 0) {
      for (const college of colleges) {
        await sql`
          insert into college_profiles (id, payload, state, fees_min, rating, median_lpa, search_document)
          values (
            ${college.id},
            ${sql.json(college)},
            ${college.state},
            ${college.feesRange.min},
            ${college.rating},
            ${college.placement.medianLpa},
            ${[college.name, college.city, college.state, college.ownership, ...college.exams, ...college.decisionSignals].join(" ")}
          )
          on conflict (id) do update set
            payload = excluded.payload,
            state = excluded.state,
            fees_min = excluded.fees_min,
            rating = excluded.rating,
            median_lpa = excluded.median_lpa,
            search_document = excluded.search_document,
            updated_at = now()
        `;
      }
    }
  })();

  return databaseReady;
};

const loadColleges = async () => {
  if (!sql) return colleges;

  await ensureDatabase();
  const rows = await sql<{ payload: College }[]>`select payload from college_profiles`;
  return rows.map((row) => row.payload);
};

const getCollege = (source: College[], id: string) => source.find((college) => college.id === id) ?? null;

const getFacets = (source: College[]) => ({
  locations: [...new Set(source.map((college) => college.state))].sort(),
  streams: [...new Set(source.flatMap((college) => college.courses.map((course) => course.stream)))].sort(),
  exams: [...new Set(source.flatMap((college) => college.exams))].sort(),
  maxFee: Math.max(...source.map((college) => college.feesRange.max))
});

const listColleges = (source: College[], query: z.infer<typeof querySchema>) => {
  const filtered = source.filter((college) => {
    const searchBlob = [college.name, college.city, college.state, college.ownership, ...college.exams, ...college.decisionSignals].join(" ");
    const hasCourse = !query.stream || college.courses.some((course) => includes(course.stream, query.stream));

    return (
      includes(searchBlob, query.q) &&
      (!query.location || includes(`${college.city} ${college.state}`, query.location)) &&
      hasCourse &&
      (!query.exam || college.exams.some((exam) => includes(exam, query.exam))) &&
      (!query.maxFees || college.feesRange.min <= query.maxFees)
    );
  });

  return [...filtered].sort((a, b) => {
    if (query.sort === "fees") return a.feesRange.min - b.feesRange.min;
    if (query.sort === "rating") return (b.rating ?? 0) - (a.rating ?? 0);
    if (query.sort === "placement") return (b.placement.medianLpa ?? 0) - (a.placement.medianLpa ?? 0);
    return (b.rating ?? 0) + (b.placement.medianLpa ?? 0) / 10 - ((a.rating ?? 0) + (a.placement.medianLpa ?? 0) / 10);
  });
};

const querySchema = z.object({
  q: z.string().optional(),
  location: z.string().optional(),
  stream: z.string().optional(),
  exam: z.string().optional(),
  maxFees: z.coerce.number().positive().optional(),
  sort: z.enum(["relevance", "fees", "rating", "placement"]).optional()
});

app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ data: { status: "ok", service: "college-discovery-api", dataSource: sql ? "hosted-postgres" : "seed-fallback" } });
});

app.get("/api/colleges", async (request, response, next) => {
  try {
    const query = querySchema.parse(request.query);
    const source = await loadColleges();
    const data = listColleges(source, query);

    response.json({ data, meta: { count: data.length, facets: getFacets(source), dataSource: sql ? "hosted-postgres" : "seed-fallback" } });
  } catch (error) {
    next(error);
  }
});

app.get("/api/colleges/compare", async (request, response, next) => {
  try {
    const source = await loadColleges();
    const ids = z.string().transform((value) => value.split(",").filter(Boolean)).parse(request.query.ids ?? "");
    response.json({ data: ids.map((id) => getCollege(source, id)).filter(Boolean).slice(0, 4), meta: { requested: ids.length, dataSource: sql ? "hosted-postgres" : "seed-fallback" } });
  } catch (error) {
    next(error);
  }
});

app.get("/api/colleges/:id", async (request, response, next) => {
  try {
    const source = await loadColleges();
    const college = getCollege(source, request.params.id);
    if (!college) {
      response.status(404).json({ error: { code: "NOT_FOUND", message: "College not found." } });
      return;
    }

    response.json({ data: college, meta: { dataSource: sql ? "hosted-postgres" : "seed-fallback" } });
  } catch (error) {
    next(error);
  }
});

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  if (error instanceof ZodError) {
    response.status(400).json({ error: { code: "VALIDATION_ERROR", message: "Request parameters are invalid.", details: error.issues } });
    return;
  }

  response.status(500).json({ error: { code: "INTERNAL_ERROR", message: "Something went wrong. Please try again." } });
});

export default app;
