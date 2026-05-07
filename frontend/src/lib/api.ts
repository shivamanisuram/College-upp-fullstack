export type Course = {
  id: string;
  name: string;
  stream: string;
  durationYears: number;
  totalFees: number | null;
  seats: number | null;
};

export type College = {
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
  courses: Course[];
  feesRange: { min: number; max: number };
  placement: { medianLpa: number | null; highestLpa: number | null; placementRate: number | null };
  reviewCount: number;
  decisionSignals: string[];
  facilities: string[];
  applicationDeadline: string | null;
};

export type Facets = {
  locations: string[];
  streams: string[];
  exams: string[];
  maxFee: number;
};

export type CollegeQuery = {
  q: string;
  location: string;
  stream: string;
  exam: string;
  maxFees: number;
  sort: string;
};

const toQueryString = (query: Partial<CollegeQuery>) => {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== "" && value !== undefined && value !== null) params.set(key, String(value));
  });
  return params.toString();
};

export async function fetchColleges(query: Partial<CollegeQuery>) {
  const response = await fetch(`/api/colleges?${toQueryString(query)}`);
  if (!response.ok) throw new Error("Unable to load colleges");
  return response.json() as Promise<{ data: College[]; meta: { count: number; facets: Facets } }>;
}

export async function fetchCompare(ids: string[]) {
  const response = await fetch(`/api/colleges/compare?ids=${ids.join(",")}`);
  if (!response.ok) throw new Error("Unable to compare colleges");
  return response.json() as Promise<{ data: College[] }>;
}

export const money = (value: number | null) => {
  if (value === null) return "Not disclosed";
  if (value >= 100000) return `Rs ${(value / 100000).toFixed(value % 100000 === 0 ? 0 : 1)}L`;
  return `Rs ${value.toLocaleString("en-IN")}`;
};

export const safeMetric = (value: number | null, suffix = "") => (value === null ? "Not available" : `${value}${suffix}`);
