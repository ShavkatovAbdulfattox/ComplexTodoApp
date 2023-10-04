import React from "react";
import Navbar from "./Navbar";
import ProjectSelect from "../ProjectSelect/ProjectSelect";
import "./style.scss";

function App() {
  return (
    <div>
      <Navbar />
      <ProjectSelect />
    </div>
  );
}

export default App;
