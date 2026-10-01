import type { SemesterGoals } from "../types.js";

// This is the section that makes your site feel "alive" rather than a static
// resume dump — update it at the start (and end) of each semester. It doubles
// as a running log an interviewer (or future you) can see real progress in.
export const goals: SemesterGoals[] = [
  {
    semester: "Fall 2026",
    status: "in-progress",
    items: [
      "Ship v1 of this portfolio site (HTML/CSS/TypeScript) and deploy it publicly on AWS.",
      "Learn React + TypeScript by rebuilding one section as a component.",
      "Add 1 more project I'm proud of to the Projects section.",
    ],
  },
  {
    semester: "Spring 2027",
    status: "planned",
    items: [
      "Add a real backend or API integration to a project.",
      "Set up a custom domain and HTTPS for the portfolio.",
    ],
  },
];
