import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [completed, setCompleted] = useState(false);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("/tasks").then((res) => {
      setTasks(res.data.data.tasks);
      console.log(res.data.data.tasks);
    });
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/tasks/add-task", { name, desc, completed });
      // setName("");
      // setDesc("");
      // setCompleted(false);
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
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="description"
          name="desc"
          onChange={(e) => setDesc(e.target.value)}
        />
        <input
          type="checkbox"
          name="completed"
          onChange={() => setCompleted(!completed)}
        />
        <button type="submit" onClick={addTask}>
          Add New Task
        </button>
      </form>

      {tasks.length > 0 ? (
        tasks.map((task) => {
          return (
            <div key={task.id}>
              <h4>{task.name}</h4>
              <p>{task.desc}</p>
            </div>
          );
        })
      ) : (
        <p>No Tasks</p>
      )}
    </>
  );
}
