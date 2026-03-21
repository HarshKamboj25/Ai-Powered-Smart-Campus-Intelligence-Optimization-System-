/* =============================================
   ALERTS.JS — Alert feed logic
   ============================================= */

function renderAlerts() {
  const list = document.getElementById('alerts-list');
  if (!list) return;
  if (list.children.length > 0) return; // already rendered

  DATA.alerts.forEach(alert => addAlertItem(alert, list, false));
}

function addAlertItem(alert, container, prepend = false) {
  const dotColors = {
    critical: 'var(--red)',
    warning:  'var(--amber)',
    info:     'var(--cyan)',
    success:  'var(--green)',
  };

  const div = document.createElement('div');
  div.className = 'alert-item ' + alert.type;
  div.innerHTML = `
    <div class="alert-dot" style="background:${dotColors[alert.type]}"></div>
    <div class="alert-body">
      <span class="alert-title">${alert.icon} ${alert.title}</span>
      <span class="alert-desc">${alert.desc}</span>
    </div>
    <span class="alert-time">${alert.time}</span>
    <button class="alert-dismiss" onclick="dismissAlert(this)" title="Dismiss">✕</button>
  `;

  if (prepend) {
    container.prepend(div);
  } else {
    container.appendChild(div);
  }
}

function addAlertDynamic(alert) {
  const list = document.getElementById('alerts-list');
  if (list) addAlertItem(alert, list, true);
  updateAlertBadge();
}

function dismissAlert(btn) {
  const item = btn.closest('.alert-item');
  item.style.opacity = '0';
  item.style.transform = 'translateX(8px)';
  item.style.transition = 'all .3s';
  setTimeout(() => item.remove(), 320);
  setTimeout(updateAlertBadge, 330);
}

function clearAllAlerts() {
  const items = document.querySelectorAll('.alert-item');
  items.forEach((el, i) => {
    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transform = 'translateX(8px)';
      el.style.transition = 'all .28s';
      setTimeout(() => el.remove(), 290);
    }, i * 60);
  });
  setTimeout(updateAlertBadge, items.length * 60 + 300);
}

function updateAlertBadge() {
  const badge = document.getElementById('nav-badge');
  if (!badge) return;
  const count = document.querySelectorAll('.alert-item').length;
  badge.textContent = count;
  badge.style.display = count > 0 ? 'inline' : 'none';
}
