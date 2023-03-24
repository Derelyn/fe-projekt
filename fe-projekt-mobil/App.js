import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeRouter, Routes, Route } from "react-router-native";
import Axios from "axios";
Axios.defaults.baseURL = "http://localhost:8080";

//components
import Home from "./components/Home";
import Login from "./components/Login";
import Tasks from "./components/Tasks";
import NewTask from "./components/NewTask";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(Boolean(AsyncStorage.getItem("appToken")));
  const [tokenContent, setTokenContent] = useState(0); //tu sa da ostestovat admin lvl 3, treba vsak odstranit z delete a add task buttonu .lvl
  const [taskId, setTaskId] = useState();

  return (
    <NativeRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setTokenContent={setTokenContent} setLoggedIn={setLoggedIn} />} />
        <Route path="/tasks" element={<Tasks tokenContent={tokenContent} taskId={taskId} />} />
        <Route path="/tasks/new" element={<NewTask setTaskId={setTaskId} />} />
      </Routes>
    </NativeRouter>
  );
}
