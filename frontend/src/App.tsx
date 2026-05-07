import { useEffect, useMemo, useState } from "react";
import { Activity, Database, GitBranch, Heart, Layers3, ShieldCheck } from "lucide-react";
import { CollegeCard } from "./components/CollegeCard";
import { CompareTray } from "./components/CompareTray";
import { DetailPanel } from "./components/DetailPanel";
import { Filters } from "./components/Filters";
import type { College, CollegeQuery, Facets } from "./lib/api";
import { fetchColleges, fetchCompare } from "./lib/api";

const defaultQuery: CollegeQuery = {
  q: "",
  location: "",
  stream: "",
  exam: "",
  maxFees: 7500000,
  sort: "relevance"
};

export function App() {
  const [query, setQuery] = useState(defaultQuery);
  const [colleges, setColleges] = useState<College[]>([]);
  const [facets, setFacets] = useState<Facets | null>(null);
  const [saved, setSaved] = useState<string[]>(() => JSON.parse(localStorage.getItem("savedColleges") ?? "[]"));
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [compareColleges, setCompareColleges] = useState<College[]>([]);
  const [selected, setSelected] = useState<College | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let active = true;
    setStatus("loading");
    fetchColleges(query)
      .then((response) => {
        if (!active) return;
        setColleges(response.data);
        setFacets(response.meta.facets);
        setStatus("ready");
      })
      .catch(() => active && setStatus("error"));
    return () => {
      active = false;
    };
  }, [query]);

  useEffect(() => {
    localStorage.setItem("savedColleges", JSON.stringify(saved));
  }, [saved]);

  useEffect(() => {
    if (compareIds.length === 0) {
      setCompareColleges([]);
      return;
    }
    fetchCompare(compareIds).then((response) => setCompareColleges(response.data));
  }, [compareIds]);

  const savedColleges = useMemo(() => colleges.filter((college) => saved.includes(college.id)), [colleges, saved]);

  const toggleSaved = (id: string) => {
    setSaved((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const toggleCompare = (id: string) => {
    setCompareIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      return [...current, id].slice(0, 4);
    });
  };

  return (
    <main>
      <section className="hero">
        <nav>
          <div className="brand">
            <span>CS</span>
            CollegeSignal
          </div>
          <div className="navStats">
            <span>{colleges.length} matches</span>
            <span>{saved.length} saved</span>
          </div>
        </nav>

        <div className="heroContent">
          <div>
            <p className="eyebrow">College discovery MVP</p>
            <h1>Find the college that makes the decision easier.</h1>
            <p>
              A cleaner Collegedunia-style discovery system with searchable listings, structured profiles,
              comparison, shortlisting, and backend-first data handling.
            </p>
          </div>
          <div className="systemStrip" aria-label="System design highlights">
            <span><Layers3 size={18} /> Layered API</span>
            <span><Database size={18} /> Normalized schema</span>
            <span><ShieldCheck size={18} /> Validated inputs</span>
            <span><Activity size={18} /> Read-heavy filters</span>
          </div>
        </div>
      </section>

      <section className="workspace">
        <Filters query={query} facets={facets} onChange={setQuery} />

        <section className="results">
          <div className="sectionHeading">
            <div>
              <p className="eyebrow">Discovery</p>
              <h2>Recommended colleges</h2>
            </div>
            <span>{status === "loading" ? "Loading..." : `${colleges.length} results`}</span>
          </div>

          {status === "error" && <div className="emptyState">The API did not respond. Start the backend and refresh.</div>}
          {status === "ready" && colleges.length === 0 && <div className="emptyState">No colleges match these filters.</div>}
          <div className="resultList">
            {colleges.map((college) => (
              <CollegeCard
                key={college.id}
                college={college}
                saved={saved.includes(college.id)}
                comparing={compareIds.includes(college.id)}
                onSave={toggleSaved}
                onCompare={toggleCompare}
                onSelect={setSelected}
              />
            ))}
          </div>
        </section>

        <aside className="insights">
          <div className="insightPanel">
            <p className="eyebrow">Shortlist</p>
            <h2>Saved colleges</h2>
            {savedColleges.length === 0 ? (
              <p className="muted">Saved colleges stay in browser storage for quick revisits.</p>
            ) : (
              savedColleges.map((college) => (
                <button key={college.id} className="savedItem" onClick={() => setSelected(college)}>
                  <Heart size={15} fill="currentColor" />
                  {college.name}
                </button>
              ))
            )}
          </div>

          <div className="insightPanel">
            <p className="eyebrow">Architecture</p>
            <h2>Why this scales</h2>
            <ul className="architectureList">
              <li><GitBranch size={16} /> API separates query, service, and data layers.</li>
              <li><Database size={16} /> Schema supports colleges, courses, exams, reviews, saved lists.</li>
              <li><Activity size={16} /> Filters are shaped for indexed, read-heavy queries.</li>
            </ul>
          </div>
        </aside>
      </section>

      <CompareTray colleges={compareColleges} onRemove={toggleCompare} />
      <DetailPanel college={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
