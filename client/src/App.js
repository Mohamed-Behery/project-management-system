import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [completed, setCompleted] = useState(false);
  const [editing, setEditing] = useState(null);

  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    await axios.get("/tasks").then((res) => {
      setTasks(res.data.data.tasks);
    });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter a task name.");
      return;
    }
    try {
      await axios.post("/tasks/add-task", { name, desc, completed });
      setName("");
      setDesc("");
      setCompleted(false);
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const updateTask = async (taskId) => {
    try {
      await axios.put(`/tasks/${taskId}`, { name, desc, completed });
      setEditing(null);
      setName("");
      setDesc("");
      setCompleted(false);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleEdit = (task) => {
    setName(task.name);
    setDesc(task.desc);
    setCompleted(task.completed);
    setEditing(task._id);
  };

  const handleCancelEdit = () => {
    setName("");
    setDesc("");
    setCompleted(false);
    setEditing(null);
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form>
        <input
          type="text"
          placeholder="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="description"
          name="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <input
          type="checkbox"
          name="completed"
          checked={completed}
          onChange={() => setCompleted(!completed)}
        />
        {editing ? (
          <>
            <button type="button" onClick={() => updateTask(editing)}>
              Update Task
            </button>
            <button type="button" onClick={handleCancelEdit}>
              Cancel
            </button>
          </>
        ) : (
          <button type="submit" onClick={addTask}>
            Add New Task
          </button>
        )}
      </form>

      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task._id}>
            <h4>{task.name}</h4>
            <p>{task.desc}</p>
            <p>{task.completed ? "Completed" : "Not Completed"}</p>
            <button onClick={() => handleEdit(task)}>Edit Task</button>
            <button
              className="delete-btn"
              onClick={() => {
                deleteTask(task._id);
              }}
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>No Tasks</p>
      )}
    </>
  );
}
