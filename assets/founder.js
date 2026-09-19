/* Nisarg as a character: one drawing, three rendering styles (flat, soft 3D, outlined). */
(function () {
  'use strict';
  var n = 0;
  function founder(style, opts) {
    opts = opts || {};
    var id = 'fd' + (++n), S = style;
    var C = {
      skin: '#C68C68', skinD: '#A8704F', skinL: '#DCA37D', hair: '#17110F', hairL: '#3b302b',
      suit: '#7A746D', suitD: '#5F5A54', suitL: '#908A82', shirt: '#4B1F34', shirtD: '#361525', shoe: '#141417', teeth: '#FBF7F2', mouth: '#4a1c1c'
    };
    if (S === 'outline') { C.skin = '#D29470'; C.suit = '#8A847C'; C.suitD = '#6c6760'; C.shirt = '#5a2440'; }
    var soft = S === 'soft', line = S === 'outline';
    var st = line ? ' stroke="#1a1411" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round"' : '';
    function f(col, grad) { return soft && grad ? 'url(#' + id + grad + ')' : col; }
    var d = '<defs>' +
      '<radialGradient id="' + id + 'face" cx="42%" cy="36%" r="70%"><stop offset="0" stop-color="' + C.skinL + '"/><stop offset=".65" stop-color="' + C.skin + '"/><stop offset="1" stop-color="' + C.skinD + '"/></radialGradient>' +
      '<linearGradient id="' + id + 'suit" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + C.suitL + '"/><stop offset=".55" stop-color="' + C.suit + '"/><stop offset="1" stop-color="' + C.suitD + '"/></linearGradient>' +
      '<linearGradient id="' + id + 'pant" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="' + C.suitL + '"/><stop offset="1" stop-color="' + C.suitD + '"/></linearGradient>' +
      '<linearGradient id="' + id + 'shirt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a2c4a"/><stop offset="1" stop-color="' + C.shirtD + '"/></linearGradient>' +
      '<linearGradient id="' + id + 'hair" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2c2320"/><stop offset="1" stop-color="' + C.hair + '"/></linearGradient>' +
      '<filter id="' + id + 'blur"><feGaussianBlur stdDeviation="5"/></filter>' +
      '<filter id="' + id + 'stk" x="-10%" y="-10%" width="120%" height="120%"><feMorphology in="SourceAlpha" operator="dilate" radius="6" result="d"/><feFlood flood-color="#fff"/><feComposite in2="d" operator="in" result="w"/><feMerge><feMergeNode in="w"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
      '</defs>';
    var g = '';
    var shadow = '<ellipse cx="150" cy="470" rx="80" ry="10" fill="rgba(0,0,0,.3)"' + (soft ? ' filter="url(#' + id + 'blur)"' : '') + '/>';
    /* legs and shoes */
    g += '<path d="M106 306 L149 306 L146 452 L112 452 Z" fill="' + f(C.suit, 'pant') + '"' + st + '/>';
    g += '<path d="M151 306 L194 306 L188 452 L154 452 Z" fill="' + f(C.suitD, 'pant') + '"' + st + '/>';
    if (!line) g += '<path d="M128 320 L129 448 M172 320 L171 448" stroke="rgba(0,0,0,.14)" stroke-width="2"/>';
    g += '<path d="M110 448 Q100 468 122 470 L148 470 Q152 460 146 448 Z" fill="' + C.shoe + '"' + st + '/>';
    g += '<path d="M154 448 Q148 460 152 470 L178 470 Q200 468 190 448 Z" fill="' + C.shoe + '"' + st + '/>';
    if (!line) g += '<path d="M114 458 Q122 454 132 456 M168 456 Q178 454 186 458" stroke="rgba(255,255,255,.35)" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
    /* arms (behind jacket front, hands in pockets) */
    g += '<path d="M98 200 Q80 254 100 312 L120 306 Q106 256 116 208 Z" fill="' + f(C.suitD, 'suit') + '"' + st + '/>';
    g += '<path d="M202 200 Q220 254 200 312 L180 306 Q194 256 184 208 Z" fill="' + f(C.suitD, 'suit') + '"' + st + '/>';
    g += '<path d="M98 306 Q108 314 120 306 L120 316 Q108 320 98 314 Z" fill="' + C.shirt + '"' + st + '/>';
    g += '<path d="M202 306 Q192 314 180 306 L180 316 Q192 320 202 314 Z" fill="' + C.shirt + '"' + st + '/>';
    /* neck */
    g += '<path d="M138 158 L162 158 L164 192 L136 192 Z" fill="' + C.skinD + '"' + st + '/>';
    /* jacket body */
    g += '<path d="M100 198 Q150 178 200 198 L208 256 L204 330 Q150 342 96 330 L92 256 Z" fill="' + f(C.suit, 'suit') + '"' + st + '/>';
    /* shirt and collar */
    g += '<path d="M134 186 L166 186 L150 262 Z" fill="' + f(C.shirt, 'shirt') + '"' + st + '/>';
    g += '<path d="M134 186 L150 200 L140 210 L130 192 Z" fill="' + C.shirtD + '"' + st + '/><path d="M166 186 L150 200 L160 210 L170 192 Z" fill="' + C.shirtD + '"' + st + '/>';
    g += '<circle cx="150" cy="222" r="1.8" fill="#2a0f1c"/><circle cx="150" cy="240" r="1.8" fill="#2a0f1c"/>';
    /* lapels */
    g += '<path d="M130 188 L150 262 L140 262 L118 214 L128 206 L120 196 Z" fill="' + (soft ? C.suitL : C.suitD) + '"' + st + '/>';
    g += '<path d="M170 188 L150 262 L160 262 L182 214 L172 206 L180 196 Z" fill="' + C.suitD + '"' + st + '/>';
    /* buttons, pockets, brand pin */
    g += '<circle cx="152" cy="274" r="3.6" fill="#2a2724"/><circle cx="152" cy="300" r="3.6" fill="#2a2724"/>';
    g += '<path d="M108 300 L134 298 L134 305 L108 307 Z" fill="' + C.suitD + '"' + st + '/><path d="M170 298 L196 300 L196 307 L170 305 Z" fill="' + C.suitD + '"' + st + '/>';
    g += '<path d="M168 234 L190 232" stroke="' + (line ? '#1a1411' : 'rgba(0,0,0,.25)') + '" stroke-width="2.4"/>';
    g += '<g transform="translate(130,222) scale(.07)"><g fill="none" stroke-width="26" stroke-linecap="square"><g transform="translate(70,168) rotate(-25) scale(.62)" stroke="#9FAABA"><polyline points="-27,-30 28,0 -27,30"/></g><g transform="translate(118,128) rotate(-12) scale(.82)" stroke="#E2E8F0"><polyline points="-27,-30 28,0 -27,30"/></g><g transform="translate(172,72) rotate(2) scale(1.05)" stroke="#E8890C"><polyline points="-27,-30 28,0 -27,30"/></g></g></g>';
    if (soft) g += '<path d="M104 204 Q126 192 140 190" stroke="rgba(255,255,255,.22)" stroke-width="5" fill="none" stroke-linecap="round"/>';
    /* ears */
    g += '<ellipse cx="104" cy="122" rx="9" ry="13" fill="' + C.skinD + '"' + st + '/><ellipse cx="196" cy="122" rx="9" ry="13" fill="' + C.skinD + '"' + st + '/>';
    /* face */
    g += '<path d="M106 112 Q104 64 150 62 Q196 64 194 112 Q196 160 150 172 Q104 160 106 112 Z" fill="' + f(C.skin, 'face') + '"' + st + '/>';
    /* hair: faded sides then textured top with fringe */
    g += '<path d="M104 120 Q100 92 112 76 L116 104 Q110 110 108 124 Z" fill="' + C.hairL + '"/><path d="M196 120 Q200 92 188 76 L184 104 Q190 110 192 124 Z" fill="' + C.hairL + '"/>';
    g += '<path d="M106 104 Q100 60 150 54 Q200 60 194 104 Q190 90 180 87 Q176 98 168 89 Q162 99 155 90 Q148 99 141 90 Q134 99 127 92 Q114 89 106 104 Z" fill="' + f(C.hair, 'hair') + '"' + st + '/>';
    g += '<path d="M128 66 Q140 58 156 60 M140 72 Q154 64 170 70" stroke="rgba(255,255,255,.14)" stroke-width="3" fill="none" stroke-linecap="round"/>';
    /* beard along the jaw, moustache */
    g += '<path d="M105 110 L112 112 Q114 150 134 161 Q150 166 166 161 Q186 150 188 112 L195 110 Q198 162 150 175 Q102 162 105 110 Z" fill="#221a17"' + (line ? st : '') + '/>';
    if (!line) g += '<path d="M116 132 Q122 152 136 158 Q150 161 164 158 Q178 152 184 132 Q170 150 150 150 Q130 150 116 132 Z" fill="#6b4632" opacity=".35"/>';
    g += '<path d="M135 142 Q142 137 150 139 Q158 137 165 142" stroke="#221a17" stroke-width="4.5" fill="none" stroke-linecap="round"/>';
    /* mouth: big warm smile with teeth */
    g += '<path d="M129 146 Q150 172 171 146 Q150 150 129 146 Z" fill="' + C.mouth + '"' + (line ? ' stroke="#1a1411" stroke-width="2.4"' : '') + '/>';
    g += '<path d="M132 147 Q150 159 168 147 Q150 150 132 147 Z" fill="' + C.teeth + '"/><path d="M140 163 Q150 166 160 163" stroke="#b86d62" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>';
    /* nose */
    g += '<path d="M150 112 Q144 128 148 134 Q152 136 157 132" stroke="' + C.skinD + '" stroke-width="3" fill="none" stroke-linecap="round"/>';
    if (soft) g += '<ellipse cx="128" cy="130" rx="9" ry="6" fill="#E07C6A" opacity=".18"/><ellipse cx="172" cy="130" rx="9" ry="6" fill="#E07C6A" opacity=".18"/>';
    /* smiling eyes and brows */
    g += '<g class="fd-eyes"><path d="M124 114 Q132 106 140 114 Q132 118 124 114 Z" fill="#1a120e"/><path d="M160 114 Q168 106 176 114 Q168 118 160 114 Z" fill="#1a120e"/>' +
      '<circle cx="134" cy="111.5" r="1.6" fill="#fff"/><circle cx="170" cy="111.5" r="1.6" fill="#fff"/></g>';
    g += '<path d="M121 102 Q131 97 142 100" stroke="' + C.hair + '" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M158 100 Q169 97 179 102" stroke="' + C.hair + '" stroke-width="5" fill="none" stroke-linecap="round"/>';
    if (soft) g += '<path d="M118 76 Q140 64 164 66" stroke="rgba(255,255,255,.18)" stroke-width="4" fill="none" stroke-linecap="round"/>';
    var vb = opts.bust ? '70 40 160 170' : '40 36 220 446';
    return '<svg viewBox="' + vb + '" class="fd-svg">' + d + (opts.bust ? '' : shadow) + '<g' + (line ? ' filter="url(#' + id + 'stk)"' : '') + '>' + g + '</g></svg>';
  }
  window.solviqoFounder = founder;
  document.querySelectorAll('[data-founder]').forEach(function (el) {
    el.innerHTML = founder(el.getAttribute('data-founder'), { bust: el.hasAttribute('data-bust') });
  });
})();
