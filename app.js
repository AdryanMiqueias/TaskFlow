/**
 * TaskFlow — App de Gerenciamento de Tarefas
 * Autor: [Seu Nome]
 * Tecnologias: HTML, CSS, JavaScript Vanilla
 * Armazenamento: localStorage
 */

// ─── Estado da Aplicação ─────────────────────────────────────
const state = {
  tasks: JSON.parse(localStorage.getItem('taskflow_tasks')) || [],
  filter: 'all',      // all | work | personal | study
  tab: 'pending',     // pending | done
};

// ─── Elementos do DOM ────────────────────────────────────────
const taskList   = document.getElementById('task-list');
const emptyState = document.getElementById('empty-state');
const progressBar = document.getElementById('progress-bar');
const progressPct = document.getElementById('progress-pct');
const overlay    = document.getElementById('modal-overlay');
const btnOpen    = document.getElementById('btn-open-modal');
const btnClose   = document.getElementById('modal-close');
const btnSave    = document.getElementById('btn-save');
const pageTitle  = document.getElementById('page-title');

// ─── Inicialização ───────────────────────────────────────────
function init() {
  setDate();
  render();
  bindEvents();
}

function setDate() {
  const el = document.getElementById('today-date');
  const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  el.textContent = new Date().toLocaleDateString('pt-BR', opts);
}

// ─── Persistência ────────────────────────────────────────────
function save() {
  localStorage.setItem('taskflow_tasks', JSON.stringify(state.tasks));
}

// ─── Criação de Tarefa ───────────────────────────────────────
function createTask(title, desc, category, priority) {
  return {
    id: crypto.randomUUID(),
    title,
    desc,
    category,
    priority,
    done: false,
    createdAt: new Date().toISOString(),
  };
}

function addTask() {
  const title    = document.getElementById('task-title').value.trim();
  const desc     = document.getElementById('task-desc').value.trim();
  const category = document.getElementById('task-category').value;
  const priority = document.getElementById('task-priority').value;

  if (!title) {
    document.getElementById('task-title').focus();
    return;
  }

  state.tasks.unshift(createTask(title, desc, category, priority));
  save();
  closeModal();
  render();
}

// ─── Ações nas Tarefas ───────────────────────────────────────
function toggleTask(id) {
  const task = state.tasks.find(t => t.id === id);
  if (task) task.done = !task.done;
  save();
  render();
}

function deleteTask(id) {
  state.tasks = state.tasks.filter(t => t.id !== id);
  save();
  render();
}

// ─── Renderização ────────────────────────────────────────────
function getFilteredTasks() {
  return state.tasks.filter(t => {
    const matchCat = state.filter === 'all' || t.category === state.filter;
    const matchTab = state.tab === 'pending' ? !t.done : t.done;
    return matchCat && matchTab;
  });
}

function render() {
  const tasks = getFilteredTasks();
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    emptyState.style.display = 'flex';
  } else {
    emptyState.style.display = 'none';
    tasks.forEach(task => taskList.appendChild(buildTaskItem(task)));
  }

  updateCounts();
  updateProgress();
}

function buildTaskItem(task) {
  const li = document.createElement('li');
  li.className = `task-item${task.done ? ' done' : ''}`;
  li.innerHTML = `
    <button class="task-check${task.done ? ' checked' : ''}" data-id="${task.id}">
      ${task.done ? '✓' : ''}
    </button>
    <div class="task-body">
      <p class="task-name">${escapeHtml(task.title)}</p>
      ${task.desc ? `<p class="task-desc">${escapeHtml(task.desc)}</p>` : ''}
      <div class="task-meta">
        <span class="task-tag tag-${task.category}">${labelCat(task.category)}</span>
        <span class="task-priority priority-${task.priority}">${labelPriority(task.priority)}</span>
      </div>
    </div>
    <div class="task-actions">
      <button class="btn-delete" data-id="${task.id}" title="Excluir">🗑</button>
    </div>
  `;

  li.querySelector('.task-check').addEventListener('click', () => toggleTask(task.id));
  li.querySelector('.btn-delete').addEventListener('click', () => deleteTask(task.id));
  return li;
}

function updateCounts() {
  const categories = ['all', 'work', 'personal', 'study'];
  categories.forEach(cat => {
    const count = state.tasks.filter(t => {
      if (cat === 'all') return !t.done;
      return t.category === cat && !t.done;
    }).length;
    const el = document.getElementById(`count-${cat}`);
    if (el) el.textContent = count;
  });
}

function updateProgress() {
  const all = state.tasks.length;
  const done = state.tasks.filter(t => t.done).length;
  const pct = all === 0 ? 0 : Math.round((done / all) * 100);
  progressBar.style.width = `${pct}%`;
  progressPct.textContent = `${pct}%`;
}

// ─── Utilitários ─────────────────────────────────────────────
function labelCat(cat) {
  return { work: 'Trabalho', personal: 'Pessoal', study: 'Estudos' }[cat] || cat;
}
function labelPriority(p) {
  return { high: '🔴 Alta', medium: '🟡 Média', low: '⚪ Baixa' }[p] || p;
}
function escapeHtml(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

// ─── Modal ───────────────────────────────────────────────────
function openModal() {
  document.getElementById('task-title').value = '';
  document.getElementById('task-desc').value  = '';
  overlay.classList.add('open');
  setTimeout(() => document.getElementById('task-title').focus(), 100);
}
function closeModal() { overlay.classList.remove('open'); }

// ─── Eventos ─────────────────────────────────────────────────
function bindEvents() {
  btnOpen.addEventListener('click', openModal);
  btnClose.addEventListener('click', closeModal);
  btnSave.addEventListener('click', addTask);

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'Enter' && overlay.classList.contains('open')) addTask();
  });

  // Filtros de categoria
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.filter = btn.dataset.filter;
      const titles = { all: 'Todas as Tarefas', work: 'Trabalho', personal: 'Pessoal', study: 'Estudos' };
      pageTitle.textContent = titles[state.filter];
      render();
    });
  });

  // Tabs
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.tab = tab.dataset.tab;
      render();
    });
  });
}

// ─── Start ───────────────────────────────────────────────────
init();
