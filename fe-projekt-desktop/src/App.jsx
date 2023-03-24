import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Axios from "axios";
Axios.defaults.baseURL = "http://localhost:8080";

//components
import Home from "./components/Home";
import Login from "./components/Login";
import Tasks from "./components/Tasks";
import NewTask from "./components/NewTask";
import FlashMessages from "./components/FlashMessages";

function App() {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("appToken")));
  const [tokenContent, setTokenContent] = useState(3); //tu sa da ostestovat admin lvl 3, treba vsak odstranit z delete a add task buttonu .lvl
  const [message, setMessage] = useState([]);
  const [taskId, setTaskId] = useState();

  return (
    <div className="App">
      <FlashMessages message={message} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setTokenContent={setTokenContent} setLoggedIn={setLoggedIn} />} />
        <Route path="/tasks" element={<Tasks tokenContent={tokenContent} setMessage={setMessage} taskId={taskId} />} />
        <Route path="/tasks/new" element={<NewTask tokenContent={tokenContent} setMessage={setMessage} setTaskId={setTaskId} />} />
      </Routes>
    </div>
  );
}

export default App;

// cele sa to da spravit elegantnejsie cez useContext a useReduce, ale kedze je to mensia appka, spravil som to klasicky cez props.
// vzhladu som nedavalo velku vahu ale skor na funcnost
// zial err message aby osoba ktora nema lvl 3 nemala pristup do /tasks/new som nestihol, avsak button sa nezobrazuje pokial nie je lvl 3.
