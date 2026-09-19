/* Kiki's film: a cinematic one minute walkthrough with a rigged, textured Kiki,
   parallax camera, real site footage, lip sync from browser speech, music and a dance. */
(function () {
  'use strict';
  var root = document.getElementById('kvid');
  if (!root || !window.Kiki) return;
  var BASE = 'assets/kiki/';

  root.innerHTML =
    '<div class="kv-vp"><div class="kv-stage">' +
      '<div class="kv-layer kv-bg"><i class="kv-win"></i><i class="kv-ray r1"></i><i class="kv-ray r2"></i><i class="kv-bokeh b1"></i><i class="kv-bokeh b2"></i><i class="kv-bokeh b3"></i><i class="kv-bokeh b4"></i><i class="kv-shelf"></i><i class="kv-plant"></i></div>' +
      '<div class="kv-layer kv-mid"><div class="kv-browser"><div class="kv-bar"><i></i><i></i><i></i><span class="kv-url">solviqo.com</span></div><div class="kv-view">' +
        '<div class="kv-sc sc-mess"><div class="xl"><div class="xl-t">orders_FINAL_v7 (2).xlsx</div><div class="xl-g">' + Array(49).join('<i></i>') + '</div>' +
          '<span class="tag t1">v3_final</span><span class="tag t2">v7 (2)</span><span class="tag t3">USE THIS ONE</span></div><span class="bug"></span></div>' +
        '<div class="kv-sc sc-site"><img src="' + BASE + 'site-home.jpg" alt=""></div>' +
        '<div class="kv-sc sc-serv"><img src="' + BASE + 'site-services.jpg" alt=""><i class="hl h1"></i><i class="hl h2"></i><i class="hl h3"></i></div>' +
        '<div class="kv-sc sc-app"><div class="ap"><div class="ap-h"><b>Operations</b><span>Live</span></div>' +
          '<div class="ap-k"><div><small>Requests</small><b class="n1">1,284</b></div><div><small>On time</small><b>98%</b></div><div><small>Waiting on you</small><b class="n3">1</b></div></div>' +
          '<div class="ap-r"><p><b>#218</b> 12 laptops, design team<span class="st">Awaiting approval</span></p><p><b>#217</b> Site inspection, Tower B<span class="ok">Done</span></p><p><b>#216</b> Supplier invoice 212<span class="ok">Paid</span></p></div>' +
          '<div class="ap-t">Reminder sent to Meera automatically</div></div></div>' +
        '<div class="kv-sc sc-est"><img src="' + BASE + 'site-est.jpg" alt=""><div class="est-pop"><small>YOUR ESTIMATE</small><b><span class="lo">3</span> to <span class="hi">5</span> weeks</b><em>Fixed price, agreed first</em></div></div>' +
        '<div class="kv-sc sc-live"><div class="lv"><span class="dot"></span>Live</div><p>Your team is using it</p></div>' +
        '<div class="kv-sc sc-cta"><div class="cal"><b>Book a 20 minute call</b><div class="d"><span>Mon</span><span>Tue</span><span class="p">Wed</span><span>Thu</span><span>Fri</span></div><div class="slots"><span>10:00</span><span class="p">11:30</span><span>15:00</span></div></div></div>' +
      '</div><span class="kv-cur"></span></div>' +
      '<div class="kv-phone"><div class="kp-scr"><small>NEEDS YOU</small><b>12 laptops</b><p>$14,400 · budget OK</p><span class="kp-btn">Approve</span></div></div></div>' +
      '<div class="kv-layer kv-desk"><i class="kv-edge"></i><i class="kv-mug"></i><i class="kv-note"></i></div>' +
      '<svg class="kv-layer kv-char" viewBox="0 0 1280 720"><g id="kvKiki"></g></svg>' +
      '<div class="kv-layer kv-fg"><i class="kv-leaf"></i></div>' +
      '<div class="kv-disco"></div><div class="kv-confetti"></div>' +
      '<div class="kv-vig"></div><div class="kv-grain"></div>' +
      '<div class="kv-title"><b>Kiki</b><small>for Solviqo</small></div>' +
      '<div class="kv-cap" aria-live="polite"></div>' +
      '<button class="kv-big" type="button"><span class="pl"><svg viewBox="0 0 24 24"><path d="M8 5l11 7-11 7z" fill="currentColor"/></svg></span><b>Watch Kiki show you around</b><small>about 1 minute · sound on</small></button>' +
    '</div></div>' +
    '<div class="vsl-ctl kv-ctl"><button type="button" class="vc-play" aria-label="Play or pause"></button><button type="button" class="vc-re" aria-label="Restart"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg></button><div class="vc-bar"></div><button type="button" class="vc-mute" aria-label="Mute or unmute"></button></div>';

  var vp = root.querySelector('.kv-vp'), stage = root.querySelector('.kv-stage'), cap = root.querySelector('.kv-cap');
  var L = { bg: root.querySelector('.kv-bg'), mid: root.querySelector('.kv-mid'), desk: root.querySelector('.kv-desk'), ch: root.querySelector('.kv-char'), fg: root.querySelector('.kv-fg') };
  function fit() { stage.style.transform = 'scale(' + vp.clientWidth / 1280 + ')'; stage.classList.toggle('small', vp.clientWidth < 700); }
  addEventListener('resize', fit); fit();

  var kk = window.Kiki(document.getElementById('kvKiki'), { x: 300, y: 640, scale: 1.12 }).pose('idle').expr('happy').start();
  kk.moveTo(-160, 640);

  /* camera with parallax */
  var cam = { x: 0, y: 0, z: 1 }, camT = { x: 0, y: 0, z: 1 };
  function camera(x, y, z) { camT = { x: x, y: y, z: z }; }
  (function camLoop() {
    cam.x += (camT.x - cam.x) * .045; cam.y += (camT.y - cam.y) * .045; cam.z += (camT.z - cam.z) * .045;
    [['bg', .35], ['mid', .75], ['desk', 1], ['ch', 1], ['fg', 1.35]].forEach(function (p) {
      var f = p[1], z = 1 + (cam.z - 1) * f;
      L[p[0]].style.transform = 'translate(' + (-cam.x * f).toFixed(1) + 'px,' + (-cam.y * f).toFixed(1) + 'px) scale(' + z.toFixed(4) + ')';
    });
    requestAnimationFrame(camLoop);
  })();

  function scene(name) { stage.setAttribute('data-sc', name); }
  function q(s) { return root.querySelector(s); }
  function cursor(x, y, click) { var c = q('.kv-cur'); c.style.transform = 'translate(' + x + 'px,' + y + 'px)'; if (click) { c.classList.remove('clk'); void c.offsetWidth; c.classList.add('clk'); } }

  /* music: soft pad throughout, a beat for the dance */
  var AC = null, master = null, padGain = null, beatOn = false, nextBeat = 0, beatIdx = 0, padTimer = null;
  function audioInit() {
    if (AC) return;
    var C = window.AudioContext || window.webkitAudioContext; if (!C) return;
    AC = new C(); master = AC.createGain(); master.gain.value = .9; master.connect(AC.destination);
    padGain = AC.createGain(); padGain.gain.value = .0; padGain.connect(master);
    var lp = AC.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900; lp.connect(padGain);
    var chords = [[220, 277.2, 329.6, 440], [196, 246.9, 293.7, 392], [174.6, 220, 261.6, 349.2], [196, 246.9, 311.1, 392]], ci = 0;
    function chord() {
      var t = AC.currentTime;
      chords[ci % 4].forEach(function (f) {
        var o = AC.createOscillator(), g = AC.createGain(); o.type = 'triangle'; o.frequency.value = f / 2;
        g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.05, t + 1.2); g.gain.linearRampToValueAtTime(0, t + 4.2);
        o.connect(g); g.connect(lp); o.start(t); o.stop(t + 4.3);
      });
      ci++;
    }
    chord(); padTimer = setInterval(chord, 4000);
    (function sched() {
      if (beatOn && AC) {
        while (nextBeat < AC.currentTime + .15) { playBeat(nextBeat, beatIdx++); nextBeat += 60 / 124 / 2; }
      }
      setTimeout(sched, 40);
    })();
  }
  function noise(t, dur, hp, gain) {
    var b = AC.createBuffer(1, AC.sampleRate * dur, AC.sampleRate), d = b.getChannelData(0);
    for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    var s = AC.createBufferSource(), f = AC.createBiquadFilter(), g = AC.createGain();
    s.buffer = b; f.type = 'highpass'; f.frequency.value = hp; g.gain.setValueAtTime(gain, t); g.gain.exponentialRampToValueAtTime(.001, t + dur);
    s.connect(f); f.connect(g); g.connect(master); s.start(t);
  }
  function playBeat(t, i) {
    if (i % 4 === 0) { var o = AC.createOscillator(), g = AC.createGain(); o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(40, t + .14); g.gain.setValueAtTime(.55, t); g.gain.exponentialRampToValueAtTime(.001, t + .22); o.connect(g); g.connect(master); o.start(t); o.stop(t + .25); }
    if (i % 8 === 4) noise(t, .16, 1200, .22);
    noise(t, .04, 7000, i % 2 ? .05 : .09);
    if (i % 2 === 0) { var bo = AC.createOscillator(), bg = AC.createGain(), notes = [55, 55, 65.4, 49]; bo.type = 'sawtooth'; bo.frequency.value = notes[Math.floor(i / 8) % 4]; bg.gain.setValueAtTime(.07, t); bg.gain.exponentialRampToValueAtTime(.001, t + .2); var bl = AC.createBiquadFilter(); bl.type = 'lowpass'; bl.frequency.value = 400; bo.connect(bl); bl.connect(bg); bg.connect(master); bo.start(t); bo.stop(t + .22); }
  }
  function pad(level) { if (padGain) padGain.gain.setTargetAtTime(muted ? 0 : level, AC.currentTime, .4); }
  function beat(on) { if (!AC) return; beatOn = on && !muted; nextBeat = AC.currentTime + .05; beatIdx = 0; }

  /* speech with viseme lip sync */
  var synth = window.speechSynthesis || null, voice = null, muted = !synth;
  function pickVoice() {
    if (!synth) return;
    var vs = synth.getVoices(), pref = ['Ava (Premium)', 'Zoe (Premium)', 'Ava (Enhanced)', 'Samantha (Enhanced)', 'Google UK English Female', 'Microsoft Aria Online', 'Microsoft Jenny Online', 'Samantha', 'Karen', 'Moira', 'Tessa', 'Google US English'];
    for (var i = 0; i < pref.length; i++) for (var j = 0; j < vs.length; j++) if (vs[j].name.indexOf(pref[i]) > -1) { voice = vs[j]; return; }
    for (j = 0; j < vs.length; j++) if (/^en/i.test(vs[j].lang)) { voice = vs[j]; return; }
  }
  if (synth) { pickVoice(); synth.addEventListener && synth.addEventListener('voiceschanged', pickVoice); }
  function visemes(word) {
    var w = word.toLowerCase().replace(/[^a-z]/g, ''), out = [];
    for (var i = 0; i < w.length; i++) {
      var c = w[i];
      if ('mbp'.indexOf(c) > -1) out.push('M'); else if ('fv'.indexOf(c) > -1) out.push('F');
      else if (c === 'o' || c === 'u' || c === 'w') out.push('O'); else if (c === 'a') out.push('A');
      else if (c === 'e' || c === 'i' || c === 'y') out.push('E');
    }
    return out.length ? out : ['E'];
  }
  var visT = [];
  function speakWord(word, ms) {
    visT.forEach(clearTimeout); visT = [];
    var v = visemes(word), step = Math.max(60, ms / (v.length + 1));
    v.forEach(function (m, i) { visT.push(setTimeout(function () { kk.mouth(m); }, i * step)); });
    visT.push(setTimeout(function () { kk.mouth('rest'); }, v.length * step + 20));
  }

  /* the script */
  var SEG = [
    { say: 'Hey! I am Kiki. Small, a bit nosy, and very good at finding problems nobody else spots.', min: 5.5,
      go: function () { scene('mess'); camera(-120, 20, 1.18); kk.walkTo(300, 640, 1.6).face(1).pose('wave').expr('happy').look(.6, -.2);
        at(2600, function () { kk.pose('idle'); }); } },
    { say: 'Like this one. Seven versions of the same spreadsheet, and nobody knows which one is real.', min: 6,
      go: function () { camera(40, 0, 1.08); kk.prop('magnifier').pose('magnify').expr('curious').look(1, -.4, true);
        at(600, function () { q('.sc-mess').classList.add('bugs'); }); at(3800, function () { kk.expr('focus'); }); } },
    { say: 'So I work with Solviqo. They build the app your team actually needs, around the way you already work.', min: 6.5,
      go: function () { kk.prop(null).pose('point').expr('happy').look(1, 0, true); scene('site'); camera(120, -10, 1.02); kk.walkTo(330, 640, 1);
        at(900, function () { q('.sc-site').classList.add('scroll'); }); } },
    { say: 'Web apps. Internal tools. Integrations that end the copy and paste. And dashboards people actually open.', min: 7,
      go: function () { scene('serv'); camera(160, -20, 1.06); kk.pose('point').expr('curious');
        at(300, function () { q('.sc-serv').setAttribute('data-h', 1); cursor(560, 170); });
        at(1900, function () { q('.sc-serv').setAttribute('data-h', 2); cursor(560, 300); kk.turnHead(-4); });
        at(3500, function () { q('.sc-serv').setAttribute('data-h', 3); cursor(560, 420); kk.expr('happy'); }); } },
    { say: 'Approvals take one tap. Reminders chase people for you. And the reports? They build themselves.', min: 7,
      go: function () { scene('app'); camera(60, 10, 1.1); kk.prop('phone').pose('phone').expr('focus').look(.4, .6, true);
        at(1500, function () { q('.kv-phone').classList.add('tap'); kk.expr('happy'); }); at(2400, function () { q('.sc-app').classList.add('done'); });
        at(3600, function () { q('.sc-app').classList.add('remind'); kk.prop(null).pose('thumbs').look(1, 0); }); } },
    { say: 'You know the price and the date before anything starts. Most first releases go live in about four weeks.', min: 7,
      go: function () { scene('est'); camera(140, -10, 1.04); kk.pose('point').expr('proud');
        at(700, function () { cursor(250, 170, true); }); at(1500, function () { cursor(430, 170, true); q('.sc-est').classList.add('pop'); }); } },
    { say: 'Which, honestly, deserves a little dance.', min: 9.5, dance: true,
      go: function () { scene('live'); camera(-60, 30, 1.2); kk.pose('cheer').expr('wow');
        at(1500, function () { stage.classList.add('party'); beat(true); pad(.25); kk.dance(true).expr('happy'); confetti(); });
        at(8600, function () { kk.dance(false).pose('idle'); stage.classList.remove('party'); beat(false); pad(1); }); } },
    { say: 'Book a twenty minute call below. Tell us what is broken. I will bring the magnifier.', min: 6.5,
      go: function () { scene('cta'); camera(0, 0, 1.1); kk.pose('pointDown').expr('happy').look(.4, 1, true);
        at(3600, function () { kk.pose('wave').look(-.2, 0); }); } }
  ];
  var bars = root.querySelector('.vc-bar');
  bars.innerHTML = SEG.map(function () { return '<span><i></i></span>'; }).join('');
  bars = bars.querySelectorAll('i');

  var timers = [], playing = false, idx = 0, runId = 0, words = [], wordT = null, segStart = 0;
  function at(ms, fn) { var my = runId; timers.push(setTimeout(function () { if (my === runId && playing) fn(); }, ms)); }
  function clearAll() { timers.forEach(clearTimeout); timers = []; clearInterval(wordT); visT.forEach(clearTimeout); }
  function confetti() {
    var box = q('.kv-confetti'); box.innerHTML = '';
    for (var i = 0; i < 70; i++) {
      var c = document.createElement('i');
      c.style.left = (Math.random() * 100) + '%'; c.style.background = ['#E8890C', '#FFB547', '#4C7DFF', '#34D399', '#F6E7CD'][i % 5];
      c.style.animationDelay = (Math.random() * 1.2) + 's'; c.style.animationDuration = (2.2 + Math.random() * 1.6) + 's';
      c.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)'; box.appendChild(c);
    }
  }
  function hl(n) {
    cap.querySelectorAll('span').forEach(function (s, k) { s.className = k < n ? 'd' : k === n ? 'on' : ''; });
    bars.forEach(function (b, k) { b.style.width = k < idx ? '100%' : k === idx ? (Math.min(1, (n + 1) / words.length) * 100) + '%' : '0'; });
  }
  function charToWord(ci) { var c = 0; for (var k = 0; k < words.length; k++) { c += words[k].length + 1; if (ci < c) return k; } return words.length - 1; }

  function runSeg(i) {
    clearAll(); var my = ++runId;
    if (i >= SEG.length) { finish(); return; }
    idx = i; var S = SEG[i]; segStart = performance.now();
    words = S.say.split(' '); cap.innerHTML = words.map(function (w) { return '<span>' + w + '</span>'; }).join(' ');
    hl(0); S.go();
    var spoken = false, minDone = false, got = false;
    function maybeNext() { if (my !== runId || !playing) return; if (spoken && minDone) { kk.talking(false); setTimeout(function () { if (my === runId && playing) runSeg(i + 1); }, 250); } }
    at(S.min * 1000, function () { minDone = true; maybeNext(); });
    function said() { if (my !== runId) return; spoken = true; hl(words.length); kk.talking(false); pad(1); maybeNext(); }
    function timerWords(ms) {
      clearInterval(wordT); var k = 0; speakWord(words[0], ms);
      wordT = setInterval(function () { if (my !== runId) return clearInterval(wordT); k++; if (k < words.length) { hl(k); speakWord(words[k], ms); } else { clearInterval(wordT); if (muted) said(); else at(1500, said); } }, ms);
    }
    var delay = i === 0 ? 900 : 350;
    at(delay, function () {
      kk.talking(true); pad(.35);
      if (!muted && synth) {
        var u = new SpeechSynthesisUtterance(S.say);
        if (voice) { u.voice = voice; u.lang = voice.lang; }
        u.rate = .98; u.pitch = 1.18;
        u.onboundary = function (e) { if (my !== runId) return; if (!got) { got = true; clearInterval(wordT); } var w = charToWord(e.charIndex); hl(w); speakWord(words[w], Math.min(420, 70 * words[w].length)); };
        u.onend = said; u.onerror = function () { if (my === runId) { muted = true; ui(); timerWords(330); } };
        synth.cancel(); synth.speak(u);
        at(700, function () { if (!got) timerWords(320); });
      } else timerWords(340);
    });
  }
  function finish() { playing = false; clearAll(); kk.talking(false); kk.pose('wave').expr('happy'); ui(); root.classList.add('ended'); pad(.6); }
  function play(from) {
    audioInit(); if (AC && AC.state === 'suspended') AC.resume();
    root.classList.add('started'); root.classList.remove('ended'); playing = true; ui(); pad(1);
    if (!from) { kk.moveTo(-160, 640); kk.dance(false); stage.classList.remove('party'); q('.sc-mess').classList.remove('bugs'); ['.sc-site', '.sc-app', '.sc-est'].forEach(function (s) { q(s).className = q(s).className.replace(/ (scroll|done|remind|pop)/g, ''); }); q('.kv-phone').classList.remove('tap'); }
    runSeg(from || 0);
  }
  function pause() { playing = false; runId++; clearAll(); if (synth) synth.cancel(); kk.talking(false); kk.dance(false); beat(false); stage.classList.remove('party'); pad(.4); ui(); }
  var bPlay = root.querySelector('.vc-play'), bMute = root.querySelector('.vc-mute');
  var PLAY = '<svg viewBox="0 0 24 24"><path d="M8 5l11 7-11 7z" fill="currentColor"/></svg>', PAUSE = '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>';
  var SOUND = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12"/></svg>', MUTED = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 9l6 6M22 9l-6 6"/></svg>';
  function ui() { bPlay.innerHTML = playing ? PAUSE : PLAY; bMute.innerHTML = muted ? MUTED : SOUND; }
  q('.kv-big').onclick = function () { pickVoice(); play(0); };
  bPlay.onclick = function () { if (playing) pause(); else play(root.classList.contains('ended') ? 0 : idx); };
  root.querySelector('.vc-re').onclick = function () { pause(); play(0); };
  bMute.onclick = function () { muted = !muted; if (master) master.gain.value = muted ? 0 : .9; ui(); if (playing) { var i = idx; pause(); play(i); } };
  addEventListener('pagehide', function () { if (synth) synth.cancel(); });
  document.addEventListener('visibilitychange', function () { if (document.hidden && playing) pause(); });
  window.__kv = { play: play, pause: pause, seg: function (i) { pause(); play(i); }, mute: function () { muted = true; ui(); } };
  scene('mess'); camera(-60, 10, 1.12); kk.moveTo(300, 640).pose('wave').expr('happy'); ui();
})();
