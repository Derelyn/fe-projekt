import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const Tasks = props => {
  const [tasks, setTasks] = useState([]);
  const [select, setSelect] = useState("new");

  var i = 1;

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await Axios.get(`/tasks?filter=${select}`);
        setTasks(response.data);
      } catch (e) {
        console.log("Problem with rendering tasks.");
      }
    }
    fetchPosts();
  }, []);

  const handleDelete = () => {
    const areYouSure = window.confirm("Do you really want to delete this post?");
    if (areYouSure) {
      async function fetchPost() {
        try {
          await Axios.delete(`/tasks/${props.taskId}`, { data: { token: localStorage.getItem("appToken") } });
          props.setMessage("Task deleted.");
        } catch (e) {
          console.log("Problem with delete task.");
        }
      }
      fetchPost();
    }
  };

  return (
    <div className="tasks">
      <div className="tasks-options">
        <div>
          <label htmlFor="show-me" id="show-me">
            Show me&nbsp;
          </label>
          <select onChange={e => setSelect(e.target.value)} name="show-me">
            <option value="new">New</option>
            <option value="finished">Finished</option>
          </select>
        </div>
        {props.tokenContent.lvl === 3 && <Link to="/tasks/new">Add task</Link>}
      </div>
      <table>
        <thead>
          <tr>
            <th>Num</th>
            <th>Task</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => {
            return (
              <tr key={task._id}>
                <td>{i++}</td>
                <td>{task.title}</td>
                <td>{task.body}</td>
                {props.tokenContent.lvl === 3 && (
                  <td>
                    <button onClick={handleDelete}>X</button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;
