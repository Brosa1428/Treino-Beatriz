'use strict';
/* =========================================================
   Push It · app
   dados (EX, PLANS, ING, KETO, DOCES) vêm de data.js
   ========================================================= */

/* ---------- utilidades ---------- */
const $ = id => document.getElementById(id);
const pad = n => String(n).padStart(2, '0');
const dstr = x => x.getFullYear() + '-' + pad(x.getMonth() + 1) + '-' + pad(x.getDate());
const today = () => dstr(new Date());
const Dt = s => { const [a, b, c] = s.split('-').map(Number); return new Date(a, b - 1, c); };
const addD = (s, n) => { const x = Dt(s); x.setDate(x.getDate() + n); return dstr(x); };
const diffD = (a, b) => Math.round((Dt(b) - Dt(a)) / 864e5);
const monOf = s => { const x = Dt(s); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return dstr(x); };
const dm = d => d.split('-').reverse().slice(0, 2).join('/');
const dfull = d => d.split('-').reverse().join('/');
const f0 = n => Math.round(n || 0).toLocaleString('pt-PT');
const f1 = n => (n || 0).toLocaleString('pt-PT', { maximumFractionDigits: 1, minimumFractionDigits: 1 });
const fL = ml => (ml / 1000).toLocaleString('pt-PT', { maximumFractionDigits: 2 });
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const WD = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
const MO = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
const WK = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

const P = {
  home: 'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
  dumb: 'M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11',
  food: 'M7 3v7a2 2 0 0 0 2 2v9M11 3v7a2 2 0 0 1-2 2M7 3v4M11 3v4M17 21V3c-2.2 0-4 2.5-4 6.5 0 2.5 1.6 3.5 4 3.5',
  chart: 'M4 20h16M7 16v-5M12 16V7M17 16v-8',
  grid: 'M4 4h6.5v6.5H4zM13.5 4H20v6.5h-6.5zM4 13.5h6.5V20H4zM13.5 13.5H20V20h-6.5z',
  drop: 'M12 3.5s6 6.4 6 10.8a6 6 0 0 1-12 0C6 9.9 12 3.5 12 3.5z',
  flame: 'M12 3c.8 3.3 5 5.2 5 10a5 5 0 0 1-10 0c0-2.4 1.3-3.9 2.4-4.9.4 1.8 1.4 2.8 2.4 2.8 0-2.9-.9-5 .2-7.9z',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  chev: 'M9 6l6 6-6 6',
  left: 'M15 6l-6 6 6 6',
  swap: 'M4 8h13l-3.5-3.5M20 16H7l3.5 3.5',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  x: 'M6 6l12 12M18 6 6 18',
  target: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zM12 12h.01',
  ruler: 'M3.5 16.5 16.5 3.5l4 4-13 13zM7.5 12.5l2 2M10.5 9.5l2 2M13.5 6.5l2 2',
  book: 'M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5zM5 19.5A1.5 1.5 0 0 0 6.5 21H19',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 20.5a7.5 7.5 0 0 1 15 0',
  moon: 'M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10z',
  play: 'M8 5.5v13l10.5-6.5z',
  cake: 'M4 20.5h16M5.5 20.5v-7h13v7M5.5 16.5c1.5 1 3 1 4.3 0 1.3 1 2.9 1 4.3 0 1.4 1 2.9 1 4.4 0M12 13.5V10M12 7.5c-.9-.6-.9-1.9 0-3 .9 1.1.9 2.4 0 3z',
  cart: 'M3 4h2.2l2.4 11h10.2L20 7.5H6.4M9.5 20a1 1 0 1 0 0-.01M17 20a1 1 0 1 0 0-.01',
  down: 'M12 4v11M7 10.5 12 15.5l5-5M5 20h14',
  up: 'M12 15.5V4.5M7 9l5-4.5L17 9M5 20h14',
  info: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 11v5.5M12 7.5h.01',
  spine: 'M12 3v18M9 5.5h6M8.5 9.5h7M9 13.5h6M9.5 17.5h5',
  phone: 'M8 3h8a1.5 1.5 0 0 1 1.5 1.5v15A1.5 1.5 0 0 1 16 21H8a1.5 1.5 0 0 1-1.5-1.5v-15A1.5 1.5 0 0 1 8 3zM11 18h2',
  trash: 'M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13',
  scale: 'M4 20h16M12 4v16M5 8h14M5 8l-2.5 6a3 3 0 0 0 5 0zM19 8l-2.5 6a3 3 0 0 0 5 0z',
  spark: 'M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6',
  pause: 'M8.5 5v14M15.5 5v14',
  timer: 'M12 21a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM12 9v4l2.5 2M9.5 2.5h5',
  sound: 'M4 9.5v5h3.5L12 18.5v-13L7.5 9.5zM15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11',
  mute: 'M4 9.5v5h3.5L12 18.5v-13L7.5 9.5zM16 9.5l5 5M21 9.5l-5 5',
  homeIc: 'M4 11 12 4l8 7M6.5 9.5V20h11V9.5',
  medal: 'M12 14.5a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM9 13.5 7.5 21l4.5-2.5 4.5 2.5L15 13.5',
  cal: 'M5 6h14v14H5zM5 10h14M9 3.5v4M15 3.5v4',
  cam: 'M4 8h3l1.5-2.5h7L17 8h3v11H4zM12 16.5a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4z',
  wand: 'M5 19 16 8M14.5 5l.6 1.9 1.9.6-1.9.6-.6 1.9-.6-1.9L12 7.5l1.9-.6zM19 12l.4 1.1 1.1.4-1.1.4L19 15l-.4-1.1-1.1-.4 1.1-.4z',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7.5V12l3 2',
};
const ic = (n, s = 20, w = 2) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${P[n]}"/></svg>`;
const ring = (pct, size = 64, sw = 7, col = 'var(--ac)', bg = 'var(--sf2)', inner = '') => {
  const r = (size - sw) / 2, c = 2 * Math.PI * r, p = Math.max(0, Math.min(1, pct || 0));
  return `<div style="position:relative;width:${size}px;height:${size}px"><svg width="${size}" height="${size}" style="transform:rotate(-90deg)"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${bg}" stroke-width="${sw}"/><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - p)}" style="transition:stroke-dashoffset .5s"/></svg><div style="position:absolute;inset:0;display:grid;place-items:center;font-weight:800;font-size:${size / 4.6}px">${inner}</div></div>`;
};
const tipoOf = x => x.cardio || x.g === 'cardio' ? 'cardio' : x.g === 'mob' ? 'along' : x.ld ? 'forca' : 'resist';
const TN = { forca: 'Força', resist: 'Resistência', cardio: 'Cardio', along: 'Alongamento' };
const TC = { forca: 'ac', resist: 'lil', cardio: 'amb', along: 'mint' };
const src = (id, k) => (typeof IMG !== 'undefined' ? 'data:image/jpeg;base64,' + IMG[id][k] : 'img/' + id + '_' + k + '.jpg');

/* ---------- estado ---------- */
const KEY = 'treinoBeatriz.app.v2';
let S = { perfil: {}, checks: {}, cardio: {}, ing: {}, pl: {}, med: [], water: {}, meals: {}, doce: {}, chal: null, ph: 0, day: 0, swaps: {}, extra: {}, log: {}, view: 'anim', start: null, shop: {}, next: null, loads: {}, work: {}, sess: {}, restSec: 0, mute: false, free: { n: '', ids: [], tip: '' }, ck: {}, food: {}, fast: { goal: 17, st: null, t: 0, log: [] }, badges: null, phN: 0, v: 0, steps: {}, notes: {} };
try { S = Object.assign(S, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { toast('Não consegui guardar no telemóvel.'); } };
if (!S.start) { S.start = today(); }
if (!PLANS[S.ph]) S.ph = 0;
if (!(S.day >= 0 && S.day < 5)) S.day = 0;
if (!S.free || !Array.isArray(S.free.ids)) S.free = { n: '', ids: [], tip: '' };
if (!S.fast || !Array.isArray(S.fast.log)) S.fast = { goal: 17, st: null, t: 0, log: [] };
if ((S.v || 0) < 4) { Object.keys(S.ing || {}).forEach(d => { const m = S.meals[d] || {}; if (m[0] || m[1]) delete S.ing[d]; }); S.v = 4; }
if (S.next && S.next.from < today()) { S.day = S.next.d; S.next = null; }
Object.keys(S.work || {}).forEach(k => { if (!k.endsWith('_' + today())) delete S.work[k]; });
save();

let tab = 'hoje';
const UI = { treino: 'plano', comer: 'diario', prog: 'resumo', xt: 'all', xp: 'all', lt: 'all', hm: today().slice(0, 7), gen: { place: 'gin', focus: 'full', min: 30, ids: [] }, tm: { w: 20, r: 10, n: 8 }, mais: 'menu', kd: (new Date().getDay() + 6) % 7, lg: 'all', lq: '', llv: 9, gm: 'p', gr: 0, cdate: today() };

function toast(msg) { const t = $('toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('on'), 2200); }

/* ---------- perfil e números ---------- */
function calc() {
  const p = S.perfil, w = +p.peso || 0, h = +p.alt || 0, a = +p.idade || 0, f = +p.fat || 1.375;
  const hm = h / 100, imc = h ? w / (hm * hm) : 0;
  const bmr = w && h && a ? 10 * w + 6.25 * h - 5 * a - 161 : 0;
  return { w, h, a, f, imc, bmr, tdee: bmr * f, base: bmr * 1.2, ok: !!(w && h && a) };
}
function imcInfo(i) {
  if (i < 18.5) return ['Abaixo do peso', 'lil']; if (i < 25) return ['Peso normal', 'mint'];
  if (i < 30) return ['Excesso de peso', 'amb']; if (i < 35) return ['Obesidade grau I', 'amb'];
  if (i < 40) return ['Obesidade grau II', 'ac']; return ['Obesidade grau III', 'ac'];
}
const kcalTarget = () => { const c = calc(); return c.ok ? Math.max(c.tdee - 500, 1400) : 0; };

/* ---------- treino: dados ---------- */
const GN = { pernas: 'Pernas', glut: 'Glúteos & posterior', costas: 'Costas', peito: 'Peito', ombros: 'Ombros', bracos: 'Braços', core: 'Core', corpo: 'Peso do corpo', cardio: 'Cardio', mob: 'Mobilidade' };
const PH_NAMES = ['Fase 1 · Adaptação', 'Fase 2 · Progressão', 'Fase 3 · Desafio'];
const PH_INFO = ['Semanas 1–4. Aprender as máquinas com cargas leves, 2–3 séries e 60–90 s de descanso.', 'Semanas 5–8. Entram halteres e polias, mais carga, 3 séries.', 'Semanas 9–12. Uma perna de cada vez, mais carga e 45–60 s de descanso.'];
let DAYS = [];
function buildDays() {
  DAYS = PLANS[S.ph].map((d, i) => {
    const sw = (S.swaps[S.ph] || {})[i] || {};
    const ex = ((S.extra[S.ph] || {})[i] || []).filter(id => EX[id]);
    return Object.assign({}, d, { ids: d.ids.map((id, j) => EX[sw[j]] ? sw[j] : id).concat(ex), base: d.ids.length });
  });
  const fi = (S.free.ids || []).filter(id => EX[id]);
  DAYS.push({ t: S.free.n || 'Treino livre', e: '⚡', foco: S.free.tip || 'O teu treino à medida.', ids: fi, base: fi.length, free: true });
  if (S.day >= 4 && !fi.length) S.day = 0;
}
const dayLbl = (i = S.day) => DAYS[i].free ? 'Treino livre' : 'Dia ' + (i + 1);
function loadFree(n, ids, tip) {
  S.free = { n, ids: ids.filter(id => EX[id]), tip: tip || '' }; delete S.checks[S.ph + '_4_' + today()]; delete S.work[S.ph + '_4_' + today()];
  S.day = 4; UI.treino = 'plano'; buildDays(); save(); closeSheet(); goTab('treino'); toast('Treino pronto: ' + n);
}
const weekNo = () => Math.floor(diffD(S.start, today()) / 7) + 1;
function kcalEx(x, key) {
  const c = calc(); let min;
  if (x.cardio) { const k = S.cardio[key]; min = k ?? x.cardio; } else min = x.s * 1.7;
  return { min, kcal: x.met * (c.w || 0) * (min / 60) };
}
const dayKey = (d = S.day) => S.ph + '_' + d + '_' + today();
const isChecked = (k, d = S.day) => !!(S.checks[dayKey(d)] || {})[k];
function dayTotals(d = S.day) {
  let k = 0, m = 0, n = 0, t = 0, mAll = 0;
  DAYS[d].ids.forEach((id, i) => { const r = kcalEx(EX[id], id + '_' + S.ph + '_' + d); t++; mAll += r.min; if (isChecked(id + '_' + i, d)) { k += r.kcal; m += r.min; n++; } });
  return { k, m, n, t, mAll };
}
function logDay(d = S.day) { let pct = 0, k = 0; DAYS.forEach((x, i) => { const tt = dayTotals(i); if (tt.t) pct = Math.max(pct, tt.n / tt.t); k += tt.k; }); S.log[today()] = { pct, k, d, ph: S.ph }; }
const sessOf = date => S.sess[date] || [];
const workoutPct = date => Math.max(S.log[date] ? S.log[date].pct : 0, sessOf(date).some(e => e.full) ? 1 : 0);
const kcalDate = date => (S.log[date] ? S.log[date].k : 0) + sessOf(date).reduce((a, e) => a + e.k, 0);

/* ---------- água ---------- */
function waterBase() { const c = calc(); if (!c.w || !c.h) return 2500; const h = c.h / 100, ideal = 22 * h * h, adj = ideal + 0.25 * (c.w - ideal); return Math.round(adj * 35 / 50) * 50; }
const waterGoal = date => waterBase() + (workoutPct(date) > 0 ? 500 : 0) + (S.pl[date] === '1' ? 500 : 0);
const mealsDone = date => { const m = S.meals[date] || {}; return !!(m[0] && m[1]); };

/* ---------- comida ---------- */
const tot = its => { let k = 0, p = 0, f = 0, c = 0; its.forEach(([id, q]) => { const g = ING[id]; k += g[1] * q; p += g[2] * q; f += g[3] * q; c += g[4] * q; }); return { k, p, f, c }; };
const dayIts = d => KETO[d].m[0].it.concat(KETO[d].m[1].it);
const qty = q => q === 1 ? '1×' : (q === 0.5 ? '½' : (Number.isInteger(q) ? q + '×' : String(q).replace('.', ',') + '×'));
const macroTags = t => `<div class="tags"><span class="tag ac">${f0(t.k)} kcal</span><span class="tag">P ${f0(t.p)} g</span><span class="tag">G ${f0(t.f)} g</span><span class="tag lil">HC ${f1(t.c)} g</span></div>`;

/* ---------- desafio ---------- */
const RULES = { t: { label: 'Treino do plano feito (≥ 80 %)', auto: 1 }, a: { label: 'Meta de água batida', auto: 1 }, k: { label: '2 refeições keto feitas', auto: 1 }, m1: { label: 'Caminhada de 20 min' }, m2: { label: 'Dormir 7 h ou mais' }, m3: { label: 'Sem açúcar nem refrigerantes' }, m4: { label: '10 min de leitura' }, m5: { label: '5 min de alongamentos' } };
const PRE = { suave: { days: 30, rest: 2, ids: ['t', 'a'] }, const: { days: 75, rest: 1, ids: ['t', 'a', 'k', 'm1'] } };
let draft = { name: 'O meu desafio', days: 30, rest: 1, ids: ['t', 'a'], custom: [] };
function autoOk(id, date) { if (id === 't') return workoutPct(date) >= 0.8; if (id === 'a') return (S.water[date] || 0) >= waterGoal(date); if (id === 'k') return mealsDone(date); return false; }
const ruleOk = (r, date) => r.auto ? autoOk(r.id, date) : !!((S.chal.checks[date] || {})[r.id]);
function restUsed(date) { const wk = monOf(date); let n = 0; for (let i = 0; i < 7; i++) { const x = addD(wk, i); if (S.chal.rest[x] && x <= date) n++; } return n; }
function dayStatus(date) {
  const c = S.chal;
  if (c.rules.every(r => ruleOk(r, date))) return 'ok';
  if (c.rest[date] && restUsed(date) <= c.restMax) return 'rest';
  return date < today() ? 'miss' : 'pending';
}
function chalStats() {
  const c = S.chal, t = today(), end = addD(c.start, c.days - 1), last = t < end ? t : end;
  let ok = 0, rest = 0, miss = 0, run = 0, best = 0;
  for (let d = c.start; d <= last; d = addD(d, 1)) { const s = dayStatus(d); if (s === 'ok') { ok++; run++; } else if (s === 'rest') { rest++; run++; } else if (s === 'miss') { miss++; run = 0; } if (run > best) best = run; }
  return { ok, rest, miss, cur: run, best, end };
}

/* ---------- cabeçalho comum ---------- */
const initial = () => (S.perfil.nome || 'B').trim().charAt(0).toUpperCase() || 'B';
const head = (eyebrow, title) => `<header class="ah"><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1></div><button class="avatar" data-act="profile" aria-label="Perfil"><img src="icons/avatar.jpg" alt=""></button></header>`;
const nav = (key, opts) => `<div class="chips">${opts.map(([v, l]) => `<button class="chip ${UI[key] === v ? 'on' : ''}" data-act="seg" data-k="${key}" data-v="${v}">${l}</button>`).join('')}</div>`;
const seg = (key, opts) => `<div class="seg" role="tablist">${opts.map(([v, l]) => `<button class="${UI[key] === v ? 'on' : ''}" data-act="seg" data-k="${key}" data-v="${v}">${l}</button>`).join('')}</div>`;

/* =========================================================
   ECRÃ: HOJE
   ========================================================= */
const TIPS = [
  'Bebe um copo de água logo ao acordar, antes do café.',
  'Na primeira série de cada máquina usa um peso leve para aprender o movimento.',
  'Expira no esforço e volta devagar, em 3 segundos.',
  'No dia a seguir ao plantão, dormir é o treino. Não te sintas culpada.',
  'Mede a cintura 1× por semana: às vezes a balança para e a fita continua a descer.',
  'Fome fora de horas? Um ovo cozido ou um punhado de ginguba resolvem sem sair do keto.',
  'Costas sempre apoiadas no encosto das máquinas: é a tua regra de ouro para a lombar.',
  'Sal nas primeiras semanas de keto ajuda a evitar cansaço e dores de cabeça.',
  'Leva a marmita para o plantão: é aí que a dieta costuma escorregar.',
  'Se uma máquina estiver ocupada, toca em “Trocar”: há sempre alternativa para o mesmo músculo.',
];
function weekStrip() {
  const t = today(), mon = monOf(t), L = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];
  let n = 0, k = 0; for (let i = 0; i < 7; i++) { const d = addD(mon, i); if (workoutPct(d) >= 0.8) n++; k += kcalDate(d); }
  return `<div class="sec" style="margin-top:0"><span>Esta semana</span><span style="text-transform:none;letter-spacing:0;font-weight:700">${n}/4 treinos${k ? ' · ' + f0(k) + ' kcal' : ''}</span></div><div class="week">${L.map((l, i) => { const d = addD(mon, i), dn = workoutPct(d) >= 0.8, pl = S.pl[d] === '1'; return `<div class="wd ${dn ? 'done' : pl ? 'rest' : ''} ${d === t ? 'today' : ''} ${d > t ? 'fut' : ''}">${l}<i>${dn ? ic('check', 16, 3) : pl ? ic('moon', 14, 2.4) : +d.slice(8)}</i></div>`; }).join('')}</div>`;
}
function renderHoje() {
  const t = today(), d = new Date(), c = calc();
  const tt = dayTotals(), dd = DAYS[S.day], pl = S.pl[t] === '1';
  const done = (S.log[t] ? S.log[t].pct : 0) >= 0.8, started = tt.n > 0;
  const ups = dd.ids.filter(id => { const sg = suggest(id); return sg && sg.dir === 'up'; }).length;
  const sToday = sessOf(t);
  const wg = waterGoal(t), wc = S.water[t] || 0;
  const tg = kcalTarget(), ate = dayEat(t).k;
  const kd = (d.getDay() + 6) % 7, meal = KETO[kd], mdone = S.meals[t] || {};
  const doce = S.doce[t] != null ? DOCES[S.doce[t]] : null;
  const lastW = [...S.med].filter(e => e.p).sort((a, b) => a.d < b.d ? -1 : 1);
  const lw = lastW[lastW.length - 1], fw = lastW[0];
  let chalTile;
  if (S.chal) { const st = chalStats(); chalTile = `<small>${esc(S.chal.name)}</small><b>${st.cur}</b><span class="u">dias seguidos</span><span class="s">melhor: ${st.best} · ${st.ok + st.rest}/${S.chal.days}</span>`; }
  else chalTile = `<small>Desafio</small><b style="font-size:17px">Criar desafio</b><span class="s">dias seguidos, ao teu ritmo</span>`;
  let heroBody;
  if (pl) heroBody = `<div class="lbl">Hoje é plantão</div><h2>Descansa e hidrata-te</h2><div class="meta">Sem treino hoje nem amanhã. A meta de água subiu 0,5 L.</div><button class="btn" data-act="go" data-tab="comer" data-sub="diario">${ic('drop', 18)} Registar água</button>`;
  else heroBody = `<div class="lbl">${done ? 'Treino feito' : 'Treino de hoje'} · ${PH_NAMES[S.ph].split(' · ')[0]}</div>
    <h2>${dd.free ? '' : 'Dia ' + (S.day + 1) + ' · '}${dd.t}</h2>
    <div class="meta">${tt.t} exercícios · ~${f0(tt.mAll + tt.t * 3)} min${tt.k ? ' · ' + f0(tt.k) + ' kcal gastas' : ''}${ups ? '<br>' + ups + (ups > 1 ? ' cargas' : ' carga') + ' para subir hoje ↑' : ''}</div>
    <div class="ringwrap">${ring(tt.n / tt.t, 70, 7, '#fff', 'rgba(255,255,255,.22)', `<span style="color:#fff">${tt.n}/${tt.t}</span>`)}</div>
    <button class="btn" data-act="go" data-tab="treino">${ic(done ? 'check' : 'play', 18)} ${done ? 'Ver o treino' : started ? 'Continuar treino' : 'Começar treino'}</button>`;
  $('s-hoje').innerHTML = head(WD[d.getDay()] + ', ' + d.getDate() + ' de ' + MO[d.getMonth()], 'Olá' + (S.perfil.nome ? ', ' + esc(S.perfil.nome) : '') + ' ✨') +
    (!c.ok ? `<div class="card" style="border-color:var(--ac)"><h3>Vamos começar</h3><p class="note" style="margin:6px 0 12px">Preenche o teu peso, altura e idade para eu calcular as calorias, a água e o gasto dos treinos.</p><button class="btn w" data-act="profile">${ic('user', 18)} Preencher perfil</button></div>` : '') +
    (deferredInstall && !isStandalone() ? `<div class="card flat" style="display:flex;gap:12px;align-items:center"><div class="ic" style="width:40px;height:40px;border-radius:12px;display:grid;place-items:center;background:var(--lil2);color:var(--lil)">${ic('phone')}</div><div style="flex:1"><b>Instala a app</b><div class="note">Fica no ecrã principal e funciona sem internet.</div></div><button class="btn sm lil" data-act="install">Instalar</button></div>` : '') +
    weekStrip() + checkinHtml() + `<div class="hero">${heroBody}</div>
    <button class="card flat" style="display:flex;gap:12px;align-items:center;width:100%;text-align:left" data-act="go" data-tab="treino" data-sub="exp"><div class="ic" style="width:40px;height:40px;border-radius:12px;display:grid;place-items:center;background:var(--amb2);color:var(--amb);flex:none">${ic('timer')}</div><div style="flex:1"><b>${sToday.length ? 'Sessão guiada feita ✓' : 'Apetece-te outra coisa hoje?'}</b><div class="note">${sToday.length ? sToday.map(e => e.n || (SESS.find(x => x.id === e.id) || {}).n).join(', ') + ' · ' + f0(sToday.reduce((a, e) => a + e.k, 0)) + ' kcal' : 'Explora treinos guiados, cria um à medida ou usa o temporizador.'}</div></div><span class="chev" style="color:var(--mut)">${ic('chev', 18)}</span></button>
    <div class="grid2">
      <button class="card kpi" style="text-align:left" data-act="water" data-ml="250"><div style="display:flex;justify-content:space-between;align-items:flex-start"><small>Água</small>${ring(wc / wg, 40, 5, '#4C93E8')}</div><b>${fL(wc)}</b><span class="u">/ ${fL(wg)} L</span><span class="s">toca para +250 ml</span></button>
      <button class="card kpi" style="text-align:left" data-act="go" data-tab="comer" data-sub="diario"><small>Calorias de hoje</small><b>${ate ? f0(ate) : '—'}</b><span class="u">${ate ? 'kcal comidas' : ''}</span><span class="s">${tg ? 'meta: ' + f0(tg) + ' kcal' : 'preenche o perfil'}</span></button>
      <button class="card kpi" style="text-align:left" data-act="go" data-tab="mais" data-sub="desafio">${chalTile}</button>
      <button class="card kpi" style="text-align:left" data-act="go" data-tab="prog" data-sub="medidas"><small>Peso</small><b>${lw ? f1(lw.p) : (c.w ? f1(c.w) : '—')}</b><span class="u">kg</span><span class="s">${lw && fw && lw !== fw ? (lw.p - fw.p > 0 ? '+' : '') + f1(lw.p - fw.p) + ' kg desde ' + dm(fw.d) : 'regista as medidas'}</span></button>
    </div>
    <div class="sec"><span>Refeições de hoje${fastLbl() ? ' <span style="text-transform:none;letter-spacing:0;font-weight:700;color:var(--lil)">· ' + fastLbl() + '</span>' : ''}</span> <button class="link" data-act="go" data-tab="comer" data-sub="plano">Ver plano</button></div>
    <div class="card list">
      ${meal.m.map((m, i) => `<div class="row ${mdone[i] ? 'done' : ''}"><div class="ic">${ic('food', 18)}</div><div class="tx"><b>${esc(m.t)}</b><small>${m.h} · ${f0(tot(m.it).k)} kcal</small></div><button class="ck ${mdone[i] ? 'on' : ''}" data-act="meal" data-i="${i}" aria-label="Feita">${ic('check', 18, 3)}</button></div>`).join('')}
      <button class="row" data-act="go" data-tab="comer" data-sub="doces"><div class="ic" style="background:var(--amb2);color:var(--amb)">${ic('cake', 18)}</div><div class="tx"><b>${doce ? esc(doce.n) : 'Um doce keto?'}</b><small>${doce ? f0(tot(doce.it).k) + ' kcal · registado hoje' : '6 receitas para o teu sweet tooth'}</small></div><span class="chev">${ic('chev', 18)}</span></button>
    </div>
    <div class="card" style="display:flex;align-items:center;gap:12px"><div class="ic" style="width:38px;height:38px;border-radius:12px;display:grid;place-items:center;background:var(--lil2);color:var(--lil)">${ic('moon', 18)}</div><div style="flex:1"><b>Hoje estou de plantão</b><div class="note">Pausa o treino, +0,5 L de água e conta como descanso no desafio.</div></div><label class="sw"><input type="checkbox" data-act="plantao" ${pl ? 'checked' : ''}><span></span></label></div>
    <button class="card flat" style="display:flex;gap:12px;align-items:center;width:100%;text-align:left" data-act="go" data-tab="mais" data-sub="conq"><div class="ic" style="width:38px;height:38px;border-radius:12px;display:grid;place-items:center;background:var(--ac2);color:var(--acd);flex:none">${ic('medal', 18)}</div><div style="flex:1"><b>Conquistas: ${Object.keys(S.badges || {}).length} de ${BADGES.length}</b><div class="note">${nextBadge()}</div></div><span class="chev" style="color:var(--mut)">${ic('chev', 18)}</span></button>
    <div class="call lil">${ic('spark', 18)}<div><b>Dica do dia.</b> ${TIPS[diffD('2026-01-01', t) % TIPS.length]}</div></div>`;
}

/* =========================================================
   ECRÃ: TREINO
   ========================================================= */
function exMedia(id) {
  const x = EX[id];
  if (S.view === 'pair') return `<div class="pair"><figure><img src="${src(id, 0)}" alt="${esc(x.n)}: início"><figcaption>Início</figcaption></figure><figure><img src="${src(id, 1)}" alt="${esc(x.n)}: fim"><figcaption>Fim</figcaption></figure></div>`;
  return `<div class="media"><img src="${src(id, 0)}" alt="${esc(x.n)}: início"><img class="b" src="${src(id, 1)}" alt="${esc(x.n)}: fim"><span class="pill">${ic('play', 12)} movimento</span></div>`;
}
function renderTreino() {
  const el = $('s-treino');
  let body = '';
  if (UI.treino === 'plano') {
    const tt = dayTotals(), d = DAYS[S.day];
    const sug = Math.min(2, Math.max(0, Math.floor((weekNo() - 1) / 4)));
    const shown = DAYS.map((x, i) => [x, i]).filter(([x]) => !x.free || x.ids.length);
    body = `<div class="seg">${PH_NAMES.map((n, i) => `<button class="${i === S.ph ? 'on' : ''}" data-act="phase" data-i="${i}">${n.split(' · ')[0]}</button>`).join('')}</div>
     <p class="note" style="margin:-4px 2px 14px">${PH_INFO[S.ph]}${sug !== S.ph ? ` <b style="color:var(--acd)">Sugestão para a semana ${weekNo()}: ${PH_NAMES[sug].split(' · ')[0]}.</b>` : ''}</p>
     <div class="days" style="grid-template-columns:repeat(${shown.length},1fr)">${shown.map(([x, i]) => { const t2 = dayTotals(i); return `<button class="day ${i === S.day ? 'on' : ''}" data-act="day" data-i="${i}"><b>${x.free ? 'Livre' : 'Dia ' + (i + 1)}</b><small>${x.free ? 'à medida' : x.t.split(/[ ,]/)[0]}</small><i><span style="width:${t2.t ? t2.n / t2.t * 100 : 0}%"></span></i></button>`; }).join('')}</div>
     <div class="card"><div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start"><div><h2 style="margin:0">${d.e} ${esc(d.t)}</h2><p class="note" style="margin:4px 0 0">${esc(d.foco)}</p></div>${ring(tt.t ? tt.n / tt.t : 0, 54, 6, 'var(--mint)', 'var(--sf2)', `${tt.n}/${tt.t}`)}</div>
      <div class="tags" style="margin-top:12px"><span class="tag">${ic('dumb', 12)} ${tt.t} exercícios</span><span class="tag">~${f0(tt.mAll + tt.t * 3)} min</span><span class="tag ac">${ic('flame', 12)} ${f0(tt.k)} kcal gastas</span></div></div>
     <div class="card list">${d.ids.map((id, i) => {
      const x = EX[id], on = isChecked(id + '_' + i), key = id + '_' + S.ph + '_' + S.day, r = kcalEx(x, key);
      return `<div class="row ${on ? 'done' : ''}"><button style="all:unset;display:flex;gap:12px;align-items:center;flex:1;min-width:0;cursor:pointer" data-act="ex" data-i="${i}"><img class="th" src="${src(id, 1)}" alt="" loading="lazy"><div class="tx"><b>${i + 1}. ${esc(x.n)}</b><small>${x.cardio ? f0(r.min) + ' min' : x.dose} · ${GN[x.g]}${!d.free && i >= d.base ? ' · extra' : ''}${loadTag(id)}</small></div></button><button class="ck ${on ? 'on' : ''}" data-act="tick" data-i="${i}" aria-label="Feito">${ic('check', 18, 3)}</button></div>`;
    }).join('')}</div>
     <button class="card flat" style="display:flex;gap:12px;align-items:center;width:100%;text-align:left" data-act="go" data-tab="mais" data-sub="progredir"><div class="ic" style="width:38px;height:38px;border-radius:12px;display:grid;place-items:center;background:var(--mint2);color:var(--mint);flex:none">${ic('up', 18)}</div><div style="flex:1"><b>Como e quando subir a carga</b><div class="note">Regista a carga em cada exercício: eu digo-te quando subir.</div></div><span class="chev" style="color:var(--mut)">${ic('chev', 18)}</span></button>
     <div class="btns"><button class="btn ghost sm" data-act="clearDay">Limpar checks de hoje</button><button class="btn ghost sm" data-act="seg" data-k="treino" data-v="lib">${ic('plus', 16)} Juntar exercício</button></div>
     <p class="note" style="margin:12px 2px">Toca num exercício para ver o movimento, registar a carga e as séries, usar o temporizador de descanso ou trocar de máquina. Muito cansada? Faz 2 séries em vez de 3.</p>`;
  } else if (UI.treino === 'exp') {
    const t = today(), doneT = sessOf(t), w = calc().w || 0;
    const items = SESS.map(se => ({ se })).concat(ROUT.map(ro => ({ ro }))).filter(o => { const it = o.se || o.ro; return (UI.xt === 'all' || it.tipo === UI.xt) && (UI.xp === 'all' || it.place === UI.xp); });
    body = `<div class="act2"><button style="background:var(--plum)" data-act="genOpen">${ic('wand', 24)}<span>Criar treino<small>à medida, em 3 toques</small></span></button><button style="background:var(--ac)" data-act="timerOpen">${ic('timer', 24)}<span>Temporizador<small>tabata, HIIT, à tua escolha</small></span></button></div>
     <div class="chips">${[['all', 'Todos']].concat(Object.entries(TN)).map(([k, n]) => `<button class="chip ${k === UI.xt ? 'on' : ''}" data-act="xt" data-v="${k}">${n}</button>`).join('')}</div>
     <div class="seg" style="margin-top:2px">${[['all', 'Tudo'], ['gin', 'No ginásio'], ['casa', 'Em casa']].map(([v, l]) => `<button class="${UI.xp === v ? 'on' : ''}" data-act="xp" data-v="${v}">${l}</button>`).join('')}</div>
     <p class="note" style="margin:0 2px 10px">${items.length} treinos. <b>Guiado</b>: segues o ecrã, com tempo, som e vibração. <b>Lista</b>: passa para o teu plano como “Treino livre”, com cargas e séries.</p>` +
      (items.length ? items.map(o => {
        if (o.se) { const se = o.se, st = sessSteps(se), sec = st.reduce((a, x) => a + x.sec, 0), kc = se.met * w * sec / 3600, n = doneT.filter(e => e.id === se.id).length;
          return `<button class="card sess" data-act="sess" data-id="${se.id}"><div class="cv"><img src="${src(se.cover, 1)}" alt="" loading="lazy"></div><div class="bd"><b>${se.n}</b><p>${se.desc}</p><div class="tags"><span class="tag ${TC[se.tipo]}">${TN[se.tipo]}</span><span class="tag">${ic('play', 10)} guiado</span><span class="tag">${Math.round(sec / 60)} min</span>${kc ? `<span class="tag">~${f0(kc)} kcal</span>` : ''}${n ? `<span class="tag mint">feita hoje</span>` : ''}</div></div></button>`; }
        const ro = o.ro;
        return `<button class="card sess" data-act="rout" data-id="${ro.id}"><div class="cv"><img src="${src(ro.cover, 1)}" alt="" loading="lazy"></div><div class="bd"><b>${ro.n}</b><p>${ro.desc}</p><div class="tags"><span class="tag ${TC[ro.tipo]}">${TN[ro.tipo]}</span><span class="tag">${ic('check', 10, 3)} lista</span><span class="tag">~${ro.min} min</span><span class="tag">${ro.ids.length} exercícios</span></div></div></button>`;
      }).join('') : '<div class="card flat note" style="text-align:center">Nada com estes filtros. Experimenta “Todos”.</div>');
  } else {
    const all = Object.values(EX), q = UI.lq.toLowerCase();
    const xs = all.filter(x => (UI.lt === 'all' || tipoOf(x) === UI.lt) && (UI.lg === 'all' || x.g === UI.lg) && x.lv <= UI.llv && (x.n + ' ' + x.en + ' ' + x.eq + ' ' + GN[x.g] + ' ' + TN[tipoOf(x)]).toLowerCase().includes(q));
    body = `<input class="in" id="libq" placeholder="Procurar (ex.: prensa, polia, glúteos)" value="${esc(UI.lq)}" style="margin-bottom:10px">
     <div class="seg" style="margin-bottom:8px">${[['all', 'Tudo']].concat(Object.entries(TN)).map(([k, n]) => `<button class="${k === UI.lt ? 'on' : ''}" data-act="lt" data-v="${k}" style="font-size:12px">${k === 'along' ? 'Alongar' : k === 'resist' ? 'Resist.' : n}</button>`).join('')}</div>
     <div class="chips">${[['all', 'Todos os grupos']].concat(Object.entries(GN)).map(([k, n]) => `<button class="chip ${k === UI.lg ? 'on' : ''}" data-act="lg" data-g="${k}">${n}</button>`).join('')}</div>
     <div class="seg" style="margin-top:2px">${[[9, 'Todos os níveis'], [1, 'Nível 1'], [2, 'Até nível 2']].map(([v, l]) => `<button class="${UI.llv === v ? 'on' : ''}" data-act="llv" data-v="${v}">${l}</button>`).join('')}</div>
     <p class="note" style="margin:0 2px 10px">${xs.length} de ${all.length} exercícios, por tipo (força, resistência, cardio, alongamento), grupo muscular e nível.</p>
     <div class="card list">${xs.length ? xs.map(x => `<button class="row" data-act="libex" data-id="${x.id}"><img class="th" src="${src(x.id, 1)}" alt="" loading="lazy"><div class="tx"><b>${esc(x.n)}</b><small>${TN[tipoOf(x)]} · ${GN[x.g]} · nível ${x.lv}</small></div><span class="chev">${ic('chev', 18)}</span></button>`).join('') : '<div style="padding:20px;text-align:center" class="note">Nada com estes filtros. Experimenta “Tudo”.</div>'}</div>
     <p class="note" style="text-align:center">Fotos: Free Exercise DB (domínio público).</p>`;
  }
  el.innerHTML = head(PH_NAMES[S.ph].split(' · ')[0] + ' · semana ' + weekNo(), 'Treino') + seg('treino', [['plano', 'O meu plano'], ['exp', 'Explorar'], ['lib', 'Biblioteca']]) + body;
  const lq = $('libq'); if (lq) lq.oninput = () => { UI.lq = lq.value; if (UI.lq) { UI.lg = 'all'; UI.lt = 'all'; } const pos = lq.selectionStart; renderTreino(); const n = $('libq'); n.focus(); n.setSelectionRange(pos, pos); };
}
function workOf(i) { const k = dayKey(); S.work[k] = S.work[k] || {}; const kk = DAYS[S.day].ids[i] + '_' + i; return S.work[k][kk] = S.work[k][kk] || { sets: 0 }; }
const restSec = () => S.restSec || (S.ph === 2 ? 60 : 75);
function restHtml(i) {
  if (!REST || REST.i !== i || REST.key !== dayKey()) return '';
  const left = Math.max(0, (REST.end - Date.now()) / 1000);
  return `<div class="restbar"><b id="restnum">${Math.ceil(left)} s</b><div class="tr"><i id="restfill" style="width:${100 - left / REST.total * 100}%"></i></div><button data-act="restAdd">+15 s</button><button data-act="restSkip" data-i="${i}">Saltar</button></div>`;
}
function exSheet(i) {
  const d = DAYS[S.day], id = d.ids[i], x = EX[id], key = id + '_' + S.ph + '_' + S.day, r = kcalEx(x, key), on = isChecked(id + '_' + i), extra = i >= d.base;
  const multi = !x.cardio && x.s > 1, w = workOf(i), sg = suggest(id), hist = loadHist(id), last = hist[hist.length - 1];
  if (x.ld && w.kg == null) w.kg = sg && sg.kg != null ? sg.kg : 0;
  let work = '';
  if (multi) {
    const allDone = w.sets >= x.s;
    work = `<div class="box">
      ${x.ld ? `<h4>Carga${x.step === 1 ? ' · por halter' : ''}</h4>
       <div class="stepper"><button data-act="kg" data-i="${i}" data-d="-1" aria-label="Menos carga">${ic('minus', 18)}</button><input type="number" inputmode="decimal" step="0.5" min="0" id="kgin" value="${w.kg}" data-act="kgset" data-i="${i}" aria-label="Carga em kg"><span class="u">kg</span><button data-act="kg" data-i="${i}" data-d="1" aria-label="Mais carga">${ic('plus', 18)}</button></div>
       <div class="call ${sg.dir === 'up' ? '' : sg.dir === 'down' ? 'amb' : 'lil'}" style="margin:10px 0 14px">${ic(sg.dir === 'up' ? 'up' : sg.dir === 'down' ? 'down' : 'info', 18)}<div>${sg.msg}${last ? ` <span style="opacity:.75">Última vez: ${fk(last.kg)}, ${FEEL[last.f]} (${dm(last.d)}).</span>` : ''}</div></div>` : ''}
      <h4>Séries</h4>
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px"><div class="sets">${Array.from({ length: x.s }, (_, k) => `<span class="${k < w.sets ? 'on' : ''}">${k < w.sets ? ic('check', 14, 3) : k + 1}</span>`).join('')}</div><button class="link" data-act="restCycle" data-i="${i}">${ic('timer', 14)} Descanso ${restSec()} s</button></div>
      <div id="restbox" style="margin-top:12px">${restHtml(i)}</div>
      ${w.ask ? `<h4 style="margin-top:4px">Como foram as últimas repetições?</h4><div class="feel"><button class="e" data-act="feel" data-i="${i}" data-f="e">Fácil<small>sobravam 3 ou mais</small></button><button class="m" data-act="feel" data-i="${i}" data-f="m">No ponto<small>sobravam 1–2</small></button><button class="h" data-act="feel" data-i="${i}" data-f="h">Difícil<small>não acabei todas</small></button></div>`
        : allDone ? `<p class="note" style="margin:0">Séries todas feitas ✓ <button class="link" data-act="setReset" data-i="${i}">Recomeçar</button></p>`
          : `<button class="btn w" data-act="setDone" data-i="${i}">${ic('check', 18, 3)} Série ${w.sets + 1} feita</button>`}
     </div>`;
  }
  openSheet(`<div class="shead"><div><p class="eyebrow">${dayLbl()} · exercício ${i + 1} de ${d.ids.length}</p><h2 style="margin:0">${esc(x.n)}</h2><p class="note" style="margin:2px 0 0">${esc(x.eq)}</p></div><button class="x" data-act="closeSheet" aria-label="Fechar">${ic('x', 18)}</button></div>
   <div class="stack">
    <div class="seg" style="margin:0"><button class="${S.view !== 'pair' ? 'on' : ''}" data-act="view" data-v="anim" data-i="${i}">Movimento</button><button class="${S.view === 'pair' ? 'on' : ''}" data-act="view" data-v="pair" data-i="${i}">Início e fim</button></div>
    ${exMedia(id)}
    <div class="tags"><span class="tag ac">${x.cardio ? f0(r.min) + ' min' : x.dose}</span><span class="tag">${GN[x.g]}</span><span class="tag lil">nível ${x.lv}</span><span class="tag amb">${ic('flame', 12)} ~${f0(r.kcal)} kcal</span></div>
    ${x.cardio ? `<div style="display:flex;align-items:center;gap:10px"><span class="note" style="flex:1">Minutos de cardio</span><button class="x" data-act="cmin" data-i="${i}" data-d="-1">${ic('minus', 16)}</button><b style="min-width:30px;text-align:center">${f0(r.min)}</b><button class="x" data-act="cmin" data-i="${i}" data-d="1">${ic('plus', 16)}</button></div>` : ''}
    ${work}
    <ol class="steps">${x.st.map(s2 => `<li>${esc(s2)}</li>`).join('')}</ol>
    <div class="call">${ic('spine', 18)}<div><b>Coluna.</b> ${esc(x.sp)}</div></div>
    <button class="btn w ${on ? 'ghost' : multi ? 'soft' : 'mint'}" data-act="tick" data-i="${i}" data-close="1">${ic('check', 18, 3)} ${on ? 'Desmarcar exercício' : 'Marcar exercício como feito'}</button>
    <div class="btns">${extra && !d.free ? '' : `<button class="btn ghost" data-act="swapList" data-i="${i}">${ic('swap', 16)} Trocar</button>`}${extra || d.free ? `<button class="btn ghost" data-act="rmExtra" data-i="${i}">${ic('trash', 16)} Tirar do treino</button>` : ''}</div>
   </div>`);
}
function swapSheet(i) {
  const d = DAYS[S.day], cur = d.ids[i], orig = d.free ? cur : PLANS[S.ph][S.day].ids[i], g = EX[cur].g;
  const alts = Object.values(EX).filter(x => x.g === g && !d.ids.includes(x.id)).sort((a, b) => a.lv - b.lv);
  openSheet(`<div class="shead"><div><p class="eyebrow">Trocar · ${GN[g]}</p><h2 style="margin:0">${esc(EX[cur].n)}</h2><p class="note" style="margin:2px 0 0">Máquina ocupada ou não existe no teu ginásio? Escolhe outra.</p></div><button class="x" data-act="closeSheet" aria-label="Fechar">${ic('x', 18)}</button></div>
   ${cur !== orig ? `<button class="btn ghost w" style="margin-bottom:12px" data-act="pick" data-i="${i}" data-id="">${ic('left', 16)} Voltar ao original: ${esc(EX[orig].n)}</button>` : ''}
   <div class="altgrid">${alts.map(x => `<button class="alt" data-act="pick" data-i="${i}" data-id="${x.id}"><img src="${src(x.id, 1)}" alt="" loading="lazy">${esc(x.n)}<small>${esc(x.eq)} · nível ${x.lv}</small></button>`).join('')}</div>`);
}
function libSheet(id) {
  const x = EX[id];
  openSheet(`<div class="shead"><div><p class="eyebrow">${GN[x.g]} · nível ${x.lv}</p><h2 style="margin:0">${esc(x.n)}</h2><p class="note" style="margin:2px 0 0">${esc(x.eq)}</p></div><button class="x" data-act="closeSheet" aria-label="Fechar">${ic('x', 18)}</button></div>
   <div class="stack">
    <div class="seg" style="margin:0"><button class="${S.view !== 'pair' ? 'on' : ''}" data-act="view" data-v="anim" data-id="${id}">Movimento</button><button class="${S.view === 'pair' ? 'on' : ''}" data-act="view" data-v="pair" data-id="${id}">Início e fim</button></div>
    ${exMedia(id)}
    <div class="tags"><span class="tag ac">${x.dose}</span><span class="tag ${TC[tipoOf(x)]}">${TN[tipoOf(x)]}</span><span class="tag">${GN[x.g]}</span></div>
    <ol class="steps">${x.st.map(s => `<li>${esc(s)}</li>`).join('')}</ol>
    <div class="call">${ic('spine', 18)}<div><b>Coluna.</b> ${esc(x.sp)}</div></div>
    <div><p class="note" style="margin:0 0 8px">Juntar a um dia da ${PH_NAMES[S.ph].split(' · ')[0]}:</p><div class="days" style="margin:0;grid-template-columns:repeat(5,1fr)">${DAYS.map((d, i) => `<button class="day" data-act="addEx" data-id="${id}" data-i="${i}"><b>${d.free ? 'Livre' : 'Dia ' + (i + 1)}</b><small>${d.free ? 'à medida' : d.t.split(/[ ,]/)[0]}</small></button>`).join('')}</div></div>
   </div>`);
}

/* =========================================================
   ECRÃ: COMER
   ========================================================= */
const KETO_NOTES = [
  ['Evita', 'arroz, pão, massa, batata, batata-doce, mandioca, feijão, milho, abóbora, fruta doce, açúcar, mel, sumos, refrigerantes e cerveja.'],
  ['Podes à vontade', 'ovos, frango, carne de vaca, atum e sardinha em lata, couve, repolho, beringela, pepino, alface e abacate.'],
  ['Com moderação', 'tomate, cebola, ginguba, iogurte natural e queijo.'],
  ['Em jejum', 'água, chá e café sem açúcar.'],
  ['Gripe keto', 'nas primeiras 1–2 semanas pode haver cansaço e dor de cabeça. Põe sal na comida, bebe caldo e come abacate e folhas verdes.'],
  ['Plantão', 'usa o dia “marmita” e leva ginguba e um ovo cozido de reserva.'],
  ['Antes de começar', 'se tomas medicação para diabetes ou tensão, ou tens doença renal ou hepática, valida com o teu médico. É um plano-exemplo, não substitui um nutricionista.'],
];
function renderComer() {
  if (UI.comer === 'agua' || UI.comer === 'balanco') UI.comer = 'diario';
  const el = $('s-comer'), t = today(), tIdx = (new Date().getDay() + 6) % 7;
  let body = '';
  if (UI.comer === 'plano') {
    const all = KETO.map((_, i) => tot(dayIts(i))), av = k => all.reduce((s, x) => s + x[k], 0) / 7;
    const day = KETO[UI.kd], mdone = S.meals[t] || {}, isT = UI.kd === tIdx;
    body = `<div class="grid2" style="margin-bottom:12px">
       <div class="card kpi"><small>Média por dia</small><b>${f0(av('k'))}</b><span class="u">kcal</span><span class="s">+ 1 doce ≈ ${f0(av('k') + 200)} kcal</span></div>
       <div class="card kpi"><small>Hidratos líquidos</small><b>${f0(av('c'))}</b><span class="u">g/dia</span><span class="s">meta keto: ≤ 30 g</span></div>
       <div class="card kpi"><small>Proteína</small><b>${f0(av('p'))}</b><span class="u">g/dia</span><span class="s">protege o músculo</span></div>
       <div class="card kpi"><small>A tua meta</small><b>${kcalTarget() ? f0(kcalTarget()) : '—'}</b><span class="u">kcal</span><span class="s">tens margem para fome</span></div></div>
     <div class="chips">${WK.map((w, i) => `<button class="chip ${i === UI.kd ? 'on' : ''}" data-act="kd" data-i="${i}">${w}${i === tIdx ? ' · hoje' : ''}</button>`).join('')}</div>
     ${day.nota ? `<div class="call amb" style="margin-bottom:12px">${ic('info', 18)}<div>${esc(day.nota)}</div></div>` : ''}
     ${day.m.map((m, i) => { const tt = tot(m.it), dn = isT && mdone[i]; return `<div class="card"><div style="display:flex;gap:12px;align-items:flex-start"><div style="flex:1"><span class="tag ${i ? 'lil' : 'ac'}">Refeição ${i + 1} · ${m.h}</span><h3 style="margin-top:8px">${esc(m.t)}</h3></div>${isT ? `<button class="ck ${dn ? 'on' : ''}" data-act="meal" data-i="${i}" aria-label="Feita">${ic('check', 18, 3)}</button>` : ''}</div>
        <ul class="ing" style="margin:10px 0 12px">${m.it.map(([id, q]) => `<li><b>${qty(q)}</b>${esc(ING[id][0])}</li>`).join('')}</ul>${macroTags(tt)}</div>`; }).join('')}
     <div class="card flat"><b>Total de ${WK[UI.kd].toLowerCase()}</b><div style="margin-top:8px">${macroTags(all[UI.kd])}</div><p class="note" style="margin:10px 0 0">Com fome? Junta ½ abacate (+160 kcal) ou 30 g de ginguba (+170 kcal). Podes trocar as proteínas entre si: frango ↔ carne ↔ atum ↔ sardinha ↔ ovos.</p></div>
     <div class="sec">Regras do keto</div>
     <div class="card list">${KETO_NOTES.map(([a, b]) => `<div class="row" style="align-items:flex-start"><div class="tx"><b>${a}</b><small style="font-size:13.5px;color:var(--ink)">${b}</small></div></div>`).join('')}</div>`;
  } else if (UI.comer === 'doces') {
    body = `<div class="call amb" style="margin-bottom:12px">${ic('cake', 18)}<div>Usa <b>adoçante sem calorias</b> (sucralose ou stévia) e <b>cacau em pó 100 %</b>, não achocolatado. 1 doce por dia, depois de uma refeição, para não abrir o apetite.</div></div>
     ${DOCES.map((x, i) => { const tt = tot(x.it), on = S.doce[t] === i; return `<div class="card"><div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start"><div><h3>${esc(x.n)}</h3><p class="note" style="margin:2px 0 0">${esc(x.t)}</p></div><button class="btn sm ${on ? 'mint' : 'soft'}" data-act="doce" data-i="${i}">${on ? ic('check', 14, 3) + ' Hoje' : 'Comer hoje'}</button></div>
       <div style="margin:10px 0">${macroTags(tt)}</div>
       <details><summary class="link" style="list-style:none">Ver receita</summary>
        <ul class="ing" style="margin:10px 0">${x.it.map(([id, q]) => `<li><b>${qty(q)}</b>${esc(ING[id][0])}</li>`).join('')}<li><b>+</b>${esc(x.extra)}</li></ul>
        <ol class="steps">${x.st.map(s => `<li>${esc(s)}</li>`).join('')}</ol></details></div>`; }).join('')}`;
  } else if (UI.comer === 'diario') {
    body = diarioHtml();
  } else if (UI.comer === 'compras') {
    const sum = {}; KETO.forEach((_, i) => dayIts(i).forEach(([id, q]) => sum[id] = (sum[id] || 0) + q));
    const secs = {}; Object.entries(sum).forEach(([id, q]) => { const s = ING[id][5]; (secs[s] = secs[s] || []).push([id, q]); });
    const order = ['Talho', 'Ovos e laticínios', 'Mercearia', 'Frescos'];
    const extra = [['x_ad', 'Adoçante sem calorias (sucralose ou stévia)'], ['x_cac', 'Cacau em pó 100 %, sem açúcar'], ['x_sal', 'Sal, alho, jindungo, limão, louro']];
    const n = Object.values(S.shop).filter(Boolean).length;
    body = `<p class="note" style="margin:0 2px 12px">Lista para 1 pessoa, 7 dias. Quantidades em porções (ex.: “21 ovos”). Vai marcando no supermercado ou no mercado.</p>
     ${order.filter(s => secs[s]).map(s => `<div class="sec">${s}</div><div class="card list">${secs[s].map(([id, q]) => { const k = 'i_' + id, on = !!S.shop[k]; return `<div class="row ${on ? 'done' : ''}"><div class="tx"><b>${esc(ING[id][0])}</b><small>${id === 'ovo' ? f0(q) + ' ovos (≈ ' + Math.ceil(q / 30) + ' cartão de 30)' : f0(q) + ' porç' + (q > 1 ? 'ões' : 'ão')}</small></div><button class="ck ${on ? 'on' : ''}" data-act="shop" data-k="${k}" aria-label="Comprado">${ic('check', 18, 3)}</button></div>`; }).join('')}</div>`).join('')}
     <div class="sec">Para os doces e temperos</div><div class="card list">${extra.map(([k, l]) => { const on = !!S.shop[k]; return `<div class="row ${on ? 'done' : ''}"><div class="tx"><b>${l}</b></div><button class="ck ${on ? 'on' : ''}" data-act="shop" data-k="${k}" aria-label="Comprado">${ic('check', 18, 3)}</button></div>`; }).join('')}</div>
     ${n ? `<button class="btn ghost w" data-act="shopClear">Limpar lista (${n} marcados)</button>` : ''}`;
  }
  el.innerHTML = head('Keto · 2 refeições por dia', 'Comer') + seg('comer', [['diario', 'Diário'], ['plano', 'Plano'], ['doces', 'Doces'], ['compras', 'Compras']]) + body;
}

/* =========================================================
   ECRÃ: PROGRESSO
   ========================================================= */
const MF = [['p', 'Peso', 'kg'], ['c', 'Cintura', 'cm'], ['a', 'Anca', 'cm'], ['t', 'Coxa', 'cm'], ['b', 'Braço', 'cm'], ['h', 'Peito', 'cm']];
const medS = k => [...S.med].filter(e => e[k] != null).sort((a, b) => a.d < b.d ? -1 : 1).map(e => ({ d: e.d, v: e[k] }));
const GM = [
  { k: 'p', n: 'Peso (kg)', t: 'line', u: 'kg', c: '#E5487D', dn: true, get: () => medS('p') },
  { k: 'c', n: 'Cintura (cm)', t: 'line', u: 'cm', c: '#7357DB', dn: true, get: () => medS('c') },
  { k: 'a', n: 'Anca (cm)', t: 'line', u: 'cm', c: '#7357DB', dn: true, get: () => medS('a') },
  { k: 't', n: 'Coxa (cm)', t: 'line', u: 'cm', c: '#7357DB', dn: true, get: () => medS('t') },
  { k: 'b', n: 'Braço (cm)', t: 'line', u: 'cm', c: '#1E9A6C', get: () => medS('b') },
  { k: 'h', n: 'Peito (cm)', t: 'line', u: 'cm', c: '#1E9A6C', get: () => medS('h') },
  { k: 'kt', n: 'Calorias gastas no treino', t: 'bar', u: 'kcal', c: '#E5487D', get: d => kcalDate(d) },
  { k: 'w', n: 'Água por dia (ml)', t: 'bar', u: 'ml', c: '#4C93E8', ref: () => waterBase(), get: d => S.water[d] || 0 },
  { k: 'i', n: 'Calorias comidas por dia', t: 'bar', u: 'kcal', c: '#C77E12', ref: () => kcalTarget(), get: d => dayEat(d).k },
  { k: 'hc', n: 'Hidratos líquidos por dia (g)', t: 'bar', u: 'g', c: '#7357DB', ref: () => 30, get: d => dayEat(d).c },
  { k: 'fj', n: 'Jejum (horas)', t: 'bar', u: 'h', c: '#7357DB', ref: () => S.fast.goal, get: d => fastHours(d) },
  { k: 'dor', n: 'Dor lombar (0–3)', t: 'bar', u: '', c: '#C77E12', get: d => (S.ck[d] || {}).dor || 0 },
  { k: 'st', n: 'Passos por dia', t: 'bar', u: 'passos', c: '#1E9A6C', ref: () => 8000, get: d => +S.steps[d] || 0 },
  { k: 'tw', n: 'Treinos feitos por semana', t: 'week', u: 'treinos', c: '#3A1C39', ref: () => 4 },
];
function reg(pts) { const xs = pts.map(p => diffD(pts[0].d, p.d)), n = xs.length; const sx = xs.reduce((a, b) => a + b, 0), sy = pts.reduce((a, p) => a + p.v, 0), sxy = xs.reduce((a, x, i) => a + x * pts[i].v, 0), sxx = xs.reduce((a, x) => a + x * x, 0); const den = n * sxx - sx * sx; if (!den) return null; const b = (n * sxy - sx * sy) / den; return { b, a: (sy - b * sx) / n }; }
const GW = 330, GH = 200, GL = 40, GR = 10, GT = 14, GB = 26;
function yTicks(mn, mx, Y, fmt) { let s = ''; for (let i = 0; i < 4; i++) { const v = mn + (mx - mn) * i / 3; s += `<line x1="${GL}" x2="${GW - GR}" y1="${Y(v)}" y2="${Y(v)}" stroke="#EEE2E8"/><text x="${GL - 6}" y="${Y(v) + 3}" font-size="9.5" text-anchor="end" fill="#A3909E">${fmt(v)}</text>`; } return s; }
function svgLine(pts, col) {
  const xs = pts.map(p => diffD(pts[0].d, p.d)), xm = Math.max(...xs, 1);
  let mn = Math.min(...pts.map(p => p.v)), mx = Math.max(...pts.map(p => p.v)); const pd = (mx - mn) * 0.2 || 1; mn -= pd; mx += pd;
  const X = v => GL + v / xm * (GW - GL - GR), Y = v => GT + (1 - (v - mn) / (mx - mn)) * (GH - GT - GB);
  let s = yTicks(mn, mx, Y, v => v.toFixed(1).replace('.', ','));
  const r = pts.length >= 3 ? reg(pts) : null;
  if (r) s += `<line x1="${X(0)}" y1="${Y(r.a)}" x2="${X(xm)}" y2="${Y(r.a + r.b * xm)}" stroke="#2A1A28" stroke-width="1.5" stroke-dasharray="5 4" opacity=".45"/>`;
  s += `<path d="M${pts.map((p, i) => X(xs[i]) + ',' + Y(p.v)).join(' L')} L${X(xs[xs.length - 1])},${GH - GB} L${X(0)},${GH - GB}Z" fill="${col}" opacity=".08"/>`;
  s += `<polyline points="${pts.map((p, i) => X(xs[i]) + ',' + Y(p.v)).join(' ')}" fill="none" stroke="${col}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;
  s += pts.map((p, i) => `<circle cx="${X(xs[i])}" cy="${Y(p.v)}" r="${pts.length > 30 ? 2.5 : 4}" fill="#fff" stroke="${col}" stroke-width="2"/>`).join('');
  const lp = pts[pts.length - 1]; s += `<text x="${X(xs[xs.length - 1])}" y="${Y(lp.v) - 10}" font-size="11" font-weight="800" text-anchor="end" fill="#2A1A28">${f1(lp.v)}</text>`;
  s += `<text x="${GL}" y="${GH - 8}" font-size="9.5" fill="#A3909E">${dm(pts[0].d)}</text><text x="${GW - GR}" y="${GH - 8}" font-size="9.5" text-anchor="end" fill="#A3909E">${dm(lp.d)}</text>`;
  return `<svg viewBox="0 0 ${GW} ${GH}" style="width:100%;height:auto" role="img" aria-label="gráfico">${s}</svg>`;
}
function svgBars(cats, col, ref) {
  const mx = Math.max(ref || 0, ...cats.map(c => c.v), 1) * 1.12, bw = (GW - GL - GR) / cats.length, Y = v => GT + (1 - v / mx) * (GH - GT - GB);
  let s = yTicks(0, mx, Y, v => f0(v));
  if (ref) s += `<line x1="${GL}" x2="${GW - GR}" y1="${Y(ref)}" y2="${Y(ref)}" stroke="#2A1A28" stroke-width="1.5" stroke-dasharray="5 4" opacity=".5"/><text x="${GW - GR}" y="${Y(ref) - 4}" font-size="9.5" text-anchor="end" fill="#2A1A28">meta ${f0(ref)}</text>`;
  s += cats.map((c, i) => c.v > 0 ? `<rect x="${GL + i * bw + bw * .18}" y="${Y(c.v)}" width="${bw * .64}" height="${Y(0) - Y(c.v)}" rx="${Math.min(4, bw * .3)}" fill="${col}"/>` : '').join('');
  s += `<text x="${GL}" y="${GH - 8}" font-size="9.5" fill="#A3909E">${cats[0].l}</text><text x="${GW - GR}" y="${GH - 8}" font-size="9.5" text-anchor="end" fill="#A3909E">${cats[cats.length - 1].l}</text>`;
  return `<svg viewBox="0 0 ${GW} ${GH}" style="width:100%;height:auto" role="img" aria-label="gráfico">${s}</svg>`;
}
function renderProg() {
  const el = $('s-prog'), t = today(), c = calc();
  let body = '';
  if (UI.prog === 'resumo') {
    if (!c.ok) body = weekCardHtml() + `<div class="card"><h3>Falta o teu perfil</h3><p class="note">Preenche peso, altura e idade para calcular IMC, metabolismo e calorias.</p><button class="btn w" data-act="profile">Preencher perfil</button></div>`;
    else {
      const [inf, col] = imcInfo(c.imc), hm = c.h / 100, pmin = 18.5 * hm * hm, pmax = 24.9 * hm * hm, prot = 1.6 * 24.9 * hm * hm;
      body = weekCardHtml() + `<div class="sec">Os teus números</div><div class="grid2">
        <div class="card kpi"><small>IMC</small><b>${f1(c.imc)}</b><span class="s"><span class="tag ${col}">${inf}</span></span></div>
        <div class="card kpi"><small>Metabolismo basal</small><b>${f0(c.bmr)}</b><span class="u">kcal</span><span class="s">em repouso absoluto</span></div>
        <div class="card kpi"><small>Gasto diário</small><b>${f0(c.tdee)}</b><span class="u">kcal</span><span class="s">com a tua atividade</span></div>
        <div class="card kpi"><small>Para emagrecer</small><b>${f0(kcalTarget())}</b><span class="u">kcal</span><span class="s">~500 abaixo, mín. 1400</span></div></div>
       <div class="card list" style="margin-top:12px">
        <div class="row"><div class="ic">${ic('food', 18)}</div><div class="tx"><b>${f0(prot * 0.9)}–${f0(prot)} g de proteína por dia</b><small>protege o músculo enquanto emagreces</small></div></div>
        <div class="row"><div class="ic" style="background:#E6F0FD;color:#2F78D6">${ic('drop', 18)}</div><div class="tx"><b>${fL(waterBase())} L de água por dia</b><small>+0,5 L em dia de treino ou plantão</small></div></div>
        <div class="row"><div class="ic" style="background:var(--mint2);color:var(--mint)">${ic('target', 18)}</div><div class="tx"><b>Peso saudável: ${f0(pmin)}–${f0(pmax)} kg</b><small>meta realista: 0,3–0,6 kg por semana</small></div></div></div>
       <p class="note" style="margin:4px 2px">Fórmula de Mifflin-St Jeor (mulheres). Estimativas com ±10 %. Não substitui a avaliação de um nutricionista ou médico do desporto.</p>`;
    }
  } else if (UI.prog === 'medidas') {
    const arr = [...S.med].sort((a, b) => a.d < b.d ? -1 : 1), first = arr[0], last = arr[arr.length - 1];
    body = `<div class="card"><h3>Novo registo</h3><p class="note" style="margin:4px 0 4px">1× por semana, de manhã, em jejum, sempre nos mesmos pontos.</p>
      <label class="f">Data</label><input class="in" type="date" id="md" value="${t}">
      <div class="grid2">${MF.map(([k, n, u]) => `<div><label class="f">${n} (${u})</label><input class="in" type="number" inputmode="decimal" step="0.1" id="m_${k}"></div>`).join('')}</div>
      <button class="btn w" style="margin-top:14px" data-act="saveMed">Guardar medidas</button>
      <p class="note" style="margin:10px 0 0">Cintura: ao nível do umbigo. Anca: parte mais larga dos glúteos. Coxa e braço: a meio, relaxados. Peito: ao nível dos mamilos.</p></div>` +
      (arr.length ? `<div class="sec">Último registo · ${dfull(last.d)}</div><div class="grid2">${MF.filter(([k]) => last[k] != null).map(([k, n, u]) => { const a = first[k], b = last[k]; let dl = 'início'; if (arr.length > 1 && a != null && first !== last) { const df = b - a, good = k === 'h' || k === 'b' ? null : df < 0; dl = `<span style="color:${df === 0 || good === null ? 'var(--ink2)' : good ? 'var(--mint)' : 'var(--acd)'};font-weight:800">${df > 0 ? '+' : ''}${f1(df)} ${u}</span> desde ${dm(first.d)}`; } return `<div class="card kpi"><small>${n}</small><b>${f1(b)}</b><span class="u">${u}</span><span class="s">${dl}</span></div>`; }).join('')}</div>
       ${last.c && last.a ? `<div class="card flat" style="margin-top:12px"><b>Cintura/anca: ${(last.c / last.a).toFixed(2).replace('.', ',')}</b> <span class="note">(${last.c / last.a > 0.85 ? 'acima de 0,85: a acompanhar' : 'abaixo de 0,85'})</span>${c.h ? `<br><b>Cintura/altura: ${(last.c / c.h).toFixed(2).replace('.', ',')}</b> <span class="note">(meta: abaixo de 0,50)</span>` : ''}</div>` : ''}
       <div class="sec">Histórico</div><div class="card" style="overflow-x:auto"><table class="hist"><tr><th style="text-align:left">Data</th>${MF.map(m => `<th>${m[1]}</th>`).join('')}<th></th></tr>${[...arr].reverse().map(e => `<tr><td style="text-align:left">${dm(e.d)}</td>${MF.map(m => `<td>${e[m[0]] != null ? f1(e[m[0]]) : '–'}</td>`).join('')}<td><button class="x" style="width:28px;height:28px" data-act="delMed" data-d="${e.d}" aria-label="Apagar">${ic('x', 14)}</button></td></tr>`).join('')}</table></div>`
        : `<div class="card flat" style="text-align:center"><b>Ainda sem registos</b><p class="note">A tua primeira medição é o teu ponto de partida.</p></div>`);
  } else if (UI.prog === 'graf') {
    const wk = monOf(t); let tw = 0, kw = 0; for (let i = 0; i < 7; i++) { const d = addD(wk, i); if (d > t) break; if (workoutPct(d) >= 0.8) tw++; kw += kcalDate(d); }
    let ws = 0, wn = 0, kd7 = 0; for (let i = 0; i < 7; i++) { const d = addD(t, -i); if (S.water[d]) { ws += S.water[d]; wn++; } if (mealsDone(d)) kd7++; }
    const m = GM.find(x => x.k === UI.gm); let svg = '', sum = '';
    if (m.t === 'line') {
      let pts = m.get(); if (UI.gr) pts = pts.filter(p => p.d >= addD(t, -UI.gr + 1));
      if (!pts.length) svg = '<p class="note" style="text-align:center;padding:30px 0">Ainda sem registos neste período.<br>Regista em Medidas.</p>';
      else {
        svg = svgLine(pts, m.c); const first = pts[0], last = pts[pts.length - 1], df = last.v - first.v;
        sum = `Último: <b>${f1(last.v)} ${m.u}</b> (${dfull(last.d)})`;
        if (pts.length > 1) { sum += `<br>Variação: <b>${df > 0 ? '+' : ''}${f1(df)} ${m.u}</b>`; const r = pts.length >= 3 ? reg(pts) : null; if (r && diffD(first.d, last.d) >= 7) { const wv = r.b * 7; sum += ` · tendência <b>${wv > 0 ? '+' : ''}${f1(wv)} ${m.u}/semana</b>`; } }
      }
    } else {
      let cats = [];
      if (m.t === 'bar') { const n = UI.gr || 60; for (let i = n - 1; i >= 0; i--) { const d = addD(t, -i); cats.push({ l: dm(d), v: Math.round(m.get(d)) }); } }
      else { const n = UI.gr ? Math.max(4, Math.ceil(UI.gr / 7)) : 12; for (let i = n - 1; i >= 0; i--) { const w = addD(monOf(t), -7 * i); let cc = 0; for (let j = 0; j < 7; j++) if (workoutPct(addD(w, j)) >= 0.8) cc++; cats.push({ l: dm(w), v: cc }); } }
      const wd = cats.filter(c2 => c2.v > 0);
      if (!wd.length) svg = '<p class="note" style="text-align:center;padding:30px 0">Ainda sem dados neste período.<br>Aparecem à medida que usas a app.</p>';
      else { svg = svgBars(cats, m.c, m.ref ? m.ref() : 0); const total = wd.reduce((a, c2) => a + c2.v, 0); sum = m.t === 'week' ? `Total: <b>${total} treinos</b> · média <b>${f1(total / cats.length)}</b>/semana` : `Média nos dias com registo: <b>${f0(total / wd.length)} ${m.u}</b>`; }
    }
    body = `<div class="grid2" style="margin-bottom:12px">
       <div class="card kpi"><small>Treinos esta semana</small><b>${tw}</b><span class="u">/ 4</span></div>
       <div class="card kpi"><small>Gasto em treino</small><b>${f0(kw)}</b><span class="u">kcal</span><span class="s">esta semana</span></div>
       <div class="card kpi"><small>Água (média 7 dias)</small><b>${wn ? fL(ws / wn) : '—'}</b><span class="u">L</span></div>
       <div class="card kpi"><small>Dias keto (7 dias)</small><b>${kd7}</b><span class="u">/ 7</span></div></div>
     <div class="card"><select class="in" id="gmet">${GM.map(x => `<option value="${x.k}" ${x.k === UI.gm ? 'selected' : ''}>${x.n}</option>`).join('')}</select>
      <div class="seg" style="margin:10px 0">${[[7, '7 d'], [30, '30 d'], [90, '90 d'], [0, 'Tudo']].map(([v, l]) => `<button class="${v === UI.gr ? 'on' : ''}" data-act="gr" data-v="${v}">${l}</button>`).join('')}</div>
      ${svg}<p class="note" style="margin:8px 0 0">${sum}</p></div>`;
  } else if (UI.prog === 'hist') {
    body = histHtml();
  } else if (UI.prog === 'fotos') {
    body = `<div id="phbox"><p class="note" style="text-align:center;padding:20px">A carregar as fotos…</p></div>`; setTimeout(renderPhotos, 0);
  } else {
    body = cargasHtml();
  }
  el.innerHTML = head('O teu caminho', 'Progresso') + nav('prog', [['resumo', 'Resumo'], ['hist', 'Histórico'], ['medidas', 'Medidas'], ['fotos', 'Fotos'], ['cargas', 'Cargas'], ['graf', 'Gráficos']]) + body;
  const gm = $('gmet'); if (gm) gm.onchange = () => { UI.gm = gm.value; renderProg(); };
}

/* =========================================================
   ECRÃ: MAIS (menu, desafio, regras, backup, sobre)
   ========================================================= */
function renderMais() {
  const el = $('s-mais');
  const back = `<button class="back" data-act="seg" data-k="mais" data-v="menu">${ic('left', 18)} Mais</button>`;
  if (UI.mais === 'menu') {
    const items = [['desafio', 'target', 'Desafio de dias', S.chal ? esc(S.chal.name) : 'cria o teu, ao estilo 75 Hard'], ['conq', 'medal', 'Conquistas', Object.keys(S.badges || {}).length + ' de ' + BADGES.length + ' desbloqueadas'], ['progredir', 'up', 'Como subir as cargas', 'quando subir, quanto, e quando manter'], ['perfil', 'user', 'Perfil e dados', 'peso, altura, idade, atividade'], ['regras', 'book', 'Regras de ouro do treino', 'para principiantes e para a lombar'], ['instalar', 'phone', 'Instalar a app', isStandalone() ? 'já está instalada ✓' : 'ícone no ecrã e funciona offline'], ['backup', 'down', 'Cópia de segurança', 'exportar ou importar os teus dados'], ['sobre', 'info', 'Sobre', 'fotos, fontes e avisos']];
    el.innerHTML = head('Definições e extras', 'Mais') + `<div class="card list">${items.map(([k, i, a, b]) => `<button class="row" data-act="${k === 'perfil' ? 'profile' : k === 'instalar' ? 'installInfo' : 'seg'}" data-k="mais" data-v="${k}"><div class="ic">${ic(i, 18)}</div><div class="tx"><b>${a}</b><small>${b}</small></div><span class="chev">${ic('chev', 18)}</span></button>`).join('')}</div>`;
  } else if (UI.mais === 'regras') {
    const R = [['Aquece', '5–8 min de passadeira ou bicicleta antes de tudo.'], ['Carga certa', 'as últimas 2 repetições custam, mas a técnica fica perfeita. Sobe a carga quando 3 × 12 ficar fácil.'], ['Ritmo', '1–2 s a empurrar ou puxar, 3 s a voltar. Expira no esforço.'], ['Descanso', '60–90 s entre séries.'], ['Regula a máquina', 'o eixo da máquina alinhado com a tua articulação. Pede ajuda a um instrutor na primeira vez.'], ['Coluna', 'costas sempre apoiadas, sem arredondar nem arquear. Se a lombalgia agudizar, para e troca de exercício.'], ['Plantão', 'não treines no dia do plantão nem no dia seguinte. Retoma no próximo dia do plano.']];
    el.innerHTML = back + head('Para principiantes', 'Regras de ouro') + `<div class="card"><ol class="steps">${R.map(([a, b]) => `<li><div><b>${a}.</b> ${b}</div></li>`).join('')}</ol></div>`;
  } else if (UI.mais === 'conq') {
    const st = stats();
    el.innerHTML = back + head(Object.keys(S.badges || {}).length + ' de ' + BADGES.length, 'Conquistas') + `<div class="bdg">${BADGES.map(b => { const [cur, goal] = b[4](st), on = !!(S.badges || {})[b[0]]; return `<div class="bd1 ${on ? 'on' : ''}"><div class="em">${b[1]}</div><b>${b[2]}</b><small>${on ? dm(S.badges[b[0]]) : b[3] + ' · ' + f0(Math.min(cur, goal)) + '/' + goal}</small></div>`; }).join('')}</div>`;
  } else if (UI.mais === 'progredir') {
    el.innerHTML = back + head('Progressão de cargas', 'Como subir') + GUIDE.map(([t2, items]) => `<div class="sec">${t2}</div><div class="card"><ol class="steps">${items.map(x => `<li><div>${x}</div></li>`).join('')}</ol></div>`).join('') + `<div class="call lil">${ic('info', 18)}<div>Na app: em cada exercício regista a carga, marca as séries e diz como correu. Na sessão seguinte eu sugiro subir, manter ou descer.</div></div>`;
  } else if (UI.mais === 'backup') {
    el.innerHTML = back + head('Os teus dados', 'Cópia de segurança') + `<div class="card"><p class="note" style="margin-top:0">Tudo fica guardado só neste telemóvel. Faz uma cópia de vez em quando, para não perderes nada se trocares de telemóvel ou limpares o browser.</p><div class="btns"><button class="btn" data-act="export">${ic('down', 18)} Exportar</button><button class="btn ghost" data-act="import">${ic('up', 18)} Importar</button></div></div>
     <div class="card flat"><b>Apagar tudo</b><p class="note">Recomeça a app do zero neste telemóvel.</p><button class="btn soft sm" data-act="wipe">${ic('trash', 16)} Apagar os meus dados</button></div>`;
  } else if (UI.mais === 'sobre') {
    el.innerHTML = back + head('Feita à tua medida', 'Push It') + `<div class="card"><p style="margin-top:0">App pessoal de treino, alimentação keto, água e progresso, feita à medida: amiga da coluna e a funcionar sem internet.</p><p class="note">Fotos dos exercícios: <b>Free Exercise DB</b> (domínio público). Fonte: Plus Jakarta Sans (SIL OFL). Gasto calórico estimado com METs do Compêndio de Atividades Físicas; metabolismo pela fórmula de Mifflin-St Jeor.</p><p class="note" style="margin-bottom:0">É uma ferramenta de apoio e não substitui a avaliação de um médico, nutricionista ou fisioterapeuta.</p></div>`;
  } else if (UI.mais === 'desafio') {
    el.innerHTML = back + renderChal();
    const n = $('cname'); if (n) n.oninput = () => draft.name = n.value;
  }
}
function renderChal() {
  if (!S.chal) {
    return head('Ao estilo 75 Hard, à tua medida', 'Desafio') + `<div class="card"><p class="note" style="margin-top:0">Escolhes a duração, as regras e quantos descansos tens por semana (plantão e recuperação contam). 0 descansos = modo hard.</p>
     <div class="btns"><button class="btn lil sm" data-act="pre" data-p="suave">Suave · 30 dias</button><button class="btn lil sm" data-act="pre" data-p="const">Constante · 75 dias</button></div>
     <label class="f">Nome</label><input class="in" id="cname" value="${esc(draft.name)}">
     <div class="grid2"><div><label class="f">Duração (dias)</label><input class="in" type="number" id="cdays" min="7" max="365" value="${draft.days}"></div><div><label class="f">Início</label><input class="in" type="date" id="cstart" value="${today()}"></div></div>
     <label class="f">Descansos por semana</label><div class="seg" style="margin:0">${[0, 1, 2, 3].map(n => `<button class="${n === draft.rest ? 'on' : ''}" data-act="crest" data-v="${n}">${n}</button>`).join('')}</div>
     <label class="f" style="margin-top:14px">Regras diárias</label></div>
     <div class="card list">${Object.entries(RULES).map(([id, r]) => `<label class="row" style="cursor:pointer"><div class="tx"><b>${r.label}</b>${r.auto ? '<small>automática: lida da app</small>' : ''}</div><input type="checkbox" class="rck" data-r="${id}" ${draft.ids.includes(id) ? 'checked' : ''} style="width:22px;height:22px;accent-color:var(--ac)"></label>`).join('')}
      ${draft.custom.map(r => `<label class="row"><div class="tx"><b>${esc(r.label)}</b><small>a tua regra</small></div><input type="checkbox" class="rck" data-c="${r.id}" checked style="width:22px;height:22px;accent-color:var(--ac)"></label>`).join('')}
      <div class="row"><input class="in" id="ccus" placeholder="Nova regra (ex.: 10 min de piano)"><button class="btn sm ghost" data-act="cadd">${ic('plus', 16)}</button></div></div>
     <button class="btn w" data-act="cgo">Começar desafio</button>`;
  }
  const c = S.chal, t = today(), st = chalStats(), dayNo = diffD(c.start, t) + 1, cd = UI.cdate;
  const headTxt = dayNo < 1 ? `Começa em ${1 - dayNo} dia(s)` : t > st.end ? 'Desafio terminado 🎉' : `Dia ${dayNo} de ${c.days}`;
  const cal = Array.from({ length: c.days }, (_, i) => { const d = addD(c.start, i), s = d > t ? 'fut' : dayStatus(d); return `<button class="${s === 'pending' ? '' : s} ${d === cd ? 'sel' : ''}" data-act="cday" data-d="${d}">${i + 1}</button>`; }).join('');
  let list = '';
  if (cd > t) list = '<p class="note">Este dia ainda não chegou.</p>';
  else {
    list = c.rules.map(r => { const ok = ruleOk(r, cd); return `<div class="row"><div class="tx"><b>${esc(r.label)}</b>${r.auto ? '<small>automática</small>' : ''}</div>${r.auto ? `<span class="ck ${ok ? 'on' : ''}">${ic('check', 18, 3)}</span>` : `<button class="ck ${ok ? 'on' : ''}" data-act="crule" data-r="${r.id}">${ic('check', 18, 3)}</button>`}</div>`; }).join('');
    if (c.restMax > 0) { const used = restUsed(cd); list += `<div class="row"><div class="tx"><b>Dia de descanso</b><small>${used}/${c.restMax} usados esta semana${c.rest[cd] && used > c.restMax ? ' · acima do limite, não conta' : ''}</small></div><button class="ck ${c.rest[cd] ? 'on' : ''}" data-act="crestday">${ic('moon', 16, 2.4)}</button></div>`; }
  }
  const s = cd > t ? '' : dayStatus(cd);
  return head(headTxt + ' · ' + dfull(c.start) + ' → ' + dfull(st.end), esc(c.name)) +
    `<div class="card"><div class="bar"><i style="width:${Math.min(100, (st.ok + st.rest) / c.days * 100)}%"></i></div>
     <div class="grid2" style="margin-top:14px"><div class="kpi"><small>Sequência atual</small><b>${st.cur}</b><span class="u">dias 🔥</span></div><div class="kpi"><small>Melhor sequência</small><b>${st.best}</b><span class="u">dias</span></div><div class="kpi"><small>Cumpridos</small><b>${st.ok}</b></div><div class="kpi"><small>Descansos</small><b>${st.rest}</b></div></div>
     ${st.miss ? `<p class="note" style="margin:12px 0 0">Falhaste ${st.miss} dia(s). Sem drama: o que conta é voltares amanhã.</p>` : ''}</div>
    <div class="card"><div class="cal">${cal}</div><div class="tags" style="margin-top:12px"><span class="tag ac">cumprido</span><span class="tag lil">descanso</span><span class="tag" style="background:#FBE1E1;color:#B33434">falhado</span></div></div>
    <div class="sec">${dfull(cd)}${s ? ' · ' + ({ ok: 'cumprido ✓', rest: 'descanso', miss: 'falhado', pending: 'em curso' }[s]) : ''}</div>
    <div class="card list">${list}</div>
    <button class="btn ghost w" data-act="creset">Terminar e criar outro desafio</button>`;
}

/* =========================================================
   folha, perfil, instalação
   ========================================================= */
let sheetOpen = false, skipPop = 0;
function openSheet(html) {
  const sh = $('sheet'); sh.innerHTML = '<div class="grab"></div>' + html; sh.scrollTop = 0;
  if (!sheetOpen) { sheetOpen = true; history.pushState({ sheet: 1 }, ''); }
  requestAnimationFrame(() => { sh.classList.add('on'); $('scrim').classList.add('on'); });
}
function closeSheet(fromPop) {
  if (!sheetOpen) return; sheetOpen = false;
  $('sheet').classList.remove('on'); $('scrim').classList.remove('on');
  if (!fromPop && history.state && history.state.sheet) { skipPop++; history.back(); }
}
window.addEventListener('popstate', () => { if (skipPop) { skipPop--; return; } if (PL) { plFinish(false, true); return; } if (sheetOpen) closeSheet(true); });
function profileSheet() {
  const p = S.perfil;
  openSheet(`<div class="shead"><div><p class="eyebrow">O teu perfil</p><h2 style="margin:0">Os teus dados</h2></div><button class="x" data-act="closeSheet" aria-label="Fechar">${ic('x', 18)}</button></div>
   <p class="note" style="margin-top:0">Ficam só neste telemóvel. Atualiza o peso de semana a semana.</p>
   <label class="f">Nome</label><input class="in" id="p_nome" value="${esc(p.nome || '')}" placeholder="Como te chamas?">
   <div class="grid2"><div><label class="f">Peso (kg)</label><input class="in" type="number" inputmode="decimal" step="0.1" id="p_peso" value="${p.peso || ''}"></div>
   <div><label class="f">Altura (cm)</label><input class="in" type="number" inputmode="numeric" id="p_alt" value="${p.alt || ''}"></div>
   <div><label class="f">Idade</label><input class="in" type="number" inputmode="numeric" id="p_idade" value="${p.idade || ''}"></div>
   <div><label class="f">Atividade fora do treino</label><select class="in" id="p_fat">${[['1.2', 'Sedentária'], ['1.375', 'Ligeira (treino 3–4×)'], ['1.55', 'Moderada']].map(([v, l]) => `<option value="${v}" ${String(p.fat || '1.375') === v ? 'selected' : ''}>${l}</option>`).join('')}</select></div></div>
   <button class="btn w" style="margin-top:16px" data-act="saveProfile">Guardar</button>`);
}
let deferredInstall = null;
const isStandalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredInstall = e; if (tab === 'hoje') renderHoje(); });
window.addEventListener('appinstalled', () => { deferredInstall = null; toast('App instalada ✓'); render(); });
function installInfo() {
  openSheet(`<div class="shead"><div><p class="eyebrow">Android</p><h2 style="margin:0">Instalar a app</h2></div><button class="x" data-act="closeSheet" aria-label="Fechar">${ic('x', 18)}</button></div>
   ${isStandalone() ? '<div class="call">' + ic('check', 18) + '<div>A app já está instalada e a funcionar como app.</div></div>' : `
   ${deferredInstall ? `<button class="btn w" data-act="install" style="margin-bottom:14px">${ic('phone', 18)} Instalar agora</button>` : ''}
   <ol class="steps"><li>Abre este endereço no <b>Chrome</b> do telemóvel.</li><li>Toca nos <b>três pontinhos ⋮</b> no canto superior direito.</li><li>Escolhe <b>“Instalar app”</b> ou <b>“Adicionar ao ecrã principal”</b>.</li><li>Abre pelo ícone novo: ecrã inteiro e funciona sem internet.</li></ol>`}
   <p class="note">Depois de instalada, abre-a uma vez com internet para guardar todas as fotos no telemóvel.</p>`);
}

/* =========================================================
   ações
   ========================================================= */
const TABS = [['hoje', 'home', 'Hoje'], ['treino', 'dumb', 'Treino'], ['comer', 'food', 'Comer'], ['prog', 'chart', 'Progresso'], ['mais', 'grid', 'Mais']];
const RENDER = { hoje: renderHoje, treino: renderTreino, comer: renderComer, prog: renderProg, mais: renderMais };
function renderTabs() { $('tabs').innerHTML = TABS.map(([k, i, l]) => `<button class="tab ${k === tab ? 'on' : ''}" data-act="tab" data-tab="${k}" aria-label="${l}"><span class="pip">${ic(i, 21)}</span>${l}</button>`).join(''); }
function render() { RENDER[tab](); checkBadges(); }
function goTab(t, sub) {
  tab = t; if (sub) UI[t] = sub === 'casa' ? 'exp' : sub;
  document.querySelectorAll('.screen').forEach(s => s.classList.toggle('on', s.id === 's-' + t));
  renderTabs(); render(); window.scrollTo(0, 0);
}
function tick(i) {
  const d = DAYS[S.day], id = d.ids[i], k = dayKey(), kk = id + '_' + i;
  S.checks[k] = S.checks[k] || {}; S.checks[k][kk] = !S.checks[k][kk];
  logDay(); const tt = dayTotals();
  if (S.checks[k][kk] && tt.n === tt.t) { if (S.day < 4) S.next = { d: (S.day + 1) % 4, from: today() }; toast('Treino concluído! Arrasaste 🎉'); }
  else if (S.checks[k][kk]) toast(`Feito · ${tt.n}/${tt.t}`);
  save();
}
const ACT = {
  tab: e => { if (e.dataset.tab === 'mais') UI.mais = 'menu'; goTab(e.dataset.tab); },
  go: e => goTab(e.dataset.tab, e.dataset.sub),
  seg: e => { UI[e.dataset.k] = e.dataset.v; render(); window.scrollTo(0, 0); },
  profile: () => profileSheet(),
  saveProfile: () => {
    const v = id => $(id).value.trim();
    S.perfil = { nome: v('p_nome'), peso: v('p_peso'), alt: v('p_alt'), idade: v('p_idade'), fat: v('p_fat') };
    save(); closeSheet(); toast('Perfil guardado'); render();
  },
  closeSheet: () => closeSheet(),
  phase: e => { S.ph = +e.dataset.i; buildDays(); save(); render(); },
  day: e => { S.day = +e.dataset.i; save(); render(); },
  ex: e => exSheet(+e.dataset.i),
  tick: e => { tick(+e.dataset.i); render(); if (e.dataset.close) closeSheet(); },
  view: e => { S.view = e.dataset.v; save(); if (e.dataset.id) libSheet(e.dataset.id); else exSheet(+e.dataset.i); },
  cmin: e => { const i = +e.dataset.i, id = DAYS[S.day].ids[i], key = id + '_' + S.ph + '_' + S.day, cur = kcalEx(EX[id], key).min; S.cardio[key] = Math.max(1, cur + (+e.dataset.d) * (cur >= 10 ? 5 : 1)); logDay(); save(); exSheet(i); render(); },
  swapList: e => swapSheet(+e.dataset.i),
  pick: e => { const i = +e.dataset.i, p = S.ph, d = S.day; if (DAYS[d].free) { if (e.dataset.id) S.free.ids[i] = e.dataset.id; } else { S.swaps[p] = S.swaps[p] || {}; S.swaps[p][d] = S.swaps[p][d] || {}; if (e.dataset.id) S.swaps[p][d][i] = e.dataset.id; else delete S.swaps[p][d][i]; } buildDays(); save(); render(); exSheet(i); toast('Exercício trocado'); },
  rmExtra: e => { if (DAYS[S.day].free) S.free.ids.splice(+e.dataset.i, 1); else { const i = +e.dataset.i - DAYS[S.day].base; S.extra[S.ph][S.day].splice(i, 1); } buildDays(); save(); closeSheet(); render(); },
  clearDay: () => { if (confirm('Limpar os checks deste dia?')) { delete S.checks[dayKey()]; logDay(); save(); render(); } },
  lg: e => { UI.lg = e.dataset.g; render(); },
  llv: e => { UI.llv = +e.dataset.v; render(); },
  libex: e => libSheet(e.dataset.id),
  addEx: e => { const p = S.ph, d = +e.dataset.i; if (DAYS[d].ids.includes(e.dataset.id)) { toast('Já está nesse treino'); return; } if (DAYS[d].free) { S.free.ids.push(e.dataset.id); if (!S.free.n) S.free.n = 'Treino livre'; } else { S.extra[p] = S.extra[p] || {}; S.extra[p][d] = S.extra[p][d] || []; S.extra[p][d].push(e.dataset.id); } buildDays(); save(); toast('Juntado: ' + dayLbl(d)); render(); },
  water: e => { const t = today(); S.water[t] = Math.max(0, (S.water[t] || 0) + (+e.dataset.ml)); save(); render(); if (+e.dataset.ml > 0) toast(`+${e.dataset.ml} ml · ${fL(S.water[t])} L hoje`); },
  meal: e => { const t = today(), i = +e.dataset.i, f = S.fast, now = Date.now(); S.meals[t] = S.meals[t] || {}; const on = S.meals[t][i] = !S.meals[t][i]; let msg = '';
    if (on && i === 0 && f.st === 'fast' && (now - f.t) / 36e5 >= 1) { const h = (now - f.t) / 36e5; f.log.push({ s: f.t, e: now }); f.st = 'eat'; f.t = now; msg = 'Jejum de ' + fH(h) + ' registado' + (h >= f.goal ? ' 🎉' : ''); }
    else if (on && i === 1 && f.st !== 'fast') { f.st = 'fast'; f.t = now; msg = 'Jejum iniciado às ' + hhmm(now); }
    save(); render(); if (msg) toast(msg); },
  plantao: e => { const t = today(); S.pl[t] = e.checked ? '1' : '0'; if (S.chal) { if (e.checked) S.chal.rest[t] = true; else delete S.chal.rest[t]; } save(); render(); },
  kd: e => { UI.kd = +e.dataset.i; render(); },
  doce: e => { const t = today(), i = +e.dataset.i; if (S.doce[t] === i) delete S.doce[t]; else S.doce[t] = i; save(); render(); },
  shop: e => { S.shop[e.dataset.k] = !S.shop[e.dataset.k]; save(); render(); },
  shopClear: () => { S.shop = {}; save(); render(); },
  gr: e => { UI.gr = +e.dataset.v; render(); },
  saveMed: () => {
    const d = $('md').value || today(), e = { d }; let any = false;
    MF.forEach(([k]) => { const v = parseFloat(String($('m_' + k).value).replace(',', '.')); if (!isNaN(v) && v > 0) { e[k] = v; any = true; } });
    if (!any) { toast('Preenche pelo menos um campo'); return; }
    const old = S.med.find(x => x.d === d); if (old) Object.assign(old, e); else S.med.push(e);
    if (e.p && d >= ([...S.med].map(x => x.d).sort().pop() || d)) S.perfil.peso = String(e.p);
    save(); toast('Medidas guardadas'); render();
  },
  delMed: e => { if (confirm('Apagar o registo de ' + dfull(e.dataset.d) + '?')) { S.med = S.med.filter(x => x.d !== e.dataset.d); save(); render(); } },
  pre: e => { const p = PRE[e.dataset.p]; draft.days = p.days; draft.rest = p.rest; draft.ids = p.ids.slice(); draft.name = e.dataset.p === 'suave' ? 'Desafio suave 30 dias' : 'Desafio constante 75 dias'; render(); },
  crest: e => { readDraft(); draft.rest = +e.dataset.v; render(); },
  cadd: () => { readDraft(); const v = $('ccus').value.trim(); if (!v) return; draft.custom.push({ id: 'c' + Date.now(), label: v }); render(); },
  cgo: () => {
    readDraft();
    const rules = draft.ids.map(id => ({ id, label: RULES[id].label, auto: RULES[id].auto ? 1 : 0 })).concat(draft.custom.filter(r => r.on !== false));
    if (!rules.length) { toast('Escolhe pelo menos uma regra'); return; }
    S.chal = { name: draft.name || 'O meu desafio', start: $('cstart').value || today(), days: Math.max(7, draft.days || 30), restMax: draft.rest, rules, checks: {}, rest: {} };
    UI.cdate = today() < S.chal.start ? S.chal.start : today(); save(); render(); toast('Desafio criado. Força! 💪');
  },
  cday: e => { UI.cdate = e.dataset.d; render(); },
  crule: e => { const c = S.chal, d = UI.cdate; c.checks[d] = c.checks[d] || {}; c.checks[d][e.dataset.r] = !c.checks[d][e.dataset.r]; save(); render(); },
  crestday: () => { const c = S.chal, d = UI.cdate; if (c.rest[d]) delete c.rest[d]; else c.rest[d] = true; save(); render(); },
  creset: () => { if (confirm('Apagar este desafio e criar outro?')) { S.chal = null; save(); render(); } },
  kg: e => { const i = +e.dataset.i, x = EX[DAYS[S.day].ids[i]], w = workOf(i), g = x.step === 1 ? 1 : 2.5; w.kg = Math.max(0, Math.round(((w.kg || 0) + (+e.dataset.d) * g) * 2) / 2); save(); const k = $('kgin'); if (k) k.value = w.kg; },
  kgset: e => { const w = workOf(+e.dataset.i), v = parseFloat(String(e.value).replace(',', '.')); w.kg = isNaN(v) || v < 0 ? 0 : v; save(); },
  setDone: e => {
    const i = +e.dataset.i, id = DAYS[S.day].ids[i], x = EX[id], w = workOf(i); audioInit();
    w.sets = Math.min(x.s, (w.sets || 0) + 1);
    if (w.sets >= x.s) { stopRest(); if (x.ld) w.ask = true; else if (!isChecked(id + '_' + i)) tick(i); }
    else startRest(i);
    save(); render(); exSheet(i);
  },
  setReset: e => { const w = workOf(+e.dataset.i); w.sets = 0; w.ask = false; save(); exSheet(+e.dataset.i); },
  feel: e => {
    const i = +e.dataset.i, id = DAYS[S.day].ids[i], w = workOf(i), t = today();
    const pr = Math.max(0, ...(S.loads[id] || []).filter(x => x.d !== t).map(x => x.kg)), had = (S.loads[id] || []).some(x => x.d !== t);
    S.loads[id] = (S.loads[id] || []).filter(x => x.d !== t); S.loads[id].push({ d: t, kg: w.kg || 0, f: e.dataset.f });
    w.ask = false; if (!isChecked(id + '_' + i)) tick(i);
    save(); render(); exSheet(i);
    const sg = suggest(id); if (had && (w.kg || 0) > pr) { toast('🏆 Novo recorde: ' + fk(w.kg) + '!'); return; }
    toast(sg.dir === 'up' ? 'Boa! Para a próxima: ' + fk(sg.kg) + ' ↑' : sg.dir === 'down' ? 'Para a próxima: ' + fk(sg.kg) : 'Registado. Para a próxima mantém ' + fk(sg.kg));
  },
  restCycle: e => { const o = [45, 60, 75, 90, 120], c = restSec(); S.restSec = o[(o.indexOf(c) + 1) % o.length] || 60; save(); exSheet(+e.dataset.i); },
  restSkip: e => { stopRest(); exSheet(+e.dataset.i); },
  restAdd: () => { if (REST) { REST.end += 15000; REST.total += 15; } },
  loadSheet: e => loadSheet(e.dataset.id),
  delLoad: e => { const id = e.dataset.id; S.loads[id] = (S.loads[id] || []).filter(x => x.d !== e.dataset.d); if (!S.loads[id].length) { delete S.loads[id]; closeSheet(); } else loadSheet(id); save(); render(); },
  sess: e => sessSheet(e.dataset.id),
  sessStart: e => playerStart(SESS.find(x => x.id === e.dataset.id)),
  xt: e => { UI.xt = e.dataset.v; render(); },
  xp: e => { UI.xp = e.dataset.v; render(); },
  lt: e => { UI.lt = e.dataset.v; render(); },
  rout: e => routSheet(e.dataset.id),
  routUse: e => { const r = ROUT.find(x => x.id === e.dataset.id); loadFree(r.n, r.ids, r.tip); },
  genOpen: () => { genMake(); genSheet(); },
  genSet: e => { UI.gen[e.dataset.k] = e.dataset.k === 'min' ? +e.dataset.v : e.dataset.v; genMake(); genSheet(); },
  genAgain: () => { genMake(); genSheet(); },
  genUse: () => loadFree(FOCUS[UI.gen.focus][0] + ' · ' + UI.gen.min + ' min', UI.gen.ids, UI.gen.place === 'casa' ? 'Treino gerado para fazer em casa, sem material.' : 'Treino gerado à medida. Regista as cargas como no plano.'),
  timerOpen: () => timerSheet(),
  tmSet: e => { const k = e.dataset.k, lim = { w: [5, 600], r: [0, 300], n: [1, 60] }[k], stp = k === 'n' ? 1 : 5; UI.tm[k] = Math.max(lim[0], Math.min(lim[1], UI.tm[k] + (+e.dataset.d) * stp)); timerSheet(); },
  tmPre: e => { const [w, r, n] = e.dataset.v.split(',').map(Number); UI.tm = { w, r, n }; timerSheet(); },
  tmStart: () => { const { w, r, n } = UI.tm, st = []; for (let i = 0; i < n; i++) { st.push({ k: 'w', sec: w, lbl: 'Volta ' + (i + 1) + ' de ' + n }); if (r && i < n - 1) st.push({ k: 'r', sec: r }); } playerStart({ id: 'timer', n: 'Temporizador', met: 6, tipo: 'cardio', _st: st }); },
  ck: e => { const t = today(); S.ck[t] = S.ck[t] || {}; S.ck[t][e.dataset.k] = +e.dataset.v; if (S.ck[t].dor != null && S.ck[t].en != null) UI.ckEdit = false; save(); render(); },
  ckEdit: () => { UI.ckEdit = true; render(); },
  foodOpen: () => foodSheet(),
  foodAdd: e => { const t = today(); S.food[t] = S.food[t] || []; const ex = S.food[t].find(x => x.id === e.dataset.id); if (ex) ex.q += 1; else S.food[t].push({ id: e.dataset.id, q: 1 }); save(); render(); toast('Adicionado: ' + foodInfo(e.dataset.id).n.split(' (')[0]); },
  foodCustom: () => { const n = $('fc_n').value.trim(), k = parseFloat($('fc_k').value); if (!n || !(k > 0)) { toast('Escreve o nome e as calorias'); return; } const t = today(); S.food[t] = S.food[t] || []; S.food[t].push({ n, k }); save(); closeSheet(); render(); toast('Adicionado: ' + n); },
  foodQ: e => { const t = today(), i = +e.dataset.i, it = (S.food[t] || [])[i]; if (!it) return; if (it.id) { it.q = Math.round((it.q + (+e.dataset.d) * 0.5) * 2) / 2; if (it.q <= 0) S.food[t].splice(i, 1); } else S.food[t].splice(i, 1); save(); render(); },
  fast: e => { const f = S.fast, now = Date.now(), v = e.dataset.v; if (v === 'eat') { if (f.st === 'fast') { const h = (now - f.t) / 36e5; if (h >= 1) { f.log.push({ s: f.t, e: now }); if (f.log.length > 400) f.log.shift(); toast('Jejum de ' + fH(h) + ' registado' + (h >= f.goal ? ' 🎉' : '')); } } f.st = 'eat'; f.t = now; } else if (v === 'fast') { f.st = 'fast'; f.t = now; toast('Jejum iniciado'); } else { f.st = null; } save(); render(); },
  fastTime: e => { if (!e.value) return; const [h, m] = e.value.split(':').map(Number), d = new Date(); d.setHours(h, m, 0, 0); if (d.getTime() > Date.now()) d.setDate(d.getDate() - 1); S.fast.t = d.getTime(); if (!S.fast.st) S.fast.st = 'fast'; save(); render(); },
  fastGoal: e => { S.fast.goal = +e.dataset.v || 16; save(); render(); },
  ingDel: () => { delete S.ing[today()]; save(); render(); },
  stepsSet: e => { const v = parseInt(e.value, 10); if (v > 0) S.steps[today()] = v; else delete S.steps[today()]; save(); render(); },
  hm: e => { const [y, m] = UI.hm.split('-').map(Number), d = new Date(y, m - 1 + (+e.dataset.d), 1); UI.hm = d.getFullYear() + '-' + pad(d.getMonth() + 1); render(); },
  hday: e => daySheet(e.dataset.d),
  phAdd: () => $('photoFile').click(),
  phOpen: e => photoSheet(+e.dataset.id),
  phDel: async e => { if (!confirm('Apagar esta foto?')) return; await phDel(+e.dataset.id); S.phN = Math.max(0, (S.phN || 1) - 1); save(); closeSheet(); render(); },
  plPause: () => { if (!PL || PL.fin) return; PL.paused = !PL.paused; if (!PL.paused) PL.end = Date.now() + PL.left * 1000; plRender(); },
  plNext: () => { if (!PL || PL.fin) return; const st = PL.steps[PL.i]; if (st.k === 'w') PL.doneSec += Math.max(0, st.sec - PL.left); if (PL.i + 1 < PL.steps.length) plGo(PL.i + 1); else plFinish(true); },
  plPrev: () => { if (!PL || PL.fin) return; let j = PL.i; if (PL.steps[j].sec - PL.left < 3) { j--; while (j > 0 && PL.steps[j].k !== 'w') j--; } plGo(Math.max(0, j)); },
  plMute: () => { S.mute = !S.mute; save(); if (PL && !PL.fin) plRender(); },
  plQuit: () => { if (!PL) return; if (PL.fin) { plClose(); return; } const was = PL.paused; if (!was) ACT.plPause(); if (confirm('Terminar esta sessão?')) plFinish(false); else if (!was) ACT.plPause(); },
  plClose: () => plClose(),
  installInfo: () => installInfo(),
  install: async () => { if (!deferredInstall) { installInfo(); return; } deferredInstall.prompt(); const r = await deferredInstall.userChoice; deferredInstall = null; closeSheet(); if (r.outcome === 'accepted') toast('A instalar…'); render(); },
  export: async () => { const photos = await phAll(); const b = new Blob([JSON.stringify({ app: 'treino-beatriz', v: 4, date: today(), data: S, photos }, null, 1)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'push-it-' + today() + '.json'; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500); toast('Cópia exportada'); },
  import: () => $('importFile').click(),
  wipe: () => { if (confirm('Apagar todos os teus dados deste telemóvel? Não dá para desfazer.')) { localStorage.removeItem(KEY); location.reload(); } },
};
function readDraft() {
  const n = $('cname'), d = $('cdays'); if (n) draft.name = n.value; if (d) draft.days = +d.value || 30;
  const ids = [...document.querySelectorAll('.rck[data-r]')].filter(x => x.checked).map(x => x.dataset.r); if (document.querySelector('.rck')) draft.ids = ids;
  draft.custom.forEach(r => { const el = document.querySelector(`.rck[data-c="${r.id}"]`); if (el) r.on = el.checked; });
}
document.addEventListener('click', e => {
  const t = e.target.closest('[data-act]'); if (!t) return;
  if (t.tagName === 'INPUT') return;
  const f = ACT[t.dataset.act]; if (f) { e.preventDefault(); f(t, e); }
});
document.addEventListener('change', e => { const t = e.target; if (t.dataset && t.dataset.act && t.tagName === 'INPUT' && ACT[t.dataset.act]) ACT[t.dataset.act](t, e); });
$('importFile').addEventListener('change', e => {
  const f = e.target.files && e.target.files[0]; if (!f) return;
  const r = new FileReader();
  r.onload = () => { try { const j = JSON.parse(r.result); if (!j || !j.data || j.app !== 'treino-beatriz') throw 0; if (!confirm('Substituir os dados deste telemóvel pela cópia de ' + (j.date ? dfull(j.date) : '?') + '?')) return; localStorage.setItem(KEY, JSON.stringify(j.data)); Promise.all((j.photos || []).map(phPut)).then(() => location.reload()); } catch (err) { toast('Este ficheiro não é uma cópia da app.'); } };
  r.readAsText(f); e.target.value = '';
});

/* =========================================================
   progressão de cargas
   ========================================================= */
const FEEL = { e: 'fácil', m: 'no ponto', h: 'difícil' };
const fk = kg => (Number.isInteger(kg) ? kg : f1(kg)) + ' kg';
const loadHist = id => (S.loads[id] || []).slice().sort((a, b) => a.d < b.d ? -1 : 1);
function suggest(id) {
  const x = EX[id]; if (!x || !x.ld) return null;
  const h = loadHist(id), st = x.step;
  if (!h.length) return { dir: 'new', kg: null, msg: 'Primeira vez: escolhe uma carga com que faças todas as repetições e ainda sobrem 2. No fim diz-me como correu.' };
  const last = h[h.length - 1], prev = h[h.length - 2];
  if (last.f === 'e') return { dir: 'up', kg: last.kg + st, msg: `<b>Sobe para ${fk(last.kg + st)}.</b> Da última vez foi fácil com ${fk(last.kg)}.` };
  if (last.f === 'h' && prev && prev.f === 'h' && prev.kg <= last.kg) return { dir: 'down', kg: Math.max(0, last.kg - st), msg: `<b>Desce para ${fk(Math.max(0, last.kg - st))}.</b> Duas sessões difíceis seguidas: recua um passo e afina a técnica.` };
  if (last.f === 'h') return { dir: 'keep', kg: last.kg, msg: `<b>Mantém ${fk(last.kg)}.</b> Da última vez custou: repete até saírem todas as repetições.` };
  const same = h.filter(e => e.kg === last.kg && e.f === 'm').length;
  if (same >= 3) return { dir: 'keep', kg: last.kg, msg: `<b>Mantém ${fk(last.kg)} e tenta mais 1–2 repetições por série.</b> Já vão ${same} sessões no ponto: quando as repetições extra saírem, sobe a carga.` };
  return { dir: 'keep', kg: last.kg, msg: `<b>Mantém ${fk(last.kg)}.</b> Está no ponto certo: sobe quando ficar fácil.` };
}
function loadTag(id) { const sg = suggest(id); if (!sg || sg.kg == null) return ''; return ` · <b style="color:${sg.dir === 'up' ? 'var(--mint)' : sg.dir === 'down' ? 'var(--amb)' : 'var(--ink2)'}">${sg.dir === 'up' ? '↑ ' : sg.dir === 'down' ? '↓ ' : ''}${fk(sg.kg)}</b>`; }
function cargasHtml() {
  const ids = Object.keys(S.loads).filter(id => EX[id] && S.loads[id].length).sort((a, b) => EX[a].n.localeCompare(EX[b].n));
  const guide = `<button class="card flat" style="display:flex;gap:12px;align-items:center;width:100%;text-align:left" data-act="go" data-tab="mais" data-sub="progredir"><div class="ic" style="width:38px;height:38px;border-radius:12px;display:grid;place-items:center;background:var(--mint2);color:var(--mint);flex:none">${ic('up', 18)}</div><div style="flex:1"><b>Como e quando subir a carga</b><div class="note">As regras, em 2 minutos.</div></div><span class="chev" style="color:var(--mut)">${ic('chev', 18)}</span></button>`;
  if (!ids.length) return `<div class="card flat" style="text-align:center"><b>Ainda sem cargas registadas</b><p class="note">No treino, abre um exercício, escolhe a carga, marca as séries e diz como correu. O histórico aparece aqui.</p><button class="btn sm" data-act="go" data-tab="treino" data-sub="plano">Ir para o treino</button></div>` + guide;
  const up = ids.filter(id => suggest(id).dir === 'up').length;
  return `<div class="grid2" style="margin-bottom:12px"><div class="card kpi"><small>Exercícios com registo</small><b>${ids.length}</b></div><div class="card kpi"><small>Prontos para subir</small><b>${up}</b><span class="u">↑</span></div></div>
   <div class="card list">${ids.map(id => { const h = loadHist(id), a = h[0], b = h[h.length - 1], df = b.kg - a.kg, sg = suggest(id); return `<button class="row" data-act="loadSheet" data-id="${id}"><img class="th" src="${src(id, 1)}" alt="" loading="lazy"><div class="tx"><b>${esc(EX[id].n)}</b><small>${fk(b.kg)} · ${h.length} ${h.length > 1 ? 'sessões' : 'sessão'}${df ? ' · ' + (df > 0 ? '+' : '') + fk(df) : ''}</small></div>${sg.dir === 'up' ? '<span class="tag mint">↑ subir</span>' : ''}<span class="chev">${ic('chev', 18)}</span></button>`; }).join('')}</div>` + guide;
}
function loadSheet(id) {
  const x = EX[id], h = loadHist(id), sg = suggest(id), pts = h.map(e => ({ d: e.d, v: e.kg }));
  openSheet(`<div class="shead"><div><p class="eyebrow">Histórico de cargas</p><h2 style="margin:0">${esc(x.n)}</h2><p class="note" style="margin:2px 0 0">${esc(x.eq)}${x.step === 1 ? ' · kg por halter' : ''}</p></div><button class="x" data-act="closeSheet" aria-label="Fechar">${ic('x', 18)}</button></div>
   <div class="stack"><div class="call ${sg.dir === 'up' ? '' : sg.dir === 'down' ? 'amb' : 'lil'}">${ic(sg.dir === 'up' ? 'up' : sg.dir === 'down' ? 'down' : 'info', 18)}<div>${sg.msg}</div></div>
   ${pts.length > 1 ? svgLine(pts, '#1E9A6C') : '<p class="note">Com 2 ou mais sessões aparece aqui o gráfico.</p>'}
   <div class="card list flat" style="margin:0">${[...h].reverse().map(e => `<div class="row"><div class="tx"><b>${fk(e.kg)}</b><small>${dfull(e.d)} · ${FEEL[e.f]}</small></div><button class="x" style="width:30px;height:30px" data-act="delLoad" data-id="${id}" data-d="${e.d}" aria-label="Apagar">${ic('x', 14)}</button></div>`).join('')}</div></div>`);
}
const GUIDE = [
  ['A regra de ouro', ['<b>Termina cada série com 1–2 repetições “no tanque”.</b> As últimas custam, mas a técnica fica perfeita. É este o ponto certo.', '<b>Fácil</b> = acabaste e ainda fazias 3 ou mais. <b>No ponto</b> = sobravam 1–2. <b>Difícil</b> = não acabaste todas ou a técnica falhou.', 'Carga a mais não queima mais gordura: só te lesiona. Quem manda é a técnica.']],
  ['Quando subir', ['Quando fazes <b>todas as séries e todas as repetições</b> com boa técnica e foi <b>fácil</b>: sobe na sessão seguinte.', 'Se está “no ponto”, <b>mantém</b>. Ao fim de 3 sessões iguais, tenta mais 1–2 repetições por série (12 → 14) e só depois sobe a carga.', 'Nas primeiras 8–12 semanas é normal subires quase todas as semanas. Depois abranda: é sinal de que já não és principiante.']],
  ['Quanto subir', ['<b>Pernas e glúteos:</b> +5 kg, ou 1 placa na máquina.', '<b>Costas, peito, ombros e braços:</b> +2,5 kg, ou a placa mais pequena.', '<b>Halteres:</b> +1 kg em cada mão (o par seguinte).', 'Se o salto da máquina for grande demais, fica na carga antiga e faz mais repetições até a nova ser possível com pelo menos 8.']],
  ['Quando manter ou descer', ['<b>Mantém</b> se dormiste mal, vens do plantão ou estás a voltar de uma pausa. Não é dia de recordes.', '<b>Desce um passo</b> se foi difícil duas sessões seguidas, ou se precisas de balançar o corpo para acabar.', '<b>Para e troca de exercício</b> se sentires dor na lombar ou numa articulação. Ardor no músculo é normal; dor aguda ou que irradia não é.']],
  ['Como fazer em cada treino', ['<b>Série de aquecimento:</b> antes da primeira série a sério, faz 8–10 repetições com metade da carga.', 'Ritmo: 1–2 s a empurrar ou puxar, 3 s a voltar. Expira no esforço.', 'Descansa 60–90 s (usa o temporizador). Com descanso a menos, a carga parece mais pesada do que é.', 'Regista sempre a carga: a memória engana, o registo não.']],
  ['Semana de descarga', ['A cada 4 semanas (a última de cada fase), ou depois de uma semana de plantões pesados, faz uma semana leve: <b>menos 20–30 % de carga</b> ou 2 séries em vez de 3.', 'Não é perder tempo: é quando o corpo recupera e fica mais forte. Na semana seguinte voltas à carga normal e tentas subir.']],
  ['A ordem certa de progredir', ['1.º a técnica · 2.º as repetições · 3.º a carga · 4.º mais uma série · 5.º menos descanso. Uma coisa de cada vez.']],
];

/* =========================================================
   temporizador de descanso, som e vibração
   ========================================================= */
let AC = null, REST = null;
function audioInit() { try { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); if (AC.state === 'suspended') AC.resume(); } catch (e) { } }
function beep(f, dur) { if (S.mute || !AC) return; try { const o = AC.createOscillator(), g = AC.createGain(), n = AC.currentTime; o.type = 'sine'; o.frequency.value = f; g.gain.setValueAtTime(0.0001, n); g.gain.exponentialRampToValueAtTime(0.28, n + 0.015); g.gain.exponentialRampToValueAtTime(0.0001, n + dur); o.connect(g); g.connect(AC.destination); o.start(n); o.stop(n + dur + 0.03); } catch (e) { } }
const vib = p => { try { if (!S.mute && navigator.vibrate) navigator.vibrate(p); } catch (e) { } };
function startRest(i) { stopRest(); const total = restSec(); REST = { i, key: dayKey(), end: Date.now() + total * 1000, total, lastBeep: 0, t: setInterval(restTick, 250) }; }
function stopRest() { if (REST) { clearInterval(REST.t); REST = null; } }
function restTick() {
  if (!REST) return;
  const left = Math.max(0, (REST.end - Date.now()) / 1000), b = $('restnum'), c = Math.ceil(left);
  if (b) { b.textContent = c + ' s'; $('restfill').style.width = (100 - left / REST.total * 100) + '%'; }
  if (left <= 0) { stopRest(); beep(880, .16); setTimeout(() => beep(1175, .24), 190); vib([200, 100, 200]); toast('Descanso acabou: próxima série 💪'); const rb = $('restbox'); if (rb) rb.innerHTML = ''; }
  else if (c <= 3 && c !== REST.lastBeep) { REST.lastBeep = c; beep(660, .08); }
}

/* =========================================================
   treinos guiados sem material
   ========================================================= */
const Wk = (id, sec, note) => ({ k: 'w', id, sec, note });
const Rs = sec => ({ k: 'r', sec });
const sides = (id, sec, note) => [Object.assign(Wk(id, sec, note), { side: 'lado direito' }), Object.assign(Wk(id, sec, note), { side: 'lado esquerdo' })];
function circuit(ids, work, rest, rounds) { const o = []; for (let r = 0; r < rounds; r++) ids.forEach(id => { o.push(Wk(id, work)); o.push(Rs(rest)); }); return o; }
function tabata(a, b) { const o = []; for (let i = 0; i < 8; i++) { o.push(Wk(i % 2 ? b : a, 20)); o.push(Rs(10)); } return o; }
const withRest = (items, rest) => items.flat().flatMap(x => [x, Rs(rest)]);
const SESS = [
  { id: 'tabata', n: 'Tabata suave', kind: 'Tabata', color: 'ac', met: 6.5, cover: 'Bodyweight_Squat', desc: '3 blocos de 4 min: 20 s de esforço, 10 s de pausa. Intenso, mas sem saltos.',
    steps: () => [Wk('Trail_Running_Walking', 60, 'Aquecimento: ritmo leve.'), Wk('Arm_Circles', 30, 'Aquecimento: solta os ombros.'), Rs(15), ...tabata('Bodyweight_Squat', 'Front_Leg_Raises'), Rs(50), ...tabata('Sit_Squats', 'Trail_Running_Walking'), Rs(50), ...tabata('Butt_Lift_Bridge', 'Incline_Push-Up'), Rs(15), Wk('Childs_Pose', 45, 'Volta à calma: respira fundo.'), Wk('Hug_Knees_To_Chest', 45, 'Volta à calma: relaxa a lombar.')] },
  { id: 'hiit20', n: 'HIIT de baixo impacto', kind: 'HIIT', color: 'ac', met: 6, cover: 'Step-up_with_Knee_Raise', desc: '6 movimentos, 3 voltas: 40 s de esforço, 20 s de pausa. Queima sem castigar as articulações.',
    steps: () => [Wk('Trail_Running_Walking', 60, 'Aquecimento: ritmo leve.'), Wk('Standing_Hip_Circles', 30, 'Aquecimento: solta as ancas.'), Rs(15), ...circuit(['Trail_Running_Walking', 'Bodyweight_Squat', 'Step-up_with_Knee_Raise', 'Incline_Push-Up', 'Butt_Lift_Bridge', 'Sit_Squats'], 40, 20, 3), Wk('Childs_Pose', 45, 'Volta à calma.'), ...sides('Ankle_On_The_Knee', 30, 'Volta à calma.')] },
  { id: 'hiit10', n: 'HIIT express', kind: 'HIIT', color: 'ac', met: 5.5, cover: 'Sit_Squats', desc: '5 movimentos, 2 voltas: 30 s de esforço, 30 s de pausa. Para os dias sem tempo.',
    steps: () => [Wk('Trail_Running_Walking', 45, 'Aquecimento: ritmo leve.'), Rs(10), ...circuit(['Trail_Running_Walking', 'Sit_Squats', 'Glute_Kickback', 'Front_Leg_Raises', 'Plank'], 30, 30, 2), Wk('Hug_Knees_To_Chest', 40, 'Volta à calma.')] },
  { id: 'pilates', n: 'Pilates para o core', kind: 'Pilates', color: 'lil', met: 3, cover: 'Dead_Bug', desc: 'Barriga profunda, glúteos e estabilidade lombar, em movimentos lentos e controlados.',
    steps: () => [...withRest([Wk('Pelvic_Tilt_Into_Bridge', 50, 'Sobe e desce vértebra a vértebra.'), Wk('Dead_Bug', 40), Wk('Butt_Lift_Bridge', 40), sides('Glute_Kickback', 30), sides('Rear_Leg_Raises', 30), sides('Side_Bridge', 20, 'Pode ser com os joelhos dobrados.'), Wk('Plank', 25, 'Joelhos no chão se precisares.'), Wk('Leg_Pull-In', 30, 'Lombar colada ao chão.'), Wk('Stomach_Vacuum', 30), Wk('Dead_Bug', 40), Wk('Butt_Lift_Bridge', 40), Wk('Plank', 25, 'Joelhos no chão se precisares.')], 15), Wk('Cat_Stretch', 45, 'Volta à calma.'), Wk('Childs_Pose', 45, 'Volta à calma.')] },
  { id: 'yogaL', n: 'Yoga para a lombar', kind: 'Yoga', color: 'mint', met: 2.5, calm: 1, cover: 'Childs_Pose', desc: 'Posturas suaves para soltar a lombar, as ancas e os glúteos. Ideal à noite ou em dias de dor ligeira.',
    steps: () => withRest([Wk('Cat_Stretch', 60), Wk('Childs_Pose', 60), sides('Kneeling_Hip_Flexor', 40), Wk('Lower_Back_Curl', 40), Wk('Childs_Pose', 30), Wk('Hug_Knees_To_Chest', 45), sides('One_Knee_To_Chest', 30), sides('Ankle_On_The_Knee', 40), sides('Knee_Across_The_Body', 40), sides('Hamstring_Stretch', 40), Wk('Hug_Knees_To_Chest', 60, 'Relaxa e respira devagar.')], 6) },
  { id: 'yogaM', n: 'Yoga para acordar', kind: 'Yoga', color: 'mint', met: 2.5, calm: 1, cover: 'Upward_Stretch', desc: 'Dez minutos para acordar o corpo: ombros, ancas e coluna.',
    steps: () => withRest([Wk('Upward_Stretch', 30), sides('Standing_Lateral_Stretch', 25), Wk('Arm_Circles', 30), sides('Standing_Hip_Circles', 25), Wk('Cat_Stretch', 50), sides('Worlds_Greatest_Stretch', 35, 'Joelho de trás no chão para ser mais suave.'), Wk('Lower_Back_Curl', 30), Wk('Childs_Pose', 45), sides('Dancers_Stretch', 30), Wk('Upper_Back_Stretch', 30), Wk('Upward_Stretch', 30, 'Respira fundo: bom dia!')], 6) },
  { id: 'plantao', n: 'Pausa de plantão', kind: 'Mobilidade', color: 'amb', met: 2, calm: 1, cover: 'Side_Neck_Stretch', desc: 'Cinco minutos na cadeira ou de pé, de bata vestida: pescoço, ombros e lombar.',
    steps: () => withRest([sides('Side_Neck_Stretch', 20), Wk('Chin_To_Chest_Stretch', 20), sides('Shoulder_Stretch', 20), sides('Spinal_Stretch', 20), sides('Chair_Lower_Back_Stretch', 20), Wk('Upper_Back_Stretch', 25), Wk('Upward_Stretch', 25), sides('Standing_Hip_Circles', 20)], 5) },
  { id: 'pos', n: 'Alongamento pós-treino', kind: 'Mobilidade', color: 'amb', met: 2.3, calm: 1, cover: 'Hamstring_Stretch', desc: 'Para fazer no fim do ginásio: pernas, ancas, peito e braços.',
    steps: () => withRest([sides('Hamstring_Stretch', 30), sides('Ankle_On_The_Knee', 30), sides('Kneeling_Hip_Flexor', 30), sides('Calf_Stretch_Hands_Against_Wall', 25), Wk('Chest_And_Front_Of_Shoulder_Stretch', 30), sides('Triceps_Stretch', 20), Wk('Childs_Pose', 45)], 6) },
];
function sessSteps(se) {
  if (se._st) return se._st; const out = [];
  if (!se.steps) return se._st = [];
  se.steps().forEach(x => { const l = out[out.length - 1]; if (x.k === 'r' && l && l.k === 'r') l.sec = Math.max(l.sec, x.sec); else out.push(Object.assign({}, x)); });
  while (out.length && out[out.length - 1].k === 'r') out.pop();
  return se._st = out;
}
function sessSheet(id) {
  const se = SESS.find(x => x.id === id), st = sessSteps(se), sec = st.reduce((a, x) => a + x.sec, 0), kc = se.met * (calc().w || 0) * sec / 3600;
  const uniq = []; st.forEach(x => { if (x.k === 'w' && !uniq.includes(x.id)) uniq.push(x.id); });
  openSheet(`<div class="shead"><div><p class="eyebrow">${TN[se.tipo]} · ${se.place === 'gin' ? 'no ginásio' : 'sem material'}</p><h2 style="margin:0">${se.n}</h2></div><button class="x" data-act="closeSheet" aria-label="Fechar">${ic('x', 18)}</button></div>
   <div class="stack"><p style="margin:0">${se.desc}</p>
   <div class="tags"><span class="tag ${TC[se.tipo]}">${Math.round(sec / 60)} min</span><span class="tag">${st.filter(x => x.k === 'w').length} passos</span>${kc ? `<span class="tag amb">${ic('flame', 12)} ~${f0(kc)} kcal</span>` : ''}</div>
   <button class="btn w" data-act="sessStart" data-id="${id}">${ic('play', 18)} Começar</button>
   <div class="call lil">${ic('info', 18)}<div>Põe o telemóvel onde o vejas. O ecrã fica ligado; ouves um aviso nos últimos 3 segundos e a cada mudança. Podes pausar ou saltar a qualquer momento.</div></div>
   <div class="card list flat" style="margin:0">${uniq.map(u => `<div class="row"><img class="th" src="${src(u, 1)}" alt="" loading="lazy"><div class="tx"><b>${esc(EX[u].n)}</b><small>${esc(EX[u].st[1] || '')}</small></div></div>`).join('')}</div></div>`);
}
let PL = null, wake = null;
const fT = c => c >= 100 ? Math.floor(c / 60) + ':' + pad(c % 60) : String(c);
async function wakeOn() { try { if ('wakeLock' in navigator) wake = await navigator.wakeLock.request('screen'); } catch (e) { } }
function wakeOff() { try { if (wake) wake.release(); } catch (e) { } wake = null; }
document.addEventListener('visibilitychange', () => { if (PL && !PL.fin && document.visibilityState === 'visible') wakeOn(); });
function playerStart(se) {
  if (!se) return; audioInit(); wakeOn();
  if (sheetOpen) { sheetOpen = false; $('sheet').classList.remove('on'); $('scrim').classList.remove('on'); history.replaceState({ player: 1 }, ''); } else history.pushState({ player: 1 }, '');
  const steps = [{ k: 'p', sec: 8 }].concat(sessSteps(se));
  PL = { s: se, steps, i: 0, left: 8, end: 0, paused: false, doneSec: 0, fin: false, total: steps.reduce((a, x) => a + x.sec, 0), workTotal: steps.filter(x => x.k === 'w').reduce((a, x) => a + x.sec, 0) };
  $('player').classList.add('on'); plGo(0, true);
  PL.t = setInterval(plTick, 200);
}
function plGo(i, silent) {
  const st = PL.steps[i]; PL.i = i; PL.left = st.sec; PL.end = Date.now() + st.sec * 1000; PL.lastBeep = 0; PL.paused = false; plRender();
  if (!silent) { if (st.k === 'w') { beep(880, .14); setTimeout(() => beep(1175, .2), 160); vib(250); } else { beep(440, .25); vib([120, 80, 120]); } }
}
function plNextWork(i) { for (let j = i + 1; j < PL.steps.length; j++) if (PL.steps[j].k === 'w') return PL.steps[j]; return null; }
function plRender() {
  const st = PL.steps[PL.i], nx = plNextWork(PL.i), show = st.k === 'w' ? st : nx, x = show && show.id ? EX[show.id] : null, el = $('player');
  const elapsed = PL.steps.slice(0, PL.i).reduce((a, s2) => a + s2.sec, 0) + (st.sec - PL.left);
  const nW = PL.steps.filter(s2 => s2.k === 'w').length, iW = PL.steps.slice(0, PL.i + 1).filter(s2 => s2.k === 'w').length;
  const nm = y => y.id ? esc(EX[y.id].n) + (y.side ? ' · ' + y.side : '') : esc(y.lbl || 'Esforço');
  el.classList.toggle('rest', st.k !== 'w');
  el.innerHTML = `<div class="pl-top"><button class="pl-btn" data-act="plQuit" aria-label="Terminar">${ic('x', 20)}</button><div class="tt"><b>${PL.s.n}</b><small>${st.k === 'w' ? `Passo ${iW} de ${nW}` : st.k === 'p' ? 'A começar' : `Pausa · feitos ${iW} de ${nW}`}</small></div><button class="pl-btn" data-act="plMute" aria-label="Som">${ic(S.mute ? 'mute' : 'sound', 20)}</button></div>
   <div class="pl-prog"><i id="plbar" style="width:${elapsed / PL.total * 100}%"></i></div>
   <div class="pl-media">${x ? (st.k === 'w' ? `<div class="media"><img src="${src(show.id, 0)}" alt=""><img class="b" src="${src(show.id, 1)}" alt=""></div>` : `<div class="media" style="opacity:.8"><img src="${src(show.id, 1)}" alt=""></div>`) : ''}</div>
   <div class="pl-info"><span class="pl-phase">${st.k === 'w' ? (PL.s.calm ? 'MANTÉM' : 'ESFORÇO') : st.k === 'p' ? 'PREPARA-TE' : (PL.s.calm ? 'MUDA DE POSIÇÃO' : 'PAUSA')}</span>
    <h2>${st.k === 'w' ? nm(st) : nx ? 'A seguir: ' + nm(nx) : 'Última pausa'}</h2>
    <p>${st.k === 'w' ? esc(st.note || (x ? x.st[1] : '') || '') : nx && nx.id ? esc(nx.note || EX[nx.id].st[0] || '') : ''}</p></div>
   <div class="pl-clock"><div class="n ${PL.left >= 100 ? 'sm' : ''}" id="plnum">${fT(Math.ceil(PL.left))}</div></div>
   <div class="pl-next">${st.k === 'w' && nx ? 'A seguir: ' + nm(nx) : ''}</div>
   <div class="pl-ctrl"><button class="pl-btn" data-act="plPrev" aria-label="Anterior">${ic('left', 22)}</button><button class="pl-btn big" data-act="plPause" aria-label="${PL.paused ? 'Continuar' : 'Pausar'}">${ic(PL.paused ? 'play' : 'pause', 30, 2.4)}</button><button class="pl-btn" data-act="plNext" aria-label="Seguinte">${ic('chev', 22)}</button></div>`;
}
function plTick() {
  if (!PL || PL.paused || PL.fin) return;
  const st = PL.steps[PL.i], left = Math.max(0, (PL.end - Date.now()) / 1000), c = Math.ceil(left); PL.left = left;
  const n = $('plnum'); if (n) n.textContent = fT(c);
  const b = $('plbar'); if (b) b.style.width = ((PL.steps.slice(0, PL.i).reduce((a, s2) => a + s2.sec, 0) + st.sec - left) / PL.total * 100) + '%';
  if (left > 0 && c <= 3 && c !== PL.lastBeep) { PL.lastBeep = c; beep(660, .08); }
  if (left <= 0) { if (st.k === 'w') PL.doneSec += st.sec; if (PL.i + 1 < PL.steps.length) plGo(PL.i + 1); else plFinish(true); }
}
function plFinish(full, fromPop) {
  if (!PL) return; clearInterval(PL.t); wakeOff();
  if (PL.fin) { plClose(fromPop); return; }
  PL.fin = true;
  const frac = PL.workTotal ? Math.min(1, PL.doneSec / PL.workTotal) : 0, sec = frac * PL.total, kc = PL.s.met * (calc().w || 0) * sec / 3600;
  if (PL.doneSec < 60) { plClose(fromPop); toast('Sessão terminada sem registo (menos de 1 min).'); return; }
  const isFull = frac >= 0.7 && (PL.s.tipo === 'along' ? sec >= 600 : sec >= 230);
  const t = today(); S.sess[t] = S.sess[t] || []; S.sess[t].push({ id: PL.s.id, n: PL.s.n, min: Math.round(sec / 60), k: Math.round(kc), full: isFull }); save();
  if (fromPop) { plClose(true); toast(`Sessão registada: ${Math.round(sec / 60)} min · ${f0(kc)} kcal`); return; }
  beep(880, .15); setTimeout(() => beep(1175, .15), 170); setTimeout(() => beep(1568, .35), 340); vib([200, 80, 200, 80, 400]);
  const el = $('player'); el.classList.remove('rest');
  el.innerHTML = `<div class="pl-done"><div style="font-size:64px">${frac >= 0.7 ? '🎉' : '👏'}</div><h2>${frac >= 0.7 ? 'Sessão concluída!' : 'Boa tentativa!'}</h2><p style="opacity:.8;margin:0">${PL.s.n}${isFull ? ' · conta como treino de hoje' : frac >= 0.7 ? '' : ' · fizeste ' + Math.round(frac * 100) + ' %'}</p>
    <div class="st"><div><b>${Math.round(sec / 60)}</b><small>minutos</small></div><div><b>${f0(kc)}</b><small>kcal</small></div></div>
    <button class="btn" style="background:#fff;color:var(--plum);margin:10px auto 0;min-width:200px" data-act="plClose">Fechar</button></div>`;
}
function plClose(fromPop) {
  if (PL) clearInterval(PL.t); wakeOff(); PL = null; $('player').classList.remove('on', 'rest'); $('player').innerHTML = '';
  if (!fromPop && history.state && history.state.player) { skipPop++; history.back(); }
  render();
}

/* =========================================================
   diário alimentar, jejum e água
   ========================================================= */
// fora do plano: [nome, kcal, proteína, gordura, HC líquidos] (valores aproximados)
const XF = {
  arroz: ['Arroz cozido (1 chávena)', 205, 4, 0.4, 44], pao: ['Pão (1 carcaça, 50 g)', 135, 4.5, 1, 26], massa: ['Massa cozida (1 prato)', 310, 11, 2, 60],
  batata: ['Batata cozida (1 média)', 130, 3, 0.2, 27], bfrita: ['Batata frita (1 dose)', 365, 4, 17, 45], feijao: ['Feijão cozido (1 concha)', 125, 8, 0.5, 15],
  banana: ['Banana', 105, 1.3, 0.4, 24], maca: ['Maçã ou laranja', 80, 0.5, 0.2, 17], manga: ['Manga (metade)', 100, 1.4, 0.6, 23],
  leite: ['Leite meio-gordo (1 copo)', 115, 8, 4, 12], refri: ['Refrigerante (1 lata)', 140, 0, 0, 35], sumo: ['Sumo de fruta (1 copo)', 110, 1, 0, 26],
  cerveja: ['Cerveja (33 cl)', 145, 1.5, 0, 12], vinho: ['Vinho (1 copo)', 125, 0, 0, 4], bolacha: ['Bolachas (4)', 180, 2.5, 7, 26],
  choco: ['Chocolate de leite (4 quadrados)', 135, 2, 7.5, 14], bolo: ['Fatia de bolo', 300, 4, 13, 42], pizza: ['Pizza (1 fatia)', 285, 12, 10, 34],
  hamb: ['Hambúrguer com pão', 480, 25, 24, 38], cafe: ['Café com 1 pacote de açúcar', 30, 0, 0, 7],
  frangoG: ['Peito de frango grelhado (150 g)', 250, 46, 6, 0], bife: ['Bife de vaca grelhado (150 g)', 300, 38, 16, 0],
};
function foodInfo(id) { const a = ING[id] || XF[id]; return a ? { n: a[0], k: a[1], p: a[2], f: a[3], c: a[4], off: !ING[id] && a[4] > 8 } : null; }
function dayEat(date) {
  const wd = (Dt(date).getDay() + 6) % 7, md = S.meals[date] || {}, items = []; let k = 0, p = 0, f = 0, c = 0;
  const add = t2 => { k += t2.k; p += t2.p; f += t2.f; c += t2.c; };
  KETO[wd].m.forEach((m, i) => { if (md[i]) { const t2 = tot(m.it); add(t2); items.push({ kind: 'meal', n: m.t, t: t2 }); } });
  if (S.doce[date] != null && DOCES[S.doce[date]]) { const t2 = tot(DOCES[S.doce[date]].it); add(t2); items.push({ kind: 'doce', n: DOCES[S.doce[date]].n, t: t2 }); }
  (S.food[date] || []).forEach((e, i) => { const fi = e.id ? foodInfo(e.id) : null; const t2 = fi ? { k: fi.k * e.q, p: fi.p * e.q, f: fi.f * e.q, c: fi.c * e.q } : { k: +e.k || 0, p: 0, f: 0, c: 0 }; add(t2); items.push({ kind: 'food', i, n: fi ? fi.n : e.n, q: e.q, t: t2, off: fi && fi.off, custom: !fi }); });
  const ex = +S.ing[date] || 0; if (ex) { k += ex; items.push({ kind: 'old', n: 'Calorias registadas à mão', t: { k: ex, p: 0, f: 0, c: 0 } }); }
  return { k, p, f, c, items };
}
const protGoal = () => { const c = calc(); return c.h ? Math.round(1.6 * 24.9 * (c.h / 100) ** 2) : 100; };
const FPROG = [['14:10', 14], ['16:8', 16], ['17:7', 17], ['18:6', 18], ['20:4', 20], ['OMAD', 23]];
const fH = h => Math.floor(h) + ' h ' + pad(Math.floor((h % 1) * 60)) + ' min';
const hhmm = ts => { const d = new Date(ts); return pad(d.getHours()) + ':' + pad(d.getMinutes()); };
function fastLbl() { const f = S.fast; if (!f.st) return ''; const h = (Date.now() - f.t) / 36e5; return f.st === 'fast' ? 'em jejum há ' + fH(h) : 'a comer há ' + fH(h); }
function fastHours(date) { let m = 0; S.fast.log.forEach(x => { if (dstr(new Date(x.e)) === date) m = Math.max(m, (x.e - x.s) / 36e5); }); return Math.round(m * 10) / 10; }
function fastStage(h) {
  if (h < 4) return 'A digerir a última refeição.'; if (h < 8) return 'Glicemia e insulina a descer.';
  if (h < 12) return 'O corpo começa a ir às reservas.'; if (h < 16) return 'A usar mais gordura como combustível.';
  if (h < 20) return 'Cetose mais marcada.'; return 'Jejum longo: bebe água e não te esqueças do sal.';
}
function fastHtml() {
  const f = S.fast, now = Date.now(), h = f.st ? (now - f.t) / 36e5 : 0, win = 24 - f.goal, pn = (FPROG.find(x => x[1] === f.goal) || [f.goal + ':' + win])[0];
  const prog = `<div class="chips" style="margin-bottom:-6px">${FPROG.map(([l, g]) => `<button class="chip ${f.goal === g ? 'on' : ''}" data-act="fastGoal" data-v="${g}">${l}</button>`).join('')}</div>`;
  const last = f.log.slice(-7), avg = last.length ? last.reduce((a, x) => a + (x.e - x.s) / 36e5, 0) / last.length : 0;
  const hist = last.length ? `<p class="note" style="margin:12px 0 0">Últimos ${last.length} jejuns: média de <b>${fH(avg)}</b>, ${last.filter(x => (x.e - x.s) / 36e5 >= f.goal - 0.02).length} na meta.</p>` : '';
  const dayOf = ts => dstr(new Date(ts)) === today() ? '' : ' de ontem';
  let body;
  if (!f.st) body = `<p class="note" style="margin:0 0 12px">Escolhe o programa. O temporizador começa sozinho quando marcas a última refeição do dia, ou carrega em começar. Conta mesmo com a app fechada.</p>${prog}
    <div class="btns" style="margin-top:16px"><button class="btn" data-act="fast" data-v="fast">${ic('play', 18)} Começar jejum agora</button></div>
    <label class="f">Ou diz-me a que horas acabaste de comer</label><input class="in" type="time" data-act="fastTime" aria-label="Hora da última refeição">`;
  else if (f.st === 'fast') {
    const left = f.goal - h, endTs = f.t + f.goal * 36e5;
    body = `<div style="display:flex;gap:16px;align-items:center">${ring(h / f.goal, 116, 11, h >= f.goal ? 'var(--mint)' : 'var(--lil)', 'var(--sf2)', `<div style="line-height:1.2;text-align:center"><div style="font-size:20px">${Math.floor(h)}h${pad(Math.floor((h % 1) * 60))}</div><div style="font-size:10.5px;color:var(--ink2);font-weight:600">de ${f.goal} h</div></div>`)}
      <div style="flex:1"><b style="font-size:16px">${left > 0 ? 'Faltam ' + fH(left) : 'Meta batida! +' + fH(-left)}</b><div class="note">Início às ${hhmm(f.t)}${dayOf(f.t)} · ${left > 0 ? 'acaba' : 'acabou'} às ${hhmm(endTs)}</div><div class="note" style="margin-top:6px;color:var(--lil);font-weight:700">${fastStage(h)}</div></div></div>
     <div style="margin-top:14px">${prog}</div>
     <div class="btns" style="margin-top:16px"><button class="btn" data-act="fast" data-v="eat">${ic('food', 18)} Vou comer agora</button><button class="btn ghost" data-act="fast" data-v="stop">Cancelar</button></div>
     <label class="f">Acertar a hora de início</label><input class="in" type="time" value="${hhmm(f.t)}" data-act="fastTime" aria-label="Hora de início do jejum">`;
  } else {
    const left = win - h;
    body = `<div style="display:flex;gap:16px;align-items:center">${ring(h / win, 116, 11, left < 0 ? 'var(--amb)' : 'var(--ac)', 'var(--sf2)', `<div style="line-height:1.2;text-align:center"><div style="font-size:20px">${Math.floor(h)}h${pad(Math.floor((h % 1) * 60))}</div><div style="font-size:10.5px;color:var(--ink2);font-weight:600">de ${win} h</div></div>`)}
      <div style="flex:1"><b style="font-size:16px">Janela de alimentação</b><div class="note">${left > 0 ? 'Fecha às ' + hhmm(f.t + win * 36e5) + ' · faltam ' + fH(left) : 'A janela de ' + win + ' h já fechou há ' + fH(-left)}</div></div></div>
     <div style="margin-top:14px">${prog}</div>
     <div class="btns" style="margin-top:16px"><button class="btn" data-act="fast" data-v="fast">${ic('play', 18)} Acabei de comer: começar jejum</button></div>`;
  }
  return `<div class="sec"><span>Jejum intermitente</span><span style="text-transform:none;letter-spacing:0;font-weight:700;color:var(--lil)">${pn} · ${f.goal} h de jejum</span></div><div class="card">${body}${hist}<p class="note" style="margin:10px 0 0">As fases são aproximadas e variam de pessoa para pessoa. Em jejum podes beber água, chá e café sem açúcar.</p></div>`;
}
function diarioHtml() {
  const t = today(), c = calc(), e = dayEat(t), tg = kcalTarget() || 1800, pg = protGoal();
  const pl = S.pl[t] === '1', base = c.base * (pl ? 1.1 : 1), tk = kcalDate(t), stp = +S.steps[t] || 0, sk = Math.max(0, stp - 4000) * (c.w || 0) * 0.00035, gasto = base + tk + sk, bal = e.k - gasto;
  let msg = 'Marca as refeições à medida que comes: as calorias e os macros somam-se sozinhos.', cl = 'lil';
  if (e.k && c.ok) {
    if (bal <= -300 && e.k >= 1400) { msg = 'Défice na zona certa para emagrecer com saúde.'; cl = ''; }
    else if (bal < -300) { msg = 'Ainda abaixo de ~1400 kcal. Se o dia já acabou, junta proteína: comer de menos também trava o progresso.'; cl = 'amb'; }
    else if (bal <= 100) msg = 'Em manutenção. Para emagrecer, fica 300–500 kcal abaixo do gasto.';
    else { msg = 'Superávite hoje. Sem drama: ajusta a próxima refeição.'; cl = 'amb'; }
  }
  const wd = (new Date().getDay() + 6) % 7, md = S.meals[t] || {}, wg = waterGoal(t), wc = S.water[t] || 0, dc = S.doce[t] != null ? DOCES[S.doce[t]] : null;
  const foods = e.items.filter(x => x.kind === 'food');
  return `<div class="card"><div class="rings">
     <div>${ring(e.k / tg, 88, 9, e.k > tg + 150 ? 'var(--amb)' : 'var(--ac)', 'var(--sf2)', `<span style="font-size:16px">${f0(e.k)}</span>`)}<small>kcal de ${f0(tg)}</small></div>
     <div>${ring(e.c / 30, 88, 9, e.c > 30 ? 'var(--amb)' : 'var(--lil)', 'var(--sf2)', `<span style="font-size:16px">${f0(e.c)} g</span>`)}<small>hidratos · máx. 30 g</small></div>
     <div>${ring(e.p / pg, 88, 9, 'var(--mint)', 'var(--sf2)', `<span style="font-size:16px">${f0(e.p)} g</span>`)}<small>proteína de ${pg} g</small></div></div>
    <div class="call ${cl}" style="margin-top:14px">${ic('info', 18)}<div>${msg}</div></div></div>
   <div class="sec">O que comi hoje <button class="link" data-act="foodOpen">+ Adicionar</button></div>
   <div class="card list">
    ${KETO[wd].m.map((m, i) => { const t2 = tot(m.it); return `<div class="row ${md[i] ? 'done' : ''}"><div class="ic">${ic('food', 18)}</div><div class="tx"><b>${esc(m.t)}</b><small>Refeição ${i + 1} · ${m.h} · ${f0(t2.k)} kcal · HC ${f0(t2.c)} g</small></div><button class="ck ${md[i] ? 'on' : ''}" data-act="meal" data-i="${i}" aria-label="Comida">${ic('check', 18, 3)}</button></div>`; }).join('')}
    ${dc ? `<div class="row done"><div class="ic" style="background:var(--amb2);color:var(--amb)">${ic('cake', 18)}</div><div class="tx"><b>${esc(dc.n)}</b><small>Doce keto · ${f0(tot(dc.it).k)} kcal</small></div><button class="x" style="width:32px;height:32px" data-act="doce" data-i="${S.doce[t]}" aria-label="Tirar">${ic('x', 14)}</button></div>` : ''}
    ${foods.map(x => `<div class="row"><div class="tx"><b>${esc(x.n)}</b><small>${f0(x.t.k)} kcal${x.custom ? '' : ' · HC ' + f0(x.t.c) + ' g'}${x.off ? ' · <span style="color:var(--amb);font-weight:700">fora do keto</span>' : ''}</small></div><div class="qty"><button data-act="foodQ" data-i="${x.i}" data-d="-1" aria-label="Menos">${ic(x.custom ? 'x' : 'minus', 14)}</button>${x.custom ? '' : `<b>${String(x.q).replace('.', ',')}×</b><button data-act="foodQ" data-i="${x.i}" data-d="1" aria-label="Mais">${ic('plus', 14)}</button>`}</div></div>`).join('')}
    ${+S.ing[t] ? `<div class="row"><div class="tx"><b>Calorias registadas à mão</b><small>${f0(+S.ing[t])} kcal</small></div><button class="x" style="width:32px;height:32px" data-act="ingDel" aria-label="Apagar">${ic('x', 14)}</button></div>` : ''}
    <button class="row" data-act="foodOpen"><div class="ic" style="background:var(--sf2);color:var(--ink)">${ic('plus', 18)}</div><div class="tx"><b>Adicionar alimento</b><small>do plano, de fora do plano ou calorias avulsas</small></div><span class="chev">${ic('chev', 18)}</span></button>
    ${dc ? '' : `<button class="row" data-act="go" data-tab="comer" data-sub="doces"><div class="ic" style="background:var(--amb2);color:var(--amb)">${ic('cake', 18)}</div><div class="tx"><b>Juntar um doce keto</b><small>6 receitas para o teu sweet tooth</small></div><span class="chev">${ic('chev', 18)}</span></button>`}
   </div>
   ${fastHtml()}
   <div class="sec"><span>Água</span><span style="text-transform:none;letter-spacing:0;font-weight:700">meta ${fL(wg)} L</span></div>
   <div class="card"><div style="display:flex;gap:16px;align-items:center">${ring(wc / wg, 88, 9, '#4C93E8', 'var(--sf2)', `<span style="font-size:16px">${fL(wc)} L</span>`)}<div style="flex:1"><div class="btns"><button class="btn sm" data-act="water" data-ml="250">+250 ml</button><button class="btn sm" data-act="water" data-ml="500">+500</button><button class="btn sm ghost" data-act="water" data-ml="-250">−250</button></div><p class="note" style="margin:8px 0 0">${wc >= wg ? 'Meta batida! 🎉' : 'Faltam ' + fL(wg - wc) + ' L.'} Base de ${fL(waterBase())} L, +0,5 L com treino ou plantão.</p></div></div></div>
   <div class="sec">Balanço de hoje</div>
   <div class="card"><label class="f" style="margin-top:0">Passos de hoje</label><input class="in" type="number" inputmode="numeric" value="${stp || ''}" placeholder="copia do Samsung Health ou do relógio" data-act="stepsSet"><p class="note" style="margin:8px 0 0">${stp ? (sk ? 'Somei ~' + f0(sk) + ' kcal ao gasto (só conto acima de 4 000 passos, porque o gasto base já inclui o dia a dia).' : 'Até 4 000 passos já estão incluídos no gasto base.') : 'Opcional. Acima de 4 000 passos somo as calorias extra ao teu gasto.'}</p></div>
   ${c.ok ? `<div class="grid2"><div class="card kpi"><small>Gasto base</small><b>${f0(base)}</b><span class="u">kcal</span><span class="s">TMB × 1,2${pl ? ' + plantão' : ''}</span></div>
     <div class="card kpi"><small>Treino${sk ? ' e passos' : ''}</small><b>${f0(tk + sk)}</b><span class="u">kcal</span><span class="s">exercícios e sessões${sk ? ' + ' + f0(sk) + ' de passos' : ''}</span></div>
     <div class="card kpi"><small>Gasto total</small><b>${f0(gasto)}</b><span class="u">kcal</span><span class="s">meta para comer: ${f0(Math.max(gasto - 500, 1400))}</span></div>
     <div class="card kpi"><small>Balanço</small><b style="color:${bal > 0 ? 'var(--amb)' : 'var(--ink)'}">${e.k ? (bal > 0 ? '+' : '') + f0(bal) : '—'}</b><span class="u">kcal</span><span class="s">comido − gasto</span></div></div>
    <p class="note" style="margin:10px 2px">500 kcal/dia de défice ≈ 0,45 kg de gordura por semana. Valores estimados (±20 %).</p>` : `<div class="card"><p class="note" style="margin-top:0">Preenche o perfil para calcular o teu gasto.</p><button class="btn w" data-act="profile">Preencher perfil</button></div>`}`;
}
function foodSheet() {
  const row = (id, tag) => { const f = foodInfo(id); return `<button class="row frow" data-act="foodAdd" data-id="${id}" data-n="${esc(f.n.toLowerCase())}"><div class="tx"><b>${esc(f.n)}</b><small>${f0(f.k)} kcal · P ${f0(f.p)} · G ${f0(f.f)} · HC ${f0(f.c)} g${tag}</small></div><span class="chev" style="color:var(--ac)">${ic('plus', 18)}</span></button>`; };
  openSheet(`<div class="shead"><div><p class="eyebrow">Diário de hoje</p><h2 style="margin:0">Adicionar alimento</h2></div><button class="x" data-act="closeSheet" aria-label="Fechar">${ic('x', 18)}</button></div>
   <input class="in" id="foodq" placeholder="Procurar (ex.: ovo, arroz, cerveja)" style="margin-bottom:12px">
   <div class="sec" style="margin-top:4px">Do plano keto</div><div class="card list flat">${Object.keys(ING).map(id => row(id, '')).join('')}</div>
   <div class="sec">Fora do plano</div><div class="card list flat">${Object.keys(XF).map(id => row(id, foodInfo(id).off ? ' · <span style="color:var(--amb);font-weight:700">fora do keto</span>' : '')).join('')}</div>
   <div class="sec">Não está na lista?</div><div class="card flat"><div class="grid2"><div><label class="f" style="margin-top:0">Nome</label><input class="in" id="fc_n" placeholder="ex.: jantar fora"></div><div><label class="f" style="margin-top:0">Calorias</label><input class="in" id="fc_k" type="number" inputmode="numeric" placeholder="kcal"></div></div><button class="btn w soft" style="margin-top:12px" data-act="foodCustom">Adicionar calorias avulsas</button></div>`);
  const q = $('foodq'); q.oninput = () => { const v = q.value.toLowerCase(); document.querySelectorAll('#sheet .frow').forEach(r => { r.style.display = r.dataset.n.includes(v) ? '' : 'none'; }); };
}

/* =========================================================
   check-in diário (lombar e energia)
   ========================================================= */
function advice(c) {
  const yoga = ` <button class="link" data-act="sess" data-id="yogaL">Abrir Yoga para a lombar</button>`;
  if (c.dor === 3) return { cl: 'amb', t: 'Dor forte: hoje não há treino de carga.', m: 'Caminha um pouco e, se aliviar, faz a yoga suave. Dor que irradia para a perna, formigueiro ou perda de força pedem avaliação.' + yoga };
  if (c.dor === 2) return { cl: 'amb', t: 'Lombar moderada: poupa a coluna.', m: 'Troca o treino pela yoga ou pelo pilates, e evita Smith, hack squat e afundos.' + yoga };
  if (c.dor === 1) return { cl: 'lil', t: 'Lombar ligeira.', m: 'Aquece bem, mantém as cargas e deixa os recordes para outro dia.' };
  if (c.en === 0) return { cl: 'lil', t: 'Energia em baixo.', m: 'Faz 2 séries em vez de 3, ou uma sessão curta em casa. Aparecer já conta.' };
  if (c.en === 2) return { cl: '', t: 'Dia bom!', m: 'Se tiveres cargas marcadas para subir, é hoje.' };
  return { cl: 'lil', t: 'Tudo normal.', m: 'Segue o plano e vai bebendo água.' };
}
function checkinHtml() {
  const t = today(), c = S.ck[t] || {};
  if (c.dor != null && c.en != null && !UI.ckEdit) { const a = advice(c); return `<div class="call ${a.cl}" style="margin-bottom:12px">${ic(a.cl === 'amb' ? 'spine' : 'spark', 18)}<div><b>${a.t}</b> ${a.m} <button class="link" style="opacity:.7" data-act="ckEdit">alterar</button></div></div>`; }
  const o = (k, labels) => `<div class="opt">${labels.map((l, i) => `<button class="${c[k] === i ? 'on' : ''}" data-act="ck" data-k="${k}" data-v="${i}">${l}</button>`).join('')}</div>`;
  return `<div class="card"><h3>Como estás hoje?</h3><p class="note" style="margin:2px 0 0">Dois toques e eu ajusto o conselho do dia.</p><label class="f">Lombar</label>${o('dor', ['Sem dor', 'Ligeira', 'Moderada', 'Forte'])}<label class="f">Energia</label>${o('en', ['Baixa', 'Normal', 'Alta'])}</div>`;
}

/* =========================================================
   conquistas
   ========================================================= */
function stats() {
  const dates = new Set([...Object.keys(S.log), ...Object.keys(S.sess)]), wk = {}; let wo = 0;
  dates.forEach(d => { if (workoutPct(d) >= 0.8) { wo++; const m = monOf(d); wk[m] = (wk[m] || 0) + 1; } });
  let ups = 0; Object.values(S.loads).forEach(h0 => { const h = h0.slice().sort((a, b) => a.d < b.d ? -1 : 1); for (let i = 1; i < h.length; i++) if (h[i].kg > h[i - 1].kg) ups++; });
  const wts = [...S.med].filter(e => e.p).sort((a, b) => a.d < b.d ? -1 : 1), cs = [...S.med].filter(e => e.c).sort((a, b) => a.d < b.d ? -1 : 1);
  let sessN = 0; Object.values(S.sess).forEach(a => a.forEach(e => { if (e.id !== 'timer') sessN++; }));
  return { wo, bestWeek: Math.max(0, ...Object.values(wk)), ups,
    water: Object.keys(S.water).filter(d => S.water[d] >= waterGoal(d)).length, keto: Object.keys(S.meals).filter(mealsDone).length,
    fasts: S.fast.log.filter(x => (x.e - x.s) / 36e5 >= 14).length, sessN, med: S.med.length,
    lost: wts.length > 1 ? Math.max(0, wts[0].p - wts[wts.length - 1].p) : 0, lostC: cs.length > 1 ? Math.max(0, cs[0].c - cs[cs.length - 1].c) : 0,
    streak: S.chal ? chalStats().best : 0, photoN: S.phN || 0, ck: Object.keys(S.ck).length };
}
const B = (id, em, n, d, key, goal) => [id, em, n, d, s2 => [s2[key], goal]];
const BADGES = [
  B('first', '🌱', 'Primeiro passo', '1.º treino', 'wo', 1), B('w5', '💪', 'Em andamento', '5 treinos', 'wo', 5), B('w10', '🔥', 'Dez!', '10 treinos', 'wo', 10),
  B('w25', '⚡', 'Imparável', '25 treinos', 'wo', 25), B('w50', '👑', 'Rainha do ginásio', '50 treinos', 'wo', 50), B('week4', '🗓️', 'Semana perfeita', '4 treinos numa semana', 'bestWeek', 4),
  B('up1', '📈', 'Mais forte', '1.ª subida de carga', 'ups', 1), B('up10', '🏋️', 'Dez subidas', '10 subidas de carga', 'ups', 10), B('sess5', '🧘', 'Bem guiada', '5 sessões guiadas', 'sessN', 5),
  B('water7', '💧', 'Hidratada', '7 dias na meta de água', 'water', 7), B('water30', '🌊', 'Fonte', '30 dias na meta', 'water', 30), B('keto7', '🥑', 'Keto em dia', '7 dias com 2 refeições', 'keto', 7),
  B('fast5', '⏳', 'Mestre do jejum', '5 jejuns de 14 h+', 'fasts', 5), B('ck7', '🩺', 'Atenta ao corpo', '7 check-ins', 'ck', 7), B('med1', '📏', 'Ponto de partida', '1.ª medição', 'med', 1),
  B('foto', '📸', 'Antes e depois', '1.ª foto', 'photoN', 1), B('kg2', '⚖️', 'Menos 2 kg', 'na balança', 'lost', 2), B('kg5', '🎀', 'Menos 5 kg', 'na balança', 'lost', 5),
  B('kg10', '🏆', 'Menos 10 kg', 'na balança', 'lost', 10), B('cm5', '👗', 'Menos 5 cm', 'de cintura', 'lostC', 5), B('streak7', '✨', '7 dias seguidos', 'no desafio', 'streak', 7),
];
function checkBadges(silent) {
  const first = !S.badges; if (first) S.badges = {};
  const st = stats(), nw = [];
  BADGES.forEach(b => { const [cur, goal] = b[4](st); if (cur >= goal && !S.badges[b[0]]) { S.badges[b[0]] = today(); nw.push(b); } });
  if (nw.length || first) save();
  if (nw.length && !silent && !first) setTimeout(() => toast(nw[0][1] + ' Conquista: ' + nw[0][2] + '!'), 1500);
}
function nextBadge() {
  const st = stats(); let best = null;
  BADGES.forEach(b => { if ((S.badges || {})[b[0]]) return; const [cur, goal] = b[4](st), r = cur / goal; if (!best || r > best.r) best = { b, r, cur, goal }; });
  return best ? `A seguir: ${best.b[2]} (${best.b[3]}) · ${f0(best.cur)}/${best.goal}` : 'Todas desbloqueadas! 👑';
}

/* =========================================================
   resumo da semana, histórico e fotos
   ========================================================= */
function weekMuscles() {
  const t = today(), mon = monOf(t), m = {}, keys = Object.keys(S.checks);
  for (let i = 0; i < 7; i++) {
    const d = addD(mon, i); if (d > t) break;
    keys.forEach(k => { if (!k.endsWith('_' + d)) return; Object.entries(S.checks[k]).forEach(([kk, v]) => { if (!v) return; const x = EX[kk.replace(/_\d+$/, '')]; if (x && x.g !== 'cardio' && x.g !== 'mob') { const g = x.g === 'corpo' ? 'pernas' : x.g; m[g] = (m[g] || 0) + (x.s || 1); } }); });
    sessOf(d).forEach(e => { const se = SESS.find(x => x.id === e.id); if (se) sessSteps(se).forEach(st => { const x = st.k === 'w' && st.id ? EX[st.id] : null; if (x && x.g !== 'cardio' && x.g !== 'mob') { const g = x.g === 'corpo' ? 'pernas' : x.g; m[g] = (m[g] || 0) + 0.5; } }); });
  }
  return m;
}
function weekCardHtml() {
  const t = today(), mon = monOf(t); let tw = 0, kw = 0, ws = 0, wn = 0, kd = 0;
  for (let i = 0; i < 7; i++) { const d = addD(mon, i); if (d > t) break; if (workoutPct(d) >= 0.8) tw++; kw += kcalDate(d); if (S.water[d]) { ws += S.water[d]; wn++; } if (mealsDone(d)) kd++; }
  const m = weekMuscles(), G = ['pernas', 'glut', 'costas', 'peito', 'ombros', 'bracos', 'core'];
  return `<div class="grid2"><div class="card kpi"><small>Treinos esta semana</small><b>${tw}</b><span class="u">/ 4</span></div><div class="card kpi"><small>Gasto em treino</small><b>${f0(kw)}</b><span class="u">kcal</span></div>
    <div class="card kpi"><small>Água (média)</small><b>${wn ? fL(ws / wn) : '—'}</b><span class="u">L/dia</span></div><div class="card kpi"><small>Dias keto</small><b>${kd}</b><span class="u">esta semana</span></div></div>
   <div class="sec">Músculos trabalhados esta semana</div>
   <div class="card">${G.map(g => `<div class="mb"><span>${GN[g]}</span><div class="bar"><i style="width:${Math.min(100, (m[g] || 0) / 9 * 100)}%"></i></div><b>${f0(m[g] || 0)} séries</b></div>`).join('')}<p class="note" style="margin:10px 0 0">Referência para principiantes: 6–10 séries por grupo, por semana. As barras vazias mostram o que ficou por treinar.</p></div>`;
}
function histHtml() {
  const [y, m] = UI.hm.split('-').map(Number), n = new Date(y, m, 0).getDate(), lead = (new Date(y, m - 1, 1).getDay() + 6) % 7, t = today();
  let cells = '<span></span>'.repeat(lead), tr = 0, kc = 0, pls = 0;
  for (let d = 1; d <= n; d++) {
    const ds = y + '-' + pad(m) + '-' + pad(d), done = workoutPct(ds) >= 0.8, pl = S.pl[ds] === '1'; if (done) tr++; if (pl) pls++; kc += kcalDate(ds);
    const dots = [S.water[ds] && S.water[ds] >= waterGoal(ds) ? (done ? '#CFE3FB' : '#4C93E8') : '', mealsDone(ds) ? (done ? '#FBE3B8' : '#C77E12') : '', S.med.some(e => e.d === ds) ? (done ? '#fff' : '#2A1A28') : ''].filter(Boolean);
    cells += `<button class="mc ${done ? 'tr' : pl ? 'pl' : ''} ${ds === t ? 'td' : ''} ${ds > t ? 'fu' : ''}" data-act="hday" data-d="${ds}">${d}<span class="dots">${dots.map(c2 => `<i style="background:${c2}"></i>`).join('')}</span></button>`;
  }
  return `<div class="card"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px"><button class="x" data-act="hm" data-d="-1" aria-label="Mês anterior">${ic('left', 18)}</button><b style="font-size:16px;text-transform:capitalize">${MO[m - 1]} ${y}</b><button class="x" data-act="hm" data-d="1" aria-label="Mês seguinte">${ic('chev', 18)}</button></div>
    <div class="mcal">${['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map(l => `<div class="hd">${l}</div>`).join('')}${cells}</div>
    <div class="tags" style="margin-top:14px"><span class="tag mint">treino</span><span class="tag lil">plantão</span><span class="tag" style="background:#E6F0FD;color:#2F78D6">● água</span><span class="tag amb">● keto</span><span class="tag">● medidas</span></div></div>
   <div class="grid2"><div class="card kpi"><small>Treinos no mês</small><b>${tr}</b></div><div class="card kpi"><small>Gasto em treino</small><b>${f0(kc)}</b><span class="u">kcal</span></div></div>
   <p class="note" style="margin:12px 2px">Toca num dia para ver o que fizeste${pls ? ' · ' + pls + ' plantões este mês' : ''}.</p>`;
}
function daySheet(ds) {
  const exs = []; Object.keys(S.checks).forEach(k => { if (!k.endsWith('_' + ds)) return; Object.entries(S.checks[k]).forEach(([kk, v]) => { const id = kk.replace(/_\d+$/, ''); if (v && EX[id]) { const l = (S.loads[id] || []).find(x => x.d === ds); exs.push(esc(EX[id].n) + (l ? ` <span class="tag mint">${fk(l.kg)}</span>` : '')); } }); });
  const ss = sessOf(ds), e = dayEat(ds), md = S.med.find(x => x.d === ds), c = S.ck[ds], fh = fastHours(ds), rows = [];
  const row = (i, a, b, col) => `<div class="row" style="align-items:flex-start"><div class="ic" ${col ? `style="${col}"` : ''}>${ic(i, 18)}</div><div class="tx"><b>${a}</b><small style="line-height:1.6">${b}</small></div></div>`;
  if (S.pl[ds] === '1') rows.push(row('moon', 'Dia de plantão', 'descanso', 'background:var(--lil2);color:var(--lil)'));
  if (exs.length) rows.push(row('dumb', `Treino · ${exs.length} exercício${exs.length > 1 ? 's' : ''} · ${f0(S.log[ds] ? S.log[ds].k : 0)} kcal`, exs.join(' · ')));
  ss.forEach(x => rows.push(row('timer', esc(x.n || (SESS.find(s2 => s2.id === x.id) || {}).n || 'Sessão'), `${x.min} min · ${f0(x.k)} kcal${x.full ? ' · completa' : ''}`, 'background:var(--amb2);color:var(--amb)')));
  if (e.k) rows.push(row('food', `Comida · ${f0(e.k)} kcal`, `Proteína ${f0(e.p)} g · HC ${f0(e.c)} g<br>${e.items.map(x => esc(x.n)).join(' · ')}`));
  if (fh) rows.push(row('clock', 'Jejum de ' + fH(fh), 'terminado neste dia', 'background:var(--lil2);color:var(--lil)'));
  if (S.water[ds]) rows.push(row('drop', `Água · ${fL(S.water[ds])} L`, S.water[ds] >= waterGoal(ds) ? 'meta batida' : 'abaixo da meta', 'background:#E6F0FD;color:#2F78D6'));
  if (md) rows.push(row('ruler', 'Medidas', MF.filter(([k]) => md[k] != null).map(([k, n, u]) => `${n} ${f1(md[k])} ${u}`).join(' · '), 'background:var(--sf2);color:var(--ink)'));
  if (c) rows.push(row('spine', 'Check-in', `Lombar: ${['sem dor', 'ligeira', 'moderada', 'forte'][c.dor] || '—'} · Energia: ${['baixa', 'normal', 'alta'][c.en] || '—'}`, 'background:var(--mint2);color:var(--mint)'));
  const d = Dt(ds);
  openSheet(`<div class="shead"><div><p class="eyebrow">${WD[d.getDay()]}</p><h2 style="margin:0">${d.getDate()} de ${MO[d.getMonth()]}</h2></div><button class="x" data-act="closeSheet" aria-label="Fechar">${ic('x', 18)}</button></div>
   ${rows.length ? `<div class="card list flat">${rows.join('')}</div>` : '<p class="note">Sem registos neste dia.</p>'}
   <label class="f">Nota do dia</label><textarea class="in" id="dnote" rows="3" style="width:100%;resize:vertical;font:inherit" placeholder="Como correu? O que queres lembrar?">${esc((S.notes || {})[ds] || '')}</textarea>`);
  const dn = $('dnote'); dn.onchange = () => { S.notes = S.notes || {}; if (dn.value.trim()) S.notes[ds] = dn.value.trim(); else delete S.notes[ds]; save(); toast('Nota guardada'); };
}
const DBP = new Promise(res => { try { const r = indexedDB.open('pushit', 1); r.onupgradeneeded = () => r.result.createObjectStore('photos', { keyPath: 'id' }); r.onsuccess = () => res(r.result); r.onerror = () => res(null); } catch (e) { res(null); } });
const idb = (mode, fn) => DBP.then(db => db ? new Promise(res => { try { const q = fn(db.transaction('photos', mode).objectStore('photos')); q.onsuccess = () => res(q.result); q.onerror = () => res(null); } catch (e) { res(null); } }) : null);
const phAll = () => idb('readonly', st => st.getAll()).then(r => (r || []).sort((a, b) => a.d < b.d ? -1 : a.d > b.d ? 1 : a.id - b.id));
const phPut = o => idb('readwrite', st => st.put(o));
const phDel = id => idb('readwrite', st => st.delete(id));
async function renderPhotos() {
  const ps = await phAll(), box = $('phbox'); if (!box) return;
  if ((S.phN || 0) !== ps.length) { S.phN = ps.length; save(); }
  const a = ps[0], b = ps[ps.length - 1];
  box.innerHTML = `<div class="card"><h3>Fotos de progresso</h3><p class="note" style="margin:4px 0 12px">Mesma luz, mesma roupa, mesma pose, de 2 em 2 semanas. Ficam guardadas só neste telemóvel e entram na cópia de segurança.</p><button class="btn w" data-act="phAdd">${ic('cam', 18)} Adicionar foto</button></div>` +
    (ps.length > 1 ? `<div class="sec">Antes e agora · ${diffD(a.d, b.d)} dias</div><div class="cmp"><div><img src="${a.img}" alt="Primeira foto"><span>${dm(a.d)}</span></div><div><img src="${b.img}" alt="Última foto"><span>${dm(b.d)}</span></div></div>` : '') +
    (ps.length ? `<div class="sec">Todas as fotos</div><div class="phg">${[...ps].reverse().map(p => `<button data-act="phOpen" data-id="${p.id}"><img src="${p.img}" alt="Foto de ${dfull(p.d)}" loading="lazy"><span>${dm(p.d)}</span></button>`).join('')}</div>` : `<div class="card flat" style="text-align:center"><b>Ainda sem fotos</b><p class="note">A primeira foto é a que mais vais gostar de ter daqui a 3 meses.</p></div>`);
}
async function photoSheet(id) {
  const p = (await phAll()).find(x => x.id === id); if (!p) return;
  openSheet(`<div class="shead"><div><p class="eyebrow">Foto de progresso</p><h2 style="margin:0">${dfull(p.d)}</h2></div><button class="x" data-act="closeSheet" aria-label="Fechar">${ic('x', 18)}</button></div><img src="${p.img}" alt="" style="width:100%;border-radius:18px;display:block"><button class="btn soft w" style="margin-top:14px" data-act="phDel" data-id="${p.id}">${ic('trash', 16)} Apagar foto</button>`);
}
$('photoFile').addEventListener('change', e => {
  const f = e.target.files && e.target.files[0]; if (!f) return; const r = new FileReader();
  r.onload = () => { const im = new Image(); im.onload = async () => { const k = Math.min(1, 1000 / Math.max(im.width, im.height)), cv = document.createElement('canvas'); cv.width = Math.round(im.width * k); cv.height = Math.round(im.height * k); cv.getContext('2d').drawImage(im, 0, 0, cv.width, cv.height); await phPut({ id: Date.now(), d: today(), img: cv.toDataURL('image/jpeg', 0.82) }); S.phN = (S.phN || 0) + 1; save(); toast('Foto guardada'); render(); }; im.onerror = () => toast('Não consegui abrir esta imagem.'); im.src = r.result; };
  r.readAsDataURL(f); e.target.value = '';
});

/* =========================================================
   explorar: treinos prontos, gerador e temporizador
   ========================================================= */
const ROUT = [
  { id: 'r_glut', n: 'Glúteos de aço', tipo: 'forca', place: 'gin', min: 40, cover: 'Barbell_Hip_Thrust', desc: 'Só glúteos e posterior da coxa, com a anca a trabalhar e a lombar quieta.', tip: 'Aperta os glúteos 2 s no topo de cada repetição.', ids: ['Recumbent_Bike', 'Thigh_Abductor', 'Barbell_Hip_Thrust', 'One-Legged_Cable_Kickback', 'Seated_Leg_Curl', 'Leg_Press', 'Butt_Lift_Bridge', 'Ankle_On_The_Knee'] },
  { id: 'r_pernas', n: 'Pernas completas em máquinas', tipo: 'forca', place: 'gin', min: 45, cover: 'Hack_Squat', desc: 'Coxas, posterior, interior e gémeos, sempre com as costas apoiadas.', tip: 'Costas coladas ao encosto em todas as máquinas.', ids: ['Bicycling_Stationary', 'Leg_Press', 'Hack_Squat', 'Leg_Extensions', 'Seated_Leg_Curl', 'Thigh_Adductor', 'Calf_Press', 'Hamstring_Stretch'] },
  { id: 'r_costas', n: 'Costas e postura', tipo: 'forca', place: 'gin', min: 35, cover: 'Wide-Grip_Lat_Pulldown', desc: 'Puxar, puxar, puxar: costas fortes seguram a coluna e abrem os ombros.', tip: 'Junta as omoplatas no fim de cada puxada.', ids: ['Elliptical_Trainer', 'Wide-Grip_Lat_Pulldown', 'Leverage_Iso_Row', 'Seated_Cable_Rows', 'Straight-Arm_Pulldown', 'Face_Pull', 'Reverse_Machine_Flyes', 'Upper_Back_Stretch'] },
  { id: 'r_peito', n: 'Peito e ombros', tipo: 'forca', place: 'gin', min: 35, cover: 'Leverage_Chest_Press', desc: 'Empurrar em máquinas, a caminho das flexões.', tip: 'Ombros para baixo e para trás; não bloqueies os cotovelos.', ids: ['Leverage_Chest_Press', 'Leverage_Incline_Chest_Press', 'Butterfly', 'Leverage_Shoulder_Press', 'Seated_Side_Lateral_Raise', 'Incline_Push-Up', 'Chest_And_Front_Of_Shoulder_Stretch'] },
  { id: 'r_bracos', n: 'Braços fortes', tipo: 'forca', place: 'gin', min: 30, cover: 'Machine_Bicep_Curl', desc: 'Bíceps e tríceps alternados, para os braços deixarem de ser o ponto fraco.', tip: 'Cotovelos parados: só o antebraço se mexe.', ids: ['Machine_Bicep_Curl', 'Triceps_Pushdown_-_Rope_Attachment', 'Hammer_Curls', 'Machine_Triceps_Extension', 'Standing_Biceps_Cable_Curl', 'Dip_Machine', 'Triceps_Stretch'] },
  { id: 'r_full', n: 'Corpo inteiro em máquinas', tipo: 'forca', place: 'gin', min: 50, cover: 'Leg_Press', desc: 'Um exercício por grupo muscular. Ideal para semanas com poucos dias livres.', tip: 'Se só treinares 2 vezes esta semana, faz este nos dois dias.', ids: ['Walking_Treadmill', 'Leg_Press', 'Leverage_Chest_Press', 'Leverage_Iso_Row', 'Seated_Leg_Curl', 'Leverage_Shoulder_Press', 'Wide-Grip_Lat_Pulldown', 'Thigh_Abductor', 'Plank'] },
  { id: 'r_tronco', n: 'Tronco em 30 minutos', tipo: 'forca', place: 'gin', min: 30, cover: 'Seated_Cable_Rows', desc: 'Costas, peito, ombros e braços num treino curto.', tip: 'Descansa só 60 s para caber em meia hora.', ids: ['Wide-Grip_Lat_Pulldown', 'Leverage_Chest_Press', 'Seated_Cable_Rows', 'Seated_Dumbbell_Press', 'Machine_Bicep_Curl', 'Triceps_Pushdown'] },
  { id: 'r_resmaq', n: 'Circuito de resistência', tipo: 'resist', place: 'gin', min: 30, cover: 'Seated_Cable_Rows', desc: 'Cargas leves, muitas repetições e pouco descanso, para aguentar mais tempo e gastar mais.', tip: 'Usa metade da carga habitual: 15–20 repetições, 30–45 s de descanso, 2 voltas ao circuito.', ids: ['Leg_Press', 'Seated_Cable_Rows', 'Leverage_Chest_Press', 'Seated_Leg_Curl', 'Wide-Grip_Lat_Pulldown', 'Calf_Press', 'Plank'] },
  { id: 'r_core', n: 'Core seguro para a lombar', tipo: 'resist', place: 'casa', min: 20, cover: 'Dead_Bug', desc: 'Estabilidade sem flexão da coluna: os exercícios que a reabilitação lombar recomenda.', tip: 'Qualidade antes de quantidade. Para se a lombar ceder.', ids: ['Cat_Stretch', 'Dead_Bug', 'Side_Bridge', 'Plank', 'Pelvic_Tilt_Into_Bridge', 'Glute_Kickback', 'Stomach_Vacuum', 'Childs_Pose'] },
  { id: 'r_rescasa', n: 'Resistência em casa', tipo: 'resist', place: 'casa', min: 25, cover: 'Bodyweight_Squat', desc: 'Corpo inteiro só com o teu peso, em séries e ao teu ritmo.', tip: 'Faz 3 voltas. Quando ficar fácil, junta repetições antes de juntar voltas.', ids: ['Trail_Running_Walking', 'Bodyweight_Squat', 'Incline_Push-Up', 'Butt_Lift_Bridge', 'Rear_Leg_Raises', 'Sit_Squats', 'Plank', 'Dead_Bug'] },
];
const Wl = (id, sec, lbl, note) => Object.assign(Wk(id, sec, note), { side: lbl });
Object.entries({ tabata: ['cardio', 'casa'], hiit20: ['cardio', 'casa'], hiit10: ['cardio', 'casa'], pilates: ['resist', 'casa'], yogaL: ['along', 'casa'], yogaM: ['along', 'casa'], plantao: ['along', 'casa'], pos: ['along', 'gin'] }).forEach(([id, [tp, pl]]) => { const se = SESS.find(x => x.id === id); se.tipo = tp; se.place = pl; });
SESS.push(
  { id: 'glutcasa', n: 'Glúteos em casa', tipo: 'resist', place: 'casa', met: 3.5, cover: 'Glute_Kickback', desc: 'Só um tapete: pontes, coices e elevações em 2 voltas de 40 s.',
    steps: () => [Wk('Standing_Hip_Circles', 30, 'Aquecimento: solta as ancas.'), Rs(10), ...withRest([Wk('Butt_Lift_Bridge', 40), sides('Glute_Kickback', 35), sides('Rear_Leg_Raises', 35), sides('Hip_Circles_prone', 30), Wk('Sit_Squats', 40), Wk('Butt_Lift_Bridge', 40, 'Segura 2 s em cima.'), sides('Glute_Kickback', 35), sides('Rear_Leg_Raises', 35), Wk('Sit_Squats', 40)], 15), ...sides('Ankle_On_The_Knee', 30, 'Volta à calma.')] },
  { id: 'pernascasa', n: 'Pernas em casa', tipo: 'resist', place: 'casa', met: 4.5, cover: 'Sit_Squats', desc: 'Agachamentos, degrau e pontes: 3 voltas de 40 s com 20 s de pausa.',
    steps: () => [Wk('Trail_Running_Walking', 60, 'Aquecimento: ritmo leve.'), Rs(10), ...circuit(['Bodyweight_Squat', 'Step-up_with_Knee_Raise', 'Sit_Squats', 'Front_Leg_Raises', 'Butt_Lift_Bridge'], 40, 20, 3), ...sides('Hamstring_Stretch', 30, 'Volta à calma.')] },
  { id: 'passadeira', n: 'Passadeira: caminhada intervalada', tipo: 'cardio', place: 'gin', met: 5.5, cover: 'Walking_Treadmill', desc: '6 subidas rápidas com recuperação. Queima mais do que andar sempre ao mesmo ritmo.',
    steps: () => [Wl('Walking_Treadmill', 180, 'aquecimento', '4 km/h, inclinação 1 %.'), ...Array.from({ length: 6 }, () => [Wl('Walking_Treadmill', 120, 'rápido', '5–5,5 km/h, inclinação 6–8 %. Sem agarrar os corrimões.'), Wl('Walking_Treadmill', 90, 'recuperação', '4,5 km/h, inclinação 2 %.')]).flat(), Wl('Walking_Treadmill', 180, 'volta à calma', '3,5–4 km/h, sem inclinação.')] },
  { id: 'eliptica', n: 'Elíptica: pirâmide', tipo: 'cardio', place: 'gin', met: 5.5, cover: 'Elliptical_Trainer', desc: 'A resistência sobe e desce em degraus. Zero impacto nas articulações.',
    steps: () => [[3, 120], [5, 180], [7, 180], [9, 150], [7, 180], [5, 180], [3, 180]].map(([lv, sec], i) => Wl('Elliptical_Trainer', sec, 'nível ' + lv, i === 0 ? 'Aquecimento, ritmo confortável.' : i === 6 ? 'Volta à calma.' : lv >= 9 ? 'O topo da pirâmide: aguenta!' : 'Ritmo em que ainda consegues falar.')) },
  { id: 'bike', n: 'Bicicleta: intervalos', tipo: 'cardio', place: 'gin', met: 6, cover: 'Recumbent_Bike', desc: '7 sprints de 1 min sentada, com as costas apoiadas. O cardio mais amigo da lombar.',
    steps: () => [Wl('Recumbent_Bike', 180, 'aquecimento', 'Resistência leve, 60–70 rpm.'), ...Array.from({ length: 7 }, () => [Wl('Recumbent_Bike', 60, 'forte', 'Sobe a resistência: 80–90 rpm.'), Wl('Recumbent_Bike', 90, 'leve', 'Baixa a resistência e recupera.')]).flat(), Wl('Recumbent_Bike', 120, 'volta à calma', 'Resistência mínima.')] },
);
function routSheet(id) {
  const r = ROUT.find(x => x.id === id);
  openSheet(`<div class="shead"><div><p class="eyebrow">${TN[r.tipo]} · ${r.place === 'gin' ? 'no ginásio' : 'em casa'}</p><h2 style="margin:0">${r.n}</h2></div><button class="x" data-act="closeSheet" aria-label="Fechar">${ic('x', 18)}</button></div>
   <div class="stack"><p style="margin:0">${r.desc}</p>
   <div class="tags"><span class="tag ${TC[r.tipo]}">~${r.min} min</span><span class="tag">${r.ids.length} exercícios</span></div>
   <div class="call lil">${ic('info', 18)}<div>${r.tip}</div></div>
   <button class="btn w" data-act="routUse" data-id="${id}">${ic('play', 18)} Fazer este treino</button>
   ${S.free.ids.length ? `<p class="note" style="margin:0">Substitui o teu “Treino livre” atual (${esc(S.free.n)}). O plano das fases não muda.</p>` : `<p class="note" style="margin:0">Fica no teu plano como “Treino livre”, ao lado dos 4 dias, com cargas, séries e descanso.</p>`}
   <div class="card list flat" style="margin:0">${r.ids.map(u => `<div class="row"><img class="th" src="${src(u, 1)}" alt="" loading="lazy"><div class="tx"><b>${esc(EX[u].n)}</b><small>${EX[u].dose} · ${GN[EX[u].g]}</small></div></div>`).join('')}</div></div>`);
}
const FOCUS = { full: ['Corpo inteiro', ['pernas', 'glut', 'costas', 'peito', 'ombros', 'bracos', 'core']], lower: ['Pernas e glúteos', ['pernas', 'glut']], upper: ['Costas, peito e ombros', ['costas', 'peito', 'ombros']], arms: ['Braços e ombros', ['bracos', 'ombros']], core: ['Core e postura', ['core', 'costas']] };
const homeOk = x => !x.ld && x.g !== 'cardio' && x.g !== 'mob' && !/Máquina|Polia|Halter|Bola|Elástico|Mini-band|Banco ou caixa/.test(x.eq);
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
function genMake() {
  const g = UI.gen, groups = FOCUS[g.focus][1], maxLv = Math.min(3, S.ph + 2), home = g.place === 'casa', all = Object.values(EX).filter(x => x.lv <= maxLv);
  const by = {}; groups.forEach(k => by[k] = shuffle(all.filter(x => x.g === k && (home ? homeOk(x) : x.ld || x.g === 'core'))));
  if (home && (g.focus === 'full' || g.focus === 'lower')) by.pernas = shuffle((by.pernas || []).concat(all.filter(x => x.g === 'corpo' && homeOk(x))));
  let n = Math.max(3, Math.min(9, Math.round((g.min - (home ? 4 : 9)) / 5))), ids = [], guard = 0;
  while (ids.length < n && guard++ < 40) groups.forEach(k => { const x = (by[k] || []).shift(); if (x && ids.length < n && !ids.includes(x.id)) ids.push(x.id); });
  if (home && ids.length < n) shuffle(all.filter(x => homeOk(x) && !ids.includes(x.id))).slice(0, n - ids.length).forEach(x => ids.push(x.id));
  ids.sort((a, b) => groups.indexOf(EX[a].g === 'corpo' ? 'pernas' : EX[a].g) - groups.indexOf(EX[b].g === 'corpo' ? 'pernas' : EX[b].g));
  const warm = home ? 'Trail_Running_Walking' : shuffle(['Walking_Treadmill', 'Bicycling_Stationary', 'Recumbent_Bike', 'Elliptical_Trainer'])[0];
  const cool = g.focus === 'lower' ? shuffle(['Ankle_On_The_Knee', 'Hamstring_Stretch', 'Kneeling_Hip_Flexor'])[0] : g.focus === 'upper' || g.focus === 'arms' ? shuffle(['Chest_And_Front_Of_Shoulder_Stretch', 'Upper_Back_Stretch', 'Triceps_Stretch'])[0] : shuffle(['Childs_Pose', 'Cat_Stretch', 'Hug_Knees_To_Chest'])[0];
  g.ids = [warm, ...ids, cool];
}
function genSheet() {
  const g = UI.gen, o = (k, opts) => `<div class="opt">${opts.map(([v, l]) => `<button class="${String(g[k]) === String(v) ? 'on' : ''}" data-act="genSet" data-k="${k}" data-v="${v}">${l}</button>`).join('')}</div>`;
  openSheet(`<div class="shead"><div><p class="eyebrow">Treino à medida</p><h2 style="margin:0">Criar treino</h2></div><button class="x" data-act="closeSheet" aria-label="Fechar">${ic('x', 18)}</button></div>
   <label class="f" style="margin-top:0">Onde</label>${o('place', [['gin', 'No ginásio'], ['casa', 'Em casa, sem material']])}
   <label class="f">Foco</label><div class="opt">${Object.entries(FOCUS).map(([v, [l]]) => `<button class="${g.focus === v ? 'on' : ''}" data-act="genSet" data-k="focus" data-v="${v}" style="flex:1 1 45%">${l}</button>`).join('')}</div>
   <label class="f">Tempo</label>${o('min', [[20, '20 min'], [30, '30 min'], [45, '45 min'], [60, '60 min']])}
   <div class="sec"><span>${g.ids.length} exercícios</span><button class="link" data-act="genAgain">${ic('swap', 14)} Outra combinação</button></div>
   <div class="card list flat" style="margin-bottom:14px">${g.ids.map(u => `<div class="row"><img class="th" src="${src(u, 1)}" alt="" loading="lazy"><div class="tx"><b>${esc(EX[u].n)}</b><small>${EX[u].cardio ? EX[u].cardio + ' min' : EX[u].dose} · ${GN[EX[u].g]}</small></div></div>`).join('')}</div>
   <button class="btn w" data-act="genUse">${ic('play', 18)} Usar este treino</button>
   <p class="note">Exercícios até ao nível da tua fase. Fica no plano como “Treino livre”.</p>`);
}
function timerSheet() {
  const tm = UI.tm, total = tm.n * tm.w + (tm.n - 1) * tm.r, st = (k, l, v, u) => `<div><label class="f">${l}</label><div class="stepper"><button data-act="tmSet" data-k="${k}" data-d="-1" aria-label="Menos">${ic('minus', 18)}</button><input value="${v}${u}" readonly style="font-size:18px"><button data-act="tmSet" data-k="${k}" data-d="1" aria-label="Mais">${ic('plus', 18)}</button></div></div>`;
  openSheet(`<div class="shead"><div><p class="eyebrow">Intervalos</p><h2 style="margin:0">Temporizador</h2></div><button class="x" data-act="closeSheet" aria-label="Fechar">${ic('x', 18)}</button></div>
   <div class="chips">${[['Tabata 20/10 × 8', '20,10,8'], ['HIIT 40/20 × 10', '40,20,10'], ['HIIT 30/30 × 8', '30,30,8'], ['1 min × 10', '60,0,10'], ['Prancha 30/30 × 4', '30,30,4']].map(([l, v]) => `<button class="chip" data-act="tmPre" data-v="${v}">${l}</button>`).join('')}</div>
   ${st('w', 'Esforço', tm.w, ' s')}${st('r', 'Pausa', tm.r, ' s')}${st('n', 'Voltas', tm.n, '')}
   <p class="note" style="margin:14px 0">Total: <b>${Math.floor(total / 60)} min ${pad(total % 60)} s</b>. Aviso sonoro e vibração nos últimos 3 segundos e em cada mudança.</p>
   <button class="btn w" data-act="tmStart">${ic('play', 18)} Começar</button>`);
}

/* ---------- arranque ---------- */
buildDays();
renderTabs();
checkBadges(true);
render();
setInterval(() => { if (!sheetOpen && !PL && S.fast.st && (tab === 'hoje' || (tab === 'comer' && UI.comer === 'diario')) && !['INPUT', 'SELECT'].includes((document.activeElement || {}).tagName)) RENDER[tab](); }, 30000);
if (!calc().ok) setTimeout(profileSheet, 350);
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => { });
