import { Search, SlidersHorizontal } from "lucide-react";
import type { CollegeQuery, Facets } from "../lib/api";

type Props = {
  query: CollegeQuery;
  facets: Facets | null;
  onChange: (next: CollegeQuery) => void;
};

export function Filters({ query, facets, onChange }: Props) {
  const update = (key: keyof CollegeQuery, value: string | number) => onChange({ ...query, [key]: value });

  return (
    <aside className="filters" aria-label="College filters">
      <div className="searchBox">
        <Search size={18} />
        <input
          value={query.q}
          onChange={(event) => update("q", event.target.value)}
          placeholder="Search college, city, exam"
          aria-label="Search colleges"
        />
      </div>

      <label>
        Course stream
        <select value={query.stream} onChange={(event) => update("stream", event.target.value)}>
          <option value="">All streams</option>
          {facets?.streams.map((stream) => (
            <option key={stream} value={stream}>
              {stream}
            </option>
          ))}
        </select>
      </label>

      <label>
        Location
        <select value={query.location} onChange={(event) => update("location", event.target.value)}>
          <option value="">All locations</option>
          {facets?.locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </label>

      <label>
        Entrance exam
        <select value={query.exam} onChange={(event) => update("exam", event.target.value)}>
          <option value="">Any exam</option>
          {facets?.exams.map((exam) => (
            <option key={exam} value={exam}>
              {exam}
            </option>
          ))}
        </select>
      </label>

      <label>
        Max first-choice fee
        <input
          type="range"
          min="90000"
          max={facets?.maxFee ?? 7500000}
          step="50000"
          value={query.maxFees}
          onChange={(event) => update("maxFees", Number(event.target.value))}
        />
        <span className="rangeValue">Rs {(query.maxFees / 100000).toFixed(1)}L</span>
      </label>

      <label>
        Sort
        <select value={query.sort} onChange={(event) => update("sort", event.target.value)}>
          <option value="relevance">Decision score</option>
          <option value="rating">Rating</option>
          <option value="placement">Placements</option>
          <option value="fees">Lowest fees</option>
        </select>
      </label>

      <button className="clearButton" onClick={() => onChange({ q: "", location: "", stream: "", exam: "", maxFees: 7500000, sort: "relevance" })}>
        <SlidersHorizontal size={16} />
        Reset filters
      </button>
    </aside>
  );
}
