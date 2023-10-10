import React from "react";
import Tasks from "./Tasks";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import plus from "../../assets/images/plus.svg";

import s from "./style.module.scss";

function Card({
  boardTaskTitle,
  setIsOpenTextCard,
  isOpenTextCard,
  handleSubmit,
  textCardValue,
  setCardTextValue,
}) {
  return (
    <article className={s.list_wrapper}>
      <div className={s.list_wrapper__header}>
        <h3>To Do</h3>
      </div>{" "}
      {/* // ! Tasks */}
      {boardTaskTitle?.tasks?.length >= 0 && (
        <Tasks boardTaskTitle={boardTaskTitle} />
      )}
      {!isOpenTextCard && (
        <motion.div
          className={s.list_wrapper__action}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpenTextCard(true)}
        >
          <p>
            {" "}
            <span>
              <img src={plus} alt="plus" />
            </span>{" "}
            Add a card
          </p>
        </motion.div>
      )}
      {isOpenTextCard && (
        <form className={s.wrapper_text__card} onSubmit={handleSubmit}>
          <textarea
            name="text_area"
            value={textCardValue}
            onChange={(e) => setCardTextValue(e.target.value)}
            placeholder="Enter title for this card"
          />
          <div>
            <button>Add card</button>
            <AiOutlineClose onClick={() => setIsOpenTextCard(false)} />
          </div>
        </form>
      )}
    </article>
  );
}

export default Card;
