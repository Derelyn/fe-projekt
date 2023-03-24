import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Axios from "axios";
import jwt from "jwt-decode";

const Login = props => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await Axios.post("/login", { username, password });
      if (response.data) {
        localStorage.setItem("appToken", response.data.token);
        localStorage.setItem("appuUsername", response.data.username);
        const tokenDecoded = jwt(response.data.token);

        props.setTokenContent(prev => prev.concat({ tokenDecoded }));
        props.setLoggedIn(true);
        navigate("/tasks");
      } else {
        console.log("Incorrect username / password.");
      }
    } catch (e) {
      console.log("Problem connect to backend.");
    }
    setUsername("");
    setPassword("");
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>

          <input onChange={e => setUsername(e.target.value)} id="name" name="name" type="text" placeholder="username" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input onChange={e => setPassword(e.target.value)} id="password" name="password" type="password" placeholder="password" />
        </div>
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
