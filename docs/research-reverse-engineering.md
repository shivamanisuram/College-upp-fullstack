# College Discovery Ecosystem: Research + Reverse Engineering

## 1. Page Architecture Breakdown

### Homepage

Page: Homepage

Objective: Help a student start discovery quickly and route them to colleges, courses, exams, tools, or counselling.

Features:

- Global search for colleges, courses, exams, articles, and tools.
- Top course shortcuts such as B.Tech, MBA, MBBS, B.Com, BBA, BCA.
- Featured colleges and sponsored admission cards.
- Navigation to colleges, exams, courses, reviews, articles, questions, predictors, comparison, scholarships, and counselling.
- Trending news, alerts, exams, and article modules.
- Lead capture for counselling or callback.

Data Points (Granular):

- Search term, search category, entity slug, entity type.
- College name, logo/image, city, state, ownership, ranking, fees, cutoff, admission status.
- Course category, course name, stream, duration.
- Exam name, dates, application status, result status.
- Article title, category, publish date, author, excerpt.
- User name, phone, email, preferred course, target exam, city.

### College Listing Pages

Page: College Listing Page

Objective: Discover, filter, compare, and shortlist colleges for a student goal.

Features:

- Search by college, city, course, exam, or keyword.
- Filters for location, stream, course, fees, exams, rating, ranking, ownership, accreditation, placement, course duration, admission status.
- Sorting by relevance, popularity, rating, fees, placement, ranking, review count.
- College cards with shortlist and compare actions.
- Pagination or infinite scroll.
- Sponsored/promoted college sections.
- Missing-data-safe display for unavailable fees, seats, placements, or rankings.

Data Points (Granular):

- College id, slug, name, short name, logo, hero image.
- City, state, region, campus type, ownership, established year.
- Ranking source, rank, rating, review count.
- Fees min/max, average fees, course-specific fees.
- Placement median package, highest package, placement rate.
- Accepted exams, cutoff availability, application deadline.
- Courses offered, course streams, seat counts.
- Facilities, accreditation, admission status, counselling CTA.

### College Detail Page

Page: College Detail Page

Objective: Give a complete decision profile for one college.

Features:

- Overview summary and decision signals.
- Tabs/sections for courses, fees, admissions, cutoffs, placements, reviews, facilities, rankings, scholarships, gallery, Q&A.
- Course table with duration, fees, seats, eligibility, accepted exams.
- Placement table with median/highest package, top recruiters, branch-wise outcomes.
- Review summary and student review list.
- Similar colleges and compare CTA.
- Save/bookmark and apply/counselling CTA.

Data Points (Granular):

- College profile fields: id, slug, name, description, location, ownership, approvals, accreditation, established year.
- Course fields: course id, name, stream, degree, duration, eligibility, fees, seats, specialization.
- Admission fields: application mode, dates, required exams, cutoff links, documents, selection process.
- Placement fields: median LPA, highest LPA, placement rate, recruiters, branch outcomes.
- Review fields: rating, reviewer, batch, course, review body, pros, cons, tags.
- Ranking fields: source, year, category, rank.

### Course Pages

Page: Course Page

Objective: Help students understand a course and find colleges offering it.

Features:

- Course overview, eligibility, duration, curriculum, career outcomes.
- Top colleges offering the course.
- Course-specific filters by city, fees, exam, rank, ownership.
- Admission process and exam mapping.
- Salary/career scope information.

Data Points (Granular):

- Course id, name, stream, degree type, duration, mode.
- Eligibility, subjects required, entrance exams, admission process.
- Curriculum modules, specializations, skills, career roles.
- College-course mapping, fees, seats, cutoff, placements.

### Exam Pages

Page: Exam Page

Objective: Help students track an entrance exam and discover colleges accepting it.

Features:

- Exam overview, dates, registration, admit card, result, counselling, syllabus.
- Accepting colleges list.
- Cutoff and predictor links.
- Preparation articles, sample papers, question papers.

Data Points (Granular):

- Exam id, name, conducting body, level, mode, frequency.
- Application dates, exam dates, result dates, counselling rounds.
- Eligibility, syllabus, pattern, fees, official URL.
- College mappings, cutoff category, rank range, course mapping.

### Tools: Predictors, Compare, Finder

Page: Tools

Objective: Convert student profile data into decision support.

Features:

- College predictor using rank, exam, category, domicile, gender, counselling type.
- College compare using fees, placement, ranking, exams, courses, reviews, facilities.
- Course/college finder using preferences, budget, city, stream, target exams.
- Personalized report or shortlist output.

Data Points (Granular):

- User input: rank, percentile, category, home state, gender, budget, preferred stream, preferred city.
- Prediction output: likely colleges, likely courses, cutoff confidence, counselling round.
- Compare fields: fee range, placement, rating, ranking, exams, deadline, decision signals.

### Rankings / Collections

Page: Rankings / Collections

Objective: Let users browse curated or authority-ranked college sets.

Features:

- Ranking tables by source, stream, state, ownership, year.
- Collections such as top engineering colleges, top MBA colleges, affordable colleges, best ROI colleges.
- Filters, sort, compare, and save actions.

Data Points (Granular):

- Ranking source, category, year, rank, score.
- Collection id, title, description, filters used.
- College card fields, fees, placements, rating, exams.

### Q&A / Community

Page: Q&A / Community

Objective: Resolve student doubts through peer, expert, or counsellor answers.

Features:

- Ask question.
- Browse questions by college, course, exam, admission, fees, placement.
- Answer, upvote, report, follow.
- Related articles and colleges.

Data Points (Granular):

- Question id, title, body, tags, author, created date.
- Answer id, answer body, expert flag, votes, accepted answer.
- Related college, course, exam, article.

### Articles / Content

Page: Articles / Content

Objective: Capture SEO demand and educate users through admissions, exams, rankings, and career content.

Features:

- Article pages with table of contents, related colleges, related exams, FAQs.
- News and admission alerts.
- Author, updated date, category, tags.
- Internal links to listings, detail pages, tools, and counselling.

Data Points (Granular):

- Article id, slug, title, body, author, category, tags.
- Publish date, updated date, SEO metadata.
- Related entities: college ids, course ids, exam ids.

### User Features

Page: User Features

Objective: Persist user intent and personalize future discovery.

Features:

- Login/signup.
- Saved colleges and saved searches.
- Compare history.
- Counselling leads.
- Review writing.
- Notification preferences.

Data Points (Granular):

- User id, name, email, phone, city, preferred stream.
- Saved college ids, saved course ids, saved search filters.
- Compare session ids, review ids, lead status.
- Notification channel and consent flags.

## 2. Data Model Thinking

Core Entities:

- College: id, slug, name, city, state, ownership, type, established_year, accreditation, ranking, rating, fees_min, fees_max, placement metrics.
- Course: id, college_id, name, stream, degree, duration_years, total_fees, seats, eligibility.
- Exam: id, name, conducting_body, level, mode, application_dates, exam_dates, official_url.
- CollegeExam: college_id, exam_id, cutoff_available, rank_range, counselling_round.
- User: id, name, email, phone, city, preferred_stream, created_at.
- SavedCollege: user_id, college_id, created_at.
- Review: id, user_id, college_id, course_id, rating, placement_rating, infra_rating, body, tags.
- Article: id, slug, title, category, author, body, published_at, updated_at.
- Question: id, user_id, title, body, tags, related_entity.
- Ranking: id, college_id, source, category, year, rank, score.

Relationships:

- College has many Courses.
- College accepts many Exams through CollegeExam.
- User saves many Colleges.
- User writes many Reviews.
- College has many Reviews, Rankings, Questions, and Articles.
- Course belongs to College and can map to Exams.

Read-Heavy Optimization:

- Index colleges by `state`, `fees_min`, `rating`, `median_lpa`.
- Full-text search index over college name, city, state, ownership, and course keywords.
- Cache facets such as locations, streams, exams, and fee ranges.
- Use pagination and narrow response DTOs for listing pages.
- Keep detail pages separately cached because they are deeper and heavier.

## 3. Competitive Analysis

| Platform | Strength | Weakness | Missing |
| --- | --- | --- | --- |
| Collegedunia | Huge SEO footprint, broad coverage of colleges/exams/courses/reviews, strong admissions funnels. | Dense interface, many competing CTAs, decision data can feel scattered. | Cleaner comparison, personalized shortlist reasoning, less clutter. |
| Careers360 | Strong predictor tools using rank, category, domicile, and counselling logic. | Tool flows often require lead capture and can feel heavy. | Lightweight exploration before signup, clearer compare experience. |
| Shiksha | Strong course and admission content, familiar search/listing patterns. | Content and ads can overpower decision flow. | Faster structured decision cards and clearer missing-data handling. |
| GetMyUni | Good counselling-led discovery, broad college/course/exam pages, strong support funnel. | Decision support can be more counselling-oriented than self-serve. | More transparent comparison and user-controlled filters. |
| CollegeVidya | Focused online/distance education comparison and guided decision flow. | Narrower category coverage for offline college discovery. | Broader full-time college ecosystem and richer campus outcomes. |
| Zollege | Simple college/course/exam content and lightweight browsing. | Lower perceived depth and fewer advanced decision tools. | Stronger personalization, compare, and trust indicators. |

Market Gaps:

- Comparison tools often show raw data, not decision reasoning.
- Personalization is usually gated behind counselling or login.
- Many platforms optimize SEO pages more than fast student decision-making.
- Missing-data handling is weak; unavailable metrics are often hidden or confusing.
- Listings can become noisy because ads, CTAs, and content blocks compete with college data.

## 4. How The MVP Rebuilds Better

- Uses a quiet, decision-focused interface with fewer distractions.
- Shows decision signals directly on college cards.
- Supports search, filters, save, compare, and detail inspection from one flow.
- Handles unavailable placement, rank, and seat data without crashing or misleading users.
- Keeps API, service, data, schema, and UI layers separated for production evolution.
