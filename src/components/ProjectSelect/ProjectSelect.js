import React, { useEffect, useRef, useState } from "react";
import plus from "../../assets/images/plus.svg";
import s from "./style.module.css";
import { motion } from "framer-motion";
import CreateBoardModal from "./CreateBoardModal";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import { Link } from "react-router-dom";

function ProjectSelect() {
  const { boards } = useSelector((state) => state.board);

  const dispatch = useDispatch();
  const { createBoard } = bindActionCreators(actionCreators, dispatch);

  const [isVisible, setIsVisible] = useState(false);
  const [width, setWidth] = useState(null);
  const widthBox = useRef(null);

  const openModal = () => {
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
  };
  useEffect(() => {
    let width = widthBox.current.getBoundingClientRect().width;
    setWidth(width);
  }, []);

  return (
    <div className="container">
      {isVisible && (
        <CreateBoardModal
          width={width}
          close={closeModal}
          create={createBoard}
        />
      )}

      <motion.button
        whileTap={{ scale: 0.9 }}
        className={s.button}
        ref={widthBox}
        onClick={openModal}
      >
        Create new board <img src={plus} alt="plus-icon" />
      </motion.button>

      {boards.length >= 0 ? (
        <div className={s.boardsWrapper}>
          {boards?.map((item) => {
            const { name, img, imgNum, id } = item.board;
            return (
              <motion.button
                key={id}
                whileTap={{ scale: 0.9 }}
                className={s.button}
                style={{
                  background: !img ? "black" : `url(${img})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  color: "white",
                }}
              >
                <Link to={`board/${id}`}>{name}</Link>
              </motion.button>
            );
          })}
        </div>
      ) : undefined}
    </div>
  );
}

export default ProjectSelect;
