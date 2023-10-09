import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import s from "./style.module.scss";

import dots from "../../assets/images/dots.svg";
import plus from "../../assets/images/plus.svg";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import { v4 as uuidv4 } from "uuid";
import Tasks from "./Tasks";

function MyBoard() {
  const { nameAndId } = useParams();
  const { boards } = useSelector((state) => state.board);

  const dispatch = useDispatch();

  const { addNewTaskTitle } = bindActionCreators(actionCreators, dispatch);

  const [textCardValue, setCardTextValue] = useState("");
  const [isOpenTextCard, setIsOpenTextCard] = useState(false);

  useEffect(() => {
    if (!isOpenTextCard && !textCardValue) return;
    const handleEnterKeyPressed = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault(); // Prevent newline in textarea
        handleSubmit(e);
      }
    };

    document.addEventListener("keydown", handleEnterKeyPressed);

    return () => {
      document.removeEventListener("keydown", handleEnterKeyPressed);
    };
  }, [textCardValue]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const textCardObj = {
      id: nameAndId,
      value: textCardValue,
      newID: uuidv4(),
    };
    console.log(textCardObj);
    // adding New
    addNewTaskTitle(textCardObj);

    // close text card
    setIsOpenTextCard(false);

    // set value to null
    setCardTextValue("");
  };

  const boardTaskTitle = boards.find((board) => board.id === nameAndId);

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
        <article className={s.list_wrapper}></article>
        <article className={s.list_wrapper}></article>
      </section>
    </div>
  );
}

export default MyBoard;
