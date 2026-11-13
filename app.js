"use strict";

const {problems, resources, study} = window.PREP_DATA;
const labels = {overview:"Overview", dsa:"Practice problems", java:"Java", lld:"Low-level design", system:"System design"};
const descriptions = {
  java:"Practice Java fundamentals with short exercises in OOP, validation and thread safety.",
  lld:"Work through design projects and exercises in UML, SOLID and design patterns.",
  system:"Study distributed systems fundamentals, then apply them to design problems."
};
const studyResources = {java:["java","pdf"], lld:["roadmap","java"], system:["system","roadmap"]};
const storageKey = "prep-studio-v1";
const byId = id => document.getElementById(id);
const search = byId("query");
const topics = [...new Set(problems.map(problem => problem[3]))].sort((a,b) => a.localeCompare(b));
const topic = new FilterSelect(byId("topic"),"Topic",[["","All topics"],...topics.map(group => [group,group])],applyFilters);
const difficulty = new FilterSelect(byId("difficulty"),"Difficulty",[["","Any difficulty"],...["Easy","Medium","Hard"].map(level => [level,level])],applyFilters);
const status = new FilterSelect(byId("status"),"Status",[["","Any status"],["done","Solved"],["todo","To do"]],applyFilters);
const filters = [topic,difficulty,status];

const milestones = [25, 50, 100, 150, 220];

let route;
let state = {checked:{}, activity:{}, theme:"light"};
let cloudReady = false;
let revision = 0;
let loading = false;
const pending = new Set();
try { state.theme = localStorage.getItem("prep-theme") === "dark" ? "dark" : "light"; } catch {}

function saveMessage(text) { byId("save-note").textContent = text; }
async function cloudRequest(body) {
  const response = await fetch("/api/progress", body ? {
    method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(body)
  } : {cache:"no-store"});
  if (!response.ok) throw new Error("Could not save progress");
  return response.json();
}
function refreshProgress() {
  if (Object.hasOwn(study,route)) renderLessons();
  else { renderDashboard(); renderRows(); }
}
async function loadCloud() {
  if (pending.size || loading) return;
  loading = true;
  const startedAt = revision;
  try {
    let saved = await cloudRequest();
    // Import older browser progress once, without replacing newer cloud actions.
    let legacy;
    try { legacy = JSON.parse(localStorage.getItem(storageKey)); } catch {}
    if (legacy?.checked && Object.keys(legacy.checked).length) {
      saved = await cloudRequest({action:"import",checked:legacy.checked,activity:legacy.activity || {}});
      try { localStorage.removeItem(storageKey); } catch {}
    }
    if (pending.size || revision !== startedAt) return;
    state.checked = saved.checked;
    state.activity = saved.activity;
    cloudReady = true;
    refreshProgress();
    saveMessage("Progress saved online · shared across devices");
  } catch {
    saveMessage("Couldn’t connect to saved progress. Refresh to retry.");
  } finally { loading = false; }
}
async function saveProgress(field, id) {
  if (!cloudReady || pending.has(id)) { refreshProgress(); return; }
  revision++;
  const done = field.checked;
  pending.add(id);
  field.disabled = true;
  saveMessage("Saving…");
  try {
    const result = await cloudRequest({id,done});
    state.checked[id] = result.done;
    state.activity[id] = {[result.done ? "doneAt" : "undoneAt"]:result.at};
    saveMessage("Progress saved online · shared across devices");
    byId("announcement").textContent = `${done ? "Completed" : "Undone"}. Progress saved.`;
  } catch {
    saveMessage("Couldn’t save that change. Please try again.");
    byId("announcement").textContent = "Change not saved. Please try again.";
  } finally {
    pending.delete(id);
    refreshProgress();
    byId(field.id)?.focus({preventScroll:true});
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[char]);
}

function completed(id, initial) {
  return typeof state.checked[id] === "boolean" ? state.checked[id] : initial;
}


const istDate = new Intl.DateTimeFormat("en-IN", {
  timeZone:"Asia/Kolkata", day:"numeric", month:"short", year:"numeric"
});
const istTime = new Intl.DateTimeFormat("en-IN", {
  timeZone:"Asia/Kolkata", hour:"numeric", minute:"2-digit", hour12:true
});
function questionTimestamps(id) {
  const done = state.checked[id] === true;
  const value = state.activity[id]?.[done ? "doneAt" : "undoneAt"];
  if (!value || !Number.isFinite(Date.parse(value))) return "";
  const date = new Date(value);
  return `<small class="question-timestamps"><em>${done ? "Completed" : "Undone"} on <time datetime="${escapeHtml(value)}">${istDate.format(date)} at ${istTime.format(date).toUpperCase()} IST</time></em></small>`;
}

function sourceLink(key) {
  return `https://chatgpt.com/library?file_id=${encodeURIComponent(resources[key][1])}&account_id=personal`;
}

function theme() {
  document.documentElement.dataset.theme = state.theme;
  const nextTheme = state.theme === "dark" ? "Light mode" : "Dark mode";
  const button = byId("theme");
  button.setAttribute("aria-label",`Switch to ${nextTheme.toLowerCase()}`);
  button.title = nextTheme;
  button.innerHTML = state.theme === "dark"
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M5 19l2-2m10-10 2-2"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M19.7 15.4A8 8 0 0 1 8.6 4.3a8 8 0 1 0 11.1 11.1Z"/></svg>';
}

function stats() {
  const total = {solved:0, count:problems.length};
  const levels = Object.fromEntries(["Easy","Medium","Hard"].map(level => [level,{solved:0,count:0}]));
  for (const [id,,,,level,initial] of problems) {
    levels[level].count++;
    if (completed(id,initial)) {
      total.solved++;
      levels[level].solved++;
    }
  }
  return {total, levels};
}

function percent(solved, count) {
  return count ? 100 * solved / count : 0;
}

function renderOverview() {
  byId("intro").innerHTML = `<div class="hero">
    <figure class="notebook" aria-hidden="true">
      <svg viewBox="0 0 370 193" fill="none">
        <defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" stroke="#8392a4" stroke-opacity=".22"/></pattern></defs>
        <rect width="370" height="193" fill="url(#grid)"/>
        <path d="M33 146C73 146 91 118 119 118S160 134 191 105 234 63 266 70 317 66 337 40" class="notebook-line" stroke="#45699e" stroke-width="2.3" stroke-linecap="round"/>
        <circle cx="119" cy="118" r="5" fill="#e7c588" stroke="#f3eee2" stroke-width="2"/>
        <circle cx="191" cy="105" r="5" fill="#6d8c79" stroke="#f3eee2" stroke-width="2"/>
        <circle cx="266" cy="70" r="5" fill="#e7c588" stroke="#f3eee2" stroke-width="2"/>
        <circle cx="337" cy="40" r="6" fill="#45699e" stroke="#f3eee2" stroke-width="2"/>
        <path d="M42 166h33m-33 6h21M293 141h34m-34 6h22m-22 6h28" stroke="#708095" stroke-opacity=".55" stroke-linecap="round"/>
      </svg>
    </figure>
    <h1>My interview<br>prep notes.</h1>
    <p>A place to keep track of the problems I solve and the concepts I want to revisit. I’m working through data structures in Java, then applying what I learn to low-level and system design.</p>
  </div>`;
  byId("reading").innerHTML = `<div class="reading-links">
    <a href="#dsa">Practice problems <span aria-hidden="true">→</span></a>
    <a href="#java">Java <span aria-hidden="true">→</span></a>
    <a href="#lld">Low-level design <span aria-hidden="true">→</span></a>
    <a href="#system">System design <span aria-hidden="true">→</span></a>
  </div>`;
}

function renderDashboard() {
  const {total,levels} = stats();
  const pct = percent(total.solved,total.count);
  const next = milestones.find(milestone => milestone > total.solved);
  const note = next ? `Next milestone · ${next} solved` : "All problems solved";
  byId("metrics").innerHTML = `<div class="progress-heading"><div><h2>Practice progress</h2><p><strong>${total.solved} of ${total.count}</strong> problems solved</p></div><span>${pct.toFixed(1)}%</span></div>
    <div class="progress-track" role="progressbar" aria-label="Problems solved" aria-valuemin="0" aria-valuemax="${total.count}" aria-valuenow="${total.solved}"><span style="width:${pct}%"></span></div>
    <div class="progress-meta">${Object.entries(levels).map(([label,item]) => `<span><i class="dot ${label.toLowerCase()}"></i>${label} ${item.solved}/${item.count}</span>`).join("")}<span class="milestone">${note}</span></div>`;
}

function renderRows(focusId) {
  const query = search.value.trim().toLowerCase();
  byId("reset-filters").hidden = !search.value && !filters.some(filter => filter.value);
  const filtered = problems.filter(([id,title,url,group,level,initial]) =>
    (!query || `${id} ${title} ${group} ${url}`.toLowerCase().includes(query)) &&
    (!topic.value || group === topic.value) &&
    (!difficulty.value || level === difficulty.value) &&
    (!status.value || completed(id,initial) === (status.value === "done"))
  );
  const visibleIds = new Set(filtered.map(problem => problem[0]));
  const problemById = new Map(problems.map(problem => [problem[0],problem]));
  const sections = window.TRACKER_PATTERNS.filter(section => section.items.some(item => visibleIds.has(item.id)));
  byId("rows").innerHTML = sections.map(section => {
    const items = section.items.map(item => {
      if (!item.id) return `<p class="pattern-note">${trackerInline(item.text)}</p>`;
      if (!visibleIds.has(item.id)) return "";
      const [id,title,,,,initial] = problemById.get(item.id);
      return `<label class="pattern-question"><input type="checkbox" id="problem-${id}" data-problem="${id}" ${!cloudReady || pending.has(String(id)) ? "disabled" : ""} aria-label="Solved: ${escapeHtml(title)}" ${completed(id,initial) ? "checked" : ""}><span class="serial">${id}.</span><span>${trackerInline(item.text)}${questionTimestamps(id)}</span></label>`;
    }).join("");
    return `<section class="pattern-section"><h3>${escapeHtml(section.title)}</h3>${items}</section>`;
  }).join("") || '<p class="empty">No matching problems. Try a different search or clear the filters.</p>';
  byId("result-count").textContent = `${filtered.length} problems across ${sections.length} sections`;
  if (focusId) (byId(focusId) || byId("rows").querySelector("input") || status.trigger).focus();
}

function trackerInline(text) {
  return escapeHtml(text)
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>")
    .replace(/`([^`]+)`/g,"<code>$1</code>");

}

function renderStudy() {
  byId("intro").innerHTML = `<div class="hero"><div><h1>${labels[route]}</h1><p>${descriptions[route]}</p></div></div>`;
  byId("study").innerHTML = `<div class="section-head"><div><h2>Study checklist</h2></div><span id="study-count" class="study-count" aria-live="polite"></span></div>
    <div class="resource-list">${studyResources[route].map(key => `<a class="text-link" href="${sourceLink(key)}" target="_blank" rel="noopener">${resources[key][0]}</a>`).join("")}</div>
    <label class="search study-search"><span aria-hidden="true">⌕</span><input id="study-query" type="search" aria-label="Search study topics" placeholder="Search this track…"></label><div id="lessons" class="lesson-grid"></div>`;
  byId("study-query").addEventListener("input",renderLessons);
  renderLessons();
}

function renderLessons() {
  const items = study[route];
  const query = byId("study-query").value.trim().toLowerCase();
  byId("study-count").textContent = `${items.filter(item => completed(item.id,item.done)).length} / ${items.length} complete`;
  byId("lessons").innerHTML = items.filter(item => `${item.title} ${item.group} ${item.description}`.toLowerCase().includes(query)).map(item => `
    <article class="lesson"><header><div><div class="eyebrow">${escapeHtml(item.group)}</div><h3>${escapeHtml(item.title)}</h3></div>
    <input type="checkbox" id="${item.id}" data-lesson="${item.id}" ${!cloudReady || pending.has(item.id) ? "disabled" : ""} aria-label="Complete: ${escapeHtml(item.title)}" ${completed(item.id,item.done)?"checked":""}></header>
    ${item.description ? `<p>${escapeHtml(item.description.replaceAll("**","").replaceAll("`",""))}</p>` : ""}</article>`).join("") || '<p class="empty">No study items match your search.</p>';
}

function renderRoute() {
  const candidate = location.hash.slice(1);
  route = Object.hasOwn(labels,candidate) ? candidate : "overview";
  const isStudy = Object.hasOwn(study,route);
  document.body.dataset.route = route;
  filters.forEach(filter => filter.close());
  for (const link of document.querySelectorAll("nav a")) {
    if (link.hash === "#" + route) link.setAttribute("aria-current","page");
    else link.removeAttribute("aria-current");
  }
  byId("tracker").hidden = route !== "dsa";
  byId("reading").hidden = route !== "overview";
  byId("metrics").hidden = isStudy;
  byId("study").hidden = !isStudy;
  if (isStudy) renderStudy();
  else {
    if (route === "overview") renderOverview();
    else byId("intro").innerHTML = '<div class="hero"><h1>Practice problems</h1><p>Find a problem by topic or difficulty. Check it off when you solve it.</p></div>';
    renderDashboard();
    renderRows();
  }
  document.title = `${route === "overview" ? "Interview notes" : labels[route]} · Nikhil Verma`;
  byId("intro").classList.remove("enter");
  requestAnimationFrame(() => byId("intro").classList.add("enter"));
}

function applyFilters() {
  renderRows();
}

byId("tracker-source").href = sourceLink("tracker");
search.addEventListener("input",applyFilters);
byId("reset-filters").addEventListener("click",() => {
  search.value = "";
  filters.forEach(filter => filter.reset());
  applyFilters();
  search.focus();
});
byId("rows").addEventListener("change",event => {
  if (event.target.dataset.problem) saveProgress(event.target,event.target.dataset.problem);
});
byId("study").addEventListener("change",event => {
  if (event.target.dataset.lesson) saveProgress(event.target,event.target.dataset.lesson);
});
byId("theme").addEventListener("click",() => {
  state.theme = state.theme === "dark" ? "light" : "dark";
  try { localStorage.setItem("prep-theme",state.theme); } catch {}
  theme();
});
window.addEventListener("hashchange",() => {
  if (location.hash === "#main") return;
  renderRoute();
  window.scrollTo(0,0);
});
window.addEventListener("focus",loadCloud);
theme();
renderRoute();
saveMessage("Loading saved progress…");
loadCloud();
