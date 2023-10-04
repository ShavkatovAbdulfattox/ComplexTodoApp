import React from "react";
import plus from "../../assets/images/plus.svg";
import s from "./style.module.css";

function ProjectSelect() {
  return (
    <div className="container">
      <button className={s.button}>
        Create new board <img src={plus} alt="plus-icon" />
      </button>
    </div>
  );
}

export default ProjectSelect;
