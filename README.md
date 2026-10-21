# Soufiane — Portfolio

My personal portfolio website: an animated intro, a typing hero, an about section, my projects, and my contact links. Built with plain **HTML, CSS and JavaScript** (no frameworks, no build step).

## Features

- Animated intro (logo, social icons, credit), click anywhere to skip
- Hero with a fixed greeting and a typing effect for my roles
- **Download CV** button
- Responsive layout with a **hamburger menu** on small screens
- About section with a code-style card, and a Skills section with icons
- Projects section generated from a simple list (`js/projects.js`)
- Animated network background and scroll-reveal effects
- Respects `prefers-reduced-motion`

## Project structure

```
portfolio/
├── index.html
├── css/
│   └── style.css          # all styles + color variables
├── js/
│   ├── main.js            # intro, menu, typing effect, animations
│   ├── projects.js        # list of projects (edit this to add one)
│   └── skills.js          # skills + icons (edit this to add one)
├── assets/
│   ├── images/            # project pictures (bakery.jpg)
│   ├── icons/             # favicon
│   └── cv/                # put Soufiane-CV.pdf here
└── README.md
```

## Run it

No install needed. Just open `index.html` in your browser.
For live reload, use the VS Code **Live Server** extension, or run `python -m http.server` in this folder and open http://localhost:8000.

## Customize

| What | Where |
|---|---|
| Colors | `:root` variables at the top of `css/style.css` |
| Typing words | `words` array in `js/main.js` |
| Add a skill | add it to a group in `js/skills.js` |
| Add a project | add an object in `js/projects.js` (put its picture in `assets/images/`) |
| CV | save your PDF as `assets/cv/Soufiane-CV.pdf` |
| Email | replace `you@example.com` in the Contact section of `index.html` |
| Social links | the intro and Contact section of `index.html` |

## Deploy (GitHub Pages)

1. Push this folder to a GitHub repository.
2. Go to **Settings → Pages**.
3. Choose the `main` branch and the `/ (root)` folder, then save.

## Projects

- **Bakery Website** — multi-page bakery site (HTML, CSS, JavaScript): https://github.com/SOUFIANE-X2/project-bakery

## Contact

- GitHub: https://github.com/SOUFIANE-X2
- LinkedIn: https://www.linkedin.com/in/soufiane-inarain
- Discord: https://discord.com/users/1448300804376236124

Designed and built by Soufiane.
