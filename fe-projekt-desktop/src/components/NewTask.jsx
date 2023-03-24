import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const NewTask = props => {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await Axios.post(`/tasks`, { title, body, id: Date.now() }); //id: Date.now() vytvori random id, pokial ho samozrejme backend nevytvara, takze som to tam dal pre istotu
      props.setTaskId(response.data.id);
      props.setMessage("Task created.");
    } catch (e) {
      console.log("Problem connet to backend.");
    }
    setTitle("");
    setBody("");
  }

  return (
    <div className="new-task">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input onChange={e => setTitle(e.target.value)} id="title" name="title" type="text" placeholder="New appointment" autoFocus />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea onChange={e => setBody(e.target.value)} id="content" name="content" type="text" placeholder="Lorem ipsum." />
        </div>
        <button>Add new task</button>
      </form>
      <div className="new-task-back">
        <Link to="/tasks">&larr; Back to tasks.</Link>
      </div>
    </div>
  );
};

export default NewTask;
