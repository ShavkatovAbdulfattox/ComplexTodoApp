import React, { useEffect, useRef, useState } from "react";
import plus from "../../assets/images/plus.svg";
import s from "./style.module.css";
import { motion } from "framer-motion";
import CreateBoardModal from "./CreateBoardModal";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";

function ProjectSelect() {
  const state = useSelector((state) => state.board);
  const dispatch = useDispatch();

  const AC = bindActionCreators(actionCreators, dispatch);

  console.log(AC);

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
    console.log(width);
  }, []);

  return (
    <div className="container">
      {isVisible && <CreateBoardModal width={width} close={closeModal} />}

      <motion.button
        whileTap={{ scale: 0.9 }}
        className={s.button}
        ref={widthBox}
        onClick={openModal}
      >
        Create new board <img src={plus} alt="plus-icon" />
      </motion.button>
    </div>
  );
}

export default ProjectSelect;
