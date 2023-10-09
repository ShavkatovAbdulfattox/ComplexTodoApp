import React from "react";
import s from "./task.module.scss";

function Tasks({ boardTaskTitle }) {
  return (
    <div className={s.wrapper}>
      {boardTaskTitle?.tasks?.map((el, i) => {
        return (
          <div key={i} className={s.wrapper_title}>
            {el.title}
          </div>
        );
      })}
    </div>
  );
}

export default Tasks;
