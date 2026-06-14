/**
 * Migrates curriculum from learning-hub-main update_v1.0.7 into LearnHub_updated assets.
 * Run: node scripts/build-from-source.mjs
 */
import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SRC = path.resolve(ROOT, "../learning-hub-main(2)/update_v1.0.7/assets");
const OUT = path.join(ROOT, "assets");

const COURSE_IDS = ["html", "css", "js", "py", "sql", "tech", "networkplus", "security", "pentest"];

const META = {
  html: { name: "HTML", section: "Web Development", emoji: "🌐", color: "#E44D26", difficulty: "Difficulty: Beginner", description: "Build real web pages from document structure through forms, media, and accessibility." },
  css: { name: "CSS", section: "Web Development", emoji: "🎨", color: "#264DE4", difficulty: "Difficulty: Beginner", description: "Style and layout the web — selectors, flexbox, grid, responsive design, and polish." },
  js: { name: "JavaScript", section: "Web Development", emoji: "⚡", color: "#F0DB4F", difficulty: "Difficulty: Intermediate", description: "Interactive front-end programming — DOM, events, async, and small app patterns." },
  py: { name: "Python", section: "Programming", emoji: "🐍", color: "#3776AB", difficulty: "Difficulty: Beginner", description: "Python fundamentals through functions, data structures, files, and practical scripts." },
  sql: { name: "SQL", section: "Databases", emoji: "🗄️", color: "#336791", difficulty: "Difficulty: Beginner", description: "Query and design relational databases — SELECT, JOINs, aggregates, and schema basics." },
  tech: { name: "Tech+", section: "CompTIA Tech+", emoji: "🎓", color: "#0891B2", difficulty: "Difficulty: Certification", description: "CompTIA Tech+ certification prep — objectives, chapter reviews, voucher exams, flashcards, and study plans." },
  networkplus: { name: "Network+", section: "CompTIA Network+", emoji: "🔗", color: "#0C4A6E", difficulty: "Difficulty: Certification", description: "Network+ summer course — OSI, TCP/IP, routing, security, wireless, and N10-009 practice questions." },
  security: { name: "Security+", section: "CompTIA Security+", emoji: "🔒", color: "#7C3AED", difficulty: "Difficulty: Certification", description: "Security+ concepts from CIA triad through enterprise identity, cloud logging, and capstone quizzes." },
  pentest: { name: "PenTest+", section: "CompTIA PenTest+", emoji: "🎯", color: "#DC2626", difficulty: "Difficulty: Certification", description: "Penetration testing methodology, recon, exploitation concepts, and reporting aligned with PenTest+." },
};

function loadWindow(file, keys) {
  const code = fs.readFileSync(path.join(SRC, file), "utf8");
  const ctx = { window: {} };
  vm.runInNewContext(code, ctx);
  return keys.reduce((o, k) => {
    o[k] = ctx.window[k];
    return o;
  }, {});
}

function loadTechMd() {
  const merged = {};
  for (let i = 1; i <= 12; i++) {
    const f = `learn-hub-techplus-md-ch${String(i).padStart(2, "0")}.js`;
    try {
      const { LEARN_HUB_TECHPLUS_MD: m } = loadWindow(f, ["LEARN_HUB_TECHPLUS_MD"]);
      Object.assign(merged, m || {});
    } catch {
      /* optional chapter file */
    }
  }
  return merged;
}

function escJs(str) {
  return JSON.stringify(str);
}

function decodeTitle(t) {
  return String(t || "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"');
}

function adaptHtml(html) {
  if (!html) return "";
  let out = html;
  out = out.replace(/class="callout"/g, 'class="lesson-callout"');
  out = out.replace(/class='callout'/g, "class='lesson-callout'");
  out = out.replace(/<div class="lesson-callout">([\s\S]*?)<\/div>/g, (m, inner) => {
    if (inner.includes("<p>")) return m;
    return `<div class="lesson-callout"><p>${inner.trim()}</p></div>`;
  });
  out = out.replace(/Left column.*?live editors[\s\S]*?Reference.*?notes\.<\/p>/gi, "");
  out = out.replace(/<hr class="teach-hr[^"]*"\s*\/?>/gi, '<hr class="lesson-divider"/>');
  out = out.replace(/<p class="lh-tg-source">[\s\S]*?<\/p>/gi, "");
  out = out.replace(/<aside class="lh-pattern-block lh-pattern-block--(\w+)"[^>]*>/gi, '<div class="lesson-callout lesson-callout--$1">');
  out = out.replace(/<aside class="lh-pattern-block"[^>]*>/gi, '<div class="lesson-callout">');
  out = out.replace(/<h4 class="lh-pattern-title">([\s\S]*?)<\/h4>/gi, "<p><strong>$1</strong></p>");
  out = out.replace(/<\/aside>/gi, "</div>");
  out = out.replace(/class="lh-exam-objectives"/g, 'class="lh-exam-objectives lesson-note"');
  out = out.replace(/class="lesson-prose lh-lesson-body"/g, 'class="lesson-body-inner"');
  out = out.replace(/class="lh-md-meta"/g, 'class="lh-md-meta"');
  return out;
}

function buildStarterFiles(lesson, courseId) {
  const s = lesson.starter;
  if (!s) return null;
  const files = [];
  if (s.html) files.push({ name: "index.html", content: s.html });
  if (s.css) files.push({ name: "styles.css", content: s.css });
  if (s.js) files.push({ name: "script.js", content: s.js });
  if (s.py) files.push({ name: "practice.py", content: s.py });
  if (s.sql) files.push({ name: "practice.sql", content: s.sql });
  if (!files.length) return null;
  return { title: decodeTitle(lesson.title), courseId, files };
}

function vscodeGuide(courseId, lesson) {
  const title = decodeTitle(lesson.title);
  if (courseId === "py") {
    return `
<div class="lesson-callout"><p><strong>Practice in VS Code</strong></p>
<ol>
<li>Install <a href="https://code.visualstudio.com/" target="_blank" rel="noopener">VS Code</a> and the <strong>Python</strong> extension (Microsoft).</li>
<li>Create a folder for this track, e.g. <code>learnhub-python</code>.</li>
<li>File → New File → save as <code>practice.py</code> in that folder.</li>
<li>Paste the starter code below, implement the goal, then run: <strong>Terminal → Run Python File</strong> or <code>python practice.py</code>.</li>
<li>Compare your output to the goal described in the reference section.</li>
</ol></div>`;
  }
  if (courseId === "sql") {
    return `
<div class="lesson-callout"><p><strong>Practice in VS Code</strong></p>
<ol>
<li>Install <a href="https://code.visualstudio.com/" target="_blank" rel="noopener">VS Code</a> and the <strong>SQLite Viewer</strong> or <strong>SQLTools</strong> extension.</li>
<li>Create a folder e.g. <code>learnhub-sql</code>. Open it in VS Code (<strong>File → Open Folder</strong>).</li>
<li>Create <code>practice.sql</code> for your queries. Use SQLTools to connect to a local SQLite DB, or run: <code>sqlite3 practice.db</code> in the integrated terminal.</li>
<li>Execute statements against sample tables from the reference, then verify results match the goal.</li>
</ol></div>`;
  }
  return `
<div class="lesson-callout"><p><strong>Practice in VS Code</strong></p>
<ol>
<li>Install <a href="https://code.visualstudio.com/" target="_blank" rel="noopener">VS Code</a> and the <strong>Live Server</strong> extension (Ritwick Dey).</li>
<li>Create a project folder e.g. <code>learnhub-${courseId}</code>. Open it in VS Code.</li>
<li>Add <code>index.html</code>${courseId !== "html" ? ", <code>styles.css</code>" : ""}${courseId === "js" ? ", and <code>script.js</code>" : ""} — link CSS/JS from HTML as needed.</li>
<li>Paste the starter code below into the right files.</li>
<li>Right-click <code>index.html</code> → <strong>Open with Live Server</strong> to preview. Edit and refresh to test.</li>
<li>When your page matches the goal, mark this step complete.</li>
</ol></div>
<div class="lesson-note"><p><strong>Goal:</strong> ${title.replace(/^Practice:\s*/i, "")}</p></div>`;
}

function starterBlock(lesson, courseId) {
  const s = lesson.starter;
  if (!s) return "";
  let blocks = "";
  if (s.html) blocks += `<h3>Starter HTML</h3><pre><code>${escapeHtml(s.html)}</code></pre>`;
  if (s.css) blocks += `<h3>Starter CSS</h3><pre><code>${escapeHtml(s.css)}</code></pre>`;
  if (s.js) blocks += `<h3>Starter JavaScript</h3><pre><code>${escapeHtml(s.js)}</code></pre>`;
  if (s.py) blocks += `<h3>Starter Python</h3><pre><code>${escapeHtml(s.py)}</code></pre>`;
  if (s.sql) blocks += `<h3>Starter SQL</h3><pre><code>${escapeHtml(s.sql)}</code></pre>`;
  return blocks;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function estimateReadTime(html) {
  const words = String(html).replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  const mins = Math.max(3, Math.round(words / 200));
  return `${mins} min read`;
}

function mergeLessonHtml(lesson, sources) {
  let read = lesson.narrative || "";
  const { deep, techPlus, techMd, secMd, pentestMd, networkMd, studyPatch } = sources;
  if (deep[lesson.id]) read += deep[lesson.id];
  if (techPlus[lesson.id]) read += techPlus[lesson.id];
  if (techMd[lesson.id]) read += techMd[lesson.id];
  if (secMd[lesson.id]) read += secMd[lesson.id];
  if (pentestMd[lesson.id]) read += pentestMd[lesson.id];
  if (networkMd[lesson.id]) read += networkMd[lesson.id];
  if (studyPatch[lesson.id]) read += studyPatch[lesson.id];
  return adaptHtml(read);
}

function normalizeQuestions(questions) {
  if (!Array.isArray(questions)) return [];
  return questions.map((q) => ({
    q: q.q || q.question || "",
    options: q.options || q.choices || [],
    correct: typeof q.correct === "number" ? q.correct : 0,
    explanation: q.explanation || q.feedback || "",
  }));
}

function lessonToItem(lesson, courseId, sources, contentMap, startersMap) {
  const title = decodeTitle(lesson.title);
  if (lesson.kind === "quiz") {
    const item = {
      type: "quiz",
      id: lesson.id,
      title,
      description: lesson.description || `Answer all questions for ${title}.`,
      questions: normalizeQuestions(lesson.questions),
    };
    if (lesson.voucherPlan) item.voucherPlan = lesson.voucherPlan;
    return item;
  }

  let html = mergeLessonHtml(lesson, sources);
  if (lesson.kind === "practice" || lesson.kind === "challenge") {
    html = vscodeGuide(courseId, lesson) + starterBlock(lesson, courseId) + html;
    const starter = buildStarterFiles(lesson, courseId);
    if (starter) {
      startersMap[lesson.id] = starter;
    }
  }
  if (!html.trim()) html = `<p>Content for this lesson is being loaded. Lesson ID: <code>${lesson.id}</code></p>`;

  contentMap[lesson.id] = html;
  const item = {
    type: "lesson",
    id: lesson.id,
    title,
    readTime: estimateReadTime(html),
  };
  if (startersMap[lesson.id]) item.hasStarter = true;
  return item;
}

function buildVoucherStudyPlanHtml(planKey, voucherTitle) {
  const plans = {
    voucher01: "LEARN_HUB_VOUCHER01_PLAN",
    voucher02: "LEARN_HUB_VOUCHER02_PLAN",
    voucher03: "LEARN_HUB_VOUCHER03_PLAN",
  };
  return `
<h2>Study plan — ${voucherTitle}</h2>
<p>Use this plan before and after the voucher exam. Review cram points by domain, then take the exam linked below in the sidebar.</p>
<div class="lesson-callout"><p><strong>Cram core</strong></p><ul id="voucher-cram-core-${planKey}"></ul></div>
<div class="lesson-note"><p><strong>Timed cram options</strong> (pre-exam, 10 min, 20 min, 1 hour) are listed below after you open the matching voucher quiz.</p></div>
<p>Open the voucher exam next, check your answers, then revisit weak domains using the chapter lessons in this course.</p>`;
}

function injectTechExtras(lessons, gimkit, contentMap, sources) {
  const out = [...lessons];
  const seen = new Set(out.map((l) => l.id));

  const studyItems = [
    {
      unit: "Study plans",
      id: "tech-study-weighted-cram",
      kind: "learn",
      title: "Tech+ weighted topic cram (exam emphasis)",
      _injectHtml: sources.weightedCram,
    },
    {
      unit: "Study plans",
      id: "tech-study-full-guide",
      kind: "learn",
      title: "Complete FC0-U71 Study Guide",
      _injectHtml:
        '<h2>Complete FC0-U71 Study Guide</h2><p>Long-form review guide with topic sidebar.</p><p><a href="docs/guides/Study.html" target="_blank" rel="noopener">Open full study guide →</a></p><p>Use this for depth, then return to quizzes and flashcards for active recall.</p>',
    },
    {
      unit: "Study plans",
      id: "tech-study-updated-full-guide",
      kind: "learn",
      title: "Updated full study guide",
      _injectHtml:
        '<h2>Updated full study guide</h2><p>Multi-topic study guide with sidebar navigation.</p><p><a href="docs/guides/Full_Study_Guide.html" target="_blank" rel="noopener">Open updated study guide →</a></p>',
    },
    {
      unit: "Study plans",
      id: "tech-study-posttest-review",
      kind: "learn",
      title: "Logan's post test review",
      _injectHtml:
        '<h2>Post-test review</h2><p>Focused review after voucher exams.</p><p><a href="docs/guides/techplus_study_guide.html" target="_blank" rel="noopener">Open post-test review guide →</a></p>',
    },
  ];

  for (const si of studyItems) {
    if (!seen.has(si.id)) {
      contentMap[si.id] = adaptHtml(si._injectHtml);
      out.push({ unit: si.unit, id: si.id, kind: "learn", title: si.title, narrative: "" });
      seen.add(si.id);
    }
  }

  const voucherSets = [];
  const otherGimkit = [];
  for (let i = 0; i < gimkit.sets.length; i++) {
    const set = gimkit.sets[i];
    if (!set?.questions?.length) continue;
    if (/^GimKit ITF Bits/i.test(set.title)) continue;
    const id = "tech-gimkit-" + String(i + 1).padStart(2, "0");
    if (/^Tech\+ Voucher Test/i.test(set.title)) {
      const vn = set.title.match(/(\d+)/);
      const planKey = vn ? `voucher${String(vn[1]).padStart(2, "0")}` : null;
      voucherSets.push({ set, id, planKey });
    } else {
      otherGimkit.push({ set, id });
    }
  }

  const examUnit = "Voucher exams & flashcards";
  if (!seen.has("tech-gimkit-flashcards")) {
    out.push({
      unit: examUnit,
      id: "tech-gimkit-flashcards",
      kind: "flashcards",
      title: "Tech+ Flashcards",
      narrative: "",
    });
    seen.add("tech-gimkit-flashcards");
  }

  for (const v of voucherSets) {
    const planSlot = v.planKey?.replace("voucher", "") || "";
    const studyId = `tech-voucher-study-${planSlot}`;
    if (!seen.has(studyId)) {
      contentMap[studyId] = buildVoucherStudyPlanHtml(v.planKey, v.set.title);
      out.push({
        unit: examUnit,
        id: studyId,
        kind: "study-plan",
        title: `Study plan — ${v.set.title}`,
        voucherPlan: v.planKey,
        narrative: "",
      });
      seen.add(studyId);
    }
    if (!seen.has(v.id)) {
      out.push({
        unit: examUnit,
        id: v.id,
        kind: "quiz",
        title: v.set.title,
        narrative: "",
        questions: v.set.questions,
        voucherPlan: v.planKey,
      });
      seen.add(v.id);
    }
  }

  const qpIdx = out.findIndex((l) => l.unit && l.unit.includes("Quick practice"));
  let insertAt = qpIdx >= 0 ? out.findLastIndex((l) => l.unit && l.unit.includes("Quick practice")) + 1 : out.length;

  for (const g of otherGimkit) {
    if (seen.has(g.id)) continue;
    const row = {
      unit: qpIdx >= 0 ? out[qpIdx].unit : "Practice question sets",
      id: g.id,
      kind: "quiz",
      title: g.set.title,
      narrative: "",
      questions: g.set.questions,
    };
    out.splice(insertAt++, 0, row);
    seen.add(g.id);
  }

  return out;
}

function injectNetworkQuizzes(lessons, networkQuizzes) {
  const out = [...lessons];
  const units = [...new Set(out.map((l) => l.unit))];
  const sets = networkQuizzes.sets || [];
  let si = 0;
  for (let ui = 0; ui < units.length && si < sets.length; ui++) {
    const unit = units[ui];
    const perUnit = ui < units.length - 1 ? 2 : sets.length - si;
    for (let n = 0; n < perUnit && si < sets.length; n++, si++) {
      const set = sets[si];
      const id = "network-n10-" + String(si + 1).padStart(2, "0");
      if (out.some((l) => l.id === id)) continue;
      out.push({
        unit,
        id,
        kind: "quiz",
        title: set.title,
        narrative: "",
        questions: set.questions,
      });
    }
  }
  return out;
}

function groupUnits(lessons, courseId, sources, contentMap, startersMap) {
  const unitOrder = [];
  const unitMap = new Map();
  for (const lesson of lessons) {
    if (lesson.kind === "flashcards") {
      const item = { type: "flashcards", id: lesson.id, title: decodeTitle(lesson.title) };
      const u = lesson.unit || "Flashcards";
      if (!unitMap.has(u)) {
        unitMap.set(u, []);
        unitOrder.push(u);
      }
      unitMap.get(u).push(item);
      continue;
    }
    if (lesson.kind === "study-plan") {
      contentMap[lesson.id] = contentMap[lesson.id] || buildVoucherStudyPlanHtml(lesson.voucherPlan, lesson.title);
      const item = {
        type: "study-plan",
        id: lesson.id,
        title: decodeTitle(lesson.title),
        voucherPlan: lesson.voucherPlan,
      };
      const u = lesson.unit || "Study plans";
      if (!unitMap.has(u)) {
        unitMap.set(u, []);
        unitOrder.push(u);
      }
      unitMap.get(u).push(item);
      continue;
    }
    const item = lessonToItem(lesson, courseId, sources, contentMap, startersMap);
    const u = lesson.unit || "General";
    if (!unitMap.has(u)) {
      unitMap.set(u, []);
      unitOrder.push(u);
    }
    unitMap.get(u).push(item);
  }
  return unitOrder.map((title) => ({ title, items: unitMap.get(title) }));
}

function writeJs(outPath, varName, data) {
  fs.writeFileSync(outPath, `window.${varName} = ${JSON.stringify(data)};\n`, "utf8");
}

function writeJsAssign(outPath, varName, obj) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, `window.${varName} = ${JSON.stringify(obj)};\n`, "utf8");
}

console.log("Loading source assets from", SRC);
const { LEARN_HUB_COURSES: courses } = loadWindow("learn-hub-courses.js", ["LEARN_HUB_COURSES"]);
const { LEARN_HUB_DEEP: deep } = loadWindow("learn-hub-deep.js", ["LEARN_HUB_DEEP"]);
const { LEARN_HUB_TECHPLUS: techPlus } = loadWindow("learn-hub-techplus.js", ["LEARN_HUB_TECHPLUS"]);
const { LEARN_HUB_NETWORK_MD: networkMd } = loadWindow("learn-hub-network-md.js", ["LEARN_HUB_NETWORK_MD"]);
const { LEARN_HUB_SECURITY_MD: securityMd } = loadWindow("learn-hub-security-md.js", ["LEARN_HUB_SECURITY_MD"]);
const { LEARN_HUB_PENTEST_MD: pentestMd } = loadWindow("learn-hub-pentest-md.js", ["LEARN_HUB_PENTEST_MD"]);
const { LEARN_HUB_GIMKIT_QUIZZES: gimkit } = loadWindow("learn-hub-gimkit-questions.js", ["LEARN_HUB_GIMKIT_QUIZZES"]);
const { LEARN_HUB_NETWORK_QUIZZES: networkQuizzes } = loadWindow("learn-hub-network-questions.js", ["LEARN_HUB_NETWORK_QUIZZES"]);
const { LEARN_HUB_TECHPLUS_FLASHCARDS: flashcards } = loadWindow("learn-hub-techplus-flashcards-data.js", ["LEARN_HUB_TECHPLUS_FLASHCARDS"]);
const { LEARN_HUB_VOUCHER01_PLAN: v1 } = loadWindow("learn-hub-voucher01-plan.js", ["LEARN_HUB_VOUCHER01_PLAN"]);
const { LEARN_HUB_VOUCHER02_PLAN: v2 } = loadWindow("learn-hub-voucher02-plan.js", ["LEARN_HUB_VOUCHER02_PLAN"]);
const { LEARN_HUB_VOUCHER03_PLAN: v3 } = loadWindow("learn-hub-voucher03-plan.js", ["LEARN_HUB_VOUCHER03_PLAN"]);
const { LEARN_HUB_TECHPLUS_STUDY_PATCH: studyPatch } = loadWindow("learn-hub-techplus-study-patch.js", ["LEARN_HUB_TECHPLUS_STUDY_PATCH"]);
const techMd = loadTechMd();

let weightedCram = "";
try {
  const cramCode = fs.readFileSync(path.join(SRC, "learn-hub-tech-weighted-cram.js"), "utf8");
  const m = cramCode.match(/window\.LEARN_HUB_TECH_WEIGHTED_CRAM_HTML\s*=\s*`([\s\S]*?)`\s*;/);
  if (m) weightedCram = adaptHtml(m[1]);
} catch {
  weightedCram = "<p>Weighted cram content unavailable.</p>";
}

const sources = { deep, techPlus, techMd, secMd: securityMd, pentestMd, networkMd, studyPatch, weightedCram };
const contentMap = {};
const startersMap = {};
const builtCourses = [];

for (const courseId of COURSE_IDS) {
  const src = courses.find((c) => c.id === courseId);
  if (!src) {
    console.warn("Missing course", courseId);
    continue;
  }
  let lessons = [...(src.lessons || [])];
  if (courseId === "tech") lessons = injectTechExtras(lessons, gimkit, contentMap, sources);
  if (courseId === "networkplus") lessons = injectNetworkQuizzes(lessons, networkQuizzes);

  const meta = META[courseId];
  builtCourses.push({
    id: courseId,
    name: meta.name,
    section: meta.section,
    difficulty: meta.difficulty,
    description: meta.description,
    emoji: meta.emoji,
    color: meta.color,
    units: groupUnits(lessons, courseId, sources, contentMap, startersMap),
  });
  const count = builtCourses[builtCourses.length - 1].units.reduce((a, u) => a + u.items.length, 0);
  console.log(`  ${courseId}: ${count} items, ${builtCourses[builtCourses.length - 1].units.length} units`);
}

fs.mkdirSync(OUT, { recursive: true });
writeJsAssign(path.join(OUT, "courses.js"), "COURSES", builtCourses);
writeJsAssign(path.join(OUT, "content.js"), "LEARN_HUB_CONTENT", contentMap);
writeJsAssign(path.join(OUT, "flashcards.js"), "LEARN_HUB_FLASHCARDS", flashcards);
writeJsAssign(path.join(OUT, "voucher-plans.js"), "LEARN_HUB_VOUCHER_PLANS", {
  voucher01: v1,
  voucher02: v2,
  voucher03: v3,
});
writeJsAssign(path.join(OUT, "starters.js"), "LEARN_HUB_STARTERS", startersMap);

console.log("\nWrote:", OUT);
console.log("  courses.js —", builtCourses.length, "courses");
console.log("  content.js —", Object.keys(contentMap).length, "lesson bodies");
console.log("  flashcards.js —", flashcards.length, "cards");
console.log("  voucher-plans.js — 3 plans");
console.log("  starters.js —", Object.keys(startersMap).length, "practice packs");
