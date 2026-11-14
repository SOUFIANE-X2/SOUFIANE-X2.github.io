/* ==========================================================================
   Soufiane — portfolio interactions
   1. Intro   2. Theme   3. Menu   4. Scroll state
   5. Clock   6. Skills  7. Projects   8. Typing
   9. Reveal  10. Tilt & cursor
   ========================================================================== */
(function () {
  "use strict";

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  /* ===== 1. Intro curtain ================================================= */
  (function intro() {
    var el = document.getElementById("intro");
    if (!el) return;

    var seen = false;
    try { seen = sessionStorage.getItem("intro-seen") === "1"; } catch (e) {}
    if (seen || reduceMotion) { el.remove(); return; }

    var done = false;
    var timer;

    function finish() {
      if (done) return;
      done = true;
      clearTimeout(timer);
      el.classList.add("out");
      root.classList.remove("lock");
      try { sessionStorage.setItem("intro-seen", "1"); } catch (e) {}
      setTimeout(function () { el.remove(); }, 700);
    }

    root.classList.add("lock");
    timer = setTimeout(finish, 1850);
    el.addEventListener("click", finish);
    window.addEventListener("keydown", finish, { once: true });
    window.addEventListener("wheel", finish, { once: true, passive: true });
    window.addEventListener("touchstart", finish, { once: true, passive: true });
  })();

  /* ===== 2. Theme toggle ================================================== */
  (function theme() {
    var btn = document.getElementById("theme-btn");
    var meta = document.querySelector('meta[name="theme-color"]');

    function apply(mode, save) {
      root.dataset.theme = mode;
      if (meta) meta.content = mode === "light" ? "#f3efe7" : "#08080b";
      if (btn) {
        btn.setAttribute("aria-pressed", String(mode === "light"));
        btn.setAttribute("aria-label", mode === "light" ? "Switch to dark theme" : "Switch to light theme");
      }
      if (save) {
        try { localStorage.setItem("theme", mode); } catch (e) {}
      }
    }

    apply(root.dataset.theme === "light" ? "light" : "dark", false);
    if (btn) {
      btn.addEventListener("click", function () {
        apply(root.dataset.theme === "light" ? "dark" : "light", true);
      });
    }
  })();

  /* ===== 3. Mobile menu =================================================== */
  (function menu() {
    var burger = document.getElementById("burger");
    var panel = document.getElementById("menu");
    if (!burger || !panel) return;

    function set(open) {
      panel.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.classList.toggle("menu-open", open);
    }

    burger.addEventListener("click", function () {
      set(burger.getAttribute("aria-expanded") !== "true");
    });
    panel.addEventListener("click", function (e) {
      if (e.target === panel || e.target.closest("a")) set(false);
    });
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".nav")) set(false);
    });
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") set(false);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 900) set(false);
    }, { passive: true });
  })();

  /* ===== 4. Scroll progress + active nav link ============================= */
  (function scrollState() {
    var nav = document.getElementById("nav");
    var bar = document.getElementById("progress");
    var links = $$('#menu a[href^="#"]');
    var sections = links.map(function (a) {
      return document.querySelector(a.getAttribute("href"));
    }).filter(Boolean);
    var queued = false;

    function update() {
      queued = false;
      var y = window.scrollY || window.pageYOffset;
      if (nav) nav.classList.toggle("scrolled", y > 8);

      if (bar) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = "scaleX(" + (max > 0 ? Math.min(1, y / max) : 0) + ")";
      }

      var current = "";
      sections.forEach(function (sec) {
        if (sec.getBoundingClientRect().top <= window.innerHeight * 0.4) current = sec.id;
      });
      links.forEach(function (a) {
        a.classList.toggle("active", a.getAttribute("href") === "#" + current);
      });
    }

    window.addEventListener("scroll", function () {
      if (!queued) { queued = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  })();

  /* ===== 5. Local time (Morocco) ========================================== */
  (function clock() {
    var a = document.getElementById("local-time");
    var b = document.getElementById("local-time-2");
    if (!a && !b) return;
    var fmt;
    try {
      fmt = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Africa/Casablanca"
      });
    } catch (e) { fmt = null; }

    function tick() {
      var now = new Date();
      var value = fmt ? fmt.format(now) : String(now.getHours()).padStart(2, "0") + ":" + String(now.getMinutes()).padStart(2, "0");
      if (a) a.textContent = value;
      if (b) b.textContent = value;
    }
    tick();
    setInterval(tick, 30000);
  })();

  /* ===== 6. Skills tabs =================================================== */
  (function skills() {
    var tabsBox = document.getElementById("skill-tabs");
    var panel = document.getElementById("skill-panel");
    if (!tabsBox || !panel || typeof skillGroups === "undefined") return;

    var active = 0;
    var tabs = [];

    function iconFor(item) {
      return '<img src="' + esc(item.icon) + '" alt="" loading="lazy" data-name="' + esc(item.name) + '">';
    }

    function renderPanel(index, animate) {
      var group = skillGroups[index];
      panel.setAttribute("aria-labelledby", "tab-" + group.id);
      panel.innerHTML =
        '<div class="panel-top">' +
          '<div><h3>' + esc(group.label) + '</h3><p>' + esc(group.blurb) + '</p></div>' +
          '<span class="panel-count">' + group.items.length + (group.items.length === 1 ? " tool" : " tools") + '</span>' +
        '</div>' +
        '<div class="skill-grid">' +
          group.items.map(function (item) {
            return '<div class="skill">' + iconFor(item) + '<span>' + esc(item.name) + '</span></div>';
          }).join("") +
        '</div>';

      $$("img", panel).forEach(function (img) {
        img.addEventListener("error", function () {
          var fb = document.createElement("span");
          fb.className = "fb";
          fb.textContent = (img.getAttribute("data-name") || "??").slice(0, 2);
          img.replaceWith(fb);
        });
      });

      if (animate) {
        panel.classList.remove("is-swapping");
        void panel.offsetWidth;
        panel.classList.add("is-swapping");
      }
    }

    tabsBox.innerHTML = skillGroups.map(function (group, i) {
      return '<button type="button" class="skill-tab" role="tab" id="tab-' + esc(group.id) + '"' +
        ' aria-controls="skill-panel" aria-selected="' + (i === 0) + '"' +
        ' tabindex="' + (i === 0 ? 0 : -1) + '" data-index="' + i + '">' +
        '<span>' + String(i + 1).padStart(2, "0") + '</span>' + esc(group.label) + '</button>';
    }).join("");

    tabs = $$(".skill-tab", tabsBox);

    function select(index, focus) {
      active = (index + skillGroups.length) % skillGroups.length;
      tabs.forEach(function (tab, i) {
        tab.setAttribute("aria-selected", String(i === active));
        tab.tabIndex = i === active ? 0 : -1;
      });
      renderPanel(active, true);
      if (focus) tabs[active].focus();
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { select(i, false); });
    });

    tabsBox.addEventListener("keydown", function (e) {
      var next = null;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") next = active + 1;
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = active - 1;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = skillGroups.length - 1;
      else return;
      e.preventDefault();
      select(next, true);
    });

    renderPanel(0, false);
  })();

  /* ===== 7. Projects ====================================================== */
  (function projectCards() {
    var grid = document.getElementById("grid");
    if (!grid || typeof projects === "undefined") return;

    var GITHUB = "https://github.com/SOUFIANE-X2";

    function artwork(project) {
      if (project.visual === "bakery") {
        var url = (project.live || project.repo || "").replace(/^https?:\/\//, "").replace(/\/$/, "");
        return '<div class="browser">' +
          '<div class="browser-bar"><i></i><i></i><i></i><span>' + esc(url) + '</span></div>' +
          '<img src="' + esc(project.img || "assets/images/bakery.jpg") + '" alt="Screenshot of the ' + esc(project.title) + ' project" loading="lazy">' +
        '</div>';
      }
      if (project.visual === "portfolio") {
        return '<div class="mini">' +
          '<div class="mini-nav"><b>soufiane<span>.dev</span></b><span>menu</span></div>' +
          '<div class="mini-body">' +
            '<span class="mini-eyebrow">Portfolio</span>' +
            '<p class="mini-name">Soufiane<span>.</span></p>' +
            '<div class="mini-line"></div><div class="mini-line"></div>' +
            '<div class="mini-btns"><i></i><i></i></div>' +
          '</div>' +
          '<div class="mini-orbit"></div>' +
        '</div>';
      }
      return '<div class="gh-lines"></div><div class="gh-art">' +
        '<svg class="ico"><use href="#code"/></svg><p><b>01</b>project</p></div>';
    }

    grid.innerHTML = projects.map(function (project) {
      var live = project.live
        ? '<a class="project__live" href="' + esc(project.live) + '" target="_blank" rel="noopener">Live demo <svg class="ico"><use href="#arrow"/></svg></a>'
        : '<span class="project__live">Code only</span>';

      return '<article class="project rv">' +
        '<a class="project__overlay" href="' + esc(project.repo) + '" target="_blank" rel="noopener" aria-label="Open ' + esc(project.title) + ' on GitHub"></a>' +
        '<div class="project__visual">' + artwork(project) + '</div>' +
        '<div class="project__body">' +
          '<div class="project__top"><span class="cat">' + esc(project.cat || "Project") + '</span>' +
            '<span class="year">' + esc(project.year || "") + '</span></div>' +
          '<h3>' + esc(project.title) + '</h3>' +
          '<p>' + esc(project.desc || "") + '</p>' +
          '<div class="tags">' + (project.tags || []).map(function (tag) { return '<span>' + esc(tag) + '</span>'; }).join("") + '</div>' +
          '<div class="project__actions">' +
            '<span class="project__repo">View on GitHub <svg class="ico"><use href="#arrow"/></svg></span>' +
            live +
          '</div>' +
        '</div>' +
      '</article>';
    }).join("") +
    '<article class="project rv">' +
      '<a class="project__overlay" href="' + GITHUB + '" target="_blank" rel="noopener" aria-label="Browse all of Soufiane\'s repositories on GitHub"></a>' +
      '<div class="project__visual"><div class="gh-lines"></div><div class="gh-art">' +
        '<svg class="ico"><use href="#gh"/></svg>' +
        '<p><b data-repo-count>02</b>public repositories</p>' +
      '</div></div>' +
      '<div class="project__body">' +
        '<div class="project__top"><span class="cat">Open source</span><span class="year">GitHub</span></div>' +
        '<h3>Everything on GitHub</h3>' +
        '<p>Experiments, practice and everything I am learning. New repositories land here as I build.</p>' +
        '<div class="tags"><span>Repos</span><span>Commits</span><span>Progress</span></div>' +
        '<div class="project__actions">' +
          '<span class="project__repo">Browse the profile <svg class="ico"><use href="#arrow"/></svg></span>' +
          '<a class="project__live" href="' + GITHUB + '" target="_blank" rel="noopener">Follow <svg class="ico"><use href="#arrow"/></svg></a>' +
        '</div>' +
      '</div>' +
    '</article>';

    /* live repo count (falls back to the static "02") */
    fetch("https://api.github.com/users/SOUFIANE-X2")
      .then(function (response) { return response.ok ? response.json() : null; })
      .then(function (data) {
        if (data && typeof data.public_repos === "number") {
          $$("[data-repo-count]").forEach(function (el) {
            el.textContent = String(data.public_repos).padStart(2, "0");
          });
        }
      })
      .catch(function () { /* offline or rate-limited: keep the static number */ });
  })();

  /* ===== 8. Typing effect ================================================= */
  (function typing() {
    var el = document.getElementById("word");
    if (!el) return;
    var words = ["websites", "interfaces", "databases", "small tools"];
    if (reduceMotion) { el.textContent = words[0]; return; }

    var wordIndex = 0;
    var chars = 0;
    var deleting = false;

    function type() {
      var word = words[wordIndex];
      el.textContent = word.slice(0, chars);

      if (!deleting && chars === word.length) {
        deleting = true;
        setTimeout(type, 1600);
        return;
      }
      if (deleting && chars === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
      chars += deleting ? -1 : 1;
      setTimeout(type, deleting ? 38 : 82);
    }

    setTimeout(type, 900);
  })();

  /* ===== 9. Scroll reveal + counters ====================================== */
  (function reveal() {
    var items = $$(".rv");

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

      items.forEach(function (el) { io.observe(el); });
    }

    var counters = $$("[data-count]");
    if (!counters.length) return;

    function run(el) {
      var target = parseInt(el.getAttribute("data-count"), 10) || 0;
      if (reduceMotion) { el.textContent = String(target); return; }
      var started = null;
      function step(now) {
        if (started === null) started = now;
        var progress = Math.min(1, (now - started) / 900);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = String(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    if (!("IntersectionObserver" in window)) {
      counters.forEach(run);
    } else {
      var counterIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { run(entry.target); counterIO.unobserve(entry.target); }
        });
      }, { threshold: 0.6 });
      counters.forEach(function (el) { counterIO.observe(el); });
    }
  })();

  /* ===== 10a. Subtle tilt on cards ======================================== */
  if (finePointer && !reduceMotion) {
    $$("[data-tilt]").forEach(function (el) {
      el.addEventListener("pointermove", function (e) {
        if (e.pointerType === "touch") return;
        var rect = el.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transition = "transform .12s linear";
        el.style.transform = "perspective(900px) rotateX(" + (-y * 5).toFixed(2) + "deg) rotateY(" + (x * 5).toFixed(2) + "deg)";
      });
      el.addEventListener("pointerleave", function () {
        el.style.transition = "";
        el.style.transform = "";
      });
    });
  }

  /* ===== 10b. Custom cursor =============================================== */
  (function cursor() {
    var el = document.getElementById("cursor");
    if (!el || !finePointer || reduceMotion) return;
    var dot = el.querySelector(".cursor-dot");
    var ring = el.querySelector(".cursor-ring");
    if (!dot || !ring) return;

    root.classList.add("has-cursor");

    var tx = window.innerWidth / 2;
    var ty = window.innerHeight / 2;
    var cx = tx;
    var cy = ty;
    var first = true;

    window.addEventListener("pointermove", function (e) {
      tx = e.clientX;
      ty = e.clientY;
      if (first) {
        cx = tx;
        cy = ty;
        first = false;
        el.classList.add("is-on");
      }
      dot.style.transform = "translate3d(" + tx + "px," + ty + "px,0)";
    }, { passive: true });

    document.addEventListener("pointerover", function (e) {
      el.classList.toggle("is-hot", !!(e.target.closest && e.target.closest("a, button, [role='tab']")));
    });
    document.addEventListener("mouseleave", function () { el.classList.remove("is-on"); });
    document.addEventListener("mouseenter", function () { if (!first) el.classList.add("is-on"); });

    (function loop() {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      ring.style.transform = "translate3d(" + cx + "px," + cy + "px,0)";
      requestAnimationFrame(loop);
    })();
  })();

  /* ===== 11. Footer year ================================================== */
  (function year() {
    var el = document.getElementById("year");
    if (el) el.textContent = String(new Date().getFullYear());
  })();
})();
