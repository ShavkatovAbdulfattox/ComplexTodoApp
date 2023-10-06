import React from "react";
import { useParams } from "react-router-dom";
import s from "./style.module.scss";

import dots from "../../assets/images/dots.svg";
import plus from "../../assets/images/plus.svg";

function MyBoard() {
  const { nameAndId } = useParams();

  return (
    <div className={s.wrapper}>
      <h2>Page with tasks</h2>

      <section className={s.wrapper_content}>
        <article className={s.list_wrapper}>
          <div className={s.list_wrapper__header}>
            <h3>To Do</h3>
            <button>
              <img src={dots} alt="dots" />
            </button>
          </div>{" "}
          <div className={s.list_wrapper__action}>
            <p>
              {" "}
              <span>
                <img src={plus} alt="plus" />
              </span>{" "}
              Add a card
            </p>
          </div>
        </article>
        <article className={s.list_wrapper}>
          <div className={s.list_wrapper__header}>
            <h3>Development</h3>
            <button>
              <img src={dots} alt="" />
            </button>
          </div>
        </article>
        <article className={s.list_wrapper}>
          <div className={s.list_wrapper__header}>
            <h3>Done</h3>
            <button>
              <img src={dots} alt="" />
            </button>
          </div>
        </article>
      </section>
    </div>
  );
}

export default MyBoard;
