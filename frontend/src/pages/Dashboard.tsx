import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTask, setEditingTask] = useState<{ id: number, title: string, description: string } | null>(null);
  const token = localStorage.getItem("token");

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  // Create a task
  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, { title, description }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTitle("");
      setDescription("");
      window.location.reload(); // Refresh tasks
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // Update a task
  const updateTask = async (id: number) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
        title: editingTask?.title,
        description: editingTask?.description,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingTask(null);
      window.location.reload();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete a task
  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      window.location.reload();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>

      {/* Task Creation Form */}
      <form onSubmit={createTask}>
        <input type="text" placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" placeholder="Description (Optional)" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Create Task</button>
      </form>

      {/* Task List */}
      <ul>
        {tasks.map((task: any) => (
          <li key={task.id}>
            {editingTask?.id === task.id ? (
              <>
                <input type="text" value={editingTask.title} onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })} />
                <input type="text" value={editingTask.description} onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })} />
                <button onClick={() => updateTask(task.id)}>Save</button>
                <button onClick={() => setEditingTask(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{task.title} - {task.description}</span>
                <button onClick={() => setEditingTask(task)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
