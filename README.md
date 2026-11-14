# Soufiane — Portfolio

My personal portfolio: a dark editorial-tech site with a warm orange accent, built by hand with **HTML, CSS and JavaScript** — no frameworks, no build step.

Live: https://soufiane-x2.github.io/

## Highlights

- **Editorial hero** — a full-width giant name, a serif italic intro line and an orbiting tech visual with floating status chips.
- **Light & dark theme** — toggle in the header, remembered in `localStorage`, default dark. Both themes pass WCAG contrast checks.
- **Motion with restraint** — intro curtain, scroll reveals, a marquee, card tilt and a custom cursor on desktop. Everything stops for `prefers-reduced-motion`.
- **Skills tabs** — four groups (Front-end, Back-end, Database, Tools) with keyboard support and local Devicon icons, so no CDN is needed.
- **Project cards** — the whole card is a link to the project's GitHub repository. A separate **Live demo** pill opens the deployed site.
- **Live GitHub count** — the repository card reads the public repo count from the GitHub API, with a static fallback when offline.
- **CV** — every CV button opens `assets/cv/Soufiane-CV.pdf` in a new tab (served as `application/pdf`).
- **Responsive** — tested from 320 px phones to 2560 px monitors with no horizontal overflow.

## Project structure

```
portfolio/
├── index.html
├── css/
│   └── style.css              # tokens, layout, components, responsive rules
├── js/
│   ├── main.js                # intro, theme, menu, reveal, tabs, projects, cursor
│   ├── projects.js            # project list (edit this to add one)
│   └── skills.js              # skill groups + icons (edit this to add one)
├── assets/
│   ├── images/                # project screenshots (bakery.jpg)
│   ├── icons/
│   │   ├── favicon.svg
│   │   └── devicon/           # local skill icons (Devicon)
│   └── cv/
│       └── Soufiane-CV.pdf
└── README.md
```

## Run it

No install needed — open `index.html` in a browser.

For a local server (recommended, so the PDF and icons load exactly like production):

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

> Adding or changing CSS/JS? Bump the `?v=` number on the `style.css` / `main.js` links in `index.html` so browsers do not serve a cached copy.

## Customize

| What | Where |
|---|---|
| Colors and fonts | the `:root` and `html[data-theme="light"]` blocks at the top of `css/style.css` |
| Hero typing words | the `words` array in `js/main.js` |
| Add a skill | add `{ name, icon }` to a group in `js/skills.js` (drop the SVG in `assets/icons/devicon/`) |
| Add a project | add an object in `js/projects.js` — `repo` is where the card links, `live` adds a demo button |
| CV | replace `assets/cv/Soufiane-CV.pdf` |
| Email and social links | the Contact section of `index.html` |

### Project object

```js
{
  title: "Project name",
  cat: "Web · Multi-page",
  year: "2026",
  desc: "What it does in one or two sentences.",
  tags: ["HTML", "CSS", "JavaScript"],
  repo: "https://github.com/SOUFIANE-X2/project-bakery",
  live: "https://example.com",     // optional
  img: "assets/images/bakery.jpg", // optional, used by the bakery artwork
  visual: "bakery"                 // "bakery" | "portfolio" | anything else
}
```

## Accessibility

- Skip-to-content link and visible focus rings.
- Proper landmarks, one `h1`, and labelled icon buttons.
- Tabs follow the ARIA tabs pattern with arrow / Home / End keys.
- Decorative visuals are hidden from screen readers.
- Lighthouse: **100 Accessibility, 100 Best Practices, 100 SEO** in both themes.

## Deploy (GitHub Pages)

1. Push to the `main` branch of `SOUFIANE-X2.github.io`.
2. In **Settings → Pages**, use the `main` branch and the `/ (root)` folder.
3. The site is served at https://soufiane-x2.github.io/ within a minute or two.

## Projects

- **Bakery Website** — multi-page bakery site (HTML, CSS, JavaScript): https://github.com/SOUFIANE-X2/project-bakery · [live](https://soufiane-x2.github.io/project-bakery/)
- **This Portfolio** — this site: https://github.com/SOUFIANE-X2/SOUFIANE-X2.github.io

## Contact

- GitHub: https://github.com/SOUFIANE-X2
- LinkedIn: https://www.linkedin.com/in/soufiane-inarain
- Discord: https://discord.com/users/1448300804376236124
- Email: inarainsoufiane@gmail.com

Designed and built by Soufiane Inarain.
