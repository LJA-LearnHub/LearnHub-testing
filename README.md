# LearnHub

Browser-based learning hub for web dev, Python, SQL, and CompTIA certification courses. Content is generated from the legacy `learning-hub-main` source tree and served as static files.

## Quick start

Serve over HTTP (required — `file://` will not load the JS assets correctly):

```powershell
cd LearnHub_updated
python -m http.server 8765
```

Open [http://localhost:8765](http://localhost:8765).

## Rebuild content from source

When the upstream curriculum in `../learning-hub-main(2)/update_v1.0.7/` changes:

```powershell
node scripts/build-from-source.mjs
```

This regenerates:

| File | Contents |
|------|----------|
| `assets/courses.js` | Course metadata, units, lesson/quiz items |
| `assets/content.js` | Lesson HTML bodies |
| `assets/flashcards.js` | Tech+ flashcard deck |
| `assets/voucher-plans.js` | Voucher cram plans |
| `assets/starters.js` | Downloadable starter code for practice lessons |

App shell (not rebuilt):

| File | Contents |
|------|----------|
| `index.html` | Page structure |
| `assets/app.css` | Styles (including dark mode) |
| `assets/app.js` | Navigation, quizzes, progress, keyboard shortcuts |

## Features

- **Courses:** HTML, CSS, JavaScript, Python, SQL, Tech+, Network+, Security+, PenTest+
- **Practice lessons:** VS Code instructions with downloadable starter files
- **Quizzes:** One question at a time, flag for review, check all at end; scores saved locally
- **Progress:** Stored in `localStorage` under `lh_progress` (legacy `ef_done` synced)
- **Keyboard:** `←` / `→` prev/next item, `/` focus lesson search, `Esc` home or close drawer
- **Dark mode:** Toggle in the top bar

## Source path

The build script expects source assets at:

```
../learning-hub-main(2)/update_v1.0.7/assets/
```

Adjust `SRC` in `scripts/build-from-source.mjs` if your layout differs.

## Study guides

Static HTML guides live in `docs/guides/` and are linked from Tech+ study plan lessons.
