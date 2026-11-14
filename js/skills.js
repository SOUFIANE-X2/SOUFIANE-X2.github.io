/* ===== SKILLS ======================================================
   Each group becomes a tab in the Skills section. Icons are local SVGs
   from the Devicon project, stored in `assets/icons/devicon/`.
   Add a skill by adding `{ name, icon }` to a group's items.
==================================================================== */
const skillGroups = [
  {
    id: "frontend",
    label: "Front-end",
    blurb: "The layer people see and touch: structure, style and interaction.",
    items: [
      { name: "HTML",       icon: "assets/icons/devicon/html5.svg" },
      { name: "CSS",        icon: "assets/icons/devicon/css3.svg" },
      { name: "JavaScript", icon: "assets/icons/devicon/javascript.svg" },
      { name: "React",      icon: "assets/icons/devicon/react.svg" },
      { name: "Bootstrap",  icon: "assets/icons/devicon/bootstrap.svg" }
    ]
  },
  {
    id: "backend",
    label: "Back-end",
    blurb: "The logic behind the page: requests, rules and server-side code.",
    items: [
      { name: "PHP",    icon: "assets/icons/devicon/php.svg" },
      { name: "Python", icon: "assets/icons/devicon/python.svg" }
    ]
  },
  {
    id: "database",
    label: "Database",
    blurb: "Where the data lives, and how to ask it the right questions.",
    items: [
      { name: "MySQL", icon: "assets/icons/devicon/mysql.svg" }
    ]
  },
  {
    id: "tools",
    label: "Tools",
    blurb: "How I build, version and ship the things I make.",
    items: [
      { name: "Git",    icon: "assets/icons/devicon/git.svg" },
      { name: "GitHub", icon: "assets/icons/devicon/github.svg" }
    ]
  }
];
