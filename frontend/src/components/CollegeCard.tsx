import { Bookmark, BookmarkCheck, GitCompareArrows, MapPin, Star } from "lucide-react";
import type { College } from "../lib/api";
import { money, safeMetric } from "../lib/api";

type Props = {
  college: College;
  saved: boolean;
  comparing: boolean;
  onSave: (id: string) => void;
  onCompare: (id: string) => void;
  onSelect: (college: College) => void;
};

export function CollegeCard({ college, saved, comparing, onSave, onCompare, onSelect }: Props) {
  return (
    <article className="collegeCard">
      <div className="cardTop">
        <div>
          <button className="linkTitle" onClick={() => onSelect(college)}>
            {college.name}
          </button>
          <p className="muted">
            <MapPin size={15} /> {college.city}, {college.state}
          </p>
        </div>
        <div className="ratingPill">
          <Star size={15} fill="currentColor" />
          {safeMetric(college.rating)}
        </div>
      </div>

      <div className="metrics">
        <span>
          <strong>{money(college.feesRange.min)}</strong>
          starting fees
        </span>
        <span>
          <strong>{safeMetric(college.placement.medianLpa, " LPA")}</strong>
          median package
        </span>
        <span>
          <strong>{college.ranking ? `#${college.ranking}` : "Unranked"}</strong>
          ranking
        </span>
      </div>

      <div className="signals">
        {college.decisionSignals.slice(0, 3).map((signal) => (
          <span key={signal}>{signal}</span>
        ))}
      </div>

      <div className="courses">
        {college.courses.map((course) => (
          <div key={course.id}>
            <strong>{course.name}</strong>
            <span>{course.stream} · {course.durationYears} years · {money(course.totalFees)}</span>
          </div>
        ))}
      </div>

      <div className="cardActions">
        <button onClick={() => onSave(college.id)} className={saved ? "activeAction" : ""}>
          {saved ? <BookmarkCheck size={17} /> : <Bookmark size={17} />}
          {saved ? "Saved" : "Save"}
        </button>
        <button onClick={() => onCompare(college.id)} className={comparing ? "activeAction" : ""}>
          <GitCompareArrows size={17} />
          {comparing ? "In compare" : "Compare"}
        </button>
      </div>
    </article>
  );
}
