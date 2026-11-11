'use strict';
/* =========================================================
   Treino da Beatriz · app
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
};
const ic = (n, s = 20, w = 2) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${P[n]}"/></svg>`;
const ring = (pct, size = 64, sw = 7, col = 'var(--ac)', bg = 'var(--sf2)', inner = '') => {
  const r = (size - sw) / 2, c = 2 * Math.PI * r, p = Math.max(0, Math.min(1, pct || 0));
  return `<div style="position:relative;width:${size}px;height:${size}px"><svg width="${size}" height="${size}" style="transform:rotate(-90deg)"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${bg}" stroke-width="${sw}"/><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - p)}" style="transition:stroke-dashoffset .5s"/></svg><div style="position:absolute;inset:0;display:grid;place-items:center;font-weight:800;font-size:${size / 4.6}px">${inner}</div></div>`;
};
const src = (id, k) => (typeof IMG !== 'undefined' ? 'data:image/jpeg;base64,' + IMG[id][k] : 'img/' + id + '_' + k + '.jpg');

/* ---------- estado ---------- */
const KEY = 'treinoBeatriz.app.v2';
let S = { perfil: {}, checks: {}, cardio: {}, ing: {}, pl: {}, med: [], water: {}, meals: {}, doce: {}, chal: null, ph: 0, day: 0, swaps: {}, extra: {}, log: {}, view: 'anim', start: null, shop: {}, next: null };
try { S = Object.assign(S, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { toast('Não consegui guardar no telemóvel.'); } };
if (!S.start) { S.start = today(); }
if (!PLANS[S.ph]) S.ph = 0;
if (!(S.day >= 0 && S.day < 4)) S.day = 0;
if (S.next && S.next.from < today()) { S.day = S.next.d; S.next = null; }
save();

let tab = 'hoje';
const UI = { treino: 'plano', comer: 'plano', prog: 'resumo', mais: 'menu', kd: (new Date().getDay() + 6) % 7, lg: 'all', lq: '', llv: 9, gm: 'p', gr: 0, cdate: today() };

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
const GN = { pernas: 'Pernas', glut: 'Glúteos & posterior', costas: 'Costas', peito: 'Peito', ombros: 'Ombros', bracos: 'Braços', core: 'Core', cardio: 'Cardio', mob: 'Mobilidade' };
const PH_NAMES = ['Fase 1 · Adaptação', 'Fase 2 · Progressão', 'Fase 3 · Desafio'];
const PH_INFO = ['Semanas 1–4. Aprender as máquinas com cargas leves, 2–3 séries e 60–90 s de descanso.', 'Semanas 5–8. Entram halteres e polias, mais carga, 3 séries.', 'Semanas 9–12. Uma perna de cada vez, mais carga e 45–60 s de descanso.'];
let DAYS = [];
function buildDays() {
  DAYS = PLANS[S.ph].map((d, i) => {
    const sw = (S.swaps[S.ph] || {})[i] || {};
    const ex = ((S.extra[S.ph] || {})[i] || []).filter(id => EX[id]);
    return Object.assign({}, d, { ids: d.ids.map((id, j) => EX[sw[j]] ? sw[j] : id).concat(ex), base: d.ids.length });
  });
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
function logDay(d = S.day) { const tt = dayTotals(d); S.log[today()] = { pct: tt.t ? tt.n / tt.t : 0, k: tt.k, d, ph: S.ph }; }
const workoutPct = date => S.log[date] ? S.log[date].pct : 0;
const kcalDate = date => S.log[date] ? S.log[date].k : 0;

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
const head = (eyebrow, title) => `<header class="ah"><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1></div><button class="avatar" data-act="profile" aria-label="Perfil">${esc(initial())}</button></header>`;
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
function renderHoje() {
  const t = today(), d = new Date(), c = calc();
  const tt = dayTotals(), dd = DAYS[S.day], pl = S.pl[t] === '1';
  const done = workoutPct(t) >= 0.8, started = tt.n > 0;
  const wg = waterGoal(t), wc = S.water[t] || 0;
  const tg = kcalTarget(), ate = +S.ing[t] || 0;
  const kd = (d.getDay() + 6) % 7, meal = KETO[kd], mdone = S.meals[t] || {};
  const doce = S.doce[t] != null ? DOCES[S.doce[t]] : null;
  const lastW = [...S.med].filter(e => e.p).sort((a, b) => a.d < b.d ? -1 : 1);
  const lw = lastW[lastW.length - 1], fw = lastW[0];
  let chalTile;
  if (S.chal) { const st = chalStats(); chalTile = `<small>${esc(S.chal.name)}</small><b>${st.cur}</b><span class="u">dias seguidos</span><span class="s">melhor: ${st.best} · ${st.ok + st.rest}/${S.chal.days}</span>`; }
  else chalTile = `<small>Desafio</small><b style="font-size:17px">Criar desafio</b><span class="s">dias seguidos, ao teu ritmo</span>`;
  let heroBody;
  if (pl) heroBody = `<div class="lbl">Hoje é plantão</div><h2>Descansa e hidrata-te</h2><div class="meta">Sem treino hoje nem amanhã. A meta de água subiu 0,5 L.</div><button class="btn" data-act="go" data-tab="comer" data-sub="agua">${ic('drop', 18)} Registar água</button>`;
  else heroBody = `<div class="lbl">${done ? 'Treino feito' : 'Treino de hoje'} · ${PH_NAMES[S.ph].split(' · ')[0]}</div>
    <h2>Dia ${S.day + 1} · ${dd.t}</h2>
    <div class="meta">${tt.t} exercícios · ~${f0(tt.mAll + tt.t * 3)} min${tt.k ? ' · ' + f0(tt.k) + ' kcal gastas' : ''}</div>
    <div class="ringwrap">${ring(tt.n / tt.t, 70, 7, '#fff', 'rgba(255,255,255,.22)', `<span style="color:#fff">${tt.n}/${tt.t}</span>`)}</div>
    <button class="btn" data-act="go" data-tab="treino">${ic(done ? 'check' : 'play', 18)} ${done ? 'Ver o treino' : started ? 'Continuar treino' : 'Começar treino'}</button>`;
  $('s-hoje').innerHTML = head(WD[d.getDay()] + ', ' + d.getDate() + ' de ' + MO[d.getMonth()], 'Olá' + (S.perfil.nome ? ', ' + esc(S.perfil.nome) : '') + ' ✨') +
    (!c.ok ? `<div class="card" style="border-color:var(--ac)"><h3>Vamos começar</h3><p class="note" style="margin:6px 0 12px">Preenche o teu peso, altura e idade para eu calcular as calorias, a água e o gasto dos treinos.</p><button class="btn w" data-act="profile">${ic('user', 18)} Preencher perfil</button></div>` : '') +
    (deferredInstall && !isStandalone() ? `<div class="card flat" style="display:flex;gap:12px;align-items:center"><div class="ic" style="width:40px;height:40px;border-radius:12px;display:grid;place-items:center;background:var(--lil2);color:var(--lil)">${ic('phone')}</div><div style="flex:1"><b>Instala a app</b><div class="note">Fica no ecrã principal e funciona sem internet.</div></div><button class="btn sm lil" data-act="install">Instalar</button></div>` : '') +
    `<div class="hero">${heroBody}</div>
    <div class="grid2">
      <button class="card kpi" style="text-align:left" data-act="water" data-ml="250"><div style="display:flex;justify-content:space-between;align-items:flex-start"><small>Água</small>${ring(wc / wg, 40, 5, '#4C93E8')}</div><b>${fL(wc)}</b><span class="u">/ ${fL(wg)} L</span><span class="s">toca para +250 ml</span></button>
      <button class="card kpi" style="text-align:left" data-act="go" data-tab="prog" data-sub="balanco"><small>Calorias de hoje</small><b>${ate ? f0(ate) : '—'}</b><span class="u">${ate ? 'kcal comidas' : ''}</span><span class="s">${tg ? 'meta: ' + f0(tg) + ' kcal' : 'preenche o perfil'}</span></button>
      <button class="card kpi" style="text-align:left" data-act="go" data-tab="mais" data-sub="desafio">${chalTile}</button>
      <button class="card kpi" style="text-align:left" data-act="go" data-tab="prog" data-sub="medidas"><small>Peso</small><b>${lw ? f1(lw.p) : (c.w ? f1(c.w) : '—')}</b><span class="u">kg</span><span class="s">${lw && fw && lw !== fw ? (lw.p - fw.p > 0 ? '+' : '') + f1(lw.p - fw.p) + ' kg desde ' + dm(fw.d) : 'regista as medidas'}</span></button>
    </div>
    <div class="sec">Refeições de hoje <button class="link" data-act="go" data-tab="comer">Ver plano</button></div>
    <div class="card list">
      ${meal.m.map((m, i) => `<div class="row ${mdone[i] ? 'done' : ''}"><div class="ic">${ic('food', 18)}</div><div class="tx"><b>${esc(m.t)}</b><small>${m.h} · ${f0(tot(m.it).k)} kcal</small></div><button class="ck ${mdone[i] ? 'on' : ''}" data-act="meal" data-i="${i}" aria-label="Feita">${ic('check', 18, 3)}</button></div>`).join('')}
      <button class="row" data-act="go" data-tab="comer" data-sub="doces"><div class="ic" style="background:var(--amb2);color:var(--amb)">${ic('cake', 18)}</div><div class="tx"><b>${doce ? esc(doce.n) : 'Um doce keto?'}</b><small>${doce ? f0(tot(doce.it).k) + ' kcal · registado hoje' : '6 receitas para o teu sweet tooth'}</small></div><span class="chev">${ic('chev', 18)}</span></button>
    </div>
    <div class="card" style="display:flex;align-items:center;gap:12px"><div class="ic" style="width:38px;height:38px;border-radius:12px;display:grid;place-items:center;background:var(--lil2);color:var(--lil)">${ic('moon', 18)}</div><div style="flex:1"><b>Hoje estou de plantão</b><div class="note">Pausa o treino, +0,5 L de água e conta como descanso no desafio.</div></div><label class="sw"><input type="checkbox" data-act="plantao" ${pl ? 'checked' : ''}><span></span></label></div>
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
    body = `<div class="seg">${PH_NAMES.map((n, i) => `<button class="${i === S.ph ? 'on' : ''}" data-act="phase" data-i="${i}">${n.split(' · ')[0]}</button>`).join('')}</div>
     <p class="note" style="margin:-4px 2px 14px">${PH_INFO[S.ph]}${sug !== S.ph ? ` <b style="color:var(--acd)">Sugestão para a semana ${weekNo()}: ${PH_NAMES[sug].split(' · ')[0]}.</b>` : ''}</p>
     <div class="days">${DAYS.map((x, i) => { const t2 = dayTotals(i); return `<button class="day ${i === S.day ? 'on' : ''}" data-act="day" data-i="${i}"><b>Dia ${i + 1}</b><small>${x.t.split(/[ ,]/)[0]}</small><i><span style="width:${t2.n / t2.t * 100}%"></span></i></button>`; }).join('')}</div>
     <div class="card"><div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start"><div><h2 style="margin:0">${d.e} ${d.t}</h2><p class="note" style="margin:4px 0 0">${d.foco}</p></div>${ring(tt.n / tt.t, 54, 6, 'var(--mint)', 'var(--sf2)', `${tt.n}/${tt.t}`)}</div>
      <div class="tags" style="margin-top:12px"><span class="tag">${ic('dumb', 12)} ${tt.t} exercícios</span><span class="tag">~${f0(tt.mAll + tt.t * 3)} min</span><span class="tag ac">${ic('flame', 12)} ${f0(tt.k)} kcal gastas</span></div></div>
     <div class="card list">${d.ids.map((id, i) => {
      const x = EX[id], on = isChecked(id + '_' + i), key = id + '_' + S.ph + '_' + S.day, r = kcalEx(x, key);
      return `<div class="row ${on ? 'done' : ''}"><button style="all:unset;display:flex;gap:12px;align-items:center;flex:1;min-width:0;cursor:pointer" data-act="ex" data-i="${i}"><img class="th" src="${src(id, 1)}" alt="" loading="lazy"><div class="tx"><b>${i + 1}. ${esc(x.n)}</b><small>${x.cardio ? f0(r.min) + ' min' : x.dose} · ${GN[x.g]}${i >= d.base ? ' · extra' : ''}</small></div></button><button class="ck ${on ? 'on' : ''}" data-act="tick" data-i="${i}" aria-label="Feito">${ic('check', 18, 3)}</button></div>`;
    }).join('')}</div>
     <div class="btns"><button class="btn ghost sm" data-act="clearDay">Limpar checks de hoje</button><button class="btn ghost sm" data-act="seg" data-k="treino" data-v="lib">${ic('plus', 16)} Juntar exercício</button></div>
     <p class="note" style="margin:12px 2px">Descansa 60–90 s entre séries. Muito cansada? Faz 2 séries em vez de 3. Toca num exercício para ver o movimento, os passos e trocar de máquina.</p>`;
  } else {
    const all = Object.values(EX), q = UI.lq.toLowerCase();
    const xs = all.filter(x => (UI.lg === 'all' || x.g === UI.lg) && x.lv <= UI.llv && (x.n + ' ' + x.en + ' ' + x.eq + ' ' + GN[x.g]).toLowerCase().includes(q));
    body = `<input class="in" id="libq" placeholder="Procurar (ex.: prensa, polia, glúteos)" value="${esc(UI.lq)}" style="margin-bottom:10px">
     <div class="chips">${[['all', 'Todos']].concat(Object.entries(GN)).map(([k, n]) => `<button class="chip ${k === UI.lg ? 'on' : ''}" data-act="lg" data-g="${k}">${n}</button>`).join('')}</div>
     <div class="seg" style="margin-top:2px">${[[9, 'Todos os níveis'], [1, 'Nível 1'], [2, 'Até nível 2']].map(([v, l]) => `<button class="${UI.llv === v ? 'on' : ''}" data-act="llv" data-v="${v}">${l}</button>`).join('')}</div>
     <p class="note" style="margin:0 2px 10px">${xs.length} de ${all.length} exercícios. Todos são gentis para a coluna.</p>
     <div class="card list">${xs.length ? xs.map(x => `<button class="row" data-act="libex" data-id="${x.id}"><img class="th" src="${src(x.id, 1)}" alt="" loading="lazy"><div class="tx"><b>${esc(x.n)}</b><small>${esc(x.eq)} · ${GN[x.g]} · nível ${x.lv}</small></div><span class="chev">${ic('chev', 18)}</span></button>`).join('') : '<div style="padding:20px;text-align:center" class="note">Nada com estes filtros. Experimenta “Todos”.</div>'}</div>
     <p class="note" style="text-align:center">Fotos: Free Exercise DB (domínio público).</p>`;
  }
  el.innerHTML = head(PH_NAMES[S.ph].split(' · ')[0] + ' · semana ' + weekNo(), 'Treino') + seg('treino', [['plano', 'O meu plano'], ['lib', 'Biblioteca']]) + body;
  const lq = $('libq'); if (lq) lq.oninput = () => { UI.lq = lq.value; if (UI.lq) UI.lg = 'all'; const pos = lq.selectionStart; renderTreino(); const n = $('libq'); n.focus(); n.setSelectionRange(pos, pos); };
}
function exSheet(i) {
  const d = DAYS[S.day], id = d.ids[i], x = EX[id], key = id + '_' + S.ph + '_' + S.day, r = kcalEx(x, key), on = isChecked(id + '_' + i), extra = i >= d.base;
  openSheet(`<div class="shead"><div><p class="eyebrow">Dia ${S.day + 1} · exercício ${i + 1} de ${d.ids.length}</p><h2 style="margin:0">${esc(x.n)}</h2><p class="note" style="margin:2px 0 0">${esc(x.eq)}</p></div><button class="x" data-act="closeSheet" aria-label="Fechar">${ic('x', 18)}</button></div>
   <div class="stack">
    <div class="seg" style="margin:0"><button class="${S.view !== 'pair' ? 'on' : ''}" data-act="view" data-v="anim" data-i="${i}">Movimento</button><button class="${S.view === 'pair' ? 'on' : ''}" data-act="view" data-v="pair" data-i="${i}">Início e fim</button></div>
    ${exMedia(id)}
    <div class="tags"><span class="tag ac">${x.cardio ? f0(r.min) + ' min' : x.dose}</span><span class="tag">${GN[x.g]}</span><span class="tag lil">nível ${x.lv}</span><span class="tag amb">${ic('flame', 12)} ~${f0(r.kcal)} kcal</span></div>
    ${x.cardio ? `<div style="display:flex;align-items:center;gap:10px"><span class="note" style="flex:1">Minutos de cardio</span><button class="x" data-act="cmin" data-i="${i}" data-d="-1">${ic('minus', 16)}</button><b style="min-width:30px;text-align:center">${f0(r.min)}</b><button class="x" data-act="cmin" data-i="${i}" data-d="1">${ic('plus', 16)}</button></div>` : ''}
    <ol class="steps">${x.st.map(s => `<li>${esc(s)}</li>`).join('')}</ol>
    <div class="call">${ic('spine', 18)}<div><b>Coluna.</b> ${esc(x.sp)}</div></div>
    <button class="btn w ${on ? 'ghost' : 'mint'}" data-act="tick" data-i="${i}" data-close="1">${ic('check', 18, 3)} ${on ? 'Desmarcar' : 'Marcar como feito'}</button>
    <div class="btns">${extra ? `<button class="btn soft" data-act="rmExtra" data-i="${i}">${ic('trash', 16)} Tirar do dia</button>` : `<button class="btn soft" data-act="swapList" data-i="${i}">${ic('swap', 16)} Trocar exercício</button>`}</div>
   </div>`);
}
function swapSheet(i) {
  const d = DAYS[S.day], cur = d.ids[i], orig = PLANS[S.ph][S.day].ids[i], g = EX[cur].g;
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
    <div class="tags"><span class="tag ac">${x.dose}</span><span class="tag">${GN[x.g]}</span></div>
    <ol class="steps">${x.st.map(s => `<li>${esc(s)}</li>`).join('')}</ol>
    <div class="call">${ic('spine', 18)}<div><b>Coluna.</b> ${esc(x.sp)}</div></div>
    <div><p class="note" style="margin:0 0 8px">Juntar a um dia da ${PH_NAMES[S.ph].split(' · ')[0]}:</p><div class="days" style="margin:0">${DAYS.map((d, i) => `<button class="day" data-act="addEx" data-id="${id}" data-i="${i}"><b>Dia ${i + 1}</b><small>${d.t.split(/[ ,]/)[0]}</small></button>`).join('')}</div></div>
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
  } else {
    const wg = waterGoal(t), wc = S.water[t] || 0, gl = Math.ceil(wg / 250), full = Math.floor(wc / 250);
    body = `<div class="card" style="text-align:center">${'<div style="display:flex;justify-content:center">' + ring(wc / wg, 170, 14, '#4C93E8', 'var(--sf2)', `<div><div class="big">${fL(wc)}</div><div class="note">de ${fL(wg)} L</div></div>`) + '</div>'}
      <div class="drops">${Array.from({ length: gl }, (_, i) => `<span class="${i < full ? 'f' : ''}"></span>`).join('')}</div>
      <div class="btns"><button class="btn" data-act="water" data-ml="250">+250 ml</button><button class="btn" data-act="water" data-ml="500">+500 ml</button><button class="btn ghost" data-act="water" data-ml="-250">−250</button></div>
      ${wc >= wg ? '<p style="font-weight:800;color:var(--mint);margin:12px 0 0">Meta batida! 🎉</p>' : ''}</div>
     <div class="card flat"><b>Como calculo a tua meta</b><p class="note" style="margin:6px 0 0">${fL(waterBase())} L de base (35 ml por kg de peso ajustado) + 0,5 L em dia de treino + 0,5 L em dia de plantão. No keto perdes mais água e sal, por isso bebe ao longo do dia.</p></div>
     <div class="card list">${[['1 copo ao acordar', 'antes do café'], ['1 copo antes de cada refeição', 'ajuda a saciar'], ['500 ml durante o treino', 'leva a garrafa'], ['O resto ao longo do dia', 'garrafa sempre à vista']].map(([a, b]) => `<div class="row"><div class="ic" style="background:#E6F0FD;color:#2F78D6">${ic('drop', 18)}</div><div class="tx"><b>${a}</b><small>${b}</small></div></div>`).join('')}</div>`;
  }
  el.innerHTML = head('Keto · 2 refeições por dia', 'Comer') + seg('comer', [['plano', 'Plano'], ['doces', 'Doces'], ['compras', 'Compras'], ['agua', 'Água']]) + body;
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
  { k: 'i', n: 'Calorias comidas por dia', t: 'bar', u: 'kcal', c: '#C77E12', ref: () => kcalTarget(), get: d => +S.ing[d] || 0 },
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
    if (!c.ok) body = `<div class="card"><h3>Falta o teu perfil</h3><p class="note">Preenche peso, altura e idade para calcular IMC, metabolismo e calorias.</p><button class="btn w" data-act="profile">Preencher perfil</button></div>`;
    else {
      const [inf, col] = imcInfo(c.imc), hm = c.h / 100, pmin = 18.5 * hm * hm, pmax = 24.9 * hm * hm, prot = 1.6 * 24.9 * hm * hm;
      body = `<div class="grid2">
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
  } else {
    const tt = dayTotals(), pl = S.pl[t] === '1', base = c.base * (pl ? 1.1 : 1), tk = kcalDate(t), gasto = base + tk, meta = Math.max(gasto - 500, 1400), ate = +S.ing[t] || 0, bal = ate - gasto;
    let msg = 'Escreve o que já comeste para ver o balanço.', cl = 'lil';
    if (ate) { if (bal <= -300 && ate >= 1400) { msg = 'Défice na zona certa para emagrecer com saúde.'; cl = ''; } else if (bal < -300) { msg = 'Estás a comer pouco. Não desças de ~1400 kcal: junta proteína.'; cl = 'amb'; } else if (bal <= 100) msg = 'Estás em manutenção. Para emagrecer, reduz 300–500 kcal.'; else { msg = 'Superávite hoje. Sem drama: ajusta a próxima refeição.'; cl = 'amb'; } }
    body = !c.ok ? `<div class="card"><h3>Falta o teu perfil</h3><button class="btn w" data-act="profile">Preencher perfil</button></div>` : `<div class="card"><label class="f" style="margin-top:0">Calorias que já comeste hoje</label><input class="in" type="number" inputmode="numeric" id="ingerido" value="${S.ing[t] || ''}" placeholder="ex.: 1450">
      <p class="note" style="margin:8px 0 0">Plano keto do dia: ~${f0(tot(dayIts((new Date().getDay() + 6) % 7)).k)} kcal${S.doce[t] != null ? ' + doce ' + f0(tot(DOCES[S.doce[t]].it).k) + ' kcal' : ''}. <button class="link" data-act="fillPlan">Usar este valor</button></p></div>
     <div class="grid2"><div class="card kpi"><small>Gasto base</small><b>${f0(base)}</b><span class="u">kcal</span><span class="s">TMB × 1,2${pl ? ' + plantão' : ''}</span></div>
      <div class="card kpi"><small>Treino de hoje</small><b>${f0(tk)}</b><span class="u">kcal</span><span class="s">dos exercícios marcados</span></div>
      <div class="card kpi"><small>Gasto total</small><b>${f0(gasto)}</b><span class="u">kcal</span></div>
      <div class="card kpi"><small>Meta para comer</small><b>${f0(meta)}</b><span class="u">kcal</span></div></div>
     <div class="card" style="text-align:center;margin-top:12px"><small class="note">Balanço de hoje</small><div class="big" style="margin:6px 0;color:${bal > 0 ? 'var(--amb)' : 'var(--ink)'}">${ate ? (bal > 0 ? '+' : '') + f0(bal) : '—'} <span style="font-size:15px">kcal</span></div><div class="call ${cl}" style="text-align:left">${ic('info', 18)}<div>${msg}</div></div></div>
     <p class="note" style="margin:4px 2px">500 kcal/dia de défice ≈ 0,45 kg de gordura por semana. O gasto do treino usa METs × o teu peso × tempo (±20 %).</p>`;
  }
  el.innerHTML = head('O teu caminho', 'Progresso') + seg('prog', [['resumo', 'Resumo'], ['medidas', 'Medidas'], ['graf', 'Gráficos'], ['balanco', 'Balanço']]) + body;
  const gm = $('gmet'); if (gm) gm.onchange = () => { UI.gm = gm.value; renderProg(); };
  const ing = $('ingerido'); if (ing) ing.onchange = () => { S.ing[t] = ing.value; save(); renderProg(); };
}

/* =========================================================
   ECRÃ: MAIS (menu, desafio, regras, backup, sobre)
   ========================================================= */
function renderMais() {
  const el = $('s-mais');
  const back = `<button class="back" data-act="seg" data-k="mais" data-v="menu">${ic('left', 18)} Mais</button>`;
  if (UI.mais === 'menu') {
    const items = [['desafio', 'target', 'Desafio de dias', S.chal ? esc(S.chal.name) : 'cria o teu, ao estilo 75 Hard'], ['perfil', 'user', 'Perfil e dados', 'peso, altura, idade, atividade'], ['regras', 'book', 'Regras de ouro do treino', 'para principiantes e para a lombar'], ['instalar', 'phone', 'Instalar a app', isStandalone() ? 'já está instalada ✓' : 'ícone no ecrã e funciona offline'], ['backup', 'down', 'Cópia de segurança', 'exportar ou importar os teus dados'], ['sobre', 'info', 'Sobre', 'fotos, fontes e avisos']];
    el.innerHTML = head('Definições e extras', 'Mais') + `<div class="card list">${items.map(([k, i, a, b]) => `<button class="row" data-act="${k === 'perfil' ? 'profile' : k === 'instalar' ? 'installInfo' : 'seg'}" data-k="mais" data-v="${k}"><div class="ic">${ic(i, 18)}</div><div class="tx"><b>${a}</b><small>${b}</small></div><span class="chev">${ic('chev', 18)}</span></button>`).join('')}</div>`;
  } else if (UI.mais === 'regras') {
    const R = [['Aquece', '5–8 min de passadeira ou bicicleta antes de tudo.'], ['Carga certa', 'as últimas 2 repetições custam, mas a técnica fica perfeita. Sobe a carga quando 3 × 12 ficar fácil.'], ['Ritmo', '1–2 s a empurrar ou puxar, 3 s a voltar. Expira no esforço.'], ['Descanso', '60–90 s entre séries.'], ['Regula a máquina', 'o eixo da máquina alinhado com a tua articulação. Pede ajuda a um instrutor na primeira vez.'], ['Coluna', 'costas sempre apoiadas, sem arredondar nem arquear. Se a lombalgia agudizar, para e troca de exercício.'], ['Plantão', 'não treines no dia do plantão nem no dia seguinte. Retoma no próximo dia do plano.']];
    el.innerHTML = back + head('Para principiantes', 'Regras de ouro') + `<div class="card"><ol class="steps">${R.map(([a, b]) => `<li><div><b>${a}.</b> ${b}</div></li>`).join('')}</ol></div>`;
  } else if (UI.mais === 'backup') {
    el.innerHTML = back + head('Os teus dados', 'Cópia de segurança') + `<div class="card"><p class="note" style="margin-top:0">Tudo fica guardado só neste telemóvel. Faz uma cópia de vez em quando, para não perderes nada se trocares de telemóvel ou limpares o browser.</p><div class="btns"><button class="btn" data-act="export">${ic('down', 18)} Exportar</button><button class="btn ghost" data-act="import">${ic('up', 18)} Importar</button></div></div>
     <div class="card flat"><b>Apagar tudo</b><p class="note">Recomeça a app do zero neste telemóvel.</p><button class="btn soft sm" data-act="wipe">${ic('trash', 16)} Apagar os meus dados</button></div>`;
  } else if (UI.mais === 'sobre') {
    el.innerHTML = back + head('Treino da Beatriz', 'Sobre') + `<div class="card"><p style="margin-top:0">App pessoal de treino, alimentação keto, água e progresso, feita à medida: amiga da coluna e a funcionar sem internet.</p><p class="note">Fotos dos exercícios: <b>Free Exercise DB</b> (domínio público). Fonte: Plus Jakarta Sans (SIL OFL). Gasto calórico estimado com METs do Compêndio de Atividades Físicas; metabolismo pela fórmula de Mifflin-St Jeor.</p><p class="note" style="margin-bottom:0">É uma ferramenta de apoio e não substitui a avaliação de um médico, nutricionista ou fisioterapeuta.</p></div>`;
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
let sheetOpen = false;
function openSheet(html) {
  const sh = $('sheet'); sh.innerHTML = '<div class="grab"></div>' + html; sh.scrollTop = 0;
  if (!sheetOpen) { sheetOpen = true; history.pushState({ sheet: 1 }, ''); }
  requestAnimationFrame(() => { sh.classList.add('on'); $('scrim').classList.add('on'); });
}
function closeSheet(fromPop) {
  if (!sheetOpen) return; sheetOpen = false;
  $('sheet').classList.remove('on'); $('scrim').classList.remove('on');
  if (!fromPop && history.state && history.state.sheet) history.back();
}
window.addEventListener('popstate', () => { if (sheetOpen) closeSheet(true); });
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
function render() { RENDER[tab](); }
function goTab(t, sub) {
  tab = t; if (sub) UI[t] = sub;
  document.querySelectorAll('.screen').forEach(s => s.classList.toggle('on', s.id === 's-' + t));
  renderTabs(); render(); window.scrollTo(0, 0);
}
function tick(i) {
  const d = DAYS[S.day], id = d.ids[i], k = dayKey(), kk = id + '_' + i;
  S.checks[k] = S.checks[k] || {}; S.checks[k][kk] = !S.checks[k][kk];
  logDay(); const tt = dayTotals();
  if (S.checks[k][kk] && tt.n === tt.t) { S.next = { d: (S.day + 1) % 4, from: today() }; toast('Treino concluído! Arrasaste 🎉'); }
  else if (S.checks[k][kk]) toast(`Feito · ${tt.n}/${tt.t}`);
  save();
}
const ACT = {
  tab: e => goTab(e.dataset.tab),
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
  pick: e => { const i = +e.dataset.i, p = S.ph, d = S.day; S.swaps[p] = S.swaps[p] || {}; S.swaps[p][d] = S.swaps[p][d] || {}; if (e.dataset.id) S.swaps[p][d][i] = e.dataset.id; else delete S.swaps[p][d][i]; buildDays(); save(); render(); exSheet(i); toast('Exercício trocado'); },
  rmExtra: e => { const i = +e.dataset.i - DAYS[S.day].base; S.extra[S.ph][S.day].splice(i, 1); buildDays(); save(); closeSheet(); render(); },
  clearDay: () => { if (confirm('Limpar os checks deste dia?')) { delete S.checks[dayKey()]; logDay(); save(); render(); } },
  lg: e => { UI.lg = e.dataset.g; render(); },
  llv: e => { UI.llv = +e.dataset.v; render(); },
  libex: e => libSheet(e.dataset.id),
  addEx: e => { const p = S.ph, d = +e.dataset.i; S.extra[p] = S.extra[p] || {}; S.extra[p][d] = S.extra[p][d] || []; if (DAYS[d].ids.includes(e.dataset.id)) { toast('Já está nesse dia'); return; } S.extra[p][d].push(e.dataset.id); buildDays(); save(); toast('Juntado ao Dia ' + (d + 1)); render(); },
  water: e => { const t = today(); S.water[t] = Math.max(0, (S.water[t] || 0) + (+e.dataset.ml)); save(); render(); if (+e.dataset.ml > 0) toast(`+${e.dataset.ml} ml · ${fL(S.water[t])} L hoje`); },
  meal: e => { const t = today(); S.meals[t] = S.meals[t] || {}; S.meals[t][e.dataset.i] = !S.meals[t][e.dataset.i]; save(); render(); },
  plantao: e => { const t = today(); S.pl[t] = e.checked ? '1' : '0'; if (S.chal) { if (e.checked) S.chal.rest[t] = true; else delete S.chal.rest[t]; } save(); render(); },
  kd: e => { UI.kd = +e.dataset.i; render(); },
  doce: e => { const t = today(), i = +e.dataset.i; if (S.doce[t] === i) delete S.doce[t]; else S.doce[t] = i; save(); render(); },
  shop: e => { S.shop[e.dataset.k] = !S.shop[e.dataset.k]; save(); render(); },
  shopClear: () => { S.shop = {}; save(); render(); },
  gr: e => { UI.gr = +e.dataset.v; render(); },
  fillPlan: () => { const t = today(); S.ing[t] = Math.round(tot(dayIts((new Date().getDay() + 6) % 7)).k + (S.doce[t] != null ? tot(DOCES[S.doce[t]].it).k : 0)); save(); render(); },
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
  installInfo: () => installInfo(),
  install: async () => { if (!deferredInstall) { installInfo(); return; } deferredInstall.prompt(); const r = await deferredInstall.userChoice; deferredInstall = null; closeSheet(); if (r.outcome === 'accepted') toast('A instalar…'); render(); },
  export: () => { const b = new Blob([JSON.stringify({ app: 'treino-beatriz', v: 2, date: today(), data: S }, null, 1)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'treino-beatriz-' + today() + '.json'; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500); toast('Cópia exportada'); },
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
  r.onload = () => { try { const j = JSON.parse(r.result); if (!j || !j.data || j.app !== 'treino-beatriz') throw 0; if (!confirm('Substituir os dados deste telemóvel pela cópia de ' + (j.date ? dfull(j.date) : '?') + '?')) return; localStorage.setItem(KEY, JSON.stringify(j.data)); location.reload(); } catch (err) { toast('Este ficheiro não é uma cópia da app.'); } };
  r.readAsText(f); e.target.value = '';
});

/* ---------- arranque ---------- */
buildDays();
renderTabs();
render();
if (!calc().ok) setTimeout(profileSheet, 350);
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => { });
