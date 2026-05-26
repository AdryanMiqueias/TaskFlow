# ◈ TaskFlow

> **Gerenciador de tarefas minimalista e moderno** — sem frameworks, sem dependências, apenas HTML, CSS e JS puro.

![TaskFlow Preview](https://img.shields.io/badge/status-live-brightgreen?style=flat-square)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

---

## 📸 Preview

```
╭────────────────────────────────────────────────╮
│  ◈ TaskFlow          [+ Nova Tarefa]           │
│  ─────────────────────────────────────────     │
│  ● Todas       3     Pendentes | Concluídas    │
│  ● Trabalho    1     ──────────────────────    │
│  ● Pessoal     1     ☐ Revisar pull request    │
│  ● Estudos     1         🔵 Trabalho  🔴 Alta  │
│                          ──────────────────    │
│  Progresso: 40%          ☑ Ler livro de CSS   │
│  ████████░░░░░             🟣 Estudos  🟡 Média │
╰────────────────────────────────────────────────╯
```

## ✨ Funcionalidades

- ✅ Criar, concluir e excluir tarefas
- 🏷️ Categorias: **Trabalho**, **Pessoal**, **Estudos**
- 🎯 Prioridades: **Alta**, **Média**, **Baixa**
- 📊 Barra de progresso dinâmica
- 💾 Dados salvos no **localStorage** (persiste entre sessões)
- 🌙 Tema escuro com visual minimalista
- ⌨️ Suporte a atalhos de teclado (`Enter` para salvar, `Esc` para fechar)
- 📱 Design responsivo para mobile

---

## 🚀 Como usar

**Opção 1 — Direto no navegador:**
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/taskflow.git
cd taskflow

# Abra o arquivo index.html
open index.html   # macOS
start index.html  # Windows
```

**Opção 2 — Com servidor local:**
```bash
# Python
python -m http.server 3000

# Node.js (npx)
npx serve .
```

Acesse `http://localhost:3000`

---

## 📁 Estrutura do Projeto

```
taskflow/
├── index.html   # Estrutura HTML e layout
├── style.css    # Estilos e animações (CSS Variables)
├── app.js       # Lógica da aplicação (Vanilla JS)
└── README.md    # Documentação
```

---

## 🧠 Arquitetura

O projeto segue uma arquitetura simples baseada em **estado único**:

```javascript
const state = {
  tasks: [],      // Array de tarefas
  filter: 'all',  // Filtro ativo de categoria
  tab: 'pending', // Tab ativo (pendente | concluído)
};
```

**Fluxo de dados:**
```
Ação do usuário → Atualiza state → save() → render()
```

---

## 💡 Tecnologias & Conceitos

| Conceito | Implementação |
|----------|---------------|
| Persistência | `localStorage` |
| IDs únicos | `crypto.randomUUID()` |
| Renderização | DOM manipulation |
| Estilo | CSS Custom Properties |
| Animações | CSS `@keyframes` |
| Segurança | `escapeHtml()` contra XSS |

---

## 🗺️ Roadmap

- [ ] Drag & drop para reordenar tarefas
- [ ] Data de vencimento com alertas
- [ ] Modo foco (Pomodoro integrado)
- [ ] Exportar tarefas como CSV
- [ ] Temas claros/escuros

---

## 📄 Licença

MIT © [Adryan Miqueias Oliveira Pereira]
