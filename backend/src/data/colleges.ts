import type { College } from "../types";

export const colleges: College[] = [
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
