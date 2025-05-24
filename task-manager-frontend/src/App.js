// File: App.js (Amazon Forest Theme with Working Hover Effects)
import React, { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("taskify-tasks");
    return stored ? JSON.parse(stored) : [];
  });
  const [filter, setFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [activeSection, setActiveSection] = useState("Today");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [hoveredTask, setHoveredTask] = useState(null);
  const [hoveredNav, setHoveredNav] = useState(null);

  useEffect(() => {
    localStorage.setItem("taskify-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      const newEntry = {
        id: Date.now(),
        title: newTask,
        status: "pending",
        section: activeSection,
        due: dueDate || new Date().toISOString().slice(0, 10),
        priority,
      };
      setTasks([...tasks, newEntry]);
      setNewTask("");
      setDueDate("");
      setPriority("medium");
    }
  };

  const toggleTaskStatus = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, status: task.status === "pending" ? "completed" : "pending" } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateTaskTitle = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, title: editText } : task
    ));
    setEditingId(null);
    setEditText("");
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.section === activeSection &&
      (filter === "all" || task.status === filter) &&
      (priorityFilter === "all" || task.priority === priorityFilter)
  );

  const sections = [
    { name: "Today", icon: "🌿" },
    { name: "Inbox", icon: "📥" },
    { name: "Upcoming", icon: "📆" },
    { name: "Completed", icon: "✅" },
    { name: "Projects", icon: "📁" },
  ];

  const priorityColors = {
    high: "#b91c1c",
    medium: "#ca8a04",
    low: "#15803d",
  };

  const styles = {
    app: { display: "flex", fontFamily: "'Inter', sans-serif", backgroundColor: "#e0f2f1", minHeight: "100vh", color: "#1b4332" },
    sidebar: { width: "220px", backgroundColor: "#2d6a4f", color: "#ffffff", boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)", padding: "2rem 1.5rem" },
    navItem: (isActive, isHovered) => ({
      marginBottom: "1.2rem", fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem",
      color: isActive ? "#d9f99d" : "#ffffff",
      backgroundColor: isHovered ? "#40916c" : "transparent",
      padding: "0.4rem 0.6rem", borderRadius: "6px", transition: "all 0.3s ease"
    }),
    main: { flex: 1, padding: "2rem 3rem", display: "flex", flexDirection: "column" },
    topBar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" },
    filters: { display: "flex", gap: "1rem", marginBottom: "1.5rem" },
    button: {
      padding: "0.5rem 1rem", borderRadius: "6px", border: "1px solid #94a3b8",
      backgroundColor: "#edf6f9", cursor: "pointer", color: "#1b4332",
      transition: "all 0.3s",
    },
    activeButton: { backgroundColor: "#1b4332", color: "#fff", borderColor: "#1b4332" },
    task: (isHovered) => ({
      padding: "0.75rem 1rem", borderRadius: "8px", marginBottom: "0.75rem",
      backgroundColor: isHovered ? "#d8f3dc" : "#ffffff",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)", display: "flex",
      justifyContent: "space-between", alignItems: "center",
      transition: "all 0.3s ease", cursor: "pointer",
      transform: isHovered ? "scale(1.02)" : "scale(1)"
    }),
    taskDetails: { flex: 1 },
    completedTask: { textDecoration: "line-through", color: "#6b7280" },
    addTaskContainer: { marginTop: "auto", display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "2rem" },
    inputRow: { display: "flex", gap: "0.5rem" },
    input: {
      flex: 1, padding: "0.75rem 1rem", borderRadius: "6px", border: "1px solid #a7f3d0",
      transition: "box-shadow 0.3s ease",
    },
    addButton: {
      padding: "0.75rem 1.5rem", backgroundColor: "#40916c", color: "white",
      border: "none", borderRadius: "6px", cursor: "pointer", transition: "all 0.3s ease",
    },
    meta: { fontSize: "0.8rem", color: "#4b5563" },
    deleteButton: {
      border: "none", background: "none", fontSize: "1rem", color: "#b91c1c", cursor: "pointer",
      transition: "transform 0.3s ease",
    },
    priorityBadge: (level) => ({ backgroundColor: priorityColors[level], color: "white", fontSize: "0.75rem", borderRadius: "9999px", padding: "2px 8px", marginLeft: "0.5rem" })
  };

  return (
    <div style={styles.app}>
      <aside style={styles.sidebar}>
        <h2 style={{ marginBottom: "2rem" }}>🌳 TASKIFY</h2>
        {sections.map(({ name, icon }) => (
          <div
            key={name}
            style={styles.navItem(name === activeSection, hoveredNav === name)}
            onClick={() => setActiveSection(name)}
            onMouseEnter={() => setHoveredNav(name)}
            onMouseLeave={() => setHoveredNav(null)}
          >
            <span>{icon}</span>
            <span>{name}</span>
          </div>
        ))}
      </aside>
      <main style={styles.main}>
        <div style={styles.topBar}>
          <h1 style={{ fontSize: "1.75rem" }}>{activeSection}</h1>
          <span style={{ fontSize: "1.25rem" }}>🌲</span>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <span>{filteredTasks.length} Tasks</span> • <span>{filteredTasks.filter(t => t.status === "completed").length} Completed</span>
        </div>
        <div style={styles.filters}>
          {["all", "completed", "pending"].map((type) => (
            <button key={type} style={{ ...styles.button, ...(filter === type ? styles.activeButton : {}) }} onClick={() => setFilter(type)}>
              {type[0].toUpperCase() + type.slice(1)}
            </button>
          ))}
          {["all", "high", "medium", "low"].map((level) => (
            <button key={level} style={{ ...styles.button, ...(priorityFilter === level ? styles.activeButton : {}) }} onClick={() => setPriorityFilter(level)}>
              {level === "all" ? "All Priorities" : `${level.charAt(0).toUpperCase() + level.slice(1)}`}
            </button>
          ))}
        </div>

        {filteredTasks.map((task) => (
          <div
            key={task.id}
            style={styles.task(hoveredTask === task.id)}
            onMouseEnter={() => setHoveredTask(task.id)}
            onMouseLeave={() => setHoveredTask(null)}
          >
            <div onClick={() => toggleTaskStatus(task.id)} style={{ ...styles.taskDetails, ...(task.status === "completed" ? styles.completedTask : {}) }}>
              {editingId === task.id ? (
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={() => updateTaskTitle(task.id)}
                  onKeyDown={(e) => e.key === "Enter" && updateTaskTitle(task.id)}
                  autoFocus
                  style={styles.input}
                />
              ) : (
                <span onDoubleClick={() => { setEditingId(task.id); setEditText(task.title); }}>
                  {task.status === "completed" ? "✅" : "🕓"} {task.title}
                </span>
              )}
              <div style={styles.meta}>
                Due: {task.due}
                <span style={styles.priorityBadge(task.priority)}>{task.priority}</span>
              </div>
            </div>
            <button onClick={() => deleteTask(task.id)} style={styles.deleteButton}>🗑️</button>
          </div>
        ))}

        <div style={styles.addTaskContainer}>
          <div style={styles.inputRow}>
            <input type="text" placeholder={`Task title in "${activeSection}"`} value={newTask} onChange={(e) => setNewTask(e.target.value)} style={styles.input} />
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} style={styles.input} />
            <select value={priority} onChange={(e) => setPriority(e.target.value)} style={styles.input}>
              <option value="high">🔴 High</option>
              <option value="medium">🟠 Medium</option>
              <option value="low">🟢 Low</option>
            </select>
            <button onClick={addTask} style={styles.addButton}>Add</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
