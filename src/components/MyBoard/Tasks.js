import React from "react";
import s from "./task.module.scss";

import useToggle from "../hook/useToggle";
import { RiDeleteBinLine } from "react-icons/ri";

function Tasks({ boardTaskTitle }) {
  const [isVisibleModal, setIsVisibleModal] = useToggle(false);

  const removeElement = () => {
    // eslint-disable-next-line no-restricted-globals
    const isCancel = confirm("Are you sure , you want to delete ?");
  };

  return (
    <div className={s.wrapper}>
      {boardTaskTitle?.tasks?.map((el, i) => {
        return (
          <div key={i} className={s.wrapper_title}>
            {el.title}
            <button onClick={removeElement}>
              <RiDeleteBinLine />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Tasks;
