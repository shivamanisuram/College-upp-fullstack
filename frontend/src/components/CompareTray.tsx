import { X } from "lucide-react";
import type { College } from "../lib/api";
import { money, safeMetric } from "../lib/api";

type Props = {
  colleges: College[];
  onRemove: (id: string) => void;
};

export function CompareTray({ colleges, onRemove }: Props) {
  if (colleges.length === 0) return null;

  return (
    <section className="compareTray" aria-label="College comparison">
      <div className="sectionHeading">
        <div>
          <p className="eyebrow">Decision support</p>
          <h2>Compare shortlisted options</h2>
        </div>
        <span>{colleges.length}/4 selected</span>
      </div>

      <div className="compareGrid">
        {colleges.map((college) => (
          <article key={college.id} className="compareColumn">
            <button className="iconButton" aria-label={`Remove ${college.name}`} onClick={() => onRemove(college.id)}>
              <X size={16} />
            </button>
            <h3>{college.name}</h3>
            <dl>
              <div><dt>Fees</dt><dd>{money(college.feesRange.min)}</dd></div>
              <div><dt>Median package</dt><dd>{safeMetric(college.placement.medianLpa, " LPA")}</dd></div>
              <div><dt>Placement rate</dt><dd>{safeMetric(college.placement.placementRate, "%")}</dd></div>
              <div><dt>Exams</dt><dd>{college.exams.join(", ")}</dd></div>
              <div><dt>Best signal</dt><dd>{college.decisionSignals[0]}</dd></div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
