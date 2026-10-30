
import { useEffect, useState } from "react";
import "./App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUsers,
  faCalendarCheck,
  faChartColumn,
  faBullhorn,
  faGear,
  faCircleQuestion,
  faRightFromBracket,
  faUserPlus,
  faPlus,
  faXmark,
  faCheck,
  faCalendarDays,
  faMagnifyingGlass,
  faTable,
  faList,
  faGrip,
  faBookOpen,
  faClipboardCheck,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const subjects = ["English", "Urdu", "Science", "Maths", "Computer Science"];

const initialTasks = [
  { id: 1, title: "Complete Grammar Assignment", subject: "English", status: "To do", priority: "High", due: "2026-10-30" },
  { id: 2, title: "Write Urdu Essay", subject: "Urdu", status: "In Progress", priority: "Medium", due: "2026-10-31" },
  { id: 3, title: "Prepare Biology Notes", subject: "Science", status: "Under Review", priority: "High", due: "2026-11-01" },
  { id: 4, title: "Solve Algebra Worksheet", subject: "Maths", status: "Completed", priority: "Low", due: "2026-10-29" },
  { id: 5, title: "Practice React Components", subject: "Computer Science", status: "In Progress", priority: "High", due: "2026-10-31" },
  { id: 6, title: "Learn 10 New Vocabulary Words", subject: "English", status: "To do", priority: "Low", due: "2026-11-02" },
  { id: 7, title: "Study the Solar System", subject: "Science", status: "In Progress", priority: "Medium", due: "2026-11-03" },
  { id: 8, title: "Geometry Practice", subject: "Maths", status: "To do", priority: "Medium", due: "2026-11-04" },
];

const statuses = ["To do", "In Progress", "Under Review", "Completed"];

function Sidebar({ activePage, setActivePage, onAddStudent }) {
  const menu = [
    ["Dashboard", faHouse],
    ["Students", faUsers],
    ["Attendance", faCalendarCheck],
    ["Report", faChartColumn],
    ["Announcements", faBullhorn],
    ["Settings", faGear],
    ["Help Center", faCircleQuestion],
  ];

  return (
    <aside className="sidebar">
      <h2 className="logo"><span></span> Scholarly</h2>

      <p className="menu-label">MAIN MENU</p>

      {menu.map(([name, icon]) => (
        <button
          key={name}
          className={`nav-link ${activePage === name ? "active" : ""}`}
          onClick={() => setActivePage(name)}
        >
          <span className="nav-icon">
            <FontAwesomeIcon icon={icon} />
          </span>
          {name}
        </button>
      ))}

      <div className="quick-student">
        <div className="quick-icon">
          <FontAwesomeIcon icon={faUserPlus} />
        </div>
        <h3>Quick Add New Students</h3>
        <p>Add a student to your class list.</p>
        <button className="primary-btn full-btn" onClick={onAddStudent}>
          <FontAwesomeIcon icon={faPlus} /> Add Student
        </button>
      </div>

      <button className="signout-link" onClick={() => setActivePage("Sign Out")}>
        <FontAwesomeIcon icon={faRightFromBracket} /> Sign Out
      </button>
    </aside>
  );
}

function TaskCard({ task, onComplete, onDelete, onStatusChange }) {
  return (
    <article className={`task-card ${task.status === "Completed" ? "completed-card" : ""}`}>
      <div className="task-card-top">
        <span className={`subject-tag ${task.subject.toLowerCase().replace(" ", "-")}`}>
          {task.subject}
        </span>
        <button className="delete-btn" onClick={() => onDelete(task.id)} title="Delete task">
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      <h3 className={task.status === "Completed" ? "strike" : ""}>
        {task.title}
      </h3>

      <div className="task-details">
        <span className={`priority ${task.priority.toLowerCase()}`}>
          {task.priority} Priority
        </span>
        <span>
          <FontAwesomeIcon icon={faCalendarDays} /> {task.due}
        </span>
      </div>

      <div className="task-actions">
        <button
          className="complete-btn"
          onClick={() => onComplete(task.id)}
          disabled={task.status === "Completed"}
        >
          <FontAwesomeIcon icon={faCheck} />
          {task.status === "Completed" ? " Completed" : " Complete"}
        </button>

        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
          aria-label="Change task status"
        >
          {statuses.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>
      </div>
    </article>
  );
}

function TaskForm({ onAdd, onClose }) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("English");
  const [priority, setPriority] = useState("Medium");
  const [due, setDue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a task name.");
      return;
    }

    onAdd({
      id: Date.now(),
      title: title.trim(),
      subject,
      priority,
      due: due || new Date().toISOString().slice(0, 10),
      status: "To do",
    });

    onClose();
  }

  return (
    <div className="modal-backdrop">
      <form className="modal" onSubmit={handleSubmit}>
        <button type="button" className="modal-close" onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <h2>Add New Task</h2>
        <label>Task Name</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter task name" />

        <label>Subject</label>
        <select value={subject} onChange={(e) => setSubject(e.target.value)}>
          {subjects.map((s) => <option key={s}>{s}</option>)}
        </select>

        <label>Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <label>Due Date</label>
        <input type="date" value={due} onChange={(e) => setDue(e.target.value)} />

        <button className="primary-btn full-btn" type="submit">
          <FontAwesomeIcon icon={faPlus} /> Add Task
        </button>
      </form>
    </div>
  );
}

function StudentForm({ onAdd, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert("Please enter the student's name and email.");
      return;
    }
    onAdd({ id: Date.now(), name: name.trim(), email: email.trim() });
    onClose();
  }

  return (
    <div className="modal-backdrop">
      <form className="modal" onSubmit={handleSubmit}>
        <button type="button" className="modal-close" onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <h2>Add New Student</h2>
        <label>Student Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Student name" />
        <label>Email Address</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="student@email.com" />
        <button className="primary-btn full-btn" type="submit">
          <FontAwesomeIcon icon={faUserPlus} /> Save Student
        </button>
      </form>
    </div>
  );
}

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [activePage, setActivePage] = useState("Dashboard");
  const [view, setView] = useState("Board");
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All Subjects");
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [students, setStudents] = useState([]);
  const [apiUsers, setApiUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profileName, setProfileName] = useState("Maham");
  const [photo, setPhoto] = useState("");

  // Fetch users from the required API
  useEffect(() => {
    const controller = new AbortController();

    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Unable to fetch users.");
        }

        const data = await response.json();
        setApiUsers(data);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Users could not be loaded. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchUsers();

    return () => controller.abort();
  }, []);

  function addTask(newTask) {
    setTasks((previousTasks) => [newTask, ...previousTasks]);
  }

  function deleteTask(id) {
    setTasks((previousTasks) => previousTasks.filter((task) => task.id !== id));
  }

  function completeTask(id) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id ? { ...task, status: "Completed" } : task
      )
    );
  }

  function changeStatus(id, newStatus) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  }

  function addStudent(student) {
    setStudents((previousStudents) => [student, ...previousStudents]);
  }

  function uploadPhoto(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesSubject = subjectFilter === "All Subjects" || task.subject === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  const completedCount = tasks.filter((task) => task.status === "Completed").length;
  const pendingCount = tasks.length - completedCount;

  function renderTasks() {
    if (filteredTasks.length === 0) {
      return <p className="empty-message">No tasks found. Add a new task!</p>;
    }

    if (view === "Board") {
      return (
        <div className="board">
          {statuses.map((status) => {
            const columnTasks = filteredTasks.filter((task) => task.status === status);

            return (
              <section className="board-column" key={status}>
                <div className="column-heading">
                  <span className={`status-dot ${status.toLowerCase().replaceAll(" ", "-")}`}></span>
                  <h3>{status}</h3>
                  <span className="count">{String(columnTasks.length).padStart(2, "0")}</span>
                </div>

                <button className="add-column-task" onClick={() => setShowTaskForm(true)}>
                  <FontAwesomeIcon icon={faPlus} /> Add new task
                </button>

                {columnTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onComplete={completeTask}
                    onDelete={deleteTask}
                    onStatusChange={changeStatus}
                  />
                ))}
              </section>
            );
          })}
        </div>
      );
    }

    if (view === "Table") {
      return (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Task Name</th><th>Subject</th><th>Due Date</th>
                <th>Priority</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id}>
                  <td className={task.status === "Completed" ? "strike" : ""}>{task.title}</td>
                  <td>{task.subject}</td>
                  <td>
                    <FontAwesomeIcon icon={faCalendarDays} /> {task.due}
                  </td>
                  <td>{task.priority}</td>
                  <td>
                    <select value={task.status} onChange={(e) => changeStatus(task.id, e.target.value)}>
                      {statuses.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="table-actions">
                    <button onClick={() => completeTask(task.id)} title="Complete task">
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                    <button onClick={() => deleteTask(task.id)} title="Delete task">
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <div className="list-view">
        {filteredTasks.map((task) => (
          <div className="list-row" key={task.id}>
            <div>
              <strong className={task.status === "Completed" ? "strike" : ""}>{task.title}</strong>
              <p>{task.subject} · {task.due} · {task.priority} Priority</p>
            </div>
            <div className="list-actions">
              <button onClick={() => completeTask(task.id)}>
                <FontAwesomeIcon icon={faCheck} /> Complete
              </button>
              <button onClick={() => deleteTask(task.id)}>
                <FontAwesomeIcon icon={faXmark} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function renderPage() {
    if (activePage === "Sign Out") {
      return (
        <div className="simple-page signout-page">
          <div className="signout-box">
            <div className="big-icon">
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </div>
            <h2>Ready to sign out?</h2>
            <p>This is a demo sign-out screen for your Student Task Manager.</p>
            <button className="primary-btn" onClick={() => setActivePage("Dashboard")}>
              Stay on Dashboard
            </button>
          </div>
        </div>
      );
    }

    if (activePage === "Students") {
      return (
        <div className="simple-page">
          <div className="section-title">
            <div><h2>Students</h2><p>Manage your student list</p></div>
            <button className="primary-btn" onClick={() => setShowStudentForm(true)}>
              <FontAwesomeIcon icon={faUserPlus} /> Add Student
            </button>
          </div>
          <h3 className="subheading">Added Students</h3>
          {students.length === 0 && <p className="empty-message">No students added yet.</p>}
          {students.map((student) => (
            <div className="student-row" key={student.id}>
              <div className="student-avatar">{student.name.charAt(0).toUpperCase()}</div>
              <div><strong>{student.name}</strong><p>{student.email}</p></div>
            </div>
          ))}
          <h3 className="subheading">Users from API</h3>
          {loading && <p>Loading users...</p>}
          {error && <p className="error-message">{error}</p>}
          {apiUsers.map((user) => (
            <div className="student-row" key={user.id}>
              <div className="student-avatar">{user.name.charAt(0)}</div>
              <div><strong>{user.name}</strong><p>{user.email}</p></div>
            </div>
          ))}
        </div>
      );
    }

    if (activePage === "Attendance") {
      return (
        <div className="simple-page">
          <h2>Attendance</h2>
          <p className="muted">Student attendance overview</p>
          {students.map((student) => (
            <div className="student-row" key={student.id}>
              <div className="student-avatar">{student.name.charAt(0)}</div>
              <strong>{student.name}</strong>
              <span className="attendance-present">
                <FontAwesomeIcon icon={faCheck} /> Present
              </span>
            </div>
          ))}
          {students.length === 0 && <p className="empty-message">Add students to view attendance.</p>}
        </div>
      );
    }

    if (activePage === "Report") {
      return (
        <div className="simple-page">
          <h2>Tasks Report</h2>
          <div className="stats-grid">
            <div className="stat-card"><span>Total Tasks</span><strong>{tasks.length}</strong></div>
            <div className="stat-card"><span>Completed</span><strong>{completedCount}</strong></div>
            <div className="stat-card"><span>Pending</span><strong>{pendingCount}</strong></div>
            <div className="stat-card"><span>Students</span><strong>{students.length}</strong></div>
          </div>
          <p className="muted">Your task progress at a glance.</p>
        </div>
      );
    }

    if (activePage === "Announcements") {
      return (
        <div className="simple-page">
          <h2>Announcements</h2>
          <div className="announcement">
            <span><FontAwesomeIcon icon={faBullhorn} /></span>
            <div><strong>Welcome to Scholarly!</strong><p>Keep your tasks organised and complete your work on time.</p></div>
          </div>
          <div className="announcement">
            <span><FontAwesomeIcon icon={faBookOpen} /></span>
            <div><strong>Assignment Reminder</strong><p>Remember to review your upcoming subject deadlines.</p></div>
          </div>
        </div>
      );
    }

    if (activePage === "Settings") {
      return (
        <div className="simple-page">
          <h2>Settings</h2>
          <label className="settings-label">Display Name</label>
          <input className="settings-input" value={profileName} onChange={(e) => setProfileName(e.target.value)} />
          <p className="muted">Your name is displayed in the top-right profile area.</p>
        </div>
      );
    }

    if (activePage === "Help Center") {
      return (
        <div className="simple-page">
          <h2>Help Center</h2>
          <div className="announcement">
            <span><FontAwesomeIcon icon={faClipboardCheck} /></span>
            <div><strong>How do I add a task?</strong><p>Click the Add Task button and complete the form.</p></div>
          </div>
          <div className="announcement">
            <span><FontAwesomeIcon icon={faCheck} /></span>
            <div><strong>How do I complete a task?</strong><p>Click Complete on the task card.</p></div>
          </div>
          <div className="announcement">
            <span><FontAwesomeIcon icon={faGear} /></span>
            <div><strong>How do I change a task status?</strong><p>Use the status dropdown on a task.</p></div>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="stats-grid">
          <div className="stat-card"><span>Total Tasks</span><strong>{tasks.length}</strong></div>
          <div className="stat-card"><span>Completed</span><strong>{completedCount}</strong></div>
          <div className="stat-card"><span>In Progress</span><strong>{tasks.filter((t) => t.status === "In Progress").length}</strong></div>
          <div className="stat-card"><span>Students</span><strong>{students.length}</strong></div>
        </div>

        <div className="board-toolbar">
          <select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)}>
            <option>All Subjects</option>
            {subjects.map((s) => <option key={s}>{s}</option>)}
          </select>

          <div className="view-buttons">
            <span>Tasks Board</span>
            {["Board", "Table", "List"].map((item) => (
              <button
                key={item}
                className={view === item ? "view-active" : ""}
                onClick={() => setView(item)}
              >
                <FontAwesomeIcon
                  icon={
                    item === "Board" ? faGrip :
                    item === "Table" ? faTable :
                    faList
                  }
                />{" "}
                {item}
              </button>
            ))}
            <button className="primary-btn" onClick={() => setShowTaskForm(true)}>
              <FontAwesomeIcon icon={faPlus} /> Add Task
            </button>
          </div>
        </div>

        {renderTasks()}
      </>
    );
  }

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        onAddStudent={() => setShowStudentForm(true)}
      />

      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>{activePage === "Dashboard" ? "Tasks Dashboard" : activePage}</h1>
            <p>{new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}</p>
          </div>

          <div className="search-box">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks..."
            />
          </div>

          <div className="profile">
            <label className="photo-upload" title="Upload profile photo">
              {photo ? <img src={photo} alt="Profile" /> : <span>{profileName.charAt(0).toUpperCase()}</span>}
              <input type="file" accept="image/*" onChange={uploadPhoto} />
            </label>
            <div><strong>{profileName}</strong><small>Student</small></div>
          </div>
        </header>

        {renderPage()}
      </main>

      {showTaskForm && (
        <TaskForm onAdd={addTask} onClose={() => setShowTaskForm(false)} />
      )}

      {showStudentForm && (
        <StudentForm onAdd={addStudent} onClose={() => setShowStudentForm(false)} />
      )}
    </div>
  );
}

export default App;
