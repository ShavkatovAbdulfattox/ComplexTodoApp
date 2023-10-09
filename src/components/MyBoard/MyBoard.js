import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import s from "./style.module.scss";

import dots from "../../assets/images/dots.svg";
import plus from "../../assets/images/plus.svg";

function MyBoard() {
  const { nameAndId } = useParams();
  const [textCardValue, setCardTextValue] = useState("");
  const [isOpenTextCard, setIsOpenTextCard] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(nameAndId);

    setIsOpenTextCard(false);
  };

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
                <AiOutlineClose />
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
