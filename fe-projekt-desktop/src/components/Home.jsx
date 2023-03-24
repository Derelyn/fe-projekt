import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="homepage">
      <strong>This is very simple homepage</strong>
      <strong>
        <Link to="/login">Login</Link>
      </strong>
    </div>
  );
};

export default Home;
