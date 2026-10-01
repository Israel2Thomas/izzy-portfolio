// This file defines the *shapes* of our data using TypeScript `interface`s.
// An interface doesn't exist at runtime — it's erased when compiled to JS —
// it exists purely so the compiler can catch mistakes for you. For example,
// if you typo a field name in resume.ts, or forget one, tsc will refuse to
// compile until you fix it. That's the whole value proposition of TypeScript
// over plain JavaScript: it turns "oops, found out in production" bugs into
// "red squiggly line in your editor" bugs.

export interface EducationEntry {
  school: string;
  detail: string;   // e.g. "B.S. Computer Science"
  dateRange: string; // e.g. "2023 – 2027 (expected)"
}

export interface ExperienceEntry {
  role: string;
  org: string;
  dateRange: string;
  bullets: string[];
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;   // the `?` marks this field optional — a project might not be deployed yet
  repoUrl?: string;
}

// A union type: `status` can ONLY ever be one of these three exact strings.
// Try assigning goal.status = "done" somewhere and tsc will flag it as an error —
// that's the compiler enforcing a small rule for you automatically.
export type GoalStatus = "planned" | "in-progress" | "complete";

export interface SemesterGoals {
  semester: string; // e.g. "Fall 2026"
  status: GoalStatus;
  items: string[];
}
