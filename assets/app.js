/* LearnHub app — assets/app.js
   Rebuild content: node scripts/build-from-source.mjs */

const COURSES = window.COURSES || [];
const CONTENT = window.LEARN_HUB_CONTENT || {};
const FLASHCARDS = window.LEARN_HUB_FLASHCARDS || [];
const VOUCHER_PLANS = window.LEARN_HUB_VOUCHER_PLANS || {};
const STARTERS = window.LEARN_HUB_STARTERS || {};

// ── Progress store ─────────────────────────
const PROGRESS_KEY = 'lh_progress';

function loadProgress() {
  let p = {};
  try { p = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}'); } catch { p = {}; }
  const legacy = JSON.parse(localStorage.getItem('ef_done') || '{}');
  p.completed = { ...legacy, ...(p.completed || {}) };
  p.quizScores = p.quizScores || {};
  p.voucherHistory = p.voucherHistory || {};
  p.lastItem = p.lastItem || null;
  p.unitOpen = p.unitOpen || {};
  return p;
}

let progress = loadProgress();
let completedItems = progress.completed;

function saveProgress() {
  progress.completed = completedItems;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  localStorage.setItem('ef_done', JSON.stringify(completedItems));
}

function saveCompleted() { saveProgress(); }

function recordQuizScore(quizId, score, total, voucherPlan) {
  const entry = { score, total, pct: total ? Math.round(score / total * 100) : 0, date: new Date().toISOString() };
  if (!progress.quizScores[quizId]) progress.quizScores[quizId] = [];
  progress.quizScores[quizId].unshift(entry);
  progress.quizScores[quizId] = progress.quizScores[quizId].slice(0, 10);
  if (voucherPlan) {
    if (!progress.voucherHistory[voucherPlan]) progress.voucherHistory[voucherPlan] = [];
    progress.voucherHistory[voucherPlan].unshift({ quizId, ...entry });
    progress.voucherHistory[voucherPlan] = progress.voucherHistory[voucherPlan].slice(0, 5);
  }
  saveProgress();
}

function getItemContent(item) {
  if (item.content) return item.content;
  return CONTENT[item.id] || '<p>No content available for this item.</p>';
}

function navIcon(item) {
  if (item.type === 'quiz') return '❓';
  if (item.type === 'flashcards') return '🃏';
  if (item.type === 'study-plan') return '📋';
  return '📄';
}

function normalizeQuizQuestions(questions) {
  return (questions || []).map(q => ({
    q: q.q || '',
    options: q.options || q.choices || [],
    correct: typeof q.correct === 'number' ? q.correct : 0,
    explanation: q.explanation || ''
  }));
}

function findItem(id) {
  if (!currentCourse) return null;
  for (const unit of currentCourse.units) {
    const item = unit.items.find(i => i.id === id);
    if (item) return item;
  }
  return null;
}

function iterCourseItems(course) {
  const items = [];
  for (const unit of course.units) for (const item of unit.items) items.push(item);
  return items;
}

function getFirstIncomplete(course) {
  for (const item of iterCourseItems(course)) {
    if (!completedItems[item.id]) return item;
  }
  return null;
}

function getNextIncomplete(afterId) {
  if (!currentCourse) return null;
  let found = false;
  for (const item of iterCourseItems(currentCourse)) {
    if (found && !completedItems[item.id]) return item;
    if (item.id === afterId) found = true;
  }
  return null;
}

function getPrevItem(beforeId) {
  if (!currentCourse) return null;
  let prev = null;
  for (const item of iterCourseItems(currentCourse)) {
    if (item.id === beforeId) return prev;
    prev = item;
  }
  return null;
}

function getNextItem(afterId) {
  if (!currentCourse) return null;
  let found = false;
  for (const item of iterCourseItems(currentCourse)) {
    if (found) return item;
    if (item.id === afterId) found = true;
  }
  return null;
}

function getContinueItem(course) {
  if (progress.lastItem?.courseId === course.id) {
    const last = findItem(progress.lastItem.itemId);
    if (last) return last;
  }
  return getFirstIncomplete(course) || iterCourseItems(course)[0] || null;
}

function getOverallStats() {
  let total = 0, done = 0, courses = COURSES.length;
  for (const c of COURSES) {
    for (const u of c.units) {
      total += u.items.length;
      done += u.items.filter(i => completedItems[i.id]).length;
    }
  }
  return { total, done, courses, pct: total ? Math.round(done / total * 100) : 0 };
}

function courseProgress(c) {
  const total = c.units.reduce((a, u) => a + u.items.length, 0);
  const done = c.units.reduce((a, u) => a + u.items.filter(i => completedItems[i.id]).length, 0);
  return { total, done, pct: total ? Math.round(done / total * 100) : 0 };
}

function quizScoreLabel(itemId) {
  const hist = progress.quizScores[itemId];
  if (!hist?.length) return '';
  const last = hist[0];
  return `${last.pct}%`;
}

function filterLessonNav() {
  const input = document.getElementById('lesson-search');
  if (!input) return;
  const q = input.value.trim().toLowerCase();
  document.querySelectorAll('#class-nav .nav-unit').forEach(unit => {
    let visible = 0;
    unit.querySelectorAll('.nav-item').forEach(btn => {
      const text = (btn.querySelector('.nav-label')?.textContent || '').toLowerCase();
      const unitTitle = (unit.querySelector('.nav-unit-label')?.textContent || '').toLowerCase();
      const match = !q || text.includes(q) || unitTitle.includes(q);
      btn.classList.toggle('hidden', !match);
      if (match) visible++;
    });
    unit.classList.toggle('nav-unit--empty', visible === 0);
    if (q && visible > 0) unit.open = true;
  });
}

// ── STATE ──────────────────────────────────
let currentCourse = null;
let currentItemId = null;
let quizState = {};
let flashState = null;

// ── INIT ───────────────────────────────────
function init() {
  initTheme();
  initKeyboard();
  if (!COURSES.length) {
    document.getElementById('v-home-inner').innerHTML =
      '<p style="padding:40px;color:var(--ink2);">Course data did not load. Run <code>node scripts/build-from-source.mjs</code>, then serve this folder over HTTP (not file://).</p>';
    return;
  }
  renderHomeClassList();
  renderHomeView();
  setupScrollProgress();
  updateMobileNav();
}

function initTheme() {
  const saved = localStorage.getItem('lh_theme');
  if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.addEventListener('click', toggleTheme);
}

function toggleTheme() {
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (dark) {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('lh_theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('lh_theme', 'dark');
  }
}

function initKeyboard() {
  document.addEventListener('keydown', e => {
    if (e.target.matches('input, textarea, select') && e.key !== 'Escape') return;
    if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      const search = document.getElementById('lesson-search');
      if (search && !document.getElementById('class-sidebar').classList.contains('hidden')) {
        search.focus();
      }
      return;
    }
    if (e.key === 'Escape') {
      if (document.body.classList.contains('sidebar-open')) {
        closeMobileSidebar();
        return;
      }
      if (currentCourse) goHome();
      return;
    }
    if (!currentCourse || !currentItemId) return;
    if (quizState.quiz && !quizState.finished) {
      if (e.key === 'ArrowRight') { e.preventDefault(); quizNav(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); quizNav(-1); }
      return;
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = getNextItem(currentItemId);
      if (next) openItem(next.id);
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = getPrevItem(currentItemId);
      if (prev) openItem(prev.id);
    }
  });
}

function setupScrollProgress() {
  document.getElementById('main').addEventListener('scroll', updateProgress);
}

// ── HOME ───────────────────────────────────
function renderHomeClassList() {
  const list = document.getElementById('home-class-list');
  list.innerHTML = COURSES.map(c => {
    const { pct } = courseProgress(c);
    return `
    <button class="home-class-btn" onclick="openCourse('${c.id}')" id="hcb-${c.id}">
      <div class="hcb-icon" style="background:${c.color}18;border-color:${c.color}33;">${c.emoji}</div>
      <div class="hcb-info">
        <div class="hcb-name">${c.name}</div>
        <div class="hcb-meta">${c.section}</div>
      </div>
      <div class="hcb-progress" style="--pct:${pct}%" title="${pct}% complete"><span style="position:relative;z-index:1">${pct}%</span></div>
    </button>`;
  }).join('');
}

function renderVoucherSummary() {
  const plans = Object.keys(progress.voucherHistory || {});
  if (!plans.length) return '';
  let html = '<div class="home-voucher-summary"><p class="home-section-title">Recent voucher attempts</p><div class="voucher-history-grid">';
  for (const plan of plans) {
    const hist = progress.voucherHistory[plan];
    const last = hist[0];
    const weak = last.pct < 70;
    html += `<div class="voucher-history-card ${weak ? 'weak' : ''}">
      <strong>${plan.replace('voucher', 'Voucher ')}</strong>
      <span>${last.pct}% (${last.score}/${last.total})</span>
      ${weak ? '<em>Review weak domains in cram sections</em>' : ''}
    </div>`;
  }
  return html + '</div></div>';
}

function renderHomeView() {
  const el = document.getElementById('v-home-inner');
  const stats = getOverallStats();
  const resume = progress.lastItem && COURSES.find(c => c.id === progress.lastItem.courseId);
  let resumeBlock = '';
  if (resume) {
    const item = resume.units.flatMap(u => u.items).find(i => i.id === progress.lastItem.itemId);
    if (item) {
      resumeBlock = `<div class="home-resume-card" onclick="openCourse('${resume.id}');setTimeout(()=>openItem('${item.id}'),50)">
        <span class="home-resume-label">Continue where you left off</span>
        <strong>${resume.emoji} ${item.title}</strong>
        <span class="home-resume-meta">${resume.name}</span>
      </div>`;
    }
  }
  el.innerHTML = `
    <div class="home-hero">
      <h1>Welcome back.</h1>
      <p>Pick up where you left off, or dive into something new.</p>
      ${resumeBlock}
      <div class="home-stats">
        <div class="home-stat">
          <div class="home-stat-num">${stats.courses}</div>
          <div class="home-stat-label">Courses available</div>
        </div>
        <div class="home-stat">
          <div class="home-stat-num">${stats.done}</div>
          <div class="home-stat-label">Items completed</div>
        </div>
        <div class="home-stat">
          <div class="home-stat-num">${stats.pct}%</div>
          <div class="home-stat-label">Overall progress</div>
        </div>
      </div>
    </div>
    ${renderVoucherSummary()}
    <p class="home-section-title">All courses</p>
    <div class="class-cards-grid">
      ${COURSES.map(c => {
        const totalItems = c.units.reduce((a, u) => a + u.items.length, 0);
        const doneItems = c.units.reduce((a, u) => a + u.items.filter(i => completedItems[i.id]).length, 0);
        const pct = totalItems ? Math.round(doneItems / totalItems * 100) : 0;
        return `
        <div class="class-card" onclick="openCourse('${c.id}')">
          <div class="cc-banner" style="background:linear-gradient(135deg,${c.color},${lighten(c.color, 18)})">
            <div class="cc-banner-emoji">${c.emoji}</div>
            <div class="cc-banner-text"><h3>${c.name}</h3><p>${c.section}</p></div>
          </div>
          <div class="cc-body">
            <p class="cc-desc">${c.description}</p>
            <div class="cc-stats">
              <span class="cc-stat">📚 ${totalItems} items</span>
              <span class="cc-stat">🧩 ${c.difficulty}</span>
            </div>
            <div class="cc-progress-mini">
              <div class="cc-prog-label"><span>Progress</span><span>${doneItems}/${totalItems} complete</span></div>
              <div class="cc-prog-bar"><div class="cc-prog-fill" style="width:${pct}%"></div></div>
            </div>
            <button class="cc-open">Open Class →</button>
          </div>
        </div>`;
      }).join('')}
    </div>`;
}

// ── COURSE OPEN ────────────────────────────
function openCourse(id) {
  currentCourse = COURSES.find(c => c.id === id);
  if (!currentCourse) return;
  closeMobileSidebar();

  document.getElementById('topbar-context').innerHTML = `<span>${currentCourse.name}</span>`;
  document.getElementById('back-btn').classList.remove('hidden');

  document.getElementById('home-sidebar').classList.add('hidden');
  const cs = document.getElementById('class-sidebar');
  cs.classList.remove('hidden');
  cs.style.display = 'flex';

  renderSidebarHead();
  renderCourseNav();

  const searchEl = document.getElementById('lesson-search');
  if (searchEl) { searchEl.value = ''; searchEl.oninput = filterLessonNav; }

  const target = getContinueItem(currentCourse);
  if (target) openItem(target.id);
  else showView('v-lesson');

  updateTopbarNext();
  updateMobileNav();
}

function renderSidebarHead() {
  const totalItems = currentCourse.units.reduce((a, u) => a + u.items.length, 0);
  const doneItems = currentCourse.units.reduce((a, u) => a + u.items.filter(i => completedItems[i.id]).length, 0);
  const pct = totalItems ? Math.round(doneItems / totalItems * 100) : 0;
  document.getElementById('class-sidebar-head').innerHTML = `
    <div class="sidebar-head-top">
      <div class="class-emoji">${currentCourse.emoji}</div>
      <div class="sidebar-head-text">
        <h2>${currentCourse.name}</h2>
        <p>${currentCourse.difficulty}</p>
      </div>
    </div>
    <div class="sidebar-progress-wrap">
      <div class="sidebar-progress-label"><span>Progress</span><span>${pct}%</span></div>
      <div class="sidebar-progress-bar"><div class="sidebar-progress-fill" style="width:${pct}%"></div></div>
    </div>`;
}

function renderContinuePin() {
  const cont = getContinueItem(currentCourse);
  if (!cont) return '';
  const done = !!completedItems[cont.id];
  return `<div class="continue-pin">
    <p class="continue-pin-label">${done ? 'Last visited' : 'Continue here'}</p>
    <button type="button" class="continue-pin-btn" onclick="openItem('${cont.id}')">
      <span>${navIcon(cont)}</span>
      <span class="continue-pin-title">${cont.title}</span>
    </button>
  </div>`;
}

function refreshContinuePin() {
  const html = renderContinuePin();
  const existing = document.querySelector('.continue-pin');
  if (existing) {
    if (html) existing.outerHTML = html;
    else existing.remove();
  } else if (html) {
    document.getElementById('class-nav')?.insertAdjacentHTML('afterbegin', html);
  }
}

function isUnitOpen(courseId, ui) {
  const key = courseId + ':' + ui;
  const saved = progress.unitOpen[key];
  if (saved === false) return false;
  return saved !== false;
}

function renderCourseNav() {
  const nav = document.getElementById('class-nav');
  const courseId = currentCourse.id;
  nav.innerHTML = renderContinuePin() + currentCourse.units.map((unit, ui) => {
    const open = isUnitOpen(courseId, ui);
    const itemsHtml = unit.items.map(item => {
      const done = !!completedItems[item.id];
      const score = item.type === 'quiz' ? quizScoreLabel(item.id) : '';
      const icon = navIcon(item);
      return `
        <button class="nav-item ${done ? 'completed' : ''}" id="nav-${item.id}" onclick="openItem('${item.id}')">
          <span class="nav-icon">${icon}</span>
          <span class="nav-label">${item.title}</span>
          <span class="nav-check">${score || (done ? '✓' : '○')}</span>
        </button>`;
    }).join('');
    return `
      <details class="nav-unit" data-ui="${ui}" ${open ? 'open' : ''}>
        <summary class="nav-unit-label">${unit.title}</summary>
        <div class="nav-unit-items">${itemsHtml}</div>
      </details>`;
  }).join('');

  nav.querySelectorAll('.nav-unit').forEach(el => {
    el.addEventListener('toggle', () => {
      const ui = el.dataset.ui;
      progress.unitOpen[courseId + ':' + ui] = el.open;
      saveProgress();
    });
  });
}

function goHome() {
  currentCourse = null;
  currentItemId = null;
  closeMobileSidebar();
  document.getElementById('topbar-context').textContent = 'Select a class to get started';
  document.getElementById('back-btn').classList.add('hidden');
  document.getElementById('topbar-next')?.classList.add('hidden');
  document.getElementById('home-sidebar').classList.remove('hidden');
  document.getElementById('class-sidebar').classList.add('hidden');
  renderHomeView();
  showView('v-home');
  stopProgress();
  updateMobileNav();
}

function updateTopbarNext() {
  let btn = document.getElementById('topbar-next');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'topbar-next';
    btn.className = 'back-btn topbar-next-btn';
    btn.type = 'button';
    document.getElementById('topbar').appendChild(btn);
  }
  if (!currentCourse) { btn.classList.add('hidden'); return; }
  const next = currentItemId ? getNextIncomplete(currentItemId) : getFirstIncomplete(currentCourse);
  if (!next) { btn.classList.add('hidden'); return; }
  btn.classList.remove('hidden');
  const short = next.title.length > 28 ? next.title.slice(0, 26) + '…' : next.title;
  btn.textContent = `Next: ${short} →`;
  btn.onclick = () => openItem(next.id);
}

// ── MOBILE NAV ─────────────────────────────
function toggleMobileSidebar() {
  document.body.classList.toggle('sidebar-open');
}

function closeMobileSidebar() {
  document.body.classList.remove('sidebar-open');
}

function updateMobileNav() {
  const bar = document.getElementById('mobile-nav');
  if (!bar) return;
  const onCourse = !!currentCourse;
  bar.querySelector('[data-action="lessons"]')?.classList.toggle('hidden', !onCourse);
  bar.querySelector('[data-action="next"]')?.classList.toggle('hidden', !onCourse || !getNextIncomplete(currentItemId));
}

// ── ITEM OPEN ──────────────────────────────
function openItem(id) {
  const item = findItem(id);
  if (!item) return;

  currentItemId = id;
  progress.lastItem = { courseId: currentCourse.id, itemId: id };
  saveProgress();

  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const navEl = document.getElementById('nav-' + id);
  if (navEl) {
    navEl.classList.add('active');
    navEl.closest('.nav-unit')?.setAttribute('open', '');
  }

  closeMobileSidebar();
  updateTopbarNext();
  updateMobileNav();

  if (item.type === 'lesson') openLesson(item);
  else if (item.type === 'quiz') openQuiz(item);
  else if (item.type === 'flashcards') openFlashcards(item);
  else if (item.type === 'study-plan') openStudyPlan(item);
}

// ── STARTER DOWNLOADS ──────────────────────
function downloadBlob(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

function downloadStarter(itemId) {
  const pack = STARTERS[itemId];
  if (!pack?.files?.length) { toast('No starter files for this lesson'); return; }
  if (pack.files.length === 1) {
    downloadBlob(pack.files[0].name, pack.files[0].content);
    toast('Downloaded ' + pack.files[0].name);
    return;
  }
  pack.files.forEach((f, i) => {
    setTimeout(() => downloadBlob(f.name, f.content), i * 350);
  });
  toast(`Downloading ${pack.files.length} starter files…`);
}

function starterDownloadBtn(itemId) {
  if (!STARTERS[itemId]?.files?.length) return '';
  return `<button type="button" class="starter-dl-btn" onclick="downloadStarter('${itemId}')">⬇ Download starter files</button>`;
}

// ── LESSON ─────────────────────────────────
function openLesson(lesson) {
  showView('v-lesson');
  const done = !!completedItems[lesson.id];
  const body = getItemContent(lesson);
  document.getElementById('lesson-body-container').innerHTML = `
    <div class="lesson-eyebrow">${currentCourse.name}</div>
    <h1 class="lesson-title">${lesson.title}</h1>
    <div class="lesson-meta">
      <span class="lesson-meta-tag">📖 ${lesson.readTime || 'Lesson'}</span>
      <span class="lesson-meta-tag">🧩 ${currentCourse.difficulty}</span>
      ${done ? '<span class="lesson-meta-tag done">✓ Completed</span>' : ''}
    </div>
    ${starterDownloadBtn(lesson.id)}
    <div class="lesson-body">${body}</div>
    <hr class="lesson-divider"/>
    <button class="lesson-complete-btn ${done ? 'done' : ''}" id="complete-btn-${lesson.id}" onclick="markComplete('${lesson.id}')">
      ${done ? '✓ Lesson Complete — Revisit anytime' : 'Mark as Complete →'}
    </button>`;
  document.getElementById('main').scrollTop = 0;
  startProgress('main');
}

function buildVoucherCramHtml(planKey) {
  const P = VOUCHER_PLANS[planKey];
  if (!P) return '';
  let html = '';
  if (Array.isArray(P.cramCore) && P.cramCore.length) {
    html += '<h2>Cram core</h2><ul>' + P.cramCore.map(p => `<li>${p}</li>`).join('') + '</ul>';
  }
  if (P.cramTimed && typeof P.cramTimed === 'object') {
    html += '<h2>Timed cram sheets</h2>';
    for (const key of Object.keys(P.cramTimed)) {
      const block = P.cramTimed[key];
      if (!block?.points) continue;
      html += `<h3>${block.label || key}</h3><ul>` + block.points.map(p => `<li>${p}</li>`).join('') + '</ul>';
    }
  }
  if (P.cramByDomain && typeof P.cramByDomain === 'object') {
    html += '<h2>Cram by objective domain</h2>';
    for (const d of Object.keys(P.cramByDomain).sort((a, b) => Number(a) - Number(b))) {
      const pts = P.cramByDomain[d];
      if (!Array.isArray(pts) || !pts.length) continue;
      html += `<h3>Domain ${d}</h3><ul>` + pts.map(p => `<li>${p}</li>`).join('') + '</ul>';
    }
  }
  return html;
}

function openStudyPlan(item) {
  showView('v-lesson');
  const done = !!completedItems[item.id];
  let body = getItemContent(item);
  if (item.voucherPlan) body += buildVoucherCramHtml(item.voucherPlan);
  document.getElementById('lesson-body-container').innerHTML = `
    <div class="lesson-eyebrow">${currentCourse.name} · Study plan</div>
    <h1 class="lesson-title">${item.title}</h1>
    <div class="lesson-meta">
      <span class="lesson-meta-tag">📋 Study plan</span>
      ${done ? '<span class="lesson-meta-tag done">✓ Reviewed</span>' : ''}
    </div>
    <div class="lesson-body">${body}</div>
    <hr class="lesson-divider"/>
    <button class="lesson-complete-btn ${done ? 'done' : ''}" id="complete-btn-${item.id}" onclick="markComplete('${item.id}')">
      ${done ? '✓ Reviewed — Revisit anytime' : 'Mark as Reviewed →'}
    </button>`;
  document.getElementById('main').scrollTop = 0;
  startProgress('main');
}

function markComplete(id) {
  completedItems[id] = true;
  saveProgress();
  const btn = document.getElementById('complete-btn-' + id);
  if (btn) { btn.textContent = '✓ Lesson Complete — Revisit anytime'; btn.classList.add('done'); }
  const navEl = document.getElementById('nav-' + id);
  if (navEl) { navEl.classList.add('completed'); navEl.querySelector('.nav-check').textContent = '✓'; }
  refreshSidebarProgress();
  refreshContinuePin();
  updateTopbarNext();
  toast('Lesson complete! 🎉');
  setTimeout(() => advanceToNext(id), 800);
}

// ── QUIZ (stepped) ─────────────────────────
function openQuiz(quiz) {
  showView('v-quiz');
  const questions = normalizeQuizQuestions(quiz.questions);
  quizState = {
    quiz: { ...quiz, questions },
    answers: {},
    flagged: {},
    current: 0,
    submitted: false,
    score: 0,
    finished: false
  };
  renderQuiz();
  document.getElementById('main').scrollTop = 0;
  stopProgress();
}

function renderQuiz() {
  const { quiz, current, flagged } = quizState;
  const done = !!completedItems[quiz.id];
  const hist = progress.quizScores[quiz.id]?.[0];
  let voucherBlock = '';
  if (quiz.voucherPlan && VOUCHER_PLANS[quiz.voucherPlan]) {
    voucherBlock = `<div class="lesson-callout" style="margin-bottom:24px;"><p><strong>Before you start:</strong> Review the matching study plan in the sidebar. After checking answers, revisit weak domains using the cram sections below.</p></div>`;
    voucherBlock += `<div class="lesson-body">${buildVoucherCramHtml(quiz.voucherPlan)}</div><hr class="lesson-divider"/>`;
  }
  const answered = Object.keys(quizState.answers).length;
  const flaggedCount = Object.keys(flagged).filter(k => flagged[k]).length;

  document.getElementById('quiz-body-container').innerHTML = `
    <div class="quiz-eyebrow">${currentCourse.name}</div>
    <h1 class="quiz-title">${quiz.title}</h1>
    <p class="quiz-intro">${quiz.description || 'Answer one question at a time. Flag any you want to review, then submit when ready.'}</p>
    <div class="quiz-info-bar">
      <div class="qib-stat"><strong>${quiz.questions.length}</strong> questions</div>
      <div class="qib-stat"><strong>${answered}</strong> answered</div>
      ${flaggedCount ? `<div class="qib-stat flagged-stat">🚩 ${flaggedCount} flagged</div>` : ''}
      ${done ? '<div class="qib-stat" style="color:var(--good);">✓ Previously completed</div>' : ''}
      ${hist ? `<div class="qib-stat">Last score: ${hist.pct}%</div>` : ''}
    </div>
    ${voucherBlock}
    <div class="quiz-step-nav">
      <button type="button" class="quiz-nav-btn" onclick="quizNav(-1)" ${current === 0 ? 'disabled' : ''}>← Prev</button>
      <span class="quiz-step-indicator">Question ${current + 1} of ${quiz.questions.length}</span>
      <button type="button" class="quiz-nav-btn" onclick="quizNav(1)" ${current >= quiz.questions.length - 1 ? 'disabled' : ''}>Next →</button>
    </div>
    <div id="quiz-question-area"></div>
    <div class="quiz-actions-bar">
      <button type="button" class="quiz-flag-btn ${flagged[current] ? 'active' : ''}" id="quiz-flag-btn" onclick="toggleFlag()">${flagged[current] ? '🚩 Flagged' : 'Flag for review'}</button>
      <button type="button" class="quiz-submit-all-btn" id="quiz-submit-all" onclick="submitAllQuiz()" ${answered < quiz.questions.length ? 'disabled title="Answer all questions first"' : ''}>
        Check all answers
      </button>
    </div>
    <div id="quiz-results-area"></div>`;

  renderQuizQuestion(current);
}

function renderQuizQuestion(qi) {
  const q = quizState.quiz.questions[qi];
  const letters = ['A', 'B', 'C', 'D', 'E'];
  const submitted = quizState.submitted;
  const chosen = quizState.answers[qi];
  const area = document.getElementById('quiz-question-area');
  if (!area) return;

  let optsHtml = q.options.map((opt, oi) => {
    let cls = 'q-opt';
    if (chosen === oi) cls += ' selected';
    if (submitted) {
      if (oi === q.correct) cls += ' correct';
      else if (oi === chosen) cls += ' wrong';
    }
    return `<button class="${cls}" id="opt-${qi}-${oi}" onclick="selectOpt(${qi},${oi})" ${submitted ? 'disabled' : ''}>
      <span class="opt-letter">${letters[oi]}</span> ${opt}
    </button>`;
  }).join('');

  let fb = '';
  if (submitted) {
    const correct = chosen === q.correct;
    fb = `<div class="q-feedback show ${correct ? 'correct' : 'wrong'}">${correct ? '✅ Correct!' : '❌ Incorrect.'}${q.explanation ? ' ' + q.explanation : ''}</div>`;
  }

  area.innerHTML = `
    <div class="q-card" id="qcard-${qi}">
      <div class="q-num">Question ${qi + 1}${quizState.flagged[qi] ? ' · 🚩 Flagged' : ''}</div>
      <div class="q-text">${q.q}</div>
      <div class="q-options">${optsHtml}</div>
      ${fb}
    </div>`;

  const flagBtn = document.getElementById('quiz-flag-btn');
  if (flagBtn) {
    flagBtn.classList.toggle('active', !!quizState.flagged[qi]);
    flagBtn.textContent = quizState.flagged[qi] ? '🚩 Flagged' : 'Flag for review';
  }
  const submitAll = document.getElementById('quiz-submit-all');
  if (submitAll) {
    const allAnswered = Object.keys(quizState.answers).length >= quizState.quiz.questions.length;
    submitAll.disabled = !allAnswered || quizState.submitted;
  }
}

function quizNav(delta) {
  if (quizState.submitted) return;
  const next = quizState.current + delta;
  if (next < 0 || next >= quizState.quiz.questions.length) return;
  quizState.current = next;
  document.querySelector('.quiz-step-indicator').textContent =
    `Question ${next + 1} of ${quizState.quiz.questions.length}`;
  document.querySelectorAll('.quiz-step-nav .quiz-nav-btn').forEach((btn, i) => {
    if (i === 0) btn.disabled = next === 0;
    if (i === 1) btn.disabled = next >= quizState.quiz.questions.length - 1;
  });
  renderQuizQuestion(next);
}

function toggleFlag() {
  const qi = quizState.current;
  quizState.flagged[qi] = !quizState.flagged[qi];
  renderQuizQuestion(qi);
  const flaggedCount = Object.values(quizState.flagged).filter(Boolean).length;
  const stat = document.querySelector('.flagged-stat');
  if (stat) stat.textContent = `🚩 ${flaggedCount} flagged`;
  else if (flaggedCount) {
    const bar = document.querySelector('.quiz-info-bar');
    bar?.insertAdjacentHTML('beforeend', `<div class="qib-stat flagged-stat">🚩 ${flaggedCount} flagged</div>`);
  }
}

function selectOpt(qi, oi) {
  if (quizState.submitted) return;
  quizState.answers[qi] = oi;
  renderQuizQuestion(qi);
  const answered = Object.keys(quizState.answers).length;
  const stat = document.querySelector('.quiz-info-bar .qib-stat:nth-child(2) strong');
  if (stat) stat.textContent = answered;
  const submitAll = document.getElementById('quiz-submit-all');
  if (submitAll) submitAll.disabled = answered < quizState.quiz.questions.length;
}

function submitAllQuiz() {
  if (quizState.submitted) return;
  const total = quizState.quiz.questions.length;
  if (Object.keys(quizState.answers).length < total) {
    toast('Answer every question before checking');
    return;
  }
  quizState.submitted = true;
  quizState.finished = true;
  quizState.score = 0;
  for (let i = 0; i < total; i++) {
    if (quizState.answers[i] === quizState.quiz.questions[i].correct) quizState.score++;
  }
  renderQuizQuestion(quizState.current);
  document.querySelector('.quiz-actions-bar')?.classList.add('hidden');
  showQuizResults();
}

function showQuizResults() {
  const { score, quiz } = quizState;
  const total = quiz.questions.length;
  const pct = Math.round(score / total * 100);
  const emoji = pct >= 90 ? '🏆' : pct >= 70 ? '🎉' : pct >= 50 ? '👍' : '💪';
  const msg = pct >= 90 ? 'Outstanding work!' : pct >= 70 ? 'Great job!' : pct >= 50 ? 'Good effort — review flagged questions.' : 'Keep studying — every attempt builds knowledge.';
  recordQuizScore(quiz.id, score, total, quiz.voucherPlan);

  const ringColor = pct >= 70 ? 'var(--good)' : pct >= 50 ? 'var(--warn)' : 'var(--bad)';
  const flagged = Object.keys(quizState.flagged).filter(k => quizState.flagged[k]).map(Number);

  document.getElementById('quiz-results-area').innerHTML = `
    <div class="quiz-results">
      <div class="qr-score-ring" style="border-color:${ringColor}">
        <span class="score-num">${score}</span>
        <span class="score-denom">of ${total}</span>
      </div>
      <h2 class="qr-title">${emoji} ${pct}% — ${msg}</h2>
      <p class="qr-subtitle">You answered ${score} of ${total} questions correctly.</p>
      ${quiz.voucherPlan && pct < 70 ? '<p class="qr-subtitle">Score below 70% — review cram-by-domain sections in the study plan.</p>' : ''}
      ${flagged.length ? `<p class="qr-subtitle">You flagged ${flagged.length} question(s) for review.</p>` : ''}
      <div class="qr-breakdown">
        <div class="qrb-item"><div class="qrb-num" style="color:var(--good)">${score}</div><div class="qrb-label">Correct</div></div>
        <div class="qrb-item"><div class="qrb-num" style="color:var(--bad)">${total - score}</div><div class="qrb-label">Incorrect</div></div>
        <div class="qrb-item"><div class="qrb-num">${pct}%</div><div class="qrb-label">Score</div></div>
      </div>
      <button class="qr-retry-btn" onclick="openQuiz(quizState.quiz)">Retry Quiz</button>
      <button class="qr-done-btn" onclick="markQuizComplete()">Done →</button>
    </div>`;
  document.getElementById('quiz-results-area').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function markQuizComplete() {
  completedItems[quizState.quiz.id] = true;
  saveProgress();
  const navEl = document.getElementById('nav-' + quizState.quiz.id);
  if (navEl) {
    navEl.classList.add('completed');
    const pct = progress.quizScores[quizState.quiz.id]?.[0]?.pct;
    navEl.querySelector('.nav-check').textContent = pct != null ? pct + '%' : '✓';
  }
  refreshSidebarProgress();
  updateTopbarNext();
  toast('Quiz complete! ✓');
  setTimeout(() => advanceToNext(quizState.quiz.id), 600);
}

// ── FLASHCARDS ─────────────────────────────
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function openFlashcards(item) {
  showView('v-flashcards');
  flashState = {
    item,
    phase: 1,
    queue: shuffle(FLASHCARDS.map((_, i) => i)),
    pos: 0,
    pass1No: [],
    pass2No: [],
    flipped: false,
    done: false
  };
  renderFlashcards();
  document.getElementById('main').scrollTop = 0;
  stopProgress();
}

function renderFlashcards() {
  const deck = FLASHCARDS;
  if (!deck.length) {
    document.getElementById('flashcards-body-container').innerHTML = '<p class="quiz-intro">No flashcards loaded.</p>';
    return;
  }
  document.getElementById('flashcards-body-container').innerHTML = `
    <div class="quiz-eyebrow">${currentCourse.name}</div>
    <h1 class="quiz-title">${flashState.item.title}</h1>
    <p class="quiz-intro">Tap the card to flip. Mark whether you knew each term — missed cards repeat in a review pass.</p>
    <div class="q-card" id="flash-card-wrap">
      <p class="q-num" id="flash-phase-label"></p>
      <p class="q-text" id="flash-progress"></p>
      <button type="button" class="q-opt flash-card-btn" id="flash-card-btn">
        <span id="flash-term"></span>
      </button>
      <p id="flash-answer" class="q-feedback show correct" hidden></p>
      <p class="flash-hint" id="flash-hint">Click the card to reveal the definition</p>
      <div id="flash-actions" class="flash-actions">
        <button class="q-submit" id="flash-yes" style="background:var(--good);">Yes, I knew it</button>
        <button class="q-submit" id="flash-no" style="background:var(--bad);">Not yet</button>
      </div>
      <div id="flash-summary" class="quiz-results" hidden></div>
      <button class="qr-retry-btn" id="flash-reset" style="margin-top:20px;">Reset deck</button>
    </div>`;

  const elTerm = document.getElementById('flash-term');
  const elAnswer = document.getElementById('flash-answer');
  const elCard = document.getElementById('flash-card-btn');
  const elActions = document.getElementById('flash-actions');
  const elSummary = document.getElementById('flash-summary');
  const elHint = document.getElementById('flash-hint');

  function syncCard() {
    if (flashState.done) return;
    const idx = flashState.queue[flashState.pos];
    const card = deck[idx];
    document.getElementById('flash-phase-label').textContent = flashState.phase === 1 ? 'Pass 1 — First pass' : 'Pass 2 — Review misses';
    document.getElementById('flash-progress').textContent = `Card ${flashState.pos + 1} of ${flashState.queue.length}`;
    elTerm.textContent = card ? card.term : '—';
    elAnswer.textContent = card ? card.answer : '';
    elAnswer.hidden = !flashState.flipped;
    elCard.style.borderColor = flashState.flipped ? 'var(--accent)' : '';
    if (elHint) elHint.textContent = flashState.flipped ? 'Click again to hide the definition' : 'Click the card to reveal the definition';
  }

  function finishFlash() {
    flashState.done = true;
    elActions.hidden = true;
    elCard.hidden = true;
    if (elHint) elHint.hidden = true;
    elSummary.hidden = false;
    const missed = flashState.pass2No.length ? flashState.pass2No.length : flashState.pass1No.length;
    elSummary.innerHTML = `
      <h2 class="qr-title">Session complete 🎉</h2>
      <p class="qr-subtitle">${missed === 0 ? 'You marked Yes for every card.' : 'Review the terms you missed, then reset to run again.'}</p>
      <button class="qr-done-btn" onclick="markComplete('${flashState.item.id}')">Done →</button>`;
  }

  function answerFlash(knew) {
    if (flashState.done) return;
    const idx = flashState.queue[flashState.pos];
    if (!knew) {
      if (flashState.phase === 1) flashState.pass1No.push(idx);
      else flashState.pass2No.push(idx);
    }
    flashState.flipped = false;
    flashState.pos++;
    if (flashState.pos >= flashState.queue.length) {
      if (flashState.phase === 1 && flashState.pass1No.length) {
        flashState.phase = 2;
        flashState.queue = shuffle(flashState.pass1No.slice());
        flashState.pos = 0;
      } else finishFlash();
    }
    syncCard();
  }

  elCard.onclick = () => { flashState.flipped = !flashState.flipped; syncCard(); };
  document.getElementById('flash-yes').onclick = () => answerFlash(true);
  document.getElementById('flash-no').onclick = () => answerFlash(false);
  document.getElementById('flash-reset').onclick = () => openFlashcards(flashState.item);
  syncCard();
}

// ── NAVIGATION AIDS ────────────────────────
function advanceToNext(doneId) {
  const next = getNextIncomplete(doneId);
  if (next) openItem(next.id);
}

function refreshSidebarProgress() {
  if (!currentCourse) return;
  renderSidebarHead();
}

// ── SCROLL PROGRESS ────────────────────────
let progTarget = null;
function startProgress(elId) {
  progTarget = document.getElementById(elId);
  document.getElementById('reading-progress').style.display = 'block';
  updateProgress();
}
function stopProgress() {
  progTarget = null;
  document.getElementById('reading-progress-fill').style.width = '0%';
}
function updateProgress() {
  if (!progTarget) return;
  const { scrollTop, scrollHeight, clientHeight } = progTarget;
  const pct = scrollHeight <= clientHeight ? 100 : (scrollTop / (scrollHeight - clientHeight)) * 100;
  document.getElementById('reading-progress-fill').style.width = pct + '%';
}

// ── VIEW HELPERS ───────────────────────────
function showView(id) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.getElementById('main').scrollTop = 0;
}

function lighten(hex, pct) {
  try {
    const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    const a = Math.round(2.55 * pct);
    const cl = v => Math.max(0, Math.min(255, v));
    return `#${cl(r + a).toString(16).padStart(2, '0')}${cl(g + a).toString(16).padStart(2, '0')}${cl(b + a).toString(16).padStart(2, '0')}`;
  } catch { return hex; }
}

let _t;
function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(_t);
  _t = setTimeout(() => el.classList.remove('show'), 3000);
}

function mobileNext() {
  if (!currentCourse || !currentItemId) return;
  const next = getNextIncomplete(currentItemId) || getNextItem(currentItemId);
  if (next) openItem(next.id);
}

// Expose for inline handlers
window.goHome = goHome;
window.openCourse = openCourse;
window.openItem = openItem;
window.markComplete = markComplete;
window.downloadStarter = downloadStarter;
window.selectOpt = selectOpt;
window.submitAllQuiz = submitAllQuiz;
window.quizNav = quizNav;
window.toggleFlag = toggleFlag;
window.markQuizComplete = markQuizComplete;
window.toggleMobileSidebar = toggleMobileSidebar;
window.mobileNext = mobileNext;
window.toggleTheme = toggleTheme;

init();
