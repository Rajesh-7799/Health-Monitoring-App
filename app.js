// ===== DATETIME =====
function updateDateTime() {
  const now = new Date();
  const opts = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  document.getElementById('datetime').textContent = now.toLocaleString('en-US', opts);
}
updateDateTime();
setInterval(updateDateTime, 10000);

// ===== HEART RATE LIVE CHART =====
const canvas = document.getElementById('heart-chart');
const ctx = canvas.getContext('2d');
let hrData = Array.from({ length: 40 }, () => 70 + Math.random() * 10);

function drawHeartChart() {
  canvas.width = canvas.offsetWidth || 200;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const w = canvas.width, h = canvas.height;
  const step = w / (hrData.length - 1);
  const min = Math.min(...hrData), max = Math.max(...hrData);
  const range = max - min || 1;

  // Gradient fill
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, 'rgba(0,229,160,0.3)');
  grad.addColorStop(1, 'rgba(0,229,160,0)');

  ctx.beginPath();
  hrData.forEach((v, i) => {
    const x = i * step;
    const y = h - ((v - min) / range) * (h - 8) - 4;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.strokeStyle = '#00e5a0';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Fill under
  ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath();
  ctx.fillStyle = grad; ctx.fill();
}

function updateHeartRate() {
  const last = hrData[hrData.length - 1];
  const newVal = Math.max(55, Math.min(100, last + (Math.random() - 0.5) * 4));
  hrData.push(newVal);
  hrData.shift();
  document.getElementById('heart-rate').textContent = Math.round(newVal);
  drawHeartChart();
}

drawHeartChart();
setInterval(updateHeartRate, 1200);
window.addEventListener('resize', drawHeartChart);

// ===== SPO2 LIVE =====
function updateSpo2() {
  const val = 96 + Math.random() * 3;
  const rounded = Math.round(val * 10) / 10;
  document.getElementById('spo2-val').textContent = rounded.toFixed(1);
  const circumference = 201;
  const offset = circumference - (val / 100) * circumference;
  document.getElementById('spo2-ring').style.strokeDashoffset = offset;
  const card = document.getElementById('spo2-card');
  const statusEl = card.querySelector('.stat-status');
  if (val >= 97) { statusEl.textContent = 'Excellent'; statusEl.className = 'stat-status good'; }
  else if (val >= 94) { statusEl.textContent = 'Normal'; statusEl.className = 'stat-status good'; }
  else { statusEl.textContent = 'Low'; statusEl.className = 'stat-status warn'; }
}
updateSpo2();
setInterval(updateSpo2, 3000);

// ===== TEMPERATURE LIVE =====
function updateTemp() {
  const val = 36.2 + Math.random() * 1.2;
  document.getElementById('temp-val').textContent = val.toFixed(1);
  const pct = ((val - 35) / 5) * 100;
  document.getElementById('thermo-fill').style.height = `${Math.min(100, pct)}%`;
  const statusEl = document.getElementById('temp-card').querySelector('.stat-status');
  if (val < 37.5) { statusEl.textContent = 'Normal'; statusEl.className = 'stat-status good'; }
  else if (val < 38.5) { statusEl.textContent = 'Elevated'; statusEl.className = 'stat-status warn'; }
  else { statusEl.textContent = 'Fever'; statusEl.className = 'stat-status danger'; }
}
updateTemp();
setInterval(updateTemp, 4000);

// ===== STEPS LIVE =====
let currentSteps = 8420;
function updateSteps() {
  currentSteps += Math.floor(Math.random() * 5);
  document.getElementById('steps').textContent = currentSteps.toLocaleString();
}
setInterval(updateSteps, 5000);

// ===== LOG VITALS =====
const entries = JSON.parse(localStorage.getItem('vitaltrack_entries') || '[]');
renderHistory();

function logEntry() {
  const hr = document.getElementById('input-hr').value;
  const bp = document.getElementById('input-bp').value;
  const weight = document.getElementById('input-weight').value;
  const notes = document.getElementById('input-notes').value;

  if (!hr && !bp && !weight) {
    showMsg('Please fill at least one field.', 'error');
    return;
  }

  const now = new Date();
  const entry = {
    date: now.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    hr: hr || '–',
    bp: bp || '–',
    weight: weight || '–',
    notes: notes || ''
  };

  entries.unshift(entry);
  if (entries.length > 20) entries.pop();
  localStorage.setItem('vitaltrack_entries', JSON.stringify(entries));

  // Update live display if hr provided
  if (hr) {
    document.getElementById('heart-rate').textContent = hr;
    hrData.push(parseFloat(hr));
    hrData.shift();
    drawHeartChart();
  }
  if (bp) document.getElementById('bp-val').textContent = bp;

  renderHistory();
  clearForm();
  showMsg('Entry saved successfully ✓');
}

function renderHistory() {
  const list = document.getElementById('history-list');
  if (entries.length === 0) return;
  list.innerHTML = entries.slice(0, 5).map(e => `
    <div class="history-item">
      <span class="h-date">${e.date}</span>
      <span class="h-hr">❤️ ${e.hr} bpm</span>
      <span class="h-bp">🩺 ${e.bp}</span>
      ${e.weight !== '–' ? `<span class="h-note">⚖️ ${e.weight} kg</span>` : ''}
      ${e.notes ? `<span class="h-note">"${e.notes}"</span>` : ''}
    </div>
  `).join('');
}

function clearForm() {
  ['input-hr','input-bp','input-weight','input-notes'].forEach(id => {
    document.getElementById(id).value = '';
  });
}

function showMsg(msg, type = 'success') {
  const el = document.getElementById('log-msg');
  el.textContent = msg;
  el.style.color = type === 'error' ? 'var(--danger)' : 'var(--good)';
  setTimeout(() => el.textContent = '', 3000);
}

// ===== BLOOD PRESSURE LIVE =====
function updateBP() {
  const sys = 115 + Math.floor(Math.random() * 15);
  const dia = 72 + Math.floor(Math.random() * 12);
  document.getElementById('bp-val').textContent = `${sys}/${dia}`;
  const pct = ((sys - 90) / 70) * 100;
  document.getElementById('bp-bar').style.width = `${Math.min(100, Math.max(10, pct))}%`;
}
updateBP();
setInterval(updateBP, 6000);

// ===== SLEEP SVG GRADIENT FIX =====
const sleepSvg = document.querySelector('.sleep-svg');
if (sleepSvg) {
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  const grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
  grad.id = 'sleepGrad';
  grad.setAttribute('x1', '0'); grad.setAttribute('y1', '0');
  grad.setAttribute('x2', '1'); grad.setAttribute('y2', '0');
  const s1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
  s1.setAttribute('offset', '0%'); s1.setAttribute('stop-color', '#6c8fff');
  const s2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
  s2.setAttribute('offset', '100%'); s2.setAttribute('stop-color', '#00e5a0');
  grad.appendChild(s1); grad.appendChild(s2);
  defs.appendChild(grad);
  sleepSvg.prepend(defs);
}
