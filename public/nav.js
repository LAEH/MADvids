/* nav.js — Shared glass navbar for all MADvids pages
   Injects CSS + HTML + event handlers automatically.
   Include via <script src="/MADvids/nav.js"></script> */
(function() {
    'use strict';

    /* ─── Config ─── */
    var BASE = '/MADvids/';
    var THEME_KEY = 'madvids-theme';

    var NAV_ORDER = [
        'superflat', 'hyperpod-cinematic', 'hyperpod-showcase', 'hyperpod-grid',
        'hyperpod-immersive', 'delightfull-video', 'chromatic-shift', 'mesh-flow',
        'lumina', 'shape-reveal', 'verso', 'cosmos'
    ];

    var EXP_NAMES = {
        'superflat': 'Superflat',
        'hyperpod-cinematic': 'Cinematic Scroll',
        'hyperpod-showcase': 'Split Narrative',
        'hyperpod-grid': 'Bento Mosaic',
        'hyperpod-immersive': 'Depth & Grain',
        'delightfull-video': 'Delightful Video',
        'chromatic-shift': 'Chromatic Shift',
        'mesh-flow': 'Mesh Flow',
        'lumina': 'Lumina',
        'shape-reveal': 'Shape Reveal',
        'verso': 'Verso',
        'cosmos': 'Cosmos'
    };

    /* Videos available for mixing */
    var VIDEOS = [
        { name: 'HyperPod Alpha', tag: 'hyperpod', url: 'https://storage.googleapis.com/myproject-public-assets/ddn/videos/test/hyperpod-dgfdf.mp4' },
        { name: 'HyperPod Beta', tag: 'hyperpod', url: 'https://storage.googleapis.com/myproject-public-assets/ddn/videos/test/hyperpod-jhojeh.mp4' },
        { name: 'HyperPod Gamma', tag: 'hyperpod', url: 'https://storage.googleapis.com/myproject-public-assets/ddn/videos/test/hyperpod-kjhxsa.mp4' },
        { name: 'HyperPod Delta', tag: 'hyperpod', url: 'https://storage.googleapis.com/myproject-public-assets/ddn/videos/test/hyperpod-jfdgyie.mp4' },
        { name: 'Specific Colors', tag: 'hyperpod', url: 'https://storage.googleapis.com/myproject-public-assets/ddn/videos/test/Video_Generation_With_Specific_Colors%20copy.mp4' },
        { name: 'Claude Pretty', tag: 'imagination', url: 'https://storage.googleapis.com/myproject-public-assets/ddn/videos/test/claude-pretty-ugvuda.mp4' },
        { name: 'Murakami Dream', tag: 'imagination', url: 'https://storage.googleapis.com/myproject-public-assets/art/MADvids/Surreal_Murakami_Dreamscape_Video_Generation.mp4' },
        { name: 'Multiverse', tag: 'imagination', url: 'https://storage.googleapis.com/myproject-public-assets/art/MADvids/Abstract_Multiverse_Cinematic_Journey_Generated.mp4' },
        { name: 'Gradient Liquid', tag: 'imagination', url: 'https://storage.googleapis.com/myproject-public-assets/art/MADvids/Surreal_Gradient_Liquid_Video_Generation.mp4' },
        { name: 'Neo Pop', tag: 'imagination', url: 'https://storage.googleapis.com/myproject-public-assets/art/MADvids/Neo_Pop_Dreamscape_Drone_Journey.mp4' }
    ];

    /* ─── Detect page context ─── */
    var path = location.pathname.replace(BASE, '');
    var expMatch = path.match(/^experiments\/([^/]+)\//);
    var currentExp = expMatch ? expMatch[1] : null;
    var isLanding = !currentExp && (path === '' || path === 'index.html');
    var isExperiment = !!currentExp && currentExp !== 'journey' && currentExp !== 'autonomy-dashboard';
    var isJourney = currentExp === 'journey';
    var isDashboard = currentExp === 'autonomy-dashboard';

    /* ─── Prev / Next ─── */
    var prevExp = null, nextExp = null;
    if (isExperiment) {
        var idx = NAV_ORDER.indexOf(currentExp);
        if (idx !== -1) {
            prevExp = NAV_ORDER[(idx - 1 + NAV_ORDER.length) % NAV_ORDER.length];
            nextExp = NAV_ORDER[(idx + 1) % NAV_ORDER.length];
        }
    }

    /* ─── Theme ─── */
    var storedTheme = localStorage.getItem(THEME_KEY);
    /* Also check legacy key */
    if (!storedTheme) {
        var legacy = localStorage.getItem('ddn-theme');
        if (legacy) { storedTheme = legacy; localStorage.setItem(THEME_KEY, legacy); }
    }
    if (storedTheme) {
        document.documentElement.setAttribute('data-theme', storedTheme);
    }

    function isDark() {
        var t = document.documentElement.getAttribute('data-theme');
        return t !== 'light';
    }

    /* ─── SVG Icons ─── */
    var IC = {
        prev: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
        next: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
        home: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><polyline points="9 21 9 13 15 13 15 21"/></svg>',
        mix: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="8" height="8" rx="1"/><rect x="14" y="2" width="8" height="8" rx="1"/><rect x="2" y="14" width="8" height="8" rx="1"/><rect x="14" y="14" width="8" height="8" rx="1"/></svg>',
        sun: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
        moon: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
        close: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
    };

    /* ─── Inject CSS ─── */
    var style = document.createElement('style');
    style.textContent = [
        /* Nav pill */
        '#mv-nav{position:fixed;top:max(14px,env(safe-area-inset-top,14px));left:max(14px,env(safe-area-inset-left,14px));z-index:9990;display:flex;align-items:center;gap:2px;padding:4px;border-radius:14px;background:rgba(255,255,255,0.06);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.08);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif;transition:background 0.3s,border-color 0.3s}',
        '#mv-nav .mv-btn{display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:10px;border:none;background:none;color:rgba(255,255,255,0.5);cursor:pointer;text-decoration:none;transition:background 0.2s,color 0.2s;-webkit-tap-highlight-color:transparent}',
        '#mv-nav .mv-btn:hover{background:rgba(255,255,255,0.1);color:#fff}',
        '#mv-nav .mv-sep{width:1px;height:18px;background:rgba(255,255,255,0.08);flex-shrink:0}',

        /* Light theme overrides for nav */
        '[data-theme="light"] #mv-nav{background:rgba(0,0,0,0.04);border-color:rgba(0,0,0,0.06)}',
        '[data-theme="light"] #mv-nav .mv-btn{color:rgba(0,0,0,0.4)}',
        '[data-theme="light"] #mv-nav .mv-btn:hover{background:rgba(0,0,0,0.06);color:#000}',
        '[data-theme="light"] #mv-nav .mv-sep{background:rgba(0,0,0,0.06)}',

        /* Touch targets */
        '@media(pointer:coarse){#mv-nav .mv-btn{width:44px;height:44px}}',

        /* Reduced motion */
        '@media(prefers-reduced-motion:reduce){#mv-nav{transition:none}#mv-nav .mv-btn{transition:none}}',

        /* ═══ MIXER OVERLAY ═══ */
        '#mv-mixer{position:fixed;inset:0;z-index:9995;display:none;flex-direction:column;background:rgba(0,0,0,0.85);backdrop-filter:blur(30px);-webkit-backdrop-filter:blur(30px);overflow-y:auto;-webkit-overflow-scrolling:touch;padding:0}',
        '#mv-mixer.open{display:flex}',
        '#mv-mixer *{box-sizing:border-box}',

        /* Mixer inner */
        '.mv-mixer-inner{width:100%;max-width:680px;margin:0 auto;padding:80px 24px 40px}',

        /* Close */
        '.mv-mixer-close{position:fixed;top:max(16px,env(safe-area-inset-top,16px));right:max(16px,env(safe-area-inset-right,16px));z-index:9996;width:40px;height:40px;border-radius:12px;border:none;background:rgba(255,255,255,0.08);color:rgba(255,255,255,0.6);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background 0.2s,color 0.2s}',
        '.mv-mixer-close:hover{background:rgba(255,255,255,0.15);color:#fff}',

        /* Section heading */
        '.mv-mixer-label{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif;font-size:0.65rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.3);margin:0 0 12px 4px}',
        '.mv-mixer-label:not(:first-child){margin-top:32px}',

        /* Pill grid */
        '.mv-pills{display:flex;flex-wrap:wrap;gap:8px}',
        '.mv-pill{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif;font-size:0.78rem;font-weight:500;padding:10px 18px;border-radius:10px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);color:rgba(255,255,255,0.6);cursor:pointer;transition:background 0.2s,border-color 0.2s,color 0.2s;white-space:nowrap}',
        '.mv-pill:hover{background:rgba(255,255,255,0.1);color:#fff}',
        '.mv-pill.selected{background:rgba(255,255,255,0.15);border-color:rgba(255,255,255,0.25);color:#fff}',

        /* Video tag */
        '.mv-pill .mv-tag{font-size:0.55rem;opacity:0.4;margin-left:6px;letter-spacing:0.04em}',

        /* GO button */
        '.mv-go{display:block;width:100%;margin-top:36px;padding:16px;border-radius:14px;border:none;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif;font-size:0.95rem;font-weight:600;letter-spacing:0.02em;color:#fff;background:rgba(255,255,255,0.1);cursor:not-allowed;opacity:0.4;transition:background 0.3s,opacity 0.3s,transform 0.2s}',
        '.mv-go.ready{cursor:pointer;opacity:1;background:rgba(255,255,255,0.15)}',
        '.mv-go.ready:hover{background:rgba(255,255,255,0.22);transform:translateY(-1px)}',
        '.mv-go.ready:active{transform:scale(0.98)}',

        /* Light theme mixer */
        '[data-theme="light"] #mv-mixer{background:rgba(255,255,255,0.92)}',
        '[data-theme="light"] .mv-mixer-close{background:rgba(0,0,0,0.05);color:rgba(0,0,0,0.5)}',
        '[data-theme="light"] .mv-mixer-close:hover{background:rgba(0,0,0,0.1);color:#000}',
        '[data-theme="light"] .mv-mixer-label{color:rgba(0,0,0,0.3)}',
        '[data-theme="light"] .mv-pill{border-color:rgba(0,0,0,0.08);background:rgba(0,0,0,0.03);color:rgba(0,0,0,0.5)}',
        '[data-theme="light"] .mv-pill:hover{background:rgba(0,0,0,0.07);color:#000}',
        '[data-theme="light"] .mv-pill.selected{background:rgba(0,0,0,0.1);border-color:rgba(0,0,0,0.18);color:#000}',
        '[data-theme="light"] .mv-go{background:rgba(0,0,0,0.06);color:#000}',
        '[data-theme="light"] .mv-go.ready{background:rgba(0,0,0,0.1)}',
        '[data-theme="light"] .mv-go.ready:hover{background:rgba(0,0,0,0.15)}'
    ].join('\n');
    document.head.appendChild(style);

    /* ─── Build Nav HTML ─── */
    var nav = document.createElement('nav');
    nav.id = 'mv-nav';
    nav.setAttribute('aria-label', 'Site navigation');

    var btns = [];

    /* Prev */
    if (isExperiment && prevExp) {
        btns.push('<a class="mv-btn" href="' + BASE + 'experiments/' + prevExp + '/" title="Previous: ' + (EXP_NAMES[prevExp] || prevExp) + '" aria-label="Previous experiment">' + IC.prev + '</a>');
        btns.push('<div class="mv-sep"></div>');
    }

    /* Home */
    btns.push('<a class="mv-btn" href="' + BASE + '" title="Home" aria-label="Home">' + IC.home + '</a>');
    btns.push('<div class="mv-sep"></div>');

    /* Mix */
    btns.push('<button class="mv-btn" id="mv-mix-btn" title="Mix: combine style + video" aria-label="Open mixer">' + IC.mix + '</button>');
    btns.push('<div class="mv-sep"></div>');

    /* Theme */
    btns.push('<button class="mv-btn" id="mv-theme-btn" title="Toggle theme" aria-label="Toggle theme">' + (isDark() ? IC.sun : IC.moon) + '</button>');

    /* Next */
    if (isExperiment && nextExp) {
        btns.push('<div class="mv-sep"></div>');
        btns.push('<a class="mv-btn" href="' + BASE + 'experiments/' + nextExp + '/" title="Next: ' + (EXP_NAMES[nextExp] || nextExp) + '" aria-label="Next experiment">' + IC.next + '</a>');
    }

    nav.innerHTML = btns.join('');
    document.body.appendChild(nav);

    /* ─── Theme Toggle ─── */
    var themeBtn = document.getElementById('mv-theme-btn');
    themeBtn.addEventListener('click', function() {
        var next = isDark() ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem(THEME_KEY, next);
        /* Also write legacy key for experiments that still read it */
        localStorage.setItem('ddn-theme', next);
        themeBtn.innerHTML = next === 'dark' ? IC.sun : IC.moon;
    });

    /* ─── Mixer Overlay ─── */
    var mixer = document.createElement('div');
    mixer.id = 'mv-mixer';
    mixer.setAttribute('role', 'dialog');
    mixer.setAttribute('aria-label', 'Experiment mixer');

    var selectedStyle = null;
    var selectedVideo = null;

    /* Build style pills */
    var stylePills = '';
    NAV_ORDER.forEach(function(slug) {
        stylePills += '<button class="mv-pill" data-style="' + slug + '">' + (EXP_NAMES[slug] || slug) + '</button>';
    });

    /* Build video pills */
    var videoPills = '';
    VIDEOS.forEach(function(v, i) {
        videoPills += '<button class="mv-pill" data-video="' + i + '">' + v.name + '<span class="mv-tag">' + v.tag + '</span></button>';
    });

    mixer.innerHTML =
        '<button class="mv-mixer-close" id="mv-mixer-close" aria-label="Close mixer">' + IC.close + '</button>' +
        '<div class="mv-mixer-inner">' +
            '<div class="mv-mixer-label">Style</div>' +
            '<div class="mv-pills" id="mv-styles">' + stylePills + '</div>' +
            '<div class="mv-mixer-label">Video</div>' +
            '<div class="mv-pills" id="mv-videos">' + videoPills + '</div>' +
            '<button class="mv-go" id="mv-go" disabled>Select a style and video</button>' +
        '</div>';

    document.body.appendChild(mixer);

    function openMixer() {
        mixer.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    function closeMixer() {
        mixer.classList.remove('open');
        document.body.style.overflow = '';
    }

    function updateGo() {
        var go = document.getElementById('mv-go');
        if (selectedStyle && selectedVideo !== null) {
            go.classList.add('ready');
            go.disabled = false;
            go.textContent = 'GO — ' + EXP_NAMES[selectedStyle] + ' + ' + VIDEOS[selectedVideo].name;
        } else {
            go.classList.remove('ready');
            go.disabled = true;
            go.textContent = 'Select a style and video';
        }
    }

    /* Mix button */
    document.getElementById('mv-mix-btn').addEventListener('click', openMixer);

    /* Close */
    document.getElementById('mv-mixer-close').addEventListener('click', closeMixer);
    mixer.addEventListener('click', function(e) {
        if (e.target === mixer) closeMixer();
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mixer.classList.contains('open')) closeMixer();
    });

    /* Style selection */
    document.getElementById('mv-styles').addEventListener('click', function(e) {
        var pill = e.target.closest('.mv-pill');
        if (!pill) return;
        var prev = this.querySelector('.selected');
        if (prev) prev.classList.remove('selected');
        pill.classList.add('selected');
        selectedStyle = pill.getAttribute('data-style');
        updateGo();
    });

    /* Video selection */
    document.getElementById('mv-videos').addEventListener('click', function(e) {
        var pill = e.target.closest('.mv-pill');
        if (!pill) return;
        var prev = this.querySelector('.selected');
        if (prev) prev.classList.remove('selected');
        pill.classList.add('selected');
        selectedVideo = parseInt(pill.getAttribute('data-video'));
        updateGo();
    });

    /* GO */
    document.getElementById('mv-go').addEventListener('click', function() {
        if (!selectedStyle || selectedVideo === null) return;
        var url = BASE + 'experiments/' + selectedStyle + '/?v=' + encodeURIComponent(VIDEOS[selectedVideo].url);
        closeMixer();
        location.href = url;
    });

    /* Pre-select current experiment if on one */
    if (isExperiment && currentExp) {
        var curPill = document.querySelector('#mv-styles .mv-pill[data-style="' + currentExp + '"]');
        if (curPill) {
            curPill.classList.add('selected');
            selectedStyle = currentExp;
            updateGo();
        }
    }
})();
