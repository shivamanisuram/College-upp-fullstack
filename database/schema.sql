CREATE TYPE college_type AS ENUM ('government', 'private', 'deemed');

CREATE TABLE colleges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  type college_type NOT NULL,
  ownership TEXT,
  established_year INTEGER,
  rating NUMERIC(2, 1),
  national_ranking INTEGER,
  fees_min INTEGER,
  fees_max INTEGER,
  median_lpa NUMERIC(5, 2),
  highest_lpa NUMERIC(5, 2),
  placement_rate NUMERIC(5, 2),
  application_deadline DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  stream TEXT NOT NULL,
  duration_years NUMERIC(3, 1),
  total_fees INTEGER,
  seats INTEGER
);

CREATE TABLE exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  level TEXT,
  official_url TEXT
);

CREATE TABLE college_exams (
  college_id UUID REFERENCES colleges(id) ON DELETE CASCADE,
  exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
  PRIMARY KEY (college_id, exam_id)
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE saved_colleges (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  college_id UUID REFERENCES colleges(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, college_id)
);

CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  college_id UUID REFERENCES colleges(id) ON DELETE CASCADE,
  rating NUMERIC(2, 1) NOT NULL CHECK (rating BETWEEN 1 AND 5),
  placement_rating NUMERIC(2, 1),
  infra_rating NUMERIC(2, 1),
  body TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_colleges_search ON colleges USING gin (to_tsvector('english', name || ' ' || city || ' ' || state));
CREATE INDEX idx_colleges_filters ON colleges (state, fees_min, rating, median_lpa);
CREATE INDEX idx_courses_stream ON courses (stream, college_id);
