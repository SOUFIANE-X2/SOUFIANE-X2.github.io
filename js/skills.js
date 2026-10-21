/* ===== SKILLS: add a skill to a group and it shows up with its icon =====
   Icons come from the Devicon project (pinned version). To work offline,
   download the SVGs into assets/icons/ and change `icon` to a local path. */
const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/";
const skillGroups = [
  { title: "Front-end", items: [
    { name: "HTML",       icon: "html5/html5-original.svg" },
    { name: "CSS",        icon: "css3/css3-original.svg" },
    { name: "JavaScript", icon: "javascript/javascript-original.svg" },
    { name: "React",      icon: "react/react-original.svg" },
    { name: "Bootstrap",  icon: "bootstrap/bootstrap-original.svg" }
  ]},
  { title: "Back-end", items: [
    { name: "PHP",    icon: "php/php-original.svg" },
    { name: "Python", icon: "python/python-original.svg" }
  ]},
  { title: "Database", items: [
    { name: "MySQL", icon: "mysql/mysql-original.svg" }
  ]}
];
