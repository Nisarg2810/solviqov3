/* Sweep, the Solviqo mascot: character poses and a one minute mascot video (browser speech, lip sync, captions). */
(function () {
  'use strict';
  var uid = 0;
  function sweep(cls) {
    var g = 'swg' + (++uid);
    return '<g class="sw ' + (cls || '') + '">' +
      '<defs><linearGradient id="' + g + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#34405a"/><stop offset="1" stop-color="#121722"/></linearGradient></defs>' +
      '<g class="sw-trail"><g transform="translate(-118,18) rotate(-14) scale(.42)"><polyline points="-27,-30 28,0 -27,30" fill="none" stroke="#5B6779" stroke-width="18" stroke-linecap="square"/></g>' +
        '<g transform="translate(-94,8) rotate(-8) scale(.55)"><polyline points="-27,-30 28,0 -27,30" fill="none" stroke="#9FAABA" stroke-width="18" stroke-linecap="square"/></g>' +
        '<g transform="translate(-68,-2) scale(.7)"><polyline points="-27,-30 28,0 -27,30" fill="none" stroke="#E8890C" stroke-width="18" stroke-linecap="square"/></g></g>' +
      '<g class="sw-float">' +
        '<ellipse class="sw-glow" cx="0" cy="74" rx="36" ry="7" fill="#E8890C"/>' +
        '<g class="sw-ant"><line x1="0" y1="-50" x2="0" y2="-70" stroke="#9FAABA" stroke-width="4" stroke-linecap="round"/><circle class="sw-bulb" cx="0" cy="-74" r="7" fill="#E8890C"/></g>' +
        '<g class="sw-armL"><rect x="-70" y="-6" width="20" height="38" rx="10" fill="#243049" stroke="rgba(255,255,255,.12)"/></g>' +
        '<g class="sw-armR"><rect x="50" y="-6" width="20" height="38" rx="10" fill="#243049" stroke="rgba(255,255,255,.12)"/></g>' +
        '<rect x="-54" y="-52" width="108" height="106" rx="36" fill="url(#' + g + ')" stroke="rgba(255,255,255,.16)" stroke-width="1.5"/>' +
        '<path d="M-38 -40 Q -28 -48 -10 -49" stroke="rgba(255,255,255,.35)" stroke-width="3" fill="none" stroke-linecap="round"/>' +
        '<rect x="-42" y="-34" width="84" height="54" rx="19" fill="#070a11" stroke="rgba(76,125,255,.45)" stroke-width="1.5"/>' +
        '<g class="sw-eyes"><rect class="sw-eye" x="-25" y="-22" width="13" height="19" rx="6.5" fill="#BFD4F5"/><rect class="sw-eye" x="12" y="-22" width="13" height="19" rx="6.5" fill="#BFD4F5"/></g>' +
        '<g class="sw-joy"><path d="M-27 -10 Q -18.5 -22 -10 -10" stroke="#BFD4F5" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M10 -10 Q 18.5 -22 27 -10" stroke="#BFD4F5" stroke-width="4" fill="none" stroke-linecap="round"/></g>' +
        '<ellipse cx="-31" cy="6" rx="5" ry="3" fill="#E8890C" opacity=".35"/><ellipse cx="31" cy="6" rx="5" ry="3" fill="#E8890C" opacity=".35"/>' +
        '<g class="sw-mouth" data-m="0"><path class="sw-m0" d="M-9 5 L0 11 L9 5" stroke="#E8890C" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
          '<ellipse class="sw-m1" cx="0" cy="8" rx="7" ry="3.6" fill="#E8890C"/><ellipse class="sw-m2" cx="0" cy="9" rx="8" ry="6.5" fill="#E8890C"/><ellipse class="sw-m3" cx="0" cy="9" rx="5" ry="6" fill="#E8890C"/></g>' +
        '<g transform="translate(0,36) scale(.16)"><g fill="none" stroke-width="22" stroke-linecap="square"><g transform="translate(-50,48) rotate(-25) scale(.62)" stroke="#5B6779"><polyline points="-27,-30 28,0 -27,30"/></g><g transform="translate(-2,8) rotate(-12) scale(.82)" stroke="#9FAABA"><polyline points="-27,-30 28,0 -27,30"/></g><g transform="translate(52,-48) rotate(2) scale(1.05)" stroke="#E8890C"><polyline points="-27,-30 28,0 -27,30"/></g></g></g>' +
        '<g class="sw-dots"><circle cx="58" cy="-66" r="4" fill="#9FAABA"/><circle cx="72" cy="-80" r="5.5" fill="#9FAABA"/><circle cx="90" cy="-96" r="7" fill="#9FAABA"/></g>' +
      '</g></g>';
  }
  window.solviqoSweep = sweep;

  /* pose sheet */
  document.querySelectorAll('[data-pose]').forEach(function (el) {
    el.innerHTML = '<svg viewBox="-140 -120 280 220" class="sw-svg">' + sweep(el.getAttribute('data-pose')) + '</svg>';
  });

  /* mascot video */
  var root = document.getElementById('mvsl');
  if (!root) return;
  var SEG = [
    { sc: 1, p: 'wave', t: 'Hi, I am Sweep, the little arrow behind Solviqo. My job is helping teams move faster.' },
    { sc: 2, p: 'think', t: 'Right now, your work probably lives in spreadsheets, group chats and endless email chains.' },
    { sc: 3, p: 'fly', t: 'We sweep that mess into one simple app, built around the way your team already works.' },
    { sc: 4, p: 'point', t: 'Approvals on your phone, live dashboards, and every tool you use, connected.' },
    { sc: 5, p: 'joy', t: 'You get a fixed price, a date in writing, and a first release in about four weeks.' },
    { sc: 6, p: 'wave', t: 'Tap below to book a twenty minute call. I will see you there.' }
  ];
  root.innerHTML =
    '<div class="vsl-vp"><div class="vsl-stage m-stage">' +
      '<div class="m-bg"></div>' +
      '<div class="m-screen">' +
        '<div class="ms ms0"><b>Meet Sweep</b><small>The Solviqo mascot</small></div>' +
        '<div class="ms ms1"><div class="m-logo">' + '<svg viewBox="0 0 240 240"><g fill="none" stroke-width="18" stroke-linecap="square"><g transform="translate(70,168) rotate(-25) scale(.62)" stroke="#5B6779"><polyline class="c1" points="-27,-30 28,0 -27,30"/></g><g transform="translate(118,128) rotate(-12) scale(.82)" stroke="#9FAABA"><polyline class="c2" points="-27,-30 28,0 -27,30"/></g><g transform="translate(172,72) rotate(2) scale(1.05)" stroke="#E8890C"><polyline class="c3" points="-27,-30 28,0 -27,30"/></g></g></svg></div><b>Solviqo</b></div>' +
        '<div class="ms ms2"><div class="mess"><span class="p1">orders_FINAL_v7.xlsx</span><span class="p2">Who approved this?</span><span class="p3">RE: RE: FW: urgent</span><span class="p4">Latest file?</span><span class="p5">Call supplier back</span></div></div>' +
        '<div class="ms ms3"><div class="mess gone"><span class="p1">orders_FINAL_v7.xlsx</span><span class="p2">Who approved this?</span><span class="p3">RE: RE: FW: urgent</span><span class="p4">Latest file?</span><span class="p5">Call supplier back</span></div>' +
          '<div class="m-app"><b class="hd"></b><div class="r"><b></b><b></b><b></b></div><b class="l"></b><b class="l s"></b><b class="l"></b></div></div>' +
        '<div class="ms ms4"><div class="m-ph"><small>NEEDS YOU</small><b>Purchase $2,400</b><span>Approve</span></div><div class="m-dash"><i style="--h:40%"></i><i style="--h:65%"></i><i style="--h:50%"></i><i style="--h:85%" class="a"></i></div>' +
          '<div class="m-nodes"><span>CRM</span><span>ERP</span><span>PAY</span></div></div>' +
        '<div class="ms ms5"><div class="wks"><p><em>Week 1</em><i></i></p><p><em>Week 2</em><i></i></p><p><em>Week 3</em><i></i></p><p><em>Week 4</em><i class="g"></i></p></div><span class="price">Fixed price &#10003;</span></div>' +
        '<div class="ms ms6"><div class="cal"><b class="mo">Pick a time</b><div class="days"><span>M</span><span>T</span><span class="pick">W</span><span>T</span><span>F</span></div><span class="slot">20 min call</span></div><span class="down">&#8595;</span></div>' +
      '</div>' +
      '<svg class="m-guy" viewBox="0 0 640 360" aria-hidden="true"><g class="m-pos">' + sweep('') + '</g></svg>' +
      '<div class="vsl-cap" aria-live="polite"></div>' +
      '<button class="vsl-big" type="button"><span class="pl"><svg viewBox="0 0 24 24"><path d="M8 5l11 7-11 7z" fill="currentColor"/></svg></span><b>Meet Sweep, in one minute</b><small>Sound on</small></button>' +
    '</div></div>' +
    '<div class="vsl-ctl"><button type="button" class="vc-play" aria-label="Play or pause"></button><button type="button" class="vc-re" aria-label="Restart"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg></button>' +
      '<div class="vc-bar">' + SEG.map(function () { return '<span><i></i></span>'; }).join('') + '</div>' +
      '<button type="button" class="vc-mute" aria-label="Mute or unmute"></button></div>';

  var vp = root.querySelector('.vsl-vp'), stage = root.querySelector('.vsl-stage'), cap = root.querySelector('.vsl-cap');
  var sw = root.querySelector('.m-guy .sw'), mouth = sw.querySelector('.sw-mouth'), big = root.querySelector('.vsl-big');
  var bPlay = root.querySelector('.vc-play'), bRe = root.querySelector('.vc-re'), bMute = root.querySelector('.vc-mute');
  var bars = root.querySelectorAll('.vc-bar i');
  function fit() { stage.style.transform = 'scale(' + vp.clientWidth / 640 + ')'; }
  addEventListener('resize', fit); fit();
  var PLAY = '<svg viewBox="0 0 24 24"><path d="M8 5l11 7-11 7z" fill="currentColor"/></svg>';
  var PAUSE = '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>';
  var SOUND = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12"/></svg>';
  var MUTED = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 9l6 6M22 9l-6 6"/></svg>';

  var synth = window.speechSynthesis || null, voice = null;
  var muted = !synth, playing = false, idx = 0, runId = 0, words = [], flapT = null, wordT = null;
  function pickVoice() {
    if (!synth) return;
    var vs = synth.getVoices();
    var pref = ['Samantha', 'Google UK English Female', 'Microsoft Aria', 'Microsoft Jenny', 'Google US English', 'Karen', 'Tessa', 'Moira'];
    for (var i = 0; i < pref.length; i++) for (var j = 0; j < vs.length; j++) if (vs[j].name.indexOf(pref[i]) > -1) { voice = vs[j]; return; }
    for (j = 0; j < vs.length; j++) if (/^en/i.test(vs[j].lang)) { voice = vs[j]; return; }
  }
  if (synth) { pickVoice(); synth.addEventListener && synth.addEventListener('voiceschanged', pickVoice); }

  function pose(p) { sw.setAttribute('class', 'sw ' + (p || '')); }
  function talk(on) {
    clearInterval(flapT); sw.classList.toggle('talk', on);
    if (!on) { mouth.setAttribute('data-m', '0'); return; }
    flapT = setInterval(function () { var r = Math.random(); mouth.setAttribute('data-m', r < .2 ? 0 : r < .5 ? 1 : r < .8 ? 2 : 3); }, 95);
  }
  function renderCap(i) { words = SEG[i].t.split(' '); cap.innerHTML = words.map(function (w) { return '<span>' + w + '</span>'; }).join(' '); }
  function hl(n) {
    cap.querySelectorAll('span').forEach(function (s, k) { s.className = k < n ? 'd' : k === n ? 'on' : ''; });
    bars.forEach(function (b, k) { b.style.width = k < idx ? '100%' : k === idx ? (Math.min(1, (n + 1) / words.length) * 100) + '%' : '0'; });
  }
  function charToWord(ci) { var c = 0; for (var k = 0; k < words.length; k++) { c += words[k].length + 1; if (ci < c) return k; } return words.length - 1; }
  function runSeg(i) {
    var my = ++runId;
    if (i >= SEG.length) { finish(); return; }
    idx = i; stage.setAttribute('data-sc', SEG[i].sc); pose(SEG[i].p); renderCap(i); hl(0); talk(true);
    var got = false;
    function next() { if (my !== runId || !playing) return; clearInterval(wordT); talk(false); hl(words.length); setTimeout(function () { if (my === runId && playing) runSeg(i + 1); }, 450); }
    function wordTimer(ms) {
      clearInterval(wordT); var k = 0;
      wordT = setInterval(function () {
        if (my !== runId) return clearInterval(wordT);
        k++; if (k < words.length) hl(k); else { clearInterval(wordT); if (muted) next(); else setTimeout(function () { if (my === runId) next(); }, 1600); }
      }, ms);
    }
    if (!muted && synth) {
      var u = new SpeechSynthesisUtterance(SEG[i].t);
      if (voice) { u.voice = voice; u.lang = voice.lang; }
      u.rate = 1.04; u.pitch = 1.35;
      u.onboundary = function (e) { if (my !== runId) return; if (!got) { got = true; clearInterval(wordT); } hl(charToWord(e.charIndex)); };
      u.onend = next; u.onerror = function () { if (my === runId) { muted = true; ui(); wordTimer(340); } };
      synth.cancel(); synth.speak(u);
      setTimeout(function () { if (my === runId && !got) wordTimer(330); }, 650);
    } else wordTimer(340);
  }
  function finish() { playing = false; talk(false); pose('joy'); ui(); root.classList.add('ended'); }
  function play(from) { root.classList.add('started'); root.classList.remove('ended'); playing = true; ui(); runSeg(from || 0); }
  function pause() { playing = false; runId++; clearInterval(wordT); if (synth) synth.cancel(); talk(false); ui(); }
  function ui() { bPlay.innerHTML = playing ? PAUSE : PLAY; bMute.innerHTML = muted ? MUTED : SOUND; }
  big.onclick = function () { pickVoice(); play(0); };
  bPlay.onclick = function () { if (playing) pause(); else play(root.classList.contains('ended') ? 0 : idx); };
  bRe.onclick = function () { pause(); play(0); };
  bMute.onclick = function () { if (!synth) return; muted = !muted; ui(); if (playing) { runId++; synth.cancel(); clearInterval(wordT); runSeg(idx); } };
  addEventListener('pagehide', function () { if (synth) synth.cancel(); });
  document.addEventListener('visibilitychange', function () { if (document.hidden && playing) pause(); });
  stage.setAttribute('data-sc', 0); pose('wave'); ui();
})();
