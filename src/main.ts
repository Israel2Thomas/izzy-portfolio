// This is the entry point — the one file index.html actually loads
// (as dist/main.js, compiled from this file). Its job: take the plain data
// objects from src/data/*.ts and turn them into real DOM elements.
//
// Why build the DOM in TypeScript instead of just writing more HTML?
// Two reasons worth learning early:
//   1. It keeps content (data) separate from structure (markup) — you'll
//      appreciate this the moment you want to add a 4th project without
//      copy-pasting a whole HTML block by hand.
//   2. It's exactly the mental model React/Vue/etc. use under the hood —
//      "data in, DOM out" — so this is genuinely useful groundwork for the
//      React + TypeScript phase mentioned in the README.

import { education, experience, skills } from "./data/resume.js";
import { projects } from "./data/projects.js";
import { goals } from "./data/goals.js";
import type { Project, SemesterGoals } from "./types.js";

/** Small helper: create an element, optionally set its class and text content. */
function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

/**
 * Looks up an element by id and throws a clear error if it's missing.
 * In plain JS, `document.getElementById("typo-id")` silently returns null
 * and you get a confusing crash three lines later. TypeScript's strict mode
 * forces you to handle the null case explicitly — this helper is that
 * handling, done once instead of everywhere.
 */
function requireElement(id: string): HTMLElement {
  const found = document.getElementById(id);
  if (!found) {
    throw new Error(`Expected an element with id="${id}" in index.html but didn't find one.`);
  }
  return found;
}

function renderEducation(): void {
  const list = requireElement("education-list");
  for (const entry of education) {
    const item = el("li", "entry");
    item.append(
      el("div", "entry__title", `${entry.detail} — ${entry.school}`),
      el("div", "entry__meta", entry.dateRange)
    );
    list.append(item);
  }
}

function renderExperience(): void {
  const list = requireElement("experience-list");
  for (const entry of experience) {
    const item = el("li", "entry");
    const bulletList = el("ul");
    for (const bullet of entry.bullets) {
      bulletList.append(el("li", undefined, bullet));
    }
    item.append(
      el("div", "entry__title", `${entry.role} — ${entry.org}`),
      el("div", "entry__meta", entry.dateRange),
      bulletList
    );
    list.append(item);
  }
}

function renderSkills(): void {
  const list = requireElement("skills-list");
  for (const skill of skills) {
    list.append(el("li", undefined, skill));
  }
}

function renderProjectCard(project: Project): HTMLElement {
  const card = el("article", "project-card");
  card.append(el("h3", undefined, project.title));
  card.append(el("p", undefined, project.description));

  const tagList = el("ul", "project-card__tags");
  for (const tag of project.tags) {
    tagList.append(el("li", undefined, tag));
  }
  card.append(tagList);

  const links = el("div", "project-card__links");
  if (project.liveUrl) {
    const a = el("a", undefined, "Live site");
    a.href = project.liveUrl;
    a.target = "_blank";
    a.rel = "noopener noreferrer"; // security: prevents the new tab from accessing `window.opener`
    links.append(a);
  }
  if (project.repoUrl) {
    const a = el("a", undefined, "Source");
    a.href = project.repoUrl;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    links.append(a);
  }
  card.append(links);

  return card;
}

function renderProjects(): void {
  const grid = requireElement("projects-grid");
  for (const project of projects) {
    grid.append(renderProjectCard(project));
  }
}

function renderGoalEntry(goal: SemesterGoals): HTMLElement {
  const wrapper = el("div", "timeline-entry");

  const header = el("div", "timeline-entry__header");
  header.append(el("h3", undefined, goal.semester));
  header.append(el("span", "timeline-entry__status", goal.status.replace("-", " ")));
  wrapper.append(header);

  const list = el("ul");
  for (const item of goal.items) {
    list.append(el("li", undefined, item));
  }
  wrapper.append(list);

  return wrapper;
}

function renderGoals(): void {
  const timeline = requireElement("goals-timeline");
  for (const goal of goals) {
    timeline.append(renderGoalEntry(goal));
  }
}

function renderFooterYear(): void {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }
}

function init(): void {
  renderEducation();
  renderExperience();
  renderSkills();
  renderProjects();
  renderGoals();
  renderFooterYear();
}

init();
