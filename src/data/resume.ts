// Your actual resume content lives here as plain data — not buried in HTML.
// Update your site by editing these arrays; main.ts turns them into markup.
//
// TIP: because `education`, `experience`, and `skills` are typed against the
// interfaces in ../types.ts, if you accidentally write `dateRnage` instead of
// `dateRange` below, TypeScript will underline it in red immediately.

import type { EducationEntry, ExperienceEntry } from "../types.js";

export const education: EducationEntry[] = [
  {
    school: "University of Central Florida",
    detail: "B.S. in Computer Science",
    dateRange: "20XX – 20XX (expected)",
  },
];

export const experience: ExperienceEntry[] = [
  {
    role: "Resident Assistant",
    org: "UCF Housing & Residence Life",
    dateRange: "20XX – Present",
    bullets: [
      "Add 2–3 real bullet points: what you're responsible for, and a concrete outcome or number where you can.",
      "e.g. 'Supported a floor of N residents, ran programming events, and handled on-call incident response.'",
    ],
  },
  // Add more experience entries here as you gain them — internships, TA work, etc.
];

export const skills: string[] = [
  "TypeScript",
  "HTML/CSS",
  "Git",
  // Add the languages/tools from your coursework and projects — Python, Java, SQL, etc.
];
