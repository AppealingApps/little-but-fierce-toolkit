// ═══════════════════════════════════════════════════════════════════
// Little but Fierce — Encounter Tracker
// ═══════════════════════════════════════════════════════════════════

// ── Status effects ────────────────────────────────────────────────────
const EFFECTS = [
  { id: 'asleep',      label: 'Asleep',      color: '#7a5a9a' },
  { id: 'blind',       label: 'Blind',       color: '#5a5a5a' },
  { id: 'charmed',     label: 'Charmed',     color: '#c06090' },
  { id: 'deaf',        label: 'Deaf',        color: '#8a6a3a' },
  { id: 'fallen-down', label: 'Fallen Down', color: '#6a5a3a' },
  { id: 'scared',      label: 'Scared',      color: '#c07020' },
  { id: 'stopped',     label: 'Stopped',     color: '#8b1a1a' },
  { id: 'poisoned',    label: 'Poisoned',    color: '#3a7a3a' },
  { id: 'on-fire',     label: 'On Fire',     color: '#c04010' },
];

// ── Dice roller constants & state ────────────────────────────────────
const DICE_SIDES = [4, 6, 8, 10, 12, 20];

const rollState = {
  pool: { 4: 0, 6: 0, 8: 0, 10: 0, 12: 0, 20: 0 },
  // current: { label, sections:[{ label, dice:[{die,value,shown}], bonus, totalShown }] }
  current:    null,
  animating:  false
};

function rollDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

function parseDamage(str) {
  if (!str) return null;
  str = str.trim();
  const m = str.match(/^(\d+)d(\d+)([+-]\d+)?$/i);
  if (m) return { count: parseInt(m[1]), die: parseInt(m[2]), bonus: m[3] ? parseInt(m[3]) : 0 };
  const flat = parseInt(str);
  return isNaN(flat) ? null : { count: 0, die: 0, bonus: flat };
}

function parseHitBonus(str) {
  const n = parseInt(str || '0');
  return isNaN(n) ? 0 : n;
}

// sectionDefs: [{ label, dice: [sides,...], bonus }]
function startRoll(sectionDefs, label) {
  if (rollState.animating) return;
  rollState.current = {
    label,
    sections: sectionDefs.map(s => ({
      label:      s.label || null,
      bonus:      s.bonus || 0,
      dice:       (s.dice || []).map(d => ({ die: d, value: rollDie(d), shown: false })),
      totalShown: false
    }))
  };
  rollState.animating = true;

  // Flatten animation steps: reveal each die then show its section total
  const steps = [];
  rollState.current.sections.forEach((sec, si) => {
    sec.dice.forEach((_, di) => steps.push({ si, di, type: 'die' }));
    steps.push({ si, type: 'total' });
  });

  function advance(idx) {
    if (idx >= steps.length) { rollState.animating = false; renderDiceRoller(); return; }
    const step = steps[idx];
    if (step.type === 'die') rollState.current.sections[step.si].dice[step.di].shown = true;
    else                     rollState.current.sections[step.si].totalShown = true;
    renderDiceRoller();
    setTimeout(() => advance(idx + 1), 500);
  }
  renderDiceRoller();
  setTimeout(() => advance(0), 150);
}

function renderDiceRoller() {
  const el = document.getElementById('dice-roller');
  if (!el) return;

  const hasPool = DICE_SIDES.some(d => (rollState.pool[d] || 0) > 0);

  // ── Die tray ──
  const trayHtml = DICE_SIDES.map(d => {
    const qty = rollState.pool[d] || 0;
    return `
      <div class="die-control">
        <button class="die-adj-btn" data-action="die-dec" data-die="${d}" ${qty === 0 ? 'disabled' : ''}>&#8722;</button>
        <div class="die-face d${d}">
          <span class="die-face-label">d${d}</span>
          ${qty > 0 ? `<span class="die-face-qty">${qty}</span>` : ''}
        </div>
        <button class="die-adj-btn" data-action="die-inc" data-die="${d}">&#43;</button>
      </div>`;
  }).join('');

  // ── Roll results ──
  let resultsHtml = '';
  const c = rollState.current;
  if (c) {
    const sectionsHtml = c.sections.map(sec => {
      const shown = sec.dice.filter(d => d.shown);
      if (shown.length === 0 && !sec.totalShown) return '';

      const diceChips = shown.map(d =>
        `<span class="result-die d${d.die}">${d.value}</span>`
      ).join('');

      const rawTotal = sec.dice.reduce((s, d) => s + d.value, 0) + sec.bonus;
      // bonus display: if there are dice, show "+ n" or "− n"; if flat-only, just the number
      const bonusStr = sec.bonus === 0 ? ''
        : shown.length === 0 ? String(sec.bonus)
        : sec.bonus > 0 ? `<span class="roll-bonus">+${sec.bonus}</span>`
        : `<span class="roll-bonus">&#8722;${Math.abs(sec.bonus)}</span>`;

      return `
        <div class="roll-section">
          ${sec.label ? `<span class="roll-section-label">${escHtml(sec.label)}</span>` : ''}
          <div class="roll-dice-row">
            ${diceChips}${bonusStr}
            ${sec.totalShown ? `<span class="roll-equals">=</span><span class="roll-total">${rawTotal}</span>` : ''}
          </div>
        </div>`;
    }).join('');

    resultsHtml = `
      <div class="roll-results-area">
        <div class="roll-results-label">${escHtml(c.label)}</div>
        ${sectionsHtml}
      </div>`;
  }

  el.innerHTML = `
    <div class="dice-roller-inner">
      <div class="dice-roller-top">
        <span class="dice-roller-title">&#127922; Dice Roller</span>
        <div class="dice-roller-btns">
          <button class="btn btn-primary btn-sm" data-action="roll-pool"
            ${!hasPool || rollState.animating ? 'disabled' : ''}>Roll!</button>
          <button class="btn btn-sm dice-clear-btn" data-action="clear-roller">Clear</button>
        </div>
      </div>
      <div class="dice-tray">${trayHtml}</div>
      ${resultsHtml}
    </div>`;
}

function onDiceRollerClick(e) {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;
  const action = btn.dataset.action;

  if (action === 'die-inc') {
    rollState.pool[parseInt(btn.dataset.die)] = (rollState.pool[parseInt(btn.dataset.die)] || 0) + 1;
    renderDiceRoller(); return;
  }
  if (action === 'die-dec') {
    rollState.pool[parseInt(btn.dataset.die)] = Math.max(0, (rollState.pool[parseInt(btn.dataset.die)] || 0) - 1);
    renderDiceRoller(); return;
  }
  if (action === 'roll-pool') {
    if (rollState.animating) return;
    const dice = [];
    DICE_SIDES.forEach(d => { for (let i = 0; i < (rollState.pool[d] || 0); i++) dice.push(d); });
    if (dice.length) startRoll([{ label: null, dice, bonus: 0 }], 'Manual Roll');
    return;
  }
  if (action === 'clear-roller') {
    rollState.current = null;
    rollState.animating = false;
    DICE_SIDES.forEach(d => { rollState.pool[d] = 0; });
    renderDiceRoller(); return;
  }
}

// ── XP table and difficulty multipliers ─────────────────────────────
const DL_TO_XP = {
  0: 2, 1: 3, 2: 5, 3: 8, 4: 13, 5: 22, 6: 30, 7: 40,
  8: 55, 9: 65, 10: 75, 11: 95, 12: 110, 13: 120,
  14: 140, 17: 190, 19: 225, 20: 250
};

const DIFFICULTIES = [
  { label: 'Easy',      mult: 1 },
  { label: 'Normal',    mult: 2 },
  { label: 'Tricky',    mult: 3 },
  { label: 'Scary',     mult: 4 },
  { label: 'Nightmare', mult: 5 },
];

// ── State ─────────────────────────────────────────────────────────────
const defaultState = () => ({
  view: 'builder',
  party: { size: 4, level: 2 },
  roster: [],        // [{ enemyId, count }]
  encounter: null,   // null | { enemies: [{id, enemyId, name, maxHp, currentHp, defeated}] }
  searchQty: {}      // { enemyId: qty }
});

let state = defaultState();

// ── Persistence ────────────────────────────────────────────────────────
function saveState() {
  try {
    localStorage.setItem('lbf_state', JSON.stringify(state));
  } catch (e) { /* storage full — silently ignore */ }
}

function loadState() {
  try {
    const raw = localStorage.getItem('lbf_state');
    if (raw) {
      const saved = JSON.parse(raw);
      // Merge carefully so missing keys fall back to defaults
      state = Object.assign(defaultState(), saved);
    }
  } catch (e) {
    state = defaultState();
  }
}

// ── Enemy lookup helpers ────────────────────────────────────────────────
function enemyById(id) {
  return ENEMIES.find(e => e.id === id);
}

function allDLs() {
  return [...new Set(ENEMIES.map(e => e.dl))].sort((a, b) => a - b);
}

// ── Computed values ────────────────────────────────────────────────────
function totalPartyLevel() {
  return state.party.size * state.party.level;
}

function rosterTotalXP() {
  return state.roster.reduce((sum, row) => {
    const e = enemyById(row.enemyId);
    return sum + (e ? e.xp * row.count : 0);
  }, 0);
}

function rosterTotalDL() {
  return state.roster.reduce((sum, row) => {
    const e = enemyById(row.enemyId);
    return sum + (e ? e.dl * row.count : 0);
  }, 0);
}

function difficultyBudgets() {
  const tpl = totalPartyLevel();
  return DIFFICULTIES.map(d => ({ ...d, xp: tpl * d.mult }));
}

function currentDifficultyLabel() {
  const xp = rosterTotalXP();
  const budgets = difficultyBudgets();
  let label = 'Below Easy';
  for (const d of budgets) {
    if (xp >= d.xp) label = d.label;
  }
  if (xp >= budgets[budgets.length - 1].xp) label = 'Nightmare+';
  return label;
}

function encounterXPEarned() {
  if (!state.encounter) return 0;
  return state.encounter.enemies
    .filter(e => e.defeated)
    .reduce((sum, e) => {
      const enemy = enemyById(e.enemyId);
      return sum + (enemy ? enemy.xp : 0);
    }, 0);
}

function encounterTotalXP() {
  if (!state.encounter) return 0;
  return state.encounter.enemies.reduce((sum, e) => {
    const enemy = enemyById(e.enemyId);
    return sum + (enemy ? enemy.xp : 0);
  }, 0);
}

// ── View switching ─────────────────────────────────────────────────────
function showView(name) {
  state.view = name;
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(`view-${name}`).classList.add('active');
  saveState();
}

// ── Builder Rendering ──────────────────────────────────────────────────
function renderBuilder() {
  renderParty();
  renderDifficultyPanel();
  renderSearchResults();
  renderRoster();
}

function renderParty() {
  const sizeEl  = document.getElementById('party-size');
  const levelEl = document.getElementById('party-level');
  sizeEl.value  = state.party.size;
  levelEl.value = state.party.level;
  document.getElementById('tpl-value').textContent = totalPartyLevel();
}

function renderDifficultyPanel() {
  const xp = rosterTotalXP();
  const budgets = difficultyBudgets();
  const tiersEl = document.getElementById('difficulty-tiers');

  tiersEl.innerHTML = budgets.map(d => {
    const isCurrent = xp >= d.xp && (xp < budgets[budgets.indexOf(d) + 1]?.xp ?? Infinity);
    const isExceeded = xp > d.xp;
    let cls = 'tier-chip';
    if (isCurrent) cls += ' current';
    else if (isExceeded) cls += ' exceeded';
    return `<span class="${cls}">${d.label}: ${d.xp} XP</span>`;
  }).join('');

  // Budget bar — fill as % of Nightmare budget
  const nightmareBudget = budgets[budgets.length - 1].xp;
  const fillPct = nightmareBudget > 0 ? Math.min(100, (xp / nightmareBudget) * 100) : 0;
  document.getElementById('budget-fill').style.width = fillPct + '%';

  const label = xp === 0 ? '0 XP — no enemies yet' : `${xp} XP — ${currentDifficultyLabel()}`;
  document.getElementById('budget-label').textContent = label;
}

function getFilteredEnemies() {
  const query  = (document.getElementById('search-input')?.value || '').toLowerCase().trim();
  const type   = document.getElementById('filter-type')?.value || '';
  const dlVal  = document.getElementById('filter-dl')?.value || '';

  return ENEMIES.filter(e => {
    if (query && !e.name.toLowerCase().includes(query)) return false;
    if (type && e.type !== type) return false;
    if (dlVal && String(e.dl) !== dlVal) return false;
    return true;
  });
}

function renderSearchResults() {
  const container = document.getElementById('search-results');
  if (!container) return;

  const results = getFilteredEnemies();

  if (results.length === 0) {
    container.innerHTML = '<p class="empty-msg">No enemies match your search.</p>';
    return;
  }

  container.innerHTML = results.map(e => {
    const qty = state.searchQty[e.id] || 1;
    return `
      <div class="result-row">
        <span class="result-name">${escHtml(e.name)}</span>
        <div class="result-meta">
          <span class="tag tag-type-${escHtml(e.type)}">${escHtml(e.type)}</span>
          <span class="tag tag-dl">DL ${e.dl}</span>
          <span class="tag tag-xp">${e.xp} XP</span>
          <span class="tag tag-hp">HP: ${e.hp}</span>
        </div>
        <div class="result-add">
          <button class="qty-btn" data-enemy="${e.id}" data-action="dec">&#8722;</button>
          <span class="qty-display" data-enemy-qty="${e.id}">${qty}</span>
          <button class="qty-btn" data-enemy="${e.id}" data-action="inc">&#43;</button>
          <button class="btn-add" data-enemy="${e.id}">Add</button>
        </div>
      </div>
    `;
  }).join('');
}

function renderRoster() {
  const listEl   = document.getElementById('roster-list');
  const totalsEl = document.getElementById('roster-totals');
  const btnStart = document.getElementById('btn-start');

  if (state.roster.length === 0) {
    listEl.innerHTML = '<p class="empty-msg">No enemies added yet.</p>';
    totalsEl.classList.add('hidden');
    btnStart.disabled = true;
    return;
  }

  listEl.innerHTML = state.roster.map((row, i) => {
    const e = enemyById(row.enemyId);
    if (!e) return '';
    const rowXp = e.xp * row.count;
    return `
      <div class="roster-row">
        <span class="roster-count">${row.count}&times;</span>
        <span class="roster-name">${escHtml(e.name)}</span>
        <span class="tag tag-type-${escHtml(e.type)} tag-sm">${escHtml(e.type)}</span>
        <span class="tag tag-dl tag-sm">DL ${e.dl}</span>
        <span class="roster-xp">${rowXp} XP</span>
        <button class="btn-remove" data-roster-idx="${i}">&#10005;</button>
      </div>
    `;
  }).join('');

  const totalXP = rosterTotalXP();
  const totalDL = rosterTotalDL();
  document.getElementById('total-dl').textContent = `Total DL: ${totalDL}`;
  document.getElementById('total-xp').textContent = `Total XP: ${totalXP}`;
  totalsEl.classList.remove('hidden');
  btnStart.disabled = false;
}

// ── Encounter Rendering ────────────────────────────────────────────────
function renderEncounter() {
  if (!state.encounter) return;

  const totalXP  = encounterTotalXP();
  const earnedXP = encounterXPEarned();
  const defeated = state.encounter.enemies.filter(e => e.defeated).length;
  const total    = state.encounter.enemies.length;

  document.getElementById('encounter-xp-summary').textContent =
    `${totalXP} XP total — defeat all enemies to earn it`;

  const container = document.getElementById('encounter-enemies');
  container.innerHTML = state.encounter.enemies.map(inst => renderEnemyCard(inst)).join('');

  const footerEl = document.getElementById('xp-earned-display');
  footerEl.innerHTML =
    `XP Earned: <strong>${earnedXP} XP</strong> &nbsp;(${defeated} / ${total} defeated)`;
}

function renderEnemyCard(inst) {
  const pct = inst.maxHp > 0 ? (inst.currentHp / inst.maxHp) * 100 : 0;
  let fillClass = 'hp-fill';
  if (pct <= 30) fillClass += ' low';
  else if (pct <= 60) fillClass += ' medium';

  const cardClass = inst.defeated ? 'enemy-card defeated' : 'enemy-card';
  const btnClass  = inst.defeated ? 'btn-defeat is-defeated' : 'btn-defeat not-defeated';
  const btnLabel  = inst.defeated ? '&#10003; Defeated' : 'Mark Defeated';
  const disabled  = inst.defeated ? 'disabled' : '';

  // ── Stat block ──
  const enemy = enemyById(inst.enemyId);
  const statsHtml = enemy ? `
    <div class="stat-block">
      <div class="stat-block-core">
        <span class="stat-item"><abbr title="Strength">STR</abbr> ${enemy.str >= 0 ? '+' : ''}${enemy.str}</span>
        <span class="stat-item"><abbr title="Speed">SPD</abbr> ${enemy.spd >= 0 ? '+' : ''}${enemy.spd}</span>
        <span class="stat-item"><abbr title="Smarts">SMT</abbr> ${enemy.smt >= 0 ? '+' : ''}${enemy.smt}</span>
        <span class="stat-item"><abbr title="Smiles">SML</abbr> ${enemy.sml >= 0 ? '+' : ''}${enemy.sml}</span>
        <span class="stat-divider"></span>
        <span class="stat-item">Move <strong>${escHtml(String(enemy.move))}</strong></span>
        <span class="stat-item">Awareness <strong>${enemy.awareness}</strong></span>
        <span class="stat-item">Defence <strong>${enemy.defence}</strong></span>
      </div>
      ${enemy.attacks.length ? `
        <div class="stat-section">
          <span class="stat-label">Attacks</span>
          <ul class="stat-list">
            ${enemy.attacks.map(a => `<li>
                <span class="attack-detail">
                  <strong>${escHtml(a.name)}</strong> &mdash; ${escHtml(a.range)} &mdash; Roll ${escHtml(a.roll)} &mdash; ${escHtml(a.damage)}
                </span>
                <button class="btn-attack-roll" data-action="attack-roll"
                  data-inst="${inst.id}"
                  data-roll="${escHtml(a.roll)}"
                  data-damage="${escHtml(a.damage)}"
                  data-attack-name="${escHtml(a.name)}"
                  ${inst.defeated ? 'disabled' : ''}>&#9876; Roll</button>
              </li>`).join('')}
          </ul>
        </div>` : ''}
      ${enemy.abilities.length ? `
        <div class="stat-section">
          <span class="stat-label">Abilities</span>
          <ul class="stat-list">
            ${enemy.abilities.map(a => `<li>${escHtml(a)}</li>`).join('')}
          </ul>
        </div>` : ''}
    </div>` : '';

  const statsToggleLabel = inst.statsOpen ? '&#9650; Stats' : '&#9660; Stats';

  // ── Effects ──
  const activeEffects = inst.effects || [];
  const effectsHtml = EFFECTS.map(ef => {
    const active = activeEffects.includes(ef.id);
    const style  = active ? `background:${ef.color};color:#fff;border-color:${ef.color};` : '';
    return `<button class="effect-chip${active ? ' active' : ''}" style="${style}"
      data-inst="${inst.id}" data-action="toggle-effect" data-effect="${ef.id}"
      ${inst.defeated ? 'disabled' : ''}>${escHtml(ef.label)}</button>`;
  }).join('');

  return `
    <div class="${cardClass}" id="card-${inst.id}">
      <div class="enemy-card-header">
        <div class="enemy-card-name-row">
          <span class="enemy-card-name">${escHtml(inst.name)}</span>
          <button class="btn-stats-toggle" data-inst="${inst.id}" data-action="toggle-stats">${statsToggleLabel}</button>
        </div>
        <div class="enemy-card-badges">
          <span class="tag tag-type-${escHtml(inst.type)}">${escHtml(inst.type)}</span>
          <span class="tag tag-dl">DL ${inst.dl}</span>
          <span class="tag tag-xp">${inst.xp} XP</span>
          <button class="${btnClass}" data-inst="${inst.id}" data-action="toggle-defeat">
            ${btnLabel}
          </button>
        </div>
      </div>

      ${inst.statsOpen ? statsHtml : ''}

      <div class="hp-bar-wrap">
        <div class="hp-bar">
          <div class="${fillClass}" style="width: ${pct}%"></div>
        </div>
        <div class="hp-text">${inst.currentHp} / ${inst.maxHp} HP</div>
      </div>
      <div class="hp-controls">
        <div class="hp-quick-btns">
          <button class="btn-hp" data-inst="${inst.id}" data-action="dmg" data-amount="10" ${disabled}>&#8722;10</button>
          <button class="btn-hp" data-inst="${inst.id}" data-action="dmg" data-amount="5" ${disabled}>&#8722;5</button>
          <button class="btn-hp" data-inst="${inst.id}" data-action="dmg" data-amount="1" ${disabled}>&#8722;1</button>
          <span class="hp-current-display" title="Current HP">${inst.currentHp}</span>
          <button class="btn-hp btn-heal" data-inst="${inst.id}" data-action="heal" data-amount="1" ${disabled}>&#43;1</button>
          <button class="btn-hp btn-heal" data-inst="${inst.id}" data-action="heal" data-amount="5" ${disabled}>&#43;5</button>
        </div>
        <div class="hp-damage-input">
          <input type="number" min="1" placeholder="Dmg" class="dmg-input" data-inst="${inst.id}" ${disabled}>
          <button class="btn-apply-dmg" data-inst="${inst.id}" data-action="apply-dmg" ${disabled}>Apply</button>
          <button class="btn-apply-heal" data-inst="${inst.id}" data-action="apply-heal" ${disabled}>Heal</button>
        </div>
      </div>

      <div class="effects-row">
        <span class="effects-label">Effects:</span>
        ${effectsHtml}
      </div>

      <div class="notes-row">
        <label class="notes-label" for="notes-${inst.id}">Notes</label>
        <textarea id="notes-${inst.id}" class="notes-input" data-inst="${inst.id}"
          placeholder="Positioning, conditions, reminders..."
          rows="2">${escHtml(inst.notes || '')}</textarea>
      </div>
    </div>
  `;
}

// ── DL filter population ───────────────────────────────────────────────
function populateDLFilter() {
  const sel = document.getElementById('filter-dl');
  allDLs().forEach(dl => {
    const opt = document.createElement('option');
    opt.value = dl;
    opt.textContent = `DL ${dl}`;
    sel.appendChild(opt);
  });
}

// ── Event Handlers ─────────────────────────────────────────────────────
function onPartyChange() {
  const size  = parseInt(document.getElementById('party-size').value, 10);
  const level = parseInt(document.getElementById('party-level').value, 10);
  if (!isNaN(size)  && size  > 0) state.party.size  = size;
  if (!isNaN(level) && level > 0) state.party.level = level;
  saveState();
  renderParty();
  renderDifficultyPanel();
  renderRoster();
}

function onSearchInput() {
  renderSearchResults();
}

function onFilterChange() {
  renderSearchResults();
}

function onSearchResultsClick(e) {
  const btn = e.target.closest('button');
  if (!btn) return;

  const enemyId = btn.dataset.enemy;
  if (!enemyId) return;

  if (btn.dataset.action === 'inc') {
    state.searchQty[enemyId] = Math.max(1, (state.searchQty[enemyId] || 1) + 1);
    saveState();
    const qtyEl = document.querySelector(`[data-enemy-qty="${enemyId}"]`);
    if (qtyEl) qtyEl.textContent = state.searchQty[enemyId];
    return;
  }

  if (btn.dataset.action === 'dec') {
    state.searchQty[enemyId] = Math.max(1, (state.searchQty[enemyId] || 1) - 1);
    saveState();
    const qtyEl = document.querySelector(`[data-enemy-qty="${enemyId}"]`);
    if (qtyEl) qtyEl.textContent = state.searchQty[enemyId];
    return;
  }

  if (btn.classList.contains('btn-add')) {
    const qty = state.searchQty[enemyId] || 1;
    addToRoster(enemyId, qty);
    return;
  }
}

function addToRoster(enemyId, qty) {
  const existing = state.roster.find(r => r.enemyId === enemyId);
  if (existing) {
    existing.count += qty;
  } else {
    state.roster.push({ enemyId, count: qty });
  }
  saveState();
  renderRoster();
  renderDifficultyPanel();
}

function onRosterClick(e) {
  const btn = e.target.closest('.btn-remove');
  if (!btn) return;
  const idx = parseInt(btn.dataset.rosterIdx, 10);
  if (!isNaN(idx)) {
    state.roster.splice(idx, 1);
    saveState();
    renderRoster();
    renderDifficultyPanel();
  }
}

function onStartEncounter() {
  if (state.roster.length === 0) return;

  const enemies = [];
  let instanceNum = {};

  state.roster.forEach(row => {
    const enemy = enemyById(row.enemyId);
    if (!enemy) return;
    instanceNum[row.enemyId] = (instanceNum[row.enemyId] || 0);
    for (let i = 0; i < row.count; i++) {
      instanceNum[row.enemyId]++;
      const label = row.count > 1 ? `${enemy.name} #${instanceNum[row.enemyId]}` : enemy.name;
      enemies.push({
        id: `${row.enemyId}-${instanceNum[row.enemyId]}`,
        enemyId: row.enemyId,
        name: label,
        type: enemy.type,
        dl: enemy.dl,
        xp: enemy.xp,
        maxHp: enemy.hp,
        currentHp: enemy.hp,
        defeated: false,
        statsOpen: false,
        effects: [],
        notes: ''
      });
    }
  });

  state.encounter = { enemies, startedAt: Date.now() };
  saveState();
  showView('encounter');
  renderEncounter();
  renderDiceRoller();
}

function onEndEncounter() {
  if (!confirm('End this encounter and return to the builder?')) return;
  state.encounter = null;
  saveState();
  showView('builder');
  renderBuilder();
}

function onEncounterClick(e) {
  // Toggle stat block
  const statsBtn = e.target.closest('[data-action="toggle-stats"]');
  if (statsBtn) {
    const instId = statsBtn.dataset.inst;
    const inst = state.encounter.enemies.find(en => en.id === instId);
    if (inst) {
      inst.statsOpen = !inst.statsOpen;
      saveState();
      renderEncounter();
    }
    return;
  }

  // Enemy attack roll
  const attackBtn = e.target.closest('[data-action="attack-roll"]');
  if (attackBtn) {
    const hitBonus = parseHitBonus(attackBtn.dataset.roll);
    const dmg      = parseDamage(attackBtn.dataset.damage);
    const sections = [{ label: 'To-Hit (d10)', dice: [10], bonus: hitBonus }];
    if (dmg) {
      if (dmg.die > 0) {
        sections.push({ label: 'Damage', dice: Array(dmg.count).fill(dmg.die), bonus: dmg.bonus });
      } else {
        sections.push({ label: 'Damage', dice: [], bonus: dmg.bonus });
      }
    }
    startRoll(sections, attackBtn.dataset.attackName);
    document.getElementById('dice-roller')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    return;
  }

  // Toggle status effect
  const effectBtn = e.target.closest('[data-action="toggle-effect"]');
  if (effectBtn) {
    const instId   = effectBtn.dataset.inst;
    const effectId = effectBtn.dataset.effect;
    const inst = state.encounter.enemies.find(en => en.id === instId);
    if (inst) {
      if (!inst.effects) inst.effects = [];
      const idx = inst.effects.indexOf(effectId);
      if (idx === -1) inst.effects.push(effectId);
      else inst.effects.splice(idx, 1);
      saveState();
      renderEncounter();
    }
    return;
  }

  // Toggle defeat button
  const toggleBtn = e.target.closest('[data-action="toggle-defeat"]');
  if (toggleBtn) {
    const instId = toggleBtn.dataset.inst;
    const inst = state.encounter.enemies.find(en => en.id === instId);
    if (inst) {
      inst.defeated = !inst.defeated;
      saveState();
      renderEncounter();
    }
    return;
  }

  // Quick damage/heal buttons
  const hpBtn = e.target.closest('[data-action="dmg"], [data-action="heal"]');
  if (hpBtn) {
    const instId = hpBtn.dataset.inst;
    const amount = parseInt(hpBtn.dataset.amount, 10);
    const action = hpBtn.dataset.action;
    applyHpChange(instId, action === 'dmg' ? -amount : amount);
    return;
  }

  // Apply damage/heal from input
  const applyDmgBtn  = e.target.closest('[data-action="apply-dmg"]');
  const applyHealBtn = e.target.closest('[data-action="apply-heal"]');
  if (applyDmgBtn || applyHealBtn) {
    const instId = (applyDmgBtn || applyHealBtn).dataset.inst;
    const input  = document.querySelector(`.dmg-input[data-inst="${instId}"]`);
    if (!input) return;
    const val = parseInt(input.value, 10);
    if (isNaN(val) || val <= 0) return;
    applyHpChange(instId, applyDmgBtn ? -val : val);
    input.value = '';
    return;
  }
}

function applyHpChange(instId, delta) {
  if (!state.encounter) return;
  const inst = state.encounter.enemies.find(e => e.id === instId);
  if (!inst || inst.defeated) return;

  inst.currentHp = Math.max(0, Math.min(inst.maxHp, inst.currentHp + delta));

  if (inst.currentHp === 0) {
    inst.defeated = true;
  }

  saveState();
  renderEncounter();
}

// Notes textarea — save without re-render so focus is preserved
function onEncounterInput(e) {
  const textarea = e.target.closest('.notes-input');
  if (!textarea || !state.encounter) return;
  const instId = textarea.dataset.inst;
  const inst = state.encounter.enemies.find(en => en.id === instId);
  if (inst) {
    inst.notes = textarea.value;
    saveState();
  }
}

// Enter key in damage input applies damage
function onEncounterKeydown(e) {
  if (e.key !== 'Enter') return;
  const input = e.target.closest('.dmg-input');
  if (!input) return;
  const instId = input.dataset.inst;
  const val = parseInt(input.value, 10);
  if (isNaN(val) || val <= 0) return;
  applyHpChange(instId, -val);
  input.value = '';
}

// ── Utility ─────────────────────────────────────────────────────────────
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Init ─────────────────────────────────────────────────────────────────
function init() {
  loadState();
  populateDLFilter();

  // Party inputs
  document.getElementById('party-size').addEventListener('input', onPartyChange);
  document.getElementById('party-level').addEventListener('input', onPartyChange);

  // Search
  document.getElementById('search-input').addEventListener('input', onSearchInput);
  document.getElementById('filter-type').addEventListener('change', onFilterChange);
  document.getElementById('filter-dl').addEventListener('change', onFilterChange);

  // Search results (event delegation)
  document.getElementById('search-results').addEventListener('click', onSearchResultsClick);

  // Roster (event delegation)
  document.getElementById('roster-list').addEventListener('click', onRosterClick);

  // Start / end
  document.getElementById('btn-start').addEventListener('click', onStartEncounter);
  document.getElementById('btn-end').addEventListener('click', onEndEncounter);

  // Encounter controls (event delegation)
  document.getElementById('encounter-enemies').addEventListener('click', onEncounterClick);
  document.getElementById('encounter-enemies').addEventListener('input', onEncounterInput);
  document.getElementById('encounter-enemies').addEventListener('keydown', onEncounterKeydown);

  // Dice roller
  document.getElementById('dice-roller').addEventListener('click', onDiceRollerClick);

  // Restore correct view
  if (state.view === 'encounter' && state.encounter) {
    showView('encounter');
    renderEncounter();
    renderDiceRoller();
  } else {
    state.view = 'builder';
    showView('builder');
    renderBuilder();
  }
}

document.addEventListener('DOMContentLoaded', init);
