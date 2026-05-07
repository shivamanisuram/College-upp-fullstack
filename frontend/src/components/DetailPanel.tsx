import { Building2, CalendarDays, GraduationCap, X } from "lucide-react";
import type { College } from "../lib/api";
import { money, safeMetric } from "../lib/api";

type Props = {
  college: College | null;
  onClose: () => void;
};

export function DetailPanel({ college, onClose }: Props) {
  if (!college) return null;

  return (
    <div className="detailOverlay" role="dialog" aria-modal="true" aria-label={`${college.name} details`}>
      <section className="detailPanel">
        <button className="iconButton closeDetail" onClick={onClose} aria-label="Close details">
          <X size={18} />
        </button>
        <p className="eyebrow">College profile</p>
        <h2>{college.name}</h2>
        <p className="muted">{college.ownership} · Established {college.established}</p>

        <div className="detailStats">
          <span><Building2 size={18} /> {college.city}, {college.state}</span>
          <span><GraduationCap size={18} /> {college.courses.length} highlighted courses</span>
          <span><CalendarDays size={18} /> Deadline: {college.applicationDeadline ?? "To be announced"}</span>
        </div>

        <div className="detailBlocks">
          <section>
            <h3>Decision signals</h3>
            <ul>
              {college.decisionSignals.map((signal) => (
                <li key={signal}>{signal}</li>
              ))}
            </ul>
          </section>
          <section>
            <h3>Outcome clarity</h3>
            <dl>
              <div><dt>Fees range</dt><dd>{money(college.feesRange.min)} - {money(college.feesRange.max)}</dd></div>
              <div><dt>Median package</dt><dd>{safeMetric(college.placement.medianLpa, " LPA")}</dd></div>
              <div><dt>Highest package</dt><dd>{safeMetric(college.placement.highestLpa, " LPA")}</dd></div>
            </dl>
          </section>
          <section>
            <h3>Courses</h3>
            {college.courses.map((course) => (
              <p key={course.id} className="courseLine">
                <strong>{course.name}</strong>
                <span>{course.stream} · {course.durationYears} years · Seats: {course.seats ?? "Not disclosed"}</span>
              </p>
            ))}
          </section>
          <section>
            <h3>Facilities</h3>
            <div className="signals">
              {college.facilities.map((facility) => (
                <span key={facility}>{facility}</span>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
