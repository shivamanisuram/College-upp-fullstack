export type CollegeType = "government" | "private" | "deemed";

export type College = {
  id: string;
  name: string;
  city: string;
  state: string;
  type: CollegeType;
  ownership: string;
  established: number;
  rating: number | null;
  ranking: number | null;
  accreditation: string[];
  exams: string[];
  courses: Course[];
  feesRange: {
    min: number;
    max: number;
  };
  placement: {
    medianLpa: number | null;
    highestLpa: number | null;
    placementRate: number | null;
  };
  reviewCount: number;
  decisionSignals: string[];
  facilities: string[];
  applicationDeadline: string | null;
};

export type Course = {
  id: string;
  name: string;
  stream: string;
  durationYears: number;
  totalFees: number | null;
  seats: number | null;
};

export type ApiResponse<T> = {
  data: T;
  meta?: Record<string, unknown>;
};
