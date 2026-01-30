// script.js
class TaskManager {
  constructor() {
    this.tasks = this.loadTasks();
    this.currentFilter = "all";
    this.editingTaskId = null;
    this.init();
  }

  // Inicializar a aplicação
  init() {
    this.renderTasks();
    this.updateStats();
    this.setupEventListeners();
  }

  // Carregar tarefas do localStorage
  loadTasks() {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
  }

  // Salvar tarefas no localStorage
  saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  // Adicionar uma nova tarefa
  addTask(taskData) {
    const task = {
      id: Date.now().toString(),
      title: taskData.title,
      description: taskData.description || "",
      category: taskData.category || "pessoal",
      priority: taskData.priority || "medium",
      dueDate: taskData.dueDate || "",
      completed: false,
      createdAt: new Date().toISOString(),
    };

    this.tasks.unshift(task);
    this.saveTasks();
    this.renderTasks();
    this.updateStats();
    this.resetForm();
    this.showNotification("Tarefa adicionada com sucesso!", "success");
  }

  // Atualizar uma tarefa existente
  updateTask(id, taskData) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      this.tasks[taskIndex] = {
        ...this.tasks[taskIndex],
        title: taskData.title,
        description: taskData.description,
        category: taskData.category,
        priority: taskData.priority,
        dueDate: taskData.dueDate,
      };
      this.saveTasks();
      this.renderTasks();
      this.updateStats();
      this.resetForm();
      this.showNotification("Tarefa atualizada com sucesso!", "success");
    }
  }

  // Excluir uma tarefa
  deleteTask(id) {
    if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
      this.saveTasks();
      this.renderTasks();
      this.updateStats();
      this.showNotification("Tarefa excluída com sucesso!", "warning");
    }
  }

  // Alternar status de conclusão
  toggleTaskCompletion(id) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      this.tasks[taskIndex].completed = !this.tasks[taskIndex].completed;
      this.saveTasks();
      this.renderTasks();
      this.updateStats();

      const status = this.tasks[taskIndex].completed ? "concluída" : "pendente";
      this.showNotification(`Tarefa marcada como ${status}!`, "info");
    }
  }

  // Filtrar tarefas
  filterTasks(filter) {
    this.currentFilter = filter;
    this.renderTasks();

    // Atualizar botões de filtro
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    document.querySelector(`[data-filter="${filter}"]`).classList.add("active");
  }

  // Obter tarefas filtradas
  getFilteredTasks() {
    switch (this.currentFilter) {
      case "pending":
        return this.tasks.filter((task) => !task.completed);
      case "completed":
        return this.tasks.filter((task) => task.completed);
      case "high":
        return this.tasks.filter((task) => task.priority === "high");
      default:
        return this.tasks;
    }
  }

  // Renderizar lista de tarefas
  renderTasks() {
    const tasksList = document.getElementById("tasks-list");
    const filteredTasks = this.getFilteredTasks();

    if (filteredTasks.length === 0) {
      tasksList.innerHTML = `
                <div class="empty-state fade-in">
                    <i class="fas fa-clipboard-list"></i>
                    <h3>Nenhuma tarefa encontrada</h3>
                    <p>${this.currentFilter === "all" ? "Adicione sua primeira tarefa usando o formulário ao lado" : "Nenhuma tarefa corresponde ao filtro selecionado"}</p>
                </div>
            `;
      return;
    }

    tasksList.innerHTML = filteredTasks
      .map(
        (task) => `
            <div class="task-item ${task.completed ? "completed" : ""} ${task.priority} fade-in">
                <div class="task-header">
                    <div>
                        <div class="task-title">${this.escapeHtml(task.title)}</div>
                        <span class="task-category">${this.getCategoryLabel(task.category)}</span>
                    </div>
                    <div class="task-actions">
                        <button class="action-btn complete-btn" onclick="taskManager.toggleTaskCompletion('${task.id}')" title="${task.completed ? "Marcar como pendente" : "Marcar como concluída"}">
                            <i class="fas ${task.completed ? "fa-rotate-left" : "fa-check"}"></i>
                        </button>
                        <button class="action-btn edit-btn" onclick="taskManager.editTask('${task.id}')" title="Editar tarefa">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete-btn" onclick="taskManager.deleteTask('${task.id}')" title="Excluir tarefa">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                ${task.description ? `<div class="task-description">${this.escapeHtml(task.description)}</div>` : ""}
                <div class="task-footer">
                    <div class="task-date">
                        <i class="fas fa-calendar"></i>
                        ${task.dueDate ? this.formatDate(task.dueDate) : "Sem data definida"}
                    </div>
                    <div class="priority-badge ${task.priority}">
                        ${this.getPriorityLabel(task.priority)}
                    </div>
                </div>
            </div>
        `,
      )
      .join("");
  }

  // Editar uma tarefa
  editTask(id) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      document.getElementById("task-id").value = task.id;
      document.getElementById("task-title").value = task.title;
      document.getElementById("task-description").value = task.description;
      document.getElementById("task-category").value = task.category;
      document.getElementById("task-priority").value = task.priority;
      document.getElementById("task-date").value = task.dueDate;

      // Alterar botão de submit
      document.querySelector('button[type="submit"]').innerHTML =
        '<i class="fas fa-edit"></i> Atualizar Tarefa';
      document.getElementById("cancel-btn").style.display = "flex";

      this.editingTaskId = id;

      // Scroll para o formulário
      document
        .querySelector(".form-section")
        .scrollIntoView({ behavior: "smooth" });

      this.showNotification("Modo edição ativado!", "info");
    }
  }

  // Resetar formulário
  resetForm() {
    document.getElementById("task-form").reset();
    document.getElementById("task-id").value = "";
    document.querySelector('button[type="submit"]').innerHTML =
      '<i class="fas fa-save"></i> Salvar Tarefa';
    document.getElementById("cancel-btn").style.display = "none";
    this.editingTaskId = null;
  }

  // Atualizar estatísticas
  updateStats() {
    const total = this.tasks.length;
    const pending = this.tasks.filter((task) => !task.completed).length;
    const completed = this.tasks.filter((task) => task.completed).length;

    document.getElementById("total-tasks").textContent = total;
    document.getElementById("pending-tasks").textContent = pending;
    document.getElementById("completed-tasks").textContent = completed;
  }

  // Mostrar notificação
  showNotification(message, type = "info") {
    // Remove notificação anterior se existir
    const existingNotification = document.querySelector(".notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    const notification = document.createElement("div");
    notification.className = `notification fade-in`;
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            gap: 10px;
            min-width: 300px;
            max-width: 400px;
            animation: fadeIn 0.3s ease;
        `;

    // Cor baseada no tipo
    const colors = {
      success: "#4cc9f0",
      warning: "#f8961e",
      danger: "#f72585",
      info: "#4361ee",
    };

    notification.style.background = colors[type] || colors.info;

    // Ícone baseado no tipo
    const icons = {
      success: "fa-check-circle",
      warning: "fa-exclamation-triangle",
      danger: "fa-times-circle",
      info: "fa-info-circle",
    };

    notification.innerHTML = `
            <i class="fas ${icons[type] || icons.info}"></i>
            <span>${message}</span>
        `;

    document.body.appendChild(notification);

    // Remover após 3 segundos
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.opacity = "0";
        notification.style.transform = "translateX(100px)";
        notification.style.transition = "opacity 0.3s, transform 0.3s";

        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 300);
      }
    }, 3000);
  }

  // Configurar event listeners
  setupEventListeners() {
    const form = document.getElementById("task-form");
    const cancelBtn = document.getElementById("cancel-btn");
    const filterBtns = document.querySelectorAll(".filter-btn");

    // Submit do formulário
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const taskData = {
        title: document.getElementById("task-title").value.trim(),
        description: document.getElementById("task-description").value.trim(),
        category: document.getElementById("task-category").value,
        priority: document.getElementById("task-priority").value,
        dueDate: document.getElementById("task-date").value,
      };

      if (!taskData.title) {
        this.showNotification(
          "Por favor, insira um título para a tarefa",
          "warning",
        );
        return;
      }

      if (this.editingTaskId) {
        this.updateTask(this.editingTaskId, taskData);
      } else {
        this.addTask(taskData);
      }
    });

    // Botão cancelar
    cancelBtn.addEventListener("click", () => {
      this.resetForm();
      this.showNotification("Edição cancelada", "info");
    });

    // Filtros
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.filterTasks(btn.dataset.filter);
      });
    });

    // Adicionar data atual como padrão
    const today = new Date().toISOString().split("T")[0];
    const dateInput = document.getElementById("task-date");
    dateInput.min = today;
    dateInput.value = today;

    // Limpar todas as tarefas (botão extra)
    this.setupClearAllButton();
  }

  // Configurar botão para limpar todas as tarefas
  setupClearAllButton() {
    const clearBtn = document.createElement("button");
    clearBtn.className = "btn btn-danger";
    clearBtn.innerHTML = '<i class="fas fa-trash"></i> Limpar Todas';
    clearBtn.style.marginTop = "20px";

    clearBtn.addEventListener("click", () => {
      if (this.tasks.length === 0) {
        this.showNotification("Não há tarefas para limpar", "info");
        return;
      }

      if (
        confirm(
          `Tem certeza que deseja excluir todas as ${this.tasks.length} tarefas? Esta ação não pode ser desfeita.`,
        )
      ) {
        this.tasks = [];
        this.saveTasks();
        this.renderTasks();
        this.updateStats();
        this.showNotification("Todas as tarefas foram removidas", "danger");
      }
    });

    document.querySelector(".list-section").appendChild(clearBtn);
  }

  // Utilitários
  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  }

  getCategoryLabel(category) {
    const labels = {
      trabalho: "Trabalho",
      pessoal: "Pessoal",
      estudos: "Estudos",
      saude: "Saúde",
      outro: "Outro",
    };
    return labels[category] || category;
  }

  getPriorityLabel(priority) {
    const labels = {
      low: "Baixa",
      medium: "Média",
      high: "Alta",
    };
    return labels[priority] || priority;
  }
}

// Inicializar a aplicação quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  window.taskManager = new TaskManager();

  // Adicionar algumas tarefas de exemplo se estiver vazio
  if (taskManager.tasks.length === 0) {
    const exampleTasks = [
      {
        title: "Estudar JavaScript",
        description: "Revisar conceitos de CRUD e localStorage",
        category: "estudos",
        priority: "high",
        dueDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
      },
      {
        title: "Fazer compras",
        description: "Comprar itens essenciais para a semana",
        category: "pessoal",
        priority: "medium",
        dueDate: new Date(Date.now() + 172800000).toISOString().split("T")[0],
      },
      {
        title: "Reunião de equipe",
        description: "Apresentar progresso do projeto atual",
        category: "trabalho",
        priority: "high",
        dueDate: new Date(Date.now() + 259200000).toISOString().split("T")[0],
      },
    ];

    exampleTasks.forEach((task) => {
      taskManager.addTask(task);
    });

    taskManager.showNotification("Tarefas de exemplo adicionadas!", "info");
  }
});
