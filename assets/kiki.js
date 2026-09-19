/* Kiki, the Solviqo mongoose. A textured, fully rigged SVG character.
   window.Kiki(svgGroup, opts) returns a controller: pose(), expr(), mouthShape(), prop(), look(), walkTo(), dance(), snap(). */
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg', uid = 0;
  var BASE = (document.currentScript && document.currentScript.src || '').replace(/assets\/kiki\.js.*$/, '');

  var POSES = {
    idle:   { sL: 12, eL: -8, sR: -12, eR: 8 },
    wave:   { sL: 12, eL: -8, sR: -150, eR: 0, waveR: 1 },
    point:  { sL: 12, eL: -8, sR: -92, eR: -6 },
    pointDown: { sL: 12, eL: -8, sR: -48, eR: -24 },
    think:  { sL: 26, eL: -168, sR: -14, eR: 10 },
    cheer:  { sL: 158, eL: 14, sR: -158, eR: -14 },
    thumbs: { sL: 12, eL: -8, sR: -58, eR: -92 },
    type:   { sL: -6, eL: -48, sR: 6, eR: 48 },
    magnify:{ sL: 12, eL: -8, sR: -60, eR: 210 },
    phone:  { sL: -20, eL: -120, sR: -20, eR: 150 },
    shrug:  { sL: 70, eL: -80, sR: -70, eR: 80 }
  };
  var EXPR = {
    neutral: { brow: 0, tilt: 0, mouth: 'rest', squint: 0 },
    happy:   { brow: 2, tilt: 0, mouth: 'smile', squint: .25 },
    curious: { brow: 4, tilt: 1, mouth: 'O', squint: 0 },
    focus:   { brow: -2, tilt: 0, mouth: 'M', squint: .2 },
    proud:   { brow: 1, tilt: 0, mouth: 'smile', squint: .4 },
    wow:     { brow: 5, tilt: 0, mouth: 'A', squint: 0 }
  };
  var MOUTHS = ['rest', 'smile', 'A', 'E', 'O', 'M', 'F'];

  function el(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  function Kiki(host, opts) {
    opts = opts || {};
    var id = 'kk' + (++uid), P = function (s) { return id + s; };
    var defs = el('defs', {}, host);
    defs.innerHTML =
      '<radialGradient id="' + P('fur') + '" cx="36%" cy="28%" r="78%"><stop offset="0" stop-color="#D9A871"/><stop offset=".55" stop-color="#A9743F"/><stop offset="1" stop-color="#6F4424"/></radialGradient>' +
      '<radialGradient id="' + P('head') + '" cx="38%" cy="30%" r="75%"><stop offset="0" stop-color="#DDAE78"/><stop offset=".6" stop-color="#AB7642"/><stop offset="1" stop-color="#744827"/></radialGradient>' +
      '<linearGradient id="' + P('limb') + '" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#C79460"/><stop offset="1" stop-color="#83532F"/></linearGradient>' +
      '<radialGradient id="' + P('belly') + '" cx="45%" cy="35%" r="70%"><stop offset="0" stop-color="#F6E7CD"/><stop offset="1" stop-color="#DDBC8F"/></radialGradient>' +
      '<radialGradient id="' + P('eye') + '" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#9A6431"/><stop offset=".55" stop-color="#4A2A13"/><stop offset="1" stop-color="#140A04"/></radialGradient>' +
      '<radialGradient id="' + P('nose') + '" cx="40%" cy="30%" r="80%"><stop offset="0" stop-color="#5a3e30"/><stop offset="1" stop-color="#150c07"/></radialGradient>' +
      '<linearGradient id="' + P('tail') + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#B98552"/><stop offset=".7" stop-color="#8E5C33"/><stop offset="1" stop-color="#5A3820"/></linearGradient>' +
      '<radialGradient id="' + P('lens') + '" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="rgba(255,255,255,.55)"/><stop offset=".5" stop-color="rgba(191,212,245,.18)"/><stop offset="1" stop-color="rgba(120,150,200,.3)"/></radialGradient>' +
      '<pattern id="' + P('tex') + '" width="80" height="80" patternUnits="userSpaceOnUse"><image href="' + BASE + 'assets/kiki/fur.png" width="80" height="80"/></pattern>' +
      '<filter id="' + P('soft') + '" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>';

    var root = el('g', { 'class': 'kk' }, host);
    var shadow = el('ellipse', { cx: 0, cy: 2, rx: 78, ry: 13, fill: 'rgba(0,0,0,.38)', filter: 'url(#' + P('soft') + ')' }, root);
    var feet = el('g', {}, root);
    var footL = el('g', {}, feet), footR = el('g', {}, feet);
    [footL, footR].forEach(function (f, i) {
      var s = i ? 1 : -1;
      el('ellipse', { cx: s * 27, cy: -10, rx: 27, ry: 11, fill: '#8A5A3C' }, f);
            el('path', { d: 'M' + (s * 27 + s * 8) + ' -6 l0 -5 M' + (s * 27 + s * 16) + ' -8 l0 -5', stroke: '#4a2d18', 'stroke-width': 2, 'stroke-linecap': 'round' }, f);
    });
    var bodyPiv = el('g', {}, root);
    var tailG = el('g', {}, bodyPiv);
    var tail = el('path', { fill: '#9C6B3F' }, tailG);
    var tailTex = el('path', { fill: 'none' }, tailG);
    var tailTip = el('path', { fill: '#6E4629' }, tailG);
    var armLBack = el('g', {}, bodyPiv);

    var bodyD = 'M-50 -64 C-66 -140 -46 -222 0 -230 C46 -222 66 -140 50 -64 C50 -8 -50 -8 -50 -64 Z';
    el('path', { d: bodyD, fill: '#B98552' }, bodyPiv);
    el('ellipse', { cx: -36, cy: -44, rx: 24, ry: 30, fill: '#B98552' }, bodyPiv);
    el('ellipse', { cx: 36, cy: -44, rx: 24, ry: 30, fill: '#B98552' }, bodyPiv);
    
    el('path', { d: 'M-30 -58 C-36 -130 -24 -192 0 -198 C24 -192 36 -130 30 -58 C24 -32 -24 -32 -30 -58 Z', fill: '#EBD3B0' }, bodyPiv);
        function arm(side) {
      var s = side === 'L' ? -1 : 1;
      var sh = el('g', {}, bodyPiv);
      el('rect', { x: -9, y: -9, width: 18, height: 62, rx: 9, fill: '#A77443' }, sh);
      var elb = el('g', {}, sh);
      el('rect', { x: -8, y: -8, width: 16, height: 54, rx: 8, fill: '#A77443' }, elb);
      var paw = el('g', { transform: 'translate(0,46)' }, elb);
      el('circle', { cx: 0, cy: 0, r: 10, fill: '#8A5A3C' }, paw);
      el('path', { d: 'M-5 5 l0 4 M0 6 l0 4 M5 5 l0 4', stroke: '#3e2413', 'stroke-width': 1.6, 'stroke-linecap': 'round' }, paw);
            var prop = el('g', {}, paw);
      return { sh: sh, elb: elb, prop: prop, s: s };
    }

    var head = el('g', {}, bodyPiv);
    var earL = el('g', {}, head), earR = el('g', {}, head);
    [earL, earR].forEach(function (e, i) {
      var s = i ? 1 : -1;
      el('circle', { cx: s * 42, cy: -302, r: 15, fill: '#9C6B3F' }, e);
      el('circle', { cx: s * 42, cy: -300, r: 8, fill: '#6E4629' }, e);
          });
    var headD = 'M-54 -262 C-56 -302 -26 -320 0 -320 C26 -320 56 -302 54 -262 C52 -230 28 -212 0 -210 C-28 -212 -52 -230 -54 -262 Z';
    el('path', { d: headD, fill: '#B98552' }, head);
            el('ellipse', { cx: -21, cy: -268, rx: 19, ry: 14, fill: '#8A5A3C', opacity: .5, transform: 'rotate(-12 -21 -268)' }, head);
    el('ellipse', { cx: 21, cy: -268, rx: 19, ry: 14, fill: '#8A5A3C', opacity: .5, transform: 'rotate(12 21 -268)' }, head);
    var eyes = [], lids = [];
    [-20, 20].forEach(function (x) {
      var eg = el('g', {}, head);
      el('circle', { cx: x, cy: -268, r: 12, fill: '#fff' }, eg);
      var look = el('g', {}, eg);
      el('circle', { cx: x + 1.5, cy: -267, r: 7.4, fill: '#161b26' }, look);
      el('circle', { cx: x + 4, cy: -270.5, r: 2.8, fill: '#fff' }, look);
      var lid = el('path', { d: 'M' + (x - 13.5) + ' -281 L' + (x + 13.5) + ' -281 L' + (x + 13.5) + ' -268 Q' + x + ' -262 ' + (x - 13.5) + ' -268 Z', fill: '#B98552' }, eg);
      eyes.push(look); lids.push({ el: lid, x: x });
    });
    var browL = el('path', { d: 'M-34 -289 Q-22 -295 -9 -290', stroke: '#4a2d18', 'stroke-width': 4.2, fill: 'none', 'stroke-linecap': 'round' }, head);
    var browR = el('path', { d: 'M9 -290 Q22 -295 34 -289', stroke: '#4a2d18', 'stroke-width': 4.2, fill: 'none', 'stroke-linecap': 'round' }, head);
    var muzD = 'M-22 -249 C-24 -232 -11 -221 0 -221 C11 -221 24 -232 22 -249 C13 -258 -13 -258 -22 -249 Z';
    el('path', { d: muzD, fill: '#EBD3B0' }, head);
    el('circle', { cx: -30, cy: -244, r: 7, fill: '#E07C6A', opacity: .16 }, head);
    el('circle', { cx: 30, cy: -244, r: 7, fill: '#E07C6A', opacity: .16 }, head);
    var mouthG = el('g', {}, head);
    var M = {};
    M.rest = '<path d="M0 -242 L0 -238" stroke="#3a2214" stroke-width="2" stroke-linecap="round"/><path d="M-8 -237 Q-4 -233 0 -237 Q4 -233 8 -237" stroke="#3a2214" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
    M.smile = '<path d="M0 -242 L0 -238" stroke="#3a2214" stroke-width="2" stroke-linecap="round"/><path d="M-11 -238 Q0 -226 11 -238 Q0 -234 -11 -238 Z" fill="#3a1612"/><ellipse cx="0" cy="-231.5" rx="4.5" ry="2" fill="#d0706a"/>';
    M.A = '<path d="M0 -243 L0 -240" stroke="#3a2214" stroke-width="2" stroke-linecap="round"/><path d="M-9 -239 Q0 -241 9 -239 Q7 -225 0 -224 Q-7 -225 -9 -239 Z" fill="#3a1612"/><ellipse cx="0" cy="-228.5" rx="5" ry="3" fill="#d0706a"/><rect x="-5" y="-240" width="10" height="3" rx="1.2" fill="#fbf6ef"/>';
    M.E = '<path d="M0 -243 L0 -240" stroke="#3a2214" stroke-width="2" stroke-linecap="round"/><path d="M-10 -239 Q0 -237 10 -239 Q6 -231 0 -230.5 Q-6 -231 -10 -239 Z" fill="#3a1612"/><rect x="-6" y="-239" width="12" height="3" rx="1.2" fill="#fbf6ef"/>';
    M.O = '<path d="M0 -243 L0 -240" stroke="#3a2214" stroke-width="2" stroke-linecap="round"/><ellipse cx="0" cy="-233" rx="5" ry="6" fill="#3a1612"/><ellipse cx="0" cy="-230.5" rx="2.8" ry="2" fill="#d0706a"/>';
    M.M = '<path d="M0 -242 L0 -238" stroke="#3a2214" stroke-width="2" stroke-linecap="round"/><path d="M-7 -236.5 Q0 -235 7 -236.5" stroke="#3a2214" stroke-width="3" fill="none" stroke-linecap="round"/>';
    M.F = '<path d="M0 -242 L0 -239" stroke="#3a2214" stroke-width="2" stroke-linecap="round"/><path d="M-8 -238 Q0 -235 8 -238" stroke="#3a2214" stroke-width="2.4" fill="none" stroke-linecap="round"/><rect x="-4" y="-238" width="8" height="3" rx="1" fill="#fbf6ef"/>';
    var nose = el('g', {}, head);
    el('ellipse', { cx: 0, cy: -248, rx: 8, ry: 5.6, fill: 'url(#' + P('nose') + ')' }, nose);
    el('ellipse', { cx: -2.4, cy: -250, rx: 2.8, ry: 1.4, fill: 'rgba(255,255,255,.55)' }, nose);
    
    var armL = arm('L'), armR = arm('R');

    var PROPS = {
      magnifier: '<g transform="rotate(160)"><rect x="-3.5" y="-30" width="7" height="34" rx="3.5" fill="#3b2a1d"/><rect x="-4.5" y="-34" width="9" height="8" rx="2" fill="#9FAABA"/>' +
        '<circle cx="0" cy="-56" r="21" fill="url(#' + P('lens') + ')" stroke="#E8890C" stroke-width="6"/><circle cx="0" cy="-56" r="21" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="1.5"/>' +
        '<path d="M-10 -66 Q-4 -73 5 -71" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/></g>',
      phone: '<g transform="rotate(-130) translate(-15,-40)"><rect width="30" height="54" rx="6" fill="#0d1119" stroke="#2a3140" stroke-width="2"/><rect x="3" y="5" width="24" height="42" rx="3" fill="#1c2f55"/>' +
        '<rect x="6" y="30" width="18" height="8" rx="2.5" fill="#E8890C" class="kk-ph-btn"/><rect x="6" y="10" width="14" height="3" rx="1.5" fill="rgba(255,255,255,.5)"/><rect x="6" y="16" width="10" height="3" rx="1.5" fill="rgba(255,255,255,.3)"/></g>',
      pencil: '<g transform="rotate(30)"><rect x="-3" y="-40" width="6" height="40" rx="1" fill="#E8890C"/><path d="M-3 -40 L0 -48 L3 -40 Z" fill="#F6E0C0"/><rect x="-3" y="-4" width="6" height="5" fill="#C98A78"/></g>'
    };

    var st = {
      x: opts.x || 0, y: opts.y || 0, s: opts.scale || 1, flip: 1,
      sL: 12, eL: -8, sR: -12, eR: 8, brow: 0, tilt: 0, headRot: 0, lookX: 0, lookY: 0, squint: 0,
      bodyRot: 0, hop: 0, squash: 0, waveR: 0
    };
    var tg = JSON.parse(JSON.stringify(st));
    var walk = null, danceT = -1, blinkT = 2 + Math.random() * 2, blinkV = 0, t0 = performance.now(), last = t0;
    var mouthNow = '', talking = false, lookT = 0, running = false;

    function setMouth(k) { if (k === mouthNow) return; mouthNow = k; mouthG.innerHTML = M[k] || M.rest; }
    setMouth('rest');

    function tailPath(t) {
      var n = 14, seg = 13, a = -0.3, x = 36, y = -52, pts = [];
      var wag = Math.sin(t * 2.1) * .06 + (danceT >= 0 ? Math.sin(t * 7) * .18 : 0);
      for (var i = 0; i <= n; i++) {
        pts.push([x, y]);
        a += (i < 5 ? -0.02 : -0.2) + wag * (i / n) * 1.6;
        x += Math.cos(a) * seg; y += Math.sin(a) * seg;
      }
      var L = [], R = [];
      for (i = 0; i <= n; i++) {
        var p = pts[i], q = pts[Math.min(n, i + 1)], r = pts[Math.max(0, i - 1)];
        var dx = q[0] - r[0], dy = q[1] - r[1], len = Math.hypot(dx, dy) || 1;
        var w = 17 * (1 - i / n) + 3.5;
        L.push([p[0] - dy / len * w, p[1] + dx / len * w]); R.push([p[0] + dy / len * w, p[1] - dx / len * w]);
      }
      var tipI = n - 4;
      function poly(a, b, from) {
        var s = 'M' + a[from][0].toFixed(1) + ' ' + a[from][1].toFixed(1);
        for (var k = from + 1; k < a.length; k++) s += ' L' + a[k][0].toFixed(1) + ' ' + a[k][1].toFixed(1);
        var end = pts[n]; s += ' Q' + (end[0] + (end[0] - pts[n - 1][0]) * 1.2).toFixed(1) + ' ' + (end[1] + (end[1] - pts[n - 1][1]) * 1.2).toFixed(1) + ' ' + b[b.length - 1][0].toFixed(1) + ' ' + b[b.length - 1][1].toFixed(1);
        for (k = b.length - 2; k >= from; k--) s += ' L' + b[k][0].toFixed(1) + ' ' + b[k][1].toFixed(1);
        return s + ' Z';
      }
      var d = poly(L, R, 0);
      tail.setAttribute('d', d); tailTex.setAttribute('d', d); tailTip.setAttribute('d', poly(L, R, tipI));
    }

    function render(now) {
      var dt = Math.min(.05, (now - last) / 1000); last = now;
      var t = (now - t0) / 1000;
      var k = 1 - Math.pow(.001, dt * 1.6);
      for (var key in tg) if (typeof tg[key] === 'number' && key !== 'x' && key !== 'y') st[key] += (tg[key] - st[key]) * k;
      if (walk) {
        var p = Math.min(1, (now - walk.t0) / walk.dur);
        var e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        st.x = walk.x0 + (walk.x1 - walk.x0) * e; st.y = walk.y0 + (walk.y1 - walk.y0) * e;
        if (p >= 1) { walk = null; }
      } else { st.x += (tg.x - st.x) * k; st.y += (tg.y - st.y) * k; }
      var stepPh = walk ? (now - walk.t0) / 1000 * 9 : 0;
      var bob = walk ? Math.abs(Math.sin(stepPh)) * 7 : 0;
      var breath = Math.sin(t * 2.2) * 0.012;
      var sL = st.sL, eL = st.eL, sR = st.sR, eR = st.eR, bodyRot = st.bodyRot, hop = st.hop, headRot = st.headRot + st.tilt * 7, sq = st.squash;
      if (st.waveR > .1) { eR += Math.sin(t * 9) * 26 * st.waveR; }
      if (danceT >= 0) {
        var b = (t - danceT) * 2.1, ph = Math.floor(b / 4) % 4, f = b % 1, beat = Math.sin(b * Math.PI);
        if (ph === 0) { bodyRot = Math.sin(b * Math.PI) * 9; sL = 20 + beat * 30; sR = -150 + beat * 25; eR = -10; eL = -10; headRot = -bodyRot * .6; hop = 0; }
        else if (ph === 1) { hop = Math.abs(Math.sin(b * Math.PI)) * 26; sL = 150; sR = -150; eL = Math.sin(b * 6) * 20; eR = -Math.sin(b * 6) * 20; bodyRot = 0; headRot = Math.sin(b * Math.PI * 2) * 8; }
        else if (ph === 2) { bodyRot = Math.sin(b * Math.PI * 2) * 6; sL = 70 + Math.sin(b * 12) * 10; eL = -90; sR = -70 - Math.sin(b * 12) * 10; eR = 90; sq = Math.abs(Math.sin(b * Math.PI * 2)) * .06; headRot = Math.sin(b * Math.PI * 2) * 10; hop = 0; }
        else { hop = Math.abs(Math.sin(b * Math.PI)) * 34; sL = 160 - beat * 40; sR = -160 + beat * 40; eL = 0; eR = 0; bodyRot = Math.sin(b * Math.PI) * 12; headRot = -bodyRot; }
        if (f < .12 && ph === 1) sq = .08;
      }
      var flip = st.flip;
      root.setAttribute('transform', 'translate(' + st.x.toFixed(1) + ',' + (st.y - 0).toFixed(1) + ') scale(' + (st.s * (flip < 0 ? -1 : 1)).toFixed(3) + ',' + st.s.toFixed(3) + ')');
      shadow.setAttribute('rx', (78 - hop * .6).toFixed(1));
      shadow.setAttribute('opacity', (1 - hop / 90).toFixed(2));
      var lift = hop + bob;
      bodyPiv.setAttribute('transform', 'translate(0,' + (-lift).toFixed(1) + ') rotate(' + bodyRot.toFixed(2) + ') scale(' + (1 + sq * .6).toFixed(3) + ',' + (1 + breath - sq).toFixed(3) + ')');
      var fl = walk ? Math.max(0, Math.sin(stepPh)) * 9 : hop * .9, fr = walk ? Math.max(0, -Math.sin(stepPh)) * 9 : hop * .9;
      footL.setAttribute('transform', 'translate(0,' + (-fl).toFixed(1) + ')');
      footR.setAttribute('transform', 'translate(0,' + (-fr).toFixed(1) + ')');
      head.setAttribute('transform', 'rotate(' + headRot.toFixed(2) + ' 0 -222) translate(0,' + (Math.sin(t * 2.2) * 1.2).toFixed(2) + ')');
      armL.sh.setAttribute('transform', 'translate(-44,-188) rotate(' + sL.toFixed(1) + ')');
      armL.elb.setAttribute('transform', 'translate(0,50) rotate(' + eL.toFixed(1) + ')');
      armR.sh.setAttribute('transform', 'translate(44,-188) rotate(' + sR.toFixed(1) + ')');
      armR.elb.setAttribute('transform', 'translate(0,50) rotate(' + eR.toFixed(1) + ')');
      earL.setAttribute('transform', 'rotate(' + (Math.sin(t * .7) * 3 + (danceT >= 0 ? Math.sin(t * 8) * 6 : 0)).toFixed(1) + ' -42 -290)');
      earR.setAttribute('transform', 'rotate(' + (-Math.sin(t * .9 + 1) * 3 - (danceT >= 0 ? Math.sin(t * 8) * 6 : 0)).toFixed(1) + ' 42 -290)');
      lookT -= dt;
      if (lookT < 0 && !tg.lookLock) { tg.lookX = (Math.random() - .5) * 1.2; tg.lookY = (Math.random() - .5) * .8; lookT = 1.2 + Math.random() * 2.5; }
      eyes.forEach(function (e) { e.setAttribute('transform', 'translate(' + (st.lookX * 3).toFixed(2) + ',' + (st.lookY * 2.5).toFixed(2) + ')'); });
      blinkT -= dt;
      if (blinkT < 0) { blinkV = 1; blinkT = 2.4 + Math.random() * 3.2; }
      blinkV = Math.max(0, blinkV - dt * 7);
      var lid = Math.max(st.squint, blinkV > .5 ? (1 - blinkV) * 2 : blinkV * 2);
      lids.forEach(function (l) { l.el.setAttribute('transform', 'translate(0,-281) scale(1,' + Math.max(.02, lid).toFixed(3) + ') translate(0,281)'); });
      browL.setAttribute('transform', 'translate(0,' + (-st.brow).toFixed(2) + ') rotate(' + (-st.brow * 1.2).toFixed(1) + ' -22 -291)');
      browR.setAttribute('transform', 'translate(0,' + (-st.brow).toFixed(2) + ') rotate(' + (st.brow * 1.2).toFixed(1) + ' 22 -291)');
      tailPath(t);
    }
    function loop(now) { render(now); if (running) requestAnimationFrame(loop); }

    var api = {
      el: root,
      start: function () { if (!running) { running = true; last = performance.now(); requestAnimationFrame(loop); } return api; },
      stop: function () { running = false; return api; },
      pose: function (name) { var p = POSES[name] || POSES.idle; tg.sL = p.sL; tg.eL = p.eL; tg.sR = p.sR; tg.eR = p.eR; tg.waveR = p.waveR || 0; return api; },
      expr: function (name) { var e = EXPR[name] || EXPR.neutral; tg.brow = e.brow; tg.tilt = e.tilt; tg.squint = e.squint; if (!talking) setMouth(e.mouth); api._restMouth = e.mouth; return api; },
      mouth: setMouth,
      talking: function (on) { talking = on; if (!on) setMouth(api._restMouth || 'rest'); },
      prop: function (name) { armR.prop.innerHTML = name ? PROPS[name] : ''; return api; },
      look: function (x, y, lock) { tg.lookX = x; tg.lookY = y; tg.lookLock = !!lock; lookT = lock ? 99 : 1.5; return api; },
      face: function (dir) { st.flip = tg.flip = dir; return api; },
      moveTo: function (x, y) { tg.x = x; tg.y = y; st.x = x; st.y = y; return api; },
      walkTo: function (x, y, dur) { walk = { x0: st.x, y0: st.y, x1: x, y1: y == null ? st.y : y, t0: performance.now(), dur: (dur || 1.4) * 1000 }; tg.x = x; tg.y = walk.y1; return api; },
      hop: function () { tg.hop = 30; setTimeout(function () { tg.hop = 0; }, 260); return api; },
      lean: function (deg) { tg.bodyRot = deg; return api; },
      turnHead: function (deg) { tg.headRot = deg; return api; },
      scale: function (s) { tg.s = s; return api; },
      dance: function (on) { danceT = on ? (performance.now() - t0) / 1000 : -1; if (!on) { tg.bodyRot = 0; tg.hop = 0; } return api; },
      snap: function () { for (var k in tg) st[k] = tg[k]; blinkV = 0; blinkT = 99; lookT = 99; render(performance.now()); return api; },
      MOUTHS: MOUTHS
    };
    api._restMouth = 'rest';
    render(performance.now());
    return api;
  }
  window.Kiki = Kiki;
  window.Kiki.POSES = POSES;
})();
