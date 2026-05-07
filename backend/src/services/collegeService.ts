import type { College } from "../types";
import { colleges } from "../data/colleges";

export type CollegeQuery = {
  q?: string;
  location?: string;
  stream?: string;
  maxFees?: number;
  exam?: string;
  sort?: "relevance" | "fees" | "rating" | "placement";
};

const includes = (value: string, term?: string) => !term || value.toLowerCase().includes(term.toLowerCase());

export function listColleges(query: CollegeQuery) {
  const filtered = colleges.filter((college) => {
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

  const sorted = [...filtered].sort((a, b) => {
    if (query.sort === "fees") return a.feesRange.min - b.feesRange.min;
    if (query.sort === "rating") return (b.rating ?? 0) - (a.rating ?? 0);
    if (query.sort === "placement") return (b.placement.medianLpa ?? 0) - (a.placement.medianLpa ?? 0);
    return (b.rating ?? 0) + (b.placement.medianLpa ?? 0) / 10 - ((a.rating ?? 0) + (a.placement.medianLpa ?? 0) / 10);
  });

  return sorted;
}

export function getCollege(id: string) {
  return colleges.find((college) => college.id === id) ?? null;
}

export function compareColleges(ids: string[]) {
  const selected = ids.map(getCollege).filter((college): college is College => Boolean(college));
  return selected.slice(0, 4);
}

export function getFacets() {
  return {
    locations: [...new Set(colleges.map((college) => college.state))].sort(),
    streams: [...new Set(colleges.flatMap((college) => college.courses.map((course) => course.stream)))].sort(),
    exams: [...new Set(colleges.flatMap((college) => college.exams))].sort(),
    maxFee: Math.max(...colleges.map((college) => college.feesRange.max))
  };
}
